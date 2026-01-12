"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Eye, EyeOff, ArrowRight, Check, User, Mail, Lock, Shield, Truck, Gift, Zap, AlertCircle, Loader2 } from 'lucide-react';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';

export default function SignUp() {
  const supabase = createClient();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    terms: false,
    newsletter: true
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [generalError, setGeneralError] = useState('');

  const passwordRequirements = [
    { label: 'At least 8 characters', met: formData.password.length >= 8 },
    { label: 'Contains uppercase letter', met: /[A-Z]/.test(formData.password) },
    { label: 'Contains a number', met: /[0-9]/.test(formData.password) },
    { label: 'Contains special character', met: /[!@#$%^&*]/.test(formData.password) },
  ];

  const allRequirementsMet = passwordRequirements.every(req => req.met);

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (!allRequirementsMet) {
      newErrors.password = 'Password does not meet requirements';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (!formData.terms) {
      newErrors.terms = 'You must accept the terms';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (currentStep === 1 && validateStep1()) {
      setCurrentStep(2);
    }
  };

  const handleGoogleSignUp = async () => {
    setIsLoading(true);
    setGeneralError('');
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback?signup=true`,
        }
      });
      
      if (error) {
        setGeneralError(error.message);
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error);
      setGeneralError('Failed to sign up with Google. Please try again.');
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep2()) return;
    
    setIsLoading(true);
    setGeneralError('');
    
    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            first_name: formData.firstName,
            last_name: formData.lastName,
            newsletter: formData.newsletter,
          },
        },
      });

      if (error) {
        if (error.message.includes('already registered')) {
          setGeneralError('This email is already registered. Please sign in instead.');
        } else {
          setGeneralError(error.message);
        }
        return;
      }

      // Check if email confirmation is required
      if (data.user && !data.session) {
        // Email confirmation required
        router.push('/signin?registered=true');
      } else if (data.session) {
        // Auto logged in - go to home page
        router.push('/');
        router.refresh();
      }
    } catch (error) {
      console.error(error);
      setGeneralError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const benefits = [
    { icon: <Truck size={20} />, title: 'Free Shipping', desc: 'On orders over ₹999' },
    { icon: <Gift size={20} />, title: 'Welcome Gift', desc: '10% off first order' },
    { icon: <Zap size={20} />, title: 'Early Access', desc: 'New product launches' },
    { icon: <Shield size={20} />, title: 'Secure Account', desc: 'Protected data' },
  ];

  return (
    <main className="min-h-screen bg-neo-black flex">
      {/* Left Side - Branding (Hidden on mobile) */}
      <div className="hidden lg:flex flex-1 bg-neo-yellow items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-20" />
        
        {/* Decorative elements */}
        <div className="absolute top-10 left-10 w-24 h-24 bg-neo-black/10 rounded-full blur-2xl" />
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-neo-black/5 rounded-full blur-3xl" />
        
        <div className="relative z-10 text-neo-black max-w-lg">
          <div className="mb-8">
            <Image 
              src="/logo.png" 
              alt="BoxPox Logo" 
              width={80} 
              height={80} 
              className="h-20 w-auto shadow-xl rounded-2xl"
            />
          </div>
          
          <h2 className="text-4xl font-black mb-4 leading-tight">
            Start Your Journey<br />with BoxPox
          </h2>
          <p className="text-neo-black/70 leading-relaxed mb-10 text-lg">
            Create an account to unlock exclusive benefits, track orders, and be the first to know about new innovations.
          </p>
          
          {/* Benefits Grid */}
          <div className="grid grid-cols-2 gap-4">
            {benefits.map((benefit, i) => (
              <div key={i} className="bg-white/50 backdrop-blur-sm rounded-2xl p-4 border border-neo-black/10">
                <div className="w-10 h-10 bg-neo-black rounded-xl flex items-center justify-center text-neo-yellow mb-3">
                  {benefit.icon}
                </div>
                <h4 className="font-bold text-sm text-neo-black">{benefit.title}</h4>
                <p className="text-xs text-neo-black/60">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex-1 flex flex-col min-h-screen md:justify-center p-5 md:p-12 pt-16 md:pt-12 safe-area-inset">
        <div className="w-full max-w-md mx-auto">
          {/* Logo */}
          <Link href="/" className="inline-flex items-center gap-2 mb-6 md:mb-8">
            <Image 
              src="/logo.png" 
              alt="BoxPox Logo" 
              width={50} 
              height={50} 
              className="h-10 md:h-12 w-auto"
            />
          </Link>

          {/* Progress Indicator */}
          <div className="flex items-center gap-2 mb-6 md:mb-8">
            <div className={`flex-1 h-1.5 rounded-full transition-colors ${currentStep >= 1 ? 'bg-neo-yellow' : 'bg-white/10'}`} />
            <div className={`flex-1 h-1.5 rounded-full transition-colors ${currentStep >= 2 ? 'bg-neo-yellow' : 'bg-white/10'}`} />
          </div>

          <h1 className="text-2xl md:text-4xl font-black mb-1 md:mb-2 tracking-tight text-white">
            {currentStep === 1 ? 'Create account' : 'Set your password'}
          </h1>
          <p className="text-white/60 mb-6 md:mb-8 text-sm md:text-base">
            {currentStep === 1 ? 'Join the BoxPox community today' : 'Choose a strong password to secure your account'}
          </p>

          {/* General Error Message */}
          {generalError && (
            <div className="mb-5 md:mb-6 p-3.5 md:p-4 bg-red-500/10 border border-red-500/30 rounded-2xl flex items-start gap-3">
              <AlertCircle size={18} className="text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-400">{generalError}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
            {currentStep === 1 ? (
              <>
                {/* Name Fields */}
                <div className="grid grid-cols-2 gap-3 md:gap-4">
                  <div>
                    <label htmlFor="firstName" className="form-label">
                      First name
                    </label>
                    <div className="relative">
                      <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                      <input
                        id="firstName"
                        type="text"
                        autoComplete="given-name"
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        className={`robot-input pl-12 ${errors.firstName ? 'border-red-500' : ''}`}
                        placeholder="John"
                      />
                    </div>
                    {errors.firstName && <p className="mt-1 text-xs text-red-400">{errors.firstName}</p>}
                  </div>
                  <div>
                    <label htmlFor="lastName" className="form-label">
                      Last name
                    </label>
                    <input
                      id="lastName"
                      type="text"
                      autoComplete="family-name"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className={`robot-input ${errors.lastName ? 'border-red-500' : ''}`}
                      placeholder="Doe"
                    />
                    {errors.lastName && <p className="mt-1 text-xs text-red-400">{errors.lastName}</p>}
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="form-label">
                    Email address
                  </label>
                  <div className="relative">
                    <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                    <input
                      id="email"
                      type="email"
                      autoComplete="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={`robot-input pl-12 ${errors.email ? 'border-red-500' : ''}`}
                      placeholder="you@example.com"
                    />
                  </div>
                  {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
                </div>

                {/* Newsletter Opt-in */}
                <label className="flex items-start gap-3 cursor-pointer p-4 bg-white/5 rounded-2xl border border-white/10 active:scale-[0.99] transition-transform">
                  <div className={`w-5 h-5 mt-0.5 rounded-lg border-2 flex items-center justify-center transition-colors flex-shrink-0 ${
                    formData.newsletter ? 'bg-neo-yellow border-neo-yellow' : 'border-white/20'
                  }`}>
                    {formData.newsletter && <Check size={14} className="text-neo-black" />}
                  </div>
                  <input
                    type="checkbox"
                    checked={formData.newsletter}
                    onChange={(e) => setFormData({ ...formData, newsletter: e.target.checked })}
                    className="sr-only"
                  />
                  <div>
                    <span className="text-sm font-bold text-white block">Get product updates</span>
                    <span className="text-xs text-white/60">Be the first to know about new products and offers</span>
                  </div>
                </label>

                <button
                  type="button"
                  onClick={handleNextStep}
                  disabled={isLoading}
                  className="robot-btn w-full justify-center"
                >
                  Continue
                  <ArrowRight size={18} />
                </button>
              </>
            ) : (
              <>
                {/* Password */}
                <div>
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <div className="relative">
                    <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="new-password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className={`robot-input pl-12 pr-12 ${errors.password ? 'border-red-500' : ''}`}
                      placeholder="Create a password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white p-1"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  
                  {/* Password Requirements */}
                  {formData.password.length > 0 && (
                    <div className="mt-3 grid grid-cols-2 gap-2">
                      {passwordRequirements.map((req, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs">
                          <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
                            req.met ? 'bg-green-500' : 'bg-white/10'
                          }`}>
                            {req.met && <Check size={10} className="text-white" />}
                          </div>
                          <span className={req.met ? 'text-green-400' : 'text-white/50'}>{req.label}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Confirm Password */}
                <div>
                  <label htmlFor="confirmPassword" className="form-label">
                    Confirm password
                  </label>
                  <div className="relative">
                    <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                    <input
                      id="confirmPassword"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="new-password"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      className={`robot-input pl-12 pr-12 ${errors.confirmPassword ? 'border-red-500' : ''}`}
                      placeholder="Confirm your password"
                    />
                    {formData.confirmPassword && formData.password === formData.confirmPassword && (
                      <Check size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-green-400" />
                    )}
                  </div>
                  {errors.confirmPassword && <p className="mt-1 text-xs text-red-400">{errors.confirmPassword}</p>}
                </div>

                {/* Terms */}
                <label className="flex items-start gap-3 cursor-pointer active:opacity-80 transition-opacity">
                  <div className={`w-5 h-5 mt-0.5 rounded-lg border-2 flex items-center justify-center transition-colors flex-shrink-0 ${
                    formData.terms ? 'bg-neo-yellow border-neo-yellow' : errors.terms ? 'border-red-500' : 'border-white/20'
                  }`}>
                    {formData.terms && <Check size={14} className="text-neo-black" />}
                  </div>
                  <input
                    type="checkbox"
                    checked={formData.terms}
                    onChange={(e) => setFormData({ ...formData, terms: e.target.checked })}
                    className="sr-only"
                  />
                  <span className="text-sm text-white/70">
                    I agree to the{' '}
                    <Link href="/terms" className="font-bold text-white hover:text-neo-yellow transition-colors">
                      Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link href="/privacy" className="font-bold text-white hover:text-neo-yellow transition-colors">
                      Privacy Policy
                    </Link>
                  </span>
                </label>
                {errors.terms && <p className="text-xs text-red-400">{errors.terms}</p>}

                {/* Buttons */}
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="px-6 py-4 border border-white/10 text-white font-bold rounded-full hover:bg-white/5 active:scale-[0.98] transition-all"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="robot-btn flex-1 justify-center"
                  >
                    {isLoading ? (
                      <span className="flex items-center gap-2">
                        <Loader2 className="animate-spin h-5 w-5" />
                        Creating...
                      </span>
                    ) : (
                      <>
                        Create Account
                        <ArrowRight size={18} />
                      </>
                    )}
                  </button>
                </div>
              </>
            )}
          </form>

          {/* Social Sign Up - Only show on step 1 */}
          {currentStep === 1 && (
            <>
              <div className="relative my-6 md:my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full h-px bg-white/10"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="px-4 bg-neo-black text-sm text-white/50 font-medium">or sign up with</span>
                </div>
              </div>

              <button 
                onClick={handleGoogleSignUp}
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2.5 px-4 py-4 bg-white/5 border border-white/10 rounded-full font-bold text-sm hover:bg-white/10 active:scale-[0.98] transition-all disabled:opacity-50"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with Google
              </button>
            </>
          )}

          {/* Sign In Link - Always visible with prominent button */}
          <div className="mt-5 md:mt-6 pt-5 md:pt-6 border-t border-white/10">
            <p className="text-center text-sm text-white/60 mb-3">
              Already have an account?
            </p>
            <Link 
              href="/signin" 
              className="robot-btn-outline w-full justify-center"
            >
              Sign In
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
