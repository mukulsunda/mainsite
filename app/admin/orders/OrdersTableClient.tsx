'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { 
  Search, 
  Eye,
  ChevronLeft,
  ChevronRight,
  Package
} from 'lucide-react';
import { BoxPrintOrder, ORDER_STATUS_CONFIG } from '../types';
import FileDownloadLink from './components/FileDownloadLink';

interface OrdersTableClientProps {
  orders: BoxPrintOrder[];
  totalPages: number;
  currentPage: number;
  statusOptions: { value: string; label: string }[];
  materialOptions: { value: string; label: string }[];
  currentStatus: string;
  currentMaterial: string;
  currentSearch: string;
}

export default function OrdersTableClient({
  orders,
  totalPages,
  currentPage,
  statusOptions,
  materialOptions,
  currentStatus,
  currentMaterial,
  currentSearch,
}: OrdersTableClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [search, setSearch] = useState(currentSearch);
  const [status, setStatus] = useState(currentStatus);
  const [material, setMaterial] = useState(currentMaterial);
  
  const updateFilters = (newParams: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(newParams).forEach(([key, value]) => {
      if (value && value !== 'all') {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });
    params.set('page', '1'); // Reset to first page on filter change
    router.push(`/admin/orders?${params.toString()}`);
  };
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateFilters({ search, status, material });
  };
  
  const goToPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());
    router.push(`/admin/orders?${params.toString()}`);
  };
  
  const getStatusBadge = (orderStatus: string) => {
    const config = ORDER_STATUS_CONFIG[orderStatus as keyof typeof ORDER_STATUS_CONFIG];
    if (!config) return 'bg-gray-100 text-gray-700';
    return `${config.bgColor} ${config.color}`;
  };

  return (
    <>
      {/* Filters Bar */}
      <div className="bg-white rounded-xl border border-neutral-200 p-4">
        <form onSubmit={handleSearch} className="flex flex-wrap gap-4">
          {/* Search */}
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                placeholder="Search orders, customers..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent text-sm"
              />
            </div>
          </div>
          
          {/* Status Filter */}
          <select
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
              updateFilters({ search, status: e.target.value, material });
            }}
            className="px-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 text-sm bg-white"
          >
            {statusOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          
          {/* Material Filter */}
          <select
            value={material}
            onChange={(e) => {
              setMaterial(e.target.value);
              updateFilters({ search, status, material: e.target.value });
            }}
            className="px-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 text-sm bg-white"
          >
            {materialOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          
          <button
            type="submit"
            className="px-4 py-2 bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 transition-colors text-sm"
          >
            Apply Filters
          </button>
        </form>
      </div>
      
      {/* Orders Table */}
      <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
        {orders.length > 0 ? (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-neutral-50 text-xs text-neutral-500 uppercase tracking-wider">
                  <tr>
                    <th className="px-5 py-3 text-left">Order #</th>
                    <th className="px-5 py-3 text-left">Customer</th>
                    <th className="px-5 py-3 text-left">File</th>
                    <th className="px-5 py-3 text-left">Config</th>
                    <th className="px-5 py-3 text-right">Weight</th>
                    <th className="px-5 py-3 text-right">Amount</th>
                    <th className="px-5 py-3 text-center">Status</th>
                    <th className="px-5 py-3 text-left">Created</th>
                    <th className="px-5 py-3 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100">
                  {orders.map((order) => (
                    <tr key={order.id} className="hover:bg-neutral-50 transition-colors">
                      <td className="px-5 py-4">
                        <Link 
                          href={`/admin/orders/${order.id}`} 
                          className="font-mono text-sm text-blue-600 hover:underline font-medium"
                        >
                          {order.order_number}
                        </Link>
                      </td>
                      <td className="px-5 py-4">
                        <p className="text-sm font-medium text-neutral-900">{order.customer_name || 'Guest'}</p>
                        <p className="text-xs text-neutral-500">{order.customer_email}</p>
                      </td>
                      <td className="px-5 py-4">
                        <p className="text-sm text-neutral-900 truncate max-w-[120px]" title={order.file_name}>
                          {order.file_name}
                        </p>
                        <p className="text-xs text-neutral-500">
                          {order.file_type.toUpperCase()} • {(order.file_size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          {order.color_hex && (
                            <div 
                              className="w-4 h-4 rounded border border-neutral-300 shrink-0"
                              style={{ backgroundColor: order.color_hex }}
                              title={order.color}
                            />
                          )}
                          <div>
                            <p className="text-sm">{order.material}</p>
                            <p className="text-xs text-neutral-500">{order.quality} • {order.infill}% infill</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-right">
                        <p className="text-sm font-mono">{order.estimated_weight?.toFixed(1)}g</p>
                        <p className="text-xs text-neutral-500">{order.estimated_print_time}</p>
                      </td>
                      <td className="px-5 py-4 text-right">
                        <p className="text-sm font-bold">₹{order.total_price?.toLocaleString('en-IN')}</p>
                        <p className="text-xs text-neutral-500">×{order.quantity}</p>
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
                            month: 'short',
                            year: 'numeric'
                          })}
                        </p>
                        <p className="text-xs text-neutral-400">
                          {new Date(order.created_at).toLocaleTimeString('en-IN', {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </td>
                      <td className="px-5 py-4 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <Link
                            href={`/admin/orders/${order.id}`}
                            className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
                            title="View Details"
                          >
                            <Eye size={16} className="text-neutral-600" />
                          </Link>
                          <FileDownloadLink 
                            fileName={order.file_name}
                            filePath={order.file_path}
                            variant="icon"
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="px-5 py-4 border-t border-neutral-200 flex items-center justify-between">
                <p className="text-sm text-neutral-500">
                  Page {currentPage} of {totalPages}
                </p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="p-2 border border-neutral-200 rounded-lg hover:bg-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  {[...Array(Math.min(5, totalPages))].map((_, i) => {
                    let page;
                    if (totalPages <= 5) {
                      page = i + 1;
                    } else if (currentPage <= 3) {
                      page = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      page = totalPages - 4 + i;
                    } else {
                      page = currentPage - 2 + i;
                    }
                    return (
                      <button
                        key={page}
                        onClick={() => goToPage(page)}
                        className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                          currentPage === page
                            ? 'bg-neutral-900 text-white'
                            : 'hover:bg-neutral-100'
                        }`}
                      >
                        {page}
                      </button>
                    );
                  })}
                  <button
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="p-2 border border-neutral-200 rounded-lg hover:bg-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="px-5 py-16 text-center">
            <Package size={48} className="mx-auto text-neutral-300 mb-4" />
            <p className="text-neutral-500 font-medium">No orders found</p>
            <p className="text-sm text-neutral-400 mt-1">
              {currentSearch || currentStatus !== 'all' || currentMaterial !== 'all'
                ? 'Try adjusting your filters'
                : 'Orders will appear here when customers place them'}
            </p>
          </div>
        )}
      </div>
    </>
  );
}
