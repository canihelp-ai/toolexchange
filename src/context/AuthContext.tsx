import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User as AuthUser, Session } from '@supabase/supabase-js';
import { supabase, signIn, signUp, signOut } from '../lib/supabase';
import { Database } from '../lib/database.types';

type Profile = Database['public']['Tables']['profiles']['Row'];

interface AuthContextType {
  user: Profile | null;
  authUser: AuthUser | null;
  session: Session | null;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
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
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Handle profile creation/loading
  const handleProfile = async (userId: string): Promise<Profile | null> => {
    try {
      console.log('Loading profile for user:', userId);
      
      // Check if profile exists
      const { data: existingProfile, error: fetchError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (!fetchError && existingProfile) {
        console.log('Profile found:', existingProfile);
        return existingProfile;
      }

      console.log('Profile not found, creating new profile...');
      
      // Create new profile if it doesn't exist
      const { data: { user: authData } } = await supabase.auth.getUser();
      
      const newProfile = {
        id: userId,
        email: authData?.email || '',
        name: authData?.user_metadata?.name || `User-${userId.slice(0, 8)}`,
        phone: authData?.user_metadata?.phone || null,
        location: authData?.user_metadata?.location || '',
        role: (authData?.user_metadata?.role as 'renter' | 'owner' | 'operator') || 'renter',
        bio: authData?.user_metadata?.bio || null,
        avatar_url: null,
        email_verified: !!authData?.email_confirmed_at,
        phone_verified: false,
        id_verified: false,
        rating: 0,
        review_count: 0,
        trust_score: 0,
        member_since: new Date().toISOString(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      const { data: createdProfile, error: createError } = await supabase
        .from('profiles')
        .insert(newProfile)
        .select()
        .single();

      if (createError) {
        console.error('Profile creation error:', createError);
        throw createError;
      }
      
      console.log('Profile created successfully:', createdProfile);
      return createdProfile;
    } catch (err) {
      console.error('Profile error:', err);
      // Don't throw error, return null to allow app to continue
      return null;
    }
  };

  // Handle auth state changes
  useEffect(() => {
    let mounted = true;

    const getInitialSession = async () => {
      try {
        console.log('Getting initial session...');
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Session error:', error);
          throw error;
        }
        
        if (mounted && session) {
          console.log('Initial session found:', session.user.id);
          setSession(session);
          setAuthUser(session.user);
          const profile = await handleProfile(session.user.id);
          setUser(profile);
        } else {
          console.log('No initial session found');
        }
      } catch (err) {
        console.error('Session initialization error:', err);
        setError(err instanceof Error ? err.message : 'Session initialization failed');
      } finally {
        if (mounted) {
          console.log('Setting initial loading to false');
          setIsLoading(false);
        }
      }
    };

    getInitialSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state change:', event, session?.user?.id);
        
        if (!mounted) return;

        if (session) {
          setSession(session);
          setAuthUser(session.user);
          try {
            const profile = await handleProfile(session.user.id);
            setUser(profile);
            setError(null);
          } catch (err) {
            console.error('Profile loading error:', err);
            setError('Failed to load user profile');
          }
        } else {
          setSession(null);
          setAuthUser(null);
          setUser(null);
        }
        setIsLoading(false);
      }
    );

    return () => {
      console.log('Cleaning up auth context');
      mounted = false;
      subscription?.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    console.log('Attempting login for:', email);
    setIsLoading(true);
    setError(null);
    
    try {
      const { error } = await signIn(email, password);
      if (error) {
        console.error('Login error:', error);
        throw error;
      }
      console.log('Login successful');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Login failed';
      console.error('Login failed:', message);
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: RegisterData) => {
    console.log('Attempting registration for:', userData.email);
    setIsLoading(true);
    setError(null);
    
    try {
      const { error } = await signUp(userData.email, userData.password, {
        name: userData.name,
        phone: userData.phone,
        location: userData.location,
        role: userData.role,
        bio: userData.bio
      });
      
      if (error) {
        console.error('Registration error:', error);
        throw error;
      }
      console.log('Registration successful');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Registration failed';
      console.error('Registration failed:', message);
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    console.log('Logging out user');
    setIsLoading(true);
    setError(null);
    
    try {
      const { error } = await signOut();
      if (error) throw error;
      
      setUser(null);
      setAuthUser(null);
      setSession(null);
      console.log('Logout successful');
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
        session,
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