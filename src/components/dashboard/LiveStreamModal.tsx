import React, { useState, useRef, useEffect } from 'react';
import { X, Video, Mic, Users, MessageCircle, Heart, Share2, Settings, Monitor, Eye, EyeOff, Volume2, VolumeX, Camera, MoreVertical, Shield, Zap, Bot, Globe } from 'lucide-react';

interface LiveStreamModalProps {
  onClose: () => void;
}

export const LiveStreamModal: React.FC<LiveStreamModalProps> = ({ onClose }) => {
  const [isStreaming, setIsStreaming] = useState(false);
  const [viewerCount, setViewerCount] = useState(0);
  const [streamComment, setStreamComment] = useState('');
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [backgroundBlur, setBackgroundBlur] = useState(false);
  const [aiModeration, setAiModeration] = useState(true);
  const [autoTranslate, setAutoTranslate] = useState(false);
  const [stealthMode, setStealthMode] = useState(false);
  const [reactions, setReactions] = useState<{ id: string; emoji: string; user: string; time: string }[]>([]);
  const videoRef = useRef<HTMLVideoElement>(null);

  const comments = [
    { id: '1', user: 'Alex Thompson', message: 'Great presentation!', time: '2m ago', verified: true },
    { id: '2', user: 'Maria Garcia', message: 'Can you share the slides?', time: '1m ago', verified: false },
    { id: '3', user: 'Vision AI', message: 'Auto-generated summary available. Would you like me to post it?', time: '30s ago', verified: true, isAI: true },
    { id: '4', user: 'David Kim', message: 'This is incredible technology!', time: '15s ago', verified: true },
  ];

  const viewers = [
    { id: '1', name: 'Sarah Chen', avatar: 'SC', status: 'active' },
    { id: '2', name: 'Marcus Rodriguez', avatar: 'MR', status: 'active' },
    { id: '3', name: 'Emily Davis', avatar: 'ED', status: 'away' },
    { id: '4', name: 'Project Team', avatar: 'PT', status: 'active', isGroup: true },
  ];

  useEffect(() => {
    // Simulate viewer count changes
    const interval = setInterval(() => {
      setViewerCount(prev => prev + Math.floor(Math.random() * 3) - 1);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const startStream = async () => {
    setIsStreaming(true);
    setViewerCount(4);
    
    // Simulate getting user media
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.log('Camera access not available in demo');
    }
  };

  const stopStream = () => {
    setIsStreaming(false);
    setViewerCount(0);
    
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
    }
  };

  const sendComment = () => {
    if (streamComment.trim()) {
      console.log('Sending comment:', streamComment);
      setStreamComment('');
    }
  };

  const addReaction = (emoji: string) => {
    const newReaction = {
      id: Date.now().toString(),
      emoji,
      user: 'You',
      time: 'now'
    };
    setReactions(prev => [...prev, newReaction]);
    
    // Remove reaction after 3 seconds
    setTimeout(() => {
      setReactions(prev => prev.filter(r => r.id !== newReaction.id));
    }, 3000);
  };

  const shareStream = () => {
    const streamLink = `https://linkverse.2050/live/${Math.random().toString(36).substr(2, 9)}`;
    navigator.clipboard.writeText(streamLink);
    console.log('Stream link copied:', streamLink);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-xl flex items-center justify-center z-50 p-4">
      <div className="w-full max-w-6xl h-full max-h-[90vh] bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl overflow-hidden shadow-2xl">
        <div className="flex h-full">
          {/* Main Stream Area */}
          <div className="flex-1 flex flex-col">
            {/* Header */}
            <div className="p-4 border-b border-gray-700 bg-black/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <h2 className="text-xl font-bold text-white flex items-center space-x-2">
                    <Video className="w-6 h-6 text-red-500" />
                    <span>Live Stream</span>
                    {isStreaming && (
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                        <span className="text-red-500 text-sm font-normal">LIVE</span>
                      </div>
                    )}
                  </h2>
                  <div className="flex items-center space-x-4 text-sm text-gray-400">
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4" />
                      <span>{viewerCount} viewers</span>
                    </div>
                    {aiModeration && (
                      <div className="flex items-center space-x-1">
                        <Shield className="w-4 h-4 text-green-400" />
                        <span>AI Protected</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={shareStream}
                    className="p-2 bg-blue-600 rounded-lg text-white hover:bg-blue-700 transition-colors"
                    title="Share Stream"
                  >
                    <Share2 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={onClose}
                    className="p-2 bg-gray-700 rounded-lg text-white hover:bg-gray-600 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Video Area */}
            <div className="flex-1 relative bg-black">
              {isStreaming ? (
                <>
                  <video
                    ref={videoRef}
                    autoPlay
                    muted
                    className={`w-full h-full object-cover ${backgroundBlur ? 'blur-sm' : ''}`}
                  />
                  
                  {/* Overlay Effects */}
                  <div className="absolute inset-0 pointer-events-none">
                    {/* AI Content Moderation Indicator */}
                    {aiModeration && (
                      <div className="absolute top-4 left-4 bg-green-600/80 backdrop-blur-sm rounded-lg px-3 py-1 text-white text-sm flex items-center space-x-2">
                        <Bot className="w-4 h-4" />
                        <span>AI Monitoring Active</span>
                      </div>
                    )}
                    
                    {/* Stealth Mode Indicator */}
                    {stealthMode && (
                      <div className="absolute top-4 right-4 bg-purple-600/80 backdrop-blur-sm rounded-lg px-3 py-1 text-white text-sm flex items-center space-x-2">
                        <Eye className="w-4 h-4" />
                        <span>Stealth Mode</span>
                      </div>
                    )}
                    
                    {/* Live Reactions */}
                    <div className="absolute bottom-20 right-4 space-y-2">
                      {reactions.map((reaction) => (
                        <div
                          key={reaction.id}
                          className="bg-black/50 backdrop-blur-sm rounded-full px-3 py-1 text-white text-sm animate-bounce"
                        >
                          {reaction.emoji} {reaction.user}
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <div className="w-24 h-24 mx-auto bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center mb-6">
                      <Video className="w-12 h-12 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">Ready to Go Live?</h3>
                    <p className="text-gray-400 mb-6">Share your screen or camera with quantum-encrypted streaming</p>
                    <button
                      onClick={startStream}
                      className="px-8 py-3 bg-gradient-to-r from-red-600 to-pink-600 rounded-xl text-white font-semibold hover:from-red-700 hover:to-pink-700 transition-all transform hover:scale-105"
                    >
                      Start Live Stream
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Stream Controls */}
            {isStreaming && (
              <div className="p-4 bg-black/40 border-t border-gray-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    {/* Basic Controls */}
                    <button
                      onClick={() => setIsVideoOn(!isVideoOn)}
                      className={`p-3 rounded-xl transition-all ${isVideoOn ? 'bg-gray-700 text-white' : 'bg-red-600 text-white'}`}
                    >
                      {isVideoOn ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
                    </button>
                    
                    <button
                      onClick={() => setIsAudioOn(!isAudioOn)}
                      className={`p-3 rounded-xl transition-all ${isAudioOn ? 'bg-gray-700 text-white' : 'bg-red-600 text-white'}`}
                    >
                      {isAudioOn ? <Mic className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                    </button>

                    {/* Advanced Controls */}
                    <button
                      onClick={() => setBackgroundBlur(!backgroundBlur)}
                      className={`p-3 rounded-xl transition-all ${backgroundBlur ? 'bg-cyan-600 text-white' : 'bg-gray-700 text-gray-300'}`}
                      title="AI Background Blur"
                    >
                      <Monitor className="w-5 h-5" />
                    </button>

                    <button
                      onClick={() => setStealthMode(!stealthMode)}
                      className={`p-3 rounded-xl transition-all ${stealthMode ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-300'}`}
                      title="Stealth Mode"
                    >
                      {stealthMode ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>

                    <button
                      onClick={() => setAutoTranslate(!autoTranslate)}
                      className={`p-3 rounded-xl transition-all ${autoTranslate ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'}`}
                      title="AI Auto-translate"
                    >
                      <Globe className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Reaction Buttons */}
                  <div className="flex items-center space-x-2">
                    {['👍', '❤️', '😂', '😮', '👏'].map((emoji) => (
                      <button
                        key={emoji}
                        onClick={() => addReaction(emoji)}
                        className="p-2 bg-gray-700 rounded-lg text-white hover:bg-gray-600 transition-colors"
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>

                  {/* End Stream */}
                  <button
                    onClick={stopStream}
                    className="px-6 py-3 bg-red-600 rounded-xl text-white font-semibold hover:bg-red-700 transition-colors"
                  >
                    End Stream
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="w-80 bg-gray-900/50 border-l border-gray-700 flex flex-col">
            {/* Viewers */}
            <div className="p-4 border-b border-gray-700">
              <h3 className="font-semibold text-white mb-3 flex items-center space-x-2">
                <Users className="w-5 h-5" />
                <span>Viewers ({viewerCount})</span>
              </h3>
              <div className="space-y-2">
                {viewers.map((viewer) => (
                  <div key={viewer.id} className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-semibold ${
                      viewer.isGroup ? 'bg-gradient-to-r from-cyan-500 to-blue-500' : 'bg-gradient-to-r from-orange-500 to-red-500'
                    }`}>
                      {viewer.avatar}
                    </div>
                    <div className="flex-1">
                      <p className="text-white text-sm">{viewer.name}</p>
                      <div className="flex items-center space-x-1">
                        <div className={`w-2 h-2 rounded-full ${viewer.status === 'active' ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                        <span className="text-xs text-gray-400">{viewer.status}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Chat */}
            <div className="flex-1 flex flex-col">
              <div className="p-4 border-b border-gray-700">
                <h3 className="font-semibold text-white flex items-center space-x-2">
                  <MessageCircle className="w-5 h-5" />
                  <span>Live Chat</span>
                  {aiModeration && <Shield className="w-4 h-4 text-green-400" title="AI Moderated" />}
                </h3>
              </div>
              
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {comments.map((comment) => (
                  <div key={comment.id} className="text-sm">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className={`font-semibold ${comment.isAI ? 'text-purple-400' : 'text-cyan-400'}`}>
                        {comment.user}
                      </span>
                      {comment.verified && <Shield className="w-3 h-3 text-green-400" />}
                      {comment.isAI && <Bot className="w-3 h-3 text-purple-400" />}
                      <span className="text-xs text-gray-500">{comment.time}</span>
                    </div>
                    <p className="text-gray-300">{comment.message}</p>
                  </div>
                ))}
              </div>

              {/* Chat Input */}
              <div className="p-4 border-t border-gray-700">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={streamComment}
                    onChange={(e) => setStreamComment(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendComment()}
                    placeholder="Send a message..."
                    className="flex-1 p-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500"
                  />
                  <button
                    onClick={sendComment}
                    className="p-3 bg-cyan-600 rounded-lg text-white hover:bg-cyan-700 transition-colors"
                  >
                    <MessageCircle className="w-5 h-5" />
                  </button>
                </div>
                
                {autoTranslate && (
                  <div className="mt-2 text-xs text-blue-400 flex items-center space-x-1">
                    <Globe className="w-3 h-3" />
                    <span>Auto-translation enabled</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};