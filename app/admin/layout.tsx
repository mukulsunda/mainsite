import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import AdminLayoutClient from './AdminLayoutClient';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  
  // Check authentication
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  
  if (authError || !user) {
    redirect('/signin?redirect=/admin');
  }
  
  // Check admin role
  const { data: adminUser, error: adminError } = await supabase
    .from('admin_users')
    .select('*')
    .eq('user_id', user.id)
    .single();
  
  if (adminError || !adminUser) {
    redirect('/account?error=unauthorized');
  }
  
  return (
    <AdminLayoutClient 
      user={user} 
      adminUser={adminUser}
    >
      {children}
    </AdminLayoutClient>
  );
}
