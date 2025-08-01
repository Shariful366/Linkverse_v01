import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  },
  realtime: {
    params: {
      eventsPerSecond: 10
    }
  }
});

// Database Types
export interface UserProfile {
  id: string;
  user_id: string;
  username: string;
  display_name: string;
  avatar_url?: string;
  bio?: string;
  location?: string;
  timezone: string;
  language_preference: string;
  theme_preference: string;
  security_level: 'standard' | 'enterprise' | 'quantum';
  biometric_enabled: boolean;
  geo_lock_enabled: boolean;
  stealth_mode: boolean;
  quantum_encryption: boolean;
  ai_assistant_enabled: boolean;
  wellness_monitoring: boolean;
  mood_tracking: boolean;
  ai_safety_score: number;
  job_title?: string;
  company?: string;
  industry?: string;
  experience_years: number;
  salary_range_min?: number;
  salary_range_max?: number;
  open_to_work: boolean;
  created_at: string;
  updated_at: string;
  last_active: string;
  is_verified: boolean;
  is_premium: boolean;
}

export interface ChatRoom {
  id: string;
  name?: string;
  description?: string;
  type: 'direct' | 'group' | 'channel' | 'ai_assistant';
  avatar_url?: string;
  is_private: boolean;
  encryption_level: 'standard' | 'enterprise' | 'quantum';
  auto_delete_messages: boolean;
  auto_delete_duration?: string;
  ai_moderation_enabled: boolean;
  ai_translation_enabled: boolean;
  ai_summary_enabled: boolean;
  max_members: number;
  member_count: number;
  admin_only_messages: boolean;
  created_by?: string;
  created_at: string;
  updated_at: string;
  archived_at?: string;
  is_active: boolean;
}

export interface Message {
  id: string;
  chat_room_id: string;
  sender_id: string;
  content?: string;
  message_type: 'text' | 'image' | 'video' | 'audio' | 'file' | 'location' | 'contact' | 'ai_response';
  media_url?: string;
  media_metadata?: any;
  ai_safety_score: number;
  content_moderated: boolean;
  moderation_reason?: string;
  ai_generated: boolean;
  reply_to_message_id?: string;
  forwarded_from_message_id?: string;
  edited_at?: string;
  reactions: any;
  smart_link_id?: string;
  smart_link_expires_at?: string;
  smart_link_password?: string;
  smart_link_views: number;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
  is_pinned: boolean;
}

export interface JobPosting {
  id: string;
  company_id?: string;
  posted_by?: string;
  title: string;
  description: string;
  requirements?: string[];
  responsibilities?: string[];
  location?: string;
  work_type: 'remote' | 'hybrid' | 'onsite' | 'metaverse' | 'space';
  employment_type: 'full_time' | 'part_time' | 'contract' | 'internship';
  salary_min?: number;
  salary_max?: number;
  currency: string;
  equity_percentage?: number;
  benefits?: string[];
  ai_match_enabled: boolean;
  required_skills?: string[];
  preferred_skills?: string[];
  experience_level?: 'entry' | 'mid' | 'senior' | 'executive';
  status: 'draft' | 'active' | 'paused' | 'closed' | 'expired';
  application_count: number;
  view_count: number;
  created_at: string;
  updated_at: string;
  expires_at?: string;
  is_urgent: boolean;
  is_verified: boolean;
}

export interface Meeting {
  id: string;
  title: string;
  description?: string;
  host_id: string;
  meeting_type: 'video' | 'audio' | 'holographic' | 'ar' | 'metaverse';
  scheduled_start: string;
  scheduled_end: string;
  actual_start?: string;
  actual_end?: string;
  max_participants: number;
  requires_approval: boolean;
  recording_enabled: boolean;
  transcription_enabled: boolean;
  translation_enabled: boolean;
  security_level: 'standard' | 'enterprise' | 'quantum';
  meeting_password?: string;
  waiting_room_enabled: boolean;
  ai_assistant_enabled: boolean;
  sentiment_analysis_enabled: boolean;
  auto_summary_enabled: boolean;
  status: 'scheduled' | 'live' | 'ended' | 'cancelled';
  created_at: string;
  updated_at: string;
}

// API Functions
export const api = {
  // User Profile Management
  async getUserProfile(userId: string): Promise<UserProfile | null> {
    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('user_id', userId)
      .single();
    
    if (error) throw error;
    return data;
  },

  async updateUserProfile(userId: string, updates: Partial<UserProfile>): Promise<UserProfile> {
    const { data, error } = await supabase
      .from('user_profiles')
      .update(updates)
      .eq('user_id', userId)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Chat Management
  async getChatRooms(userId: string): Promise<ChatRoom[]> {
    const { data, error } = await supabase
      .from('chat_rooms')
      .select(`
        *,
        chat_room_members!inner(user_id)
      `)
      .eq('chat_room_members.user_id', userId)
      .eq('chat_room_members.is_active', true);
    
    if (error) throw error;
    return data || [];
  },

  async getMessages(chatRoomId: string, limit = 50): Promise<Message[]> {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('chat_room_id', chatRoomId)
      .order('created_at', { ascending: false })
      .limit(limit);
    
    if (error) throw error;
    return data || [];
  },

  async sendMessage(message: Partial<Message>): Promise<Message> {
    const { data, error } = await supabase
      .from('messages')
      .insert(message)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Job Platform
  async getJobPostings(filters?: any): Promise<JobPosting[]> {
    let query = supabase
      .from('job_postings')
      .select('*')
      .eq('status', 'active');
    
    if (filters?.work_type) {
      query = query.eq('work_type', filters.work_type);
    }
    
    const { data, error } = await query.order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  },

  async createJobPosting(jobData: Partial<JobPosting>): Promise<JobPosting> {
    const { data, error } = await supabase
      .from('job_postings')
      .insert(jobData)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Meeting Management
  async getMeetings(userId: string): Promise<Meeting[]> {
    const { data, error } = await supabase
      .from('meetings')
      .select('*')
      .or(`host_id.eq.${userId},id.in.(${await this.getUserMeetingIds(userId)})`)
      .order('scheduled_start', { ascending: true });
    
    if (error) throw error;
    return data || [];
  },

  async getUserMeetingIds(userId: string): Promise<string> {
    const { data, error } = await supabase
      .from('meeting_participants')
      .select('meeting_id')
      .eq('user_id', userId);
    
    if (error) return '';
    return data.map(p => p.meeting_id).join(',') || '';
  },

  async createMeeting(meetingData: Partial<Meeting>): Promise<Meeting> {
    const { data, error } = await supabase
      .from('meetings')
      .insert(meetingData)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Location Sharing
  async shareLocation(locationData: any): Promise<any> {
    const { data, error } = await supabase
      .from('location_shares')
      .insert(locationData)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async getLiveLocations(userId: string): Promise<any[]> {
    const { data, error } = await supabase
      .from('location_shares')
      .select('*')
      .contains('shared_with', [userId])
      .gte('expires_at', new Date().toISOString());
    
    if (error) throw error;
    return data || [];
  },

  // AI Conversations
  async saveAIConversation(conversationData: any): Promise<any> {
    const { data, error } = await supabase
      .from('ai_conversations')
      .insert(conversationData)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // File Management
  async uploadFile(file: File, userId: string): Promise<string> {
    const fileExt = file.name.split('.').pop();
    const fileName = `${userId}/${Date.now()}.${fileExt}`;
    
    const { data, error } = await supabase.storage
      .from('files')
      .upload(fileName, file);
    
    if (error) throw error;
    
    const { data: { publicUrl } } = supabase.storage
      .from('files')
      .getPublicUrl(fileName);
    
    // Save file metadata
    await supabase
      .from('file_storage')
      .insert({
        user_id: userId,
        filename: file.name,
        file_size: file.size,
        mime_type: file.type,
        file_url: publicUrl
      });
    
    return publicUrl;
  },

  // Real-time Subscriptions
  subscribeToMessages(chatRoomId: string, callback: (payload: any) => void) {
    return supabase
      .channel(`messages:${chatRoomId}`)
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'messages',
        filter: `chat_room_id=eq.${chatRoomId}`
      }, callback)
      .subscribe();
  },

  subscribeToLocationUpdates(userId: string, callback: (payload: any) => void) {
    return supabase
      .channel(`locations:${userId}`)
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'location_shares'
      }, callback)
      .subscribe();
  }
};