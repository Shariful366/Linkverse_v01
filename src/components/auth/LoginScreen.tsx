import React, { useState } from 'react';
import { Shield, Fingerprint, Smartphone, Mail, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { BiometricAuth } from './BiometricAuth';

interface LoginScreenProps {
  onLogin: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [loginMethod, setLoginMethod] = useState<'email' | 'phone' | 'biometric'>('email');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    password: ''
  });
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await login('demo@linkverse.com', 'password', loginMethod);
    onLogin();
  };

  const handleSocialLogin = (provider: 'google' | 'apple') => {
    // Simulate social login
    login(`${provider}@linkverse.com`, '', provider);
    onLogin();
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-black/40 backdrop-blur-xl rounded-3xl p-8 border border-gray-800/50 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto bg-gradient-to-r from-cyan-500 to-purple-500 rounded-2xl flex items-center justify-center mb-4">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Welcome to Linkverse</h1>
            <p className="text-gray-400">2050's most secure communication platform</p>
          </div>

          {/* Login Method Selector */}
          <div className="flex space-x-2 mb-6">
            <button
              onClick={() => setLoginMethod('email')}
              className={`flex-1 p-3 rounded-xl transition-all ${
                loginMethod === 'email' 
                  ? 'bg-cyan-600 text-white' 
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              <Mail className="w-5 h-5 mx-auto" />
            </button>
            <button
              onClick={() => setLoginMethod('phone')}
              className={`flex-1 p-3 rounded-xl transition-all ${
                loginMethod === 'phone' 
                  ? 'bg-cyan-600 text-white' 
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              <Smartphone className="w-5 h-5 mx-auto" />
            </button>
            <button
              onClick={() => setLoginMethod('biometric')}
              className={`flex-1 p-3 rounded-xl transition-all ${
                loginMethod === 'biometric' 
                  ? 'bg-cyan-600 text-white' 
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              <Fingerprint className="w-5 h-5 mx-auto" />
            </button>
          </div>

          {/* Login Form */}
          {loginMethod === 'biometric' ? (
            <BiometricAuth onSuccess={onLogin} />
          ) : (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <input
                  type={loginMethod === 'email' ? 'email' : 'tel'}
                  placeholder={loginMethod === 'email' ? 'Email address' : 'Phone number'}
                  value={loginMethod === 'email' ? formData.email : formData.phone}
                  onChange={(e) => setFormData({
                    ...formData,
                    [loginMethod]: e.target.value
                  })}
                  className="w-full p-4 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 transition-colors"
                />
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="w-full p-4 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 transition-colors pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              <button
                type="submit"
                className="w-full p-4 bg-gradient-to-r from-cyan-600 to-purple-600 rounded-xl text-white font-semibold hover:from-cyan-700 hover:to-purple-700 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
              >
                Login with Quantum Security
              </button>
            </form>
          )}

          {/* Social Login */}
          <div className="mt-6 space-y-3">
            <button
              onClick={() => handleSocialLogin('google')}
              className="w-full p-4 bg-white/10 border border-gray-700 rounded-xl text-white hover:bg-white/20 transition-colors"
            >
              Continue with Google
            </button>
            <button
              onClick={() => handleSocialLogin('apple')}
              className="w-full p-4 bg-white/10 border border-gray-700 rounded-xl text-white hover:bg-white/20 transition-colors"
            >
              Continue with Apple
            </button>
          </div>

          {/* Security Badge */}
          <div className="mt-6 text-center">
            <div className="inline-flex items-center space-x-2 bg-green-900/30 border border-green-700/50 rounded-full px-4 py-2">
              <Shield className="w-4 h-4 text-green-400" />
              <span className="text-green-400 text-sm">Quantum Encrypted</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};