import React from 'react';
import { User, Mail, Phone, MapPin, Github, Twitter, Linkedin, Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="relative mt-20 backdrop-blur-xl bg-slate-900/80 border-t border-cyan-500/20">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  SkillSwap
                </h3>
                <p className="text-xs text-slate-400">Future of Learning</p>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Connecting minds, sharing knowledge, and building the future of peer-to-peer learning through innovative skill exchange.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="p-2 text-slate-400 hover:text-cyan-400 hover:bg-slate-800/50 rounded-lg transition-all duration-300">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 text-slate-400 hover:text-cyan-400 hover:bg-slate-800/50 rounded-lg transition-all duration-300">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 text-slate-400 hover:text-cyan-400 hover:bg-slate-800/50 rounded-lg transition-all duration-300">
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Platform</h4>
            <ul className="space-y-2">
              {['How It Works', 'Success Stories', 'Skill Categories', 'Safety Guidelines', 'Community Rules'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors duration-300 text-sm">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Support</h4>
            <ul className="space-y-2">
              {['Help Center', 'Contact Us', 'Report Issue', 'Feature Request', 'API Documentation'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors duration-300 text-sm">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Connect</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-slate-400 text-sm">
                <Mail className="w-4 h-4 text-cyan-400" />
                <span>hello@skillswap.com</span>
              </div>
              <div className="flex items-center space-x-3 text-slate-400 text-sm">
                <Phone className="w-4 h-4 text-cyan-400" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3 text-slate-400 text-sm">
                <MapPin className="w-4 h-4 text-cyan-400" />
                <span>San Francisco, CA</span>
              </div>
            </div>
            
            {/* Newsletter Signup */}
            <div className="mt-6">
              <h5 className="text-sm font-medium text-white mb-2">Stay Updated</h5>
              <div className="flex space-x-2">
                <input
                  type="email"
                  placeholder="Enter email"
                  className="flex-1 px-3 py-2 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white placeholder-slate-400 text-sm focus:outline-none focus:border-cyan-400/50 transition-all duration-300"
                />
                <button className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg text-sm font-medium hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300">
                  Join
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-700/50 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4 text-slate-400 text-sm">
            <span>© 2024 SkillSwap. All rights reserved.</span>
            <span>•</span>
            <a href="#" className="hover:text-cyan-400 transition-colors duration-300">Privacy Policy</a>
            <span>•</span>
            <a href="#" className="hover:text-cyan-400 transition-colors duration-300">Terms of Service</a>
          </div>
          <div className="flex items-center space-x-2 text-slate-400 text-sm">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-red-400 animate-pulse" />
            <span>for the learning community</span>
          </div>
        </div>
      </div>
    </footer>
  );
}