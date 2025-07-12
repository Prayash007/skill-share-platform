import React, { useState } from 'react';
import { Save, X, Plus, MapPin, Calendar, Globe, Camera, Home } from 'lucide-react';
import { User } from '../types';
import { SkillTag } from './SkillTag';
import { RatingStars } from './RatingStars';

interface UserProfileProps {
  user: User;
  onSave: (updatedUser: Partial<User>) => void;
  onCancel: () => void;
}

export function UserProfile({ user, onSave, onCancel }: UserProfileProps) {
  const [formData, setFormData] = useState({
    name: user.name,
    location: user.location || '',
    skillsOffered: [...user.skillsOffered],
    skillsWanted: [...user.skillsWanted],
    availability: [...user.availability],
    isPublic: true // Profile visibility toggle
  });

  const [newSkillOffered, setNewSkillOffered] = useState('');
  const [newSkillWanted, setNewSkillWanted] = useState('');
  const [newAvailability, setNewAvailability] = useState('');

  const availabilityOptions = [
    'Mornings', 'Afternoons', 'Evenings', 'Weekdays', 'Weekends', '24/7'
  ];

  const handleAddSkill = (type: 'offered' | 'wanted') => {
    const skill = type === 'offered' ? newSkillOffered : newSkillWanted;
    if (!skill.trim()) return;

    if (type === 'offered') {
      setFormData(prev => ({
        ...prev,
        skillsOffered: [...prev.skillsOffered, skill.trim()]
      }));
      setNewSkillOffered('');
    } else {
      setFormData(prev => ({
        ...prev,
        skillsWanted: [...prev.skillsWanted, skill.trim()]
      }));
      setNewSkillWanted('');
    }
  };

  const handleRemoveSkill = (type: 'offered' | 'wanted', index: number) => {
    if (type === 'offered') {
      setFormData(prev => ({
        ...prev,
        skillsOffered: prev.skillsOffered.filter((_, i) => i !== index)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        skillsWanted: prev.skillsWanted.filter((_, i) => i !== index)
      }));
    }
  };

  const handleAddAvailability = () => {
    if (!newAvailability || formData.availability.includes(newAvailability)) return;
    
    setFormData(prev => ({
      ...prev,
      availability: [...prev.availability, newAvailability]
    }));
    setNewAvailability('');
  };

  const handleRemoveAvailability = (index: number) => {
    setFormData(prev => ({
      ...prev,
      availability: prev.availability.filter((_, i) => i !== index)
    }));
  };

  const handleSave = () => {
    onSave(formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Main Profile Card */}
        <div className="backdrop-blur-xl bg-slate-800/40 border border-slate-700/50 rounded-3xl p-8 shadow-2xl shadow-cyan-500/20">
          {/* Header */}
          <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-700/50">
            <h1 className="text-3xl font-bold text-white">User Profile</h1>
            
            <div className="flex items-center space-x-4">
              {/* Navigation Buttons */}
              <button
                onClick={() => onCancel()}
                className="px-6 py-2 bg-slate-700/50 text-slate-300 border border-slate-600/50 rounded-xl hover:bg-slate-600/50 hover:text-white transition-all duration-300 font-medium"
              >
                Swap request
              </button>
              <button
                onClick={() => onCancel()}
                className="px-6 py-2 bg-slate-700/50 text-slate-300 border border-slate-600/50 rounded-xl hover:bg-slate-600/50 hover:text-white transition-all duration-300 font-medium"
              >
                Home
              </button>
              
              {/* Profile Avatar */}
              <div className="w-12 h-12 rounded-xl overflow-hidden border-2 border-cyan-400/50">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Form Fields */}
            <div className="lg:col-span-2 space-y-8">
              {/* Name Field */}
              <div>
                <label className="block text-lg font-medium text-white mb-3">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-0 py-3 bg-transparent border-0 border-b-2 border-slate-600 text-white text-lg focus:outline-none focus:border-cyan-400 transition-all duration-300"
                  placeholder="Enter your name"
                />
              </div>

              {/* Location Field */}
              <div>
                <label className="block text-lg font-medium text-white mb-3">Location</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                  className="w-full px-0 py-3 bg-transparent border-0 border-b-2 border-slate-600 text-white text-lg focus:outline-none focus:border-cyan-400 transition-all duration-300"
                  placeholder="City, Country"
                />
              </div>

              {/* Skills Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Skills Offered */}
                <div>
                  <label className="block text-lg font-medium text-white mb-4">Skills Offered</label>
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2 min-h-[60px] p-3 border-b-2 border-slate-600">
                      {formData.skillsOffered.map((skill, index) => (
                        <div key={index} className="relative group">
                          <span className="inline-block px-4 py-2 bg-cyan-500/20 text-cyan-300 border border-cyan-400/50 rounded-full text-sm font-medium">
                            {skill}
                            <button
                              onClick={() => handleRemoveSkill('offered', index)}
                              className="ml-2 text-cyan-300 hover:text-red-400 transition-colors duration-300"
                            >
                              ×
                            </button>
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={newSkillOffered}
                        onChange={(e) => setNewSkillOffered(e.target.value)}
                        placeholder="Add a skill"
                        className="flex-1 px-3 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400/50 transition-all duration-300"
                        onKeyPress={(e) => e.key === 'Enter' && handleAddSkill('offered')}
                      />
                      <button
                        onClick={() => handleAddSkill('offered')}
                        className="px-4 py-2 bg-cyan-600/20 text-cyan-400 border border-cyan-400/50 rounded-lg hover:bg-cyan-600/30 transition-all duration-300"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Skills Wanted */}
                <div>
                  <label className="block text-lg font-medium text-white mb-4">Skills Wanted</label>
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2 min-h-[60px] p-3 border-b-2 border-slate-600">
                      {formData.skillsWanted.map((skill, index) => (
                        <div key={index} className="relative group">
                          <span className="inline-block px-4 py-2 bg-pink-500/20 text-pink-300 border border-pink-400/50 rounded-full text-sm font-medium">
                            {skill}
                            <button
                              onClick={() => handleRemoveSkill('wanted', index)}
                              className="ml-2 text-pink-300 hover:text-red-400 transition-colors duration-300"
                            >
                              ×
                            </button>
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={newSkillWanted}
                        onChange={(e) => setNewSkillWanted(e.target.value)}
                        placeholder="Add a skill"
                        className="flex-1 px-3 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400/50 transition-all duration-300"
                        onKeyPress={(e) => e.key === 'Enter' && handleAddSkill('wanted')}
                      />
                      <button
                        onClick={() => handleAddSkill('wanted')}
                        className="px-4 py-2 bg-pink-600/20 text-pink-400 border border-pink-400/50 rounded-lg hover:bg-pink-600/30 transition-all duration-300"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Availability */}
              <div>
                <label className="block text-lg font-medium text-white mb-3">Availability</label>
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2 min-h-[50px] p-3 border-b-2 border-slate-600">
                    {formData.availability.map((time, index) => (
                      <span key={index} className="inline-block px-4 py-2 bg-purple-500/20 text-purple-300 border border-purple-400/50 rounded-full text-sm font-medium">
                        {time}
                        <button
                          onClick={() => handleRemoveAvailability(index)}
                          className="ml-2 text-purple-300 hover:text-red-400 transition-colors duration-300"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className="flex space-x-2">
                    <select
                      value={newAvailability}
                      onChange={(e) => setNewAvailability(e.target.value)}
                      className="flex-1 px-3 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white focus:outline-none focus:border-cyan-400/50 transition-all duration-300"
                    >
                      <option value="">Select availability</option>
                      {availabilityOptions.map((option) => (
                        <option key={option} value={option} disabled={formData.availability.includes(option)}>
                          {option}
                        </option>
                      ))}
                    </select>
                    <button
                      onClick={handleAddAvailability}
                      className="px-4 py-2 bg-purple-600/20 text-purple-400 border border-purple-400/50 rounded-lg hover:bg-purple-600/30 transition-all duration-300"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Profile Visibility */}
              <div>
                <label className="block text-lg font-medium text-white mb-3">Profile</label>
                <div className="flex items-center space-x-4 pb-3 border-b-2 border-slate-600">
                  <button
                    onClick={() => setFormData(prev => ({ ...prev, isPublic: true }))}
                    className={`px-6 py-2 rounded-lg border transition-all duration-300 ${
                      formData.isPublic
                        ? 'bg-green-500/20 border-green-400 text-green-300'
                        : 'bg-slate-700/50 border-slate-600/50 text-slate-400 hover:border-green-400/50'
                    }`}
                  >
                    Public
                  </button>
                  <button
                    onClick={() => setFormData(prev => ({ ...prev, isPublic: false }))}
                    className={`px-6 py-2 rounded-lg border transition-all duration-300 ${
                      !formData.isPublic
                        ? 'bg-orange-500/20 border-orange-400 text-orange-300'
                        : 'bg-slate-700/50 border-slate-600/50 text-slate-400 hover:border-orange-400/50'
                    }`}
                  >
                    Private
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4 pt-6">
                <button
                  onClick={handleSave}
                  className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold shadow-lg shadow-green-500/25 hover:shadow-green-500/40 transition-all duration-300 hover:scale-105"
                >
                  Save
                </button>
                <button
                  onClick={onCancel}
                  className="px-8 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl font-semibold shadow-lg shadow-red-500/25 hover:shadow-red-500/40 transition-all duration-300 hover:scale-105"
                >
                  Discard
                </button>
              </div>
            </div>

            {/* Right Column - Profile Photo */}
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <div className="text-center">
                  <label className="block text-lg font-medium text-white mb-6">Profile Photo</label>
                  <div className="relative inline-block">
                    <div className="w-48 h-48 rounded-full border-4 border-slate-600 overflow-hidden bg-slate-700/50 flex items-center justify-center">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <button className="absolute bottom-4 right-4 w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-300">
                      <Camera className="w-6 h-6 text-white" />
                    </button>
                  </div>
                  <div className="mt-4 space-y-2">
                    <button className="block w-full px-4 py-2 bg-cyan-600/20 text-cyan-400 border border-cyan-400/50 rounded-lg hover:bg-cyan-600/30 transition-all duration-300 text-sm">
                      Add/Edit
                    </button>
                    <button className="block w-full px-4 py-2 bg-red-600/20 text-red-400 border border-red-400/50 rounded-lg hover:bg-red-600/30 transition-all duration-300 text-sm">
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}