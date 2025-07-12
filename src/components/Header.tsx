import React from 'react';
import { User, Search, Bell, Settings, LogOut } from 'lucide-react';
import { AuthUser } from '../types';

interface HeaderProps {
  currentUser: AuthUser | null;
  onOpenAuth: () => void;
  onLogout: () => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function Header({ currentUser, onOpenAuth, onLogout, activeTab, onTabChange }: HeaderProps) {
  const tabs = [
    { id: 'discover', label: 'Discover', icon: Search },
    { id: 'requests', label: 'My Swaps', icon: Bell },
    ...(currentUser?.isAdmin ? [{ id: 'admin', label: 'Admin', icon: Settings }] : [])
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-slate-900/80 border-b border-cyan-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                SkillSwap
              </h1>
              <p className="text-xs text-slate-400">Future of Learning</p>
            </div>
          </div>

          {/* Navigation Tabs */}
          {currentUser && (
            <nav className="hidden md:flex space-x-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => onTabChange(tab.id)}
                    className={`px-4 py-2 rounded-lg flex items-center space-x-2 transition-all duration-300 ${
                      activeTab === tab.id
                        ? 'bg-cyan-500/20 text-cyan-400 shadow-lg shadow-cyan-500/25'
                        : 'text-slate-400 hover:text-cyan-400 hover:bg-slate-800/50'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          )}

          {/* Home Button for Non-Authenticated Users */}
          {!currentUser && (
            <button
              onClick={() => onTabChange('home')}
              className="hidden md:flex px-4 py-2 text-slate-400 hover:text-cyan-400 hover:bg-slate-800/50 rounded-lg transition-all duration-300 items-center space-x-2"
            >
              <span className="text-sm font-medium">Home</span>
            </button>
          )}

          {/* User Profile or Auth */}
          <div className="flex items-center space-x-4">
            {currentUser ? (
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => onTabChange('profile')}
                  className="flex items-center space-x-2 px-3 py-2 bg-slate-800/50 hover:bg-slate-700/50 rounded-lg transition-all duration-300"
                >
                <div className="relative">
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-10 h-10 rounded-full border-2 border-cyan-400/50 shadow-lg shadow-cyan-500/25"
                  />
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-slate-900"></div>
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-medium text-white">{currentUser.name}</p>
                  {currentUser.isAdmin && (
                    <p className="text-xs text-cyan-400">Administrator</p>
                  )}
                </div>
                </button>
                <button
                  onClick={onLogout}
                  className="p-2 text-slate-400 hover:text-red-400 hover:bg-slate-800/50 rounded-lg transition-all duration-300"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl font-medium shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-300 hover:scale-105"
              >
                Sign In
              </button>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        {currentUser && (
          <nav className="md:hidden flex space-x-1 pb-4">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => onTabChange(tab.id)}
                  className={`flex-1 px-3 py-2 rounded-lg flex items-center justify-center space-x-2 transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-cyan-500/20 text-cyan-400'
                      : 'text-slate-400 hover:text-cyan-400'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-xs font-medium">{tab.label}</span>
                </button>
              );
            })}
          </nav>
        )}
      </div>
    </header>
  );
}