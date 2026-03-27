'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Calendar, MapPin, Users, MessageSquare, ArrowRight,
  Plane, Landmark, History, XCircle, Star, Clock,
  ChevronRight, Shield, Sparkles, Receipt,
} from 'lucide-react';
import { MOCK_BOOKINGS, MOCK_LISTINGS } from '@/lib/mock-data';
import BottomNav from '@/components/navigation/bottom-nav';

const getListing = (id: string) => MOCK_LISTINGS.find(l => l.id === id);

const TABS = [
  { key: 'upcoming',  label: 'Upcoming',  icon: <Plane    size={14} /> },
  { key: 'past',      label: 'Past',      icon: <History  size={14} /> },
  { key: 'cancelled', label: 'Cancelled', icon: <XCircle  size={14} /> },
] as const;

type TabKey = 'upcoming' | 'past' | 'cancelled';

const STATUS_CONFIG: Record<TabKey, { label: string; color: string; bg: string }> = {
  upcoming:  { label: 'Confirmed',  color: '#16a34a', bg: 'rgba(22,163,74,0.12)'   },
  past:      { label: 'Completed',  color: '#2563eb', bg: 'rgba(37,99,235,0.12)'   },
  cancelled: { label: 'Cancelled',  color: '#dc2626', bg: 'rgba(220,38,38,0.12)'   },
};

function nights(checkIn: string, checkOut: string) {
  return Math.round((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / 86400000);
}

function fmtDate(d: string) {
  return new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

export default function BookingsPage() {
  const [activeTab, setActiveTab] = useState<TabKey>('upcoming');

  const guestBookings = MOCK_BOOKINGS.filter(b => b.guestId === 'user-guest-1');

  const categories: Record<TabKey, typeof guestBookings> = {
    upcoming:  guestBookings.filter(b => b.status === 'confirmed' && new Date(b.checkIn) > new Date()),
    past:      guestBookings.filter(b => b.status === 'confirmed' && new Date(b.checkIn) <= new Date()),
    cancelled: guestBookings.filter(b => b.status === 'cancelled'),
  };

  const status = STATUS_CONFIG[activeTab];

  return (
    <>
      <style>{`
        /* ══ Tokens ══ */
        .bk-page {
          --p:      oklch(0.4 0.155 11.87);
          --p-l:    oklch(0.6 0.155 11.87);
          --p-pale: var(--p-pale, oklch(0.96 0.028 11.87));
          --p-ring: var(--p-ring, oklch(0.4 0.155 11.87 / 0.13));
          --fg:     var(--foreground);
          --muted:  var(--muted-foreground);
          --subtle: var(--muted-foreground);
          --border: var(--border);
          --card:   var(--card);
          --bg:     var(--background);
          --sh-s:   0 2px 8px  rgba(0,0,0,0.05);
          --sh-m:   0 8px 32px rgba(0,0,0,0.08);
          --sh-l:   0 20px 64px rgba(0,0,0,0.12);
          font-family: var(--font-sans), system-ui, sans-serif;
          background: var(--bg);
          color: var(--fg);
          min-height: 100vh;
          padding-bottom: 120px;
        }

        /* ══ Keyframes ══ */
        @keyframes bkUp   { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        @keyframes bkIn   { from{opacity:0;transform:scale(.97)} to{opacity:1;transform:scale(1)} }
        @keyframes bkFade { from{opacity:0} to{opacity:1} }

        .bk-up   { animation: bkUp  0.6s cubic-bezier(.22,.68,0,1.15) both; }
        .bk-in   { animation: bkIn  0.5s cubic-bezier(.22,.68,0,1.15) both; }
        .bk-d1   { animation-delay: .06s; }
        .bk-d2   { animation-delay: .12s; }
        .bk-d3   { animation-delay: .18s; }

        /* ══ Page body ══ */
        .bk-body {
          max-width: 900px;
          margin: 0 auto;
          padding: 40px 20px 0;
        }
        @media (min-width: 768px) { .bk-body { padding: 56px 32px 0; } }

        /* ══ Page header ══ */
        .bk-header { margin-bottom: 36px; }

        .bk-eyebrow {
          display: inline-flex; align-items: center; gap: 7px;
          font-size: 0.72rem; font-weight: 700;
          letter-spacing: 0.1em; text-transform: uppercase;
          color: var(--p); margin-bottom: 10px;
        }
        .bk-eyebrow::before {
          content: ''; width: 22px; height: 2px;
          background: var(--p); border-radius: 2px; flex-shrink: 0;
        }

        .bk-title {
          font-size: clamp(2rem, 5vw, 3rem);
          font-weight: 800; letter-spacing: -0.03em;
          color: var(--fg); line-height: 1.1;
          margin-bottom: 6px;
        }

        .bk-subtitle {
          font-size: 0.9rem; color: var(--muted); font-weight: 400;
        }

        /* ══ Summary strip ══ */
        .bk-summary {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px; margin-bottom: 32px;
        }
        @media (max-width: 480px) {
          .bk-summary { grid-template-columns: repeat(2, 1fr); }
          .bk-summary-item:last-child { grid-column: 1 / -1; }
        }

        .bk-summary-item {
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 16px; padding: 14px 16px;
          transition: all 0.25s;
        }
        .bk-summary-item:hover { box-shadow: var(--sh-s); border-color: color-mix(in oklch, var(--p) 22%, var(--border)); }

        .bk-sum-val {
          font-size: 1.5rem; font-weight: 800;
          color: var(--fg); line-height: 1;
        }
        .bk-sum-val span { color: var(--p); }

        .bk-sum-lbl {
          font-size: 0.72rem; color: var(--muted);
          margin-top: 3px; font-weight: 500;
        }

        /* ══ Tabs ══ */
        .bk-tabs-wrap {
          display: flex; gap: 0;
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 16px; padding: 5px;
          margin-bottom: 32px;
          width: fit-content;
        }

        .bk-tab {
          display: flex; align-items: center; gap: 7px;
          padding: 9px 20px; border-radius: 12px;
          font-size: 0.85rem; font-weight: 600;
          color: var(--muted); cursor: pointer;
          border: none; background: none;
          font-family: inherit; transition: all 0.22s;
          white-space: nowrap;
        }

        .bk-tab:hover { color: var(--fg); }

        .bk-tab.active {
          background: var(--p);
          color: #fff;
          box-shadow: 0 3px 12px oklch(0.4 0.155 11.87 / 0.28);
        }

        .bk-tab-count {
          font-size: 0.7rem; font-weight: 700;
          padding: 1px 6px; border-radius: 100px;
          background: rgba(255,255,255,0.22);
        }

        .bk-tab:not(.active) .bk-tab-count {
          background: var(--border);
          color: var(--muted);
        }

        /* ══ Booking card ══ */
        .bk-card {
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 24px; overflow: hidden;
          transition: all 0.35s cubic-bezier(.22,.68,0,1.15);
          margin-bottom: 20px;
        }
        .bk-card:hover {
          transform: translateY(-5px);
          box-shadow: var(--sh-l);
          border-color: color-mix(in oklch, var(--p) 22%, var(--border));
        }

        .bk-card-inner {
          display: flex; flex-direction: column;
        }
        @media (min-width: 680px) { .bk-card-inner { flex-direction: row; } }

        /* Image side */
        .bk-card-img-side {
          position: relative;
          flex-shrink: 0;
        }
        @media (min-width: 680px) { .bk-card-img-side { width: 280px; } }

        .bk-card-img-wrap {
          position: relative;
          height: 220px; overflow: hidden;
        }
        @media (min-width: 680px) { .bk-card-img-wrap { height: 100%; min-height: 240px; } }

        .bk-card-img {
          width: 100%; height: 100%; object-fit: cover;
          transition: transform 0.6s cubic-bezier(.22,.68,0,1.15);
        }
        .bk-card:hover .bk-card-img { transform: scale(1.06); }

        /* Gradient scrim */
        .bk-card-scrim {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 55%);
          pointer-events: none;
        }

        /* Status pill */
        .bk-status {
          position: absolute; top: 14px; left: 14px;
          display: flex; align-items: center; gap: 5px;
          padding: 4px 11px; border-radius: 100px;
          font-size: 0.68rem; font-weight: 800;
          text-transform: uppercase; letter-spacing: 0.07em;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,0.25);
        }
        .bk-status-dot {
          width: 5px; height: 5px; border-radius: 50%;
        }

        /* Nights badge */
        .bk-nights {
          position: absolute; bottom: 14px; right: 14px;
          padding: 5px 11px; border-radius: 10px;
          background: rgba(255,255,255,0.14);
          backdrop-filter: blur(14px);
          border: 1px solid rgba(255,255,255,0.25);
          color: #fff; font-size: 0.74rem; font-weight: 700;
        }

        /* Rating on image */
        .bk-card-rating {
          position: absolute; bottom: 14px; left: 14px;
          display: flex; align-items: center; gap: 3px;
          padding: 4px 9px; border-radius: 9px;
          background: rgba(255,255,255,0.92);
          backdrop-filter: blur(8px);
          font-size: 0.74rem; font-weight: 700;
          color: oklch(0.35 0.1 55);
        }
        .bk-card-rating svg { color: oklch(0.7 0.18 55); }

        /* Content side */
        .bk-card-content {
          flex: 1; padding: 22px 24px;
          display: flex; flex-direction: column;
          justify-content: space-between; gap: 16px;
        }

        /* Top: title + price */
        .bk-card-top {
          display: flex; align-items: flex-start;
          justify-content: space-between; gap: 12px;
        }

        .bk-card-title {
          font-size: 1.08rem; font-weight: 700;
          color: var(--fg); line-height: 1.3;
          transition: color 0.2s; margin-bottom: 5px;
        }
        .bk-card:hover .bk-card-title { color: var(--p); }

        .bk-card-loc {
          display: flex; align-items: center; gap: 4px;
          font-size: 0.8rem; color: var(--muted);
        }

        .bk-price-block { text-align: right; flex-shrink: 0; }
        .bk-price-label {
          font-size: 0.65rem; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.09em;
          color: var(--muted); margin-bottom: 2px;
        }
        .bk-price-val {
          font-size: 1.35rem; font-weight: 800;
          color: var(--p); letter-spacing: -0.02em;
        }

        /* Date grid */
        .bk-dates {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 0;
          border: 1px solid var(--border);
          border-radius: 14px; overflow: hidden;
        }

        .bk-date-cell {
          padding: 12px 14px;
          background: var(--bg);
        }
        .bk-date-cell:first-child {
          border-right: 1px solid var(--border);
        }

        .bk-date-label {
          font-size: 0.65rem; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.09em;
          color: var(--muted); margin-bottom: 5px;
        }
        .bk-date-val {
          display: flex; align-items: center; gap: 6px;
          font-size: 0.86rem; font-weight: 700; color: var(--fg);
        }
        .bk-date-val svg { color: var(--p); flex-shrink: 0; }

        /* Booking ref */
        .bk-ref {
          font-size: 0.72rem; color: var(--subtle);
          display: flex; align-items: center; gap: 5px;
        }

        /* Actions */
        .bk-actions { display: flex; gap: 8px; flex-wrap: wrap; }

        .bk-btn-primary {
          display: flex; align-items: center; gap: 7px;
          padding: 10px 22px; border-radius: 12px;
          background: var(--fg); color: #fff;
          font-size: 0.84rem; font-weight: 700;
          border: none; cursor: pointer;
          font-family: inherit; transition: all 0.22s;
          text-decoration: none;
        }
        .bk-btn-primary:hover { background: var(--p); transform: translateY(-1px); box-shadow: var(--sh-m); }

        .bk-btn-secondary {
          display: flex; align-items: center; gap: 7px;
          padding: 10px 18px; border-radius: 12px;
          border: 1.5px solid var(--border);
          background: var(--card); color: var(--fg);
          font-size: 0.84rem; font-weight: 600;
          cursor: pointer; font-family: inherit; transition: all 0.22s;
        }
        .bk-btn-secondary:hover { border-color: var(--p); color: var(--p); background: var(--p-pale); }

        .bk-btn-ghost {
          display: flex; align-items: center; gap: 6px;
          padding: 10px 14px; border-radius: 12px;
          border: none; background: none;
          color: var(--muted);
          font-size: 0.82rem; font-weight: 600;
          cursor: pointer; font-family: inherit; transition: color 0.2s;
        }
        .bk-btn-ghost:hover { color: var(--p); }

        /* ══ Empty state ══ */
        .bk-empty {
          background: var(--card);
          border: 1.5px dashed var(--border);
          border-radius: 24px; padding: 72px 32px;
          text-align: center;
          animation: bkIn 0.4s ease;
        }

        .bk-empty-icon {
          width: 68px; height: 68px; border-radius: 18px;
          background: var(--p-pale); color: var(--p);
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto 20px;
        }

        .bk-empty-title {
          font-size: 1.15rem; font-weight: 700; color: var(--fg);
          margin-bottom: 8px;
        }

        .bk-empty-desc {
          font-size: 0.88rem; color: var(--muted);
          max-width: 300px; margin: 0 auto 28px; line-height: 1.7;
        }

        .bk-empty-cta {
          display: inline-flex; align-items: center; gap: 7px;
          padding: 12px 28px; border-radius: 14px;
          background: var(--p); color: #fff;
          font-size: 0.9rem; font-weight: 700;
          border: none; cursor: pointer;
          text-decoration: none; font-family: inherit;
          transition: all 0.22s;
          box-shadow: 0 4px 18px oklch(0.4 0.155 11.87 / 0.28);
        }
        .bk-empty-cta:hover { filter: brightness(1.08); transform: translateY(-2px); }

        /* ══ Bottom info cards ══ */
        .bk-info-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 16px; margin-top: 44px;
        }

        .bk-info-card {
          border-radius: 22px; padding: 28px;
          position: relative; overflow: hidden;
        }

        .bk-info-card-primary {
          background: var(--p); color: #fff;
        }

        .bk-info-card-dark {
          background: var(--fg); color: #fff;
        }

        /* Decorative blob inside info cards */
        .bk-info-card::before {
          content: '';
          position: absolute;
          width: 160px; height: 160px; border-radius: 50%;
          top: -60px; right: -40px;
          background: rgba(255,255,255,0.07);
          pointer-events: none;
        }

        .bk-info-icon {
          width: 44px; height: 44px; border-radius: 12px;
          background: rgba(255,255,255,0.15);
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 18px; position: relative; z-index: 1;
        }

        .bk-info-title {
          font-size: 1rem; font-weight: 700;
          margin-bottom: 8px; position: relative; z-index: 1;
        }

        .bk-info-desc {
          font-size: 0.82rem; opacity: 0.72;
          line-height: 1.65; margin-bottom: 20px;
          position: relative; z-index: 1; max-width: 260px;
        }

        .bk-info-btn {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 9px 18px; border-radius: 10px;
          font-size: 0.82rem; font-weight: 700;
          border: none; cursor: pointer;
          font-family: inherit; transition: all 0.22s;
          text-decoration: none; position: relative; z-index: 1;
        }

        .bk-info-btn-white {
          background: #fff; color: var(--p);
        }
        .bk-info-btn-white:hover { box-shadow: 0 4px 14px rgba(255,255,255,0.3); transform: translateY(-1px); }

        .bk-info-btn-ghost {
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.2);
          color: #fff;
        }
        .bk-info-btn-ghost:hover { background: rgba(255,255,255,0.18); }

        /* ══ Responsive ══ */
        @media (max-width: 480px) {
          .bk-tabs-wrap { width: 100%; }
          .bk-tab { flex: 1; justify-content: center; padding: 9px 10px; font-size: 0.8rem; }
          .bk-card-content { padding: 18px; }
        }
      `}</style>

      <div className="bk-page">
        <div className="bk-body">

          {/* ── Page header ── */}
          <header className="bk-header bk-up">
            <div className="bk-eyebrow">
              <Receipt size={12} />
              Your Travel Record
            </div>
            <h1 className="bk-title">My Bookings</h1>
            <p className="bk-subtitle">Manage your upcoming stays and review past adventures.</p>
          </header>

          {/* ── Summary strip ── */}
          <div className="bk-summary bk-up bk-d1">
            <div className="bk-summary-item">
              <div className="bk-sum-val">
                <span>{categories.upcoming.length}</span>
              </div>
              <div className="bk-sum-lbl">Upcoming stays</div>
            </div>
            <div className="bk-summary-item">
              <div className="bk-sum-val">{categories.past.length}</div>
              <div className="bk-sum-lbl">Completed trips</div>
            </div>
            <div className="bk-summary-item">
              <div className="bk-sum-val">
                ${guestBookings.filter(b => b.status === 'confirmed').reduce((s, b) => s + b.totalPrice, 0).toLocaleString()}
              </div>
              <div className="bk-sum-lbl">Total spent</div>
            </div>
          </div>

          {/* ── Tabs ── */}
          <div className="bk-tabs-wrap bk-up bk-d2">
            {TABS.map(tab => (
              <button
                key={tab.key}
                className={`bk-tab ${activeTab === tab.key ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.key)}
              >
                {tab.icon}
                {tab.label}
                <span className="bk-tab-count">{categories[tab.key].length}</span>
              </button>
            ))}
          </div>

          {/* ── Booking list ── */}
          <section className="bk-up bk-d3">
            {categories[activeTab].length === 0 ? (
              <div className="bk-empty">
                <div className="bk-empty-icon">
                  {activeTab === 'upcoming' ? <Plane    size={28} /> :
                   activeTab === 'past'     ? <History  size={28} /> :
                                             <XCircle  size={28} />}
                </div>
                <h3 className="bk-empty-title">No {activeTab} bookings</h3>
                <p className="bk-empty-desc">
                  {activeTab === 'upcoming'
                    ? 'Time to plan your next escape. Browse our curated stays and find your perfect destination.'
                    : activeTab === 'past'
                    ? "You haven't completed any stays yet. Your travel history will appear here."
                    : "You have no cancelled bookings. Hopefully it stays that way!"}
                </p>
                <Link href="/guest" className="bk-empty-cta">
                  Explore Destinations
                  <ArrowRight size={15} />
                </Link>
              </div>
            ) : (
              categories[activeTab].map((booking, i) => {
                const listing = getListing(booking.listingId);
                if (!listing) return null;
                const n = nights(booking.checkIn, booking.checkOut);

                return (
                  <div
                    key={booking.id}
                    className="bk-card bk-up"
                    style={{ animationDelay: `${i * 0.07}s` }}
                  >
                    <div className="bk-card-inner">

                      {/* ── Image side ── */}
                      <div className="bk-card-img-side">
                        <div className="bk-card-img-wrap">
                          <img
                            src={listing.image}
                            alt={listing.title}
                            className="bk-card-img"
                          />
                          <div className="bk-card-scrim" />

                          {/* Status pill */}
                          <div
                            className="bk-status"
                            style={{ background: status.bg, color: status.color }}
                          >
                            <div className="bk-status-dot" style={{ background: status.color }} />
                            {status.label}
                          </div>

                          {/* Rating */}
                          <div className="bk-card-rating">
                            <Star size={11} fill="currentColor" />
                            {listing.rating}
                          </div>

                          {/* Nights */}
                          <div className="bk-nights">{n} night{n !== 1 ? 's' : ''}</div>
                        </div>
                      </div>

                      {/* ── Content side ── */}
                      <div className="bk-card-content">

                        {/* Title + price */}
                        <div className="bk-card-top">
                          <div>
                            <h2 className="bk-card-title">{listing.title}</h2>
                            <div className="bk-card-loc">
                              <MapPin size={12} color="var(--p)" />
                              {listing.city}, {listing.country}
                            </div>
                          </div>
                          <div className="bk-price-block">
                            <div className="bk-price-label">Total</div>
                            <div className="bk-price-val">${booking.totalPrice}</div>
                          </div>
                        </div>

                        {/* Dates */}
                        <div className="bk-dates">
                          <div className="bk-date-cell">
                            <div className="bk-date-label">Check-in</div>
                            <div className="bk-date-val">
                              <Calendar size={13} />
                              {fmtDate(booking.checkIn)}
                            </div>
                          </div>
                          <div className="bk-date-cell">
                            <div className="bk-date-label">Check-out</div>
                            <div className="bk-date-val">
                              <Calendar size={13} />
                              {fmtDate(booking.checkOut)}
                            </div>
                          </div>
                        </div>

                        {/* Booking ref + guests */}
                        <div className="bk-ref">
                          <Clock size={11} />
                          Booking #{booking.id.slice(-6).toUpperCase()}
                          {booking.guests && (
                            <>
                              <span style={{ opacity: 0.3 }}>·</span>
                              <Users size={11} />
                              {booking.guests} guest{booking.guests > 1 ? 's' : ''}
                            </>
                          )}
                        </div>

                        {/* Actions */}
                        <div className="bk-actions">
                          <Link
                            href={`/guest/listings/${listing.id}`}
                            className="bk-btn-primary"
                          >
                            View Details
                            <ArrowRight size={14} />
                          </Link>

                          <button className="bk-btn-secondary">
                            <MessageSquare size={14} />
                            Message Host
                          </button>

                          {activeTab === 'past' && (
                            <button className="bk-btn-ghost">
                              <Star size={14} />
                              Leave a review
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </section>

          {/* ── Info cards ── */}
          <div className="bk-info-grid">
            <div className="bk-info-card bk-info-card-primary bk-up">
              <div className="bk-info-icon">
                <Shield size={20} />
              </div>
              <h4 className="bk-info-title">Travel with confidence</h4>
              <p className="bk-info-desc">
                Every booking includes basic trip protection and round-the-clock guest support from our team.
              </p>
              <button className="bk-info-btn bk-info-btn-white">
                Learn more
                <ChevronRight size={13} />
              </button>
            </div>

            <div className="bk-info-card bk-info-card-dark bk-up bk-d1">
              <div className="bk-info-icon">
                <Sparkles size={20} />
              </div>
              <h4 className="bk-info-title">Become a host</h4>
              <p className="bk-info-desc">
                Have a space? Start earning by hosting travellers from around the world. Setup takes minutes.
              </p>
              <Link href="/host" className="bk-info-btn bk-info-btn-ghost">
                Start hosting
                <ChevronRight size={13} />
              </Link>
            </div>
          </div>

        </div>

        <BottomNav />
      </div>
    </>
  );
}