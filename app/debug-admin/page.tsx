import { createClient } from '@/utils/supabase/server';

export default async function DebugAdminPage() {
  const supabase = await createClient();
  
  // 1. Check Auth User
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  
  // 2. Check Admin User
  let adminUser = null;
  let adminError = null;
  
  if (user) {
    const result = await supabase
      .from('admin_users')
      .select('*')
      .eq('user_id', user.id);
      
    adminUser = result.data;
    adminError = result.error;
  }
  
  // 3. Check Admin Table Count (if possible)
  const { count, error: countError } = await supabase
    .from('admin_users')
    .select('*', { count: 'exact', head: true });

  return (
    <div className="p-10 space-y-6 font-mono text-sm">
      <h1 className="text-2xl font-bold">Admin Debugger</h1>
      
      <div className="p-4 border rounded bg-gray-50">
        <h2 className="font-bold mb-2">1. Auth Status</h2>
        {user ? (
          <div className="text-green-600">
            <p>Logged In ✅</p>
            <p>Email: {user.email}</p>
            <p>User ID: {user.id}</p>
          </div>
        ) : (
          <div className="text-red-600">
            <p>Not Logged In ❌</p>
            <p>Error: {authError?.message}</p>
          </div>
        )}
      </div>
      
      <div className="p-4 border rounded bg-gray-50">
        <h2 className="font-bold mb-2">2. Admin Table Check</h2>
        {adminError ? (
          <div className="text-red-600">
            <p>Query Error ❌</p>
            <p>{JSON.stringify(adminError, null, 2)}</p>
          </div>
        ) : (
          <div>
            <p>Query Successful ✅</p>
            <p>Rows Found: {adminUser?.length || 0}</p>
            {adminUser && adminUser.length > 0 ? (
              <pre className="bg-gray-200 p-2 mt-2 rounded">
                {JSON.stringify(adminUser[0], null, 2)}
              </pre>
            ) : (
              <p className="text-orange-600 mt-2">
                User ID not found in admin_users table.
                <br/>
                Please run the INSERT command with the User ID above.
              </p>
            )}
          </div>
        )}
      </div>
      
      <div className="p-4 border rounded bg-gray-50">
        <h2 className="font-bold mb-2">3. Table Existence Check</h2>
        {countError ? (
          <div className="text-red-600">
            <p>Error accessing table ❌</p>
            <p>{countError.message}</p>
            <p className="text-xs mt-1 text-gray-500">
              (If "relation does not exist", run the schema SQL)
              <br/>
              (If "permission denied", RLS policies might be wrong)
            </p>
          </div>
        ) : (
          <p className="text-green-600">
            Table exists and is accessible. Total rows: {count}
          </p>
        )}
      </div>
    </div>
  );
}
