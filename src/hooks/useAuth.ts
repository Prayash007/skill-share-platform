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
      const isAdminEmail = supabaseUser.email === 'admin@skillshare.com';
      let profile: any = null;

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', supabaseUser.id)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          // Profile doesn't exist — create it
          const profileInsertData = {
            id: supabaseUser.id,
            name: isAdminEmail
              ? 'Admin User'
              : supabaseUser.user_metadata?.name ?? 'New User',
            is_admin: isAdminEmail,
            is_online: true,
            avatar_url: `https://images.pexels.com/photos/1586996/pexels-photo-1586996.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop`,
            skills_offered: isAdminEmail
              ? ['Platform Management', 'Community Building']
              : [],
            skills_wanted: isAdminEmail
              ? ['User Feedback', 'Feature Suggestions']
              : [],
            availability: isAdminEmail ? ['24/7'] : [],
            rating: isAdminEmail ? 5.0 : 0,
            total_swaps: 0
          };

          console.log('📤 Inserting new profile:', profileInsertData);

          const { data: newProfile, error: createError } = await supabase
            .from('profiles')
            .insert(profileInsertData)
            .select()
            .single();

          if (createError) {
            console.error('❌ Error creating profile:', createError.message, createError.details);
            setLoading(false);
            return;
          }

          profile = newProfile;
        } else {
          console.error('❌ Error fetching profile:', error.message, error.details);
          setLoading(false);
          return;
        }
      } else {
        profile = data;
      }

      if (profile) {
        setUser({
          id: profile.id,
          name: profile.name,
          email: supabaseUser.email || '',
          avatar:
            profile.avatar_url ||
            `https://images.pexels.com/photos/1586996/pexels-photo-1586996.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop`,
          isAdmin: profile.is_admin
        });
      }
    } catch (error) {
      console.error('❌ Error in fetchUserProfile:', error);
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, name: string) => {
    try {
      console.log('🔄 Starting signup process for:', email);
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name
          },
          emailRedirectTo: undefined // Disable email confirmation
        }
      });

      if (error) {
        console.error('❌ Supabase signup error:', error);
        
        // Handle specific error cases
        if (error.message.includes('Database error saving new user')) {
          throw new Error('There was a database issue creating your account. Please try again in a moment.');
        } else if (error.message.includes('User already registered')) {
          throw new Error('An account with this email already exists. Please try signing in instead.');
        } else {
          throw new Error(error.message || 'Failed to create account');
        }
      }

      console.log('✅ Signup successful:', data);
      return data;
    } catch (error) {
      console.error('❌ Signup error:', error);
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
        console.error('❌ Supabase signin error:', error.message, error.details);
        throw new Error(error.message || 'Failed to sign in');
      }

      return data;
    } catch (error) {
      console.error('❌ Signin error:', error);
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
