import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Eye, EyeOff, Lock, CheckCircle } from 'lucide-react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Card from '../components/ui/Card';
import { useAuth } from '../context/AuthContext';

const ResetPasswordPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { updatePassword, isLoading, error: authError } = useAuth();
  
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSuccess, setIsSuccess] = useState(false);

  // Check if we have the required tokens from the URL
  const accessToken = searchParams.get('access_token');
  const refreshToken = searchParams.get('refresh_token');

  useEffect(() => {
    // If we don't have the required tokens, redirect to home
    if (!accessToken || !refreshToken) {
      navigate('/');
      return;
    }

    // Set the session with the tokens from the URL
    const setSession = async () => {
      try {
        const { supabase } = await import('../lib/supabase');
        await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken
        });
      } catch (error) {
        console.error('Error setting session:', error);
        navigate('/');
      }
    };

    setSession();
  }, [accessToken, refreshToken, navigate]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await updatePassword(password);
      setIsSuccess(true);
      
      // Redirect to home after 3 seconds
      setTimeout(() => {
        navigate('/');
      }, 3000);
    } catch (err) {
      // Error is handled in auth context
    }
  };

  const handleInputChange = (field: string, value: string) => {
    if (field === 'password') {
      setPassword(value);
    } else if (field === 'confirmPassword') {
      setConfirmPassword(value);
    }
    
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <div className="space-y-6">
            <div className="flex justify-center">
              <CheckCircle className="w-16 h-16 text-green-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Password Updated Successfully!
              </h2>
              <p className="text-gray-600">
                Your password has been updated. You will be redirected to the homepage shortly.
              </p>
            </div>
            <Button
              onClick={() => navigate('/')}
              className="w-full"
            >
              Continue to ToolShare
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Set New Password
            </h2>
            <p className="text-gray-600">
              Enter your new password below
            </p>
          </div>

          {authError && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-sm text-red-600">{authError}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type={showPassword ? 'text' : 'password'}
              placeholder="New password"
              value={password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              leftIcon={<Lock size={20} />}
              rightIcon={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              }
              error={errors.password}
            />

            <Input
              type={showPassword ? 'text' : 'password'}
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
              leftIcon={<Lock size={20} />}
              error={errors.confirmPassword}
            />

            <Button
              type="submit"
              className="w-full"
              isLoading={isLoading}
              disabled={!password || !confirmPassword}
            >
              Update Password
            </Button>
          </form>

          <div className="text-center">
            <button
              onClick={() => navigate('/')}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              Back to ToolShare
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ResetPasswordPage;