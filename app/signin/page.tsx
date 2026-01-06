"use client";

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { Eye, EyeOff, ArrowRight, Mail, Lock, Check, Sparkles, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';

function SignInForm() {
  const supabase = createClient();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false
  });
  const [errors, setErrors] = useState<{email?: string; password?: string; general?: string}>({});

  // Check for registration success message
  useEffect(() => {
    if (searchParams.get('registered') === 'true') {
      setSuccessMessage('Account created successfully! Please check your email to verify your account, then sign in.');
    }
    if (searchParams.get('verified') === 'true') {
      setSuccessMessage('Email verified! You can now sign in.');
    }
    if (searchParams.get('reset') === 'true') {
      setSuccessMessage('Password reset successful! Please sign in with your new password.');
    }
  }, [searchParams]);

  const validateForm = () => {
    const newErrors: {email?: string; password?: string} = {};
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsLoading(true);
    setErrors({});
    setSuccessMessage('');

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) {
        if (error.message.includes('Invalid login credentials')) {
          setErrors({ general: 'Invalid email or password. Please try again.' });
        } else if (error.message.includes('Email not confirmed')) {
          setErrors({ general: 'Please verify your email address before signing in. Check your inbox for the verification link.' });
        } else {
          setErrors({ general: error.message });
        }
        return;
      }

      if (data.user) {
        router.push('/');
        router.refresh();
      }
    } catch (error) {
      console.error(error);
      setErrors({ general: 'An unexpected error occurred. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!formData.email) {
      setErrors({ email: 'Please enter your email address first' });
      return;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setErrors({ email: 'Please enter a valid email address' });
      return;
    }

    setIsLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(formData.email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      });

      if (error) {
        setErrors({ general: error.message });
      } else {
        setSuccessMessage('Password reset email sent! Check your inbox.');
      }
    } catch (error) {
      console.error(error);
      setErrors({ general: 'Failed to send reset email. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const features = [
    'Access your order history',
    'Track shipments in real-time',
    'Save favorites & wishlists',
    'Exclusive member offers'
  ];

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        }
      });
      
      if (error) {
        setErrors({ general: error.message });
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error);
      setErrors({ general: 'Failed to sign in with Google. Please try again.' });
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Full-screen loading overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-white/95 backdrop-blur-sm z-50 flex flex-col items-center justify-center">
          <div className="text-center">
            <div className="relative mb-6">
              <div className="w-16 h-16 border-4 border-neo-yellow/30 rounded-full"></div>
              <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-neo-yellow rounded-full animate-spin"></div>
            </div>
            <h3 className="text-xl font-bold text-neo-black mb-2">Signing you in...</h3>
            <p className="text-neo-black/60 text-sm">Please wait a moment</p>
          </div>
        </div>
      )}

      <main className="min-h-screen bg-white flex">
        {/* Left Side - Form */}
        <div className="flex-1 flex items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-md">
          {/* Logo */}
          <Link href="/" className="inline-flex items-center gap-2 mb-10">
            <Image 
              src="/logo.png" 
              alt="BoxPox Logo" 
              width={50} 
              height={50} 
              className="h-12 w-auto"
            />
          </Link>

          <h1 className="text-3xl md:text-4xl font-black mb-2 tracking-tight text-neo-black">Welcome back</h1>
          <p className="text-neo-black/60 mb-8">
            Sign in to continue to your account
          </p>

          {/* Success Message */}
          {successMessage && (
            <div className="mb-6 p-4 bg-green-50 border-2 border-green-200 rounded-xl flex items-start gap-3">
              <CheckCircle size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-green-800">{successMessage}</p>
            </div>
          )}

          {/* Error Message */}
          {errors.general && (
            <div className="mb-6 p-4 bg-red-50 border-2 border-red-200 rounded-xl flex items-start gap-3">
              <AlertCircle size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-800">{errors.general}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
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
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                    if (errors.email) setErrors({ ...errors, email: undefined });
                  }}
                  className={`w-full pl-11 pr-4 py-3.5 border-2 rounded-xl focus:outline-none transition-colors ${
                    errors.email ? 'border-red-500 focus:border-red-500' : 'border-neo-black/10 focus:border-neo-yellow'
                  }`}
                  placeholder="you@example.com"
                  disabled={isLoading}
                />
              </div>
              {errors.email && <p className="mt-1.5 text-sm text-red-500">{errors.email}</p>}
            </div>

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
                  onChange={(e) => {
                    setFormData({ ...formData, password: e.target.value });
                    if (errors.password) setErrors({ ...errors, password: undefined });
                  }}
                  className={`w-full pl-11 pr-12 py-3.5 border-2 rounded-xl focus:outline-none transition-colors ${
                    errors.password ? 'border-red-500 focus:border-red-500' : 'border-neo-black/10 focus:border-neo-yellow'
                  }`}
                  placeholder="Enter your password"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-neo-black/40 hover:text-neo-black transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && <p className="mt-1.5 text-sm text-red-500">{errors.password}</p>}
            </div>

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2.5 cursor-pointer group">
                <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-colors ${
                  formData.remember ? 'bg-neo-yellow border-neo-yellow' : 'border-neo-black/20 group-hover:border-neo-black/40'
                }`}>
                  {formData.remember && <Check size={14} className="text-neo-black" />}
                </div>
                <input
                  type="checkbox"
                  checked={formData.remember}
                  onChange={(e) => setFormData({ ...formData, remember: e.target.checked })}
                  className="sr-only"
                />
                <span className="text-sm text-neo-black/70">Remember me</span>
              </label>
              <button 
                type="button"
                onClick={handleForgotPassword}
                className="text-sm font-bold text-neo-black hover:text-neo-yellow transition-colors"
              >
                Forgot password?
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-neo-black text-white font-bold rounded-xl hover:bg-neo-black/90 transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <Loader2 size={20} className="animate-spin" />
                  Signing in...
                </span>
              ) : (
                <>
                  Sign In
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-neo-black/10"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-neo-black/50">or continue with</span>
            </div>
          </div>

          {/* Google Sign In */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            className="w-full py-4 bg-white border-2 border-neo-black/10 font-bold rounded-xl hover:border-neo-black/30 hover:bg-neo-light-gray transition-all flex items-center justify-center gap-3 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>

          {/* Sign Up Link */}
          <p className="mt-8 text-center text-sm text-neo-black/60">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="font-bold text-neo-black hover:text-neo-yellow transition-colors">
              Create one free
            </Link>
          </p>
        </div>
      </div>

      {/* Right Side - Branding */}
      <div className="hidden lg:flex flex-1 bg-neo-black items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute inset-0 grid-bg-dark opacity-30" />
        
        {/* Decorative elements */}
        <div className="absolute top-20 right-20 w-32 h-32 bg-neo-yellow/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-40 h-40 bg-neo-yellow/10 rounded-full blur-3xl" />
        
        <div className="relative z-10 text-center text-white max-w-md">
          <div className="w-20 h-20 mx-auto mb-8 bg-neo-yellow rounded-2xl flex items-center justify-center shadow-2xl">
            <Sparkles size={36} className="text-neo-black" />
          </div>
          <h2 className="text-3xl font-black mb-4">Box of Possibility</h2>
          <p className="text-white/60 leading-relaxed mb-10">
            Sign in to access your account, track orders, and discover new innovations.
          </p>
          
          {/* Features */}
          <div className="space-y-4 text-left">
            {features.map((feature, i) => (
              <div key={i} className="flex items-center gap-3 bg-white/5 rounded-xl px-4 py-3 border border-white/10">
                <div className="w-6 h-6 bg-neo-yellow rounded-full flex items-center justify-center flex-shrink-0">
                  <Check size={14} className="text-neo-black" />
                </div>
                <span className="text-white/80 text-sm font-medium">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
    </>
  );
}

export default function SignIn() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Loader2 size={32} className="animate-spin text-neo-black" />
      </div>
    }>
      <SignInForm />
    </Suspense>
  );
}
