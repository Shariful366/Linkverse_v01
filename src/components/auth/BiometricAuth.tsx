import React, { useState, useEffect } from 'react';
import { Fingerprint, Eye, Mic, CheckCircle } from 'lucide-react';

interface BiometricAuthProps {
  onSuccess: () => void;
}

export const BiometricAuth: React.FC<BiometricAuthProps> = ({ onSuccess }) => {
  const [selectedMethod, setSelectedMethod] = useState<'fingerprint' | 'face' | 'voice'>('fingerprint');
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);

  const startScan = async () => {
    setIsScanning(true);
    setScanProgress(0);

    // Simulate biometric scanning
    const interval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsScanning(false);
          setTimeout(onSuccess, 500);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const getBiometricIcon = () => {
    switch (selectedMethod) {
      case 'fingerprint':
        return <Fingerprint className="w-16 h-16 text-cyan-400" />;
      case 'face':
        return <Eye className="w-16 h-16 text-purple-400" />;
      case 'voice':
        return <Mic className="w-16 h-16 text-pink-400" />;
    }
  };

  const getMethodLabel = () => {
    switch (selectedMethod) {
      case 'fingerprint':
        return 'Fingerprint';
      case 'face':
        return 'Face ID';
      case 'voice':
        return 'Voice Print';
    }
  };

  return (
    <div className="text-center">
      <div className="flex justify-center space-x-4 mb-8">
        <button
          onClick={() => setSelectedMethod('fingerprint')}
          className={`p-4 rounded-xl transition-all ${
            selectedMethod === 'fingerprint' 
              ? 'bg-cyan-600 text-white' 
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          }`}
        >
          <Fingerprint className="w-6 h-6" />
        </button>
        <button
          onClick={() => setSelectedMethod('face')}
          className={`p-4 rounded-xl transition-all ${
            selectedMethod === 'face' 
              ? 'bg-purple-600 text-white' 
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          }`}
        >
          <Eye className="w-6 h-6" />
        </button>
        <button
          onClick={() => setSelectedMethod('voice')}
          className={`p-4 rounded-xl transition-all ${
            selectedMethod === 'voice' 
              ? 'bg-pink-600 text-white' 
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          }`}
        >
          <Mic className="w-6 h-6" />
        </button>
      </div>

      <div className="relative mb-8">
        <div className={`w-32 h-32 mx-auto rounded-full border-4 ${
          isScanning ? 'border-cyan-400 animate-pulse' : 'border-gray-600'
        } flex items-center justify-center bg-gray-800/50`}>
          {scanProgress === 100 ? (
            <CheckCircle className="w-16 h-16 text-green-400" />
          ) : (
            getBiometricIcon()
          )}
        </div>
        
        {isScanning && (
          <div className="absolute inset-0 w-32 h-32 mx-auto rounded-full border-4 border-transparent border-t-cyan-400 animate-spin"></div>
        )}
      </div>

      <h3 className="text-xl font-semibold text-white mb-2">{getMethodLabel()} Authentication</h3>
      <p className="text-gray-400 mb-6">
        {isScanning ? 'Scanning...' : `Use your ${getMethodLabel().toLowerCase()} to authenticate`}
      </p>

      {isScanning ? (
        <div className="space-y-4">
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-cyan-400 to-purple-400 h-2 rounded-full transition-all duration-300"
              style={{ width: `${scanProgress}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-400">{scanProgress}% Complete</p>
        </div>
      ) : (
        <button
          onClick={startScan}
          className="w-full p-4 bg-gradient-to-r from-cyan-600 to-purple-600 rounded-xl text-white font-semibold hover:from-cyan-700 hover:to-purple-700 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
        >
          Start {getMethodLabel()} Scan
        </button>
      )}
    </div>
  );
};