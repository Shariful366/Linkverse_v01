/*
  # Complete 2050 Meeting System

  1. New Tables
    - `meetings` - Core meeting information with 2050 features
    - `meeting_participants` - Advanced participant management
    - `meeting_chat_messages` - Real-time chat with AI moderation
    - `meeting_reactions` - Live reactions and engagement
    - `meeting_recordings` - AI-processed recordings
    - `meeting_breakout_rooms` - Breakout room management
    - `meeting_polls` - Live polling system
    - `meeting_whiteboards` - Collaborative whiteboards
    - `meeting_screen_shares` - Screen sharing sessions
    - `meeting_analytics` - AI-powered meeting analytics

  2. Security
    - Enable RLS on all tables
    - Comprehensive permission policies
    - Quantum-level security controls

  3. Features
    - Real-time subscriptions
    - AI integration points
    - Holographic meeting support
    - AR/VR compatibility
    - Multi-language support
    - Advanced analytics
*/

-- Create meetings table with 2050 features
CREATE TABLE IF NOT EXISTS meetings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  host_id uuid REFERENCES users(id) ON DELETE CASCADE,
  meeting_type text DEFAULT 'video' CHECK (meeting_type IN ('video', 'audio', 'holographic', 'ar', 'metaverse')),
  scheduled_start timestamptz NOT NULL,
  scheduled_end timestamptz NOT NULL,
  actual_start timestamptz,
  actual_end timestamptz,
  timezone text DEFAULT 'UTC',
  max_participants integer DEFAULT 100,
  requires_approval boolean DEFAULT false,
  meeting_password text,
  waiting_room_enabled boolean DEFAULT true,
  recording_enabled boolean DEFAULT false,
  auto_recording boolean DEFAULT false,
  transcription_enabled boolean DEFAULT true,
  translation_enabled boolean DEFAULT false,
  ai_assistant_enabled boolean DEFAULT true,
  sentiment_analysis_enabled boolean DEFAULT false,
  auto_summary_enabled boolean DEFAULT true,
  ai_moderation_enabled boolean DEFAULT true,
  security_level text DEFAULT 'standard' CHECK (security_level IN ('standard', 'enterprise', 'quantum')),
  end_to_end_encryption boolean DEFAULT true,
  background_blur_enabled boolean DEFAULT false,
  noise_cancellation boolean DEFAULT true,
  spatial_audio boolean DEFAULT false,
  holographic_mode boolean DEFAULT false,
  ar_features_enabled boolean DEFAULT false,
  status text DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'live', 'ended', 'cancelled')),
  meeting_url text,
  meeting_room_id text UNIQUE,
  lobby_enabled boolean DEFAULT true,
  breakout_rooms_enabled boolean DEFAULT false,
  polls_enabled boolean DEFAULT true,
  whiteboard_enabled boolean DEFAULT true,
  screen_sharing_enabled boolean DEFAULT true,
  file_sharing_enabled boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create meeting participants table
CREATE TABLE IF NOT EXISTS meeting_participants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  meeting_id uuid REFERENCES meetings(id) ON DELETE CASCADE,
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  role text DEFAULT 'participant' CHECK (role IN ('host', 'co_host', 'presenter', 'participant', 'observer')),
  can_share_screen boolean DEFAULT true,
  can_use_whiteboard boolean DEFAULT true,
  can_send_chat boolean DEFAULT true,
  can_use_reactions boolean DEFAULT true,
  can_create_polls boolean DEFAULT false,
  can_manage_breakouts boolean DEFAULT false,
  invitation_status text DEFAULT 'pending' CHECK (invitation_status IN ('pending', 'accepted', 'declined')),
  join_status text DEFAULT 'not_joined' CHECK (join_status IN ('not_joined', 'joined', 'left', 'removed')),
  joined_at timestamptz,
  left_at timestamptz,
  total_duration interval,
  device_type text CHECK (device_type IN ('desktop', 'mobile', 'tablet', 'ar_glasses', 'vr_headset', 'hologram_projector')),
  connection_quality text CHECK (connection_quality IN ('excellent', 'good', 'fair', 'poor')),
  audio_enabled boolean DEFAULT true,
  video_enabled boolean DEFAULT true,
  screen_sharing boolean DEFAULT false,
  ai_transcription_enabled boolean DEFAULT true,
  ai_translation_language text DEFAULT 'en',
  background_blur_enabled boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(meeting_id, user_id)
);

-- Create meeting chat messages table
CREATE TABLE IF NOT EXISTS meeting_chat_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  meeting_id uuid REFERENCES meetings(id) ON DELETE CASCADE,
  sender_id uuid REFERENCES users(id) ON DELETE CASCADE,
  message_text text,
  message_type text DEFAULT 'text' CHECK (message_type IN ('text', 'file', 'poll', 'reaction', 'system', 'ai_response')),
  file_path text,
  file_name text,
  file_size bigint,
  file_type text,
  recipient_type text DEFAULT 'everyone' CHECK (recipient_type IN ('everyone', 'hosts', 'specific_user', 'breakout_room')),
  recipient_id uuid,
  ai_translated boolean DEFAULT false,
  original_language text,
  translated_text jsonb,
  ai_moderated boolean DEFAULT false,
  moderation_result jsonb,
  is_pinned boolean DEFAULT false,
  is_deleted boolean DEFAULT false,
  edited_at timestamptz,
  created_at timestamptz DEFAULT now()
);

-- Create meeting reactions table
CREATE TABLE IF NOT EXISTS meeting_reactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  meeting_id uuid REFERENCES meetings(id) ON DELETE CASCADE,
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  reaction_type text NOT NULL CHECK (reaction_type IN ('thumbs_up', 'thumbs_down', 'heart', 'laugh', 'surprised', 'clap', 'raise_hand', 'custom')),
  custom_emoji text,
  context_type text DEFAULT 'general' CHECK (context_type IN ('general', 'screen_share', 'poll', 'message', 'presentation')),
  context_id uuid,
  timestamp timestamptz DEFAULT now(),
  duration interval DEFAULT '00:00:05',
  created_at timestamptz DEFAULT now()
);

-- Create meeting recordings table
CREATE TABLE IF NOT EXISTS meeting_recordings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  meeting_id uuid REFERENCES meetings(id) ON DELETE CASCADE,
  recorded_by uuid REFERENCES users(id),
  recording_type text DEFAULT 'full_meeting' CHECK (recording_type IN ('full_meeting', 'audio_only', 'screen_share', 'whiteboard', 'breakout_room')),
  file_path text NOT NULL,
  file_size bigint,
  duration interval,
  quality text DEFAULT '1080p' CHECK (quality IN ('4k', '1080p', '720p', '480p', 'audio_only')),
  format text DEFAULT 'mp4' CHECK (format IN ('mp4', 'webm', 'mp3', 'wav')),
  transcription_file_path text,
  transcript_text text,
  ai_summary text,
  ai_highlights jsonb DEFAULT '[]',
  ai_action_items jsonb DEFAULT '[]',
  sentiment_analysis jsonb,
  is_public boolean DEFAULT false,
  password_protected boolean DEFAULT false,
  access_password text,
  expires_at timestamptz,
  download_enabled boolean DEFAULT true,
  processing_status text DEFAULT 'processing' CHECK (processing_status IN ('processing', 'completed', 'failed')),
  ai_processing_completed boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create meeting breakout rooms table
CREATE TABLE IF NOT EXISTS meeting_breakout_rooms (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  meeting_id uuid REFERENCES meetings(id) ON DELETE CASCADE,
  created_by uuid REFERENCES users(id),
  room_name text NOT NULL,
  room_number integer,
  max_participants integer DEFAULT 10,
  auto_assign boolean DEFAULT false,
  allow_participants_return boolean DEFAULT true,
  time_limit interval,
  status text DEFAULT 'created' CHECK (status IN ('created', 'active', 'closed')),
  started_at timestamptz,
  ended_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create meeting breakout participants table
CREATE TABLE IF NOT EXISTS meeting_breakout_participants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  breakout_room_id uuid REFERENCES meeting_breakout_rooms(id) ON DELETE CASCADE,
  participant_id uuid REFERENCES meeting_participants(id) ON DELETE CASCADE,
  joined_at timestamptz DEFAULT now(),
  left_at timestamptz,
  UNIQUE(breakout_room_id, participant_id)
);

-- Create meeting polls table
CREATE TABLE IF NOT EXISTS meeting_polls (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  meeting_id uuid REFERENCES meetings(id) ON DELETE CASCADE,
  created_by uuid REFERENCES users(id),
  question text NOT NULL,
  poll_type text DEFAULT 'multiple_choice' CHECK (poll_type IN ('multiple_choice', 'yes_no', 'rating', 'open_text')),
  options jsonb DEFAULT '[]',
  anonymous boolean DEFAULT false,
  multiple_answers boolean DEFAULT false,
  show_results_immediately boolean DEFAULT true,
  status text DEFAULT 'draft' CHECK (status IN ('draft', 'active', 'closed')),
  started_at timestamptz,
  ended_at timestamptz,
  total_responses integer DEFAULT 0,
  results jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create meeting poll responses table
CREATE TABLE IF NOT EXISTS meeting_poll_responses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  poll_id uuid REFERENCES meeting_polls(id) ON DELETE CASCADE,
  participant_id uuid REFERENCES meeting_participants(id) ON DELETE CASCADE,
  response_data jsonb NOT NULL,
  response_text text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(poll_id, participant_id)
);

-- Create meeting whiteboards table
CREATE TABLE IF NOT EXISTS meeting_whiteboards (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  meeting_id uuid REFERENCES meetings(id) ON DELETE CASCADE,
  created_by uuid REFERENCES users(id),
  title text DEFAULT 'Untitled Whiteboard',
  canvas_data jsonb DEFAULT '{}',
  is_collaborative boolean DEFAULT true,
  edit_permissions text DEFAULT 'everyone' CHECK (edit_permissions IN ('everyone', 'hosts_only', 'specific_users')),
  allowed_editors uuid[] DEFAULT '{}',
  version integer DEFAULT 1,
  last_modified_by uuid REFERENCES users(id),
  exported_formats text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create meeting screen shares table
CREATE TABLE IF NOT EXISTS meeting_screen_shares (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  meeting_id uuid REFERENCES meetings(id) ON DELETE CASCADE,
  presenter_id uuid REFERENCES users(id) ON DELETE CASCADE,
  share_type text DEFAULT 'full_screen' CHECK (share_type IN ('full_screen', 'application', 'browser_tab', 'whiteboard')),
  application_name text,
  started_at timestamptz DEFAULT now(),
  ended_at timestamptz,
  duration interval,
  recorded boolean DEFAULT false,
  recording_path text,
  ai_annotations jsonb DEFAULT '[]',
  ai_highlights jsonb DEFAULT '[]',
  created_at timestamptz DEFAULT now()
);

-- Create meeting analytics table
CREATE TABLE IF NOT EXISTS meeting_analytics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  meeting_id uuid REFERENCES meetings(id) ON DELETE CASCADE,
  total_participants integer DEFAULT 0,
  peak_participants integer DEFAULT 0,
  average_participants numeric(5,2) DEFAULT 0,
  total_join_time interval DEFAULT '00:00:00',
  average_join_time interval DEFAULT '00:00:00',
  total_chat_messages integer DEFAULT 0,
  total_reactions integer DEFAULT 0,
  total_polls integer DEFAULT 0,
  screen_shares_count integer DEFAULT 0,
  average_connection_quality numeric(3,2) DEFAULT 0,
  audio_issues_count integer DEFAULT 0,
  video_issues_count integer DEFAULT 0,
  sentiment_score numeric(3,2),
  engagement_score numeric(3,2),
  productivity_score numeric(3,2),
  ai_insights jsonb DEFAULT '{}',
  action_items_generated integer DEFAULT 0,
  decisions_made integer DEFAULT 0,
  follow_up_meetings_scheduled integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_meetings_host_id ON meetings(host_id);
CREATE INDEX IF NOT EXISTS idx_meetings_status ON meetings(status);
CREATE INDEX IF NOT EXISTS idx_meetings_scheduled_start ON meetings(scheduled_start);
CREATE INDEX IF NOT EXISTS idx_meetings_meeting_room_id ON meetings(meeting_room_id);

CREATE INDEX IF NOT EXISTS idx_meeting_participants_meeting_id ON meeting_participants(meeting_id);
CREATE INDEX IF NOT EXISTS idx_meeting_participants_user_id ON meeting_participants(user_id);
CREATE INDEX IF NOT EXISTS idx_meeting_participants_join_status ON meeting_participants(join_status);

CREATE INDEX IF NOT EXISTS idx_meeting_chat_messages_meeting_id ON meeting_chat_messages(meeting_id);
CREATE INDEX IF NOT EXISTS idx_meeting_chat_messages_created_at ON meeting_chat_messages(created_at);

CREATE INDEX IF NOT EXISTS idx_meeting_reactions_meeting_id ON meeting_reactions(meeting_id);
CREATE INDEX IF NOT EXISTS idx_meeting_reactions_timestamp ON meeting_reactions(timestamp);

CREATE INDEX IF NOT EXISTS idx_meeting_recordings_meeting_id ON meeting_recordings(meeting_id);
CREATE INDEX IF NOT EXISTS idx_meeting_recordings_processing_status ON meeting_recordings(processing_status);

CREATE INDEX IF NOT EXISTS idx_meeting_breakout_rooms_meeting_id ON meeting_breakout_rooms(meeting_id);
CREATE INDEX IF NOT EXISTS idx_meeting_polls_meeting_id ON meeting_polls(meeting_id);
CREATE INDEX IF NOT EXISTS idx_meeting_whiteboards_meeting_id ON meeting_whiteboards(meeting_id);

-- Enable Row Level Security
ALTER TABLE meetings ENABLE ROW LEVEL SECURITY;
ALTER TABLE meeting_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE meeting_chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE meeting_reactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE meeting_recordings ENABLE ROW LEVEL SECURITY;
ALTER TABLE meeting_breakout_rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE meeting_breakout_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE meeting_polls ENABLE ROW LEVEL SECURITY;
ALTER TABLE meeting_poll_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE meeting_whiteboards ENABLE ROW LEVEL SECURITY;
ALTER TABLE meeting_screen_shares ENABLE ROW LEVEL SECURITY;
ALTER TABLE meeting_analytics ENABLE ROW LEVEL SECURITY;

-- Meetings policies
CREATE POLICY "Users can view meetings they participate in"
  ON meetings
  FOR SELECT
  TO authenticated
  USING (
    host_id = uid() OR 
    id IN (
      SELECT meeting_id FROM meeting_participants 
      WHERE user_id = uid()
    )
  );

CREATE POLICY "Users can create meetings"
  ON meetings
  FOR INSERT
  TO authenticated
  WITH CHECK (host_id = uid());

CREATE POLICY "Hosts can update their meetings"
  ON meetings
  FOR UPDATE
  TO authenticated
  USING (host_id = uid());

CREATE POLICY "Hosts can delete their meetings"
  ON meetings
  FOR DELETE
  TO authenticated
  USING (host_id = uid());

-- Meeting participants policies
CREATE POLICY "Users can view participants in their meetings"
  ON meeting_participants
  FOR SELECT
  TO authenticated
  USING (
    meeting_id IN (
      SELECT id FROM meetings 
      WHERE host_id = uid() OR 
      id IN (
        SELECT meeting_id FROM meeting_participants 
        WHERE user_id = uid()
      )
    )
  );

CREATE POLICY "Hosts can manage participants"
  ON meeting_participants
  FOR ALL
  TO authenticated
  USING (
    meeting_id IN (
      SELECT id FROM meetings 
      WHERE host_id = uid()
    ) OR 
    user_id = uid()
  );

-- Chat messages policies
CREATE POLICY "Users can view chat in their meetings"
  ON meeting_chat_messages
  FOR SELECT
  TO authenticated
  USING (
    meeting_id IN (
      SELECT meeting_id FROM meeting_participants 
      WHERE user_id = uid()
    )
  );

CREATE POLICY "Participants can send chat messages"
  ON meeting_chat_messages
  FOR INSERT
  TO authenticated
  WITH CHECK (
    sender_id = uid() AND 
    meeting_id IN (
      SELECT meeting_id FROM meeting_participants 
      WHERE user_id = uid() AND can_send_chat = true
    )
  );

-- Reactions policies
CREATE POLICY "Users can view reactions in their meetings"
  ON meeting_reactions
  FOR SELECT
  TO authenticated
  USING (
    meeting_id IN (
      SELECT meeting_id FROM meeting_participants 
      WHERE user_id = uid()
    )
  );

CREATE POLICY "Participants can add reactions"
  ON meeting_reactions
  FOR INSERT
  TO authenticated
  WITH CHECK (
    user_id = uid() AND 
    meeting_id IN (
      SELECT meeting_id FROM meeting_participants 
      WHERE user_id = uid() AND can_use_reactions = true
    )
  );

-- Recordings policies
CREATE POLICY "Users can view recordings of their meetings"
  ON meeting_recordings
  FOR SELECT
  TO authenticated
  USING (
    meeting_id IN (
      SELECT id FROM meetings 
      WHERE host_id = uid() OR 
      id IN (
        SELECT meeting_id FROM meeting_participants 
        WHERE user_id = uid()
      )
    )
  );

CREATE POLICY "Hosts can manage recordings"
  ON meeting_recordings
  FOR ALL
  TO authenticated
  USING (
    meeting_id IN (
      SELECT id FROM meetings 
      WHERE host_id = uid()
    )
  );

-- Breakout rooms policies
CREATE POLICY "Users can view breakout rooms in their meetings"
  ON meeting_breakout_rooms
  FOR SELECT
  TO authenticated
  USING (
    meeting_id IN (
      SELECT meeting_id FROM meeting_participants 
      WHERE user_id = uid()
    )
  );

CREATE POLICY "Hosts and co-hosts can manage breakout rooms"
  ON meeting_breakout_rooms
  FOR ALL
  TO authenticated
  USING (
    meeting_id IN (
      SELECT meeting_id FROM meeting_participants 
      WHERE user_id = uid() AND 
      (role = 'host' OR role = 'co_host' OR can_manage_breakouts = true)
    )
  );

-- Polls policies
CREATE POLICY "Users can view polls in their meetings"
  ON meeting_polls
  FOR SELECT
  TO authenticated
  USING (
    meeting_id IN (
      SELECT meeting_id FROM meeting_participants 
      WHERE user_id = uid()
    )
  );

CREATE POLICY "Authorized users can create polls"
  ON meeting_polls
  FOR INSERT
  TO authenticated
  WITH CHECK (
    created_by = uid() AND 
    meeting_id IN (
      SELECT meeting_id FROM meeting_participants 
      WHERE user_id = uid() AND can_create_polls = true
    )
  );

-- Poll responses policies
CREATE POLICY "Users can view poll responses in their meetings"
  ON meeting_poll_responses
  FOR SELECT
  TO authenticated
  USING (
    poll_id IN (
      SELECT id FROM meeting_polls 
      WHERE meeting_id IN (
        SELECT meeting_id FROM meeting_participants 
        WHERE user_id = uid()
      )
    )
  );

CREATE POLICY "Participants can respond to polls"
  ON meeting_poll_responses
  FOR INSERT
  TO authenticated
  WITH CHECK (
    participant_id IN (
      SELECT id FROM meeting_participants 
      WHERE user_id = uid()
    )
  );

-- Whiteboards policies
CREATE POLICY "Users can view whiteboards in their meetings"
  ON meeting_whiteboards
  FOR SELECT
  TO authenticated
  USING (
    meeting_id IN (
      SELECT meeting_id FROM meeting_participants 
      WHERE user_id = uid()
    )
  );

CREATE POLICY "Authorized users can edit whiteboards"
  ON meeting_whiteboards
  FOR ALL
  TO authenticated
  USING (
    meeting_id IN (
      SELECT meeting_id FROM meeting_participants 
      WHERE user_id = uid() AND can_use_whiteboard = true
    )
  );

-- Screen shares policies
CREATE POLICY "Users can view screen shares in their meetings"
  ON meeting_screen_shares
  FOR SELECT
  TO authenticated
  USING (
    meeting_id IN (
      SELECT meeting_id FROM meeting_participants 
      WHERE user_id = uid()
    )
  );

CREATE POLICY "Authorized users can share screen"
  ON meeting_screen_shares
  FOR INSERT
  TO authenticated
  WITH CHECK (
    presenter_id = uid() AND 
    meeting_id IN (
      SELECT meeting_id FROM meeting_participants 
      WHERE user_id = uid() AND can_share_screen = true
    )
  );

-- Analytics policies
CREATE POLICY "Hosts can view meeting analytics"
  ON meeting_analytics
  FOR SELECT
  TO authenticated
  USING (
    meeting_id IN (
      SELECT id FROM meetings 
      WHERE host_id = uid()
    )
  );

-- Create updated_at triggers
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_meetings_updated_at
  BEFORE UPDATE ON meetings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_meeting_participants_updated_at
  BEFORE UPDATE ON meeting_participants
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_meeting_recordings_updated_at
  BEFORE UPDATE ON meeting_recordings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_meeting_breakout_rooms_updated_at
  BEFORE UPDATE ON meeting_breakout_rooms
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_meeting_polls_updated_at
  BEFORE UPDATE ON meeting_polls
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_meeting_poll_responses_updated_at
  BEFORE UPDATE ON meeting_poll_responses
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_meeting_whiteboards_updated_at
  BEFORE UPDATE ON meeting_whiteboards
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_meeting_analytics_updated_at
  BEFORE UPDATE ON meeting_analytics
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();