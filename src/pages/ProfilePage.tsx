import React, { useState } from 'react';
import { Camera, Edit, MapPin, Phone, Mail, Calendar, Star, Shield, Award, User } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Badge from '../components/ui/Badge';
import Rating from '../components/ui/Rating';
import Modal from '../components/ui/Modal';
import { useAuth } from '../context/AuthContext';
import { formatDate } from '../utils/format';

const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editFormData, setEditFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    location: user?.location || '',
    bio: user?.bio || '',
  });

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement profile update
    console.log('Update profile:', editFormData);
    setIsEditModalOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({ ...prev, [name]: value }));
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
        {/* Profile Header */}
        <Card className="mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
            <div className="relative">
              <img
                src={user.avatar_url || 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1'}
                alt={user.name}
                className="w-24 h-24 rounded-full object-cover"
              />
              <button className="absolute bottom-0 right-0 p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors">
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
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1"
            >
              Save Changes
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ProfilePage;