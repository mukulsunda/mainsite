"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Eye, EyeOff, ArrowRight, Check, User, Mail, Lock, Shield, Truck, Gift, Zap } from 'lucide-react';
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep2()) return;
    
    
    try {
      const { error } = await supabase.auth.signUp({
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
        setErrors({ ...errors, submit: error.message });
        return;
      }

      // Success! Redirect to dashboard or show confirmation
      router.push('/signin?registered=true');
    } catch (error) {
      console.error(error);
      setErrors({ ...errors, submit: 'An unexpected error occurred' });
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
    <main className="min-h-screen bg-white flex">
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
              <div key={i} className="bg-white/50 backdrop-blur-sm rounded-xl p-4 border border-neo-black/10">
                <div className="w-10 h-10 bg-neo-black rounded-lg flex items-center justify-center text-neo-yellow mb-3">
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
      <div className="flex-1 flex items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-md">
          {/* Logo */}
          <Link href="/" className="inline-flex items-center gap-2 mb-8">
            <Image 
              src="/logo.png" 
              alt="BoxPox Logo" 
              width={50} 
              height={50} 
              className="h-12 w-auto"
            />
          </Link>

          {/* Progress Indicator */}
          <div className="flex items-center gap-2 mb-8">
            <div className={`flex-1 h-1.5 rounded-full ${currentStep >= 1 ? 'bg-neo-yellow' : 'bg-neo-black/10'}`} />
            <div className={`flex-1 h-1.5 rounded-full ${currentStep >= 2 ? 'bg-neo-yellow' : 'bg-neo-black/10'}`} />
          </div>

          <h1 className="text-3xl md:text-4xl font-black mb-2 tracking-tight text-neo-black">
            {currentStep === 1 ? 'Create account' : 'Set your password'}
          </h1>
          <p className="text-neo-black/60 mb-8">
            {currentStep === 1 ? 'Join the BoxPox community today' : 'Choose a strong password to secure your account'}
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {currentStep === 1 ? (
              <>
                {/* Name Fields */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-bold mb-2 text-neo-black">
                      First name
                    </label>
                    <div className="relative">
                      <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-neo-black/30" />
                      <input
                        id="firstName"
                        type="text"
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        className={`w-full pl-11 pr-4 py-3.5 border-2 rounded-xl focus:outline-none transition-colors ${
                          errors.firstName ? 'border-red-500' : 'border-neo-black/10 focus:border-neo-yellow'
                        }`}
                        placeholder="John"
                      />
                    </div>
                    {errors.firstName && <p className="mt-1 text-sm text-red-500">{errors.firstName}</p>}
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-bold mb-2 text-neo-black">
                      Last name
                    </label>
                    <input
                      id="lastName"
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className={`w-full px-4 py-3.5 border-2 rounded-xl focus:outline-none transition-colors ${
                        errors.lastName ? 'border-red-500' : 'border-neo-black/10 focus:border-neo-yellow'
                      }`}
                      placeholder="Doe"
                    />
                    {errors.lastName && <p className="mt-1 text-sm text-red-500">{errors.lastName}</p>}
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-bold mb-2 text-neo-black">
                    Email address
                  </label>
                  <div className="relative">
                    <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-neo-black/30" />
                    <input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={`w-full pl-11 pr-4 py-3.5 border-2 rounded-xl focus:outline-none transition-colors ${
                        errors.email ? 'border-red-500' : 'border-neo-black/10 focus:border-neo-yellow'
                      }`}
                      placeholder="you@example.com"
                    />
                  </div>
                  {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                </div>

                {/* Newsletter Opt-in */}
                <label className="flex items-start gap-3 cursor-pointer p-4 bg-neo-light-gray rounded-xl border border-neo-black/5">
                  <div className={`w-5 h-5 mt-0.5 rounded-md border-2 flex items-center justify-center transition-colors flex-shrink-0 ${
                    formData.newsletter ? 'bg-neo-yellow border-neo-yellow' : 'border-neo-black/20'
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
                    <span className="text-sm font-bold text-neo-black block">Get product updates</span>
                    <span className="text-xs text-neo-black/60">Be the first to know about new products and offers</span>
                  </div>
                </label>

                {/* Next Button */}
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="w-full py-4 bg-neo-black text-white font-bold rounded-xl hover:bg-neo-black/90 transition-all flex items-center justify-center gap-2"
                >
                  Continue
                  <ArrowRight size={18} />
                </button>
              </>
            ) : (
              <>
                {/* Password */}
                <div>
                  <label htmlFor="password" className="block text-sm font-bold mb-2 text-neo-black">
                    Password
                  </label>
                  <div className="relative">
                    <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-neo-black/30" />
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className={`w-full pl-11 pr-12 py-3.5 border-2 rounded-xl focus:outline-none transition-colors ${
                        errors.password ? 'border-red-500' : 'border-neo-black/10 focus:border-neo-yellow'
                      }`}
                      placeholder="Create a password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-neo-black/40 hover:text-neo-black"
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
                            req.met ? 'bg-green-500' : 'bg-neo-black/10'
                          }`}>
                            {req.met && <Check size={10} className="text-white" />}
                          </div>
                          <span className={req.met ? 'text-green-600' : 'text-neo-black/50'}>{req.label}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Confirm Password */}
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-bold mb-2 text-neo-black">
                    Confirm password
                  </label>
                  <div className="relative">
                    <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-neo-black/30" />
                    <input
                      id="confirmPassword"
                      type={showPassword ? 'text' : 'password'}
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      className={`w-full pl-11 pr-4 py-3.5 border-2 rounded-xl focus:outline-none transition-colors ${
                        errors.confirmPassword ? 'border-red-500' : 'border-neo-black/10 focus:border-neo-yellow'
                      }`}
                      placeholder="Confirm your password"
                    />
                    {formData.confirmPassword && formData.password === formData.confirmPassword && (
                      <Check size={20} className="absolute right-4 top-1/2 -translate-y-1/2 text-green-500" />
                    )}
                  </div>
                  {errors.confirmPassword && <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>}
                </div>

                {/* Terms */}
                <label className="flex items-start gap-3 cursor-pointer">
                  <div className={`w-5 h-5 mt-0.5 rounded-md border-2 flex items-center justify-center transition-colors flex-shrink-0 ${
                    formData.terms ? 'bg-neo-yellow border-neo-yellow' : errors.terms ? 'border-red-500' : 'border-neo-black/20'
                  }`}>
                    {formData.terms && <Check size={14} className="text-neo-black" />}
                  </div>
                  <input
                    type="checkbox"
                    checked={formData.terms}
                    onChange={(e) => setFormData({ ...formData, terms: e.target.checked })}
                    className="sr-only"
                  />
                  <span className="text-sm text-neo-black/70">
                    I agree to the{' '}
                    <Link href="#" className="font-bold text-neo-black hover:text-neo-yellow transition-colors">
                      Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link href="#" className="font-bold text-neo-black hover:text-neo-yellow transition-colors">
                      Privacy Policy
                    </Link>
                  </span>
                </label>
                {errors.terms && <p className="text-sm text-red-500">{errors.terms}</p>}

                {/* Buttons */}
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="px-6 py-4 border-2 border-neo-black/10 text-neo-black font-bold rounded-xl hover:border-neo-black/30 transition-all"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 py-4 bg-neo-black text-white font-bold rounded-xl hover:bg-neo-black/90 transition-all flex items-center justify-center gap-2 disabled:opacity-60"
                  >
                    {isLoading ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
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
              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full h-px bg-neo-black/10"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="px-4 bg-white text-sm text-neo-black/50 font-medium">or sign up with</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button className="flex items-center justify-center gap-2.5 px-4 py-3.5 border-2 border-neo-black/10 rounded-xl font-bold text-sm hover:border-neo-black/30 hover:bg-neo-light-gray transition-all">
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Google
                </button>
                <button className="flex items-center justify-center gap-2.5 px-4 py-3.5 border-2 border-neo-black/10 rounded-xl font-bold text-sm hover:border-neo-black/30 hover:bg-neo-light-gray transition-all">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  GitHub
                </button>
              </div>
            </>
          )}

          {/* Sign In Link */}
          <p className="mt-8 text-center text-sm text-neo-black/60">
            Already have an account?{' '}
            <Link href="/signin" className="font-bold text-neo-black hover:text-neo-yellow transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
