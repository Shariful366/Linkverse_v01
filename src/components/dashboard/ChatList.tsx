import React, { useState } from 'react';
import { Search, Plus, MoreHorizontal, Users, User, Bot, Shield, Zap } from 'lucide-react';

interface ChatListProps {
  onSelectChat: (chatId: string) => void;
  activeChat: string | null;
}

export const ChatList: React.FC<ChatListProps> = ({ onSelectChat, activeChat }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const chats = [
    {
      id: '1',
      name: 'Sarah Chen',
      lastMessage: 'Hey! How are you doing?',
      time: '2m ago',
      unread: 2,
      type: 'direct',
      online: true,
      avatar: 'SC',
      aiSafetyScore: 98,
      encrypted: true
    },
    {
      id: '2',
      name: 'Project Alpha Team',
      lastMessage: 'Meeting starts in 15 minutes',
      time: '10m ago',
      unread: 5,
      type: 'group',
      online: false,
      avatar: 'PA',
      aiSafetyScore: 95,
      encrypted: true
    },
    {
      id: '3',
      name: 'Vision AI Assistant',
      lastMessage: 'I can help you with any questions!',
      time: '1h ago',
      unread: 0,
      type: 'ai',
      online: true,
      avatar: 'AI',
      aiSafetyScore: 100,
      encrypted: true
    },
    {
      id: '4',
      name: 'Marcus Rodriguez',
      lastMessage: 'Thanks for the presentation!',
      time: '2h ago',
      unread: 0,
      type: 'direct',
      online: false,
      avatar: 'MR',
      aiSafetyScore: 92,
      encrypted: true
    },
    {
      id: '5',
      name: 'Design Team',
      lastMessage: 'New mockups are ready for review',
      time: '3h ago',
      unread: 1,
      type: 'group',
      online: true,
      avatar: 'DT',
      aiSafetyScore: 97,
      encrypted: true
    }
  ];

  const filteredChats = chats.filter(chat =>
    chat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getChatIcon = (type: string) => {
    switch (type) {
      case 'group':
        return <Users className="w-4 h-4 text-cyan-400" />;
      case 'ai':
        return <Bot className="w-4 h-4 text-purple-400" />;
      default:
        return <User className="w-4 h-4 text-gray-400" />;
    }
  };

  const getAvatarGradient = (type: string) => {
    switch (type) {
      case 'ai':
        return 'bg-gradient-to-r from-purple-500 to-pink-500';
      case 'group':
        return 'bg-gradient-to-r from-cyan-500 to-blue-500';
      default:
        return 'bg-gradient-to-r from-orange-500 to-red-500';
    }
  };

  return (
    <div className="w-80 bg-black/30 backdrop-blur-xl border-r border-gray-800/50 flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-800/50">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-white">Messages</h2>
          <button className="w-8 h-8 bg-cyan-600 rounded-full flex items-center justify-center hover:bg-cyan-700 transition-colors">
            <Plus className="w-4 h-4 text-white" />
          </button>
        </div>
        
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search messages..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 transition-colors"
          />
        </div>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto">
        {filteredChats.map((chat) => (
          <div
            key={chat.id}
            onClick={() => onSelectChat(chat.id)}
            className={`p-4 cursor-pointer transition-all hover:bg-gray-800/50 ${
              activeChat === chat.id ? 'bg-cyan-600/20 border-r-2 border-cyan-500' : ''
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold ${getAvatarGradient(chat.type)}`}>
                  {chat.avatar}
                </div>
                {chat.online && (
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-black"></div>
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <h3 className="font-semibold text-white truncate">{chat.name}</h3>
                    {getChatIcon(chat.type)}
                    {chat.encrypted && <Shield className="w-3 h-3 text-green-400" />}
                  </div>
                  <span className="text-xs text-gray-400">{chat.time}</span>
                </div>
                
                <div className="flex items-center justify-between mt-1">
                  <p className="text-sm text-gray-300 truncate">{chat.lastMessage}</p>
                  <div className="flex items-center space-x-2">
                    {chat.unread > 0 && (
                      <span className="bg-cyan-500 text-white text-xs rounded-full px-2 py-1 min-w-[1.5rem] h-6 flex items-center justify-center">
                        {chat.unread}
                      </span>
                    )}
                    <div className="flex items-center space-x-1">
                      <Zap className="w-3 h-3 text-yellow-400" />
                      <span className="text-xs text-gray-400">{chat.aiSafetyScore}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Actions */}
      <div className="p-4 border-t border-gray-800/50">
        <div className="flex items-center justify-between text-sm text-gray-400">
          <span>Quantum Encrypted</span>
          <Shield className="w-4 h-4 text-green-400" />
        </div>
      </div>
    </div>
  );
};