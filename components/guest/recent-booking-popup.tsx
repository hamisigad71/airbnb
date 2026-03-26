'use client';

import React, { useState, useEffect } from 'react';
import { MOCK_LISTINGS } from '@/lib/mock-data';
import { MapPin, Zap } from 'lucide-react';

export default function RecentBookingPopup() {
  const [visible, setVisible] = useState(false);
  const [currentListing, setCurrentListing] = useState(MOCK_LISTINGS[0]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Initial delay before first popup
    const firstTimeout = setTimeout(() => {
      showNotification();
    }, 5000);

    const interval = setInterval(() => {
      showNotification();
    }, 30000); // 30 seconds

    return () => {
      clearInterval(interval);
      clearTimeout(firstTimeout);
    };
  }, []);

  const showNotification = () => {
    // Pick a random listing
    const randomIndex = Math.floor(Math.random() * MOCK_LISTINGS.length);
    setCurrentListing(MOCK_LISTINGS[randomIndex]);
    
    // Show
    setVisible(true);
    
    // Hide after 8 seconds (as requested)
    setTimeout(() => {
      setVisible(false);
    }, 8000);
  };

  if (!mounted) return null;

  return (
    <>
      <style>{`
        .rb-popup {
          position: fixed;
          top: 50%;
          right: 24px;
          z-index: 2000;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px;
          padding-right: 16px;
          background: rgba(255, 255, 255, 0.75);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.4);
          border-radius: 18px;
          box-shadow: 0 15px 45px rgba(0, 0, 0, 0.1);
          pointer-events: none;
          transform: translate(120%, -50%) scale(0.9);
          opacity: 0;
          transition: all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .rb-popup.active {
          transform: translate(0, -50%) scale(1);
          opacity: 1;
        }

        .rb-img-wrap {
          width: 52px;
          height: 52px;
          border-radius: 12px;
          overflow: hidden;
          flex-shrink: 0;
          border: 1px solid rgba(0, 0, 0, 0.05);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
        }

        .rb-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .rb-content {
          display: flex;
          flex-direction: column;
          gap: 1px;
        }

        .rb-title {
          font-size: 10px;
          font-weight: 600;
          color: oklch(0.52 0.006 0);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .rb-text {
          font-size: 14px;
          font-weight: 700;
          color: oklch(0.15 0.01 0);
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .rb-loc {
          font-size: 11px;
          color: oklch(0.5 0.18 30); /* Brand red/pink */
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .rb-badge {
          position: absolute;
          top: -8px;
          left: 12px;
          background: oklch(0.5 0.18 30);
          color: #fff;
          font-size: 9px;
          font-weight: 800;
          padding: 3px 8px;
          border-radius: 100px;
          box-shadow: 0 4px 12px oklch(0.5 0.18 30 / 0.3);
          letter-spacing: 0.05em;
        }

        @media (max-width: 640px) {
          .rb-popup {
            top: 20px;
            left: 20px;
            right: 20px;
            transform: translateY(-150%) scale(0.95);
          }
          .rb-popup.active {
            transform: translateY(0) scale(1);
          }
        }
      `}</style>

      <div className={`rb-popup ${visible ? 'active' : ''}`}>
        <div className="rb-badge">REAL-TIME ACTIVITY</div>
        <div className="rb-img-wrap">
          <img src={currentListing.image} alt="" className="rb-img" />
        </div>
        <div className="rb-content">
          <span className="rb-title">Recent Booking</span>
          <span className="rb-text">
            Someone just booked <Zap size={13} fill="currentColor" strokeWidth={0} />
          </span>
          <span className="rb-loc">
            <MapPin size={11} />
            {currentListing.city}, {currentListing.country}
          </span>
        </div>
      </div>
    </>
  );
}
