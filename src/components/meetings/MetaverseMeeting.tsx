import React, { useState, useEffect, useRef } from 'react';
import { Globe, Users, Gamepad2, Zap, Bot, Eye, Shield, Star, Heart, Brain, Sparkles, Compass, Navigation, Target, Award, TrendingUp, Volume2, Headphones, Monitor, Share2, Settings, Video, Mic, Camera, FileText, MessageSquare, Lock, Wifi, Battery, Signal } from 'lucide-react';

interface MetaverseMeetingProps {
  meetingId: string;
  participants: any[];
  onClose: () => void;
}

interface Avatar {
  id: string;
  userId: string;
  position: { x: number; y: number; z: number };
  rotation: { x: number; y: number; z: number };
  animation: 'idle' | 'talking' | 'gesturing' | 'presenting' | 'listening';
  customization: {
    appearance: string;
    clothing: string;
    accessories: string[];
  };
  interactions: {
    handRaised: boolean;
    speaking: boolean;
    sharing: boolean;
  };
}

interface VirtualWorld {
  id: string;
  name: string;
  theme: 'office' | 'space_station' | 'nature' | 'cyberpunk' | 'fantasy' | 'custom';
  physics: boolean;
  lighting: 'natural' | 'studio' | 'ambient' | 'dynamic';
  weather: 'clear' | 'rain' | 'snow' | 'storm' | 'aurora';
  timeOfDay: 'morning' | 'afternoon' | 'evening' | 'night';
}

export const MetaverseMeeting: React.FC<MetaverseMeetingProps> = ({
  meetingId,
  participants,
  onClose
}) => {
  const [avatars, setAvatars] = useState<Avatar[]>([]);
  const [virtualWorld, setVirtualWorld] = useState<VirtualWorld>({
    id: 'default',
    name: 'Quantum Conference Room',
    theme: 'cyberpunk',
    physics: true,
    lighting: 'dynamic',
    weather: 'aurora',
    timeOfDay: 'evening'
  });
  const [cameraMode, setCameraMode] = useState<'first_person' | 'third_person' | 'free_cam' | 'cinematic'>('third_person');
  const [interactionMode, setInteractionMode] = useState<'gesture' | 'voice' | 'neural' | 'hybrid'>('hybrid');
  const [worldPhysics, setWorldPhysics] = useState(true);
  const [spatialAudio, setSpatialAudio] = useState(true);
  const [hapticFeedback, setHapticFeedback] = useState(true);
  const [aiNPCs, setAiNPCs] = useState(true);
  const [realTimeRendering, setRealTimeRendering] = useState(true);
  const [immersionLevel, setImmersionLevel] = useState(85);
  const worldRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    initializeMetaverse();
    createAvatars();
    setupVirtualWorld();
  }, [participants]);

  const initializeMetaverse = () => {
    console.log('Initializing metaverse meeting space...');
    console.log('Loading quantum physics engine...');
    console.log('Establishing neural interfaces...');
    console.log('Activating spatial audio systems...');
  };

  const createAvatars = () => {
    const newAvatars = participants.map((participant, index) => ({
      id: participant.id,
      userId: participant.user_id,
      position: {
        x: Math.cos(index * (360 / participants.length) * Math.PI / 180) * 5,
        y: 0,
        z: Math.sin(index * (360 / participants.length) * Math.PI / 180) * 5
      },
      rotation: { x: 0, y: index * (360 / participants.length), z: 0 },
      animation: 'idle' as const,
      customization: {
        appearance: ['human', 'cyborg', 'hologram', 'energy_being'][Math.floor(Math.random() * 4)],
        clothing: ['business', 'casual', 'futuristic', 'fantasy'][Math.floor(Math.random() * 4)],
        accessories: ['neural_implant', 'holo_display', 'energy_aura'].slice(0, Math.floor(Math.random() * 3) + 1)
      },
      interactions: {
        handRaised: false,
        speaking: false,
        sharing: false
      }
    }));
    
    setAvatars(newAvatars);
  };

  const setupVirtualWorld = () => {
    console.log(`Setting up ${virtualWorld.theme} environment...`);
    console.log(`Applying ${virtualWorld.lighting} lighting...`);
    console.log(`Weather system: ${virtualWorld.weather}`);
  };

  const getThemeGradient = (theme: string) => {
    switch (theme) {
      case 'space_station': return 'from-indigo-900 via-purple-900 to-black';
      case 'nature': return 'from-green-900 via-emerald-800 to-teal-900';
      case 'cyberpunk': return 'from-purple-900 via-pink-900 to-blue-900';
      case 'fantasy': return 'from-violet-900 via-purple-800 to-indigo-900';
      case 'office': return 'from-gray-900 via-slate-800 to-gray-900';
      default: return 'from-purple-900 via-pink-900 to-blue-900';
    }
  };

  const getWeatherEffect = (weather: string) => {
    switch (weather) {
      case 'aurora': return 'Aurora particles';
      case 'rain': return 'Digital rain';
      case 'snow': return 'Quantum snow';
      case 'storm': return 'Energy storm';
      default: return 'Clear skies';
    }
  };

  const updateAvatarAnimation = (avatarId: string, animation: Avatar['animation']) => {
    setAvatars(prev => prev.map(avatar => 
      avatar.id === avatarId ? { ...avatar, animation } : avatar
    ));
  };

  const moveAvatar = (avatarId: string, direction: 'forward' | 'backward' | 'left' | 'right') => {
    setAvatars(prev => prev.map(avatar => {
      if (avatar.id === avatarId) {
        const speed = 0.5;
        let newPosition = { ...avatar.position };
        
        switch (direction) {
          case 'forward':
            newPosition.z -= speed;
            break;
          case 'backward':
            newPosition.z += speed;
            break;
          case 'left':
            newPosition.x -= speed;
            break;
          case 'right':
            newPosition.x += speed;
            break;
        }
        
        return { ...avatar, position: newPosition, animation: 'talking' };
      }
      return avatar;
    }));
  };

  return (
    <div className="fixed inset-0 bg-black z-50">
      <div className="h-full flex flex-col">
        {/* Metaverse Control Header */}
        <div className="p-4 bg-black/90 backdrop-blur-xl border-b border-green-500/30 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-cyan-500 rounded-xl flex items-center justify-center">
              <Globe className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Metaverse Meeting</h2>
              <p className="text-green-300 text-sm">{virtualWorld.name} • {virtualWorld.theme}</p>
            </div>
            <div className="flex items-center space-x-2 bg-green-600/20 px-3 py-1 rounded-lg">
              <Gamepad2 className="w-4 h-4 text-green-400" />
              <span className="text-green-400 text-sm font-semibold">Metaverse Active</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <span>Immersion:</span>
              <span className="text-green-400 font-semibold">{immersionLevel}%</span>
            </div>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-red-600 rounded-lg text-white hover:bg-red-700 transition-colors"
            >
              Exit Metaverse
            </button>
          </div>
        </div>

        {/* Metaverse World View */}
        <div className={`flex-1 relative bg-gradient-to-br ${getThemeGradient(virtualWorld.theme)} overflow-hidden`}>
          {/* World Background Effects */}
          <div className="absolute inset-0">
            {/* Cyberpunk Grid */}
            {virtualWorld.theme === 'cyberpunk' && (
              <div className="cyber-grid opacity-20"></div>
            )}
            
            {/* Aurora Effect */}
            {virtualWorld.weather === 'aurora' && (
              <div className="absolute inset-0">
                {[...Array(10)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-full h-1 bg-gradient-to-r from-transparent via-green-400/30 to-transparent animate-pulse"
                    style={{
                      top: `${10 + i * 8}%`,
                      animationDelay: `${i * 0.5}s`,
                      animationDuration: `${3 + Math.random() * 2}s`
                    }}
                  />
                ))}
              </div>
            )}
            
            {/* Floating Particles */}
            <div className="absolute inset-0">
              {[...Array(30)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-pulse data-stream"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 5}s`,
                    animationDuration: `${5 + Math.random() * 3}s`
                  }}
                />
              ))}
            </div>
          </div>

          {/* Central Meeting Space */}
          <div 
            ref={worldRef}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="relative w-full h-full">
              {/* Virtual Conference Table */}
              <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-96 h-64 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl border-2 border-cyan-500/30 backdrop-blur-sm">
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full flex items-center justify-center mb-4 quantum-pulse">
                        <Globe className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-white text-quantum">Virtual Conference Table</h3>
                      <p className="text-cyan-300">Quantum-synchronized collaboration space</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Avatar Positions */}
              {avatars.map((avatar, index) => (
                <div
                  key={avatar.id}
                  className="absolute transition-all duration-500"
                  style={{
                    left: `${50 + avatar.position.x * 8}%`,
                    top: `${50 + avatar.position.z * 8}%`,
                    transform: `rotateY(${avatar.rotation.y}deg)`
                  }}
                >
                  {/* Avatar Representation */}
                  <div className="relative">
                    <div className="w-20 h-32 bg-gradient-to-b from-blue-500/40 to-purple-500/40 rounded-lg border-2 border-cyan-500/50 backdrop-blur-sm">
                      <div className="w-full h-full flex flex-col items-center justify-center text-white">
                        {/* Avatar Head */}
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mb-2">
                          <span className="font-bold text-sm">
                            {avatar.userId.slice(0, 2).toUpperCase()}
                          </span>
                        </div>
                        
                        {/* Avatar Body */}
                        <div className="flex-1 w-8 bg-gradient-to-b from-gray-600/50 to-gray-800/50 rounded-sm"></div>
                      </div>
                    </div>
                    
                    {/* Avatar Status */}
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <div className="bg-black/70 backdrop-blur-sm px-2 py-1 rounded text-white text-xs font-semibold">
                        User {avatar.userId.slice(-4)}
                      </div>
                    </div>
                    
                    {/* Interaction Indicators */}
                    <div className="absolute -top-1 -right-1 flex flex-col space-y-1">
                      {avatar.interactions.speaking && (
                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" title="Speaking" />
                      )}
                      {avatar.interactions.handRaised && (
                        <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse" title="Hand Raised" />
                      )}
                      {avatar.interactions.sharing && (
                        <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse" title="Sharing" />
                      )}
                    </div>
                    
                    {/* Avatar Customization Info */}
                    <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-center">
                      <div className="bg-black/50 backdrop-blur-sm px-2 py-1 rounded text-xs">
                        <p className="text-cyan-400 capitalize">{avatar.customization.appearance}</p>
                        <p className="text-gray-400 capitalize">{avatar.animation}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Virtual Objects */}
              <div className="absolute top-20 left-20">
                <div className="w-32 h-24 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-lg border border-purple-500/50 backdrop-blur-sm">
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center text-white">
                      <FileText className="w-6 h-6 mx-auto mb-1 text-purple-400" />
                      <p className="text-xs font-semibold">Virtual Whiteboard</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute top-20 right-20">
                <div className="w-32 h-24 bg-gradient-to-r from-blue-500/30 to-cyan-500/30 rounded-lg border border-blue-500/50 backdrop-blur-sm">
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center text-white">
                      <Monitor className="w-6 h-6 mx-auto mb-1 text-blue-400" />
                      <p className="text-xs font-semibold">Shared Screen</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* World Controls */}
          <div className="absolute top-6 left-6 space-y-4">
            {/* World Theme */}
            <div className="bg-black/70 backdrop-blur-xl rounded-xl p-4 border border-green-500/30">
              <h4 className="text-white font-semibold mb-3 flex items-center space-x-2">
                <Globe className="w-4 h-4 text-green-400" />
                <span>Virtual World</span>
              </h4>
              <div className="space-y-2">
                {[
                  { theme: 'office', label: 'Corporate Office', icon: '🏢' },
                  { theme: 'space_station', label: 'Space Station', icon: '🚀' },
                  { theme: 'nature', label: 'Natural Paradise', icon: '🌿' },
                  { theme: 'cyberpunk', label: 'Cyberpunk City', icon: '🌃' },
                  { theme: 'fantasy', label: 'Fantasy Realm', icon: '🏰' }
                ].map(({ theme, label, icon }) => (
                  <button
                    key={theme}
                    onClick={() => setVirtualWorld(prev => ({ ...prev, theme: theme as any }))}
                    className={`w-full p-2 rounded-lg transition-all text-left ${
                      virtualWorld.theme === theme
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-800/50 text-gray-400 hover:bg-gray-700/50'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">{icon}</span>
                      <span className="text-sm font-medium">{label}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Camera Controls */}
            <div className="bg-black/70 backdrop-blur-xl rounded-xl p-4 border border-blue-500/30">
              <h4 className="text-white font-semibold mb-3 flex items-center space-x-2">
                <Camera className="w-4 h-4 text-blue-400" />
                <span>Camera Mode</span>
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { mode: 'first_person', label: 'First Person', icon: '👁️' },
                  { mode: 'third_person', label: 'Third Person', icon: '📷' },
                  { mode: 'free_cam', label: 'Free Camera', icon: '🎥' },
                  { mode: 'cinematic', label: 'Cinematic', icon: '🎬' }
                ].map(({ mode, label, icon }) => (
                  <button
                    key={mode}
                    onClick={() => setCameraMode(mode as any)}
                    className={`p-2 rounded-lg transition-all text-xs ${
                      cameraMode === mode
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-800/50 text-gray-400 hover:bg-gray-700/50'
                    }`}
                  >
                    <span className="block text-lg mb-1">{icon}</span>
                    <span>{label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Metaverse Features */}
          <div className="absolute top-6 right-6 space-y-4">
            {/* System Performance */}
            <div className="bg-black/70 backdrop-blur-xl rounded-xl p-4 border border-purple-500/30">
              <h4 className="text-white font-semibold mb-3 flex items-center space-x-2">
                <Zap className="w-4 h-4 text-purple-400" />
                <span>Performance</span>
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Frame Rate:</span>
                  <span className="text-green-400 font-semibold">120 FPS</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Latency:</span>
                  <span className="text-blue-400 font-semibold">2ms</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Physics:</span>
                  <span className="text-purple-400 font-semibold">Quantum</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Rendering:</span>
                  <span className="text-cyan-400 font-semibold">Real-time</span>
                </div>
              </div>
            </div>

            {/* Avatar Customization */}
            <div className="bg-black/70 backdrop-blur-xl rounded-xl p-4 border border-cyan-500/30">
              <h4 className="text-white font-semibold mb-3 flex items-center space-x-2">
                <Users className="w-4 h-4 text-cyan-400" />
                <span>Your Avatar</span>
              </h4>
              <div className="space-y-3">
                <button className="w-full p-2 bg-cyan-600 rounded-lg text-white hover:bg-cyan-700 transition-colors text-sm">
                  Customize Appearance
                </button>
                <button className="w-full p-2 bg-purple-600 rounded-lg text-white hover:bg-purple-700 transition-colors text-sm">
                  Change Outfit
                </button>
                <button className="w-full p-2 bg-green-600 rounded-lg text-white hover:bg-green-700 transition-colors text-sm">
                  Add Accessories
                </button>
              </div>
            </div>
          </div>

          {/* Movement Controls */}
          <div className="absolute bottom-6 left-6">
            <div className="bg-black/70 backdrop-blur-xl rounded-xl p-4 border border-yellow-500/30">
              <h4 className="text-white font-semibold mb-3 flex items-center space-x-2">
                <Navigation className="w-4 h-4 text-yellow-400" />
                <span>Movement</span>
              </h4>
              <div className="grid grid-cols-3 gap-2">
                <div></div>
                <button
                  onClick={() => moveAvatar(avatars[0]?.id, 'forward')}
                  className="p-2 bg-gray-700 rounded text-white hover:bg-gray-600 transition-colors"
                >
                  ↑
                </button>
                <div></div>
                <button
                  onClick={() => moveAvatar(avatars[0]?.id, 'left')}
                  className="p-2 bg-gray-700 rounded text-white hover:bg-gray-600 transition-colors"
                >
                  ←
                </button>
                <button className="p-2 bg-gray-800 rounded text-gray-400">
                  ⭕
                </button>
                <button
                  onClick={() => moveAvatar(avatars[0]?.id, 'right')}
                  className="p-2 bg-gray-700 rounded text-white hover:bg-gray-600 transition-colors"
                >
                  →
                </button>
                <div></div>
                <button
                  onClick={() => moveAvatar(avatars[0]?.id, 'backward')}
                  className="p-2 bg-gray-700 rounded text-white hover:bg-gray-600 transition-colors"
                >
                  ↓
                </button>
                <div></div>
              </div>
            </div>
          </div>

          {/* Metaverse AI Assistant */}
          <div className="absolute bottom-6 right-6">
            <div className="bg-gradient-to-r from-green-600/80 to-cyan-600/80 backdrop-blur-xl rounded-xl p-4 border border-green-500/30 max-w-xs">
              <div className="flex items-center space-x-2 mb-3">
                <Bot className="w-5 h-5 text-white" />
                <span className="text-white font-semibold">Metaverse AI</span>
              </div>
              <div className="space-y-2 text-sm text-white">
                <p>• World: <span className="text-cyan-300">{virtualWorld.name}</span></p>
                <p>• Avatars: <span className="text-green-300">{avatars.length} active</span></p>
                <p>• Physics: <span className="text-purple-300">Quantum enabled</span></p>
                <p>• Weather: <span className="text-blue-300">{getWeatherEffect(virtualWorld.weather)}</span></p>
              </div>
            </div>
          </div>

          {/* Immersion Level */}
          <div className="absolute top-1/2 right-6 transform -translate-y-1/2">
            <div className="bg-black/70 backdrop-blur-xl rounded-xl p-4 border border-purple-500/30">
              <h4 className="text-white font-semibold mb-3 text-center">Immersion</h4>
              <div className="relative w-4 h-32 bg-gray-700 rounded-full mx-auto">
                <div
                  className="absolute bottom-0 w-full bg-gradient-to-t from-purple-500 to-cyan-500 rounded-full transition-all duration-500"
                  style={{ height: `${immersionLevel}%` }}
                ></div>
                <div className="absolute -right-8 top-1/2 transform -translate-y-1/2 text-white text-sm font-bold">
                  {immersionLevel}%
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Metaverse Control Bar */}
        <div className="p-4 bg-black/90 backdrop-blur-xl border-t border-green-500/30">
          <div className="flex items-center justify-center space-x-4">
            {/* World Physics */}
            <button
              onClick={() => setWorldPhysics(!worldPhysics)}
              className={`p-3 rounded-full transition-all ${
                worldPhysics ? 'bg-green-600 text-white' : 'bg-gray-700 text-gray-400'
              }`}
              title="World Physics"
            >
              <Zap className="w-5 h-5" />
            </button>

            {/* Spatial Audio */}
            <button
              onClick={() => setSpatialAudio(!spatialAudio)}
              className={`p-3 rounded-full transition-all ${
                spatialAudio ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-400'
              }`}
              title="Spatial Audio"
            >
              <Headphones className="w-5 h-5" />
            </button>

            {/* Haptic Feedback */}
            <button
              onClick={() => setHapticFeedback(!hapticFeedback)}
              className={`p-3 rounded-full transition-all ${
                hapticFeedback ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-400'
              }`}
              title="Haptic Feedback"
            >
              <Gamepad2 className="w-5 h-5" />
            </button>

            {/* AI NPCs */}
            <button
              onClick={() => setAiNPCs(!aiNPCs)}
              className={`p-3 rounded-full transition-all ${
                aiNPCs ? 'bg-cyan-600 text-white' : 'bg-gray-700 text-gray-400'
              }`}
              title="AI NPCs"
            >
              <Bot className="w-5 h-5" />
            </button>

            {/* Settings */}
            <button className="p-3 rounded-full bg-gray-700 text-gray-400 hover:bg-gray-600 transition-all">
              <Settings className="w-5 h-5" />
            </button>
          </div>

          {/* Metaverse Status */}
          <div className="flex items-center justify-between mt-4 text-sm text-gray-400">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-1">
                <Globe className="w-4 h-4 text-green-400" />
                <span>Metaverse Connected</span>
              </div>
              <div className="flex items-center space-x-1">
                <Gamepad2 className="w-4 h-4 text-purple-400" />
                <span>Interactive Mode</span>
              </div>
              <div className="flex items-center space-x-1">
                <Bot className="w-4 h-4 text-cyan-400" />
                <span>AI Enhanced</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Metaverse: Optimal</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};