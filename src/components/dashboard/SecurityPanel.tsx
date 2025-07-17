import React, { useState } from 'react';
import { X, Shield, Lock, Eye, Fingerprint, Smartphone, Globe, AlertTriangle, CheckCircle, Settings, Key, Zap, Bot, Scan, Monitor, Activity } from 'lucide-react';
import { SpywareDetection } from '../security/SpywareDetection';
import { MultiLanguageSupport } from '../language/MultiLanguageSupport';

interface SecurityPanelProps {
  onClose: () => void;
}

export const SecurityPanel: React.FC<SecurityPanelProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'encryption' | 'biometric' | 'monitoring' | 'privacy'>('overview');
  const [quantumLevel, setQuantumLevel] = useState(85);
  const [biometricEnabled, setBiometricEnabled] = useState(true);
  const [geoLock, setGeoLock] = useState(true);
  const [stealthMode, setStealthMode] = useState(false);
  const [aiMonitoring, setAiMonitoring] = useState(true);
  const [currentLanguage, setCurrentLanguage] = useState('en');

  const securityMetrics = {
    encryptionStrength: 98,
    threatProtection: 94,
    privacyScore: 91,
    biometricSecurity: 96,
    quantumResistance: 88
  };

  const threats = [
    {
      id: '1',
      type: 'Phishing Attempt',
      severity: 'medium',
      time: '2 min ago',
      status: 'blocked',
      description: 'Suspicious link detected in message from unknown sender'
    },
    {
      id: '2',
      type: 'Unauthorized Access',
      severity: 'high',
      time: '1 hour ago',
      status: 'blocked',
      description: 'Login attempt from unrecognized device in different country'
    },
    {
      id: '3',
      type: 'Content Scanning',
      severity: 'low',
      time: '3 hours ago',
      status: 'quarantined',
      description: 'Inappropriate content detected and quarantined by AI'
    }
  ];

  const securityLogs = [
    {
      id: '1',
      action: 'Quantum encryption key rotated',
      time: '5 min ago',
      status: 'success'
    },
    {
      id: '2',
      action: 'Biometric authentication successful',
      time: '1 hour ago',
      status: 'success'
    },
    {
      id: '3',
      action: 'AI behavior analysis completed',
      time: '2 hours ago',
      status: 'success'
    },
    {
      id: '4',
      action: 'Geo-location verification',
      time: '4 hours ago',
      status: 'success'
    }
  ];

  const getMetricColor = (value: number) => {
    if (value >= 95) return 'text-green-400';
    if (value >= 85) return 'text-blue-400';
    if (value >= 75) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getMetricBarColor = (value: number) => {
    if (value >= 95) return 'bg-green-500';
    if (value >= 85) return 'bg-blue-500';
    if (value >= 75) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'text-red-400 bg-red-600/20';
      case 'medium': return 'text-yellow-400 bg-yellow-600/20';
      case 'low': return 'text-green-400 bg-green-600/20';
      default: return 'text-gray-400 bg-gray-600/20';
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Shield },
    { id: 'spyware', label: 'Anti-Spyware', icon: Scan },
    { id: 'encryption', label: 'Encryption', icon: Lock },
    { id: 'biometric', label: 'Biometric', icon: Fingerprint },
    { id: 'monitoring', label: 'Monitoring', icon: Monitor },
    { id: 'privacy', label: 'Privacy', icon: Eye },
    { id: 'language', label: 'Languages', icon: Globe }
  ];

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-xl flex items-center justify-center z-50 p-4">
      <div className="w-full max-w-6xl h-full max-h-[90vh] bg-gradient-to-br from-green-900/30 to-blue-900/30 backdrop-blur-xl rounded-2xl overflow-hidden shadow-2xl border border-green-500/20">
        {/* Header */}
        <div className="p-6 border-b border-green-500/20 bg-black/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Security Command Center</h1>
                <p className="text-green-300">Quantum-grade protection for 2050</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-green-600/20 px-4 py-2 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="text-green-400 font-semibold">All Systems Secure</span>
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
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                  activeTab === tab.id
                    ? 'bg-green-600 text-white'
                    : 'text-gray-400 hover:bg-green-600/20 hover:text-white'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex h-full">
          {/* Main Content */}
          <div className="flex-1 p-6 overflow-y-auto">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Security Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Object.entries(securityMetrics).map(([key, value]) => (
                    <div key={key} className="bg-black/30 rounded-xl p-4 border border-green-500/20">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-white font-semibold capitalize">
                          {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                        </h3>
                        <span className={`text-lg font-bold ${getMetricColor(value)}`}>
                          {value}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${getMetricBarColor(value)}`}
                          style={{ width: `${value}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Threat Detection */}
                <div className="bg-black/30 rounded-xl p-6 border border-green-500/20">
                  <h2 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
                    <AlertTriangle className="w-6 h-6 text-yellow-400" />
                    <span>Recent Threats</span>
                  </h2>
                  <div className="space-y-3">
                    {threats.map((threat) => (
                      <div key={threat.id} className="flex items-start space-x-4 p-4 bg-gray-800/50 rounded-lg">
                        <div className={`px-2 py-1 rounded text-xs font-semibold ${getSeverityColor(threat.severity)}`}>
                          {threat.severity.toUpperCase()}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-semibold text-white">{threat.type}</h4>
                            <span className="text-xs text-gray-400">{threat.time}</span>
                          </div>
                          <p className="text-gray-300 text-sm mt-1">{threat.description}</p>
                          <div className="flex items-center space-x-2 mt-2">
                            <CheckCircle className="w-4 h-4 text-green-400" />
                            <span className="text-green-400 text-sm">Blocked by AI</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Encryption Tab */}
            {activeTab === 'encryption' && (
              <div className="space-y-6">
                <div className="bg-black/30 rounded-xl p-6 border border-blue-500/20">
                  <h2 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
                    <Lock className="w-6 h-6 text-blue-400" />
                    <span>Quantum Encryption Status</span>
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-white">Quantum Level</span>
                        <span className="text-blue-400 font-bold">{quantumLevel}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-3">
                        <div
                          className="h-3 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500"
                          style={{ width: `${quantumLevel}%` }}
                        ></div>
                      </div>
                      
                      <div className="space-y-3 mt-6">
                        <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                          <span className="text-gray-300">Key Rotation</span>
                          <CheckCircle className="w-5 h-5 text-green-400" />
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                          <span className="text-gray-300">End-to-End Encryption</span>
                          <CheckCircle className="w-5 h-5 text-green-400" />
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                          <span className="text-gray-300">Zero-Knowledge Proof</span>
                          <CheckCircle className="w-5 h-5 text-green-400" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-lg p-4 border border-blue-500/30">
                      <h3 className="font-semibold text-white mb-3">Encryption Details</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-300">Algorithm:</span>
                          <span className="text-blue-400">AES-256-GCM + Quantum</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-300">Key Length:</span>
                          <span className="text-blue-400">4096-bit</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-300">Last Rotation:</span>
                          <span className="text-blue-400">5 min ago</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-300">Quantum Safe:</span>
                          <span className="text-green-400">Yes</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Biometric Tab */}
            {activeTab === 'biometric' && (
              <div className="space-y-6">
                <div className="bg-black/30 rounded-xl p-6 border border-purple-500/20">
                  <h2 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
                    <Fingerprint className="w-6 h-6 text-purple-400" />
                    <span>Biometric Security</span>
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-lg p-4 border border-purple-500/30">
                      <div className="flex items-center space-x-3 mb-3">
                        <Fingerprint className="w-8 h-8 text-purple-400" />
                        <div>
                          <h3 className="font-semibold text-white">Fingerprint</h3>
                          <p className="text-sm text-gray-400">5 registered</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-green-400 text-sm">Active</span>
                        <CheckCircle className="w-5 h-5 text-green-400" />
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-lg p-4 border border-blue-500/30">
                      <div className="flex items-center space-x-3 mb-3">
                        <Eye className="w-8 h-8 text-blue-400" />
                        <div>
                          <h3 className="font-semibold text-white">Face ID</h3>
                          <p className="text-sm text-gray-400">2 profiles</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-green-400 text-sm">Active</span>
                        <CheckCircle className="w-5 h-5 text-green-400" />
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-r from-green-600/20 to-teal-600/20 rounded-lg p-4 border border-green-500/30">
                      <div className="flex items-center space-x-3 mb-3">
                        <Scan className="w-8 h-8 text-green-400" />
                        <div>
                          <h3 className="font-semibold text-white">Voice Print</h3>
                          <p className="text-sm text-gray-400">1 profile</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-green-400 text-sm">Active</span>
                        <CheckCircle className="w-5 h-5 text-green-400" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 space-y-3">
                    <label className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg cursor-pointer">
                      <div>
                        <span className="text-white font-medium">Multi-factor Authentication</span>
                        <p className="text-sm text-gray-400">Require multiple biometric confirmations</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={biometricEnabled}
                        onChange={(e) => setBiometricEnabled(e.target.checked)}
                        className="sr-only"
                      />
                      <div className={`w-12 h-6 rounded-full ${biometricEnabled ? 'bg-purple-600' : 'bg-gray-600'}`}>
                        <div className={`w-5 h-5 rounded-full bg-white transition-transform ${biometricEnabled ? 'translate-x-6' : 'translate-x-1'} mt-0.5`}></div>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Monitoring Tab */}
            {activeTab === 'monitoring' && (
              <div className="space-y-6">
                <div className="bg-black/30 rounded-xl p-6 border border-orange-500/20">
                  <h2 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
                    <Activity className="w-6 h-6 text-orange-400" />
                    <span>AI Behavior Monitoring</span>
                  </h2>
                  
                  <div className="space-y-4">
                    <label className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg cursor-pointer">
                      <div>
                        <span className="text-white font-medium">Real-time Threat Detection</span>
                        <p className="text-sm text-gray-400">AI monitors for suspicious behavior patterns</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={aiMonitoring}
                        onChange={(e) => setAiMonitoring(e.target.checked)}
                        className="sr-only"
                      />
                      <div className={`w-12 h-6 rounded-full ${aiMonitoring ? 'bg-orange-600' : 'bg-gray-600'}`}>
                        <div className={`w-5 h-5 rounded-full bg-white transition-transform ${aiMonitoring ? 'translate-x-6' : 'translate-x-1'} mt-0.5`}></div>
                      </div>
                    </label>
                    
                    <label className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg cursor-pointer">
                      <div>
                        <span className="text-white font-medium">Geo-location Lock</span>
                        <p className="text-sm text-gray-400">Restrict access to approved locations</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={geoLock}
                        onChange={(e) => setGeoLock(e.target.checked)}
                        className="sr-only"
                      />
                      <div className={`w-12 h-6 rounded-full ${geoLock ? 'bg-orange-600' : 'bg-gray-600'}`}>
                        <div className={`w-5 h-5 rounded-full bg-white transition-transform ${geoLock ? 'translate-x-6' : 'translate-x-1'} mt-0.5`}></div>
                      </div>
                    </label>
                  </div>
                  
                  <div className="mt-6">
                    <h3 className="font-semibold text-white mb-3">Security Activity Log</h3>
                    <div className="space-y-2">
                      {securityLogs.map((log) => (
                        <div key={log.id} className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <CheckCircle className="w-4 h-4 text-green-400" />
                            <span className="text-gray-300">{log.action}</span>
                          </div>
                          <span className="text-xs text-gray-400">{log.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Privacy Tab */}
            {activeTab === 'privacy' && (
              <div className="space-y-6">
                <div className="bg-black/30 rounded-xl p-6 border border-cyan-500/20">
                  <h2 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
                    <Eye className="w-6 h-6 text-cyan-400" />
                    <span>Privacy Controls</span>
                  </h2>
                  
                  <div className="space-y-4">
                    <label className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg cursor-pointer">
                      <div>
                        <span className="text-white font-medium">Stealth Mode</span>
                        <p className="text-sm text-gray-400">Hide online status and activity</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={stealthMode}
                        onChange={(e) => setStealthMode(e.target.checked)}
                        className="sr-only"
                      />
                      <div className={`w-12 h-6 rounded-full ${stealthMode ? 'bg-cyan-600' : 'bg-gray-600'}`}>
                        <div className={`w-5 h-5 rounded-full bg-white transition-transform ${stealthMode ? 'translate-x-6' : 'translate-x-1'} mt-0.5`}></div>
                      </div>
                    </label>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-gradient-to-r from-cyan-600/20 to-blue-600/20 rounded-lg p-4 border border-cyan-500/30">
                        <h3 className="font-semibold text-white mb-2">Data Retention</h3>
                        <p className="text-sm text-gray-300 mb-3">Messages auto-delete after 30 days</p>
                        <button className="text-cyan-400 text-sm hover:text-cyan-300">Configure</button>
                      </div>
                      
                      <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-lg p-4 border border-purple-500/30">
                        <h3 className="font-semibold text-white mb-2">Anonymous Mode</h3>
                        <p className="text-sm text-gray-300 mb-3">Zero metadata tracking</p>
                        <button className="text-purple-400 text-sm hover:text-purple-300">Enable</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          {/* Language Tab */}
          {activeTab === 'language' && (
            <div className="space-y-6">
              <MultiLanguageSupport
                currentLanguage={currentLanguage}
                onLanguageChange={(language) => {
                  setCurrentLanguage(language);
                  console.log('Language changed to:', language);
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};