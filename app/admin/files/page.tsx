import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';
import { 
  FileBox, 
  Search, 
  Download,
  Eye,
  HardDrive
} from 'lucide-react';

export default async function FilesPage() {
  const supabase = await createClient();
  
  // Fetch all orders with files
  const { data: orders } = await supabase
    .from('boxprint_orders')
    .select('id, order_number, file_name, file_type, file_size, file_path, customer_email, created_at, status')
    .order('created_at', { ascending: false });
  
  const allFiles = orders || [];
  
  // Calculate total storage
  const totalStorage = allFiles.reduce((sum, f) => sum + (f.file_size || 0), 0);
  
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };
  
  const getFileIcon = (type: string) => {
    const icons: Record<string, string> = {
      stl: '🔺',
      obj: '📐',
      '3mf': '📦',
      step: '⚙️',
      stp: '⚙️',
    };
    return icons[type.toLowerCase()] || '📄';
  };
  
  const getStatusBadge = (status: string) => {
    const colors: Record<string, string> = {
      pending: 'bg-amber-100 text-amber-700',
      confirmed: 'bg-blue-100 text-blue-700',
      printing: 'bg-purple-100 text-purple-700',
      completed: 'bg-green-100 text-green-700',
      cancelled: 'bg-gray-100 text-gray-700',
    };
    return colors[status] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Files</h1>
          <p className="text-neutral-500 text-sm mt-1">
            Manage uploaded 3D model files
          </p>
        </div>
      </div>
      
      {/* Storage Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-neutral-200 p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-neutral-500">Total Files</p>
              <p className="text-2xl font-bold text-neutral-900 mt-1">{allFiles.length}</p>
            </div>
            <div className="bg-blue-500 p-3 rounded-lg">
              <FileBox size={20} className="text-white" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-neutral-200 p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-neutral-500">Total Storage</p>
              <p className="text-2xl font-bold text-neutral-900 mt-1">{formatFileSize(totalStorage)}</p>
            </div>
            <div className="bg-purple-500 p-3 rounded-lg">
              <HardDrive size={20} className="text-white" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-neutral-200 p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-neutral-500">Avg File Size</p>
              <p className="text-2xl font-bold text-neutral-900 mt-1">
                {allFiles.length > 0 ? formatFileSize(totalStorage / allFiles.length) : '0 B'}
              </p>
            </div>
            <div className="bg-green-500 p-3 rounded-lg">
              <FileBox size={20} className="text-white" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Files Table */}
      <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
        <div className="px-5 py-4 border-b border-neutral-200 flex items-center justify-between">
          <h3 className="font-bold text-neutral-900">All Model Files</h3>
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              placeholder="Search files..."
              className="pl-10 pr-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 text-sm"
            />
          </div>
        </div>
        
        {allFiles.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-neutral-50 text-xs text-neutral-500 uppercase tracking-wider">
                <tr>
                  <th className="px-5 py-3 text-left">File</th>
                  <th className="px-5 py-3 text-left">Order</th>
                  <th className="px-5 py-3 text-left">Customer</th>
                  <th className="px-5 py-3 text-right">Size</th>
                  <th className="px-5 py-3 text-center">Status</th>
                  <th className="px-5 py-3 text-left">Uploaded</th>
                  <th className="px-5 py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {allFiles.map((file) => (
                  <tr key={file.id} className="hover:bg-neutral-50 transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{getFileIcon(file.file_type)}</span>
                        <div>
                          <p className="font-medium text-neutral-900 truncate max-w-[200px]" title={file.file_name}>
                            {file.file_name}
                          </p>
                          <p className="text-xs text-neutral-500 uppercase">{file.file_type}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <Link 
                        href={`/admin/orders/${file.id}`} 
                        className="font-mono text-sm text-blue-600 hover:underline"
                      >
                        {file.order_number}
                      </Link>
                    </td>
                    <td className="px-5 py-4">
                      <p className="text-sm text-neutral-600">{file.customer_email}</p>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <span className="text-sm font-mono">{formatFileSize(file.file_size)}</span>
                    </td>
                    <td className="px-5 py-4 text-center">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full capitalize ${getStatusBadge(file.status)}`}>
                        {file.status}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <p className="text-sm text-neutral-500">
                        {new Date(file.created_at).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </p>
                    </td>
                    <td className="px-5 py-4 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <Link
                          href={`/admin/orders/${file.id}`}
                          className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
                          title="View Order"
                        >
                          <Eye size={16} className="text-neutral-600" />
                        </Link>
                        <button
                          className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
                          title="Download File"
                        >
                          <Download size={16} className="text-neutral-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="px-5 py-16 text-center">
            <FileBox size={48} className="mx-auto text-neutral-300 mb-4" />
            <p className="text-neutral-500 font-medium">No files uploaded yet</p>
            <p className="text-sm text-neutral-400 mt-1">
              Files will appear here when customers upload their 3D models
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
