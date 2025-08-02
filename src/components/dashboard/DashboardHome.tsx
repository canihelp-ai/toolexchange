import React from 'react';
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

const DashboardHome: React.FC = () => {
  const { user } = useAuth();
  const { formatCurrency } = useCurrency();

  const renderRenterDashboard = () => (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Package className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">3</p>
              <p className="text-sm text-gray-600">Active Rentals</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">7</p>
              <p className="text-sm text-gray-600">Active Bids</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <DollarSign className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(245)}</p>
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
              <p className="text-2xl font-bold text-gray-900">4.9</p>
              <p className="text-sm text-gray-600">Rating</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4">Recent Rentals</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <img
                  src="https://images.pexels.com/photos/209274/pexels-photo-209274.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=1"
                  alt="Tool"
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <p className="font-medium text-gray-900">DeWalt Cordless Drill</p>
                  <p className="text-sm text-gray-600">Jan 25-27 • John Martinez</p>
                </div>
                <Badge variant="success">Completed</Badge>
              </div>
              <div className="flex items-center space-x-4">
                <img
                  src="https://images.pexels.com/photos/1078884/pexels-photo-1078884.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=1"
                  alt="Tool"
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <p className="font-medium text-gray-900">Compact Excavator</p>
                  <p className="text-sm text-gray-600">Feb 1-3 • John Martinez</p>
                </div>
                <Badge variant="info">Active</Badge>
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4">Active Bids</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <img
                  src="https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=1"
                  alt="Tool"
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <p className="font-medium text-gray-900">Tile Saw</p>
                  <p className="text-sm text-gray-600">Your bid: {formatCurrency(75)}</p>
                </div>
                <Badge variant="success">Leading</Badge>
              </div>
              <div className="flex items-center space-x-4">
                <img
                  src="https://images.pexels.com/photos/209274/pexels-photo-209274.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=1"
                  alt="Tool"
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <p className="font-medium text-gray-900">Angle Grinder</p>
                  <p className="text-sm text-gray-600">Your bid: {formatCurrency(25)}</p>
                </div>
                <Badge variant="warning">Outbid</Badge>
              </div>
            </div>
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
              <p className="text-2xl font-bold text-gray-900">12</p>
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
              <p className="text-2xl font-bold text-gray-900">5</p>
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
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(1248)}</p>
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
              <p className="text-2xl font-bold text-gray-900">4.8</p>
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
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <img
                  src="https://images.pexels.com/photos/1438761/pexels-photo-1438761.jpeg?auto=compress&cs=tinysrgb&w=48&h=48&dpr=1"
                  alt="Renter"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <p className="font-medium text-gray-900">Sarah Johnson</p>
                  <p className="text-sm text-gray-600">DeWalt Drill • 3 days</p>
                </div>
                <Badge variant="success">{formatCurrency(135)}</Badge>
              </div>
              <div className="flex items-center space-x-4">
                <img
                  src="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=48&h=48&dpr=1"
                  alt="Renter"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <p className="font-medium text-gray-900">Mike Wilson</p>
                  <p className="text-sm text-gray-600">Excavator • 2 days</p>
                </div>
                <Badge variant="info">Pending</Badge>
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4">Top Performing Tools</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <img
                  src="https://images.pexels.com/photos/209274/pexels-photo-209274.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=1"
                  alt="Tool"
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <p className="font-medium text-gray-900">DeWalt Cordless Drill</p>
                  <p className="text-sm text-gray-600">15 bookings • {formatCurrency(675)} earned</p>
                </div>
                <Rating rating={4.9} size="sm" showNumber={false} />
              </div>
              <div className="flex items-center space-x-4">
                <img
                  src="https://images.pexels.com/photos/1078884/pexels-photo-1078884.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=1"
                  alt="Tool"
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <p className="font-medium text-gray-900">Compact Excavator</p>
                  <p className="text-sm text-gray-600">8 bookings • {formatCurrency(2560)} earned</p>
                </div>
                <Rating rating={4.8} size="sm" showNumber={false} />
              </div>
            </div>
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
              <p className="text-2xl font-bold text-gray-900">4</p>
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
              <p className="text-2xl font-bold text-gray-900">124</p>
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
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(2400)}</p>
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
              <p className="text-2xl font-bold text-gray-900">4.9</p>
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
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <img
                  src="https://images.pexels.com/photos/1078884/pexels-photo-1078884.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=1"
                  alt="Equipment"
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <p className="font-medium text-gray-900">Excavator Operation</p>
                  <p className="text-sm text-gray-600">Feb 1-3 • John Martinez</p>
                </div>
                <Badge variant="info">{formatCurrency(600)}</Badge>
              </div>
              <div className="flex items-center space-x-4">
                <img
                  src="https://images.pexels.com/photos/209274/pexels-photo-209274.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=1"
                  alt="Equipment"
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <p className="font-medium text-gray-900">Concrete Cutting</p>
                  <p className="text-sm text-gray-600">Feb 5 • Sarah Johnson</p>
                </div>
                <Badge variant="warning">{formatCurrency(300)}</Badge>
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4">Available Opportunities</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <img
                  src="https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=1"
                  alt="Tool"
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <p className="font-medium text-gray-900">Tile Cutting Service</p>
                  <p className="text-sm text-gray-600">Feb 10 • 1 day</p>
                </div>
                <Button size="sm" variant="outline">Apply</Button>
              </div>
              <div className="flex items-center space-x-4">
                <img
                  src="https://images.pexels.com/photos/1078884/pexels-photo-1078884.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=1"
                  alt="Tool"
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <p className="font-medium text-gray-900">Heavy Equipment Op</p>
                  <p className="text-sm text-gray-600">Feb 15-17 • 3 days</p>
                </div>
                <Button size="sm" variant="outline">Apply</Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );

  const renderDashboard = () => {
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