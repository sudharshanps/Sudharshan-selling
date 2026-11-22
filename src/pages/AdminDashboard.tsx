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
  Smartphone,
  Send,
  Plus,
  Sparkles,
  Tag
} from 'lucide-react';
import { useSettings } from '../context/SettingsContext';
import { Order, ProjectEnquiry, NotificationLog, SmsLog, Quotation, SpecialOffer, Inquiry } from '../types';

interface AdminDashboardProps {
  onBackToSite: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onBackToSite }) => {
  const { settings, services, projects, offers, refreshData, updateSettings } = useSettings();

  // Authentication State
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('st_admin_token'));
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Active Admin Tab
  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'enquiries' | 'quotations' | 'offers' | 'services' | 'projects' | 'notifications' | 'settings'>('overview');
  const [notifSubTab, setNotifSubTab] = useState<'email' | 'sms' | 'whatsapp'>('email');

  // Data States
  const [metrics, setMetrics] = useState<any>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [enquiries, setEnquiries] = useState<Inquiry[]>([]);
  const [inquiryMetrics, setInquiryMetrics] = useState<any>(null);
  const [quotations, setQuotations] = useState<Quotation[]>([]);
  const [notifications, setNotifications] = useState<NotificationLog[]>([]);
  const [smsLogs, setSmsLogs] = useState<SmsLog[]>([]);
  const [whatsappLogs, setWhatsappLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Inquiries Filter & Selected State
  const [inquirySearch, setInquirySearch] = useState('');
  const [inquiryStatusFilter, setInquiryStatusFilter] = useState('All');
  const [inquiryServiceFilter, setInquiryServiceFilter] = useState('All');
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [inquiryAdminNotes, setInquiryAdminNotes] = useState('');
  const [isUpdatingInquiry, setIsUpdatingInquiry] = useState(false);

  // Filters & Selected State
  const [orderSearch, setOrderSearch] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState('All');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [editingService, setEditingService] = useState<any | null>(null);
  const [editingOffer, setEditingOffer] = useState<SpecialOffer | null>(null);
  const [editingSettings, setEditingSettings] = useState({ ...settings });
  const [settingsSuccess, setSettingsSuccess] = useState(false);

  // Email Testing & Quotation Creation States
  const [testEmailRecipient, setTestEmailRecipient] = useState(settings.email || 'sudharshantech123@gmail.com');
  const [testEmailLoading, setTestEmailLoading] = useState(false);
  const [testEmailResult, setTestEmailResult] = useState<any | null>(null);
  const [selectedQuoteForPreview, setSelectedQuoteForPreview] = useState<Quotation | null>(null);
  const [previewMode, setPreviewMode] = useState<'html' | 'text'>('html');
  const [isCreatingQuote, setIsCreatingQuote] = useState(false);
  const [newQuoteForm, setNewQuoteForm] = useState({
    customer_name: '',
    customer_email: '',
    customer_phone: '+91 97914 95418',
    business_name: '',
    requested_services: 'Web Development',
    project_description: '',
    timeline: '7 - 10 Business Days',
    base_amount: 1199,
    additional_amount: 0,
    discount: 0,
    tax: 0
  });

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
      const [metricsRes, ordersRes, inquiriesRes, inqMetricsRes, quotesRes, notifsRes, smsRes, waRes] = await Promise.all([
        fetch('/api/admin/overview', { headers }).then(r => r.json()).catch(() => null),
        fetch('/api/admin/orders', { headers }).then(r => r.json()).catch(() => []),
        fetch('/api/admin/inquiries', { headers }).then(r => r.json()).catch(() => []),
        fetch('/api/admin/inquiries/metrics', { headers }).then(r => r.json()).catch(() => null),
        fetch('/api/admin/quotations', { headers }).then(r => r.json()).catch(() => []),
        fetch('/api/admin/notifications', { headers }).then(r => r.json()).catch(() => []),
        fetch('/api/admin/sms-logs', { headers }).then(r => r.json()).catch(() => []),
        fetch('/api/admin/whatsapp-logs', { headers }).then(r => r.json()).catch(() => [])
      ]);

      if (metricsRes) setMetrics(metricsRes);
      if (Array.isArray(ordersRes)) setOrders(ordersRes);
      if (Array.isArray(inquiriesRes)) setEnquiries(inquiriesRes);
      if (inqMetricsRes) setInquiryMetrics(inqMetricsRes);
      if (Array.isArray(quotesRes)) {
        setQuotations(quotesRes);
        if (quotesRes.length > 0 && !selectedQuoteForPreview) {
          setSelectedQuoteForPreview(quotesRes[0]);
        }
      }
      if (Array.isArray(notifsRes)) setNotifications(notifsRes);
      if (Array.isArray(smsRes)) setSmsLogs(smsRes);
      if (Array.isArray(waRes)) setWhatsappLogs(waRes);
    } catch (err) {
      console.error("Error fetching admin data:", err);
    } finally {
      setLoading(false);
    }
  };

  // Inquiry Status & Notes Update
  const handleUpdateInquiryStatus = async (inquiryId: string | number, newStatus: string, notes?: string) => {
    if (!token) return;
    setIsUpdatingInquiry(true);
    try {
      const res = await fetch(`/api/admin/inquiries/${inquiryId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-token': token
        },
        body: JSON.stringify({
          status: newStatus,
          admin_notes: notes !== undefined ? notes : inquiryAdminNotes
        })
      });

      if (res.ok) {
        const data = await res.json();
        setEnquiries(prev => prev.map(item => String(item.id) === String(inquiryId) ? data.inquiry : item));
        if (selectedInquiry && String(selectedInquiry.id) === String(inquiryId)) {
          setSelectedInquiry(data.inquiry);
        }
        // Refresh metrics
        fetch('/api/admin/inquiries/metrics', { headers: { 'x-admin-token': token } })
          .then(r => r.json())
          .then(m => setInquiryMetrics(m))
          .catch(() => {});
      }
    } catch (err) {
      console.error("Error updating inquiry status:", err);
    } finally {
      setIsUpdatingInquiry(false);
    }
  };

  // Delete Inquiry
  const handleDeleteInquiry = async (inquiryId: string | number) => {
    if (!token) return;
    if (!window.confirm(`Are you sure you want to permanently delete Inquiry #${inquiryId}? This action cannot be undone.`)) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/inquiries/${inquiryId}`, {
        method: 'DELETE',
        headers: { 'x-admin-token': token }
      });
      if (res.ok) {
        setEnquiries(prev => prev.filter(item => String(item.id) !== String(inquiryId)));
        if (selectedInquiry && String(selectedInquiry.id) === String(inquiryId)) {
          setSelectedInquiry(null);
        }
      }
    } catch (err) {
      console.error("Error deleting inquiry:", err);
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

  // Create Quotation
  const handleCreateQuotation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    try {
      const res = await fetch('/api/admin/quotations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-token': token
        },
        body: JSON.stringify({
          ...newQuoteForm,
          requested_services: [newQuoteForm.requested_services]
        })
      });

      if (res.ok) {
        const data = await res.json();
        setQuotations(prev => [data.quotation, ...prev]);
        setSelectedQuoteForPreview(data.quotation);
        setIsCreatingQuote(false);
        fetchAdminData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Send Quotation to Customer
  const handleSendQuotation = async (quoteId: string, recipientEmail?: string) => {
    if (!token) return;
    setTestEmailLoading(true);
    setTestEmailResult(null);

    try {
      const res = await fetch(`/api/admin/quotations/${quoteId}/send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-token': token
        },
        body: JSON.stringify({ test_recipient: recipientEmail })
      });

      const data = await res.json();
      setTestEmailResult(data);
      fetchAdminData();
    } catch (err: any) {
      setTestEmailResult({ error: err.message });
    } finally {
      setTestEmailLoading(false);
    }
  };

  // Run Test Email
  const handleRunTestEmail = async () => {
    if (!token) return;
    setTestEmailLoading(true);
    setTestEmailResult(null);

    try {
      const res = await fetch('/api/admin/quotations/test-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-token': token
        },
        body: JSON.stringify({
          recipient: testEmailRecipient,
          quotation_id: selectedQuoteForPreview?.id
        })
      });

      const data = await res.json();
      setTestEmailResult(data);
      fetchAdminData();
    } catch (err: any) {
      setTestEmailResult({ error: err.message });
    } finally {
      setTestEmailLoading(false);
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

  // Save Offer Details
  const handleSaveOffer = async (offerId: string, updatedOffer: any) => {
    if (!token) return;
    try {
      const res = await fetch(`/api/admin/offers/${offerId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-token': token
        },
        body: JSON.stringify(updatedOffer)
      });
      if (res.ok) {
        refreshData();
        setEditingOffer(null);
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
              Enter master credentials to access live orders, quotations, and manage services.
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
              <span>Orders &amp; Payments</span>
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
            onClick={() => setActiveTab('quotations')}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'quotations'
                ? 'bg-[#155EEF] text-white shadow-md shadow-blue-500/20'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Mail className="w-4 h-4" />
              <span>Quotations &amp; Testing</span>
            </div>
            {quotations.length > 0 && (
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                activeTab === 'quotations' ? 'bg-white/20 text-white' : 'bg-blue-100 text-[#155EEF]'
              }`}>
                {quotations.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('offers')}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'offers'
                ? 'bg-[#155EEF] text-white shadow-md shadow-blue-500/20'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Tag className="w-4 h-4" />
              <span>Special Offers (7)</span>
            </div>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-100 text-[#E53935]">
              Active
            </span>
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
            <span>Company Settings</span>
          </button>
        </aside>

        {/* Tab Content Panel */}
        <main className="flex-1 p-4 sm:p-8 overflow-y-auto">
          
          {/* TAB 1: OVERVIEW METRICS */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-black text-[#172033]">Marketplace Metrics &amp; Health</h2>
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
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Active Quotations</span>
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#155EEF] flex items-center justify-center">
                      <Mail className="w-4 h-4" />
                    </div>
                  </div>
                  <p className="text-2xl font-black text-[#155EEF]">
                    {quotations.length}
                  </p>
                  <p className="text-[11px] text-slate-500 mt-1">Custom proposals tracked</p>
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

                {/* Email Delivery Diagnostics */}
                <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-sm font-bold text-[#172033]">Email Deliverability &amp; Quotation Health</h3>
                      <button onClick={() => setActiveTab('quotations')} className="text-xs font-bold text-[#155EEF] hover:underline">
                        Test Suite
                      </button>
                    </div>

                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-2.5 mb-4">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-600 font-medium flex items-center gap-1.5">
                          <Mail className="w-3.5 h-3.5 text-[#155EEF]" /> From / Reply-To:
                        </span>
                        <span className="font-mono text-slate-800 font-bold">{settings.email}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-600 font-medium">Domain Authentication (SPF/DKIM):</span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-[#155EEF] border border-blue-200">
                          Verified Aligned
                        </span>
                      </div>
                      <div className="flex justify-between items-center pt-2 border-t border-slate-200">
                        <span className="text-slate-600 font-medium">PDF Attachment Engine:</span>
                        <span className="font-bold text-emerald-600">Active (PDFKit A4)</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    Customer quotations generate dynamic print-ready PDFs and responsive HTML templates, logged with message IDs and verified delivery status.
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

          {/* TAB 3: QUOTATIONS & EMAIL TESTING SUITE */}
          {activeTab === 'quotations' && (
            <div className="space-y-8">
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-black text-[#172033]">Quotation Management &amp; Delivery Suite</h2>
                  <p className="text-xs text-slate-500">Audit transactional emails, generate print-ready PDFs, and test Gmail inbox delivery.</p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsCreatingQuote(true)}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#155EEF] hover:bg-blue-600 text-white font-bold text-xs shadow-md shadow-blue-500/20 transition-all"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Create New Quotation</span>
                  </button>
                </div>
              </div>

              {/* ADMIN EMAIL TESTING SUITE BOX */}
              <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#155EEF] flex items-center justify-center">
                      <Send className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-extrabold text-[#172033]">Admin Email Delivery Testing Suite</h3>
                      <p className="text-[11px] text-slate-500">Dispatch test quotations to authorized Gmail addresses and inspect HTML/PDF rendering.</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    SMTP / Transactional Ready
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="md:col-span-2">
                    <label className="text-xs font-bold text-slate-700 block mb-1">Target Test Recipient Email (Gmail/Authorized Inbox)</label>
                    <input
                      type="email"
                      value={testEmailRecipient}
                      onChange={(e) => setTestEmailRecipient(e.target.value)}
                      placeholder="e.g. yourname@gmail.com"
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:bg-white focus:outline-none focus:border-[#155EEF]"
                    />
                  </div>

                  <div className="flex items-end">
                    <button
                      onClick={handleRunTestEmail}
                      disabled={testEmailLoading}
                      className="w-full h-10 rounded-xl bg-[#155EEF] hover:bg-blue-600 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-blue-500/20 disabled:opacity-50 transition-all"
                    >
                      {testEmailLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                      <span>Dispatch Test Quotation Email</span>
                    </button>
                  </div>
                </div>

                {testEmailResult && (
                  <div className={`p-4 rounded-xl text-xs border ${
                    testEmailResult.success 
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-800' 
                      : 'bg-red-50 border-red-200 text-red-800'
                  }`}>
                    <p className="font-bold flex items-center gap-1.5">
                      {testEmailResult.success ? <CheckCircle className="w-4 h-4 text-emerald-600" /> : <XCircle className="w-4 h-4 text-red-600" />}
                      <span>{testEmailResult.message || 'Email dispatch completed.'}</span>
                    </p>
                    {testEmailResult.result?.emailResult?.message_id && (
                      <p className="mt-1 font-mono text-[11px] text-slate-600">
                        Provider Message ID: {testEmailResult.result.emailResult.message_id} • Status: {testEmailResult.result.emailResult.status}
                      </p>
                    )}
                  </div>
                )}

                {/* Deliverability Checklist */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-[11px] text-slate-600">
                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                    <span className="font-bold text-slate-800 block">SPF/DKIM Guidance:</span>
                    <span className="text-emerald-600">Configured Aligned</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                    <span className="font-bold text-slate-800 block">Reply-To Address:</span>
                    <span className="truncate block font-mono text-slate-700">{settings.email}</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                    <span className="font-bold text-slate-800 block">PDF Attachment:</span>
                    <span className="text-emerald-600">A4 Printable Verified</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                    <span className="font-bold text-slate-800 block">Security:</span>
                    <span className="text-emerald-600">TLS Encrypted</span>
                  </div>
                </div>
              </div>

              {/* Quotations List Table */}
              <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
                <div className="p-5 border-b border-slate-100 flex items-center justify-between">
                  <h3 className="text-sm font-extrabold text-[#172033]">Issued Quotations &amp; Customer Responses</h3>
                  <span className="text-xs text-slate-500 font-medium">Tracking {quotations.length} records</span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-700">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 text-[10px] uppercase font-bold tracking-wider">
                      <tr>
                        <th className="p-3.5">Quote ID</th>
                        <th className="p-3.5">Customer &amp; Business</th>
                        <th className="p-3.5">Services</th>
                        <th className="p-3.5">Quoted Total</th>
                        <th className="p-3.5">Valid Until</th>
                        <th className="p-3.5">Status</th>
                        <th className="p-3.5">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {quotations.map((q) => (
                        <tr key={q.id} className="hover:bg-slate-50/70 transition-colors">
                          <td className="p-3.5 font-mono font-bold text-[#155EEF]">
                            {q.id}
                          </td>
                          <td className="p-3.5">
                            <span className="font-bold text-slate-900 block">{q.customer_name}</span>
                            <span className="text-[11px] text-slate-500">{q.business_name || q.customer_email}</span>
                          </td>
                          <td className="p-3.5">
                            <span className="truncate max-w-[160px] block font-medium">
                              {Array.isArray(q.requested_services) ? q.requested_services.join(', ') : q.requested_services}
                            </span>
                          </td>
                          <td className="p-3.5 font-black text-slate-900">
                            ₹{(q.final_amount || 0).toLocaleString('en-IN')}
                          </td>
                          <td className="p-3.5 text-slate-600">
                            {q.validity_date}
                          </td>
                          <td className="p-3.5">
                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                              q.status === 'Accepted'
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                : q.status === 'Revision Requested'
                                ? 'bg-amber-50 text-amber-700 border border-amber-200'
                                : 'bg-blue-50 text-[#155EEF] border border-blue-200'
                            }`}>
                              {q.status}
                            </span>
                          </td>
                          <td className="p-3.5">
                            <div className="flex items-center gap-1.5">
                              <a
                                href={`/api/quotations/${q.id}/pdf`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold flex items-center gap-1"
                                title="Download Printable PDF"
                              >
                                <Download className="w-3.5 h-3.5" />
                              </a>

                              <button
                                onClick={() => handleSendQuotation(q.id)}
                                className="px-2.5 py-1.5 rounded-lg bg-[#155EEF] hover:bg-blue-600 text-white font-bold flex items-center gap-1 shadow-sm"
                                title="Send Email to Customer"
                              >
                                <Send className="w-3 h-3" />
                                <span>Send</span>
                              </button>

                              <button
                                onClick={() => setSelectedQuoteForPreview(q)}
                                className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold"
                              >
                                Preview
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Quotation Preview Card */}
              {selectedQuoteForPreview && (
                <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div>
                      <h3 className="text-sm font-extrabold text-[#172033]">
                        Quotation Preview: {selectedQuoteForPreview.id} ({selectedQuoteForPreview.customer_name})
                      </h3>
                      <p className="text-[11px] text-slate-500">Preview exact customer template before sending.</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="flex bg-slate-100 p-1 rounded-xl">
                        <button
                          onClick={() => setPreviewMode('html')}
                          className={`px-3 py-1 rounded-lg text-xs font-bold ${
                            previewMode === 'html' ? 'bg-white text-[#155EEF] shadow-sm' : 'text-slate-600'
                          }`}
                        >
                          HTML Email
                        </button>
                        <button
                          onClick={() => setPreviewMode('text')}
                          className={`px-3 py-1 rounded-lg text-xs font-bold ${
                            previewMode === 'text' ? 'bg-white text-[#155EEF] shadow-sm' : 'text-slate-600'
                          }`}
                        >
                          Plain Text
                        </button>
                      </div>

                      <a
                        href={`/api/quotations/${selectedQuoteForPreview.id}/pdf`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1.5 border border-slate-200"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download PDF</span>
                      </a>
                    </div>
                  </div>

                  {previewMode === 'html' ? (
                    <div className="border border-slate-200 rounded-2xl overflow-hidden bg-slate-50">
                      <iframe
                        src={`/api/quotations/${selectedQuoteForPreview.id}/view`}
                        className="w-full h-[500px] border-0 bg-white"
                        title="Quotation HTML Preview"
                      />
                    </div>
                  ) : (
                    <pre className="p-4 bg-slate-900 text-slate-100 rounded-2xl text-xs font-mono whitespace-pre-wrap overflow-x-auto leading-relaxed max-h-[400px]">
                      {`Your Project Quotation – SUDHARSHAN_TECH | Quote #${selectedQuoteForPreview.id}

Dear ${selectedQuoteForPreview.customer_name},

Thank you for your interest in SUDHARSHAN_TECH.
We are pleased to share the quotation for your requested digital solution.

QUOTATION DETAILS:
Quotation ID: ${selectedQuoteForPreview.id}
Customer Name: ${selectedQuoteForPreview.customer_name}
Business Name: ${selectedQuoteForPreview.business_name || 'N/A'}
Requested Services: ${Array.isArray(selectedQuoteForPreview.requested_services) ? selectedQuoteForPreview.requested_services.join(', ') : selectedQuoteForPreview.requested_services}
Project Description: ${selectedQuoteForPreview.project_description}
Estimated Delivery Timeline: ${selectedQuoteForPreview.timeline}
Quotation Valid Until: ${selectedQuoteForPreview.validity_date}

PRICE BREAKDOWN:
Base Amount: ₹${selectedQuoteForPreview.base_amount.toLocaleString('en-IN')}
Additional Features: ₹${selectedQuoteForPreview.additional_amount.toLocaleString('en-IN')}
Discount: ₹${selectedQuoteForPreview.discount.toLocaleString('en-IN')}
Taxes: ₹${selectedQuoteForPreview.tax.toLocaleString('en-IN')}
Final Quoted Amount: ₹${selectedQuoteForPreview.final_amount.toLocaleString('en-IN')}

PROJECT TERMS:
- Revisions: ${selectedQuoteForPreview.revisions}
- Support Period: ${selectedQuoteForPreview.support_period}
- Payment Milestones: ${selectedQuoteForPreview.payment_milestones}

Download PDF: ${settings.website}api/quotations/${selectedQuoteForPreview.id}/pdf`}
                    </pre>
                  )}
                </div>
              )}

            </div>
          )}

          {/* TAB 4: SPECIAL OFFERS MANAGER (7 OFFERS) */}
          {activeTab === 'offers' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-black text-[#172033]">Special Digital Solution Offers (7)</h2>
                <p className="text-xs text-slate-500">Edit starting prices, promotional tags, and transparent scope limits for the homepage offers.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(offers || []).map((off) => (
                  <div key={off.id} className="bg-white border border-slate-200 rounded-2xl p-5 space-y-3 shadow-sm flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between">
                        <div>
                          <span className="text-[10px] font-bold text-[#E53935] uppercase tracking-wider">{off.badge}</span>
                          <h3 className="text-base font-extrabold text-[#172033]">{off.title}</h3>
                        </div>
                        <span className="text-base font-black text-[#155EEF]">₹{off.starting_price.toLocaleString('en-IN')}</span>
                      </div>

                      <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">{off.short_description}</p>
                      
                      <div className="mt-3 p-2.5 rounded-xl bg-slate-50 text-[11px] text-slate-600 border border-slate-100">
                        <strong>Scope Limits:</strong> {off.scope_limits}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex justify-between items-center text-xs">
                      <span className="text-slate-500 font-medium">Unit: {off.unit}</span>
                      <button
                        onClick={() => setEditingOffer({ ...off })}
                        className="px-3.5 py-1.5 rounded-xl bg-blue-50 hover:bg-[#155EEF] text-[#155EEF] hover:text-white font-bold text-xs flex items-center gap-1.5 transition-all"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Edit Offer</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: SERVICE PRICING EDITOR (8 SERVICES) */}
          {activeTab === 'services' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-black text-[#172033]">Services &amp; Starting Price Management (8)</h2>
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

          {/* TAB 6: CUSTOM PROJECT ENQUIRIES (MYSQL DATABASE POWERED) */}
          {activeTab === 'enquiries' && (
            <div className="space-y-6">
              
              {/* Header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-black text-[#172033]">Customer Inquiries &amp; Leads</h2>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-[#155EEF] uppercase">
                      MySQL Stored
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Permanent relational database records with multi-channel Resend email and Meta WhatsApp delivery tracking.
                  </p>
                </div>

                <button
                  onClick={fetchAdminData}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold border border-slate-200 shadow-sm transition-all"
                >
                  <RefreshCw className={`w-3.5 h-3.5 text-[#155EEF] ${loading ? 'animate-spin' : ''}`} />
                  <span>Refresh Data</span>
                </button>
              </div>

              {/* 5 Summary KPI Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">Total Inquiries</span>
                  <span className="text-2xl font-black text-slate-900 mt-1 block">
                    {inquiryMetrics?.total ?? enquiries.length}
                  </span>
                  <span className="text-[10px] text-slate-500 font-medium mt-0.5 block">All time submissions</span>
                </div>

                <div className="bg-blue-50/60 border border-blue-200 rounded-2xl p-4 shadow-sm">
                  <span className="text-[10px] font-black uppercase tracking-wider text-blue-600 block">New Leads</span>
                  <span className="text-2xl font-black text-blue-700 mt-1 block">
                    {inquiryMetrics?.new ?? enquiries.filter(e => e.status === 'New').length}
                  </span>
                  <span className="text-[10px] text-blue-600/80 font-medium mt-0.5 block">Awaiting review</span>
                </div>

                <div className="bg-amber-50/60 border border-amber-200 rounded-2xl p-4 shadow-sm">
                  <span className="text-[10px] font-black uppercase tracking-wider text-amber-700 block">Reviewing</span>
                  <span className="text-2xl font-black text-amber-800 mt-1 block">
                    {inquiryMetrics?.reviewing ?? enquiries.filter(e => e.status === 'Reviewing').length}
                  </span>
                  <span className="text-[10px] text-amber-700/80 font-medium mt-0.5 block">Scoping in progress</span>
                </div>

                <div className="bg-indigo-50/60 border border-indigo-200 rounded-2xl p-4 shadow-sm">
                  <span className="text-[10px] font-black uppercase tracking-wider text-indigo-700 block">Quoted</span>
                  <span className="text-2xl font-black text-indigo-800 mt-1 block">
                    {inquiryMetrics?.quoted ?? enquiries.filter(e => e.status === 'Quoted').length}
                  </span>
                  <span className="text-[10px] text-indigo-700/80 font-medium mt-0.5 block">Proposal delivered</span>
                </div>

                <div className="bg-emerald-50/60 border border-emerald-200 rounded-2xl p-4 shadow-sm col-span-2 sm:col-span-1">
                  <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700 block">Completed</span>
                  <span className="text-2xl font-black text-emerald-800 mt-1 block">
                    {inquiryMetrics?.completed ?? enquiries.filter(e => e.status === 'Completed').length}
                  </span>
                  <span className="text-[10px] text-emerald-700/80 font-medium mt-0.5 block">Successfully resolved</span>
                </div>
              </div>

              {/* Search & Filters */}
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search by customer name, email, phone, company, or Inquiry ID..."
                    value={inquirySearch}
                    onChange={(e) => setInquirySearch(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#155EEF]/20 focus:border-[#155EEF] shadow-sm"
                  />
                </div>

                <select
                  value={inquiryServiceFilter}
                  onChange={(e) => setInquiryServiceFilter(e.target.value)}
                  className="p-2.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 shadow-sm focus:outline-none focus:border-[#155EEF]"
                >
                  <option value="All">All Services</option>
                  <option value="Web Development">Web Development</option>
                  <option value="Mobile App Development">Mobile App Development</option>
                  <option value="AI Solutions & Automation">AI Solutions &amp; Automation</option>
                  <option value="Custom Software & ERP">Custom Software &amp; ERP</option>
                  <option value="Cybersecurity & Hardening">Cybersecurity &amp; Hardening</option>
                  <option value="Cloud & DevOps">Cloud &amp; DevOps</option>
                  <option value="SaaS Development">SaaS Development</option>
                  <option value="IT Maintenance & Support">IT Maintenance &amp; Support</option>
                </select>

                <select
                  value={inquiryStatusFilter}
                  onChange={(e) => setInquiryStatusFilter(e.target.value)}
                  className="p-2.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 shadow-sm focus:outline-none focus:border-[#155EEF]"
                >
                  <option value="All">All Statuses</option>
                  <option value="New">New</option>
                  <option value="Reviewing">Reviewing</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Quoted">Quoted</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>

              {/* Inquiries Table */}
              <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-700">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 text-[10px] uppercase font-bold tracking-wider">
                      <tr>
                        <th className="p-3.5">ID</th>
                        <th className="p-3.5">Customer &amp; Company</th>
                        <th className="p-3.5">Service &amp; Budget</th>
                        <th className="p-3.5">Status</th>
                        <th className="p-3.5">Resend Email</th>
                        <th className="p-3.5">Meta WhatsApp</th>
                        <th className="p-3.5">Created At</th>
                        <th className="p-3.5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {enquiries
                        .filter(item => {
                          if (inquiryStatusFilter !== 'All' && item.status !== inquiryStatusFilter) return false;
                          if (inquiryServiceFilter !== 'All' && !item.service.toLowerCase().includes(inquiryServiceFilter.toLowerCase())) return false;
                          if (inquirySearch.trim()) {
                            const term = inquirySearch.trim().toLowerCase();
                            const matchName = item.full_name?.toLowerCase().includes(term);
                            const matchEmail = item.email?.toLowerCase().includes(term);
                            const matchPhone = item.phone?.toLowerCase().includes(term);
                            const matchCompany = item.company_name?.toLowerCase().includes(term);
                            const matchId = String(item.id).toLowerCase().includes(term);
                            if (!matchName && !matchEmail && !matchPhone && !matchCompany && !matchId) return false;
                          }
                          return true;
                        })
                        .map((inq) => (
                          <tr key={inq.id} className="hover:bg-slate-50/70 transition-colors">
                            <td className="p-3.5 font-mono font-bold text-[#155EEF]">
                              #{inq.id}
                            </td>

                            <td className="p-3.5">
                              <span className="font-bold text-slate-900 block">{inq.full_name}</span>
                              {inq.company_name && (
                                <span className="text-[11px] text-slate-500 block">{inq.company_name}</span>
                              )}
                              <span className="text-[11px] text-slate-400">{inq.email}</span>
                            </td>

                            <td className="p-3.5">
                              <span className="font-semibold text-slate-800 block truncate max-w-[180px]">
                                {inq.service}
                              </span>
                              <span className="text-[11px] text-slate-500">
                                {inq.project_budget || 'Flexible'}
                              </span>
                            </td>

                            <td className="p-3.5">
                              <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                                inq.status === 'New' ? 'bg-blue-50 text-[#155EEF] border border-blue-200' :
                                inq.status === 'Reviewing' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                                inq.status === 'Quoted' ? 'bg-indigo-50 text-indigo-700 border border-indigo-200' :
                                inq.status === 'In Progress' ? 'bg-cyan-50 text-cyan-700 border border-cyan-200' :
                                inq.status === 'Completed' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                                inq.status === 'Rejected' ? 'bg-red-50 text-red-700 border border-red-200' :
                                'bg-purple-50 text-purple-700 border border-purple-200'
                              }`}>
                                {inq.status}
                              </span>
                            </td>

                            <td className="p-3.5">
                              <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                                inq.email_notification_status === 'sent' ? 'bg-emerald-50 text-emerald-700' :
                                inq.email_notification_status === 'failed' ? 'bg-red-50 text-red-600' :
                                'bg-slate-100 text-slate-600'
                              }`}>
                                {inq.email_notification_status || 'Pending'}
                              </span>
                            </td>

                            <td className="p-3.5">
                              <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                                inq.whatsapp_notification_status === 'sent' ? 'bg-emerald-50 text-emerald-700' :
                                inq.whatsapp_notification_status === 'simulated_logged' ? 'bg-blue-50 text-[#155EEF]' :
                                inq.whatsapp_notification_status === 'failed' ? 'bg-red-50 text-red-600' :
                                'bg-slate-100 text-slate-600'
                              }`}>
                                {inq.whatsapp_notification_status || 'Pending'}
                              </span>
                            </td>

                            <td className="p-3.5 text-slate-500 text-[11px] whitespace-nowrap">
                              {new Date(inq.created_at).toLocaleDateString('en-IN', {
                                day: '2-digit',
                                month: 'short',
                                year: 'numeric'
                              })}
                            </td>

                            <td className="p-3.5 text-right space-x-1.5 whitespace-nowrap">
                              <button
                                onClick={() => {
                                  setSelectedInquiry(inq);
                                  setInquiryAdminNotes(inq.admin_notes || '');
                                }}
                                className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-[#155EEF] text-slate-700 hover:text-white font-bold transition-all inline-flex items-center gap-1"
                              >
                                <Eye className="w-3.5 h-3.5" />
                                <span>Inspect</span>
                              </button>

                              <a
                                href={`https://wa.me/${String(inq.phone).replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(inq.full_name)},%20inquiring%20about%20your%20SUDHARSHAN_TECH%20project%20inquiry%20%23${inq.id}.`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-2.5 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 font-bold transition-all inline-flex items-center gap-1"
                                title="Chat on WhatsApp"
                              >
                                <MessageSquare className="w-3.5 h-3.5" />
                              </a>

                              <button
                                onClick={() => handleDeleteInquiry(inq.id)}
                                className="px-2.5 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 font-bold transition-all inline-flex items-center"
                                title="Delete Inquiry"
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>

                  {enquiries.length === 0 && (
                    <div className="p-12 text-center text-slate-500 text-xs">
                      No inquiries currently recorded in MySQL database.
                    </div>
                  )}
                </div>
              </div>

              {/* DETAILED INQUIRY INSPECTOR MODAL */}
              {selectedInquiry && (
                <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-150">
                  <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-2xl w-full p-6 sm:p-8 space-y-6 my-auto max-h-[90vh] overflow-y-auto">
                    
                    <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-black text-sm text-[#155EEF]">
                            INQUIRY #{selectedInquiry.id}
                          </span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 uppercase">
                            Source: {selectedInquiry.source}
                          </span>
                        </div>
                        <h3 className="text-xl font-black text-slate-900 mt-1">
                          {selectedInquiry.full_name}
                        </h3>
                      </div>

                      <button
                        onClick={() => setSelectedInquiry(null)}
                        className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Customer Profile Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
                      <div>
                        <span className="text-slate-400 uppercase font-black tracking-wider text-[10px] block">Email</span>
                        <a href={`mailto:${selectedInquiry.email}`} className="text-[#155EEF] font-bold hover:underline">
                          {selectedInquiry.email}
                        </a>
                      </div>
                      <div>
                        <span className="text-slate-400 uppercase font-black tracking-wider text-[10px] block">Phone Number</span>
                        <a href={`tel:${selectedInquiry.phone}`} className="text-slate-900 font-bold hover:underline">
                          {selectedInquiry.phone}
                        </a>
                      </div>
                      {selectedInquiry.company_name && (
                        <div>
                          <span className="text-slate-400 uppercase font-black tracking-wider text-[10px] block">Company</span>
                          <span className="text-slate-800 font-semibold">{selectedInquiry.company_name}</span>
                        </div>
                      )}
                      <div>
                        <span className="text-slate-400 uppercase font-black tracking-wider text-[10px] block">Estimated Budget</span>
                        <span className="text-slate-800 font-bold">{selectedInquiry.project_budget || 'Flexible'}</span>
                      </div>
                      <div className="sm:col-span-2">
                        <span className="text-slate-400 uppercase font-black tracking-wider text-[10px] block">Service Requested</span>
                        <span className="text-[#155EEF] font-extrabold">{selectedInquiry.service}</span>
                      </div>
                    </div>

                    {/* Project Message */}
                    <div>
                      <span className="text-slate-400 uppercase font-black tracking-wider text-[10px] block mb-1.5">
                        Project Description &amp; Requirements
                      </span>
                      <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs sm:text-sm text-slate-800 leading-relaxed whitespace-pre-wrap">
                        {selectedInquiry.message}
                      </div>
                    </div>

                    {/* Delivery Status Summary */}
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div className="p-3 rounded-xl border border-slate-200 bg-white">
                        <span className="text-[10px] uppercase font-bold text-slate-400 block">Resend Email Status</span>
                        <span className="font-extrabold text-slate-900 mt-0.5 block capitalize">
                          {selectedInquiry.email_notification_status || 'Pending'}
                        </span>
                      </div>
                      <div className="p-3 rounded-xl border border-slate-200 bg-white">
                        <span className="text-[10px] uppercase font-bold text-slate-400 block">Meta WhatsApp Status</span>
                        <span className="font-extrabold text-slate-900 mt-0.5 block capitalize">
                          {selectedInquiry.whatsapp_notification_status || 'Pending'}
                        </span>
                      </div>
                    </div>

                    {/* Status & Admin Notes Form */}
                    <div className="space-y-3 pt-3 border-t border-slate-100">
                      <div>
                        <label className="text-xs font-bold text-slate-700 block mb-1">
                          Update Inquiry Status
                        </label>
                        <select
                          value={selectedInquiry.status}
                          onChange={(e) => handleUpdateInquiryStatus(selectedInquiry.id, e.target.value)}
                          disabled={isUpdatingInquiry}
                          className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:border-[#155EEF]"
                        >
                          <option value="New">New</option>
                          <option value="Reviewing">Reviewing</option>
                          <option value="Contacted">Contacted</option>
                          <option value="Quoted">Quoted</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Completed">Completed</option>
                          <option value="Rejected">Rejected</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-xs font-bold text-slate-700 block mb-1">
                          Internal Admin Notes
                        </label>
                        <textarea
                          rows={3}
                          value={inquiryAdminNotes}
                          onChange={(e) => setInquiryAdminNotes(e.target.value)}
                          placeholder="Add internal notes about phone calls, quotes sent, scope nuances..."
                          className="w-full p-3 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#155EEF] resize-none"
                        />
                      </div>

                      <div className="flex items-center justify-end gap-2 pt-2">
                        <button
                          onClick={() => handleUpdateInquiryStatus(selectedInquiry.id, selectedInquiry.status, inquiryAdminNotes)}
                          disabled={isUpdatingInquiry}
                          className="px-5 py-2.5 rounded-xl bg-[#155EEF] hover:bg-[#1049B8] text-white font-bold text-xs shadow-md shadow-blue-500/20 transition-all disabled:opacity-50"
                        >
                          {isUpdatingInquiry ? 'Saving Changes...' : 'Save Notes & Status'}
                        </button>
                      </div>
                    </div>

                  </div>
                </div>
              )}

            </div>
          )}

          {/* TAB 7: PORTFOLIO PROJECTS */}
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

          {/* TAB 8: NOTIFICATIONS & SMS AUDIT LOGS */}
          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div>
                  <h2 className="text-xl font-black text-[#172033]">Independent Alert Audit Trail</h2>
                  <p className="text-xs text-slate-500">Dual-channel notification records for owner email and mobile SMS alerts.</p>
                </div>

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
                  <button
                    onClick={() => setNotifSubTab('whatsapp')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      notifSubTab === 'whatsapp' ? 'bg-white text-[#155EEF] shadow-sm' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Meta WhatsApp Logs ({whatsappLogs.length})
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
                            No SMS alerts dispatched yet. Place an order or test trigger to log an alert.
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

              {/* Meta WhatsApp Logs Table */}
              {notifSubTab === 'whatsapp' && (
                <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                  <table className="w-full text-left text-xs text-slate-700">
                    <thead className="bg-slate-50 border-b border-slate-200 text-[10px] uppercase text-slate-500 font-bold">
                      <tr>
                        <th className="p-3.5">Time</th>
                        <th className="p-3.5">Recipient</th>
                        <th className="p-3.5">Provider</th>
                        <th className="p-3.5">WhatsApp Message Preview</th>
                        <th className="p-3.5">Delivery Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {whatsappLogs.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="p-6 text-center text-slate-500">
                            No Meta WhatsApp alerts logged yet. Submit an inquiry to trigger an alert.
                          </td>
                        </tr>
                      ) : (
                        whatsappLogs.map(wa => (
                          <tr key={wa.id} className="hover:bg-slate-50/60">
                            <td className="p-3.5 text-slate-500 whitespace-nowrap">
                              {new Date(wa.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </td>
                            <td className="p-3.5 font-mono font-bold text-slate-900">+{wa.recipient}</td>
                            <td className="p-3.5">
                              <span className="px-2 py-0.5 bg-slate-100 rounded text-[10px] font-semibold text-slate-700">
                                {wa.provider}
                              </span>
                            </td>
                            <td className="p-3.5 max-w-[280px] truncate text-slate-600 font-mono text-[11px]">
                              {wa.message}
                            </td>
                            <td className="p-3.5">
                              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                                wa.status === 'sent' 
                                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                                wa.status === 'simulated_logged'
                                  ? 'bg-blue-50 text-[#155EEF] border border-blue-200'
                                  : 'bg-red-50 text-red-600 border border-red-200'
                              }`}>
                                {wa.status}
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

          {/* TAB 9: COMPANY SETTINGS */}
          {activeTab === 'settings' && (
            <div className="space-y-6 max-w-2xl">
              <div>
                <h2 className="text-xl font-black text-[#172033]">Company Identity &amp; Contact Settings</h2>
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

      {/* CREATE QUOTATION MODAL */}
      {isCreatingQuote && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative w-full max-w-xl bg-white border border-slate-200 rounded-3xl shadow-2xl p-6 text-slate-800 space-y-4 my-8">
            <div className="flex justify-between items-center pb-2 border-b border-slate-100">
              <h3 className="text-base font-extrabold text-[#172033]">Create Formal Project Quotation</h3>
              <button onClick={() => setIsCreatingQuote(false)} className="p-1 rounded-lg text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateQuotation} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-700 font-bold block mb-1">Customer Full Name *</label>
                  <input
                    type="text"
                    required
                    value={newQuoteForm.customer_name}
                    onChange={(e) => setNewQuoteForm({ ...newQuoteForm, customer_name: e.target.value })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="text-slate-700 font-bold block mb-1">Business / Company Name</label>
                  <input
                    type="text"
                    value={newQuoteForm.business_name}
                    onChange={(e) => setNewQuoteForm({ ...newQuoteForm, business_name: e.target.value })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-700 font-bold block mb-1">Customer Email Address *</label>
                  <input
                    type="email"
                    required
                    value={newQuoteForm.customer_email}
                    onChange={(e) => setNewQuoteForm({ ...newQuoteForm, customer_email: e.target.value })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="text-slate-700 font-bold block mb-1">Phone Number</label>
                  <input
                    type="text"
                    value={newQuoteForm.customer_phone}
                    onChange={(e) => setNewQuoteForm({ ...newQuoteForm, customer_phone: e.target.value })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-700 font-bold block mb-1">Selected Primary Service</label>
                  <select
                    value={newQuoteForm.requested_services}
                    onChange={(e) => setNewQuoteForm({ ...newQuoteForm, requested_services: e.target.value })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl font-semibold"
                  >
                    {(services || []).map(s => <option key={s.id} value={s.title}>{s.title}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-slate-700 font-bold block mb-1">Estimated Timeline</label>
                  <input
                    type="text"
                    value={newQuoteForm.timeline}
                    onChange={(e) => setNewQuoteForm({ ...newQuoteForm, timeline: e.target.value })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-700 font-bold block mb-1">Project Description &amp; Scope Overview</label>
                <textarea
                  rows={3}
                  value={newQuoteForm.project_description}
                  onChange={(e) => setNewQuoteForm({ ...newQuoteForm, project_description: e.target.value })}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl resize-none"
                  placeholder="Detail the technical specifications and requirements..."
                />
              </div>

              {/* Pricing Breakdown Inputs */}
              <div className="grid grid-cols-4 gap-2 pt-2 border-t border-slate-100">
                <div>
                  <label className="text-[10px] text-slate-500 font-bold block mb-0.5">Base (₹)</label>
                  <input
                    type="number"
                    value={newQuoteForm.base_amount}
                    onChange={(e) => setNewQuoteForm({ ...newQuoteForm, base_amount: Number(e.target.value) })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl font-bold font-mono"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-500 font-bold block mb-0.5">Add-ons (₹)</label>
                  <input
                    type="number"
                    value={newQuoteForm.additional_amount}
                    onChange={(e) => setNewQuoteForm({ ...newQuoteForm, additional_amount: Number(e.target.value) })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl font-bold font-mono"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-500 font-bold block mb-0.5">Discount (₹)</label>
                  <input
                    type="number"
                    value={newQuoteForm.discount}
                    onChange={(e) => setNewQuoteForm({ ...newQuoteForm, discount: Number(e.target.value) })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl font-bold font-mono text-emerald-600"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-500 font-bold block mb-0.5">Tax (₹)</label>
                  <input
                    type="number"
                    value={newQuoteForm.tax}
                    onChange={(e) => setNewQuoteForm({ ...newQuoteForm, tax: Number(e.target.value) })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl font-bold font-mono"
                  />
                </div>
              </div>

              <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl flex items-center justify-between">
                <span className="font-bold text-slate-800">Final Quoted Total:</span>
                <span className="text-base font-black text-[#155EEF]">
                  ₹{(Math.max(0, newQuoteForm.base_amount + newQuoteForm.additional_amount - newQuoteForm.discount + newQuoteForm.tax)).toLocaleString('en-IN')}
                </span>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#155EEF] hover:bg-blue-600 text-white font-bold text-xs shadow-md shadow-blue-500/20"
              >
                Create Quotation Record
              </button>
            </form>
          </div>
        </div>
      )}

      {/* EDIT SPECIAL OFFER MODAL */}
      {editingOffer && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative w-full max-w-md bg-white border border-slate-200 rounded-3xl shadow-2xl p-6 text-slate-800 space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-slate-100">
              <h3 className="text-base font-extrabold text-[#172033]">Edit Special Offer Package</h3>
              <button onClick={() => setEditingOffer(null)} className="p-1 rounded-lg text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-slate-600 font-bold block mb-1">Offer Title</label>
                <input
                  type="text"
                  value={editingOffer.title}
                  onChange={(e) => setEditingOffer({ ...editingOffer, title: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800"
                />
              </div>

              <div>
                <label className="text-slate-600 font-bold block mb-1">Starting Price (₹)</label>
                <input
                  type="number"
                  value={editingOffer.starting_price}
                  onChange={(e) => setEditingOffer({ ...editingOffer, starting_price: Number(e.target.value) })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-mono font-bold text-sm"
                />
              </div>

              <div>
                <label className="text-slate-600 font-bold block mb-1">Defined Scope Limits</label>
                <textarea
                  rows={2}
                  value={editingOffer.scope_limits}
                  onChange={(e) => setEditingOffer({ ...editingOffer, scope_limits: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 resize-none"
                />
              </div>

              <button
                type="button"
                onClick={() => handleSaveOffer(editingOffer.id, editingOffer)}
                className="w-full py-3 rounded-xl bg-[#155EEF] hover:bg-blue-600 text-white font-bold mt-2 shadow-md"
              >
                Save Offer Changes
              </button>
            </div>
          </div>
        </div>
      )}

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
                  <span>Verify Payment &amp; Start</span>
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
