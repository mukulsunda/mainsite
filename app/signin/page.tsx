"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Eye, EyeOff, ArrowRight, Mail, Lock, Check, Sparkles } from 'lucide-react';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';

export default function SignIn() {
  const supabase = createClient();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false
  });
  const [errors, setErrors] = useState<{email?: string; password?: string}>({});

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
    setErrors({}); // Clear previous errors

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) {
        setErrors({ ...errors, email: error.message }); // Display error under email or generic
        return;
      }

      router.push('/account'); // Redirect to account page
      router.refresh(); // Refresh to update server components
    } catch (error) {
      console.error(error);
      setErrors({ ...errors, email: 'An unexpected error occurred' });
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

  return (
    <main className="min-h-screen bg-white flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-md">
          {/* Logo */}
          <Link href="/" className="inline-flex items-center gap-2 mb-10">
            <div className="w-10 h-10 bg-neo-yellow rounded-xl flex items-center justify-center">
              <span className="text-xl font-black text-neo-black">B</span>
            </div>
            <span className="text-2xl font-black text-neo-black">Box<span className="text-neo-yellow">Pox</span></span>
          </Link>

          <h1 className="text-3xl md:text-4xl font-black mb-2 tracking-tight text-neo-black">Welcome back</h1>
          <p className="text-neo-black/60 mb-8">
            Sign in to continue to your account
          </p>

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
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={`w-full pl-11 pr-4 py-3.5 border-2 rounded-xl focus:outline-none transition-colors ${
                    errors.email ? 'border-red-500 focus:border-red-500' : 'border-neo-black/10 focus:border-neo-yellow'
                  }`}
                  placeholder="you@example.com"
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
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className={`w-full pl-11 pr-12 py-3.5 border-2 rounded-xl focus:outline-none transition-colors ${
                    errors.password ? 'border-red-500 focus:border-red-500' : 'border-neo-black/10 focus:border-neo-yellow'
                  }`}
                  placeholder="Enter your password"
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
              <Link href="#" className="text-sm font-bold text-neo-black hover:text-neo-yellow transition-colors">
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-neo-black text-white font-bold rounded-xl hover:bg-neo-black/90 transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
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
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full h-px bg-neo-black/10"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="px-4 bg-white text-sm text-neo-black/50 font-medium">or continue with</span>
            </div>
          </div>

          {/* Social Sign In */}
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
  );
}
