import React, { useState } from 'react';
import { Heart, Share2, Flag, Star, MapPin, Calendar, Shield, Wrench, Clock, Check, X } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import Rating from '../ui/Rating';
import { Tool, Booking } from '../../types';
import { formatCurrency, formatDate } from '../../utils/format';

interface ToolDetailProps {
  tool: Tool;
  onBook: (booking: Partial<Booking>) => void;
  onBid: (toolId: string, amount: number) => void;
}

const ToolDetail: React.FC<ToolDetailProps> = ({ tool, onBook, onBid }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [includeOperator, setIncludeOperator] = useState(false);
  const [includeInsurance, setIncludeInsurance] = useState(false);
  const [insuranceType, setInsuranceType] = useState<'basic' | 'premium'>('basic');
  const [bidAmount, setBidAmount] = useState('');

  const calculateDuration = () => {
    if (!startDate || !endDate) return 0;
    const start = new Date(startDate);
    const end = new Date(endDate);
    return Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  };

  const calculateTotal = () => {
    const duration = calculateDuration();
    if (duration <= 0) return 0;

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

  const handleBook = () => {
    const booking: Partial<Booking> = {
      toolId: tool.id,
      startDate,
      endDate,
      duration: calculateDuration(),
      operatorId: includeOperator ? tool.operatorSupport.operatorId : undefined,
      insurance: {
        selected: includeInsurance,
        type: insuranceType,
        coverage: insuranceType === 'premium' 
          ? tool.insurance.premiumCoverage 
          : tool.insurance.basicCoverage,
      },
      pricing: {
        toolCost: tool.pricing.daily * calculateDuration(),
        operatorCost: includeOperator && tool.operatorSupport.rate 
          ? tool.operatorSupport.rate * calculateDuration() * 8 
          : 0,
        insuranceCost: includeInsurance 
          ? (insuranceType === 'premium' ? tool.insurance.premiumCoverage : tool.insurance.basicCoverage) * calculateDuration()
          : 0,
        platformFee: calculateTotal() * 0.1,
        tax: calculateTotal() * 0.08,
        total: calculateTotal(),
      },
    };
    
    onBook(booking);
  };

  const handleBid = () => {
    if (bidAmount && parseFloat(bidAmount) > 0) {
      onBid(tool.id, parseFloat(bidAmount));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Images and Details */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <div className="mb-6">
              <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden mb-4">
                <img
                  src={tool.images[selectedImageIndex]}
                  alt={tool.title}
                  className="w-full h-full object-cover"
                />
              </div>
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
                        {tool.location}
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
                    <Button variant="ghost" size="sm">
                      <Heart size={16} />
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

              {/* Rules */}
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

              {/* Owner Info */}
              <Card>
                <h3 className="text-lg font-semibold mb-4">Owner</h3>
                <div className="flex items-center space-x-4">
                  <img
                    src={tool.owner.avatar}
                    alt={tool.owner.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-medium text-gray-900">{tool.owner.name}</h4>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Rating rating={tool.owner.rating} size="sm" />
                      <span>({tool.owner.reviewCount} reviews)</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      Member since {formatDate(tool.owner.memberSince)}
                    </p>
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

                {/* Date Selection */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Start Date
                    </label>
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      End Date
                    </label>
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* Duration */}
                {calculateDuration() > 0 && (
                  <div className="text-center py-2 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600">
                      <Clock size={16} className="inline mr-1" />
                      {calculateDuration()} days
                    </p>
                  </div>
                )}

                {/* Operator Option */}
                {tool.operatorSupport.available && (
                  <div className="space-y-3">
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
                    {includeOperator && tool.operatorSupport.operator && (
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <img
                            src={tool.operatorSupport.operator.profile.avatar}
                            alt={tool.operatorSupport.operator.profile.name}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              {tool.operatorSupport.operator.profile.name}
                            </p>
                            <Rating rating={tool.operatorSupport.operator.rating} size="sm" />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Insurance Option */}
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
                      <div className="space-y-2">
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

                {/* Bidding or Booking */}
                {tool.pricing.type === 'bidding' ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Your Bid
                      </label>
                      <input
                        type="number"
                        value={bidAmount}
                        onChange={(e) => setBidAmount(e.target.value)}
                        placeholder="Enter bid amount"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <Button
                      onClick={handleBid}
                      className="w-full"
                      disabled={!bidAmount || parseFloat(bidAmount) <= 0}
                    >
                      Place Bid
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Cost Breakdown */}
                    {calculateDuration() > 0 && (
                      <div className="space-y-2 text-sm">
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
                          <span>Platform fee</span>
                          <span>{formatCurrency(calculateTotal() * 0.1)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Tax</span>
                          <span>{formatCurrency(calculateTotal() * 0.08)}</span>
                        </div>
                        <hr />
                        <div className="flex justify-between font-semibold text-lg">
                          <span>Total</span>
                          <span>{formatCurrency(calculateTotal())}</span>
                        </div>
                      </div>
                    )}

                    <Button
                      onClick={handleBook}
                      className="w-full"
                      disabled={!startDate || !endDate || calculateDuration() <= 0}
                    >
                      Book Now
                    </Button>
                  </div>
                )}

                {/* Deposit Info */}
                <div className="text-center text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                  <p>
                    <strong>Deposit:</strong> {formatCurrency(tool.deposit)}
                  </p>
                  <p>Refundable upon return in good condition</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolDetail;