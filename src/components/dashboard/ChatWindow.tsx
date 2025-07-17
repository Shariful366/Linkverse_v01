import React, { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, Mic, Video, Phone, MoreVertical, Camera, Smile, Bot, Shield, Zap, Users, Share2, Eye, Lock, Globe, AlertTriangle, Volume2, VolumeX, Monitor, Headphones, MicOff, VideoOff } from 'lucide-react';

interface ChatWindowProps {
  activeChat: string | null;
  onStartLiveStream: () => void;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({ activeChat, onStartLiveStream }) => {
  const [message, setMessage] = useState('');
  const [showAI, setShowAI] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [showSmartLink, setShowSmartLink] = useState(false);
  const [isVideoCall, setIsVideoCall] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [backgroundBlur, setBackgroundBlur] = useState(false);
  const [stealthMode, setStealthMode] = useState(false);
  const [aiTranslate, setAiTranslate] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const messages = [
    {
      id: '1',
      sender: 'Sarah Chen',
      content: 'Hey! How are you doing? I wanted to discuss the new project timeline.',
      time: '2:30 PM',
      type: 'text',
      isMe: false,
      aiSafetyScore: 98,
      encrypted: true,
      smartLink: 'https://linkverse.2050/chat/abc123',
      translated: false,
      mood: 'friendly'
    },
    {
      id: '2',
      sender: 'Me',
      content: 'Good! Just working on the new project. The AI assistant has been really helpful.',
      time: '2:32 PM',
      type: 'text',
      isMe: true,
      aiSafetyScore: 100,
      encrypted: true,
      smartLink: 'https://linkverse.2050/chat/def456',
      translated: false,
      mood: 'positive'
    },
    {
      id: '3',
      sender: 'Vision AI',
      content: 'I can help you with project management and scheduling. Would you like me to create a timeline based on your conversation? I can also analyze team sentiment and suggest optimal meeting times.',
      time: '2:33 PM',
      type: 'ai',
      isMe: false,
      aiSafetyScore: 100,
      encrypted: true,
      smartLink: 'https://linkverse.2050/ai/ghi789',
      translated: false,
      mood: 'helpful'
    },
    {
      id: '4',
      sender: 'Sarah Chen',
      content: 'That would be amazing! The AI assistant is so advanced. It feels like having a personal secretary.',
      time: '2:35 PM',
      type: 'text',
      isMe: false,
      aiSafetyScore: 95,
      encrypted: true,
      smartLink: 'https://linkverse.2050/chat/jkl012',
      translated: false,
      mood: 'excited'
    },
    {
      id: '5',
      sender: 'System',
      content: '⚠️ Content blocked: Inappropriate content detected by AI moderation system. Message quarantined for review.',
      time: '2:36 PM',
      type: 'system',
      isMe: false,
      aiSafetyScore: 0,
      encrypted: true,
      smartLink: null,
      translated: false,
      mood: 'alert'
    },
    {
      id: '6',
      sender: 'Me',
      content: 'Great! Let\'s schedule a team meeting for tomorrow. AI, can you check everyone\'s availability?',
      time: '2:38 PM',
      type: 'text',
      isMe: true,
      aiSafetyScore: 98,
      encrypted: true,
      smartLink: 'https://linkverse.2050/chat/mno345',
      translated: false,
      mood: 'productive'
    }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (message.trim()) {
      // AI content scanning simulation
      const aiSafetyScore = Math.floor(Math.random() * 10) + 90;
      console.log('Sending message with AI safety score:', aiSafetyScore);
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const generateSmartLink = (messageId: string) => {
    const linkId = Math.random().toString(36).substr(2, 9);
    const smartLink = `https://linkverse.2050/share/${linkId}`;
    navigator.clipboard.writeText(smartLink);
    setShowSmartLink(true);
    setTimeout(() => setShowSmartLink(false), 3000);
  };

  const getSafetyScoreColor = (score: number) => {
    if (score >= 95) return 'text-green-400';
    if (score >= 85) return 'text-yellow-400';
    if (score >= 70) return 'text-orange-400';
    return 'text-red-400';
  };

  const getMessageTypeIcon = (type: string) => {
    switch (type) {
      case 'ai':
        return <Bot className="w-4 h-4 text-purple-400" />;
      case 'system':
        return <Shield className="w-4 h-4 text-red-400" />;
      default:
        return null;
    }
  };

  const getMoodEmoji = (mood: string) => {
    const moods: Record<string, string> = {
      'friendly': '😊',
      'positive': '👍',
      'helpful': '🤖',
      'excited': '🎉',
      'alert': '⚠️',
      'productive': '💼'
    };
    return moods[mood] || '';
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // Simulate voice recording with AI transcription
    if (!isRecording) {
      setTimeout(() => {
        setIsRecording(false);
        setMessage('Voice message transcribed by AI: "This is a test voice message"');
      }, 3000);
    }
  };

  if (!activeChat) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-xl neural-bg">
        <div className="text-center">
          <div className="w-32 h-32 mx-auto bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full flex items-center justify-center mb-8 quantum-pulse">
            <Zap className="w-16 h-16 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-4 text-quantum">Welcome to Linkverse 2050</h2>
          <p className="text-gray-400 text-lg mb-6">Select a chat to start messaging with quantum encryption</p>
          <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center space-x-2">
              <Shield className="w-4 h-4 text-green-400" />
              <span>Quantum Secured</span>
            </div>
            <div className="flex items-center space-x-2">
              <Bot className="w-4 h-4 text-purple-400" />
              <span>AI Enhanced</span>
            </div>
            <div className="flex items-center space-x-2">
              <Zap className="w-4 h-4 text-yellow-400" />
              <span>2050 Ready</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-gradient-to-br from-gray-900/30 to-gray-800/30 backdrop-blur-xl neural-bg">
      {/* Header */}
      <div className="p-4 border-b border-gray-800/50 bg-black/20 backdrop-blur-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold">SC</span>
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-black"></div>
            </div>
            <div>
              <h3 className="font-semibold text-white flex items-center space-x-2">
                <span>Sarah Chen</span>
                <Shield className="w-4 h-4 text-green-400" title="Quantum Encrypted" />
              </h3>
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>Online • Last seen now</span>
                {stealthMode && <Eye className="w-3 h-3 text-purple-400" title="Stealth Mode Active" />}
                {aiTranslate && <Globe className="w-3 h-3 text-blue-400" title="AI Translation Active" />}
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setStealthMode(!stealthMode)}
              className={`p-2 rounded-lg transition-all hover-quantum ${stealthMode ? 'bg-purple-600 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}
              title="Stealth Security Mode"
            >
              <Eye className="w-5 h-5" />
            </button>
            <button
              onClick={() => setAiTranslate(!aiTranslate)}
              className={`p-2 rounded-lg transition-all hover-quantum ${aiTranslate ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}
              title="AI Real-time Translation"
            >
              <Globe className="w-5 h-5" />
            </button>
            <button className="p-2 bg-gray-800 rounded-lg text-gray-400 hover:bg-gray-700 transition-colors hover-quantum">
              <Phone className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setIsVideoCall(!isVideoCall)}
              className={`p-2 rounded-lg transition-all hover-quantum ${isVideoCall ? 'bg-green-600 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}
            >
              <Video className="w-5 h-5" />
            </button>
            <button 
              onClick={onStartLiveStream}
              className="p-2 bg-red-600 rounded-lg text-white hover:bg-red-700 transition-colors hover-quantum live-indicator"
              title="Start Live Stream"
            >
              <Users className="w-5 h-5" />
            </button>
            <button className="p-2 bg-gray-800 rounded-lg text-gray-400 hover:bg-gray-700 transition-colors hover-quantum">
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Video Call Panel */}
      {isVideoCall && (
        <div className="p-4 bg-black/40 border-b border-gray-800/50 glass-morphism">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="text-white">
                <p className="font-semibold flex items-center space-x-2">
                  <span>Video Call Active</span>
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                </p>
                <p className="text-sm text-gray-400">00:05:42 • 4K Quality • AR Ready</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setBackgroundBlur(!backgroundBlur)}
                className={`p-2 rounded-lg transition-all hover-quantum ${backgroundBlur ? 'bg-cyan-600 text-white' : 'bg-gray-800 text-gray-400'}`}
                title="AI Background Blur"
              >
                <Monitor className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsMuted(!isMuted)}
                className={`p-2 rounded-lg transition-all hover-quantum ${isMuted ? 'bg-red-600 text-white' : 'bg-gray-800 text-gray-400'}`}
              >
                {isMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </button>
              <button
                onClick={() => setIsVideoOff(!isVideoOff)}
                className={`p-2 rounded-lg transition-all hover-quantum ${isVideoOff ? 'bg-red-600 text-white' : 'bg-gray-800 text-gray-400'}`}
              >
                {isVideoOff ? <VideoOff className="w-4 h-4" /> : <Video className="w-4 h-4" />}
              </button>
              <button className="p-2 bg-gray-800 rounded-lg text-gray-400 hover:bg-gray-700 hover-quantum">
                <Headphones className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="mt-3 flex items-center space-x-4 text-xs text-gray-400">
            <span className="flex items-center space-x-1">
              <Shield className="w-3 h-3 text-green-400" />
              <span>End-to-end encrypted</span>
            </span>
            <span className="flex items-center space-x-1">
              <Bot className="w-3 h-3 text-purple-400" />
              <span>AI noise cancellation</span>
            </span>
            <span className="flex items-center space-x-1">
              <Eye className="w-3 h-3 text-blue-400" />
              <span>AR filters available</span>
            </span>
          </div>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-xs lg:max-w-md xl:max-w-lg ${msg.isMe ? 'order-2' : 'order-1'}`}>
              <div
                className={`rounded-2xl p-4 message-bubble relative hover-quantum ${
                  msg.isMe
                    ? 'bg-gradient-to-r from-cyan-600 to-purple-600 text-white'
                    : msg.type === 'ai'
                    ? 'bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 text-white ai-glow'
                    : msg.type === 'system'
                    ? 'bg-red-600/20 border border-red-500/30 text-red-200'
                    : 'bg-gray-800/80 text-white glass-morphism'
                }`}
              >
                {!msg.isMe && (
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-sm font-semibold">{msg.sender}</span>
                    {getMessageTypeIcon(msg.type)}
                    {msg.mood && (
                      <span className="text-xs">{getMoodEmoji(msg.mood)}</span>
                    )}
                  </div>
                )}
                
                <p className="text-sm leading-relaxed">{msg.content}</p>
                
                {aiTranslate && msg.type !== 'system' && (
                  <div className="mt-2 pt-2 border-t border-white/20">
                    <p className="text-xs text-blue-200 italic">
                      🤖 Translated: {msg.content} (simulated translation)
                    </p>
                  </div>
                )}
                
                <div className="flex items-center justify-between mt-3 text-xs opacity-75">
                  <div className="flex items-center space-x-2">
                    <span>{msg.time}</span>
                    {msg.encrypted && <Shield className="w-3 h-3 security-indicator" />}
                    {msg.smartLink && (
                      <button
                        onClick={() => generateSmartLink(msg.id)}
                        className="flex items-center space-x-1 hover:opacity-100 transition-opacity p-1 rounded hover:bg-white/10"
                        title="Generate Smart Link"
                      >
                        <Share2 className="w-3 h-3" />
                        <span className="text-xs">Share</span>
                      </button>
                    )}
                  </div>
                  <div className="flex items-center space-x-1">
                    <Zap className="w-3 h-3" />
                    <span className={getSafetyScoreColor(msg.aiSafetyScore)}>
                      {msg.aiSafetyScore}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Smart Link Notification */}
      {showSmartLink && (
        <div className="absolute top-20 right-4 bg-green-600 text-white px-4 py-3 rounded-xl shadow-2xl animate-fade-in z-50 glass-morphism">
          <div className="flex items-center space-x-2">
            <Share2 className="w-5 h-5" />
            <div>
              <p className="font-semibold">Smart Link Generated!</p>
              <p className="text-xs opacity-90">Secure link copied to clipboard</p>
            </div>
          </div>
        </div>
      )}

      {/* AI Assistant Quick Access */}
      {showAI && (
        <div className="absolute bottom-24 right-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4 rounded-xl shadow-2xl max-w-sm z-40 ai-glow">
          <div className="flex items-center space-x-2 mb-3">
            <Bot className="w-6 h-6" />
            <span className="font-semibold">Vision AI Assistant</span>
          </div>
          <p className="text-sm mb-3">How can I help you with this conversation?</p>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button className="py-2 px-3 bg-white/20 rounded-lg hover:bg-white/30 transition-colors">
              Summarize Chat
            </button>
            <button className="py-2 px-3 bg-white/20 rounded-lg hover:bg-white/30 transition-colors">
              Schedule Meeting
            </button>
            <button className="py-2 px-3 bg-white/20 rounded-lg hover:bg-white/30 transition-colors">
              Analyze Mood
            </button>
            <button className="py-2 px-3 bg-white/20 rounded-lg hover:bg-white/30 transition-colors">
              Suggest Reply
            </button>
          </div>
          <button
            onClick={() => setShowAI(false)}
            className="absolute top-2 right-2 text-white/60 hover:text-white"
          >
            ×
          </button>
        </div>
      )}

      {/* Message Input */}
      <div className="p-4 border-t border-gray-800/50 bg-black/20 backdrop-blur-xl">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowAI(!showAI)}
            className={`p-3 rounded-xl transition-all hover-quantum ${showAI ? 'bg-purple-600 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}
            title="Vision AI Assistant"
          >
            <Bot className="w-5 h-5" />
          </button>
          
          <div className="flex-1 relative">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a quantum-secured message..."
              className="w-full p-4 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 transition-colors focus-quantum pr-20"
            />
            
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
              <button
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                className="text-gray-400 hover:text-gray-300 transition-colors"
              >
                <Smile className="w-5 h-5" />
              </button>
              <button className="text-gray-400 hover:text-gray-300 transition-colors">
                <Paperclip className="w-5 h-5" />
              </button>
            </div>
          </div>

          <button
            onClick={toggleRecording}
            className={`p-3 rounded-xl transition-all hover-quantum ${isRecording ? 'bg-red-600 text-white animate-pulse' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}
            title="AI Voice Recording"
          >
            <Mic className="w-5 h-5" />
          </button>

          <button className="p-3 bg-gray-800 rounded-xl text-gray-400 hover:bg-gray-700 transition-colors hover-quantum">
            <Camera className="w-5 h-5" />
          </button>

          <button
            onClick={handleSendMessage}
            disabled={!message.trim() && !isRecording}
            className="p-3 bg-gradient-to-r from-cyan-600 to-purple-600 rounded-xl text-white hover:from-cyan-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed hover-quantum"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>

        {/* Security Status Bar */}
        <div className="flex items-center justify-between mt-3 text-xs text-gray-400">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Shield className="w-3 h-3 text-green-400" />
              <span>Quantum Encrypted</span>
            </div>
            <div className="flex items-center space-x-1">
              <Bot className="w-3 h-3 text-purple-400" />
              <span>AI Moderated</span>
            </div>
            <div className="flex items-center space-x-1">
              <Zap className="w-3 h-3 text-yellow-400" />
              <span>Neural Enhanced</span>
            </div>
          </div>
          
          {isRecording && (
            <div className="flex items-center space-x-2 text-red-400">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <span>AI Transcribing...</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};