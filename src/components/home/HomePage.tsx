import React, { useState, useEffect } from 'react';
import { Filter, Search, Grid, List, ArrowUpDown } from 'lucide-react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import ToolCard from './ToolCard';
import FilterModal from './FilterModal';
import { FilterOptions, Tool } from '../../types';
import { useTools } from '../../hooks/useTools';
import { useAuth } from '../../context/AuthContext';

const HomePage: React.FC = () => {
  const { tools, isLoading: toolsLoading, error: toolsError, refetch } = useTools();
  const { session, user, logout } = useAuth();
  const [filteredTools, setFilteredTools] = useState<Tool[]>([]);
  const [filters, setFilters] = useState<FilterOptions>({});
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('relevance');
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    // Check for search query in URL params
    const urlParams = new URLSearchParams(window.location.search);
    const searchParam = urlParams.get('search');
    if (searchParam) {
      setSearchQuery(searchParam);
    }
    
  }, []);

  useEffect(() => {
    applyFiltersAndSearch();
  }, [tools, filters, searchQuery, sortBy]);

  const applyFiltersAndSearch = () => {
    let filtered = [...tools];

    // Apply search
    if (searchQuery.trim()) {
      filtered = filtered.filter(tool =>
        tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply filters
    if (filters.category) {
      filtered = filtered.filter(tool => tool.category === filters.category);
    }
    if (filters.priceRange) {
      filtered = filtered.filter(tool => {
        const price = tool.pricing.daily;
        return price >= filters.priceRange![0] && price <= filters.priceRange![1];
      });
    }
    if (filters.location) {
      filtered = filtered.filter(tool =>
        tool.location.toLowerCase().includes(filters.location!.toLowerCase())
      );
    }
    if (filters.insurance) {
      filtered = filtered.filter(tool => tool.insurance.available);
    }
    if (filters.operatorSupport) {
      if (filters.operatorSupport === 'required') {
        filtered = filtered.filter(tool => tool.operatorSupport.required);
      } else if (filters.operatorSupport === 'available') {
        filtered = filtered.filter(tool => tool.operatorSupport.available);
      } else if (filters.operatorSupport === 'not_needed') {
        filtered = filtered.filter(tool => !tool.operatorSupport.available);
      }
    }
    if (filters.rentalType) {
      filtered = filtered.filter(tool => tool.pricing.type === filters.rentalType);
    }
    if (filters.rating) {
      filtered = filtered.filter(tool => tool.rating >= filters.rating!);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price_low':
          return a.pricing.daily - b.pricing.daily;
        case 'price_high':
          return b.pricing.daily - a.pricing.daily;
        case 'rating':
          return b.rating - a.rating;
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        default:
          return 0;
      }
    });

    setFilteredTools(filtered);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    applyFiltersAndSearch();
  };

  const handleFavorite = (toolId: string) => {
    setFavorites(prev => 
      prev.includes(toolId) 
        ? prev.filter(id => id !== toolId)
        : [...prev, toolId]
    );
  };


  const activeFiltersCount = Object.values(filters).filter(Boolean).length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Find the Perfect Tool for Your Project
            </h1>
            <p className="text-xl mb-8 text-blue-100">
              Rent from thousands of tools, equipment, and skilled operators in your area
            </p>
            
            {/* Search Bar */}
            <div className="max-w-3xl mx-auto">
              <form onSubmit={handleSearch} className="relative">
                <Input
                  type="text"
                  placeholder="Search tools, equipment, or operators..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  leftIcon={<Search size={20} />}
                  className="text-lg py-4 pr-32 bg-white text-gray-900 placeholder-gray-500"
                />
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                  <Button
                    type="submit"
                    size="lg"
                    className="px-8"
                  >
                    Search
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Controls */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            <Button
              variant="outline"
              onClick={() => setIsFilterModalOpen(true)}
              leftIcon={<Filter size={18} />}
            >
              Filters
              {activeFiltersCount > 0 && (
                <span className="ml-2 bg-blue-600 text-white text-xs rounded-full px-2 py-1">
                  {activeFiltersCount}
                </span>
              )}
            </Button>
            
            <div className="flex items-center space-x-2">
              <Button
                variant={viewMode === 'grid' ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid size={16} />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List size={16} />
              </Button>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">
              {filteredTools.length} tools found
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="relevance">Sort by Relevance</option>
              <option value="price_low">Price: Low to High</option>
              <option value="price_high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="newest">Newest First</option>
              <option value="distance">Distance</option>
            </select>
          </div>
        </div>

        {/* Error State */}
        {toolsError && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-600">{toolsError}</p>
            <Button
              variant="outline"
              size="sm"
              onClick={refetch}
              className="mt-2"
            >
              Try Again
            </Button>
          </div>
        )}

        {/* Tools Grid */}
        {toolsLoading ? (
          <div className="flex flex-col justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-gray-600">Loading tools...</p>
          </div>
        ) : (
          <div className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
              : 'grid-cols-1'
          }`}>
            {filteredTools.map(tool => (
              <ToolCard
                key={tool.id}
                tool={tool}
                onFavorite={handleFavorite}
                isFavorited={favorites.includes(tool.id)}
              />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!toolsLoading && filteredTools.length === 0 && !toolsError && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search size={64} className="mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No tools found
            </h3>
            <p className="text-gray-500 mb-4">
              Try adjusting your search or filters to find more tools.
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setFilters({});
                setSearchQuery('');
              }}
            >
              Clear all filters
            </Button>
          </div>
        )}
      </div>

      {/* Filter Modal */}
      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        onApplyFilters={setFilters}
        currentFilters={filters}
      />
    </div>
  );
};

export default HomePage;