import React from 'react';
import { MessageCircle, Video, Bot, Shield, Settings, Users, Phone, Zap, LogOut, Headphones, Brain, MapPin, Briefcase, DollarSign, Calendar } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface SidebarProps {
  onShowLiveStream: () => void;
  onShowAI: () => void;
  onShowSecurity: () => void;
  onShowAISupport: () => void;
  onShowMaps: () => void;
  onShowJobs: () => void;
  onShowHR: () => void;
  onShowMeetings: () => void;
  onShowComprehensiveAI: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onShowLiveStream, onShowAI, onShowSecurity, onShowAISupport, onShowMaps, onShowJobs, onShowHR, onShowMeetings, onShowComprehensiveAI }) => {
  const { user, logout } = useAuth();

  const menuItems = [
    { icon: MessageCircle, label: 'Chats', active: true },
    { icon: Calendar, label: 'Meetings 2050', onClick: onShowMeetings },
    { icon: Video, label: 'Live Stream', onClick: onShowLiveStream },
    { icon: Bot, label: 'Vision AI', onClick: onShowAI },
    { icon: Shield, label: 'Security', onClick: onShowSecurity },
    { icon: Headphones, label: 'AI Support', onClick: onShowComprehensiveAI },
    { icon: MapPin, label: 'Quantum Maps', onClick: onShowMaps },
    { icon: Briefcase, label: 'Jobs 2050', onClick: onShowJobs },
    { icon: DollarSign, label: 'HR Tools', onClick: onShowHR },
    { icon: Users, label: 'Groups' },
    { icon: Phone, label: 'Calls' },
    { icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="w-20 bg-black/40 backdrop-blur-xl border-r border-gray-800/50 flex flex-col items-center py-6">
      {/* Logo */}
      <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl flex items-center justify-center mb-8">
        <Zap className="w-6 h-6 text-white" />
      </div>

      {/* Menu Items */}
      <div className="space-y-4 flex-1">
        {menuItems.map((item, index) => (
          <button
            key={index}
            onClick={item.onClick}
            className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all hover:scale-110 ${
              item.active 
                ? 'bg-cyan-600 text-white' 
                : 'bg-gray-800/50 text-gray-400 hover:bg-gray-700/50 hover:text-white'
            }`}
            title={item.label}
          >
            <item.icon className="w-6 h-6" />
          </button>
        ))}
      </div>

      {/* User Profile */}
      <div className="mt-auto space-y-4">
        <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-orange-500 rounded-xl flex items-center justify-center">
          <span className="text-white font-semibold">{user?.name?.[0] || 'U'}</span>
        </div>
        <button
          onClick={logout}
          className="w-12 h-12 bg-red-600/20 rounded-xl flex items-center justify-center text-red-400 hover:bg-red-600/30 transition-all"
          title="Logout"
        >
          <LogOut className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};