import React, { useState } from 'react';
import { Building, Shield, Users, Globe, Zap, Bot, TrendingUp, Lock, Eye, Settings, Award, Target, Brain, Heart, Star, CheckCircle, AlertTriangle, BarChart3, PieChart, Activity, Database, Cloud, Smartphone, Monitor, Headphones } from 'lucide-react';

interface EnterpriseFeaturesProps {
  onClose: () => void;
}

export const EnterpriseFeatures: React.FC<EnterpriseFeaturesProps> = ({ onClose }) => {
  const [activeFeature, setActiveFeature] = useState<'security' | 'analytics' | 'compliance' | 'integration' | 'ai'>('security');

  const enterpriseMetrics = {
    totalUsers: 50000,
    activeTeams: 1250,
    dataProcessed: '2.4 PB',
    uptime: 99.99,
    securityScore: 98,
    complianceLevel: 100
  };

  const securityFeatures = [
    {
      name: 'Quantum Encryption',
      description: 'Military-grade quantum encryption for all communications',
      status: 'active',
      coverage: 100
    },
    {
      name: 'Zero Trust Architecture',
      description: 'Never trust, always verify security model',
      status: 'active',
      coverage: 100
    },
    {
      name: 'AI Threat Detection',
      description: 'Real-time threat monitoring and response',
      status: 'active',
      coverage: 98
    },
    {
      name: 'Biometric Authentication',
      description: 'Multi-factor biometric security',
      status: 'active',
      coverage: 95
    }
  ];

  const complianceStandards = [
    { name: 'SOC 2 Type II', status: 'certified', validUntil: '2051-12-31' },
    { name: 'ISO 27001', status: 'certified', validUntil: '2051-06-30' },
    { name: 'GDPR', status: 'compliant', validUntil: 'ongoing' },
    { name: 'HIPAA', status: 'certified', validUntil: '2051-09-15' },
    { name: 'FedRAMP', status: 'authorized', validUntil: '2051-03-20' },
    { name: 'PCI DSS', status: 'certified', validUntil: '2051-11-10' }
  ];

  const integrations = [
    { name: 'Microsoft 365', type: 'productivity', status: 'active', users: 15000 },
    { name: 'Google Workspace', type: 'productivity', status: 'active', users: 12000 },
    { name: 'Salesforce', type: 'crm', status: 'active', users: 8500 },
    { name: 'Slack Migration', type: 'communication', status: 'active', users: 25000 },
    { name: 'Zoom Replacement', type: 'meetings', status: 'active', users: 18000 },
    { name: 'SAP Integration', type: 'erp', status: 'active', users: 5000 }
  ];

  const aiCapabilities = [
    {
      name: 'Predictive Analytics',
      description: 'AI-powered insights for business decisions',
      accuracy: 94,
      usage: 'High'
    },
    {
      name: 'Sentiment Analysis',
      description: 'Real-time team mood and engagement tracking',
      accuracy: 91,
      usage: 'Medium'
    },
    {
      name: 'Content Moderation',
      description: 'Automated content filtering and safety',
      accuracy: 98,
      usage: 'High'
    },
    {
      name: 'Smart Scheduling',
      description: 'AI-optimized meeting and resource scheduling',
      accuracy: 89,
      usage: 'High'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
      case 'certified':
      case 'compliant':
      case 'authorized':
        return 'text-green-400 bg-green-600/20';
      case 'pending':
        return 'text-yellow-400 bg-yellow-600/20';
      case 'inactive':
      case 'expired':
        return 'text-red-400 bg-red-600/20';
      default:
        return 'text-gray-400 bg-gray-600/20';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-xl flex items-center justify-center z-50 p-4">
      <div className="w-full max-w-7xl h-full max-h-[95vh] bg-gradient-to-br from-blue-900/30 to-purple-900/30 backdrop-blur-xl rounded-2xl overflow-hidden shadow-2xl border border-blue-500/20">
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-blue-500/20 bg-black/30">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                <Building className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-white">Enterprise Command Center</h1>
                <p className="text-blue-300 text-sm">Advanced enterprise management for Linkverse 2050</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 sm:space-x-4">
              <div className="flex items-center space-x-2 bg-green-600/20 px-3 py-1 rounded-lg">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span className="text-green-400 text-xs sm:text-sm font-semibold">Enterprise Ready</span>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-white transition-colors"
              >
                ×
              </button>
            </div>
          </div>

          {/* Feature Navigation */}
          <div className="grid grid-cols-2 sm:flex sm:space-x-2 gap-2 sm:gap-0 mt-4 sm:mt-6">
            {[
              { id: 'security', label: 'Security', icon: Shield },
              { id: 'analytics', label: 'Analytics', icon: BarChart3 },
              { id: 'compliance', label: 'Compliance', icon: Award },
              { id: 'integration', label: 'Integration', icon: Globe },
              { id: 'ai', label: 'AI Features', icon: Bot }
            ].map((feature) => (
              <button
                key={feature.id}
                onClick={() => setActiveFeature(feature.id as any)}
                className={`flex items-center justify-center space-x-2 px-3 sm:px-4 py-2 rounded-lg transition-all ${
                  activeFeature === feature.id
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-400 hover:bg-blue-600/20 hover:text-white'
                }`}
              >
                <feature.icon className="w-4 h-4" />
                <span className="text-xs sm:text-sm">{feature.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {/* Enterprise Metrics Dashboard */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 mb-6 sm:mb-8">
            {Object.entries(enterpriseMetrics).map(([key, value]) => (
              <div key={key} className="bg-black/30 rounded-xl p-3 sm:p-4 border border-blue-500/20">
                <h3 className="text-blue-400 font-semibold capitalize text-xs sm:text-sm mb-1 sm:mb-2">
                  {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                </h3>
                <p className="text-lg sm:text-2xl font-bold text-white">{value}</p>
              </div>
            ))}
          </div>

          {/* Security Features */}
          {activeFeature === 'security' && (
            <div className="space-y-4 sm:space-y-6">
              <h2 className="text-xl sm:text-2xl font-bold text-white">Enterprise Security</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                {securityFeatures.map((feature, index) => (
                  <div key={index} className="bg-black/30 rounded-xl p-4 sm:p-6 border border-green-500/20">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-white mb-2">{feature.name}</h3>
                        <p className="text-sm text-gray-300">{feature.description}</p>
                      </div>
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${getStatusColor(feature.status)}`}>
                        {feature.status.toUpperCase()}
                      </span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Coverage:</span>
                        <span className="text-green-400 font-bold">{feature.coverage}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-green-500 to-cyan-500 h-2 rounded-full"
                          style={{ width: `${feature.coverage}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Compliance */}
          {activeFeature === 'compliance' && (
            <div className="space-y-4 sm:space-y-6">
              <h2 className="text-xl sm:text-2xl font-bold text-white">Compliance & Certifications</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {complianceStandards.map((standard, index) => (
                  <div key={index} className="bg-black/30 rounded-xl p-4 sm:p-6 border border-green-500/20">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-white">{standard.name}</h3>
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${getStatusColor(standard.status)}`}>
                        {standard.status.toUpperCase()}
                      </span>
                    </div>
                    <div className="text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400">Valid until:</span>
                        <span className="text-green-400">{standard.validUntil}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Analytics */}
          {activeFeature === 'analytics' && (
            <div className="space-y-4 sm:space-y-6">
              <h2 className="text-xl sm:text-2xl font-bold text-white">Enterprise Analytics</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                <div className="bg-black/30 rounded-xl p-4 sm:p-6 border border-blue-500/20">
                  <h3 className="font-semibold text-white mb-4">Usage Analytics</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Daily Active Users:</span>
                      <span className="text-blue-400 font-bold">45,230</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Messages Sent:</span>
                      <span className="text-green-400 font-bold">2.3M</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Meetings Hosted:</span>
                      <span className="text-purple-400 font-bold">15,670</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">AI Interactions:</span>
                      <span className="text-cyan-400 font-bold">890K</span>
                    </div>
                  </div>
                </div>

                <div className="bg-black/30 rounded-xl p-4 sm:p-6 border border-purple-500/20">
                  <h3 className="font-semibold text-white mb-4">Performance Metrics</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Response Time:</span>
                      <span className="text-green-400 font-bold">12ms</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Uptime:</span>
                      <span className="text-green-400 font-bold">99.99%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Data Throughput:</span>
                      <span className="text-blue-400 font-bold">50 GB/s</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">AI Processing:</span>
                      <span className="text-purple-400 font-bold">Real-time</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Integration */}
          {activeFeature === 'integration' && (
            <div className="space-y-4 sm:space-y-6">
              <h2 className="text-xl sm:text-2xl font-bold text-white">Enterprise Integrations</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {integrations.map((integration, index) => (
                  <div key={index} className="bg-black/30 rounded-xl p-4 sm:p-6 border border-blue-500/20">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-white">{integration.name}</h3>
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${getStatusColor(integration.status)}`}>
                        {integration.status.toUpperCase()}
                      </span>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400">Type:</span>
                        <span className="text-blue-400 capitalize">{integration.type}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400">Active Users:</span>
                        <span className="text-green-400">{integration.users.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* AI Features */}
          {activeFeature === 'ai' && (
            <div className="space-y-4 sm:space-y-6">
              <h2 className="text-xl sm:text-2xl font-bold text-white">Enterprise AI</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                {aiCapabilities.map((capability, index) => (
                  <div key={index} className="bg-black/30 rounded-xl p-4 sm:p-6 border border-purple-500/20">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-white mb-2">{capability.name}</h3>
                        <p className="text-sm text-gray-300">{capability.description}</p>
                      </div>
                      <Bot className="w-6 h-6 text-purple-400" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Accuracy:</span>
                        <span className="text-purple-400 font-bold">{capability.accuracy}%</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Usage:</span>
                        <span className="text-cyan-400">{capability.usage}</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                          style={{ width: `${capability.accuracy}%` }}
                        ></div>
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