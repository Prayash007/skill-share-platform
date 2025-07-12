import React, { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Chatbot } from './components/Chatbot';
import { LandingHero } from './components/LandingHero';
import { UserCard } from './components/UserCard';
import { SearchBar } from './components/SearchBar';
import { SwapRequestModal } from './components/SwapRequestModal';
import { SwapRequestCard } from './components/SwapRequestCard';
import { AuthModal } from './components/AuthModal';
import { AdminDashboard } from './components/AdminDashboard';
import { Pagination } from './components/Pagination';
import { UserProfile } from './components/UserProfile';
import { useAuth } from './hooks/useAuth';
import { useUsers } from './hooks/useUsers';
import { useSwapRequests } from './hooks/useSwapRequests';
import { User, SwapRequest, SearchFilters } from './types';

function App() {
  const { user: currentUser, loading: authLoading, signIn, signUp, signOut } = useAuth();
  const { users, loading: usersLoading, updateUserProfile, deleteUser } = useUsers();
  const { swapRequests, loading: requestsLoading, createSwapRequest, updateSwapRequest, deleteSwapRequest } = useSwapRequests(currentUser?.id);
  
  const [activeTab, setActiveTab] = useState('discover');
  
  // Modal states
  const [showAuth, setShowAuth] = useState(false);
  const [showSwapRequest, setShowSwapRequest] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  
  // Search and pagination
  const [searchFilters, setSearchFilters] = useState<SearchFilters>({
    query: '',
    skillCategory: 'All Categories',
    availability: 'Any Time',
    minRating: 0
  });
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 6;

  // Show loading state
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading SkillSwap...</p>
        </div>
      </div>
    );
  }

  // Filter users based on search criteria
  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      if (user.id === currentUser?.id) return false;
      
      const matchesQuery = !searchFilters.query || 
        user.name.toLowerCase().includes(searchFilters.query.toLowerCase()) ||
        user.skillsOffered.some(skill => skill.toLowerCase().includes(searchFilters.query.toLowerCase())) ||
        user.skillsWanted.some(skill => skill.toLowerCase().includes(searchFilters.query.toLowerCase()));
      
      const matchesRating = user.rating >= searchFilters.minRating;
      
      const matchesAvailability = searchFilters.availability === 'Any Time' ||
        user.availability.includes(searchFilters.availability);
      
      return matchesQuery && matchesRating && matchesAvailability;
    });
  }, [users, searchFilters, currentUser]);

  // Pagination
  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleLogin = async (email: string, password: string) => {
    try {
      await signIn(email, password);
      setActiveTab('discover');
      setShowAuth(false);
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed. Please check your credentials.');
    }
  };

  const handleSignup = async (name: string, email: string, password: string) => {
    try {
      await signUp(email, password, name);
      setActiveTab('discover');
      setShowAuth(false);
      alert('Account created successfully! Please check your email to verify your account.');
    } catch (error) {
      console.error('Signup error:', error);
      alert('Signup failed. Please try again.');
    }
  };

  const handleLogout = async () => {
    try {
      await signOut();
      setActiveTab('discover');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleRequestSwap = (targetUser: User) => {
    if (!currentUser) {
      setShowAuth(true);
      return;
    }
    setSelectedUser(targetUser);
    setShowSwapRequest(true);
  };

  const handleSubmitSwapRequest = async (data: {
    skillOffered: string;
    skillWanted: string;
    message: string;
  }) => {
    if (!currentUser || !selectedUser) return;

    const success = await createSwapRequest({
      toUserId: selectedUser.id,
      skillOffered: data.skillOffered,
      skillWanted: data.skillWanted,
      message: data.message
    });

    if (success) {
      setSelectedUser(null);
      setShowSwapRequest(false);
    } else {
      alert('Failed to send swap request. Please try again.');
    }
  };

  const handleSwapAction = async (requestId: string, action: 'accept' | 'reject' | 'delete') => {
    if (action === 'delete') {
      await deleteSwapRequest(requestId);
    } else {
      await updateSwapRequest(requestId, action === 'accept' ? 'accepted' : 'rejected');
    }
  };

  const handleBanUser = async (userId: string) => {
    const success = await deleteUser(userId);
    if (success) {
      alert('User has been banned successfully.');
    } else {
      alert('Failed to ban user. Please try again.');
    }
  };

  const handleSendNotification = (message: string) => {
    // In a real app, this would send notifications to all users
    alert(`Notification sent to all users: ${message}`);
  };

  const handleUpdateProfile = async (updatedData: Partial<User>) => {
    if (!currentUser) return;
    
    const success = await updateUserProfile(currentUser.id, updatedData);
    if (success) {
      setActiveTab('discover');
    } else {
      alert('Failed to update profile. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <Header
        currentUser={currentUser}
        onOpenAuth={() => setShowAuth(true)}
        onLogout={handleLogout}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!currentUser ? (
          // Landing Page
          <LandingHero onGetStarted={() => setShowAuth(true)} />
        ) : activeTab === 'profile' ? (
          // User Profile
          <UserProfile
            user={users.find(u => u.id === currentUser.id)!}
            onSave={handleUpdateProfile}
            onCancel={() => setActiveTab('discover')}
          />
        ) : activeTab === 'discover' ? (
          // Discover Tab
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Discover Skills</h1>
              <p className="text-slate-400">Find talented individuals to exchange knowledge with</p>
            </div>

            {usersLoading ? (
              <div className="text-center py-20">
                <div className="w-12 h-12 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-slate-400">Loading users...</p>
              </div>
            ) : (
              <>
            <SearchBar filters={searchFilters} onFiltersChange={setSearchFilters} />

            <div className="flex items-center justify-between">
              <p className="text-slate-400">
                {filteredUsers.length} {filteredUsers.length === 1 ? 'person' : 'people'} found
              </p>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedUsers.map((user) => (
                <UserCard
                  key={user.id}
                  user={user}
                  currentUserId={currentUser.id}
                  onRequestSwap={handleRequestSwap}
                  onViewProfile={(user) => console.log('View profile:', user)}
                />
              ))}
            </div>

            {filteredUsers.length === 0 && (
              <div className="text-center py-20">
                <p className="text-xl text-slate-400">No users found matching your criteria.</p>
                <button
                  onClick={() => setSearchFilters({
                    query: '',
                    skillCategory: 'All Categories',
                    availability: 'Any Time',
                    minRating: 0
                  })}
                  className="mt-4 px-6 py-2 bg-cyan-600/20 text-cyan-400 border border-cyan-400/50 rounded-xl hover:bg-cyan-600/30 transition-all duration-300"
                >
                  Clear Filters
                </button>
              </div>
            )}
              </>
            )}
          </div>
        ) : activeTab === 'requests' ? (
          // Swap Requests Tab
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">My Skill Swaps</h1>
              <p className="text-slate-400">Manage your skill exchange requests</p>
            </div>

            {requestsLoading ? (
              <div className="text-center py-20">
                <div className="w-12 h-12 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-slate-400">Loading requests...</p>
              </div>
            ) : (
            <div className="space-y-6">
              {swapRequests.length === 0 ? (
                <div className="text-center py-20">
                  <p className="text-xl text-slate-400 mb-4">No swap requests yet.</p>
                  <button
                    onClick={() => setActiveTab('discover')}
                    className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl font-medium shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-300 hover:scale-105"
                  >
                    Discover Skills
                  </button>
                </div>
              ) : (
                swapRequests.map((request) => {
                  const fromUser = users.find(u => u.id === request.fromUserId)!;
                  const toUser = users.find(u => u.id === request.toUserId)!;
                  
                  if (!fromUser || !toUser) return null;
                  
                  return (
                    <SwapRequestCard
                      key={request.id}
                      request={request}
                      fromUser={fromUser}
                      toUser={toUser}
                      currentUserId={currentUser.id}
                      onAccept={(id) => handleSwapAction(id, 'accept')}
                      onReject={(id) => handleSwapAction(id, 'reject')}
                      onDelete={(id) => handleSwapAction(id, 'delete')}
                    />
                  );
                })
              )}
            </div>
            )}
          </div>
        ) : activeTab === 'admin' && currentUser?.isAdmin ? (
          // Admin Dashboard
          <AdminDashboard
            users={users}
            swapRequests={swapRequests}
            onBanUser={handleBanUser}
            onSendNotification={handleSendNotification}
          />
        ) : null}
      </main>

      <Footer />
      <Chatbot />

      {/* Modals */}
      <AuthModal
        isOpen={showAuth}
        onClose={() => setShowAuth(false)}
        onLogin={handleLogin}
        onSignup={handleSignup}
      />

      {selectedUser && (
        <SwapRequestModal
          isOpen={showSwapRequest}
          onClose={() => {
            setShowSwapRequest(false);
            setSelectedUser(null);
          }}
          targetUser={selectedUser}
          currentUser={users.find(u => u.id === currentUser?.id)!}
          onSubmit={handleSubmitSwapRequest}
        />
      )}
    </div>
  );
}

export default App;