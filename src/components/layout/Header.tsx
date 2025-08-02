import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Bell, User, Menu, MessageCircle, Settings, LogOut, Home } from 'lucide-react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import AuthModal from '../auth/AuthModal';
import { useAuth } from '../../context/AuthContext';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [headerSearchQuery, setHeaderSearchQuery] = useState('');
  const { user, logout } = useAuth();

  const handleHeaderSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Navigate to home page with search query
    const searchParams = new URLSearchParams();
    if (headerSearchQuery.trim()) {
      searchParams.set('search', headerSearchQuery.trim());
    }
    window.location.href = `/?${searchParams.toString()}`;
  };

  const handleProfileAction = (action: string) => {
    setIsProfileMenuOpen(false);
    
    switch (action) {
      case 'profile':
        navigate('/profile');
        break;
      case 'dashboard':
        navigate('/dashboard');
        break;
      case 'settings':
        navigate('/settings');
        break;
      case 'logout':
        logout();
        break;
      default:
        console.log('Unknown action:', action);
    }
  };


  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-xl font-bold text-blue-600">ToolShare</h1>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-8">
            <form onSubmit={handleHeaderSearch} className="relative">
              <Input
                type="text"
                placeholder="Search tools, equipment, or operators..."
                value={headerSearchQuery}
                onChange={(e) => setHeaderSearchQuery(e.target.value)}
                leftIcon={<Search size={20} />}
                className="pr-20 text-gray-900"
              />
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="p-2"
                >
                  <Filter size={16} />
                </Button>
                <Button
                  type="submit"
                  size="sm"
                  className="px-3"
                >
                  Search
                </Button>
              </div>
            </form>
          </div>

          {/* Right Navigation */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                {/* Notifications */}
                <Button variant="ghost" size="sm" className="p-2 relative">
                  <Bell size={20} />
                  <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                </Button>

                {/* Messages */}
                <Button variant="ghost" size="sm" className="p-2 relative">
                  <MessageCircle size={20} />
                  <span className="absolute top-0 right-0 w-2 h-2 bg-green-500 rounded-full"></span>
                </Button>

                {/* Profile Menu */}
                <div className="relative">
                  <button
                    onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                    className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <img
                      src={user.avatar || 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1'}
                      alt={user.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <span className="text-sm font-medium text-gray-700">{user.name}</span>
                  </button>

                  {isProfileMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                      <button
                        onClick={() => handleProfileAction('profile')}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <User size={16} className="mr-3" />
                        Profile
                      </button>
                      <button
                        onClick={() => handleProfileAction('dashboard')}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <Menu size={16} className="mr-3" />
                        Dashboard
                      </button>
                      <button
                        onClick={() => handleProfileAction('settings')}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <Settings size={16} className="mr-3" />
                        Settings
                      </button>
                      <hr className="my-2" />
                      <button
                        onClick={() => handleProfileAction('logout')}
                        className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                      >
                        <LogOut size={16} className="mr-3" />
                        Sign out
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Button
                  variant="ghost"
                  onClick={() => setIsAuthModalOpen(true)}
                  data-auth-trigger
                >
                  Sign in
                </Button>
                <Button
                  onClick={() => setIsAuthModalOpen(true)}
                  data-auth-trigger
                >
                  Sign up
                </Button>
              </>
            )}
          </div>
        </div>
      </div>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        defaultMode="login"
      />
    </header>
  );
};

export default Header;