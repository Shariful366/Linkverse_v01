import React, { useState, useEffect, useRef } from 'react';
import { Camera, Navigation, Zap, Bot, Eye, Layers, Compass, Route, MapPin, Star, AlertTriangle, Shield, Globe, Smartphone, Headphones } from 'lucide-react';

interface ARNavigationProps {
  destination?: string;
  onNavigationComplete?: () => void;
}

interface ARWaypoint {
  id: string;
  latitude: number;
  longitude: number;
  type: 'turn' | 'destination' | 'poi' | 'warning';
  instruction: string;
  distance: number;
  icon: string;
  aiGenerated: boolean;
}

interface ARObject {
  id: string;
  type: 'building' | 'landmark' | 'hazard' | 'poi' | 'person';
  name: string;
  distance: number;
  confidence: number;
  safetyLevel: 'safe' | 'caution' | 'danger';
  aiDescription: string;
}

export const ARNavigation: React.FC<ARNavigationProps> = ({ 
  destination = "Quantum Mall 2050", 
  onNavigationComplete 
}) => {
  const [isARActive, setIsARActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [arObjects, setArObjects] = useState<ARObject[]>([]);
  const [waypoints, setWaypoints] = useState<ARWaypoint[]>([]);
  const [voiceGuidance, setVoiceGuidance] = useState(true);
  const [holographicMode, setHolographicMode] = useState(true);
  const [aiAssistance, setAiAssistance] = useState(true);
  const [neuralMapping, setNeuralMapping] = useState(true);
  const [quantumAccuracy, setQuantumAccuracy] = useState(true);
  const [spatialAudio, setSpatialAudio] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (isARActive) {
      initializeAR();
      generateWaypoints();
      detectARObjects();
    }
  }, [isARActive]);

  const initializeAR = async () => {
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

  const generateWaypoints = () => {
    const mockWaypoints: ARWaypoint[] = [
      {
        id: '1',
        latitude: 40.7128,
        longitude: -74.0060,
        type: 'turn',
        instruction: 'Turn right onto 5th Avenue',
        distance: 150,
        icon: '➡️',
        aiGenerated: true
      },
      {
        id: '2',
        latitude: 40.7589,
        longitude: -73.9851,
        type: 'poi',
        instruction: 'Pass by Central Park on your left',
        distance: 800,
        icon: '🌳',
        aiGenerated: true
      },
      {
        id: '3',
        latitude: 40.7505,
        longitude: -73.9934,
        type: 'warning',
        instruction: 'Construction ahead - use alternate route',
        distance: 1200,
        icon: '⚠️',
        aiGenerated: true
      },
      {
        id: '4',
        latitude: 40.7831,
        longitude: -73.9712,
        type: 'destination',
        instruction: 'Arriving at Quantum Mall 2050',
        distance: 2100,
        icon: '🏢',
        aiGenerated: true
      }
    ];
    
    setWaypoints(mockWaypoints);
  };

  const detectARObjects = () => {
    const mockObjects: ARObject[] = [
      {
        id: '1',
        type: 'building',
        name: 'Empire State Building',
        distance: 500,
        confidence: 98,
        safetyLevel: 'safe',
        aiDescription: 'Historic landmark, 102 floors, built in 1931'
      },
      {
        id: '2',
        type: 'poi',
        name: 'Starbucks Coffee',
        distance: 120,
        confidence: 95,
        safetyLevel: 'safe',
        aiDescription: 'Coffee shop, currently open, 4.2 star rating'
      },
      {
        id: '3',
        type: 'hazard',
        name: 'Construction Zone',
        distance: 300,
        confidence: 92,
        safetyLevel: 'caution',
        aiDescription: 'Active construction, noise levels high, detour recommended'
      },
      {
        id: '4',
        type: 'landmark',
        name: 'Times Square',
        distance: 800,
        confidence: 99,
        safetyLevel: 'safe',
        aiDescription: 'Major commercial intersection, high pedestrian traffic'
      }
    ];
    
    setArObjects(mockObjects);
  };

  const getObjectIcon = (type: string) => {
    switch (type) {
      case 'building': return '🏢';
      case 'landmark': return '🗽';
      case 'hazard': return '⚠️';
      case 'poi': return '📍';
      case 'person': return '👤';
      default: return '📍';
    }
  };

  const getSafetyColor = (level: string) => {
    switch (level) {
      case 'safe': return 'text-green-400 bg-green-600/20';
      case 'caution': return 'text-yellow-400 bg-yellow-600/20';
      case 'danger': return 'text-red-400 bg-red-600/20';
      default: return 'text-gray-400 bg-gray-600/20';
    }
  };

  const speakInstruction = (instruction: string) => {
    if (voiceGuidance && 'speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(instruction);
      utterance.rate = 0.8;
      utterance.pitch = 1.0;
      speechSynthesis.speak(utterance);
    }
  };

  const nextWaypoint = () => {
    if (currentStep < waypoints.length - 1) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      speakInstruction(waypoints[nextStep].instruction);
    } else {
      onNavigationComplete?.();
    }
  };

  return (
    <div className="bg-black/30 rounded-xl p-6 border border-purple-500/20">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
            <Camera className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">AR Navigation 2050</h2>
            <p className="text-purple-300">Holographic waypoint guidance</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {isARActive && (
            <div className="flex items-center space-x-2 bg-purple-600/20 px-3 py-1 rounded-lg">
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
              <span className="text-purple-400 text-sm font-semibold">AR Active</span>
            </div>
          )}
        </div>
      </div>

      {/* AR Controls */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-gray-800/50 rounded-lg p-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-white text-sm font-medium">Voice Guidance</span>
            <input
              type="checkbox"
              checked={voiceGuidance}
              onChange={(e) => setVoiceGuidance(e.target.checked)}
              className="sr-only"
            />
            <div className={`w-8 h-4 rounded-full ${voiceGuidance ? 'bg-purple-600' : 'bg-gray-600'}`}>
              <div className={`w-3 h-3 rounded-full bg-white transition-transform ${voiceGuidance ? 'translate-x-4' : 'translate-x-0.5'} mt-0.5`}></div>
            </div>
          </div>
          <p className="text-xs text-gray-400">AI voice instructions</p>
        </div>

        <div className="bg-gray-800/50 rounded-lg p-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-white text-sm font-medium">Holographic</span>
            <input
              type="checkbox"
              checked={holographicMode}
              onChange={(e) => setHolographicMode(e.target.checked)}
              className="sr-only"
            />
            <div className={`w-8 h-4 rounded-full ${holographicMode ? 'bg-cyan-600' : 'bg-gray-600'}`}>
              <div className={`w-3 h-3 rounded-full bg-white transition-transform ${holographicMode ? 'translate-x-4' : 'translate-x-0.5'} mt-0.5`}></div>
            </div>
          </div>
          <p className="text-xs text-gray-400">3D waypoint projection</p>
        </div>

        <div className="bg-gray-800/50 rounded-lg p-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-white text-sm font-medium">Neural Mapping</span>
            <input
              type="checkbox"
              checked={neuralMapping}
              onChange={(e) => setNeuralMapping(e.target.checked)}
              className="sr-only"
            />
            <div className={`w-8 h-4 rounded-full ${neuralMapping ? 'bg-blue-600' : 'bg-gray-600'}`}>
              <div className={`w-3 h-3 rounded-full bg-white transition-transform ${neuralMapping ? 'translate-x-4' : 'translate-x-0.5'} mt-0.5`}></div>
            </div>
          </div>
          <p className="text-xs text-gray-400">AI route optimization</p>
        </div>

        <div className="bg-gray-800/50 rounded-lg p-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-white text-sm font-medium">Spatial Audio</span>
            <input
              type="checkbox"
              checked={spatialAudio}
              onChange={(e) => setSpatialAudio(e.target.checked)}
              className="sr-only"
            />
            <div className={`w-8 h-4 rounded-full ${spatialAudio ? 'bg-green-600' : 'bg-gray-600'}`}>
              <div className={`w-3 h-3 rounded-full bg-white transition-transform ${spatialAudio ? 'translate-x-4' : 'translate-x-0.5'} mt-0.5`}></div>
            </div>
          </div>
          <p className="text-xs text-gray-400">3D directional sound</p>
        </div>
      </div>

      {/* AR Camera View */}
      <div className="relative mb-6">
        <div className="aspect-video bg-black rounded-lg overflow-hidden relative">
          {isARActive ? (
            <>
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
              />
              <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full"
              />
              
              {/* AR Overlays */}
              <div className="absolute inset-0 pointer-events-none">
                {/* Current Waypoint */}
                {waypoints[currentStep] && (
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="bg-purple-600/80 backdrop-blur-sm rounded-lg p-4 text-center animate-pulse">
                      <div className="text-4xl mb-2">{waypoints[currentStep].icon}</div>
                      <p className="text-white font-semibold">{waypoints[currentStep].instruction}</p>
                      <p className="text-purple-200 text-sm">{waypoints[currentStep].distance}m ahead</p>
                    </div>
                  </div>
                )}

                {/* AR Object Labels */}
                {arObjects.slice(0, 3).map((obj, index) => (
                  <div
                    key={obj.id}
                    className={`absolute ${
                      index === 0 ? 'top-4 left-4' : 
                      index === 1 ? 'top-4 right-4' : 
                      'bottom-4 left-4'
                    }`}
                  >
                    <div className="bg-black/70 backdrop-blur-sm rounded-lg p-3 max-w-xs">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-xl">{getObjectIcon(obj.type)}</span>
                        <span className="text-white font-medium text-sm">{obj.name}</span>
                        <span className={`px-2 py-1 rounded text-xs ${getSafetyColor(obj.safetyLevel)}`}>
                          {obj.safetyLevel}
                        </span>
                      </div>
                      <p className="text-gray-300 text-xs">{obj.distance}m • {obj.confidence}% confidence</p>
                      <p className="text-gray-400 text-xs mt-1">{obj.aiDescription}</p>
                    </div>
                  </div>
                ))}

                {/* Navigation Compass */}
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-black/70 backdrop-blur-sm rounded-full p-3">
                    <Compass className="w-8 h-8 text-purple-400 animate-spin" style={{ animationDuration: '10s' }} />
                  </div>
                </div>

                {/* Distance to Destination */}
                <div className="absolute bottom-4 right-4">
                  <div className="bg-black/70 backdrop-blur-sm rounded-lg p-3">
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-purple-400" />
                      <div>
                        <p className="text-white font-medium text-sm">{destination}</p>
                        <p className="text-purple-300 text-xs">2.1 km • 12 min</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <Camera className="w-16 h-16 mx-auto text-purple-400 mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">AR Navigation Ready</h3>
                <p className="text-gray-400 mb-4">Activate to see holographic waypoints</p>
                <button
                  onClick={() => setIsARActive(true)}
                  className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-white font-semibold hover:from-purple-700 hover:to-pink-700 transition-all"
                >
                  Start AR Navigation
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Progress */}
      {isARActive && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-white">Route Progress</h3>
            <button
              onClick={() => setIsARActive(false)}
              className="px-4 py-2 bg-red-600 rounded-lg text-white hover:bg-red-700 transition-colors"
            >
              Stop Navigation
            </button>
          </div>

          <div className="bg-gray-800/50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-white">Step {currentStep + 1} of {waypoints.length}</span>
              <span className="text-purple-400">{Math.round((currentStep / waypoints.length) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${(currentStep / waypoints.length) * 100}%` }}
              ></div>
            </div>
          </div>

          <div className="space-y-2">
            {waypoints.map((waypoint, index) => (
              <div
                key={waypoint.id}
                className={`p-3 rounded-lg transition-all ${
                  index === currentStep
                    ? 'bg-purple-600/20 border border-purple-500/30'
                    : index < currentStep
                    ? 'bg-green-600/20 border border-green-500/30'
                    : 'bg-gray-800/50'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{waypoint.icon}</span>
                  <div className="flex-1">
                    <p className="text-white font-medium">{waypoint.instruction}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                      <span>{waypoint.distance}m</span>
                      {waypoint.aiGenerated && (
                        <div className="flex items-center space-x-1">
                          <Bot className="w-3 h-3 text-purple-400" />
                          <span className="text-purple-400">AI Generated</span>
                        </div>
                      )}
                    </div>
                  </div>
                  {index === currentStep && (
                    <button
                      onClick={nextWaypoint}
                      className="px-3 py-1 bg-purple-600 rounded text-white text-sm hover:bg-purple-700 transition-colors"
                    >
                      Next
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* AI Features */}
      <div className="mt-6 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-lg p-4 border border-purple-500/30">
        <div className="flex items-center space-x-2 mb-3">
          <Bot className="w-5 h-5 text-purple-400" />
          <span className="font-semibold text-white">AI Navigation Features</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
          <div className="flex items-center space-x-2">
            <Zap className="w-4 h-4 text-yellow-400" />
            <span className="text-gray-300">Real-time object recognition</span>
          </div>
          <div className="flex items-center space-x-2">
            <Globe className="w-4 h-4 text-blue-400" />
            <span className="text-gray-300">Quantum positioning accuracy</span>
          </div>
          <div className="flex items-center space-x-2">
            <Shield className="w-4 h-4 text-green-400" />
            <span className="text-gray-300">Safety hazard detection</span>
          </div>
          <div className="flex items-center space-x-2">
            <Headphones className="w-4 h-4 text-purple-400" />
            <span className="text-gray-300">Spatial audio guidance</span>
          </div>
        </div>
      </div>
    </div>
  );
};