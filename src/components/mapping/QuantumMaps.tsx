import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Navigation, Users, Eye, EyeOff, Shield, Zap, Bot, Globe, Car, Bike, Footprints, Plane, Clock, AlertTriangle, Heart, Camera, Share2, Settings, X, Layers, Compass, Route, Star, Home, Building, Coffee, Cast as Gas, Guitar as Hospital, School, ShoppingBag, Utensils, Wifi, Battery, Signal } from 'lucide-react';

interface QuantumMapsProps {
  onClose: () => void;
}

interface LocationData {
  id: string;
  user: string;
  avatar: string;
  latitude: number;
  longitude: number;
  accuracy: number;
  timestamp: string;
  status: 'online' | 'away' | 'busy' | 'invisible';
  activity: 'walking' | 'driving' | 'cycling' | 'stationary' | 'flying';
  batteryLevel: number;
  networkStrength: number;
  isSharing: boolean;
  privacyLevel: 'public' | 'friends' | 'family' | 'private';
  quantumEncrypted: boolean;
}

interface POI {
  id: string;
  name: string;
  type: 'restaurant' | 'hospital' | 'school' | 'shopping' | 'gas' | 'coffee' | 'wifi' | 'landmark';
  latitude: number;
  longitude: number;
  rating: number;
  distance: string;
  aiRecommended: boolean;
  crowdLevel: 'low' | 'medium' | 'high';
  safetyScore: number;
}

export const QuantumMaps: React.FC<QuantumMapsProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<'map' | 'live' | 'history' | 'ar' | 'safety'>('map');
  const [mapMode, setMapMode] = useState<'satellite' | 'street' | 'hybrid' | 'quantum' | '3d'>('quantum');
  const [isLocationSharing, setIsLocationSharing] = useState(true);
  const [privacyMode, setPrivacyMode] = useState<'public' | 'friends' | 'family' | 'private'>('friends');
  const [arMode, setArMode] = useState(false);
  const [quantumNavigation, setQuantumNavigation] = useState(true);
  const [aiPrediction, setAiPrediction] = useState(true);
  const [stealthMode, setStealthMode] = useState(false);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [navigationMode, setNavigationMode] = useState<'walking' | 'driving' | 'cycling' | 'public' | 'flying'>('walking');
  const [showPOI, setShowPOI] = useState(true);
  const [emergencyMode, setEmergencyMode] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);

  // Simulated live location data
  const liveLocations: LocationData[] = [
    {
      id: '1',
      user: 'Sarah Chen',
      avatar: 'SC',
      latitude: 40.7128,
      longitude: -74.0060,
      accuracy: 3,
      timestamp: 'now',
      status: 'online',
      activity: 'walking',
      batteryLevel: 85,
      networkStrength: 95,
      isSharing: true,
      privacyLevel: 'friends',
      quantumEncrypted: true
    },
    {
      id: '2',
      user: 'Marcus Rodriguez',
      avatar: 'MR',
      latitude: 40.7589,
      longitude: -73.9851,
      accuracy: 5,
      timestamp: '2 min ago',
      status: 'busy',
      activity: 'driving',
      batteryLevel: 45,
      networkStrength: 88,
      isSharing: true,
      privacyLevel: 'family',
      quantumEncrypted: true
    },
    {
      id: '3',
      user: 'Emily Davis',
      avatar: 'ED',
      latitude: 40.7505,
      longitude: -73.9934,
      accuracy: 2,
      timestamp: '5 min ago',
      status: 'away',
      activity: 'cycling',
      batteryLevel: 92,
      networkStrength: 76,
      isSharing: true,
      privacyLevel: 'friends',
      quantumEncrypted: true
    }
  ];

  // Points of Interest with AI recommendations
  const pointsOfInterest: POI[] = [
    {
      id: '1',
      name: 'Quantum Coffee Lab',
      type: 'coffee',
      latitude: 40.7614,
      longitude: -73.9776,
      rating: 4.8,
      distance: '0.3 km',
      aiRecommended: true,
      crowdLevel: 'low',
      safetyScore: 98
    },
    {
      id: '2',
      name: 'Neo-Tokyo Ramen',
      type: 'restaurant',
      latitude: 40.7505,
      longitude: -73.9934,
      rating: 4.9,
      distance: '0.7 km',
      aiRecommended: true,
      crowdLevel: 'medium',
      safetyScore: 95
    },
    {
      id: '3',
      name: 'Cyber Medical Center',
      type: 'hospital',
      latitude: 40.7282,
      longitude: -73.9942,
      rating: 4.7,
      distance: '1.2 km',
      aiRecommended: false,
      crowdLevel: 'high',
      safetyScore: 99
    },
    {
      id: '4',
      name: 'Quantum Mall 2050',
      type: 'shopping',
      latitude: 40.7831,
      longitude: -73.9712,
      rating: 4.6,
      distance: '2.1 km',
      aiRecommended: true,
      crowdLevel: 'high',
      safetyScore: 92
    }
  ];

  const getActivityIcon = (activity: string) => {
    switch (activity) {
      case 'walking': return <Footprints className="w-4 h-4 text-green-400" />;
      case 'driving': return <Car className="w-4 h-4 text-blue-400" />;
      case 'cycling': return <Bike className="w-4 h-4 text-yellow-400" />;
      case 'flying': return <Plane className="w-4 h-4 text-purple-400" />;
      default: return <MapPin className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'away': return 'bg-yellow-500';
      case 'busy': return 'bg-red-500';
      case 'invisible': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getPOIIcon = (type: string) => {
    switch (type) {
      case 'restaurant': return <Utensils className="w-5 h-5 text-orange-400" />;
      case 'hospital': return <Hospital className="w-5 h-5 text-red-400" />;
      case 'school': return <School className="w-5 h-5 text-blue-400" />;
      case 'shopping': return <ShoppingBag className="w-5 h-5 text-purple-400" />;
      case 'gas': return <Gas className="w-5 h-5 text-yellow-400" />;
      case 'coffee': return <Coffee className="w-5 h-5 text-brown-400" />;
      case 'wifi': return <Wifi className="w-5 h-5 text-cyan-400" />;
      default: return <MapPin className="w-5 h-5 text-gray-400" />;
    }
  };

  const getCrowdColor = (level: string) => {
    switch (level) {
      case 'low': return 'text-green-400';
      case 'medium': return 'text-yellow-400';
      case 'high': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const shareLocation = () => {
    const locationLink = `https://linkverse.2050/location/${Math.random().toString(36).substr(2, 9)}`;
    navigator.clipboard.writeText(locationLink);
    console.log('Location shared:', locationLink);
  };

  const startNavigation = (destination: string) => {
    console.log('Starting quantum navigation to:', destination);
  };

  const toggleEmergencyMode = () => {
    setEmergencyMode(!emergencyMode);
    if (!emergencyMode) {
      // Activate emergency protocols
      setPrivacyMode('public');
      setIsLocationSharing(true);
      console.log('Emergency mode activated - broadcasting location to emergency services');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-xl flex items-center justify-center z-50 p-4">
      <div className="w-full max-w-7xl h-full max-h-[95vh] bg-gradient-to-br from-blue-900/30 to-cyan-900/30 backdrop-blur-xl rounded-2xl overflow-hidden shadow-2xl border border-blue-500/20">
        {/* Header */}
        <div className="p-4 border-b border-blue-500/20 bg-black/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                <Navigation className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Quantum Maps 2050</h1>
                <p className="text-blue-300">Neural navigation with quantum precision</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              {emergencyMode && (
                <div className="flex items-center space-x-2 bg-red-600/20 px-3 py-1 rounded-lg animate-pulse">
                  <AlertTriangle className="w-4 h-4 text-red-400" />
                  <span className="text-red-400 text-sm font-semibold">Emergency Mode</span>
                </div>
              )}
              <button
                onClick={toggleEmergencyMode}
                className={`p-2 rounded-lg transition-all ${emergencyMode ? 'bg-red-600 text-white' : 'bg-gray-800 text-gray-400 hover:bg-red-600/20'}`}
                title="Emergency Mode"
              >
                <AlertTriangle className="w-5 h-5" />
              </button>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex space-x-2 mt-4">
            {[
              { id: 'map', label: 'Quantum Map', icon: MapPin },
              { id: 'live', label: 'Live Locations', icon: Users },
              { id: 'history', label: 'History', icon: Clock },
              { id: 'ar', label: 'AR Navigation', icon: Camera },
              { id: 'safety', label: 'Safety Zone', icon: Shield }
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
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex h-full">
          {/* Main Map Area */}
          <div className="flex-1 relative">
            {/* Map Controls */}
            <div className="absolute top-4 left-4 z-10 space-y-2">
              <div className="bg-black/50 backdrop-blur-xl rounded-lg p-2">
                <div className="flex space-x-1">
                  {['satellite', 'street', 'hybrid', 'quantum', '3d'].map((mode) => (
                    <button
                      key={mode}
                      onClick={() => setMapMode(mode as any)}
                      className={`px-3 py-1 rounded text-xs transition-all ${
                        mapMode === mode
                          ? 'bg-blue-600 text-white'
                          : 'text-gray-400 hover:bg-blue-600/20'
                      }`}
                    >
                      {mode.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-black/50 backdrop-blur-xl rounded-lg p-2">
                <div className="flex space-x-1">
                  {[
                    { mode: 'walking', icon: Footprints },
                    { mode: 'driving', icon: Car },
                    { mode: 'cycling', icon: Bike },
                    { mode: 'flying', icon: Plane }
                  ].map(({ mode, icon: Icon }) => (
                    <button
                      key={mode}
                      onClick={() => setNavigationMode(mode as any)}
                      className={`p-2 rounded transition-all ${
                        navigationMode === mode
                          ? 'bg-blue-600 text-white'
                          : 'text-gray-400 hover:bg-blue-600/20'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Map Display */}
            <div 
              ref={mapRef}
              className="w-full h-full bg-gradient-to-br from-blue-900/20 to-cyan-900/20 relative overflow-hidden"
            >
              {/* Quantum Grid Overlay */}
              <div className="absolute inset-0 cyber-grid opacity-20"></div>
              
              {/* Neural Network Background */}
              <div className="absolute inset-0 neural-bg"></div>

              {/* Simulated Map Content */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-32 h-32 mx-auto bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mb-6 quantum-pulse">
                    <Navigation className="w-16 h-16 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">Quantum Map Interface</h3>
                  <p className="text-gray-400 mb-6">Neural-powered navigation with quantum precision</p>
                  
                  {/* Live Location Indicators */}
                  <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                    {liveLocations.slice(0, 4).map((location) => (
                      <div key={location.id} className="bg-black/30 rounded-lg p-3 border border-blue-500/20">
                        <div className="flex items-center space-x-2 mb-2">
                          <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                            {location.avatar}
                          </div>
                          <div className={`w-2 h-2 rounded-full ${getStatusColor(location.status)}`}></div>
                        </div>
                        <p className="text-white text-sm font-medium">{location.user}</p>
                        <div className="flex items-center space-x-1 mt-1">
                          {getActivityIcon(location.activity)}
                          <span className="text-xs text-gray-400">{location.timestamp}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* AR Mode Overlay */}
              {arMode && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <div className="text-center">
                    <Camera className="w-24 h-24 mx-auto text-purple-400 mb-4 animate-pulse" />
                    <h3 className="text-xl font-bold text-white mb-2">AR Navigation Active</h3>
                    <p className="text-gray-400">Point your device to see quantum overlays</p>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Controls */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
              <div className="flex items-center space-x-2 bg-black/50 backdrop-blur-xl rounded-full px-4 py-2">
                <button
                  onClick={() => setArMode(!arMode)}
                  className={`p-2 rounded-full transition-all ${arMode ? 'bg-purple-600 text-white' : 'text-gray-400 hover:bg-purple-600/20'}`}
                  title="AR Mode"
                >
                  <Camera className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setQuantumNavigation(!quantumNavigation)}
                  className={`p-2 rounded-full transition-all ${quantumNavigation ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-blue-600/20'}`}
                  title="Quantum Navigation"
                >
                  <Zap className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setShowPOI(!showPOI)}
                  className={`p-2 rounded-full transition-all ${showPOI ? 'bg-green-600 text-white' : 'text-gray-400 hover:bg-green-600/20'}`}
                  title="Points of Interest"
                >
                  <Star className="w-5 h-5" />
                </button>
                <button
                  onClick={shareLocation}
                  className="p-2 rounded-full text-gray-400 hover:bg-cyan-600/20 hover:text-cyan-400 transition-all"
                  title="Share Location"
                >
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-80 bg-black/30 border-l border-blue-500/20 flex flex-col">
            {/* Live Locations Tab */}
            {activeTab === 'live' && (
              <div className="flex-1 overflow-y-auto p-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-white">Live Locations</h3>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setIsLocationSharing(!isLocationSharing)}
                        className={`p-2 rounded-lg transition-all ${isLocationSharing ? 'bg-green-600 text-white' : 'bg-gray-700 text-gray-400'}`}
                        title="Toggle Location Sharing"
                      >
                        {isLocationSharing ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                      </button>
                      <button
                        onClick={() => setStealthMode(!stealthMode)}
                        className={`p-2 rounded-lg transition-all ${stealthMode ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-400'}`}
                        title="Stealth Mode"
                      >
                        <Shield className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Privacy Settings */}
                  <div className="bg-gray-800/50 rounded-lg p-3">
                    <h4 className="text-white font-medium mb-2">Privacy Level</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {['public', 'friends', 'family', 'private'].map((level) => (
                        <button
                          key={level}
                          onClick={() => setPrivacyMode(level as any)}
                          className={`p-2 rounded text-xs transition-all ${
                            privacyMode === level
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
                          }`}
                        >
                          {level.charAt(0).toUpperCase() + level.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Live Users */}
                  <div className="space-y-3">
                    {liveLocations.map((location) => (
                      <div key={location.id} className="bg-gray-800/50 rounded-lg p-4 hover:bg-gray-700/50 transition-colors cursor-pointer">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="relative">
                              <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white font-semibold">
                                {location.avatar}
                              </div>
                              <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-black ${getStatusColor(location.status)}`}></div>
                            </div>
                            <div>
                              <h4 className="font-medium text-white">{location.user}</h4>
                              <div className="flex items-center space-x-2 text-xs text-gray-400">
                                {getActivityIcon(location.activity)}
                                <span>{location.timestamp}</span>
                                {location.quantumEncrypted && <Shield className="w-3 h-3 text-green-400" />}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center space-x-1 text-xs text-gray-400 mb-1">
                              <Battery className="w-3 h-3" />
                              <span>{location.batteryLevel}%</span>
                            </div>
                            <div className="flex items-center space-x-1 text-xs text-gray-400">
                              <Signal className="w-3 h-3" />
                              <span>{location.networkStrength}%</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="mt-3 flex items-center justify-between">
                          <span className="text-xs text-blue-400">±{location.accuracy}m accuracy</span>
                          <div className="flex space-x-1">
                            <button className="p-1 text-gray-400 hover:text-blue-400 transition-colors">
                              <Navigation className="w-3 h-3" />
                            </button>
                            <button className="p-1 text-gray-400 hover:text-green-400 transition-colors">
                              <Share2 className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Points of Interest */}
            {activeTab === 'map' && (
              <div className="flex-1 overflow-y-auto p-4">
                <div className="space-y-4">
                  <h3 className="font-semibold text-white">Nearby Places</h3>
                  
                  {pointsOfInterest.map((poi) => (
                    <div key={poi.id} className="bg-gray-800/50 rounded-lg p-4 hover:bg-gray-700/50 transition-colors">
                      <div className="flex items-start space-x-3">
                        <div className="p-2 bg-gray-700 rounded-lg">
                          {getPOIIcon(poi.type)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h4 className="font-medium text-white">{poi.name}</h4>
                            {poi.aiRecommended && <Bot className="w-4 h-4 text-purple-400" />}
                          </div>
                          <div className="flex items-center space-x-4 text-xs text-gray-400 mb-2">
                            <span>⭐ {poi.rating}</span>
                            <span>{poi.distance}</span>
                            <span className={getCrowdColor(poi.crowdLevel)}>
                              {poi.crowdLevel} crowd
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-1">
                              <Shield className="w-3 h-3 text-green-400" />
                              <span className="text-xs text-green-400">{poi.safetyScore}% safe</span>
                            </div>
                            <button
                              onClick={() => startNavigation(poi.name)}
                              className="px-3 py-1 bg-blue-600 rounded text-xs text-white hover:bg-blue-700 transition-colors"
                            >
                              Navigate
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* AR Navigation */}
            {activeTab === 'ar' && (
              <div className="flex-1 overflow-y-auto p-4">
                <div className="space-y-4">
                  <h3 className="font-semibold text-white">AR Navigation</h3>
                  
                  <div className="bg-purple-600/20 border border-purple-500/30 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-3">
                      <Camera className="w-5 h-5 text-purple-400" />
                      <span className="font-medium text-white">Quantum AR Mode</span>
                    </div>
                    <p className="text-sm text-gray-300 mb-4">
                      Experience next-generation navigation with holographic overlays and neural pathfinding.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-sm text-gray-300">
                        <Zap className="w-4 h-4 text-yellow-400" />
                        <span>Real-time object recognition</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-300">
                        <Globe className="w-4 h-4 text-blue-400" />
                        <span>3D holographic waypoints</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-300">
                        <Bot className="w-4 h-4 text-purple-400" />
                        <span>AI-powered route optimization</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setArMode(!arMode)}
                    className={`w-full p-3 rounded-lg transition-all ${
                      arMode 
                        ? 'bg-purple-600 text-white' 
                        : 'bg-gray-700 text-gray-300 hover:bg-purple-600/20'
                    }`}
                  >
                    {arMode ? 'Exit AR Mode' : 'Activate AR Navigation'}
                  </button>
                </div>
              </div>
            )}

            {/* Safety Zone */}
            {activeTab === 'safety' && (
              <div className="flex-1 overflow-y-auto p-4">
                <div className="space-y-4">
                  <h3 className="font-semibold text-white">Safety Features</h3>
                  
                  <div className="space-y-3">
                    <div className="bg-green-600/20 border border-green-500/30 rounded-lg p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <Shield className="w-5 h-5 text-green-400" />
                        <span className="font-medium text-white">Safe Zone Active</span>
                      </div>
                      <p className="text-sm text-gray-300">
                        AI monitoring for optimal safety routes and real-time threat assessment.
                      </p>
                    </div>

                    <div className="bg-red-600/20 border border-red-500/30 rounded-lg p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <AlertTriangle className="w-5 h-5 text-red-400" />
                        <span className="font-medium text-white">Emergency Protocol</span>
                      </div>
                      <p className="text-sm text-gray-300 mb-3">
                        Instant emergency broadcasting with quantum-encrypted location sharing.
                      </p>
                      <button
                        onClick={toggleEmergencyMode}
                        className={`w-full p-2 rounded-lg transition-all ${
                          emergencyMode 
                            ? 'bg-red-600 text-white' 
                            : 'bg-gray-700 text-gray-300 hover:bg-red-600/20'
                        }`}
                      >
                        {emergencyMode ? 'Deactivate Emergency' : 'Emergency Mode'}
                      </button>
                    </div>

                    <div className="bg-blue-600/20 border border-blue-500/30 rounded-lg p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <Heart className="w-5 h-5 text-blue-400" />
                        <span className="font-medium text-white">Wellness Tracking</span>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Stress Level:</span>
                          <span className="text-green-400">Low</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Activity:</span>
                          <span className="text-blue-400">Walking</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Safety Score:</span>
                          <span className="text-green-400">98/100</span>
                        </div>
                      </div>
                    </div>
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