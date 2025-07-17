import React, { useState } from 'react';
import { FileText, Users, Video, Share2, Edit3, MessageSquare, Calendar, Folder, Download, Upload, Eye, Lock, Globe, Zap, Bot, Brain } from 'lucide-react';

interface CollaborationToolsProps {
  onClose: () => void;
}

export const CollaborationTools: React.FC<CollaborationToolsProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<'documents' | 'whiteboard' | 'meetings' | 'files'>('documents');
  const [selectedDocument, setSelectedDocument] = useState<string | null>(null);

  const documents = [
    {
      id: '1',
      name: 'Project Roadmap 2050',
      type: 'document',
      collaborators: ['Sarah Chen', 'Marcus Rodriguez', 'Emily Davis'],
      lastModified: '2 min ago',
      status: 'editing',
      aiSuggestions: 3
    },
    {
      id: '2',
      name: 'Security Protocol Review',
      type: 'spreadsheet',
      collaborators: ['Vision AI', 'Security Team'],
      lastModified: '15 min ago',
      status: 'reviewing',
      aiSuggestions: 7
    },
    {
      id: '3',
      name: 'UI/UX Design Guidelines',
      type: 'presentation',
      collaborators: ['Design Team', 'Product Team'],
      lastModified: '1 hour ago',
      status: 'completed',
      aiSuggestions: 0
    }
  ];

  const whiteboardSessions = [
    {
      id: '1',
      name: 'Architecture Planning',
      participants: 8,
      status: 'active',
      duration: '45 min',
      aiInsights: 'High engagement detected'
    },
    {
      id: '2',
      name: 'Feature Brainstorming',
      participants: 12,
      status: 'scheduled',
      duration: 'Starts in 30 min',
      aiInsights: 'Optimal time for creativity'
    }
  ];

  const meetings = [
    {
      id: '1',
      title: 'Weekly Team Sync',
      time: '2:00 PM - 3:00 PM',
      participants: ['Team Alpha', 'Team Beta'],
      type: '3D Holographic',
      aiFeatures: ['Auto-transcription', 'Action items', 'Sentiment analysis']
    },
    {
      id: '2',
      title: 'Client Presentation',
      time: '4:00 PM - 5:00 PM',
      participants: ['Sales Team', 'External Clients'],
      type: 'AR Enhanced',
      aiFeatures: ['Real-time translation', 'Mood detection', 'Engagement metrics']
    }
  ];

  const files = [
    {
      id: '1',
      name: 'Q4_Report_2050.pdf',
      size: '2.4 MB',
      type: 'pdf',
      sharedWith: 15,
      aiProcessed: true,
      summary: 'Financial performance exceeded expectations by 23%'
    },
    {
      id: '2',
      name: 'Product_Demo_Video.mp4',
      size: '156 MB',
      type: 'video',
      sharedWith: 8,
      aiProcessed: true,
      summary: 'Auto-generated captions and highlights available'
    },
    {
      id: '3',
      name: 'Security_Audit_Results.xlsx',
      size: '890 KB',
      type: 'spreadsheet',
      sharedWith: 5,
      aiProcessed: true,
      summary: 'No critical vulnerabilities found, 3 minor issues identified'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'editing': return 'text-blue-400 bg-blue-600/20';
      case 'reviewing': return 'text-yellow-400 bg-yellow-600/20';
      case 'completed': return 'text-green-400 bg-green-600/20';
      case 'active': return 'text-green-400 bg-green-600/20';
      case 'scheduled': return 'text-blue-400 bg-blue-600/20';
      default: return 'text-gray-400 bg-gray-600/20';
    }
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf': return <FileText className="w-5 h-5 text-red-400" />;
      case 'video': return <Video className="w-5 h-5 text-purple-400" />;
      case 'spreadsheet': return <FileText className="w-5 h-5 text-green-400" />;
      default: return <FileText className="w-5 h-5 text-gray-400" />;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-xl flex items-center justify-center z-50 p-4">
      <div className="w-full max-w-7xl h-full max-h-[90vh] bg-gradient-to-br from-indigo-900/30 to-purple-900/30 backdrop-blur-xl rounded-2xl overflow-hidden shadow-2xl border border-indigo-500/20">
        {/* Header */}
        <div className="p-6 border-b border-indigo-500/20 bg-black/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Collaboration Hub</h1>
                <p className="text-indigo-300">Real-time collaboration with AI enhancement</p>
              </div>
            </div>
            
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-white transition-colors"
            >
              ×
            </button>
          </div>

          {/* Tab Navigation */}
          <div className="flex space-x-2 mt-6">
            {[
              { id: 'documents', label: 'Documents', icon: FileText },
              { id: 'whiteboard', label: 'Whiteboard', icon: Edit3 },
              { id: 'meetings', label: 'Meetings', icon: Video },
              { id: 'files', label: 'Files', icon: Folder }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                  activeTab === tab.id
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-400 hover:bg-indigo-600/20 hover:text-white'
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
          {/* Documents Tab */}
          {activeTab === 'documents' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-white">Collaborative Documents</h2>
                <button className="px-4 py-2 bg-indigo-600 rounded-lg text-white hover:bg-indigo-700 transition-colors flex items-center space-x-2">
                  <FileText className="w-4 h-4" />
                  <span>New Document</span>
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {documents.map((doc) => (
                  <div key={doc.id} className="bg-black/30 rounded-xl p-6 border border-indigo-500/20 hover:border-indigo-500/40 transition-colors cursor-pointer">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-white mb-2">{doc.name}</h3>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 rounded text-xs font-semibold ${getStatusColor(doc.status)}`}>
                            {doc.status.toUpperCase()}
                          </span>
                          {doc.aiSuggestions > 0 && (
                            <div className="flex items-center space-x-1 bg-purple-600/20 px-2 py-1 rounded">
                              <Bot className="w-3 h-3 text-purple-400" />
                              <span className="text-xs text-purple-400">{doc.aiSuggestions} AI suggestions</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <FileText className="w-6 h-6 text-indigo-400" />
                    </div>

                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-gray-400 mb-2">Collaborators:</p>
                        <div className="flex items-center space-x-2">
                          {doc.collaborators.slice(0, 3).map((collaborator, index) => (
                            <div key={index} className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                              {collaborator.split(' ').map(n => n[0]).join('')}
                            </div>
                          ))}
                          {doc.collaborators.length > 3 && (
                            <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center text-white text-xs">
                              +{doc.collaborators.length - 3}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Last modified: {doc.lastModified}</span>
                        <div className="flex items-center space-x-2">
                          <button className="p-1 text-gray-400 hover:text-white transition-colors">
                            <Share2 className="w-4 h-4" />
                          </button>
                          <button className="p-1 text-gray-400 hover:text-white transition-colors">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="p-1 text-gray-400 hover:text-white transition-colors">
                            <Edit3 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Whiteboard Tab */}
          {activeTab === 'whiteboard' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-white">Virtual Whiteboards</h2>
                <button className="px-4 py-2 bg-indigo-600 rounded-lg text-white hover:bg-indigo-700 transition-colors flex items-center space-x-2">
                  <Edit3 className="w-4 h-4" />
                  <span>New Whiteboard</span>
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {whiteboardSessions.map((session) => (
                  <div key={session.id} className="bg-black/30 rounded-xl p-6 border border-indigo-500/20">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-white mb-2">{session.name}</h3>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 rounded text-xs font-semibold ${getStatusColor(session.status)}`}>
                            {session.status.toUpperCase()}
                          </span>
                          <div className="flex items-center space-x-1 text-gray-400">
                            <Users className="w-3 h-3" />
                            <span className="text-xs">{session.participants} participants</span>
                          </div>
                        </div>
                      </div>
                      <Edit3 className="w-6 h-6 text-indigo-400" />
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Duration: {session.duration}</span>
                        <div className="flex items-center space-x-1 text-purple-400">
                          <Brain className="w-3 h-3" />
                          <span className="text-xs">{session.aiInsights}</span>
                        </div>
                      </div>

                      <div className="flex space-x-2">
                        <button className="flex-1 p-2 bg-indigo-600 rounded-lg text-white hover:bg-indigo-700 transition-colors text-sm">
                          Join Session
                        </button>
                        <button className="p-2 bg-gray-700 rounded-lg text-gray-300 hover:bg-gray-600 transition-colors">
                          <Share2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Whiteboard Features */}
              <div className="bg-black/30 rounded-xl p-6 border border-indigo-500/20">
                <h3 className="font-semibold text-white mb-4">Whiteboard Features</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center space-x-3 p-3 bg-gray-800/50 rounded-lg">
                    <Zap className="w-5 h-5 text-yellow-400" />
                    <div>
                      <p className="text-white font-medium">Real-time Sync</p>
                      <p className="text-xs text-gray-400">Instant collaboration</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-gray-800/50 rounded-lg">
                    <Bot className="w-5 h-5 text-purple-400" />
                    <div>
                      <p className="text-white font-medium">AI Assistance</p>
                      <p className="text-xs text-gray-400">Smart suggestions</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-gray-800/50 rounded-lg">
                    <Globe className="w-5 h-5 text-blue-400" />
                    <div>
                      <p className="text-white font-medium">AR Projection</p>
                      <p className="text-xs text-gray-400">3D visualization</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Meetings Tab */}
          {activeTab === 'meetings' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-white">Scheduled Meetings</h2>
                <button className="px-4 py-2 bg-indigo-600 rounded-lg text-white hover:bg-indigo-700 transition-colors flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>Schedule Meeting</span>
                </button>
              </div>

              <div className="space-y-4">
                {meetings.map((meeting) => (
                  <div key={meeting.id} className="bg-black/30 rounded-xl p-6 border border-indigo-500/20">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-white mb-2">{meeting.title}</h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-400">
                          <span>{meeting.time}</span>
                          <span className="flex items-center space-x-1">
                            <Users className="w-3 h-3" />
                            <span>{meeting.participants.join(', ')}</span>
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="px-3 py-1 bg-purple-600/20 text-purple-400 rounded-lg text-sm font-medium">
                          {meeting.type}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-gray-400 mb-2">AI Features:</p>
                        <div className="flex flex-wrap gap-2">
                          {meeting.aiFeatures.map((feature, index) => (
                            <span key={index} className="px-2 py-1 bg-blue-600/20 text-blue-400 rounded text-xs">
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex space-x-2">
                        <button className="flex-1 p-2 bg-green-600 rounded-lg text-white hover:bg-green-700 transition-colors text-sm">
                          Join Meeting
                        </button>
                        <button className="p-2 bg-gray-700 rounded-lg text-gray-300 hover:bg-gray-600 transition-colors">
                          <Calendar className="w-4 h-4" />
                        </button>
                        <button className="p-2 bg-gray-700 rounded-lg text-gray-300 hover:bg-gray-600 transition-colors">
                          <Share2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Files Tab */}
          {activeTab === 'files' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-white">Shared Files</h2>
                <div className="flex space-x-2">
                  <button className="px-4 py-2 bg-green-600 rounded-lg text-white hover:bg-green-700 transition-colors flex items-center space-x-2">
                    <Upload className="w-4 h-4" />
                    <span>Upload</span>
                  </button>
                  <button className="px-4 py-2 bg-indigo-600 rounded-lg text-white hover:bg-indigo-700 transition-colors flex items-center space-x-2">
                    <Folder className="w-4 h-4" />
                    <span>New Folder</span>
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                {files.map((file) => (
                  <div key={file.id} className="bg-black/30 rounded-xl p-6 border border-indigo-500/20 hover:border-indigo-500/40 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div className="p-3 bg-gray-800/50 rounded-lg">
                          {getFileIcon(file.type)}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-white mb-1">{file.name}</h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-400 mb-2">
                            <span>{file.size}</span>
                            <span className="flex items-center space-x-1">
                              <Users className="w-3 h-3" />
                              <span>Shared with {file.sharedWith} people</span>
                            </span>
                          </div>
                          {file.aiProcessed && (
                            <div className="bg-purple-600/20 border border-purple-500/30 rounded-lg p-3 mt-3">
                              <div className="flex items-center space-x-2 mb-2">
                                <Brain className="w-4 h-4 text-purple-400" />
                                <span className="text-purple-400 font-medium text-sm">AI Summary</span>
                              </div>
                              <p className="text-gray-300 text-sm">{file.summary}</p>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className="p-2 text-gray-400 hover:text-white transition-colors">
                          <Download className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-white transition-colors">
                          <Share2 className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-white transition-colors">
                          <Eye className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};