import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { User as AuthUser } from '@supabase/supabase-js';
import { supabase, signUp, signIn, signOut } from '../lib/supabase';
import { Database } from '../lib/database.types';

type Profile = Database['public']['Tables']['profiles']['Row'];

interface AuthContextType {
  user: Profile | null;
  authUser: AuthUser | null;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (userData: RegisterData) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  updateUserProfile: (updates: Partial<Profile>) => Promise<{ success: boolean; error?: string }>;
  isLoading: boolean;
  error: string | null;
}

interface RegisterData {
  email: string;
  password: string;
  name: string;
  phone?: string;
  location: string;
  role: 'renter' | 'owner' | 'operator';
  bio?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<Profile | null>(null);
  const [authUser, setAuthUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Memoized profile loading function
  const loadProfile = useCallback(async (userId: string): Promise<Profile | null> => {
    try {
      console.log('Loading profile for user:', userId);
      setError(null);

      // Try to get existing profile
      const { data: profile, error: fetchError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (fetchError && fetchError.code !== 'PGRST116') { // Ignore "no rows" error
        console.error('Profile fetch error:', fetchError);
        throw fetchError;
      }

      // Return if profile exists
      if (profile) {
        console.log('Profile found:', profile);
        return profile;
      }

      // Create new profile if it doesn't exist
      console.log('Profile not found, creating new profile...');
      const { data: { user: authUser } } = await supabase.auth.getUser();
      if (!authUser) throw new Error('No authenticated user found');

      const newProfileData = {
        id: userId,
        email: authUser.email || '',
        name: authUser.user_metadata?.name || `User ${userId.slice(0, 8)}`,
        phone: authUser.user_metadata?.phone || null,
        location: authUser.user_metadata?.location || '',
        role: (authUser.user_metadata?.role as 'renter' | 'owner' | 'operator') || 'renter',
        bio: null,
        avatar_url: null,
        email_verified: !!authUser.email_confirmed_at,
        phone_verified: false,
        id_verified: false,
        rating: 0,
        review_count: 0,
        trust_score: 0,
      };

      const { data: newProfile, error: createError } = await supabase
        .from('profiles')
        .insert(newProfileData)
        .select()
        .single();

      if (createError) {
        console.error('Profile creation error:', createError);
        throw createError;
      }

      console.log('Profile created successfully:', newProfile);
      return newProfile;
    } catch (err) {
      console.error('Profile error:', err);
      setError(err instanceof Error ? err.message : 'Failed to load profile');
      return null;
    }
  }, []);

  // Handle auth state changes
  const handleAuthChange = useCallback(async (event: string, session: { user: AuthUser | null } | null) => {
    try {
      console.log('Auth state changed:', { event, hasSession: !!session });
      setIsLoading(true);
      setError(null);

      const currentUser = session?.user ?? null;
      setAuthUser(currentUser);

      if (currentUser) {
        const profile = await loadProfile(currentUser.id);
        setUser(profile);
      } else {
        setUser(null);
      }
    } catch (err) {
      console.error('Auth state change error:', err);
      setError(err instanceof Error ? err.message : 'Authentication error');
    } finally {
      setIsLoading(false);
    }
  }, [loadProfile]);

  // Initialize auth and set up listener
  useEffect(() => {
    let mounted = true;

    const initializeAuth = async () => {
      try {
        console.log('Initializing authentication...');
        setIsLoading(true);
        
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) {
          console.error('Session error:', error);
          throw error;
        }

        if (mounted) {
          await handleAuthChange('INITIAL_SESSION', session);
        }
      } catch (err) {
        if (mounted) {
          console.error('Initialization error:', err);
          setError(err instanceof Error ? err.message : 'Initialization error');
          setIsLoading(false);
        }
      }
    };

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(handleAuthChange);

    // Initialize auth
    initializeAuth();

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [handleAuthChange]);

  const login = async (email: string, password: string) => {
    try {
      console.log('Attempting login for:', email);
      setIsLoading(true);
      setError(null);

      const { error } = await signIn(email, password);
      if (error) {
        console.error('Login error:', error);
        throw error;
      }

      console.log('Login successful');
      return { success: true };
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Login failed';
      console.error('Login failed:', message);
      setError(message);
      return { success: false, error: message };
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: RegisterData) => {
    try {
      console.log('Attempting registration for:', userData.email);
      setIsLoading(true);
      setError(null);

      const { error } = await signUp(userData.email, userData.password, {
        name: userData.name,
        role: userData.role,
        phone: userData.phone,
        location: userData.location
      });

      if (error) {
        console.error('Registration error:', error);
        if (error.message === 'User already registered') {
          throw new Error('An account with this email already exists. Please try logging in instead.');
        }
        throw error;
      }

      console.log('Registration successful');
      return { success: true };
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Registration failed';
      console.error('Registration failed:', message);
      setError(message);
      return { success: false, error: message };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      console.log('Logging out user');
      setIsLoading(true);
      setError(null);
      
      const { error } = await signOut();
      if (error) throw error;
      
      setUser(null);
      setAuthUser(null);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Logout failed';
      console.error('Logout failed:', message);
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  const updateUserProfile = async (updates: Partial<Profile>) => {
    if (!authUser?.id) return { success: false, error: 'Not authenticated' };

    try {
      console.log('Updating profile for user:', authUser.id);
      setIsLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', authUser.id)
        .select()
        .single();

      if (error) {
        console.error('Profile update error:', error);
        throw error;
      }
      
      if (!data) throw new Error('Profile not found after update');

      console.log('Profile updated successfully:', data);
      setUser(data);
      return { success: true };
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Profile update failed';
      console.error('Profile update failed:', message);
      setError(message);
      return { success: false, error: message };
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        authUser,
        login,
        register,
        logout,
        updateUserProfile,
        isLoading,
        error
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};