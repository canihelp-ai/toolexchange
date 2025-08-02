import { createClient } from '@supabase/supabase-js';
import { Database } from './database.types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables. Please check your .env file.');
  console.error('Required variables: VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    storage: typeof window !== 'undefined' ? localStorage : undefined,
    debug: false
  }
});

// Auth functions
export const signIn = async (email: string, password: string) => {
  return await supabase.auth.signInWithPassword({ email, password });
};

export const signUp = async (email: string, password: string, metadata?: any) => {
  return await supabase.auth.signUp({
    email,
    password,
    options: { data: metadata }
  });
};

export const signOut = async () => {
  return await supabase.auth.signOut();
};

export const getCurrentUser = async () => {
  const { data: { user }, error } = await supabase.auth.getUser();
  return { user, error };
};

// Profile helpers
export const createProfile = async (profileData: any) => {
  const { data, error } = await supabase
    .from('profiles')
    .insert([profileData])
    .select()
    .single();
  return { data, error };
};

export const updateProfile = async (id: string, updates: any) => {
  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  return { data, error };
};

export const getProfile = async (id: string) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', id)
    .single();
  return { data, error };
};

// Tools helpers
export const getTools = async (filters?: any) => {
  let query = supabase
    .from('tools')
    .select(`
      *,
      owner:profiles!tools_owner_id_fkey(*),
      tool_images(*),
      tool_availability(*)
    `)
    .eq('status', 'active');

  if (filters?.category) {
    query = query.eq('category', filters.category);
  }
  if (filters?.location) {
    query = query.ilike('location', `%${filters.location}%`);
  }
  if (filters?.priceRange) {
    query = query.gte('daily_rate', filters.priceRange[0])
                 .lte('daily_rate', filters.priceRange[1]);
  }

  const { data, error } = await query;
  return { data, error };
};

export const getTool = async (id: string) => {
  const { data, error } = await supabase
    .from('tools')
    .select(`
      *,
      owner:profiles!tools_owner_id_fkey(*),
      tool_images(*),
      tool_availability(*),
      operator:operators(*, profile:profiles(*))
    `)
    .eq('id', id)
    .single();
  return { data, error };
};

export const createTool = async (toolData: any) => {
  const { data, error } = await supabase
    .from('tools')
    .insert([toolData])
    .select()
    .single();
  return { data, error };
};

// Bookings helpers
export const createBooking = async (bookingData: any) => {
  const { data, error } = await supabase
    .from('bookings')
    .insert([bookingData])
    .select()
    .single();
  return { data, error };
};

export const getBookings = async (userId: string) => {
  const { data, error } = await supabase
    .from('bookings')
    .select(`
      *,
      tool:tools(*),
      renter:profiles!bookings_renter_id_fkey(*),
      operator:operators(*, profile:profiles(*))
    `)
    .or(`renter_id.eq.${userId},tool.owner_id.eq.${userId}`)
    .order('created_at', { ascending: false });
  return { data, error };
};

// Bids helpers
export const createBid = async (bidData: any) => {
  const { data, error } = await supabase
    .from('bids')
    .insert([bidData])
    .select()
    .single();
  return { data, error };
};

export const getBids = async (toolId: string) => {
  const { data, error } = await supabase
    .from('bids')
    .select(`
      *,
      bidder:profiles!bids_bidder_id_fkey(*)
    `)
    .eq('tool_id', toolId)
    .order('amount', { ascending: false });
  return { data, error };
};

// Reviews helpers
export const createReview = async (reviewData: any) => {
  const { data, error } = await supabase
    .from('reviews')
    .insert([reviewData])
    .select()
    .single();
  return { data, error };
};

export const getReviews = async (targetId: string, type: string) => {
  const { data, error } = await supabase
    .from('reviews')
    .select(`
      *,
      reviewer:profiles!reviews_reviewer_id_fkey(*)
    `)
    .eq('target_id', targetId)
    .eq('type', type)
    .order('created_at', { ascending: false });
  return { data, error };
};

// Messages helpers
export const getChats = async (userId: string) => {
  const { data, error } = await supabase
    .from('chats')
    .select(`
      *,
      messages(
        *,
        sender:profiles!messages_sender_id_fkey(*)
      )
    `)
    .contains('participants', [userId])
    .order('updated_at', { ascending: false });
  return { data, error };
};

export const getMessages = async (chatId: string) => {
  const { data, error } = await supabase
    .from('messages')
    .select(`
      *,
      sender:profiles!messages_sender_id_fkey(*)
    `)
    .eq('chat_id', chatId)
    .order('created_at', { ascending: true });
  return { data, error };
};

export const sendMessage = async (messageData: any) => {
  const { data, error } = await supabase
    .from('messages')
    .insert([messageData])
    .select()
    .single();
  return { data, error };
};

// Notifications helpers
export const getNotifications = async (userId: string) => {
  const { data, error } = await supabase
    .from('notifications')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  return { data, error };
};

export const markNotificationAsRead = async (id: string) => {
  const { data, error } = await supabase
    .from('notifications')
    .update({ read: true })
    .eq('id', id);
  return { data, error };
};

// File upload helpers
export const uploadFile = async (bucket: string, path: string, file: File) => {
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(path, file);
  return { data, error };
};

export const getPublicUrl = (bucket: string, path: string) => {
  const { data } = supabase.storage
    .from(bucket)
    .getPublicUrl(path);
  return data.publicUrl;
};

// Real-time subscriptions
export const subscribeToMessages = (chatId: string, callback: (payload: any) => void) => {
  return supabase
    .channel(`messages:${chatId}`)
    .on('postgres_changes', {
      event: 'INSERT',
      schema: 'public',
      table: 'messages',
      filter: `chat_id=eq.${chatId}`
    }, callback)
    .subscribe();
};

export const subscribeToNotifications = (userId: string, callback: (payload: any) => void) => {
  return supabase
    .channel(`notifications:${userId}`)
    .on('postgres_changes', {
      event: 'INSERT',
      schema: 'public',
      table: 'notifications',
      filter: `user_id=eq.${userId}`
    }, callback)
    .subscribe();
};