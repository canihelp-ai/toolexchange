import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Heart, 
  Share2, 
  Flag, 
  Star, 
  MapPin, 
  Calendar, 
  Shield, 
  Wrench, 
  Clock, 
  Check, 
  X,
  ChevronLeft,
  ChevronRight,
  User,
  Phone,
  Mail,
  MessageCircle,
  DollarSign,
  Info
} from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import Rating from '../ui/Rating';
import Modal from '../ui/Modal';
import Input from '../ui/Input';
import { Tool } from '../../types';
import { formatCurrency, formatDate } from '../../utils/format';
import { supabase } from '../../lib/supabase';

const ToolDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [tool, setTool] = useState<Tool | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isRentModalOpen, setIsRentModalOpen] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  
  // Rental form state
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [includeOperator, setIncludeOperator] = useState(false);
  const [includeInsurance, setIncludeInsurance] = useState(false);
  const [insuranceType, setInsuranceType] = useState<'basic' | 'premium'>('basic');
  const [bidAmount, setBidAmount] = useState('');

  useEffect(() => {
    if (id) {
      loadTool(id);
    }
  }, [id]);

  const loadTool = async (toolId: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase
        .from('tools')
        .select(`
          *,
          owner:profiles!tools_owner_id_fkey(*),
          tool_images(*),
          tool_availability(*),
          operator:operators(*, profile:profiles(*))
        `)
        .eq('id', toolId)
        .single();

      if (error) {
        console.error('Error loading tool:', error);
        setError(`Failed to load tool: ${error.message}`);
      } else if (data) {
        const transformedTool = transformTool(data);
        setTool(transformedTool);
      }
    } catch (error) {
      console.error('Error loading tool:', error);
      setError(`Failed to load tool: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  };

  const transformTool = (dbTool: any): Tool => ({
    id: dbTool.id,
    ownerId: dbTool.owner_id,
    owner: {
      id: dbTool.owner.id,
      email: dbTool.owner.email,
      name: dbTool.owner.name,
      phone: dbTool.owner.phone,
      avatar: dbTool.owner.avatar_url || 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
      location: dbTool.owner.location,
      bio: dbTool.owner.bio,
      role: dbTool.owner.role,
      verified: {
        email: dbTool.owner.email_verified,
        phone: dbTool.owner.phone_verified,
        id: dbTool.owner.id_verified,
      },
      rating: dbTool.owner.rating,
      reviewCount: dbTool.owner.review_count,
      memberSince: dbTool.owner.member_since,
      trustScore: dbTool.owner.trust_score,
    },
    title: dbTool.title,
    description: dbTool.description,
    category: dbTool.category,
    brand: dbTool.brand,
    model: dbTool.model,
    images: dbTool.tool_images?.map((img: any) => img.image_url) || ['https://images.pexels.com/photos/209274/pexels-photo-209274.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1'],
    location: dbTool.location,
    condition: dbTool.condition,
    specifications: dbTool.specifications || {},
    pricing: {
      type: dbTool.pricing_type,
      hourly: dbTool.hourly_rate,
      daily: dbTool.daily_rate,
      weekly: dbTool.weekly_rate,
      currentBid: dbTool.current_bid,
      suggestedBid: dbTool.suggested_bid,
    },
    availability: {
      startDate: dbTool.tool_availability?.[0]?.start_date || '',
      endDate: dbTool.tool_availability?.[0]?.end_date || '',
      blockedDates: dbTool.tool_availability?.[0]?.blocked_dates || [],
    },
    operatorSupport: {
      available: dbTool.operator_available,
      required: dbTool.operator_required,
      rate: dbTool.operator_rate,
    },
    insurance: {
      available: dbTool.insurance_available,
      basicCoverage: dbTool.basic_coverage,
      premiumCoverage: dbTool.premium_coverage,
    },
    rating: dbTool.rating,
    reviewCount: dbTool.review_count,
    features: dbTool.features || [],
    rules: dbTool.rules || [],
    deposit: dbTool.deposit,
    createdAt: dbTool.created_at,
    updatedAt: dbTool.updated_at,
    status: dbTool.status,
    views: dbTool.views,
    favorites: dbTool.favorites,
  });

  const calculateDuration = () => {
    if (!startDate || !endDate) return 0;
    const start = new Date(startDate);
    const end = new Date(endDate);
    return Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  };

  const calculateTotal = () => {
    const duration = calculateDuration();
    if (duration <= 0 || !tool) return 0;

    let total = tool.pricing.daily * duration;
    
    if (includeOperator && tool.operatorSupport.rate) {
      total += tool.operatorSupport.rate * duration * 8; // 8 hours per day
    }
    
    if (includeInsurance) {
      const insuranceCost = insuranceType === 'premium' 
        ? tool.insurance.premiumCoverage 
        : tool.insurance.basicCoverage;
      total += insuranceCost * duration;
    }

    const platformFee = total * 0.1; // 10% platform fee
    const tax = total * 0.08; // 8% tax
    
    return total + platformFee + tax;
  };

  const handleRent = () => {
    // Here you would typically create a booking
    console.log('Creating booking:', {
      toolId: tool?.id,
      startDate,
      endDate,
      duration: calculateDuration(),
      includeOperator,
      includeInsurance,
      insuranceType,
      total: calculateTotal()
    });
    setIsRentModalOpen(false);
    // Navigate to booking confirmation or payment page
  };

  const handleBid = () => {
    if (bidAmount && parseFloat(bidAmount) > 0 && tool) {
      console.log('Placing bid:', tool.id, parseFloat(bidAmount));
      // Here you would create a bid
    }
  };

  const nextImage = () => {
    if (tool && tool.images.length > 1) {
      setSelectedImageIndex((prev) => (prev + 1) % tool.images.length);
    }
  };

  const prevImage = () => {
    if (tool && tool.images.length > 1) {
      setSelectedImageIndex((prev) => (prev - 1 + tool.images.length) % tool.images.length);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !tool) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="p-8 text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Tool Not Found</h2>
          <p className="text-gray-600 mb-4">{error || 'The requested tool could not be found.'}</p>
          <Button onClick={() => navigate('/')}>Return to Homepage</Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with back button */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            leftIcon={<ArrowLeft size={20} />}
          >
            Back to Tools
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Images and Details */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <div className="mb-6">
              <div className="relative aspect-video bg-gray-200 rounded-lg overflow-hidden mb-4">
                <img
                  src={tool.images[selectedImageIndex]}
                  alt={tool.title}
                  className="w-full h-full object-cover"
                />
                {tool.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-opacity"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-opacity"
                    >
                      <ChevronRight size={20} />
                    </button>
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                      {selectedImageIndex + 1} / {tool.images.length}
                    </div>
                  </>
                )}
              </div>
              
              {tool.images.length > 1 && (
                <div className="flex space-x-2 overflow-x-auto">
                  {tool.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                        selectedImageIndex === index ? 'border-blue-500' : 'border-gray-200'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${tool.title} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Tool Info */}
            <div className="space-y-6">
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{tool.title}</h1>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span className="flex items-center">
                        <MapPin size={16} className="mr-1" />
                        {tool.location} (Exact location shared after booking)
                      </span>
                      <span className="flex items-center">
                        <Calendar size={16} className="mr-1" />
                        Available {formatDate(tool.availability.startDate)}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm">
                      <Share2 size={16} />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => setIsFavorited(!isFavorited)}
                    >
                      <Heart size={16} className={isFavorited ? 'fill-red-500 text-red-500' : ''} />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Flag size={16} />
                    </Button>
                  </div>
                </div>

                <div className="flex items-center space-x-4 mb-4">
                  <Rating rating={tool.rating} />
                  <span className="text-sm text-gray-600">
                    ({tool.reviewCount} reviews)
                  </span>
                  <div className="flex space-x-2">
                    {tool.insurance.available && (
                      <Badge variant="success">
                        <Shield size={12} className="mr-1" />
                        Insurance Available
                      </Badge>
                    )}
                    {tool.operatorSupport.available && (
                      <Badge variant="info">
                        <Wrench size={12} className="mr-1" />
                        Operator Available
                      </Badge>
                    )}
                  </div>
                </div>

                <p className="text-gray-700 text-lg leading-relaxed">
                  {tool.description}
                </p>
              </div>

              {/* Specifications */}
              <Card>
                <h3 className="text-lg font-semibold mb-4">Specifications</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Brand</p>
                    <p className="text-gray-900">{tool.brand}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Model</p>
                    <p className="text-gray-900">{tool.model}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Condition</p>
                    <p className="text-gray-900 capitalize">{tool.condition}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Category</p>
                    <p className="text-gray-900">{tool.category}</p>
                  </div>
                  {Object.entries(tool.specifications).map(([key, value]) => (
                    <div key={key}>
                      <p className="text-sm font-medium text-gray-600">{key}</p>
                      <p className="text-gray-900">{value}</p>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Features */}
              {tool.features.length > 0 && (
                <Card>
                  <h3 className="text-lg font-semibold mb-4">Features</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {tool.features.map((feature, index) => (
                      <div key={index} className="flex items-center">
                        <Check size={16} className="text-green-600 mr-2" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              )}

              {/* Rules */}
              {tool.rules.length > 0 && (
                <Card>
                  <h3 className="text-lg font-semibold mb-4">Rental Rules</h3>
                  <div className="space-y-2">
                    {tool.rules.map((rule, index) => (
                      <div key={index} className="flex items-start">
                        <X size={16} className="text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{rule}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              )}

              {/* Location Map Placeholder */}
              <Card>
                <h3 className="text-lg font-semibold mb-4">General Location</h3>
                <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin size={48} className="text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-600 font-medium">General Area: {tool.location}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      Exact location will be shared after booking confirmation
                    </p>
                  </div>
                </div>
              </Card>

              {/* Owner Info */}
              <Card>
                <h3 className="text-lg font-semibold mb-4">Tool Owner</h3>
                <div className="flex items-center space-x-4">
                  <img
                    src={tool.owner.avatar}
                    alt={tool.owner.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{tool.owner.name}</h4>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Rating rating={tool.owner.rating} size="sm" />
                      <span>({tool.owner.reviewCount} reviews)</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      Member since {formatDate(tool.owner.memberSince)}
                    </p>
                    {tool.owner.bio && (
                      <p className="text-sm text-gray-700 mt-2">{tool.owner.bio}</p>
                    )}
                  </div>
                  <div className="flex flex-col space-y-2">
                    <Button variant="outline" size="sm">
                      <MessageCircle size={16} className="mr-1" />
                      Message
                    </Button>
                    <Button variant="outline" size="sm">
                      <User size={16} className="mr-1" />
                      Profile
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Right Column - Booking Panel */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <div className="space-y-6">
                {/* Pricing */}
                <div>
                  {tool.pricing.type === 'fixed' ? (
                    <div className="text-center">
                      <p className="text-3xl font-bold text-green-600">
                        {formatCurrency(tool.pricing.daily)}
                      </p>
                      <p className="text-gray-600">per day</p>
                      {tool.pricing.weekly && (
                        <p className="text-sm text-gray-500 mt-1">
                          {formatCurrency(tool.pricing.weekly)} per week
                        </p>
                      )}
                    </div>
                  ) : (
                    <div className="text-center">
                      <p className="text-3xl font-bold text-orange-600">
                        {formatCurrency(tool.pricing.currentBid || 0)}
                      </p>
                      <p className="text-gray-600">current bid</p>
                      <p className="text-sm text-gray-500 mt-1">
                        Suggested: {formatCurrency(tool.pricing.suggestedBid || 0)}
                      </p>
                    </div>
                  )}
                </div>

                {/* Quick Info */}
                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Deposit Required</span>
                    <span className="font-medium">{formatCurrency(tool.deposit)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Views</span>
                    <span className="font-medium">{tool.views}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Favorites</span>
                    <span className="font-medium">{tool.favorites}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  {tool.pricing.type === 'fixed' ? (
                    <Button
                      onClick={() => setIsRentModalOpen(true)}
                      className="w-full"
                      size="lg"
                    >
                      <Calendar size={18} className="mr-2" />
                      Rent This Tool
                    </Button>
                  ) : (
                    <div className="space-y-3">
                      <Input
                        type="number"
                        placeholder="Enter bid amount"
                        value={bidAmount}
                        onChange={(e) => setBidAmount(e.target.value)}
                        leftIcon={<DollarSign size={16} />}
                      />
                      <Button
                        onClick={handleBid}
                        className="w-full"
                        size="lg"
                        disabled={!bidAmount || parseFloat(bidAmount) <= 0}
                      >
                        Place Bid
                      </Button>
                    </div>
                  )}
                  
                  <Button
                    variant="outline"
                    className="w-full"
                    leftIcon={<MessageCircle size={16} />}
                  >
                    Contact Owner
                  </Button>
                </div>

                {/* Additional Info */}
                <div className="text-center text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-center justify-center mb-1">
                    <Info size={16} className="mr-1" />
                    <span className="font-medium">Booking Protection</span>
                  </div>
                  <p>Secure payments, insurance options, and 24/7 support</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Rental Modal */}
      <Modal
        isOpen={isRentModalOpen}
        onClose={() => setIsRentModalOpen(false)}
        title="Rent This Tool"
        size="lg"
      >
        <div className="space-y-6">
          {/* Date Selection */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Date
              </label>
              <Input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                End Date
              </label>
              <Input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>

          {/* Duration Display */}
          {calculateDuration() > 0 && (
            <div className="text-center py-2 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">
                <Clock size={16} className="inline mr-1" />
                {calculateDuration()} days
              </p>
            </div>
          )}

          {/* Options */}
          {tool.operatorSupport.available && (
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={includeOperator}
                  onChange={(e) => setIncludeOperator(e.target.checked)}
                  className="mr-2"
                />
                <span className="text-sm font-medium text-gray-700">
                  Include Operator
                </span>
              </label>
              <span className="text-sm font-medium text-gray-900">
                {formatCurrency(tool.operatorSupport.rate || 0)}/hr
              </span>
            </div>
          )}

          {tool.insurance.available && (
            <div className="space-y-3">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={includeInsurance}
                  onChange={(e) => setIncludeInsurance(e.target.checked)}
                  className="mr-2"
                />
                <span className="text-sm font-medium text-gray-700">
                  Include Insurance
                </span>
              </div>
              {includeInsurance && (
                <div className="space-y-2 ml-6">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="insurance"
                      value="basic"
                      checked={insuranceType === 'basic'}
                      onChange={(e) => setInsuranceType(e.target.value as 'basic' | 'premium')}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-700">
                      Basic Coverage - {formatCurrency(tool.insurance.basicCoverage)}/day
                    </span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="insurance"
                      value="premium"
                      checked={insuranceType === 'premium'}
                      onChange={(e) => setInsuranceType(e.target.value as 'basic' | 'premium')}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-700">
                      Premium Coverage - {formatCurrency(tool.insurance.premiumCoverage)}/day
                    </span>
                  </label>
                </div>
              )}
            </div>
          )}

          {/* Cost Breakdown */}
          {calculateDuration() > 0 && (
            <div className="space-y-2 text-sm border-t pt-4">
              <div className="flex justify-between">
                <span>Tool rental ({calculateDuration()} days)</span>
                <span>{formatCurrency(tool.pricing.daily * calculateDuration())}</span>
              </div>
              {includeOperator && tool.operatorSupport.rate && (
                <div className="flex justify-between">
                  <span>Operator service</span>
                  <span>{formatCurrency(tool.operatorSupport.rate * calculateDuration() * 8)}</span>
                </div>
              )}
              {includeInsurance && (
                <div className="flex justify-between">
                  <span>Insurance ({insuranceType})</span>
                  <span>{formatCurrency((insuranceType === 'premium' ? tool.insurance.premiumCoverage : tool.insurance.basicCoverage) * calculateDuration())}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Platform fee (10%)</span>
                <span>{formatCurrency(calculateTotal() * 0.1)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax (8%)</span>
                <span>{formatCurrency(calculateTotal() * 0.08)}</span>
              </div>
              <hr />
              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>{formatCurrency(calculateTotal())}</span>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex space-x-4">
            <Button
              variant="outline"
              onClick={() => setIsRentModalOpen(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={handleRent}
              className="flex-1"
              disabled={!startDate || !endDate || calculateDuration() <= 0}
            >
              Confirm Rental
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ToolDetailPage;