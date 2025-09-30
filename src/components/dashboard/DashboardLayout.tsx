import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Home, 
  Package, 
  Calendar, 
  MessageCircle, 
  Star, 
  Wallet, 
  Settings, 
  Users,
  TrendingUp,
  Wrench
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const getNavigationItems = () => {
    const baseItems = [
      { icon: Home, label: 'Overview', path: '/dashboard' },
      { icon: MessageCircle, label: 'Messages', path: '/dashboard/messages' },
      { icon: Star, label: 'Reviews', path: '/dashboard/reviews' },
      { icon: Settings, label: 'Settings', path: '/settings' },
    ];

    switch (user?.role) {
      case 'renter':
        return [
          ...baseItems.slice(0, 1),
          { icon: Package, label: 'My Rentals', path: '/dashboard/rentals' },
          { icon: TrendingUp, label: 'My Bids', path: '/dashboard/bids' },
          { icon: Wallet, label: 'Wallet', path: '/dashboard/wallet' },
          ...baseItems.slice(1),
        ];
      case 'owner':
        return [
          ...baseItems.slice(0, 1),
          { icon: Package, label: 'My Tools', path: '/dashboard/tools' },
          { icon: Calendar, label: 'Bookings', path: '/dashboard/bookings' },
          { icon: Users, label: 'Operators', path: '/dashboard/operators' },
          { icon: TrendingUp, label: 'Analytics', path: '/dashboard/analytics' },
          ...baseItems.slice(1),
        ];
      case 'operator':
        return [
          ...baseItems.slice(0, 1),
          { icon: Wrench, label: 'My Jobs', path: '/dashboard/jobs' },
          { icon: Calendar, label: 'Availability', path: '/dashboard/availability' },
          { icon: Package, label: 'Tool Matches', path: '/dashboard/matches' },
          { icon: Wallet, label: 'Earnings', path: '/dashboard/earnings' },
          ...baseItems.slice(1),
        ];
      default:
        return baseItems;
    }
  };

  const handleNavigation = (path: string) => {
    if (path === '/settings') {
      navigate('/settings');
    }
  };
  const navigationItems = getNavigationItems();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 glass-effect shadow-2xl min-h-screen border-r border-white/20">
          <div className="p-6">
            <div className="flex items-center space-x-3 mb-8">
              <img
                src={user?.avatar_url || 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1'}
                alt={user?.name}
                className="w-12 h-12 rounded-full object-cover ring-2 ring-purple-400/50 shadow-lg"
                onError={(e) => {
                  e.currentTarget.src = 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1';
                }}
              />
              <div>
                <p className="font-semibold text-gray-900">{user?.name}</p>
                <p className="text-sm bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent capitalize font-medium">{user?.role}</p>
              </div>
            </div>

            <nav className="space-y-2">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;

                return (
                  item.path === '/settings' ? (
                    <button
                      key={item.path}
                      onClick={() => handleNavigation(item.path)}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 w-full text-left ${
                        isActive
                          ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                          : 'text-gray-700 hover:bg-white/30 hover:backdrop-blur-sm'
                      }`}
                    >
                      <Icon size={20} />
                      <span>{item.label}</span>
                    </button>
                  ) : (
                    <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                      isActive
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                        : 'text-gray-700 hover:bg-white/30 hover:backdrop-blur-sm'
                    }`}
                  >
                    <Icon size={20} />
                    <span>{item.label}</span>
                  </Link>
                  )
                );
              })}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8 bg-gradient-to-br from-white/50 to-purple-50/50">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;