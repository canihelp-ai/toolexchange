import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User as AuthUser } from '@supabase/supabase-js';
import { supabase, signUp, signIn, signOut, getCurrentUser, createProfile, updateProfile, getProfile } from '../lib/supabase';
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

  useEffect(() => {
    // Get initial session
    getCurrentUser().then(({ user: authUser }) => {
      setAuthUser(authUser);
      if (authUser) {
        loadUserProfile(authUser.id);
      } else {
        setIsLoading(false);
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      setAuthUser(session?.user ?? null);
      if (session?.user) {
        await loadUserProfile(session.user.id);
      } else {
        setUser(null);
        setIsLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const loadUserProfile = async (userId: string) => {
    setIsLoading(true);
    try {
      const { data: profile, error } = await getProfile(userId);
      if (error) {
        console.error('Error loading profile:', error);
      } else if (profile) {
        setUser(profile);
      }
    } catch (error) {
      console.error('Error loading profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const { data, error } = await signIn(email, password);
      if (error) {
        console.error('Login error:', error);
        setIsLoading(false);
        return false;
      }
      // Profile will be loaded by the auth state change listener
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