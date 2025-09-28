import React, { useState, useEffect } from 'react';
import { QrCode, Camera, Video, Users, Shield, Zap, CheckCircle, AlertTriangle, Scan, X } from 'lucide-react';

interface QRMeetingJoinProps {
  onJoinMeeting: (meetingId: string) => void;
  onClose: () => void;
}

interface MeetingInfo {
  id: string;
  title: string;
  host: string;
  type: 'quantum' | 'holographic' | 'ar' | 'video';
  participants: number;
  maxParticipants: number;
  securityLevel: 'standard' | 'enterprise' | 'quantum';
  startTime: string;
  status: 'waiting' | 'live' | 'ended';
}

export const QRMeetingJoin: React.FC<QRMeetingJoinProps> = ({ onJoinMeeting, onClose }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [meetingInfo, setMeetingInfo] = useState<MeetingInfo | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [cameraPermission, setCameraPermission] = useState<'granted' | 'denied' | 'prompt'>('prompt');

  useEffect(() => {
    checkCameraPermission();
  }, []);

  const checkCameraPermission = async () => {
    try {
      const result = await navigator.permissions.query({ name: 'camera' as PermissionName });
      setCameraPermission(result.state as any);
    } catch (error) {
      console.log('Permission API not supported');
    }
  };

  const startQRScan = async () => {
    setIsScanning(true);
    setError(null);

    try {
      // Request camera permission
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      
      // Simulate QR code scanning
      setTimeout(() => {
        const mockMeetingId = 'quantum-meeting-' + Math.random().toString(36).substr(2, 9);
        setScanResult(mockMeetingId);
        fetchMeetingInfo(mockMeetingId);
        setIsScanning(false);
        
        // Stop camera stream
        stream.getTracks().forEach(track => track.stop());
      }, 3000);

    } catch (error) {
      console.log('Camera access denied, using manual input');
      setError('Camera access required for QR scanning. Please enter meeting ID manually.');
      setIsScanning(false);
      setCameraPermission('denied');
    }
  };

  const fetchMeetingInfo = (meetingId: string) => {
    // Simulate fetching meeting information
    const mockMeetingInfo: MeetingInfo = {
      id: meetingId,
      title: 'Quantum Team Sync',
      host: 'Dr. Sarah Quantum',
      type: 'quantum',
      participants: 3,
      maxParticipants: 10,
      securityLevel: 'quantum',
      startTime: new Date().toISOString(),
      status: 'live'
    };
    
    setMeetingInfo(mockMeetingInfo);
  };

  const joinMeeting = () => {
    if (meetingInfo) {
      onJoinMeeting(meetingInfo.id);
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'quantum': return 'text-purple-400 bg-purple-600/20';
      case 'holographic': return 'text-cyan-400 bg-cyan-600/20';
      case 'ar': return 'text-green-400 bg-green-600/20';
      case 'video': return 'text-blue-400 bg-blue-600/20';
      default: return 'text-gray-400 bg-gray-600/20';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'live': return 'text-green-400 bg-green-600/20';
      case 'waiting': return 'text-yellow-400 bg-yellow-600/20';
      case 'ended': return 'text-red-400 bg-red-600/20';
      default: return 'text-gray-400 bg-gray-600/20';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-xl flex items-center justify-center z-50 p-4">
      <div className="w-full max-w-md bg-gradient-to-br from-blue-900/30 to-purple-900/30 backdrop-blur-xl rounded-2xl overflow-hidden shadow-2xl border border-blue-500/20">
        {/* Header */}
        <div className="p-6 border-b border-blue-500/20 bg-black/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                <QrCode className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Join Meeting</h2>
                <p className="text-blue-300 text-sm">Scan QR code to join</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {error && (
            <div className="mb-4 p-3 bg-red-600/20 border border-red-500/30 rounded-lg flex items-center space-x-2">
              <AlertTriangle className="w-4 h-4 text-red-400" />
              <span className="text-red-300 text-sm">{error}</span>
            </div>
          )}

          {!meetingInfo ? (
            <div className="text-center space-y-6">
              {/* QR Scanner */}
              <div className="relative">
                <div className={`w-48 h-48 mx-auto rounded-xl border-4 ${
                  isScanning ? 'border-blue-400 animate-pulse' : 'border-gray-600'
                } flex items-center justify-center bg-gray-800/50`}>
                  {isScanning ? (
                    <div className="text-center">
                      <div className="w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
                      <p className="text-blue-400 text-sm">Scanning QR Code...</p>
                    </div>
                  ) : (
                    <div className="text-center">
                      <QrCode className="w-16 h-16 text-gray-400 mx-auto mb-3" />
                      <p className="text-gray-400 text-sm">Ready to scan</p>
                    </div>
                  )}
                </div>
                
                {isScanning && (
                  <div className="absolute inset-0 border-4 border-transparent border-t-blue-400 rounded-xl animate-spin"></div>
                )}
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {isScanning ? 'Scanning QR Code...' : 'Scan Meeting QR Code'}
                </h3>
                <p className="text-gray-400 text-sm mb-4">
                  {isScanning 
                    ? 'Processing quantum-encrypted meeting code' 
                    : 'Point your camera at the meeting QR code'
                  }
                </p>
              </div>

              <button
                onClick={startQRScan}
                disabled={isScanning}
                className="w-full p-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl text-white font-semibold hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50"
              >
                {isScanning ? (
                  <div className="flex items-center justify-center space-x-2">
                    <Scan className="w-5 h-5 animate-spin" />
                    <span>Scanning...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-2">
                    <Camera className="w-5 h-5" />
                    <span>Start QR Scan</span>
                  </div>
                )}
              </button>

              {/* Manual Entry Option */}
              <div className="text-center">
                <p className="text-gray-400 text-sm mb-2">Or enter meeting ID manually:</p>
                <input
                  type="text"
                  placeholder="Enter meeting ID"
                  className="w-full p-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      const meetingId = (e.target as HTMLInputElement).value;
                      if (meetingId) {
                        setScanResult(meetingId);
                        fetchMeetingInfo(meetingId);
                      }
                    }
                  }}
                />
              </div>
            </div>
          ) : (
            /* Meeting Info Display */
            <div className="space-y-6">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Meeting Found!</h3>
                <p className="text-gray-400">Ready to join the meeting</p>
              </div>

              <div className="bg-black/30 rounded-xl p-4 border border-green-500/20">
                <h4 className="font-semibold text-white mb-3">{meetingInfo.title}</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Host:</span>
                    <span className="text-white">{meetingInfo.host}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Type:</span>
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${getTypeColor(meetingInfo.type)}`}>
                      {meetingInfo.type.toUpperCase()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Participants:</span>
                    <span className="text-blue-400">{meetingInfo.participants}/{meetingInfo.maxParticipants}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Security:</span>
                    <div className="flex items-center space-x-1">
                      <Shield className="w-3 h-3 text-green-400" />
                      <span className="text-green-400 capitalize">{meetingInfo.securityLevel}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Status:</span>
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${getStatusColor(meetingInfo.status)}`}>
                      {meetingInfo.status.toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={joinMeeting}
                  className="flex-1 p-4 bg-gradient-to-r from-green-600 to-blue-600 rounded-xl text-white font-semibold hover:from-green-700 hover:to-blue-700 transition-all"
                >
                  <div className="flex items-center justify-center space-x-2">
                    <Video className="w-5 h-5" />
                    <span>Join Meeting</span>
                  </div>
                </button>
                <button
                  onClick={() => {
                    setScanResult(null);
                    setMeetingInfo(null);
                  }}
                  className="px-4 py-4 bg-gray-700 rounded-xl text-white hover:bg-gray-600 transition-colors"
                >
                  <Scan className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};