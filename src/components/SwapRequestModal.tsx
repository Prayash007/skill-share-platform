import React, { useState } from 'react';
import { X, Send } from 'lucide-react';
import { User } from '../types';
import { SkillTag } from './SkillTag';

interface SwapRequestModalProps {
  targetUser: User;
  currentUser: User;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    skillOffered: string;
    skillWanted: string;
    message: string;
  }) => void;
}

export function SwapRequestModal({
  targetUser,
  currentUser,
  isOpen,
  onClose,
  onSubmit
}: SwapRequestModalProps) {
  const [selectedOfferedSkill, setSelectedOfferedSkill] = useState('');
  const [selectedWantedSkill, setSelectedWantedSkill] = useState('');
  const [message, setMessage] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedOfferedSkill && selectedWantedSkill) {
      onSubmit({
        skillOffered: selectedOfferedSkill,
        skillWanted: selectedWantedSkill,
        message
      });
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="relative w-full max-w-2xl bg-slate-800/90 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-2xl shadow-cyan-500/20">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-700/50">
          <div className="flex items-center space-x-4">
            <img
              src={targetUser.avatar}
              alt={targetUser.name}
              className="w-12 h-12 rounded-xl border-2 border-cyan-400/50"
            />
            <div>
              <h2 className="text-xl font-bold text-white">
                Request Skill Swap with {targetUser.name}
              </h2>
              <p className="text-slate-400">Choose skills to exchange</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-lg transition-all duration-300"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Skill I Offer */}
          <div>
            <h3 className="text-lg font-semibold text-cyan-400 mb-3">
              Skill I'll Teach ({currentUser.name})
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {currentUser.skillsOffered.map((skill) => (
                <button
                  key={skill}
                  type="button"
                  onClick={() => setSelectedOfferedSkill(skill)}
                  className={`p-3 rounded-xl border transition-all duration-300 ${
                    selectedOfferedSkill === skill
                      ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-lg shadow-cyan-500/25'
                      : 'bg-slate-700/50 border-slate-600/50 text-slate-300 hover:border-cyan-400/50'
                  }`}
                >
                  <SkillTag skill={skill} type="offered" size="sm" />
                </button>
              ))}
            </div>
          </div>

          {/* Skill I Want */}
          <div>
            <h3 className="text-lg font-semibold text-pink-400 mb-3">
              Skill I Want to Learn (from {targetUser.name})
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {targetUser.skillsOffered.map((skill) => (
                <button
                  key={skill}
                  type="button"
                  onClick={() => setSelectedWantedSkill(skill)}
                  className={`p-3 rounded-xl border transition-all duration-300 ${
                    selectedWantedSkill === skill
                      ? 'bg-pink-500/20 border-pink-400 text-pink-300 shadow-lg shadow-pink-500/25'
                      : 'bg-slate-700/50 border-slate-600/50 text-slate-300 hover:border-pink-400/50'
                  }`}
                >
                  <SkillTag skill={skill} type="wanted" size="sm" />
                </button>
              ))}
            </div>
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Personal Message (Optional)
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Introduce yourself and explain why you'd like to swap skills..."
              rows={4}
              className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400/50 focus:shadow-lg focus:shadow-cyan-500/20 transition-all duration-300 resize-none"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!selectedOfferedSkill || !selectedWantedSkill}
            className="w-full px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl font-medium shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center space-x-2"
          >
            <Send className="w-4 h-4" />
            <span>Send Swap Request</span>
          </button>
        </form>
      </div>
    </div>
  );
}