import { useState, useEffect } from 'react';
import { User as SupabaseUser } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import { AuthUser } from '../types';

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        fetchUserProfile(session.user);
      } else {
        setLoading(false);
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          await fetchUserProfile(session.user);
        } else {
          setUser(null);
          setLoading(false);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserProfile = async (supabaseUser: SupabaseUser) => {
    try {
      // Check if this is the admin user
      const isAdminEmail = supabaseUser.email === 'admin@skillshare.com';
      
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', supabaseUser.id)
        .single();

      if (error) {
        // If profile doesn't exist, create it (especially for admin)
        if (error.code === 'PGRST116') {
          const { data: newProfile, error: createError } = await supabase
            .from('profiles')
            .insert({
              id: supabaseUser.id,
              name: isAdminEmail ? 'Admin User' : supabaseUser.user_metadata?.name || 'New User',
              is_admin: isAdminEmail,
              avatar_url: `https://images.pexels.com/photos/1586996/pexels-photo-1586996.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop`,
              skills_offered: isAdminEmail ? ['Platform Management', 'Community Building'] : [],
              skills_wanted: isAdminEmail ? ['User Feedback', 'Feature Suggestions'] : [],
              availability: isAdminEmail ? ['24/7'] : [],
              rating: isAdminEmail ? 5.0 : 0,
              total_swaps: 0,
              is_online: true
            })
            .select()
            .single();

          if (createError) {
            console.error('Error creating profile:', createError);
            setLoading(false);
            return;
          }
          profile = newProfile;
        } else {
          console.error('Error fetching profile:', error);
          setLoading(false);
          return;
        }
      }

      if (profile) {
        setUser({
          id: profile.id,
          name: profile.name,
          email: supabaseUser.email || '',
          avatar: profile.avatar_url || `https://images.pexels.com/photos/1586996/pexels-photo-1586996.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop`,
          isAdmin: profile.is_admin
        });
      }
    } catch (error) {
      console.error('Error in fetchUserProfile:', error);
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, name: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
          }
        }
      });

      if (error) {
        console.error('Supabase signup error:', error);
        throw new Error(error.message || 'Failed to create account');
      }

      return data;
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        console.error('Supabase signin error:', error);
        throw new Error(error.message || 'Failed to sign in');
      }

      return data;
    } catch (error) {
      console.error('Signin error:', error);
      throw error;
    }
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  return {
    user,
    loading,
    signUp,
    signIn,
    signOut
  };
}