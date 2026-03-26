'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { 
  Home, Heart, Briefcase, User, 
  LayoutDashboard, List, Calendar, MessageSquare, Menu 
} from 'lucide-react';

/**
 * Premium Bottom Navigation for mobile views.
 * Features:
 * - Glassmorphism design
 * - Smooth presence transition (shows on scroll-up, hides on scroll-down)
 * - Context-aware icons (Host vs Guest)
 */
export default function BottomNav() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  // Determine role and view mode
  const isHostView = pathname.startsWith('/host');
  const isAuthRoute = pathname.startsWith('/auth');

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // If at the very top, always show
      if (currentScrollY < 50) {
        setIsVisible(true);
        lastScrollY.current = currentScrollY;
        return;
      }

      // Hide on scroll down, show on scroll up
      if (currentScrollY < lastScrollY.current) {
        // Scrolling UP
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        // Scrolling DOWN
        setIsVisible(false);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // If we are on an authentication route, don't render the bottom nav
  if (isAuthRoute) return null;

  const guestItems = [
    { label: 'Explore', icon: <Home size={22} strokeWidth={2.2} />, href: '/guest' },
    { label: 'Saved', icon: <Heart size={22} strokeWidth={2.2} />, href: '/guest/saved' },
    { label: 'Trips', icon: <Briefcase size={22} strokeWidth={2.2} />, href: '/guest/trips' },
    { label: 'Inbox', icon: <MessageSquare size={22} strokeWidth={2.2} />, href: '/guest/messages' },
    { label: 'Profile', icon: <User size={22} strokeWidth={2.2} />, href: '/guest/profile' },
  ];

  const hostItems = [
    { label: 'Dashboard', icon: <LayoutDashboard size={22} strokeWidth={2.2} />, href: '/host' },
    { label: 'Listings', icon: <List size={22} strokeWidth={2.2} />, href: '/host/listings' },
    { label: 'Bookings', icon: <Calendar size={22} strokeWidth={2.2} />, href: '/host/bookings' },
    { label: 'Messages', icon: <MessageSquare size={22} strokeWidth={2.2} />, href: '/host/messages' },
    { label: 'Account', icon: <Menu size={22} strokeWidth={2.2} />, href: '/host/settings' },
  ];

  const items = isHostView ? hostItems : guestItems;

  return (
    <>
      <style>{`
        .bottom-nav {
          position: fixed;
          bottom: 24px;
          left: 50%;
          transform: translateX(-50%) translateY(${isVisible ? '0' : '120px'});
          width: calc(100% - 40px);
          max-width: 500px;
          height: 72px;
          background: rgba(255, 255, 255, 0.72);
          backdrop-filter: blur(28px);
          -webkit-backdrop-filter: blur(28px);
          border: 1px solid rgba(255, 255, 255, 0.4);
          border-radius: 28px;
          display: flex;
          align-items: center;
          justify-content: space-around;
          padding: 0 12px;
          z-index: 9999;
          transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease;
          box-shadow: 
            0 14px 28px rgba(0, 0, 0, 0.1),
            0 6px 10px rgba(0, 0, 0, 0.06),
            inset 0 0 0 1px rgba(255, 255, 255, 0.2);
          opacity: ${isVisible ? '1' : '0'};
        }

        .bottom-nav-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 5px;
          text-decoration: none;
          color: oklch(0.55 0.01 0); /* Muted / Greyish */
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          flex: 1;
          position: relative;
        }

        .bottom-nav-item.active {
          color: oklch(0.4 0.155 11.87); /* Primary color */
        }

        .bottom-nav-label {
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: -0.01em;
          transition: transform 0.3s;
        }

        .bottom-nav-icon-wrap {
          transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .bottom-nav-item.active .bottom-nav-icon-wrap {
          transform: translateY(-2px) scale(1.1);
        }

        .bottom-nav-item::after {
          content: '';
          position: absolute;
          bottom: -8px;
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: oklch(0.4 0.155 11.87);
          opacity: 0;
          transition: opacity 0.3s, transform 0.3s;
          transform: scale(0);
        }

        .bottom-nav-item.active::after {
          opacity: 1;
          transform: scale(1);
        }

        .bottom-nav-item:active .bottom-nav-icon-wrap {
          transform: scale(0.8);
        }

        @media (min-width: 769px) {
          .bottom-nav { display: none; }
        }
      `}</style>
      <div className="bottom-nav" aria-label="Mobile Navigation">
        {items.map((item) => {
          // Flexible active state matching: exact or parent path
          const isActive = pathname === item.href || (item.href !== '/guest' && item.href !== '/host' && pathname.startsWith(item.href));
          
          return (
            <Link 
              key={item.label} 
              href={item.href} 
              className={`bottom-nav-item ${isActive ? 'active' : ''}`}
            >
              <div className="bottom-nav-icon-wrap">
                {item.icon}
              </div>
              <span className="bottom-nav-label">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </>
  );
}
