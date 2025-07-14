export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  avatar?: string;
  location: string;
  bio?: string;
  role: 'renter' | 'owner' | 'operator' | 'admin';
  verified: {
    email: boolean;
    phone: boolean;
    id: boolean;
  };
  rating: number;
  reviewCount: number;
  memberSince: string;
  trustScore: number;
}

export interface Tool {
  id: string;
  ownerId: string;
  owner: User;
  title: string;
  description: string;
  category: string;
  brand: string;
  model: string;
  images: string[];
  location: string;
  distance?: number;
  condition: 'excellent' | 'good' | 'fair';
  specifications: Record<string, string>;
  pricing: {
    type: 'fixed' | 'bidding';
    hourly?: number;
    daily: number;
    weekly: number;
    currentBid?: number;
    suggestedBid?: number;
  };
  availability: {
    startDate: string;
    endDate: string;
    blockedDates: string[];
  };
  operatorSupport: {
    available: boolean;
    required: boolean;
    operatorId?: string;
    operator?: Operator;
    rate?: number;
  };
  insurance: {
    available: boolean;
    basicCoverage: number;
    premiumCoverage: number;
  };
  rating: number;
  reviewCount: number;
  features: string[];
  rules: string[];
  deposit: number;
  createdAt: string;
  updatedAt: string;
  status: 'active' | 'rented' | 'maintenance' | 'inactive';
  views: number;
  favorites: number;
}

export interface Operator {
  id: string;
  profileId: string;
  profile: User;
  skills: string[];
  certifications: string[];
  licenseUrl?: string;
  experience: number;
  hourlyRate: number;
  availability: {
    startDate: string;
    endDate: string;
    blockedDates: string[];
  };
  rating: number;
  reviewCount: number;
  completedJobs: number;
  verified: boolean;
}

export interface Booking {
  id: string;
  renterId: string;
  renter: User;
  toolId: string;
  tool: Tool;
  operatorId?: string;
  operator?: Operator;
  startDate: string;
  endDate: string;
  duration: number;
  status: 'pending' | 'confirmed' | 'active' | 'completed' | 'cancelled';
  pricing: {
    toolCost: number;
    operatorCost: number;
    insuranceCost: number;
    platformFee: number;
    tax: number;
    total: number;
  };
  insurance: {
    selected: boolean;
    type: 'basic' | 'premium';
    coverage: number;
  };
  deposit: number;
  paymentStatus: 'pending' | 'paid' | 'refunded';
  createdAt: string;
  updatedAt: string;
}

export interface Bid {
  id: string;
  toolId: string;
  bidderId: string;
  bidder: User;
  amount: number;
  timestamp: string;
  status: 'active' | 'outbid' | 'won' | 'expired';
  expiresAt: string;
}

export interface Review {
  id: string;
  type: 'tool' | 'operator' | 'renter' | 'owner';
  targetId: string;
  reviewerId: string;
  reviewer: User;
  bookingId: string;
  rating: number;
  comment: string;
  categories: {
    communication: number;
    accuracy: number;
    condition: number;
    value: number;
  };
  photos: string[];
  createdAt: string;
  helpful: number;
  reported: boolean;
}

export interface Message {
  id: string;
  chatId: string;
  senderId: string;
  sender: User;
  content: string;
  attachments: string[];
  timestamp: string;
  read: boolean;
  type: 'text' | 'image' | 'file';
}

export interface Chat {
  id: string;
  participants: User[];
  bookingId?: string;
  lastMessage: Message;
  unreadCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'booking' | 'bid' | 'message' | 'review' | 'payment' | 'dispute';
  title: string;
  message: string;
  read: boolean;
  actionUrl?: string;
  createdAt: string;
}

export interface FilterOptions {
  category?: string;
  priceRange?: [number, number];
  location?: string;
  distance?: number;
  availability?: {
    startDate?: string;
    endDate?: string;
  };
  insurance?: boolean;
  operatorSupport?: 'required' | 'available' | 'not_needed';
  rentalType?: 'fixed' | 'bidding';
  rating?: number;
  features?: string[];
}