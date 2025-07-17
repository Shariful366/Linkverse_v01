import React, { useState, useEffect } from 'react';
import { MapPin, Users, Clock, Shield, Eye, EyeOff, Navigation, Share2, AlertTriangle, Battery, Signal, Zap, Bot, Globe, Car, Bike, Footprints, Plane } from 'lucide-react';

interface LocationSharingProps {
  onLocationUpdate: (location: LocationData) => void;
}

interface LocationData {
  latitude: number;
  longitude: number;
  accuracy: number;
  timestamp: string;
  activity: 'walking' | 'driving' | 'cycling' | 'stationary' | 'flying';
  batteryLevel: number;
  networkStrength: number;
  address: string;
}

interface SharedLocation {
  id: string;
  user: string;
  avatar: string;
  location: LocationData;
  isSharing: boolean;
  privacyLevel: 'public' | 'friends' | 'family' | 'private';
  expiresAt?: string;
  quantumEncrypted: boolean;
}

export const LocationSharing: React.FC<LocationSharingProps> = ({ onLocationUpdate }) => {
  const [isSharing, setIsSharing] = useState(false);
  const [privacyLevel, setPrivacyLevel] = useState<'public' | 'friends' | 'family' | 'private'>('friends');
  const [shareExpiry, setShareExpiry] = useState<'1h' | '8h' | '24h' | 'permanent'>('8h');
  const [currentLocation, setCurrentLocation] = useState<LocationData | null>(null);
  const [sharedLocations, setSharedLocations] = useState<SharedLocation[]>([]);
  const [stealthMode, setStealthMode] = useState(false);
  const [quantumEncryption, setQuantumEncryption] = useState(true);
  const [aiPrediction, setAiPrediction] = useState(true);

  useEffect(() => {
    if (isSharing) {
      startLocationTracking();
    } else {
      stopLocationTracking();
    }
  }, [isSharing]);

  const startLocationTracking = () => {
    // Simulate high-precision location tracking
    const updateLocation = () => {
      const mockLocation: LocationData = {
        latitude: 40.7128 + (Math.random() - 0.5) * 0.01,
        longitude: -74.0060 + (Math.random() - 0.5) * 0.01,
        accuracy: Math.random() * 5 + 1,
        timestamp: new Date().toISOString(),
        activity: ['walking', 'driving', 'cycling', 'stationary'][Math.floor(Math.random() * 4)] as any,
        batteryLevel: Math.floor(Math.random() * 100),
        networkStrength: Math.floor(Math.random() * 100),
        address: 'New York, NY, USA'
      };
      
      setCurrentLocation(mockLocation);
      onLocationUpdate(mockLocation);
    };

    updateLocation();
    const interval = setInterval(updateLocation, 30000); // Update every 30 seconds
    
    return () => clearInterval(interval);
  };

  const stopLocationTracking = () => {
    setCurrentLocation(null);
  };

  const shareLocation = () => {
    if (!currentLocation) return;

    const shareId = Math.random().toString(36).substr(2, 9);
    const shareLink = `https://linkverse.2050/location/${shareId}`;
    
    const expiryTime = shareExpiry === 'permanent' ? undefined : 
      new Date(Date.now() + parseInt(shareExpiry) * 60 * 60 * 1000).toISOString();

    const sharedLocation: SharedLocation = {
      id: shareId,
      user: 'You',
      avatar: 'YU',
      location: currentLocation,
      isSharing: true,
      privacyLevel,
      expiresAt: expiryTime,
      quantumEncrypted
    };

    setSharedLocations(prev => [...prev, sharedLocation]);
    navigator.clipboard.writeText(shareLink);
    
    console.log('Location shared:', shareLink);
  };

  const getActivityIcon = (activity: string) => {
    switch (activity) {
      case 'walking': return <Footprints className="w-4 h-4 text-green-400" />;
      case 'driving': return <Car className="w-4 h-4 text-blue-400" />;
      case 'cycling': return <Bike className="w-4 h-4 text-yellow-400" />;
      case 'flying': return <Plane className="w-4 h-4 text-purple-400" />;
      default: return <MapPin className="w-4 h-4 text-gray-400" />;
    }
  };

  const getPrivacyColor = (level: string) => {
    switch (level) {
      case 'public': return 'text-red-400 bg-red-600/20';
      case 'friends': return 'text-blue-400 bg-blue-600/20';
      case 'family': return 'text-green-400 bg-green-600/20';
      case 'private': return 'text-purple-400 bg-purple-600/20';
      default: return 'text-gray-400 bg-gray-600/20';
    }
  };

  return (
    <div className="bg-black/30 rounded-xl p-6 border border-blue-500/20">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
            <MapPin className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Live Location Sharing</h2>
            <p className="text-blue-300">Quantum-encrypted real-time location</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {isSharing && (
            <div className="flex items-center space-x-2 bg-green-600/20 px-3 py-1 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-green-400 text-sm font-semibold">Live</span>
            </div>
          )}
        </div>
      </div>

      {/* Location Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-800/50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-white font-medium">Location Sharing</span>
            <input
              type="checkbox"
              checked={isSharing}
              onChange={(e) => setIsSharing(e.target.checked)}
              className="sr-only"
            />
            <div className={`w-10 h-5 rounded-full ${isSharing ? 'bg-blue-600' : 'bg-gray-600'}`}>
              <div className={`w-4 h-4 rounded-full bg-white transition-transform ${isSharing ? 'translate-x-5' : 'translate-x-0.5'} mt-0.5`}></div>
            </div>
          </div>
          <p className="text-xs text-gray-400">Share your real-time location</p>
        </div>

        <div className="bg-gray-800/50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-white font-medium">Stealth Mode</span>
            <input
              type="checkbox"
              checked={stealthMode}
              onChange={(e) => setStealthMode(e.target.checked)}
              className="sr-only"
            />
            <div className={`w-10 h-5 rounded-full ${stealthMode ? 'bg-purple-600' : 'bg-gray-600'}`}>
              <div className={`w-4 h-4 rounded-full bg-white transition-transform ${stealthMode ? 'translate-x-5' : 'translate-x-0.5'} mt-0.5`}></div>
            </div>
          </div>
          <p className="text-xs text-gray-400">Hide from location tracking</p>
        </div>

        <div className="bg-gray-800/50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-white font-medium">Quantum Encryption</span>
            <input
              type="checkbox"
              checked={quantumEncryption}
              onChange={(e) => setQuantumEncryption(e.target.checked)}
              className="sr-only"
            />
            <div className={`w-10 h-5 rounded-full ${quantumEncryption ? 'bg-green-600' : 'bg-gray-600'}`}>
              <div className={`w-4 h-4 rounded-full bg-white transition-transform ${quantumEncryption ? 'translate-x-5' : 'translate-x-0.5'} mt-0.5`}></div>
            </div>
          </div>
          <p className="text-xs text-gray-400">Military-grade location protection</p>
        </div>

        <div className="bg-gray-800/50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-white font-medium">AI Prediction</span>
            <input
              type="checkbox"
              checked={aiPrediction}
              onChange={(e) => setAiPrediction(e.target.checked)}
              className="sr-only"
            />
            <div className={`w-10 h-5 rounded-full ${aiPrediction ? 'bg-cyan-600' : 'bg-gray-600'}`}>
              <div className={`w-4 h-4 rounded-full bg-white transition-transform ${aiPrediction ? 'translate-x-5' : 'translate-x-0.5'} mt-0.5`}></div>
            </div>
          </div>
          <p className="text-xs text-gray-400">Predictive location intelligence</p>
        </div>
      </div>

      {/* Privacy Settings */}
      <div className="mb-6">
        <h3 className="text-white font-semibold mb-3">Privacy Level</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {[
            { level: 'public', label: 'Public', desc: 'Everyone can see' },
            { level: 'friends', label: 'Friends', desc: 'Friends only' },
            { level: 'family', label: 'Family', desc: 'Family members' },
            { level: 'private', label: 'Private', desc: 'Selected contacts' }
          ].map(({ level, label, desc }) => (
            <button
              key={level}
              onClick={() => setPrivacyLevel(level as any)}
              className={`p-3 rounded-lg transition-all ${
                privacyLevel === level
                  ? getPrivacyColor(level)
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              <div className="text-sm font-medium">{label}</div>
              <div className="text-xs opacity-75">{desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Share Duration */}
      <div className="mb-6">
        <h3 className="text-white font-semibold mb-3">Share Duration</h3>
        <div className="flex space-x-2">
          {[
            { duration: '1h', label: '1 Hour' },
            { duration: '8h', label: '8 Hours' },
            { duration: '24h', label: '24 Hours' },
            { duration: 'permanent', label: 'Permanent' }
          ].map(({ duration, label }) => (
            <button
              key={duration}
              onClick={() => setShareExpiry(duration as any)}
              className={`flex-1 p-2 rounded-lg transition-all ${
                shareExpiry === duration
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              <div className="text-sm">{label}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Current Location */}
      {currentLocation && (
        <div className="bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-lg p-4 mb-6 border border-blue-500/30">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-white">Current Location</h3>
            <div className="flex items-center space-x-2">
              {getActivityIcon(currentLocation.activity)}
              <span className="text-sm text-gray-300 capitalize">{currentLocation.activity}</span>
            </div>
          </div>
          
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Address:</span>
              <span className="text-white">{currentLocation.address}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Accuracy:</span>
              <span className="text-green-400">±{currentLocation.accuracy.toFixed(1)}m</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Battery:</span>
              <span className={`${currentLocation.batteryLevel > 20 ? 'text-green-400' : 'text-red-400'}`}>
                {currentLocation.batteryLevel}%
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Signal:</span>
              <span className="text-blue-400">{currentLocation.networkStrength}%</span>
            </div>
          </div>

          <button
            onClick={shareLocation}
            disabled={!isSharing}
            className="w-full mt-4 p-3 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg text-white font-semibold hover:from-blue-700 hover:to-cyan-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Share Current Location
          </button>
        </div>
      )}

      {/* Shared Locations */}
      {sharedLocations.length > 0 && (
        <div>
          <h3 className="text-white font-semibold mb-3">Active Shares</h3>
          <div className="space-y-3">
            {sharedLocations.map((share) => (
              <div key={share.id} className="bg-gray-800/50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${getPrivacyColor(share.privacyLevel)}`}>
                      {share.privacyLevel.toUpperCase()}
                    </span>
                    {share.quantumEncrypted && <Shield className="w-4 h-4 text-green-400" />}
                  </div>
                  <div className="flex items-center space-x-2 text-xs text-gray-400">
                    <Clock className="w-3 h-3" />
                    <span>{share.expiresAt ? 'Expires in 8h' : 'Permanent'}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="text-sm">
                    <p className="text-white font-medium">Location ID: {share.id}</p>
                    <p className="text-gray-400">{share.location.address}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button className="p-2 text-gray-400 hover:text-blue-400 transition-colors">
                      <Share2 className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-red-400 transition-colors">
                      <EyeOff className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* AI Insights */}
      {aiPrediction && currentLocation && (
        <div className="mt-6 bg-purple-600/20 border border-purple-500/30 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-3">
            <Bot className="w-5 h-5 text-purple-400" />
            <span className="font-semibold text-white">AI Location Insights</span>
          </div>
          <div className="space-y-2 text-sm">
            <p className="text-gray-300">
              • Based on your movement pattern, you'll likely reach your destination in 12 minutes
            </p>
            <p className="text-gray-300">
              • Traffic is 15% lighter than usual for this time of day
            </p>
            <p className="text-gray-300">
              • Optimal route suggests taking the northern path for better safety
            </p>
          </div>
        </div>
      )}
    </div>
  );
};