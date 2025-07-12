import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { SwapRequest } from '../types';

export function useSwapRequests(userId?: string) {
  const [swapRequests, setSwapRequests] = useState<SwapRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userId) {
      fetchSwapRequests();
    }
  }, [userId]);

  const fetchSwapRequests = async () => {
    if (!userId) return;

    try {
      const { data: requests, error } = await supabase
        .from('swap_requests')
        .select('*')
        .or(`from_user_id.eq.${userId},to_user_id.eq.${userId}`)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching swap requests:', error);
        return;
      }

      const formattedRequests: SwapRequest[] = requests.map(request => ({
        id: request.id,
        fromUserId: request.from_user_id,
        toUserId: request.to_user_id,
        skillOffered: request.skill_offered,
        skillWanted: request.skill_wanted,
        message: request.message || '',
        status: request.status,
        createdAt: request.created_at,
        updatedAt: request.updated_at
      }));

      setSwapRequests(formattedRequests);
    } catch (error) {
      console.error('Error in fetchSwapRequests:', error);
    } finally {
      setLoading(false);
    }
  };

  const createSwapRequest = async (data: {
    toUserId: string;
    skillOffered: string;
    skillWanted: string;
    message: string;
  }) => {
    if (!userId) return false;

    try {
      const { error } = await supabase
        .from('swap_requests')
        .insert({
          from_user_id: userId,
          to_user_id: data.toUserId,
          skill_offered: data.skillOffered,
          skill_wanted: data.skillWanted,
          message: data.message
        });

      if (error) {
        console.error('Error creating swap request:', error);
        return false;
      }

      // Refresh requests
      await fetchSwapRequests();
      return true;
    } catch (error) {
      console.error('Error in createSwapRequest:', error);
      return false;
    }
  };

  const updateSwapRequest = async (requestId: string, status: SwapRequest['status']) => {
    try {
      const { error } = await supabase
        .from('swap_requests')
        .update({ status })
        .eq('id', requestId);

      if (error) {
        console.error('Error updating swap request:', error);
        return false;
      }

      // Refresh requests
      await fetchSwapRequests();
      return true;
    } catch (error) {
      console.error('Error in updateSwapRequest:', error);
      return false;
    }
  };

  const deleteSwapRequest = async (requestId: string) => {
    try {
      const { error } = await supabase
        .from('swap_requests')
        .delete()
        .eq('id', requestId);

      if (error) {
        console.error('Error deleting swap request:', error);
        return false;
      }

      // Refresh requests
      await fetchSwapRequests();
      return true;
    } catch (error) {
      console.error('Error in deleteSwapRequest:', error);
      return false;
    }
  };

  return {
    swapRequests,
    loading,
    createSwapRequest,
    updateSwapRequest,
    deleteSwapRequest,
    refetch: fetchSwapRequests
  };
}