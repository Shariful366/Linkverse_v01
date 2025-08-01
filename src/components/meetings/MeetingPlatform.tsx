import React, { useState, useEffect, useRef } from 'react';
import { Video, Users, Calendar, Brain, Globe, Shield, Mic, Camera, Monitor, Share2, Settings, Phone, MessageSquare, FileText, Zap, Bot, Eye, Volume2, VolumeX, MicOff, VideoOff, Headphones, Cast, Layers, Compass, Star, X, Plus, Search, Filter, Clock, Award, TrendingUp, Heart, Gamepad2, Wifi, Battery, Signal, AlertTriangle, CheckCircle, Lock, Unlock, Maximize, Minimize, RotateCcw, Download, Upload, Edit3, Palette, Sparkles } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { supabase, api } from '../../lib/supabase';

interface MeetingPlatformProps {
  onClose: () => void;
}

interface Meeting {
  id: string;
  title: string;
  description: string;
  host_id: string;
  meeting_type: 'video' | 'audio' | 'holographic' | 'ar' | 'metaverse';
  scheduled_start: string;
  scheduled_end: string;
  actual_start?: string;
  actual_end?: string;
  timezone: string;
  max_participants: number;
  requires_approval: boolean;
  meeting_password?: string;
  waiting_room_enabled: boolean;
  recording_enabled: boolean;
  auto_recording: boolean;
  transcription_enabled: boolean;
  translation_enabled: boolean;
  ai_assistant_enabled: boolean;
  sentiment_analysis_enabled: boolean;
  auto_summary_enabled: boolean;
  ai_moderation_enabled: boolean;
  security_level: 'standard' | 'enterprise' | 'quantum';
  end_to_end_encryption: boolean;
  background_blur_enabled: boolean;
  noise_cancellation: boolean;
  spatial_audio: boolean;
  holographic_mode: boolean;
  ar_features_enabled: boolean;
  status: 'scheduled' | 'live' | 'ended' | 'cancelled';
  meeting_url?: string;
  meeting_room_id?: string;
  lobby_enabled: boolean;
  breakout_rooms_enabled: boolean;
  polls_enabled: boolean;
  whiteboard_enabled: boolean;
  screen_sharing_enabled: boolean;
  file_sharing_enabled: boolean;
  created_at: string;
  updated_at: string;
}

interface Participant {
  id: string;
  meeting_id: string;
  user_id: string;
  role: 'host' | 'co_host' | 'presenter' | 'participant' | 'observer';
  can_share_screen: boolean;
  can_use_whiteboard: boolean;
  can_send_chat: boolean;
  can_use_reactions: boolean;
  can_create_polls: boolean;
  can_manage_breakouts: boolean;
  invitation_status: 'pending' | 'accepted' | 'declined';
  join_status: 'not_joined' | 'joined' | 'left' | 'removed';
  joined_at?: string;
  left_at?: string;
  total_duration?: string;
  device_type?: 'desktop' | 'mobile' | 'tablet' | 'ar_glasses' | 'vr_headset' | 'hologram_projector';
  connection_quality?: 'excellent' | 'good' | 'fair' | 'poor';
  audio_enabled: boolean;
  video_enabled: boolean;
  screen_sharing: boolean;
  ai_transcription_enabled: boolean;
  ai_translation_language: string;
  background_blur_enabled: boolean;
  created_at: string;
  updated_at: string;
}

interface ChatMessage {
  id: string;
  meeting_id: string;
  sender_id: string;
  message_text?: string;
  message_type: 'text' | 'file' | 'poll' | 'reaction' | 'system' | 'ai_response';
  file_path?: string;
  file_name?: string;
  file_size?: number;
  file_type?: string;
  recipient_type: 'everyone' | 'hosts' | 'specific_user' | 'breakout_room';
  recipient_id?: string;
  ai_translated: boolean;
  original_language?: string;
  translated_text?: any;
  ai_moderated: boolean;
  moderation_result?: any;
  is_pinned: boolean;
  is_deleted: boolean;
  edited_at?: string;
  created_at: string;
}

interface Reaction {
  id: string;
  meeting_id: string;
  user_id: string;
  reaction_type: 'thumbs_up' | 'thumbs_down' | 'heart' | 'laugh' | 'surprised' | 'clap' | 'raise_hand' | 'custom';
  custom_emoji?: string;
  context_type: 'general' | 'screen_share' | 'poll' | 'message' | 'presentation';
  context_id?: string;
  timestamp: string;
  duration: string;
  created_at: string;
}

export const MeetingPlatform: React.FC<MeetingPlatformProps> = ({ onClose }) => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'upcoming' | 'live' | 'create' | 'recordings' | 'analytics' | 'ai-assistant'>('dashboard');
  const [selectedMeeting, setSelectedMeeting] = useState<string | null>(null);
  const [isInMeeting, setIsInMeeting] = useState(false);
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [reactions, setReactions] = useState<Reaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Meeting creation form
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newMeeting, setNewMeeting] = useState({
    title: '',
    description: '',
    meeting_type: 'video' as const,
    scheduled_start: '',
    scheduled_end: '',
    timezone: 'UTC',
    max_participants: 100,
    security_level: 'quantum' as const,
    recording_enabled: true,
    transcription_enabled: true,
    translation_enabled: true,
    ai_assistant_enabled: true,
    holographic_mode: false,
    ar_features_enabled: false
  });

  // Meeting controls
  const [meetingControls, setMeetingControls] = useState({
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
    noiseReduction: true,
    stealthMode: false,
    aiModeration: true,
    quantumEncryption: true
  });

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (user) {
      loadMeetings();
    }
  }, [user]);

  useEffect(() => {
    if (selectedMeeting) {
      loadMeetingData(selectedMeeting);
      subscribeToMeetingUpdates(selectedMeeting);
    }
  }, [selectedMeeting]);

  const loadMeetings = async () => {
    try {
      setLoading(true);
      const userMeetings = await api.getMeetings(user!.id);
      setMeetings(userMeetings);
    } catch (err) {
      setError('Failed to load meetings');
      console.error('Error loading meetings:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadMeetingData = async (meetingId: string) => {
    try {
      // Load participants
      const { data: participantData, error: participantError } = await supabase
        .from('meeting_participants')
        .select('*')
        .eq('meeting_id', meetingId);

      if (participantError) throw participantError;
      setParticipants(participantData || []);

      // Load chat messages
      const { data: chatData, error: chatError } = await supabase
        .from('meeting_chat_messages')
        .select('*')
        .eq('meeting_id', meetingId)
        .order('created_at', { ascending: true });

      if (chatError) throw chatError;
      setChatMessages(chatData || []);

      // Load reactions
      const { data: reactionData, error: reactionError } = await supabase
        .from('meeting_reactions')
        .select('*')
        .eq('meeting_id', meetingId)
        .order('timestamp', { ascending: false })
        .limit(50);

      if (reactionError) throw reactionError;
      setReactions(reactionData || []);
    } catch (err) {
      console.error('Error loading meeting data:', err);
    }
  };

  const subscribeToMeetingUpdates = (meetingId: string) => {
    // Subscribe to chat messages
    const chatSubscription = supabase
      .channel(`meeting_chat:${meetingId}`)
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'meeting_chat_messages',
        filter: `meeting_id=eq.${meetingId}`
      }, (payload) => {
        setChatMessages(prev => [...prev, payload.new as ChatMessage]);
      })
      .subscribe();

    // Subscribe to reactions
    const reactionSubscription = supabase
      .channel(`meeting_reactions:${meetingId}`)
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'meeting_reactions',
        filter: `meeting_id=eq.${meetingId}`
      }, (payload) => {
        setReactions(prev => [payload.new as Reaction, ...prev.slice(0, 49)]);
      })
      .subscribe();

    // Subscribe to participant updates
    const participantSubscription = supabase
      .channel(`meeting_participants:${meetingId}`)
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'meeting_participants',
        filter: `meeting_id=eq.${meetingId}`
      }, (payload) => {
        if (payload.eventType === 'INSERT') {
          setParticipants(prev => [...prev, payload.new as Participant]);
        } else if (payload.eventType === 'UPDATE') {
          setParticipants(prev => prev.map(p => 
            p.id === payload.new.id ? payload.new as Participant : p
          ));
        } else if (payload.eventType === 'DELETE') {
          setParticipants(prev => prev.filter(p => p.id !== payload.old.id));
        }
      })
      .subscribe();

    return () => {
      chatSubscription.unsubscribe();
      reactionSubscription.unsubscribe();
      participantSubscription.unsubscribe();
    };
  };

  const createMeeting = async () => {
    try {
      const meetingData = {
        ...newMeeting,
        host_id: user!.id,
        meeting_room_id: `room_${Date.now()}`,
        meeting_url: `https://linkverse.2050/meet/${Date.now()}`,
        status: 'scheduled' as const
      };

      const createdMeeting = await api.createMeeting(meetingData);
      
      // Add host as participant
      await supabase
        .from('meeting_participants')
        .insert({
          meeting_id: createdMeeting.id,
          user_id: user!.id,
          role: 'host',
          invitation_status: 'accepted',
          join_status: 'not_joined',
          can_share_screen: true,
          can_use_whiteboard: true,
          can_send_chat: true,
          can_use_reactions: true,
          can_create_polls: true,
          can_manage_breakouts: true
        });

      setMeetings(prev => [createdMeeting, ...prev]);
      setShowCreateForm(false);
      setNewMeeting({
        title: '',
        description: '',
        meeting_type: 'video',
        scheduled_start: '',
        scheduled_end: '',
        timezone: 'UTC',
        max_participants: 100,
        security_level: 'quantum',
        recording_enabled: true,
        transcription_enabled: true,
        translation_enabled: true,
        ai_assistant_enabled: true,
        holographic_mode: false,
        ar_features_enabled: false
      });
    } catch (err) {
      setError('Failed to create meeting');
      console.error('Error creating meeting:', err);
    }
  };

  const joinMeeting = async (meetingId: string) => {
    try {
      setSelectedMeeting(meetingId);
      setIsInMeeting(true);
      
      // Update participant status
      await supabase
        .from('meeting_participants')
        .update({
          join_status: 'joined',
          joined_at: new Date().toISOString()
        })
        .eq('meeting_id', meetingId)
        .eq('user_id', user!.id);

      // Initialize camera and microphone
      await initializeMedia();
      
      // Start AI assistant
      if (meetingControls.aiAssistant) {
        await startAIAssistant(meetingId);
      }
    } catch (err) {
      console.error('Error joining meeting:', err);
      setError('Failed to join meeting');
    }
  };

  const leaveMeeting = async () => {
    try {
      if (selectedMeeting) {
        // Update participant status
        await supabase
          .from('meeting_participants')
          .update({
            join_status: 'left',
            left_at: new Date().toISOString()
          })
          .eq('meeting_id', selectedMeeting)
          .eq('user_id', user!.id);

        // Stop media streams
        if (videoRef.current?.srcObject) {
          const stream = videoRef.current.srcObject as MediaStream;
          stream.getTracks().forEach(track => track.stop());
        }
      }
      
      setIsInMeeting(false);
      setSelectedMeeting(null);
    } catch (err) {
      console.error('Error leaving meeting:', err);
    }
  };

  const initializeMedia = async () => {
    try {
      const constraints = {
        video: meetingControls.video ? {
          width: { ideal: 1920 },
          height: { ideal: 1080 },
          frameRate: { ideal: 60 }
        } : false,
        audio: meetingControls.audio ? {
          echoCancellation: true,
          noiseSuppression: meetingControls.noiseReduction,
          autoGainControl: true,
          sampleRate: 48000
        } : false
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      // Apply AI background blur if enabled
      if (meetingControls.backgroundBlur) {
        await applyAIBackgroundBlur(stream);
      }
    } catch (error) {
      console.log('Media access not available in demo mode');
    }
  };

  const applyAIBackgroundBlur = async (stream: MediaStream) => {
    // Simulate AI background processing
    console.log('Applying AI background blur with quantum processing...');
  };

  const startAIAssistant = async (meetingId: string) => {
    // Initialize AI assistant for the meeting
    console.log('Starting AI assistant for meeting:', meetingId);
    
    // Send welcome message from AI
    await sendChatMessage({
      meeting_id: meetingId,
      sender_id: 'ai_assistant',
      message_text: '🤖 AI Assistant activated! I can help with transcription, translation, sentiment analysis, and meeting insights. Just ask me anything!',
      message_type: 'ai_response',
      recipient_type: 'everyone'
    });
  };

  const sendChatMessage = async (messageData: Partial<ChatMessage>) => {
    try {
      const { data, error } = await supabase
        .from('meeting_chat_messages')
        .insert({
          ...messageData,
          sender_id: messageData.sender_id || user!.id,
          ai_moderated: meetingControls.aiModeration,
          created_at: new Date().toISOString()
        })
        .select()
        .single();

      if (error) throw error;
      
      // Message will be added via real-time subscription
    } catch (err) {
      console.error('Error sending message:', err);
    }
  };

  const sendReaction = async (reactionType: string, customEmoji?: string) => {
    if (!selectedMeeting) return;

    try {
      await supabase
        .from('meeting_reactions')
        .insert({
          meeting_id: selectedMeeting,
          user_id: user!.id,
          reaction_type: reactionType,
          custom_emoji: customEmoji,
          context_type: 'general',
          timestamp: new Date().toISOString(),
          duration: '00:00:05'
        });
    } catch (err) {
      console.error('Error sending reaction:', err);
    }
  };

  const toggleMeetingControl = (control: keyof typeof meetingControls) => {
    setMeetingControls(prev => ({
      ...prev,
      [control]: !prev[control]
    }));

    // Apply changes immediately
    if (control === 'video' || control === 'audio') {
      initializeMedia();
    }
  };

  const getMeetingTypeIcon = (type: string) => {
    switch (type) {
      case 'holographic': return <Layers className="w-5 h-5 text-purple-400" />;
      case 'ar': return <Eye className="w-5 h-5 text-blue-400" />;
      case 'metaverse': return <Globe className="w-5 h-5 text-green-400" />;
      case 'video': return <Video className="w-5 h-5 text-cyan-400" />;
      case 'audio': return <Headphones className="w-5 h-5 text-yellow-400" />;
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

  const getConnectionQuality = (quality?: string) => {
    switch (quality) {
      case 'excellent': return { color: 'text-green-400', bars: 4 };
      case 'good': return { color: 'text-blue-400', bars: 3 };
      case 'fair': return { color: 'text-yellow-400', bars: 2 };
      case 'poor': return { color: 'text-red-400', bars: 1 };
      default: return { color: 'text-gray-400', bars: 0 };
    }
  };

  const formatDuration = (start: string, end?: string) => {
    const startTime = new Date(start);
    const endTime = end ? new Date(end) : new Date();
    const diff = endTime.getTime() - startTime.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  };

  // In-Meeting Interface
  if (isInMeeting && selectedMeeting) {
    const currentMeeting = meetings.find(m => m.id === selectedMeeting);
    const currentParticipants = participants.filter(p => p.meeting_id === selectedMeeting);

    return (
      <div className="fixed inset-0 bg-black z-50">
        {/* Meeting Interface */}
        <div className="h-full flex flex-col">
          {/* Top Control Bar */}
          <div className="p-4 bg-black/90 backdrop-blur-xl border-b border-gray-700 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h2 className="text-white font-semibold">{currentMeeting?.title}</h2>
              <div className="flex items-center space-x-2 bg-red-600/20 px-3 py-1 rounded-lg">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-red-400 text-sm font-semibold">LIVE</span>
              </div>
              <div className={`flex items-center space-x-2 px-3 py-1 rounded-lg border ${getSecurityBadge(currentMeeting?.security_level || 'quantum')}`}>
                <Shield className="w-4 h-4" />
                <span className="text-sm font-semibold">{currentMeeting?.security_level?.toUpperCase()}</span>
              </div>
              {meetingControls.holographicMode && (
                <div className="flex items-center space-x-2 bg-purple-600/20 px-3 py-1 rounded-lg">
                  <Layers className="w-4 h-4 text-purple-400" />
                  <span className="text-purple-400 text-sm">Holographic</span>
                </div>
              )}
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-gray-400 text-sm">
                <Clock className="w-4 h-4" />
                <span>{currentMeeting?.actual_start ? formatDuration(currentMeeting.actual_start) : '00:00'}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400 text-sm">
                <Users className="w-4 h-4" />
                <span>{currentParticipants.filter(p => p.join_status === 'joined').length} participants</span>
              </div>
              <button
                onClick={leaveMeeting}
                className="px-4 py-2 bg-red-600 rounded-lg text-white hover:bg-red-700 transition-colors font-semibold"
              >
                Leave Meeting
              </button>
            </div>
          </div>

          <div className="flex-1 flex">
            {/* Main Video Area */}
            <div className="flex-1 relative bg-gray-900">
              {meetingControls.holographicMode ? (
                <div className="h-full flex items-center justify-center neural-bg">
                  <div className="text-center">
                    <div className="w-32 h-32 mx-auto bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-6 hologram-flicker">
                      <Layers className="w-16 h-16 text-white" />
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-4 text-quantum">Holographic Mode Active</h3>
                    <p className="text-purple-300 text-lg">3D holographic projection enabled</p>
                    <div className="mt-6 flex items-center justify-center space-x-4 text-sm">
                      <div className="flex items-center space-x-2 bg-purple-600/20 px-3 py-2 rounded-lg">
                        <Sparkles className="w-4 h-4 text-purple-400" />
                        <span className="text-purple-400">Quantum Rendering</span>
                      </div>
                      <div className="flex items-center space-x-2 bg-cyan-600/20 px-3 py-2 rounded-lg">
                        <Zap className="w-4 h-4 text-cyan-400" />
                        <span className="text-cyan-400">Neural Sync</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4 h-full">
                  {/* Self Video */}
                  <div className="relative bg-black rounded-xl overflow-hidden border border-cyan-500/30 hover-quantum">
                    <video
                      ref={videoRef}
                      autoPlay
                      muted
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-sm px-3 py-1 rounded-lg text-white text-sm font-semibold">
                      You (Host)
                    </div>
                    {meetingControls.backgroundBlur && (
                      <div className="absolute top-3 right-3 bg-cyan-600/80 backdrop-blur-sm px-2 py-1 rounded text-white text-xs flex items-center space-x-1">
                        <Bot className="w-3 h-3" />
                        <span>AI Blur</span>
                      </div>
                    )}
                    <div className="absolute top-3 left-3 flex space-x-1">
                      {!meetingControls.audio && (
                        <div className="bg-red-600/80 p-1 rounded">
                          <MicOff className="w-3 h-3 text-white" />
                        </div>
                      )}
                      {!meetingControls.video && (
                        <div className="bg-red-600/80 p-1 rounded">
                          <VideoOff className="w-3 h-3 text-white" />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Other Participants */}
                  {currentParticipants
                    .filter(p => p.user_id !== user!.id && p.join_status === 'joined')
                    .map((participant) => {
                      const quality = getConnectionQuality(participant.connection_quality);
                      return (
                        <div key={participant.id} className="relative bg-gray-800 rounded-xl overflow-hidden border border-blue-500/30 hover-quantum">
                          <div className="w-full h-full flex items-center justify-center">
                            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-2xl">
                              {participant.user_id.slice(0, 2).toUpperCase()}
                            </div>
                          </div>
                          <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-sm px-3 py-1 rounded-lg text-white text-sm font-semibold">
                            Participant {participant.user_id.slice(-4)}
                          </div>
                          <div className="absolute top-3 right-3 flex items-center space-x-1">
                            <div className={`flex space-x-0.5 ${quality.color}`}>
                              {[...Array(4)].map((_, i) => (
                                <div
                                  key={i}
                                  className={`w-1 h-3 rounded ${i < quality.bars ? 'bg-current' : 'bg-gray-600'}`}
                                />
                              ))}
                            </div>
                          </div>
                          <div className="absolute top-3 left-3 flex space-x-1">
                            {participant.device_type === 'hologram_projector' && (
                              <div className="bg-purple-600/80 px-2 py-1 rounded text-white text-xs">
                                Hologram
                              </div>
                            )}
                            {participant.device_type === 'ar_glasses' && (
                              <div className="bg-blue-600/80 px-2 py-1 rounded text-white text-xs">
                                AR
                              </div>
                            )}
                            {participant.device_type === 'vr_headset' && (
                              <div className="bg-green-600/80 px-2 py-1 rounded text-white text-xs">
                                VR
                              </div>
                            )}
                          </div>
                          <div className="absolute bottom-3 right-3 flex space-x-1">
                            {!participant.audio_enabled && (
                              <div className="bg-red-600/80 p-1 rounded">
                                <MicOff className="w-3 h-3 text-white" />
                              </div>
                            )}
                            {!participant.video_enabled && (
                              <div className="bg-red-600/80 p-1 rounded">
                                <VideoOff className="w-3 h-3 text-white" />
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                </div>
              )}

              {/* AI Assistant Overlay */}
              {meetingControls.aiAssistant && (
                <div className="absolute top-6 left-6 bg-gradient-to-r from-purple-600/90 to-pink-600/90 backdrop-blur-xl rounded-xl p-4 max-w-sm border border-purple-500/30 ai-glow">
                  <div className="flex items-center space-x-3 mb-3">
                    <Bot className="w-6 h-6 text-white" />
                    <span className="text-white font-semibold">Vision AI Assistant</span>
                  </div>
                  <div className="space-y-2 text-sm text-white">
                    <p>• Meeting sentiment: <span className="text-green-300">Positive (87%)</span></p>
                    <p>• Engagement level: <span className="text-blue-300">High</span></p>
                    <p>• Action items identified: <span className="text-yellow-300">3</span></p>
                    <p>• Translation active: <span className="text-cyan-300">5 languages</span></p>
                  </div>
                </div>
              )}

              {/* Live Reactions Display */}
              <div className="absolute bottom-24 right-6 space-y-2 max-h-40 overflow-hidden">
                {reactions.slice(0, 5).map((reaction) => (
                  <div
                    key={reaction.id}
                    className="bg-black/70 backdrop-blur-sm rounded-full px-4 py-2 text-white text-sm animate-bounce flex items-center space-x-2"
                  >
                    <span className="text-lg">
                      {reaction.reaction_type === 'thumbs_up' ? '👍' :
                       reaction.reaction_type === 'heart' ? '❤️' :
                       reaction.reaction_type === 'laugh' ? '😂' :
                       reaction.reaction_type === 'clap' ? '👏' :
                       reaction.reaction_type === 'raise_hand' ? '✋' :
                       reaction.custom_emoji || '👍'}
                    </span>
                    <span>User {reaction.user_id.slice(-4)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Meeting Sidebar */}
            <div className="w-80 bg-black/90 backdrop-blur-xl border-l border-gray-700 flex flex-col">
              {/* Participants Panel */}
              <div className="p-4 border-b border-gray-700">
                <h3 className="font-semibold text-white mb-3 flex items-center space-x-2">
                  <Users className="w-5 h-5" />
                  <span>Participants ({currentParticipants.filter(p => p.join_status === 'joined').length})</span>
                </h3>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {currentParticipants
                    .filter(p => p.join_status === 'joined')
                    .map((participant) => {
                      const quality = getConnectionQuality(participant.connection_quality);
                      return (
                        <div key={participant.id} className="flex items-center space-x-3 p-2 bg-gray-800/50 rounded-lg">
                          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                            {participant.user_id.slice(0, 2).toUpperCase()}
                          </div>
                          <div className="flex-1">
                            <p className="text-white text-sm font-medium">
                              {participant.user_id === user!.id ? 'You' : `User ${participant.user_id.slice(-4)}`}
                              {participant.role === 'host' && ' (Host)'}
                            </p>
                            <div className="flex items-center space-x-2 text-xs text-gray-400">
                              <span className="capitalize">{participant.device_type?.replace('_', ' ')}</span>
                              <div className={`flex space-x-0.5 ${quality.color}`}>
                                {[...Array(4)].map((_, i) => (
                                  <div
                                    key={i}
                                    className={`w-0.5 h-2 rounded ${i < quality.bars ? 'bg-current' : 'bg-gray-600'}`}
                                  />
                                ))}
                              </div>
                            </div>
                          </div>
                          <div className="flex space-x-1">
                            {!participant.audio_enabled && <MicOff className="w-3 h-3 text-red-400" />}
                            {!participant.video_enabled && <VideoOff className="w-3 h-3 text-red-400" />}
                            {participant.screen_sharing && <Monitor className="w-3 h-3 text-blue-400" />}
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>

              {/* Chat Panel */}
              <div className="flex-1 flex flex-col">
                <div className="p-4 border-b border-gray-700">
                  <h3 className="font-semibold text-white flex items-center space-x-2">
                    <MessageSquare className="w-5 h-5" />
                    <span>Live Chat</span>
                    {meetingControls.aiModeration && (
                      <Shield className="w-4 h-4 text-green-400" title="AI Moderated" />
                    )}
                  </h3>
                </div>
                
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {chatMessages.map((msg) => (
                    <div key={msg.id} className="text-sm">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className={`font-semibold ${
                          msg.message_type === 'ai_response' ? 'text-purple-400' :
                          msg.message_type === 'system' ? 'text-yellow-400' :
                          'text-cyan-400'
                        }`}>
                          {msg.sender_id === 'ai_assistant' ? 'Vision AI' :
                           msg.sender_id === user!.id ? 'You' :
                           `User ${msg.sender_id.slice(-4)}`}
                        </span>
                        {msg.message_type === 'ai_response' && <Bot className="w-3 h-3 text-purple-400" />}
                        {msg.ai_translated && <Globe className="w-3 h-3 text-blue-400" />}
                        <span className="text-xs text-gray-500">
                          {new Date(msg.created_at).toLocaleTimeString()}
                        </span>
                      </div>
                      <p className="text-gray-300">{msg.message_text}</p>
                      {msg.ai_translated && msg.translated_text && (
                        <p className="text-blue-200 text-xs italic mt-1">
                          🌐 Translated from {msg.original_language}
                        </p>
                      )}
                    </div>
                  ))}
                </div>

                {/* Chat Input */}
                <div className="p-4 border-t border-gray-700">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          sendChatMessage({
                            meeting_id: selectedMeeting,
                            message_text: newMessage,
                            message_type: 'text',
                            recipient_type: 'everyone'
                          });
                          setNewMessage('');
                        }
                      }}
                      placeholder="Send a message..."
                      className="flex-1 p-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500"
                    />
                    <button
                      onClick={() => {
                        sendChatMessage({
                          meeting_id: selectedMeeting,
                          message_text: newMessage,
                          message_type: 'text',
                          recipient_type: 'everyone'
                        });
                        setNewMessage('');
                      }}
                      className="p-3 bg-cyan-600 rounded-lg text-white hover:bg-cyan-700 transition-colors"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Control Bar */}
          <div className="p-6 bg-black/90 backdrop-blur-xl border-t border-gray-700">
            <div className="flex items-center justify-center space-x-4">
              {/* Audio Control */}
              <button
                onClick={() => toggleMeetingControl('audio')}
                className={`p-4 rounded-full transition-all hover-quantum ${
                  meetingControls.audio ? 'bg-gray-700 text-white' : 'bg-red-600 text-white'
                }`}
                title={meetingControls.audio ? 'Mute' : 'Unmute'}
              >
                {meetingControls.audio ? <Mic className="w-6 h-6" /> : <MicOff className="w-6 h-6" />}
              </button>

              {/* Video Control */}
              <button
                onClick={() => toggleMeetingControl('video')}
                className={`p-4 rounded-full transition-all hover-quantum ${
                  meetingControls.video ? 'bg-gray-700 text-white' : 'bg-red-600 text-white'
                }`}
                title={meetingControls.video ? 'Stop Video' : 'Start Video'}
              >
                {meetingControls.video ? <Camera className="w-6 h-6" /> : <VideoOff className="w-6 h-6" />}
              </button>

              {/* Screen Share */}
              <button
                onClick={() => toggleMeetingControl('screen')}
                className={`p-4 rounded-full transition-all hover-quantum ${
                  meetingControls.screen ? 'bg-blue-600 text-white' : 'bg-gray-700 text-white'
                }`}
                title="Share Screen"
              >
                <Monitor className="w-6 h-6" />
              </button>

              {/* Holographic Mode */}
              <button
                onClick={() => toggleMeetingControl('holographicMode')}
                className={`p-4 rounded-full transition-all hover-quantum ${
                  meetingControls.holographicMode ? 'bg-purple-600 text-white' : 'bg-gray-700 text-white'
                }`}
                title="Holographic Mode"
              >
                <Layers className="w-6 h-6" />
              </button>

              {/* Recording */}
              <button
                onClick={() => toggleMeetingControl('recording')}
                className={`p-4 rounded-full transition-all hover-quantum ${
                  meetingControls.recording ? 'bg-red-600 text-white animate-pulse' : 'bg-gray-700 text-white'
                }`}
                title="Record Meeting"
              >
                <Video className="w-6 h-6" />
              </button>

              {/* AI Assistant */}
              <button
                onClick={() => toggleMeetingControl('aiAssistant')}
                className={`p-4 rounded-full transition-all hover-quantum ${
                  meetingControls.aiAssistant ? 'bg-purple-600 text-white ai-glow' : 'bg-gray-700 text-white'
                }`}
                title="AI Assistant"
              >
                <Bot className="w-6 h-6" />
              </button>

              {/* Background Blur */}
              <button
                onClick={() => toggleMeetingControl('backgroundBlur')}
                className={`p-4 rounded-full transition-all hover-quantum ${
                  meetingControls.backgroundBlur ? 'bg-cyan-600 text-white' : 'bg-gray-700 text-white'
                }`}
                title="AI Background Blur"
              >
                <Palette className="w-6 h-6" />
              </button>

              {/* Settings */}
              <button className="p-4 rounded-full bg-gray-700 text-white hover:bg-gray-600 transition-all hover-quantum">
                <Settings className="w-6 h-6" />
              </button>
            </div>

            {/* Reaction Bar */}
            <div className="flex items-center justify-center space-x-3 mt-4">
              {[
                { type: 'thumbs_up', emoji: '👍', label: 'Like' },
                { type: 'heart', emoji: '❤️', label: 'Love' },
                { type: 'laugh', emoji: '😂', label: 'Laugh' },
                { type: 'surprised', emoji: '😮', label: 'Surprised' },
                { type: 'clap', emoji: '👏', label: 'Clap' },
                { type: 'raise_hand', emoji: '✋', label: 'Raise Hand' }
              ].map((reaction) => (
                <button
                  key={reaction.type}
                  onClick={() => sendReaction(reaction.type)}
                  className="p-3 bg-gray-800/50 rounded-full text-white hover:bg-gray-700/50 transition-all hover:scale-110 hover-quantum"
                  title={reaction.label}
                >
                  <span className="text-xl">{reaction.emoji}</span>
                </button>
              ))}
            </div>

            {/* Status Bar */}
            <div className="flex items-center justify-between mt-4 text-sm text-gray-400">
              <div className="flex items-center space-x-6">
                {meetingControls.transcription && (
                  <div className="flex items-center space-x-1">
                    <FileText className="w-4 h-4 text-blue-400" />
                    <span>Live Transcription</span>
                  </div>
                )}
                {meetingControls.translation && (
                  <div className="flex items-center space-x-1">
                    <Globe className="w-4 h-4 text-green-400" />
                    <span>Auto-translate</span>
                  </div>
                )}
                {meetingControls.spatialAudio && (
                  <div className="flex items-center space-x-1">
                    <Headphones className="w-4 h-4 text-purple-400" />
                    <span>Spatial Audio</span>
                  </div>
                )}
                {meetingControls.quantumEncryption && (
                  <div className="flex items-center space-x-1">
                    <Shield className="w-4 h-4 text-green-400" />
                    <span>Quantum Encrypted</span>
                  </div>
                )}
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>Connection: Excellent</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Main Meeting Platform Interface
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-xl flex items-center justify-center z-50 p-4">
      <div className="w-full max-w-7xl h-full max-h-[95vh] bg-gradient-to-br from-blue-900/30 to-purple-900/30 backdrop-blur-xl rounded-2xl overflow-hidden shadow-2xl border border-blue-500/20 neural-bg">
        {/* Header */}
        <div className="p-6 border-b border-blue-500/20 bg-black/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center quantum-pulse">
                <Video className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white text-quantum">Linkverse Meetings 2050</h1>
                <p className="text-blue-300">Holographic conferences • Quantum collaboration • Neural networking</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-purple-600/20 px-4 py-2 rounded-lg border border-purple-500/30">
                <Layers className="w-5 h-5 text-purple-400" />
                <span className="text-purple-400 font-semibold">Hologram Ready</span>
              </div>
              <div className="flex items-center space-x-2 bg-green-600/20 px-4 py-2 rounded-lg border border-green-500/30">
                <Shield className="w-5 h-5 text-green-400" />
                <span className="text-green-400 font-semibold">Quantum Secure</span>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-white transition-colors hover-quantum"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex space-x-2 mt-6">
            {[
              { id: 'dashboard', label: 'AI Dashboard', icon: Brain },
              { id: 'upcoming', label: 'Upcoming', icon: Calendar },
              { id: 'live', label: 'Live Now', icon: Video },
              { id: 'create', label: 'Create Meeting', icon: Plus },
              { id: 'recordings', label: 'Recordings', icon: FileText },
              { id: 'analytics', label: 'Neural Analytics', icon: TrendingUp },
              { id: 'ai-assistant', label: 'AI Assistant', icon: Bot }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 px-4 py-3 rounded-lg transition-all hover-quantum ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-400 hover:bg-blue-600/20 hover:text-white'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Dashboard Tab */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-black/30 rounded-xl p-6 border border-blue-500/20 hover-quantum">
                  <div className="flex items-center justify-between mb-4">
                    <Video className="w-8 h-8 text-blue-400" />
                    <span className="text-3xl font-bold text-white">{meetings.length}</span>
                  </div>
                  <p className="text-gray-400">Total Meetings</p>
                  <p className="text-blue-400 text-sm">+23% this month</p>
                </div>

                <div className="bg-black/30 rounded-xl p-6 border border-purple-500/20 hover-quantum">
                  <div className="flex items-center justify-between mb-4">
                    <Users className="w-8 h-8 text-purple-400" />
                    <span className="text-3xl font-bold text-white">
                      {participants.filter(p => p.join_status === 'joined').length}
                    </span>
                  </div>
                  <p className="text-gray-400">Active Participants</p>
                  <p className="text-purple-400 text-sm">Across all meetings</p>
                </div>

                <div className="bg-black/30 rounded-xl p-6 border border-green-500/20 hover-quantum">
                  <div className="flex items-center justify-between mb-4">
                    <Brain className="w-8 h-8 text-green-400" />
                    <span className="text-3xl font-bold text-white">94%</span>
                  </div>
                  <p className="text-gray-400">AI Efficiency</p>
                  <p className="text-green-400 text-sm">Neural optimization</p>
                </div>

                <div className="bg-black/30 rounded-xl p-6 border border-yellow-500/20 hover-quantum">
                  <div className="flex items-center justify-between mb-4">
                    <Shield className="w-8 h-8 text-yellow-400" />
                    <span className="text-3xl font-bold text-white">100%</span>
                  </div>
                  <p className="text-gray-400">Security Score</p>
                  <p className="text-yellow-400 text-sm">Quantum protected</p>
                </div>
              </div>

              {/* Recent Meetings */}
              <div className="bg-black/30 rounded-xl p-6 border border-blue-500/20">
                <h2 className="text-xl font-bold text-white mb-4">Recent Meeting Activity</h2>
                <div className="space-y-3">
                  {meetings.slice(0, 3).map((meeting) => (
                    <div key={meeting.id} className="flex items-center space-x-4 p-4 bg-gray-800/50 rounded-lg hover-quantum">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                        {getMeetingTypeIcon(meeting.meeting_type)}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-white">{meeting.title}</h3>
                        <p className="text-gray-400 text-sm">
                          {new Date(meeting.scheduled_start).toLocaleDateString()} • 
                          {meeting.meeting_type} • {meeting.security_level}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-3 py-1 rounded-lg text-sm font-semibold ${
                          meeting.status === 'live' ? 'bg-red-600/20 text-red-400' :
                          meeting.status === 'scheduled' ? 'bg-blue-600/20 text-blue-400' :
                          meeting.status === 'ended' ? 'bg-green-600/20 text-green-400' :
                          'bg-gray-600/20 text-gray-400'
                        }`}>
                          {meeting.status.toUpperCase()}
                        </span>
                        <button
                          onClick={() => joinMeeting(meeting.id)}
                          className="px-4 py-2 bg-blue-600 rounded-lg text-white hover:bg-blue-700 transition-colors"
                        >
                          {meeting.status === 'live' ? 'Join' : 'View'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* AI Insights */}
              <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-xl p-6 border border-purple-500/30">
                <div className="flex items-center space-x-3 mb-4">
                  <Bot className="w-8 h-8 text-purple-400" />
                  <h2 className="text-xl font-bold text-white">AI Meeting Insights</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="w-5 h-5 text-green-400" />
                      <span className="text-gray-300">Meeting productivity up 34% this week</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Heart className="w-5 h-5 text-red-400" />
                      <span className="text-gray-300">Team satisfaction: 92% positive sentiment</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Zap className="w-5 h-5 text-yellow-400" />
                      <span className="text-gray-300">Optimal meeting time: 2-4 PM</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Globe className="w-5 h-5 text-blue-400" />
                      <span className="text-gray-300">12 languages actively translated</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Shield className="w-5 h-5 text-green-400" />
                      <span className="text-gray-300">Zero security incidents detected</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Layers className="w-5 h-5 text-purple-400" />
                      <span className="text-gray-300">Holographic adoption: 67% increase</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Create Meeting Tab */}
          {activeTab === 'create' && (
            <div className="max-w-4xl mx-auto">
              <div className="bg-black/30 rounded-xl p-8 border border-blue-500/20">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center space-x-3">
                  <Plus className="w-8 h-8 text-blue-400" />
                  <span>Create 2050 Meeting</span>
                </h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Basic Information */}
                  <div className="space-y-6">
                    <div>
                      <label className="block text-white font-medium mb-2">Meeting Title</label>
                      <input
                        type="text"
                        value={newMeeting.title}
                        onChange={(e) => setNewMeeting(prev => ({ ...prev, title: e.target.value }))}
                        placeholder="Enter meeting title..."
                        className="w-full p-4 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-white font-medium mb-2">Description</label>
                      <textarea
                        value={newMeeting.description}
                        onChange={(e) => setNewMeeting(prev => ({ ...prev, description: e.target.value }))}
                        placeholder="Meeting description..."
                        rows={3}
                        className="w-full p-4 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors resize-none"
                      />
                    </div>

                    <div>
                      <label className="block text-white font-medium mb-2">Meeting Type</label>
                      <div className="grid grid-cols-2 gap-3">
                        {[
                          { type: 'video', label: 'Video Conference', icon: Video, desc: '4K video calls' },
                          { type: 'audio', label: 'Audio Only', icon: Headphones, desc: 'Voice meetings' },
                          { type: 'holographic', label: 'Holographic', icon: Layers, desc: '3D projections' },
                          { type: 'ar', label: 'AR Enhanced', icon: Eye, desc: 'Augmented reality' },
                          { type: 'metaverse', label: 'Metaverse', icon: Globe, desc: 'Virtual worlds' }
                        ].map(({ type, label, icon: Icon, desc }) => (
                          <button
                            key={type}
                            onClick={() => setNewMeeting(prev => ({ ...prev, meeting_type: type as any }))}
                            className={`p-4 rounded-xl border transition-all hover-quantum ${
                              newMeeting.meeting_type === type
                                ? 'border-blue-500 bg-blue-600/20 text-white'
                                : 'border-gray-700 bg-gray-800/50 text-gray-300 hover:border-gray-600'
                            }`}
                          >
                            <Icon className="w-6 h-6 mx-auto mb-2" />
                            <p className="font-medium text-sm">{label}</p>
                            <p className="text-xs opacity-75">{desc}</p>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-white font-medium mb-2">Start Time</label>
                        <input
                          type="datetime-local"
                          value={newMeeting.scheduled_start}
                          onChange={(e) => setNewMeeting(prev => ({ ...prev, scheduled_start: e.target.value }))}
                          className="w-full p-4 bg-gray-800/50 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-blue-500 transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-white font-medium mb-2">End Time</label>
                        <input
                          type="datetime-local"
                          value={newMeeting.scheduled_end}
                          onChange={(e) => setNewMeeting(prev => ({ ...prev, scheduled_end: e.target.value }))}
                          className="w-full p-4 bg-gray-800/50 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-blue-500 transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Advanced Settings */}
                  <div className="space-y-6">
                    <div>
                      <label className="block text-white font-medium mb-2">Security Level</label>
                      <div className="space-y-2">
                        {[
                          { level: 'standard', label: 'Standard', desc: 'Basic encryption' },
                          { level: 'enterprise', label: 'Enterprise', desc: 'Advanced security' },
                          { level: 'quantum', label: 'Quantum', desc: 'Military-grade protection' }
                        ].map(({ level, label, desc }) => (
                          <button
                            key={level}
                            onClick={() => setNewMeeting(prev => ({ ...prev, security_level: level as any }))}
                            className={`w-full p-3 rounded-lg border transition-all text-left hover-quantum ${
                              newMeeting.security_level === level
                                ? getSecurityBadge(level)
                                : 'border-gray-700 bg-gray-800/50 text-gray-300 hover:border-gray-600'
                            }`}
                          >
                            <p className="font-medium">{label}</p>
                            <p className="text-xs opacity-75">{desc}</p>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-white font-medium mb-2">Max Participants</label>
                      <select
                        value={newMeeting.max_participants}
                        onChange={(e) => setNewMeeting(prev => ({ ...prev, max_participants: parseInt(e.target.value) }))}
                        className="w-full p-4 bg-gray-800/50 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-blue-500 transition-colors"
                      >
                        <option value={10}>10 participants</option>
                        <option value={25}>25 participants</option>
                        <option value={50}>50 participants</option>
                        <option value={100}>100 participants</option>
                        <option value={500}>500 participants (Enterprise)</option>
                        <option value={1000}>1000 participants (Quantum)</option>
                      </select>
                    </div>

                    <div className="space-y-3">
                      <h3 className="text-white font-medium">AI Features</h3>
                      {[
                        { key: 'recording_enabled', label: 'Auto Recording', desc: 'AI-powered recording' },
                        { key: 'transcription_enabled', label: 'Live Transcription', desc: 'Real-time speech-to-text' },
                        { key: 'translation_enabled', label: 'Auto Translation', desc: '30+ languages' },
                        { key: 'ai_assistant_enabled', label: 'AI Assistant', desc: 'Meeting intelligence' },
                        { key: 'holographic_mode', label: 'Holographic Mode', desc: '3D projections' },
                        { key: 'ar_features_enabled', label: 'AR Features', desc: 'Augmented reality' }
                      ].map(({ key, label, desc }) => (
                        <label key={key} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg cursor-pointer hover-quantum">
                          <div>
                            <span className="text-white font-medium">{label}</span>
                            <p className="text-sm text-gray-400">{desc}</p>
                          </div>
                          <input
                            type="checkbox"
                            checked={newMeeting[key as keyof typeof newMeeting] as boolean}
                            onChange={(e) => setNewMeeting(prev => ({ ...prev, [key]: e.target.checked }))}
                            className="sr-only"
                          />
                          <div className={`w-12 h-6 rounded-full ${
                            newMeeting[key as keyof typeof newMeeting] ? 'bg-blue-600' : 'bg-gray-600'
                          }`}>
                            <div className={`w-5 h-5 rounded-full bg-white transition-transform ${
                              newMeeting[key as keyof typeof newMeeting] ? 'translate-x-6' : 'translate-x-1'
                            } mt-0.5`}></div>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-700">
                  <div className="text-sm text-gray-400">
                    Meeting will be created with quantum encryption and AI enhancement
                  </div>
                  <button
                    onClick={createMeeting}
                    disabled={!newMeeting.title || !newMeeting.scheduled_start || !newMeeting.scheduled_end}
                    className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl text-white font-semibold hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed hover-quantum"
                  >
                    Create Quantum Meeting
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Upcoming Meetings Tab */}
          {activeTab === 'upcoming' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">Upcoming Meetings</h2>
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search meetings..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <button
                    onClick={() => setActiveTab('create')}
                    className="px-4 py-3 bg-blue-600 rounded-xl text-white hover:bg-blue-700 transition-colors flex items-center space-x-2"
                  >
                    <Plus className="w-5 h-5" />
                    <span>New Meeting</span>
                  </button>
                </div>
              </div>

              {loading ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mb-4 animate-pulse">
                    <Video className="w-8 h-8 text-white" />
                  </div>
                  <p className="text-gray-400">Loading meetings...</p>
                </div>
              ) : meetings.length === 0 ? (
                <div className="text-center py-12">
                  <Calendar className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">No Meetings Scheduled</h3>
                  <p className="text-gray-400 mb-6">Create your first quantum meeting to get started</p>
                  <button
                    onClick={() => setActiveTab('create')}
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl text-white font-semibold hover:from-blue-700 hover:to-purple-700 transition-all"
                  >
                    Create Meeting
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {meetings
                    .filter(meeting => 
                      meeting.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      meeting.description.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                    .map((meeting) => (
                      <div key={meeting.id} className="bg-black/30 rounded-xl p-6 border border-blue-500/20 hover:border-blue-500/40 transition-colors hover-quantum">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h3 className="text-xl font-bold text-white">{meeting.title}</h3>
                              {getMeetingTypeIcon(meeting.meeting_type)}
                              <div className={`px-3 py-1 rounded-lg border ${getSecurityBadge(meeting.security_level)}`}>
                                <span className="text-sm font-semibold">{meeting.security_level.toUpperCase()}</span>
                              </div>
                              {meeting.holographic_mode && (
                                <div className="px-3 py-1 bg-purple-600/20 text-purple-400 rounded-lg border border-purple-500/30">
                                  <span className="text-sm font-semibold">HOLOGRAPHIC</span>
                                </div>
                              )}
                            </div>
                            <p className="text-gray-300 mb-3">{meeting.description}</p>
                            <div className="flex items-center space-x-4 text-sm text-gray-400">
                              <span className="flex items-center space-x-1">
                                <Calendar className="w-4 h-4" />
                                <span>{new Date(meeting.scheduled_start).toLocaleDateString()}</span>
                              </span>
                              <span className="flex items-center space-x-1">
                                <Clock className="w-4 h-4" />
                                <span>
                                  {new Date(meeting.scheduled_start).toLocaleTimeString()} - 
                                  {new Date(meeting.scheduled_end).toLocaleTimeString()}
                                </span>
                              </span>
                              <span className="flex items-center space-x-1">
                                <Users className="w-4 h-4" />
                                <span>Max {meeting.max_participants}</span>
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-3">
                            <button
                              onClick={() => joinMeeting(meeting.id)}
                              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl text-white font-semibold hover:from-blue-700 hover:to-purple-700 transition-all hover-quantum"
                            >
                              {meeting.status === 'live' ? 'Join Now' : 'Join Meeting'}
                            </button>
                          </div>
                        </div>

                        {/* Meeting Features */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          {meeting.ai_assistant_enabled && (
                            <div className="flex items-center space-x-2 bg-purple-600/20 px-3 py-2 rounded-lg">
                              <Bot className="w-4 h-4 text-purple-400" />
                              <span className="text-purple-400 text-sm">AI Assistant</span>
                            </div>
                          )}
                          {meeting.transcription_enabled && (
                            <div className="flex items-center space-x-2 bg-blue-600/20 px-3 py-2 rounded-lg">
                              <FileText className="w-4 h-4 text-blue-400" />
                              <span className="text-blue-400 text-sm">Transcription</span>
                            </div>
                          )}
                          {meeting.translation_enabled && (
                            <div className="flex items-center space-x-2 bg-green-600/20 px-3 py-2 rounded-lg">
                              <Globe className="w-4 h-4 text-green-400" />
                              <span className="text-green-400 text-sm">Translation</span>
                            </div>
                          )}
                          {meeting.recording_enabled && (
                            <div className="flex items-center space-x-2 bg-red-600/20 px-3 py-2 rounded-lg">
                              <Video className="w-4 h-4 text-red-400" />
                              <span className="text-red-400 text-sm">Recording</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>
          )}

          {/* AI Assistant Tab */}
          {activeTab === 'ai-assistant' && (
            <div className="max-w-4xl mx-auto">
              <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-xl p-8 border border-purple-500/30">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center ai-glow">
                    <Bot className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">Vision AI Meeting Assistant</h2>
                    <p className="text-purple-300">Your intelligent meeting companion for 2050</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="bg-black/30 rounded-xl p-6">
                      <h3 className="font-semibold text-white mb-4 flex items-center space-x-2">
                        <Brain className="w-5 h-5 text-cyan-400" />
                        <span>AI Capabilities</span>
                      </h3>
                      <div className="space-y-3">
                        {[
                          'Real-time transcription with 99.9% accuracy',
                          'Automatic translation for 30+ languages',
                          'Sentiment analysis and mood detection',
                          'Action item extraction and follow-up',
                          'Meeting summary generation',
                          'Participant engagement metrics',
                          'Smart scheduling optimization',
                          'Content moderation and safety'
                        ].map((capability, index) => (
                          <div key={index} className="flex items-center space-x-3">
                            <CheckCircle className="w-4 h-4 text-green-400" />
                            <span className="text-gray-300 text-sm">{capability}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-black/30 rounded-xl p-6">
                      <h3 className="font-semibold text-white mb-4 flex items-center space-x-2">
                        <Zap className="w-5 h-5 text-yellow-400" />
                        <span>Quantum Features</span>
                      </h3>
                      <div className="space-y-3">
                        {[
                          'Holographic participant projection',
                          'Neural interface compatibility',
                          'Quantum-encrypted communications',
                          'AR/VR seamless integration',
                          'Metaverse meeting spaces',
                          'Spatial audio positioning'
                        ].map((feature, index) => (
                          <div key={index} className="flex items-center space-x-3">
                            <Sparkles className="w-4 h-4 text-purple-400" />
                            <span className="text-gray-300 text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="bg-black/30 rounded-xl p-6">
                      <h3 className="font-semibold text-white mb-4">Meeting Analytics</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-400">Average Meeting Duration</span>
                          <span className="text-white font-semibold">47 minutes</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-400">Participant Satisfaction</span>
                          <span className="text-green-400 font-semibold">94%</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-400">AI Accuracy Score</span>
                          <span className="text-blue-400 font-semibold">99.7%</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-400">Security Incidents</span>
                          <span className="text-green-400 font-semibold">0</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-black/30 rounded-xl p-6">
                      <h3 className="font-semibold text-white mb-4">Quick Actions</h3>
                      <div className="space-y-3">
                        <button className="w-full p-3 bg-blue-600 rounded-lg text-white hover:bg-blue-700 transition-colors text-left">
                          Schedule AI-optimized meeting
                        </button>
                        <button className="w-full p-3 bg-purple-600 rounded-lg text-white hover:bg-purple-700 transition-colors text-left">
                          Start instant holographic call
                        </button>
                        <button className="w-full p-3 bg-green-600 rounded-lg text-white hover:bg-green-700 transition-colors text-left">
                          Generate meeting insights
                        </button>
                        <button className="w-full p-3 bg-yellow-600 rounded-lg text-white hover:bg-yellow-700 transition-colors text-left">
                          Analyze team collaboration
                        </button>
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
  );
};