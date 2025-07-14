import React from 'react';
import { Link, useLocation } from 'react-router-dom';
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
  const { user } = useAuth();
  const location = useLocation();

  const getNavigationItems = () => {
    const baseItems = [
      { icon: Home, label: 'Overview', path: '/dashboard' },
      { icon: MessageCircle, label: 'Messages', path: '/dashboard/messages' },
      { icon: Star, label: 'Reviews', path: '/dashboard/reviews' },
      { icon: Settings, label: 'Settings', path: '/dashboard/settings' },
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

  const navigationItems = getNavigationItems();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-sm min-h-screen">
          <div className="p-6">
            <div className="flex items-center space-x-3 mb-8">
              <img
                src={user?.avatar || 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=1'}
                alt={user?.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="font-medium text-gray-900">{user?.name}</p>
                <p className="text-sm text-gray-500 capitalize">{user?.role}</p>
              </div>
            </div>

            <nav className="space-y-2">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;

                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Icon size={20} />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;