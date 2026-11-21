import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  Lock, 
  LogOut, 
  ShoppingBag, 
  Users, 
  Clock, 
  CheckCircle, 
  XCircle, 
  FileText, 
  DollarSign, 
  RefreshCw, 
  Search, 
  Eye, 
  ExternalLink, 
  Download, 
  Edit3, 
  Plus, 
  Trash2, 
  Mail, 
  Phone, 
  MessageSquare, 
  Check, 
  AlertTriangle,
  Settings,
  Bell,
  Layers,
  Briefcase,
  ChevronRight,
  TrendingUp,
  X
} from 'lucide-react';
import { useSettings } from '../context/SettingsContext';
import { Order, ProjectEnquiry, NotificationLog } from '../types';

interface AdminDashboardProps {
  onBackToSite: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onBackToSite }) => {
  const { settings, services, projects, refreshData, updateSettings } = useSettings();

  // Authentication State
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('st_admin_token'));
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Active Admin Tab
  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'enquiries' | 'services' | 'projects' | 'notifications' | 'settings'>('overview');

  // Data States
  const [metrics, setMetrics] = useState<any>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [enquiries, setEnquiries] = useState<ProjectEnquiry[]>([]);
  const [notifications, setNotifications] = useState<NotificationLog[]>([]);
  const [loading, setLoading] = useState(false);

  // Filters & Selected State
  const [orderSearch, setOrderSearch] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState('All');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [editingService, setEditingService] = useState<any | null>(null);
  const [editingSettings, setEditingSettings] = useState({ ...settings });
  const [settingsSuccess, setSettingsSuccess] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setLoginError(null);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: passwordInput })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Login failed');

      localStorage.setItem('st_admin_token', data.token);
      setToken(data.token);
    } catch (err: any) {
      setLoginError(err.message || 'Invalid password');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('st_admin_token');
    setToken(null);
  };

  // Fetch Admin Data
  const fetchAdminData = async () => {
    if (!token) return;
    setLoading(true);

    try {
      const headers = { 'x-admin-token': token };
      const [metricsRes, ordersRes, enquiriesRes, notifsRes] = await Promise.all([
        fetch('/api/admin/overview', { headers }).then(r => r.json()),
        fetch('/api/admin/orders', { headers }).then(r => r.json()),
        fetch('/api/admin/enquiries', { headers }).then(r => r.json()),
        fetch('/api/admin/notifications', { headers }).then(r => r.json())
      ]);

      setMetrics(metricsRes);
      if (Array.isArray(ordersRes)) setOrders(ordersRes);
      if (Array.isArray(enquiriesRes)) setEnquiries(enquiriesRes);
      if (Array.isArray(notifsRes)) setNotifications(notifsRes);
    } catch (err) {
      console.error("Error fetching admin data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchAdminData();
    }
  }, [token]);

  // Order Actions
  const handleUpdateOrderStatus = async (orderId: string, updates: Partial<Order>) => {
    if (!token) return;
    try {
      const res = await fetch(`/api/admin/orders/${orderId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-token': token
        },
        body: JSON.stringify(updates)
      });
      if (res.ok) {
        const data = await res.json();
        setOrders(prev => prev.map(o => o.id === orderId ? data.order : o));
        if (selectedOrder && selectedOrder.id === orderId) {
          setSelectedOrder(data.order);
        }
        fetchAdminData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Save Settings
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-token': token
        },
        body: JSON.stringify(editingSettings)
      });
      if (res.ok) {
        updateSettings(editingSettings);
        setSettingsSuccess(true);
        setTimeout(() => setSettingsSuccess(false), 3000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Save Service Price
  const handleSaveServicePrice = async (serviceId: string, updatedService: any) => {
    if (!token) return;
    try {
      const res = await fetch(`/api/admin/services/${serviceId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-token': token
        },
        body: JSON.stringify(updatedService)
      });
      if (res.ok) {
        refreshData();
        setEditingService(null);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Export Orders to CSV
  const handleExportCSV = () => {
    if (orders.length === 0) return;
    const headers = ["Order ID", "Customer Name", "Email", "Phone", "Amount", "Payment Status", "Order Status", "Created At"];
    const rows = orders.map(o => [
      `"${o.id}"`,
      `"${o.customer_name}"`,
      `"${o.customer_email}"`,
      `"${o.customer_phone}"`,
      `"${o.total_amount}"`,
      `"${o.payment_status}"`,
      `"${o.order_status}"`,
      `"${o.created_at}"`
    ]);

    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `SUDHARSHAN_TECH_Orders_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtered Orders
  const filteredOrders = orders.filter(o => {
    const matchesSearch = o.id.toLowerCase().includes(orderSearch.toLowerCase()) ||
                          o.customer_name.toLowerCase().includes(orderSearch.toLowerCase()) ||
                          o.customer_email.toLowerCase().includes(orderSearch.toLowerCase()) ||
                          o.customer_phone.includes(orderSearch);
    const matchesStatus = orderStatusFilter === 'All' || o.order_status === orderStatusFilter;
    return matchesSearch && matchesStatus;
  });

  // Login View
  if (!token) {
    return (
      <div className="min-h-screen bg-[#070c18] flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-[#0c1527] border border-slate-800 rounded-3xl p-8 shadow-2xl text-slate-100">
          
          <div className="text-center mb-6">
            <div className="w-14 h-14 bg-blue-600/20 border border-blue-500/30 rounded-2xl flex items-center justify-center mx-auto text-blue-400 mb-3">
              <Shield className="w-7 h-7" />
            </div>
            <h2 className="text-xl font-black text-white">SUDHARSHAN_TECH Admin</h2>
            <p className="text-xs text-slate-400 mt-1">
              Enter master credentials to access orders & company settings.
            </p>
          </div>

          {loginError && (
            <div className="p-3 bg-red-950/60 border border-red-800 rounded-xl text-xs text-red-300 mb-4 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Admin Password / Master PIN
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  placeholder="Enter admin password..."
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 bg-slate-900 border border-slate-700/80 rounded-xl text-xs sm:text-sm text-slate-200 focus:outline-none focus:border-blue-500"
                />
              </div>
              <p className="text-[10px] text-slate-500 mt-1">
                Default: <code>sudharshan@admin2026</code> or <code>admin123</code>
              </p>
            </div>

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 transition-all active:scale-98 disabled:opacity-50"
            >
              {isLoggingIn ? 'Authenticating...' : 'Sign In to Dashboard'}
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-slate-800 text-center">
            <button
              onClick={onBackToSite}
              className="text-xs text-slate-400 hover:text-white transition-colors"
            >
              ← Back to Marketplace Website
            </button>
          </div>

        </div>
      </div>
    );
  }

  // Authenticated Admin Dashboard
  return (
    <div className="min-h-screen bg-[#070c18] text-slate-100 flex flex-col">
      
      {/* Admin Top Navigation */}
      <header className="bg-[#0a1020] border-b border-slate-800 px-4 sm:px-8 py-3.5 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center font-bold text-blue-400">
            ST
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-sm sm:text-base font-extrabold text-white">
                SUDHARSHAN_TECH Admin Panel
              </h1>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                LIVE
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden xs:block">
              Super Admin: Sudharshan P S ({settings.email})
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchAdminData}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
            title="Refresh Live Data"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>

          <button
            onClick={onBackToSite}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>View Marketplace</span>
          </button>

          <button
            onClick={handleLogout}
            className="p-2 text-slate-400 hover:text-red-400 rounded-lg hover:bg-slate-800"
            title="Sign Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Admin Layout with Sidebar Tabs */}
      <div className="flex-1 flex flex-col md:flex-row">
        
        {/* Navigation Sidebar */}
        <aside className="w-full md:w-64 bg-[#080d1a] border-r border-slate-800/80 p-4 shrink-0 space-y-1">
          <button
            onClick={() => setActiveTab('overview')}
            className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'overview'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>Dashboard Overview</span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'orders'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-4 h-4" />
              <span>Orders & Payments</span>
            </div>
            {orders.length > 0 && (
              <span className="px-1.5 py-0.2 rounded-full bg-slate-800 text-[10px]">
                {orders.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('enquiries')}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'enquiries'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <FileText className="w-4 h-4" />
              <span>Project Enquiries</span>
            </div>
            {enquiries.length > 0 && (
              <span className="px-1.5 py-0.2 rounded-full bg-slate-800 text-[10px]">
                {enquiries.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('services')}
            className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'services'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Service Pricing (8)</span>
          </button>

          <button
            onClick={() => setActiveTab('projects')}
            className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'projects'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>Portfolio Projects</span>
          </button>

          <button
            onClick={() => setActiveTab('notifications')}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'notifications'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Bell className="w-4 h-4" />
              <span>Email Audit Logs</span>
            </div>
            {notifications.length > 0 && (
              <span className="px-1.5 py-0.2 rounded-full bg-slate-800 text-[10px]">
                {notifications.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'settings'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Company Contact Settings</span>
          </button>
        </aside>

        {/* Tab Content Panel */}
        <main className="flex-1 p-4 sm:p-8 overflow-y-auto">
          
          {/* TAB 1: OVERVIEW METRICS */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-white">Marketplace Metrics & Health</h2>
                <p className="text-xs text-slate-400">Live operational overview of customer submissions and revenue.</p>
              </div>

              {/* Stat Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-[#0c1527] border border-slate-800 rounded-2xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-slate-400">Total Orders</span>
                    <ShoppingBag className="w-4 h-4 text-blue-400" />
                  </div>
                  <p className="text-2xl font-black text-white">{metrics?.total_orders || orders.length}</p>
                  <p className="text-[10px] text-slate-500 mt-1">{metrics?.orders_today || 0} placed today</p>
                </div>

                <div className="bg-[#0c1527] border border-slate-800 rounded-2xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-slate-400">Awaiting Verification</span>
                    <Clock className="w-4 h-4 text-amber-400" />
                  </div>
                  <p className="text-2xl font-black text-amber-400">
                    {metrics?.awaiting_verification ?? orders.filter(o => o.payment_status === 'Pending Verification').length}
                  </p>
                  <p className="text-[10px] text-slate-500 mt-1">Pending admin confirmation</p>
                </div>

                <div className="bg-[#0c1527] border border-slate-800 rounded-2xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-slate-400">Verified Revenue</span>
                    <DollarSign className="w-4 h-4 text-emerald-400" />
                  </div>
                  <p className="text-2xl font-black text-emerald-400">
                    ₹{(metrics?.total_verified_revenue || 0).toLocaleString('en-IN')}
                  </p>
                  <p className="text-[10px] text-slate-500 mt-1">Confirmed payments</p>
                </div>

                <div className="bg-[#0c1527] border border-slate-800 rounded-2xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-slate-400">Custom Enquiries</span>
                    <FileText className="w-4 h-4 text-cyan-400" />
                  </div>
                  <p className="text-2xl font-black text-cyan-400">
                    {metrics?.pending_enquiries || enquiries.length}
                  </p>
                  <p className="text-[10px] text-slate-500 mt-1">Bespoke project leads</p>
                </div>
              </div>

              {/* Quick Actions & Recent Orders Preview */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* Recent Orders List */}
                <div className="bg-[#0c1527] border border-slate-800 rounded-2xl p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-bold text-white">Recent Customer Orders</h3>
                    <button onClick={() => setActiveTab('orders')} className="text-xs text-blue-400 hover:underline">
                      View All
                    </button>
                  </div>

                  {orders.length === 0 ? (
                    <p className="text-xs text-slate-500 py-6 text-center">No orders placed yet.</p>
                  ) : (
                    <div className="space-y-2.5">
                      {orders.slice(0, 5).map(o => (
                        <div key={o.id} onClick={() => setSelectedOrder(o)} className="p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-blue-500/40 cursor-pointer flex items-center justify-between text-xs">
                          <div>
                            <span className="font-bold text-white">{o.customer_name}</span>
                            <span className="text-[10px] text-slate-400 block">{o.id} • {o.items?.length || 1} items</span>
                          </div>
                          <div className="text-right">
                            <span className="font-extrabold text-blue-400">₹{(o.total_amount || 0).toLocaleString('en-IN')}</span>
                            <span className={`block text-[10px] font-semibold ${
                              o.payment_status === 'Payment Verified' ? 'text-emerald-400' : 'text-amber-400'
                            }`}>{o.payment_status}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Notification System Health */}
                <div className="bg-[#0c1527] border border-slate-800 rounded-2xl p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-bold text-white">Email Notification Health</h3>
                    <button onClick={() => setActiveTab('notifications')} className="text-xs text-blue-400 hover:underline">
                      Logs
                    </button>
                  </div>

                  <div className="p-3.5 bg-slate-900 rounded-xl border border-slate-800 text-xs space-y-2 mb-4">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Target Notification Email:</span>
                      <span className="font-mono text-cyan-300 font-semibold">{settings.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Total Alerts Dispatched:</span>
                      <span className="font-bold text-white">{notifications.length}</span>
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    All customer orders, custom quotations, and payment uploads trigger real-time dispatch and are saved in the immutable database audit trail.
                  </p>
                </div>

              </div>
            </div>
          )}

          {/* TAB 2: LIVE ORDERS TABLE */}
          {activeTab === 'orders' && (
            <div className="space-y-6">
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-white">Live Customer Orders</h2>
                  <p className="text-xs text-slate-400">Review specifications, verify UPI payments, update status.</p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleExportCSV}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Export CSV</span>
                  </button>
                </div>
              </div>

              {/* Filters & Search */}
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search by Order ID, name, email or phone..."
                    value={orderSearch}
                    onChange={(e) => setOrderSearch(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <select
                  value={orderStatusFilter}
                  onChange={(e) => setOrderStatusFilter(e.target.value)}
                  className="p-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-200"
                >
                  <option value="All">All Statuses</option>
                  <option value="New Enquiry">New Enquiry</option>
                  <option value="Quote Required">Quote Required</option>
                  <option value="Awaiting Payment">Awaiting Payment</option>
                  <option value="Awaiting Payment Verification">Awaiting Payment Verification</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>

              {/* Orders Table */}
              <div className="bg-[#0c1527] border border-slate-800 rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-300">
                    <thead className="bg-[#091124] border-b border-slate-800 text-slate-400 text-[10px] uppercase font-bold tracking-wider">
                      <tr>
                        <th className="p-3.5">Order ID</th>
                        <th className="p-3.5">Customer</th>
                        <th className="p-3.5">Services</th>
                        <th className="p-3.5">Amount</th>
                        <th className="p-3.5">Payment</th>
                        <th className="p-3.5">Order Status</th>
                        <th className="p-3.5">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                      {filteredOrders.length === 0 ? (
                        <tr>
                          <td colSpan={7} className="p-8 text-center text-slate-500">
                            No matching customer orders found.
                          </td>
                        </tr>
                      ) : (
                        filteredOrders.map((order) => (
                          <tr key={order.id} className="hover:bg-slate-900/50 transition-colors">
                            <td className="p-3.5 font-mono font-bold text-blue-400">
                              {order.id}
                            </td>
                            <td className="p-3.5">
                              <span className="font-semibold text-white block">{order.customer_name}</span>
                              <span className="text-[10px] text-slate-500">{order.customer_email}</span>
                            </td>
                            <td className="p-3.5">
                              <span className="truncate max-w-[160px] block font-medium">
                                {(order.items || []).map(i => i.service_title).join(', ')}
                              </span>
                            </td>
                            <td className="p-3.5 font-extrabold text-white">
                              ₹{(order.total_amount || 0).toLocaleString('en-IN')}
                            </td>
                            <td className="p-3.5">
                              <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                                order.payment_status === 'Payment Verified'
                                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                  : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                              }`}>
                                {order.payment_status}
                              </span>
                            </td>
                            <td className="p-3.5">
                              <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                                {order.order_status}
                              </span>
                            </td>
                            <td className="p-3.5">
                              <button
                                onClick={() => setSelectedOrder(order)}
                                className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-blue-400 hover:text-white font-medium flex items-center gap-1"
                              >
                                <Eye className="w-3 h-3" />
                                <span>Inspect</span>
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* TAB 3: CUSTOM PROJECT ENQUIRIES */}
          {activeTab === 'enquiries' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-white">Custom Project Requests</h2>
                <p className="text-xs text-slate-400">Bespoke technical inquiries requiring customized scoping and proposals.</p>
              </div>

              <div className="space-y-4">
                {enquiries.length === 0 ? (
                  <div className="bg-[#0c1527] border border-slate-800 rounded-2xl p-12 text-center text-slate-500 text-xs">
                    No custom project enquiries submitted yet.
                  </div>
                ) : (
                  enquiries.map((enq) => (
                    <div key={enq.id} className="bg-[#0c1527] border border-slate-800 rounded-2xl p-5 space-y-3">
                      <div className="flex flex-col sm:flex-row justify-between items-start gap-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-cyan-400 text-xs">{enq.id}</span>
                            <span className="text-xs px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300">
                              {enq.status}
                            </span>
                          </div>
                          <h3 className="text-base font-bold text-white mt-1">{enq.customer_name} {enq.business_name && `(${enq.business_name})`}</h3>
                        </div>

                        <div className="flex items-center gap-2 text-xs">
                          <a
                            href={`https://wa.me/${enq.customer_phone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(enq.customer_name)},%20inquiring%20about%20your%20SUDHARSHAN_TECH%20project.`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg bg-emerald-950/60 text-emerald-400 hover:bg-emerald-900 flex items-center gap-1"
                          >
                            <MessageSquare className="w-3.5 h-3.5" />
                            <span>WhatsApp</span>
                          </a>
                          <a
                            href={`mailto:${enq.customer_email}`}
                            className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white flex items-center gap-1"
                          >
                            <Mail className="w-3.5 h-3.5" />
                            <span>Email</span>
                          </a>
                        </div>
                      </div>

                      <div className="bg-slate-900/90 rounded-xl p-3 border border-slate-800/80 text-xs text-slate-300 space-y-1">
                        <p><strong>Required Services:</strong> {Array.isArray(enq.services_required) ? enq.services_required.join(', ') : enq.services_required}</p>
                        <p><strong>Budget / Timeline:</strong> {enq.estimated_budget} | {enq.timeline}</p>
                        <p className="mt-2 text-slate-200"><strong>Description:</strong> {enq.project_description}</p>
                        {enq.reference_file && (
                          <p className="pt-1">
                            <a href={enq.reference_file} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                              📎 Download Attached Reference File
                            </a>
                          </p>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* TAB 4: SERVICE PRICING EDITOR */}
          {activeTab === 'services' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-white">Services & Starting Price Management</h2>
                <p className="text-xs text-slate-400">Dynamically configure starting rates and descriptions for the 8 official services.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(services || []).map((srv) => (
                  <div key={srv.id} className="bg-[#0c1527] border border-slate-800 rounded-2xl p-5 space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider">{srv.category}</span>
                        <h3 className="text-base font-bold text-white">{srv.title}</h3>
                      </div>
                      <span className="text-base font-black text-blue-400">₹{srv.starting_price.toLocaleString('en-IN')}</span>
                    </div>

                    <p className="text-xs text-slate-400 line-clamp-2">{srv.short_description}</p>

                    <div className="pt-2 border-t border-slate-800 flex justify-between items-center text-xs">
                      <span className="text-slate-400">Est: {srv.turnaround}</span>
                      <button
                        onClick={() => setEditingService({ ...srv })}
                        className="px-3 py-1 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-[11px] flex items-center gap-1"
                      >
                        <Edit3 className="w-3 h-3" />
                        <span>Edit Price</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: PORTFOLIO PROJECTS */}
          {activeTab === 'projects' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-white">Portfolio Projects Showcase</h2>
                <p className="text-xs text-slate-400">Active showcase projects, GitHub repositories, and tech stacks.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {(projects || []).map(p => (
                  <div key={p.id} className="bg-[#0c1527] border border-slate-800 rounded-2xl p-4 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] text-cyan-400 font-bold uppercase">{p.category}</span>
                      <h4 className="text-sm font-bold text-white mt-0.5">{p.title}</h4>
                      <p className="text-xs text-slate-400 line-clamp-2 mt-1">{p.description}</p>
                    </div>
                    {p.github && (
                      <div className="pt-3 border-t border-slate-800/80 mt-3 text-xs">
                        <a href={p.github} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline flex items-center gap-1 truncate">
                          <span>GitHub: {p.github.split('/').pop()}</span>
                        </a>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: NOTIFICATIONS AUDIT LOGS */}
          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-white">Email Notification Audit Logs</h2>
                <p className="text-xs text-slate-400">Verifiable delivery records for owner alerts and customer confirmations.</p>
              </div>

              <div className="bg-[#0c1527] border border-slate-800 rounded-2xl overflow-hidden">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-[#091124] border-b border-slate-800 text-[10px] uppercase text-slate-400 font-bold">
                    <tr>
                      <th className="p-3.5">Time</th>
                      <th className="p-3.5">Event Type</th>
                      <th className="p-3.5">Recipient</th>
                      <th className="p-3.5">Subject</th>
                      <th className="p-3.5">Delivery Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {notifications.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="p-6 text-center text-slate-500">
                          No notification dispatches logged yet.
                        </td>
                      </tr>
                    ) : (
                      notifications.map(n => (
                        <tr key={n.id} className="hover:bg-slate-900/50">
                          <td className="p-3.5 text-slate-500 whitespace-nowrap">
                            {new Date(n.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </td>
                          <td className="p-3.5 font-mono text-cyan-300 text-[11px]">{n.event_type}</td>
                          <td className="p-3.5">{n.recipient}</td>
                          <td className="p-3.5 max-w-[200px] truncate">{n.subject}</td>
                          <td className="p-3.5">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              n.status === 'sent' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-blue-500/10 text-blue-300'
                            }`}>
                              {n.status}
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 7: COMPANY SETTINGS */}
          {activeTab === 'settings' && (
            <div className="space-y-6 max-w-2xl">
              <div>
                <h2 className="text-xl font-bold text-white">Company Identity & Contact Settings</h2>
                <p className="text-xs text-slate-400">Updates here apply dynamically to the customer marketplace.</p>
              </div>

              {settingsSuccess && (
                <div className="p-3 bg-emerald-950/60 border border-emerald-800 rounded-xl text-xs text-emerald-300 flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Company contact settings updated successfully!</span>
                </div>
              )}

              <form onSubmit={handleSaveSettings} className="bg-[#0c1527] border border-slate-800 rounded-2xl p-6 space-y-4 text-xs">
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Company Tagline</label>
                  <input
                    type="text"
                    value={editingSettings.tagline}
                    onChange={(e) => setEditingSettings({ ...editingSettings, tagline: e.target.value })}
                    className="w-full p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-slate-200"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-slate-300 font-semibold block mb-1">Official Phone</label>
                    <input
                      type="text"
                      value={editingSettings.phone}
                      onChange={(e) => setEditingSettings({ ...editingSettings, phone: e.target.value })}
                      className="w-full p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-slate-200"
                    />
                  </div>
                  <div>
                    <label className="text-slate-300 font-semibold block mb-1">WhatsApp Number</label>
                    <input
                      type="text"
                      value={editingSettings.whatsapp}
                      onChange={(e) => setEditingSettings({ ...editingSettings, whatsapp: e.target.value })}
                      className="w-full p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-slate-200"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-slate-300 font-semibold block mb-1">Notification Email</label>
                    <input
                      type="email"
                      value={editingSettings.email}
                      onChange={(e) => setEditingSettings({ ...editingSettings, email: e.target.value })}
                      className="w-full p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-slate-200"
                    />
                  </div>
                  <div>
                    <label className="text-slate-300 font-semibold block mb-1">UPI ID for GPay</label>
                    <input
                      type="text"
                      value={editingSettings.upi_id}
                      onChange={(e) => setEditingSettings({ ...editingSettings, upi_id: e.target.value })}
                      className="w-full p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-slate-200"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Registered Address</label>
                  <textarea
                    rows={2}
                    value={editingSettings.address}
                    onChange={(e) => setEditingSettings({ ...editingSettings, address: e.target.value })}
                    className="w-full p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-slate-200 resize-none"
                  />
                </div>

                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Google Maps Search Link</label>
                  <input
                    type="text"
                    value={editingSettings.google_maps_url}
                    onChange={(e) => setEditingSettings({ ...editingSettings, google_maps_url: e.target.value })}
                    className="w-full p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-slate-200 font-mono text-[11px]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs"
                >
                  Save Company Settings
                </button>
              </form>
            </div>
          )}

        </main>
      </div>

      {/* INSPECT ORDER DETAIL MODAL */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-2xl bg-[#0c1527] border border-slate-700 rounded-2xl shadow-2xl p-6 text-slate-100 space-y-5 my-8">
            <div className="flex justify-between items-start pb-3 border-b border-slate-800">
              <div>
                <span className="font-mono font-bold text-blue-400 text-xs">ORDER DETAILS</span>
                <h3 className="text-xl font-bold text-white mt-0.5">{selectedOrder.id}</h3>
              </div>
              <button onClick={() => setSelectedOrder(null)} className="p-1 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Customer Details */}
            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 text-xs space-y-1">
              <p><strong>Customer:</strong> {selectedOrder.customer_name} {selectedOrder.business_name && `(${selectedOrder.business_name})`}</p>
              <p><strong>Email:</strong> <a href={`mailto:${selectedOrder.customer_email}`} className="text-blue-400">{selectedOrder.customer_email}</a></p>
              <p><strong>Phone:</strong> <a href={`tel:${selectedOrder.customer_phone}`} className="text-blue-400">{selectedOrder.customer_phone}</a> (<a href={`https://wa.me/${selectedOrder.customer_phone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="text-emerald-400">WhatsApp</a>)</p>
              {selectedOrder.billing_address && <p><strong>Address:</strong> {selectedOrder.billing_address}</p>}
            </div>

            {/* Ordered Services */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Services Ordered</h4>
              <div className="space-y-1.5">
                {(selectedOrder.items || []).map((item, idx) => (
                  <div key={idx} className="bg-slate-900/60 p-2.5 rounded-lg border border-slate-800 flex justify-between items-center text-xs">
                    <div>
                      <span className="font-semibold text-white">{item.service_title}</span>
                      <span className="text-slate-400 block text-[11px]">Package: {item.package_name} (Qty: {item.quantity})</span>
                    </div>
                    <span className="font-bold text-blue-400">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment & UTR Proof Inspection */}
            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 text-xs space-y-2">
              <div className="flex justify-between items-center">
                <span>Payment Method: <strong>{selectedOrder.payment_method}</strong></span>
                <span className="font-bold text-blue-400 text-sm">Total: ₹{(selectedOrder.total_amount || 0).toLocaleString('en-IN')}</span>
              </div>
              {selectedOrder.transaction_ref && (
                <p><strong>UTR / Transaction Ref:</strong> <code className="text-cyan-300 font-mono">{selectedOrder.transaction_ref}</code></p>
              )}
              {selectedOrder.payment_proof && (
                <div className="pt-2">
                  <a href={selectedOrder.payment_proof} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline flex items-center gap-1 font-semibold">
                    <span>🖼️ View Uploaded Payment Screenshot Proof</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}
            </div>

            {/* Update Controls */}
            <div className="pt-2 border-t border-slate-800 space-y-3">
              <h4 className="text-xs font-bold uppercase text-slate-400">Administrative Actions</h4>
              
              <div className="grid grid-cols-2 gap-3">
                {/* Verify Payment Button */}
                <button
                  onClick={() => handleUpdateOrderStatus(selectedOrder.id, { 
                    payment_status: 'Payment Verified', 
                    order_status: 'In Progress' 
                  })}
                  className="py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5"
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>Verify Payment & Start</span>
                </button>

                {/* Reject / Mark Failed */}
                <button
                  onClick={() => handleUpdateOrderStatus(selectedOrder.id, { 
                    payment_status: 'Failed',
                    order_status: 'Cancelled' 
                  })}
                  className="py-2.5 px-3 rounded-xl bg-red-950 hover:bg-red-900 text-red-300 border border-red-800 font-bold text-xs flex items-center justify-center gap-1.5"
                >
                  <XCircle className="w-4 h-4" />
                  <span>Reject Payment</span>
                </button>
              </div>

              {/* Status Selector */}
              <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
                <div>
                  <label className="text-slate-400 block mb-1">Change Order Status</label>
                  <select
                    value={selectedOrder.order_status}
                    onChange={(e) => handleUpdateOrderStatus(selectedOrder.id, { order_status: e.target.value as any })}
                    className="w-full p-2 bg-slate-900 border border-slate-800 rounded-lg text-slate-200"
                  >
                    <option value="New Enquiry">New Enquiry</option>
                    <option value="Quote Required">Quote Required</option>
                    <option value="Quote Sent">Quote Sent</option>
                    <option value="Awaiting Payment">Awaiting Payment</option>
                    <option value="Awaiting Payment Verification">Awaiting Payment Verification</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">Adjust Quoted Price (₹)</label>
                  <input
                    type="number"
                    defaultValue={selectedOrder.total_amount}
                    onBlur={(e) => handleUpdateOrderStatus(selectedOrder.id, { total_amount: Number(e.target.value) })}
                    className="w-full p-2 bg-slate-900 border border-slate-800 rounded-lg text-slate-200 font-mono"
                  />
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* EDIT SERVICE MODAL */}
      {editingService && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-md bg-[#0c1527] border border-slate-700 rounded-2xl shadow-2xl p-6 text-slate-100 space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-slate-800">
              <h3 className="text-base font-bold text-white">Edit Service Starting Price</h3>
              <button onClick={() => setEditingService(null)} className="p-1 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-slate-400 block mb-1">Service Title</label>
                <input
                  type="text"
                  value={editingService.title}
                  onChange={(e) => setEditingService({ ...editingService, title: e.target.value })}
                  className="w-full p-2 bg-slate-900 border border-slate-800 rounded-lg text-slate-200"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Starting Price (₹)</label>
                <input
                  type="number"
                  value={editingService.starting_price}
                  onChange={(e) => setEditingService({ ...editingService, starting_price: Number(e.target.value) })}
                  className="w-full p-2 bg-slate-900 border border-slate-800 rounded-lg text-slate-200 font-mono text-sm"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Estimated Turnaround</label>
                <input
                  type="text"
                  value={editingService.turnaround}
                  onChange={(e) => setEditingService({ ...editingService, turnaround: e.target.value })}
                  className="w-full p-2 bg-slate-900 border border-slate-800 rounded-lg text-slate-200"
                />
              </div>

              <button
                type="button"
                onClick={() => handleSaveServicePrice(editingService.id, editingService)}
                className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold mt-2"
              >
                Save Price Changes
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
