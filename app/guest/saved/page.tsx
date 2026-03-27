'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Heart, MapPin, Star, ArrowLeft, Search, Trash2, Grid3X3, LayoutList } from 'lucide-react';
import { MOCK_LISTINGS } from '@/lib/mock-data';
import BottomNav from '@/components/navigation/bottom-nav';

export default function SavedStaysPage() {
  const [savedItems, setSavedItems] = useState(MOCK_LISTINGS.slice(0, 3));
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [removing, setRemoving] = useState<string | null>(null);

  const removeSaved = (id: string) => {
    setRemoving(id);
    setTimeout(() => {
      setSavedItems(prev => prev.filter(item => item.id !== id));
      setRemoving(null);
    }, 400);
  };

  return (
    <div className="ss-root">
      <style>{`
        @keyframes ssIn {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes ssLeft {
          from { opacity: 0; transform: translateX(-20px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes ssFade {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes ssRemove {
          to { opacity: 0; transform: scale(0.92); }
        }
        @keyframes ssHeartPop {
          0%   { transform: scale(1); }
          40%  { transform: scale(1.4); }
          70%  { transform: scale(0.88); }
          100% { transform: scale(1); }
        }
        @keyframes ssPulse {
          0%,100% { opacity: 1; }
          50%     { opacity: 0.5; }
        }
        @keyframes ssFloat {
          0%,100% { transform: translateY(0); }
          50%     { transform: translateY(-6px); }
        }

        .ss-root {
          --p:        oklch(0.4 0.155 11.87);
          --p-hover:  oklch(0.35 0.155 11.87);
          --p-pale:   var(--p-pale, oklch(0.96 0.02 11.87));
          --p-ring:   var(--p-ring, oklch(0.4 0.155 11.87 / 0.12));
          --p-shadow: oklch(0.4 0.155 11.87 / 0.25);
          --bg:       var(--background);
          --bg2:      var(--muted, oklch(0.975 0.002 0));
          --fg:       var(--foreground);
          --fg2:      var(--foreground);
          --muted:    var(--muted-foreground);
          --border:   var(--border);
          --card:     var(--card);
          --amber:    oklch(0.72 0.17 55);
          
          min-height: 100vh;
          background: var(--bg);
          font-family: var(--font-sans), system-ui, sans-serif;
          color: var(--fg);
          padding-bottom: 96px;
        }

        /* ── Page header ── */
        .ss-header {
          max-width: 1320px;
          margin: 0 auto;
          padding: 40px 32px 0;
          animation: ssIn 0.6s cubic-bezier(.22,.68,0,1.1) both;
        }

        .ss-back {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px 8px 10px;
          border-radius: 100px;
          font-size: 0.83rem;
          font-weight: 600;
          color: var(--muted);
          text-decoration: none;
          background: var(--card);
          border: 1px solid var(--border);
          transition: all 0.2s;
          margin-bottom: 28px;
        }
        .ss-back:hover { color: var(--p); border-color: color-mix(in oklch, var(--p) 30%, var(--border)); transform: translateX(-2px); }

        .ss-title-row {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 20px;
          margin-bottom: 8px;
        }

        .ss-title {
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 800;
          letter-spacing: -0.03em;
          line-height: 1.05;
          color: var(--fg);
        }

        .ss-title-accent {
          background: linear-gradient(135deg, var(--p) 0%, oklch(0.55 0.18 30) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .ss-count-pill {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 10px 20px;
          border-radius: 100px;
          background: var(--p);
          color: #fff;
          font-size: 0.85rem;
          font-weight: 700;
          letter-spacing: 0.02em;
          box-shadow: 0 4px 20px var(--p-shadow);
          flex-shrink: 0;
        }

        .ss-subtitle {
          font-size: 0.95rem;
          color: var(--muted);
          margin-bottom: 32px;
          font-weight: 400;
          line-height: 1.6;
        }

        /* ── Toolbar ── */
        .ss-toolbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 20px;
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 16px;
          margin-bottom: 32px;
          gap: 12px;
          flex-wrap: wrap;
          animation: ssIn 0.6s 0.1s cubic-bezier(.22,.68,0,1.1) both;
        }

        .ss-toolbar-left {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 0.82rem;
          color: var(--muted);
          font-weight: 500;
        }

        .ss-toolbar-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--p); display: inline-block; }

        .ss-view-btns {
          display: flex;
          gap: 4px;
          background: var(--bg2);
          border: 1px solid var(--border);
          border-radius: 10px;
          padding: 3px;
        }

        .ss-view-btn {
          width: 34px; height: 34px;
          border-radius: 8px;
          border: none;
          background: transparent;
          color: var(--muted);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
          font-family: inherit;
        }
        .ss-view-btn.active { background: var(--card); color: var(--p); box-shadow: 0 1px 4px rgba(0,0,0,0.08); }
        .ss-view-btn:hover:not(.active) { color: var(--fg); }

        /* ── Grid layout ── */
        .ss-grid {
          max-width: 1320px;
          margin: 0 auto;
          padding: 0 32px;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 28px;
          animation: ssFade 0.4s ease both;
        }
        @media (max-width: 1100px) { .ss-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 640px)  { .ss-grid { grid-template-columns: 1fr; padding: 0 16px; } }

        /* ── List layout ── */
        .ss-list {
          max-width: 1320px;
          margin: 0 auto;
          padding: 0 32px;
          display: flex;
          flex-direction: column;
          gap: 16px;
          animation: ssFade 0.4s ease both;
        }
        @media (max-width: 640px) { .ss-list { padding: 0 16px; } }

        /* ── Card (grid) ── */
        .ss-card {
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 24px;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(.22,.68,0,1.1);
          text-decoration: none;
          color: inherit;
          display: flex;
          flex-direction: column;
          position: relative;
          animation: ssIn 0.55s cubic-bezier(.22,.68,0,1.1) both;
        }
        .ss-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 24px 64px var(--p-ring);
          border-color: color-mix(in oklch, var(--p) 20%, var(--border));
        }
        .ss-card.removing { animation: ssRemove 0.35s ease forwards; }

        .ss-card-img-wrap {
          position: relative;
          aspect-ratio: 4/3;
          overflow: hidden;
          background: var(--bg2);
        }
        .ss-card-img {
          width: 100%; height: 100%;
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(.22,.68,0,1.1);
        }
        .ss-card:hover .ss-card-img { transform: scale(1.07); }

        .ss-card-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 55%);
          opacity: 0;
          transition: opacity 0.4s;
        }
        .ss-card:hover .ss-card-overlay { opacity: 1; }

        .ss-card-type {
          position: absolute; top: 14px; left: 14px;
          padding: 4px 12px; border-radius: 8px;
          background: rgba(255,255,255,0.92);
          backdrop-filter: blur(10px);
          font-size: 0.68rem; font-weight: 700;
          letter-spacing: 0.07em; text-transform: uppercase;
          color: var(--fg);
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }

        .ss-card-price-hover {
          position: absolute; bottom: 14px; left: 14px; right: 14px;
          padding: 12px 16px;
          background: rgba(255,255,255,0.15);
          backdrop-filter: blur(16px);
          border: 1px solid rgba(255,255,255,0.25);
          border-radius: 14px;
          color: #fff;
          display: flex; align-items: center; justify-content: space-between;
          font-size: 0.88rem; font-weight: 600;
          transform: translateY(8px);
          opacity: 0;
          transition: all 0.35s cubic-bezier(.22,.68,0,1.1);
        }
        .ss-card:hover .ss-card-price-hover { opacity: 1; transform: translateY(0); }

        .ss-remove-btn {
          position: absolute; top: 14px; right: 14px; z-index: 3;
          width: 38px; height: 38px;
          border-radius: 50%;
          background: rgba(255,255,255,0.9);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255,255,255,0.6);
          box-shadow: 0 2px 12px rgba(0,0,0,0.12);
          cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          color: var(--p);
          transition: all 0.25s;
          font-family: inherit;
        }
        .ss-remove-btn:hover {
          background: var(--p);
          color: #fff;
          transform: scale(1.1);
          box-shadow: 0 4px 16px var(--p-shadow);
          animation: ssHeartPop 0.4s ease;
        }

        .ss-card-body { padding: 18px 20px 22px; display: flex; flex-direction: column; gap: 8px; }

        .ss-card-title {
          font-size: 1.05rem; font-weight: 700;
          color: var(--fg); line-height: 1.3;
          transition: color 0.2s;
          display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden;
        }
        .ss-card:hover .ss-card-title { color: var(--p); }

        .ss-card-loc {
          display: flex; align-items: center; gap: 5px;
          font-size: 0.78rem; color: var(--muted);
        }
        .ss-card-loc svg { color: var(--p); flex-shrink: 0; }

        .ss-card-foot {
          margin-top: 4px;
          display: flex; align-items: center; justify-content: space-between;
          padding-top: 14px;
          border-top: 1px solid var(--border);
        }
        .ss-card-price { font-size: 1.1rem; font-weight: 700; color: var(--fg); }
        .ss-card-price span { font-size: 0.74rem; font-weight: 400; color: var(--muted); }
        .ss-card-rating {
          display: flex; align-items: center; gap: 4px;
          padding: 4px 10px; border-radius: 8px;
          background: oklch(0.98 0.02 55);
          font-size: 0.8rem; font-weight: 700;
          color: oklch(0.35 0.1 55);
        }

        /* ── List card ── */
        .ss-list-card {
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 20px;
          overflow: hidden;
          display: grid;
          grid-template-columns: 260px 1fr auto;
          align-items: center;
          gap: 0;
          transition: all 0.3s cubic-bezier(.22,.68,0,1.1);
          text-decoration: none;
          color: inherit;
          position: relative;
          animation: ssLeft 0.5s cubic-bezier(.22,.68,0,1.1) both;
        }
        .ss-list-card:hover {
          transform: translateX(4px);
          box-shadow: 0 8px 32px var(--p-ring);
          border-color: color-mix(in oklch, var(--p) 20%, var(--border));
        }
        .ss-list-card.removing { animation: ssRemove 0.35s ease forwards; }

        .ss-list-img-wrap { position: relative; height: 160px; overflow: hidden; }
        .ss-list-img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s ease; }
        .ss-list-card:hover .ss-list-img { transform: scale(1.05); }

        .ss-list-body {
          padding: 20px 24px;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .ss-list-type {
          font-size: 0.68rem; font-weight: 700; letter-spacing: 0.07em; text-transform: uppercase;
          color: var(--p);
        }
        .ss-list-title { font-size: 1.15rem; font-weight: 700; color: var(--fg); line-height: 1.3; }
        .ss-list-card:hover .ss-list-title { color: var(--p); }
        .ss-list-loc { display: flex; align-items: center; gap: 5px; font-size: 0.8rem; color: var(--muted); }
        .ss-list-meta { display: flex; gap: 16px; margin-top: 6px; font-size: 0.78rem; color: var(--muted); }
        .ss-list-meta-item { display: flex; align-items: center; gap: 4px; }

        .ss-list-right {
          padding: 20px 24px;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 12px;
          border-left: 1px solid var(--border);
          min-width: 140px;
        }
        .ss-list-price { font-size: 1.3rem; font-weight: 800; color: var(--fg); }
        .ss-list-price span { font-size: 0.75rem; font-weight: 400; color: var(--muted); display: block; }
        .ss-list-rating { display: flex; align-items: center; gap: 4px; font-size: 0.82rem; font-weight: 700; color: oklch(0.35 0.1 55); }
        .ss-list-remove {
          width: 36px; height: 36px; border-radius: 10px;
          background: var(--bg2); border: 1px solid var(--border);
          color: var(--muted); cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: all 0.2s; font-family: inherit;
        }
        .ss-list-remove:hover { background: oklch(0.97 0.02 11.87); color: var(--p); border-color: color-mix(in oklch, var(--p) 25%, var(--border)); }

        @media (max-width: 768px) {
          .ss-list-card { grid-template-columns: 140px 1fr; }
          .ss-list-right { display: none; }
          .ss-list-img-wrap { height: 120px; }
        }

        /* ── Empty state ── */
        .ss-empty {
          max-width: 1320px; margin: 0 auto; padding: 0 32px;
          animation: ssIn 0.6s cubic-bezier(.22,.68,0,1.1) both;
        }
        .ss-empty-inner {
          display: flex; flex-direction: column; align-items: center;
          justify-content: center; padding: 80px 40px;
          background: var(--card);
          border: 1px dashed var(--border);
          border-radius: 32px;
          text-align: center;
        }
        .ss-empty-icon {
          width: 96px; height: 96px; border-radius: 28px;
          background: var(--p-pale); color: var(--p);
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 28px;
          animation: ssFloat 3s ease-in-out infinite;
        }
        .ss-empty-title { font-size: 1.6rem; font-weight: 800; letter-spacing: -0.02em; margin-bottom: 10px; color: var(--fg); }
        .ss-empty-sub { font-size: 0.92rem; color: var(--muted); max-width: 360px; line-height: 1.7; margin-bottom: 32px; }
        .ss-empty-btn {
          display: inline-flex; align-items: center; gap: 10px;
          padding: 14px 32px; border-radius: 14px;
          background: var(--p); color: #fff;
          font-weight: 700; font-size: 0.92rem;
          text-decoration: none; border: none; cursor: pointer;
          transition: all 0.25s; font-family: inherit;
          box-shadow: 0 6px 24px var(--p-shadow);
        }
        .ss-empty-btn:hover { background: var(--p-hover); transform: translateY(-2px); box-shadow: 0 10px 32px var(--p-shadow); }

        /* Responsive header */
        @media (max-width: 640px) {
          .ss-header { padding: 24px 16px 0; }
          .ss-toolbar { padding: 10px 14px; }
          .ss-grid { padding: 0 16px; }
          .ss-empty { padding: 0 16px; }
        }
      `}</style>

      {/* ── Page Header ── */}
      <div className="ss-header">
        <Link href="/guest" className="ss-back">
          <ArrowLeft size={15} />
          Back to Home
        </Link>

        <div className="ss-title-row">
          <h1 className="ss-title">
            Your <span className="ss-title-accent">Saved</span><br />Stays
          </h1>
          {savedItems.length > 0 && (
            <div className="ss-count-pill">
              <Heart size={14} fill="currentColor" />
              {savedItems.length} {savedItems.length === 1 ? 'stay' : 'stays'} saved
            </div>
          )}
        </div>
        <p className="ss-subtitle">Your personal collection of hand-picked dream destinations.</p>

        {/* Toolbar */}
        {savedItems.length > 0 && (
          <div className="ss-toolbar">
            <div className="ss-toolbar-left">
              <span className="ss-toolbar-dot" />
              Showing {savedItems.length} saved {savedItems.length === 1 ? 'property' : 'properties'}
            </div>
            <div className="ss-view-btns">
              <button className={`ss-view-btn ${view === 'grid' ? 'active' : ''}`} onClick={() => setView('grid')}>
                <Grid3X3 size={15} />
              </button>
              <button className={`ss-view-btn ${view === 'list' ? 'active' : ''}`} onClick={() => setView('list')}>
                <LayoutList size={15} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ── Content ── */}
      {savedItems.length > 0 ? (
        view === 'grid' ? (
          <div className="ss-grid">
            {savedItems.map((listing, index) => (
              <div
                key={listing.id}
                className={`ss-card ${removing === listing.id ? 'removing' : ''}`}
                style={{ animationDelay: `${index * 0.08}s` }}
              >
                {/* Remove button */}
                <button
                  className="ss-remove-btn"
                  onClick={() => removeSaved(listing.id)}
                  aria-label="Remove from saved"
                >
                  <Heart size={16} fill="currentColor" />
                </button>

                {/* Image */}
                <Link href={`/guest/listings/${listing.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <div className="ss-card-img-wrap">
                    <img src={listing.image} alt={listing.title} className="ss-card-img" />
                    <div className="ss-card-overlay" />
                    <div className="ss-card-type">{listing.type}</div>
                    <div className="ss-card-price-hover">
                      <span>${listing.pricePerNight}<span style={{ fontWeight: 400, opacity: 0.8, fontSize: '0.78rem' }}> / night</span></span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                        <Star size={12} fill="currentColor" />
                        {listing.rating}
                      </div>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="ss-card-body">
                    <h3 className="ss-card-title">{listing.title}</h3>
                    <div className="ss-card-loc">
                      <MapPin size={12} />
                      {listing.city}, {listing.country}
                    </div>
                    <div className="ss-card-foot">
                      <div className="ss-card-price">
                        ${listing.pricePerNight}
                        <span> / night</span>
                      </div>
                      <div className="ss-card-rating">
                        <Star size={11} fill="currentColor" color="oklch(0.72 0.17 55)" />
                        {listing.rating}
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="ss-list">
            {savedItems.map((listing, index) => (
              <div
                key={listing.id}
                className={`ss-list-card ${removing === listing.id ? 'removing' : ''}`}
                style={{ animationDelay: `${index * 0.07}s` }}
              >
                <Link href={`/guest/listings/${listing.id}`} style={{ display: 'contents', textDecoration: 'none', color: 'inherit' }}>
                  <div className="ss-list-img-wrap">
                    <img src={listing.image} alt={listing.title} className="ss-list-img" />
                  </div>
                  <div className="ss-list-body">
                    <div className="ss-list-type">{listing.type}</div>
                    <h3 className="ss-list-title">{listing.title}</h3>
                    <div className="ss-list-loc">
                      <MapPin size={13} color="var(--p)" />
                      {listing.city}, {listing.country}
                    </div>
                    <div className="ss-list-meta">
                      <span className="ss-list-meta-item">{listing.bedrooms} bed{listing.bedrooms > 1 ? 's' : ''}</span>
                      <span className="ss-list-meta-item">{listing.bathrooms} bath</span>
                      <span className="ss-list-meta-item">{listing.maxGuests} guests</span>
                    </div>
                  </div>
                </Link>
                <div className="ss-list-right">
                  <div className="ss-list-price">
                    ${listing.pricePerNight}
                    <span>per night</span>
                  </div>
                  <div className="ss-list-rating">
                    <Star size={13} fill="oklch(0.72 0.17 55)" color="oklch(0.72 0.17 55)" />
                    {listing.rating} · {listing.reviews} reviews
                  </div>
                  <button
                    className="ss-list-remove"
                    onClick={() => removeSaved(listing.id)}
                    aria-label="Remove from saved"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )
      ) : (
        <div className="ss-empty">
          <div className="ss-empty-inner">
            <div className="ss-empty-icon">
              <Heart size={42} strokeWidth={1.5} />
            </div>
            <h2 className="ss-empty-title">Nothing saved yet</h2>
            <p className="ss-empty-sub">
              Browse our curated collection of properties and tap the heart icon to save your favourites here.
            </p>
            <Link href="/guest" className="ss-empty-btn">
              <Search size={18} />
              Explore Stays
            </Link>
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  );
}