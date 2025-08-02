import React, { useState, useEffect } from 'react';
import { Calendar, Clock, DollarSign, User, Package, CheckCircle, XCircle, AlertCircle, Eye, MessageCircle } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import Modal from '../ui/Modal';
import { useAuth } from '../../context/AuthContext';
import { useCurrency } from '../../context/CurrencyContext';
import { formatDate, formatRelativeTime } from '../../utils/format';

interface Booking {
  id: string;
  renter: {
    id: string;
    name: string;
    avatar_url: string;
    rating: number;
    verified: boolean;
  };
  tool: {
    id: string;
    title: string;
    image: string;
    daily_rate: number;
  };
  start_date: string;
  end_date: string;
  duration: number;
  status: 'pending' | 'confirmed' | 'active' | 'completed' | 'cancelled';
  total: number;
  deposit: number;
  created_at: string;
  message?: string;
}

const DashboardBookings: React.FC = () => {
  const { user } = useAuth();
  const { formatCurrency } = useCurrency();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'confirmed' | 'active' | 'completed'>('all');

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    setIsLoading(true);
    try {
      // Mock booking data
      const mockBookings: Booking[] = [
        {
          id: '1',
          renter: {
            id: 'user2',
            name: 'Sarah Johnson',
            avatar_url: 'https://images.pexels.com/photos/1438761/pexels-photo-1438761.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
            rating: 4.9,
            verified: true
          },
          tool: {
            id: 'tool1',
            title: 'DeWalt 20V Max Cordless Drill',
            image: 'https://images.pexels.com/photos/209274/pexels-photo-209274.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
            daily_rate: 45
          },
          start_date: '2024-02-15',
          end_date: '2024-02-17',
          duration: 2,
          status: 'pending',
          total: 126,
          deposit: 100,
          created_at: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
          message: 'Hi! I need this drill for a weekend home renovation project. I have experience with power tools and will take good care of it.'
        },
        {
          id: '2',
          renter: {
            id: 'user3',
            name: 'Mike Wilson',
            avatar_url: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
            rating: 4.8,
            verified: true
          },
          tool: {
            id: 'tool2',
            title: 'Compact Excavator - Bobcat E35',
            image: 'https://images.pexels.com/photos/1078884/pexels-photo-1078884.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
            daily_rate: 320
          },
          start_date: '2024-02-20',
          end_date: '2024-02-22',
          duration: 2,
          status: 'confirmed',
          total: 890,
          deposit: 1500,
          created_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString()
        },
        {
          id: '3',
          renter: {
            id: 'user4',
            name: 'John Martinez',
            avatar_url: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
            rating: 4.7,
            verified: false
          },
          tool: {
            id: 'tool3',
            title: 'Professional Tile Saw',
            image: 'https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
            daily_rate: 85
          },
          start_date: '2024-02-10',
          end_date: '2024-02-12',
          duration: 2,
          status: 'completed',
          total: 195,
          deposit: 200,
          created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString()
        }
      ];

      setBookings(mockBookings);
    } catch (error) {
      console.error('Error loading bookings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBookingAction = async (bookingId: string, action: 'approve' | 'decline') => {
    try {
      setBookings(prev => prev.map(booking => 
        booking.id === bookingId 
          ? { ...booking, status: action === 'approve' ? 'confirmed' : 'cancelled' }
          : booking
      ));
      
      alert(`Booking ${action === 'approve' ? 'approved' : 'declined'} successfully!`);
      setIsDetailModalOpen(false);
    } catch (error) {
      console.error('Error updating booking:', error);
      alert('Failed to update booking. Please try again.');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'warning';
      case 'confirmed': return 'info';
      case 'active': return 'success';
      case 'completed': return 'success';
      case 'cancelled': return 'error';
      default: return 'default';
    }
  };

  const filteredBookings = activeTab === 'all' 
    ? bookings 
    : bookings.filter(booking => booking.status === activeTab);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Booking Requests</h1>
        <p className="text-gray-600 mt-2">Manage rental requests for your tools</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="text-center p-6">
          <AlertCircle className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
          <p className="text-2xl font-bold text-gray-900">
            {bookings.filter(b => b.status === 'pending').length}
          </p>
          <p className="text-sm text-gray-600">Pending</p>
        </Card>
        
        <Card className="text-center p-6">
          <CheckCircle className="w-8 h-8 text-blue-500 mx-auto mb-2" />
          <p className="text-2xl font-bold text-gray-900">
            {bookings.filter(b => b.status === 'confirmed').length}
          </p>
          <p className="text-sm text-gray-600">Confirmed</p>
        </Card>
        
        <Card className="text-center p-6">
          <Clock className="w-8 h-8 text-green-500 mx-auto mb-2" />
          <p className="text-2xl font-bold text-gray-900">
            {bookings.filter(b => b.status === 'active').length}
          </p>
          <p className="text-sm text-gray-600">Active</p>
        </Card>
        
        <Card className="text-center p-6">
          <Package className="w-8 h-8 text-purple-500 mx-auto mb-2" />
          <p className="text-2xl font-bold text-gray-900">
            {bookings.filter(b => b.status === 'completed').length}
          </p>
          <p className="text-sm text-gray-600">Completed</p>
        </Card>
      </div>

      {/* Filter Tabs */}
      <div className="flex space-x-1 bg-gray-100 rounded-lg p-1 mb-6">
        {['all', 'pending', 'confirmed', 'active', 'completed'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors capitalize ${
              activeTab === tab
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab} ({tab === 'all' ? bookings.length : bookings.filter(b => b.status === tab).length})
          </button>
        ))}
      </div>

      {/* Bookings List */}
      <div className="space-y-4">
        {filteredBookings.length === 0 ? (
          <Card className="text-center py-12">
            <Package size={48} className="mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No bookings found</h3>
            <p className="text-gray-500">
              {activeTab === 'all' 
                ? "You don't have any booking requests yet."
                : `No ${activeTab} bookings at the moment.`
              }
            </p>
          </Card>
        ) : (
          filteredBookings.map((booking) => (
            <Card key={booking.id} className="hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <img
                    src={booking.tool.image}
                    alt={booking.tool.title}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{booking.tool.title}</h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                      <div className="flex items-center">
                        <img
                          src={booking.renter.avatar_url}
                          alt={booking.renter.name}
                          className="w-6 h-6 rounded-full object-cover mr-2"
                        />
                        <span>{booking.renter.name}</span>
                        {booking.renter.verified && (
                          <CheckCircle size={14} className="text-green-500 ml-1" />
                        )}
                      </div>
                      <span className="flex items-center">
                        <Calendar size={14} className="mr-1" />
                        {formatDate(booking.start_date)} - {formatDate(booking.end_date)}
                      </span>
                      <span className="flex items-center">
                        <Clock size={14} className="mr-1" />
                        {booking.duration} days
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">
                      {formatCurrency(booking.total)}
                    </p>
                    <p className="text-sm text-gray-600">
                      {formatRelativeTime(booking.created_at)}
                    </p>
                  </div>
                  
                  <Badge variant={getStatusColor(booking.status) as any} className="capitalize">
                    {booking.status}
                  </Badge>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedBooking(booking);
                      setIsDetailModalOpen(true);
                    }}
                  >
                    <Eye size={16} className="mr-1" />
                    View
                  </Button>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>

      {/* Booking Detail Modal */}
      <Modal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        title="Booking Details"
        size="lg"
      >
        {selectedBooking && (
          <div className="space-y-6">
            {/* Tool and Renter Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Tool</h4>
                <div className="flex items-center space-x-3">
                  <img
                    src={selectedBooking.tool.image}
                    alt={selectedBooking.tool.title}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div>
                    <p className="font-medium text-gray-900">{selectedBooking.tool.title}</p>
                    <p className="text-sm text-gray-600">
                      {formatCurrency(selectedBooking.tool.daily_rate)}/day
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Renter</h4>
                <div className="flex items-center space-x-3">
                  <img
                    src={selectedBooking.renter.avatar_url}
                    alt={selectedBooking.renter.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <div className="flex items-center space-x-2">
                      <p className="font-medium text-gray-900">{selectedBooking.renter.name}</p>
                      {selectedBooking.renter.verified && (
                        <CheckCircle size={16} className="text-green-500" />
                      )}
                    </div>
                    <p className="text-sm text-gray-600">
                      ⭐ {selectedBooking.renter.rating} rating
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Booking Details */}
            <div className="grid grid-cols-2 gap-4 py-4 border-t border-b">
              <div>
                <p className="text-sm text-gray-600">Start Date</p>
                <p className="font-medium">{formatDate(selectedBooking.start_date)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">End Date</p>
                <p className="font-medium">{formatDate(selectedBooking.end_date)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Duration</p>
                <p className="font-medium">{selectedBooking.duration} days</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Status</p>
                <Badge variant={getStatusColor(selectedBooking.status) as any} className="capitalize">
                  {selectedBooking.status}
                </Badge>
              </div>
            </div>

            {/* Pricing */}
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Tool rental ({selectedBooking.duration} days)</span>
                <span>{formatCurrency(selectedBooking.tool.daily_rate * selectedBooking.duration)}</span>
              </div>
              <div className="flex justify-between">
                <span>Platform fee</span>
                <span>{formatCurrency(selectedBooking.total * 0.1)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>{formatCurrency(selectedBooking.total * 0.08)}</span>
              </div>
              <div className="flex justify-between font-semibold text-lg border-t pt-2">
                <span>Total</span>
                <span>{formatCurrency(selectedBooking.total)}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Security Deposit</span>
                <span>{formatCurrency(selectedBooking.deposit)}</span>
              </div>
            </div>

            {/* Message */}
            {selectedBooking.message && (
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Message from Renter</h4>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700">{selectedBooking.message}</p>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex space-x-4">
              {selectedBooking.status === 'pending' && (
                <>
                  <Button
                    variant="outline"
                    onClick={() => handleBookingAction(selectedBooking.id, 'decline')}
                    className="flex-1"
                  >
                    <XCircle size={16} className="mr-2" />
                    Decline
                  </Button>
                  <Button
                    onClick={() => handleBookingAction(selectedBooking.id, 'approve')}
                    className="flex-1"
                  >
                    <CheckCircle size={16} className="mr-2" />
                    Approve
                  </Button>
                </>
              )}
              
              <Button
                variant="outline"
                onClick={() => {
                  // Navigate to messages
                  window.location.href = '/dashboard/messages';
                }}
              >
                <MessageCircle size={16} className="mr-2" />
                Message Renter
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default DashboardBookings;