import React, { useState, useEffect, useRef } from 'react';
import { Layers, Zap, Bot, Eye, Globe, Shield, Users, Video, Mic, Camera, Settings, Sparkles, Brain, Heart, TrendingUp, Volume2, Headphones, Monitor, Share2, FileText, MessageSquare, Star, Award, Target, Compass, Navigation, Wifi, Battery, Signal } from 'lucide-react';

interface HolographicMeetingProps {
  meetingId: string;
  participants: any[];
  onClose: () => void;
}

export const HolographicMeeting: React.FC<HolographicMeetingProps> = ({
  meetingId,
  participants,
  onClose
}) => {
  const [hologramQuality, setHologramQuality] = useState<'4k' | '8k' | '16k' | 'quantum'>('8k');
  const [neuralSync, setNeuralSync] = useState(true);
  const [quantumRendering, setQuantumRendering] = useState(true);
  const [spatialMapping, setSpatialMapping] = useState(true);
  const [aiEnhancement, setAiEnhancement] = useState(true);
  const [participantHolograms, setParticipantHolograms] = useState<any[]>([]);
  const [environmentMode, setEnvironmentMode] = useState<'office' | 'space' | 'nature' | 'custom'>('office');
  const [lightingMode, setLightingMode] = useState<'natural' | 'studio' | 'ambient' | 'dynamic'>('dynamic');
  const hologramRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    initializeHolographicSystem();
    generateParticipantHolograms();
  }, [participants]);

  const initializeHolographicSystem = () => {
    console.log('Initializing quantum holographic projection system...');
    console.log('Calibrating neural interfaces...');
    console.log('Establishing spatial mapping...');
    console.log('Activating AI enhancement protocols...');
  };

  const generateParticipantHolograms = () => {
    const holograms = participants.map(participant => ({
      id: participant.id,
      position: {
        x: Math.random() * 360, // 360-degree positioning
        y: Math.random() * 180, // Elevation
        z: Math.random() * 10 + 5 // Distance
      },
      quality: hologramQuality,
      stability: 95 + Math.random() * 5,
      neuralConnection: neuralSync ? 98 + Math.random() * 2 : 85 + Math.random() * 10,
      aiEnhanced: aiEnhancement,
      spatialAudio: true,
      gestureTracking: true,
      emotionMapping: true
    }));
    
    setParticipantHolograms(holograms);
  };

  const getQualityColor = (quality: string) => {
    switch (quality) {
      case 'quantum': return 'text-purple-400';
      case '16k': return 'text-cyan-400';
      case '8k': return 'text-blue-400';
      case '4k': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  const getEnvironmentGradient = (env: string) => {
    switch (env) {
      case 'space': return 'from-indigo-900 via-purple-900 to-black';
      case 'nature': return 'from-green-900 via-blue-900 to-teal-900';
      case 'office': return 'from-gray-900 via-slate-800 to-gray-900';
      case 'custom': return 'from-pink-900 via-purple-900 to-blue-900';
      default: return 'from-gray-900 via-slate-800 to-gray-900';
    }
  };

  return (
    <div className="fixed inset-0 bg-black z-50">
      <div className="h-full flex flex-col">
        {/* Holographic Control Header */}
        <div className="p-4 bg-black/90 backdrop-blur-xl border-b border-purple-500/30 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
              <Layers className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Holographic Meeting Mode</h2>
              <p className="text-purple-300 text-sm">Quantum-powered 3D collaboration</p>
            </div>
            <div className="flex items-center space-x-2 bg-purple-600/20 px-3 py-1 rounded-lg">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span className="text-purple-400 text-sm font-semibold">Quantum Active</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <span>Quality: </span>
              <span className={`font-semibold ${getQualityColor(hologramQuality)}`}>
                {hologramQuality.toUpperCase()}
              </span>
            </div>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-red-600 rounded-lg text-white hover:bg-red-700 transition-colors"
            >
              Exit Holographic Mode
            </button>
          </div>
        </div>

        {/* Holographic Display Area */}
        <div className={`flex-1 relative bg-gradient-to-br ${getEnvironmentGradient(environmentMode)} overflow-hidden`}>
          {/* Neural Grid Background */}
          <div className="absolute inset-0 cyber-grid opacity-10"></div>
          
          {/* Quantum Particles */}
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-purple-400 rounded-full animate-pulse data-stream"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${3 + Math.random() * 2}s`
                }}
              />
            ))}
          </div>

          {/* Central Holographic Display */}
          <div 
            ref={hologramRef}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="relative">
              {/* Main Holographic Interface */}
              <div className="w-96 h-96 relative">
                {/* Central Projection Platform */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-full border-4 border-purple-500/30 hologram-flicker">
                  <div className="absolute inset-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full border-2 border-cyan-500/30">
                    <div className="absolute inset-4 bg-gradient-to-r from-cyan-500/10 to-pink-500/10 rounded-full border border-purple-500/30">
                      {/* Center Content */}
                      <div className="h-full flex items-center justify-center">
                        <div className="text-center">
                          <div className="w-24 h-24 mx-auto bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full flex items-center justify-center mb-4 quantum-pulse">
                            <Layers className="w-12 h-12 text-white" />
                          </div>
                          <h3 className="text-2xl font-bold text-white text-quantum">Holographic Space</h3>
                          <p className="text-purple-300">Neural-synchronized collaboration</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Participant Holograms */}
                {participantHolograms.map((hologram, index) => (
                  <div
                    key={hologram.id}
                    className="absolute w-20 h-20 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-full border-2 border-cyan-500/50 hologram-flicker"
                    style={{
                      transform: `rotate(${hologram.position.x}deg) translateX(${150 + hologram.position.z * 10}px) rotate(-${hologram.position.x}deg)`,
                      top: `${40 + Math.sin(hologram.position.y) * 20}%`,
                      animationDelay: `${index * 0.5}s`
                    }}
                  >
                    <div className="w-full h-full flex items-center justify-center text-white font-bold">
                      P{index + 1}
                    </div>
                    
                    {/* Hologram Status Indicators */}
                    <div className="absolute -top-2 -right-2 flex space-x-1">
                      {hologram.neuralConnection > 95 && (
                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" title="Neural Sync Active" />
                      )}
                      {hologram.aiEnhanced && (
                        <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse" title="AI Enhanced" />
                      )}
                    </div>
                    
                    {/* Connection Quality */}
                    <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-center">
                      <div className={`font-semibold ${
                        hologram.stability > 98 ? 'text-green-400' :
                        hologram.stability > 95 ? 'text-blue-400' :
                        hologram.stability > 90 ? 'text-yellow-400' :
                        'text-red-400'
                      }`}>
                        {hologram.stability.toFixed(1)}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Holographic Data Streams */}
              <div className="absolute inset-0 pointer-events-none">
                {participantHolograms.map((hologram, index) => (
                  <div
                    key={`stream-${hologram.id}`}
                    className="absolute w-0.5 h-32 bg-gradient-to-t from-transparent via-cyan-400/50 to-transparent neural-scan"
                    style={{
                      left: `${50 + Math.cos(index * 60 * Math.PI / 180) * 30}%`,
                      top: `${50 + Math.sin(index * 60 * Math.PI / 180) * 30}%`,
                      animationDelay: `${index * 0.3}s`
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Holographic UI Overlays */}
          <div className="absolute top-6 left-6 space-y-4">
            {/* Environment Controls */}
            <div className="bg-black/70 backdrop-blur-xl rounded-xl p-4 border border-purple-500/30">
              <h4 className="text-white font-semibold mb-3 flex items-center space-x-2">
                <Globe className="w-4 h-4 text-purple-400" />
                <span>Environment</span>
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { mode: 'office', label: 'Office', icon: '🏢' },
                  { mode: 'space', label: 'Space', icon: '🚀' },
                  { mode: 'nature', label: 'Nature', icon: '🌿' },
                  { mode: 'custom', label: 'Custom', icon: '✨' }
                ].map(({ mode, label, icon }) => (
                  <button
                    key={mode}
                    onClick={() => setEnvironmentMode(mode as any)}
                    className={`p-2 rounded-lg transition-all text-xs ${
                      environmentMode === mode
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-800/50 text-gray-400 hover:bg-gray-700/50'
                    }`}
                  >
                    <span className="block text-lg mb-1">{icon}</span>
                    <span>{label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Quality Controls */}
            <div className="bg-black/70 backdrop-blur-xl rounded-xl p-4 border border-cyan-500/30">
              <h4 className="text-white font-semibold mb-3 flex items-center space-x-2">
                <Eye className="w-4 h-4 text-cyan-400" />
                <span>Hologram Quality</span>
              </h4>
              <div className="space-y-2">
                {[
                  { quality: '4k', label: '4K Standard', desc: 'Basic holographic' },
                  { quality: '8k', label: '8K Enhanced', desc: 'High definition' },
                  { quality: '16k', label: '16K Ultra', desc: 'Ultra realistic' },
                  { quality: 'quantum', label: 'Quantum', desc: 'Perfect fidelity' }
                ].map(({ quality, label, desc }) => (
                  <button
                    key={quality}
                    onClick={() => setHologramQuality(quality as any)}
                    className={`w-full p-2 rounded-lg transition-all text-left ${
                      hologramQuality === quality
                        ? 'bg-cyan-600 text-white'
                        : 'bg-gray-800/50 text-gray-400 hover:bg-gray-700/50'
                    }`}
                  >
                    <p className="font-medium text-sm">{label}</p>
                    <p className="text-xs opacity-75">{desc}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Holographic Status Panel */}
          <div className="absolute top-6 right-6 space-y-4">
            {/* System Status */}
            <div className="bg-black/70 backdrop-blur-xl rounded-xl p-4 border border-green-500/30">
              <h4 className="text-white font-semibold mb-3 flex items-center space-x-2">
                <Zap className="w-4 h-4 text-green-400" />
                <span>System Status</span>
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Neural Sync:</span>
                  <span className="text-green-400 font-semibold">98.7%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Quantum Rendering:</span>
                  <span className="text-cyan-400 font-semibold">Active</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Spatial Mapping:</span>
                  <span className="text-blue-400 font-semibold">Calibrated</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">AI Enhancement:</span>
                  <span className="text-purple-400 font-semibold">Optimal</span>
                </div>
              </div>
            </div>

            {/* Participant Status */}
            <div className="bg-black/70 backdrop-blur-xl rounded-xl p-4 border border-blue-500/30">
              <h4 className="text-white font-semibold mb-3 flex items-center space-x-2">
                <Users className="w-4 h-4 text-blue-400" />
                <span>Hologram Status</span>
              </h4>
              <div className="space-y-2">
                {participantHolograms.slice(0, 4).map((hologram, index) => (
                  <div key={hologram.id} className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Participant {index + 1}:</span>
                    <div className="flex items-center space-x-2">
                      <span className={`font-semibold ${
                        hologram.stability > 98 ? 'text-green-400' :
                        hologram.stability > 95 ? 'text-blue-400' :
                        'text-yellow-400'
                      }`}>
                        {hologram.stability.toFixed(1)}%
                      </span>
                      {hologram.aiEnhanced && (
                        <Bot className="w-3 h-3 text-purple-400" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Holographic Controls */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
            <div className="bg-black/70 backdrop-blur-xl rounded-2xl p-4 border border-purple-500/30">
              <div className="flex items-center space-x-4">
                {/* Neural Sync */}
                <button
                  onClick={() => setNeuralSync(!neuralSync)}
                  className={`p-3 rounded-xl transition-all ${
                    neuralSync ? 'bg-green-600 text-white' : 'bg-gray-700 text-gray-400'
                  }`}
                  title="Neural Synchronization"
                >
                  <Brain className="w-5 h-5" />
                </button>

                {/* Quantum Rendering */}
                <button
                  onClick={() => setQuantumRendering(!quantumRendering)}
                  className={`p-3 rounded-xl transition-all ${
                    quantumRendering ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-400'
                  }`}
                  title="Quantum Rendering"
                >
                  <Sparkles className="w-5 h-5" />
                </button>

                {/* Spatial Mapping */}
                <button
                  onClick={() => setSpatialMapping(!spatialMapping)}
                  className={`p-3 rounded-xl transition-all ${
                    spatialMapping ? 'bg-cyan-600 text-white' : 'bg-gray-700 text-gray-400'
                  }`}
                  title="Spatial Mapping"
                >
                  <Compass className="w-5 h-5" />
                </button>

                {/* AI Enhancement */}
                <button
                  onClick={() => setAiEnhancement(!aiEnhancement)}
                  className={`p-3 rounded-xl transition-all ${
                    aiEnhancement ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-400'
                  }`}
                  title="AI Enhancement"
                >
                  <Bot className="w-5 h-5" />
                </button>

                {/* Settings */}
                <button className="p-3 rounded-xl bg-gray-700 text-gray-400 hover:bg-gray-600 transition-all">
                  <Settings className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* AI Holographic Assistant */}
          <div className="absolute bottom-6 right-6">
            <div className="bg-gradient-to-r from-purple-600/80 to-pink-600/80 backdrop-blur-xl rounded-xl p-4 border border-purple-500/30 max-w-xs">
              <div className="flex items-center space-x-2 mb-3">
                <Bot className="w-5 h-5 text-white" />
                <span className="text-white font-semibold">Holographic AI</span>
              </div>
              <div className="space-y-2 text-sm text-white">
                <p>• Hologram stability: <span className="text-green-300">Excellent</span></p>
                <p>• Neural sync rate: <span className="text-cyan-300">98.7%</span></p>
                <p>• Quantum fidelity: <span className="text-purple-300">Perfect</span></p>
                <p>• Spatial accuracy: <span className="text-blue-300">±0.1mm</span></p>
              </div>
            </div>
          </div>

          {/* Holographic Meeting Info */}
          <div className="absolute top-6 left-1/2 transform -translate-x-1/2">
            <div className="bg-black/70 backdrop-blur-xl rounded-xl px-6 py-3 border border-purple-500/30">
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                  <span className="text-purple-400 font-semibold">HOLOGRAPHIC ACTIVE</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-400">
                  <Users className="w-4 h-4" />
                  <span>{participantHolograms.length} holograms</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-400">
                  <Zap className="w-4 h-4" />
                  <span>Quantum sync</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};