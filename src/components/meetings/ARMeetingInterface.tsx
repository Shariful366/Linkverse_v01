import React, { useState, useEffect, useRef } from 'react';
import { Eye, Camera, Globe, Zap, Bot, Users, Video, Mic, Monitor, Share2, Settings, Layers, Compass, Navigation, Star, Heart, Brain, Sparkles, Shield, Lock, Wifi, Battery, Signal, Volume2, Headphones, FileText, MessageSquare, Award, Target, TrendingUp } from 'lucide-react';

interface ARMeetingInterfaceProps {
  meetingId: string;
  participants: any[];
  onClose: () => void;
}

export const ARMeetingInterface: React.FC<ARMeetingInterfaceProps> = ({
  meetingId,
  participants,
  onClose
}) => {
  const [arMode, setArMode] = useState<'overlay' | 'immersive' | 'mixed'>('overlay');
  const [trackingAccuracy, setTrackingAccuracy] = useState(98.5);
  const [spatialAnchors, setSpatialAnchors] = useState<any[]>([]);
  const [virtualObjects, setVirtualObjects] = useState<any[]>([]);
  const [gestureRecognition, setGestureRecognition] = useState(true);
  const [eyeTracking, setEyeTracking] = useState(true);
  const [environmentMapping, setEnvironmentMapping] = useState(true);
  const [aiObjectRecognition, setAiObjectRecognition] = useState(true);
  const [realWorldOcclusion, setRealWorldOcclusion] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    initializeARSystem();
    createSpatialAnchors();
    generateVirtualObjects();
  }, [participants]);

  const initializeARSystem = async () => {
    console.log('Initializing AR meeting system...');
    console.log('Calibrating spatial tracking...');
    console.log('Mapping environment...');
    console.log('Activating gesture recognition...');
    
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'environment',
          width: { ideal: 1920 },
          height: { ideal: 1080 }
        } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.log('Camera access not available in demo mode');
    }
  };

  const createSpatialAnchors = () => {
    const anchors = participants.map((participant, index) => ({
      id: participant.id,
      position: {
        x: Math.cos(index * (360 / participants.length) * Math.PI / 180) * 2,
        y: 0,
        z: Math.sin(index * (360 / participants.length) * Math.PI / 180) * 2
      },
      stability: 95 + Math.random() * 5,
      trackingConfidence: 98 + Math.random() * 2,
      lastUpdate: Date.now()
    }));
    
    setSpatialAnchors(anchors);
  };

  const generateVirtualObjects = () => {
    const objects = [
      {
        id: 'whiteboard',
        type: 'whiteboard',
        position: { x: 0, y: 1, z: -3 },
        scale: { x: 2, y: 1.5, z: 0.1 },
        interactive: true,
        aiEnhanced: true
      },
      {
        id: 'presentation',
        type: 'screen',
        position: { x: 2, y: 1, z: -2 },
        scale: { x: 1.6, y: 0.9, z: 0.05 },
        interactive: false,
        aiEnhanced: true
      },
      {
        id: 'chat_panel',
        type: 'ui_panel',
        position: { x: -2, y: 0.5, z: -1 },
        scale: { x: 0.8, y: 1.2, z: 0.02 },
        interactive: true,
        aiEnhanced: false
      }
    ];
    
    setVirtualObjects(objects);
  };

  const getModeColor = (mode: string) => {
    switch (mode) {
      case 'overlay': return 'text-blue-400 bg-blue-600/20';
      case 'immersive': return 'text-purple-400 bg-purple-600/20';
      case 'mixed': return 'text-green-400 bg-green-600/20';
      default: return 'text-gray-400 bg-gray-600/20';
    }
  };

  const getTrackingQuality = (accuracy: number) => {
    if (accuracy >= 98) return { color: 'text-green-400', label: 'Excellent' };
    if (accuracy >= 95) return { color: 'text-blue-400', label: 'Good' };
    if (accuracy >= 90) return { color: 'text-yellow-400', label: 'Fair' };
    return { color: 'text-red-400', label: 'Poor' };
  };

  return (
    <div className="fixed inset-0 bg-black z-50">
      <div className="h-full flex flex-col">
        {/* AR Control Header */}
        <div className="p-4 bg-black/90 backdrop-blur-xl border-b border-blue-500/30 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
              <Eye className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">AR Meeting Interface</h2>
              <p className="text-blue-300 text-sm">Augmented reality collaboration space</p>
            </div>
            <div className="flex items-center space-x-2 bg-blue-600/20 px-3 py-1 rounded-lg">
              <Camera className="w-4 h-4 text-blue-400" />
              <span className="text-blue-400 text-sm font-semibold">AR Active</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm">
              <span className="text-gray-400">Tracking:</span>
              <span className={`font-semibold ${getTrackingQuality(trackingAccuracy).color}`}>
                {trackingAccuracy.toFixed(1)}%
              </span>
            </div>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-red-600 rounded-lg text-white hover:bg-red-700 transition-colors"
            >
              Exit AR Mode
            </button>
          </div>
        </div>

        {/* AR Camera View */}
        <div className="flex-1 relative bg-black overflow-hidden">
          {/* Camera Feed */}
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover"
          />
          
          {/* AR Canvas Overlay */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none"
          />

          {/* AR Overlays */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Participant AR Avatars */}
            {spatialAnchors.map((anchor, index) => (
              <div
                key={anchor.id}
                className="absolute"
                style={{
                  left: `${50 + anchor.position.x * 10}%`,
                  top: `${50 + anchor.position.y * 10}%`,
                  transform: `translateZ(${anchor.position.z}px)`
                }}
              >
                {/* AR Avatar */}
                <div className="relative">
                  <div className="w-24 h-32 bg-gradient-to-b from-blue-500/30 to-purple-500/30 rounded-lg border-2 border-cyan-500/50 backdrop-blur-sm">
                    <div className="w-full h-full flex flex-col items-center justify-center text-white">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mb-2">
                        <span className="font-bold">P{index + 1}</span>
                      </div>
                      <span className="text-xs">Participant {index + 1}</span>
                    </div>
                  </div>
                  
                  {/* Status Indicators */}
                  <div className="absolute -top-2 -right-2 flex flex-col space-y-1">
                    <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse" title="Connected" />
                    {anchor.trackingConfidence > 98 && (
                      <div className="w-4 h-4 bg-blue-500 rounded-full animate-pulse" title="High Tracking" />
                    )}
                  </div>
                  
                  {/* Tracking Confidence */}
                  <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-center">
                    <div className="bg-black/70 backdrop-blur-sm px-2 py-1 rounded text-white">
                      {anchor.trackingConfidence.toFixed(1)}%
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Virtual Objects */}
            {virtualObjects.map((obj) => (
              <div
                key={obj.id}
                className="absolute pointer-events-auto"
                style={{
                  left: `${50 + obj.position.x * 15}%`,
                  top: `${50 + obj.position.y * 15}%`
                }}
              >
                {obj.type === 'whiteboard' && (
                  <div className="w-64 h-48 bg-white/10 backdrop-blur-sm rounded-lg border-2 border-blue-500/50">
                    <div className="p-4 h-full flex items-center justify-center">
                      <div className="text-center text-white">
                        <FileText className="w-8 h-8 mx-auto mb-2 text-blue-400" />
                        <p className="text-sm font-semibold">AR Whiteboard</p>
                        <p className="text-xs opacity-75">Touch to interact</p>
                      </div>
                    </div>
                  </div>
                )}
                
                {obj.type === 'screen' && (
                  <div className="w-48 h-32 bg-gray-900/80 backdrop-blur-sm rounded-lg border-2 border-purple-500/50">
                    <div className="p-3 h-full flex items-center justify-center">
                      <div className="text-center text-white">
                        <Monitor className="w-6 h-6 mx-auto mb-2 text-purple-400" />
                        <p className="text-sm font-semibold">Shared Screen</p>
                        <p className="text-xs opacity-75">Presentation view</p>
                      </div>
                    </div>
                  </div>
                )}
                
                {obj.type === 'ui_panel' && (
                  <div className="w-40 h-56 bg-black/70 backdrop-blur-sm rounded-lg border-2 border-green-500/50">
                    <div className="p-3 h-full">
                      <div className="text-center text-white mb-3">
                        <MessageSquare className="w-5 h-5 mx-auto mb-1 text-green-400" />
                        <p className="text-xs font-semibold">Live Chat</p>
                      </div>
                      <div className="space-y-2 text-xs">
                        <div className="bg-white/10 rounded p-2">
                          <p className="text-cyan-400 font-medium">User 1:</p>
                          <p className="text-gray-300">Great AR experience!</p>
                        </div>
                        <div className="bg-white/10 rounded p-2">
                          <p className="text-purple-400 font-medium">AI:</p>
                          <p className="text-gray-300">AR tracking optimal</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* AR UI Elements */}
            <div className="absolute top-20 left-6">
              <div className="bg-black/70 backdrop-blur-xl rounded-xl p-4 border border-blue-500/30">
                <h4 className="text-white font-semibold mb-3 flex items-center space-x-2">
                  <Eye className="w-4 h-4 text-blue-400" />
                  <span>AR Mode</span>
                </h4>
                <div className="space-y-2">
                  {[
                    { mode: 'overlay', label: 'Overlay', desc: 'Basic AR overlay' },
                    { mode: 'immersive', label: 'Immersive', desc: 'Full AR experience' },
                    { mode: 'mixed', label: 'Mixed Reality', desc: 'Blended real/virtual' }
                  ].map(({ mode, label, desc }) => (
                    <button
                      key={mode}
                      onClick={() => setArMode(mode as any)}
                      className={`w-full p-2 rounded-lg transition-all text-left ${
                        arMode === mode
                          ? getModeColor(mode)
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

            {/* AR Features Panel */}
            <div className="absolute top-20 right-6">
              <div className="bg-black/70 backdrop-blur-xl rounded-xl p-4 border border-cyan-500/30">
                <h4 className="text-white font-semibold mb-3 flex items-center space-x-2">
                  <Zap className="w-4 h-4 text-cyan-400" />
                  <span>AR Features</span>
                </h4>
                <div className="space-y-3">
                  {[
                    { key: 'gestureRecognition', label: 'Gesture Control', value: gestureRecognition, setter: setGestureRecognition },
                    { key: 'eyeTracking', label: 'Eye Tracking', value: eyeTracking, setter: setEyeTracking },
                    { key: 'environmentMapping', label: 'Environment Map', value: environmentMapping, setter: setEnvironmentMapping },
                    { key: 'aiObjectRecognition', label: 'AI Recognition', value: aiObjectRecognition, setter: setAiObjectRecognition },
                    { key: 'realWorldOcclusion', label: 'Real Occlusion', value: realWorldOcclusion, setter: setRealWorldOcclusion }
                  ].map(({ key, label, value, setter }) => (
                    <label key={key} className="flex items-center justify-between cursor-pointer">
                      <span className="text-white text-sm">{label}</span>
                      <input
                        type="checkbox"
                        checked={value}
                        onChange={(e) => setter(e.target.checked)}
                        className="sr-only"
                      />
                      <div className={`w-8 h-4 rounded-full ${value ? 'bg-cyan-600' : 'bg-gray-600'}`}>
                        <div className={`w-3 h-3 rounded-full bg-white transition-transform ${value ? 'translate-x-4' : 'translate-x-0.5'} mt-0.5`}></div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* AR Gesture Recognition */}
            {gestureRecognition && (
              <div className="absolute bottom-20 left-6">
                <div className="bg-black/70 backdrop-blur-xl rounded-xl p-4 border border-green-500/30">
                  <h4 className="text-white font-semibold mb-3 flex items-center space-x-2">
                    <Hand className="w-4 h-4 text-green-400" />
                    <span>Gesture Commands</span>
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">👋</span>
                      <span className="text-gray-300">Wave to greet</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">👍</span>
                      <span className="text-gray-300">Thumbs up to agree</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">✋</span>
                      <span className="text-gray-300">Raise hand to speak</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">👏</span>
                      <span className="text-gray-300">Clap to applaud</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* AR Analytics */}
            <div className="absolute bottom-20 right-6">
              <div className="bg-black/70 backdrop-blur-xl rounded-xl p-4 border border-purple-500/30">
                <h4 className="text-white font-semibold mb-3 flex items-center space-x-2">
                  <Brain className="w-4 h-4 text-purple-400" />
                  <span>AR Analytics</span>
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Tracking Accuracy:</span>
                    <span className={`font-semibold ${getTrackingQuality(trackingAccuracy).color}`}>
                      {getTrackingQuality(trackingAccuracy).label}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Spatial Anchors:</span>
                    <span className="text-blue-400 font-semibold">{spatialAnchors.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Virtual Objects:</span>
                    <span className="text-green-400 font-semibold">{virtualObjects.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Frame Rate:</span>
                    <span className="text-cyan-400 font-semibold">60 FPS</span>
                  </div>
                </div>
              </div>
            </div>

            {/* AR Instructions */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
              <div className="text-center">
                <div className="w-32 h-32 mx-auto bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full border-4 border-blue-500/30 flex items-center justify-center mb-6 animate-pulse">
                  <Eye className="w-16 h-16 text-blue-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">AR Meeting Space</h3>
                <p className="text-blue-300 mb-6">Move your device to explore the augmented environment</p>
                
                <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                  <div className="bg-black/50 backdrop-blur-sm rounded-lg p-3 border border-blue-500/30">
                    <Camera className="w-6 h-6 mx-auto mb-2 text-blue-400" />
                    <p className="text-white text-sm font-medium">Point & Look</p>
                    <p className="text-gray-400 text-xs">Explore AR objects</p>
                  </div>
                  <div className="bg-black/50 backdrop-blur-sm rounded-lg p-3 border border-green-500/30">
                    <Hand className="w-6 h-6 mx-auto mb-2 text-green-400" />
                    <p className="text-white text-sm font-medium">Gesture Control</p>
                    <p className="text-gray-400 text-xs">Use hand gestures</p>
                  </div>
                  <div className="bg-black/50 backdrop-blur-sm rounded-lg p-3 border border-purple-500/30">
                    <Bot className="w-6 h-6 mx-auto mb-2 text-purple-400" />
                    <p className="text-white text-sm font-medium">AI Assistant</p>
                    <p className="text-gray-400 text-xs">Voice commands</p>
                  </div>
                  <div className="bg-black/50 backdrop-blur-sm rounded-lg p-3 border border-yellow-500/30">
                    <Share2 className="w-6 h-6 mx-auto mb-2 text-yellow-400" />
                    <p className="text-white text-sm font-medium">Collaborate</p>
                    <p className="text-gray-400 text-xs">Shared AR space</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* AR Control Bar */}
        <div className="p-4 bg-black/90 backdrop-blur-xl border-t border-blue-500/30">
          <div className="flex items-center justify-center space-x-4">
            {/* AR Mode Toggle */}
            <button className="p-3 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-all">
              <Eye className="w-5 h-5" />
            </button>

            {/* Spatial Mapping */}
            <button
              onClick={() => setEnvironmentMapping(!environmentMapping)}
              className={`p-3 rounded-full transition-all ${
                environmentMapping ? 'bg-green-600 text-white' : 'bg-gray-700 text-gray-400'
              }`}
            >
              <Compass className="w-5 h-5" />
            </button>

            {/* Object Recognition */}
            <button
              onClick={() => setAiObjectRecognition(!aiObjectRecognition)}
              className={`p-3 rounded-full transition-all ${
                aiObjectRecognition ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-400'
              }`}
            >
              <Bot className="w-5 h-5" />
            </button>

            {/* Gesture Control */}
            <button
              onClick={() => setGestureRecognition(!gestureRecognition)}
              className={`p-3 rounded-full transition-all ${
                gestureRecognition ? 'bg-cyan-600 text-white' : 'bg-gray-700 text-gray-400'
              }`}
            >
              <Hand className="w-5 h-5" />
            </button>

            {/* Settings */}
            <button className="p-3 rounded-full bg-gray-700 text-gray-400 hover:bg-gray-600 transition-all">
              <Settings className="w-5 h-5" />
            </button>
          </div>

          {/* AR Status Bar */}
          <div className="flex items-center justify-between mt-4 text-sm text-gray-400">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-1">
                <Camera className="w-4 h-4 text-blue-400" />
                <span>AR Camera Active</span>
              </div>
              <div className="flex items-center space-x-1">
                <Compass className="w-4 h-4 text-green-400" />
                <span>Spatial Tracking</span>
              </div>
              <div className="flex items-center space-x-1">
                <Bot className="w-4 h-4 text-purple-400" />
                <span>AI Enhancement</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span>AR System: Optimal</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Hand component for gesture recognition
const Hand: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0"/>
    <path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2"/>
    <path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8"/>
    <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/>
  </svg>
);