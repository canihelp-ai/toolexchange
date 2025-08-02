import React, { useState } from 'react';
import { X, Calendar, DollarSign, MapPin, Shield, Wrench, TrendingUp } from 'lucide-react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { FilterOptions } from '../../types';
import { categories } from '../../data/mockData';

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters: (filters: FilterOptions) => void;
  currentFilters: FilterOptions;
}

const FilterModal: React.FC<FilterModalProps> = ({
  isOpen,
  onClose,
  onApplyFilters,
  currentFilters,
}) => {
  const [filters, setFilters] = useState<FilterOptions>(currentFilters);

  const handleFilterChange = (key: keyof FilterOptions, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handlePriceRangeChange = (index: number, value: number) => {
    const newRange = [...(filters.priceRange || [0, 1000])];
    newRange[index] = value;
    handleFilterChange('priceRange', newRange as [number, number]);
  };

  const handleApply = () => {
    onApplyFilters(filters);
    onClose();
  };

  const handleClear = () => {
    const clearedFilters: FilterOptions = {};
    setFilters(clearedFilters);
    onApplyFilters(clearedFilters);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Filter Tools"
      size="lg"
    >
      <div className="space-y-6">
        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <select
            value={filters.category || ''}
            onChange={(e) => handleFilterChange('category', e.target.value || undefined)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Price Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <DollarSign className="inline w-4 h-4 mr-1" />
            Price Range (per day in current currency)
          </label>
          <div className="flex items-center space-x-4">
            <Input
              type="number"
              placeholder="Min"
              value={filters.priceRange?.[0] || ''}
              onChange={(e) => handlePriceRangeChange(0, parseInt(e.target.value) || 0)}
              className="w-24"
            />
            <span>to</span>
            <Input
              type="number"
              placeholder="Max"
              value={filters.priceRange?.[1] || ''}
              onChange={(e) => handlePriceRangeChange(1, parseInt(e.target.value) || 1000)}
              className="w-24"
            />
          </div>
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <MapPin className="inline w-4 h-4 mr-1" />
            Location
          </label>
          <Input
            type="text"
            placeholder="City, State"
            value={filters.location || ''}
            onChange={(e) => handleFilterChange('location', e.target.value || undefined)}
          />
        </div>

        {/* Distance */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Distance (miles)
          </label>
          <select
            value={filters.distance || ''}
            onChange={(e) => handleFilterChange('distance', e.target.value ? parseInt(e.target.value) : undefined)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Any Distance</option>
            <option value="5">Within 5 miles</option>
            <option value="10">Within 10 miles</option>
            <option value="25">Within 25 miles</option>
            <option value="50">Within 50 miles</option>
          </select>
        </div>

        {/* Availability */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Calendar className="inline w-4 h-4 mr-1" />
            Availability
          </label>
          <div className="flex space-x-4">
            <Input
              type="date"
              value={filters.availability?.startDate || ''}
              onChange={(e) => handleFilterChange('availability', {
                ...filters.availability,
                startDate: e.target.value || undefined
              })}
            />
            <Input
              type="date"
              value={filters.availability?.endDate || ''}
              onChange={(e) => handleFilterChange('availability', {
                ...filters.availability,
                endDate: e.target.value || undefined
              })}
            />
          </div>
        </div>

        {/* Features */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Features
          </label>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={filters.insurance || false}
                onChange={(e) => handleFilterChange('insurance', e.target.checked || undefined)}
                className="mr-2"
              />
              <Shield className="w-4 h-4 mr-1" />
              Insurance Available
            </label>
          </div>
        </div>

        {/* Operator Support */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Wrench className="inline w-4 h-4 mr-1" />
            Operator Support
          </label>
          <select
            value={filters.operatorSupport || ''}
            onChange={(e) => handleFilterChange('operatorSupport', e.target.value || undefined)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Any</option>
            <option value="required">Required</option>
            <option value="available">Available</option>
            <option value="not_needed">Not Needed</option>
          </select>
        </div>

        {/* Rental Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <TrendingUp className="inline w-4 h-4 mr-1" />
            Rental Type
          </label>
          <select
            value={filters.rentalType || ''}
            onChange={(e) => handleFilterChange('rentalType', e.target.value || undefined)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Any</option>
            <option value="fixed">Fixed Price</option>
            <option value="bidding">Bidding</option>
          </select>
        </div>

        {/* Minimum Rating */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Minimum Rating
          </label>
          <select
            value={filters.rating || ''}
            onChange={(e) => handleFilterChange('rating', e.target.value ? parseFloat(e.target.value) : undefined)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Any Rating</option>
            <option value="3">3+ Stars</option>
            <option value="4">4+ Stars</option>
            <option value="4.5">4.5+ Stars</option>
          </select>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4 pt-4 border-t">
          <Button
            variant="outline"
            onClick={handleClear}
          >
            Clear All
          </Button>
          <Button
            onClick={handleApply}
          >
            Apply Filters
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default FilterModal;