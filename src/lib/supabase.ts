import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          name: string;
          location: string | null;
          avatar_url: string | null;
          skills_offered: string[];
          skills_wanted: string[];
          availability: string[];
          rating: number;
          total_swaps: number;
          is_online: boolean;
          is_admin: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          name: string;
          location?: string | null;
          avatar_url?: string | null;
          skills_offered?: string[];
          skills_wanted?: string[];
          availability?: string[];
          rating?: number;
          total_swaps?: number;
          is_online?: boolean;
          is_admin?: boolean;
        };
        Update: {
          name?: string;
          location?: string | null;
          avatar_url?: string | null;
          skills_offered?: string[];
          skills_wanted?: string[];
          availability?: string[];
          rating?: number;
          total_swaps?: number;
          is_online?: boolean;
          is_admin?: boolean;
        };
      };
      swap_requests: {
        Row: {
          id: string;
          from_user_id: string;
          to_user_id: string;
          skill_offered: string;
          skill_wanted: string;
          message: string;
          status: 'pending' | 'accepted' | 'rejected' | 'completed' | 'cancelled';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          from_user_id: string;
          to_user_id: string;
          skill_offered: string;
          skill_wanted: string;
          message?: string;
          status?: 'pending' | 'accepted' | 'rejected' | 'completed' | 'cancelled';
        };
        Update: {
          skill_offered?: string;
          skill_wanted?: string;
          message?: string;
          status?: 'pending' | 'accepted' | 'rejected' | 'completed' | 'cancelled';
        };
      };
    };
  };
}