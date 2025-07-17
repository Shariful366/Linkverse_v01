import React, { useState } from 'react';
import { X, Bot, Send, Mic, Image, FileText, Calendar, Users, Zap, Brain, Shield, Globe, Heart, Lightbulb, Search, TrendingUp } from 'lucide-react';

interface AIAssistantProps {
  onClose: () => void;
}

export const AIAssistant: React.FC<AIAssistantProps> = ({ onClose }) => {
  const [query, setQuery] = useState('');
  const [activeMode, setActiveMode] = useState<'chat' | 'analysis' | 'schedule' | 'health'>('chat');
  const [isListening, setIsListening] = useState(false);

  const suggestions = [
    {
      icon: Brain,
      title: 'Analyze Conversation',
      description: 'Get insights on chat sentiment and key topics',
      category: 'analysis'
    },
    {
      icon: Calendar,
      title: 'Schedule Meeting',
      description: 'Find optimal times based on availability',
      category: 'schedule'
    },
    {
      icon: Heart,
      title: 'Health Check',
      description: 'Monitor stress levels and well-being',
      category: 'health'
    },
    {
      icon: FileText,
      title: 'Summarize Chat',
      description: 'Create concise summaries of conversations',
      category: 'analysis'
    },
    {
      icon: Users,
      title: 'Team Analytics',
      description: 'Analyze team communication patterns',
      category: 'analysis'
    },
    {
      icon: Globe,
      title: 'Translate Messages',
      description: 'Real-time translation between languages',
      category: 'chat'
    }
  ];

  const conversations = [
    {
      id: '1',
      user: 'You',
      message: 'Can you analyze the sentiment of my recent conversations?',
      time: '2 min ago',
      type: 'user'
    },
    {
      id: '2',
      user: 'Vision AI',
      message: 'I\'ve analyzed your last 50 conversations. Overall sentiment is 78% positive, 15% neutral, and 7% negative. Your stress indicators suggest taking breaks between intense discussions.',
      time: '2 min ago',
      type: 'ai',
      data: {
        positive: 78,
        neutral: 15,
        negative: 7,
        stressLevel: 'moderate'
      }
    },
    {
      id: '3',
      user: 'You',
      message: 'What about my team\'s communication patterns?',
      time: '1 min ago',
      type: 'user'
    },
    {
      id: '4',
      user: 'Vision AI',
      message: 'Your team shows strong collaboration patterns. Peak activity is 2-4 PM. Sarah Chen is the most responsive team member. I recommend scheduling important discussions during peak hours.',
      time: '1 min ago',
      type: 'ai'
    }
  ];

  const healthMetrics = {
    stressLevel: 65,
    focusTime: 85,
    socialBattery: 45,
    workLifeBalance: 72
  };

  const handleSendQuery = () => {
    if (query.trim()) {
      console.log('Sending AI query:', query);
      setQuery('');
    }
  };

  const toggleListening = () => {
    setIsListening(!isListening);
    // Simulate voice recognition
    if (!isListening) {
      setTimeout(() => {
        setIsListening(false);
        setQuery('AI, can you help me schedule a meeting with my team?');
      }, 3000);
    }
  };

  const getHealthColor = (value: number) => {
    if (value >= 80) return 'text-green-400';
    if (value >= 60) return 'text-yellow-400';
    if (value >= 40) return 'text-orange-400';
    return 'text-red-400';
  };

  const getHealthBarColor = (value: number) => {
    if (value >= 80) return 'bg-green-500';
    if (value >= 60) return 'bg-yellow-500';
    if (value >= 40) return 'bg-orange-500';
    return 'bg-red-500';
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-xl flex items-center justify-center z-50 p-4">
      <div className="w-full max-w-5xl h-full max-h-[90vh] bg-gradient-to-br from-purple-900/30 to-pink-900/30 backdrop-blur-xl rounded-2xl overflow-hidden shadow-2xl border border-purple-500/20">
        <div className="flex h-full">
          {/* Sidebar */}
          <div className="w-64 bg-black/30 border-r border-purple-500/20 p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="font-bold text-white">Vision AI</h2>
                  <p className="text-xs text-purple-300">Neural Assistant</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-1 text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mode Selector */}
            <div className="space-y-2 mb-6">
              {[
                { id: 'chat', label: 'Chat', icon: Bot },
                { id: 'analysis', label: 'Analysis', icon: TrendingUp },
                { id: 'schedule', label: 'Schedule', icon: Calendar },
                { id: 'health', label: 'Health', icon: Heart }
              ].map((mode) => (
                <button
                  key={mode.id}
                  onClick={() => setActiveMode(mode.id as any)}
                  className={`w-full p-3 rounded-xl transition-all flex items-center space-x-3 ${
                    activeMode === mode.id
                      ? 'bg-purple-600 text-white'
                      : 'text-gray-400 hover:bg-purple-600/20 hover:text-white'
                  }`}
                >
                  <mode.icon className="w-5 h-5" />
                  <span>{mode.label}</span>
                </button>
              ))}
            </div>

            {/* Health Metrics */}
            {activeMode === 'health' && (
              <div className="space-y-4">
                <h3 className="text-white font-semibold mb-3">Well-being Monitor</h3>
                {Object.entries(healthMetrics).map(([key, value]) => (
                  <div key={key} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400 capitalize">{key.replace(/([A-Z])/g, ' $1').toLowerCase()}</span>
                      <span className={getHealthColor(value)}>{value}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${getHealthBarColor(value)}`}
                        style={{ width: `${value}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
                <div className="mt-4 p-3 bg-purple-600/20 rounded-lg border border-purple-500/30">
                  <p className="text-xs text-purple-200">
                    💡 AI Recommendation: Take a 10-minute break to improve focus and reduce stress levels.
                  </p>
                </div>
              </div>
            )}

            {/* Suggestions */}
            <div className="space-y-2">
              <h3 className="text-white font-semibold mb-3">Quick Actions</h3>
              {suggestions
                .filter(s => activeMode === 'chat' || s.category === activeMode)
                .slice(0, 4)
                .map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => setQuery(suggestion.description)}
                  className="w-full p-3 text-left bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition-colors group"
                >
                  <div className="flex items-start space-x-3">
                    <suggestion.icon className="w-5 h-5 text-purple-400 mt-0.5" />
                    <div>
                      <p className="text-white text-sm font-medium group-hover:text-purple-300">
                        {suggestion.title}
                      </p>
                      <p className="text-gray-400 text-xs mt-1">
                        {suggestion.description}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Main Chat Area */}
          <div className="flex-1 flex flex-col">
            {/* Header */}
            <div className="p-6 border-b border-purple-500/20">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-white mb-2">
                    Vision AI Assistant
                  </h1>
                  <p className="text-purple-300">
                    {activeMode === 'chat' && 'Ask me anything about your conversations and productivity'}
                    {activeMode === 'analysis' && 'Deep insights from your communication patterns'}
                    {activeMode === 'schedule' && 'Intelligent scheduling and time management'}
                    {activeMode === 'health' && 'Monitor and improve your digital well-being'}
                  </p>
                </div>
                <div className="flex items-center space-x-2 text-sm text-purple-300">
                  <Shield className="w-4 h-4" />
                  <span>Quantum Secure</span>
                </div>
              </div>
            </div>

            {/* Chat Messages */}
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
                          ? 'bg-gradient-to-r from-cyan-600 to-purple-600 text-white'
                          : 'bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 text-white'
                      }`}
                    >
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-sm font-semibold">{conv.user}</span>
                        {conv.type === 'ai' && <Bot className="w-4 h-4 text-purple-400" />}
                        <span className="text-xs opacity-75">{conv.time}</span>
                      </div>
                      <p className="text-sm leading-relaxed">{conv.message}</p>
                      
                      {/* AI Data Visualization */}
                      {conv.data && (
                        <div className="mt-4 p-3 bg-black/20 rounded-lg">
                          <div className="grid grid-cols-3 gap-4 text-center">
                            <div>
                              <div className="text-green-400 text-lg font-bold">{conv.data.positive}%</div>
                              <div className="text-xs text-gray-400">Positive</div>
                            </div>
                            <div>
                              <div className="text-gray-400 text-lg font-bold">{conv.data.neutral}%</div>
                              <div className="text-xs text-gray-400">Neutral</div>
                            </div>
                            <div>
                              <div className="text-red-400 text-lg font-bold">{conv.data.negative}%</div>
                              <div className="text-xs text-gray-400">Negative</div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Input Area */}
            <div className="p-6 border-t border-purple-500/20">
              <div className="flex items-center space-x-4">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendQuery()}
                    placeholder="Ask Vision AI anything..."
                    className="w-full p-4 bg-gray-800/50 border border-purple-500/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors"
                  />
                  
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
                    <button className="text-gray-400 hover:text-gray-300 transition-colors">
                      <Image className="w-5 h-5" />
                    </button>
                    <button className="text-gray-400 hover:text-gray-300 transition-colors">
                      <FileText className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <button
                  onClick={toggleListening}
                  className={`p-4 rounded-xl transition-all ${
                    isListening 
                      ? 'bg-red-600 text-white animate-pulse' 
                      : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                  }`}
                  title="Voice Input"
                >
                  <Mic className="w-5 h-5" />
                </button>

                <button
                  onClick={handleSendQuery}
                  disabled={!query.trim()}
                  className="p-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl text-white hover:from-purple-700 hover:to-pink-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>

              {/* AI Capabilities */}
              <div className="flex items-center justify-center space-x-6 mt-4 text-xs text-gray-400">
                <div className="flex items-center space-x-1">
                  <Brain className="w-3 h-3" />
                  <span>Neural Processing</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Shield className="w-3 h-3" />
                  <span>Privacy Protected</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Zap className="w-3 h-3" />
                  <span>Real-time Analysis</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Lightbulb className="w-3 h-3" />
                  <span>Predictive Insights</span>
                </div>
              </div>
              
              {isListening && (
                <div className="flex items-center justify-center mt-3 text-red-400">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                    <span className="text-sm">Listening... Speak now</span>
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