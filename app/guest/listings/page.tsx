'use client';

import React, { useState, useMemo, useRef } from 'react';
import Link from 'next/link';
import {
  Search, SlidersHorizontal, Map as MapIcon, Star, Heart,
  MapPin, X, ChevronDown, Bed, Bath, Users, ArrowUpDown,
  Sparkles, TrendingUp,
} from 'lucide-react';
import { MOCK_LISTINGS } from '@/lib/mock-data';
import BottomNav from '@/components/navigation/bottom-nav';

// ─── Data ─────────────────────────────────────────────────────────────────────

const CATEGORIES = [
  { label: 'All',        icon: '✦',  key: null         },
  { label: 'Beachfront', icon: '🏖️', key: 'beachfront' },
  { label: 'Villas',     icon: '🏡', key: 'villa'      },
  { label: 'Apartments', icon: '🏢', key: 'apartment'  },
  { label: 'Houses',     icon: '🏠', key: 'house'      },
  { label: 'Rooms',      icon: '🛏️', key: 'room'       },
  { label: 'Unique',     icon: '🏰', key: 'unique'     },
  { label: 'Luxe',       icon: '💎', key: 'luxe'       },
];

const SORT_OPTIONS = [
  { label: 'Recommended',  value: 'recommended' },
  { label: 'Price: Low',   value: 'price_asc'   },
  { label: 'Price: High',  value: 'price_desc'  },
  { label: 'Top Rated',    value: 'rating'      },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function ListingsIndexPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery,    setSearchQuery]    = useState('');
  const [isFilterOpen,   setIsFilterOpen]   = useState(false);
  const [sortBy,         setSortBy]         = useState('recommended');
  const [showSort,       setShowSort]       = useState(false);
  const [liked,          setLiked]          = useState<Set<string>>(new Set());
  const [likeAnim,       setLikeAnim]       = useState<string | null>(null);
  const [minPrice,       setMinPrice]       = useState('');
  const [maxPrice,       setMaxPrice]       = useState('');
  const [minRating,      setMinRating]      = useState(0);

  const toggleLike = (id: string, e: React.MouseEvent) => {
    e.preventDefault(); e.stopPropagation();
    setLikeAnim(id);
    setTimeout(() => setLikeAnim(null), 500);
    setLiked(prev => {
      const n = new Set(prev);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });
  };

  const filteredListings = useMemo(() => {
    let list = MOCK_LISTINGS.filter(l => {
      const cat = CATEGORIES.find(c => c.label === activeCategory);
      const matchesCat =
        activeCategory === 'All' ||
        (cat?.key && l.type === cat.key);

      const q = searchQuery.toLowerCase();
      const matchesSearch =
        !q ||
        l.title.toLowerCase().includes(q) ||
        l.city.toLowerCase().includes(q) ||
        l.country.toLowerCase().includes(q);

      const price = l.pricePerNight;
      const matchesMin = !minPrice || price >= +minPrice;
      const matchesMax = !maxPrice || price <= +maxPrice;
      const matchesRating = l.rating >= minRating;

      return matchesCat && matchesSearch && matchesMin && matchesMax && matchesRating;
    });

    if (sortBy === 'price_asc')  list = [...list].sort((a, b) => a.pricePerNight - b.pricePerNight);
    if (sortBy === 'price_desc') list = [...list].sort((a, b) => b.pricePerNight - a.pricePerNight);
    if (sortBy === 'rating')     list = [...list].sort((a, b) => b.rating - a.rating);

    return list;
  }, [activeCategory, searchQuery, sortBy, minPrice, maxPrice, minRating]);

  const activeFiltersCount = [minPrice, maxPrice, minRating > 0 ? '1' : ''].filter(Boolean).length;

  return (
    <>
      <style>{`
        /* ══ Tokens ══ */
        .li-page {
          --p:        oklch(0.4 0.155 11.87);
          --p-l:      oklch(0.6 0.155 11.87);
          --p-pale:   var(--p-pale, oklch(0.96 0.028 11.87));
          --p-ring:   var(--p-ring, oklch(0.4 0.155 11.87 / 0.13));
          --fg:       var(--foreground);
          --muted:    var(--muted-foreground);
          --subtle:   var(--muted-foreground);
          --border:   var(--border);
          --card:     var(--card);
          --bg:       var(--background);
          --sh-s:     0 2px 8px  rgba(0,0,0,0.05);
          --sh-m:     0 8px 32px rgba(0,0,0,0.08);
          --sh-l:     0 20px 60px rgba(0,0,0,0.12);
          font-family: var(--font-sans), system-ui, sans-serif;
          background: var(--bg);
          color: var(--fg);
          min-height: 100vh;
          padding-bottom: 120px;
        }

        /* ══ Keyframes ══ */
        @keyframes liUp  { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes liPop { 0%{transform:scale(1)} 30%{transform:scale(1.45)} 60%{transform:scale(.9)} 100%{transform:scale(1)} }
        @keyframes liIn  { from{opacity:0;transform:scale(.95)} to{opacity:1;transform:scale(1)} }
        @keyframes liSlideDown { from{opacity:0;transform:translateY(-8px)} to{opacity:1;transform:translateY(0)} }

        .li-up { animation: liUp 0.55s cubic-bezier(.22,.68,0,1.15) both; }
        .li-d1 { animation-delay:.05s; }
        .li-d2 { animation-delay:.1s;  }
        .li-d3 { animation-delay:.15s; }

        /* ══ Sticky search bar ══ */
        .li-bar {
          position: sticky; top: 0; z-index: 80;
          background: color-mix(in oklch, var(--card) 90%, transparent);
          backdrop-filter: blur(22px) saturate(1.6);
          -webkit-backdrop-filter: blur(22px) saturate(1.6);
          border-bottom: 1px solid var(--border);
          padding: 14px 0 0;
        }

        .li-bar-inner {
          max-width: 1400px; margin: 0 auto;
          padding: 0 20px;
        }
        @media (min-width: 768px) { .li-bar-inner { padding: 0 32px; } }

        /* Search row */
        .li-search-row {
          display: grid;
          grid-template-columns: 1fr auto auto;
          gap: 10px; align-items: center;
          margin-bottom: 14px;
        }
        @media (max-width: 500px) {
          .li-search-row { grid-template-columns: 1fr; }
        }

        .li-search-wrap { position: relative; }

        .li-search-icon {
          position: absolute; left: 18px; top: 50%;
          transform: translateY(-50%);
          color: var(--muted); pointer-events: none; display: flex;
          transition: color 0.2s;
        }

        .li-search-input {
          width: 100%;
          height: 48px;
          padding: 0 20px 0 50px;
          border-radius: 14px;
          border: 1.5px solid var(--border);
          background: var(--card);
          font-size: 0.88rem; color: var(--fg);
          font-family: inherit; outline: none;
          transition: all 0.22s;
          box-sizing: border-box;
        }
        .li-search-input::placeholder { color: var(--subtle); }
        .li-search-input:focus {
          border-color: var(--p);
          box-shadow: 0 0 0 3px var(--p-ring);
        }
        .li-search-wrap:focus-within .li-search-icon { color: var(--p); }

        /* Bar buttons */
        .li-bar-btn {
          height: 48px; padding: 0 18px;
          border-radius: 14px;
          border: 1.5px solid var(--border);
          background: var(--card);
          display: flex; align-items: center; gap: 8px;
          font-size: 0.86rem; font-weight: 600;
          color: var(--fg); cursor: pointer;
          transition: all 0.22s; white-space: nowrap;
          font-family: inherit;
          position: relative;
        }
        .li-bar-btn:hover { border-color: var(--p); color: var(--p); }
        .li-bar-btn.active { border-color: var(--p); background: var(--p-pale); color: var(--p); }

        .li-filter-badge {
          position: absolute; top: -6px; right: -6px;
          width: 18px; height: 18px; border-radius: 50%;
          background: var(--p); color: #fff;
          font-size: 10px; font-weight: 700;
          display: flex; align-items: center; justify-content: center;
          border: 2px solid var(--bg);
        }

        .li-map-btn {
          height: 48px; padding: 0 20px;
          border-radius: 14px; border: none;
          background: var(--fg); color: #fff;
          display: flex; align-items: center; gap: 8px;
          font-size: 0.86rem; font-weight: 700;
          cursor: pointer; transition: all 0.22s;
          text-decoration: none; white-space: nowrap;
          font-family: inherit;
        }
        .li-map-btn:hover { background: var(--p); transform: translateY(-1px); box-shadow: var(--sh-m); }

        /* Category pills */
        .li-cats {
          display: flex; gap: 6px;
          overflow-x: auto; scrollbar-width: none;
          padding-bottom: 14px;
        }
        .li-cats::-webkit-scrollbar { display: none; }

        .li-cat {
          display: flex; align-items: center; gap: 6px;
          padding: 8px 18px; border-radius: 100px;
          border: 1.5px solid var(--border);
          background: var(--card);
          font-size: 0.82rem; font-weight: 600;
          color: var(--muted); cursor: pointer;
          transition: all 0.22s; white-space: nowrap;
          font-family: inherit; flex-shrink: 0;
        }
        .li-cat:hover { border-color: var(--p); color: var(--p); }
        .li-cat.active {
          background: var(--p); border-color: var(--p);
          color: #fff;
          box-shadow: 0 4px 14px oklch(0.4 0.155 11.87 / 0.25);
        }
        .li-cat-icon { font-size: 1rem; line-height: 1; }

        /* ══ Page body ══ */
        .li-body {
          max-width: 1400px; margin: 0 auto;
          padding: 32px 20px;
        }
        @media (min-width: 768px) { .li-body { padding: 40px 32px; } }

        /* Results header */
        .li-results-hdr {
          display: flex; align-items: flex-end;
          justify-content: space-between;
          gap: 16px; margin-bottom: 28px;
          flex-wrap: wrap;
        }

        .li-results-title {
          font-size: 1.3rem; font-weight: 700;
          color: var(--fg); letter-spacing: -0.02em;
          display: flex; align-items: center; gap: 8px;
        }

        .li-results-count {
          font-size: 0.82rem; color: var(--muted);
          margin-top: 4px; font-weight: 400;
        }

        /* Sort dropdown */
        .li-sort-wrap { position: relative; }

        .li-sort-btn {
          display: flex; align-items: center; gap: 7px;
          padding: 9px 16px; border-radius: 12px;
          border: 1.5px solid var(--border);
          background: var(--card); color: var(--fg);
          font-size: 0.82rem; font-weight: 600;
          cursor: pointer; font-family: inherit;
          transition: all 0.2s;
        }
        .li-sort-btn:hover { border-color: var(--p); color: var(--p); }

        .li-sort-dropdown {
          position: absolute; right: 0; top: calc(100% + 8px);
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 14px; overflow: hidden;
          box-shadow: var(--sh-l);
          min-width: 180px; z-index: 50;
          animation: liSlideDown 0.2s ease;
        }

        .li-sort-opt {
          display: flex; align-items: center; gap: 8px;
          padding: 11px 16px; font-size: 0.84rem;
          color: var(--fg); cursor: pointer;
          transition: background 0.15s; font-family: inherit;
          border: none; background: none; width: 100%; text-align: left;
        }
        .li-sort-opt:hover { background: var(--p-pale); color: var(--p); }
        .li-sort-opt.active { color: var(--p); font-weight: 600; }
        .li-sort-opt-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: var(--p); margin-left: auto;
          flex-shrink: 0;
        }

        /* ══ Listing grid ══ */
        .li-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 24px;
        }
        @media (max-width: 480px) {
          .li-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 10px;
          }
        }

        /* ── Card ── */
        .li-card {
          text-decoration: none; color: inherit;
          display: flex; flex-direction: column;
          border-radius: 22px;
          background: var(--card);
          border: 1px solid var(--border);
          overflow: hidden;
          transition: all 0.35s cubic-bezier(.22,.68,0,1.15);
          position: relative;
        }
        .li-card:hover {
          transform: translateY(-7px);
          box-shadow: var(--sh-l);
          border-color: color-mix(in oklch, var(--p) 22%, var(--border));
        }

        .li-card-img-wrap {
          position: relative;
          aspect-ratio: 4 / 3;
          overflow: hidden;
        }

        .li-card-img {
          width: 100%; height: 100%;
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(.22,.68,0,1.15);
        }
        .li-card:hover .li-card-img { transform: scale(1.07); }

        /* Gradient scrim on image */
        .li-card-scrim {
          position: absolute; inset: 0;
          background: linear-gradient(
            to top,
            rgba(0,0,0,0.38) 0%,
            transparent 55%
          );
          pointer-events: none;
        }

        /* Like button */
        .li-like {
          position: absolute; top: 12px; right: 12px;
          width: 36px; height: 36px; border-radius: 50%;
          background: rgba(255,255,255,0.22);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255,255,255,0.3);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; z-index: 2; transition: all 0.22s;
          color: #fff;
        }
        .li-like:hover { background: rgba(255,255,255,0.92); color: var(--p); transform: scale(1.1); }
        .li-like.liked  { background: var(--p); border-color: var(--p); color: #fff; }
        .li-like.popping { animation: liPop 0.45s ease; }

        /* Type badge */
        .li-type {
          position: absolute; bottom: 12px; left: 12px; z-index: 2;
          padding: 4px 10px; border-radius: 100px;
          background: rgba(0,0,0,0.42);
          backdrop-filter: blur(8px);
          color: #fff; font-size: 0.68rem; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.07em;
        }

        /* Rating badge */
        .li-rating {
          position: absolute; bottom: 12px; right: 12px; z-index: 2;
          display: flex; align-items: center; gap: 3px;
          padding: 4px 10px; border-radius: 10px;
          background: rgba(255,255,255,0.92);
          backdrop-filter: blur(8px);
          font-size: 0.78rem; font-weight: 700;
          color: oklch(0.35 0.1 55);
        }
        .li-rating svg { color: oklch(0.7 0.18 55); }

        /* Card body */
        .li-card-body { padding: 16px 18px 18px; }

        .li-card-top {
          display: flex; align-items: flex-start;
          justify-content: space-between; gap: 8px;
          margin-bottom: 6px;
        }

        .li-card-title {
          font-size: 0.97rem; font-weight: 700;
          color: var(--fg); line-height: 1.3;
          transition: color 0.2s;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .li-card:hover .li-card-title { color: var(--p); }

        .li-card-loc {
          display: flex; align-items: center; gap: 4px;
          font-size: 0.78rem; color: var(--muted);
          margin-bottom: 12px;
        }

        .li-card-amenities {
          display: flex; gap: 12px;
          font-size: 0.74rem; color: var(--muted);
          margin-bottom: 14px;
        }
        .li-card-amenity { display: flex; align-items: center; gap: 4px; }

        .li-card-foot {
          display: flex; align-items: center;
          justify-content: space-between;
          padding-top: 14px;
          border-top: 1px solid var(--border);
        }

        .li-card-price {
          font-size: 1.15rem; font-weight: 800;
          color: var(--fg); letter-spacing: -0.01em;
        }
        .li-card-price span {
          font-size: 0.76rem; font-weight: 400;
          color: var(--muted); letter-spacing: 0;
        }

        .li-card-reviews {
          font-size: 0.74rem; color: var(--muted);
        }

        /* "Book now" hover CTA */
        .li-card-cta {
          display: none; align-items: center; gap: 5px;
          font-size: 0.78rem; font-weight: 700;
          color: var(--p); padding: 6px 12px;
          border-radius: 9px; background: var(--p-pale);
          transition: all 0.2s;
        }
        .li-card:hover .li-card-cta { display: flex; }
        .li-card:hover .li-card-reviews { display: none; }

        /* ══ Empty state ══ */
        .li-empty {
          grid-column: 1 / -1;
          text-align: center; padding: 80px 20px;
          animation: liIn 0.4s ease;
        }
        .li-empty-icon {
          width: 72px; height: 72px; border-radius: 20px;
          background: var(--p-pale); color: var(--p);
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto 20px; font-size: 2rem;
        }
        .li-empty-title {
          font-size: 1.2rem; font-weight: 700; color: var(--fg);
          margin-bottom: 8px;
        }
        .li-empty-desc {
          font-size: 0.88rem; color: var(--muted);
          max-width: 320px; margin: 0 auto 28px;
          line-height: 1.7;
        }
        .li-empty-btn {
          padding: 11px 28px; border-radius: 13px;
          background: var(--fg); color: #fff;
          font-size: 0.88rem; font-weight: 700;
          border: none; cursor: pointer;
          font-family: inherit; transition: all 0.22s;
        }
        .li-empty-btn:hover { background: var(--p); transform: translateY(-2px); }

        /* ══ Filter modal ══ */
        .li-modal-backdrop {
          position: fixed; inset: 0; z-index: 200;
          background: rgba(0,0,0,0.42);
          backdrop-filter: blur(6px);
          display: flex; align-items: flex-end;
          justify-content: center;
          padding: 0;
        }
        @media (min-width: 640px) {
          .li-modal-backdrop { align-items: center; padding: 20px; }
        }

        .li-modal {
          background: var(--card);
          border-radius: 28px 28px 0 0;
          width: 100%; max-width: 520px;
          box-shadow: var(--sh-l);
          overflow: hidden;
          animation: liIn 0.3s cubic-bezier(.22,.68,0,1.15);
        }
        @media (min-width: 640px) {
          .li-modal { border-radius: 28px; }
        }

        .li-modal-hdr {
          padding: 22px 24px 18px;
          border-bottom: 1px solid var(--border);
          display: flex; align-items: center; justify-content: space-between;
        }

        .li-modal-title {
          font-size: 1.1rem; font-weight: 700; color: var(--fg);
          letter-spacing: -0.01em;
        }

        .li-modal-close {
          width: 36px; height: 36px; border-radius: 50%;
          border: 1.5px solid var(--border);
          background: transparent; color: var(--muted);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; transition: all 0.2s;
          font-family: inherit;
        }
        .li-modal-close:hover { background: var(--p-pale); color: var(--p); border-color: var(--p); }

        .li-modal-body { padding: 24px; }

        .li-filter-section { margin-bottom: 28px; }

        .li-filter-label {
          font-size: 0.68rem; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.09em;
          color: var(--muted); margin-bottom: 14px;
          display: block;
        }

        .li-price-row {
          display: grid; grid-template-columns: 1fr 1fr; gap: 10px;
        }

        .li-price-field {
          display: flex; flex-direction: column; gap: 6px;
        }

        .li-price-input-wrap { position: relative; }

        .li-price-symbol {
          position: absolute; left: 12px; top: 50%;
          transform: translateY(-50%);
          font-size: 0.84rem; color: var(--muted); font-weight: 500;
        }

        .li-price-input {
          width: 100%;
          padding: 10px 12px 10px 26px;
          border-radius: 11px;
          border: 1.5px solid var(--border);
          background: var(--bg);
          font-size: 0.88rem; color: var(--fg);
          font-family: inherit; outline: none;
          transition: all 0.2s;
          box-sizing: border-box;
        }
        .li-price-input:focus { border-color: var(--p); box-shadow: 0 0 0 3px var(--p-ring); }

        /* Rating stars selector */
        .li-stars-row { display: flex; gap: 6px; }

        .li-star-btn {
          flex: 1; padding: 9px 0; border-radius: 10px;
          border: 1.5px solid var(--border);
          background: var(--bg); color: var(--muted);
          font-size: 0.8rem; font-weight: 600;
          cursor: pointer; text-align: center;
          font-family: inherit; transition: all 0.2s;
        }
        .li-star-btn:hover, .li-star-btn.active {
          border-color: var(--p); background: var(--p-pale);
          color: var(--p);
        }

        .li-modal-foot {
          padding: 16px 24px 24px;
          border-top: 1px solid var(--border);
          display: flex; gap: 10px;
        }

        .li-modal-reset {
          padding: 12px 20px; border-radius: 13px;
          border: 1.5px solid var(--border);
          background: transparent; color: var(--muted);
          font-size: 0.86rem; font-weight: 600;
          cursor: pointer; font-family: inherit; transition: all 0.2s;
        }
        .li-modal-reset:hover { border-color: var(--p); color: var(--p); }

        .li-modal-apply {
          flex: 1; padding: 12px; border-radius: 13px;
          background: var(--p); color: #fff;
          font-size: 0.9rem; font-weight: 700;
          border: none; cursor: pointer;
          font-family: inherit; transition: all 0.22s;
        }
        .li-modal-apply:hover {
          filter: brightness(1.08);
          transform: translateY(-1px);
          box-shadow: var(--sh-m);
        }

        /* ══ Responsive ══ */
        @media (max-width: 480px) {
          .li-card-amenities { display: none; }

          /* Search bar */
          .li-search-input  { font-size: 0.78rem; height: 42px; }
          .li-bar-btn       { font-size: 0.75rem; height: 42px; padding: 0 12px; gap: 5px; }
          .li-map-btn       { font-size: 0.75rem; height: 42px; padding: 0 14px; }
          .li-bar-inner     { padding: 0 14px; }
          .li-search-row    { gap: 7px; margin-bottom: 10px; }

          /* Category pills */
          .li-cat           { font-size: 0.72rem; padding: 6px 12px; }
          .li-cat-icon      { font-size: 0.88rem; }

          /* Page body */
          .li-body          { padding: 20px 14px; }

          /* Results header */
          .li-results-title { font-size: 1.05rem; }
          .li-results-count { font-size: 0.74rem; }

          /* Sort */
          .li-sort-btn      { font-size: 0.74rem; padding: 7px 12px; }
          .li-sort-opt      { font-size: 0.76rem; padding: 9px 14px; }

          /* Cards — 2-column layout */
          .li-card          { border-radius: 14px; }
          .li-card-body     { padding: 8px 10px 10px; }
          .li-card-title    { font-size: 0.76rem; -webkit-line-clamp: 2; }
          .li-card-loc      { font-size: 0.64rem; margin-bottom: 8px; }
          .li-card-price    { font-size: 0.9rem; }
          .li-card-price span { font-size: 0.6rem; }
          .li-card-reviews  { font-size: 0.6rem; }
          .li-card-cta      { font-size: 0.62rem; padding: 4px 8px; }
          .li-card-foot     { padding-top: 8px; }
          .li-type          { font-size: 0.56rem; padding: 3px 7px; bottom: 8px; left: 8px; }
          .li-rating        { font-size: 0.64rem; padding: 3px 7px; bottom: 8px; right: 8px; }
          .li-like          { width: 28px; height: 28px; top: 8px; right: 8px; }

          /* Empty state */
          .li-empty-title   { font-size: 1rem; }
          .li-empty-desc    { font-size: 0.78rem; }
          .li-empty-btn     { font-size: 0.78rem; padding: 9px 22px; }

          /* Filter modal */
          .li-modal-title   { font-size: 0.95rem; }
          .li-filter-label  { font-size: 0.62rem; }
          .li-price-input   { font-size: 0.78rem; }
          .li-star-btn      { font-size: 0.72rem; }
          .li-modal-reset   { font-size: 0.78rem; padding: 10px 14px; }
          .li-modal-apply   { font-size: 0.82rem; }
        }
      `}</style>

      <div className="li-page">

        {/* ── Sticky search bar ── */}
        <div className="li-bar">
          <div className="li-bar-inner">

            <div className="li-search-row">
              {/* Search input */}
              <div className="li-search-wrap">
                <span className="li-search-icon"><Search size={17} /></span>
                <input
                  type="text"
                  className="li-search-input"
                  placeholder="City, property name, or neighbourhood…"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Filters */}
              <button
                className={`li-bar-btn ${isFilterOpen ? 'active' : ''} ${activeFiltersCount > 0 ? 'active' : ''}`}
                onClick={() => setIsFilterOpen(true)}
              >
                <SlidersHorizontal size={16} />
                Filters
                {activeFiltersCount > 0 && (
                  <span className="li-filter-badge">{activeFiltersCount}</span>
                )}
              </button>

              {/* Map link */}
              <Link href="/guest/map" className="li-map-btn">
                <MapIcon size={16} />
                Map
              </Link>
            </div>

            {/* Category pills */}
            <div className="li-cats">
              {CATEGORIES.map(cat => (
                <button
                  key={cat.label}
                  className={`li-cat ${activeCategory === cat.label ? 'active' : ''}`}
                  onClick={() => setActiveCategory(cat.label)}
                >
                  <span className="li-cat-icon">{cat.icon}</span>
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Main body ── */}
        <div className="li-body">

          {/* Results header */}
          <div className="li-results-hdr">
            <div>
              <h2 className="li-results-title">
                {activeCategory === 'All' ? (
                  <>
                    <TrendingUp size={20} color="var(--p)" />
                    Featured Stays
                  </>
                ) : (
                  <>
                    <Sparkles size={20} color="var(--p)" />
                    {activeCategory}
                  </>
                )}
              </h2>
              <p className="li-results-count">
                {filteredListings.length} {filteredListings.length === 1 ? 'property' : 'properties'}
                {searchQuery && ` for "${searchQuery}"`}
              </p>
            </div>

            {/* Sort */}
            <div className="li-sort-wrap">
              <button
                className="li-sort-btn"
                onClick={() => setShowSort(p => !p)}
              >
                <ArrowUpDown size={14} />
                {SORT_OPTIONS.find(s => s.value === sortBy)?.label}
                <ChevronDown size={13} style={{ opacity: 0.5 }} />
              </button>

              {showSort && (
                <>
                  <div
                    style={{ position: 'fixed', inset: 0, zIndex: 40 }}
                    onClick={() => setShowSort(false)}
                  />
                  <div className="li-sort-dropdown" style={{ zIndex: 50 }}>
                    {SORT_OPTIONS.map(opt => (
                      <button
                        key={opt.value}
                        className={`li-sort-opt ${sortBy === opt.value ? 'active' : ''}`}
                        onClick={() => { setSortBy(opt.value); setShowSort(false); }}
                      >
                        {opt.label}
                        {sortBy === opt.value && <span className="li-sort-opt-dot" />}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Grid */}
          {filteredListings.length === 0 ? (
            <div className="li-grid">
              <div className="li-empty">
                <div className="li-empty-icon">🔍</div>
                <h3 className="li-empty-title">No properties found</h3>
                <p className="li-empty-desc">
                  We couldn't find any stays matching your filters. Try broadening your search or clearing the filters.
                </p>
                <button
                  className="li-empty-btn"
                  onClick={() => { setSearchQuery(''); setActiveCategory('All'); setMinPrice(''); setMaxPrice(''); setMinRating(0); }}
                >
                  Clear all filters
                </button>
              </div>
            </div>
          ) : (
            <div className="li-grid">
              {filteredListings.map((listing, i) => (
                <Link
                  key={listing.id}
                  href={`/guest/listings/${listing.id}`}
                  className={`li-card li-up li-d${Math.min(i + 1, 3)}`}
                >
                  {/* Image */}
                  <div className="li-card-img-wrap">
                    <img
                      src={listing.image}
                      alt={listing.title}
                      className="li-card-img"
                      loading={i < 8 ? 'eager' : 'lazy'}
                    />
                    <div className="li-card-scrim" />

                    {/* Like */}
                    <button
                      className={`li-like ${liked.has(listing.id) ? 'liked' : ''} ${likeAnim === listing.id ? 'popping' : ''}`}
                      onClick={e => toggleLike(listing.id, e)}
                      aria-label="Save listing"
                    >
                      <Heart
                        size={16}
                        fill={liked.has(listing.id) ? '#fff' : 'none'}
                        strokeWidth={liked.has(listing.id) ? 0 : 2}
                      />
                    </button>

                    {/* Type */}
                    <div className="li-type">{listing.type}</div>

                    {/* Rating */}
                    <div className="li-rating">
                      <Star size={11} fill="currentColor" />
                      {listing.rating}
                    </div>
                  </div>

                  {/* Body */}
                  <div className="li-card-body">
                    <div className="li-card-top">
                      <h3 className="li-card-title">{listing.title}</h3>
                    </div>

                    <div className="li-card-loc">
                      <MapPin size={12} color="var(--p)" />
                      {listing.city}, {listing.country}
                    </div>

                    <div className="li-card-amenities">
                      {listing.maxGuests && (
                        <span className="li-card-amenity">
                          <Users size={12} />
                          {listing.maxGuests} guests
                        </span>
                      )}
                      {listing.bedrooms && (
                        <span className="li-card-amenity">
                          <Bed size={12} />
                          {listing.bedrooms} bed{listing.bedrooms > 1 ? 's' : ''}
                        </span>
                      )}
                      {listing.bathrooms && (
                        <span className="li-card-amenity">
                          <Bath size={12} />
                          {listing.bathrooms} bath
                        </span>
                      )}
                    </div>

                    <div className="li-card-foot">
                      <div className="li-card-price">
                        ${listing.pricePerNight}
                        <span> / night</span>
                      </div>
                      <div className="li-card-reviews">
                        {listing.reviews} reviews
                      </div>
                      <div className="li-card-cta">
                        Book now →
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* ── Filter Modal ── */}
        {isFilterOpen && (
          <div className="li-modal-backdrop" onClick={e => { if (e.target === e.currentTarget) setIsFilterOpen(false); }}>
            <div className="li-modal">
              <div className="li-modal-hdr">
                <span className="li-modal-title">Filters</span>
                <button className="li-modal-close" onClick={() => setIsFilterOpen(false)}>
                  <X size={16} />
                </button>
              </div>

              <div className="li-modal-body">

                {/* Price range */}
                <div className="li-filter-section">
                  <span className="li-filter-label">Price range · per night</span>
                  <div className="li-price-row">
                    <div className="li-price-field">
                      <div className="li-price-input-wrap">
                        <span className="li-price-symbol">$</span>
                        <input
                          type="number"
                          className="li-price-input"
                          placeholder="Min"
                          value={minPrice}
                          onChange={e => setMinPrice(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="li-price-field">
                      <div className="li-price-input-wrap">
                        <span className="li-price-symbol">$</span>
                        <input
                          type="number"
                          className="li-price-input"
                          placeholder="Max"
                          value={maxPrice}
                          onChange={e => setMaxPrice(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Minimum rating */}
                <div className="li-filter-section">
                  <span className="li-filter-label">Minimum rating</span>
                  <div className="li-stars-row">
                    {[0, 3, 3.5, 4, 4.5].map((r, i) => (
                      <button
                        key={r}
                        className={`li-star-btn ${minRating === r ? 'active' : ''}`}
                        onClick={() => setMinRating(r)}
                      >
                        {r === 0 ? 'Any' : `${r}+★`}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Category quick-pick */}
                <div className="li-filter-section" style={{ marginBottom: 0 }}>
                  <span className="li-filter-label">Property type</span>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    {CATEGORIES.map(cat => (
                      <button
                        key={cat.label}
                        className={`li-cat ${activeCategory === cat.label ? 'active' : ''}`}
                        style={{ fontSize: '0.78rem', padding: '6px 14px' }}
                        onClick={() => setActiveCategory(cat.label)}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="li-modal-foot">
                <button
                  className="li-modal-reset"
                  onClick={() => { setMinPrice(''); setMaxPrice(''); setMinRating(0); setActiveCategory('All'); }}
                >
                  Reset all
                </button>
                <button className="li-modal-apply" onClick={() => setIsFilterOpen(false)}>
                  Show {filteredListings.length} {filteredListings.length === 1 ? 'property' : 'properties'}
                </button>
              </div>
            </div>
          </div>
        )}

        <BottomNav />
      </div>
    </>
  );
}