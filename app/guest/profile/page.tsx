'use client';

import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { MOCK_USERS } from '@/lib/mock-data';
import {
  User, Mail, Phone, FileText, ShieldCheck, Camera,
  CheckCircle2, AlertCircle, Save, Lock, Bell, Eye,
  EyeOff, Globe, MapPin, Calendar, Star, Heart,
  BookOpen, ChevronRight, Crown, Award, Clock,
  Instagram, Twitter, Facebook, ExternalLink, Trash2,
} from 'lucide-react';

const NAV_TABS = [
  { key: 'profile',   label: 'Profile',    icon: <User size={15} /> },
  { key: 'security',  label: 'Security',   icon: <Lock size={15} /> },
  { key: 'notifications', label: 'Notifications', icon: <Bell size={15} /> },
  { key: 'privacy',   label: 'Privacy',    icon: <Eye size={15} /> },
];

const STAT_CARDS = (user: any) => [
  { icon: '🏡', label: 'Stays Booked',  value: user?.totalBookings  ?? 0  },
  { icon: '⭐', label: 'Avg. Rating',   value: user?.rating         ?? '—' },
  { icon: '❤️', label: 'Saved Stays',  value: user?.savedListings  ?? 0  },
  { icon: '🌍', label: 'Countries',     value: user?.countries      ?? 0  },
];

export default function ProfilePage() {
  const { data: session, status } = useSession();
  
  const sessionUser = session?.user;
  const mockUser = MOCK_USERS.find(u => u.id === sessionUser?.id);

  // Fallback to session user if not in mock data
  const user = mockUser || (sessionUser ? {
    id: sessionUser.id,
    name: sessionUser.name || 'Guest User',
    email: sessionUser.email || '',
    role: (sessionUser as any).role || 'guest',
    avatar: sessionUser.image || undefined,
    bio: '',
    phone: '',
    verified: false,
    totalBookings: 0,
    savedListings: 0,
    countries: 0,
    rating: '—',
    location: '',
    website: '',
  } : null);

  const [activeTab, setActiveTab]       = useState('profile');
  const [loading, setLoading]           = useState(false);
  const [success, setSuccess]           = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [avatarHover, setAvatarHover]   = useState(false);

  const [formData, setFormData] = useState({
    name:     user?.name     || '',
    email:    user?.email    || '',
    phone:    user?.phone    || '',
    bio:      user?.bio      || '',
    location: (user as any)?.location || '',
    website:  (user as any)?.website  || '',
    language: 'English',
  });

  const [notifications, setNotifications] = useState({
    bookingConfirm: true,
    reminders:      true,
    promotions:     false,
    newsletter:     false,
    hostMessages:   true,
    reviewAlerts:   true,
  });

  const [privacy, setPrivacy] = useState({
    showProfile:   true,
    showBookings:  false,
    dataSharing:   false,
  });

  const [passwords, setPasswords] = useState({
    current: '', newPass: '', confirm: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3500);
    }, 1600);
  };

  if (status === 'loading') {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="gp-spinner" style={{ width: 40, height: 40, borderTopColor: 'var(--p)' }} />
      </div>
    );
  }

  if (!user) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20 }}>
        <h2>Please sign in to view your profile</h2>
        <a href="/auth/login" className="gp-submit" style={{ textDecoration: 'none' }}>Sign In</a>
      </div>
    );
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&display=swap');

        .gp {
          --p:        oklch(0.4 0.155 11.87);
          --p-hover:  oklch(0.34 0.155 11.87);
          --p-light:  oklch(0.6 0.155 11.87);
          --p-pale:   oklch(0.965 0.018 11.87);
          --p-pale2:  oklch(0.945 0.03 11.87);
          --p-ring:   oklch(0.4 0.155 11.87 / 0.14);
          --p-shadow: oklch(0.4 0.155 11.87 / 0.24);
          --bg:       oklch(0.978 0.002 0);
          --bg2:      oklch(0.965 0.002 0);
          --fg:       oklch(0.1 0.001 0);
          --fg2:      oklch(0.28 0.002 0);
          --muted:    oklch(0.52 0.006 0);
          --subtle:   oklch(0.70 0.004 0);
          --border:   oklch(0.9 0.002 0);
          --card:     oklch(1 0 0);
          --green:    oklch(0.52 0.16 145);
          --green-bg: oklch(0.96 0.04 145);
          --amber:    oklch(0.7 0.18 55);
          --amber-bg: oklch(0.97 0.04 55);
          font-family: 'DM Sans', system-ui, sans-serif;
          background: var(--bg);
          color: var(--fg);
          min-height: 100vh;
        }

        /* ── Keyframes ── */
        @keyframes gpUp   { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        @keyframes gpIn   { from{opacity:0} to{opacity:1} }
        @keyframes gpPop  { 0%{transform:scale(0.85);opacity:0} 70%{transform:scale(1.04)} 100%{transform:scale(1);opacity:1} }
        @keyframes gpSucc { 0%{transform:translateY(-8px);opacity:0} 100%{transform:translateY(0);opacity:1} }
        @keyframes gpPing { 0%{transform:scale(1);opacity:0.5} 100%{transform:scale(2);opacity:0} }
        @keyframes gpSpin { to{transform:rotate(360deg)} }
        @keyframes gpShim { 0%{background-position:-200% 0} 100%{background-position:200% 0} }

        .gp-up  { animation: gpUp  0.55s cubic-bezier(.22,.68,0,1.15) both; }
        .gp-in  { animation: gpIn  0.4s ease both; }
        .gp-pop { animation: gpPop 0.45s cubic-bezier(.22,.68,0,1.2) both; }
        .gp-d1  { animation-delay:.06s } .gp-d2 { animation-delay:.12s }
        .gp-d3  { animation-delay:.18s } .gp-d4 { animation-delay:.24s }
        .gp-d5  { animation-delay:.30s } .gp-d6 { animation-delay:.36s }

        /* ── Layout ── */
        .gp-wrap {
          max-width: 1180px;
          margin: 0 auto;
          padding: 48px 32px 80px;
          display: grid;
          grid-template-columns: 300px 1fr;
          gap: 28px;
          align-items: start;
        }
        @media(max-width:900px) { .gp-wrap { grid-template-columns:1fr; padding:28px 16px 60px; } }

        /* ── Page header ── */
        .gp-page-hdr {
          max-width: 1180px;
          margin: 0 auto;
          padding: 36px 32px 0;
        }
        .gp-breadcrumb {
          display: flex; align-items: center; gap: 6px;
          font-size: 0.78rem; color: var(--muted);
          margin-bottom: 14px;
        }
        .gp-breadcrumb a { color: var(--p); text-decoration: none; }
        .gp-breadcrumb a:hover { text-decoration: underline; }
        .gp-page-title {
          font-size: 1.9rem; font-weight: 700;
          color: var(--fg); letter-spacing: -0.02em;
        }
        .gp-page-sub { font-size: 0.88rem; color: var(--muted); margin-top: 4px; }

        /* ── LEFT COLUMN ── */
        .gp-left { display: flex; flex-direction: column; gap: 18px; }

        /* Avatar card */
        .gp-avatar-card {
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 2px 12px rgba(0,0,0,0.04);
        }
        .gp-avatar-banner {
          height: 88px;
          background: linear-gradient(135deg, var(--p) 0%, oklch(0.52 0.18 30) 100%);
          position: relative;
        }
        .gp-avatar-banner-pattern {
          position: absolute; inset: 0;
          background-image: radial-gradient(circle, rgba(255,255,255,0.08) 1px, transparent 1px);
          background-size: 18px 18px;
        }
        .gp-avatar-body { padding: 0 24px 28px; text-align: center; }
        .gp-avatar-wrap {
          width: 96px; height: 96px;
          border-radius: 50%;
          border: 4px solid var(--card);
          margin: -48px auto 14px;
          position: relative;
          cursor: pointer;
        }
        .gp-avatar-img {
          width: 100%; height: 100%;
          border-radius: 50%;
          object-fit: cover;
          display: block;
        }
        .gp-avatar-fallback {
          width: 100%; height: 100%;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--p), oklch(0.52 0.18 30));
          display: flex; align-items: center; justify-content: center;
          font-size: 1.5rem; font-weight: 700; color: #fff;
        }
        .gp-avatar-overlay {
          position: absolute; inset: 0;
          border-radius: 50%;
          background: rgba(0,0,0,0.42);
          display: flex; align-items: center; justify-content: center;
          opacity: 0; transition: opacity 0.25s;
          color: #fff;
        }
        .gp-avatar-wrap:hover .gp-avatar-overlay { opacity: 1; }

        .gp-avatar-name { font-size: 1.08rem; font-weight: 700; color: var(--fg); }
        .gp-avatar-email { font-size: 0.78rem; color: var(--muted); margin-top: 3px; }

        .gp-verified-pill {
          display: inline-flex; align-items: center; gap: 5px;
          padding: 5px 13px; border-radius: 100px;
          background: var(--green-bg);
          color: var(--green);
          font-size: 0.72rem; font-weight: 700;
          margin-top: 12px;
        }
        .gp-unverified-pill {
          display: inline-flex; align-items: center; gap: 5px;
          padding: 5px 13px; border-radius: 100px;
          background: var(--amber-bg);
          color: oklch(0.48 0.14 55);
          font-size: 0.72rem; font-weight: 700;
          margin-top: 12px;
        }

        .gp-avatar-divider { height: 1px; background: var(--border); margin: 18px 0; }

        /* Member since badge */
        .gp-member-badge {
          display: flex; align-items: center; gap: 8px;
          font-size: 0.78rem; color: var(--muted);
          justify-content: center;
        }

        /* Stat cards row */
        .gp-stats-grid {
          display: grid; grid-template-columns: repeat(2, 1fr);
          gap: 10px;
        }
        .gp-stat-card {
          padding: 16px; border-radius: 16px;
          background: var(--card);
          border: 1px solid var(--border);
          text-align: center;
          transition: all 0.25s;
        }
        .gp-stat-card:hover {
          border-color: color-mix(in oklch, var(--p) 30%, var(--border));
          transform: translateY(-3px);
          box-shadow: 0 8px 24px var(--p-ring);
        }
        .gp-stat-icon  { font-size: 1.3rem; margin-bottom: 6px; }
        .gp-stat-val   { font-size: 1.4rem; font-weight: 700; color: var(--fg); }
        .gp-stat-label { font-size: 0.7rem; color: var(--muted); margin-top: 2px; }

        /* Social links card */
        .gp-social-card {
          background: var(--card); border: 1px solid var(--border);
          border-radius: 20px; padding: 20px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.03);
        }
        .gp-social-title {
          font-size: 0.78rem; font-weight: 600; letter-spacing: 0.07em;
          text-transform: uppercase; color: var(--subtle);
          margin-bottom: 14px;
        }
        .gp-social-row {
          display: flex; align-items: center; gap: 10px;
          padding: 10px 12px; border-radius: 11px;
          border: 1px solid var(--border);
          cursor: pointer; transition: all 0.2s;
          text-decoration: none; color: inherit;
          margin-bottom: 8px;
        }
        .gp-social-row:last-child { margin-bottom: 0; }
        .gp-social-row:hover {
          border-color: color-mix(in oklch, var(--p) 35%, var(--border));
          background: var(--p-pale);
        }
        .gp-social-icon {
          width: 32px; height: 32px;
          border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; font-size: 0.88rem;
        }
        .gp-social-lbl { font-size: 0.82rem; font-weight: 500; color: var(--fg); flex:1; }
        .gp-social-connect {
          font-size: 0.7rem; font-weight: 600; color: var(--p);
          display: flex; align-items: center; gap: 3px;
        }

        /* Nav tabs */
        .gp-nav-card {
          background: var(--card); border: 1px solid var(--border);
          border-radius: 20px; padding: 8px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.03);
        }
        .gp-nav-btn {
          width: 100%; display: flex; align-items: center; gap: 10px;
          padding: 12px 14px; border-radius: 12px;
          background: none; border: none; cursor: pointer;
          font-family: inherit; font-size: 0.88rem; font-weight: 500;
          color: var(--muted); transition: all 0.22s;
          text-align: left;
        }
        .gp-nav-btn:hover { background: var(--bg2); color: var(--fg); }
        .gp-nav-btn.active {
          background: var(--p-pale);
          color: var(--p);
          font-weight: 600;
        }
        .gp-nav-btn.active svg { color: var(--p); }
        .gp-nav-icon {
          width: 32px; height: 32px; border-radius: 9px;
          display: flex; align-items: center; justify-content: center;
          background: var(--bg2); flex-shrink: 0;
          transition: background 0.22s;
        }
        .gp-nav-btn.active .gp-nav-icon { background: color-mix(in oklch, var(--p) 15%, transparent); }
        .gp-nav-chevron { margin-left: auto; color: var(--subtle); }

        /* ── RIGHT COLUMN — Panel ── */
        .gp-panel {
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0,0,0,0.05);
          animation: gpIn 0.4s ease;
        }
        .gp-panel-hdr {
          padding: 28px 32px 24px;
          border-bottom: 1px solid var(--border);
          background: linear-gradient(to right, var(--p-pale), var(--card) 60%);
          display: flex; align-items: flex-start; justify-content: space-between;
          gap: 16px;
        }
        .gp-panel-title { font-size: 1.2rem; font-weight: 700; color: var(--fg); letter-spacing:-0.01em; }
        .gp-panel-sub   { font-size: 0.83rem; color: var(--muted); margin-top: 3px; }
        .gp-panel-badge {
          display: inline-flex; align-items: center; gap: 5px;
          padding: 5px 12px; border-radius: 100px;
          background: var(--p-pale2); color: var(--p);
          font-size: 0.72rem; font-weight: 600;
          border: 1px solid color-mix(in oklch, var(--p) 20%, transparent);
          white-space: nowrap;
        }
        .gp-panel-body  { padding: 32px; }

        /* ── Form ── */
        .gp-section-title {
          font-size: 0.75rem; font-weight: 700;
          letter-spacing: 0.08em; text-transform: uppercase;
          color: var(--subtle); margin-bottom: 16px;
          display: flex; align-items: center; gap: 8px;
        }
        .gp-section-title::after {
          content:''; flex:1; height:1px; background:var(--border);
        }

        .gp-form-row {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 18px; margin-bottom: 18px;
        }
        @media(max-width:600px) { .gp-form-row { grid-template-columns: 1fr; } }

        .gp-field { display: flex; flex-direction: column; gap: 6px; margin-bottom: 18px; }
        .gp-field:last-child { margin-bottom: 0; }

        .gp-label {
          font-size: 0.8rem; font-weight: 600; color: var(--fg2);
          display: flex; align-items: center; gap: 6px;
        }
        .gp-label svg { color: var(--p); }

        .gp-input-wrap {
          position: relative; display: flex; align-items: center;
        }
        .gp-input-icon {
          position: absolute; left: 14px;
          color: var(--subtle); pointer-events: none;
          display: flex; align-items: center;
        }
        .gp-input {
          width: 100%; padding: 12px 14px 12px 42px;
          border: 1.5px solid var(--border);
          border-radius: 12px;
          background: var(--bg);
          font-size: 0.9rem; color: var(--fg);
          font-family: inherit; outline: none;
          transition: border-color 0.25s, box-shadow 0.25s, background 0.2s;
        }
        .gp-input:focus {
          border-color: var(--p);
          box-shadow: 0 0 0 4px var(--p-ring);
          background: var(--card);
        }
        .gp-input:disabled {
          background: var(--bg2); color: var(--subtle);
          cursor: not-allowed;
        }
        .gp-input::placeholder { color: var(--subtle); }

        .gp-input-plain {
          width: 100%; padding: 12px 14px;
          border: 1.5px solid var(--border);
          border-radius: 12px;
          background: var(--bg);
          font-size: 0.9rem; color: var(--fg);
          font-family: inherit; outline: none;
          transition: border-color 0.25s, box-shadow 0.25s, background 0.2s;
        }
        .gp-input-plain:focus {
          border-color: var(--p);
          box-shadow: 0 0 0 4px var(--p-ring);
          background: var(--card);
        }

        .gp-textarea {
          width: 100%; padding: 13px 16px;
          border: 1.5px solid var(--border); border-radius: 12px;
          background: var(--bg);
          font-size: 0.9rem; color: var(--fg);
          font-family: inherit; outline: none; resize: vertical;
          transition: border-color 0.25s, box-shadow 0.25s, background 0.2s;
          min-height: 110px;
        }
        .gp-textarea:focus {
          border-color: var(--p);
          box-shadow: 0 0 0 4px var(--p-ring);
          background: var(--card);
        }
        .gp-textarea::placeholder { color: var(--subtle); }

        .gp-hint { font-size: 0.74rem; color: var(--muted); margin-top: 4px; }
        .gp-char-count {
          font-size: 0.72rem; color: var(--subtle);
          text-align: right; margin-top: 4px;
        }

        /* Disabled email field */
        .gp-lock-badge {
          position: absolute; right: 12px;
          display: flex; align-items: center; gap: 4px;
          font-size: 0.7rem; color: var(--subtle); font-weight: 500;
        }

        /* Submit button */
        .gp-submit {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 13px 30px; border-radius: 12px;
          background: var(--p); color: #fff; border: none;
          font-size: 0.92rem; font-weight: 600;
          font-family: inherit; cursor: pointer;
          transition: all 0.25s;
          box-shadow: 0 4px 16px var(--p-shadow);
        }
        .gp-submit:hover { background: var(--p-hover); transform: translateY(-2px); box-shadow: 0 8px 28px var(--p-shadow); }
        .gp-submit:disabled { opacity: 0.65; cursor: not-allowed; transform: none; }

        .gp-spinner {
          width: 16px; height: 16px;
          border: 2px solid rgba(255,255,255,0.35);
          border-top-color: #fff;
          border-radius: 50%;
          animation: gpSpin 0.7s linear infinite;
        }

        /* Success toast */
        .gp-toast {
          display: flex; align-items: center; gap: 12px;
          padding: 14px 18px; border-radius: 14px;
          background: var(--green-bg);
          border: 1px solid color-mix(in oklch, var(--green) 25%, transparent);
          color: var(--green);
          font-size: 0.87rem; font-weight: 500;
          margin-bottom: 24px;
          animation: gpSucc 0.4s cubic-bezier(.22,.68,0,1.2);
        }

        /* ── Toggle ── */
        .gp-toggle-row {
          display: flex; align-items: flex-start; justify-content: space-between; gap: 16px;
          padding: 18px 0; border-bottom: 1px solid var(--border);
        }
        .gp-toggle-row:last-child { border-bottom: none; }
        .gp-toggle-info { flex: 1; }
        .gp-toggle-lbl { font-size: 0.9rem; font-weight: 600; color: var(--fg); }
        .gp-toggle-sub { font-size: 0.77rem; color: var(--muted); margin-top: 3px; }

        .gp-toggle {
          position: relative; width: 46px; height: 26px;
          background: var(--border); border-radius: 100px;
          cursor: pointer; border: none;
          transition: background 0.25s; flex-shrink: 0;
          margin-top: 2px;
        }
        .gp-toggle.on { background: var(--p); }
        .gp-toggle::after {
          content:''; position:absolute;
          width:20px; height:20px; border-radius:50%;
          background:#fff; top:3px; left:3px;
          transition: transform 0.25s cubic-bezier(.22,.68,0,1.2);
          box-shadow: 0 1px 4px rgba(0,0,0,0.2);
        }
        .gp-toggle.on::after { transform: translateX(20px); }

        /* Status badge */
        .gp-status-section {
          padding: 22px; border-radius: 16px;
          background: var(--bg2); border: 1px solid var(--border);
          display: flex; align-items: center; gap: 16px; margin-bottom: 24px;
        }
        .gp-status-icon {
          width: 48px; height: 48px; border-radius: 14px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .gp-status-title { font-size: 0.9rem; font-weight: 600; color: var(--fg); }
        .gp-status-sub   { font-size: 0.78rem; color: var(--muted); margin-top: 3px; }

        /* Password field */
        .gp-pw-toggle {
          position: absolute; right: 14px; top: 50%;
          transform: translateY(-50%);
          background: none; border: none; cursor: pointer;
          color: var(--subtle); padding: 0; display: flex;
        }
        .gp-pw-toggle:hover { color: var(--fg); }

        /* Danger zone */
        .gp-danger-card {
          margin-top: 32px; padding: 22px;
          border-radius: 16px;
          background: oklch(0.99 0.008 11.87);
          border: 1px solid oklch(0.88 0.03 11.87);
        }
        .gp-danger-title { font-size: 0.88rem; font-weight: 700; color: oklch(0.45 0.155 11.87); margin-bottom: 6px; }
        .gp-danger-sub   { font-size: 0.78rem; color: var(--muted); margin-bottom: 16px; }
        .gp-danger-btn {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 9px 18px; border-radius: 10px;
          background: none;
          border: 1.5px solid oklch(0.7 0.155 11.87);
          color: oklch(0.45 0.155 11.87);
          font-size: 0.83rem; font-weight: 600;
          cursor: pointer; font-family: inherit;
          transition: all 0.2s;
        }
        .gp-danger-btn:hover { background: oklch(0.97 0.02 11.87); }

        /* Shimmer skeleton placeholder */
        .gp-shimmer {
          background: linear-gradient(90deg, var(--bg2) 25%, var(--border) 50%, var(--bg2) 75%);
          background-size: 200% 100%;
          animation: gpShim 1.4s ease infinite;
          border-radius: 8px;
        }

        /* Responsive */
        @media(max-width:900px) {
          .gp-panel-body { padding: 20px; }
          .gp-panel-hdr  { padding: 20px 20px 18px; }
        }
      `}</style>

      <div className="gp">

        {/* ── Page Header ── */}
        <div className="gp-page-hdr gp-up">
          <div className="gp-breadcrumb">
            <a href="/guest">Home</a>
            <ChevronRight size={12} />
            <span>Profile Settings</span>
          </div>
          <h1 className="gp-page-title">Account Settings</h1>
          <p className="gp-page-sub">Manage your personal information, security and preferences</p>
        </div>

        {/* ── Main Grid ── */}
        <div className="gp-wrap">

          {/* ════════════════════════════
              LEFT COLUMN
          ════════════════════════════ */}
          <aside className="gp-left">

            {/* Avatar Card */}
            <div className="gp-avatar-card gp-up gp-d1">
              <div className="gp-avatar-banner">
                <div className="gp-avatar-banner-pattern" />
              </div>
              <div className="gp-avatar-body">
                <div
                  className="gp-avatar-wrap"
                  onMouseEnter={() => setAvatarHover(true)}
                  onMouseLeave={() => setAvatarHover(false)}
                >
                  {user.avatar
                    ? <img src={user.avatar} alt={user.name} className="gp-avatar-img" />
                    : <div className="gp-avatar-fallback">
                        {user.name?.split(' ').map((n: string) => n[0]).join('').toUpperCase() || 'GU'}
                      </div>
                  }
                  <div className="gp-avatar-overlay">
                    <Camera size={20} />
                  </div>
                </div>

                <div className="gp-avatar-name">{user.name}</div>
                <div className="gp-avatar-email">{user.email}</div>

                {user.verified
                  ? <div className="gp-verified-pill"><CheckCircle2 size={11} /> Verified Account</div>
                  : <div className="gp-unverified-pill"><AlertCircle size={11} /> Pending Verification</div>
                }

                <div className="gp-avatar-divider" />

                <div className="gp-member-badge">
                  <Calendar size={12} />
                  <span>Member since Jan 2024</span>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="gp-stats-grid gp-up gp-d2">
              {STAT_CARDS(user).map(s => (
                <div key={s.label} className="gp-stat-card">
                  <div className="gp-stat-icon">{s.icon}</div>
                  <div className="gp-stat-val">{s.value}</div>
                  <div className="gp-stat-label">{s.label}</div>
                </div>
              ))}
            </div>

            {/* Nav Tabs */}
            <div className="gp-nav-card gp-up gp-d3">
              {NAV_TABS.map(tab => (
                <button
                  key={tab.key}
                  className={`gp-nav-btn ${activeTab === tab.key ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab.key)}
                >
                  <div className="gp-nav-icon">{tab.icon}</div>
                  {tab.label}
                  <ChevronRight size={14} className="gp-nav-chevron" />
                </button>
              ))}
            </div>

            {/* Social Links Card */}
            <div className="gp-social-card gp-up gp-d4">
              <div className="gp-social-title">Connected Accounts</div>
              {[
                { icon: '📸', label: 'Instagram', color: '#E1306C' },
                { icon: '🐦', label: 'Twitter / X', color: '#1DA1F2' },
                { icon: '👤', label: 'Facebook', color: '#1877F2' },
              ].map(s => (
                <div key={s.label} className="gp-social-row">
                  <div className="gp-social-icon" style={{ background: `${s.color}18` }}>
                    {s.icon}
                  </div>
                  <span className="gp-social-lbl">{s.label}</span>
                  <span className="gp-social-connect">Connect <ExternalLink size={10} /></span>
                </div>
              ))}
            </div>

          </aside>

          {/* ════════════════════════════
              RIGHT COLUMN — Panels
          ════════════════════════════ */}
          <div className="gp-up gp-d2">

            {/* ── PROFILE TAB ── */}
            {activeTab === 'profile' && (
              <div className="gp-panel">
                <div className="gp-panel-hdr">
                  <div>
                    <div className="gp-panel-title">Edit Profile</div>
                    <div className="gp-panel-sub">Update your public information and preferences</div>
                  </div>
                  <div className="gp-panel-badge"><Crown size={11} /> Auto-saved</div>
                </div>

                <div className="gp-panel-body">
                  {success && (
                    <div className="gp-toast">
                      <CheckCircle2 size={18} />
                      Profile updated successfully! Changes are now live.
                    </div>
                  )}

                  {/* Account status */}
                  <div className="gp-status-section">
                    {user.verified ? (
                      <>
                        <div className="gp-status-icon" style={{ background: 'var(--green-bg)', color: 'var(--green)' }}>
                          <ShieldCheck size={22} />
                        </div>
                        <div>
                          <div className="gp-status-title">Account Verified</div>
                          <div className="gp-status-sub">Your identity has been confirmed. You have full access to all features.</div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="gp-status-icon" style={{ background: 'var(--amber-bg)', color: 'var(--amber)' }}>
                          <AlertCircle size={22} />
                        </div>
                        <div>
                          <div className="gp-status-title">Verification Pending</div>
                          <div className="gp-status-sub">Verify your account to unlock all features and build host trust.</div>
                        </div>
                      </>
                    )}
                  </div>

                  <form onSubmit={handleSubmit}>

                    <div className="gp-section-title">Personal Information</div>

                    <div className="gp-form-row">
                      <div className="gp-field">
                        <label className="gp-label" htmlFor="name"><User size={13} /> Full Name</label>
                        <div className="gp-input-wrap">
                          <span className="gp-input-icon"><User size={14} /></span>
                          <input
                            id="name" name="name" className="gp-input"
                            value={formData.name} onChange={handleChange}
                            placeholder="Your full name" disabled={loading}
                          />
                        </div>
                      </div>

                      <div className="gp-field">
                        <label className="gp-label" htmlFor="phone"><Phone size={13} /> Phone Number</label>
                        <div className="gp-input-wrap">
                          <span className="gp-input-icon"><Phone size={14} /></span>
                          <input
                            id="phone" name="phone" type="tel" className="gp-input"
                            value={formData.phone} onChange={handleChange}
                            placeholder="+254 700 000 000" disabled={loading}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Email — locked */}
                    <div className="gp-field">
                      <label className="gp-label" htmlFor="email"><Mail size={13} /> Email Address</label>
                      <div className="gp-input-wrap">
                        <span className="gp-input-icon"><Mail size={14} /></span>
                        <input
                          id="email" name="email" type="email" className="gp-input"
                          value={formData.email} disabled
                          style={{ paddingRight: '110px' }}
                        />
                        <span className="gp-lock-badge"><Lock size={11} /> Cannot change</span>
                      </div>
                      <span className="gp-hint">Contact support to update your email address.</span>
                    </div>

                    <div className="gp-form-row">
                      <div className="gp-field">
                        <label className="gp-label" htmlFor="location"><MapPin size={13} /> Location</label>
                        <div className="gp-input-wrap">
                          <span className="gp-input-icon"><MapPin size={14} /></span>
                          <input
                            id="location" name="location" className="gp-input"
                            value={formData.location} onChange={handleChange}
                            placeholder="City, Country" disabled={loading}
                          />
                        </div>
                      </div>

                      <div className="gp-field">
                        <label className="gp-label" htmlFor="language"><Globe size={13} /> Preferred Language</label>
                        <div className="gp-input-wrap">
                          <span className="gp-input-icon"><Globe size={14} /></span>
                          <input
                            id="language" name="language" className="gp-input"
                            value={formData.language} onChange={handleChange}
                            placeholder="e.g. English" disabled={loading}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="gp-field">
                      <label className="gp-label" htmlFor="website"><ExternalLink size={13} /> Website / Portfolio</label>
                      <div className="gp-input-wrap">
                        <span className="gp-input-icon"><ExternalLink size={14} /></span>
                        <input
                          id="website" name="website" type="url" className="gp-input"
                          value={formData.website} onChange={handleChange}
                          placeholder="https://yoursite.com" disabled={loading}
                        />
                      </div>
                    </div>

                    <div style={{ marginTop: 28 }}>
                      <div className="gp-section-title">About You</div>
                    </div>

                    <div className="gp-field">
                      <label className="gp-label" htmlFor="bio"><FileText size={13} /> Bio</label>
                      <textarea
                        id="bio" name="bio" className="gp-textarea"
                        value={formData.bio} onChange={handleChange}
                        placeholder="Tell hosts a little about yourself — your travel style, interests, what you love about exploring new places…"
                        rows={4} disabled={loading}
                      />
                      <div className="gp-char-count">{formData.bio.length} / 300 characters</div>
                    </div>

                    <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginTop: 8, flexWrap:'wrap', gap:12 }}>
                      <span style={{ fontSize:'0.78rem', color:'var(--muted)' }}>
                        Last updated just now
                      </span>
                      <button type="submit" className="gp-submit" disabled={loading}>
                        {loading
                          ? <><div className="gp-spinner" /> Saving…</>
                          : <><Save size={15} /> Save Changes</>
                        }
                      </button>
                    </div>

                  </form>

                  {/* Danger zone */}
                  <div className="gp-danger-card">
                    <div className="gp-danger-title">Danger Zone</div>
                    <div className="gp-danger-sub">Permanently delete your account and all associated data. This cannot be undone.</div>
                    <button className="gp-danger-btn">
                      <Trash2 size={13} /> Delete Account
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ── SECURITY TAB ── */}
            {activeTab === 'security' && (
              <div className="gp-panel">
                <div className="gp-panel-hdr">
                  <div>
                    <div className="gp-panel-title">Security Settings</div>
                    <div className="gp-panel-sub">Manage your password and account security</div>
                  </div>
                  <div className="gp-panel-badge"><ShieldCheck size={11} /> Protected</div>
                </div>
                <div className="gp-panel-body">

                  <div className="gp-status-section">
                    <div className="gp-status-icon" style={{ background:'var(--green-bg)', color:'var(--green)' }}>
                      <ShieldCheck size={22} />
                    </div>
                    <div>
                      <div className="gp-status-title">Account is Secure</div>
                      <div className="gp-status-sub">Last sign-in: Today at 09:42 AM from Nairobi, Kenya</div>
                    </div>
                  </div>

                  <div className="gp-section-title">Change Password</div>

                  <div className="gp-field">
                    <label className="gp-label"><Lock size={13} /> Current Password</label>
                    <div className="gp-input-wrap">
                      <span className="gp-input-icon"><Lock size={14} /></span>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        className="gp-input"
                        value={passwords.current}
                        onChange={e => setPasswords(p => ({ ...p, current: e.target.value }))}
                        placeholder="Enter current password"
                        style={{ paddingRight: '44px' }}
                      />
                      <button
                        type="button" className="gp-pw-toggle"
                        onClick={() => setShowPassword(v => !v)}
                      >
                        {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                      </button>
                    </div>
                  </div>

                  <div className="gp-form-row">
                    <div className="gp-field">
                      <label className="gp-label"><Lock size={13} /> New Password</label>
                      <div className="gp-input-wrap">
                        <span className="gp-input-icon"><Lock size={14} /></span>
                        <input
                          type="password" className="gp-input"
                          value={passwords.newPass}
                          onChange={e => setPasswords(p => ({ ...p, newPass: e.target.value }))}
                          placeholder="Min 8 characters"
                        />
                      </div>
                    </div>
                    <div className="gp-field">
                      <label className="gp-label"><Lock size={13} /> Confirm Password</label>
                      <div className="gp-input-wrap">
                        <span className="gp-input-icon"><Lock size={14} /></span>
                        <input
                          type="password" className="gp-input"
                          value={passwords.confirm}
                          onChange={e => setPasswords(p => ({ ...p, confirm: e.target.value }))}
                          placeholder="Repeat new password"
                        />
                      </div>
                    </div>
                  </div>

                  {passwords.newPass && (
                    <div style={{ display:'flex', gap:6, marginTop:-8, marginBottom:18 }}>
                      {['Weak','Fair','Strong','Very Strong'].map((lbl, i) => (
                        <div key={lbl} style={{ flex:1 }}>
                          <div style={{
                            height:4, borderRadius:4,
                            background: passwords.newPass.length > i * 3
                              ? i === 0 ? 'oklch(0.6 0.18 25)' : i === 1 ? 'oklch(0.7 0.18 55)' : i === 2 ? 'oklch(0.55 0.16 145)' : 'oklch(0.5 0.16 145)'
                              : 'var(--border)',
                            transition: 'background 0.3s'
                          }} />
                          {passwords.newPass.length > i * 3 && (
                            <div style={{ fontSize:'0.62rem', color:'var(--muted)', marginTop:3 }}>{lbl}</div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  <div style={{ marginTop: 28 }}>
                    <div className="gp-section-title">Two-Factor Authentication</div>
                  </div>

                  <div className="gp-toggle-row">
                    <div className="gp-toggle-info">
                      <div className="gp-toggle-lbl">Authenticator App</div>
                      <div className="gp-toggle-sub">Use Google Authenticator or Authy for extra security</div>
                    </div>
                    <button className="gp-toggle" />
                  </div>
                  <div className="gp-toggle-row">
                    <div className="gp-toggle-info">
                      <div className="gp-toggle-lbl">SMS Verification</div>
                      <div className="gp-toggle-sub">Receive a code via text message when signing in</div>
                    </div>
                    <button className="gp-toggle on" />
                  </div>

                  <div style={{ marginTop: 28, display:'flex', justifyContent:'flex-end' }}>
                    <button className="gp-submit" type="button">
                      <Save size={15} /> Update Password
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ── NOTIFICATIONS TAB ── */}
            {activeTab === 'notifications' && (
              <div className="gp-panel">
                <div className="gp-panel-hdr">
                  <div>
                    <div className="gp-panel-title">Notification Preferences</div>
                    <div className="gp-panel-sub">Choose how and when you hear from us</div>
                  </div>
                  <div className="gp-panel-badge"><Bell size={11} /> Configured</div>
                </div>
                <div className="gp-panel-body">
                  <div className="gp-section-title">Booking Alerts</div>
                  {[
                    { key:'bookingConfirm', lbl:'Booking Confirmations',  sub:'Get notified when a booking is confirmed or cancelled' },
                    { key:'reminders',      lbl:'Check-in Reminders',     sub:'Reminders 24hrs before your check-in date' },
                    { key:'hostMessages',   lbl:'Host Messages',          sub:'Direct messages from your property hosts' },
                    { key:'reviewAlerts',   lbl:'Review Requests',        sub:'Prompts to leave a review after your stay' },
                  ].map(n => (
                    <div key={n.key} className="gp-toggle-row">
                      <div className="gp-toggle-info">
                        <div className="gp-toggle-lbl">{n.lbl}</div>
                        <div className="gp-toggle-sub">{n.sub}</div>
                      </div>
                      <button
                        className={`gp-toggle ${(notifications as any)[n.key] ? 'on' : ''}`}
                        onClick={() => setNotifications(prev => ({ ...prev, [n.key]: !(prev as any)[n.key] }))}
                      />
                    </div>
                  ))}

                  <div style={{ marginTop: 28 }}>
                    <div className="gp-section-title">Marketing & Updates</div>
                  </div>
                  {[
                    { key:'promotions',  lbl:'Special Offers',   sub:'Deals, discounts and limited-time promotions' },
                    { key:'newsletter',  lbl:'Weekly Newsletter', sub:'Travel inspiration, tips and destination guides' },
                  ].map(n => (
                    <div key={n.key} className="gp-toggle-row">
                      <div className="gp-toggle-info">
                        <div className="gp-toggle-lbl">{n.lbl}</div>
                        <div className="gp-toggle-sub">{n.sub}</div>
                      </div>
                      <button
                        className={`gp-toggle ${(notifications as any)[n.key] ? 'on' : ''}`}
                        onClick={() => setNotifications(prev => ({ ...prev, [n.key]: !(prev as any)[n.key] }))}
                      />
                    </div>
                  ))}

                  <div style={{ marginTop: 24, display:'flex', justifyContent:'flex-end' }}>
                    <button className="gp-submit" type="button">
                      <Save size={15} /> Save Preferences
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ── PRIVACY TAB ── */}
            {activeTab === 'privacy' && (
              <div className="gp-panel">
                <div className="gp-panel-hdr">
                  <div>
                    <div className="gp-panel-title">Privacy Controls</div>
                    <div className="gp-panel-sub">Manage what others can see and how your data is used</div>
                  </div>
                  <div className="gp-panel-badge"><Eye size={11} /> Private</div>
                </div>
                <div className="gp-panel-body">
                  <div className="gp-section-title">Visibility</div>
                  {[
                    { key:'showProfile',  lbl:'Public Profile',   sub:'Allow hosts and other guests to view your profile page' },
                    { key:'showBookings', lbl:'Booking History',  sub:'Share your past stays on your public profile' },
                  ].map(p => (
                    <div key={p.key} className="gp-toggle-row">
                      <div className="gp-toggle-info">
                        <div className="gp-toggle-lbl">{p.lbl}</div>
                        <div className="gp-toggle-sub">{p.sub}</div>
                      </div>
                      <button
                        className={`gp-toggle ${(privacy as any)[p.key] ? 'on' : ''}`}
                        onClick={() => setPrivacy(prev => ({ ...prev, [p.key]: !(prev as any)[p.key] }))}
                      />
                    </div>
                  ))}

                  <div style={{ marginTop: 28 }}>
                    <div className="gp-section-title">Data & Analytics</div>
                  </div>
                  <div className="gp-toggle-row">
                    <div className="gp-toggle-info">
                      <div className="gp-toggle-lbl">Analytics Sharing</div>
                      <div className="gp-toggle-sub">Help us improve by sharing anonymised usage data</div>
                    </div>
                    <button
                      className={`gp-toggle ${privacy.dataSharing ? 'on' : ''}`}
                      onClick={() => setPrivacy(prev => ({ ...prev, dataSharing: !prev.dataSharing }))}
                    />
                  </div>

                  <div style={{
                    marginTop:24, padding:'16px 18px',
                    borderRadius:12, background:'var(--bg2)',
                    border:'1px solid var(--border)',
                    fontSize:'0.8rem', color:'var(--muted)', lineHeight:1.6
                  }}>
                    🔒 Your data is encrypted and never sold to third parties. Read our <a href="#" style={{ color:'var(--p)' }}>Privacy Policy</a> to learn more.
                  </div>

                  <div style={{ marginTop:20, display:'flex', justifyContent:'flex-end' }}>
                    <button className="gp-submit" type="button">
                      <Save size={15} /> Save Privacy Settings
                    </button>
                  </div>
                </div>
              </div>
            )}

          </div>{/* end right col */}
        </div>{/* end grid */}
      </div>
    </>
  );
}