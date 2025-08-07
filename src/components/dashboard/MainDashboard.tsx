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
import { RevolutionaryMeeting2050 } from '../meetings/RevolutionaryMeeting2050';
import { useAuth } from '../../contexts/AuthContext';

export const MainDashboard: React.FC = () => {
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showLiveStream, setShowLiveStream] = useState(false);
  const [showAI, setShowAI] = useState(false);
  const [showSecurity, setShowSecurity] = useState(false);
  const [showComprehensiveAI, setShowComprehensiveAI] = useState(false);
  const [showCollaboration, setShowCollaboration] = useState(false);
  const [showMaps, setShowMaps] = useState(false);
  const [showJobs, setShowJobs] = useState(false);
  const [showHR, setShowHR] = useState(false);
  const [showRevolutionaryMeeting, setShowRevolutionaryMeeting] = useState(false);
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800">
      <div className="flex flex-col lg:flex-row h-screen">
        {/* Sidebar */}
        <div className="lg:flex-shrink-0">
          <Sidebar 
            onShowLiveStream={() => setShowLiveStream(true)}
            onShowAI={() => setShowAI(true)}
            onShowSecurity={() => setShowSecurity(true)}
            onShowComprehensiveAI={() => setShowComprehensiveAI(true)}
            onShowMaps={() => setShowMaps(true)}
            onShowJobs={() => setShowJobs(true)}
            onShowHR={() => setShowHR(true)}
            onShowRevolutionaryMeeting={() => setShowRevolutionaryMeeting(true)}
          />
        </div>

        <div className="flex flex-1 min-h-0">
          {/* Chat List */}
          <div className={`${activeChat ? 'hidden lg:block' : 'block'} lg:flex-shrink-0`}>
            <ChatList 
              onSelectChat={setActiveChat}
              activeChat={activeChat}
            />
          </div>

          {/* Main Chat Window */}
          <div className="flex-1 min-w-0">
            <EnhancedChatWindow 
              activeChat={activeChat}
              onStartLiveStream={() => setShowLiveStream(true)}
              onOpenCollaboration={() => setShowCollaboration(true)}
              onBack={() => setActiveChat(null)}
            />
          </div>
        </div>

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
        
        {showRevolutionaryMeeting && (
          <RevolutionaryMeeting2050 
            meetingId="quantum-meeting-2050"
            onClose={() => setShowRevolutionaryMeeting(false)} 
          />
        )}
      </div>
    </div>
  );
};