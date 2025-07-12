import React, { useState } from 'react';
import { Shield, Users, AlertTriangle, Ban, Download, Send, Eye } from 'lucide-react';
import { User, SwapRequest } from '../types';

interface AdminDashboardProps {
  users: User[];
  swapRequests: SwapRequest[];
  onBanUser: (userId: string) => void;
  onSendNotification: (message: string) => void;
}

export function AdminDashboard({ users, swapRequests, onBanUser, onSendNotification }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [notificationMessage, setNotificationMessage] = useState('');
  const [showNotificationForm, setShowNotificationForm] = useState(false);

  const stats = {
    totalUsers: users.length,
    activeSwaps: swapRequests.filter(req => req.status === 'accepted').length,
    pendingRequests: swapRequests.filter(req => req.status === 'pending').length,
    completedSwaps: swapRequests.filter(req => req.status === 'completed').length
  };

  const handleSendNotification = () => {
    if (notificationMessage.trim()) {
      onSendNotification(notificationMessage);
      setNotificationMessage('');
      setShowNotificationForm(false);
    }
  };

  const downloadReport = () => {
    const report = {
      generated: new Date().toISOString(),
      stats,
      users: users.map(u => ({
        id: u.id,
        name: u.name,
        email: u.email,
        rating: u.rating,
        totalSwaps: u.totalSwaps,
        joinedDate: u.joinedDate
      })),
      swapRequests: swapRequests
    };

    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `skillswap-report-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Admin Command Center</h1>
            <p className="text-slate-400">Platform oversight and moderation</p>
          </div>
        </div>

        <div className="flex space-x-3">
          <button
            onClick={() => setShowNotificationForm(true)}
            className="px-4 py-2 bg-cyan-600/20 text-cyan-400 border border-cyan-400/50 rounded-xl hover:bg-cyan-600/30 transition-all duration-300 flex items-center space-x-2"
          >
            <Send className="w-4 h-4" />
            <span>Send Notification</span>
          </button>
          <button
            onClick={downloadReport}
            className="px-4 py-2 bg-green-600/20 text-green-400 border border-green-400/50 rounded-xl hover:bg-green-600/30 transition-all duration-300 flex items-center space-x-2"
          >
            <Download className="w-4 h-4" />
            <span>Download Report</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="backdrop-blur-xl bg-slate-800/40 border border-slate-700/50 rounded-2xl p-6">
          <div className="flex items-center space-x-3">
            <Users className="w-8 h-8 text-cyan-400" />
            <div>
              <p className="text-2xl font-bold text-white">{stats.totalUsers}</p>
              <p className="text-slate-400 text-sm">Total Users</p>
            </div>
          </div>
        </div>

        <div className="backdrop-blur-xl bg-slate-800/40 border border-slate-700/50 rounded-2xl p-6">
          <div className="flex items-center space-x-3">
            <Eye className="w-8 h-8 text-green-400" />
            <div>
              <p className="text-2xl font-bold text-white">{stats.activeSwaps}</p>
              <p className="text-slate-400 text-sm">Active Swaps</p>
            </div>
          </div>
        </div>

        <div className="backdrop-blur-xl bg-slate-800/40 border border-slate-700/50 rounded-2xl p-6">
          <div className="flex items-center space-x-3">
            <AlertTriangle className="w-8 h-8 text-yellow-400" />
            <div>
              <p className="text-2xl font-bold text-white">{stats.pendingRequests}</p>
              <p className="text-slate-400 text-sm">Pending Requests</p>
            </div>
          </div>
        </div>

        <div className="backdrop-blur-xl bg-slate-800/40 border border-slate-700/50 rounded-2xl p-6">
          <div className="flex items-center space-x-3">
            <Shield className="w-8 h-8 text-purple-400" />
            <div>
              <p className="text-2xl font-bold text-white">{stats.completedSwaps}</p>
              <p className="text-slate-400 text-sm">Completed Swaps</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-slate-800/40 backdrop-blur-xl rounded-xl p-1">
        {[
          { id: 'overview', label: 'Overview' },
          { id: 'users', label: 'User Management' },
          { id: 'swaps', label: 'Swap Monitoring' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 px-4 py-2 rounded-lg transition-all duration-300 ${
              activeTab === tab.id
                ? 'bg-cyan-500/20 text-cyan-400 shadow-lg shadow-cyan-500/25'
                : 'text-slate-400 hover:text-cyan-400'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'users' && (
        <div className="backdrop-blur-xl bg-slate-800/40 border border-slate-700/50 rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-white mb-4">User Management</h2>
          <div className="space-y-4">
            {users.filter(u => !u.isAdmin).map((user) => (
              <div key={user.id} className="flex items-center justify-between p-4 bg-slate-700/30 rounded-xl">
                <div className="flex items-center space-x-4">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-12 h-12 rounded-xl border-2 border-cyan-400/50"
                  />
                  <div>
                    <p className="text-white font-medium">{user.name}</p>
                    <p className="text-slate-400 text-sm">User ID: {user.id.slice(0, 8)}...</p>
                    <p className="text-slate-400 text-xs">
                      Rating: {user.rating}/5 • {user.totalSwaps} swaps
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => onBanUser(user.id)}
                  className="px-3 py-1 bg-red-600/20 text-red-400 border border-red-400/50 rounded-lg hover:bg-red-600/30 transition-all duration-300 flex items-center space-x-1"
                >
                  <Ban className="w-3 h-3" />
                  <span className="text-xs">Ban</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'swaps' && (
        <div className="backdrop-blur-xl bg-slate-800/40 border border-slate-700/50 rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Swap Request Monitoring</h2>
          <div className="space-y-4">
            {swapRequests.map((request) => {
              const fromUser = users.find(u => u.id === request.fromUserId);
              const toUser = users.find(u => u.id === request.toUserId);
              
              return (
                <div key={request.id} className="p-4 bg-slate-700/30 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-white font-medium">
                        {fromUser?.name} → {toUser?.name}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        request.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                        request.status === 'accepted' ? 'bg-green-500/20 text-green-400' :
                        request.status === 'rejected' ? 'bg-red-500/20 text-red-400' :
                        'bg-blue-500/20 text-blue-400'
                      }`}>
                        {request.status}
                      </span>
                    </div>
                    <p className="text-slate-400 text-sm">
                      {new Date(request.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <p className="text-slate-300 text-sm">
                    {request.skillOffered} ↔ {request.skillWanted}
                  </p>
                  {request.message && (
                    <p className="text-slate-400 text-xs mt-2 italic">
                      "{request.message}"
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Notification Modal */}
      {showNotificationForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowNotificationForm(false)}></div>
          
          <div className="relative w-full max-w-md bg-slate-800/90 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Send Platform Notification</h3>
            <textarea
              value={notificationMessage}
              onChange={(e) => setNotificationMessage(e.target.value)}
              placeholder="Enter notification message..."
              rows={4}
              className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400/50 transition-all duration-300 resize-none"
            />
            <div className="flex space-x-3 mt-4">
              <button
                onClick={handleSendNotification}
                className="flex-1 px-4 py-2 bg-cyan-600/20 text-cyan-400 border border-cyan-400/50 rounded-xl hover:bg-cyan-600/30 transition-all duration-300"
              >
                Send
              </button>
              <button
                onClick={() => setShowNotificationForm(false)}
                className="flex-1 px-4 py-2 bg-slate-700/50 text-slate-300 border border-slate-600/50 rounded-xl hover:bg-slate-600/50 transition-all duration-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}