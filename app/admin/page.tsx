import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';
import { 
  Package, 
  DollarSign, 
  Clock, 
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Printer,
  Truck
} from 'lucide-react';

export default async function AdminDashboard() {
  const supabase = await createClient();
  
  // Fetch dashboard stats
  const { data: orders } = await supabase
    .from('boxprint_orders')
    .select('*')
    .order('created_at', { ascending: false });
  
  const allOrders = orders || [];
  
  // Calculate stats
  const stats = {
    totalOrders: allOrders.length,
    pendingOrders: allOrders.filter(o => o.status === 'pending').length,
    printingOrders: allOrders.filter(o => o.status === 'printing').length,
    completedOrders: allOrders.filter(o => o.status === 'completed').length,
    totalRevenue: allOrders.filter(o => o.payment_status === 'paid').reduce((sum, o) => sum + (o.total_price || 0), 0),
    todayOrders: allOrders.filter(o => {
      const today = new Date();
      const orderDate = new Date(o.created_at);
      return orderDate.toDateString() === today.toDateString();
    }).length,
  };
  
  // Recent orders (last 5)
  const recentOrders = allOrders.slice(0, 5);
  
  const statCards = [
    { 
      label: 'Total Orders', 
      value: stats.totalOrders, 
      icon: Package,
      color: 'bg-blue-500',
      change: `+${stats.todayOrders} today`
    },
    { 
      label: 'Pending', 
      value: stats.pendingOrders, 
      icon: Clock,
      color: 'bg-amber-500',
      change: 'Awaiting action'
    },
    { 
      label: 'Printing', 
      value: stats.printingOrders, 
      icon: Printer,
      color: 'bg-purple-500',
      change: 'In progress'
    },
    { 
      label: 'Revenue', 
      value: `₹${stats.totalRevenue.toLocaleString('en-IN')}`, 
      icon: DollarSign,
      color: 'bg-green-500',
      change: 'Total collected'
    },
  ];
  
  const getStatusBadge = (status: string) => {
    const statusColors: Record<string, string> = {
      pending: 'bg-amber-100 text-amber-700',
      confirmed: 'bg-blue-100 text-blue-700',
      printing: 'bg-purple-100 text-purple-700',
      quality_check: 'bg-cyan-100 text-cyan-700',
      shipped: 'bg-indigo-100 text-indigo-700',
      delivered: 'bg-teal-100 text-teal-700',
      completed: 'bg-green-100 text-green-700',
      cancelled: 'bg-gray-100 text-gray-700',
      failed: 'bg-red-100 text-red-700',
    };
    return statusColors[status] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-neutral-900">Dashboard</h1>
        <p className="text-neutral-500 text-sm mt-1">Overview of your BoxPrint operations</p>
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, i) => (
          <div key={i} className="bg-white rounded-xl border border-neutral-200 p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-neutral-500">{stat.label}</p>
                <p className="text-2xl font-bold text-neutral-900 mt-1">{stat.value}</p>
                <p className="text-xs text-neutral-400 mt-1">{stat.change}</p>
              </div>
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon size={20} className="text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Pending Actions */}
        <div className="bg-white rounded-xl border border-neutral-200 p-5">
          <h3 className="font-bold text-neutral-900 flex items-center gap-2 mb-4">
            <AlertCircle size={18} className="text-amber-500" />
            Needs Attention
          </h3>
          <div className="space-y-3">
            {stats.pendingOrders > 0 && (
              <Link 
                href="/admin/orders?status=pending"
                className="flex items-center justify-between p-3 bg-amber-50 rounded-lg hover:bg-amber-100 transition-colors"
              >
                <span className="text-sm text-amber-700">{stats.pendingOrders} pending orders</span>
                <span className="text-amber-600">→</span>
              </Link>
            )}
            {stats.printingOrders > 0 && (
              <Link 
                href="/admin/orders?status=printing"
                className="flex items-center justify-between p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
              >
                <span className="text-sm text-purple-700">{stats.printingOrders} currently printing</span>
                <span className="text-purple-600">→</span>
              </Link>
            )}
            {stats.pendingOrders === 0 && stats.printingOrders === 0 && (
              <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg">
                <CheckCircle size={16} className="text-green-500" />
                <span className="text-sm text-green-700">All caught up!</span>
              </div>
            )}
          </div>
        </div>
        
        {/* Status Distribution */}
        <div className="bg-white rounded-xl border border-neutral-200 p-5">
          <h3 className="font-bold text-neutral-900 flex items-center gap-2 mb-4">
            <TrendingUp size={18} className="text-blue-500" />
            Order Status
          </h3>
          <div className="space-y-2">
            {['pending', 'confirmed', 'printing', 'shipped', 'completed'].map((status) => {
              const count = allOrders.filter(o => o.status === status).length;
              const percentage = allOrders.length > 0 ? (count / allOrders.length) * 100 : 0;
              return (
                <div key={status} className="flex items-center gap-3">
                  <span className="text-xs text-neutral-500 w-20 capitalize">{status}</span>
                  <div className="flex-1 bg-neutral-100 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${getStatusBadge(status).split(' ')[0]}`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-xs font-mono text-neutral-500 w-8">{count}</span>
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Quick Links */}
        <div className="bg-white rounded-xl border border-neutral-200 p-5">
          <h3 className="font-bold text-neutral-900 flex items-center gap-2 mb-4">
            <Truck size={18} className="text-green-500" />
            Quick Actions
          </h3>
          <div className="space-y-2">
            <Link 
              href="/admin/orders"
              className="flex items-center justify-between p-3 border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors"
            >
              <span className="text-sm">View All Orders</span>
              <span>→</span>
            </Link>
            <Link 
              href="/admin/orders?status=printing"
              className="flex items-center justify-between p-3 border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors"
            >
              <span className="text-sm">Active Print Jobs</span>
              <span>→</span>
            </Link>
            <Link 
              href="/admin/files"
              className="flex items-center justify-between p-3 border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors"
            >
              <span className="text-sm">Manage Files</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Recent Orders Table */}
      <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
        <div className="px-5 py-4 border-b border-neutral-200 flex items-center justify-between">
          <h3 className="font-bold text-neutral-900">Recent Orders</h3>
          <Link href="/admin/orders" className="text-sm text-blue-600 hover:underline">
            View all →
          </Link>
        </div>
        
        {recentOrders.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-neutral-50 text-xs text-neutral-500 uppercase tracking-wider">
                <tr>
                  <th className="px-5 py-3 text-left">Order</th>
                  <th className="px-5 py-3 text-left">Customer</th>
                  <th className="px-5 py-3 text-left">File</th>
                  <th className="px-5 py-3 text-left">Material</th>
                  <th className="px-5 py-3 text-right">Amount</th>
                  <th className="px-5 py-3 text-center">Status</th>
                  <th className="px-5 py-3 text-left">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-neutral-50 transition-colors">
                    <td className="px-5 py-4">
                      <Link href={`/admin/orders/${order.id}`} className="font-mono text-sm text-blue-600 hover:underline">
                        {order.order_number}
                      </Link>
                    </td>
                    <td className="px-5 py-4">
                      <p className="text-sm text-neutral-900">{order.customer_name || 'N/A'}</p>
                      <p className="text-xs text-neutral-500">{order.customer_email}</p>
                    </td>
                    <td className="px-5 py-4">
                      <p className="text-sm text-neutral-900 truncate max-w-[150px]">{order.file_name}</p>
                      <p className="text-xs text-neutral-500">{order.file_type}</p>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        {order.color_hex && (
                          <div 
                            className="w-4 h-4 rounded border border-neutral-300"
                            style={{ backgroundColor: order.color_hex }}
                          />
                        )}
                        <span className="text-sm">{order.material}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <span className="text-sm font-medium">₹{order.total_price?.toLocaleString('en-IN')}</span>
                    </td>
                    <td className="px-5 py-4 text-center">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full capitalize ${getStatusBadge(order.status)}`}>
                        {order.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <p className="text-sm text-neutral-500">
                        {new Date(order.created_at).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short'
                        })}
                      </p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="px-5 py-12 text-center">
            <Package size={48} className="mx-auto text-neutral-300 mb-4" />
            <p className="text-neutral-500">No orders yet</p>
            <p className="text-sm text-neutral-400 mt-1">Orders will appear here once customers start ordering</p>
          </div>
        )}
      </div>
    </div>
  );
}
