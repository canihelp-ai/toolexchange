import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, User, Phone, MapPin } from 'lucide-react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { useAuth } from '../../context/AuthContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultMode?: 'login' | 'register';
}

const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  defaultMode = 'login',
}) => {
  const [mode, setMode] = useState<'login' | 'register' | 'role-selection'>(defaultMode);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    confirmEmail: '',
    password: '',
    confirmPassword: '',
    name: '',
    phone: '',
    location: '',
    role: 'renter' as 'renter' | 'owner' | 'operator' | 'admin',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { login, register, isLoading } = useAuth();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (mode === 'register' && !formData.confirmEmail) {
      newErrors.confirmEmail = 'Please confirm your email';
    } else if (mode === 'register' && formData.email !== formData.confirmEmail) {
      newErrors.confirmEmail = 'Emails do not match';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (mode === 'register' && !formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (mode === 'register' && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (mode === 'register') {
      if (!formData.name) {
        newErrors.name = 'Name is required';
      }
      if (!formData.location) {
        newErrors.location = 'Location is required';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (mode === 'login') {
      try {
        await login(formData.email, formData.password);
        onClose();
        resetForm();
      } catch (err) {
        // Error is already set in auth context
      }
    } else if (mode === 'register') {
      try {
        await register(formData);
        onClose();
        resetForm();
      } catch (err) {
        // Error is already set in auth context
      }
    }
  };

  const handleRoleSelection = (role: 'renter' | 'owner' | 'operator') => {
    setFormData(prev => ({ ...prev, role }));
    setMode('register');
  };

  const resetForm = () => {
    setFormData({
      email: '',
      confirmEmail: '',
      password: '',
      confirmPassword: '',
      name: '',
      phone: '',
      location: '',
      role: 'renter',
    });
    setErrors({});
    setShowPassword(false);
  };

  const handleModeChange = (newMode: 'login' | 'register' | 'role-selection') => {
    setMode(newMode);
    resetForm();
  };

  const renderRoleSelection = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Choose Your Role</h3>
        <p className="text-sm text-gray-600">How would you like to use ToolShare?</p>
      </div>
      
      <div className="space-y-3">
        <button
          onClick={() => handleRoleSelection('renter')}
          className="w-full p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors text-left"
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h4 className="font-medium text-gray-900">I want to rent tools</h4>
              <p className="text-sm text-gray-600">Browse and rent tools from others</p>
            </div>
          </div>
        </button>
        
        <button
          onClick={() => handleRoleSelection('owner')}
          className="w-full p-4 border-2 border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors text-left"
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <MapPin className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h4 className="font-medium text-gray-900">I want to rent out my tools</h4>
              <p className="text-sm text-gray-600">List your tools and earn money</p>
            </div>
          </div>
        </button>
        
        <button
          onClick={() => handleRoleSelection('operator')}
          className="w-full p-4 border-2 border-gray-200 rounded-lg hover:border-orange-500 hover:bg-orange-50 transition-colors text-left"
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <h4 className="font-medium text-gray-900">I'm a skilled operator</h4>
              <p className="text-sm text-gray-600">Provide operation services</p>
            </div>
          </div>
        </button>
      </div>
      
      <div className="text-center">
        <button
          onClick={() => handleModeChange('login')}
          className="text-sm text-blue-600 hover:text-blue-800"
        >
          Already have an account? Log in
        </button>
      </div>
    </div>
  );

  const renderForm = () => (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900">
          {mode === 'login' ? 'Welcome back' : 'Create your account'}
        </h3>
        <p className="text-sm text-gray-600">
          {mode === 'login'
            ? 'Sign in to your account'
            : 'Join thousands of users sharing tools'}
        </p>
      </div>

      {(errors.general || error) && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
          <p className="text-sm text-red-600">{errors.general || error}</p>
        </div>
      )}

      {mode === 'register' && (
        <>
          <Input
            name="name"
            type="text"
            placeholder="Full name"
            value={formData.name}
            onChange={handleInputChange}
            leftIcon={<User size={20} />}
            error={errors.name}
          />
          <Input
            name="phone"
            type="tel"
            placeholder="Phone number"
            value={formData.phone}
            onChange={handleInputChange}
            leftIcon={<Phone size={20} />}
            error={errors.phone}
          />
          <Input
            name="location"
            type="text"
            placeholder="City, State"
            value={formData.location}
            onChange={handleInputChange}
            leftIcon={<MapPin size={20} />}
            error={errors.location}
          />
        </>
      )}

      <Input
        name="email"
        type="email"
        placeholder="Email address"
        value={formData.email}
        onChange={handleInputChange}
        leftIcon={<Mail size={20} />}
        error={errors.email}
      />

      {mode === 'register' && (
        <Input
          name="confirmEmail"
          type="email"
          placeholder="Confirm email address"
          value={formData.confirmEmail}
          onChange={handleInputChange}
          leftIcon={<Mail size={20} />}
          error={errors.confirmEmail}
        />
      )}

      <Input
        name="password"
        type={showPassword ? 'text' : 'password'}
        placeholder="Password"
        value={formData.password}
        onChange={handleInputChange}
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

      {mode === 'register' && (
        <Input
          name="confirmPassword"
          type={showPassword ? 'text' : 'password'}
          placeholder="Confirm password"
          value={formData.confirmPassword}
          onChange={handleInputChange}
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
          error={errors.confirmPassword}
        />
      )}

      <Button
        type="submit"
        className="w-full"
        isLoading={isLoading}
      >
        {mode === 'login' ? 'Sign in' : 'Create account'}
      </Button>

      <div className="text-center">
        <button
          type="button"
          onClick={() => handleModeChange(mode === 'login' ? 'role-selection' : 'login')}
          className="text-sm text-blue-600 hover:text-blue-800"
        >
          {mode === 'login'
            ? "Don't have an account? Sign up"
            : 'Already have an account? Log in'}
        </button>
      </div>
    </form>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="md"
    >
      {mode === 'role-selection' ? renderRoleSelection() : renderForm()}
    </Modal>
  );
};

export default AuthModal;