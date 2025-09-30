import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Bell, User, Menu, MessageCircle, Settings, LogOut, Home, X } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Modal from '../ui/Modal';
import Badge from '../ui/Badge';
import AuthModal from '../auth/AuthModal';
import { useAuth } from '../../context/AuthContext';
import { useCurrency } from '../../context/CurrencyContext';
import { formatRelativeTime } from '../../utils/format';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { currency, setCurrency } = useCurrency();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isMessagesOpen, setIsMessagesOpen] = useState(false);
  const [headerSearchQuery, setHeaderSearchQuery] = useState('');
  const { user, logout } = useAuth();

  // Mock notifications data
  const [notifications, setNotifications] = useState([]);
  const [recentMessages, setRecentMessages] = useState([]);

  useEffect(() => {
    if (user) {
      loadHeaderData();
    }
  }, [user]);

  const loadHeaderData = async () => {
    if (!user) return;

    try {
      // Load real notifications
      const { data: notificationsData } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(5);

      setNotifications(notificationsData || []);

      // Load recent messages from chats
      const { data: chatsData } = await supabase
        .from('chats')
        .select(`
          id,
          participants,
          messages!inner(
            content,
            created_at,
            sender_id,
            read,
            sender:profiles!messages_sender_id_fkey(name, avatar_url)
          )
        `)
        .contains('participants', [user.id])
        .order('updated_at', { ascending: false })
        .limit(3);

      // Transform messages for header display
      const headerMessages = [];
      for (const chat of chatsData || []) {
        const lastMessage = chat.messages?.[0];
        if (lastMessage && lastMessage.sender_id !== user.id) {
          headerMessages.push({
            id: lastMessage.id || Math.random().toString(),
            sender: {
              name: lastMessage.sender?.name || 'Unknown User',
              avatar_url: lastMessage.sender?.avatar_url || 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1'
            },
            content: lastMessage.content,
            created_at: lastMessage.created_at,
            read: lastMessage.read
          });
        }
      }

      setRecentMessages(headerMessages);

    } catch (error) {
      console.error('Error loading header data:', error);
    }
  };

  const unreadNotifications = notifications.filter(n => !n.read).length;
  const unreadMessages = recentMessages.filter(m => !m.read).length;

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
      case 'home':
        navigate('/');
        break;
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
        handleLogout();
        break;
      default:
        console.log('Unknown action:', action);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
      // Force navigation even if logout fails
      navigate('/');
    }
  };

  const handleNotificationClick = (notification: any) => {
    setIsNotificationsOpen(false);
    if (notification.action_url) {
      navigate(notification.action_url);
    }
  };

  const handleMessageClick = () => {
    setIsMessagesOpen(false);
    navigate('/dashboard/messages');
  };

  return (
    <header className="glass-effect shadow-lg border-b border-white/20 sticky top-0 z-40 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <button
                onClick={() => navigate('/')}
                className="text-2xl font-bold gradient-text hover:scale-105 transition-transform duration-300"
              >
                ToolShare
              </button>
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
                className="pr-20 text-gray-900 bg-white/80 backdrop-blur-sm border-white/30 focus:bg-white/90 transition-all duration-300"
              />
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="p-2 hover:bg-white/20 transition-colors"
                >
                  <Filter size={16} />
                </Button>
                <Button
                  type="submit"
                  size="sm"
                  className="px-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 border-0 shadow-lg"
                >
                  Search
                </Button>
                
                {/* Currency Selector */}
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value as 'USD' | 'JMD')}
                  className="px-3 py-2 border border-white/30 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white/80 backdrop-blur-sm transition-all duration-300"
                >
                  <option value="USD">USD ($)</option>
                  <option value="JMD">JMD (J$)</option>
                </select>
              </div>
            </form>
          </div>

          {/* Right Navigation */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                {/* Notifications */}
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="p-2 relative hover:bg-white/20 transition-colors rounded-full"
                  onClick={() => setIsNotificationsOpen(true)}
                >
                  <Bell size={20} />
                  {unreadNotifications > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-pink-500 to-red-500 text-white text-xs rounded-full flex items-center justify-center animate-pulse-glow">
                      {unreadNotifications}
                    </span>
                  )}
                </Button>

                {/* Messages */}
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="p-2 relative hover:bg-white/20 transition-colors rounded-full"
                  onClick={() => setIsMessagesOpen(true)}
                >
                  <MessageCircle size={20} />
                  {unreadMessages > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-green-400 to-blue-500 text-white text-xs rounded-full flex items-center justify-center animate-pulse-glow">
                      {unreadMessages}
                    </span>
                  )}
                </Button>

                {/* Profile Menu */}
                <div className="relative">
                  <button
                    onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                    className="flex items-center space-x-2 p-2 rounded-xl hover:bg-white/20 transition-all duration-300 backdrop-blur-sm"
                  >
                    <img
                      src={user.avatar_url || 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1'}
                      alt={user.name}
                      className="w-8 h-8 rounded-full object-cover ring-2 ring-white/50 hover:ring-purple-400 transition-all duration-300"
                      onError={(e) => {
                        e.currentTarget.src = 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1';
                      }}
                    />
                    <span className="text-sm font-medium text-gray-800">{user.name}</span>
                  </button>

                  {isProfileMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 glass-effect rounded-xl shadow-2xl border border-white/20 py-2 z-50 backdrop-blur-xl">
                      <button
                        onClick={() => handleProfileAction('home')}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-white/20 transition-colors rounded-lg mx-1"
                      >
                        <Home size={16} className="mr-3" />
                        Home
                      </button>
                      <button
                        onClick={() => handleProfileAction('profile')}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-white/20 transition-colors rounded-lg mx-1"
                      >
                        <User size={16} className="mr-3" />
                        Profile
                      </button>
                      <button
                        onClick={() => handleProfileAction('dashboard')}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-white/20 transition-colors rounded-lg mx-1"
                      >
                        <Menu size={16} className="mr-3" />
                        Dashboard
                      </button>
                      <button
                        onClick={() => handleProfileAction('settings')}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-white/20 transition-colors rounded-lg mx-1"
                      >
                        <Settings size={16} className="mr-3" />
                        Settings
                      </button>
                      <hr className="my-2 border-white/20" />
                      <button
                        onClick={() => handleProfileAction('logout')}
                        className="flex items-center w-full px-4 py-2 text-sm text-red-500 hover:bg-red-500/10 transition-colors rounded-lg mx-1"
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
                  className="hover:bg-white/20 transition-colors"
                >
                  Sign in
                </Button>
                <Button
                  onClick={() => setIsAuthModalOpen(true)}
                  data-auth-trigger
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 border-0 shadow-lg"
                >
                  Sign up
                </Button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Notifications Modal */}
      <Modal
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        title="Notifications"
        size="md"
      >
        <div className="space-y-4">
          {notifications.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Bell size={48} className="mx-auto mb-4 text-gray-300" />
              <p>No notifications yet</p>
            </div>
          ) : (
            <div className="space-y-3">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  onClick={() => handleNotificationClick(notification)}
                  className={`p-4 rounded-lg border cursor-pointer hover:bg-gray-50 transition-colors ${
                    !notification.read ? 'bg-blue-50 border-blue-200' : 'bg-white border-gray-200'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h4 className="font-medium text-gray-900">{notification.title}</h4>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                      <p className="text-xs text-gray-500 mt-2">
                        {formatRelativeTime(notification.created_at)}
                      </p>
                    </div>
                    <Badge 
                      variant={notification.type === 'booking' ? 'info' : notification.type === 'review' ? 'success' : 'default'}
                      size="sm"
                      className="capitalize"
                    >
                      {notification.type}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="pt-4 border-t">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => {
                setIsNotificationsOpen(false);
                navigate('/dashboard');
              }}
            >
              View All Notifications
            </Button>
          </div>
        </div>
      </Modal>

      {/* Messages Modal */}
      <Modal
        isOpen={isMessagesOpen}
        onClose={() => setIsMessagesOpen(false)}
        title="Recent Messages"
        size="md"
      >
        <div className="space-y-4">
          {recentMessages.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <MessageCircle size={48} className="mx-auto mb-4 text-gray-300" />
              <p>No messages yet</p>
            </div>
          ) : (
            <div className="space-y-3">
              {recentMessages.map((message) => (
                <div
                  key={message.id}
                  onClick={handleMessageClick}
                  className={`p-4 rounded-lg border cursor-pointer hover:bg-gray-50 transition-colors ${
                    !message.read ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <img
                      src={message.sender.avatar_url}
                      alt={message.sender.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-gray-900">{message.sender.name}</h4>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-gray-500">
                            {formatRelativeTime(message.created_at)}
                          </span>
                          {!message.read && (
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          )}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{message.content}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="pt-4 border-t">
            <Button
              variant="outline"
              className="w-full"
              onClick={handleMessageClick}
            >
              View All Messages
            </Button>
          </div>
        </div>
      </Modal>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        defaultMode="login"
      />
    </header>
  );
};

export default Header;