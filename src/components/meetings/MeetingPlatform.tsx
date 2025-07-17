import React, { useState, useEffect, useRef } from 'react';
import { Video, Users, Calendar, Brain, Globe, Shield, Mic, Camera, Monitor, Share2, Settings, Phone, MessageSquare, FileText, Zap, Bot, Eye, Volume2, VolumeX, MicOff, VideoOff, Headphones, Cast, Layers, Compass, Star, X } from 'lucide-react';

interface MeetingPlatformProps {
  onClose: () => void;
}

interface Meeting {
  id: string;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  type: 'video' | 'audio' | 'holographic' | 'ar' | 'metaverse';
  participants: Participant[];
  host: string;
  status: 'scheduled' | 'live' | 'ended' | 'cancelled';
  aiFeatures: string[];
  recordingEnabled: boolean;
  transcriptionEnabled: boolean;
  translationEnabled: boolean;
  securityLevel: 'standard' | 'enterprise' | 'quantum';
}

interface Participant {
  id: string;
  name: string;
  avatar: string;
  role: 'host' | 'presenter' | 'participant';
  status: 'joined' | 'waiting' | 'declined';
  location: string;
  device: 'mobile' | 'desktop' | 'ar' | 'vr' | 'hologram';
}

export const MeetingPlatform: React.FC<MeetingPlatformProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'live' | 'create' | 'recordings' | 'analytics'>('upcoming');
  const [selectedMeeting, setSelectedMeeting] = useState<string | null>(null);
  const [isInMeeting, setIsInMeeting] = useState(false);
  const [meetingSettings, setMeetingSettings] = useState({
    video: true,
    audio: true,
    screen: false,
    recording: false,
    transcription: true,
    translation: true,
    aiAssistant: true,
    holographicMode: false,
    spatialAudio: true,
    backgroundBlur: false,
    noiseReduction: true
  });

  const videoRef = useRef<HTMLVideoElement>(null);

  const upcomingMeetings: Meeting[] = [
    {
      id: '1',
      title: 'Quantum Product Strategy 2050',
      description: 'Strategic planning for next-generation quantum products',
      startTime: '2050-01-15T14:00:00Z',
      endTime: '2050-01-15T15:30:00Z',
      type: 'holographic',
      participants: [
        { id: '1', name: 'Sarah Chen', avatar: 'SC', role: 'host', status: 'joined', location: 'Mars Colony Alpha', device: 'hologram' },
        { id: '2', name: 'Marcus Rodriguez', avatar: 'MR', role: 'presenter', status: 'waiting', location: 'Neo Tokyo', device: 'ar' },
        { id: '3', name: 'Emily Davis', avatar: 'ED', role: 'participant', status: 'joined', location: 'Luna Station', device: 'vr' }
      ],
      host: 'Sarah Chen',
      status: 'scheduled',
      aiFeatures: ['Auto-transcription', 'Real-time translation', 'Sentiment analysis', 'Action item extraction'],
      recordingEnabled: true,
      transcriptionEnabled: true,
      translationEnabled: true,
      securityLevel: 'quantum'
    },
    {
      id: '2',
      title: 'Global Team Sync - Metaverse Edition',
      description: 'Weekly synchronization in virtual workspace',
      startTime: '2050-01-15T16:00:00Z',
      endTime: '2050-01-15T17:00:00Z',
      type: 'metaverse',
      participants: [
        { id: '4', name: 'Alex Thompson', avatar: 'AT', role: 'host', status: 'waiting', location: 'Virtual Office', device: 'vr' },
        { id: '5', name: 'Maria Garcia', avatar: 'MG', role: 'participant', status: 'waiting', location: 'Barcelona', device: 'desktop' }
      ],
      host: 'Alex Thompson',
      status: 'scheduled',
      aiFeatures: ['Mood detection', 'Engagement metrics', 'Smart scheduling'],
      recordingEnabled: false,
      transcriptionEnabled: true,
      translationEnabled: true,
      securityLevel: 'enterprise'
    }
  ];

  const liveMeetings = [
    {
      id: '3',
      title: 'Emergency Security Briefing',
      participants: 12,
      duration: '00:23:45',
      type: 'quantum-encrypted',
      aiInsights: 'High engagement, critical decisions being made'
    }
  ];

  const joinMeeting = (meetingId: string) => {
    setSelectedMeeting(meetingId);
    setIsInMeeting(true);
    initializeCamera();
  };

  const initializeCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: meetingSettings.video, 
        audio: meetingSettings.audio 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.log('Camera/microphone access not available in demo');
    }
  };

  const leaveMeeting = () => {
    setIsInMeeting(false);
    setSelectedMeeting(null);
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
    }
  };

  const getMeetingTypeIcon = (type: string) => {
    switch (type) {
      case 'holographic': return <Layers className="w-5 h-5 text-purple-400" />;
      case 'ar': return <Eye className="w-5 h-5 text-blue-400" />;
      case 'metaverse': return <Globe className="w-5 h-5 text-green-400" />;
      case 'video': return <Video className="w-5 h-5 text-cyan-400" />;
      default: return <Video className="w-5 h-5 text-gray-400" />;
    }
  };

  const getSecurityBadge = (level: string) => {
    const colors = {
      quantum: 'bg-purple-600/20 text-purple-400 border-purple-500/30',
      enterprise: 'bg-blue-600/20 text-blue-400 border-blue-500/30',
      standard: 'bg-green-600/20 text-green-400 border-green-500/30'
    };
    return colors[level as keyof typeof colors] || colors.standard;
  };

  if (isInMeeting) {
    return (
      <div className="fixed inset-0 bg-black z-50">
        {/* Meeting Interface */}
        <div className="h-full flex flex-col">
          {/* Top Bar */}
          <div className="p-4 bg-black/80 backdrop-blur-xl border-b border-gray-700 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h2 className="text-white font-semibold">Quantum Product Strategy 2050</h2>
              <div className="flex items-center space-x-2 bg-red-600/20 px-3 py-1 rounded-lg">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-red-400 text-sm">LIVE</span>
              </div>
              <div className="flex items-center space-x-2 bg-purple-600/20 px-3 py-1 rounded-lg">
                <Shield className="w-4 h-4 text-purple-400" />
                <span className="text-purple-400 text-sm">Quantum Secure</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-gray-400 text-sm">00:23:45</span>
              <button
                onClick={leaveMeeting}
                className="px-4 py-2 bg-red-600 rounded-lg text-white hover:bg-red-700 transition-colors"
              >
                Leave Meeting
              </button>
            </div>
          </div>

          {/* Main Video Area */}
          <div className="flex-1 relative bg-gray-900">
            {meetingSettings.holographicMode ? (
              <div className="h-full flex items-center justify-center">
                <div className="text-center">
                  <Layers className="w-24 h-24 mx-auto text-purple-400 mb-4 animate-pulse" />
                  <h3 className="text-2xl font-bold text-white mb-2">Holographic Mode Active</h3>
                  <p className="text-gray-400">3D holographic projection enabled</p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 p-4 h-full">
                {/* Self Video */}
                <div className="relative bg-black rounded-lg overflow-hidden">
                  <video
                    ref={videoRef}
                    autoPlay
                    muted
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-2 left-2 bg-black/70 px-2 py-1 rounded text-white text-sm">
                    You
                  </div>
                  {meetingSettings.backgroundBlur && (
                    <div className="absolute top-2 right-2 bg-cyan-600/80 px-2 py-1 rounded text-white text-xs">
                      AI Blur
                    </div>
                  )}
                </div>

                {/* Other Participants */}
                {upcomingMeetings[0]?.participants.map((participant) => (
                  <div key={participant.id} className="relative bg-gray-800 rounded-lg overflow-hidden flex items-center justify-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                      {participant.avatar}
                    </div>
                    <div className="absolute bottom-2 left-2 bg-black/70 px-2 py-1 rounded text-white text-sm">
                      {participant.name}
                    </div>
                    <div className="absolute top-2 right-2 flex space-x-1">
                      {participant.device === 'hologram' && (
                        <div className="bg-purple-600/80 px-2 py-1 rounded text-white text-xs">
                          Hologram
                        </div>
                      )}
                      {participant.device === 'ar' && (
                        <div className="bg-blue-600/80 px-2 py-1 rounded text-white text-xs">
                          AR
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* AI Assistant Overlay */}
            {meetingSettings.aiAssistant && (
              <div className="absolute top-4 left-4 bg-purple-600/80 backdrop-blur-sm rounded-lg p-3 max-w-sm">
                <div className="flex items-center space-x-2 mb-2">
                  <Bot className="w-5 h-5 text-white" />
                  <span className="text-white font-medium">AI Assistant</span>
                </div>
                <p className="text-white text-sm">
                  Meeting sentiment: Positive • 3 action items identified • Auto-transcription active
                </p>
              </div>
            )}
          </div>

          {/* Bottom Controls */}
          <div className="p-4 bg-black/80 backdrop-blur-xl border-t border-gray-700">
            <div className="flex items-center justify-center space-x-4">
              <button
                onClick={() => setMeetingSettings(prev => ({ ...prev, audio: !prev.audio }))}
                className={`p-3 rounded-full transition-all ${meetingSettings.audio ? 'bg-gray-700 text-white' : 'bg-red-600 text-white'}`}
              >
                {meetingSettings.audio ? <Mic className="w-6 h-6" /> : <MicOff className="w-6 h-6" />}
              </button>

              <button
                onClick={() => setMeetingSettings(prev => ({ ...prev, video: !prev.video }))}
                className={`p-3 rounded-full transition-all ${meetingSettings.video ? 'bg-gray-700 text-white' : 'bg-red-600 text-white'}`}
              >
                {meetingSettings.video ? <Camera className="w-6 h-6" /> : <VideoOff className="w-6 h-6" />}
              </button>

              <button
                onClick={() => setMeetingSettings(prev => ({ ...prev, screen: !prev.screen }))}
                className={`p-3 rounded-full transition-all ${meetingSettings.screen ? 'bg-blue-600 text-white' : 'bg-gray-700 text-white'}`}
              >
                <Monitor className="w-6 h-6" />
              </button>

              <button
                onClick={() => setMeetingSettings(prev => ({ ...prev, holographicMode: !prev.holographicMode }))}
                className={`p-3 rounded-full transition-all ${meetingSettings.holographicMode ? 'bg-purple-600 text-white' : 'bg-gray-700 text-white'}`}
              >
                <Layers className="w-6 h-6" />
              </button>

              <button
                onClick={() => setMeetingSettings(prev => ({ ...prev, recording: !prev.recording }))}
                className={`p-3 rounded-full transition-all ${meetingSettings.recording ? 'bg-red-600 text-white' : 'bg-gray-700 text-white'}`}
              >
                <Video className="w-6 h-6" />
              </button>

              <button className="p-3 rounded-full bg-gray-700 text-white hover:bg-gray-600 transition-all">
                <MessageSquare className="w-6 h-6" />
              </button>

              <button className="p-3 rounded-full bg-gray-700 text-white hover:bg-gray-600 transition-all">
                <Users className="w-6 h-6" />
              </button>

              <button className="p-3 rounded-full bg-gray-700 text-white hover:bg-gray-600 transition-all">
                <Settings className="w-6 h-6" />
              </button>
            </div>

            {/* Meeting Info Bar */}
            <div className="flex items-center justify-between mt-4 text-sm text-gray-400">
              <div className="flex items-center space-x-4">
                {meetingSettings.transcription && (
                  <div className="flex items-center space-x-1">
                    <FileText className="w-4 h-4 text-blue-400" />
                    <span>Live Transcription</span>
                  </div>
                )}
                {meetingSettings.translation && (
                  <div className="flex items-center space-x-1">
                    <Globe className="w-4 h-4 text-green-400" />
                    <span>Auto-translate</span>
                  </div>
                )}
                {meetingSettings.spatialAudio && (
                  <div className="flex items-center space-x-1">
                    <Headphones className="w-4 h-4 text-purple-400" />
                    <span>Spatial Audio</span>
                  </div>
                )}
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-green-400" />
                <span>End-to-end encrypted</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-xl flex items-center justify-center z-50 p-4">
      <div className="w-full max-w-7xl h-full max-h-[95vh] bg-gradient-to-br from-blue-900/30 to-purple-900/30 backdrop-blur-xl rounded-2xl overflow-hidden shadow-2xl border border-blue-500/20">
        {/* Header */}
        <div className="p-6 border-b border-blue-500/20 bg-black/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                <Video className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Linkverse Meetings 2050</h1>
                <p className="text-blue-300">Holographic conferences & quantum collaboration</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-purple-600/20 px-3 py-1 rounded-lg">
                <Layers className="w-4 h-4 text-purple-400" />
                <span className="text-purple-400 text-sm font-semibold">Hologram Ready</span>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex space-x-2 mt-6">
            {[
              { id: 'upcoming', label: 'Upcoming', icon: Calendar },
              { id: 'live', label: 'Live Now', icon: Video },
              { id: 'create', label: 'Create Meeting', icon: Plus },
              { id: 'recordings', label: 'Recordings', icon: FileText },
              { id: 'analytics', label: 'AI Analytics', icon: Brain }
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

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Upcoming Meetings */}
          {activeTab === 'upcoming' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-white">Upcoming Meetings</h2>
                <button className="px-4 py-2 bg-blue-600 rounded-lg text-white hover:bg-blue-700 transition-colors">
                  Schedule New Meeting
                </button>
              </div>

              <div className="space-y-4">
                {upcomingMeetings.map((meeting) => (
                  <div key={meeting.id} className="bg-black/30 rounded-xl p-6 border border-blue-500/20 hover:border-blue-500/40 transition-colors">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-xl font-bold text-white">{meeting.title}</h3>
                          {getMeetingTypeIcon(meeting.type)}
                          <div className={`px-3 py-1 rounded-lg border ${getSecurityBadge(meeting.securityLevel)}`}>
                            <span className="text-sm font-semibold">{meeting.securityLevel.toUpperCase()}</span>
                          </div>
                        </div>
                        <p className="text-gray-300 mb-3">{meeting.description}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-400">
                          <span>{new Date(meeting.startTime).toLocaleString()}</span>
                          <span>•</span>
                          <span>{meeting.participants.length} participants</span>
                          <span>•</span>
                          <span>Host: {meeting.host}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => joinMeeting(meeting.id)}
                        className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-white font-semibold hover:from-blue-700 hover:to-purple-700 transition-all"
                      >
                        Join Meeting
                      </button>
                    </div>

                    {/* Participants */}
                    <div className="mb-4">
                      <h4 className="text-white font-medium mb-2">Participants:</h4>
                      <div className="flex items-center space-x-3">
                        {meeting.participants.map((participant) => (
                          <div key={participant.id} className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                              {participant.avatar}
                            </div>
                            <div>
                              <p className="text-white text-sm">{participant.name}</p>
                              <p className="text-gray-400 text-xs">{participant.location}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* AI Features */}
                    <div>
                      <h4 className="text-white font-medium mb-2">AI Features:</h4>
                      <div className="flex flex-wrap gap-2">
                        {meeting.aiFeatures.map((feature, index) => (
                          <span key={index} className="px-3 py-1 bg-purple-600/20 text-purple-400 rounded-lg text-sm">
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Live Meetings */}
          {activeTab === 'live' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-white">Live Meetings</h2>
              
              {liveMeetings.map((meeting) => (
                <div key={meeting.id} className="bg-gradient-to-r from-red-600/20 to-pink-600/20 rounded-xl p-6 border border-red-500/30">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-xl font-bold text-white">{meeting.title}</h3>
                        <div className="flex items-center space-x-2 bg-red-600/30 px-3 py-1 rounded-lg">
                          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                          <span className="text-red-400 text-sm font-semibold">LIVE</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-300">
                        <span>{meeting.participants} participants</span>
                        <span>•</span>
                        <span>Duration: {meeting.duration}</span>
                        <span>•</span>
                        <span>{meeting.type}</span>
                      </div>
                      <p className="text-purple-300 text-sm mt-2">AI: {meeting.aiInsights}</p>
                    </div>
                    <button
                      onClick={() => joinMeeting(meeting.id)}
                      className="px-6 py-3 bg-red-600 rounded-lg text-white font-semibold hover:bg-red-700 transition-colors"
                    >
                      Join Live
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};