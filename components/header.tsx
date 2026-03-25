'use client';

import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import LogoBadge from '@/components/logo-badge';

export function Header() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const userName = session?.user?.name || 'Guest';
  const userInitials = userName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
  const userRole = (session?.user as any)?.role || 'guest';

  const navLinks = [
    { href: '/guest', label: 'Explore', icon: '🏠' },
    { href: '/guest/bookings', label: 'Bookings', icon: '📋' },
    { href: '/guest/profile', label: 'Profile', icon: '👤' },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <>
      <style>{`
        /* ── Design tokens (mirrors landing page) ── */
        .app-header {
          --h-p:       oklch(0.4 0.155 11.87);
          --h-p-pale:  oklch(0.95 0.03 11.87);
          --h-bg:      oklch(0.99 0.001 0);
          --h-fg:      oklch(0.1 0.001 0);
          --h-muted:   oklch(0.55 0.005 0);
          --h-border:  oklch(0.88 0.002 0);
          --h-shadow:  oklch(0.4 0.155 11.87 / 0.08);
        }

        /* ── Sticky glassmorphic bar ── */
        .app-header {
          position: sticky;
          top: 0;
          z-index: 100;
          background: color-mix(in oklch, var(--h-bg) 82%, transparent);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border-bottom: 1px solid var(--h-border);
          transition: box-shadow 0.3s;
        }

        .app-header-inner {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 28px;
          height: 72px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
        }

        /* ── Logo ── */
        .hdr-logo {
          display: flex;
          align-items: center;
          gap: 12px;
          text-decoration: none;
          transition: transform 0.2s;
          flex-shrink: 0;
        }
        .hdr-logo:hover { transform: scale(1.02); }

        .hdr-logo-text {
          font-family: var(--font-sans), sans-serif;
          font-size: 1.6rem;
          font-weight: 800;
          color: var(--h-p);
          letter-spacing: -0.03em;
        }

        /* ── Desktop nav links ── */
        .hdr-nav {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .hdr-nav-link {
          padding: 8px 18px;
          border-radius: 10px;
          font-size: 0.88rem;
          font-weight: 500;
          color: var(--h-muted);
          text-decoration: none;
          transition: all 0.2s;
          position: relative;
          white-space: nowrap;
        }
        .hdr-nav-link:hover {
          color: var(--h-fg);
          background: var(--h-p-pale);
        }
        .hdr-nav-link.active {
          color: var(--h-p);
          background: var(--h-p-pale);
          font-weight: 600;
        }

        /* ── Search bar (desktop) ── */
        .hdr-search {
          flex: 1;
          max-width: 360px;
          position: relative;
          display: flex;
          align-items: center;
        }

        .hdr-search-input {
          width: 100%;
          padding: 10px 16px 10px 40px;
          border-radius: 12px;
          border: 1.5px solid var(--h-border);
          background: color-mix(in oklch, var(--h-bg) 60%, transparent);
          font-size: 0.85rem;
          color: var(--h-fg);
          font-family: var(--font-sans), sans-serif;
          transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
          outline: none;
        }
        .hdr-search-input::placeholder { color: var(--h-muted); }
        .hdr-search-input:focus {
          border-color: var(--h-p);
          box-shadow: 0 0 0 3px oklch(0.4 0.155 11.87 / 0.12);
          background: var(--h-bg);
        }

        .hdr-search-icon {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--h-muted);
          pointer-events: none;
          display: flex;
        }

        /* ── User menu trigger ── */
        .hdr-user-trigger {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 5px 14px 5px 5px;
          border-radius: 40px;
          border: 1.5px solid var(--h-border);
          background: var(--h-bg);
          cursor: pointer;
          transition: all 0.2s;
          flex-shrink: 0;
        }
        .hdr-user-trigger:hover {
          border-color: color-mix(in oklch, var(--h-p) 30%, var(--h-border));
          box-shadow: 0 4px 16px var(--h-shadow);
        }

        .hdr-avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: var(--h-p);
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.75rem;
          font-weight: 700;
          flex-shrink: 0;
        }

        .hdr-user-name {
          font-size: 0.82rem;
          font-weight: 500;
          color: var(--h-fg);
          max-width: 120px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .hdr-hamburger-icon {
          color: var(--h-fg);
          display: flex;
        }

        /* ── Dropdown menu ── */
        .hdr-dropdown {
          position: absolute;
          top: calc(100% + 8px);
          right: 0;
          width: 240px;
          background: var(--h-bg);
          border: 1px solid var(--h-border);
          border-radius: 14px;
          box-shadow: 0 12px 48px var(--h-shadow);
          padding: 6px;
          z-index: 200;
          animation: hdrDropIn 0.2s ease;
        }

        @keyframes hdrDropIn {
          from { opacity: 0; transform: translateY(-8px) scale(0.96); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        .hdr-dropdown-header {
          padding: 12px 14px;
          border-bottom: 1px solid var(--h-border);
          margin-bottom: 4px;
        }
        .hdr-dropdown-name {
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--h-fg);
        }
        .hdr-dropdown-email {
          font-size: 0.75rem;
          color: var(--h-muted);
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .hdr-dropdown-item {
          display: flex;
          align-items: center;
          gap: 10px;
          width: 100%;
          padding: 10px 14px;
          border: none;
          background: none;
          border-radius: 8px;
          font-size: 0.85rem;
          color: var(--h-fg);
          text-decoration: none;
          cursor: pointer;
          transition: background 0.15s;
          font-family: var(--font-sans), sans-serif;
          text-align: left;
        }
        .hdr-dropdown-item:hover {
          background: var(--h-p-pale);
        }
        .hdr-dropdown-item.danger {
          color: oklch(0.55 0.22 25);
        }
        .hdr-dropdown-item.danger:hover {
          background: oklch(0.95 0.03 25);
        }
        .hdr-dropdown-sep {
          height: 1px;
          background: var(--h-border);
          margin: 4px 0;
        }

        /* ── Mobile nav ── */
        .hdr-mobile-menu {
          display: none;
          position: fixed;
          inset: 0;
          z-index: 150;
          background: rgba(0,0,0,0.4);
          backdrop-filter: blur(4px);
          animation: hdrFadeIn 0.2s ease;
        }
        .hdr-mobile-menu.open { display: block; }

        @keyframes hdrFadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }

        .hdr-mobile-sheet {
          position: absolute;
          top: 0; right: 0;
          width: min(320px, 85vw);
          height: 100%;
          background: var(--h-bg);
          padding: 24px;
          box-shadow: -8px 0 40px rgba(0,0,0,0.1);
          animation: hdrSlideIn 0.25s ease;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        @keyframes hdrSlideIn {
          from { transform: translateX(100%); }
          to   { transform: translateX(0); }
        }

        .hdr-mobile-close {
          align-self: flex-end;
          background: none;
          border: none;
          cursor: pointer;
          color: var(--h-muted);
          padding: 4px;
          display: flex;
        }

        .hdr-mobile-link {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px 16px;
          border-radius: 12px;
          font-size: 0.95rem;
          font-weight: 500;
          color: var(--h-fg);
          text-decoration: none;
          transition: background 0.15s;
        }
        .hdr-mobile-link:hover,
        .hdr-mobile-link.active {
          background: var(--h-p-pale);
          color: var(--h-p);
        }
        .hdr-mobile-link-icon { font-size: 1.2rem; }

        .hdr-mobile-user {
          margin-top: auto;
          padding: 16px;
          border-top: 1px solid var(--h-border);
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .hdr-mobile-user-info {
          flex: 1;
        }
        .hdr-mobile-user-name {
          font-weight: 600;
          font-size: 0.9rem;
          color: var(--h-fg);
        }
        .hdr-mobile-user-email {
          font-size: 0.75rem;
          color: var(--h-muted);
        }

        .hdr-mobile-signout {
          display: flex;
          align-items: center;
          gap: 10px;
          width: 100%;
          padding: 12px 16px;
          border: none;
          background: none;
          border-radius: 12px;
          font-size: 0.9rem;
          color: oklch(0.55 0.22 25);
          cursor: pointer;
          font-family: var(--font-sans), sans-serif;
          transition: background 0.15s;
        }
        .hdr-mobile-signout:hover {
          background: oklch(0.95 0.03 25);
        }

        /* ── Responsive ── */
        @media (max-width: 768px) {
          .app-header-inner { padding: 0 16px; height: 64px; }
          .hdr-logo-text { font-size: 1.3rem; }
          .hdr-nav { display: none; }
          .hdr-search { display: none; }
          .hdr-user-name { display: none; }
        }

        @media (min-width: 769px) {
          .hdr-mobile-trigger { display: none !important; }
        }
      `}</style>

      <header className="app-header">
        <div className="app-header-inner">
          {/* Logo */}
          <Link href="/guest" className="hdr-logo">
            <LogoBadge size={42} />
            <span className="hdr-logo-text">StayLux Ke</span>
          </Link>

          {/* Desktop nav links */}
          <nav className="hdr-nav">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`hdr-nav-link ${isActive(link.href) ? 'active' : ''}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop search */}
          <div className="hdr-search">
            <span className="hdr-search-icon">
              <svg viewBox="0 0 20 20" fill="currentColor" width="15" height="15">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </span>
            <input
              className="hdr-search-input"
              type="text"
              placeholder="Search destinations..."
            />
          </div>

          {/* User menu (desktop) */}
          <div style={{ position: 'relative' }}>
            <button
              className="hdr-user-trigger"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label="User menu"
            >
              <div className="hdr-avatar">{userInitials}</div>
              <span className="hdr-user-name">{userName.split(' ')[0]}</span>
              <span className="hdr-hamburger-icon">
                <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
                  <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
              </span>
            </button>

            {menuOpen && (
              <>
                <div
                  style={{ position: 'fixed', inset: 0, zIndex: 199 }}
                  onClick={() => setMenuOpen(false)}
                />
                <div className="hdr-dropdown">
                  <div className="hdr-dropdown-header">
                    <div className="hdr-dropdown-name">{userName}</div>
                    <div className="hdr-dropdown-email">{session?.user?.email}</div>
                  </div>
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="hdr-dropdown-item"
                      onClick={() => setMenuOpen(false)}
                    >
                      <span>{link.icon}</span>
                      {link.label}
                    </Link>
                  ))}
                  <div className="hdr-dropdown-sep" />
                  <button
                    className="hdr-dropdown-item danger"
                    onClick={() => signOut({ redirectUrl: '/' })}
                  >
                    <span>🚪</span>
                    Sign Out
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </header>

      {/* ── Mobile slide-in menu ── */}
      <div
        className={`hdr-mobile-menu ${menuOpen ? 'open' : ''}`}
        onClick={(e) => { if (e.target === e.currentTarget) setMenuOpen(false); }}
      >
        <div className="hdr-mobile-sheet">
          <button className="hdr-mobile-close" onClick={() => setMenuOpen(false)}>
            <svg viewBox="0 0 20 20" fill="currentColor" width="22" height="22">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>

          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`hdr-mobile-link ${isActive(link.href) ? 'active' : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              <span className="hdr-mobile-link-icon">{link.icon}</span>
              {link.label}
            </Link>
          ))}

          <div className="hdr-mobile-user">
            <div className="hdr-avatar">{userInitials}</div>
            <div className="hdr-mobile-user-info">
              <div className="hdr-mobile-user-name">{userName}</div>
              <div className="hdr-mobile-user-email">{session?.user?.email}</div>
            </div>
          </div>

          <button
            className="hdr-mobile-signout"
            onClick={() => signOut({ redirectUrl: '/' })}
          >
            🚪 Sign Out
          </button>
        </div>
      </div>
    </>
  );
}
