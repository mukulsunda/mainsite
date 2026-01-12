"use client";

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams, useRouter } from 'next/navigation';
import { Eye, EyeOff, Lock, Check, ArrowLeft, Loader2, CheckCircle, AlertCircle, KeyRound } from 'lucide-react';
import { createClient } from '@/utils/supabase/client';

function ResetPasswordForm() {
  const supabase = createClient();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Check if we have access token in URL
  useEffect(() => {
    const code = searchParams.get('code');
    if (code) {
      // Exchange the code for a session
      supabase.auth.exchangeCodeForSession(code);
    }
  }, [searchParams, supabase.auth]);

  const passwordRequirements = [
    { label: 'At least 8 characters', met: formData.password.length >= 8 },
    { label: 'Contains uppercase letter', met: /[A-Z]/.test(formData.password) },
    { label: 'Contains a number', met: /[0-9]/.test(formData.password) },
    { label: 'Contains special character', met: /[!@#$%^&*]/.test(formData.password) },
  ];

  const allRequirementsMet = passwordRequirements.every(req => req.met);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (!allRequirementsMet) {
      newErrors.password = 'Password does not meet all requirements';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setMessage(null);

    try {
      const { error } = await supabase.auth.updateUser({
        password: formData.password,
      });

      if (error) {
        setMessage({ type: 'error', text: error.message });
        return;
      }

      setMessage({ type: 'success', text: 'Password updated successfully! Redirecting to sign in...' });
      
      // Sign out and redirect after 2 seconds
      setTimeout(async () => {
        await supabase.auth.signOut();
        router.push('/signin?reset=true');
      }, 2000);
    } catch (error) {
      console.error(error);
      setMessage({ type: 'error', text: 'An unexpected error occurred. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-neo-black flex items-center justify-center p-6">
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

        {/* Back to Sign In */}
        <Link 
          href="/signin" 
          className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft size={16} />
          Back to Sign In
        </Link>

        <div className="w-16 h-16 bg-neo-yellow rounded-2xl flex items-center justify-center mb-6">
          <KeyRound size={32} className="text-neo-black" />
        </div>

        <h1 className="text-3xl md:text-4xl font-black mb-2 tracking-tight text-white">Reset Password</h1>
        <p className="text-white/60 mb-8">
          Enter your new password below. Make sure it&apos;s strong and secure.
        </p>

        {/* Messages */}
        {message && (
          <div className={`mb-6 p-4 rounded-xl flex items-start gap-3 ${
            message.type === 'success' 
              ? 'bg-green-500/10 border border-green-500/30' 
              : 'bg-red-500/10 border border-red-500/30'
          }`}>
            {message.type === 'success' 
              ? <CheckCircle size={20} className="text-green-400 flex-shrink-0 mt-0.5" />
              : <AlertCircle size={20} className="text-red-400 flex-shrink-0 mt-0.5" />
            }
            <p className={`text-sm ${message.type === 'success' ? 'text-green-400' : 'text-red-400'}`}>
              {message.text}
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* New Password */}
          <div>
            <label htmlFor="password" className="form-label">
              New Password
            </label>
            <div className="relative">
              <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className={`robot-input pl-11 pr-12 ${
                  errors.password ? 'border-red-500' : ''
                }`}
                placeholder="Enter new password"
                disabled={isLoading || message?.type === 'success'}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.password && <p className="mt-1.5 text-sm text-red-400">{errors.password}</p>}

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
              Confirm New Password
            </label>
            <div className="relative">
              <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
              <input
                id="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className={`robot-input pl-11 pr-12 ${
                  errors.confirmPassword ? 'border-red-500' : ''
                }`}
                placeholder="Confirm new password"
                disabled={isLoading || message?.type === 'success'}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
              {formData.confirmPassword && formData.password === formData.confirmPassword && (
                <Check size={20} className="absolute right-12 top-1/2 -translate-y-1/2 text-green-400" />
              )}
            </div>
            {errors.confirmPassword && <p className="mt-1.5 text-sm text-red-400">{errors.confirmPassword}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading || message?.type === 'success'}
            className="w-full robot-btn justify-center disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <Loader2 size={20} className="animate-spin" />
                Updating Password...
              </span>
            ) : message?.type === 'success' ? (
              <span className="flex items-center gap-2">
                <CheckCircle size={20} />
                Password Updated
              </span>
            ) : (
              'Update Password'
            )}
          </button>
        </form>
      </div>
    </main>
  );
}

export default function ResetPassword() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-neo-black flex items-center justify-center">
        <Loader2 size={32} className="animate-spin text-neo-yellow" />
      </div>
    }>
      <ResetPasswordForm />
    </Suspense>
  );
}
