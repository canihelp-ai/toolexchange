import React, { useState } from 'react';
import { Camera, Edit, MapPin, Phone, Mail, Calendar, Star, Shield, Award, User, Upload, X, Check, AlertCircle } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Badge from '../components/ui/Badge';
import Rating from '../components/ui/Rating';
import Modal from '../components/ui/Modal';
import { useAuth } from '../context/AuthContext';
import { formatDate } from '../utils/format';
import { supabase } from '../lib/supabase';

const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateError, setUpdateError] = useState<string | null>(null);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [editFormData, setEditFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    location: user?.location || '',
    bio: user?.bio || '',
  });

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsConfirmModalOpen(true);
  };

  const handleConfirmUpdate = async () => {
    if (!user) return;

    setIsUpdating(true);
    setUpdateError(null);
    setIsConfirmModalOpen(false);

    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          name: editFormData.name,
          phone: editFormData.phone || null,
          location: editFormData.location,
          bio: editFormData.bio || null,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);

      if (error) throw error;

      setUpdateSuccess(true);
      setIsEditModalOpen(false);
      
      // Show success message for 3 seconds
      setTimeout(() => {
        setUpdateSuccess(false);
        // Refresh the page to show updated data
        window.location.reload();
      }, 3000);

    } catch (err) {
      console.error('Profile update error:', err);
      setUpdateError(err instanceof Error ? err.message : 'Failed to update profile');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleAvatarUpload = async () => {
    if (!selectedFile) return;
    
    if (!user) return;

    setIsUpdating(true);
    setUpdateError(null);

    try {
      // Create unique filename
      const fileExt = selectedFile.name.split('.').pop();
      const fileName = `${user.id}-${Date.now()}.${fileExt}`;
      const filePath = fileName;

      // Upload file to Supabase storage
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, selectedFile, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      // Update profile with new avatar URL
      const { error: updateError } = await supabase
        .from('profiles')
        .update({
          avatar_url: publicUrl,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);

      if (updateError) throw updateError;

      setUpdateSuccess(true);
      
      // Clean up preview URL
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
      
      setIsAvatarModalOpen(false);
      setSelectedFile(null);
      setPreviewUrl(null);
      
      // Show success message for 3 seconds then refresh
      setTimeout(() => {
        setUpdateSuccess(false);
        window.location.reload();
      }, 3000);

    } catch (err) {
      console.error('Avatar upload error:', err);
      setUpdateError(err instanceof Error ? err.message : 'Failed to upload avatar');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleAvatarModalClose = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setIsAvatarModalOpen(false);
    setSelectedFile(null);
    setPreviewUrl(null);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Access Denied</h2>
          <p className="text-gray-600">Please sign in to view your profile.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Success Message */}
        {updateSuccess && (
          <div className="fixed top-4 right-4 bg-green-50 border border-green-200 rounded-lg p-4 shadow-lg z-50">
            <div className="flex items-center">
              <Check className="w-5 h-5 text-green-600 mr-2" />
              <p className="text-green-800 font-medium">Profile updated successfully!</p>
            </div>
          </div>
        )}

        {/* Error Message */}
        {updateError && (
          <div className="fixed top-4 right-4 bg-red-50 border border-red-200 rounded-lg p-4 shadow-lg z-50">
            <div className="flex items-center">
              <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
              <div>
                <p className="text-red-800 font-medium">Update failed</p>
                <p className="text-red-600 text-sm">{updateError}</p>
              </div>
              <button
                onClick={() => setUpdateError(null)}
                className="ml-4 text-red-600 hover:text-red-800"
              >
                <X size={16} />
              </button>
            </div>
          </div>
        )}

        {/* Profile Header */}
        <Card className="mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
            <div className="relative">
              <img
                src={user.avatar_url || 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1'}
                alt={user.name}
                className="w-24 h-24 rounded-full object-cover"
              />
              <button 
                onClick={() => setIsAvatarModalOpen(true)}
                className="absolute bottom-0 right-0 p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
              >
                <Camera size={16} />
              </button>
            </div>
            
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">{user.name}</h1>
                  <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                    <span className="flex items-center">
                      <MapPin size={16} className="mr-1" />
                      {user.location}
                    </span>
                    <span className="flex items-center">
                      <Calendar size={16} className="mr-1" />
                      Member since {formatDate(user.member_since)}
                    </span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Rating rating={user.rating} />
                    <span className="text-sm text-gray-600">({user.review_count} reviews)</span>
                    <Badge variant="info" className="capitalize">{user.role}</Badge>
                  </div>
                </div>
                
                <Button
                  onClick={() => setIsEditModalOpen(true)}
                  leftIcon={<Edit size={16} />}
                  className="mt-4 md:mt-0"
                >
                  Edit Profile
                </Button>
              </div>
            </div>
          </div>
          
          {user.bio && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-gray-700">{user.bio}</p>
            </div>
          )}
        </Card>

        {/* Contact Information */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card>
            <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <Mail size={16} className="text-gray-400 mr-3" />
                <span className="text-gray-900">{user.email}</span>
                {user.email_verified && (
                  <Shield size={16} className="text-green-600 ml-2" />
                )}
              </div>
              {user.phone && (
                <div className="flex items-center">
                  <Phone size={16} className="text-gray-400 mr-3" />
                  <span className="text-gray-900">{user.phone}</span>
                  {user.phone_verified && (
                    <Shield size={16} className="text-green-600 ml-2" />
                  )}
                </div>
              )}
            </div>
          </Card>

          <Card>
            <h3 className="text-lg font-semibold mb-4">Verification Status</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Email Verified</span>
                <Badge variant={user.email_verified ? 'success' : 'warning'}>
                  {user.email_verified ? 'Verified' : 'Pending'}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Phone Verified</span>
                <Badge variant={user.phone_verified ? 'success' : 'warning'}>
                  {user.phone_verified ? 'Verified' : 'Pending'}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">ID Verified</span>
                <Badge variant={user.id_verified ? 'success' : 'warning'}>
                  {user.id_verified ? 'Verified' : 'Pending'}
                </Badge>
              </div>
            </div>
          </Card>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="text-center">
            <div className="p-6">
              <Star className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">{user.rating.toFixed(1)}</p>
              <p className="text-sm text-gray-600">Average Rating</p>
            </div>
          </Card>
          
          <Card className="text-center">
            <div className="p-6">
              <User className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">{user.review_count}</p>
              <p className="text-sm text-gray-600">Total Reviews</p>
            </div>
          </Card>
          
          <Card className="text-center">
            <div className="p-6">
              <Award className="w-8 h-8 text-green-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">{user.trust_score}</p>
              <p className="text-sm text-gray-600">Trust Score</p>
            </div>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card>
          <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
          <div className="text-center py-8 text-gray-500">
            <p>No recent activity to display</p>
          </div>
        </Card>
      </div>

      {/* Edit Profile Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Profile"
        size="md"
      >
        <form onSubmit={handleEditSubmit} className="space-y-4">
          {updateError && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <div className="flex items-center">
                <AlertCircle className="w-4 h-4 text-red-600 mr-2" />
                <p className="text-sm text-red-600">{updateError}</p>
              </div>
            </div>
          )}

          <Input
            name="name"
            label="Full Name"
            value={editFormData.name}
            onChange={handleInputChange}
            required
          />
          
          <Input
            name="phone"
            label="Phone Number"
            type="tel"
            value={editFormData.phone}
            onChange={handleInputChange}
          />
          
          <Input
            name="location"
            label="Location"
            value={editFormData.location}
            onChange={handleInputChange}
            required
          />
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Bio
            </label>
            <textarea
              name="bio"
              rows={4}
              value={editFormData.bio}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
              placeholder="Tell others about yourself..."
            />
          </div>
          
          <div className="flex space-x-4 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsEditModalOpen(false)}
              className="flex-1"
              disabled={isUpdating}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1"
              isLoading={isUpdating}
            >
              {isUpdating ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Confirmation Modal */}
      <Modal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        title="Confirm Profile Changes"
        size="md"
      >
        <div className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-medium text-blue-900 mb-2">Review Your Changes</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-blue-700">Name:</span>
                <span className="text-blue-900 font-medium">{editFormData.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-700">Phone:</span>
                <span className="text-blue-900 font-medium">{editFormData.phone || 'Not provided'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-700">Location:</span>
                <span className="text-blue-900 font-medium">{editFormData.location}</span>
              </div>
              {editFormData.bio && (
                <div>
                  <span className="text-blue-700">Bio:</span>
                  <p className="text-blue-900 font-medium mt-1">{editFormData.bio}</p>
                </div>
              )}
            </div>
          </div>
          
          <p className="text-sm text-gray-600">
            Are you sure you want to update your profile with these changes?
          </p>
          
          <div className="flex space-x-4">
            <Button
              variant="outline"
              onClick={() => setIsConfirmModalOpen(false)}
              className="flex-1"
              disabled={isUpdating}
            >
              Cancel
            </Button>
            <Button
              onClick={handleConfirmUpdate}
              className="flex-1"
              isLoading={isUpdating}
            >
              {isUpdating ? 'Updating...' : 'Confirm Update'}
            </Button>
          </div>
        </div>
      </Modal>
      {/* Avatar Upload Modal */}
      <Modal
        isOpen={isAvatarModalOpen}
        onClose={handleAvatarModalClose}
        title="Change Profile Picture"
        size="md"
      >
        <div className="space-y-6">
          <div className="text-center">
            <div className="relative inline-block">
              <img
                src={previewUrl || user.avatar_url || 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1'}
                alt="Preview"
                className="w-32 h-32 rounded-full object-cover mx-auto"
              />
              {previewUrl && (
                <div className="absolute top-0 right-0 bg-green-500 text-white rounded-full p-1">
                  <Check size={16} />
                </div>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Choose New Picture
              </label>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-8 h-8 mb-4 text-gray-500" />
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-500">PNG, JPG or GIF (MAX. 5MB)</p>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileSelect}
                  />
                </label>
              </div>
            </div>

            {selectedFile && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <Upload size={16} className="text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-blue-900">{selectedFile.name}</p>
                      <p className="text-xs text-blue-600">
                        {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedFile(null);
                      if (previewUrl) {
                        URL.revokeObjectURL(previewUrl);
                        setPreviewUrl(null);
                      }
                    }}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="flex space-x-4">
            <Button
              variant="outline"
              onClick={handleAvatarModalClose}
              className="flex-1"
              disabled={isUpdating}
            >
              Cancel
            </Button>
            <Button
              onClick={handleAvatarUpload}
              className="flex-1"
              disabled={!selectedFile}
              isLoading={isUpdating}
            >
              {isUpdating ? 'Uploading...' : 'Upload Picture'}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ProfilePage;