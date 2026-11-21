import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  Lock, 
  LogOut, 
  ShoppingBag, 
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
  Mail, 
  Phone, 
  MessageSquare, 
  Check, 
  AlertTriangle,
  Settings,
  Bell,
  Layers,
  Briefcase,
  TrendingUp,
  X,
  Smartphone
} from 'lucide-react';
import { useSettings } from '../context/SettingsContext';
import { Order, ProjectEnquiry, NotificationLog, SmsLog } from '../types';

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
  const [notifSubTab, setNotifSubTab] = useState<'email' | 'sms'>('email');

  // Data States
  const [metrics, setMetrics] = useState<any>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [enquiries, setEnquiries] = useState<ProjectEnquiry[]>([]);
  const [notifications, setNotifications] = useState<NotificationLog[]>([]);
  const [smsLogs, setSmsLogs] = useState<SmsLog[]>([]);
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
      const [metricsRes, ordersRes, enquiriesRes, notifsRes, smsRes] = await Promise.all([
        fetch('/api/admin/overview', { headers }).then(r => r.json()).catch(() => null),
        fetch('/api/admin/orders', { headers }).then(r => r.json()).catch(() => []),
        fetch('/api/admin/enquiries', { headers }).then(r => r.json()).catch(() => []),
        fetch('/api/admin/notifications', { headers }).then(r => r.json()).catch(() => []),
        fetch('/api/admin/sms-logs', { headers }).then(r => r.json()).catch(() => [])
      ]);

      if (metricsRes) setMetrics(metricsRes);
      if (Array.isArray(ordersRes)) setOrders(ordersRes);
      if (Array.isArray(enquiriesRes)) setEnquiries(enquiriesRes);
      if (Array.isArray(notifsRes)) setNotifications(notifsRes);
      if (Array.isArray(smsRes)) setSmsLogs(smsRes);
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

  // Login View - Light Professional Theme
  if (!token) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white border border-slate-200 rounded-3xl p-8 shadow-xl text-slate-800">
          
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-blue-50 border border-blue-200 rounded-2xl flex items-center justify-center mx-auto text-[#155EEF] mb-3 shadow-inner">
              <Shield className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-black text-[#172033]">SUDHARSHAN_TECH</h2>
            <p className="text-xs font-semibold text-[#155EEF] tracking-wider uppercase mt-0.5">Admin Management Portal</p>
            <p className="text-xs text-slate-500 mt-2">
              Enter master credentials to access live orders, verify payments & manage services.
            </p>
          </div>

          {loginError && (
            <div className="p-3 bg-[#FFF1F0] border border-red-200 rounded-xl text-xs text-[#E53935] mb-4 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-[#E53935] shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Admin Password / Master PIN
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  placeholder="Enter admin password..."
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#155EEF]/20 focus:border-[#155EEF] transition-all"
                />
              </div>
              <p className="text-[11px] text-slate-500 mt-1.5 flex items-center gap-1">
                <span>Default:</span>
                <code className="px-1.5 py-0.5 bg-slate-100 rounded text-slate-700 font-mono text-[10px]">sudharshan@admin2026</code>
              </p>
            </div>

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full py-3 rounded-xl bg-[#155EEF] hover:bg-blue-600 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 transition-all active:scale-98 disabled:opacity-50"
            >
              {isLoggingIn ? 'Authenticating...' : 'Sign In to Dashboard'}
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-slate-100 text-center">
            <button
              onClick={onBackToSite}
              className="text-xs font-semibold text-slate-500 hover:text-[#155EEF] transition-colors"
            >
              ← Back to Marketplace Website
            </button>
          </div>

        </div>
      </div>
    );
  }

  // Authenticated Admin Dashboard - Light Professional Theme
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 flex flex-col font-sans">
      
      {/* Admin Top Navigation */}
      <header className="bg-white border-b border-slate-200 px-4 sm:px-8 py-3 flex items-center justify-between sticky top-0 z-30 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center font-black text-[#155EEF] shadow-sm">
            ST
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-sm sm:text-base font-extrabold text-[#172033]">
                SUDHARSHAN_TECH Admin Panel
              </h1>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                LIVE
              </span>
            </div>
            <p className="text-[11px] text-slate-500 hidden xs:block">
              Super Admin: Sudharshan P S ({settings.email})
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={fetchAdminData}
            className="p-2 text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-100 transition-colors"
            title="Refresh Live Data"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-[#155EEF]' : ''}`} />
          </button>

          <button
            onClick={onBackToSite}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 transition-colors border border-slate-200"
          >
            <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
            <span>View Marketplace</span>
          </button>

          <button
            onClick={handleLogout}
            className="p-2 text-slate-500 hover:text-[#E53935] rounded-lg hover:bg-red-50 transition-colors"
            title="Sign Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Admin Layout with Sidebar Tabs */}
      <div className="flex-1 flex flex-col md:flex-row">
        
        {/* Navigation Sidebar */}
        <aside className="w-full md:w-64 bg-white border-r border-slate-200 p-4 shrink-0 space-y-1">
          <button
            onClick={() => setActiveTab('overview')}
            className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'overview'
                ? 'bg-[#155EEF] text-white shadow-md shadow-blue-500/20'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>Dashboard Overview</span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'orders'
                ? 'bg-[#155EEF] text-white shadow-md shadow-blue-500/20'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-4 h-4" />
              <span>Orders & Payments</span>
            </div>
            {orders.length > 0 && (
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                activeTab === 'orders' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-700'
              }`}>
                {orders.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('enquiries')}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'enquiries'
                ? 'bg-[#155EEF] text-white shadow-md shadow-blue-500/20'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <FileText className="w-4 h-4" />
              <span>Project Enquiries</span>
            </div>
            {enquiries.length > 0 && (
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                activeTab === 'enquiries' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-700'
              }`}>
                {enquiries.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('services')}
            className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'services'
                ? 'bg-[#155EEF] text-white shadow-md shadow-blue-500/20'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Service Pricing (8)</span>
          </button>

          <button
            onClick={() => setActiveTab('projects')}
            className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'projects'
                ? 'bg-[#155EEF] text-white shadow-md shadow-blue-500/20'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>Portfolio Projects</span>
          </button>

          <button
            onClick={() => setActiveTab('notifications')}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'notifications'
                ? 'bg-[#155EEF] text-white shadow-md shadow-blue-500/20'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Bell className="w-4 h-4" />
              <span>Alert Logs (Email/SMS)</span>
            </div>
            {(notifications.length + smsLogs.length) > 0 && (
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                activeTab === 'notifications' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-700'
              }`}>
                {notifications.length + smsLogs.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'settings'
                ? 'bg-[#155EEF] text-white shadow-md shadow-blue-500/20'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
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
                <h2 className="text-xl font-black text-[#172033]">Marketplace Metrics & Health</h2>
                <p className="text-xs text-slate-500">Live operational overview of customer submissions, orders and revenue.</p>
              </div>

              {/* Stat Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Orders</span>
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#155EEF] flex items-center justify-center">
                      <ShoppingBag className="w-4 h-4" />
                    </div>
                  </div>
                  <p className="text-2xl font-black text-[#172033]">{metrics?.total_orders || orders.length}</p>
                  <p className="text-[11px] text-slate-500 mt-1">{metrics?.orders_today || 0} placed today</p>
                </div>

                <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Awaiting Verification</span>
                    <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                      <Clock className="w-4 h-4" />
                    </div>
                  </div>
                  <p className="text-2xl font-black text-amber-600">
                    {metrics?.awaiting_verification ?? orders.filter(o => o.payment_status === 'Pending Verification').length}
                  </p>
                  <p className="text-[11px] text-slate-500 mt-1">Pending admin confirmation</p>
                </div>

                <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Verified Revenue</span>
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                      <DollarSign className="w-4 h-4" />
                    </div>
                  </div>
                  <p className="text-2xl font-black text-emerald-600">
                    ₹{(metrics?.total_verified_revenue || 0).toLocaleString('en-IN')}
                  </p>
                  <p className="text-[11px] text-slate-500 mt-1">Confirmed payments</p>
                </div>

                <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Custom Enquiries</span>
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#155EEF] flex items-center justify-center">
                      <FileText className="w-4 h-4" />
                    </div>
                  </div>
                  <p className="text-2xl font-black text-[#155EEF]">
                    {metrics?.pending_enquiries || enquiries.length}
                  </p>
                  <p className="text-[11px] text-slate-500 mt-1">Bespoke project leads</p>
                </div>
              </div>

              {/* Quick Actions & Recent Orders Preview */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* Recent Orders List */}
                <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-bold text-[#172033]">Recent Customer Orders</h3>
                    <button onClick={() => setActiveTab('orders')} className="text-xs font-bold text-[#155EEF] hover:underline">
                      View All ({orders.length})
                    </button>
                  </div>

                  {orders.length === 0 ? (
                    <p className="text-xs text-slate-500 py-6 text-center">No orders placed yet.</p>
                  ) : (
                    <div className="space-y-2.5">
                      {orders.slice(0, 5).map(o => (
                        <div 
                          key={o.id} 
                          onClick={() => setSelectedOrder(o)} 
                          className="p-3 rounded-xl bg-slate-50 border border-slate-200 hover:border-blue-300 hover:bg-blue-50/30 cursor-pointer flex items-center justify-between text-xs transition-all"
                        >
                          <div>
                            <span className="font-bold text-slate-900">{o.customer_name}</span>
                            <span className="text-[11px] text-slate-500 block">{o.id} • {o.items?.length || 1} item(s)</span>
                          </div>
                          <div className="text-right">
                            <span className="font-black text-[#155EEF]">₹{(o.total_amount || 0).toLocaleString('en-IN')}</span>
                            <span className={`block text-[10px] font-bold ${
                              o.payment_status === 'Payment Verified' ? 'text-emerald-600' : 'text-amber-600'
                            }`}>{o.payment_status}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Notification & SMS System Health */}
                <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-sm font-bold text-[#172033]">Dual Alert System Health</h3>
                      <button onClick={() => setActiveTab('notifications')} className="text-xs font-bold text-[#155EEF] hover:underline">
                        Audit Logs
                      </button>
                    </div>

                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-2.5 mb-4">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-600 font-medium flex items-center gap-1.5">
                          <Mail className="w-3.5 h-3.5 text-[#155EEF]" /> Email Recipient:
                        </span>
                        <span className="font-mono text-slate-800 font-bold">{settings.email}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-600 font-medium flex items-center gap-1.5">
                          <Smartphone className="w-3.5 h-3.5 text-emerald-600" /> Owner Mobile SMS:
                        </span>
                        <span className="font-mono text-slate-800 font-bold">{settings.phone}</span>
                      </div>
                      <div className="flex justify-between items-center pt-2 border-t border-slate-200">
                        <span className="text-slate-600 font-medium">Total Alerts Dispatched:</span>
                        <span className="font-black text-slate-900">{notifications.length + smsLogs.length} events</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    Customer orders, payments, and custom scoping enquiries trigger instant dual notifications to the company mailbox and owner mobile device, recorded into the persistent database audit trail.
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
                  <h2 className="text-xl font-black text-[#172033]">Live Customer Orders</h2>
                  <p className="text-xs text-slate-500">Review specifications, verify UPI payments, update status.</p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleExportCSV}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 text-xs font-bold text-slate-700 border border-slate-200 shadow-sm transition-all"
                  >
                    <Download className="w-3.5 h-3.5 text-slate-500" />
                    <span>Export CSV</span>
                  </button>
                </div>
              </div>

              {/* Filters & Search */}
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search by Order ID, customer name, email or phone..."
                    value={orderSearch}
                    onChange={(e) => setOrderSearch(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#155EEF]/20 focus:border-[#155EEF] shadow-sm"
                  />
                </div>

                <select
                  value={orderStatusFilter}
                  onChange={(e) => setOrderStatusFilter(e.target.value)}
                  className="p-2.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 shadow-sm focus:outline-none focus:border-[#155EEF]"
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
              <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-700">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 text-[10px] uppercase font-bold tracking-wider">
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
                    <tbody className="divide-y divide-slate-100">
                      {filteredOrders.length === 0 ? (
                        <tr>
                          <td colSpan={7} className="p-8 text-center text-slate-500">
                            No matching customer orders found.
                          </td>
                        </tr>
                      ) : (
                        filteredOrders.map((order) => (
                          <tr key={order.id} className="hover:bg-slate-50/70 transition-colors">
                            <td className="p-3.5 font-mono font-bold text-[#155EEF]">
                              {order.id}
                            </td>
                            <td className="p-3.5">
                              <span className="font-bold text-slate-900 block">{order.customer_name}</span>
                              <span className="text-[11px] text-slate-500">{order.customer_email}</span>
                            </td>
                            <td className="p-3.5">
                              <span className="truncate max-w-[160px] block font-medium text-slate-700">
                                {(order.items || []).map(i => i.service_title).join(', ')}
                              </span>
                            </td>
                            <td className="p-3.5 font-black text-slate-900">
                              ₹{(order.total_amount || 0).toLocaleString('en-IN')}
                            </td>
                            <td className="p-3.5">
                              <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                                order.payment_status === 'Payment Verified'
                                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                  : 'bg-amber-50 text-amber-700 border border-amber-200'
                              }`}>
                                {order.payment_status}
                              </span>
                            </td>
                            <td className="p-3.5">
                              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-blue-50 text-[#155EEF] border border-blue-200">
                                {order.order_status}
                              </span>
                            </td>
                            <td className="p-3.5">
                              <button
                                onClick={() => setSelectedOrder(order)}
                                className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-[#155EEF] text-slate-700 hover:text-white font-bold flex items-center gap-1 transition-all"
                              >
                                <Eye className="w-3.5 h-3.5" />
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
                <h2 className="text-xl font-black text-[#172033]">Custom Project Requests</h2>
                <p className="text-xs text-slate-500">Bespoke technical inquiries requiring customized scoping and proposals.</p>
              </div>

              <div className="space-y-4">
                {enquiries.length === 0 ? (
                  <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center text-slate-500 text-xs shadow-sm">
                    No custom project enquiries submitted yet.
                  </div>
                ) : (
                  enquiries.map((enq) => (
                    <div key={enq.id} className="bg-white border border-slate-200 rounded-2xl p-5 space-y-3 shadow-sm">
                      <div className="flex flex-col sm:flex-row justify-between items-start gap-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-[#155EEF] text-xs">{enq.id}</span>
                            <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-bold">
                              {enq.status}
                            </span>
                          </div>
                          <h3 className="text-base font-extrabold text-[#172033] mt-1">{enq.customer_name} {enq.business_name && `(${enq.business_name})`}</h3>
                        </div>

                        <div className="flex items-center gap-2 text-xs">
                          <a
                            href={`https://wa.me/${enq.customer_phone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(enq.customer_name)},%20inquiring%20about%20your%20SUDHARSHAN_TECH%20project.`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 font-bold flex items-center gap-1.5 transition-colors"
                          >
                            <MessageSquare className="w-3.5 h-3.5" />
                            <span>WhatsApp</span>
                          </a>
                          <a
                            href={`mailto:${enq.customer_email}`}
                            className="p-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 font-bold flex items-center gap-1.5 transition-colors"
                          >
                            <Mail className="w-3.5 h-3.5" />
                            <span>Email</span>
                          </a>
                          <a
                            href={`tel:${enq.customer_phone}`}
                            className="p-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 font-bold flex items-center gap-1.5 transition-colors"
                          >
                            <Phone className="w-3.5 h-3.5" />
                            <span>Call</span>
                          </a>
                        </div>
                      </div>

                      <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-200 text-xs text-slate-700 space-y-1.5">
                        <p><strong>Required Services:</strong> <span className="text-[#155EEF] font-semibold">{Array.isArray(enq.services_required) ? enq.services_required.join(', ') : enq.services_required}</span></p>
                        <p><strong>Budget / Timeline:</strong> {enq.estimated_budget || 'Flexible'} | {enq.timeline || 'Standard'}</p>
                        <p className="mt-2 text-slate-800"><strong>Description:</strong> {enq.project_description}</p>
                        {enq.reference_file && (
                          <p className="pt-2">
                            <a href={enq.reference_file} target="_blank" rel="noopener noreferrer" className="text-[#155EEF] hover:underline font-bold flex items-center gap-1">
                              <span>📎 Download Attached Reference File</span>
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
                <h2 className="text-xl font-black text-[#172033]">Services & Starting Price Management</h2>
                <p className="text-xs text-slate-500">Dynamically configure starting rates and descriptions for the 8 official services.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(services || []).map((srv) => (
                  <div key={srv.id} className="bg-white border border-slate-200 rounded-2xl p-5 space-y-3 shadow-sm hover:border-blue-300 transition-all">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-[10px] font-bold text-[#155EEF] uppercase tracking-wider">{srv.category}</span>
                        <h3 className="text-base font-extrabold text-[#172033]">{srv.title}</h3>
                      </div>
                      <span className="text-base font-black text-[#155EEF]">₹{srv.starting_price.toLocaleString('en-IN')}</span>
                    </div>

                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">{srv.short_description}</p>

                    <div className="pt-3 border-t border-slate-100 flex justify-between items-center text-xs">
                      <span className="text-slate-500 font-medium">Turnaround: {srv.turnaround}</span>
                      <button
                        onClick={() => setEditingService({ ...srv })}
                        className="px-3.5 py-1.5 rounded-xl bg-blue-50 hover:bg-[#155EEF] text-[#155EEF] hover:text-white font-bold text-xs flex items-center gap-1.5 transition-all"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
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
                <h2 className="text-xl font-black text-[#172033]">Portfolio Projects Showcase</h2>
                <p className="text-xs text-slate-500">Active showcase projects, GitHub repositories, and tech stacks displayed on the website.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {(projects || []).map(p => (
                  <div key={p.id} className="bg-white border border-slate-200 rounded-2xl p-5 flex flex-col justify-between shadow-sm">
                    <div>
                      <span className="text-[10px] text-[#155EEF] font-bold uppercase tracking-wider">{p.category}</span>
                      <h4 className="text-sm font-extrabold text-[#172033] mt-1">{p.title}</h4>
                      <p className="text-xs text-slate-600 line-clamp-2 mt-1.5 leading-relaxed">{p.description}</p>
                    </div>
                    {p.github && (
                      <div className="pt-3 border-t border-slate-100 mt-4 text-xs">
                        <a href={p.github} target="_blank" rel="noopener noreferrer" className="text-[#155EEF] hover:underline flex items-center gap-1 font-bold truncate">
                          <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                          <span>GitHub: {p.github.split('/').pop()}</span>
                        </a>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: NOTIFICATIONS & SMS AUDIT LOGS */}
          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div>
                  <h2 className="text-xl font-black text-[#172033]">Independent Alert Audit Trail</h2>
                  <p className="text-xs text-slate-500">Dual-channel notification records for owner email and mobile SMS alerts.</p>
                </div>

                {/* Sub-tabs toggle */}
                <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200">
                  <button
                    onClick={() => setNotifSubTab('email')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      notifSubTab === 'email' ? 'bg-white text-[#155EEF] shadow-sm' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Email Logs ({notifications.length})
                  </button>
                  <button
                    onClick={() => setNotifSubTab('sms')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      notifSubTab === 'sms' ? 'bg-white text-[#155EEF] shadow-sm' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Mobile SMS Logs ({smsLogs.length})
                  </button>
                </div>
              </div>

              {/* Email Logs Table */}
              {notifSubTab === 'email' && (
                <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                  <table className="w-full text-left text-xs text-slate-700">
                    <thead className="bg-slate-50 border-b border-slate-200 text-[10px] uppercase text-slate-500 font-bold">
                      <tr>
                        <th className="p-3.5">Time</th>
                        <th className="p-3.5">Event Type</th>
                        <th className="p-3.5">Recipient</th>
                        <th className="p-3.5">Subject</th>
                        <th className="p-3.5">Delivery Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {notifications.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="p-6 text-center text-slate-500">
                            No email notification dispatches logged yet.
                          </td>
                        </tr>
                      ) : (
                        notifications.map(n => (
                          <tr key={n.id} className="hover:bg-slate-50/60">
                            <td className="p-3.5 text-slate-500 whitespace-nowrap">
                              {new Date(n.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </td>
                            <td className="p-3.5 font-mono text-[#155EEF] font-bold text-[11px]">{n.event_type}</td>
                            <td className="p-3.5 font-medium">{n.recipient}</td>
                            <td className="p-3.5 max-w-[240px] truncate text-slate-600">{n.subject}</td>
                            <td className="p-3.5">
                              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                                n.status === 'sent' 
                                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                                  : 'bg-blue-50 text-[#155EEF] border border-blue-200'
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
              )}

              {/* SMS Logs Table */}
              {notifSubTab === 'sms' && (
                <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                  <table className="w-full text-left text-xs text-slate-700">
                    <thead className="bg-slate-50 border-b border-slate-200 text-[10px] uppercase text-slate-500 font-bold">
                      <tr>
                        <th className="p-3.5">Time</th>
                        <th className="p-3.5">Recipient</th>
                        <th className="p-3.5">Provider</th>
                        <th className="p-3.5">SMS Message Body</th>
                        <th className="p-3.5">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {smsLogs.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="p-6 text-center text-slate-500">
                            No SMS alerts dispatched yet. Place a test order to generate an instant SMS alert.
                          </td>
                        </tr>
                      ) : (
                        smsLogs.map(s => (
                          <tr key={s.id} className="hover:bg-slate-50/60">
                            <td className="p-3.5 text-slate-500 whitespace-nowrap">
                              {new Date(s.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </td>
                            <td className="p-3.5 font-mono font-bold text-slate-900">{s.recipient}</td>
                            <td className="p-3.5">
                              <span className="px-2 py-0.5 bg-slate-100 rounded text-[10px] font-semibold text-slate-700">
                                {s.provider}
                              </span>
                            </td>
                            <td className="p-3.5 max-w-[280px] truncate text-slate-600 font-mono text-[11px]">
                              {s.message}
                            </td>
                            <td className="p-3.5">
                              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                                s.status === 'sent' 
                                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                                  : 'bg-blue-50 text-[#155EEF] border border-blue-200'
                              }`}>
                                {s.status}
                              </span>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              )}

            </div>
          )}

          {/* TAB 7: COMPANY SETTINGS */}
          {activeTab === 'settings' && (
            <div className="space-y-6 max-w-2xl">
              <div>
                <h2 className="text-xl font-black text-[#172033]">Company Identity & Contact Settings</h2>
                <p className="text-xs text-slate-500">Updates here apply dynamically to the customer marketplace.</p>
              </div>

              {settingsSuccess && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span className="font-semibold">Company contact settings updated successfully!</span>
                </div>
              )}

              <form onSubmit={handleSaveSettings} className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 text-xs shadow-sm">
                <div>
                  <label className="text-slate-700 font-bold block mb-1">Company Tagline</label>
                  <input
                    type="text"
                    value={editingSettings.tagline}
                    onChange={(e) => setEditingSettings({ ...editingSettings, tagline: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:bg-white focus:outline-none focus:border-[#155EEF]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-slate-700 font-bold block mb-1">Official Phone</label>
                    <input
                      type="text"
                      value={editingSettings.phone}
                      onChange={(e) => setEditingSettings({ ...editingSettings, phone: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:bg-white focus:outline-none focus:border-[#155EEF]"
                    />
                  </div>
                  <div>
                    <label className="text-slate-700 font-bold block mb-1">WhatsApp Number</label>
                    <input
                      type="text"
                      value={editingSettings.whatsapp}
                      onChange={(e) => setEditingSettings({ ...editingSettings, whatsapp: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:bg-white focus:outline-none focus:border-[#155EEF]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-slate-700 font-bold block mb-1">Notification Email</label>
                    <input
                      type="email"
                      value={editingSettings.email}
                      onChange={(e) => setEditingSettings({ ...editingSettings, email: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:bg-white focus:outline-none focus:border-[#155EEF]"
                    />
                  </div>
                  <div>
                    <label className="text-slate-700 font-bold block mb-1">UPI ID for GPay</label>
                    <input
                      type="text"
                      value={editingSettings.upi_id}
                      onChange={(e) => setEditingSettings({ ...editingSettings, upi_id: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:bg-white focus:outline-none focus:border-[#155EEF]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-slate-700 font-bold block mb-1">Registered Office Address</label>
                  <textarea
                    rows={2}
                    value={editingSettings.address}
                    onChange={(e) => setEditingSettings({ ...editingSettings, address: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:bg-white focus:outline-none focus:border-[#155EEF] resize-none"
                  />
                </div>

                <div>
                  <label className="text-slate-700 font-bold block mb-1">Google Maps Search Link</label>
                  <input
                    type="text"
                    value={editingSettings.google_maps_url}
                    onChange={(e) => setEditingSettings({ ...editingSettings, google_maps_url: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-mono text-[11px] focus:bg-white focus:outline-none focus:border-[#155EEF]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-[#155EEF] hover:bg-blue-600 text-white font-bold text-xs shadow-md shadow-blue-500/20 transition-all"
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
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-3xl shadow-2xl p-6 text-slate-800 space-y-5 my-8">
            <div className="flex justify-between items-start pb-3 border-b border-slate-100">
              <div>
                <span className="font-mono font-bold text-[#155EEF] text-xs uppercase tracking-wider">ORDER SPECIFICATION</span>
                <h3 className="text-xl font-black text-[#172033] mt-0.5">{selectedOrder.id}</h3>
              </div>
              <button 
                onClick={() => setSelectedOrder(null)} 
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Customer Details */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs space-y-1.5">
              <p><strong>Customer:</strong> <span className="font-bold text-slate-900">{selectedOrder.customer_name}</span> {selectedOrder.business_name && `(${selectedOrder.business_name})`}</p>
              <p><strong>Email:</strong> <a href={`mailto:${selectedOrder.customer_email}`} className="text-[#155EEF] hover:underline font-semibold">{selectedOrder.customer_email}</a></p>
              <p><strong>Phone:</strong> <a href={`tel:${selectedOrder.customer_phone}`} className="text-[#155EEF] hover:underline font-semibold">{selectedOrder.customer_phone}</a> (<a href={`https://wa.me/${selectedOrder.customer_phone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="text-emerald-600 font-bold hover:underline">WhatsApp</a>)</p>
              {selectedOrder.billing_address && <p><strong>Address:</strong> {selectedOrder.billing_address}</p>}
            </div>

            {/* Ordered Services */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Services Ordered</h4>
              <div className="space-y-2">
                {(selectedOrder.items || []).map((item, idx) => (
                  <div key={idx} className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex justify-between items-center text-xs">
                    <div>
                      <span className="font-bold text-slate-900">{item.service_title}</span>
                      <span className="text-slate-500 block text-[11px]">Package: {item.package_name} (Qty: {item.quantity})</span>
                    </div>
                    <span className="font-black text-[#155EEF]">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment & UTR Proof Inspection */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs space-y-2">
              <div className="flex justify-between items-center">
                <span>Payment Mode: <strong>{selectedOrder.payment_method}</strong></span>
                <span className="font-black text-[#155EEF] text-base">Total: ₹{(selectedOrder.total_amount || 0).toLocaleString('en-IN')}</span>
              </div>
              {selectedOrder.transaction_ref && (
                <p><strong>UTR / Ref Number:</strong> <code className="bg-white px-2 py-0.5 rounded border border-slate-200 text-[#155EEF] font-mono font-bold">{selectedOrder.transaction_ref}</code></p>
              )}
              {selectedOrder.payment_proof && (
                <div className="pt-2">
                  <a href={selectedOrder.payment_proof} target="_blank" rel="noopener noreferrer" className="text-[#155EEF] hover:underline flex items-center gap-1.5 font-bold">
                    <span>🖼️ View Uploaded GPay Screenshot Proof</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}
            </div>

            {/* Update Controls */}
            <div className="pt-3 border-t border-slate-100 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Administrative Actions</h4>
              
              <div className="grid grid-cols-2 gap-3">
                {/* Verify Payment Button */}
                <button
                  onClick={() => handleUpdateOrderStatus(selectedOrder.id, { 
                    payment_status: 'Payment Verified', 
                    order_status: 'In Progress' 
                  })}
                  className="py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-emerald-600/20 transition-all"
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
                  className="py-2.5 px-3 rounded-xl bg-[#FFF1F0] hover:bg-red-100 text-[#E53935] border border-red-200 font-bold text-xs flex items-center justify-center gap-1.5 transition-all"
                >
                  <XCircle className="w-4 h-4" />
                  <span>Reject Payment</span>
                </button>
              </div>

              {/* Status Selector */}
              <div className="grid grid-cols-2 gap-3 pt-1 text-xs">
                <div>
                  <label className="text-slate-600 font-bold block mb-1">Change Order Status</label>
                  <select
                    value={selectedOrder.order_status}
                    onChange={(e) => handleUpdateOrderStatus(selectedOrder.id, { order_status: e.target.value as any })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-semibold focus:outline-none focus:border-[#155EEF]"
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
                  <label className="text-slate-600 font-bold block mb-1">Adjust Quoted Price (₹)</label>
                  <input
                    type="number"
                    defaultValue={selectedOrder.total_amount}
                    onBlur={(e) => handleUpdateOrderStatus(selectedOrder.id, { total_amount: Number(e.target.value) })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-mono font-bold focus:outline-none focus:border-[#155EEF]"
                  />
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* EDIT SERVICE MODAL */}
      {editingService && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative w-full max-w-md bg-white border border-slate-200 rounded-3xl shadow-2xl p-6 text-slate-800 space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-slate-100">
              <h3 className="text-base font-extrabold text-[#172033]">Edit Service Starting Price</h3>
              <button 
                onClick={() => setEditingService(null)} 
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-slate-600 font-bold block mb-1">Service Title</label>
                <input
                  type="text"
                  value={editingService.title}
                  onChange={(e) => setEditingService({ ...editingService, title: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:border-[#155EEF]"
                />
              </div>

              <div>
                <label className="text-slate-600 font-bold block mb-1">Starting Price (₹)</label>
                <input
                  type="number"
                  value={editingService.starting_price}
                  onChange={(e) => setEditingService({ ...editingService, starting_price: Number(e.target.value) })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-mono font-bold text-sm focus:outline-none focus:border-[#155EEF]"
                />
              </div>

              <div>
                <label className="text-slate-600 font-bold block mb-1">Estimated Turnaround</label>
                <input
                  type="text"
                  value={editingService.turnaround}
                  onChange={(e) => setEditingService({ ...editingService, turnaround: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:border-[#155EEF]"
                />
              </div>

              <button
                type="button"
                onClick={() => handleSaveServicePrice(editingService.id, editingService)}
                className="w-full py-3 rounded-xl bg-[#155EEF] hover:bg-blue-600 text-white font-bold mt-2 shadow-md shadow-blue-500/20 transition-all"
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
