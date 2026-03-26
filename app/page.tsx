import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import LogoBadge from "@/components/shared/logo-badge";
import HeroCarousel from "@/components/landing/hero-carousel";
import TestimonialCarousel from "@/components/landing/testimonial-carousel";
import { Footer } from "@/components/shared/footer";
import {
  ShieldCheck, Map, Users, Star, ArrowRight, Search,
  Building2, Crown, Heart, Quote, CheckCircle2,
  Globe, TrendingUp, Zap, Phone, Mail, Twitter,
  Instagram, Linkedin, Facebook, ChevronRight,
  Award, Clock, DollarSign, Wifi, Car, Coffee,
  Waves, Mountain, TreePine, MapPin,
} from "lucide-react";

// ─── Static data ─────────────────────────────────────────────────────────────

const FEATURES = [
  {
    icon: <Building2 className="w-6 h-6" />,
    title: "Curated Collection",
    description: "Browse thousands of hand-picked properties — from luxury city penthouses to secluded eco-lodges, every listing is personally vetted.",
    stat: "50K+", statLabel: "listings",
    badge: "Most visited",
  },
  {
    icon: <ShieldCheck className="w-6 h-6" />,
    title: "Secure & Verified",
    description: "End-to-end encrypted payments and 24/7 support. Every host is personally verified and every property independently reviewed.",
    stat: "100%", statLabel: "verified",
    badge: "Trust guaranteed",
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Local Connection",
    description: "Connect with hosts who share insider knowledge, tips, and experiences — ensuring your stay is truly extraordinary.",
    stat: "12K+", statLabel: "expert hosts",
    badge: "Community driven",
  },
];

const DESTINATIONS = [
  { city: "Nairobi",   country: "Kenya",        img: "https://images.unsplash.com/photo-1611348524140-53c9a25263d6?w=800&q=80",  properties: 340, tag: "Safari Gateway" },
  { city: "Santorini", country: "Greece",       img: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&q=80",  properties: 218, tag: "Iconic Views" },
  { city: "Kyoto",     country: "Japan",        img: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80",  properties: 176, tag: "Cultural Gem" },
  { city: "Cape Town", country: "South Africa", img: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=800&q=80",  properties: 290, tag: "Coastal Magic" },
];

const TESTIMONIALS = [
  {
    name: "Amara Osei",      location: "Accra, Ghana",    avatar: "AO", color: "#FF385C",
    text: "Found the most incredible villa with a rooftop pool in Santorini. The booking process was seamless and the host was wonderful beyond words.",
    stay: "Villa Azzurra, Santorini", rating: 5,
  },
  {
    name: "Lena Müller",     location: "Berlin, Germany", avatar: "LM", color: "#6366f1",
    text: "I travel for work every month. This platform saves me hours — the filters are precise and the verified reviews are actually trustworthy.",
    stay: "Sky Loft, Tokyo", rating: 5,
  },
  {
    name: "James Kariuki",   location: "Nairobi, Kenya",  avatar: "JK", color: "#0ea5e9",
    text: "Listed my Nairobi apartment and had bookings within the first week. The host dashboard makes managing everything completely effortless.",
    stay: "Westlands Studio, Nairobi", rating: 5,
  },
];

const STATS = [
  { value: "2M+", label: "Happy Guests",  icon: "👥" },
  { value: "120+", label: "Countries",   icon: "🌍" },
  { value: "50K+", label: "Properties",  icon: "🏠" },
  { value: "4.9★", label: "Avg. Rating", icon: "⭐" },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    icon: <Search className="w-6 h-6" />,
    title: "Search & Discover",
    desc: "Filter by destination, dates, budget and property type. Find your perfect match from thousands of verified listings.",
    color: "#FF385C",
  },
  {
    step: "02",
    icon: <ShieldCheck className="w-6 h-6" />,
    title: "Book with Confidence",
    desc: "Secure your stay with our encrypted checkout. Instant confirmation, flexible cancellation, and price protection built in.",
    color: "#6366f1",
  },
  {
    step: "03",
    icon: <Crown className="w-6 h-6" />,
    title: "Experience & Explore",
    desc: "Arrive to a fully prepared home. Get insider tips from your host and live the destination like a local.",
    color: "#0ea5e9",
  },
];

const PROPERTY_TYPES = [
  { label: "Beachfront",  icon: <Waves   className="w-5 h-5" />, count: "2.1K" },
  { label: "Mountain",    icon: <Mountain className="w-5 h-5" />, count: "1.8K" },
  { label: "Forest",      icon: <TreePine className="w-5 h-5" />, count: "950"  },
  { label: "City",        icon: <Building2 className="w-5 h-5"/>, count: "12K"  },
  { label: "Desert",      icon: <MapPin   className="w-5 h-5" />, count: "430"  },
  { label: "Countryside", icon: <Globe    className="w-5 h-5" />, count: "3.2K" },
];

const PERKS = [
  { icon: <Wifi      className="w-5 h-5" />, label: "High-Speed WiFi",     desc: "All listings include verified fast internet" },
  { icon: <Car       className="w-5 h-5" />, label: "Free Parking",         desc: "Available at 78% of our properties" },
  { icon: <Coffee    className="w-5 h-5" />, label: "Welcome Breakfast",    desc: "Many hosts offer complimentary morning meals" },
  { icon: <Clock     className="w-5 h-5" />, label: "Flexible Check-in",    desc: "Self check-in available on most properties" },
  { icon: <Award     className="w-5 h-5" />, label: "Top Host Badge",       desc: "Look for our verified top-rated hosts" },
  { icon: <DollarSign className="w-5 h-5"/>, label: "Price Match",          desc: "Found cheaper? We'll match any verified price" },
];

const MARQUEE_CITIES = [
  "Nairobi", "Santorini", "Kyoto", "Cape Town", "Paris",
  "Bali", "New York", "Dubai", "London", "Marrakech", "Sydney", "Lisbon",
  "Amsterdam", "Barcelona", "Bangkok", "Singapore", "Maldives", "Istanbul",
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function Home() {
  const session = await auth();

  if (session) {
    if (session.user?.role === "guest")      redirect("/guest");
    else if (session.user?.role === "host")  redirect("/host");
    else if (session.user?.role === "admin") redirect("/admin");
    else redirect("/auth/login");
  }

  return (
    <>
      <style>{`
        /* ══════════════════════════════════════════
           TOKENS + RESET
        ══════════════════════════════════════════ */

        :root {
          --p:        oklch(0.4 0.155 11.87);
          --p-hover:  oklch(0.36 0.16 11.87);
          --p-light:  oklch(0.6 0.155 11.87);
          --p-pale:   oklch(0.96 0.028 11.87);
          --p-ring:   oklch(0.4 0.155 11.87 / 0.14);
          --bg:       oklch(0.99 0.001 0);
          --bg-warm:  oklch(0.975 0.006 60);
          --fg:       oklch(0.1 0.001 0);
          --muted:    oklch(0.52 0.006 0);
          --subtle:   oklch(0.70 0.004 0);
          --border:   oklch(0.9 0.002 0);
          --border-s: oklch(0.85 0.004 0);
          --card:     oklch(1 0 0);
          --sh-s:     0 2px 8px  oklch(0.4 0.155 11.87 / 0.07);
          --sh-m:     0 8px 32px oklch(0.4 0.155 11.87 / 0.11);
          --sh-l:     0 20px 64px oklch(0.4 0.155 11.87 / 0.15);
          --sh-xl:    0 32px 80px oklch(0.4 0.155 11.87 / 0.18);
        }

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        html { scroll-behavior: smooth; }

        body {
          font-family: var(--font-sans), system-ui, sans-serif;
          background: var(--bg);
          color: var(--fg);
          overflow-x: hidden;
          -webkit-font-smoothing: antialiased;
        }

        /* ══════════════════════════════════════════
           KEYFRAMES
        ══════════════════════════════════════════ */
        @keyframes lpFadeUp   { from{opacity:0;transform:translateY(36px)} to{opacity:1;transform:translateY(0)} }
        @keyframes lpFadeIn   { from{opacity:0} to{opacity:1} }
        @keyframes lpSlideR   { from{opacity:0;transform:translateX(-28px)} to{opacity:1;transform:translateX(0)} }
        @keyframes lpFloat    { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes lpMarquee  { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        @keyframes lpBlob     { 0%,100%{border-radius:60% 40% 30% 70%/60% 30% 70% 40%} 50%{border-radius:30% 60% 70% 40%/50% 60% 30% 60%} }
        @keyframes lpShimmer  { 0%{background-position:-200% center} 100%{background-position:200% center} }
        @keyframes lpPing     { 0%,100%{transform:scale(1);opacity:1} 50%{transform:scale(1.4);opacity:.5} }
        @keyframes lpGlow     { 0%,100%{box-shadow:0 0 24px var(--p-ring)} 50%{box-shadow:0 0 40px oklch(0.4 0.155 11.87/0.22)} }
        @keyframes lpCountUp  { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
        @keyframes lpSpinSlow { to{transform:rotate(360deg)} }

        .lp-up   { animation: lpFadeUp  0.7s cubic-bezier(.22,.68,0,1.15) both; }
        .lp-in   { animation: lpFadeIn  0.7s ease both; }
        .lp-slide{ animation: lpSlideR  0.6s ease both; }

        .d1  { animation-delay: 0.05s; }
        .d2  { animation-delay: 0.10s; }
        .d3  { animation-delay: 0.15s; }
        .d4  { animation-delay: 0.20s; }
        .d5  { animation-delay: 0.25s; }
        .d6  { animation-delay: 0.30s; }

        /* ══════════════════════════════════════════
           HEADER
        ══════════════════════════════════════════ */
        .lp-header {
          position: fixed; top: 0; width: 100%; z-index: 200;
          background: color-mix(in oklch, var(--bg) 88%, transparent);
          backdrop-filter: blur(22px) saturate(1.5);
          -webkit-backdrop-filter: blur(22px) saturate(1.5);
          border-bottom: 1px solid var(--border);
          transition: all 0.3s;
        }

        .lp-header-inner {
          max-width: 1360px; margin: 0 auto;
          padding: 0 20px; height: 68px;
          display: flex; align-items: center; justify-content: space-between;
          gap: 16px;
        }

        @media (min-width: 768px) {
          .lp-header-inner { padding: 0 32px; height: 80px; }
        }

        .lp-logo {
          display: flex; align-items: center; gap: 10px;
          text-decoration: none; transition: transform 0.22s;
        }
        .lp-logo:hover { transform: scale(1.02); }

        .lp-logo-name {
          font-family: var(--font-sans), sans-serif;
          font-size: 1.15rem; font-weight: 800;
          color: var(--fg); letter-spacing: -0.04em;
          line-height: 1;
        }

        @media (min-width: 640px) { .lp-logo-name { font-size: 1.4rem; } }

        .lp-logo-name span { color: var(--p); }

        .lp-nav { display: flex; align-items: center; gap: 4px; }
        @media (min-width: 640px) { .lp-nav { gap: 8px; } }

        /* hidden on small screens */
        .lp-nav-links {
          display: none;
        }
        @media (min-width: 900px) {
          .lp-nav-links {
            display: flex; align-items: center; gap: 2px; margin-right: 8px;
          }
        }

        .lp-nav-link {
          padding: 8px 14px; border-radius: 9px;
          font-size: 0.88rem; font-weight: 500;
          color: var(--muted); text-decoration: none;
          transition: all 0.2s;
        }
        .lp-nav-link:hover { color: var(--p); background: var(--p-pale); }

        .lp-btn-ghost {
          padding: 8px 16px; border-radius: 9px;
          font-size: 0.85rem; font-weight: 500;
          color: var(--fg); text-decoration: none;
          border: 1.5px solid var(--border);
          transition: all 0.2s; white-space: nowrap;
        }
        .lp-btn-ghost:hover { border-color: var(--p); color: var(--p); background: var(--p-pale); }

        .lp-btn-primary {
          padding: 9px 20px; border-radius: 9px;
          font-size: 0.85rem; font-weight: 700;
          color: #fff; background: var(--p); border: none;
          cursor: pointer; transition: all 0.22s;
          text-decoration: none; white-space: nowrap;
          box-shadow: var(--sh-s);
          display: inline-flex; align-items: center; gap: 6px;
        }
        @media (min-width: 640px) {
          .lp-btn-primary { padding: 10px 24px; font-size: 0.9rem; }
        }
        .lp-btn-primary:hover {
          background: var(--p-hover);
          transform: translateY(-1px);
          box-shadow: var(--sh-m);
        }

        /* ══════════════════════════════════════════
           SHARED SECTION LAYOUT
        ══════════════════════════════════════════ */
        .lp-section {
          padding: 80px 20px;
          max-width: 1360px; margin: 0 auto;
        }
        @media (min-width: 768px) { .lp-section { padding: 120px 32px; } }

        .lp-section-tag {
          display: inline-flex; align-items: center; gap: 8px;
          font-size: 0.72rem; font-weight: 700;
          letter-spacing: 0.11em; text-transform: uppercase;
          color: var(--p); margin-bottom: 16px;
        }
        .lp-section-tag::before {
          content: '';
          width: 28px; height: 2px;
          background: var(--p); border-radius: 2px;
          flex-shrink: 0;
        }

        .lp-section-title {
          font-family: var(--font-sans), serif;
          font-size: clamp(2.2rem, 5vw, 3.8rem);
          font-weight: 600; letter-spacing: -0.02em;
          line-height: 1.1; color: var(--fg);
        }

        .lp-section-desc {
          font-size: 1rem; color: var(--muted);
          margin-top: 18px; line-height: 1.75;
          font-weight: 300; max-width: 540px;
        }
        @media (min-width: 768px) { .lp-section-desc { font-size: 1.1rem; } }

        /* ══════════════════════════════════════════
           STATS STRIP
        ══════════════════════════════════════════ */
        .lp-stats-strip {
          background: var(--fg);
          padding: 48px 20px;
          position: relative; overflow: hidden;
        }

        .lp-stats-strip::before {
          content: '';
          position: absolute; inset: 0;
          background: radial-gradient(ellipse 50% 80% at 50% 50%, oklch(0.4 0.155 11.87 / 0.18) 0%, transparent 70%);
          pointer-events: none;
        }

        @media (min-width: 768px) { .lp-stats-strip { padding: 64px 32px; } }

        .lp-stats-inner {
          max-width: 1360px; margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 32px 20px;
        }
        @media (min-width: 640px) { .lp-stats-inner { grid-template-columns: repeat(4, 1fr); gap: 24px; } }

        .lp-stat-item {
          text-align: center;
          position: relative; z-index: 1;
          animation: lpCountUp 0.7s ease both;
        }

        .lp-stat-emoji { font-size: 1.5rem; margin-bottom: 6px; display: block; }

        .lp-stat-value {
          font-family: var(--font-sans), serif;
          font-size: clamp(2.4rem, 5vw, 3.6rem);
          font-weight: 700; color: #fff; line-height: 1;
          letter-spacing: -0.02em;
        }

        .lp-stat-label {
          font-size: 0.78rem; color: rgba(255,255,255,0.55);
          margin-top: 6px; text-transform: uppercase;
          letter-spacing: 0.08em;
        }

        /* ══════════════════════════════════════════
           MARQUEE
        ══════════════════════════════════════════ */
        .lp-marquee-wrap {
          overflow: hidden;
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
          padding: 18px 0; background: var(--bg-warm);
        }

        .lp-marquee-track {
          display: flex; gap: 0; width: max-content;
          animation: lpMarquee 32s linear infinite;
        }
        .lp-marquee-track:hover { animation-play-state: paused; }

        .lp-marquee-item {
          display: inline-flex; align-items: center; gap: 10px;
          font-size: 0.88rem; font-weight: 500; color: var(--subtle);
          white-space: nowrap; padding: 0 28px;
          letter-spacing: 0.02em;
          transition: color 0.2s;
        }
        .lp-marquee-item:hover { color: var(--p); }

        .lp-marquee-dot {
          width: 5px; height: 5px; border-radius: 50%;
          background: var(--p); flex-shrink: 0;
          animation: lpPing 2.5s ease-in-out infinite;
        }

        /* ══════════════════════════════════════════
           FEATURES
        ══════════════════════════════════════════ */
        .lp-features-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 18px; margin-top: 48px;
        }
        @media (min-width: 640px)  { .lp-features-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (min-width: 1000px) { .lp-features-grid { grid-template-columns: repeat(3, 1fr); } }

        .lp-feature-card {
          padding: 32px; border-radius: 20px;
          border: 1px solid var(--border);
          background: var(--card);
          position: relative; overflow: hidden;
          transition: all 0.35s cubic-bezier(.22,.68,0,1.15);
        }

        .lp-feature-card::before {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(135deg, var(--p-pale) 0%, transparent 55%);
          opacity: 0; transition: opacity 0.35s; border-radius: inherit;
        }

        .lp-feature-card::after {
          content: '';
          position: absolute;
          top: 0; left: 12px; right: 12px; height: 2px;
          background: linear-gradient(90deg, transparent, var(--p), transparent);
          opacity: 0; transition: opacity 0.35s;
        }

        .lp-feature-card:hover {
          transform: translateY(-8px);
          box-shadow: var(--sh-l);
          border-color: color-mix(in oklch, var(--p) 28%, var(--border));
        }
        .lp-feature-card:hover::before { opacity: 1; }
        .lp-feature-card:hover::after  { opacity: 1; }

        .lp-feature-badge {
          position: absolute; top: 18px; right: 18px;
          padding: 3px 10px; border-radius: 100px;
          background: var(--p-pale); color: var(--p);
          font-size: 0.66rem; font-weight: 700;
          letter-spacing: 0.06em; text-transform: uppercase;
        }

        .lp-feature-icon {
          width: 52px; height: 52px; border-radius: 14px;
          background: var(--p-pale); color: var(--p);
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 20px; position: relative; z-index: 1;
          transition: transform 0.3s;
        }
        .lp-feature-card:hover .lp-feature-icon { transform: scale(1.1) rotate(-4deg); }

        .lp-feature-title {
          font-size: 1.15rem; font-weight: 700;
          color: var(--fg); margin-bottom: 10px;
          position: relative; z-index: 1;
        }

        .lp-feature-desc {
          font-size: 0.88rem; line-height: 1.72;
          color: var(--muted); position: relative; z-index: 1;
          margin-bottom: 24px;
        }

        .lp-feature-stat {
          padding-top: 20px;
          border-top: 1px solid var(--border);
          display: flex; align-items: baseline; gap: 6px;
          position: relative; z-index: 1;
        }

        .lp-feature-stat-val {
          font-family: var(--font-sans), serif;
          font-size: 2rem; font-weight: 700; color: var(--p);
        }

        .lp-feature-stat-lbl {
          font-size: 0.78rem; color: var(--muted);
          text-transform: uppercase; letter-spacing: 0.06em;
        }

        /* ══════════════════════════════════════════
           HOW IT WORKS
        ══════════════════════════════════════════ */
        .lp-hiw-section {
          background: var(--bg-warm);
          padding: 80px 20px;
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
        }
        @media (min-width: 768px) { .lp-hiw-section { padding: 120px 32px; } }

        .lp-hiw-inner { max-width: 1360px; margin: 0 auto; }

        .lp-hiw-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 28px; margin-top: 56px;
          position: relative;
        }
        @media (min-width: 768px) { .lp-hiw-grid { grid-template-columns: repeat(3, 1fr); gap: 32px; } }

        /* Connector line between steps (desktop) */
        @media (min-width: 768px) {
          .lp-hiw-grid::before {
            content: '';
            position: absolute;
            top: 42px; left: calc(33.33% + 16px); right: calc(33.33% + 16px);
            height: 1.5px;
            background: linear-gradient(90deg, transparent, var(--border) 20%, var(--border) 80%, transparent);
          }
        }

        .lp-hiw-card {
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 22px; padding: 36px;
          position: relative; transition: all 0.3s;
        }

        .lp-hiw-card:hover { transform: translateY(-6px); box-shadow: var(--sh-m); }

        .lp-hiw-step-num {
          font-family: var(--font-sans), serif;
          font-size: 4.5rem; font-weight: 700; line-height: 1;
          color: var(--p); opacity: 0.1;
          position: absolute; top: 20px; right: 24px;
          letter-spacing: -0.04em; pointer-events: none;
        }

        .lp-hiw-icon-wrap {
          width: 52px; height: 52px; border-radius: 14px;
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 20px; position: relative; z-index: 1;
        }

        .lp-hiw-step-label {
          font-size: 0.68rem; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.1em;
          margin-bottom: 8px; opacity: 0.8;
        }

        .lp-hiw-title {
          font-size: 1.2rem; font-weight: 700;
          color: var(--fg); margin-bottom: 12px;
        }

        .lp-hiw-desc {
          font-size: 0.88rem; line-height: 1.72; color: var(--muted);
        }

        /* ══════════════════════════════════════════
           PROPERTY TYPES
        ══════════════════════════════════════════ */
        .lp-types-section { padding: 80px 20px 0; max-width: 1360px; margin: 0 auto; }
        @media (min-width: 768px) { .lp-types-section { padding: 100px 32px 0; } }

        .lp-types-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px; margin-top: 36px;
        }
        @media (min-width: 640px) { .lp-types-grid { grid-template-columns: repeat(6, 1fr); } }

        .lp-type-card {
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          gap: 8px;
          padding: 20px 12px;
          border-radius: 16px;
          border: 1.5px solid var(--border);
          background: var(--card);
          cursor: pointer; transition: all 0.25s;
          text-decoration: none; color: inherit;
        }

        .lp-type-card:hover {
          border-color: var(--p); background: var(--p-pale);
          transform: translateY(-4px); box-shadow: var(--sh-s);
        }

        .lp-type-icon {
          width: 42px; height: 42px; border-radius: 11px;
          background: var(--p-pale); color: var(--p);
          display: flex; align-items: center; justify-content: center;
          transition: transform 0.3s;
        }
        .lp-type-card:hover .lp-type-icon { transform: scale(1.12); }

        .lp-type-label {
          font-size: 0.78rem; font-weight: 600; color: var(--fg);
          text-align: center;
        }

        .lp-type-count {
          font-size: 0.68rem; color: var(--muted);
        }

        /* ══════════════════════════════════════════
           DESTINATIONS
        ══════════════════════════════════════════ */
        .lp-dest-section { padding: 80px 20px; max-width: 1360px; margin: 0 auto; }
        @media (min-width: 768px) { .lp-dest-section { padding: 120px 32px; } }

        .lp-dest-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px; margin-top: 48px;
        }

        @media (min-width: 640px) {
          .lp-dest-grid {
            grid-template-columns: 1.5fr 1fr;
            grid-template-rows: 300px 300px;
          }
          .lp-dest-card:first-child { grid-row: span 2; }
        }

        @media (min-width: 1024px) {
          .lp-dest-grid {
            grid-template-columns: 1.5fr 1fr 1fr;
            grid-template-rows: 260px 260px;
          }
          .lp-dest-card:first-child { grid-row: span 2; }
          .lp-dest-card:nth-child(2) { grid-column: 2; }
          .lp-dest-card:nth-child(3) { grid-column: 3; }
          .lp-dest-card:nth-child(4) { grid-column: 2 / 4; }
        }

        .lp-dest-card {
          position: relative; border-radius: 20px; overflow: hidden;
          cursor: pointer; text-decoration: none;
          min-height: 220px;
        }

        .lp-dest-img {
          width: 100%; height: 100%; object-fit: cover; display: block;
          transition: transform 0.6s cubic-bezier(.22,.68,0,1.15);
        }
        .lp-dest-card:hover .lp-dest-img { transform: scale(1.07); }

        .lp-dest-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.1) 55%, transparent 100%);
          transition: opacity 0.3s;
        }

        .lp-dest-info {
          position: absolute; bottom: 22px; left: 22px; right: 22px;
          color: #fff;
        }

        .lp-dest-tag {
          display: inline-block;
          padding: 3px 10px; border-radius: 100px;
          background: oklch(0.4 0.155 11.87 / 0.85);
          font-size: 0.66rem; font-weight: 700;
          letter-spacing: 0.07em; text-transform: uppercase;
          margin-bottom: 7px;
        }

        .lp-dest-city {
          font-family: var(--font-sans), serif;
          font-size: 1.6rem; font-weight: 600; line-height: 1;
          text-shadow: 0 2px 10px rgba(0,0,0,0.3);
        }
        .lp-dest-card:first-child .lp-dest-city { font-size: 2.3rem; }

        .lp-dest-country {
          font-size: 0.8rem; opacity: 0.75; margin-top: 2px;
        }

        .lp-dest-props {
          display: inline-flex; align-items: center; gap: 5px;
          margin-top: 10px;
          padding: 4px 12px; border-radius: 100px;
          background: rgba(255,255,255,0.18);
          backdrop-filter: blur(10px);
          font-size: 0.72rem; font-weight: 600;
          border: 1px solid rgba(255,255,255,0.2);
        }

        /* ══════════════════════════════════════════
           PERKS STRIP
        ══════════════════════════════════════════ */
        .lp-perks {
          background: var(--bg-warm);
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
          padding: 64px 20px;
        }
        @media (min-width: 768px) { .lp-perks { padding: 80px 32px; } }

        .lp-perks-inner { max-width: 1360px; margin: 0 auto; }

        .lp-perks-header {
          display: flex; align-items: flex-end;
          justify-content: space-between;
          gap: 20px; flex-wrap: wrap; margin-bottom: 44px;
        }

        .lp-perks-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }
        @media (min-width: 640px) { .lp-perks-grid { grid-template-columns: repeat(3, 1fr); } }
        @media (min-width: 1024px) { .lp-perks-grid { grid-template-columns: repeat(6, 1fr); } }

        .lp-perk {
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 16px; padding: 20px 16px;
          transition: all 0.28s;
        }
        .lp-perk:hover { transform: translateY(-4px); box-shadow: var(--sh-m); border-color: color-mix(in oklch, var(--p) 25%, var(--border)); }

        .lp-perk-icon {
          width: 38px; height: 38px; border-radius: 10px;
          background: var(--p-pale); color: var(--p);
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 12px;
        }

        .lp-perk-label { font-size: 0.84rem; font-weight: 600; color: var(--fg); margin-bottom: 4px; }
        .lp-perk-desc  { font-size: 0.74rem; color: var(--muted); line-height: 1.5; }

        /* ══════════════════════════════════════════
           TESTIMONIALS
        ══════════════════════════════════════════ */
        .lp-testi-section {
          padding: 80px 20px;
          max-width: 1360px; margin: 0 auto;
        }
        @media (min-width: 768px) { .lp-testi-section { padding: 120px 32px; } }

        /* ══════════════════════════════════════════
           HOST CTA BANNER
        ══════════════════════════════════════════ */
        .lp-cta-wrap {
          padding: 0 20px 80px;
          max-width: 1360px; margin: 0 auto;
        }
        @media (min-width: 768px) { .lp-cta-wrap { padding: 0 32px 120px; } }

        .lp-cta {
          border-radius: 28px;
          background: var(--p);
          padding: 60px 32px;
          text-align: center;
          position: relative; overflow: hidden;
          color: #fff;
        }
        @media (min-width: 768px) { .lp-cta { padding: 100px 64px; border-radius: 36px; } }

        /* Decorative blobs */
        .lp-cta::before {
          content: '';
          position: absolute;
          width: 400px; height: 400px;
          border-radius: 50%;
          background: rgba(255,255,255,0.07);
          top: -160px; right: -100px;
          animation: lpBlob 12s ease-in-out infinite;
        }
        .lp-cta::after {
          content: '';
          position: absolute;
          width: 280px; height: 280px;
          border-radius: 50%;
          background: rgba(255,255,255,0.05);
          bottom: -100px; left: -60px;
          animation: lpBlob 16s ease-in-out infinite reverse;
        }

        .lp-cta-eyebrow {
          display: inline-flex; align-items: center; gap: 7px;
          padding: 5px 14px; border-radius: 100px;
          background: rgba(255,255,255,0.18);
          font-size: 0.7rem; font-weight: 700;
          letter-spacing: 0.1em; text-transform: uppercase;
          margin-bottom: 20px;
          border: 1px solid rgba(255,255,255,0.2);
          position: relative; z-index: 1;
        }

        .lp-cta-title {
          font-family: var(--font-sans), serif;
          font-size: clamp(2rem, 5vw, 3.6rem);
          font-weight: 600; letter-spacing: -0.02em;
          line-height: 1.12; margin-bottom: 18px;
          position: relative; z-index: 1;
        }

        .lp-cta-desc {
          font-size: 0.95rem; opacity: 0.82;
          max-width: 520px; margin: 0 auto 36px;
          line-height: 1.7;
          position: relative; z-index: 1;
        }
        @media (min-width: 768px) { .lp-cta-desc { font-size: 1.15rem; } }

        .lp-cta-checks {
          display: flex; align-items: center; justify-content: center;
          gap: 16px; flex-wrap: wrap;
          margin-bottom: 36px;
          position: relative; z-index: 1;
        }

        .lp-cta-check {
          display: flex; align-items: center; gap: 6px;
          font-size: 0.84rem; opacity: 0.88;
        }

        .lp-cta-btns {
          display: flex; align-items: center;
          justify-content: center; gap: 12px;
          flex-wrap: wrap;
          position: relative; z-index: 1;
        }

        .lp-btn-white {
          padding: 12px 28px; border-radius: 12px;
          background: #fff; color: var(--p);
          font-weight: 700; font-size: 0.92rem;
          text-decoration: none;
          display: inline-flex; align-items: center; gap: 8px;
          transition: all 0.28s;
          box-shadow: 0 4px 20px rgba(0,0,0,0.15);
        }
        .lp-btn-white:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 32px rgba(0,0,0,0.2);
        }

        .lp-btn-outline-white {
          padding: 12px 28px; border-radius: 12px;
          border: 1.5px solid rgba(255,255,255,0.45);
          background: transparent; color: #fff;
          font-weight: 600; font-size: 0.92rem;
          text-decoration: none;
          display: inline-flex; align-items: center; gap: 8px;
          transition: all 0.28s;
        }
        .lp-btn-outline-white:hover {
          background: rgba(255,255,255,0.12);
          border-color: rgba(255,255,255,0.7);
        }

        .lp-heart { color: oklch(0.6 0.155 11.87); display: inline-block; animation: lpFloat 2.5s ease-in-out infinite; }

        /* ══════════════════════════════════════════
           TRUST BAR (below hero)
        ══════════════════════════════════════════ */
        .lp-trust-bar {
          border-bottom: 1px solid var(--border);
          background: var(--card);
        }

        .lp-trust-bar-inner {
          max-width: 1360px; margin: 0 auto;
          padding: 0 20px;
          display: flex; overflow-x: auto;
          scrollbar-width: none;
        }
        .lp-trust-bar-inner::-webkit-scrollbar { display: none; }
        @media (min-width: 768px) { .lp-trust-bar-inner { padding: 0 32px; } }

        .lp-trust-item {
          flex: 0 0 auto;
          display: flex; align-items: center; gap: 10px;
          padding: 16px 22px;
          border-right: 1px solid var(--border);
          white-space: nowrap; transition: background 0.2s;
        }
        .lp-trust-item:last-child { border-right: none; }
        .lp-trust-item:hover { background: var(--p-pale); }

        .lp-trust-icon {
          width: 32px; height: 32px; border-radius: 8px;
          background: var(--p-pale); color: var(--p);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .lp-trust-label { font-size: 0.78rem; font-weight: 600; color: var(--fg); }
        .lp-trust-desc  { font-size: 0.7rem; color: var(--muted); }

        /* Push content below fixed header */
        .lp-page-body { padding-top: 68px; }
        @media (min-width: 768px) { .lp-page-body { padding-top: 80px; } }

        /* ══════════════════════════════════════════
           RESPONSIVE UTIL
        ══════════════════════════════════════════ */
        @media (max-width: 640px) {
          .lp-hiw-card { padding: 26px 22px; }
          .lp-feature-card { padding: 24px; }
          .lp-testi-card { padding: 24px; }
          .lp-cta { padding: 48px 22px; }
          .lp-cta::before, .lp-cta::after { display: none; }
          .lp-cta-btns { flex-wrap: nowrap; gap: 8px; width: 100%; }
          .lp-btn-white, .lp-btn-outline-white { 
            padding: 10px 14px; font-size: 0.82rem; flex: 1; 
            justify-content: center; text-align: center; white-space: nowrap; 
          }
        }
      `}</style>


      {/* ── Header ───────────────────────────────── */}
      <header className="lp-header">
        <div className="lp-header-inner">
          <Link href="/" className="lp-logo">
            <LogoBadge size={36} />
            <span className="lp-logo-name">Stay<span>Lux</span> Ke</span>
          </Link>

          <nav className="lp-nav">
            <div className="lp-nav-links">
              <a href="#features"      className="lp-nav-link">Features</a>
              <a href="#destinations"  className="lp-nav-link">Destinations</a>
              <a href="#how-it-works"  className="lp-nav-link">How It Works</a>
              <a href="#testimonials"  className="lp-nav-link">Reviews</a>
            </div>
            <a href="/auth/login"  className="lp-btn-ghost">Sign In</a>
            <a href="/auth/signup" className="lp-btn-primary">
              Join Free <ArrowRight className="w-4 h-4" />
            </a>
          </nav>
        </div>
      </header>

      <div className="lp-page-body">

        {/* ── Hero Carousel ────────────────────────── */}
        <HeroCarousel />

        {/* ── Trust Bar ────────────────────────────── */}
        <div className="lp-trust-bar lp-in">
          <div className="lp-trust-bar-inner">
            {[
              { icon: <ShieldCheck className="w-4 h-4" />, label: "Verified Properties",   desc: "Every listing personally inspected"  },
              { icon: <Award       className="w-4 h-4" />, label: "Best Price Guarantee",  desc: "We match any verified lower price"   },
              { icon: <Clock       className="w-4 h-4" />, label: "24 / 7 Support",         desc: "Real humans, not bots"                },
              { icon: <Globe       className="w-4 h-4" />, label: "120+ Countries",         desc: "Stay anywhere, anytime"              },
              { icon: <Zap         className="w-4 h-4" />, label: "Instant Confirmation",   desc: "No waiting, confirmed in seconds"    },
            ].map(({ icon, label, desc }) => (
              <div key={label} className="lp-trust-item">
                <div className="lp-trust-icon">{icon}</div>
                <div>
                  <div className="lp-trust-label">{label}</div>
                  <div className="lp-trust-desc">{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Stats Strip ──────────────────────────── */}
        <div className="lp-stats-strip">
          <div className="lp-stats-inner">
            {STATS.map((s, i) => (
              <div key={i} className="lp-stat-item" style={{ animationDelay: `${i * 0.1}s` }}>
                <span className="lp-stat-emoji">{s.icon}</span>
                <div className="lp-stat-value">{s.value}</div>
                <div className="lp-stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Marquee ──────────────────────────────── */}
        <div className="lp-marquee-wrap">
          <div className="lp-marquee-track">
            {[...Array(2)].flatMap((_, ci) =>
              MARQUEE_CITIES.map((city, j) => (
                <span key={`${city}-${ci}-${j}`} className="lp-marquee-item">
                  <span className="lp-marquee-dot" />
                  {city}
                </span>
              ))
            )}
          </div>
        </div>

        {/* ── Features ─────────────────────────────── */}
        <section id="features" className="lp-section">
          <div className="lp-section-tag">The StayLux Experience</div>
          <h2 className="lp-section-title">Beyond just a place<br />to rest your head.</h2>
          <p className="lp-section-desc">We combine luxury accessibility with local authenticity, ensuring every journey is as unique as you are.</p>

          <div className="lp-features-grid">
            {FEATURES.map((f, i) => (
              <div key={i} className={`lp-feature-card lp-up d${i + 1}`}>
                <div className="lp-feature-badge">{f.badge}</div>
                <div className="lp-feature-icon">{f.icon}</div>
                <h3 className="lp-feature-title">{f.title}</h3>
                <p className="lp-feature-desc">{f.description}</p>
                <div className="lp-feature-stat">
                  <span className="lp-feature-stat-val">{f.stat}</span>
                  <span className="lp-feature-stat-lbl">{f.statLabel}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Property Types ───────────────────────── */}
        <div className="lp-types-section lp-up">
          <div className="lp-section-tag">Browse by type</div>
          <h2 className="lp-section-title" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)' }}>Find your kind of stay</h2>
          <div className="lp-types-grid">
            {PROPERTY_TYPES.map(({ label, icon, count }) => (
              <Link key={label} href="/auth/login" className="lp-type-card">
                <div className="lp-type-icon">{icon}</div>
                <span className="lp-type-label">{label}</span>
                <span className="lp-type-count">{count} stays</span>
              </Link>
            ))}
          </div>
        </div>

        {/* ── How It Works ─────────────────────────── */}
        <section id="how-it-works" className="lp-hiw-section">
          <div className="lp-hiw-inner">
            <div className="lp-section-tag">Simple process</div>
            <h2 className="lp-section-title">Your journey, simplified.</h2>
            <p className="lp-section-desc">From first search to final checkout, we've designed every step to be effortless.</p>

            <div className="lp-hiw-grid">
              {HOW_IT_WORKS.map((step, i) => (
                <div key={i} className={`lp-hiw-card lp-up d${i + 1}`}>
                  <div className="lp-hiw-step-num">{step.step}</div>
                  <div className="lp-hiw-icon-wrap" style={{ background: `${step.color}18`, color: step.color }}>
                    {step.icon}
                  </div>
                  <div className="lp-hiw-step-label" style={{ color: step.color }}>Step {step.step}</div>
                  <h3 className="lp-hiw-title">{step.title}</h3>
                  <p className="lp-hiw-desc">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Destinations ─────────────────────────── */}
        <section id="destinations" className="lp-dest-section">
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
            <div>
              <div className="lp-section-tag">Destinations</div>
              <h2 className="lp-section-title">Where to next?</h2>
            </div>
            <Link href="/auth/login" style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.88rem', fontWeight: 600, color: 'var(--p)', textDecoration: 'none' }}>
              View all destinations <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="lp-dest-grid">
            {DESTINATIONS.map((d, i) => (
              <Link key={i} href="/auth/login" className={`lp-dest-card lp-up d${i + 1}`}>
                <img src={d.img} alt={d.city} className="lp-dest-img" loading="lazy" />
                <div className="lp-dest-overlay" />
                <div className="lp-dest-info">
                  <div className="lp-dest-tag">{d.tag}</div>
                  <div className="lp-dest-city">{d.city}</div>
                  <div className="lp-dest-country">{d.country}</div>
                  <div className="lp-dest-props">
                    <Crown className="w-3 h-3" />
                    {d.properties} Unique Stays
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ── Perks Strip ──────────────────────────── */}
        <div className="lp-perks">
          <div className="lp-perks-inner">
            <div className="lp-perks-header">
              <div>
                <div className="lp-section-tag">Included amenities</div>
                <h2 className="lp-section-title" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)' }}>Every stay comes with<br />the good stuff.</h2>
              </div>
              <p className="lp-section-desc" style={{ margin: 0, maxWidth: 340 }}>
                We filter for quality so you don't have to. These features are standard across our verified listings.
              </p>
            </div>
            <div className="lp-perks-grid">
              {PERKS.map(({ icon, label, desc }) => (
                <div key={label} className="lp-perk lp-up">
                  <div className="lp-perk-icon">{icon}</div>
                  <div className="lp-perk-label">{label}</div>
                  <div className="lp-perk-desc">{desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Testimonials ─────────────────────────── */}
        <section id="testimonials" className="lp-testi-section">
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
            <div>
              <div className="lp-section-tag">Testimonials</div>
              <h2 className="lp-section-title">Loved by our<br />community.</h2>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ display: 'flex', gap: 3 }}>
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4" fill="oklch(0.7 0.18 55)" color="oklch(0.7 0.18 55)" />)}
              </div>
              <span style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--fg)' }}>4.9</span>
              <span style={{ fontSize: '0.82rem', color: 'var(--muted)' }}>from 12,400+ reviews</span>
            </div>
          </div>

          <TestimonialCarousel testimonials={TESTIMONIALS} />
        </section>

        {/* ── Host CTA ─────────────────────────────── */}
        <div className="lp-cta-wrap">
          <div className="lp-cta lp-in">
            <div className="lp-cta-eyebrow">
              <TrendingUp className="w-3.5 h-3.5" />
              Hosting made simple
            </div>
            <h2 className="lp-cta-title">
              Turn your space into<br />your income stream.
            </h2>
            <p className="lp-cta-desc">
              Join 12,000+ hosts already earning with StayLux. We handle payments, support, and guest vetting — you just open the door.
            </p>
            <div className="lp-cta-checks">
              {["No listing fees", "Instant payouts", "24/7 host support", "Smart pricing tools"].map(check => (
                <div key={check} className="lp-cta-check">
                  <CheckCircle2 className="w-4 h-4" style={{ opacity: 0.9 }} />
                  {check}
                </div>
              ))}
            </div>
            <div className="lp-cta-btns">
              <Link href="/auth/signup" className="lp-btn-white">
                Start Hosting Today
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/auth/login" className="lp-btn-outline-white">
                Learn More
              </Link>
            </div>
          </div>
        </div>

        {/* ── Footer ───────────────────────────────── */}
          <Footer />
      </div>

    </>
  );
}