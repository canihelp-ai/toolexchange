import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User as AuthUser, Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
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
  const [user, setUser] = useState<Profile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    let initialized = false;


    const getInitialSession = async () => {
      if (initialized) return;
      initialized = true;
      
      try {
        console.log('Getting initial session...');
        
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!mounted) return;
        
        if (session) {
          setSession(session);
          await loadProfile(session.user.id);
        } else {
          setSession(null);
          setUser(null);
        }
      } catch (err) {
        if (!mounted) return;
        console.error('Initial session error:', err);
        setError(err instanceof Error ? err.message : 'Failed to get session');
      } finally {
        if (mounted) setIsLoading(false);
      }
    };

    // Set up auth state listener first
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!mounted) return;
        console.log('Auth state change:', event, session?.user?.id);

        try {
          if (session) {
            setSession(session);
            await loadProfile(session.user.id);
          } else {
            setSession(null);
            setUser(null);
          }
          setError(null);
        } catch (err) {
          console.error('Auth state change error:', err);
          setError(err instanceof Error ? err.message : 'Auth state change failed');
        }
      }
    );

    // Then get initial session
    getInitialSession();

    return () => {
      console.log('Cleaning up auth context');
      mounted = false;
      subscription?.unsubscribe();
    };
  }, []);

  const loadProfile = async (userId: string) => {
    try {
      console.log('Loading profile for user:', userId);
      setIsLoading(true);
      
      // Try to get existing profile
      const { data: profile, error: fetchError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      // If profile exists, use it
      if (!fetchError && profile) {
        console.log('Profile found:', profile);
        setUser(profile);
        return;
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
      console.log('Profile created successfully:', createdProfile);
      setUser(createdProfile);
    } catch (err) {
      console.error('Profile loading error:', err);
      setError(err instanceof Error ? err.message : 'Failed to load profile');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      console.log('Attempting login for:', email);
      setIsLoading(true);
      setError(null);
      
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;
        if (error.message === 'Invalid login credentials') {
          throw new Error('Invalid email or password. Please check your credentials and try again.');
        }
      console.log('Login successful');
    } catch (err) {
      console.error('Login failed:', err);
      setError(err instanceof Error ? err.message : 'Login failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: RegisterData) => {
    try {
      console.log('Attempting registration for:', userData.email);
      setIsLoading(true);
      setError(null);
      
      const { error } = await supabase.auth.signUp({
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
      console.log('Registration successful');
    } catch (err) {
      console.error('Registration failed:', err);
      setError(err instanceof Error ? err.message : 'Registration failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      console.log('Logging out user');
      setIsLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setSession(null);
      setUser(null);
      setError(null);
      console.log('Logout successful');
    } catch (err) {
      console.error('Logout failed:', err);
      setError(err instanceof Error ? err.message : 'Logout failed');
    } finally {
      setIsLoading(false);
    }
  };

  const sendPasswordResetEmail = async (email: string) => {
    try {
      console.log('Sending password reset email to:', email);
      setError(null);
      
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`
      });

      if (error) throw error;
      console.log('Password reset email sent successfully');
    } catch (err) {
      console.error('Password reset failed:', err);
      setError(err instanceof Error ? err.message : 'Failed to send password reset email');
      throw err;
    }
  };
  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        isLoading,
        error,
        login,
        register,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
      if (error) throw error;
      console.log('Password updated successfully');
    } catch (err) {
      console.error('Password update failed:', err);
      setError(err instanceof Error ? err.message : 'Failed to update password');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const updatePassword = async (password: string) => {
    try {
      console.log('Updating password');
      setIsLoading(true);
      setError(null);
      
      const { error } = await supabase.auth.updateUser({
        password: password
      });
export const useAuth = () => {
        sendPasswordResetEmail,
        updatePassword
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};