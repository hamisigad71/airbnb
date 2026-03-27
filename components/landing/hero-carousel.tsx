'use client';

import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { cn } from '@/lib/utils';
import {
  Search, ChevronRight, ChevronLeft, SlidersHorizontal,
  Shield, Clock, Award, Globe, Star, MapPin, Users,
} from 'lucide-react';

const SLIDES = [
  {
    image:    'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=1800&q=85',
    title:    'Escape to Paradise',
    subtitle: 'Discover private villas with breathtaking ocean views.',
    tag:      'Beachfront',
    chip:     'Maldives, Asia',
  },
  {
    image:    'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1800&q=85',
    title:    'Urban Elegance',
    subtitle: 'Experience the heartbeat of the city in stylish lofts.',
    tag:      'City Life',
    chip:     'New York, USA',
  },
  {
    image:    'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1800&q=85',
    title:    'Mountain Serenity',
    subtitle: 'Find peace in secluded cabins above the clouds.',
    tag:      'Retreats',
    chip:     'Swiss Alps, Europe',
  },
  {
    image:    'https://images.unsplash.com/photo-1528150177508-7cc0c36cda5c?w=1800&q=85',
    title:    'Desert Wonders',
    subtitle: 'Stay under the stars in exclusive luxury camps.',
    tag:      'Unique',
    chip:     'Dubai, UAE',
  },
];

const TRUST_ITEMS = [
  { icon: Shield, label: 'Verified Stays',  desc: 'Every property checked'  },
  { icon: Clock,  label: '24/7 Support',    desc: 'Always here to help'     },
  { icon: Award,  label: 'Best Price',      desc: 'Price match guarantee'   },
  { icon: Globe,  label: '190+ Countries',  desc: 'World-wide coverage'     },
];

interface HeroCarouselProps {
  listingCount?:    number;
  searchQuery?:     string;
  onSearchChange?:  (v: string) => void;
  onSearch?:        () => void;
  activeCategory?:  string;
  onCategoryChange?:(v: string) => void;
  upcomingBookings?:number;
  savedCount?:      number;
  userName?:        string;
  currentTime?:     string;
}

const CATEGORIES = [
  { key: 'all',       label: 'All Stays',  icon: '✨' },
  { key: 'apartment', label: 'Apartments', icon: '🏢' },
  { key: 'villa',     label: 'Villas',     icon: '🏡' },
  { key: 'house',     label: 'Houses',     icon: '🏠' },
  { key: 'room',      label: 'Rooms',      icon: '🛏️' },
];

export default function HeroCarousel({
  listingCount     = 0,
  searchQuery      = '',
  onSearchChange,
  onSearch,
  activeCategory   = 'all',
  onCategoryChange,
  upcomingBookings = 0,
  savedCount       = 0,
  userName         = 'Traveller',
  currentTime      = 'Good morning',
}: HeroCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 30 });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showFilters, setShowFilters]     = useState(false);
  const [priceMax, setPriceMax]           = useState(500);
  const [guestCount, setGuestCount]       = useState(1);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    const id = setInterval(() => emblaApi.scrollNext(), 6000);
    return () => clearInterval(id);
  }, [emblaApi, onSelect]);

  const scrollTo   = useCallback((i: number) => emblaApi?.scrollTo(i),   [emblaApi]);
  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(),            [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(),            [emblaApi]);

  return (
    <section className="hc-root">
      <style>{`
        /* ══════════════════════════════════════════
           ROOT & TOKENS
        ══════════════════════════════════════════ */
        .hc-root {
          --p:      oklch(0.4 0.155 11.87);
          --p-l:    oklch(0.6 0.155 11.87);
          --p-pale: var(--p-pale, oklch(0.96 0.03  11.87));
          --p-ring: var(--p-ring, oklch(0.4 0.155 11.87 / 0.13));
          --fg:     var(--foreground);
          --muted:  var(--muted-foreground);
          --subtle: var(--muted-foreground);
          --border: var(--border);
          --card:   var(--card);
          --bg:     var(--background);
          --sh-m:   0 8px 32px  rgba(0,0,0,0.08);
          --sh-l:   0 20px 60px rgba(0,0,0,0.12);
          position: relative;
          width: 100%;
          font-family: var(--font-sans), system-ui, sans-serif;
        }

        /* ══════════════════════════════════════════
           KEYFRAMES
        ══════════════════════════════════════════ */
        @keyframes hcZoom     { from{transform:scale(1.06) translateY(0)} to{transform:scale(1.13) translateY(-18px)} }
        @keyframes hcFadeUp   { from{opacity:0;transform:translateY(22px)} to{opacity:1;transform:translateY(0)} }
        @keyframes hcChipPop  { 0%,100%{transform:scale(1);opacity:1} 50%{transform:scale(1.35);opacity:.7} }
        @keyframes hcDrift1   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-11px)} }
        @keyframes hcDrift2   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)}  }
        @keyframes hcDrift3   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-13px)} }
        @keyframes hcWave     { 0%,100%{transform:rotate(-4deg)} 50%{transform:rotate(8deg)} }
        @keyframes hcSlideIn  { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
        @keyframes hcFilterIn { from{opacity:0;transform:translateY(-8px)} to{opacity:1;transform:translateY(0)} }

        /* ══════════════════════════════════════════
           IMAGE BAND
        ══════════════════════════════════════════ */
        .hc-band {
          position: relative;
          height: clamp(360px, 56vw, 600px);
          overflow: hidden;
        }

        .hc-viewport { overflow: hidden; position: absolute; inset: 0; }
        .hc-container { display: flex; height: 100%; }
        .hc-slide { flex: 0 0 100%; min-width: 0; position: relative; }

        .hc-slide-img {
          width: 100%; height: 100%;
          object-fit: cover; object-position: center 55%;
          display: block;
          transform: scale(1.06);
          animation: hcZoom 18s ease-in-out infinite alternate;
        }

        /* Layered overlays */
        .hc-overlay {
          position: absolute; inset: 0;
          background:
            linear-gradient(to top,   oklch(0.05 0.01 11.87 / 0.94) 0%,
                                      oklch(0.05 0.01 11.87 / 0.58) 36%,
                                      transparent 65%),
            linear-gradient(to right, oklch(0.05 0.01 11.87 / 0.55) 0%,
                                      transparent 55%);
          pointer-events: none;
        }

        .hc-grain {
          position: absolute; inset: 0; pointer-events: none;
          opacity: 0.032;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
        }

        /* ── Floating chips ── */
        .hc-chip {
          position: absolute;
          display: flex; align-items: center; gap: 8px;
          padding: 8px 14px;
          border-radius: 100px;
          background: rgba(255,255,255,0.13);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          border: 1px solid rgba(255,255,255,0.22);
          color: #fff;
          font-size: 0.77rem; font-weight: 500;
          pointer-events: none; white-space: nowrap;
          z-index: 4;
        }

        .hc-chip-dot {
          width: 7px; height: 7px; border-radius: 50%;
          background: oklch(0.62 0.155 11.87);
          box-shadow: 0 0 8px oklch(0.62 0.155 11.87 / 0.75);
          animation: hcChipPop 2s ease-in-out infinite;
          flex-shrink: 0;
        }

        .hc-chip-1 { top: 24%; right: 7%;  animation: hcDrift1 5.2s ease-in-out infinite; }
        .hc-chip-2 { top: 48%; right: 17%; animation: hcDrift2 6.5s ease-in-out infinite 1s; }
        .hc-chip-3 { top: 16%; right: 22%; animation: hcDrift3 7.1s ease-in-out infinite 2.2s; }

        @media (max-width: 640px) {
          .hc-chip { display: none; }
        }

        /* ── Review badge ── */
        .hc-review {
          position: absolute;
          bottom: 120px; right: 5%;
          display: flex; align-items: center; gap: 11px;
          padding: 12px 18px;
          border-radius: 16px;
          background: rgba(255,255,255,0.13);
          backdrop-filter: blur(22px);
          -webkit-backdrop-filter: blur(22px);
          border: 1px solid rgba(255,255,255,0.22);
          color: #fff;
          animation: hcDrift2 6s ease-in-out infinite 0.5s;
          z-index: 4;
        }

        @media (max-width: 640px) { .hc-review { display: none; } }

        .hc-review-stars { display: flex; gap: 2px; color: oklch(0.78 0.16 55); }
        .hc-review-title { font-size: 0.8rem;  font-weight: 600; }
        .hc-review-sub   { font-size: 0.71rem; opacity: 0.7; margin-top: 1px; }

        /* ── Slide-count pill ── */
        .hc-slide-count {
          position: absolute;
          top: 22px; right: 22px;
          padding: 5px 14px;
          border-radius: 100px;
          background: rgba(0,0,0,0.35);
          backdrop-filter: blur(12px);
          color: rgba(255,255,255,0.85);
          font-size: 0.72rem; font-weight: 500;
          letter-spacing: 0.06em;
          z-index: 4;
        }

        /* ── Progress bar at top of image ── */
        .hc-progress {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px; z-index: 10;
          display: flex; gap: 3px; padding: 0 3px;
        }

        .hc-prog-seg {
          flex: 1; height: 100%;
          border-radius: 0 0 3px 3px;
          background: rgba(255,255,255,0.25);
          overflow: hidden;
        }

        .hc-prog-fill {
          height: 100%;
          background: #fff;
          border-radius: inherit;
          width: 0%;
          transition: width 0.3s linear;
        }

        .hc-prog-seg.done  .hc-prog-fill { width: 100%; }
        .hc-prog-seg.active .hc-prog-fill {
          width: 0%;
          animation: hcProgFill 6s linear forwards;
        }

        @keyframes hcProgFill { from{width:0%} to{width:100%} }

        /* ── Text over image ── */
        .hc-text-over {
          position: absolute;
          bottom: 90px; left: 36px;
          z-index: 5; max-width: 580px;
        }

        @media (max-width: 640px) {
          .hc-text-over { left: 18px; bottom: 60px; }
        }

        .hc-eyebrow {
          display: inline-flex; align-items: center; gap: 7px;
          padding: 5px 14px; border-radius: 100px;
          background: oklch(0.4 0.155 11.87 / 0.88);
          backdrop-filter: blur(8px);
          color: #fff; font-size: 0.71rem;
          font-weight: 700; letter-spacing: 0.09em;
          text-transform: uppercase; margin-bottom: 13px;
          border: 1px solid rgba(255,255,255,0.2);
        }

        .hc-eyebrow-dot {
          width: 6px; height: 6px; border-radius: 50%; background: #fff;
          animation: hcChipPop 1.8s ease-in-out infinite;
          flex-shrink: 0;
        }

        .hc-title {
          font-size: clamp(1.9rem, 5vw, 3.8rem);
          font-weight: 800; color: #fff;
          line-height: 1.08; letter-spacing: -0.025em;
          margin: 0 0 10px;
          text-shadow: 0 2px 24px rgba(0,0,0,0.28);
        }

        .hc-subtitle {
          font-size: clamp(0.85rem, 1.6vw, 1.1rem);
          color: rgba(255,255,255,0.72);
          font-weight: 300; line-height: 1.6; margin: 0;
          max-width: 430px;
        }

        .hc-wave {
          display: inline-block;
          animation: hcWave 2s ease-in-out infinite;
          transform-origin: 70% 70%;
        }

        /* ── Carousel arrows ── */
        .hc-arrows {
          position: absolute;
          bottom: 22px; right: 22px;
          display: flex; gap: 8px; z-index: 5;
        }

        .hc-arrow {
          width: 40px; height: 40px; border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.25);
          background: rgba(0,0,0,0.22);
          backdrop-filter: blur(10px);
          color: #fff;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; transition: all 0.22s; padding: 0;
        }

        .hc-arrow:hover {
          background: var(--p);
          border-color: var(--p);
          transform: scale(1.08);
        }

        /* ── Dots ── */
        .hc-dots {
          position: absolute;
          bottom: 34px; left: 36px;
          display: flex; gap: 6px; align-items: center; z-index: 5;
        }

        @media (max-width: 640px) { .hc-dots { left: 18px; } }

        .hc-dot {
          width: 7px; height: 7px; border-radius: 50%;
          background: rgba(255,255,255,0.35);
          border: none; padding: 0; cursor: pointer;
          transition: all 0.3s ease;
        }

        .hc-dot.active {
          width: 28px; border-radius: 3px; background: #fff;
        }

        /* ══════════════════════════════════════════
           PULL-UP CARD
        ══════════════════════════════════════════ */
        .hc-body {
          padding: 0 28px 40px;
          max-width: 1400px; margin: 0 auto;
        }

        @media (max-width: 640px) { .hc-body { padding: 0 16px 32px; } }

        .hc-pullup {
          margin-top: -76px; position: relative; z-index: 10;
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 28px;
          padding: 30px 34px 26px;
          box-shadow: var(--sh-l);
        }

        @media (max-width: 640px) {
          .hc-pullup { margin-top: -48px; padding: 22px 18px 20px; border-radius: 20px; }
        }

        .hc-pullup-top {
          display: flex; align-items: center;
          justify-content: space-between;
          gap: 12px; margin-bottom: 20px; flex-wrap: wrap;
        }

        .hc-pullup-label {
          font-size: 1.05rem; font-weight: 700;
          color: var(--fg); letter-spacing: -0.01em;
        }

        .hc-pullup-label span { color: var(--p); }

        .hc-pullup-meta {
          display: flex; align-items: center;
          gap: 14px; font-size: 0.79rem;
          color: var(--muted); flex-wrap: wrap;
        }

        .hc-meta-item { display: flex; align-items: center; gap: 5px; }

        /* ── Search row ── */
        .hc-search-row {
          display: grid;
          grid-template-columns: 1fr auto auto;
          gap: 10px; align-items: center;
        }

        @media (max-width: 680px) { .hc-search-row { grid-template-columns: 1fr; } }

        .hc-search-wrap { position: relative; }

        .hc-search-icon {
          position: absolute; left: 17px; top: 50%;
          transform: translateY(-50%);
          color: var(--muted); pointer-events: none; display: flex;
        }

        .hc-search-input {
          width: 100%;
          padding: 14px 16px 14px 48px;
          border-radius: 13px;
          border: 1.5px solid var(--border);
          background: var(--bg);
          font-size: 0.92rem; color: var(--fg);
          font-family: inherit; outline: none;
          transition: all 0.22s; box-sizing: border-box;
        }

        .hc-search-input::placeholder { color: var(--subtle); }

        .hc-search-input:focus {
          border-color: var(--p);
          box-shadow: 0 0 0 4px var(--p-ring);
          background: var(--card);
        }

        .hc-search-btn {
          display: flex; align-items: center;
          justify-content: center; gap: 7px;
          padding: 14px 26px;
          border-radius: 13px;
          background: var(--p); color: #fff;
          font-size: 0.89rem; font-weight: 600;
          font-family: inherit; border: none;
          cursor: pointer; transition: all 0.22s;
          white-space: nowrap;
        }

        .hc-search-btn:hover {
          filter: brightness(1.08);
          transform: translateY(-2px);
          box-shadow: var(--sh-m);
        }

        .hc-search-btn:active { transform: scale(0.97); }

        .hc-filter-btn {
          display: flex; align-items: center; gap: 7px;
          padding: 14px 18px;
          border-radius: 13px;
          border: 1.5px solid var(--border);
          background: var(--card);
          color: var(--fg); font-size: 0.86rem;
          font-weight: 500; font-family: inherit;
          cursor: pointer; transition: all 0.22s;
          white-space: nowrap;
        }

        .hc-filter-btn:hover, .hc-filter-btn.open {
          border-color: var(--p); color: var(--p);
        }

        /* ── Category pills ── */
        .hc-cats {
          display: flex; gap: 8px;
          margin-top: 14px;
          flex-wrap: wrap;
        }

        .hc-pill {
          display: flex; align-items: center; gap: 6px;
          padding: 7px 16px; border-radius: 100px;
          border: 1.5px solid var(--border);
          background: var(--card);
          font-size: 0.79rem; font-weight: 500;
          color: var(--muted); cursor: pointer;
          transition: all 0.2s; font-family: inherit;
        }

        .hc-pill:hover { border-color: var(--p); color: var(--p); }

        .hc-pill.active {
          background: var(--p-pale);
          border-color: var(--p); color: var(--p);
          font-weight: 600;
        }

        /* ── Expandable filter panel ── */
        .hc-filter-panel {
          margin-top: 14px;
          padding: 18px 20px;
          border: 1.5px solid var(--border);
          border-radius: 14px;
          background: var(--bg);
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 20px;
          animation: hcFilterIn 0.25s ease;
        }

        .hc-filter-label {
          display: block;
          font-size: 0.75rem; font-weight: 600;
          color: var(--muted); text-transform: uppercase;
          letter-spacing: 0.07em; margin-bottom: 8px;
        }

        .hc-filter-row {
          display: flex; align-items: center; gap: 10px;
        }

        .hc-filter-row input[type=range] { flex: 1; }

        .hc-filter-val {
          font-size: 0.88rem; font-weight: 600;
          color: var(--fg); min-width: 46px;
        }

        .hc-counter-btn {
          width: 33px; height: 33px; border-radius: 8px;
          border: 1.5px solid var(--border);
          background: var(--card); cursor: pointer;
          font-size: 1.1rem;
          display: flex; align-items: center; justify-content: center;
          color: var(--fg); font-family: inherit;
          transition: border-color 0.2s;
        }

        .hc-counter-btn:hover { border-color: var(--p); color: var(--p); }

        .hc-counter-val {
          font-weight: 600; min-width: 22px;
          text-align: center; font-size: 0.94rem;
        }

        .hc-reset-btn {
          padding: 8px 16px; border-radius: 9px;
          border: 1.5px solid var(--border);
          background: transparent; color: var(--muted);
          font-size: 0.81rem; cursor: pointer;
          font-family: inherit; font-weight: 500;
          transition: all 0.2s; align-self: flex-end;
        }

        .hc-reset-btn:hover { border-color: var(--p); color: var(--p); }

        /* ══════════════════════════════════════════
           STAT CARDS
        ══════════════════════════════════════════ */
        .hc-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 14px; margin-top: 22px;
        }

        @media (max-width: 500px) {
          .hc-stats { grid-template-columns: 1fr 1fr; }
          .hc-stats .hc-stat:last-child { grid-column: 1 / -1; }
        }

        .hc-stat {
          padding: 17px 19px;
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 17px;
          display: flex; align-items: center; gap: 13px;
          cursor: pointer; text-decoration: none; color: inherit;
          transition: all 0.3s cubic-bezier(.22,.68,0,1.1);
          position: relative; overflow: hidden;
        }

        .hc-stat::after {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(135deg, var(--p-pale) 0%, transparent 60%);
          opacity: 0; transition: opacity 0.3s; border-radius: inherit;
        }

        .hc-stat:hover { transform: translateY(-5px); box-shadow: var(--sh-m); border-color: color-mix(in oklch, var(--p) 25%, var(--border)); }
        .hc-stat:hover::after { opacity: 1; }

        .hc-stat-icon {
          width: 44px; height: 44px; border-radius: 12px;
          background: var(--p-pale); color: var(--p);
          display: flex; align-items: center; justify-content: center;
          font-size: 1.25rem; flex-shrink: 0;
          position: relative; z-index: 1;
          transition: transform 0.3s;
        }

        .hc-stat:hover .hc-stat-icon { transform: scale(1.1) rotate(-4deg); }

        .hc-stat-info { position: relative; z-index: 1; }

        .hc-stat-val {
          font-size: 1.45rem; font-weight: 700;
          color: var(--fg); line-height: 1;
        }

        .hc-stat-lbl {
          font-size: 0.73rem; color: var(--muted); margin-top: 3px;
        }

        /* ══════════════════════════════════════════
           TRUST STRIP
        ══════════════════════════════════════════ */
        .hc-trust {
          display: flex; gap: 0;
          margin-top: 18px;
          border: 1px solid var(--border);
          border-radius: 16px; overflow: hidden;
          background: var(--card);
        }

        @media (max-width: 640px) {
          .hc-trust { display: grid; grid-template-columns: 1fr 1fr; }
          .hc-trust-item { border-right: none !important; border-bottom: 1px solid var(--border); }
          .hc-trust-item:nth-child(odd) { border-right: 1px solid var(--border) !important; }
          .hc-trust-item:nth-last-child(-n+2) { border-bottom: none; }
        }

        .hc-trust-item {
          flex: 1;
          display: flex; align-items: center; gap: 10px;
          padding: 13px 15px;
          border-right: 1px solid var(--border);
          transition: background 0.2s; cursor: default;
        }

        .hc-trust-item:last-child { border-right: none; }
        .hc-trust-item:hover { background: var(--p-pale); }

        .hc-trust-icon {
          width: 33px; height: 33px; border-radius: 9px;
          background: var(--p-pale); color: var(--p);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }

        .hc-trust-label { font-size: 0.77rem; font-weight: 600; color: var(--fg); line-height: 1.2; }
        .hc-trust-desc  { font-size: 0.69rem; color: var(--muted); }
      `}</style>

      {/* ══════════════════════════════════════
          IMAGE BAND
      ══════════════════════════════════════ */}
      <div className="hc-band">

        {/* Progress segments */}
        <div className="hc-progress">
          {SLIDES.map((_, i) => (
            <div
              key={i}
              className={cn(
                'hc-prog-seg',
                i < selectedIndex  && 'done',
                i === selectedIndex && 'active',
              )}
            >
              <div className="hc-prog-fill" />
            </div>
          ))}
        </div>

        {/* Embla viewport */}
        <div className="hc-viewport" ref={emblaRef}>
          <div className="hc-container">
            {SLIDES.map((slide, i) => (
              <div className="hc-slide" key={i}>
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="hc-slide-img"
                  loading={i === 0 ? 'eager' : 'lazy'}
                  style={{ animationPlayState: selectedIndex === i ? 'running' : 'paused' }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Overlays */}
        <div className="hc-overlay" />
        <div className="hc-grain"   />

        {/* Slide counter */}
        <div className="hc-slide-count">
          {String(selectedIndex + 1).padStart(2, '0')} / {String(SLIDES.length).padStart(2, '0')}
        </div>

        {/* Floating chips — show current slide destination */}
        <div className="hc-chip hc-chip-1">
          <div className="hc-chip-dot" />
          {SLIDES[selectedIndex].chip}
        </div>
        <div className="hc-chip hc-chip-2">
          <div className="hc-chip-dot" style={{ animationDelay: '0.6s' }} />
          {SLIDES[(selectedIndex + 1) % SLIDES.length].chip}
        </div>
        <div className="hc-chip hc-chip-3">
          <div className="hc-chip-dot" style={{ animationDelay: '1.1s' }} />
          {SLIDES[(selectedIndex + 2) % SLIDES.length].chip}
        </div>

        {/* Review badge */}
        <div className="hc-review">
          <div className="hc-review-stars">
            {[...Array(5)].map((_, i) => <Star key={i} size={11} fill="currentColor" />)}
          </div>
          <div>
            <div className="hc-review-title">Exceptional</div>
            <div className="hc-review-sub">4.9 · 12,400+ reviews</div>
          </div>
        </div>

        {/* Text over image — animated per slide */}
        <div className="hc-text-over">
          <div className="hc-eyebrow" key={`eyebrow-${selectedIndex}`} style={{ animation: 'hcSlideIn 0.5s ease both' }}>
            <div className="hc-eyebrow-dot" />
            Find your next stay, {userName}
          </div>

          {SLIDES.map((slide, i) => (
            <div
              key={i}
              style={{
                display: selectedIndex === i ? 'block' : 'none',
                animation: selectedIndex === i ? 'hcSlideIn 0.55s cubic-bezier(0.16,1,0.3,1) both' : undefined,
              }}
            >
              <h1 className="hc-title">{slide.title}</h1>
              <p className="hc-subtitle">{slide.subtitle}</p>
            </div>
          ))}
        </div>

        {/* Dots */}
        <div className="hc-dots">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              className={cn('hc-dot', selectedIndex === i && 'active')}
              onClick={() => scrollTo(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        {/* Arrows */}
        <div className="hc-arrows">
          <button className="hc-arrow" onClick={scrollPrev} aria-label="Previous slide">
            <ChevronLeft size={18} />
          </button>
          <button className="hc-arrow" onClick={scrollNext} aria-label="Next slide">
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* ══════════════════════════════════════
          PULL-UP BODY
      ══════════════════════════════════════ */}
      <div className="hc-body">

        {/* Pull-up search card */}
        <div className="hc-pullup">

          <div className="hc-pullup-top">
            <div className="hc-pullup-label">
              Where do you want to <span>stay?</span>
            </div>
            <div className="hc-pullup-meta">
              <span className="hc-meta-item">
                <MapPin size={13} color="var(--p)" />
                {QUICK_DESTINATIONS_COUNT} top destinations
              </span>
              <span className="hc-meta-item">
                <Star size={13} color="oklch(0.7 0.18 55)" fill="oklch(0.7 0.18 55)" />
                Avg. 4.8 rating
              </span>
            </div>
          </div>

          {/* Search bar */}
          <div className="hc-search-row">
            <div className="hc-search-wrap">
              <span className="hc-search-icon"><Search size={17} /></span>
              <input
                className="hc-search-input"
                type="text"
                placeholder="City, property name, or neighbourhood..."
                value={searchQuery}
                onChange={e => onSearchChange?.(e.target.value)}
              />
            </div>

            <button
              className={cn('hc-filter-btn', showFilters && 'open')}
              onClick={() => setShowFilters(p => !p)}
            >
              <SlidersHorizontal size={15} />
              Filters
            </button>

            <button className="hc-search-btn" onClick={onSearch}>
              <Search size={14} />
              Search
            </button>
          </div>


          {/* Expandable filter panel */}
          {showFilters && (
            <div className="hc-filter-panel">
              <div>
                <label className="hc-filter-label">Max price / night</label>
                <div className="hc-filter-row">
                  <input
                    type="range" min={0} max={500} step={10}
                    value={priceMax}
                    onChange={e => setPriceMax(+e.target.value)}
                  />
                  <span className="hc-filter-val">${priceMax}</span>
                </div>
              </div>

              <div>
                <label className="hc-filter-label">Guests</label>
                <div className="hc-filter-row">
                  <button className="hc-counter-btn" onClick={() => setGuestCount(g => Math.max(1, g - 1))}>−</button>
                  <span className="hc-counter-val">{guestCount}</span>
                  <button className="hc-counter-btn" onClick={() => setGuestCount(g => g + 1)}>+</button>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                <button
                  className="hc-reset-btn"
                  onClick={() => { setPriceMax(500); setGuestCount(1); onCategoryChange?.('all'); }}
                >
                  Reset all
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Stat cards */}
        <div className="hc-stats">
          <a href="/guest/bookings" className="hc-stat">
            <div className="hc-stat-icon">📋</div>
            <div className="hc-stat-info">
              <div className="hc-stat-val">{upcomingBookings}</div>
              <div className="hc-stat-lbl">Upcoming Bookings</div>
            </div>
          </a>

          <div className="hc-stat">
            <div className="hc-stat-icon">❤️</div>
            <div className="hc-stat-info">
              <div className="hc-stat-val">{savedCount}</div>
              <div className="hc-stat-lbl">Saved Stays</div>
            </div>
          </div>

          <div className="hc-stat">
            <div className="hc-stat-icon">🌍</div>
            <div className="hc-stat-info">
              <div className="hc-stat-val">{listingCount}</div>
              <div className="hc-stat-lbl">Available Now</div>
            </div>
          </div>
        </div>

        {/* Trust strip */}
        <div className="hc-trust">
          {TRUST_ITEMS.map(({ icon: Icon, label, desc }) => (
            <div key={label} className="hc-trust-item">
              <div className="hc-trust-icon"><Icon size={15} /></div>
              <div>
                <div className="hc-trust-label">{label}</div>
                <div className="hc-trust-desc">{desc}</div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

/* ── constant used in JSX above ── */
const QUICK_DESTINATIONS_COUNT = 6;