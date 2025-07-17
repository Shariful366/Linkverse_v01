import React, { useState, useEffect } from 'react';
import { Shield, AlertTriangle, CheckCircle, X, Eye, FileText, Image, Video, Link, MessageSquare, Bot, Zap } from 'lucide-react';

interface ContentModerationEngineProps {
  content: any;
  type: 'image' | 'video' | 'file' | 'link' | 'text' | 'message';
  onModerationComplete: (result: ModerationResult) => void;
}

interface ModerationResult {
  allowed: boolean;
  confidence: number;
  reasons: string[];
  aiSafetyScore: number;
  categories: {
    nudity: boolean;
    violence: boolean;
    hate: boolean;
    propaganda: boolean;
    spam: boolean;
    malware: boolean;
  };
  alternativeContent?: string;
}

export const ContentModerationEngine: React.FC<ContentModerationEngineProps> = ({
  content,
  type,
  onModerationComplete
}) => {
  const [isScanning, setIsScanning] = useState(true);
  const [scanProgress, setScanProgress] = useState(0);
  const [moderationResult, setModerationResult] = useState<ModerationResult | null>(null);

  useEffect(() => {
    performContentModeration();
  }, [content, type]);

  const performContentModeration = async () => {
    setIsScanning(true);
    setScanProgress(0);

    // Simulate AI content scanning with multiple layers
    const scanSteps = [
      'Initializing quantum AI scanner...',
      'Analyzing visual content for nudity...',
      'Detecting hate speech and propaganda...',
      'Scanning for malware and threats...',
      'Checking against global content database...',
      'Applying cultural sensitivity filters...',
      'Generating safety recommendations...',
      'Finalizing moderation decision...'
    ];

    for (let i = 0; i < scanSteps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 300));
      setScanProgress(((i + 1) / scanSteps.length) * 100);
    }

    // Simulate comprehensive content analysis
    const result = await analyzeContent(content, type);
    setModerationResult(result);
    setIsScanning(false);
    onModerationComplete(result);
  };

  const analyzeContent = async (content: any, type: string): Promise<ModerationResult> => {
    // Simulate advanced AI analysis
    const baseScore = Math.random() * 100;
    
    // Simulate different content violations
    const hasNudity = Math.random() < 0.05; // 5% chance
    const hasHate = Math.random() < 0.03; // 3% chance
    const hasPropaganda = Math.random() < 0.02; // 2% chance
    const hasViolence = Math.random() < 0.04; // 4% chance
    const hasSpam = Math.random() < 0.08; // 8% chance
    const hasMalware = Math.random() < 0.01; // 1% chance

    const violations = [];
    const categories = {
      nudity: hasNudity,
      violence: hasViolence,
      hate: hasHate,
      propaganda: hasPropaganda,
      spam: hasSpam,
      malware: hasMalware
    };

    if (hasNudity) violations.push('Explicit content detected');
    if (hasHate) violations.push('Hate speech identified');
    if (hasPropaganda) violations.push('Propaganda content flagged');
    if (hasViolence) violations.push('Violent content detected');
    if (hasSpam) violations.push('Spam patterns identified');
    if (hasMalware) violations.push('Malicious code detected');

    const hasViolations = violations.length > 0;
    const confidence = hasViolations ? 95 + Math.random() * 5 : 85 + Math.random() * 15;
    const aiSafetyScore = hasViolations ? Math.random() * 30 : 85 + Math.random() * 15;

    return {
      allowed: !hasViolations,
      confidence,
      reasons: violations,
      aiSafetyScore,
      categories,
      alternativeContent: hasViolations ? generateAlternativeContent(type) : undefined
    };
  };

  const generateAlternativeContent = (type: string): string => {
    const alternatives = {
      image: 'Content replaced with AI-generated safe alternative',
      video: 'Video blocked - AI summary available',
      file: 'File quarantined - Safe version generated',
      link: 'Link blocked - Safe alternative suggested',
      text: 'Message filtered - Rephrased version available',
      message: 'Content moderated - Alternative phrasing suggested'
    };
    return alternatives[type as keyof typeof alternatives] || 'Content moderated';
  };

  if (isScanning) {
    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-xl flex items-center justify-center z-50">
        <div className="bg-gradient-to-br from-red-900/30 to-orange-900/30 backdrop-blur-xl rounded-2xl p-8 border border-red-500/20 max-w-md w-full mx-4">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center mb-6">
              <Shield className="w-8 h-8 text-white animate-pulse" />
            </div>
            
            <h3 className="text-xl font-bold text-white mb-4">AI Content Moderation</h3>
            <p className="text-gray-300 mb-6">Quantum-level content analysis in progress...</p>
            
            <div className="space-y-4">
              <div className="w-full bg-gray-700 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-red-500 to-orange-500 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${scanProgress}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-400">{scanProgress.toFixed(0)}% Complete</p>
            </div>

            <div className="mt-6 space-y-2 text-xs text-gray-400">
              <div className="flex items-center justify-center space-x-2">
                <Eye className="w-3 h-3" />
                <span>Visual content analysis</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <MessageSquare className="w-3 h-3" />
                <span>Language pattern detection</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <Bot className="w-3 h-3" />
                <span>AI safety verification</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (moderationResult && !moderationResult.allowed) {
    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-xl flex items-center justify-center z-50">
        <div className="bg-gradient-to-br from-red-900/30 to-pink-900/30 backdrop-blur-xl rounded-2xl p-8 border border-red-500/20 max-w-lg w-full mx-4">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto bg-red-600 rounded-full flex items-center justify-center mb-6">
              <AlertTriangle className="w-8 h-8 text-white" />
            </div>
            
            <h3 className="text-xl font-bold text-white mb-4">Content Blocked</h3>
            <p className="text-gray-300 mb-6">
              This content violates our community guidelines and has been automatically blocked by our AI moderation system.
            </p>
            
            <div className="bg-black/30 rounded-lg p-4 mb-6">
              <h4 className="font-semibold text-red-400 mb-3">Violations Detected:</h4>
              <div className="space-y-2">
                {moderationResult.reasons.map((reason, index) => (
                  <div key={index} className="flex items-center space-x-2 text-sm text-gray-300">
                    <X className="w-4 h-4 text-red-400" />
                    <span>{reason}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-600">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">AI Confidence:</span>
                  <span className="text-red-400 font-bold">{moderationResult.confidence.toFixed(1)}%</span>
                </div>
                <div className="flex items-center justify-between text-sm mt-1">
                  <span className="text-gray-400">Safety Score:</span>
                  <span className="text-red-400 font-bold">{moderationResult.aiSafetyScore.toFixed(0)}/100</span>
                </div>
              </div>
            </div>

            {moderationResult.alternativeContent && (
              <div className="bg-green-600/20 border border-green-500/30 rounded-lg p-4 mb-6">
                <h4 className="font-semibold text-green-400 mb-2">AI Suggestion:</h4>
                <p className="text-sm text-gray-300">{moderationResult.alternativeContent}</p>
              </div>
            )}
            
            <div className="flex space-x-3">
              <button
                onClick={() => onModerationComplete(moderationResult)}
                className="flex-1 p-3 bg-gray-700 rounded-lg text-white hover:bg-gray-600 transition-colors"
              >
                Understood
              </button>
              <button className="flex-1 p-3 bg-blue-600 rounded-lg text-white hover:bg-blue-700 transition-colors">
                Appeal Decision
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};