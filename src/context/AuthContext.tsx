import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User as AuthUser } from '@supabase/supabase-js';
import { supabase, signUp, signIn, signOut, getCurrentUser, createProfile, updateProfile } from '../lib/supabase';
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
  const [sessionChecked, setSessionChecked] = useState(false);

  useEffect(() => {
    // Get initial session and set up auth state listener
    const initializeAuth = async () => {
      try {
        // Get current session
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Error getting session:', error);
        }
        
        const authUser = session?.user ?? null;
        console.log('Initial auth state:', { authUser: !!authUser, session: !!session });
        
        setAuthUser(authUser);
        if (authUser) {
          await loadUserProfile(authUser.id);
        } else {
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        setIsLoading(false);
      } finally {
        setSessionChecked(true);
      }
    };

    initializeAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', { event, session: !!session, user: !!session?.user });
      
      const authUser = session?.user ?? null;
      setAuthUser(authUser);
      
      if (authUser) {
        await loadUserProfile(authUser.id);
      } else {
        setUser(null);
        setIsLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Periodically check session validity
  useEffect(() => {
    if (!sessionChecked) return;

    const checkSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Session check error:', error);
          return;
        }

        // If we think we have a user but session is null, log them out
        if (authUser && !session) {
          console.log('Session expired, logging out user');
          setAuthUser(null);
          setUser(null);
        }
        
        // If session exists but we don't have authUser, update it
        if (session?.user && !authUser) {
          console.log('Found valid session, updating auth user');
          setAuthUser(session.user);
          await loadUserProfile(session.user.id);
        }
      } catch (error) {
        console.error('Error checking session:', error);
      }
    };

    // Check session every 30 seconds
    const interval = setInterval(checkSession, 30000);
    return () => clearInterval(interval);
  }, [authUser, sessionChecked]);

  const loadUserProfile = async (userId: string) => {
    console.log('Loading profile for user:', userId);
    
    try {
      // Try to get existing profile - use array query first to check if exists
      const { data: profiles, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId);

      if (error) {
        console.error('Error checking for profile:', error);
        setIsLoading(false);
        return;
      }

      let profile = profiles && profiles.length > 0 ? profiles[0] : null;

      if (!profile) {
        // Profile doesn't exist, create it
        console.log('Profile not found, creating new profile for user:', userId);
        
        // Get user data from auth to populate profile
        const { data: { user: authUser } } = await supabase.auth.getUser();
        
        const newProfileData = {
          id: userId,
          email: authUser?.email || '',
          name: authUser?.user_metadata?.name || `User ${Math.random().toString(36).substring(2, 8)}`,
          phone: authUser?.user_metadata?.phone || null,
          location: authUser?.user_metadata?.location || '',
          role: authUser?.user_metadata?.role || 'renter',
          bio: null,
          avatar_url: null,
          email_verified: authUser?.email_confirmed_at ? true : false,
          phone_verified: false,
          id_verified: false,
          rating: 0,
          review_count: 0,
          trust_score: 0,
        };

        const { data: createdProfiles, error: createError } = await supabase
          .from('profiles')
          .insert([newProfileData])
          .select();

        if (createError) {
          console.error('Error creating profile:', createError);
          setIsLoading(false);
          return;
        }
        
        profile = createdProfiles && createdProfiles.length > 0 ? createdProfiles[0] : null;
        if (profile) {
          console.log('New profile created:', profile);
        }
      }
      
      if (profile) {
        console.log('Profile loaded successfully:', profile.name);
        setUser(profile);
      } else {
        console.error('Failed to load or create profile');
        setUser(null);
      }
    } catch (error) {
      console.error('Error loading profile:', error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

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
      // Profile will be loaded by the auth state change listener
      console.log('Login successful');
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
      const { data: authData, error: authError } = await signUp(userData.email, userData.password, {
        name: userData.name,
        role: userData.role
      });

      if (authError) {
        console.error('Registration error:', authError);
        // Handle specific error cases
        if (authError.message === 'User already registered') {
          throw new Error('An account with this email already exists. Please try logging in instead.');
        }
        throw new Error(authError.message || 'Registration failed. Please try again.');
      }

      if (authData.user) {
        // Create profile
        const profileData = {
          id: authData.user.id,
          email: userData.email,
          name: userData.name,
          phone: userData.phone || null,
          location: userData.location,
          role: userData.role,
          bio: userData.bio || null,
        };

        const { error: profileError } = await createProfile(profileData);
        if (profileError) {
          console.error('Profile creation error:', profileError);
          throw new Error('Failed to create user profile. Please try again.');
        }
      }

      setIsLoading(false);
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
      const { data, error } = await updateProfile(authUser.id, updates);
      if (error) {
        console.error('Profile update error:', error);
        setIsLoading(false);
        return false;
      }
      if (data) {
        setUser(data);
      }
      return true;
    } catch (error) {
      console.error('Profile update error:', error);
      setIsLoading(false);
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