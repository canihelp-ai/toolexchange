import React from 'react';
import { useEffect, useState } from 'react';
import { 
  Package, 
  Calendar, 
  DollarSign, 
  TrendingUp, 
  Star, 
  Users,
  MessageCircle,
  Bell
} from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import Rating from '../ui/Rating';
import { useAuth } from '../../context/AuthContext';
import { useCurrency } from '../../context/CurrencyContext';
import { supabase } from '../../lib/supabase';
import { formatRelativeTime } from '../../utils/format';

const DashboardHome: React.FC = () => {
  const { user } = useAuth();
  const { formatCurrency } = useCurrency();
  const [dashboardData, setDashboardData] = useState({
    bookings: [],
    notifications: [],
    messages: [],
    stats: {
      activeRentals: 0,
      activeBids: 0,
      monthlyEarnings: 0,
      pendingBookings: 0,
      activeTools: 0,
      completedJobs: 0
    }
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadDashboardData();
    }
  }, [user]);

  const loadDashboardData = async () => {
    if (!user) return;

    try {
      setIsLoading(true);
      
      // Load real notifications
      const { data: notifications } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(5);

      // Load real bookings based on user role
      let bookings = [];
      if (user.role === 'owner') {
        const { data: ownerBookings } = await supabase
          .from('bookings')
          .select(`
            *,
            renter:profiles!bookings_renter_id_fkey(*),
            tool:tools(*)
          `)
          .in('tool_id', 
            await supabase
              .from('tools')
              .select('id')
              .eq('owner_id', user.id)
              .then(res => res.data?.map(t => t.id) || [])
          )
          .order('created_at', { ascending: false })
          .limit(5);
        bookings = ownerBookings || [];
      } else if (user.role === 'renter') {
        const { data: renterBookings } = await supabase
          .from('bookings')
          .select(`
            *,
            tool:tools(*),
            renter:profiles!bookings_renter_id_fkey(*)
          `)
          .eq('renter_id', user.id)
          .order('created_at', { ascending: false })
          .limit(5);
        bookings = renterBookings || [];
      }

      // Load recent messages
      const { data: chats } = await supabase
        .from('chats')
        .select(`
          id,
          participants,
          messages!inner(
            content,
            created_at,
            sender_id,
            read
          )
        `)
        .contains('participants', [user.id])
        .order('updated_at', { ascending: false })
        .limit(3);

      // Calculate stats
      const stats = {
        activeRentals: bookings.filter(b => b.status === 'active').length,
        activeBids: 0, // Would need to query bids table
        monthlyEarnings: bookings
          .filter(b => b.status === 'completed' && 
            new Date(b.created_at).getMonth() === new Date().getMonth())
          .reduce((sum, b) => sum + (b.total || 0), 0),
        pendingBookings: bookings.filter(b => b.status === 'pending').length,
        activeTools: 0, // Would need to query tools table
        completedJobs: bookings.filter(b => b.status === 'completed').length
      };

      setDashboardData({
        bookings: bookings || [],
        notifications: notifications || [],
        messages: chats || [],
        stats
      });

    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderRenterDashboard = () => (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6 card-hover bg-gradient-to-br from-blue-50 to-indigo-100 border-0 shadow-xl">
          <div className="flex items-center">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl shadow-lg">
              <Package className="w-6 h-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">{dashboardData.stats.activeRentals}</p>
              <p className="text-sm text-gray-600">Active Rentals</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-6 card-hover bg-gradient-to-br from-green-50 to-emerald-100 border-0 shadow-xl">
          <div className="flex items-center">
            <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl shadow-lg">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">{dashboardData.stats.activeBids}</p>
              <p className="text-sm text-gray-600">Active Bids</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-6 card-hover bg-gradient-to-br from-yellow-50 to-orange-100 border-0 shadow-xl">
          <div className="flex items-center">
            <div className="p-3 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-xl shadow-lg">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(dashboardData.stats.monthlyEarnings)}</p>
              <p className="text-sm text-gray-600">This Month</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-6 card-hover bg-gradient-to-br from-purple-50 to-pink-100 border-0 shadow-xl">
          <div className="flex items-center">
            <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl shadow-lg">
              <Star className="w-6 h-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">{user?.rating?.toFixed(1) || '0.0'}</p>
              <p className="text-sm text-gray-600">Rating</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="card-hover shadow-xl border-0">
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4 gradient-text">Recent Rentals</h3>
            {dashboardData.bookings.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Package size={32} className="mx-auto mb-2 text-gray-300" />
                <p>No recent rentals</p>
              </div>
            ) : (
              <div className="space-y-4">
                {dashboardData.bookings.slice(0, 2).map((booking: any) => (
                  <div key={booking.id} className="flex items-center space-x-4">
                    <img
                      src={booking.tool?.tool_images?.[0]?.image_url || 'https://images.pexels.com/photos/209274/pexels-photo-209274.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=1'}
                      alt="Tool"
                      className="w-12 h-12 rounded-xl object-cover shadow-lg ring-2 ring-purple-200/50"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{booking.tool?.title || 'Unknown Tool'}</p>
                      <p className="text-sm text-gray-600">
                        {formatRelativeTime(booking.created_at)} • {formatCurrency(booking.total)}
                      </p>
                    </div>
                    <Badge variant={booking.status === 'completed' ? 'success' : booking.status === 'active' ? 'info' : 'warning'} className="capitalize shadow-lg">
                      {booking.status}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Card>

        <Card className="card-hover shadow-xl border-0">
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4 gradient-text">Recent Notifications</h3>
            {dashboardData.notifications.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Bell size={32} className="mx-auto mb-2 text-gray-300" />
                <p>No recent notifications</p>
              </div>
            ) : (
              <div className="space-y-4">
                {dashboardData.notifications.slice(0, 3).map((notification: any) => (
                  <div key={notification.id} className="flex items-start space-x-3">
                    <div className={`w-2 h-2 rounded-full mt-2 ${notification.read ? 'bg-gray-300' : 'bg-gradient-to-r from-purple-500 to-pink-500 animate-pulse-glow'}`}></div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 text-sm">{notification.title}</p>
                      <p className="text-xs text-gray-600">{notification.message}</p>
                      <p className="text-xs text-gray-500 mt-1">{formatRelativeTime(notification.created_at)}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );

  const renderOwnerDashboard = () => (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Package className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">{dashboardData.stats.activeTools}</p>
              <p className="text-sm text-gray-600">Active Tools</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg">
              <Calendar className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">{dashboardData.stats.pendingBookings}</p>
              <p className="text-sm text-gray-600">Pending Bookings</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <DollarSign className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(dashboardData.stats.monthlyEarnings)}</p>
              <p className="text-sm text-gray-600">This Month</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Star className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">{user?.rating?.toFixed(1) || '0.0'}</p>
              <p className="text-sm text-gray-600">Avg Rating</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4">Recent Bookings</h3>
            {dashboardData.bookings.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Calendar size={32} className="mx-auto mb-2 text-gray-300" />
                <p>No recent bookings</p>
              </div>
            ) : (
              <div className="space-y-4">
                {dashboardData.bookings.slice(0, 2).map((booking: any) => (
                  <div key={booking.id} className="flex items-center space-x-4">
                    <img
                      src={booking.renter?.avatar_url || 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=48&h=48&dpr=1'}
                      alt="Renter"
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{booking.renter?.name || 'Unknown Renter'}</p>
                      <p className="text-sm text-gray-600">
                        {booking.tool?.title || 'Unknown Tool'} • {booking.duration} days
                      </p>
                    </div>
                    <Badge variant={booking.status === 'completed' ? 'success' : booking.status === 'pending' ? 'warning' : 'info'} className="capitalize">
                      {booking.status}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Card>

        <Card>
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4">Recent Notifications</h3>
            {dashboardData.notifications.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Bell size={32} className="mx-auto mb-2 text-gray-300" />
                <p>No recent notifications</p>
              </div>
            ) : (
              <div className="space-y-4">
                {dashboardData.notifications.slice(0, 3).map((notification: any) => (
                  <div key={notification.id} className="flex items-start space-x-3">
                    <div className={`w-2 h-2 rounded-full mt-2 ${notification.read ? 'bg-gray-300' : 'bg-blue-500'}`}></div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 text-sm">{notification.title}</p>
                      <p className="text-xs text-gray-600">{notification.message}</p>
                      <p className="text-xs text-gray-500 mt-1">{formatRelativeTime(notification.created_at)}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );

  const renderOperatorDashboard = () => (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">{dashboardData.stats.activeRentals}</p>
              <p className="text-sm text-gray-600">Upcoming Jobs</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg">
              <Package className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">{dashboardData.stats.completedJobs}</p>
              <p className="text-sm text-gray-600">Completed Jobs</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <DollarSign className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(dashboardData.stats.monthlyEarnings)}</p>
              <p className="text-sm text-gray-600">This Month</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Star className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">{user?.rating?.toFixed(1) || '0.0'}</p>
              <p className="text-sm text-gray-600">Rating</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4">Upcoming Jobs</h3>
            {dashboardData.bookings.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Calendar size={32} className="mx-auto mb-2 text-gray-300" />
                <p>No upcoming jobs</p>
              </div>
            ) : (
              <div className="space-y-4">
                {dashboardData.bookings.slice(0, 2).map((booking: any) => (
                  <div key={booking.id} className="flex items-center space-x-4">
                    <img
                      src={booking.tool?.tool_images?.[0]?.image_url || 'https://images.pexels.com/photos/1078884/pexels-photo-1078884.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=1'}
                      alt="Equipment"
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{booking.tool?.title || 'Unknown Tool'}</p>
                      <p className="text-sm text-gray-600">
                        {formatRelativeTime(booking.start_date)} • {booking.renter?.name || 'Unknown Renter'}
                      </p>
                    </div>
                    <Badge variant={booking.status === 'confirmed' ? 'info' : 'warning'}>
                      {formatCurrency(booking.total)}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Card>

        <Card>
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4">Recent Notifications</h3>
            {dashboardData.notifications.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Bell size={32} className="mx-auto mb-2 text-gray-300" />
                <p>No recent notifications</p>
              </div>
            ) : (
              <div className="space-y-4">
                {dashboardData.notifications.slice(0, 3).map((notification: any) => (
                  <div key={notification.id} className="flex items-start space-x-3">
                    <div className={`w-2 h-2 rounded-full mt-2 ${notification.read ? 'bg-gray-300' : 'bg-blue-500'}`}></div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 text-sm">{notification.title}</p>
                      <p className="text-xs text-gray-600">{notification.message}</p>
                      <p className="text-xs text-gray-500 mt-1">{formatRelativeTime(notification.created_at)}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );

  const renderDashboard = () => {
    if (isLoading) {
      return (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      );
    }

    switch (user?.role) {
      case 'renter':
        return renderRenterDashboard();
      case 'owner':
        return renderOwnerDashboard();
      case 'operator':
        return renderOperatorDashboard();
      default:
        return <div>Loading...</div>;
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Welcome back, {user?.name}! Here's what's happening with your account.
        </p>
      </div>

      {renderDashboard()}
    </div>
  );
};

export default DashboardHome;