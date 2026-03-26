'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import {
  Users, Home, DollarSign, Calendar, TrendingUp, Star,
  MapPin, Plus, Eye, Edit, Bell, ArrowRight, ChevronRight, ChevronLeft,
  Bed, CheckCircle, XCircle, Clock, AlertCircle, BarChart2,
  Percent, MessageSquare, Settings, Zap, Award, Shield,
  RefreshCw, ExternalLink, ChevronDown, ChevronUp, Sparkles,
  FileText, Activity
} from 'lucide-react';
import { MOCK_LISTINGS, MOCK_BOOKINGS } from '@/lib/mock-data';
import { Footer } from '@/components/shared/footer';

const HOST_ID = 'user-host-1';

/* ─────────────────────────────────────────
   Tiny helpers
───────────────────────────────────────── */
function fmt(n: number) {
  return n >= 1000 ? `$${(n / 1000).toFixed(1)}k` : `$${n}`;
}
function statusColor(s: string) {
  if (s === 'confirmed') return { bg: 'oklch(0.93 0.06 145)', color: 'oklch(0.35 0.12 145)' };
  if (s === 'pending')   return { bg: 'oklch(0.96 0.06 75)',  color: 'oklch(0.45 0.13 75)'  };
  if (s === 'cancelled') return { bg: 'oklch(0.95 0.04 15)',  color: 'oklch(0.45 0.13 15)'  };
  return { bg: 'oklch(0.93 0.01 0)', color: 'oklch(0.45 0.01 0)' };
}
function statusIcon(s: string) {
  if (s === 'confirmed') return <CheckCircle size={12} />;
  if (s === 'pending')   return <Clock size={12} />;
  if (s === 'cancelled') return <XCircle size={12} />;
  return <AlertCircle size={12} />;
}
function nights(a: string, b: string) {
  return Math.max(1, Math.round((new Date(b).getTime() - new Date(a).getTime()) / 86400000));
}

/* ─────────────────────────────────────────
   Mini sparkline (SVG bars)
───────────────────────────────────────── */
function Sparkline({ data, color = 'var(--p)' }: { data: number[]; color?: string }) {
  const max = Math.max(...data, 1);
  const W = 80, H = 28;
  const bw = W / data.length - 2;
  return (
    <svg width={W} height={H} style={{ display: 'block' }}>
      {data.map((v, i) => {
        const h = Math.max(3, (v / max) * H);
        return (
          <rect
            key={i}
            x={i * (bw + 2)}
            y={H - h}
            width={bw}
            height={h}
            rx={2}
            fill={color}
            opacity={i === data.length - 1 ? 1 : 0.35}
          />
        );
      })}
    </svg>
  );
}

/* ─────────────────────────────────────────
   Occupancy ring
───────────────────────────────────────── */
function OccupancyRing({ pct }: { pct: number }) {
  const r = 30, cx = 36, cy = 36;
  const circ = 2 * Math.PI * r;
  const dash = (pct / 100) * circ;
  return (
    <svg width={72} height={72}>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="var(--border)" strokeWidth={6} />
      <circle
        cx={cx} cy={cy} r={r} fill="none"
        stroke="var(--p)" strokeWidth={6}
        strokeDasharray={`${dash} ${circ - dash}`}
        strokeLinecap="round"
        transform={`rotate(-90 ${cx} ${cy})`}
        style={{ transition: 'stroke-dasharray 1s cubic-bezier(.22,.68,0,1.1)' }}
      />
      <text x={cx} y={cy + 1} textAnchor="middle" dominantBaseline="middle"
        fontSize={11} fontWeight={700} fill="var(--fg)">
        {pct}%
      </text>
    </svg>
  );
}

/* ─────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────── */
export default function HostDashboard() {
  const { data: session } = useSession();
  const [mounted, setMounted] = useState(false);
  const [greeting, setGreeting] = useState('Welcome back');
  const [expandedBooking, setExpandedBooking] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'bookings' | 'listings'>('bookings');

  useEffect(() => {
    setMounted(true);
    const h = new Date().getHours();
    setGreeting(h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening');
  }, []);

  const userName = session?.user?.name?.split(' ')[0] || 'Host';

  const listings = MOCK_LISTINGS.filter(l => l.hostId === HOST_ID);
  const bookings  = MOCK_BOOKINGS.filter(b => b.hostId === HOST_ID);

  const confirmed  = bookings.filter(b => b.status === 'confirmed');
  const pending    = bookings.filter(b => b.status === 'pending');
  const totalEarnings = confirmed.reduce((s, b) => s + b.totalPrice, 0);
  const avgNightly    = listings.length ? Math.round(listings.reduce((s, l) => s + l.pricePerNight, 0) / listings.length) : 0;
  const totalGuests   = bookings.reduce((s, b) => s + b.guests, 0);
  const avgRating     = listings.length ? (listings.reduce((s, l) => s + l.rating, 0) / listings.length).toFixed(2) : '–';
  const occupancy     = Math.min(100, Math.round((confirmed.length / Math.max(1, bookings.length)) * 100));

  // Fake monthly revenue sparkline data
  const sparkData = [420, 680, 510, 920, 740, 1100, 870, 1340, 980, 1560, 1200, totalEarnings > 0 ? totalEarnings % 2000 + 400 : 1400];

  // Notifications mock
  const notifications = [
    { id: '1', type: 'booking',  text: 'New booking request from Sarah M.',   time: '2m ago',  urgent: true  },
    { id: '2', type: 'review',   text: 'New 5★ review on Ocean View Villa',    time: '1h ago',  urgent: false },
    { id: '3', type: 'message',  text: 'Guest James asks about parking',       time: '3h ago',  urgent: false },
    { id: '4', type: 'system',   text: 'Payout of $1,240 processed',          time: '1d ago',  urgent: false },
  ];

  if (!mounted) return <div style={{ minHeight: '100vh' }} />;

  return (
    <>
      <style>{`
        /* ══════════════════════════════
           TOKENS — matches guest page
        ══════════════════════════════ */
        .hd {
          --p:        oklch(0.4 0.155 11.87);
          --p-hover:  oklch(0.35 0.155 11.87);
          --p-light:  oklch(0.6 0.155 11.87);
          --p-pale:   oklch(0.97 0.015 11.87);
          --p-ring:   oklch(0.4 0.155 11.87 / 0.15);
          --p-shadow: oklch(0.4 0.155 11.87 / 0.22);
          --bg:       oklch(0.985 0.001 0);
          --bg2:      oklch(0.975 0.001 0);
          --fg:       oklch(0.1 0.001 0);
          --fg2:      oklch(0.25 0.001 0);
          --muted:    oklch(0.52 0.006 0);
          --subtle:   oklch(0.68 0.004 0);
          --border:   oklch(0.9 0.002 0);
          --border2:  oklch(0.85 0.003 0);
          --card:     oklch(1 0 0);
          --amber:    oklch(0.7 0.18 55);
          --green:    oklch(0.5 0.14 145);
          --green-bg: oklch(0.96 0.04 145);
          --blue:     oklch(0.5 0.13 250);
          --blue-bg:  oklch(0.96 0.03 250);
          font-family: var(--font-sans, system-ui, sans-serif);
          background: var(--bg);
          color: var(--fg);
          min-height: calc(100vh - 72px);
        }

        /* ══════════════════════════════
           KEYFRAMES
        ══════════════════════════════ */
        @keyframes hdUp    { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        @keyframes hdIn    { from{opacity:0} to{opacity:1} }
        @keyframes hdPing  { 0%{transform:scale(1);opacity:0.7} 100%{transform:scale(2.2);opacity:0} }
        @keyframes hdPulse { 0%,100%{opacity:1} 50%{opacity:0.5} }
        @keyframes hdShim  { 0%{transform:translateX(-100%)} 100%{transform:translateX(200%)} }

        .hd-up  { animation: hdUp 0.6s cubic-bezier(.22,.68,0,1.12) both; }
        .hd-in  { animation: hdIn 0.45s ease both; }
        .hd-d1  { animation-delay:.05s } .hd-d2 { animation-delay:.10s }
        .hd-d3  { animation-delay:.15s } .hd-d4 { animation-delay:.20s }
        .hd-d5  { animation-delay:.25s } .hd-d6 { animation-delay:.30s }
        .hd-d7  { animation-delay:.35s } .hd-d8 { animation-delay:.40s }

        /* ══════════════════════════════
           LAYOUT
        ══════════════════════════════ */
        .hd-wrap {
          flex: 1;
          max-width: 1400px;
          margin: 0 auto;
          padding: 40px 40px 80px;
        }

        /* ══════════════════════════════
           PAGE HEADER
        ══════════════════════════════ */
        .hd-page-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 36px;
          gap: 20px;
          flex-wrap: wrap;
        }
        .hd-eyebrow {
          display: inline-flex; align-items: center; gap: 7px;
          padding: 5px 14px; border-radius: 100px;
          background: var(--p-pale);
          font-size: 0.72rem; font-weight: 700;
          letter-spacing: 0.08em; text-transform: uppercase;
          color: var(--p); margin-bottom: 10px;
        }
        .hd-eyebrow-dot {
          width: 7px; height: 7px; border-radius: 50%;
          background: var(--p); position: relative;
        }
        .hd-eyebrow-dot::after {
          content:''; position:absolute; inset:0;
          border-radius:50%; background:var(--p);
          animation: hdPing 1.6s ease-out infinite;
        }
        .hd-page-title {
          font-size: clamp(1.8rem, 3vw, 2.5rem);
          font-weight: 800; color: var(--fg);
          line-height: 1.1; letter-spacing: -0.025em;
        }
        .hd-page-title em {
          font-style: normal;
          background: linear-gradient(135deg, var(--p), oklch(0.5 0.18 30));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .hd-page-sub { font-size: 0.9rem; color: var(--muted); margin-top: 6px; }

        .hd-header-actions { display:flex; gap:10px; align-items:center; flex-wrap:wrap; }

        /* ══════════════════════════════
           BUTTONS
        ══════════════════════════════ */
        .hd-btn {
          display: inline-flex; align-items: center; gap: 7px;
          padding: 11px 22px; border-radius: 12px;
          font-size: 0.86rem; font-weight: 600;
          cursor: pointer; transition: all 0.22s;
          text-decoration: none; border: none;
          font-family: inherit; white-space: nowrap;
        }
        .hd-btn-primary {
          background: var(--p); color: #fff;
        }
        .hd-btn-primary:hover {
          background: var(--p-hover);
          transform: translateY(-2px);
          box-shadow: 0 6px 20px var(--p-shadow);
        }
        .hd-btn-outline {
          background: var(--card); color: var(--fg);
          border: 1.5px solid var(--border);
        }
        .hd-btn-outline:hover {
          border-color: var(--p); color: var(--p);
          transform: translateY(-2px);
        }
        .hd-btn-ghost {
          background: transparent; color: var(--muted);
          border: 1.5px solid transparent;
          padding: 11px 14px;
        }
        .hd-btn-ghost:hover { color: var(--p); background: var(--p-pale); }

        /* ══════════════════════════════
           STAT CARDS ROW
        ══════════════════════════════ */
        .hd-stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          margin-bottom: 32px;
        }

        .hd-stat {
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 20px;
          padding: 22px 24px;
          position: relative; overflow: hidden;
          transition: all 0.3s cubic-bezier(.22,.68,0,1.1);
        }
        .hd-stat:hover {
          transform: translateY(-5px);
          box-shadow: 0 16px 48px var(--p-ring);
          border-color: color-mix(in oklch, var(--p) 25%, var(--border));
        }
        .hd-stat::before {
          content:''; position:absolute; inset:0;
          background: linear-gradient(135deg, var(--p-pale), transparent 60%);
          opacity:0; transition:opacity 0.3s;
        }
        .hd-stat:hover::before { opacity:1; }

        /* Shimmer on first stat */
        .hd-stat-shimmer::after {
          content:''; position:absolute; top:0; left:0; bottom:0; width:40%;
          background: linear-gradient(105deg, transparent, rgba(255,255,255,0.4), transparent);
          animation: hdShim 3s ease-in-out infinite;
          pointer-events:none;
        }

        .hd-stat-top { display:flex; align-items:flex-start; justify-content:space-between; margin-bottom:14px; }
        .hd-stat-icon {
          width: 44px; height: 44px; border-radius: 14px;
          background: var(--p-pale); color: var(--p);
          display:flex; align-items:center; justify-content:center;
          transition: transform 0.3s;
          position: relative; z-index: 1;
        }
        .hd-stat:hover .hd-stat-icon { transform: scale(1.12) rotate(-6deg); }

        .hd-stat-val {
          font-size: 2rem; font-weight: 800; color: var(--fg);
          line-height: 1; letter-spacing: -0.02em;
          position: relative; z-index: 1;
        }
        .hd-stat-lbl { font-size: 0.78rem; color: var(--muted); margin-top: 4px; position: relative; z-index: 1; }
        .hd-stat-trend {
          display:flex; align-items:center; gap:4px;
          font-size: 0.72rem; font-weight: 600;
          margin-top: 8px; position: relative; z-index: 1;
        }
        .hd-stat-trend.up   { color: var(--green); }
        .hd-stat-trend.warn { color: oklch(0.52 0.14 75); }

        /* ══════════════════════════════
           SECTION SHARED
        ══════════════════════════════ */
        .hd-section { margin-bottom: 28px; }

        .hd-hdr {
          display:flex; align-items:center; justify-content:space-between;
          margin-bottom: 16px;
        }
        .hd-hdr-left { display:flex; align-items:center; gap:10px; }
        .hd-hdr-icon {
          width:34px; height:34px; border-radius:10px;
          background:var(--p-pale); color:var(--p);
          display:flex; align-items:center; justify-content:center;
        }
        .hd-ttl { font-size:1.2rem; font-weight:700; color:var(--fg); letter-spacing:-0.01em; }
        .hd-see-all {
          display:flex; align-items:center; gap:4px;
          font-size:0.82rem; font-weight:600; color:var(--p);
          text-decoration:none; transition:gap 0.2s;
        }
        .hd-see-all:hover { gap:8px; }

        /* ══════════════════════════════
           TWO-COL GRID
        ══════════════════════════════ */
        .hd-two-col { display:grid; grid-template-columns:1fr 1fr; gap:20px; margin-bottom:28px; }
        .hd-three-col { display:grid; grid-template-columns:repeat(3,1fr); gap:20px; margin-bottom:28px; }

        /* ══════════════════════════════
           CARD BASE
        ══════════════════════════════ */
        .hd-card {
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 20px;
          overflow: hidden;
        }
        .hd-card-head {
          padding: 22px 24px 16px;
          border-bottom: 1px solid var(--border);
          display:flex; align-items:center; justify-content:space-between;
        }
        .hd-card-head-left { display:flex; align-items:center; gap:10px; }
        .hd-card-body { padding: 20px 24px; }

        /* ══════════════════════════════
           TABS
        ══════════════════════════════ */
        .hd-tabs { display:flex; gap:4px; background:var(--bg2); border-radius:12px; padding:4px; }
        .hd-tab {
          padding:8px 18px; border-radius:9px;
          font-size:0.83rem; font-weight:600;
          cursor:pointer; border:none; background:transparent;
          color:var(--muted); font-family:inherit;
          transition:all 0.2s;
        }
        .hd-tab.active {
          background:var(--card); color:var(--fg);
          box-shadow:0 2px 8px rgba(0,0,0,0.08);
        }

        /* ══════════════════════════════
           BOOKING ROWS
        ══════════════════════════════ */
        .hd-booking-row {
          border-bottom: 1px solid var(--border);
          transition: background 0.2s;
        }
        .hd-booking-row:last-child { border-bottom: none; }
        .hd-booking-row:hover { background: var(--p-pale); }

        .hd-booking-main {
          display:flex; align-items:center; gap:14px;
          padding: 14px 0; cursor:pointer;
        }
        .hd-booking-avatar {
          width:38px; height:38px; border-radius:50%;
          background: linear-gradient(135deg, var(--p), oklch(0.5 0.18 30));
          display:flex; align-items:center; justify-content:center;
          font-size:0.88rem; font-weight:700; color:#fff;
          flex-shrink:0;
        }
        .hd-booking-info { flex:1; min-width:0; }
        .hd-booking-name { font-size:0.9rem; font-weight:600; color:var(--fg); }
        .hd-booking-dates { font-size:0.75rem; color:var(--muted); margin-top:2px; }
        .hd-booking-right { display:flex; flex-direction:column; align-items:flex-end; gap:5px; flex-shrink:0; }
        .hd-booking-price { font-size:0.95rem; font-weight:700; color:var(--fg); }

        .hd-status-pill {
          display:inline-flex; align-items:center; gap:4px;
          padding:3px 10px; border-radius:100px;
          font-size:0.68rem; font-weight:600; text-transform:uppercase; letter-spacing:0.05em;
        }

        .hd-booking-expand {
          padding: 0 0 14px;
          display:grid; grid-template-columns:repeat(3,1fr);
          gap:10px; animation: hdIn 0.2s ease;
        }
        .hd-booking-detail {
          background:var(--bg2); border:1px solid var(--border);
          border-radius:10px; padding:10px 12px;
        }
        .hd-bd-label { font-size:0.66rem; color:var(--subtle); text-transform:uppercase; letter-spacing:0.06em; margin-bottom:3px; }
        .hd-bd-val   { font-size:0.84rem; font-weight:600; color:var(--fg); }

        .hd-booking-actions { display:flex; gap:8px; padding: 0 0 14px; }
        .hd-ba-btn {
          padding:7px 14px; border-radius:8px;
          font-size:0.76rem; font-weight:600;
          cursor:pointer; border:1.5px solid var(--border);
          background:var(--card); color:var(--muted);
          font-family:inherit; transition:all 0.2s;
          display:flex; align-items:center; gap:5px;
        }
        .hd-ba-btn:hover { border-color:var(--p); color:var(--p); }
        .hd-ba-btn.primary { background:var(--p); color:#fff; border-color:var(--p); }
        .hd-ba-btn.primary:hover { background:var(--p-hover); }

        /* ══════════════════════════════
           LISTING ROWS
        ══════════════════════════════ */
        .hd-listing-row {
          display:flex; align-items:center; gap:14px;
          padding: 14px 0;
          border-bottom:1px solid var(--border);
          transition: background 0.2s;
        }
        .hd-listing-row:last-child { border-bottom:none; }
        .hd-listing-row:hover { background:var(--p-pale); }

        .hd-listing-thumb {
          width:56px; height:48px; border-radius:10px;
          object-fit:cover; flex-shrink:0;
          border:1px solid var(--border);
        }
        .hd-listing-info { flex:1; min-width:0; }
        .hd-listing-title { font-size:0.88rem; font-weight:600; color:var(--fg); white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
        .hd-listing-meta  { font-size:0.73rem; color:var(--muted); margin-top:3px; display:flex; align-items:center; gap:8px; flex-wrap:wrap; }
        .hd-listing-right { display:flex; align-items:center; gap:8px; flex-shrink:0; }

        .hd-listing-active {
          display:inline-flex; align-items:center; gap:4px;
          padding:3px 9px; border-radius:100px;
          font-size:0.65rem; font-weight:700;
          background:var(--green-bg); color:var(--green);
        }
        .hd-listing-price {
          font-size:0.88rem; font-weight:700; color:var(--fg);
        }

        /* ══════════════════════════════
           NOTIFICATION CARD
        ══════════════════════════════ */
        .hd-notif-row {
          display:flex; align-items:flex-start; gap:12px;
          padding:12px 0; border-bottom:1px solid var(--border);
          transition: background 0.15s; cursor:pointer;
        }
        .hd-notif-row:last-child { border-bottom:none; }
        .hd-notif-row:hover { background:var(--p-pale); }

        .hd-notif-dot {
          width:34px; height:34px; border-radius:10px;
          display:flex; align-items:center; justify-content:center;
          flex-shrink:0;
        }
        .hd-notif-text  { font-size:0.83rem; font-weight:500; color:var(--fg); line-height:1.4; }
        .hd-notif-time  { font-size:0.7rem; color:var(--subtle); margin-top:3px; }
        .hd-notif-urgent { width:7px; height:7px; border-radius:50%; background:var(--p); flex-shrink:0; margin-top:5px; }

        /* ══════════════════════════════
           PERFORMANCE CARD
        ══════════════════════════════ */
        .hd-perf-row {
          display:flex; align-items:center; gap:12px;
          padding:12px 0; border-bottom:1px solid var(--border);
        }
        .hd-perf-row:last-child { border-bottom:none; }
        .hd-perf-label { font-size:0.82rem; color:var(--muted); flex:1; }
        .hd-perf-bar-wrap { width:100px; height:6px; background:var(--bg2); border-radius:3px; overflow:hidden; }
        .hd-perf-bar { height:100%; border-radius:3px; background:var(--p); transition:width 1s cubic-bezier(.22,.68,0,1.1); }
        .hd-perf-val { font-size:0.82rem; font-weight:700; color:var(--fg); width:36px; text-align:right; }

        /* ══════════════════════════════
           PAYOUT / REVENUE CARD
        ══════════════════════════════ */
        .hd-revenue-card {
          background: linear-gradient(135deg, var(--p), oklch(0.5 0.18 30));
          border-radius: 20px;
          padding: 28px;
          color: #fff;
          position: relative; overflow:hidden;
        }
        .hd-revenue-card::before {
          content:''; position:absolute; top:-40%; right:-20%;
          width:300px; height:300px;
          background:radial-gradient(circle, rgba(255,255,255,0.12) 0%, transparent 60%);
          pointer-events:none;
        }
        .hd-revenue-card::after {
          content:''; position:absolute;
          top:0; left:0; bottom:0; width:35%;
          background:linear-gradient(105deg, transparent, rgba(255,255,255,0.08), transparent);
          animation: hdShim 4s ease-in-out infinite;
          pointer-events:none;
        }
        .hd-rev-eyebrow { font-size:0.68rem; font-weight:700; letter-spacing:0.1em; text-transform:uppercase; opacity:0.75; margin-bottom:8px; }
        .hd-rev-val { font-size:2.4rem; font-weight:800; line-height:1; letter-spacing:-0.02em; margin-bottom:6px; }
        .hd-rev-sub { font-size:0.8rem; opacity:0.75; margin-bottom:20px; }
        .hd-rev-meta { display:flex; gap:20px; }
        .hd-rev-meta-item { }
        .hd-rev-meta-val { font-size:1.1rem; font-weight:700; }
        .hd-rev-meta-lbl { font-size:0.7rem; opacity:0.7; margin-top:2px; }
        .hd-rev-cta {
          display:inline-flex; align-items:center; gap:6px;
          margin-top:22px; padding:10px 20px; border-radius:10px;
          background:rgba(255,255,255,0.18); backdrop-filter:blur(8px);
          font-size:0.82rem; font-weight:600; color:#fff;
          border:1px solid rgba(255,255,255,0.25);
          cursor:pointer; transition:all 0.2s; font-family:inherit;
          text-decoration:none;
        }
        .hd-rev-cta:hover { background:rgba(255,255,255,0.28); }

        /* ══════════════════════════════
           QUICK ACTIONS
        ══════════════════════════════ */
        .hd-qa-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:12px; }
        .hd-qa-card {
          background:var(--card); border:1px solid var(--border);
          border-radius:16px; padding:18px;
          text-decoration:none; color:inherit;
          display:flex; flex-direction:column; gap:9px;
          cursor:pointer; transition:all 0.22s;
        }
        .hd-qa-card:hover { border-color:color-mix(in oklch, var(--p) 30%, var(--border)); transform:translateY(-3px); box-shadow:0 8px 28px var(--p-ring); }
        .hd-qa-icon { width:38px; height:38px; border-radius:11px; background:var(--p-pale); color:var(--p); display:flex; align-items:center; justify-content:center; }
        .hd-qa-title { font-size:0.84rem; font-weight:600; color:var(--fg); }
        .hd-qa-sub   { font-size:0.72rem; color:var(--muted); line-height:1.4; }

        /* ══════════════════════════════
           CALENDAR PREVIEW MINI
        ══════════════════════════════ */
        .hd-cal-grid { display:grid; grid-template-columns:repeat(7,1fr); gap:4px; }
        .hd-cal-day {
          aspect-ratio:1; border-radius:8px; display:flex; align-items:center; justify-content:center;
          font-size:0.7rem; font-weight:500; color:var(--muted);
          background:var(--bg2); border:1px solid transparent;
          transition:all 0.15s; cursor:pointer;
        }
        .hd-cal-day:hover { border-color:var(--p); color:var(--p); }
        .hd-cal-day.booked { background:var(--p-pale); color:var(--p); font-weight:700; border-color:color-mix(in oklch, var(--p) 20%, var(--border)); }
        .hd-cal-day.today  { background:var(--p); color:#fff; font-weight:700; }
        .hd-cal-day.header { background:transparent; border:none; font-size:0.63rem; font-weight:600; text-transform:uppercase; letter-spacing:0.06em; cursor:default; }
        .hd-cal-day.header:hover { border-color:transparent; color:var(--subtle); }
        .hd-cal-day.empty  { background:transparent; border:none; cursor:default; }

        /* ══════════════════════════════
           TIPS / INSIGHTS
        ══════════════════════════════ */
        .hd-tip {
          display:flex; align-items:flex-start; gap:12px;
          padding:14px; border-radius:14px;
          background:var(--bg2); border:1px solid var(--border);
          margin-bottom:10px; transition:all 0.2s;
          cursor:pointer;
        }
        .hd-tip:last-child { margin-bottom:0; }
        .hd-tip:hover { border-color:color-mix(in oklch, var(--p) 25%, var(--border)); transform:translateX(3px); }
        .hd-tip-icon { width:34px; height:34px; border-radius:9px; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
        .hd-tip-title { font-size:0.83rem; font-weight:600; color:var(--fg); margin-bottom:2px; }
        .hd-tip-sub   { font-size:0.73rem; color:var(--muted); line-height:1.4; }

        /* ══════════════════════════════
           RESPONSIVE
        ══════════════════════════════ */
        @media (max-width:1100px) {
          .hd-stats { grid-template-columns:repeat(2,1fr); }
          .hd-three-col { grid-template-columns:1fr 1fr; }
          .hd-qa-grid { grid-template-columns:repeat(2,1fr); }
        }
        @media (max-width:768px) {
          .hd-wrap { padding:24px 16px 60px; }
          .hd-stats { grid-template-columns:1fr 1fr; }
          .hd-two-col, .hd-three-col { grid-template-columns:1fr; }
          .hd-qa-grid { grid-template-columns:1fr 1fr; }
          .hd-booking-expand { grid-template-columns:1fr 1fr; }
        }
        @media (max-width:500px) {
          .hd-stats { grid-template-columns:1fr; }
          .hd-qa-grid { grid-template-columns:repeat(2,1fr); gap:8px; }
          .hd-qa-card { padding:12px; gap:6px; }
          .hd-qa-icon { width:32px; height:32px; border-radius:9px; }
          .hd-qa-title { font-size:0.78rem; }
          .hd-qa-sub { font-size:0.65rem; }
          .hd-booking-expand { grid-template-columns:1fr; }
        }
      `}</style>

      <div className="hd">
        <div className="hd-wrap">

          {/* ═══════════════════════════════════
              PAGE HEADER
          ═══════════════════════════════════ */}
          <div className="hd-page-header hd-up">
            <div>
              <div className="hd-eyebrow">
                <div className="hd-eyebrow-dot" />
                Host Dashboard
              </div>
              <h1 className="hd-page-title">
                {greeting},<br /><em>{userName}.</em> Welcome back.
              </h1>
              <p className="hd-page-sub">
                Here's everything happening across your properties today.
              </p>
            </div>
            <div className="hd-header-actions">
              <button className="hd-btn hd-btn-ghost">
                <Bell size={16} />
                <span style={{ position:'relative' }}>
                  Notifications
                  {notifications.filter(n=>n.urgent).length > 0 && (
                    <span style={{
                      position:'absolute', top:-8, right:-10,
                      width:16, height:16, borderRadius:'50%',
                      background:'var(--p)', color:'#fff',
                      fontSize:'0.6rem', fontWeight:700,
                      display:'flex', alignItems:'center', justifyContent:'center'
                    }}>
                      {notifications.filter(n=>n.urgent).length}
                    </span>
                  )}
                </span>
              </button>
              <Link href="/host/listings/new" className="hd-btn hd-btn-primary">
                <Plus size={15} />
                Add Listing
              </Link>
            </div>
          </div>

          {/* ═══════════════════════════════════
              STATS ROW
          ═══════════════════════════════════ */}
          <div className="hd-stats">
            {[
              {
                icon: <DollarSign size={18}/>, label:'Total Earnings',
                val: fmt(totalEarnings), trend:'+12% this month', up:true,
                shimmer:true,
                sub: <Sparkline data={sparkData} />
              },
              {
                icon: <Home size={18}/>, label:'Active Listings',
                val: listings.length, trend:`${listings.length} live now`, up:true,
                sub: <div style={{fontSize:'0.73rem',color:'var(--muted)',marginTop:4}}>Avg. ${avgNightly}/night</div>
              },
              {
                icon: <Calendar size={18}/>, label:'Total Bookings',
                val: bookings.length, trend:`${pending.length} pending review`, up: pending.length === 0,
                sub: <div style={{fontSize:'0.73rem',color:'var(--muted)',marginTop:4}}>{confirmed.length} confirmed</div>
              },
              {
                icon: <Users size={18}/>, label:'Total Guests',
                val: totalGuests, trend:'All time', up:true,
                sub: <div style={{display:'flex',alignItems:'center',gap:4,marginTop:4,fontSize:'0.73rem',color:'oklch(0.55 0.14 55)'}}>
                  <Star size={11} fill="oklch(0.7 0.18 55)" color="oklch(0.7 0.18 55)" />
                  <span style={{fontWeight:600}}>{avgRating}</span>
                  <span style={{color:'var(--muted)'}}>avg rating</span>
                </div>
              },
            ].map((s, i) => (
              <div key={s.label} className={`hd-stat hd-up hd-d${i+1} ${s.shimmer ? 'hd-stat-shimmer' : ''}`}>
                <div className="hd-stat-top">
                  <div className="hd-stat-icon">{s.icon}</div>
                  {s.sub}
                </div>
                <div className="hd-stat-val">{s.val}</div>
                <div className="hd-stat-lbl">{s.label}</div>
                <div className={`hd-stat-trend ${s.up ? 'up' : 'warn'}`}>
                  {s.up ? <TrendingUp size={11}/> : <AlertCircle size={11}/>}
                  {s.trend}
                </div>
              </div>
            ))}
          </div>

          {/* ═══════════════════════════════════
              QUICK ACTIONS
          ═══════════════════════════════════ */}
          <div className="hd-section hd-up hd-d3">
            <div className="hd-hdr">
              <div className="hd-hdr-left">
                <div className="hd-hdr-icon"><Zap size={15}/></div>
                <span className="hd-ttl">Quick Actions</span>
              </div>
            </div>
            <div className="hd-qa-grid">
              {[
                { icon:<Plus size={17}/>,         title:'New Listing',      sub:'Add a property',              href:'/host/listings/new'      },
                { icon:<Calendar size={17}/>,     title:'Manage Calendar',  sub:'Block dates & availability',  href:'/host/calendar'          },
                { icon:<BarChart2 size={17}/>,    title:'Analytics',        sub:'Revenue & occupancy trends',  href:'/host/analytics'         },
                { icon:<MessageSquare size={17}/>,title:'Guest Messages',   sub:`${pending.length} unread`,    href:'/host/messages'          },
                { icon:<Percent size={17}/>,      title:'Set Promotions',   sub:'Discounts & special rates',   href:'/host/promotions'        },
                { icon:<Shield size={17}/>,       title:'Host Protection',  sub:'Coverage & policies',         href:'/host/protection'        },
                { icon:<Settings size={17}/>,     title:'Account Settings', sub:'Profile & preferences',       href:'/host/settings'          },
                { icon:<ExternalLink size={17}/>, title:'Preview Listings', sub:'See guest view',              href:'/guest/listings'         },
              ].map(a => (
                <Link key={a.title} href={a.href} className="hd-qa-card">
                  <div className="hd-qa-icon">{a.icon}</div>
                  <div>
                    <div className="hd-qa-title">{a.title}</div>
                    <div className="hd-qa-sub">{a.sub}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* ═══════════════════════════════════
              BOOKINGS + LISTINGS TABS  |  REVENUE
          ═══════════════════════════════════ */}
          <div className="hd-two-col hd-up hd-d4">

            {/* Left: Bookings / Listings tabbed card */}
            <div className="hd-card">
              <div className="hd-card-head">
                <div className="hd-card-head-left">
                  <div className="hd-hdr-icon"><Calendar size={15}/></div>
                  <span className="hd-ttl">Activity</span>
                </div>
                <div className="hd-tabs">
                  <button className={`hd-tab ${activeTab==='bookings'?'active':''}`} onClick={()=>setActiveTab('bookings')}>
                    Bookings {pending.length > 0 && <span style={{display:'inline-flex',alignItems:'center',justifyContent:'center',width:16,height:16,borderRadius:'50%',background:'var(--p)',color:'#fff',fontSize:'0.6rem',fontWeight:700,marginLeft:4}}>{pending.length}</span>}
                  </button>
                  <button className={`hd-tab ${activeTab==='listings'?'active':''}`} onClick={()=>setActiveTab('listings')}>Listings</button>
                </div>
              </div>
              <div className="hd-card-body">

                {activeTab === 'bookings' && (
                  bookings.length === 0 ? (
                    <div style={{textAlign:'center',padding:'40px 0',color:'var(--muted)',fontSize:'0.88rem'}}>
                      No bookings yet. Share your listing to get started!
                    </div>
                  ) : (
                    <>
                      {bookings.slice(0,5).map(b => {
                        const sc = statusColor(b.status);
                        const initials = `G${b.id.slice(-2).toUpperCase()}`;
                        const n = nights(b.checkIn, b.checkOut);
                        const isExpanded = expandedBooking === b.id;
                        return (
                          <div key={b.id} className="hd-booking-row">
                            <div className="hd-booking-main" onClick={()=>setExpandedBooking(isExpanded ? null : b.id)}>
                              <div className="hd-booking-avatar">{initials}</div>
                              <div className="hd-booking-info">
                                <div className="hd-booking-name">Booking #{b.id.slice(-4).toUpperCase()}</div>
                                <div className="hd-booking-dates">
                                  {new Date(b.checkIn).toLocaleDateString('en-US',{month:'short',day:'numeric'})}
                                  {' → '}
                                  {new Date(b.checkOut).toLocaleDateString('en-US',{month:'short',day:'numeric'})}
                                  {' · '}{n} night{n>1?'s':''}
                                </div>
                              </div>
                              <div className="hd-booking-right">
                                <span className="hd-booking-price">${b.totalPrice}</span>
                                <span className="hd-status-pill" style={{background:sc.bg,color:sc.color}}>
                                  {statusIcon(b.status)} {b.status}
                                </span>
                              </div>
                              <div style={{color:'var(--subtle)',marginLeft:4,transition:'transform 0.2s',transform:isExpanded?'rotate(180deg)':'none'}}>
                                <ChevronDown size={14}/>
                              </div>
                            </div>
                            {isExpanded && (
                              <>
                                <div className="hd-booking-expand">
                                  {[
                                    {l:'Guests',v:`${b.guests} guest${b.guests>1?'s':''}`},
                                    {l:'Nights',v:`${n} night${n>1?'s':''}`},
                                    {l:'Per Night',v:`$${Math.round(b.totalPrice/n)}`},
                                    {l:'Check-in',v:new Date(b.checkIn).toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'})},
                                    {l:'Check-out',v:new Date(b.checkOut).toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'})},
                                    {l:'Status',v:b.status.charAt(0).toUpperCase()+b.status.slice(1)},
                                  ].map(d=>(
                                    <div key={d.l} className="hd-booking-detail">
                                      <div className="hd-bd-label">{d.l}</div>
                                      <div className="hd-bd-val">{d.v}</div>
                                    </div>
                                  ))}
                                </div>
                                <div className="hd-booking-actions">
                                  <button className="hd-ba-btn primary"><CheckCircle size={12}/>Confirm</button>
                                  <button className="hd-ba-btn"><MessageSquare size={12}/>Message Guest</button>
                                  <button className="hd-ba-btn"><FileText size={12}/>View Details</button>
                                  <button className="hd-ba-btn"><XCircle size={12}/>Cancel</button>
                                </div>
                              </>
                            )}
                          </div>
                        );
                      })}
                      <div style={{paddingTop:16}}>
                        <Link href="/host/bookings" className="hd-btn hd-btn-outline" style={{width:'100%',justifyContent:'center'}}>
                          View All Bookings <ArrowRight size={14}/>
                        </Link>
                      </div>
                    </>
                  )
                )}

                {activeTab === 'listings' && (
                  listings.length === 0 ? (
                    <div style={{textAlign:'center',padding:'40px 0',color:'var(--muted)',fontSize:'0.88rem'}}>
                      No listings yet.
                      <Link href="/host/listings/new" className="hd-btn hd-btn-primary" style={{display:'inline-flex',marginTop:16}}>
                        <Plus size={14}/> Add your first listing
                      </Link>
                    </div>
                  ) : (
                    <>
                      {listings.map(l=>(
                        <div key={l.id} className="hd-listing-row">
                          <img src={l.image || l.images?.[0]} alt={l.title} className="hd-listing-thumb"/>
                          <div className="hd-listing-info">
                            <div className="hd-listing-title">{l.title}</div>
                            <div className="hd-listing-meta">
                              <span style={{display:'flex',alignItems:'center',gap:3}}>
                                <MapPin size={10}/>{l.city}
                              </span>
                              <span style={{display:'flex',alignItems:'center',gap:3}}>
                                <Bed size={10}/>{l.bedrooms} bed
                              </span>
                              <span style={{display:'flex',alignItems:'center',gap:3}}>
                                <Star size={10} fill="oklch(0.7 0.18 55)" color="oklch(0.7 0.18 55)"/>
                                {l.rating} ({l.reviews})
                              </span>
                            </div>
                          </div>
                          <div className="hd-listing-right">
                            <span className="hd-listing-active"><Activity size={9}/>Live</span>
                            <span className="hd-listing-price">${l.pricePerNight}<span style={{fontSize:'0.65rem',fontWeight:400,color:'var(--muted)'}}>/night</span></span>
                            <Link href={`/host/listings/${l.id}/edit`} className="hd-ba-btn" style={{padding:'5px 10px'}}>
                              <Edit size={12}/>
                            </Link>
                          </div>
                        </div>
                      ))}
                      <div style={{paddingTop:16}}>
                        <Link href="/host/listings" className="hd-btn hd-btn-outline" style={{width:'100%',justifyContent:'center'}}>
                          Manage All Listings <ArrowRight size={14}/>
                        </Link>
                      </div>
                    </>
                  )
                )}
              </div>
            </div>

            {/* Right col: Revenue + Occupancy + Notifications */}
            <div style={{display:'flex',flexDirection:'column',gap:20}}>

              {/* Revenue card */}
              <div className="hd-revenue-card">
                <div className="hd-rev-eyebrow">Total Revenue</div>
                <div className="hd-rev-val">{fmt(totalEarnings)}</div>
                <div className="hd-rev-sub">Lifetime earnings from {confirmed.length} bookings</div>
                <div className="hd-rev-meta">
                  <div className="hd-rev-meta-item">
                    <div className="hd-rev-meta-val">${avgNightly}</div>
                    <div className="hd-rev-meta-lbl">Avg. / night</div>
                  </div>
                  <div className="hd-rev-meta-item">
                    <div className="hd-rev-meta-val">{occupancy}%</div>
                    <div className="hd-rev-meta-lbl">Occupancy rate</div>
                  </div>
                  <div className="hd-rev-meta-item">
                    <div className="hd-rev-meta-val">{listings.length}</div>
                    <div className="hd-rev-meta-lbl">Properties</div>
                  </div>
                </div>
                <Link href="/host/payouts" className="hd-rev-cta">
                  View Payouts <ArrowRight size={13}/>
                </Link>
              </div>

              {/* Notifications */}
              <div className="hd-card">
                <div className="hd-card-head">
                  <div className="hd-card-head-left">
                    <div className="hd-hdr-icon"><Bell size={15}/></div>
                    <span className="hd-ttl">Notifications</span>
                  </div>
                  <span style={{fontSize:'0.73rem',color:'var(--p)',fontWeight:600,cursor:'pointer'}}>Mark all read</span>
                </div>
                <div className="hd-card-body">
                  {notifications.map(n=>(
                    <div key={n.id} className="hd-notif-row">
                      <div className="hd-notif-dot" style={{
                        background: n.type==='booking' ? 'var(--p-pale)' : n.type==='review' ? 'oklch(0.96 0.04 145)' : n.type==='message' ? 'var(--blue-bg)' : 'oklch(0.96 0.03 55)',
                      }}>
                        {n.type==='booking'  && <Calendar  size={15} color="var(--p)"      />}
                        {n.type==='review'   && <Star      size={15} color="var(--green)"  />}
                        {n.type==='message'  && <MessageSquare size={15} color="var(--blue)"/>}
                        {n.type==='system'   && <DollarSign size={15} color="oklch(0.52 0.14 75)"/>}
                      </div>
                      <div style={{flex:1}}>
                        <div className="hd-notif-text">{n.text}</div>
                        <div className="hd-notif-time">{n.time}</div>
                      </div>
                      {n.urgent && <div className="hd-notif-urgent"/>}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ═══════════════════════════════════
              PERFORMANCE + CALENDAR + TIPS
          ═══════════════════════════════════ */}
          <div className="hd-three-col hd-up hd-d5">

            {/* Performance metrics */}
            <div className="hd-card">
              <div className="hd-card-head">
                <div className="hd-card-head-left">
                  <div className="hd-hdr-icon"><Award size={15}/></div>
                  <span className="hd-ttl">Performance</span>
                </div>
                <OccupancyRing pct={occupancy} />
              </div>
              <div className="hd-card-body">
                {[
                  { label:'Occupancy Rate',   val:occupancy,  pct:occupancy              },
                  { label:'Response Rate',    val:'98%',      pct:98                     },
                  { label:'Guest Rating',     val:avgRating,  pct:Math.round(Number(avgRating)/5*100) },
                  { label:'Listing Views',    val:'1.2k',     pct:72                     },
                  { label:'Booking Conv.',    val:'8.4%',     pct:34                     },
                ].map(m=>(
                  <div key={m.label} className="hd-perf-row">
                    <span className="hd-perf-label">{m.label}</span>
                    <div className="hd-perf-bar-wrap">
                      <div className="hd-perf-bar" style={{width:`${m.pct}%`}}/>
                    </div>
                    <span className="hd-perf-val">{m.val}{typeof m.val==='number'?'%':''}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Mini calendar */}
            <div className="hd-card">
              <div className="hd-card-head">
                <div className="hd-card-head-left">
                  <div className="hd-hdr-icon"><Calendar size={15}/></div>
                  <span className="hd-ttl">Availability</span>
                </div>
                <div style={{display:'flex',gap:6}}>
                  <button className="hd-ba-btn" style={{padding:'4px 8px'}}><ChevronLeft size={12}/></button>
                  <button className="hd-ba-btn" style={{padding:'4px 8px'}}><ChevronRight size={12}/></button>
                </div>
              </div>
              <div className="hd-card-body">
                <div style={{fontSize:'0.82rem',fontWeight:600,color:'var(--fg)',marginBottom:10,display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                  <span>March 2026</span>
                  <Link href="/host/calendar" style={{fontSize:'0.73rem',color:'var(--p)',fontWeight:600,textDecoration:'none'}}>Full Calendar →</Link>
                </div>
                <div className="hd-cal-grid">
                  {['Mo','Tu','We','Th','Fr','Sa','Su'].map(d=>(
                    <div key={d} className="hd-cal-day header">{d}</div>
                  ))}
                  {[null,null,null,null,null,1,2].map((d,i)=> d===null
                    ? <div key={`e-${i}`} className="hd-cal-day empty"/>
                    : <div key={d} className="hd-cal-day">{d}</div>
                  )}
                  {Array.from({length:29},(_,i)=>i+3).map(d=>{
                    const today=25, booked=[7,8,9,14,15,16,21,22];
                    return (
                      <div key={d} className={`hd-cal-day ${d===today?'today':booked.includes(d)?'booked':''}`}>{d}</div>
                    );
                  })}
                </div>
                <div style={{display:'flex',gap:12,marginTop:14,fontSize:'0.72rem',color:'var(--muted)'}}>
                  <span style={{display:'flex',alignItems:'center',gap:5}}>
                    <span style={{width:10,height:10,borderRadius:3,background:'var(--p)',display:'inline-block'}}/>Booked
                  </span>
                  <span style={{display:'flex',alignItems:'center',gap:5}}>
                    <span style={{width:10,height:10,borderRadius:3,background:'var(--bg2)',border:'1px solid var(--border)',display:'inline-block'}}/>Available
                  </span>
                  <span style={{display:'flex',alignItems:'center',gap:5}}>
                    <span style={{width:10,height:10,borderRadius:3,background:'var(--p)',border:'2px solid var(--p)',display:'inline-block'}}/>Today
                  </span>
                </div>
              </div>
            </div>

            {/* Host tips */}
            <div className="hd-card">
              <div className="hd-card-head">
                <div className="hd-card-head-left">
                  <div className="hd-hdr-icon"><Sparkles size={15}/></div>
                  <span className="hd-ttl">Tips & Insights</span>
                </div>
              </div>
              <div className="hd-card-body">
                {[
                  {
                    icon:<TrendingUp size={15}/>,  bg:'var(--p-pale)',  color:'var(--p)',
                    title:'Boost Your Visibility',
                    sub:'Add more photos — listings with 10+ photos get 3x more views.'
                  },
                  {
                    icon:<Star size={15}/>,         bg:'oklch(0.96 0.04 55)',  color:'oklch(0.55 0.15 55)',
                    title:'Earn Superhost Status',
                    sub:'Maintain a 4.8★ rating and respond within 1 hour to qualify.'
                  },
                  {
                    icon:<Percent size={15}/>,      bg:'var(--green-bg)',   color:'var(--green)',
                    title:'Fill Empty Dates',
                    sub:'Offer a 10% discount for 7+ night stays to boost occupancy.'
                  },
                  {
                    icon:<RefreshCw size={15}/>,    bg:'var(--blue-bg)',    color:'var(--blue)',
                    title:'Update Your Calendar',
                    sub:'Accurate availability increases booking confidence by 40%.'
                  },
                ].map(t=>(
                  <div key={t.title} className="hd-tip">
                    <div className="hd-tip-icon" style={{background:t.bg,color:t.color}}>{t.icon}</div>
                    <div>
                      <div className="hd-tip-title">{t.title}</div>
                      <div className="hd-tip-sub">{t.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>{/* end hd-wrap */}
        <Footer />
      </div>
    </>
  );
}