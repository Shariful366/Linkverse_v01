import React, { useState, useEffect } from 'react';
import { Shield, AlertTriangle, Scan, Zap, Bot, Eye, Lock, Smartphone, Wifi, Database, Activity, CheckCircle, X, Brain, Globe } from 'lucide-react';

interface SpywareDetectionProps {
  onThreatDetected: (threat: ThreatInfo) => void;
}

interface ThreatInfo {
  id: string;
  type: 'pegasus' | 'stalkerware' | 'keylogger' | 'network_intrusion' | 'data_exfiltration';
  severity: 'critical' | 'high' | 'medium' | 'low';
  description: string;
  source: string;
  timestamp: string;
  blocked: boolean;
  aiConfidence: number;
}

export const SpywareDetection: React.FC<SpywareDetectionProps> = ({ onThreatDetected }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [detectedThreats, setDetectedThreats] = useState<ThreatInfo[]>([]);
  const [realTimeProtection, setRealTimeProtection] = useState(true);
  const [quantumShield, setQuantumShield] = useState(true);
  const [behaviorAnalysis, setBehaviorAnalysis] = useState(true);

  const scanLayers = [
    'Initializing quantum threat scanner...',
    'Scanning for Pegasus spyware signatures...',
    'Detecting zero-day exploits...',
    'Analyzing network traffic patterns...',
    'Checking for unauthorized data access...',
    'Scanning memory for malicious code...',
    'Verifying system integrity...',
    'Analyzing behavioral patterns...',
    'Checking for remote access tools...',
    'Finalizing threat assessment...'
  ];

  useEffect(() => {
    // Continuous real-time monitoring
    if (realTimeProtection) {
      const interval = setInterval(() => {
        performRealTimeCheck();
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [realTimeProtection]);

  const performRealTimeCheck = () => {
    // Simulate real-time threat detection
    const threatChance = Math.random();
    
    if (threatChance < 0.02) { // 2% chance of detecting a threat
      const threats = [
        {
          type: 'pegasus' as const,
          description: 'Pegasus spyware attempt blocked - Zero-click exploit detected',
          source: 'Network Traffic Analysis',
          severity: 'critical' as const
        },
        {
          type: 'stalkerware' as const,
          description: 'Stalkerware installation attempt prevented',
          source: 'Behavioral Analysis',
          severity: 'high' as const
        },
        {
          type: 'keylogger' as const,
          description: 'Keylogger activity detected and neutralized',
          source: 'Memory Scanner',
          severity: 'medium' as const
        },
        {
          type: 'network_intrusion' as const,
          description: 'Unauthorized network access attempt blocked',
          source: 'Network Monitor',
          severity: 'high' as const
        },
        {
          type: 'data_exfiltration' as const,
          description: 'Data exfiltration attempt prevented',
          source: 'Data Flow Monitor',
          severity: 'critical' as const
        }
      ];

      const randomThreat = threats[Math.floor(Math.random() * threats.length)];
      const newThreat: ThreatInfo = {
        id: Date.now().toString(),
        ...randomThreat,
        timestamp: new Date().toLocaleTimeString(),
        blocked: true,
        aiConfidence: 95 + Math.random() * 5
      };

      setDetectedThreats(prev => [newThreat, ...prev.slice(0, 9)]);
      onThreatDetected(newThreat);
    }
  };

  const performFullScan = async () => {
    setIsScanning(true);
    setScanProgress(0);

    for (let i = 0; i < scanLayers.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 800));
      setScanProgress(((i + 1) / scanLayers.length) * 100);
    }

    // Simulate finding threats during full scan
    const foundThreats = Math.floor(Math.random() * 3);
    for (let i = 0; i < foundThreats; i++) {
      await new Promise(resolve => setTimeout(resolve, 500));
      performRealTimeCheck();
    }

    setIsScanning(false);
  };

  const getThreatColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-400 bg-red-600/20 border-red-500/30';
      case 'high': return 'text-orange-400 bg-orange-600/20 border-orange-500/30';
      case 'medium': return 'text-yellow-400 bg-yellow-600/20 border-yellow-500/30';
      case 'low': return 'text-green-400 bg-green-600/20 border-green-500/30';
      default: return 'text-gray-400 bg-gray-600/20 border-gray-500/30';
    }
  };

  const getThreatIcon = (type: string) => {
    switch (type) {
      case 'pegasus': return <Smartphone className="w-5 h-5 text-red-400" />;
      case 'stalkerware': return <Eye className="w-5 h-5 text-orange-400" />;
      case 'keylogger': return <Activity className="w-5 h-5 text-yellow-400" />;
      case 'network_intrusion': return <Wifi className="w-5 h-5 text-purple-400" />;
      case 'data_exfiltration': return <Database className="w-5 h-5 text-red-400" />;
      default: return <AlertTriangle className="w-5 h-5 text-gray-400" />;
    }
  };

  return (
    <div className="bg-black/30 rounded-xl p-6 border border-red-500/20">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-orange-500 rounded-xl flex items-center justify-center">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Anti-Spyware Protection</h2>
            <p className="text-red-300">Advanced Pegasus & Stalkerware Detection</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {realTimeProtection && (
            <div className="flex items-center space-x-2 bg-green-600/20 px-3 py-1 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-green-400 text-sm font-semibold">Active Protection</span>
            </div>
          )}
        </div>
      </div>

      {/* Protection Status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gray-800/50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-white font-medium">Real-time Protection</span>
            <input
              type="checkbox"
              checked={realTimeProtection}
              onChange={(e) => setRealTimeProtection(e.target.checked)}
              className="sr-only"
            />
            <div className={`w-10 h-5 rounded-full ${realTimeProtection ? 'bg-green-600' : 'bg-gray-600'}`}>
              <div className={`w-4 h-4 rounded-full bg-white transition-transform ${realTimeProtection ? 'translate-x-5' : 'translate-x-0.5'} mt-0.5`}></div>
            </div>
          </div>
          <p className="text-xs text-gray-400">Continuous monitoring for threats</p>
        </div>

        <div className="bg-gray-800/50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-white font-medium">Quantum Shield</span>
            <input
              type="checkbox"
              checked={quantumShield}
              onChange={(e) => setQuantumShield(e.target.checked)}
              className="sr-only"
            />
            <div className={`w-10 h-5 rounded-full ${quantumShield ? 'bg-blue-600' : 'bg-gray-600'}`}>
              <div className={`w-4 h-4 rounded-full bg-white transition-transform ${quantumShield ? 'translate-x-5' : 'translate-x-0.5'} mt-0.5`}></div>
            </div>
          </div>
          <p className="text-xs text-gray-400">Quantum-level encryption protection</p>
        </div>

        <div className="bg-gray-800/50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-white font-medium">Behavior Analysis</span>
            <input
              type="checkbox"
              checked={behaviorAnalysis}
              onChange={(e) => setBehaviorAnalysis(e.target.checked)}
              className="sr-only"
            />
            <div className={`w-10 h-5 rounded-full ${behaviorAnalysis ? 'bg-purple-600' : 'bg-gray-600'}`}>
              <div className={`w-4 h-4 rounded-full bg-white transition-transform ${behaviorAnalysis ? 'translate-x-5' : 'translate-x-0.5'} mt-0.5`}></div>
            </div>
          </div>
          <p className="text-xs text-gray-400">AI-powered behavior monitoring</p>
        </div>
      </div>

      {/* Scan Controls */}
      <div className="flex items-center space-x-4 mb-6">
        <button
          onClick={performFullScan}
          disabled={isScanning}
          className="flex-1 p-3 bg-gradient-to-r from-red-600 to-orange-600 rounded-lg text-white font-semibold hover:from-red-700 hover:to-orange-700 transition-all disabled:opacity-50"
        >
          {isScanning ? (
            <div className="flex items-center justify-center space-x-2">
              <Scan className="w-5 h-5 animate-spin" />
              <span>Scanning...</span>
            </div>
          ) : (
            <div className="flex items-center justify-center space-x-2">
              <Scan className="w-5 h-5" />
              <span>Full System Scan</span>
            </div>
          )}
        </button>
      </div>

      {/* Scan Progress */}
      {isScanning && (
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-white font-medium">Scanning Progress</span>
            <span className="text-red-400 font-bold">{scanProgress.toFixed(0)}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-3">
            <div
              className="h-3 rounded-full bg-gradient-to-r from-red-500 to-orange-500 transition-all duration-300"
              style={{ width: `${scanProgress}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-400 mt-2">
            {scanLayers[Math.floor((scanProgress / 100) * scanLayers.length)] || 'Completing scan...'}
          </p>
        </div>
      )}

      {/* Detected Threats */}
      <div>
        <h3 className="text-lg font-bold text-white mb-4 flex items-center space-x-2">
          <AlertTriangle className="w-5 h-5 text-red-400" />
          <span>Recent Threat Detections</span>
        </h3>
        
        {detectedThreats.length === 0 ? (
          <div className="text-center py-8">
            <CheckCircle className="w-16 h-16 mx-auto text-green-400 mb-4" />
            <h4 className="text-lg font-semibold text-white mb-2">All Clear</h4>
            <p className="text-gray-400">No threats detected. Your system is secure.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {detectedThreats.map((threat) => (
              <div key={threat.id} className={`p-4 rounded-lg border ${getThreatColor(threat.severity)}`}>
                <div className="flex items-start space-x-3">
                  {getThreatIcon(threat.type)}
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-white capitalize">
                        {threat.type.replace('_', ' ')} Detected
                      </h4>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${getThreatColor(threat.severity)}`}>
                          {threat.severity.toUpperCase()}
                        </span>
                        <span className="text-xs text-gray-400">{threat.timestamp}</span>
                      </div>
                    </div>
                    <p className="text-gray-300 text-sm mb-2">{threat.description}</p>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-400">Source: {threat.source}</span>
                      <div className="flex items-center space-x-2">
                        <Brain className="w-3 h-3 text-purple-400" />
                        <span className="text-purple-400">AI Confidence: {threat.aiConfidence.toFixed(1)}%</span>
                        {threat.blocked && (
                          <div className="flex items-center space-x-1 text-green-400">
                            <Shield className="w-3 h-3" />
                            <span>BLOCKED</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};