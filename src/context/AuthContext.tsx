import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User as AuthUser } from '@supabase/supabase-js';
import { supabase, signUp, signIn, signOut } from '../lib/supabase';
import { Database } from '../lib/database.types';

type Profile = Database['public']['Tables']['profiles']['Row'];

interface AuthContextType {
  user: Profile | null;
  authUser: AuthUser | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: RegisterData) => Promise<boolean>;
  logout: () => void;
  updateUserProfile: (updates: Partial<Profile>) => Promise<boolean>;
  isLoading: boolean;
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

  // Profile loading function with proper error handling
  const loadProfile = async (userId: string): Promise<Profile | null> => {
    try {
      console.log('Loading profile for user:', userId);
      
      // First try to get the profile
      let { data: profiles, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId);

      if (error) {
        console.error('Error fetching profile:', error);
        return null;
      }

      let profile = profiles && profiles.length > 0 ? profiles[0] : null;

      // If profile doesn't exist, create it
      if (!profile) {
        console.log('Profile not found, creating new profile...');
        
        // Get user data from auth
        const { data: { user: authUser } } = await supabase.auth.getUser();
        
        const newProfileData = {
          id: userId,
          email: authUser?.email || '',
          name: authUser?.user_metadata?.name || `User ${userId.slice(0, 8)}`,
          phone: authUser?.user_metadata?.phone || null,
          location: authUser?.user_metadata?.location || '',
          role: (authUser?.user_metadata?.role as 'renter' | 'owner' | 'operator') || 'renter',
          bio: null,
          avatar_url: null,
          email_verified: !!authUser?.email_confirmed_at,
          phone_verified: false,
          id_verified: false,
          rating: 0,
          review_count: 0,
          trust_score: 0,
        };

        const { data: newProfiles, error: createError } = await supabase
          .from('profiles')
          .insert([newProfileData])
          .select();

        if (createError) {
          console.error('Error creating profile:', createError);
          return null;
        }
        
        profile = newProfiles && newProfiles.length > 0 ? newProfiles[0] : null;
        console.log('Profile created successfully');
      }
      
      return profile;
    } catch (err) {
      console.error('Failed to load profile:', err);
      return null;
    }
  };

  useEffect(() => {
    let mounted = true;

    // Initialize authentication
    const initializeAuth = async () => {
      try {
        console.log('Initializing authentication...');
        
        // Check existing session
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Error getting session:', error);
          if (mounted) {
            setIsLoading(false);
          }
          return;
        }

        const currentUser = session?.user ?? null;
        console.log('Current session:', { hasUser: !!currentUser, userId: currentUser?.id });

        if (mounted) {
          setAuthUser(currentUser);
          
          if (currentUser) {
            const profile = await loadProfile(currentUser.id);
            if (mounted) {
              setUser(profile);
            }
          } else {
            setUser(null);
          }
          
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', { event, hasSession: !!session });
      
      if (!mounted) return;

      const currentUser = session?.user ?? null;
      setAuthUser(currentUser);
      
      if (currentUser) {
        const profile = await loadProfile(currentUser.id);
        if (mounted) {
          setUser(profile);
        }
      } else {
        setUser(null);
      }
      
      if (mounted) {
        setIsLoading(false);
      }
    });

    // Initialize auth
    initializeAuth();

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      console.log('Attempting login for:', email);
      const { data, error } = await signIn(email, password);
      if (error) {
        console.error('Login error:', error);
        setIsLoading(false);
        return false;
      }
      console.log('Login successful');
      // Don't set loading to false here - let the auth state change handler do it
      return true;
    } catch (error) {
      console.error('Login error:', error);
      setIsLoading(false);
      return false;
    }
  };

  const register = async (userData: RegisterData): Promise<boolean> => {
    setIsLoading(true);
    try {
      console.log('Attempting registration for:', userData.email);
      const { data: authData, error: authError } = await signUp(userData.email, userData.password, {
        name: userData.name,
        role: userData.role,
        phone: userData.phone,
        location: userData.location
      });

      if (authError) {
        console.error('Registration error:', authError);
        if (authError.message === 'User already registered') {
          throw new Error('An account with this email already exists. Please try logging in instead.');
        }
        throw new Error(authError.message || 'Registration failed. Please try again.');
      }

      console.log('Registration successful');
      // Don't set loading to false here - let the auth state change handler do it
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      setIsLoading(false);
      throw error;
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      console.log('Logging out user');
      await signOut();
      setUser(null);
      setAuthUser(null);
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateUserProfile = async (updates: Partial<Profile>): Promise<boolean> => {
    if (!user || !authUser) return false;
    
    setIsLoading(true);
    try {
      console.log('Updating profile for user:', authUser.id);
      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', authUser.id)
        .select();

      if (error) {
        console.error('Profile update error:', error);
        return false;
      }
      
      if (data && data.length > 0) {
        setUser(data[0]);
      }
      return true;
    } catch (error) {
      console.error('Profile update error:', error);
      return false;
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};