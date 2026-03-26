'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import {
  Heart, MapPin, Star, Users, Bed, Bath, Sparkles,
  TrendingUp, Flame, ArrowRight, Search, Calendar,
  ShieldCheck, Clock, Wifi, Wind, Coffee, ChevronRight,
  Zap, Globe, Award, Phone, Mail, MessageCircle,
  HelpCircle, Instagram, Twitter, Facebook, Send,
  Headphones, LifeBuoy, BookOpen, ChevronLeft, FileText, ChevronDown
} from 'lucide-react';
import { MOCK_LISTINGS, MOCK_BOOKINGS } from '@/lib/mock-data';
import { Footer } from '@/components/shared/footer';

const CATEGORIES = [
  { key: 'all',       label: 'All Stays',   icon: '✦' },
  { key: 'apartment', label: 'Apartments',  icon: '🏢' },
  { key: 'villa',     label: 'Villas',      icon: '🏡' },
  { key: 'house',     label: 'Houses',      icon: '🏠' },
  { key: 'room',      label: 'Rooms',       icon: '🛏️' },
];

const QUICK_DESTINATIONS = [
  { city: 'Nairobi',   country: 'Kenya',        img: 'https://images.unsplash.com/photo-1611348524140-53c9a25263d6?w=400&q=80', listings: 340 },
  { city: 'Santorini', country: 'Greece',        img: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=400&q=80', listings: 218 },
  { city: 'Tokyo',     country: 'Japan',         img: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400&q=80', listings: 176 },
  { city: 'Cape Town', country: 'South Africa',  img: 'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=400&q=80', listings: 290 },
  { city: 'Paris',     country: 'France',        img: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&q=80', listings: 412 },
  { city: 'Bali',      country: 'Indonesia',     img: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400&q=80', listings: 385 },
];

const SPECIAL_OFFERS = [
  { title: 'Early Bird Discount', desc: 'Book 30+ days ahead and save 20%', badge: '20% OFF', gradient: 'linear-gradient(135deg, oklch(0.4 0.155 11.87), oklch(0.55 0.18 30))' },
  { title: 'Weekend Getaway',     desc: 'Fri–Sun stays from $59/night',     badge: 'HOT DEAL', gradient: 'linear-gradient(135deg, oklch(0.45 0.16 280), oklch(0.55 0.14 320))' },
  { title: 'First Time? Welcome!',desc: 'Get $25 off your first booking',   badge: 'NEW USER', gradient: 'linear-gradient(135deg, oklch(0.5 0.14 165), oklch(0.45 0.16 190))' },
];

const TRUST_BADGES = [
  { icon: <ShieldCheck size={18} />, label: 'Verified Listings', sub: 'Every property checked' },
  { icon: <Zap size={18} />,         label: 'Instant Booking',   sub: 'Confirm in seconds' },
  { icon: <Globe size={18} />,       label: '190+ Countries',    sub: 'Stay anywhere' },
  { icon: <Award size={18} />,       label: '4.9★ Average',     sub: 'Trusted by millions' },
];

const HERO_IMAGES = [
  'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=1800&q=85',
  'https://images.unsplash.com/photo-1501117912-d7ab9fb5ae1e?w=1800&q=85',
  'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1800&q=85',
];

export default function GuestHome() {
  const { data: session } = useSession();
  const [searchQuery, setSearchQuery]         = useState('');
  const [activeCategory, setActiveCategory]   = useState('all');
  const [liked, setLiked]                     = useState<Set<string>>(new Set());
  const [likeAnimating, setLikeAnimating]     = useState<string | null>(null);
  const [mounted, setMounted]                 = useState(false);
  const [currentTime, setCurrentTime]         = useState('');
  const [heroImg, setHeroImg]                 = useState(0);
  const [searchDate, setSearchDate]           = useState('');
  const [searchGuests, setSearchGuests]       = useState('');
  const [visibleCount, setVisibleCount]       = useState(6);

  useEffect(() => {
    setMounted(true);
    const h = new Date().getHours();
    setCurrentTime(h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening');
    const interval = setInterval(() => setHeroImg(i => (i + 1) % HERO_IMAGES.length), 6000);
    return () => clearInterval(interval);
  }, []);

  const userName        = session?.user?.name?.split(' ')[0] || 'Traveller';
  const upcomingBookings = MOCK_BOOKINGS.filter(b => b.status === 'confirmed').length;
  const topRated        = [...MOCK_LISTINGS].sort((a, b) => b.rating - a.rating)[0];

  const toggleLike = (id: string) => {
    setLikeAnimating(id);
    setTimeout(() => setLikeAnimating(null), 600);
    setLiked(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const filteredListings = MOCK_LISTINGS.filter(l => {
    const matchSearch = !searchQuery
      || l.title.toLowerCase().includes(searchQuery.toLowerCase())
      || l.city.toLowerCase().includes(searchQuery.toLowerCase())
      || l.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCat = activeCategory === 'all' || l.type === activeCategory;
    return matchSearch && matchCat;
  });

  // Reset visible count when filters change
  useEffect(() => {
    setVisibleCount(6);
  }, [activeCategory, searchQuery]);

  if (!mounted) return <div style={{ minHeight: '100vh' }} />;

  return (
    <>
      <style>{`
        /* ═══════════════════════════════════════
           TOKENS — exact brand palette preserved
        ═══════════════════════════════════════ */
        .gd {
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
          font-family: var(--font-sans, system-ui, sans-serif);
          background: var(--bg);
          color: var(--fg);
          min-height: calc(100vh - 72px);
          overflow-x: hidden;
        }

        /* ═══════════════════════════════════════
           KEYFRAMES
        ═══════════════════════════════════════ */
        @keyframes gdUp    { from { opacity:0; transform:translateY(32px) } to { opacity:1; transform:translateY(0) } }
        @keyframes gdIn    { from { opacity:0 } to { opacity:1 } }
        @keyframes gdLeft  { from { opacity:0; transform:translateX(-24px) } to { opacity:1; transform:translateX(0) } }
        @keyframes gdRight { from { opacity:0; transform:translateX(24px)  } to { opacity:1; transform:translateX(0) } }
        @keyframes gdScale { from { opacity:0; transform:scale(0.92) } to { opacity:1; transform:scale(1) } }
        @keyframes gdHeartPop { 0%{transform:scale(1)} 30%{transform:scale(1.5)} 60%{transform:scale(0.88)} 100%{transform:scale(1)} }
        @keyframes gdFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes gdGlow  { 0%,100%{box-shadow:0 0 20px var(--p-ring)} 50%{box-shadow:0 0 40px var(--p-shadow)} }
        @keyframes gdBlob  {
          0%,100% { transform:translate(0,0) rotate(0deg);    border-radius:60% 40% 30% 70%/60% 30% 70% 40%; }
          33%     { transform:translate(20px,-15px) rotate(4deg); border-radius:30% 60% 70% 40%/50% 60% 30% 60%; }
          66%     { transform:translate(-12px,18px) rotate(-4deg); border-radius:50% 40% 60% 50%/40% 60% 40% 60%; }
        }
        @keyframes gdHeroCross { 0%{opacity:0} 15%{opacity:1} 85%{opacity:1} 100%{opacity:0} }
        @keyframes gdShimmer { 0%{transform:translateX(-100%)} 100%{transform:translateX(200%)} }
        @keyframes gdPing { 0%{transform:scale(1);opacity:0.6} 100%{transform:scale(2.2);opacity:0} }
        @keyframes gdSpin { to{transform:rotate(360deg)} }
        @keyframes gdCount { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }

        .gd-up  { animation: gdUp   0.65s cubic-bezier(.22,.68,0,1.12) both; }
        .gd-in  { animation: gdIn   0.5s ease both; }
        .gd-sc  { animation: gdScale 0.5s cubic-bezier(.22,.68,0,1.2) both; }
        .gd-d1  { animation-delay:.06s } .gd-d2 { animation-delay:.12s }
        .gd-d3  { animation-delay:.18s } .gd-d4 { animation-delay:.24s }
        .gd-d5  { animation-delay:.3s  } .gd-d6 { animation-delay:.36s }
        .gd-d7  { animation-delay:.42s } .gd-d8 { animation-delay:.48s }

        /* ═══════════════════════════════════════
           HERO — FULL-BLEED CINEMATIC
        ═══════════════════════════════════════ */
        .gd-hero {
          position: relative;
          width: 100%;
          min-height: 620px;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          overflow: hidden;
        }

        /* Crossfading background images */
        .gd-hero-bg {
          position: absolute;
          inset: 0;
          z-index: 0;
        }
        .gd-hero-bg-img {
          position: absolute;
          inset: 0;
          width: 100%; height: 100%;
          object-fit: cover;
          animation: gdHeroCross 6s ease-in-out both;
          transform-origin: center;
        }

        /* Multi-layer gradient overlay */
        .gd-hero-overlay {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(to top, oklch(0.06 0.001 0 / 0.92) 0%, oklch(0.06 0.001 0 / 0.55) 40%, oklch(0.06 0.001 0 / 0.2) 70%, transparent 100%),
            linear-gradient(to right, oklch(0.06 0.001 0 / 0.45) 0%, transparent 55%);
          z-index: 1;
        }

        /* Decorative blobs behind content */
        .gd-hero-blob {
          position: absolute;
          pointer-events: none;
          animation: gdBlob 20s ease-in-out infinite;
          z-index: 1;
        }
        .gd-hero-blob-1 {
          width: 500px; height: 500px;
          background: radial-gradient(circle, oklch(0.4 0.155 11.87 / 0.18) 0%, transparent 65%);
          top: -180px; right: -80px;
        }
        .gd-hero-blob-2 {
          width: 300px; height: 300px;
          background: radial-gradient(circle, oklch(0.55 0.18 30 / 0.12) 0%, transparent 65%);
          bottom: 120px; left: 5%;
          animation-delay: -8s;
        }

        /* Hero dot indicators */
        .gd-hero-dots {
          position: absolute;
          bottom: 300px;
          right: 32px;
          display: flex;
          flex-direction: column;
          gap: 8px;
          z-index: 4;
        }
        .gd-hero-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: rgba(255,255,255,0.35);
          transition: all 0.4s;
          cursor: pointer;
          border: none;
          padding: 0;
        }
        .gd-hero-dot.active {
          height: 24px;
          border-radius: 3px;
          background: var(--card);
        }

        /* Hero content */
        .gd-hero-content {
          position: relative;
          z-index: 3;
          padding: 0 40px 48px;
          max-width: 1400px;
          width: 100%;
          margin: 0 auto;
        }

        .gd-hero-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 14px;
          border-radius: 100px;
          background: oklch(0.4 0.155 11.87 / 0.85);
          backdrop-filter: blur(8px);
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #fff;
          margin-bottom: 18px;
        }

        .gd-hero-ping {
          width: 8px; height: 8px;
          border-radius: 50%;
          background: #fff;
          position: relative;
        }
        .gd-hero-ping::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background: #fff;
          animation: gdPing 1.5s ease-out infinite;
        }

        .gd-hero-title {
          font-size: clamp(2.4rem, 5.5vw, 4.2rem);
          font-weight: 800;
          color: #fff;
          line-height: 1.05;
          letter-spacing: -0.03em;
          margin-bottom: 16px;
          max-width: 680px;
        }
        .gd-hero-title em {
          font-style: normal;
          background: linear-gradient(135deg, oklch(0.85 0.08 55), oklch(0.78 0.12 30));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .gd-hero-sub {
          font-size: 1.05rem;
          color: rgba(255,255,255,0.72);
          max-width: 480px;
          line-height: 1.65;
          margin-bottom: 36px;
          font-weight: 400;
        }

        /* ── Unified search bar ── */
        .gd-hero-search {
          display: flex;
          align-items: center;
          background: var(--card);
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(0,0,0,0.3), 0 4px 16px rgba(0,0,0,0.15);
          max-width: 740px;
          height: 72px;
        }

        .gd-hs-field {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 0 22px;
          flex: 1;
          min-width: 0;
          height: 100%;
          border-right: 1px solid oklch(0.92 0.002 0);
          cursor: text;
        }
        .gd-hs-field:last-of-type { border-right: none; }

        .gd-hs-icon { color: var(--p); flex-shrink: 0; }

        .gd-hs-inner { display: flex; flex-direction: column; min-width: 0; }
        .gd-hs-label {
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--muted);
          margin-bottom: 2px;
        }
        .gd-hs-input {
          border: none;
          outline: none;
          font-size: 0.88rem;
          font-weight: 500;
          color: var(--fg);
          font-family: inherit;
          background: transparent;
          width: 100%;
        }
        .gd-hs-input::placeholder { color: var(--subtle); font-weight: 400; }

        .gd-hs-btn {
          margin: 8px;
          padding: 0 28px;
          height: calc(100% - 16px);
          border-radius: 14px;
          background: var(--p);
          color: #fff;
          border: none;
          font-size: 0.9rem;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          white-space: nowrap;
          transition: all 0.25s;
          font-family: inherit;
          flex-shrink: 0;
        }
        .gd-hs-btn:hover {
          background: var(--p-hover);
          transform: scale(1.02);
          box-shadow: 0 4px 16px var(--p-shadow);
        }

        /* Trust badges row */
        .gd-trust-row {
          display: flex;
          align-items: center;
          gap: 24px;
          margin-top: 24px;
          flex-wrap: wrap;
        }
        .gd-trust-item {
          display: flex;
          align-items: center;
          gap: 8px;
          color: rgba(255,255,255,0.75);
          font-size: 0.8rem;
        }
        .gd-trust-item svg { color: rgba(255,255,255,0.5); }

        /* ─ Stat cards — float over bottom of hero ─ */
        .gd-hero-stats-wrap {
          position: relative;
          z-index: 5;
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 40px;
        }
        .gd-hero-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          transform: translateY(-40px);
        }

        .gd-stat {
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 20px;
          padding: 22px 26px;
          display: flex;
          align-items: center;
          gap: 16px;
          text-decoration: none;
          color: inherit;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(.22,.68,0,1.1);
          position: relative;
          overflow: hidden;
          box-shadow: 0 8px 32px rgba(0,0,0,0.07);
        }
        .gd-stat::before {
          content:'';
          position:absolute;
          inset:0;
          background: linear-gradient(135deg, var(--p-pale), transparent 60%);
          opacity:0;
          transition: opacity 0.3s;
        }
        .gd-stat:hover { transform:translateY(-6px); box-shadow:0 16px 48px var(--p-ring); border-color:color-mix(in oklch, var(--p) 30%, var(--border)); }
        .gd-stat:hover::before { opacity:1; }

        .gd-stat-icon {
          width: 52px; height: 52px;
          border-radius: 16px;
          background: var(--p-pale);
          display: flex; align-items: center; justify-content: center;
          font-size: 1.5rem;
          flex-shrink: 0;
          transition: transform 0.3s;
          position: relative;
        }
        .gd-stat:hover .gd-stat-icon { transform: scale(1.12) rotate(-4deg); }

        .gd-stat-val { font-size: 1.7rem; font-weight: 700; color: var(--fg); line-height: 1; animation: gdCount 0.6s ease both; }
        .gd-stat-lbl { font-size: 0.78rem; color: var(--muted); margin-top: 4px; }
        .gd-stat-trend { font-size: 0.72rem; color: oklch(0.45 0.14 145); font-weight: 600; margin-top: 2px; display: flex; align-items: center; gap: 3px; }

        /* ═══════════════════════════════════════
           SECTION SHARED
        ═══════════════════════════════════════ */
        .gd-section {
          padding: 0 40px;
          max-width: 1400px;
          margin: 0 auto;
        }
        .gd-section + .gd-section { margin-top: 48px; }

        .gd-hdr {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
        }
        .gd-hdr-left { display: flex; align-items: center; gap: 10px; }
        .gd-hdr-icon {
          width: 36px; height: 36px;
          border-radius: 10px;
          background: var(--p-pale);
          display: flex; align-items: center; justify-content: center;
          color: var(--p);
        }
        .gd-ttl { font-size: 1.3rem; font-weight: 700; color: var(--fg); letter-spacing: -0.01em; }
        .gd-see-all {
          display: flex; align-items: center; gap: 4px;
          font-size: 0.82rem; font-weight: 600; color: var(--p);
          text-decoration: none;
          transition: gap 0.2s;
        }
        .gd-see-all:hover { gap: 8px; }

        /* ═══════════════════════════════════════
           TRUST STRIP (below hero stats)
        ═══════════════════════════════════════ */
        .gd-trust-strip {
          padding: 0 40px;
          max-width: 1400px;
          margin: 0 auto 48px;
        }
        .gd-trust-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
        }
        .gd-trust-card {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px 18px;
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 14px;
          transition: all 0.25s;
        }
        .gd-trust-card:hover { border-color: color-mix(in oklch, var(--p) 30%, var(--border)); transform: translateY(-2px); }
        .gd-trust-card-icon {
          width: 38px; height: 38px;
          border-radius: 10px;
          background: var(--p-pale);
          color: var(--p);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .gd-trust-card-label { font-size: 0.84rem; font-weight: 600; color: var(--fg); }
        .gd-trust-card-sub   { font-size: 0.73rem; color: var(--muted); margin-top: 1px; }

        /* ═══════════════════════════════════════
           SPECIAL OFFERS
        ═══════════════════════════════════════ */
        .gd-scroll {
          display: flex;
          gap: 16px;
          overflow-x: auto;
          scrollbar-width: none;
          padding-bottom: 4px;
          -webkit-overflow-scrolling: touch;
        }
        .gd-scroll::-webkit-scrollbar { display: none; }

        .gd-offer {
          flex-shrink: 0;
          width: 300px;
          padding: 28px;
          border-radius: 22px;
          color: #fff;
          position: relative;
          overflow: hidden;
          cursor: pointer;
          transition: transform 0.3s, box-shadow 0.3s;
        }
        .gd-offer:hover { transform: translateY(-5px) scale(1.01); box-shadow: 0 20px 52px rgba(0,0,0,0.22); }

        /* Shimmer sweep */
        .gd-offer::before {
          content:'';
          position:absolute;
          top:0; left:0; bottom:0;
          width:40%;
          background: linear-gradient(105deg, transparent, rgba(255,255,255,0.15), transparent);
          animation: gdShimmer 3s ease-in-out infinite;
          pointer-events:none;
        }
        .gd-offer::after {
          content:'';
          position:absolute;
          top:-50%; right:-50%;
          width:100%; height:100%;
          background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 60%);
          pointer-events:none;
        }

        .gd-offer-badge {
          display: inline-flex; align-items: center; gap: 5px;
          padding: 4px 12px;
          border-radius: 100px;
          background: rgba(255,255,255,0.2);
          font-size: 0.68rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase;
          margin-bottom: 14px;
          backdrop-filter: blur(4px);
          position: relative;
        }
        .gd-offer-title { font-size: 1.15rem; font-weight: 700; margin-bottom: 6px; position: relative; }
        .gd-offer-desc  { font-size: 0.84rem; opacity: 0.85; line-height: 1.5; position: relative; }
        .gd-offer-cta {
          display: inline-flex; align-items: center; gap: 6px;
          margin-top: 18px;
          font-size: 0.82rem; font-weight: 600; opacity: 0.9;
          position: relative;
          transition: gap 0.2s;
        }
        .gd-offer:hover .gd-offer-cta { gap: 10px; }

        /* ═══════════════════════════════════════
           UPCOMING BOOKING BANNER
        ═══════════════════════════════════════ */
        .gd-booking-banner {
          display: flex;
          align-items: center;
          gap: 20px;
          padding: 20px 28px;
          background: linear-gradient(135deg, var(--p-pale), oklch(0.97 0.02 30));
          border: 1px solid color-mix(in oklch, var(--p) 20%, var(--border));
          border-radius: 18px;
          text-decoration: none;
          color: inherit;
          transition: all 0.25s;
          margin-bottom: 32px;
        }
        .gd-booking-banner:hover { transform: translateX(4px); box-shadow: 0 8px 28px var(--p-ring); }
        .gd-bb-icon {
          width: 48px; height: 48px;
          border-radius: 14px;
          background: var(--p);
          color: #fff;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .gd-bb-text { flex: 1; }
        .gd-bb-title { font-size: 0.92rem; font-weight: 600; color: var(--fg); }
        .gd-bb-sub   { font-size: 0.78rem; color: var(--muted); margin-top: 2px; }
        .gd-bb-arrow { color: var(--p); }

        /* ═══════════════════════════════════════
           DESTINATIONS
        ═══════════════════════════════════════ */
        .gd-dest {
          flex-shrink: 0;
          width: 165px;
          text-decoration: none;
          color: inherit;
          cursor: pointer;
          transition: transform 0.3s;
        }
        .gd-dest:hover { transform: translateY(-6px); }

        .gd-dest-img-wrap {
          position: relative;
          width: 165px; height: 110px;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 4px 16px rgba(0,0,0,0.1);
        }
        .gd-dest-img {
          width: 100%; height: 100%;
          object-fit: cover;
          transition: transform 0.5s cubic-bezier(.22,.68,0,1.1);
        }
        .gd-dest:hover .gd-dest-img { transform: scale(1.1); }
        .gd-dest-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 55%);
        }
        .gd-dest-city  { position:absolute; bottom:10px; left:12px; font-size:0.88rem; font-weight:700; color:#fff; }
        .gd-dest-count {
          position:absolute; bottom:10px; right:10px;
          font-size:0.65rem; color:rgba(255,255,255,0.85);
          background:rgba(255,255,255,0.15); padding:2px 7px;
          border-radius:100px; backdrop-filter:blur(4px);
        }
        .gd-dest-country { font-size:0.73rem; color:var(--muted); margin-top:6px; text-align:center; }

        /* ═══════════════════════════════════════
           SEARCH + FILTERS
        ═══════════════════════════════════════ */
        .gd-search-bar {
          display: flex;
          align-items: center;
          gap: 0;
          background: var(--card);
          border: 1.5px solid var(--border);
          border-radius: 16px;
          overflow: hidden;
          margin-bottom: 16px;
          transition: border-color 0.3s, box-shadow 0.3s;
          box-shadow: 0 2px 8px rgba(0,0,0,0.04);
        }
        .gd-search-bar:focus-within {
          border-color: var(--p);
          box-shadow: 0 0 0 4px var(--p-ring), 0 4px 16px var(--p-ring);
        }
        .gd-search-icon-wrap {
          padding: 0 16px 0 18px;
          color: var(--p);
          display: flex;
          align-items: center;
          flex-shrink: 0;
        }
        .gd-search-input {
          flex: 1;
          padding: 16px 0;
          border: none;
          background: transparent;
          font-size: 0.95rem;
          color: var(--fg);
          font-family: inherit;
          outline: none;
        }
        .gd-search-input::placeholder { color: var(--subtle); }
        .gd-search-clear {
          padding: 0 18px;
          color: var(--subtle);
          cursor: pointer;
          background: none;
          border: none;
          font-size: 1.1rem;
          line-height: 1;
          transition: color 0.2s;
        }
        .gd-search-clear:hover { color: var(--fg); }

        .gd-cats {
          display: flex; gap: 8px;
          overflow-x: auto; scrollbar-width: none;
          padding-bottom: 4px;
        }
        .gd-cats::-webkit-scrollbar { display: none; }

        .gd-pill {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 9px 20px;
          border-radius: 100px;
          border: 1.5px solid var(--border);
          background: var(--card);
          font-size: 0.83rem; font-weight: 500;
          color: var(--muted);
          cursor: pointer;
          transition: all 0.22s;
          white-space: nowrap;
          font-family: inherit;
        }
        .gd-pill:hover { border-color: var(--p); color: var(--p); transform: translateY(-2px); }
        .gd-pill.active {
          background: var(--p); border-color: var(--p); color: #fff; font-weight: 600;
          box-shadow: 0 4px 16px var(--p-shadow);
        }

        /* ═══════════════════════════════════════
           RESULT HEADER WITH COUNT
        ═══════════════════════════════════════ */
        .gd-result-bar {
          display: flex; align-items: center; justify-content: space-between;
          margin-bottom: 20px;
          padding-bottom: 16px;
          border-bottom: 1px solid var(--border);
        }
        .gd-result-count {
          font-size: 0.82rem; color: var(--muted);
          padding: 4px 12px;
          background: var(--bg2);
          border-radius: 100px;
          border: 1px solid var(--border);
        }
        .gd-sort-btn {
          display: flex; align-items: center; gap: 6px;
          font-size: 0.82rem; color: var(--muted);
          background: none; border: 1px solid var(--border);
          border-radius: 8px; padding: 6px 12px;
          cursor: pointer; font-family: inherit;
          transition: all 0.2s;
        }
        .gd-sort-btn:hover { border-color: var(--p); color: var(--p); }

        /* ═══════════════════════════════════════
           LISTING GRID
        ═══════════════════════════════════════ */
        .gd-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        .gd-empty {
          grid-column: 1/-1;
          text-align: center; padding: 80px 20px;
          animation: gdIn 0.4s ease;
        }
        .gd-empty-icon { font-size: 3.5rem; margin-bottom: 16px; }
        .gd-empty-text { font-size: 1rem; font-weight: 500; color: var(--muted); margin-bottom: 16px; }

        /* ── Card ── */
        .gd-card {
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 22px;
          overflow: hidden;
          transition: all 0.35s cubic-bezier(.22,.68,0,1.12);
          text-decoration: none;
          color: inherit;
          display: flex; flex-direction: column;
          position: relative;
        }
        .gd-card:hover {
          transform: translateY(-9px);
          box-shadow: 0 24px 64px var(--p-ring);
          border-color: color-mix(in oklch, var(--p) 22%, var(--border));
        }

        .gd-card-img-wrap {
          position: relative;
          height: 220px; overflow: hidden;
        }
        .gd-card-img {
          width: 100%; height: 100%;
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(.22,.68,0,1.1);
        }
        .gd-card:hover .gd-card-img { transform: scale(1.09); }

        .gd-like {
          position: absolute; top: 14px; right: 14px;
          width: 36px; height: 36px;
          border-radius: 50%;
          background: rgba(255,255,255,0.82);
          backdrop-filter: blur(12px);
          border: none; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: all 0.25s; z-index: 2;
          box-shadow: 0 2px 8px rgba(0,0,0,0.12);
        }
        .gd-like:hover { transform: scale(1.18); background: #fff; }
        .gd-like.popping { animation: gdHeartPop 0.5s ease; }

        .gd-card-badge {
          position: absolute; bottom: 12px; left: 12px;
          padding: 4px 12px;
          border-radius: 100px;
          background: rgba(0,0,0,0.55);
          backdrop-filter: blur(8px);
          color: #fff; font-size: 0.68rem; font-weight: 600;
          text-transform: uppercase; letter-spacing: 0.06em;
        }

        .gd-card-price-tag {
          position: absolute; top: 12px; left: 12px;
          padding: 5px 12px; border-radius: 10px;
          background: rgba(255,255,255,0.92);
          backdrop-filter: blur(8px);
          font-size: 0.86rem; font-weight: 700; color: var(--fg);
          box-shadow: 0 2px 8px rgba(0,0,0,0.1); z-index: 2;
        }
        .gd-card-price-tag span { font-size: 0.7rem; font-weight: 400; color: var(--muted); }

        /* Popular badge */
        .gd-popular-badge {
          position: absolute; top: 12px; left: 12px;
          display: flex; align-items: center; gap: 4px;
          padding: 4px 10px; border-radius: 8px;
          background: var(--p);
          color: #fff; font-size: 0.68rem; font-weight: 700;
          letter-spacing: 0.04em; text-transform: uppercase;
          z-index: 2;
        }

        .gd-card-body {
          padding: 18px 20px 22px;
          display: flex; flex-direction: column; gap: 9px;
          flex: 1;
        }

        .gd-card-row1 { display:flex; align-items:flex-start; justify-content:space-between; gap:8px; }
        .gd-card-title { font-size:1.02rem; font-weight:600; color:var(--fg); line-height:1.3; transition:color 0.2s; }
        .gd-card:hover .gd-card-title { color: var(--p); }

        .gd-rating {
          display:flex; align-items:center; gap:3px;
          padding:3px 9px; border-radius:8px;
          background:oklch(0.98 0.02 55);
          font-size:0.8rem; font-weight:600;
          color:oklch(0.32 0.1 55); flex-shrink:0;
        }
        .gd-rating svg { color: var(--amber); }

        .gd-card-loc {
          display:flex; align-items:center; gap:5px;
          font-size:0.8rem; color:var(--muted);
        }
        .gd-card-loc svg { color:var(--p); flex-shrink:0; }

        .gd-card-amenities {
          display:flex; gap:14px; flex-wrap:wrap;
          font-size:0.76rem; color:var(--muted);
        }
        .gd-amenity { display:flex; align-items:center; gap:4px; }

        /* Amenity chips */
        .gd-chip-row { display:flex; gap:6px; flex-wrap:wrap; }
        .gd-chip {
          display:inline-flex; align-items:center; gap:4px;
          padding:3px 8px; border-radius:6px;
          background:var(--bg2); border:1px solid var(--border);
          font-size:0.68rem; color:var(--muted); font-weight:500;
        }
        .gd-chip svg { width:11px; height:11px; }

        .gd-card-foot {
          margin-top:auto; padding-top:14px;
          border-top:1px solid var(--border);
          display:flex; align-items:center; justify-content:space-between;
        }
        .gd-card-price {
          font-size:1.15rem; font-weight:700; color:var(--fg);
          display:flex; align-items:baseline; gap:3px;
        }
        .gd-card-price span { font-size:0.76rem; font-weight:400; color:var(--muted); }
        .gd-card-reviews { font-size:0.76rem; color:var(--muted); }

        /* ═══════════════════════════════════════
           TOP RATED HIGHLIGHT
        ═══════════════════════════════════════ */
        .gd-highlight-card {
          display: grid;
          grid-template-columns: 1.3fr 1fr;
          border-radius: 24px;
          overflow: hidden;
          background: var(--card);
          border: 1px solid var(--border);
          box-shadow: 0 8px 32px rgba(0,0,0,0.06);
          text-decoration: none; color: inherit;
          transition: transform 0.3s, box-shadow 0.3s;
        }
        .gd-highlight-card:hover { transform:translateY(-5px); box-shadow:0 20px 56px var(--p-ring); }

        .gd-hi-img-wrap { position:relative; min-height:280px; overflow:hidden; }
        .gd-hi-img { width:100%; height:100%; object-fit:cover; transition:transform 0.6s ease; }
        .gd-highlight-card:hover .gd-hi-img { transform:scale(1.05); }

        .gd-hi-badge {
          position:absolute; top:20px; left:20px;
          display:flex; align-items:center; gap:6px;
          padding:8px 16px; border-radius:12px;
          background:var(--p); color:#fff;
          font-size:0.76rem; font-weight:700;
          letter-spacing:0.04em;
          animation: gdGlow 3s ease-in-out infinite;
        }

        .gd-hi-body { padding:36px 32px; display:flex; flex-direction:column; justify-content:center; }
        .gd-hi-eyebrow {
          display:inline-flex; align-items:center; gap:8px;
          font-size:0.72rem; font-weight:600;
          text-transform:uppercase; letter-spacing:0.08em;
          color:var(--p); margin-bottom:12px;
        }
        .gd-hi-eyebrow::before { content:''; width:20px; height:2px; background:var(--p); border-radius:2px; }
        .gd-hi-title { font-size:1.7rem; font-weight:700; color:var(--fg); line-height:1.2; letter-spacing:-0.01em; margin-bottom:10px; }
        .gd-hi-desc  { font-size:0.88rem; color:var(--muted); line-height:1.7; margin-bottom:18px; }
        .gd-hi-meta  { display:flex; gap:18px; font-size:0.8rem; color:var(--muted); margin-bottom:24px; flex-wrap:wrap; }
        .gd-hi-meta-item { display:flex; align-items:center; gap:5px; }
        .gd-hi-cta {
          display:inline-flex; align-items:center; gap:8px;
          padding:12px 26px; border-radius:12px;
          background:var(--p); color:#fff;
          font-weight:600; font-size:0.88rem; border:none; cursor:pointer;
          text-decoration:none; transition:all 0.25s; align-self:flex-start;
          font-family:inherit;
        }
        .gd-hi-cta:hover { background:var(--p-hover); transform:translateY(-2px); box-shadow:0 8px 24px var(--p-shadow); }

        /* ═══════════════════════════════════════
           QUICK ACTIONS ROW
        ═══════════════════════════════════════ */
        .gd-quick-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
        }
        .gd-quick-card {
          padding: 20px;
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 16px;
          text-decoration: none; color: inherit;
          display: flex; flex-direction: column; gap: 10px;
          cursor: pointer;
          transition: all 0.25s;
        }
        .gd-quick-card:hover { border-color: color-mix(in oklch, var(--p) 30%, var(--border)); transform: translateY(-3px); box-shadow: 0 8px 28px var(--p-ring); }
        .gd-quick-icon {
          width: 40px; height: 40px;
          border-radius: 12px;
          background: var(--p-pale);
          color: var(--p);
          display: flex; align-items: center; justify-content: center;
        }
        .gd-quick-title { font-size: 0.86rem; font-weight: 600; color: var(--fg); }
        .gd-quick-sub   { font-size: 0.74rem; color: var(--muted); line-height: 1.4; }

        /* ═══════════════════════════════════════
           SUPPORT / CUSTOMER CARE CARD
        ═══════════════════════════════════════ */
        .gd-support {
          position: relative;
          border-radius: 28px;
          overflow: hidden;
          background: linear-gradient(135deg, var(--p-pale) 0%, oklch(0.97 0.01 30) 50%, oklch(0.98 0.008 280) 100%);
          border: 1px solid var(--border);
          padding: 48px 44px;
          display: grid;
          grid-template-columns: 1.1fr 1fr;
          gap: 40px;
          align-items: center;
        }
        .gd-support::before {
          content: '';
          position: absolute;
          top: -60%; right: -20%;
          width: 500px; height: 500px;
          background: radial-gradient(circle, oklch(0.4 0.155 11.87 / 0.06) 0%, transparent 60%);
          pointer-events: none;
        }
        .gd-support::after {
          content: '';
          position: absolute;
          bottom: -40%; left: -10%;
          width: 400px; height: 400px;
          background: radial-gradient(circle, oklch(0.5 0.14 280 / 0.04) 0%, transparent 60%);
          pointer-events: none;
        }

        .gd-support-left { position: relative; z-index: 1; }
        .gd-support-badge {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 5px 14px; border-radius: 100px;
          background: var(--p);
          font-size: 0.7rem; font-weight: 600;
          letter-spacing: 0.08em; text-transform: uppercase;
          color: #fff;
          margin-bottom: 18px;
        }
        .gd-support-title {
          font-size: clamp(1.6rem, 3vw, 2.2rem);
          font-weight: 800;
          color: var(--fg);
          line-height: 1.15;
          letter-spacing: -0.02em;
          margin-bottom: 12px;
        }
        .gd-support-title em {
          font-style: normal;
          background: linear-gradient(135deg, var(--p) 0%, oklch(0.5 0.18 30) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .gd-support-desc {
          font-size: 0.92rem;
          color: var(--muted);
          line-height: 1.65;
          margin-bottom: 28px;
          max-width: 420px;
        }
        .gd-support-stats {
          display: flex; gap: 28px;
        }
        .gd-support-stat-val {
          font-size: 1.5rem; font-weight: 700; color: var(--fg);
        }
        .gd-support-stat-lbl {
          font-size: 0.72rem; color: var(--muted);
          margin-top: 2px;
        }

        .gd-support-right { position: relative; z-index: 1; }
        .gd-support-cards {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }
        .gd-sc {
          padding: 22px;
          border-radius: 18px;
          background: var(--card);
          border: 1px solid var(--border);
          transition: all 0.3s;
          cursor: pointer;
          text-decoration: none;
          color: inherit;
          display: flex;
          flex-direction: column;
          gap: 10px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.04);
        }
        .gd-sc:hover {
          border-color: color-mix(in oklch, var(--p) 30%, var(--border));
          transform: translateY(-4px);
          box-shadow: 0 12px 36px var(--p-ring);
        }
        .gd-sc-icon {
          width: 42px; height: 42px;
          border-radius: 12px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .gd-sc-title { font-size: 0.88rem; font-weight: 600; color: var(--fg); }
        .gd-sc-sub { font-size: 0.74rem; color: var(--muted); line-height: 1.45; }
        .gd-sc-tag {
          display: inline-flex; align-items: center;
          font-size: 0.66rem; font-weight: 600;
          padding: 3px 8px; border-radius: 100px;
          width: fit-content;
        }

        /* ═══════════════════════════════════════
           FOOTER
        ═══════════════════════════════════════ */
        .gd-footer {
          background: oklch(0.96 0.003 0);
          color: var(--muted);
          margin-top: 80px;
          border-top: 1px solid var(--border);
        }

        .gd-footer-inner {
          max-width: 1400px;
          margin: 0 auto;
          padding: 64px 40px 0;
        }

        .gd-footer-top {
          display: grid;
          grid-template-columns: 1.4fr repeat(3, 1fr);
          gap: 48px;
          padding-bottom: 48px;
          border-bottom: 1px solid var(--border);
        }

        /* Brand column */
        .gd-ft-brand-name {
          font-size: 1.4rem;
          font-weight: 800;
          color: var(--fg);
          letter-spacing: -0.02em;
          margin-bottom: 14px;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .gd-ft-brand-logo {
          width: 32px; height: 32px;
          border-radius: 8px;
          background: var(--p);
          display: flex; align-items: center; justify-content: center;
        }
        .gd-ft-brand-desc {
          font-size: 0.84rem;
          line-height: 1.7;
          margin-bottom: 24px;
          max-width: 300px;
          color: var(--muted);
        }

        /* Newsletter */
        .gd-ft-newsletter {
          display: flex;
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid var(--border);
          background: var(--card);
          max-width: 320px;
        }
        .gd-ft-newsletter input {
          flex: 1;
          padding: 12px 16px;
          background: transparent;
          border: none;
          outline: none;
          color: var(--fg);
          font-size: 0.82rem;
          font-family: inherit;
        }
        .gd-ft-newsletter input::placeholder { color: var(--subtle); }
        .gd-ft-newsletter button {
          padding: 12px 18px;
          background: var(--p);
          border: none;
          color: #fff;
          cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: background 0.2s;
        }
        .gd-ft-newsletter button:hover { background: var(--p-hover); }

        /* Nav columns */
        .gd-ft-col-title {
          font-size: 0.76rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--subtle);
          margin-bottom: 18px;
        }
        .gd-ft-links {
          list-style: none;
          padding: 0; margin: 0;
          display: flex; flex-direction: column;
          gap: 12px;
        }
        .gd-ft-links a {
          font-size: 0.84rem;
          color: var(--muted);
          text-decoration: none;
          transition: color 0.2s, padding-left 0.2s;
          display: flex; align-items: center; gap: 6px;
        }
        .gd-ft-links a:hover {
          color: var(--p);
          padding-left: 4px;
        }

        /* Social row */
        .gd-ft-socials {
          display: flex;
          gap: 10px;
          margin-top: 20px;
        }
        .gd-ft-social {
          width: 38px; height: 38px;
          border-radius: 10px;
          background: var(--bg2);
          border: 1px solid var(--border);
          display: flex; align-items: center; justify-content: center;
          color: var(--muted);
          transition: all 0.25s;
          cursor: pointer;
        }
        .gd-ft-social:hover {
          background: var(--p);
          border-color: var(--p);
          color: #fff;
          transform: translateY(-2px);
        }

        /* Bottom bar */
        .gd-footer-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 28px 0;
          font-size: 0.78rem;
          flex-wrap: wrap;
          gap: 12px;
        }
        .gd-ft-legal {
          display: flex;
          gap: 20px;
          flex-wrap: wrap;
        }
        .gd-ft-legal a {
          color: var(--subtle);
          text-decoration: none;
          transition: color 0.2s;
        }
        .gd-ft-legal a:hover { color: var(--p); }

        /* ═══════════════════════════════════════
           RESPONSIVE
        ═══════════════════════════════════════ */
        @media (max-width: 1100px) {
          .gd-grid { grid-template-columns: repeat(2, 1fr); }
          .gd-trust-grid { grid-template-columns: repeat(2, 1fr); }
          .gd-quick-grid { grid-template-columns: repeat(2, 1fr); }
          .gd-hero-stats { grid-template-columns: repeat(3, 1fr); }
          .gd-footer-top { grid-template-columns: 1fr 1fr; gap: 36px; }
        }
        @media (max-width: 900px) {
          .gd-highlight-card { grid-template-columns: 1fr; }
          .gd-hi-img-wrap { min-height: 220px; }
          .gd-hi-body { padding: 24px; }
          .gd-support { grid-template-columns: 1fr; padding: 36px 28px; gap: 28px; }
        }
        @media (max-width: 768px) {
          .gd-hero { min-height: 560px; }
          .gd-hero-content { padding: 0 20px 40px; }
          .gd-hero-search { flex-wrap: wrap; height: auto; border-radius: 16px; padding: 10px; gap: 8px; }
          .gd-hs-field { height: 50px; border-right: none; border-bottom: 1px solid oklch(0.92 0.002 0); border-radius: 10px; background: oklch(0.97 0.001 0); }
          .gd-hs-field:last-of-type { border-bottom: none; }
          .gd-hs-btn { width: 100%; height: 46px; border-radius: 10px; justify-content: center; margin: 0; }
          .gd-hero-stats { grid-template-columns: 1fr; }
          .gd-section { padding: 0 16px; }
          .gd-trust-strip { padding: 0 16px; }
          .gd-hero-stats-wrap { padding: 0 16px; }
          .gd-trust-grid { grid-template-columns: repeat(2, 1fr); }
          .gd-quick-grid { grid-template-columns: repeat(2, 1fr); }
          .gd-hero-dots { display: none; }
          .gd-trust-row { gap: 16px; }
          .gd-footer-inner { padding: 48px 20px 0; }
          .gd-footer-top { grid-template-columns: 1fr; gap: 32px; }
          .gd-support-cards { grid-template-columns: 1fr; }
          .gd-support-stats { gap: 20px; flex-wrap: wrap; }
        }
        @media (max-width: 640px) {
          .gd-hero-title { font-size: 2.2rem; }
          .gd-grid { grid-template-columns: 1fr; }
          .gd-trust-grid { grid-template-columns: 1fr; }
          .gd-hero-stats { grid-template-columns: 1fr; }
          .gd-offer { width: 270px; }
          .gd-dest { width: 150px; }
          .gd-dest-img-wrap { width: 150px; height: 100px; }
        }
        
        .gd-carousel-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.9);
          border: 1px solid rgba(0,0,0,0.05);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #222;
          cursor: pointer;
          opacity: 0;
          transition: all 0.2s ease;
          z-index: 5;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
        .gd-card-img-wrap:hover .gd-carousel-btn {
          opacity: 1;
        }
        .gd-carousel-btn:hover {
          background: #fff;
          transform: translateY(-50%) scale(1.1);
        }
        .gd-carousel-btn.prev { left: 8px; }
        .gd-carousel-btn.next { right: 8px; }
        
        .gd-dots {
          position: absolute;
          bottom: 12px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 6px;
          z-index: 5;
        }
        .gd-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.6);
          transition: all 0.2s ease;
        }
        .gd-dot.active {
          background: #fff;
          transform: scale(1.2);
        }

        .gd-rules-dropdown {
          position: relative;
          margin-top: 12px;
          border-top: 1px solid rgba(0,0,0,0.05);
          padding-top: 12px;
        }
        .gd-rules-toggle {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--p); /* Changed from --primary to --p */
          background: none;
          border: none;
          padding: 0;
          cursor: pointer;
          opacity: 0.8;
          transition: opacity 0.2s;
        }
        .gd-rules-toggle:hover {
          opacity: 1;
        }
        .gd-rules-content {
          margin-top: 8px;
          background: rgba(0,0,0,0.02);
          border-radius: 8px;
          padding: 10px;
          font-size: 0.75rem;
          color: var(--muted);
          animation: slideDown 0.3s ease-out;
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-5px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .gd-rule-item {
          display: flex;
          align-items: flex-start;
          gap: 6px;
          margin-bottom: 4px;
        }
        .gd-rule-dot {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: var(--p); /* Changed from --primary to --p */
          margin-top: 6px;
          flex-shrink: 0;
        }
      `}</style>

      <div className="gd">

        {/* ══════════════════════════════════
            CINEMATIC HERO
        ══════════════════════════════════ */}
        <section className="gd-hero">
          {/* Crossfading background */}
          <div className="gd-hero-bg">
            {HERO_IMAGES.map((src, i) => (
              i === heroImg && (
                <img key={i} src={src} alt="" className="gd-hero-bg-img" />
              )
            ))}
          </div>

          <div className="gd-hero-overlay" />
          <div className="gd-hero-blob gd-hero-blob-1" />
          <div className="gd-hero-blob gd-hero-blob-2" />

          {/* Slide indicators */}
          <div className="gd-hero-dots">
            {HERO_IMAGES.map((_, i) => (
              <button
                key={i}
                className={`gd-hero-dot ${i === heroImg ? 'active' : ''}`}
                onClick={() => setHeroImg(i)}
              />
            ))}
          </div>

          <div className="gd-hero-content">
            <div className="gd-hero-eyebrow gd-up">
              <div className="gd-hero-ping" />
              {upcomingBookings > 0
                ? `${upcomingBookings} upcoming stay${upcomingBookings > 1 ? 's' : ''}`
                : 'Start exploring'}
            </div>

            <h1 className="gd-hero-title gd-up gd-d1">
              {currentTime},<br />
              <em>{session?.user?.name?.split(' ')[0] || 'Traveller'}.</em><br />
              Where next?
            </h1>

            <p className="gd-hero-sub gd-up gd-d2">
              Hand-picked stays across 190+ countries — from city apartments to wild safari lodges.
              Book instantly, travel better.
            </p>

            {/* Unified search bar */}
            <div className="gd-hero-search gd-up gd-d3">
              <div className="gd-hs-field">
                <Search size={16} className="gd-hs-icon" />
                <div className="gd-hs-inner">
                  <span className="gd-hs-label">Where</span>
                  <input
                    className="gd-hs-input"
                    placeholder="City, neighbourhood, landmark…"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              <div className="gd-hs-field">
                <Calendar size={16} className="gd-hs-icon" />
                <div className="gd-hs-inner">
                  <span className="gd-hs-label">Check-in</span>
                  <input
                    className="gd-hs-input"
                    type="date"
                    value={searchDate}
                    onChange={e => setSearchDate(e.target.value)}
                    placeholder="Add dates"
                  />
                </div>
              </div>

              <div className="gd-hs-field">
                <Users size={16} className="gd-hs-icon" />
                <div className="gd-hs-inner">
                  <span className="gd-hs-label">Guests</span>
                  <input
                    className="gd-hs-input"
                    placeholder="Add guests"
                    value={searchGuests}
                    onChange={e => setSearchGuests(e.target.value)}
                  />
                </div>
              </div>

              <button className="gd-hs-btn">
                <Search size={15} />
                Search
              </button>
            </div>

            {/* Trust micro-text */}
            <div className="gd-trust-row gd-up gd-d4">
              {['No booking fees', 'Free cancellation on most stays', 'Best price guarantee'].map(t => (
                <div className="gd-trust-item" key={t}>
                  <ShieldCheck size={13} />
                  {t}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════
            STAT CARDS (float below hero)
        ══════════════════════════════════ */}
        <div className="gd-hero-stats-wrap">
          <div className="gd-hero-stats">
            <Link href="/guest/bookings" className="gd-stat gd-up gd-d2">
              <div className="gd-stat-icon">📋</div>
              <div>
                <div className="gd-stat-val">{upcomingBookings}</div>
                <div className="gd-stat-lbl">Upcoming Bookings</div>
                {upcomingBookings > 0 && <div className="gd-stat-trend">↑ View details</div>}
              </div>
            </Link>
            <div className="gd-stat gd-up gd-d3">
              <div className="gd-stat-icon">❤️</div>
              <div>
                <div className="gd-stat-val">{liked.size}</div>
                <div className="gd-stat-lbl">Saved Stays</div>
              </div>
            </div>
            <div className="gd-stat gd-up gd-d4">
              <div className="gd-stat-icon">🌍</div>
              <div>
                <div className="gd-stat-val">{MOCK_LISTINGS.length}</div>
                <div className="gd-stat-lbl">Available Now</div>
                <div className="gd-stat-trend">↑ Updated today</div>
              </div>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════
            TRUST BADGES
        ══════════════════════════════════ */}
        <div className="gd-trust-strip gd-up gd-d5">
          <div className="gd-trust-grid">
            {TRUST_BADGES.map(b => (
              <div className="gd-trust-card" key={b.label}>
                <div className="gd-trust-card-icon">{b.icon}</div>
                <div>
                  <div className="gd-trust-card-label">{b.label}</div>
                  <div className="gd-trust-card-sub">{b.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ══════════════════════════════════
            UPCOMING BOOKING BANNER
        ══════════════════════════════════ */}
        {upcomingBookings > 0 && (
          <div className="gd-section gd-up gd-d4">
            <Link href="/guest/bookings" className="gd-booking-banner">
              <div className="gd-bb-icon"><Calendar size={22} /></div>
              <div className="gd-bb-text">
                <div className="gd-bb-title">You have {upcomingBookings} upcoming {upcomingBookings === 1 ? 'stay' : 'stays'}</div>
                <div className="gd-bb-sub">Tap to view your itinerary, check-in details and host contact</div>
              </div>
              <ChevronRight size={20} className="gd-bb-arrow" />
            </Link>
          </div>
        )}

        {/* ══════════════════════════════════
            QUICK ACTIONS
        ══════════════════════════════════ */}
        <div className="gd-section gd-up gd-d5" style={{ marginTop: 48 }}>
          <div className="gd-hdr">
            <div className="gd-hdr-left">
              <div className="gd-hdr-icon"><Zap size={16} /></div>
              <h2 className="gd-ttl">Quick Actions</h2>
            </div>
          </div>
          <div className="gd-quick-grid">
            {[
              { icon: <Search size={18}/>,      title:'Search Stays',        sub:'Find your next perfect place',      href:'/guest/listings' },
              { icon: <Calendar size={18}/>,    title:'My Bookings',         sub:'View & manage your reservations',   href:'/guest/bookings' },
              { icon: <Heart size={18}/>,       title:'Saved Stays',         sub:`${liked.size} properties saved`,    href:'/guest/saved' },
              { icon: <MapPin size={18}/>,      title:'Explore Map',         sub:'Browse stays by location',          href:'/guest/map' },
            ].map(a => (
              <Link key={a.title} href={a.href} className="gd-quick-card">
                <div className="gd-quick-icon">{a.icon}</div>
                <div>
                  <div className="gd-quick-title">{a.title}</div>
                  <div className="gd-quick-sub">{a.sub}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* ══════════════════════════════════
            SPECIAL OFFERS
        ══════════════════════════════════ */}
        <div className="gd-section gd-up gd-d5" style={{ marginTop: 48 }}>
          <div className="gd-hdr">
            <div className="gd-hdr-left">
              <div className="gd-hdr-icon"><Flame size={16} /></div>
              <h2 className="gd-ttl">Special Offers</h2>
            </div>
            <a href="#" className="gd-see-all">View all <ArrowRight size={14} /></a>
          </div>
          <div className="gd-scroll">
            {SPECIAL_OFFERS.map((o, i) => (
              <div key={i} className="gd-offer" style={{ background: o.gradient }}>
                <div className="gd-offer-badge">🔥 {o.badge}</div>
                <div className="gd-offer-title">{o.title}</div>
                <div className="gd-offer-desc">{o.desc}</div>
                <div className="gd-offer-cta">Claim Now <ArrowRight size={14} /></div>
              </div>
            ))}
          </div>
        </div>

        {/* ══════════════════════════════════
            TOP RATED FEATURE
        ══════════════════════════════════ */}
        {topRated && (
          <div className="gd-section gd-up gd-d6" style={{ marginTop: 48 }}>
            <div className="gd-hdr">
              <div className="gd-hdr-left">
                <div className="gd-hdr-icon"><Award size={16} /></div>
                <h2 className="gd-ttl">Top Rated This Week</h2>
              </div>
            </div>
            <Link href={`/guest/listings/${topRated.id}`} className="gd-highlight-card">
              <div className="gd-hi-img-wrap">
                <img src={topRated.image} alt={topRated.title} className="gd-hi-img" />
                <div className="gd-hi-badge"><Sparkles size={13} /> Top Rated</div>
              </div>
              <div className="gd-hi-body">
                <div className="gd-hi-eyebrow">Featured Property</div>
                <h3 className="gd-hi-title">{topRated.title}</h3>
                <p className="gd-hi-desc">{topRated.description}</p>
                <div className="gd-hi-meta">
                  <span className="gd-hi-meta-item">
                    <Star size={13} fill="oklch(0.7 0.18 55)" color="oklch(0.7 0.18 55)" />
                    {topRated.rating} ({topRated.reviews} reviews)
                  </span>
                  <span className="gd-hi-meta-item"><MapPin size={13} color="var(--p)" />{topRated.city}</span>
                  <span className="gd-hi-meta-item"><Users size={13} />{topRated.maxGuests} guests</span>
                  <span className="gd-hi-meta-item"><Bed size={13} />{topRated.bedrooms} bed{topRated.bedrooms > 1 ? 's' : ''}</span>
                </div>
                <span className="gd-hi-cta">View Property <ArrowRight size={15} /></span>
              </div>
            </Link>
          </div>
        )}

        {/* ══════════════════════════════════
            TRENDING DESTINATIONS
        ══════════════════════════════════ */}
        <div className="gd-section gd-up gd-d7" style={{ marginTop: 48 }}>
          <div className="gd-hdr">
            <div className="gd-hdr-left">
              <div className="gd-hdr-icon"><TrendingUp size={16} /></div>
              <h2 className="gd-ttl">Trending Destinations</h2>
            </div>
            <a href="#" className="gd-see-all">See all <ArrowRight size={14} /></a>
          </div>
          <div className="gd-scroll">
            {QUICK_DESTINATIONS.map(d => (
              <div key={d.city} className="gd-dest" onClick={() => setSearchQuery(d.city)}>
                <div className="gd-dest-img-wrap">
                  <img src={d.img} alt={d.city} className="gd-dest-img" />
                  <div className="gd-dest-overlay" />
                  <div className="gd-dest-city">{d.city}</div>
                  <div className="gd-dest-count">{d.listings}+</div>
                </div>
                <div className="gd-dest-country">{d.country}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ══════════════════════════════════
            SEARCH + CATEGORY FILTERS
        ══════════════════════════════════ */}
        <div className="gd-section gd-up gd-d7" style={{ marginTop: 48 }}>
          <div className="gd-hdr">
            <div className="gd-hdr-left">
              <div className="gd-hdr-icon"><Search size={16} /></div>
              <h2 className="gd-ttl">Browse Stays</h2>
            </div>
          </div>

          <div className="gd-search-bar">
            <span className="gd-search-icon-wrap"><Search size={16} /></span>
            <input
              className="gd-search-input"
              type="text"
              placeholder="Search by city, property name, or location…"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button className="gd-search-clear" onClick={() => setSearchQuery('')}>×</button>
            )}
          </div>

          <div className="gd-cats">
            {CATEGORIES.map(cat => (
              <button
                key={cat.key}
                className={`gd-pill ${activeCategory === cat.key ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat.key)}
              >
                <span>{cat.icon}</span>
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* ══════════════════════════════════
            LISTINGS GRID
        ══════════════════════════════════ */}
        <div className="gd-section" style={{ marginTop: 24, paddingBottom: 60 }}>
          <div className="gd-result-bar">
            <span className="gd-result-count">
              {filteredListings.length} {filteredListings.length === 1 ? 'property' : 'properties'}
            </span>
            <div className="gd-hdr-left">
              <h2 className="gd-ttl">
                {activeCategory === 'all' ? 'All Stays' : CATEGORIES.find(c => c.key === activeCategory)?.label}
              </h2>
            </div>
          </div>

          {filteredListings.length === 0 ? (
            <div className="gd-empty" style={{ marginTop: 40, textAlign: 'center' }}>
              <div className="gd-empty-icon" style={{ fontSize: '4rem', marginBottom: 20 }}>🔍</div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 700 }}>No matches found</h3>
              <p style={{ color: 'var(--muted)', marginBottom: 24 }}>Try adjusting your search or filters.</p>
              <button 
                className="gd-pill active" 
                onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <>
              <div className="gd-grid">
                {filteredListings.slice(0, visibleCount).map((listing, index) => {
                  return (
                    <StayCard
                      key={listing.id}
                      listing={listing}
                      index={index}
                      liked={liked}
                      likeAnimating={likeAnimating}
                      toggleLike={toggleLike}
                    />
                  );
                })}
              </div>

              {visibleCount < filteredListings.length && (
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: 48 }}>
                  <button 
                    className="gd-hi-cta" 
                    onClick={() => setVisibleCount(prev => prev + 6)}
                    style={{ padding: '14px 40px', fontSize: '1rem', borderRadius: '16px' }}
                  >
                    Load More Stays
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        {/* ══════════════════════════════════
            CUSTOMER CARE SUPPORT CARD
        ══════════════════════════════════ */}
        <div className="gd-section gd-up gd-d6" style={{ marginTop: 64 }}>
          <div className="gd-support">
            <div className="gd-support-left">
              <div className="gd-support-badge">
                <Headphones size={12} />
                24/7 Customer Support
              </div>
              <h2 className="gd-support-title">
                Need help?<br />
                We&apos;re <em>always here</em>.
              </h2>
              <p className="gd-support-desc">
                Our dedicated support team is available around the clock to help
                with bookings, cancellations, property issues, and anything else
                you need for a perfect stay.
              </p>
              <div className="gd-support-stats">
                <div>
                  <div className="gd-support-stat-val">&lt;2 min</div>
                  <div className="gd-support-stat-lbl">Avg. response time</div>
                </div>
                <div>
                  <div className="gd-support-stat-val">98%</div>
                  <div className="gd-support-stat-lbl">Satisfaction rate</div>
                </div>
                <div>
                  <div className="gd-support-stat-val">24/7</div>
                  <div className="gd-support-stat-lbl">Always available</div>
                </div>
              </div>
            </div>

            <div className="gd-support-right">
              <div className="gd-support-cards">
                <a href="#" className="gd-sc">
                  <div className="gd-sc-icon" style={{ background: 'oklch(0.93 0.03 11.87)' }}>
                    <MessageCircle size={20} color="oklch(0.4 0.155 11.87)" />
                  </div>
                  <div className="gd-sc-title">Live Chat</div>
                  <div className="gd-sc-sub">Chat with a support agent instantly</div>
                  <div className="gd-sc-tag" style={{ background: 'oklch(0.94 0.04 145)', color: 'oklch(0.4 0.14 145)' }}>● Online Now</div>
                </a>

                <a href="mailto:support@staylux.com" className="gd-sc">
                  <div className="gd-sc-icon" style={{ background: 'oklch(0.94 0.02 265)' }}>
                    <Mail size={20} color="oklch(0.45 0.14 265)" />
                  </div>
                  <div className="gd-sc-title">Email Support</div>
                  <div className="gd-sc-sub">support@staylux.com</div>
                  <div className="gd-sc-tag" style={{ background: 'oklch(0.94 0.02 265)', color: 'oklch(0.45 0.12 265)' }}>Reply in 2hrs</div>
                </a>

                <a href="tel:+1800STAYLUX" className="gd-sc">
                  <div className="gd-sc-icon" style={{ background: 'oklch(0.95 0.03 55)' }}>
                    <Phone size={20} color="oklch(0.55 0.15 55)" />
                  </div>
                  <div className="gd-sc-title">Phone</div>
                  <div className="gd-sc-sub">+1 (800) STAY-LUX</div>
                  <div className="gd-sc-tag" style={{ background: 'oklch(0.95 0.03 55)', color: 'oklch(0.5 0.14 55)' }}>Toll-free</div>
                </a>

                <a href="#" className="gd-sc">
                  <div className="gd-sc-icon" style={{ background: 'oklch(0.94 0.02 165)' }}>
                    <BookOpen size={20} color="oklch(0.4 0.12 165)" />
                  </div>
                  <div className="gd-sc-title">Help Centre</div>
                  <div className="gd-sc-sub">FAQs, guides & tutorials</div>
                  <div className="gd-sc-tag" style={{ background: 'oklch(0.94 0.02 165)', color: 'oklch(0.4 0.12 165)' }}>200+ articles</div>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════
            FOOTER
        ══════════════════════════════════ */}
        <Footer />

      </div>{/* end .gd */}

      <style jsx global>{`
        .gd-carousel-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.9);
          border: 1px solid rgba(0,0,0,0.05);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #222;
          cursor: pointer;
          opacity: 0;
          transition: all 0.2s ease;
          z-index: 5;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
        .gd-card-img-wrap:hover .gd-carousel-btn {
          opacity: 1;
        }
        .gd-carousel-btn:hover {
          background: #fff;
          transform: translateY(-50%) scale(1.1);
        }
        .gd-carousel-btn.prev { left: 8px; }
        .gd-carousel-btn.next { right: 8px; }
        
        .gd-dots {
          position: absolute;
          bottom: 12px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 6px;
          z-index: 5;
        }
        .gd-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.6);
          transition: all 0.2s ease;
        }
        .gd-dot.active {
          background: #fff;
          transform: scale(1.2);
        }

        .gd-rules-dropdown {
          position: relative;
          margin-top: 12px;
          border-top: 1px solid rgba(0,0,0,0.05);
          padding-top: 12px;
        }
        .gd-rules-toggle {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.8rem;
          font-weight: 600;
          color: oklch(0.55 0.18 30); /* fallback brand color */
          background: none;
          border: none;
          padding: 0;
          cursor: pointer;
          opacity: 0.8;
          transition: opacity 0.2s;
        }
        .gd-rules-toggle:hover {
          opacity: 1;
        }
        .gd-rules-content {
          margin-top: 8px;
          background: rgba(0,0,0,0.02);
          border-radius: 8px;
          padding: 10px;
          font-size: 0.75rem;
          color: #666;
          animation: slideDown 0.3s ease-out;
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-5px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .gd-rule-item {
          display: flex;
          align-items: flex-start;
          gap: 6px;
          margin-bottom: 4px;
        }
        .gd-rule-dot {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: oklch(0.55 0.18 30);
          margin-top: 6px;
          flex-shrink: 0;
        }
      `}</style>
    </>
  );
}

function StayCard({ listing, index, liked, likeAnimating, toggleLike }: any) {
  const [imgIdx, setImgIdx] = useState(0);
  const [showRules, setShowRules] = useState(false);

  const nextImg = (e: React.MouseEvent) => {
    e.preventDefault(); e.stopPropagation();
    setImgIdx((prev) => (prev + 1) % listing.images.length);
  };
  const prevImg = (e: React.MouseEvent) => {
    e.preventDefault(); e.stopPropagation();
    setImgIdx((prev) => (prev - 1 + listing.images.length) % listing.images.length);
  };
  const toggleRules = (e: React.MouseEvent) => {
    e.preventDefault(); e.stopPropagation();
    setShowRules(!showRules);
  };

  return (
    <div className={`gd-card-outer gd-up gd-d${Math.min(index + 1, 6)}`}>
      <Link href={`/guest/listings/${listing.id}`} className="gd-card" style={{ display: 'block' }}>
        <div className="gd-card-img-wrap">
          <img src={listing.images[imgIdx]} alt={listing.title} className="gd-card-img" />
          
          {listing.images.length > 1 && (
            <>
              <button className="gd-carousel-btn prev" onClick={prevImg}><ChevronLeft size={14} /></button>
              <button className="gd-carousel-btn next" onClick={nextImg}><ChevronRight size={14} /></button>
              <div className="gd-dots">
                {listing.images.map((_: any, i: number) => (
                  <div key={i} className={`gd-dot ${i === imgIdx ? 'active' : ''}`} />
                ))}
              </div>
            </>
          )}

          <button
            className={`gd-like ${likeAnimating === listing.id ? 'popping' : ''}`}
            onClick={e => { e.preventDefault(); e.stopPropagation(); toggleLike(listing.id); }}
          >
            <Heart size={16} fill={liked.has(listing.id) ? '#FF385C' : 'none'} color={liked.has(listing.id) ? '#FF385C' : '#888'} />
          </button>
          <span className="gd-card-badge">{listing.type}</span>
          <div className="gd-card-price-tag">${listing.pricePerNight} <span>/ night</span></div>
        </div>

        <div className="gd-card-body">
          <div className="gd-card-row1">
            <h3 className="gd-card-title">{listing.title}</h3>
            <div className="gd-rating"><Star size={12} fill="currentColor" />{listing.rating}</div>
          </div>
          <div className="gd-card-loc"><MapPin size={12} />{listing.city}, {listing.country}</div>
          <div className="gd-card-amenities">
            <span className="gd-amenity"><Users size={12} />{listing.maxGuests} guests</span>
            <span className="gd-amenity"><Bed size={12} />{listing.bedrooms} bed{listing.bedrooms > 1 ? 's' : ''}</span>
          </div>

          <div className="gd-rules-dropdown">
            <button className="gd-rules-toggle" onClick={toggleRules}>
              <FileText size={14} /> Rules & Guide <ChevronDown size={14} style={{ transform: showRules ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
            </button>
            {showRules && (
              <div className="gd-rules-content" onClick={e => e.stopPropagation()}>
                {listing.rules && listing.rules.length > 0 ? (
                  listing.rules.map((rule: string, i: number) => (
                    <div key={i} className="gd-rule-item">
                      <div className="gd-rule-dot" />
                      <span>{rule}</span>
                    </div>
                  ))
                ) : (
                  <p>Standard house rules apply. Please respect the property and neighbors.</p>
                )}
                {listing.hostGuide && (
                  <div style={{ marginTop: 8, paddingTop: 8, borderTop: '1px solid rgba(0,0,0,0.05)', fontStyle: 'italic' }}>
                    &ldquo;{listing.hostGuide}&rdquo;
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="gd-card-foot" style={{ marginTop: 12 }}>
            <div className="gd-card-price">${listing.pricePerNight}<span>/ night</span></div>
            <div className="gd-card-reviews">{listing.reviews} reviews</div>
          </div>
        </div>
      </Link>
    </div>
  );
}