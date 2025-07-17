import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, Mic, FileText, Image, Video, Headphones, Brain, Zap, Shield, Globe, Heart, Calendar, Users, TrendingUp, AlertCircle, CheckCircle, X } from 'lucide-react';

interface AISupportProps {
  onClose: () => void;
}

interface SupportTicket {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  category: string;
  aiSuggestions: string[];
  estimatedResolution: string;
}

export const AISupport: React.FC<AISupportProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<'chat' | 'tickets' | 'analytics' | 'knowledge'>('chat');
  const [message, setMessage] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [supportTickets, setSupportTickets] = useState<SupportTicket[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const conversations = [
    {
      id: '1',
      user: 'You',
      message: 'I need help with content moderation settings for my enterprise account.',
      time: '2 min ago',
      type: 'user'
    },
    {
      id: '2',
      user: 'Vision AI Support',
      message: 'I can help you configure advanced content moderation. I see you\'re on an Enterprise plan with quantum-level security. Let me walk you through the available options:\n\n1. **Real-time Content Scanning**: Already enabled\n2. **Custom Filter Rules**: Available for your organization\n3. **Compliance Modules**: GDPR, HIPAA, SOX ready\n\nWould you like me to set up custom filters for your industry?',
      time: '2 min ago',
      type: 'ai',
      suggestions: [
        'Set up industry-specific filters',
        'Configure compliance settings',
        'Review moderation logs',
        'Test content policies'
      ]
    },
    {
      id: '3',
      user: 'You',
      message: 'Yes, we need healthcare compliance filters.',
      time: '1 min ago',
      type: 'user'
    },
    {
      id: '4',
      user: 'Vision AI Support',
      message: 'Perfect! I\'m activating HIPAA-compliant content filters for your organization. This includes:\n\n✅ PHI detection and redaction\n✅ Medical image privacy protection\n✅ Automated compliance reporting\n✅ Audit trail generation\n\nConfiguration complete! Your team can now safely share medical information with automatic privacy protection.',
      time: '1 min ago',
      type: 'ai',
      actions: [
        'View compliance dashboard',
        'Download audit report',
        'Train team on new features'
      ]
    }
  ];

  const knowledgeBase = [
    {
      category: 'Content Moderation',
      articles: [
        'Setting up anti-nudity filters',
        'Configuring hate speech detection',
        'Managing propaganda content',
        'Custom moderation rules',
        'Appeal process guidelines'
      ]
    },
    {
      category: 'Security Features',
      articles: [
        'Quantum encryption setup',
        'Biometric authentication',
        'Geo-location security',
        'Zero-trust architecture',
        'Threat monitoring'
      ]
    },
    {
      category: 'AI Features',
      articles: [
        'Vision AI capabilities',
        'Smart reply configuration',
        'Sentiment analysis',
        'Auto-translation setup',
        'Predictive features'
      ]
    },
    {
      category: 'Enterprise Tools',
      articles: [
        'Team management',
        'Compliance reporting',
        'Integration guides',
        'Performance analytics',
        'Custom branding'
      ]
    }
  ];

  const analytics = {
    supportMetrics: {
      averageResponseTime: '2.3 seconds',
      resolutionRate: '94.7%',
      userSatisfaction: '4.8/5',
      aiAccuracy: '97.2%'
    },
    commonIssues: [
      { issue: 'Content moderation setup', count: 156, trend: '+12%' },
      { issue: 'Biometric login issues', count: 89, trend: '-5%' },
      { issue: 'Live streaming problems', count: 67, trend: '+8%' },
      { issue: 'AI assistant configuration', count: 45, trend: '+15%' }
    ]
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      // AI processes the message and provides intelligent support
      console.log('AI Support processing:', message);
      setMessage('');
    }
  };

  const createSupportTicket = () => {
    const newTicket: SupportTicket = {
      id: Date.now().toString(),
      title: 'New Support Request',
      description: message,
      priority: 'medium',
      status: 'open',
      category: 'General',
      aiSuggestions: [
        'Check knowledge base articles',
        'Review similar resolved tickets',
        'Contact enterprise support team'
      ],
      estimatedResolution: '2-4 hours'
    };
    setSupportTickets([...supportTickets, newTicket]);
    setMessage('');
  };

  const toggleListening = () => {
    setIsListening(!isListening);
    if (!isListening) {
      // Simulate voice recognition
      setTimeout(() => {
        setIsListening(false);
        setMessage('How do I set up content moderation for my team?');
      }, 3000);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'text-red-400 bg-red-600/20';
      case 'high': return 'text-orange-400 bg-orange-600/20';
      case 'medium': return 'text-yellow-400 bg-yellow-600/20';
      case 'low': return 'text-green-400 bg-green-600/20';
      default: return 'text-gray-400 bg-gray-600/20';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'resolved': return 'text-green-400';
      case 'in-progress': return 'text-blue-400';
      case 'open': return 'text-yellow-400';
      case 'closed': return 'text-gray-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-xl flex items-center justify-center z-50 p-4">
      <div className="w-full max-w-6xl h-full max-h-[90vh] bg-gradient-to-br from-blue-900/30 to-cyan-900/30 backdrop-blur-xl rounded-2xl overflow-hidden shadow-2xl border border-blue-500/20">
        {/* Header */}
        <div className="p-6 border-b border-blue-500/20 bg-black/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">AI Support Center</h1>
                <p className="text-blue-300">24/7 Intelligent Assistance for Linkverse 2050</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-green-600/20 px-4 py-2 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="text-green-400 font-semibold">AI Online</span>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex space-x-2 mt-6">
            {[
              { id: 'chat', label: 'AI Chat', icon: Bot },
              { id: 'tickets', label: 'Support Tickets', icon: FileText },
              { id: 'analytics', label: 'Analytics', icon: TrendingUp },
              { id: 'knowledge', label: 'Knowledge Base', icon: Brain }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-400 hover:bg-blue-600/20 hover:text-white'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex h-full">
          {/* Main Content */}
          <div className="flex-1 flex flex-col">
            {/* AI Chat Tab */}
            {activeTab === 'chat' && (
              <>
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {conversations.map((conv) => (
                    <div
                      key={conv.id}
                      className={`flex ${conv.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-2xl ${conv.type === 'user' ? 'order-2' : 'order-1'}`}>
                        <div
                          className={`rounded-2xl p-4 ${
                            conv.type === 'user'
                              ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white'
                              : 'bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border border-blue-500/30 text-white'
                          }`}
                        >
                          <div className="flex items-center space-x-2 mb-2">
                            <span className="text-sm font-semibold">{conv.user}</span>
                            {conv.type === 'ai' && <Bot className="w-4 h-4 text-blue-400" />}
                            <span className="text-xs opacity-75">{conv.time}</span>
                          </div>
                          <p className="text-sm leading-relaxed whitespace-pre-line">{conv.message}</p>
                          
                          {/* AI Suggestions */}
                          {conv.type === 'ai' && (conv as any).suggestions && (
                            <div className="mt-4 space-y-2">
                              <p className="text-xs text-blue-300 font-semibold">Quick Actions:</p>
                              <div className="grid grid-cols-2 gap-2">
                                {(conv as any).suggestions.map((suggestion: string, index: number) => (
                                  <button
                                    key={index}
                                    className="text-xs p-2 bg-blue-600/30 rounded-lg hover:bg-blue-600/50 transition-colors text-left"
                                  >
                                    {suggestion}
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* AI Actions */}
                          {conv.type === 'ai' && (conv as any).actions && (
                            <div className="mt-4 space-y-2">
                              <p className="text-xs text-cyan-300 font-semibold">Available Actions:</p>
                              <div className="space-y-1">
                                {(conv as any).actions.map((action: string, index: number) => (
                                  <button
                                    key={index}
                                    className="text-xs p-2 bg-cyan-600/30 rounded-lg hover:bg-cyan-600/50 transition-colors w-full text-left flex items-center space-x-2"
                                  >
                                    <Zap className="w-3 h-3" />
                                    <span>{action}</span>
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>

                {/* Chat Input */}
                <div className="p-6 border-t border-blue-500/20">
                  <div className="flex items-center space-x-4">
                    <div className="flex-1 relative">
                      <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        placeholder="Ask AI Support anything..."
                        className="w-full p-4 bg-gray-800/50 border border-blue-500/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
                      />
                    </div>

                    <button
                      onClick={toggleListening}
                      className={`p-4 rounded-xl transition-all ${
                        isListening 
                          ? 'bg-red-600 text-white animate-pulse' 
                          : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                      }`}
                    >
                      <Mic className="w-5 h-5" />
                    </button>

                    <button
                      onClick={createSupportTicket}
                      className="p-4 bg-orange-600 rounded-xl text-white hover:bg-orange-700 transition-colors"
                      title="Create Support Ticket"
                    >
                      <FileText className="w-5 h-5" />
                    </button>

                    <button
                      onClick={handleSendMessage}
                      disabled={!message.trim()}
                      className="p-4 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl text-white hover:from-blue-700 hover:to-cyan-700 transition-all disabled:opacity-50"
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
              </>
            )}

            {/* Support Tickets Tab */}
            {activeTab === 'tickets' && (
              <div className="flex-1 overflow-y-auto p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-white">Support Tickets</h2>
                    <button className="px-4 py-2 bg-blue-600 rounded-lg text-white hover:bg-blue-700 transition-colors">
                      Create New Ticket
                    </button>
                  </div>

                  {supportTickets.length === 0 ? (
                    <div className="text-center py-12">
                      <FileText className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                      <h3 className="text-lg font-semibold text-white mb-2">No Support Tickets</h3>
                      <p className="text-gray-400">Create a ticket or use AI chat for instant help</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {supportTickets.map((ticket) => (
                        <div key={ticket.id} className="bg-black/30 rounded-xl p-6 border border-blue-500/20">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h3 className="font-semibold text-white">{ticket.title}</h3>
                              <p className="text-gray-300 text-sm mt-1">{ticket.description}</p>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className={`px-2 py-1 rounded text-xs font-semibold ${getPriorityColor(ticket.priority)}`}>
                                {ticket.priority.toUpperCase()}
                              </span>
                              <span className={`text-sm font-semibold ${getStatusColor(ticket.status)}`}>
                                {ticket.status.replace('-', ' ').toUpperCase()}
                              </span>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <h4 className="font-semibold text-blue-400 mb-2">AI Suggestions:</h4>
                              <div className="space-y-1">
                                {ticket.aiSuggestions.map((suggestion, index) => (
                                  <div key={index} className="text-sm text-gray-300 flex items-center space-x-2">
                                    <Brain className="w-3 h-3 text-blue-400" />
                                    <span>{suggestion}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                            <div>
                              <h4 className="font-semibold text-cyan-400 mb-2">Estimated Resolution:</h4>
                              <p className="text-sm text-gray-300">{ticket.estimatedResolution}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Analytics Tab */}
            {activeTab === 'analytics' && (
              <div className="flex-1 overflow-y-auto p-6">
                <div className="space-y-6">
                  <h2 className="text-xl font-bold text-white">Support Analytics</h2>

                  {/* Metrics Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {Object.entries(analytics.supportMetrics).map(([key, value]) => (
                      <div key={key} className="bg-black/30 rounded-xl p-4 border border-blue-500/20">
                        <h3 className="text-blue-400 font-semibold capitalize mb-2">
                          {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                        </h3>
                        <p className="text-2xl font-bold text-white">{value}</p>
                      </div>
                    ))}
                  </div>

                  {/* Common Issues */}
                  <div className="bg-black/30 rounded-xl p-6 border border-blue-500/20">
                    <h3 className="text-xl font-bold text-white mb-4">Common Issues</h3>
                    <div className="space-y-3">
                      {analytics.commonIssues.map((issue, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                          <div>
                            <h4 className="font-semibold text-white">{issue.issue}</h4>
                            <p className="text-sm text-gray-400">{issue.count} reports</p>
                          </div>
                          <div className={`text-sm font-semibold ${
                            issue.trend.startsWith('+') ? 'text-red-400' : 'text-green-400'
                          }`}>
                            {issue.trend}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Knowledge Base Tab */}
            {activeTab === 'knowledge' && (
              <div className="flex-1 overflow-y-auto p-6">
                <div className="space-y-6">
                  <h2 className="text-xl font-bold text-white">Knowledge Base</h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {knowledgeBase.map((category, index) => (
                      <div key={index} className="bg-black/30 rounded-xl p-6 border border-blue-500/20">
                        <h3 className="text-lg font-bold text-white mb-4">{category.category}</h3>
                        <div className="space-y-2">
                          {category.articles.map((article, articleIndex) => (
                            <button
                              key={articleIndex}
                              className="w-full text-left p-3 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition-colors"
                            >
                              <div className="flex items-center space-x-3">
                                <FileText className="w-4 h-4 text-blue-400" />
                                <span className="text-gray-300">{article}</span>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};