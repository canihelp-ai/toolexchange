import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import { Tool } from '../types';

// Transform database tool to our Tool type
const transformTool = (dbTool: any): Tool => ({
  id: dbTool.id,
  ownerId: dbTool.owner_id,
  owner: {
    id: dbTool.owner?.id || dbTool.owner_id,
    email: dbTool.owner?.email || '',
    name: dbTool.owner?.name || 'Unknown Owner',
    phone: dbTool.owner?.phone,
    avatar: dbTool.owner?.avatar_url || 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
    location: dbTool.owner?.location || '',
    bio: dbTool.owner?.bio,
    role: dbTool.owner?.role || 'owner',
    verified: {
      email: dbTool.owner?.email_verified || false,
      phone: dbTool.owner?.phone_verified || false,
      id: dbTool.owner?.id_verified || false,
    },
    rating: dbTool.owner?.rating || 0,
    reviewCount: dbTool.owner?.review_count || 0,
    memberSince: dbTool.owner?.member_since || dbTool.owner?.created_at || '',
    trustScore: dbTool.owner?.trust_score || 0,
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

export const useTools = () => {
  const [tools, setTools] = useState<Tool[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { session } = useAuth();

  useEffect(() => {
    let mounted = true;

    const loadTools = async () => {
      try {
        console.log('Loading tools from database...');
        setIsLoading(true);
        setError(null);
        
        const { data, error } = await supabase
          .from('tools')
          .select(`
            *,
            owner:profiles!tools_owner_id_fkey(*),
            tool_images(*),
            tool_availability(*)
          `)
          .eq('status', 'active')
          .order('created_at', { ascending: false });

        if (!mounted) return;
        if (error) throw error;

        console.log(`Successfully loaded ${data?.length || 0} tools from database`);
        const transformedTools = data ? data.map(transformTool) : [];
        setTools(transformedTools);
      } catch (err) {
        if (!mounted) return;
        console.error('Tools loading error:', err);
        setError(err instanceof Error ? err.message : 'Failed to load tools');
      } finally {
        if (mounted) setIsLoading(false);
      }
    };

    // Load tools regardless of session status (tools should be publicly viewable)
    loadTools();

    return () => {
      mounted = false;
    };
  }, [session]);

  const refetch = () => {
    setIsLoading(true);
    setError(null);
    // This will trigger the useEffect to reload
  };

  return { tools, isLoading, error, refetch };
};