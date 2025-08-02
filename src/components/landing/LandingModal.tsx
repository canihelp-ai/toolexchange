import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, User, Phone, MapPin, Wrench, Package, Users } from 'lucide-react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { useAuth } from '../../context/AuthContext';

interface LandingModalProps {
  onAuthSuccess: () => void;
}

const LandingModal: React.FC<LandingModalProps> = ({ onAuthSuccess }) => {
  const [mode, setMode] = useState<'welcome' | 'role-selection' | 'login' | 'register'>('welcome');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    confirmEmail: '',
    password: '',
    confirmPassword: '',
    name: '',
    phone: '',
    location: '',
    role: 'renter' as 'renter' | 'owner' | 'operator',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { login, register, isLoading, error: authError } = useAuth();

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

    try {
      if (mode === 'login') {
        await login(formData.email, formData.password);
      } else if (mode === 'register') {
        await register(formData);
      }
      onAuthSuccess();
    } catch (err) {
      // Error is handled in auth context
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

  const handleModeChange = (newMode: 'welcome' | 'role-selection' | 'login' | 'register') => {
    setMode(newMode);
    resetForm();
  };

  const renderWelcome = () => (
    <div className="text-center space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to ToolShare
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          The premier marketplace for tool and equipment rentals
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="text-center p-6 bg-blue-50 rounded-lg">
          <Package className="w-12 h-12 text-blue-600 mx-auto mb-4" />
          <h3 className="font-semibold text-gray-900 mb-2">Rent Tools</h3>
          <p className="text-sm text-gray-600">Access thousands of professional tools and equipment</p>
        </div>
        <div className="text-center p-6 bg-green-50 rounded-lg">
          <Users className="w-12 h-12 text-green-600 mx-auto mb-4" />
          <h3 className="font-semibold text-gray-900 mb-2">List Your Tools</h3>
          <p className="text-sm text-gray-600">Earn money by renting out your unused tools</p>
        </div>
        <div className="text-center p-6 bg-orange-50 rounded-lg">
          <Wrench className="w-12 h-12 text-orange-600 mx-auto mb-4" />
          <h3 className="font-semibold text-gray-900 mb-2">Skilled Operators</h3>
          <p className="text-sm text-gray-600">Connect with certified equipment operators</p>
        </div>
      </div>

      <div className="space-y-4">
        <Button
          onClick={() => handleModeChange('role-selection')}
          size="lg"
          className="w-full"
        >
          Get Started - Create Account
        </Button>
        <Button
          onClick={() => handleModeChange('login')}
          variant="outline"
          size="lg"
          className="w-full"
        >
          I Already Have an Account
        </Button>
      </div>

      <div className="text-sm text-gray-500">
        <p>Join thousands of users sharing tools in your community</p>
      </div>
    </div>
  );

  const renderRoleSelection = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Choose Your Role</h3>
        <p className="text-gray-600">How would you like to use ToolShare?</p>
      </div>
      
      <div className="space-y-4">
        <button
          onClick={() => handleRoleSelection('renter')}
          className="w-full p-6 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors text-left group"
        >
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-blue-100 group-hover:bg-blue-200 rounded-full flex items-center justify-center transition-colors">
              <Package className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-900">I want to rent tools</h4>
              <p className="text-gray-600">Browse and rent tools from others in your area</p>
            </div>
          </div>
        </button>
        
        <button
          onClick={() => handleRoleSelection('owner')}
          className="w-full p-6 border-2 border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors text-left group"
        >
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-green-100 group-hover:bg-green-200 rounded-full flex items-center justify-center transition-colors">
              <Users className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-900">I want to rent out my tools</h4>
              <p className="text-gray-600">List your tools and earn money from rentals</p>
            </div>
          </div>
        </button>
        
        <button
          onClick={() => handleRoleSelection('operator')}
          className="w-full p-6 border-2 border-gray-200 rounded-lg hover:border-orange-500 hover:bg-orange-50 transition-colors text-left group"
        >
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-orange-100 group-hover:bg-orange-200 rounded-full flex items-center justify-center transition-colors">
              <Wrench className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-900">I'm a skilled operator</h4>
              <p className="text-gray-600">Provide professional operation services</p>
            </div>
          </div>
        </button>
      </div>
      
      <div className="text-center">
        <button
          onClick={() => handleModeChange('login')}
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          Already have an account? Sign in
        </button>
      </div>
    </div>
  );

  const renderAuthForm = () => (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          {mode === 'login' ? 'Welcome back!' : 'Create your account'}
        </h3>
        <p className="text-gray-600">
          {mode === 'login'
            ? 'Sign in to access the ToolShare marketplace'
            : `Join as a ${formData.role} and start sharing tools`}
        </p>
      </div>

      {(errors.general || authError) && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-sm text-red-600">{errors.general || authError}</p>
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
            placeholder="Phone number (optional)"
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
          error={errors.confirmPassword}
        />
      )}

      <Button
        type="submit"
        className="w-full"
        size="lg"
        isLoading={isLoading}
      >
        {mode === 'login' ? 'Sign In' : 'Create Account'}
      </Button>

      <div className="text-center">
        <button
          type="button"
          onClick={() => handleModeChange(mode === 'login' ? 'role-selection' : 'login')}
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          {mode === 'login'
            ? "Don't have an account? Sign up"
            : 'Already have an account? Sign in'}
        </button>
      </div>
    </form>
  );

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="p-8 md:p-12">
          {mode === 'welcome' && renderWelcome()}
          {mode === 'role-selection' && renderRoleSelection()}
          {(mode === 'login' || mode === 'register') && renderAuthForm()}
        </div>
      </div>
    </div>
  );
};

export default LandingModal;