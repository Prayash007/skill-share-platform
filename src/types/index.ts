export interface User {
  id: string;
  name: string;
  email: string;
  location?: string;
  avatar: string;
  skillsOffered: string[];
  skillsWanted: string[];
  rating: number;
  totalSwaps: number;
  availability: string[];
  isOnline: boolean;
  joinedDate: string;
  isAdmin?: boolean;
}

export interface SwapRequest {
  id: string;
  fromUserId: string;
  toUserId: string;
  skillOffered: string;
  skillWanted: string;
  message: string;
  status: 'pending' | 'accepted' | 'rejected' | 'completed' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}

export interface Feedback {
  id: string;
  fromUserId: string;
  toUserId: string;
  swapRequestId: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  avatar: string;
  isAdmin?: boolean;
}

export interface SearchFilters {
  query: string;
  skillCategory: string;
  availability: string;
  minRating: number;
}