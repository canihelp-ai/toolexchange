import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { supabase } from '../lib/supabase';
import { Session, User } from '@supabase/supabase-js';
import { Database } from '../lib/database.types';

type Profile = Database['public']['Tables']['profiles']['Row'];

interface AuthContextType {
  user: Profile | null;
  session: Session | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  sendPasswordResetEmail: (email: string) => Promise<void>;
  updatePassword: (password: string) => Promise<void>;
  updatePassword: (password: string) => Promise<void>;
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

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<{
    user: Profile | null;
    session: Session | null;
    isLoading: boolean;
    error: string | null;
  }>({
    user: null,
    session: null,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    console.log('Setting up auth state listener...');
    
    let mounted = true;
    let authListener: { data: { subscription: { unsubscribe: () => void } } } | null = null;

    const initializeAuth = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (!mounted) return;

        if (error) throw error;

        let profile = null;
        if (session?.user) {
          profile = await loadProfile(session.user.id);
        }

        setState({
          user: profile,
          session: session,
          isLoading: false,
          error: null,
        });

        // Set up auth state change listener
        authListener = supabase.auth.onAuthStateChange(async (event, session) => {
          console.log(`Auth state change: ${event}`, session?.user?.id);
          if (!mounted) return;
          
          let profile = null;
          if (session?.user) {
            try {
              profile = await loadProfile(session.user.id);
            } catch (err) {
              console.error('Failed to load profile:', err);
            }
          }
          
          setState({
            user: profile,
            session: session,
            isLoading: false,
            error: null,
          });
        });
      } catch (error) {
        if (!mounted) return;
        console.error('Auth initialization error:', error);
        setState({
          user: null,
          session: null,
          isLoading: false,
          error: error instanceof Error ? error.message : 'Auth initialization failed',
        });
      }
    };

    initializeAuth();

    return () => {
      console.log('Cleaning up auth subscription');
      mounted = false;
      if (authListener) {
        authListener.data.subscription.unsubscribe();
      }
    };
  }, []);

  const loadProfile = async (userId: string): Promise<Profile | null> => {
    try {
      console.log('Loading profile for user:', userId);
      
      // Try to get existing profile
      const { data: profile, error: fetchError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      // If profile exists, return it
      if (!fetchError && profile) {
        console.log('Profile loaded successfully:', profile.name);
        return profile;
      }

      console.log('Profile not found, creating new profile...');
      
      // If no profile exists, create a new one
      const { data: { user: authUser } } = await supabase.auth.getUser();
      if (!authUser) throw new Error('No authenticated user');
      
      const newProfile = {
        id: userId,
        email: authUser.email || '',
        name: authUser.user_metadata?.name || `User-${userId.slice(0, 8)}`,
        phone: authUser.user_metadata?.phone || null,
        location: authUser.user_metadata?.location || '',
        role: (authUser.user_metadata?.role as 'renter' | 'owner' | 'operator') || 'renter',
        bio: authUser.user_metadata?.bio || null,
        avatar_url: null,
        email_verified: !!authUser.email_confirmed_at,
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

      if (createError) throw createError;
      console.log('Profile created successfully:', createdProfile.name);
      return createdProfile;
    } catch (err) {
      console.error('Profile loading error:', err);
      throw err;
    }
  };

  const login = async (email: string, password: string) => {
    try {
      console.log('Attempting login for:', email);
      setState(prev => ({ ...prev, error: null }));
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        if (error.message === 'Invalid login credentials') {
          throw new Error('Invalid email or password. Please check your credentials and try again.');
        }
        throw error;
      }
      
      console.log('Login successful for user:', data.user.id);
    } catch (err) {
      console.error('Login failed:', err);
      const errorMessage = err instanceof Error ? err.message : 'Login failed';
      setState(prev => ({ ...prev, error: errorMessage }));
      throw err;
    }
  };

  const register = async (userData: RegisterData) => {
    try {
      console.log('Attempting registration for:', userData.email);
      setState(prev => ({ ...prev, error: null }));
      
      const { data, error } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
        options: {
          data: {
            name: userData.name,
            phone: userData.phone,
            location: userData.location,
            role: userData.role,
            bio: userData.bio
          }
        }
      });

      if (error) throw error;
      console.log('Registration successful for user:', data.user?.id);
    } catch (err) {
      console.error('Registration failed:', err);
      const errorMessage = err instanceof Error ? err.message : 'Registration failed';
      setState(prev => ({ ...prev, error: errorMessage }));
      throw err;
    }
  };

  const logout = async () => {
    try {
      console.log('Logging out user');
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      setState({
        user: null,
        session: null,
        isLoading: false,
        error: null,
      });
      console.log('Logout successful');
    } catch (err) {
      console.error('Logout failed:', err);
      const errorMessage = err instanceof Error ? err.message : 'Logout failed';
      setState(prev => ({ ...prev, error: errorMessage }));
    }
  };

  const sendPasswordResetEmail = async (email: string) => {
    try {
      console.log('Sending password reset email to:', email);
      setState(prev => ({ ...prev, error: null }));
      
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`
      });

      if (error) throw error;
      console.log('Password reset email sent successfully');
    } catch (err) {
      console.error('Password reset failed:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to send password reset email';
      setState(prev => ({ ...prev, error: errorMessage }));
      throw err;
    }
  };

  const updatePassword = async (password: string) => {
    try {
      console.log('Updating password');
      setState(prev => ({ ...prev, error: null }));
      
      const { error } = await supabase.auth.updateUser({
        password: password
      });

      if (error) throw error;
      console.log('Password updated successfully');
    } catch (err) {
      console.error('Password update failed:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to update password';
      setState(prev => ({ ...prev, error: errorMessage }));
      throw err;
    }
  };

  const updatePassword = async (password: string) => {
    try {
      console.log('Updating password');
      setState(prev => ({ ...prev, error: null }));
      
      const { error } = await supabase.auth.updateUser({
        password: password
      });

      if (error) throw error;
      console.log('Password updated successfully');
    } catch (err) {
      console.error('Password update failed:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to update password';
      setState(prev => ({ ...prev, error: errorMessage }));
      throw err;
    }
  };

  const value: AuthContextType = {
    user: state.user,
    session: state.session,
    isLoading: state.isLoading,
    error: state.error,
    login,
    register,
    logout,
    sendPasswordResetEmail,
    updatePassword,
    updatePassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};