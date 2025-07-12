import React, { useState } from 'react';
import { MapPin, Clock, MessageSquare, Star } from 'lucide-react';
import { User } from '../types';
import { SkillTag } from './SkillTag';
import { RatingStars } from './RatingStars';

interface UserCardProps {
  user: User;
  currentUserId?: string;
  onRequestSwap: (user: User) => void;
  onViewProfile: (user: User) => void;
}

export function UserCard({ user, currentUserId, onRequestSwap, onViewProfile }: UserCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const isCurrentUser = currentUserId === user.id;

  return (
    <div
      className={`
        group relative backdrop-blur-xl bg-slate-800/40 border border-slate-700/50 rounded-2xl p-6 
        transition-all duration-500 hover:border-cyan-400/50 hover:shadow-2xl hover:shadow-cyan-500/20
        ${isHovered ? 'scale-105' : ''}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Online Status Indicator */}
      {user.isOnline && (
        <div className="absolute top-4 right-4 w-3 h-3 bg-green-400 rounded-full shadow-lg shadow-green-400/50 animate-pulse"></div>
      )}

      {/* User Avatar */}
      <div className="flex items-start space-x-4 mb-4">
        <div className="relative">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-16 h-16 rounded-2xl border-2 border-cyan-400/30 shadow-lg"
          />
          {user.isOnline && (
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-400 rounded-full border-2 border-slate-800"></div>
          )}
          {/* Rating Badge */}
          <div className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-slate-900 text-xs font-bold px-2 py-1 rounded-full shadow-lg">
            {user.rating.toFixed(1)}
          </div>
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-white">{user.name}</h3>
          {user.location && (
            <div className="flex items-center text-slate-400 text-sm mt-1">
              <MapPin className="w-3 h-3 mr-1" />
              {user.location}
            </div>
          )}
          <RatingStars rating={user.rating} totalRatings={user.totalSwaps} size="sm" />
        </div>
      </div>

      {/* Skills Offered */}
      <div className="mb-4">
        <h4 className="text-sm font-medium text-cyan-400 mb-2 flex items-center">
          <Star className="w-3 h-3 mr-1" />
          Skills Offered
        </h4>
        <div className="flex flex-wrap gap-2">
          {user.skillsOffered.map((skill) => (
            <SkillTag key={skill} skill={skill} type="offered" size="sm" />
          ))}
        </div>
      </div>

      {/* Skills Wanted */}
      <div className="mb-4">
        <h4 className="text-sm font-medium text-pink-400 mb-2 flex items-center">
          <MessageSquare className="w-3 h-3 mr-1" />
          Looking For
        </h4>
        <div className="flex flex-wrap gap-2">
          {user.skillsWanted.map((skill) => (
            <SkillTag key={skill} skill={skill} type="wanted" size="sm" />
          ))}
        </div>
      </div>

      {/* Availability */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-slate-400 mb-2 flex items-center">
          <Clock className="w-3 h-3 mr-1" />
          Available
        </h4>
        <div className="flex flex-wrap gap-1">
          {user.availability.map((time) => (
            <span
              key={time}
              className="px-2 py-1 bg-slate-700/50 text-slate-300 text-xs rounded-lg border border-slate-600/50"
            >
              {time}
            </span>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-2">
        <button
          onClick={() => onViewProfile(user)}
          className="flex-1 px-4 py-2 bg-slate-700/50 text-slate-300 rounded-xl border border-slate-600/50 hover:bg-slate-600/50 hover:border-slate-500/50 transition-all duration-300"
        >
          View Profile
        </button>
        {!isCurrentUser && (
          <button
            onClick={() => onRequestSwap(user)}
            className="flex-1 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl font-medium shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-300 hover:scale-105"
          >
            Request Swap
          </button>
        )}
      </div>
    </div>
  );
}