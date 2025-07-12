import React from 'react';
import { Check, X, Trash2, Clock, User } from 'lucide-react';
import { SwapRequest, User as UserType } from '../types';
import { SkillTag } from './SkillTag';

interface SwapRequestCardProps {
  request: SwapRequest;
  fromUser: UserType;
  toUser: UserType;
  currentUserId: string;
  onAccept: (requestId: string) => void;
  onReject: (requestId: string) => void;
  onDelete: (requestId: string) => void;
}

export function SwapRequestCard({
  request,
  fromUser,
  toUser,
  currentUserId,
  onAccept,
  onReject,
  onDelete
}: SwapRequestCardProps) {
  const isFromCurrentUser = request.fromUserId === currentUserId;
  const isPending = request.status === 'pending';
  const otherUser = isFromCurrentUser ? toUser : fromUser;

  const statusColors = {
    pending: 'bg-yellow-500/20 text-yellow-400 border-yellow-400/50',
    accepted: 'bg-green-500/20 text-green-400 border-green-400/50',
    rejected: 'bg-red-500/20 text-red-400 border-red-400/50',
    completed: 'bg-blue-500/20 text-blue-400 border-blue-400/50',
    cancelled: 'bg-gray-500/20 text-gray-400 border-gray-400/50'
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="backdrop-blur-xl bg-slate-800/40 border border-slate-700/50 rounded-2xl p-6 hover:border-cyan-400/50 hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-300">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <img
            src={otherUser.avatar}
            alt={otherUser.name}
            className="w-12 h-12 rounded-xl border-2 border-cyan-400/50"
          />
          <div>
            <h3 className="text-lg font-semibold text-white">
              {isFromCurrentUser ? `To ${toUser.name}` : `From ${fromUser.name}`}
            </h3>
            <div className="flex items-center text-slate-400 text-sm">
              <Clock className="w-3 h-3 mr-1" />
              {formatDate(request.createdAt)}
            </div>
          </div>
        </div>
        
        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${statusColors[request.status]}`}>
          {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
        </span>
      </div>

      {/* Skill Exchange */}
      <div className="mb-4">
        <div className="flex items-center justify-between bg-slate-700/30 rounded-xl p-4">
          <div className="text-center">
            <p className="text-sm text-slate-400 mb-2">
              {isFromCurrentUser ? 'You Offer' : 'They Offer'}
            </p>
            <SkillTag skill={request.skillOffered} type="offered" />
          </div>
          
          <div className="text-cyan-400">
            <User className="w-6 h-6" />
          </div>
          
          <div className="text-center">
            <p className="text-sm text-slate-400 mb-2">
              {isFromCurrentUser ? 'You Want' : 'They Want'}
            </p>
            <SkillTag skill={request.skillWanted} type="wanted" />
          </div>
        </div>
      </div>

      {/* Message */}
      {request.message && (
        <div className="mb-4">
          <p className="text-sm text-slate-300 bg-slate-700/30 rounded-lg p-3">
            "{request.message}"
          </p>
        </div>
      )}

      {/* Actions */}
      <div className="flex space-x-2">
        {!isFromCurrentUser && isPending && (
          <>
            <button
              onClick={() => onAccept(request.id)}
              className="flex-1 px-4 py-2 bg-green-600/20 text-green-400 border border-green-400/50 rounded-xl hover:bg-green-600/30 hover:shadow-lg hover:shadow-green-500/25 transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <Check className="w-4 h-4" />
              <span>Accept</span>
            </button>
            <button
              onClick={() => onReject(request.id)}
              className="flex-1 px-4 py-2 bg-red-600/20 text-red-400 border border-red-400/50 rounded-xl hover:bg-red-600/30 hover:shadow-lg hover:shadow-red-500/25 transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <X className="w-4 h-4" />
              <span>Reject</span>
            </button>
          </>
        )}

        {isFromCurrentUser && isPending && (
          <button
            onClick={() => onDelete(request.id)}
            className="px-4 py-2 bg-red-600/20 text-red-400 border border-red-400/50 rounded-xl hover:bg-red-600/30 hover:shadow-lg hover:shadow-red-500/25 transition-all duration-300 flex items-center space-x-2"
          >
            <Trash2 className="w-4 h-4" />
            <span>Cancel Request</span>
          </button>
        )}

        {request.status === 'accepted' && (
          <div className="flex-1 px-4 py-2 text-center text-green-400 bg-green-600/10 border border-green-400/30 rounded-xl">
            Swap Accepted! Contact {otherUser.name} to coordinate.
          </div>
        )}
      </div>
    </div>
  );
}