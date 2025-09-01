import React, { useState } from 'react';
import { Shield, Fingerprint, Smartphone, Mail, Eye, EyeOff, UserPlus, Building, Globe, Zap } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { BiometricAuth } from './BiometricAuth';

export const LoginScreen: React.FC = () => {
  const [loginMethod, setLoginMethod] = useState<'email' | 'phone' | 'biometric'>('email');
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    displayName: '',
    username: '',
    company: '',
    jobTitle: '',
    acceptTerms: false
  });
  const { login, signUp, isLoading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (authMode === 'login') {
        await login(formData.email || formData.phone, formData.password, loginMethod);
      } else {
        if (formData.password !== formData.confirmPassword) {
          alert('Passwords do not match');
          return;
        }
        if (!formData.acceptTerms) {
          alert('Please accept the terms and conditions');
          return;
        }
        
        await signUp(formData.email, formData.password, {
          display_name: formData.displayName,
          username: formData.username,
          company: formData.company,
          job_title: formData.jobTitle
        });
      }
    } catch (error) {
      console.error('Authentication error:', error);
      alert('Authentication failed. Please try again.');
    }
  };

  const handleSocialLogin = (provider: 'google' | 'apple') => {
    // Simulate social login
    login(`${provider}@linkverse.com`, '', provider);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-md lg:max-w-lg">
        <div className="bg-black/40 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-gray-800/50 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-6 sm:mb-8">
            <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto bg-gradient-to-r from-cyan-500 to-purple-500 rounded-2xl flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              {authMode === 'login' ? 'Welcome Back' : 'Join Linkverse'}
            </h1>
            <p className="text-gray-400 text-sm sm:text-base">
              {authMode === 'login' 
                ? "2050's most secure communication platform" 
                : "Create your quantum-secured account"
              }
            </p>
          </div>

          {/* Auth Mode Toggle */}
          <div className="flex space-x-2 mb-6">
            <button
              onClick={() => setAuthMode('login')}
              className={`flex-1 p-3 rounded-xl transition-all text-sm sm:text-base ${
                authMode === 'login' 
                  ? 'bg-cyan-600 text-white' 
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
                <Shield className="w-4 h-4" />
                <span>Sign In</span>
              </div>
            </button>
            <button
              onClick={() => setAuthMode('signup')}
              className={`flex-1 p-3 rounded-xl transition-all text-sm sm:text-base ${
                authMode === 'signup' 
                  ? 'bg-purple-600 text-white' 
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
                <UserPlus className="w-4 h-4" />
                <span>Sign Up</span>
              </div>
            </button>
          </div>

          {/* Login Method Selector */}
          <div className="grid grid-cols-3 gap-2 mb-6">
            <button
              onClick={() => setLoginMethod('email')}
              className={`p-3 rounded-xl transition-all ${
                loginMethod === 'email' 
                  ? 'bg-cyan-600 text-white' 
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              <div className="flex flex-col items-center space-y-1">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-xs">Email</span>
              </div>
            </button>
            <button
              onClick={() => setLoginMethod('phone')}
              className={`p-3 rounded-xl transition-all ${
                loginMethod === 'phone' 
                  ? 'bg-cyan-600 text-white' 
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              <div className="flex flex-col items-center space-y-1">
                <Smartphone className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-xs">Phone</span>
              </div>
            </button>
            <button
              onClick={() => setLoginMethod('biometric')}
              className={`p-3 rounded-xl transition-all ${
                loginMethod === 'biometric' 
                  ? 'bg-cyan-600 text-white' 
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              <div className="flex flex-col items-center space-y-1">
                <Fingerprint className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-xs">Bio</span>
              </div>
            </button>
          </div>

          {/* Login Form */}
          {loginMethod === 'biometric' ? (
            <BiometricAuth onSuccess={onLogin} />
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Sign Up Fields */}
              {authMode === 'signup' && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Display Name"
                      value={formData.displayName}
                      onChange={(e) => setFormData({...formData, displayName: e.target.value})}
                      className="w-full p-3 sm:p-4 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 transition-colors text-sm sm:text-base"
                      required
                    />
                    <input
                      type="text"
                      placeholder="Username"
                      value={formData.username}
                      onChange={(e) => setFormData({...formData, username: e.target.value})}
                      className="w-full p-3 sm:p-4 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 transition-colors text-sm sm:text-base"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Company"
                      value={formData.company}
                      onChange={(e) => setFormData({...formData, company: e.target.value})}
                      className="w-full p-3 sm:p-4 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 transition-colors text-sm sm:text-base"
                    />
                    <input
                      type="text"
                      placeholder="Job Title"
                      value={formData.jobTitle}
                      onChange={(e) => setFormData({...formData, jobTitle: e.target.value})}
                      className="w-full p-3 sm:p-4 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 transition-colors text-sm sm:text-base"
                    />
                  </div>
                </>
              )}
              
              <div>
                <input
                  type={loginMethod === 'email' ? 'email' : 'tel'}
                  placeholder={loginMethod === 'email' ? 'Email address' : 'Phone number'}
                  value={loginMethod === 'email' ? formData.email : formData.phone}
                  onChange={(e) => setFormData({
                    ...formData,
                    [loginMethod]: e.target.value
                  })}
                  className="w-full p-3 sm:p-4 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 transition-colors text-sm sm:text-base"
                  required
                />
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="w-full p-3 sm:p-4 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 transition-colors pr-12 text-sm sm:text-base"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              
              {/* Confirm Password for Sign Up */}
              {authMode === 'signup' && (
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                    className="w-full p-3 sm:p-4 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 transition-colors pr-12 text-sm sm:text-base"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              )}

              {/* Terms and Conditions for Sign Up */}
              {authMode === 'signup' && (
                <label className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.acceptTerms}
                    onChange={(e) => setFormData({...formData, acceptTerms: e.target.checked})}
                    className="mt-1 w-4 h-4 text-cyan-600 bg-gray-800 border-gray-600 rounded focus:ring-cyan-500"
                    required
                  />
                  <span className="text-sm text-gray-400">
                    I agree to the <a href="#" className="text-cyan-400 hover:text-cyan-300">Terms of Service</a> and <a href="#" className="text-cyan-400 hover:text-cyan-300">Privacy Policy</a>
                  </span>
                </label>
              )}
              
              <button
                type="submit"
                disabled={isLoading}
                className="w-full p-3 sm:p-4 bg-gradient-to-r from-cyan-600 to-purple-600 rounded-xl text-white font-semibold hover:from-cyan-700 hover:to-purple-700 transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 text-sm sm:text-base"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>{authMode === 'login' ? 'Signing In...' : 'Creating Account...'}</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-2">
                    {authMode === 'login' ? <Shield className="w-4 h-4" /> : <UserPlus className="w-4 h-4" />}
                    <span>{authMode === 'login' ? 'Login with Quantum Security' : 'Create Enterprise Account'}</span>
                  </div>
                )}
              </button>
            </form>
          )}

          {/* Social Login */}
          <div className="mt-4 sm:mt-6 space-y-3">
            <button
              onClick={() => handleSocialLogin('google')}
              className="w-full p-3 sm:p-4 bg-white/10 border border-gray-700 rounded-xl text-white hover:bg-white/20 transition-colors text-sm sm:text-base"
            >
              Continue with Google
            </button>
            <button
              onClick={() => handleSocialLogin('apple')}
              className="w-full p-3 sm:p-4 bg-white/10 border border-gray-700 rounded-xl text-white hover:bg-white/20 transition-colors text-sm sm:text-base"
            >
              Continue with Apple
            </button>
          </div>

          {/* Enterprise Features Badge */}
          {authMode === 'signup' && (
            <div className="mt-6 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-xl p-4 border border-purple-500/30">
              <div className="flex items-center space-x-2 mb-3">
                <Building className="w-5 h-5 text-purple-400" />
                <span className="font-semibold text-white">Enterprise Features</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm">
                <div className="flex items-center space-x-2 text-gray-300">
                  <Zap className="w-3 h-3 text-yellow-400" />
                  <span>Quantum encryption</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-300">
                  <Globe className="w-3 h-3 text-blue-400" />
                  <span>Global deployment</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-300">
                  <Shield className="w-3 h-3 text-green-400" />
                  <span>Enterprise security</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-300">
                  <Building className="w-3 h-3 text-purple-400" />
                  <span>Team management</span>
                </div>
              </div>
            </div>
          )}

          {/* Security Badge */}
          <div className="mt-4 sm:mt-6 text-center">
            <div className="inline-flex items-center space-x-2 bg-green-900/30 border border-green-700/50 rounded-full px-4 py-2">
              <Shield className="w-4 h-4 text-green-400" />
              <span className="text-green-400 text-xs sm:text-sm">Quantum Encrypted</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};