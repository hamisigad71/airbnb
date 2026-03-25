
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import LogoBadge from "@/components/logo-badge";

// ─── Static data ────────────────────────────────────────────────────────────

const FEATURES = [
  {
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="w-7 h-7"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
        />
      </svg>
    ),
    title: "Find Your Place",
    description:
      "Browse thousands of hand-picked properties — from cosy city studios to secluded mountain retreats.",
    stat: "50 K+",
    statLabel: "listings",
  },
  {
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="w-7 h-7"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
        />
      </svg>
    ),
    title: "Secure Booking",
    description:
      "End-to-end encrypted payments, instant confirmation and a 24/7 support team backing every reservation.",
    stat: "99.9%",
    statLabel: "uptime",
  },
  {
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="w-7 h-7"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
        />
      </svg>
    ),
    title: "Meet the Hosts",
    description:
      "Connect directly with verified local hosts who share insider knowledge to make every stay extraordinary.",
    stat: "12 K+",
    statLabel: "hosts",
  },
];

const DESTINATIONS = [
  {
    city: "Nairobi",
    country: "Kenya",
    img: "https://images.unsplash.com/photo-1611348524140-53c9a25263d6?w=600&q=80",
    properties: 340,
  },
  {
    city: "Santorini",
    country: "Greece",
    img: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=600&q=80",
    properties: 218,
  },
  {
    city: "Kyoto",
    country: "Japan",
    img: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&q=80",
    properties: 176,
  },
  {
    city: "Cape Town",
    country: "South Africa",
    img: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=600&q=80",
    properties: 290,
  },
];

const TESTIMONIALS = [
  {
    name: "Amara Osei",
    location: "Accra, Ghana",
    avatar: "AO",
    text: "Found the most incredible villa with a rooftop pool in Santorini. The booking process was seamless and the host was wonderful.",
    rating: 5,
  },
  {
    name: "Lena Müller",
    location: "Berlin, Germany",
    avatar: "LM",
    text: "I travel for work every month. This platform saves me hours — the filters are precise and the verified reviews are actually trustworthy.",
    rating: 5,
  },
  {
    name: "James Kariuki",
    location: "Nairobi, Kenya",
    avatar: "JK",
    text: "Listed my Nairobi apartment and had bookings within the first week. The host dashboard makes everything effortless.",
    rating: 5,
  },
];

const STATS = [
  { value: "2M+", label: "Happy Guests" },
  { value: "120+", label: "Countries" },
  { value: "50K+", label: "Properties" },
  { value: "4.9★", label: "Avg. Rating" },
];

// ─── Page ───────────────────────────────────────────────────────────────────

export default async function Home() {
  const session = await auth();

  if (session) {
    if (session.user?.role === "guest") redirect("/guest");
    else if (session.user?.role === "host") redirect("/host");
    else if (session.user?.role === "admin") redirect("/admin");
    else redirect("/auth/login");
  }

  return (
    <>
      {/* ── Global styles & keyframes ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&display=swap');

        :root {
          --p:       oklch(0.4 0.155 11.87);
          --p-light: oklch(0.6 0.155 11.87);
          --p-pale:  oklch(0.95 0.03 11.87);
          --bg:      oklch(0.99 0.001 0);
          --fg:      oklch(0.1 0.001 0);
          --muted:   oklch(0.55 0.005 0);
          --border:  oklch(0.88 0.002 0);
          --card:    oklch(1 0 0);
          --shadow:  oklch(0.4 0.155 11.87 / 0.12);
        }

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          font-family: var(--font-sans), sans-serif;
          background: var(--bg);
          color: var(--fg);
          overflow-x: hidden;
        }

        /* --- Animations --- */
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(32px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33%       { transform: translateY(-12px) rotate(1deg); }
          66%       { transform: translateY(-6px) rotate(-1deg); }
        }
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        @keyframes pulse-ring {
          0%   { transform: scale(1);    opacity: 0.4; }
          100% { transform: scale(1.55); opacity: 0; }
        }
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes blob {
          0%, 100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
          50%       { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
        }
        @keyframes navIn {
          from { opacity: 0; transform: translateY(-12px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* --- Utility --- */
        .font-display { font-family: var(--font-sans), sans-serif; }

        .anim-fadeUp   { animation: fadeUp 0.7s cubic-bezier(.22,.68,0,1.2) both; }
        .anim-fadeIn   { animation: fadeIn 0.6s ease both; }
        .anim-navIn    { animation: navIn  0.5s cubic-bezier(.22,.68,0,1.2) both; }

        .delay-100  { animation-delay: 0.10s; }
        .delay-200  { animation-delay: 0.20s; }
        .delay-300  { animation-delay: 0.30s; }
        .delay-400  { animation-delay: 0.40s; }
        .delay-500  { animation-delay: 0.50s; }
        .delay-600  { animation-delay: 0.60s; }
        .delay-700  { animation-delay: 0.70s; }
        .delay-800  { animation-delay: 0.80s; }

        /* ── Header ── */
        .site-header {
          position: sticky; top: 0; z-index: 50;
          background: color-mix(in oklch, var(--bg) 85%, transparent);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid var(--border);
          transition: all 0.3s ease;
        }
        .site-header .inner {
          max-width: 1400px; margin: auto; padding: 0 24px;
          height: 88px; display: flex; align-items: center; justify-content: space-between;
        }
        @media (max-width: 640px) {
          .site-header .inner { height: 72px; padding: 0 16px; }
        }
        .logo {
          font-family: var(--font-sans), sans-serif;
          font-size: clamp(1.3rem, 3.5vw, 2.2rem); font-weight: 800;
          color: var(--p);
          letter-spacing: -0.04em;
          display: flex; align-items: center; gap: 14px;
          transition: transform 0.2s;
        }
        .logo:hover { transform: scale(1.02); }
        @media (max-width: 900px) {
          .logo { gap: 10px; }
        }
        @media (max-width: 640px) {
          .logo { gap: 8px; }
          .logo-text { font-size: 1.1rem; }
        }
        .nav-links { display: flex; align-items: center; gap: 12px; }
        @media (max-width: 480px) {
          .nav-links .btn-ghost { display: none; }
        }
        .btn-ghost {
          padding: 8px 18px; border-radius: 8px;
          font-size: 0.9rem; font-weight: 500;
          color: var(--fg); background: transparent; border: none; cursor: pointer;
          transition: background 0.2s, color 0.2s;
          text-decoration: none;
        }
        .btn-ghost:hover { background: var(--p-pale); color: var(--p); }
        .btn-primary {
          padding: 8px 20px; border-radius: 8px;
          font-size: 0.9rem; font-weight: 600;
          color: #fff; background: var(--p); border: none; cursor: pointer;
          transition: opacity 0.2s, transform 0.15s;
          text-decoration: none; display: inline-flex; align-items: center;
        }
        .btn-primary:hover { opacity: 0.88; transform: translateY(-1px); }
        .btn-primary-lg {
          padding: 14px 36px; border-radius: 10px;
          font-size: 1rem; font-weight: 600;
          color: #fff; background: var(--p); border: none; cursor: pointer;
          transition: opacity 0.2s, transform 0.2s, box-shadow 0.2s;
          text-decoration: none; display: inline-flex; align-items: center; gap: 8px;
          box-shadow: 0 4px 24px var(--shadow);
        }
        .btn-primary-lg:hover {
          opacity: 0.88; transform: translateY(-2px);
          box-shadow: 0 8px 32px var(--shadow);
        }
        .btn-outline-lg {
          padding: 14px 36px; border-radius: 10px;
          font-size: 1rem; font-weight: 500;
          color: var(--p); background: transparent;
          border: 1.5px solid var(--p); cursor: pointer;
          transition: background 0.2s, transform 0.2s;
          text-decoration: none; display: inline-flex; align-items: center; gap: 8px;
        }
        .btn-outline-lg:hover { background: var(--p-pale); transform: translateY(-2px); }

        /* ── Hero ── */
        .hero {
          position: relative; overflow: hidden;
          min-height: calc(100vh - 68px);
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          padding: 80px 24px 60px;
          text-align: center;
        }

        /* Decorative blobs */
        .blob {
          position: absolute; border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
          filter: blur(70px); opacity: 0.18;
          pointer-events: none;
          animation: blob 10s ease-in-out infinite, float 8s ease-in-out infinite;
        }
        .blob-1 {
          width: 520px; height: 520px;
          background: var(--p); top: -120px; left: -140px;
          animation-delay: 0s, 0s;
        }
        .blob-2 {
          width: 400px; height: 400px;
          background: oklch(0.55 0.18 30); bottom: -100px; right: -100px;
          animation-delay: 5s, 3s;
        }
        .blob-3 {
          width: 260px; height: 260px;
          background: oklch(0.7 0.12 50); top: 30%; left: 55%;
          animation-delay: 2s, 5s;
        }

        /* Grid texture overlay */
        .hero::before {
          content: '';
          position: absolute; inset: 0;
          background-image:
            linear-gradient(var(--border) 1px, transparent 1px),
            linear-gradient(90deg, var(--border) 1px, transparent 1px);
          background-size: 48px 48px;
          opacity: 0.35;
        }

        .hero-badge {
          display: inline-flex; align-items: center; gap: 6px;
          background: var(--p-pale); color: var(--p);
          border: 1px solid color-mix(in oklch, var(--p) 25%, transparent);
          border-radius: 100px; padding: 5px 14px;
          font-size: 0.8rem; font-weight: 600; letter-spacing: 0.04em;
          text-transform: uppercase; margin-bottom: 24px;
        }
        .hero-badge-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: var(--p); display: inline-block;
          animation: pulse-ring 1.8s ease-out infinite;
        }

        .hero-title {
          font-family: var(--font-sans), sans-serif;
          font-size: clamp(3rem, 8vw, 6.5rem);
          font-weight: 700; line-height: 1.05;
          letter-spacing: -0.02em;
          color: var(--fg);
          max-width: 900px;
        }
        .hero-title-accent {
          background: linear-gradient(135deg, var(--p) 0%, oklch(0.55 0.18 30) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .hero-sub {
          max-width: 560px; margin: 20px auto 0;
          font-size: 1.15rem; line-height: 1.7;
          color: var(--muted); font-weight: 300;
        }
        .hero-cta { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; margin-top: 36px; }

        /* Search bar */
        .search-bar {
          margin-top: 48px;
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 12px;
          display: flex; gap: 8px; flex-wrap: wrap;
          box-shadow: 0 8px 40px var(--shadow);
          width: 100%; max-width: 800px;
          position: relative; z-index: 2;
        }
        .search-field {
          flex: 1 1 160px;
          display: flex; flex-direction: column;
          padding: 8px 16px; border-radius: 10px;
          background: var(--bg); border: 1px solid var(--border);
          cursor: text; transition: border-color 0.2s;
        }
        .search-field:hover { border-color: var(--p); }
        .search-field label {
          font-size: 0.7rem; font-weight: 600; letter-spacing: 0.06em;
          text-transform: uppercase; color: var(--muted);
        }
        .search-field span {
          font-size: 0.9rem; color: var(--fg); margin-top: 2px;
        }
        .search-btn {
          display: flex; align-items: center; gap: 8px;
          background: var(--p); color: #fff;
          border: none; border-radius: 10px; padding: 0 24px;
          font-size: 0.95rem; font-weight: 600; cursor: pointer;
          transition: opacity 0.2s, transform 0.15s;
          white-space: nowrap;
        }
        .search-btn:hover { opacity: 0.88; transform: scale(1.02); }

        /* Floating cards */
        .float-card {
          position: absolute; z-index: 3;
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 14px; padding: 12px 16px;
          box-shadow: 0 12px 40px var(--shadow);
          animation: float 6s ease-in-out infinite;
          display: flex; align-items: center; gap: 12px;
        }
        .float-card-left {
          left: 2%; top: 28%;
          animation-delay: 0s;
        }
        .float-card-right {
          right: 2%; top: 40%;
          animation-delay: 3s;
        }
        @media (max-width: 900px) {
          .float-card { display: none; }
        }
        .float-icon {
          width: 42px; height: 42px; border-radius: 10px;
          background: var(--p-pale); display: flex; align-items: center; justify-content: center;
          color: var(--p); font-size: 1.3rem; flex-shrink: 0;
        }
        .float-label { font-size: 0.75rem; color: var(--muted); }
        .float-value { font-size: 1rem; font-weight: 600; color: var(--fg); }

        /* ── Stats strip ── */
        .stats-strip {
          background: var(--p);
          padding: 48px 24px;
        }
        .stats-inner {
          max-width: 1280px; margin: auto;
          display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px;
          text-align: center;
        }
        @media (max-width: 640px) {
          .stats-inner { grid-template-columns: repeat(2, 1fr); }
        }
        .stat-value {
          font-family: var(--font-sans), sans-serif;
          font-size: 2.8rem; font-weight: 700; color: #fff; line-height: 1;
        }
        .stat-label { font-size: 0.85rem; color: rgba(255,255,255,0.72); margin-top: 4px; }

        /* ── Features ── */
        .section { padding: 100px 24px; max-width: 1280px; margin: auto; }
        .section-tag {
          display: inline-flex; align-items: center; gap: 6px;
          font-size: 0.78rem; font-weight: 600; letter-spacing: 0.08em;
          text-transform: uppercase; color: var(--p); margin-bottom: 14px;
        }
        .section-tag::before {
          content: ''; width: 24px; height: 2px; background: var(--p); border-radius: 2px;
        }
        .section-title {
          font-family: var(--font-sans), sans-serif;
          font-size: clamp(2rem, 5vw, 3.2rem);
          font-weight: 700; letter-spacing: -0.02em; line-height: 1.1;
        }
        .features-grid {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; margin-top: 56px;
        }
        @media (max-width: 900px) { .features-grid { grid-template-columns: 1fr; } }

        .feature-card {
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 20px; padding: 36px;
          transition: transform 0.3s, box-shadow 0.3s, border-color 0.3s;
          position: relative; overflow: hidden;
        }
        .feature-card::before {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(135deg, var(--p-pale) 0%, transparent 60%);
          opacity: 0; transition: opacity 0.3s;
        }
        .feature-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 60px var(--shadow);
          border-color: color-mix(in oklch, var(--p) 35%, transparent);
        }
        .feature-card:hover::before { opacity: 1; }
        .feature-icon {
          width: 54px; height: 54px; border-radius: 14px;
          background: var(--p-pale); color: var(--p);
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 20px; position: relative;
        }
        .feature-stat {
          margin-top: 24px; padding-top: 20px;
          border-top: 1px solid var(--border);
          display: flex; align-items: baseline; gap: 6px;
        }
        .feature-stat-value {
          font-family: var(--font-sans), sans-serif;
          font-size: 1.8rem; font-weight: 700; color: var(--p);
        }
        .feature-stat-label { font-size: 0.82rem; color: var(--muted); }

        /* ── Destinations ── */
        .destinations { padding: 0 24px 100px; max-width: 1280px; margin: auto; }
        .dest-grid {
          display: grid;
          grid-template-columns: 1.4fr 1fr 1fr 1fr;
          grid-template-rows: 280px 280px;
          gap: 16px; margin-top: 56px;
        }
        @media (max-width: 900px) {
          .dest-grid {
            grid-template-columns: 1fr 1fr;
            grid-template-rows: 220px 220px;
          }
        }
        @media (max-width: 540px) {
          .dest-grid { grid-template-columns: 1fr; grid-template-rows: auto; }
        }
        .dest-card {
          position: relative; border-radius: 18px; overflow: hidden;
          cursor: pointer;
        }
        .dest-card:first-child {
          grid-row: span 2;
        }
        .dest-img {
          width: 100%; height: 100%; object-fit: cover;
          transition: transform 0.5s cubic-bezier(.22,.68,0,1.2);
        }
        .dest-card:hover .dest-img { transform: scale(1.06); }
        .dest-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 50%);
        }
        .dest-info {
          position: absolute; bottom: 20px; left: 20px; color: #fff;
        }
        .dest-city {
          font-family: var(--font-sans), sans-serif;
          font-size: 1.4rem; font-weight: 700; line-height: 1;
        }
        .dest-card:first-child .dest-city { font-size: 2rem; }
        .dest-country { font-size: 0.8rem; opacity: 0.8; margin-top: 2px; }
        .dest-props {
          margin-top: 8px;
          display: inline-flex; align-items: center; gap: 5px;
          background: rgba(255,255,255,0.2); backdrop-filter: blur(8px);
          border-radius: 100px; padding: 3px 10px;
          font-size: 0.75rem;
        }

        /* ── Testimonials ── */
        .testimonials { background: var(--p-pale); padding: 100px 24px; }
        .testimonials-inner { max-width: 1280px; margin: auto; }
        .testi-grid {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; margin-top: 56px;
        }
        @media (max-width: 900px) { .testi-grid { grid-template-columns: 1fr; } }

        .testi-card {
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 20px; padding: 32px;
          transition: transform 0.3s, box-shadow 0.3s;
        }
        .testi-card:hover { transform: translateY(-4px); box-shadow: 0 16px 48px var(--shadow); }
        .stars { display: flex; gap: 3px; margin-bottom: 16px; }
        .star { color: oklch(0.75 0.18 55); font-size: 1rem; }
        .testi-text { font-size: 0.95rem; line-height: 1.7; color: var(--muted); }
        .testi-author { display: flex; align-items: center; gap: 12px; margin-top: 24px; }
        .avatar {
          width: 42px; height: 42px; border-radius: 50%;
          background: var(--p); color: #fff;
          display: flex; align-items: center; justify-content: center;
          font-size: 0.8rem; font-weight: 700; flex-shrink: 0;
        }
        .author-name { font-weight: 600; font-size: 0.92rem; }
        .author-loc { font-size: 0.78rem; color: var(--muted); }

        /* ── Marquee ── */
        .marquee-wrap { overflow: hidden; padding: 32px 0; border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); }
        .marquee-track {
          display: flex; gap: 48px; width: max-content;
          animation: marquee 28s linear infinite;
        }
        .marquee-item {
          display: flex; align-items: center; gap: 10px;
          font-size: 0.9rem; color: var(--muted); white-space: nowrap;
        }
        .marquee-dot { width: 5px; height: 5px; border-radius: 50%; background: var(--p); }

        /* ── CTA banner ── */
        .cta-banner {
          margin: 0 24px 100px;
          border-radius: 24px; overflow: hidden;
          background: var(--p);
          position: relative;
        }
        .cta-inner {
          max-width: 1280px; margin: auto;
          padding: 80px 48px;
          display: grid; grid-template-columns: 1fr auto; gap: 40px; align-items: center;
        }
        @media (max-width: 700px) {
          .cta-inner { grid-template-columns: 1fr; text-align: center; }
        }
        .cta-title {
          font-family: var(--font-sans), sans-serif;
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 700; color: #fff; line-height: 1.15;
        }
        .cta-sub { color: rgba(255,255,255,0.75); margin-top: 10px; font-size: 1rem; }
        .cta-bg-circle {
          position: absolute; border-radius: 50%;
          background: rgba(255,255,255,0.06);
          pointer-events: none;
        }
        .btn-white {
          padding: 14px 32px; border-radius: 10px;
          font-size: 1rem; font-weight: 600;
          color: var(--p); background: #fff; border: none; cursor: pointer;
          transition: transform 0.2s, opacity 0.2s;
          white-space: nowrap; text-decoration: none;
          display: inline-flex; align-items: center; gap: 8px;
        }
        .btn-white:hover { transform: translateY(-2px); opacity: 0.92; }

        /* ── Footer ── */
        .footer {
          background: var(--fg);
          color: rgba(255,255,255,0.65);
          padding: 60px 24px 32px;
        }
        .footer-inner { max-width: 1280px; margin: auto; }
        .footer-top {
          display: grid; grid-template-columns: 1.5fr 1fr 1fr 1fr; gap: 40px;
          padding-bottom: 48px; border-bottom: 1px solid rgba(255,255,255,0.1);
        }
        @media (max-width: 768px) { .footer-top { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 480px) { .footer-top { grid-template-columns: 1fr; } }
        .footer-logo {
          font-family: var(--font-sans), sans-serif;
          font-size: 1.5rem; font-weight: 700; color: #fff; margin-bottom: 14px;
        }
        .footer-desc { font-size: 0.88rem; line-height: 1.7; }
        .footer-col-title {
          font-size: 0.78rem; font-weight: 600; letter-spacing: 0.08em;
          text-transform: uppercase; color: #fff; margin-bottom: 14px;
        }
        .footer-links { display: flex; flex-direction: column; gap: 10px; }
        .footer-link {
          font-size: 0.88rem; color: rgba(255,255,255,0.6);
          text-decoration: none; transition: color 0.2s;
        }
        .footer-link:hover { color: #fff; }
        .footer-bottom {
          padding-top: 28px;
          display: flex; align-items: center; justify-content: space-between;
          font-size: 0.82rem; flex-wrap: gap;
          gap: 12px;
        }
      `}</style>

      <div>
        {/* ── Header ── */}
        <header className="site-header">
          <div className="inner">
            <Link href="/" className="logo" style={{ textDecoration: "none" }}>
              <LogoBadge size={64} />
              <span className="logo-text">StayLux Ke</span>
            </Link>
            <nav className="nav-links anim-navIn">
              <a href="/auth/login" className="btn-ghost">
                Sign In
              </a>
              <a href="/auth/signup" className="btn-primary">
                Get Started
              </a>
            </nav>
          </div>
        </header>

        {/* ── Hero ── */}
        <section className="hero">
          <div className="blob blob-1" />
          <div className="blob blob-2" />
          <div className="blob blob-3" />

          {/* Floating info cards */}
          <div className="float-card float-card-left anim-fadeIn delay-800">
            <div className="float-icon">🏡</div>
            <div>
              <div className="float-label">Top Rated</div>
              <div className="float-value">Nairobi Loft</div>
              <div className="float-label">⭐ 4.98 · 312 reviews</div>
            </div>
          </div>
          <div className="float-card float-card-right anim-fadeIn delay-800">
            <div className="float-icon">✅</div>
            <div>
              <div className="float-label">Just booked</div>
              <div className="float-value">Santorini Villa</div>
              <div className="float-label">3 mins ago</div>
            </div>
          </div>

          <div
            style={{
              position: "relative",
              zIndex: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div className="hero-badge anim-fadeIn">
              <span className="hero-badge-dot" />
              Trusted by 2 million+ guests worldwide
            </div>

            <h1 className="hero-title anim-fadeUp delay-100">
              Discover stays that
              <br />
              <span className="hero-title-accent">feel like home</span>
            </h1>

            <p className="hero-sub anim-fadeUp delay-200">
              Hand-picked properties, verified hosts, and seamless bookings —
              from cosy city apartments to remote safari lodges.
            </p>

            <div className="hero-cta anim-fadeUp delay-300">
              <a href="/auth/login" className="btn-primary-lg">
                <svg viewBox="0 0 20 20" fill="currentColor" width="18">
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  />
                </svg>
                Explore Stays
              </a>
              <a href="/auth/signup" className="btn-outline-lg">
                Become a Host
                <svg viewBox="0 0 20 20" fill="currentColor" width="16">
                  <path
                    fillRule="evenodd"
                    d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>

            {/* Search bar */}
            <div className="search-bar anim-fadeUp delay-400">
              <div className="search-field">
                <label>Destination</label>
                <span>Where are you going?</span>
              </div>
              <div className="search-field">
                <label>Check-in</label>
                <span>Add dates</span>
              </div>
              <div className="search-field">
                <label>Check-out</label>
                <span>Add dates</span>
              </div>
              <div className="search-field" style={{ maxWidth: "130px" }}>
                <label>Guests</label>
                <span>Add guests</span>
              </div>
              <a href="/auth/login" className="search-btn">
                <svg viewBox="0 0 20 20" fill="currentColor" width="16">
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  />
                </svg>
                Search
              </a>
            </div>

            {/* Trust badges */}
            <div
              className="anim-fadeIn delay-600"
              style={{
                display: "flex",
                gap: "24px",
                marginTop: "24px",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              {[
                "Instant Booking",
                "Free Cancellation",
                "24/7 Support",
                "Verified Hosts",
              ].map((b) => (
                <span
                  key={b}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    fontSize: "0.82rem",
                    color: "var(--muted)",
                  }}
                >
                  <svg viewBox="0 0 16 16" fill="var(--p)" width="13">
                    <path
                      fillRule="evenodd"
                      d="M8 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM0 8a8 8 0 1116 0A8 8 0 010 8zm11.78-1.72a.75.75 0 00-1.06-1.06L7 8.94 5.28 7.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.06 0l4.25-4.25z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {b}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ── Stats Strip ── */}
        <div className="stats-strip">
          <div className="stats-inner">
            {STATS.map((s, i) => (
              <div key={i} className={`anim-fadeUp delay-${(i + 1) * 100}`}>
                <div className="stat-value">{s.value}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Features ── */}
        <section className="section">
          <div className="section-tag">Why StayLux Ke</div>
          <h2 className="section-title">
            Everything you need
            <br />
            for the perfect stay
          </h2>
          <div className="features-grid">
            {FEATURES.map((f, i) => (
              <div
                key={i}
                className={`feature-card anim-fadeUp delay-${(i + 1) * 200}`}
              >
                <div className="feature-icon">{f.icon}</div>
                <h3
                  style={{
                    fontSize: "1.15rem",
                    fontWeight: 600,
                    marginBottom: "10px",
                  }}
                >
                  {f.title}
                </h3>
                <p
                  style={{
                    fontSize: "0.92rem",
                    lineHeight: 1.7,
                    color: "var(--muted)",
                  }}
                >
                  {f.description}
                </p>
                <div className="feature-stat">
                  <span className="feature-stat-value">{f.stat}</span>
                  <span className="feature-stat-label">{f.statLabel}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Marquee ── */}
        <div className="marquee-wrap">
          <div className="marquee-track">
            {[...Array(2)].flatMap(() =>
              [
                "Nairobi",
                "Santorini",
                "Tokyo",
                "Cape Town",
                "Paris",
                "Bali",
                "New York",
                "Dubai",
                "London",
                "Marrakech",
                "Sydney",
                "Lisbon",
              ].map((city, j) => (
                <span key={`${city}-${j}`} className="marquee-item">
                  <span className="marquee-dot" /> {city}
                </span>
              )),
            )}
          </div>
        </div>

        {/* ── Destinations ── */}
        <section className="destinations">
          <div style={{ marginTop: "100px" }}>
            <div className="section-tag">Popular Destinations</div>
            <h2 className="section-title">
              Where do you want
              <br />
              to explore next?
            </h2>
          </div>
          <div className="dest-grid">
            {DESTINATIONS.map((d, i) => (
              <a
                key={i}
                href="/auth/login"
                className="dest-card"
                style={{ textDecoration: "none" }}
              >
                <img
                  src={d.img}
                  alt={d.city}
                  className="dest-img"
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
                <div className="dest-overlay" />
                <div className="dest-info">
                  <div className="dest-city">{d.city}</div>
                  <div className="dest-country">{d.country}</div>
                  <div className="dest-props">🏠 {d.properties} properties</div>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* ── Testimonials ── */}
        <section className="testimonials">
          <div className="testimonials-inner">
            <div className="section-tag">Guest Stories</div>
            <h2 className="section-title">
              Loved by travellers
              <br />
              around the globe
            </h2>
            <div className="testi-grid">
              {TESTIMONIALS.map((t, i) => (
                <div
                  key={i}
                  className={`testi-card anim-fadeUp delay-${(i + 1) * 200}`}
                >
                  <div className="stars">
                    {[...Array(t.rating)].map((_, j) => (
                      <span key={j} className="star">
                        ★
                      </span>
                    ))}
                  </div>
                  <p className="testi-text">"{t.text}"</p>
                  <div className="testi-author">
                    <div className="avatar">{t.avatar}</div>
                    <div>
                      <div className="author-name">{t.name}</div>
                      <div className="author-loc">{t.location}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Host CTA ── */}
        <div
          style={{
            maxWidth: "1280px",
            margin: "100px auto 0",
            padding: "0 24px",
          }}
        >
          <div className="cta-banner">
            <div
              className="cta-bg-circle"
              style={{
                width: "400px",
                height: "400px",
                top: "-150px",
                right: "-100px",
              }}
            />
            <div
              className="cta-bg-circle"
              style={{
                width: "200px",
                height: "200px",
                bottom: "-80px",
                left: "10%",
              }}
            />
            <div className="cta-inner">
              <div>
                <h2 className="cta-title">
                  Have a space to share?
                  <br />
                  Start earning today.
                </h2>
                <p className="cta-sub">
                  Join over 12,000 hosts who earn extra income by sharing their
                  homes on StayLux Ke.
                </p>
              </div>
              <a href="/auth/signup" className="btn-white">
                List your property
                <svg viewBox="0 0 20 20" fill="currentColor" width="16">
                  <path
                    fillRule="evenodd"
                    d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* ── Footer ── */}
        <footer className="footer" style={{ marginTop: "100px" }}>
          <div className="footer-inner">
            <div className="footer-top">
              <div>
                <div className="footer-logo" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <LogoBadge size={56} />
                  StayLux Ke
                </div>
                <p className="footer-desc">
                  Connecting travellers with extraordinary places and the people
                  who make them special — since 2024.
                </p>
              </div>
              <div>
                <div className="footer-col-title">Explore</div>
                <div className="footer-links">
                  {[
                    "Search stays",
                    "Experiences",
                    "Long stays",
                    "Last minute",
                  ].map((l) => (
                    <a key={l} href="/auth/login" className="footer-link">
                      {l}
                    </a>
                  ))}
                </div>
              </div>
              <div>
                <div className="footer-col-title">Hosting</div>
                <div className="footer-links">
                  {[
                    "List your place",
                    "Host dashboard",
                    "Host resources",
                    "Community",
                  ].map((l) => (
                    <a key={l} href="/auth/signup" className="footer-link">
                      {l}
                    </a>
                  ))}
                </div>
              </div>
              <div>
                <div className="footer-col-title">Support</div>
                <div className="footer-links">
                  {[
                    "Help centre",
                    "Safety info",
                    "Cancellation",
                    "Contact us",
                  ].map((l) => (
                    <a key={l} href="/auth/login" className="footer-link">
                      {l}
                    </a>
                  ))}
                </div>
              </div>
            </div>
            <div className="footer-bottom">
              <span>© 2025 StayLux Ke · All rights reserved</span>
              <span style={{ display: "flex", gap: "20px" }}>
                <a href="#" className="footer-link">
                  Privacy
                </a>
                <a href="#" className="footer-link">
                  Terms
                </a>
                <a href="#" className="footer-link">
                  Sitemap
                </a>
              </span>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
