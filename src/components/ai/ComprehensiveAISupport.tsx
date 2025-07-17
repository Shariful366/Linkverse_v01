import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, Mic, FileText, Image, Video, Headphones, Brain, Zap, Shield, Globe, Heart, Lightbulb, Search, TrendingUp, Users, Calendar, MessageSquare, Settings, Phone, Mail, HelpCircle, AlertTriangle, CheckCircle, Star, X } from 'lucide-react';

interface ComprehensiveAISupportProps {
  onClose: () => void;
}

interface SupportCategory {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
  description: string;
  features: string[];
}

interface AIAgent {
  id: string;
  name: string;
  specialty: string;
  avatar: string;
  status: 'online' | 'busy' | 'offline';
  rating: number;
  languages: string[];
  expertise: string[];
}

export const ComprehensiveAISupport: React.FC<ComprehensiveAISupportProps> = ({ onClose }) => {
  const [activeCategory, setActiveCategory] = useState<string>('general');
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [chatHistory, setChatHistory] = useState<any[]>([]);
  const [supportTickets, setSupportTickets] = useState<any[]>([]);

  const supportCategories: SupportCategory[] = [
    {
      id: 'general',
      name: 'General Support',
      icon: HelpCircle,
      description: 'General questions and platform guidance',
      features: ['24/7 availability', 'Multi-language', 'Instant responses']
    },
    {
      id: 'technical',
      name: 'Technical Issues',
      icon: Settings,
      description: 'Technical problems and troubleshooting',
      features: ['System diagnostics', 'Error resolution', 'Performance optimization']
    },
    {
      id: 'security',
      name: 'Security & Privacy',
      icon: Shield,
      description: 'Security concerns and privacy questions',
      features: ['Threat analysis', 'Privacy guidance', 'Compliance support']
    },
    {
      id: 'business',
      name: 'Business Solutions',
      icon: TrendingUp,
      description: 'Enterprise and business-related support',
      features: ['Integration help', 'Scaling guidance', 'Custom solutions']
    },
    {
      id: 'meetings',
      name: 'Meetings & Collaboration',
      icon: Video,
      description: 'Meeting platform and collaboration tools',
      features: ['Setup assistance', 'Feature guidance', 'Troubleshooting']
    },
    {
      id: 'hr',
      name: 'HR & Payroll',
      icon: Users,
      description: 'Human resources and payroll support',
      features: ['Payroll setup', 'Employee management', 'Compliance guidance']
    },
    {
      id: 'jobs',
      name: 'Career & Jobs',
      icon: Lightbulb,
      description: 'Career development and job platform',
      features: ['Career coaching', 'Job matching', 'Profile optimization']
    },
    {
      id: 'maps',
      name: 'Maps & Navigation',
      icon: Globe,
      description: 'Location services and navigation',
      features: ['Route optimization', 'Location sharing', 'AR navigation']
    }
  ];

  const aiAgents: AIAgent[] = [
    {
      id: '1',
      name: 'Vision AI',
      specialty: 'General Assistant',
      avatar: 'VA',
      status: 'online',
      rating: 4.9,
      languages: ['English', 'Spanish', 'French', 'Chinese', 'Arabic'],
      expertise: ['Platform guidance', 'Feature explanation', 'Quick solutions']
    },
    {
      id: '2',
      name: 'TechBot Pro',
      specialty: 'Technical Support',
      avatar: 'TB',
      status: 'online',
      rating: 4.8,
      languages: ['English', 'German', 'Japanese', 'Russian'],
      expertise: ['System diagnostics', 'Bug fixes', 'Performance tuning']
    },
    {
      id: '3',
      name: 'SecureAI',
      specialty: 'Security Expert',
      avatar: 'SA',
      status: 'online',
      rating: 5.0,
      languages: ['English', 'Hebrew', 'Korean'],
      expertise: ['Threat analysis', 'Privacy protection', 'Compliance']
    },
    {
      id: '4',
      name: 'BizAssist',
      specialty: 'Business Solutions',
      avatar: 'BA',
      status: 'busy',
      rating: 4.7,
      languages: ['English', 'Portuguese', 'Italian'],
      expertise: ['Enterprise setup', 'Integration', 'Scaling strategies']
    },
    {
      id: '5',
      name: 'MeetingMaster',
      specialty: 'Collaboration Expert',
      avatar: 'MM',
      status: 'online',
      rating: 4.9,
      languages: ['English', 'French', 'Dutch'],
      expertise: ['Meeting setup', 'Holographic conferences', 'Team collaboration']
    },
    {
      id: '6',
      name: 'HRGenius',
      specialty: 'HR & Payroll',
      avatar: 'HG',
      status: 'online',
      rating: 4.8,
      languages: ['English', 'Spanish', 'Hindi'],
      expertise: ['Payroll management', 'Employee relations', 'Compliance']
    },
    {
      id: '7',
      name: 'CareerCoach',
      specialty: 'Career Development',
      avatar: 'CC',
      status: 'online',
      rating: 4.9,
      languages: ['English', 'Chinese', 'Japanese'],
      expertise: ['Job matching', 'Career planning', 'Skill development']
    },
    {
      id: '8',
      name: 'NaviAI',
      specialty: 'Navigation Expert',
      avatar: 'NA',
      status: 'online',
      rating: 4.7,
      languages: ['English', 'Arabic', 'Turkish'],
      expertise: ['Route planning', 'AR navigation', 'Location services']
    }
  ];

  const quickActions = [
    { id: 'account', label: 'Account Issues', icon: Users },
    { id: 'billing', label: 'Billing Support', icon: TrendingUp },
    { id: 'features', label: 'Feature Request', icon: Lightbulb },
    { id: 'bug', label: 'Report Bug', icon: AlertTriangle },
    { id: 'security', label: 'Security Concern', icon: Shield },
    { id: 'integration', label: 'API Integration', icon: Settings }
  ];

  const recentConversations = [
    {
      id: '1',
      agent: 'Vision AI',
      topic: 'Setting up quantum encryption',
      time: '2 hours ago',
      status: 'resolved',
      satisfaction: 5
    },
    {
      id: '2',
      agent: 'TechBot Pro',
      topic: 'Meeting audio issues',
      time: '1 day ago',
      status: 'resolved',
      satisfaction: 4
    },
    {
      id: '3',
      agent: 'HRGenius',
      topic: 'Payroll configuration',
      time: '3 days ago',
      status: 'resolved',
      satisfaction: 5
    }
  ];

  const handleSendMessage = () => {
    if (query.trim()) {
      const newMessage = {
        id: Date.now().toString(),
        user: 'You',
        message: query,
        time: new Date().toLocaleTimeString(),
        type: 'user'
      };

      setChatHistory(prev => [...prev, newMessage]);

      // Simulate AI response
      setTimeout(() => {
        const aiResponse = {
          id: (Date.now() + 1).toString(),
          user: selectedAgent ? aiAgents.find(a => a.id === selectedAgent)?.name : 'Vision AI',
          message: generateAIResponse(query, activeCategory),
          time: new Date().toLocaleTimeString(),
          type: 'ai',
          suggestions: generateSuggestions(activeCategory)
        };
        setChatHistory(prev => [...prev, aiResponse]);
      }, 1000);

      setQuery('');
    }
  };

  const generateAIResponse = (query: string, category: string): string => {
    const responses = {
      general: "I'm here to help you with any questions about Linkverse 2050. Our platform offers quantum-encrypted communication, AI-powered features, and enterprise-grade security. What specific area would you like assistance with?",
      technical: "I can help diagnose and resolve technical issues. Let me run a quick system check... Everything appears to be functioning normally. Could you provide more details about the specific problem you're experiencing?",
      security: "Security is our top priority at Linkverse. We use quantum encryption, multi-factor authentication, and AI-powered threat detection. Your data is protected with military-grade security. What security aspect concerns you?",
      business: "For business solutions, I can help with enterprise setup, team management, integration options, and scaling strategies. Our platform supports organizations from startups to global enterprises. What's your specific business need?",
      meetings: "Our meeting platform supports holographic conferences, AR collaboration, and quantum-secure communications. I can help you set up meetings, configure features, or troubleshoot any issues. What would you like to know?",
      hr: "Our HR tools include AI-powered payroll, employee management, and compliance features. I can guide you through setup, payment processing, or any HR-related questions. How can I assist with your HR needs?",
      jobs: "Our job platform uses AI to match candidates with opportunities, provides career coaching, and offers networking features beyond traditional platforms. What career-related assistance do you need?",
      maps: "Our mapping system offers quantum-precision navigation, AR overlays, and secure location sharing. I can help with setup, privacy settings, or navigation features. What mapping feature interests you?"
    };

    return responses[category as keyof typeof responses] || responses.general;
  };

  const generateSuggestions = (category: string): string[] => {
    const suggestions = {
      general: ['Platform overview', 'Getting started guide', 'Feature comparison'],
      technical: ['Run diagnostics', 'Check system status', 'Update troubleshooting'],
      security: ['Security audit', 'Privacy settings', 'Threat assessment'],
      business: ['Enterprise demo', 'Integration options', 'Pricing plans'],
      meetings: ['Schedule meeting', 'Test audio/video', 'Enable holographic mode'],
      hr: ['Setup payroll', 'Add employees', 'Generate reports'],
      jobs: ['Optimize profile', 'Find opportunities', 'Career assessment'],
      maps: ['Share location', 'Plan route', 'Enable AR navigation']
    };

    return suggestions[category as keyof typeof suggestions] || suggestions.general;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'busy': return 'bg-yellow-500';
      case 'offline': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-xl flex items-center justify-center z-50 p-4">
      <div className="w-full max-w-7xl h-full max-h-[95vh] bg-gradient-to-br from-blue-900/30 to-purple-900/30 backdrop-blur-xl rounded-2xl overflow-hidden shadow-2xl border border-blue-500/20">
        {/* Header */}
        <div className="p-6 border-b border-blue-500/20 bg-black/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Linkverse AI Support 2050</h1>
                <p className="text-blue-300">Comprehensive AI-driven assistance for all features</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-green-600/20 px-3 py-1 rounded-lg">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span className="text-green-400 text-sm font-semibold">All Systems Online</span>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex h-full">
          {/* Sidebar - Support Categories */}
          <div className="w-80 bg-black/30 border-r border-blue-500/20 p-6">
            <h3 className="font-semibold text-white mb-4">Support Categories</h3>
            <div className="space-y-2">
              {supportCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`w-full p-3 rounded-lg transition-all text-left ${
                    activeCategory === category.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <category.icon className="w-5 h-5" />
                    <div>
                      <p className="font-medium">{category.name}</p>
                      <p className="text-xs opacity-75">{category.description}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="mt-6">
              <h4 className="font-semibold text-white mb-3">Quick Actions</h4>
              <div className="grid grid-cols-2 gap-2">
                {quickActions.map((action) => (
                  <button
                    key={action.id}
                    className="p-2 bg-gray-800/50 rounded-lg text-gray-300 hover:bg-gray-700/50 transition-colors text-xs"
                  >
                    <action.icon className="w-4 h-4 mx-auto mb-1" />
                    <span>{action.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Recent Conversations */}
            <div className="mt-6">
              <h4 className="font-semibold text-white mb-3">Recent Conversations</h4>
              <div className="space-y-2">
                {recentConversations.map((conv) => (
                  <div key={conv.id} className="p-3 bg-gray-800/50 rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-white text-sm font-medium">{conv.agent}</span>
                      <div className="flex items-center space-x-1">
                        {[...Array(conv.satisfaction)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-400 text-xs">{conv.topic}</p>
                    <p className="text-gray-500 text-xs">{conv.time}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 flex flex-col">
            {/* AI Agents Selection */}
            <div className="p-4 border-b border-blue-500/20 bg-black/20">
              <h3 className="font-semibold text-white mb-3">Available AI Agents</h3>
              <div className="flex space-x-3 overflow-x-auto">
                {aiAgents
                  .filter(agent => {
                    const categoryMap: Record<string, string[]> = {
                      general: ['General Assistant'],
                      technical: ['Technical Support'],
                      security: ['Security Expert'],
                      business: ['Business Solutions'],
                      meetings: ['Collaboration Expert'],
                      hr: ['HR & Payroll'],
                      jobs: ['Career Development'],
                      maps: ['Navigation Expert']
                    };
                    return categoryMap[activeCategory]?.includes(agent.specialty) || activeCategory === 'general';
                  })
                  .map((agent) => (
                    <button
                      key={agent.id}
                      onClick={() => setSelectedAgent(agent.id)}
                      className={`flex-shrink-0 p-3 rounded-lg transition-all ${
                        selectedAgent === agent.id
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="relative">
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                            {agent.avatar}
                          </div>
                          <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-black ${getStatusColor(agent.status)}`}></div>
                        </div>
                        <div className="text-left">
                          <p className="font-medium">{agent.name}</p>
                          <p className="text-xs opacity-75">{agent.specialty}</p>
                          <div className="flex items-center space-x-1 mt-1">
                            <Star className="w-3 h-3 text-yellow-400 fill-current" />
                            <span className="text-xs">{agent.rating}</span>
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {chatHistory.length === 0 ? (
                <div className="text-center py-12">
                  <Bot className="w-16 h-16 mx-auto text-blue-400 mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">AI Support Ready</h3>
                  <p className="text-gray-400 mb-6">
                    Ask me anything about {supportCategories.find(c => c.id === activeCategory)?.name.toLowerCase()}
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-md mx-auto">
                    {supportCategories.find(c => c.id === activeCategory)?.features.map((feature, index) => (
                      <button
                        key={index}
                        onClick={() => setQuery(`Tell me about ${feature.toLowerCase()}`)}
                        className="p-3 bg-blue-600/20 rounded-lg text-blue-300 hover:bg-blue-600/30 transition-colors text-sm"
                      >
                        {feature}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                chatHistory.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-2xl ${msg.type === 'user' ? 'order-2' : 'order-1'}`}>
                      <div
                        className={`rounded-2xl p-4 ${
                          msg.type === 'user'
                            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                            : 'bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 text-white'
                        }`}
                      >
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="text-sm font-semibold">{msg.user}</span>
                          {msg.type === 'ai' && <Bot className="w-4 h-4 text-blue-400" />}
                          <span className="text-xs opacity-75">{msg.time}</span>
                        </div>
                        <p className="text-sm leading-relaxed">{msg.message}</p>
                        
                        {msg.suggestions && (
                          <div className="mt-4 space-y-2">
                            <p className="text-xs text-blue-300 font-semibold">Suggested Actions:</p>
                            <div className="grid grid-cols-1 gap-2">
                              {msg.suggestions.map((suggestion: string, index: number) => (
                                <button
                                  key={index}
                                  onClick={() => setQuery(suggestion)}
                                  className="text-xs p-2 bg-blue-600/30 rounded-lg hover:bg-blue-600/50 transition-colors text-left"
                                >
                                  {suggestion}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Input Area */}
            <div className="p-6 border-t border-blue-500/20">
              <div className="flex items-center space-x-4">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder={`Ask about ${supportCategories.find(c => c.id === activeCategory)?.name.toLowerCase()}...`}
                    className="w-full p-4 bg-gray-800/50 border border-blue-500/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>

                <button
                  onClick={() => setIsListening(!isListening)}
                  className={`p-4 rounded-xl transition-all ${
                    isListening 
                      ? 'bg-red-600 text-white animate-pulse' 
                      : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                  }`}
                >
                  <Mic className="w-5 h-5" />
                </button>

                <button
                  onClick={handleSendMessage}
                  disabled={!query.trim()}
                  className="p-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl text-white hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>

              {isListening && (
                <div className="flex items-center justify-center mt-3 text-red-400">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                    <span className="text-sm">AI listening... Speak now</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};