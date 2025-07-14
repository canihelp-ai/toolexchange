export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          name: string
          phone: string | null
          avatar_url: string | null
          location: string
          bio: string | null
          role: 'renter' | 'owner' | 'operator' | 'admin'
          email_verified: boolean
          phone_verified: boolean
          id_verified: boolean
          rating: number
          review_count: number
          trust_score: number
          member_since: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          name: string
          phone?: string | null
          avatar_url?: string | null
          location: string
          bio?: string | null
          role?: 'renter' | 'owner' | 'operator' | 'admin'
          email_verified?: boolean
          phone_verified?: boolean
          id_verified?: boolean
          rating?: number
          review_count?: number
          trust_score?: number
          member_since?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string
          phone?: string | null
          avatar_url?: string | null
          location?: string
          bio?: string | null
          role?: 'renter' | 'owner' | 'operator' | 'admin'
          email_verified?: boolean
          phone_verified?: boolean
          id_verified?: boolean
          rating?: number
          review_count?: number
          trust_score?: number
          member_since?: string
          created_at?: string
          updated_at?: string
        }
      }
      tools: {
        Row: {
          id: string
          owner_id: string
          title: string
          description: string
          category: string
          brand: string
          model: string
          location: string
          condition: 'excellent' | 'good' | 'fair'
          specifications: Json
          pricing_type: 'fixed' | 'bidding'
          hourly_rate: number | null
          daily_rate: number
          weekly_rate: number | null
          current_bid: number | null
          suggested_bid: number | null
          operator_available: boolean
          operator_required: boolean
          operator_id: string | null
          operator_rate: number | null
          insurance_available: boolean
          basic_coverage: number
          premium_coverage: number
          rating: number
          review_count: number
          features: string[]
          rules: string[]
          deposit: number
          status: 'active' | 'rented' | 'maintenance' | 'inactive'
          views: number
          favorites: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          owner_id: string
          title: string
          description: string
          category: string
          brand: string
          model: string
          location: string
          condition?: 'excellent' | 'good' | 'fair'
          specifications?: Json
          pricing_type?: 'fixed' | 'bidding'
          hourly_rate?: number | null
          daily_rate: number
          weekly_rate?: number | null
          current_bid?: number | null
          suggested_bid?: number | null
          operator_available?: boolean
          operator_required?: boolean
          operator_id?: string | null
          operator_rate?: number | null
          insurance_available?: boolean
          basic_coverage?: number
          premium_coverage?: number
          rating?: number
          review_count?: number
          features?: string[]
          rules?: string[]
          deposit?: number
          status?: 'active' | 'rented' | 'maintenance' | 'inactive'
          views?: number
          favorites?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          owner_id?: string
          title?: string
          description?: string
          category?: string
          brand?: string
          model?: string
          location?: string
          condition?: 'excellent' | 'good' | 'fair'
          specifications?: Json
          pricing_type?: 'fixed' | 'bidding'
          hourly_rate?: number | null
          daily_rate?: number
          weekly_rate?: number | null
          current_bid?: number | null
          suggested_bid?: number | null
          operator_available?: boolean
          operator_required?: boolean
          operator_id?: string | null
          operator_rate?: number | null
          insurance_available?: boolean
          basic_coverage?: number
          premium_coverage?: number
          rating?: number
          review_count?: number
          features?: string[]
          rules?: string[]
          deposit?: number
          status?: 'active' | 'rented' | 'maintenance' | 'inactive'
          views?: number
          favorites?: number
          created_at?: string
          updated_at?: string
        }
      }
      tool_images: {
        Row: {
          id: string
          tool_id: string
          image_url: string
          is_primary: boolean
          created_at: string
        }
        Insert: {
          id?: string
          tool_id: string
          image_url: string
          is_primary?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          tool_id?: string
          image_url?: string
          is_primary?: boolean
          created_at?: string
        }
      }
      operators: {
        Row: {
          id: string
          profile_id: string
          skills: string[]
          certifications: string[]
          license_url: string | null
          experience: number
          hourly_rate: number
          rating: number
          review_count: number
          completed_jobs: number
          verified: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          profile_id: string
          skills?: string[]
          certifications?: string[]
          license_url?: string | null
          experience?: number
          hourly_rate: number
          rating?: number
          review_count?: number
          completed_jobs?: number
          verified?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          profile_id?: string
          skills?: string[]
          certifications?: string[]
          license_url?: string | null
          experience?: number
          hourly_rate?: number
          rating?: number
          review_count?: number
          completed_jobs?: number
          verified?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      bookings: {
        Row: {
          id: string
          renter_id: string
          tool_id: string
          operator_id: string | null
          start_date: string
          end_date: string
          duration: number
          status: 'pending' | 'confirmed' | 'active' | 'completed' | 'cancelled'
          tool_cost: number
          operator_cost: number
          insurance_cost: number
          platform_fee: number
          tax: number
          total: number
          insurance_selected: boolean
          insurance_type: 'basic' | 'premium' | null
          insurance_coverage: number
          deposit: number
          payment_status: 'pending' | 'paid' | 'refunded'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          renter_id: string
          tool_id: string
          operator_id?: string | null
          start_date: string
          end_date: string
          duration: number
          status?: 'pending' | 'confirmed' | 'active' | 'completed' | 'cancelled'
          tool_cost: number
          operator_cost?: number
          insurance_cost?: number
          platform_fee: number
          tax: number
          total: number
          insurance_selected?: boolean
          insurance_type?: 'basic' | 'premium' | null
          insurance_coverage?: number
          deposit: number
          payment_status?: 'pending' | 'paid' | 'refunded'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          renter_id?: string
          tool_id?: string
          operator_id?: string | null
          start_date?: string
          end_date?: string
          duration?: number
          status?: 'pending' | 'confirmed' | 'active' | 'completed' | 'cancelled'
          tool_cost?: number
          operator_cost?: number
          insurance_cost?: number
          platform_fee?: number
          tax?: number
          total?: number
          insurance_selected?: boolean
          insurance_type?: 'basic' | 'premium' | null
          insurance_coverage?: number
          deposit?: number
          payment_status?: 'pending' | 'paid' | 'refunded'
          created_at?: string
          updated_at?: string
        }
      }
      bids: {
        Row: {
          id: string
          tool_id: string
          bidder_id: string
          amount: number
          status: 'active' | 'outbid' | 'won' | 'expired'
          expires_at: string
          created_at: string
        }
        Insert: {
          id?: string
          tool_id: string
          bidder_id: string
          amount: number
          status?: 'active' | 'outbid' | 'won' | 'expired'
          expires_at: string
          created_at?: string
        }
        Update: {
          id?: string
          tool_id?: string
          bidder_id?: string
          amount?: number
          status?: 'active' | 'outbid' | 'won' | 'expired'
          expires_at?: string
          created_at?: string
        }
      }
      reviews: {
        Row: {
          id: string
          type: 'tool' | 'operator' | 'renter' | 'owner'
          target_id: string
          reviewer_id: string
          booking_id: string | null
          rating: number
          comment: string | null
          communication_rating: number | null
          accuracy_rating: number | null
          condition_rating: number | null
          value_rating: number | null
          photos: string[]
          helpful: number
          reported: boolean
          created_at: string
        }
        Insert: {
          id?: string
          type: 'tool' | 'operator' | 'renter' | 'owner'
          target_id: string
          reviewer_id: string
          booking_id?: string | null
          rating: number
          comment?: string | null
          communication_rating?: number | null
          accuracy_rating?: number | null
          condition_rating?: number | null
          value_rating?: number | null
          photos?: string[]
          helpful?: number
          reported?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          type?: 'tool' | 'operator' | 'renter' | 'owner'
          target_id?: string
          reviewer_id?: string
          booking_id?: string | null
          rating?: number
          comment?: string | null
          communication_rating?: number | null
          accuracy_rating?: number | null
          condition_rating?: number | null
          value_rating?: number | null
          photos?: string[]
          helpful?: number
          reported?: boolean
          created_at?: string
        }
      }
      chats: {
        Row: {
          id: string
          participants: string[]
          booking_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          participants: string[]
          booking_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          participants?: string[]
          booking_id?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      messages: {
        Row: {
          id: string
          chat_id: string
          sender_id: string
          content: string
          attachments: string[]
          type: 'text' | 'image' | 'file'
          read: boolean
          created_at: string
        }
        Insert: {
          id?: string
          chat_id: string
          sender_id: string
          content: string
          attachments?: string[]
          type?: 'text' | 'image' | 'file'
          read?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          chat_id?: string
          sender_id?: string
          content?: string
          attachments?: string[]
          type?: 'text' | 'image' | 'file'
          read?: boolean
          created_at?: string
        }
      }
      notifications: {
        Row: {
          id: string
          user_id: string
          type: 'booking' | 'bid' | 'message' | 'review' | 'payment' | 'dispute'
          title: string
          message: string
          read: boolean
          action_url: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          type: 'booking' | 'bid' | 'message' | 'review' | 'payment' | 'dispute'
          title: string
          message: string
          read?: boolean
          action_url?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          type?: 'booking' | 'bid' | 'message' | 'review' | 'payment' | 'dispute'
          title?: string
          message?: string
          read?: boolean
          action_url?: string | null
          created_at?: string
        }
      }
      insurance_claims: {
        Row: {
          id: string
          booking_id: string
          claimant_id: string
          type: string
          description: string
          photos: string[]
          status: 'pending' | 'approved' | 'denied' | 'resolved'
          amount_claimed: number | null
          amount_approved: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          booking_id: string
          claimant_id: string
          type: string
          description: string
          photos?: string[]
          status?: 'pending' | 'approved' | 'denied' | 'resolved'
          amount_claimed?: number | null
          amount_approved?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          booking_id?: string
          claimant_id?: string
          type?: string
          description?: string
          photos?: string[]
          status?: 'pending' | 'approved' | 'denied' | 'resolved'
          amount_claimed?: number | null
          amount_approved?: number | null
          created_at?: string
          updated_at?: string
        }
      }
      tool_availability: {
        Row: {
          id: string
          tool_id: string
          start_date: string
          end_date: string
          blocked_dates: string[]
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          tool_id: string
          start_date: string
          end_date: string
          blocked_dates?: string[]
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          tool_id?: string
          start_date?: string
          end_date?: string
          blocked_dates?: string[]
          created_at?: string
          updated_at?: string
        }
      }
      operator_availability: {
        Row: {
          id: string
          operator_id: string
          start_date: string
          end_date: string
          blocked_dates: string[]
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          operator_id: string
          start_date: string
          end_date: string
          blocked_dates?: string[]
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          operator_id?: string
          start_date?: string
          end_date?: string
          blocked_dates?: string[]
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      user_role: 'renter' | 'owner' | 'operator' | 'admin'
      tool_condition: 'excellent' | 'good' | 'fair'
      tool_status: 'active' | 'rented' | 'maintenance' | 'inactive'
      pricing_type: 'fixed' | 'bidding'
      booking_status: 'pending' | 'confirmed' | 'active' | 'completed' | 'cancelled'
      payment_status: 'pending' | 'paid' | 'refunded'
      bid_status: 'active' | 'outbid' | 'won' | 'expired'
      review_type: 'tool' | 'operator' | 'renter' | 'owner'
      message_type: 'text' | 'image' | 'file'
      notification_type: 'booking' | 'bid' | 'message' | 'review' | 'payment' | 'dispute'
      insurance_type: 'basic' | 'premium'
      claim_status: 'pending' | 'approved' | 'denied' | 'resolved'
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}