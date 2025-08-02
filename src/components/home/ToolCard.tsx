import React from 'react';
import { Heart, Shield, Wrench, MapPin, TrendingUp, Star } from 'lucide-react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import Rating from '../ui/Rating';
import { formatCurrency } from '../../utils/format';
import { Tool } from '../../types';

interface ToolCardProps {
  tool: Tool;
  onView: (tool: Tool) => void;
  onFavorite: (toolId: string) => void;
  isFavorited?: boolean;
}

const ToolCard: React.FC<ToolCardProps> = ({
  tool,
  onView,
  onFavorite,
  isFavorited = false,
}) => {
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onFavorite(tool.id);
  };

  return (
    <Card
      variant="elevated"
      padding="none"
      className="cursor-pointer transform hover:scale-105 transition-all duration-200 hover:shadow-lg"
      onClick={() => onView(tool)}
    >
      <div className="relative">
        <img
          src={tool.images[0] || 'https://images.pexels.com/photos/209274/pexels-photo-209274.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1'}
          alt={tool.title}
          className="w-full h-48 object-cover rounded-t-lg"
        />
        <button
          onClick={handleFavoriteClick}
          className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow"
        >
          <Heart
            size={18}
            className={isFavorited ? 'fill-red-500 text-red-500' : 'text-gray-400'}
          />
        </button>
        
        {/* Status badges */}
        <div className="absolute top-3 left-3 flex flex-col space-y-1">
          {tool.insurance.available && (
            <Badge variant="success" size="sm">
              <Shield size={12} className="mr-1" />
              Insured
            </Badge>
          )}
          {tool.operatorSupport.available && (
            <Badge variant="info" size="sm">
              <Wrench size={12} className="mr-1" />
              Operator
            </Badge>
          )}
          {tool.pricing.type === 'bidding' && (
            <Badge variant="warning" size="sm">
              <TrendingUp size={12} className="mr-1" />
              Bidding
            </Badge>
          )}
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
            {tool.title}
          </h3>
          <div className="text-right">
            {tool.pricing.type === 'fixed' ? (
              <div>
                <p className="text-lg font-bold text-green-600">
                  {formatCurrency(tool.pricing.daily)}
                </p>
                <p className="text-sm text-gray-500">per day</p>
              </div>
            ) : (
              <div>
                <p className="text-lg font-bold text-orange-600">
                  {formatCurrency(tool.pricing.currentBid || 0)}
                </p>
                <p className="text-sm text-gray-500">current bid</p>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center text-sm text-gray-600 mb-2">
          <MapPin size={14} className="mr-1" />
          <span>{tool.location}</span>
        </div>

        <div className="flex items-center justify-between mb-3">
          <Rating rating={tool.rating} size="sm" />
          <span className="text-sm text-gray-500">
            ({tool.reviewCount} reviews)
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <img
              src={tool.owner.avatar || 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=32&h=32&dpr=1'}
              alt={tool.owner.name}
              className="w-6 h-6 rounded-full object-cover"
            />
            <span className="text-sm text-gray-600">{tool.owner.name}</span>
          </div>
          
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <span>{tool.views} views</span>
            <span>•</span>
            <span>{tool.favorites} saved</span>
          </div>
        </div>

        <div className="mt-3 pt-3 border-t border-gray-200">
          <Button
            variant="primary"
            className="w-full"
            onClick={(e) => {
              e.stopPropagation();
              onView(tool);
            }}
          >
            {tool.pricing.type === 'fixed' ? 'View Details' : 'Place Bid'}
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ToolCard;