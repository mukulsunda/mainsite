import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export default async function AdminSettingsPage() {
  const supabase = await createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/signin');
  
  // Check if super_admin
  const { data: adminUser } = await supabase
    .from('admin_users')
    .select('*')
    .eq('user_id', user.id)
    .eq('is_active', true)
    .single();
  
  if (!adminUser || adminUser.role !== 'super_admin') {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="text-center">
          <h2 className="text-xl font-bold text-neutral-900 mb-2">Access Denied</h2>
          <p className="text-neutral-500">Only super admins can access settings.</p>
        </div>
      </div>
    );
  }
  
  // Fetch all admin users
  const { data: admins } = await supabase
    .from('admin_users')
    .select('*')
    .order('created_at', { ascending: true });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-neutral-900">Settings</h1>
        <p className="text-neutral-500 text-sm mt-1">
          Manage admin users and system settings
        </p>
      </div>
      
      {/* Admin Users */}
      <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
        <div className="px-5 py-4 border-b border-neutral-200">
          <h3 className="font-bold text-neutral-900">Admin Users</h3>
        </div>
        
        <div className="divide-y divide-neutral-100">
          {admins?.map((admin) => (
            <div key={admin.id} className="px-5 py-4 flex items-center justify-between">
              <div>
                <p className="font-medium text-neutral-900">{admin.user_id}</p>
                <p className="text-sm text-neutral-500 capitalize">
                  {admin.role.replace('_', ' ')}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className={`px-2 py-1 text-xs rounded-full ${
                  admin.is_active 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-red-100 text-red-700'
                }`}>
                  {admin.is_active ? 'Active' : 'Inactive'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Quick Setup Guide */}
      <div className="bg-blue-50 rounded-xl border border-blue-200 p-5">
        <h3 className="font-bold text-blue-900 mb-3">Quick Setup</h3>
        <p className="text-sm text-blue-700 mb-3">
          To add yourself as an admin, run this SQL in your Supabase SQL Editor:
        </p>
        <pre className="bg-blue-100 p-3 rounded-lg text-xs overflow-x-auto text-blue-900">
{`INSERT INTO admin_users (user_id, role, permissions)
VALUES (
  'YOUR_USER_ID_HERE',
  'super_admin',
  '{"orders": true, "users": true, "files": true, "settings": true}'
);`}
        </pre>
        <p className="text-sm text-blue-700 mt-3">
          Your user ID: <code className="bg-blue-200 px-1 rounded">{user.id}</code>
        </p>
      </div>
    </div>
  );
}
