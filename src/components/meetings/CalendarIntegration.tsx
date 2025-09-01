import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Users, MapPin, QrCode, Share2, Copy, Download, Mail, MessageSquare, Video, Phone, Globe, Shield, Bot, Zap, Star, CheckCircle, AlertTriangle, Plus, X } from 'lucide-react';

interface CalendarIntegrationProps {
  meetingData?: {
    title: string;
    description: string;
    startTime: string;
    endTime: string;
    participants: string[];
    meetingId: string;
  };
  onClose?: () => void;
}

interface MeetingEvent {
  id: string;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  participants: string[];
  location: string;
  type: 'video' | 'holographic' | 'ar' | 'quantum';
  status: 'scheduled' | 'live' | 'completed' | 'cancelled';
  qrCode: string;
  meetingLink: string;
  aiFeatures: string[];
  securityLevel: 'standard' | 'enterprise' | 'quantum';
}

export const CalendarIntegration: React.FC<CalendarIntegrationProps> = ({ 
  meetingData,
  onClose 
}) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showQRCode, setShowQRCode] = useState(false);
  const [meetings, setMeetings] = useState<MeetingEvent[]>([]);
  const [newMeeting, setNewMeeting] = useState({
    title: '',
    description: '',
    startTime: '',
    endTime: '',
    participants: '',
    type: 'quantum' as const,
    securityLevel: 'quantum' as const
  });
  const [showCreateForm, setShowCreateForm] = useState(false);

  useEffect(() => {
    generateSampleMeetings();
  }, []);

  const generateSampleMeetings = () => {
    const sampleMeetings: MeetingEvent[] = [
      {
        id: '1',
        title: 'Quantum Team Sync',
        description: 'Weekly team synchronization with neural interface',
        startTime: '2050-01-16T14:00:00',
        endTime: '2050-01-16T15:00:00',
        participants: ['Sarah Chen', 'Marcus Rodriguez', 'Emily Davis'],
        location: 'Quantum Conference Room',
        type: 'quantum',
        status: 'scheduled',
        qrCode: generateQRCode('quantum-meeting-1'),
        meetingLink: 'https://linkverse.2050/meet/quantum-1',
        aiFeatures: ['Neural sync', 'Thought sharing', 'Emotion detection'],
        securityLevel: 'quantum'
      },
      {
        id: '2',
        title: 'Client Presentation AR',
        description: 'Product demo with augmented reality features',
        startTime: '2050-01-17T10:00:00',
        endTime: '2050-01-17T11:30:00',
        participants: ['Sales Team', 'Product Team', 'External Clients'],
        location: 'AR Presentation Space',
        type: 'ar',
        status: 'scheduled',
        qrCode: generateQRCode('ar-meeting-2'),
        meetingLink: 'https://linkverse.2050/meet/ar-2',
        aiFeatures: ['Real-time translation', 'Gesture recognition', 'Object tracking'],
        securityLevel: 'enterprise'
      },
      {
        id: '3',
        title: 'Holographic Board Meeting',
        description: 'Executive board meeting with holographic projection',
        startTime: '2050-01-18T16:00:00',
        endTime: '2050-01-18T17:30:00',
        participants: ['Board Members', 'C-Suite', 'AI Director'],
        location: 'Executive Hologram Suite',
        type: 'holographic',
        status: 'scheduled',
        qrCode: generateQRCode('holo-meeting-3'),
        meetingLink: 'https://linkverse.2050/meet/holo-3',
        aiFeatures: ['Sentiment analysis', 'Decision tracking', 'Auto-summary'],
        securityLevel: 'quantum'
      }
    ];
    
    setMeetings(sampleMeetings);
  };

  const generateQRCode = (meetingId: string): string => {
    // Generate QR code data URL (simulated)
    const qrData = `https://linkverse.2050/meet/${meetingId}`;
    return `data:image/svg+xml;base64,${btoa(`
      <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
        <rect width="200" height="200" fill="white"/>
        <rect x="20" y="20" width="160" height="160" fill="none" stroke="black" stroke-width="2"/>
        <text x="100" y="100" text-anchor="middle" fill="black" font-size="12">QR Code</text>
        <text x="100" y="120" text-anchor="middle" fill="black" font-size="8">${meetingId}</text>
        <rect x="40" y="40" width="20" height="20" fill="black"/>
        <rect x="140" y="40" width="20" height="20" fill="black"/>
        <rect x="40" y="140" width="20" height="20" fill="black"/>
        <rect x="80" y="80" width="40" height="40" fill="black"/>
      </svg>
    `)}`;
  };

  const createMeeting = () => {
    const meetingId = `meeting-${Date.now()}`;
    const newMeetingEvent: MeetingEvent = {
      id: meetingId,
      title: newMeeting.title,
      description: newMeeting.description,
      startTime: newMeeting.startTime,
      endTime: newMeeting.endTime,
      participants: newMeeting.participants.split(',').map(p => p.trim()),
      location: `${newMeeting.type.charAt(0).toUpperCase() + newMeeting.type.slice(1)} Meeting Room`,
      type: newMeeting.type,
      status: 'scheduled',
      qrCode: generateQRCode(meetingId),
      meetingLink: `https://linkverse.2050/meet/${meetingId}`,
      aiFeatures: getAIFeatures(newMeeting.type),
      securityLevel: newMeeting.securityLevel
    };

    setMeetings(prev => [...prev, newMeetingEvent]);
    setShowCreateForm(false);
    setNewMeeting({
      title: '',
      description: '',
      startTime: '',
      endTime: '',
      participants: '',
      type: 'quantum',
      securityLevel: 'quantum'
    });
  };

  const getAIFeatures = (type: string): string[] => {
    const features = {
      quantum: ['Neural sync', 'Thought sharing', 'Consciousness bridging'],
      holographic: ['3D projection', 'Spatial interaction', 'Gesture control'],
      ar: ['Object recognition', 'Gesture tracking', 'Environment mapping'],
      video: ['Auto-transcription', 'Background blur', 'Noise cancellation']
    };
    return features[type as keyof typeof features] || features.video;
  };

  const copyMeetingLink = (link: string) => {
    navigator.clipboard.writeText(link);
    console.log('Meeting link copied:', link);
  };

  const downloadQRCode = (qrCode: string, meetingTitle: string) => {
    const link = document.createElement('a');
    link.href = qrCode;
    link.download = `${meetingTitle.replace(/\s+/g, '_')}_QR.svg`;
    link.click();
  };

  const shareMeeting = (meeting: MeetingEvent) => {
    const shareText = `Join "${meeting.title}" on Linkverse 2050\n${meeting.meetingLink}\n\nScan QR code or click link to join the ${meeting.type} meeting.`;
    
    if (navigator.share) {
      navigator.share({
        title: meeting.title,
        text: shareText,
        url: meeting.meetingLink
      });
    } else {
      navigator.clipboard.writeText(shareText);
      console.log('Meeting details copied to clipboard');
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
      case 'scheduled': return 'text-blue-400 bg-blue-600/20';
      case 'completed': return 'text-gray-400 bg-gray-600/20';
      case 'cancelled': return 'text-red-400 bg-red-600/20';
      default: return 'text-gray-400 bg-gray-600/20';
    }
  };

  return (
    <div className="bg-black/30 rounded-xl p-4 sm:p-6 border border-blue-500/20">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
            <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-white">Meeting Calendar 2050</h2>
            <p className="text-blue-300 text-sm">Quantum scheduling with QR code integration</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowCreateForm(!showCreateForm)}
            className="px-3 sm:px-4 py-2 bg-blue-600 rounded-lg text-white hover:bg-blue-700 transition-colors flex items-center space-x-2 text-sm"
          >
            <Plus className="w-4 h-4" />
            <span>New Meeting</span>
          </button>
          {onClose && (
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Create Meeting Form */}
      {showCreateForm && (
        <div className="bg-gray-800/50 rounded-lg p-4 sm:p-6 mb-6 border border-blue-500/30">
          <h3 className="font-semibold text-white mb-4">Create Revolutionary Meeting</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Meeting Title"
              value={newMeeting.title}
              onChange={(e) => setNewMeeting({...newMeeting, title: e.target.value})}
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 text-sm"
            />
            <select
              value={newMeeting.type}
              onChange={(e) => setNewMeeting({...newMeeting, type: e.target.value as any})}
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500 text-sm"
            >
              <option value="quantum">Quantum Consciousness</option>
              <option value="holographic">Holographic Projection</option>
              <option value="ar">Augmented Reality</option>
              <option value="video">Traditional Video</option>
            </select>
            <input
              type="datetime-local"
              placeholder="Start Time"
              value={newMeeting.startTime}
              onChange={(e) => setNewMeeting({...newMeeting, startTime: e.target.value})}
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500 text-sm"
            />
            <input
              type="datetime-local"
              placeholder="End Time"
              value={newMeeting.endTime}
              onChange={(e) => setNewMeeting({...newMeeting, endTime: e.target.value})}
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500 text-sm"
            />
            <textarea
              placeholder="Meeting Description"
              value={newMeeting.description}
              onChange={(e) => setNewMeeting({...newMeeting, description: e.target.value})}
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 text-sm resize-none"
              rows={3}
            />
            <input
              type="text"
              placeholder="Participants (comma separated)"
              value={newMeeting.participants}
              onChange={(e) => setNewMeeting({...newMeeting, participants: e.target.value})}
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 text-sm"
            />
          </div>
          <div className="flex space-x-3 mt-4">
            <button
              onClick={createMeeting}
              className="flex-1 p-3 bg-green-600 rounded-lg text-white hover:bg-green-700 transition-colors text-sm"
            >
              Create Meeting
            </button>
            <button
              onClick={() => setShowCreateForm(false)}
              className="px-4 py-3 bg-gray-600 rounded-lg text-white hover:bg-gray-700 transition-colors text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Meetings List */}
      <div className="space-y-4">
        {meetings.map((meeting) => (
          <div key={meeting.id} className="bg-gray-800/50 rounded-lg p-4 sm:p-6 border border-blue-500/20 hover:border-blue-500/40 transition-colors">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between space-y-4 lg:space-y-0">
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3 space-y-2 sm:space-y-0 mb-3">
                  <h3 className="text-lg font-bold text-white">{meeting.title}</h3>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${getTypeColor(meeting.type)}`}>
                      {meeting.type.toUpperCase()}
                    </span>
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${getStatusColor(meeting.status)}`}>
                      {meeting.status.toUpperCase()}
                    </span>
                    <div className="flex items-center space-x-1 bg-green-600/20 px-2 py-1 rounded">
                      <Shield className="w-3 h-3 text-green-400" />
                      <span className="text-green-400 text-xs">{meeting.securityLevel}</span>
                    </div>
                  </div>
                </div>

                <p className="text-gray-300 text-sm mb-3">{meeting.description}</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-blue-400" />
                    <span className="text-gray-400">
                      {new Date(meeting.startTime).toLocaleString()} - {new Date(meeting.endTime).toLocaleTimeString()}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-green-400" />
                    <span className="text-gray-400">{meeting.location}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-purple-400" />
                    <span className="text-gray-400">{meeting.participants.length} participants</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Bot className="w-4 h-4 text-cyan-400" />
                    <span className="text-gray-400">{meeting.aiFeatures.length} AI features</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mt-3">
                  {meeting.aiFeatures.map((feature, index) => (
                    <span key={index} className="px-2 py-1 bg-purple-600/20 text-purple-400 rounded text-xs">
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              {/* QR Code and Actions */}
              <div className="flex flex-col space-y-3 lg:w-48">
                <div className="bg-white rounded-lg p-3 text-center">
                  <img 
                    src={meeting.qrCode} 
                    alt={`QR Code for ${meeting.title}`}
                    className="w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-2"
                  />
                  <p className="text-black text-xs font-medium">Scan to Join</p>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-1 gap-2">
                  <button
                    onClick={() => copyMeetingLink(meeting.meetingLink)}
                    className="p-2 bg-blue-600 rounded-lg text-white hover:bg-blue-700 transition-colors flex items-center justify-center space-x-1 text-xs"
                  >
                    <Copy className="w-3 h-3" />
                    <span>Copy Link</span>
                  </button>
                  <button
                    onClick={() => downloadQRCode(meeting.qrCode, meeting.title)}
                    className="p-2 bg-green-600 rounded-lg text-white hover:bg-green-700 transition-colors flex items-center justify-center space-x-1 text-xs"
                  >
                    <Download className="w-3 h-3" />
                    <span>QR Code</span>
                  </button>
                  <button
                    onClick={() => shareMeeting(meeting)}
                    className="p-2 bg-purple-600 rounded-lg text-white hover:bg-purple-700 transition-colors flex items-center justify-center space-x-1 text-xs"
                  >
                    <Share2 className="w-3 h-3" />
                    <span>Share</span>
                  </button>
                  <button className="p-2 bg-cyan-600 rounded-lg text-white hover:bg-cyan-700 transition-colors flex items-center justify-center space-x-1 text-xs">
                    <Video className="w-3 h-3" />
                    <span>Join</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Calendar Integration Features */}
      <div className="mt-6 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-lg p-4 border border-blue-500/30">
        <div className="flex items-center space-x-2 mb-3">
          <Calendar className="w-5 h-5 text-blue-400" />
          <span className="font-semibold text-white">Calendar Features</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-sm">
          <div className="flex items-center space-x-2">
            <QrCode className="w-4 h-4 text-green-400" />
            <span className="text-gray-300">QR Code Generation</span>
          </div>
          <div className="flex items-center space-x-2">
            <Share2 className="w-4 h-4 text-blue-400" />
            <span className="text-gray-300">Smart Link Sharing</span>
          </div>
          <div className="flex items-center space-x-2">
            <Bot className="w-4 h-4 text-purple-400" />
            <span className="text-gray-300">AI Scheduling</span>
          </div>
          <div className="flex items-center space-x-2">
            <Shield className="w-4 h-4 text-green-400" />
            <span className="text-gray-300">Quantum Security</span>
          </div>
        </div>
      </div>
    </div>
  );
};