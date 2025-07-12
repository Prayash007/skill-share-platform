import { User, SwapRequest, Feedback } from '../types';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Alex Chen',
    email: 'alex@example.com',
    location: 'San Francisco, CA',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    skillsOffered: ['React', 'TypeScript', 'UI/UX Design'],
    skillsWanted: ['Machine Learning', 'Python', 'Data Science'],
    rating: 4.8,
    totalSwaps: 23,
    availability: ['Weekends', 'Evenings'],
    isOnline: true,
    joinedDate: '2023-01-15'
  },
  {
    id: '2',
    name: 'Maya Rodriguez',
    email: 'maya@example.com',
    location: 'Austin, TX',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    skillsOffered: ['Python', 'Data Science', 'Machine Learning'],
    skillsWanted: ['React', 'Frontend Development', 'UI Design'],
    rating: 4.9,
    totalSwaps: 31,
    availability: ['Afternoons', 'Weekends'],
    isOnline: false,
    joinedDate: '2022-11-08'
  },
  {
    id: '3',
    name: 'James Wilson',
    email: 'james@example.com',
    location: 'New York, NY',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    skillsOffered: ['Photography', 'Video Editing', 'Adobe Creative Suite'],
    skillsWanted: ['Web Development', 'JavaScript', 'Node.js'],
    rating: 4.6,
    totalSwaps: 18,
    availability: ['Evenings', 'Weekends'],
    isOnline: true,
    joinedDate: '2023-03-22'
  },
  {
    id: '4',
    name: 'Sarah Kim',
    email: 'sarah@example.com',
    location: 'Seattle, WA',
    avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    skillsOffered: ['Digital Marketing', 'SEO', 'Content Strategy'],
    skillsWanted: ['Graphic Design', 'Branding', 'Illustration'],
    rating: 4.7,
    totalSwaps: 25,
    availability: ['Mornings', 'Weekdays'],
    isOnline: true,
    joinedDate: '2022-12-10'
  },
  {
    id: '5',
    name: 'Admin User',
    email: 'admin@skillswap.com',
    location: 'Remote',
    avatar: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    skillsOffered: ['Platform Management', 'Community Building'],
    skillsWanted: ['User Feedback', 'Feature Suggestions'],
    rating: 5.0,
    totalSwaps: 0,
    availability: ['24/7'],
    isOnline: true,
    joinedDate: '2022-01-01',
    isAdmin: true
  }
];

export const mockSwapRequests: SwapRequest[] = [
  {
    id: 'req1',
    fromUserId: '1',
    toUserId: '2',
    skillOffered: 'React',
    skillWanted: 'Python',
    message: 'Hi Maya! I\'d love to learn Python from you in exchange for React tutoring. I have 3 years of React experience.',
    status: 'pending',
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-15T10:30:00Z'
  },
  {
    id: 'req2',
    fromUserId: '3',
    toUserId: '1',
    skillOffered: 'Photography',
    skillWanted: 'UI/UX Design',
    message: 'I can teach you photography techniques in exchange for UI/UX design principles!',
    status: 'accepted',
    createdAt: '2024-01-14T15:20:00Z',
    updatedAt: '2024-01-14T16:45:00Z'
  },
  {
    id: 'req3',
    fromUserId: '4',
    toUserId: '3',
    skillOffered: 'Digital Marketing',
    skillWanted: 'Video Editing',
    message: 'Would love to swap marketing knowledge for video editing skills!',
    status: 'completed',
    createdAt: '2024-01-10T09:15:00Z',
    updatedAt: '2024-01-13T14:30:00Z'
  }
];

export const mockFeedback: Feedback[] = [
  {
    id: 'fb1',
    fromUserId: '4',
    toUserId: '3',
    swapRequestId: 'req3',
    rating: 5,
    comment: 'James was an excellent teacher! His video editing tutorials were clear and practical.',
    createdAt: '2024-01-13T15:00:00Z'
  }
];

export const skillCategories = [
  'All Categories',
  'Programming',
  'Design',
  'Marketing',
  'Photography',
  'Music',
  'Languages',
  'Business',
  'Data Science',
  'Writing'
];

export const availabilityOptions = [
  'Any Time',
  'Mornings',
  'Afternoons', 
  'Evenings',
  'Weekdays',
  'Weekends',
  '24/7'
];