import React, { useState, useEffect } from 'react';
import { Star, ThumbsUp, Flag, Filter, Search } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Badge from '../ui/Badge';
import Rating from '../ui/Rating';
import { useAuth } from '../../context/AuthContext';
import { useCurrency } from '../../context/CurrencyContext';
import { formatRelativeTime } from '../../utils/format';

interface Review {
  id: string;
  type: 'tool' | 'operator' | 'renter' | 'owner';
  targetId: string;
  targetName: string;
  targetImage: string;
  reviewerId: string;
  reviewer: {
    name: string;
    avatar_url: string;
    verified: boolean;
  };
  rating: number;
  comment: string;
  categories: {
    communication: number;
    accuracy: number;
    condition: number;
    value: number;
  };
  photos: string[];
  helpful: number;
  reported: boolean;
  created_at: string;
  isMyReview: boolean;
}

const DashboardReviews: React.FC = () => {
  const { user } = useAuth();
  const { formatCurrency } = useCurrency();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [filteredReviews, setFilteredReviews] = useState<Review[]>([]);
  const [activeTab, setActiveTab] = useState<'received' | 'given'>('received');
  const [filterType, setFilterType] = useState<'all' | 'tool' | 'operator' | 'renter' | 'owner'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadReviews();
    }
  }, [user]);

  useEffect(() => {
    applyFilters();
  }, [reviews, activeTab, filterType, searchQuery]);

  const loadReviews = async () => {
    if (!user) return;

    try {
      setIsLoading(true);
      
      // Mock data for demonstration
      const mockReviews: Review[] = [
        {
          id: '1',
          type: 'tool',
          targetId: 'tool1',
          targetName: 'DeWalt 20V Max Cordless Drill',
          targetImage: 'https://images.pexels.com/photos/209274/pexels-photo-209274.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
          reviewerId: 'user2',
          reviewer: {
            name: 'Sarah Johnson',
            avatar_url: 'https://images.pexels.com/photos/1438761/pexels-photo-1438761.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
            verified: true
          },
          rating: 5,
          comment: 'Excellent drill! Very powerful and the batteries lasted the entire project. The owner was very responsive and helpful throughout the rental process.',
          categories: {
            communication: 5,
            accuracy: 5,
            condition: 5,
            value: 4
          },
          photos: [],
          helpful: 3,
          reported: false,
          created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
          isMyReview: false
        },
        {
          id: '2',
          type: 'renter',
          targetId: 'user2',
          targetName: 'Sarah Johnson',
          targetImage: 'https://images.pexels.com/photos/1438761/pexels-photo-1438761.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
          reviewerId: user.id,
          reviewer: {
            name: user.name,
            avatar_url: user.avatar_url || '',
            verified: true
          },
          rating: 5,
          comment: 'Great renter! Took excellent care of the equipment and returned it in perfect condition. Very communicative throughout the rental period.',
          categories: {
            communication: 5,
            accuracy: 5,
            condition: 5,
            value: 5
          },
          photos: [],
          helpful: 1,
          reported: false,
          created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
          isMyReview: true
        },
        {
          id: '3',
          type: 'tool',
          targetId: 'tool2',
          targetName: 'Compact Excavator - Bobcat E35',
          targetImage: 'https://images.pexels.com/photos/1078884/pexels-photo-1078884.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
          reviewerId: 'user3',
          reviewer: {
            name: 'Mike Wilson',
            avatar_url: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
            verified: true
          },
          rating: 4,
          comment: 'Good excavator for small projects. The operator service was professional and efficient. Only minor issue was a small hydraulic leak, but it didn\'t affect performance.',
          categories: {
            communication: 4,
            accuracy: 4,
            condition: 3,
            value: 4
          },
          photos: [],
          helpful: 2,
          reported: false,
          created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
          isMyReview: false
        },
        {
          id: '4',
          type: 'owner',
          targetId: user.id,
          targetName: user.name,
          targetImage: user.avatar_url || '',
          reviewerId: 'user4',
          reviewer: {
            name: 'John Martinez',
            avatar_url: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
            verified: true
          },
          rating: 5,
          comment: 'Fantastic tool owner! Equipment was exactly as described and in excellent condition. Very fair pricing and flexible with pickup times.',
          categories: {
            communication: 5,
            accuracy: 5,
            condition: 5,
            value: 5
          },
          photos: [],
          helpful: 4,
          reported: false,
          created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(),
          isMyReview: false
        }
      ];

      setReviews(mockReviews);
    } catch (error) {
      console.error('Error loading reviews:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = reviews;

    // Filter by tab (received vs given)
    if (activeTab === 'received') {
      filtered = filtered.filter(review => !review.isMyReview);
    } else {
      filtered = filtered.filter(review => review.isMyReview);
    }

    // Filter by type
    if (filterType !== 'all') {
      filtered = filtered.filter(review => review.type === filterType);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      filtered = filtered.filter(review =>
        review.targetName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        review.reviewer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        review.comment.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredReviews(filtered);
  };

  const handleHelpful = (reviewId: string) => {
    setReviews(prev => prev.map(review =>
      review.id === reviewId
        ? { ...review, helpful: review.helpful + 1 }
        : review
    ));
  };

  const handleReport = (reviewId: string) => {
    setReviews(prev => prev.map(review =>
      review.id === reviewId
        ? { ...review, reported: true }
        : review
    ));
  };

  const getAverageRating = () => {
    const receivedReviews = reviews.filter(review => !review.isMyReview);
    if (receivedReviews.length === 0) return 0;
    return receivedReviews.reduce((sum, review) => sum + review.rating, 0) / receivedReviews.length;
  };

  const getRatingDistribution = () => {
    const receivedReviews = reviews.filter(review => !review.isMyReview);
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    receivedReviews.forEach(review => {
      distribution[review.rating as keyof typeof distribution]++;
    });
    return distribution;
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const averageRating = getAverageRating();
  const ratingDistribution = getRatingDistribution();
  const receivedCount = reviews.filter(r => !r.isMyReview).length;
  const givenCount = reviews.filter(r => r.isMyReview).length;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Reviews</h1>
        <p className="text-gray-600 mt-2">Manage your reviews and feedback</p>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="text-center">
          <div className="p-6">
            <div className="text-3xl font-bold text-gray-900 mb-2">
              {averageRating.toFixed(1)}
            </div>
            <Rating rating={averageRating} size="lg" showNumber={false} />
            <p className="text-sm text-gray-600 mt-2">Average Rating</p>
          </div>
        </Card>
        
        <Card className="text-center">
          <div className="p-6">
            <div className="text-3xl font-bold text-gray-900 mb-2">{receivedCount}</div>
            <p className="text-sm text-gray-600">Reviews Received</p>
          </div>
        </Card>
        
        <Card className="text-center">
          <div className="p-6">
            <div className="text-3xl font-bold text-gray-900 mb-2">{givenCount}</div>
            <p className="text-sm text-gray-600">Reviews Given</p>
          </div>
        </Card>
      </div>

      {/* Rating Distribution */}
      <Card className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Rating Distribution</h3>
        <div className="space-y-2">
          {[5, 4, 3, 2, 1].map(rating => {
            const count = ratingDistribution[rating as keyof typeof ratingDistribution];
            const percentage = receivedCount > 0 ? (count / receivedCount) * 100 : 0;
            
            return (
              <div key={rating} className="flex items-center space-x-3">
                <span className="text-sm font-medium w-8">{rating}</span>
                <Star size={16} className="text-yellow-400 fill-current" />
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-yellow-400 h-2 rounded-full"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="text-sm text-gray-600 w-8">{count}</span>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Filters and Tabs */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0">
        <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setActiveTab('received')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'received'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Received ({receivedCount})
          </button>
          <button
            onClick={() => setActiveTab('given')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'given'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Given ({givenCount})
          </button>
        </div>

        <div className="flex items-center space-x-4">
          <Input
            type="text"
            placeholder="Search reviews..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            leftIcon={<Search size={20} />}
            className="w-64"
          />
          
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value as any)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Types</option>
            <option value="tool">Tools</option>
            <option value="operator">Operators</option>
            <option value="renter">Renters</option>
            <option value="owner">Owners</option>
          </select>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {filteredReviews.length === 0 ? (
          <Card className="text-center py-12">
            <Star size={48} className="mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No reviews found</h3>
            <p className="text-gray-500">
              {activeTab === 'received' 
                ? "You haven't received any reviews yet. Start renting out your tools!"
                : "You haven't given any reviews yet. Complete a rental to leave a review."
              }
            </p>
          </Card>
        ) : (
          filteredReviews.map((review) => (
            <Card key={review.id}>
              <div className="flex items-start space-x-4">
                <img
                  src={review.targetImage || 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1'}
                  alt={review.targetName}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-medium text-gray-900">{review.targetName}</h4>
                      <div className="flex items-center space-x-2 mt-1">
                        <img
                          src={review.reviewer.avatar_url}
                          alt={review.reviewer.name}
                          className="w-6 h-6 rounded-full object-cover"
                        />
                        <span className="text-sm text-gray-600">{review.reviewer.name}</span>
                        {review.reviewer.verified && (
                          <Badge variant="success" size="sm">Verified</Badge>
                        )}
                        <Badge variant="info" size="sm" className="capitalize">
                          {review.type}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <Rating rating={review.rating} size="sm" />
                      <p className="text-xs text-gray-500 mt-1">
                        {formatRelativeTime(review.created_at)}
                      </p>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-4">{review.comment}</p>
                  
                  {/* Category Ratings */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="text-center">
                      <p className="text-xs text-gray-500">Communication</p>
                      <Rating rating={review.categories.communication} size="sm" showNumber={false} />
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-500">Accuracy</p>
                      <Rating rating={review.categories.accuracy} size="sm" showNumber={false} />
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-500">Condition</p>
                      <Rating rating={review.categories.condition} size="sm" showNumber={false} />
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-500">Value</p>
                      <Rating rating={review.categories.value} size="sm" showNumber={false} />
                    </div>
                  </div>
                  
                  {/* Actions */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => handleHelpful(review.id)}
                        className="flex items-center space-x-1 text-sm text-gray-600 hover:text-gray-900"
                      >
                        <ThumbsUp size={16} />
                        <span>Helpful ({review.helpful})</span>
                      </button>
                      
                      {!review.isMyReview && (
                        <button
                          onClick={() => handleReport(review.id)}
                          className={`flex items-center space-x-1 text-sm ${
                            review.reported ? 'text-red-600' : 'text-gray-600 hover:text-red-600'
                          }`}
                          disabled={review.reported}
                        >
                          <Flag size={16} />
                          <span>{review.reported ? 'Reported' : 'Report'}</span>
                        </button>
                      )}
                    </div>
                    
                    {review.isMyReview && (
                      <Button variant="outline" size="sm">
                        Edit Review
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default DashboardReviews;