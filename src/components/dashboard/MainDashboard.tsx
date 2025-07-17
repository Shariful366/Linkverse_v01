import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { ChatList } from './ChatList';
import { EnhancedChatWindow } from './EnhancedChatWindow';
import { LiveStreamModal } from './LiveStreamModal';
import { AIAssistant } from './AIAssistant';
import { SecurityPanel } from './SecurityPanel';
import { ComprehensiveAISupport } from '../ai/ComprehensiveAISupport';
import { CollaborationTools } from '../collaboration/CollaborationTools';
import { QuantumMaps } from '../mapping/QuantumMaps';
import { JobPlatform } from '../jobs/JobPlatform';
import { HRTools } from '../hr/HRTools';
import { MeetingPlatform } from '../meetings/MeetingPlatform';
import { useAuth } from '../../contexts/AuthContext';

export const MainDashboard: React.FC = () => {
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [showLiveStream, setShowLiveStream] = useState(false);
  const [showAI, setShowAI] = useState(false);
  const [showSecurity, setShowSecurity] = useState(false);
  const [showComprehensiveAI, setShowComprehensiveAI] = useState(false);
  const [showCollaboration, setShowCollaboration] = useState(false);
  const [showMaps, setShowMaps] = useState(false);
  const [showJobs, setShowJobs] = useState(false);
  const [showHR, setShowHR] = useState(false);
  const [showMeetings, setShowMeetings] = useState(false);
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800">
      <div className="flex h-screen">
        {/* Sidebar */}
        <Sidebar 
          onShowLiveStream={() => setShowLiveStream(true)}
          onShowAI={() => setShowAI(true)}
          onShowSecurity={() => setShowSecurity(true)}
          onShowComprehensiveAI={() => setShowComprehensiveAI(true)}
          onShowMaps={() => setShowMaps(true)}
          onShowJobs={() => setShowJobs(true)}
          onShowHR={() => setShowHR(true)}
          onShowMeetings={() => setShowMeetings(true)}
        />

        {/* Chat List */}
        <ChatList 
          onSelectChat={setActiveChat}
          activeChat={activeChat}
        />

        {/* Main Chat Window */}
        <EnhancedChatWindow 
          activeChat={activeChat}
          onStartLiveStream={() => setShowLiveStream(true)}
          onOpenCollaboration={() => setShowCollaboration(true)}
        />

        {/* Modals */}
        {showLiveStream && (
          <LiveStreamModal onClose={() => setShowLiveStream(false)} />
        )}
        
        {showAI && (
          <AIAssistant onClose={() => setShowAI(false)} />
        )}
        
        {showSecurity && (
          <SecurityPanel onClose={() => setShowSecurity(false)} />
        )}
        
        {showComprehensiveAI && (
          <ComprehensiveAISupport onClose={() => setShowComprehensiveAI(false)} />
        )}
        
        {showCollaboration && (
          <CollaborationTools onClose={() => setShowCollaboration(false)} />
        )}
        
        {showMaps && (
          <QuantumMaps onClose={() => setShowMaps(false)} />
        )}
        
        {showJobs && (
          <JobPlatform onClose={() => setShowJobs(false)} />
        )}
        
        {showHR && (
          <HRTools onClose={() => setShowHR(false)} />
        )}
        
        {showMeetings && (
          <MeetingPlatform onClose={() => setShowMeetings(false)} />
        )}
      </div>
    </div>
  );
};