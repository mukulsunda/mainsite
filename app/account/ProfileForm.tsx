"use client";

import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { User, Mail, Phone, MapPin, Building, Hash, Save, Loader2, CheckCircle, AlertCircle, Camera } from 'lucide-react';

interface ProfileFormProps {
  user: {
    id: string;
    email: string;
    user_metadata: {
      first_name?: string;
      last_name?: string;
    };
  };
  initialProfile?: {
    first_name: string | null;
    last_name: string | null;
    phone: string | null;
    address: string | null;
    city: string | null;
    state: string | null;
    zip_code: string | null;
  };
}

export default function ProfileForm({ user, initialProfile }: ProfileFormProps) {
  const supabase = createClient();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [formData, setFormData] = useState({
    first_name: initialProfile?.first_name || user.user_metadata.first_name || '',
    last_name: initialProfile?.last_name || user.user_metadata.last_name || '',
    phone: initialProfile?.phone || '',
    address: initialProfile?.address || '',
    city: initialProfile?.city || '',
    state: initialProfile?.state || '',
    zip_code: initialProfile?.zip_code || '',
  });

  // Clear message after 5 seconds
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    try {
      // First, check if profile exists
      const { data: existingProfile } = await supabase
        .from('profiles')
        .select('id')
        .eq('id', user.id)
        .single();

      let profileError;

      if (existingProfile) {
        // Update existing profile
        const { error } = await supabase
          .from('profiles')
          .update({
            first_name: formData.first_name,
            last_name: formData.last_name,
            phone: formData.phone,
            address: formData.address,
            city: formData.city,
            state: formData.state,
            zip_code: formData.zip_code,
            updated_at: new Date().toISOString(),
          })
          .eq('id', user.id);
        profileError = error;
      } else {
        // Insert new profile
        const { error } = await supabase
          .from('profiles')
          .insert({
            id: user.id,
            email: user.email,
            first_name: formData.first_name,
            last_name: formData.last_name,
            phone: formData.phone,
            address: formData.address,
            city: formData.city,
            state: formData.state,
            zip_code: formData.zip_code,
          });
        profileError = error;
      }

      if (profileError) {
        console.error('Profile error details:', profileError);
        throw profileError;
      }

      // Update user metadata
      const { error: metadataError } = await supabase.auth.updateUser({
        data: {
          first_name: formData.first_name,
          last_name: formData.last_name,
        },
      });

      if (metadataError) {
        console.error('Metadata update error:', metadataError);
      }

      setMessage({ type: 'success', text: 'Profile updated successfully!' });
    } catch (error) {
      console.error('Profile update error:', error);
      setMessage({ type: 'error', text: 'Failed to update profile. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const initials = (formData.first_name?.[0] || user.email[0] || '?').toUpperCase();

  return (
    <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
      {/* Profile Header */}
      <div className="bg-neo-yellow p-6">
        <div className="flex items-center gap-6">
          <div className="relative">
            <div className="w-24 h-24 bg-neo-black rounded-full flex items-center justify-center border-4 border-white">
              <span className="text-4xl font-black text-neo-yellow">{initials}</span>
            </div>
            <button className="absolute bottom-0 right-0 w-8 h-8 bg-white rounded-full flex items-center justify-center border-2 border-neo-black hover:bg-neo-black hover:text-white transition-colors">
              <Camera size={16} className="text-neo-black" />
            </button>
          </div>
          <div>
            <h2 className="text-2xl font-black mb-1 text-neo-black">
              {formData.first_name || formData.last_name 
                ? `${formData.first_name} ${formData.last_name}`.trim() 
                : 'Set up your profile'}
            </h2>
            <p className="text-neo-black/70">{user.email}</p>
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        {/* Success/Error Message */}
        {message && (
          <div className={`p-4 rounded-xl flex items-start gap-3 ${
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

        {/* Personal Information */}
        <div>
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <User size={20} />
            Personal Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="form-label">First Name</label>
              <div className="relative">
                <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                <input
                  type="text"
                  value={formData.first_name}
                  onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                  className="robot-input pl-11"
                  placeholder="John"
                />
              </div>
            </div>
            <div>
              <label className="form-label">Last Name</label>
              <input
                type="text"
                value={formData.last_name}
                onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                className="robot-input"
                placeholder="Doe"
              />
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div>
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Phone size={20} />
            Contact Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="form-label">Email</label>
              <div className="relative">
                <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                <input
                  type="email"
                  value={user.email}
                  disabled
                  className="w-full pl-11 pr-4 py-3 border border-white/10 rounded-xl bg-white/5 text-white/60 cursor-not-allowed"
                />
              </div>
              <p className="text-xs text-white/50 mt-1">Email cannot be changed</p>
            </div>
            <div>
              <label className="form-label">Phone</label>
              <div className="relative">
                <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="robot-input pl-11"
                  placeholder="+91 98765 43210"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Address */}
        <div>
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <MapPin size={20} />
            Address
          </h3>
          <div className="space-y-4">
            <div>
              <label className="form-label">Street Address</label>
              <div className="relative">
                <MapPin size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="robot-input pl-11"
                  placeholder="123 Main Street, Apt 4B"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <label className="form-label">City</label>
                <div className="relative">
                  <Building size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="robot-input pl-11"
                    placeholder="Mumbai"
                  />
                </div>
              </div>
              <div>
                <label className="form-label">State</label>
                <input
                  type="text"
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  className="robot-input"
                  placeholder="Maharashtra"
                />
              </div>
              <div className="col-span-2 md:col-span-1">
                <label className="form-label">ZIP Code</label>
                <div className="relative">
                  <Hash size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                  <input
                    type="text"
                    value={formData.zip_code}
                    onChange={(e) => setFormData({ ...formData, zip_code: e.target.value })}
                    className="robot-input pl-11"
                    placeholder="400001"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end pt-4 border-t border-white/10">
          <button
            type="submit"
            disabled={isLoading}
            className="robot-btn disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save size={20} />
                Save Changes
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
