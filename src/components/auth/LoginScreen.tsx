import React, { useState } from 'react';
import { Shield, Fingerprint, Smartphone, Mail, Eye, EyeOff, UserPlus, Building, Globe, Zap, Phone, AlertTriangle, CheckCircle, ArrowLeft } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export const LoginScreen: React.FC = () => {
  const [authMode, setAuthMode] = useState<'login' | 'signup' | 'verify' | 'reset'>('login');
  const [loginMethod, setLoginMethod] = useState<'email' | 'phone'>('email');
  const [accountType, setAccountType] = useState<'individual' | 'enterprise'>('individual');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    displayName: '',
    username: '',
    companyName: '',
    jobTitle: '',
    industry: '',
    acceptTerms: false
  });

  const { signUp, signIn, signInWithPhone, resetPassword, resendVerification, loading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    
    try {
      if (authMode === 'login') {
        if (loginMethod === 'email') {
          await signIn(formData.email, formData.password);
        } else {
          await signInWithPhone(formData.phone, formData.password);
        }
      } else if (authMode === 'signup') {
        // Validation
        if (formData.password !== formData.confirmPassword) {
          setError('Passwords do not match');
          return;
        }
        if (!formData.acceptTerms) {
          setError('Please accept the terms and conditions');
          return;
        }
        if (accountType === 'enterprise' && !formData.companyName) {
          setError('Company name is required for enterprise accounts');
          return;
        }
        if (!formData.email && !formData.phone) {
          setError('Email or phone number is required');
          return;
        }

        await signUp({
          email: formData.email || undefined,
          phone: formData.phone || undefined,
          password: formData.password,
          displayName: formData.displayName,
          username: formData.username,
          accountType,
          companyName: formData.companyName || undefined,
          jobTitle: formData.jobTitle || undefined,
          industry: formData.industry || undefined
        });

        setAuthMode('verify');
        setSuccess('Account created! Please check your email/phone for verification.');
      } else if (authMode === 'reset') {
        if (!formData.email) {
          setError('Email is required for password reset');
          return;
        }
        await resetPassword(formData.email);
        setSuccess('Password reset link sent to your email');
      }
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleResendVerification = async () => {
    try {
      await resendVerification(loginMethod);
      setSuccess('Verification link resent!');
    } catch (error: any) {
      setError(error.message);
    }
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
              {authMode === 'login' && 'Welcome Back'}
              {authMode === 'signup' && 'Join Linkverse 2050'}
              {authMode === 'verify' && 'Verify Account'}
              {authMode === 'reset' && 'Reset Password'}
            </h1>
            <p className="text-gray-400 text-sm sm:text-base">
              {authMode === 'login' && "2050's most secure communication platform"}
              {authMode === 'signup' && "Create your quantum-secured account"}
              {authMode === 'verify' && "Check your email/phone for verification"}
              {authMode === 'reset' && "Enter your email to reset password"}
            </p>
          </div>

          {/* Error/Success Messages */}
          {error && (
            <div className="mb-4 p-3 bg-red-600/20 border border-red-500/30 rounded-lg flex items-center space-x-2">
              <AlertTriangle className="w-4 h-4 text-red-400" />
              <span className="text-red-300 text-sm">{error}</span>
            </div>
          )}

          {success && (
            <div className="mb-4 p-3 bg-green-600/20 border border-green-500/30 rounded-lg flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span className="text-green-300 text-sm">{success}</span>
            </div>
          )}

          {/* Verification Screen */}
          {authMode === 'verify' && (
            <div className="text-center space-y-6">
              <div className="w-16 h-16 mx-auto bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Check Your {loginMethod === 'email' ? 'Email' : 'Phone'}</h3>
                <p className="text-gray-400 text-sm">
                  We've sent a verification link to {loginMethod === 'email' ? formData.email : formData.phone}
                </p>
              </div>
              <div className="space-y-3">
                <button
                  onClick={handleResendVerification}
                  className="w-full p-3 bg-blue-600 rounded-xl text-white hover:bg-blue-700 transition-colors"
                >
                  Resend Verification
                </button>
                <button
                  onClick={() => setAuthMode('login')}
                  className="w-full p-3 bg-gray-700 rounded-xl text-white hover:bg-gray-600 transition-colors flex items-center justify-center space-x-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Login</span>
                </button>
              </div>
            </div>
          )}

          {/* Reset Password Screen */}
          {authMode === 'reset' && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="email"
                placeholder="Enter your email address"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full p-3 sm:p-4 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 transition-colors text-sm sm:text-base"
                required
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full p-3 sm:p-4 bg-gradient-to-r from-cyan-600 to-purple-600 rounded-xl text-white font-semibold hover:from-cyan-700 hover:to-purple-700 transition-all disabled:opacity-50"
              >
                {loading ? 'Sending...' : 'Send Reset Link'}
              </button>
              <button
                type="button"
                onClick={() => setAuthMode('login')}
                className="w-full p-3 bg-gray-700 rounded-xl text-white hover:bg-gray-600 transition-colors flex items-center justify-center space-x-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Login</span>
              </button>
            </form>
          )}

          {/* Login/Signup Forms */}
          {(authMode === 'login' || authMode === 'signup') && (
            <>
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

              {/* Account Type for Signup */}
              {authMode === 'signup' && (
                <div className="mb-6">
                  <h3 className="text-white font-semibold mb-3">Account Type</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      onClick={() => setAccountType('individual')}
                      className={`p-4 rounded-xl transition-all text-left ${
                        accountType === 'individual'
                          ? 'bg-blue-600 text-white border-2 border-blue-500'
                          : 'bg-gray-800 text-gray-300 hover:bg-gray-700 border-2 border-gray-700'
                      }`}
                    >
                      <UserPlus className="w-6 h-6 mb-2" />
                      <h4 className="font-semibold">Individual</h4>
                      <p className="text-xs opacity-75">Personal account</p>
                    </button>
                    <button
                      onClick={() => setAccountType('enterprise')}
                      className={`p-4 rounded-xl transition-all text-left ${
                        accountType === 'enterprise'
                          ? 'bg-purple-600 text-white border-2 border-purple-500'
                          : 'bg-gray-800 text-gray-300 hover:bg-gray-700 border-2 border-gray-700'
                      }`}
                    >
                      <Building className="w-6 h-6 mb-2" />
                      <h4 className="font-semibold">Enterprise</h4>
                      <p className="text-xs opacity-75">Business account</p>
                    </button>
                  </div>
                </div>
              )}

              {/* Login Method Selector */}
              <div className="grid grid-cols-2 gap-2 mb-6">
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
              </div>

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

                    {/* Enterprise Fields */}
                    {accountType === 'enterprise' && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <input
                          type="text"
                          placeholder="Company Name"
                          value={formData.companyName}
                          onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                          className="w-full p-3 sm:p-4 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 transition-colors text-sm sm:text-base"
                          required
                        />
                        <input
                          type="text"
                          placeholder="Job Title"
                          value={formData.jobTitle}
                          onChange={(e) => setFormData({...formData, jobTitle: e.target.value})}
                          className="w-full p-3 sm:p-4 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 transition-colors text-sm sm:text-base"
                        />
                      </div>
                    )}

                    {accountType === 'enterprise' && (
                      <input
                        type="text"
                        placeholder="Industry"
                        value={formData.industry}
                        onChange={(e) => setFormData({...formData, industry: e.target.value})}
                        className="w-full p-3 sm:p-4 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 transition-colors text-sm sm:text-base"
                      />
                    )}
                  </>
                )}
                
                {/* Email/Phone Input */}
                <div>
                  <input
                    type={loginMethod === 'email' ? 'email' : 'tel'}
                    placeholder={loginMethod === 'email' ? 'Email address' : 'Phone number (+1234567890)'}
                    value={loginMethod === 'email' ? formData.email : formData.phone}
                    onChange={(e) => setFormData({
                      ...formData,
                      [loginMethod]: e.target.value
                    })}
                    className="w-full p-3 sm:p-4 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 transition-colors text-sm sm:text-base"
                    required
                  />
                </div>

                {/* Password Input */}
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
                
                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full p-3 sm:p-4 bg-gradient-to-r from-cyan-600 to-purple-600 rounded-xl text-white font-semibold hover:from-cyan-700 hover:to-purple-700 transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 text-sm sm:text-base"
                >
                  {loading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>
                        {authMode === 'login' ? 'Signing In...' : 
                         authMode === 'signup' ? 'Creating Account...' : 
                         'Processing...'}
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center space-x-2">
                      {authMode === 'login' ? <Shield className="w-4 h-4" /> : 
                       authMode === 'signup' ? <UserPlus className="w-4 h-4" /> :
                       <Mail className="w-4 h-4" />}
                      <span>
                        {authMode === 'login' ? 'Sign In with Quantum Security' : 
                         authMode === 'signup' ? `Create ${accountType === 'enterprise' ? 'Enterprise' : 'Individual'} Account` :
                         'Send Reset Link'}
                      </span>
                    </div>
                  )}
                </button>
              </form>

              {/* Additional Options */}
              <div className="mt-6 space-y-3 text-center">
                {authMode === 'login' && (
                  <button
                    onClick={() => setAuthMode('reset')}
                    className="text-cyan-400 hover:text-cyan-300 text-sm"
                  >
                    Forgot your password?
                  </button>
                )}
              </div>
            </>
          )}

          {/* Enterprise Features Badge */}
          {authMode === 'signup' && accountType === 'enterprise' && (
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