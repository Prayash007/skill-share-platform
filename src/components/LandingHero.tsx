import React from 'react';
import { ArrowRight, Users, Star, Zap, Shield, Globe, TrendingUp } from 'lucide-react';

interface LandingHeroProps {
  onGetStarted: () => void;
}

export function LandingHero({ onGetStarted }: LandingHeroProps) {
  const stats = [
    { icon: Users, value: '50K+', label: 'Active Learners' },
    { icon: Star, value: '4.9/5', label: 'Average Rating' },
    { icon: Zap, value: '100K+', label: 'Skills Exchanged' },
    { icon: Globe, value: '150+', label: 'Countries' }
  ];

  const features = [
    {
      icon: Shield,
      title: 'Verified Skills',
      description: 'Trust our comprehensive rating system and verified skill assessments for quality exchanges.'
    },
    {
      icon: Zap,
      title: 'Instant Matching',
      description: 'AI-powered matching connects you with the perfect learning partners in seconds.'
    },
    {
      icon: TrendingUp,
      title: 'Track Progress',
      description: 'Monitor your learning journey with detailed analytics and achievement badges.'
    }
  ];

  return (
    <div className="relative">
      {/* Hero Section */}
      <div className="text-center py-20 px-4">
        {/* Badge */}
        <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/30 rounded-full px-4 py-2 mb-8">
          <Zap className="w-4 h-4 text-cyan-400" />
          <span className="text-cyan-300 text-sm font-medium">The Future of Learning is Here</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6">
          <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            SkillSwap
          </span>
          <br />
          <span className="text-white text-4xl sm:text-5xl lg:text-6xl">
            Exchange Knowledge,
          </span>
          <br />
          <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent text-4xl sm:text-5xl lg:text-6xl">
            Unlock Potential
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl sm:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
          Connect with passionate learners worldwide. Share your expertise, discover new skills, 
          and build meaningful relationships through our revolutionary peer-to-peer learning platform.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-16">
          <button
            onClick={onGetStarted}
            className="group px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-2xl font-semibold text-lg shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-300 hover:scale-105 flex items-center space-x-2"
          >
            <span>Start Learning Today</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
          <button className="px-8 py-4 border border-slate-600/50 text-slate-300 rounded-2xl font-semibold text-lg hover:border-cyan-400/50 hover:text-cyan-400 hover:bg-slate-800/50 transition-all duration-300">
            Watch Demo
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 border border-cyan-400/30 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <Icon className="w-6 h-6 text-cyan-400" />
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-slate-400 text-sm">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Why Choose SkillSwap?
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Experience the next generation of learning with cutting-edge features designed for modern learners.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group backdrop-blur-xl bg-slate-800/40 border border-slate-700/50 rounded-2xl p-8 hover:border-cyan-400/50 hover:shadow-2xl hover:shadow-cyan-500/20 transition-all duration-500 hover:scale-105"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 border border-cyan-400/30 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-8 h-8 text-cyan-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            How It Works
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Get started in three simple steps and begin your learning journey today.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              step: '01',
              title: 'Create Your Profile',
              description: 'Add your skills, interests, and availability to showcase your expertise and learning goals.'
            },
            {
              step: '02',
              title: 'Find Learning Partners',
              description: 'Browse our community of learners and discover people with complementary skills.'
            },
            {
              step: '03',
              title: 'Start Exchanging',
              description: 'Connect, schedule sessions, and begin your mutual learning journey with confidence.'
            }
          ].map((step, index) => (
            <div key={index} className="relative text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-cyan-500/25">
                <span className="text-2xl font-bold text-white">{step.step}</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">{step.title}</h3>
              <p className="text-slate-400 leading-relaxed">{step.description}</p>
              
              {/* Connector Line */}
              {index < 2 && (
                <div className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-cyan-500/50 to-transparent"></div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20">
        <div className="backdrop-blur-xl bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-400/20 rounded-3xl p-12 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to Transform Your Learning?
          </h2>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Join thousands of learners who are already exchanging skills and building their future.
          </p>
          <button
            onClick={onGetStarted}
            className="group px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-2xl font-semibold text-lg shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-300 hover:scale-105 flex items-center space-x-2 mx-auto"
          >
            <span>Join SkillSwap Now</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </div>
  );
}