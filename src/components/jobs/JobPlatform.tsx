import React, { useState, useEffect } from 'react';
import { Briefcase, Users, TrendingUp, Brain, Zap, Globe, Star, MapPin, Clock, DollarSign, Award, Target, Search, Filter, Send, Video, Calendar, FileText, Building, User, Bot, Shield, Eye, Heart, MessageSquare, Share2, Bookmark, X } from 'lucide-react';

interface JobPlatformProps {
  onClose: () => void;
}

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'remote' | 'hybrid' | 'onsite' | 'metaverse' | 'space';
  salary: {
    min: number;
    max: number;
    currency: string;
    equity?: number;
  };
  skills: string[];
  experience: string;
  posted: string;
  applicants: number;
  aiMatch: number;
  verified: boolean;
  urgent: boolean;
  description: string;
  benefits: string[];
  aiInsights: string[];
}

interface Profile {
  id: string;
  name: string;
  title: string;
  company: string;
  location: string;
  avatar: string;
  skills: string[];
  experience: number;
  aiScore: number;
  verified: boolean;
  connections: number;
  posts: number;
  engagement: number;
}

export const JobPlatform: React.FC<JobPlatformProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<'jobs' | 'network' | 'profile' | 'ai-coach' | 'analytics'>('jobs');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  const [aiRecommendations, setAiRecommendations] = useState<Job[]>([]);
  const [networkSuggestions, setNetworkSuggestions] = useState<Profile[]>([]);
  const [showAICoach, setShowAICoach] = useState(false);

  const jobs: Job[] = [
    {
      id: '1',
      title: 'Senior Quantum AI Engineer',
      company: 'NeuroTech Industries',
      location: 'Mars Colony Alpha',
      type: 'remote',
      salary: { min: 250000, max: 400000, currency: 'USD', equity: 2.5 },
      skills: ['Quantum Computing', 'Neural Networks', 'Blockchain', 'AR/VR'],
      experience: '5-8 years',
      posted: '2 hours ago',
      applicants: 47,
      aiMatch: 94,
      verified: true,
      urgent: true,
      description: 'Lead quantum AI development for next-generation neural interfaces...',
      benefits: ['Quantum Health Insurance', 'Mars Travel Allowance', 'Neural Enhancement Package'],
      aiInsights: ['High growth potential', 'Excellent culture fit', 'Skill alignment: 94%']
    },
    {
      id: '2',
      title: 'Metaverse UX Designer',
      company: 'Virtual Worlds Corp',
      location: 'Global Remote',
      type: 'metaverse',
      salary: { min: 180000, max: 280000, currency: 'USD', equity: 1.8 },
      skills: ['3D Design', 'Holographic UI', 'Spatial Computing', 'AI-UX'],
      experience: '3-6 years',
      posted: '1 day ago',
      applicants: 123,
      aiMatch: 87,
      verified: true,
      urgent: false,
      description: 'Design immersive experiences for the next generation of virtual worlds...',
      benefits: ['VR Equipment Stipend', 'Creative Freedom', 'Global Team Collaboration'],
      aiInsights: ['Creative role match', 'Remote work preference', 'Growing industry']
    },
    {
      id: '3',
      title: 'Space Commerce Analyst',
      company: 'Galactic Trade Federation',
      location: 'Luna Station',
      type: 'space',
      salary: { min: 320000, max: 500000, currency: 'USD', equity: 3.2 },
      skills: ['Space Economics', 'AI Analytics', 'Interplanetary Trade', 'Quantum Finance'],
      experience: '7-10 years',
      posted: '3 days ago',
      applicants: 28,
      aiMatch: 76,
      verified: true,
      urgent: false,
      description: 'Analyze trade patterns across solar system commerce networks...',
      benefits: ['Zero-G Health Program', 'Interplanetary Travel', 'Quantum Pension'],
      aiInsights: ['Unique opportunity', 'High compensation', 'Future-focused role']
    }
  ];

  const profiles: Profile[] = [
    {
      id: '1',
      name: 'Dr. Sarah Quantum',
      title: 'Chief AI Architect',
      company: 'Quantum Dynamics',
      location: 'Silicon Valley, Earth',
      avatar: 'SQ',
      skills: ['Quantum AI', 'Neural Networks', 'Blockchain'],
      experience: 12,
      aiScore: 98,
      verified: true,
      connections: 15420,
      posts: 342,
      engagement: 89
    },
    {
      id: '2',
      name: 'Marcus Neuro',
      title: 'Metaverse Product Lead',
      company: 'Virtual Innovations',
      location: 'Neo Tokyo, Japan',
      avatar: 'MN',
      skills: ['VR/AR', 'Product Strategy', 'AI-UX'],
      experience: 8,
      aiScore: 92,
      verified: true,
      connections: 8750,
      posts: 156,
      engagement: 76
    },
    {
      id: '3',
      name: 'Luna Rodriguez',
      title: 'Space Commerce Director',
      company: 'Interstellar Corp',
      location: 'Mars Base One',
      avatar: 'LR',
      skills: ['Space Economics', 'AI Analytics', 'Leadership'],
      experience: 15,
      aiScore: 96,
      verified: true,
      connections: 12300,
      posts: 289,
      engagement: 84
    }
  ];

  const getJobTypeColor = (type: string) => {
    switch (type) {
      case 'remote': return 'text-green-400 bg-green-600/20';
      case 'hybrid': return 'text-blue-400 bg-blue-600/20';
      case 'onsite': return 'text-orange-400 bg-orange-600/20';
      case 'metaverse': return 'text-purple-400 bg-purple-600/20';
      case 'space': return 'text-cyan-400 bg-cyan-600/20';
      default: return 'text-gray-400 bg-gray-600/20';
    }
  };

  const getAIMatchColor = (score: number) => {
    if (score >= 90) return 'text-green-400';
    if (score >= 80) return 'text-blue-400';
    if (score >= 70) return 'text-yellow-400';
    return 'text-orange-400';
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-xl flex items-center justify-center z-50 p-4">
      <div className="w-full max-w-7xl h-full max-h-[95vh] bg-gradient-to-br from-blue-900/30 to-purple-900/30 backdrop-blur-xl rounded-2xl overflow-hidden shadow-2xl border border-blue-500/20">
        {/* Header */}
        <div className="p-6 border-b border-blue-500/20 bg-black/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Linkverse Jobs 2050</h1>
                <p className="text-blue-300">AI-powered professional networking beyond LinkedIn</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-green-600/20 px-3 py-1 rounded-lg">
                <Brain className="w-4 h-4 text-green-400" />
                <span className="text-green-400 text-sm font-semibold">AI Active</span>
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
              { id: 'jobs', label: 'AI Jobs', icon: Briefcase },
              { id: 'network', label: 'Neural Network', icon: Users },
              { id: 'profile', label: 'Quantum Profile', icon: User },
              { id: 'ai-coach', label: 'AI Career Coach', icon: Bot },
              { id: 'analytics', label: 'Career Analytics', icon: TrendingUp }
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

        <div className="flex h-full">
          {/* Main Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {/* Jobs Tab */}
            {activeTab === 'jobs' && (
              <div className="space-y-6">
                {/* Search and Filters */}
                <div className="flex items-center space-x-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search quantum jobs, metaverse roles, space careers..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-blue-500/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <button className="p-3 bg-blue-600 rounded-xl text-white hover:bg-blue-700 transition-colors">
                    <Filter className="w-5 h-5" />
                  </button>
                  <button className="p-3 bg-purple-600 rounded-xl text-white hover:bg-purple-700 transition-colors">
                    <Brain className="w-5 h-5" />
                  </button>
                </div>

                {/* AI Recommendations */}
                <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-xl p-4 border border-purple-500/30">
                  <div className="flex items-center space-x-2 mb-3">
                    <Bot className="w-5 h-5 text-purple-400" />
                    <span className="font-semibold text-white">AI Career Recommendations</span>
                  </div>
                  <p className="text-gray-300 text-sm">
                    Based on your quantum skills and neural patterns, I found 47 perfect matches in the metaverse and space commerce sectors.
                  </p>
                </div>

                {/* Job Listings */}
                <div className="space-y-4">
                  {jobs.map((job) => (
                    <div key={job.id} className="bg-black/30 rounded-xl p-6 border border-blue-500/20 hover:border-blue-500/40 transition-colors">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-xl font-bold text-white">{job.title}</h3>
                            {job.verified && <Shield className="w-5 h-5 text-green-400" />}
                            {job.urgent && (
                              <span className="px-2 py-1 bg-red-600/20 text-red-400 rounded text-xs font-semibold">
                                URGENT
                              </span>
                            )}
                          </div>
                          <div className="flex items-center space-x-4 text-gray-300 mb-3">
                            <div className="flex items-center space-x-1">
                              <Building className="w-4 h-4" />
                              <span>{job.company}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <MapPin className="w-4 h-4" />
                              <span>{job.location}</span>
                            </div>
                            <span className={`px-2 py-1 rounded text-xs font-semibold ${getJobTypeColor(job.type)}`}>
                              {job.type.toUpperCase()}
                            </span>
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-gray-400 mb-3">
                            <span>{job.experience}</span>
                            <span>{job.applicants} applicants</span>
                            <span>{job.posted}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-green-400 mb-1">
                            ${job.salary.min.toLocaleString()} - ${job.salary.max.toLocaleString()}
                          </div>
                          {job.salary.equity && (
                            <div className="text-sm text-purple-400">
                              + {job.salary.equity}% equity
                            </div>
                          )}
                          <div className={`text-lg font-bold mt-2 ${getAIMatchColor(job.aiMatch)}`}>
                            {job.aiMatch}% AI Match
                          </div>
                        </div>
                      </div>

                      {/* Skills */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {job.skills.map((skill, index) => (
                          <span key={index} className="px-3 py-1 bg-blue-600/20 text-blue-400 rounded-lg text-sm">
                            {skill}
                          </span>
                        ))}
                      </div>

                      {/* AI Insights */}
                      <div className="bg-gray-800/50 rounded-lg p-3 mb-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <Brain className="w-4 h-4 text-purple-400" />
                          <span className="font-medium text-white">AI Insights</span>
                        </div>
                        <div className="space-y-1">
                          {job.aiInsights.map((insight, index) => (
                            <div key={index} className="text-sm text-gray-300 flex items-center space-x-2">
                              <Zap className="w-3 h-3 text-yellow-400" />
                              <span>{insight}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center space-x-3">
                        <button className="flex-1 p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-white font-semibold hover:from-blue-700 hover:to-purple-700 transition-all">
                          Apply with AI
                        </button>
                        <button className="p-3 bg-gray-700 rounded-lg text-gray-300 hover:bg-gray-600 transition-colors">
                          <Bookmark className="w-5 h-5" />
                        </button>
                        <button className="p-3 bg-gray-700 rounded-lg text-gray-300 hover:bg-gray-600 transition-colors">
                          <Share2 className="w-5 h-5" />
                        </button>
                        <button className="p-3 bg-gray-700 rounded-lg text-gray-300 hover:bg-gray-600 transition-colors">
                          <MessageSquare className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Network Tab */}
            {activeTab === 'network' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-white">Neural Professional Network</h2>
                  <button className="px-4 py-2 bg-blue-600 rounded-lg text-white hover:bg-blue-700 transition-colors">
                    AI Networking
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {profiles.map((profile) => (
                    <div key={profile.id} className="bg-black/30 rounded-xl p-6 border border-blue-500/20 hover:border-blue-500/40 transition-colors">
                      <div className="text-center mb-4">
                        <div className="w-16 h-16 mx-auto bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg mb-3">
                          {profile.avatar}
                        </div>
                        <h3 className="font-bold text-white mb-1">{profile.name}</h3>
                        <p className="text-gray-300 text-sm mb-1">{profile.title}</p>
                        <p className="text-gray-400 text-xs">{profile.company}</p>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-400">AI Score:</span>
                          <span className={`font-bold ${getAIMatchColor(profile.aiScore)}`}>
                            {profile.aiScore}/100
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-400">Connections:</span>
                          <span className="text-blue-400">{profile.connections.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-400">Experience:</span>
                          <span className="text-green-400">{profile.experience} years</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1 my-4">
                        {profile.skills.slice(0, 3).map((skill, index) => (
                          <span key={index} className="px-2 py-1 bg-purple-600/20 text-purple-400 rounded text-xs">
                            {skill}
                          </span>
                        ))}
                      </div>

                      <div className="flex space-x-2">
                        <button className="flex-1 p-2 bg-blue-600 rounded-lg text-white hover:bg-blue-700 transition-colors text-sm">
                          Connect
                        </button>
                        <button className="p-2 bg-gray-700 rounded-lg text-gray-300 hover:bg-gray-600 transition-colors">
                          <MessageSquare className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* AI Coach Tab */}
            {activeTab === 'ai-coach' && (
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-xl p-6 border border-purple-500/30">
                  <div className="flex items-center space-x-3 mb-4">
                    <Bot className="w-8 h-8 text-purple-400" />
                    <div>
                      <h2 className="text-xl font-bold text-white">AI Career Coach</h2>
                      <p className="text-purple-300">Your personal quantum career advisor</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="bg-black/30 rounded-lg p-4">
                        <h3 className="font-semibold text-white mb-2">Career Path Analysis</h3>
                        <p className="text-gray-300 text-sm mb-3">
                          Based on your quantum skills, I recommend transitioning to space commerce or metaverse development.
                        </p>
                        <div className="flex items-center space-x-2">
                          <Target className="w-4 h-4 text-green-400" />
                          <span className="text-green-400 text-sm">94% success probability</span>
                        </div>
                      </div>
                      
                      <div className="bg-black/30 rounded-lg p-4">
                        <h3 className="font-semibold text-white mb-2">Skill Gap Analysis</h3>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-gray-300 text-sm">Quantum Computing</span>
                            <span className="text-green-400 text-sm">Expert</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-300 text-sm">Neural Interfaces</span>
                            <span className="text-yellow-400 text-sm">Intermediate</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-300 text-sm">Space Economics</span>
                            <span className="text-red-400 text-sm">Beginner</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="bg-black/30 rounded-lg p-4">
                        <h3 className="font-semibold text-white mb-2">Salary Optimization</h3>
                        <p className="text-gray-300 text-sm mb-3">
                          Your current market value: $280K - $420K
                        </p>
                        <p className="text-green-400 text-sm">
                          +35% increase potential with space commerce certification
                        </p>
                      </div>
                      
                      <div className="bg-black/30 rounded-lg p-4">
                        <h3 className="font-semibold text-white mb-2">Network Recommendations</h3>
                        <p className="text-gray-300 text-sm mb-3">
                          Connect with 12 quantum AI leaders for optimal career growth
                        </p>
                        <button className="w-full p-2 bg-blue-600 rounded-lg text-white hover:bg-blue-700 transition-colors text-sm">
                          Auto-Connect with AI
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="w-80 bg-black/30 border-l border-blue-500/20 p-6">
            <div className="space-y-6">
              {/* Quick Stats */}
              <div className="bg-gray-800/50 rounded-lg p-4">
                <h3 className="font-semibold text-white mb-3">Your AI Profile</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">AI Match Score:</span>
                    <span className="text-green-400 font-bold">94/100</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Profile Views:</span>
                    <span className="text-blue-400">1,247</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Job Matches:</span>
                    <span className="text-purple-400">47</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Network Growth:</span>
                    <span className="text-green-400">+23%</span>
                  </div>
                </div>
              </div>

              {/* AI Recommendations */}
              <div className="bg-gray-800/50 rounded-lg p-4">
                <h3 className="font-semibold text-white mb-3">AI Recommendations</h3>
                <div className="space-y-3">
                  <div className="flex items-start space-x-2">
                    <Brain className="w-4 h-4 text-purple-400 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-300">Update your quantum computing skills</p>
                      <p className="text-xs text-gray-500">+15% job match improvement</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Users className="w-4 h-4 text-blue-400 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-300">Connect with 5 space industry leaders</p>
                      <p className="text-xs text-gray-500">Expand your network reach</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Star className="w-4 h-4 text-yellow-400 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-300">Get certified in neural interfaces</p>
                      <p className="text-xs text-gray-500">Unlock 23 new opportunities</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Trending Skills */}
              <div className="bg-gray-800/50 rounded-lg p-4">
                <h3 className="font-semibold text-white mb-3">Trending Skills 2050</h3>
                <div className="space-y-2">
                  {[
                    { skill: 'Quantum AI', growth: '+156%' },
                    { skill: 'Neural Interfaces', growth: '+134%' },
                    { skill: 'Space Commerce', growth: '+98%' },
                    { skill: 'Metaverse Design', growth: '+87%' },
                    { skill: 'Holographic UI', growth: '+76%' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-gray-300 text-sm">{item.skill}</span>
                      <span className="text-green-400 text-xs font-semibold">{item.growth}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};