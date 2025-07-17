import React, { useState, useEffect } from 'react';
import { Globe, Volume2, Mic, Bot, Zap, CheckCircle, Settings, Users, MessageSquare, Video, FileText } from 'lucide-react';

interface MultiLanguageSupportProps {
  onLanguageChange: (language: string) => void;
  currentLanguage: string;
}

interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
  rtl: boolean;
  aiSupported: boolean;
  voiceSupported: boolean;
  translationQuality: number;
}

export const MultiLanguageSupport: React.FC<MultiLanguageSupportProps> = ({
  onLanguageChange,
  currentLanguage
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [autoTranslate, setAutoTranslate] = useState(true);
  const [voiceTranslation, setVoiceTranslation] = useState(true);
  const [realTimeTranslation, setRealTimeTranslation] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'popular' | 'ai-enhanced' | 'voice-enabled'>('all');

  // Top 30+ languages with comprehensive support
  const languages: Language[] = [
    // Major World Languages
    { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸', rtl: false, aiSupported: true, voiceSupported: true, translationQuality: 100 },
    { code: 'zh', name: 'Chinese (Mandarin)', nativeName: '中文', flag: '🇨🇳', rtl: false, aiSupported: true, voiceSupported: true, translationQuality: 98 },
    { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳', rtl: false, aiSupported: true, voiceSupported: true, translationQuality: 96 },
    { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸', rtl: false, aiSupported: true, voiceSupported: true, translationQuality: 99 },
    { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷', rtl: false, aiSupported: true, voiceSupported: true, translationQuality: 98 },
    { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦', rtl: true, aiSupported: true, voiceSupported: true, translationQuality: 97 },
    { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', flag: '🇧🇩', rtl: false, aiSupported: true, voiceSupported: true, translationQuality: 95 },
    { code: 'pt', name: 'Portuguese', nativeName: 'Português', flag: '🇧🇷', rtl: false, aiSupported: true, voiceSupported: true, translationQuality: 98 },
    { code: 'ru', name: 'Russian', nativeName: 'Русский', flag: '🇷🇺', rtl: false, aiSupported: true, voiceSupported: true, translationQuality: 97 },
    { code: 'ja', name: 'Japanese', nativeName: '日本語', flag: '🇯🇵', rtl: false, aiSupported: true, voiceSupported: true, translationQuality: 98 },
    
    // European Languages
    { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪', rtl: false, aiSupported: true, voiceSupported: true, translationQuality: 98 },
    { code: 'it', name: 'Italian', nativeName: 'Italiano', flag: '🇮🇹', rtl: false, aiSupported: true, voiceSupported: true, translationQuality: 97 },
    { code: 'nl', name: 'Dutch', nativeName: 'Nederlands', flag: '🇳🇱', rtl: false, aiSupported: true, voiceSupported: true, translationQuality: 96 },
    { code: 'sv', name: 'Swedish', nativeName: 'Svenska', flag: '🇸🇪', rtl: false, aiSupported: true, voiceSupported: true, translationQuality: 95 },
    { code: 'no', name: 'Norwegian', nativeName: 'Norsk', flag: '🇳🇴', rtl: false, aiSupported: true, voiceSupported: true, translationQuality: 94 },
    { code: 'da', name: 'Danish', nativeName: 'Dansk', flag: '🇩🇰', rtl: false, aiSupported: true, voiceSupported: true, translationQuality: 94 },
    { code: 'fi', name: 'Finnish', nativeName: 'Suomi', flag: '🇫🇮', rtl: false, aiSupported: true, voiceSupported: true, translationQuality: 93 },
    { code: 'pl', name: 'Polish', nativeName: 'Polski', flag: '🇵🇱', rtl: false, aiSupported: true, voiceSupported: true, translationQuality: 95 },
    { code: 'cs', name: 'Czech', nativeName: 'Čeština', flag: '🇨🇿', rtl: false, aiSupported: true, voiceSupported: true, translationQuality: 94 },
    { code: 'hu', name: 'Hungarian', nativeName: 'Magyar', flag: '🇭🇺', rtl: false, aiSupported: true, voiceSupported: true, translationQuality: 93 },
    
    // Asian Languages
    { code: 'ko', name: 'Korean', nativeName: '한국어', flag: '🇰🇷', rtl: false, aiSupported: true, voiceSupported: true, translationQuality: 97 },
    { code: 'th', name: 'Thai', nativeName: 'ไทย', flag: '🇹🇭', rtl: false, aiSupported: true, voiceSupported: true, translationQuality: 95 },
    { code: 'vi', name: 'Vietnamese', nativeName: 'Tiếng Việt', flag: '🇻🇳', rtl: false, aiSupported: true, voiceSupported: true, translationQuality: 94 },
    { code: 'id', name: 'Indonesian', nativeName: 'Bahasa Indonesia', flag: '🇮🇩', rtl: false, aiSupported: true, voiceSupported: true, translationQuality: 95 },
    { code: 'ms', name: 'Malay', nativeName: 'Bahasa Melayu', flag: '🇲🇾', rtl: false, aiSupported: true, voiceSupported: true, translationQuality: 93 },
    { code: 'tl', name: 'Filipino', nativeName: 'Filipino', flag: '🇵🇭', rtl: false, aiSupported: true, voiceSupported: true, translationQuality: 92 },
    
    // Middle Eastern & African Languages
    { code: 'fa', name: 'Persian', nativeName: 'فارسی', flag: '🇮🇷', rtl: true, aiSupported: true, voiceSupported: true, translationQuality: 94 },
    { code: 'he', name: 'Hebrew', nativeName: 'עברית', flag: '🇮🇱', rtl: true, aiSupported: true, voiceSupported: true, translationQuality: 95 },
    { code: 'tr', name: 'Turkish', nativeName: 'Türkçe', flag: '🇹🇷', rtl: false, aiSupported: true, voiceSupported: true, translationQuality: 96 },
    { code: 'sw', name: 'Swahili', nativeName: 'Kiswahili', flag: '🇰🇪', rtl: false, aiSupported: true, voiceSupported: true, translationQuality: 91 },
    
    // Additional Languages
    { code: 'uk', name: 'Ukrainian', nativeName: 'Українська', flag: '🇺🇦', rtl: false, aiSupported: true, voiceSupported: true, translationQuality: 95 },
    { code: 'el', name: 'Greek', nativeName: 'Ελληνικά', flag: '🇬🇷', rtl: false, aiSupported: true, voiceSupported: true, translationQuality: 94 },
    { code: 'bg', name: 'Bulgarian', nativeName: 'Български', flag: '🇧🇬', rtl: false, aiSupported: true, voiceSupported: true, translationQuality: 93 },
    { code: 'ro', name: 'Romanian', nativeName: 'Română', flag: '🇷🇴', rtl: false, aiSupported: true, voiceSupported: true, translationQuality: 94 },
    { code: 'hr', name: 'Croatian', nativeName: 'Hrvatski', flag: '🇭🇷', rtl: false, aiSupported: true, voiceSupported: true, translationQuality: 93 },
    { code: 'sk', name: 'Slovak', nativeName: 'Slovenčina', flag: '🇸🇰', rtl: false, aiSupported: true, voiceSupported: true, translationQuality: 92 }
  ];

  const filteredLanguages = languages.filter(lang => {
    const matchesSearch = lang.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lang.nativeName.toLowerCase().includes(searchTerm.toLowerCase());
    
    switch (selectedCategory) {
      case 'popular':
        return matchesSearch && ['en', 'zh', 'hi', 'es', 'fr', 'ar', 'pt', 'ru', 'ja', 'de'].includes(lang.code);
      case 'ai-enhanced':
        return matchesSearch && lang.aiSupported && lang.translationQuality >= 95;
      case 'voice-enabled':
        return matchesSearch && lang.voiceSupported;
      default:
        return matchesSearch;
    }
  });

  const getQualityColor = (quality: number) => {
    if (quality >= 98) return 'text-green-400';
    if (quality >= 95) return 'text-blue-400';
    if (quality >= 90) return 'text-yellow-400';
    return 'text-orange-400';
  };

  const getQualityBarColor = (quality: number) => {
    if (quality >= 98) return 'bg-green-500';
    if (quality >= 95) return 'bg-blue-500';
    if (quality >= 90) return 'bg-yellow-500';
    return 'bg-orange-500';
  };

  return (
    <div className="bg-black/30 rounded-xl p-6 border border-blue-500/20">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
            <Globe className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Multi-Language Support</h2>
            <p className="text-blue-300">30+ Languages with AI Translation</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-2 bg-blue-600/20 px-3 py-1 rounded-lg">
            <Bot className="w-4 h-4 text-blue-400" />
            <span className="text-blue-400 text-sm font-semibold">AI Powered</span>
          </div>
        </div>
      </div>

      {/* Translation Settings */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gray-800/50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-white font-medium">Auto Translate</span>
            <input
              type="checkbox"
              checked={autoTranslate}
              onChange={(e) => setAutoTranslate(e.target.checked)}
              className="sr-only"
            />
            <div className={`w-10 h-5 rounded-full ${autoTranslate ? 'bg-blue-600' : 'bg-gray-600'}`}>
              <div className={`w-4 h-4 rounded-full bg-white transition-transform ${autoTranslate ? 'translate-x-5' : 'translate-x-0.5'} mt-0.5`}></div>
            </div>
          </div>
          <p className="text-xs text-gray-400">Automatic message translation</p>
        </div>

        <div className="bg-gray-800/50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-white font-medium">Voice Translation</span>
            <input
              type="checkbox"
              checked={voiceTranslation}
              onChange={(e) => setVoiceTranslation(e.target.checked)}
              className="sr-only"
            />
            <div className={`w-10 h-5 rounded-full ${voiceTranslation ? 'bg-green-600' : 'bg-gray-600'}`}>
              <div className={`w-4 h-4 rounded-full bg-white transition-transform ${voiceTranslation ? 'translate-x-5' : 'translate-x-0.5'} mt-0.5`}></div>
            </div>
          </div>
          <p className="text-xs text-gray-400">Real-time voice translation</p>
        </div>

        <div className="bg-gray-800/50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-white font-medium">Real-time Mode</span>
            <input
              type="checkbox"
              checked={realTimeTranslation}
              onChange={(e) => setRealTimeTranslation(e.target.checked)}
              className="sr-only"
            />
            <div className={`w-10 h-5 rounded-full ${realTimeTranslation ? 'bg-purple-600' : 'bg-gray-600'}`}>
              <div className={`w-4 h-4 rounded-full bg-white transition-transform ${realTimeTranslation ? 'translate-x-5' : 'translate-x-0.5'} mt-0.5`}></div>
            </div>
          </div>
          <p className="text-xs text-gray-400">Live translation as you type</p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search languages..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
          />
        </div>
        
        <div className="flex space-x-2">
          {[
            { id: 'all', label: 'All Languages' },
            { id: 'popular', label: 'Popular' },
            { id: 'ai-enhanced', label: 'AI Enhanced' },
            { id: 'voice-enabled', label: 'Voice Enabled' }
          ].map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id as any)}
              className={`px-4 py-2 rounded-lg transition-all ${
                selectedCategory === category.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      {/* Language Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
        {filteredLanguages.map((language) => (
          <div
            key={language.code}
            onClick={() => onLanguageChange(language.code)}
            className={`p-4 rounded-lg border cursor-pointer transition-all hover:border-blue-500/50 ${
              currentLanguage === language.code
                ? 'border-blue-500 bg-blue-600/20'
                : 'border-gray-700 bg-gray-800/50 hover:bg-gray-700/50'
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{language.flag}</span>
                <div>
                  <h3 className="font-semibold text-white">{language.name}</h3>
                  <p className="text-sm text-gray-400" dir={language.rtl ? 'rtl' : 'ltr'}>
                    {language.nativeName}
                  </p>
                </div>
              </div>
              {currentLanguage === language.code && (
                <CheckCircle className="w-5 h-5 text-blue-400" />
              )}
            </div>

            <div className="space-y-2">
              {/* Translation Quality */}
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Quality:</span>
                <span className={`font-bold ${getQualityColor(language.translationQuality)}`}>
                  {language.translationQuality}%
                </span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${getQualityBarColor(language.translationQuality)}`}
                  style={{ width: `${language.translationQuality}%` }}
                ></div>
              </div>

              {/* Features */}
              <div className="flex items-center space-x-2 mt-3">
                {language.aiSupported && (
                  <div className="flex items-center space-x-1 bg-purple-600/20 px-2 py-1 rounded text-xs">
                    <Bot className="w-3 h-3 text-purple-400" />
                    <span className="text-purple-400">AI</span>
                  </div>
                )}
                {language.voiceSupported && (
                  <div className="flex items-center space-x-1 bg-green-600/20 px-2 py-1 rounded text-xs">
                    <Volume2 className="w-3 h-3 text-green-400" />
                    <span className="text-green-400">Voice</span>
                  </div>
                )}
                {language.rtl && (
                  <div className="flex items-center space-x-1 bg-orange-600/20 px-2 py-1 rounded text-xs">
                    <span className="text-orange-400">RTL</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Translation Features */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-lg p-4 border border-blue-500/30">
          <div className="flex items-center space-x-3 mb-2">
            <MessageSquare className="w-6 h-6 text-blue-400" />
            <h4 className="font-semibold text-white">Text Translation</h4>
          </div>
          <p className="text-sm text-gray-300">Real-time message translation with context awareness</p>
        </div>

        <div className="bg-gradient-to-r from-green-600/20 to-teal-600/20 rounded-lg p-4 border border-green-500/30">
          <div className="flex items-center space-x-3 mb-2">
            <Mic className="w-6 h-6 text-green-400" />
            <h4 className="font-semibold text-white">Voice Translation</h4>
          </div>
          <p className="text-sm text-gray-300">Speak in any language, hear in your preferred language</p>
        </div>

        <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-lg p-4 border border-purple-500/30">
          <div className="flex items-center space-x-3 mb-2">
            <Video className="w-6 h-6 text-purple-400" />
            <h4 className="font-semibold text-white">Video Captions</h4>
          </div>
          <p className="text-sm text-gray-300">Live video call translation with subtitles</p>
        </div>

        <div className="bg-gradient-to-r from-orange-600/20 to-red-600/20 rounded-lg p-4 border border-orange-500/30">
          <div className="flex items-center space-x-3 mb-2">
            <FileText className="w-6 h-6 text-orange-400" />
            <h4 className="font-semibold text-white">Document Translation</h4>
          </div>
          <p className="text-sm text-gray-300">Translate shared documents and files instantly</p>
        </div>
      </div>

      {/* Statistics */}
      <div className="mt-6 bg-gray-800/30 rounded-lg p-4">
        <h4 className="font-semibold text-white mb-3">Translation Statistics</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-blue-400">{languages.length}</p>
            <p className="text-sm text-gray-400">Supported Languages</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-green-400">{languages.filter(l => l.aiSupported).length}</p>
            <p className="text-sm text-gray-400">AI Enhanced</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-purple-400">{languages.filter(l => l.voiceSupported).length}</p>
            <p className="text-sm text-gray-400">Voice Enabled</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-yellow-400">
              {Math.round(languages.reduce((acc, l) => acc + l.translationQuality, 0) / languages.length)}%
            </p>
            <p className="text-sm text-gray-400">Avg. Quality</p>
          </div>
        </div>
      </div>
    </div>
  );
};