import { Bot, MessageCircle, Send, User, X } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm your SkillSwap assistant. I can help you navigate the platform, find the right skills, or answer any questions you have. How can I assist you today?",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  useEffect(scrollToBottom, [messages]);

  // Default “other” random responses
  const botResponses = [
    "I'd be happy to help you with that! SkillSwap makes it easy to connect with other learners.",
    "Great question! You can search for skills using our advanced filters in the Discover section.",
    "To get started, simply create an account and add your skills to your profile. Then you can start browsing other users!",
    "Our rating system helps ensure quality exchanges. Users rate each other after completing skill swaps.",
    "You can filter by availability, skill category, and minimum rating to find the perfect learning partner.",
    "Safety is our priority. We have community guidelines and moderation tools to ensure positive experiences.",
    "Feel free to explore the platform! If you need more help, you can always come back and ask me anything.",
    "The admin dashboard provides powerful tools for platform moderation and user management.",
    "Skill tags are interactive - click on them to search for users with similar skills!",
    "Your profile visibility can be toggled between public and private in your settings."
  ];

  // Quick questions mapped to their exact answers
  const quickQA: Record<string, string> = {
    "How do I start a skill swap?":
      "You start a skill swap by browsing profiles, clicking 'Request Swap', selecting your offered skill, their wanted skill, and adding a custom note.",
    "What skills are most popular?":
      "Popular skills include Photoshop, Excel, JavaScript, and public speaking—check our Discover page to see real-time stats!",
    "How does the rating system work?":
      "After each swap, both participants leave a star rating (1–5) and feedback. Your overall rating is the average of all completed swaps.",
    "Is the platform free to use?":
      "Yes—SkillSwap is completely free. We believe in open access to learning and sharing skills!"
  };
  const quickQuestions = Object.keys(quickQA);

  const handleSendMessage = () => {
    const text = inputValue.trim();
    if (!text) return;

    // Add the user's message
    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      isBot: false,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate a typing delay, then choose response
    setTimeout(() => {
      const predefined = quickQA[text];
      const replyText = predefined ?? botResponses[Math.floor(Math.random() * botResponses.length)];
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: replyText,
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 800);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-full shadow-lg hover:shadow-cyan-500/40 transition-transform duration-300 ${isOpen ? 'scale-0' : 'scale-100'}`}
      >
        <MessageCircle className="w-6 h-6" />
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-96 h-[500px] backdrop-blur-xl bg-slate-800/90 border border-slate-700/50 rounded-2xl shadow-2xl shadow-cyan-500/20 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-slate-700/50 bg-gradient-to-r from-cyan-500/10 to-blue-500/10">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-white font-semibold">SkillSwap Assistant</h3>
                <div className="flex items-center space-x-1 text-slate-400 text-xs">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span>Online</span>
                </div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="p-2 text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-lg">
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map(msg => (
              <div key={msg.id} className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}>
                <div className={`flex items-start space-x-2 max-w-[80%] ${msg.isBot ? '' : 'flex-row-reverse space-x-reverse'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${msg.isBot ? 'bg-gradient-to-br from-cyan-400 to-blue-500' : 'bg-gradient-to-br from-purple-400 to-pink-500'}`}>
                    {msg.isBot ? <Bot className="w-4 h-4 text-white" /> : <User className="w-4 h-4 text-white" />}
                  </div>
                  <div className={`px-4 py-2 rounded-2xl ${msg.isBot ? 'bg-slate-700/50 text-slate-200' : 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white'}`}>
                    <p className="text-sm">{msg.text}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-start space-x-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="px-4 py-2 bg-slate-700/50 rounded-2xl">
                    <div className="flex space-x-1">
                      {[0,1,2].map(i => (
                        <div key={i} className={`w-2 h-2 bg-cyan-400 rounded-full animate-bounce delay-${i*100}`}></div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions */}
          {messages.length === 1 && (
            <div className="p-4 border-t border-slate-700/50 space-y-2">
              <p className="text-xs text-slate-400 text-center">Quick questions:</p>
              {quickQuestions.map((q, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setInputValue(q);
                    handleSendMessage();
                  }}
                  className="w-full text-left px-3 py-2 bg-slate-700/30 hover:bg-slate-700/50 text-slate-300 rounded-lg text-sm transition-all duration-300 border border-slate-600/30 hover:border-cyan-400/50"
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t border-slate-700/50">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything..."
                className="flex-1 px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400/50 focus:shadow-lg focus:shadow-cyan-500/20 transition-all duration-300 text-sm"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim()}
                className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
