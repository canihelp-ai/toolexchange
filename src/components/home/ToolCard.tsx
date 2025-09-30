import React from 'react';
import { Heart, Shield, Wrench, MapPin, TrendingUp, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import Rating from '../ui/Rating';
import { Tool } from '../../types';
import { useCurrency } from '../../context/CurrencyContext';

interface ToolCardProps {
  tool: Tool;
  onFavorite: (toolId: string) => void;
  isFavorited?: boolean;
}

const ToolCard: React.FC<ToolCardProps> = ({
  tool,
  onFavorite,
  isFavorited = false,
}) => {
  const navigate = useNavigate();
  const { formatCurrency } = useCurrency();

  // Debug logging
  console.log('ToolCard rendering with tool price:', tool.pricing.daily);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onFavorite(tool.id);
  };

  const handleViewTool = () => {
    navigate(`/tool/${tool.id}`);
  };
  return (
    <Card
      variant="default"
      padding="none"
      className="cursor-pointer card-hover bg-white/80 backdrop-blur-sm border border-white/30 shadow-xl hover:shadow-2xl rounded-2xl overflow-hidden"
      onClick={handleViewTool}
    >
      <div className="relative">
        <img
          src={tool.images[0] || 'https://images.pexels.com/photos/209274/pexels-photo-209274.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1'}
          alt={tool.title}
          className="w-full h-48 object-cover"
        />
        <button
          onClick={handleFavoriteClick}
          className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
        >
          <Heart
            size={18}
            className={isFavorited ? 'fill-pink-500 text-pink-500' : 'text-gray-400'}
          />
        </button>
        
        {/* Status badges */}
        <div className="absolute top-3 left-3 flex flex-col space-y-1">
          {tool.insurance.available && (
            <Badge variant="success" size="sm" className="bg-gradient-to-r from-green-400 to-emerald-500 text-white border-0 shadow-lg">
              <Shield size={12} className="mr-1" />
              Insured
            </Badge>
          )}
          {tool.operatorSupport.available && (
            <Badge variant="info" size="sm" className="bg-gradient-to-r from-blue-400 to-cyan-500 text-white border-0 shadow-lg">
              <Wrench size={12} className="mr-1" />
              Operator
            </Badge>
          )}
          {tool.pricing.type === 'bidding' && (
            <Badge variant="warning" size="sm" className="bg-gradient-to-r from-orange-400 to-yellow-500 text-white border-0 shadow-lg">
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
                <p className="text-lg font-bold bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent">
                  {formatCurrency(tool.pricing.daily)}
                </p>
                <p className="text-sm text-gray-500">per day</p>
              </div>
            ) : (
              <div>
                <p className="text-lg font-bold bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
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
              src={tool.owner.avatar_url || tool.owner.avatar || 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1'}
              alt={tool.owner.name}
              className="w-6 h-6 rounded-full object-cover"
              onError={(e) => {
                e.currentTarget.src = 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1';
              }}
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
            variant="ghost"
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300"
            onClick={(e) => {
              e.stopPropagation();
              handleViewTool();
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