import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { User } from '../types';

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const { data: profiles, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching users:', error);
        return;
      }

      const formattedUsers: User[] = profiles.map(profile => ({
        id: profile.id,
        name: profile.name,
        email: '', // Email is not stored in profiles for privacy
        location: profile.location || undefined,
        avatar: profile.avatar_url || `https://images.pexels.com/photos/1586996/pexels-photo-1586996.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop`,
        skillsOffered: profile.skills_offered || [],
        skillsWanted: profile.skills_wanted || [],
        rating: profile.rating || 0,
        totalSwaps: profile.total_swaps || 0,
        availability: profile.availability || [],
        isOnline: profile.is_online || false,
        joinedDate: profile.created_at,
        isAdmin: profile.is_admin || false
      }));

      setUsers(formattedUsers);
    } catch (error) {
      console.error('Error in fetchUsers:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateUserProfile = async (userId: string, updates: Partial<User>) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          name: updates.name,
          location: updates.location,
          skills_offered: updates.skillsOffered,
          skills_wanted: updates.skillsWanted,
          availability: updates.availability,
          is_online: updates.isOnline
        })
        .eq('id', userId);

      if (error) {
        console.error('Error updating profile:', error);
        return false;
      }

      // Refresh users list
      await fetchUsers();
      return true;
    } catch (error) {
      console.error('Error in updateUserProfile:', error);
      return false;
    }
  };

  const deleteUser = async (userId: string) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .delete()
        .eq('id', userId);

      if (error) {
        console.error('Error deleting user:', error);
        return false;
      }

      // Refresh users list
      await fetchUsers();
      return true;
    } catch (error) {
      console.error('Error in deleteUser:', error);
      return false;
    }
  };

  return {
    users,
    loading,
    updateUserProfile,
    deleteUser,
    refetch: fetchUsers
  };
}