'use client';

import React, { useState, useEffect, useRef } from 'react';
import { MapPin, X, Star } from 'lucide-react';

// ─── DEMO DATA ────────────────────────────────────────────────────────────────
const BOOKINGS = [
  {
    name: "Amara Osei",
    avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=80&h=80&fit=facearea&facepad=2",
    stay: "Nairobi Skyline Suite",
    city: "Nairobi",
    country: "Kenya",
    guests: 2,
    nights: 3,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=120&h=80&fit=crop",
    time: "2 min ago",
  },
  {
    name: "Sipho Dlamini",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=facearea&facepad=2",
    stay: "Cape Town Ocean Loft",
    city: "Cape Town",
    country: "South Africa",
    guests: 3,
    nights: 5,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=120&h=80&fit=crop",
    time: "5 min ago",
  },
  {
    name: "Wanjiku Mwangi",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&h=80&fit=facearea&facepad=2",
    stay: "Diani Beach Villa",
    city: "Diani Beach",
    country: "Kenya",
    guests: 4,
    nights: 7,
    rating: 5.0,
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=120&h=80&fit=crop",
    time: "8 min ago",
  },
  {
    name: "Thabo Nkosi",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=80&h=80&fit=facearea&facepad=2",
    stay: "Johannesburg Garden Apt",
    city: "Johannesburg",
    country: "South Africa",
    guests: 2,
    nights: 4,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=120&h=80&fit=crop",
    time: "12 min ago",
  },
  {
    name: "Fatuma Hassan",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=facearea&facepad=2",
    stay: "Mombasa Old Town Riad",
    city: "Mombasa",
    country: "Kenya",
    guests: 2,
    nights: 3,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=120&h=80&fit=crop",
    time: "15 min ago",
  },
  {
    name: "Lethabo Sithole",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=80&h=80&fit=facearea&facepad=2",
    stay: "Stellenbosch Wine Estate",
    city: "Stellenbosch",
    country: "South Africa",
    guests: 2,
    nights: 2,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=120&h=80&fit=crop",
    time: "20 min ago",
  },
  {
    name: "Kamau Njoroge",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=facearea&facepad=2",
    stay: "Maasai Mara Safari Lodge",
    city: "Maasai Mara",
    country: "Kenya",
    guests: 2,
    nights: 4,
    rating: 5.0,
    image: "https://images.unsplash.com/photo-1534008897995-27a23e859048?w=120&h=80&fit=crop",
    time: "25 min ago",
  },
  {
    name: "Nomsa Khumalo",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=facearea&facepad=2",
    stay: "Durban Beachfront Studio",
    city: "Durban",
    country: "South Africa",
    guests: 1,
    nights: 3,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=120&h=80&fit=crop",
    time: "30 min ago",
  },
  {
    name: "Achieng Otieno",
    avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=80&h=80&fit=facearea&facepad=2&crop=entropy",
    stay: "Lake Nakuru Treehouse",
    city: "Nakuru",
    country: "Kenya",
    guests: 3,
    nights: 2,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=120&h=80&fit=crop",
    time: "33 min ago",
  },
  {
    name: "Pieter van der Berg",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=facearea&facepad=2",
    stay: "Garden Route Forest Cabin",
    city: "George",
    country: "South Africa",
    guests: 4,
    nights: 6,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=120&h=80&fit=crop",
    time: "40 min ago",
  },
];

const FLAG: Record<string, string> = {
  "Kenya":        "🇰🇪",
  "South Africa": "🇿🇦",
};

// Clean "Note" style chime sound URL (iPhone inspired)
const NOTIFICATION_SOUND_URL = 'https://assets.mixkit.co/active_storage/sfx/2358/2358-preview.mp3';

export default function RecentBookingPopup() {
  const [visible, setVisible]       = useState(false);
  const [leaving, setLeaving]       = useState(false);
  const [current, setCurrent]       = useState(BOOKINGS[0]);
  const [mounted, setMounted]       = useState(false);
  const [dismissed, setDismissed]   = useState(false);
  const audioRef                    = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    setMounted(true);
    // Initialize audio
    audioRef.current = new Audio(NOTIFICATION_SOUND_URL);
    audioRef.current.volume = 0.4;

    const show = (idx: number) => {
      if (dismissed) return;
      setCurrent(BOOKINGS[idx % BOOKINGS.length]);
      setLeaving(false);
      setVisible(true);

      // Play sound
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(err => console.log('Audio play blocked:', err));
      }

      // auto-hide after 7 s
      setTimeout(() => hide(), 7000);
    };

    const hide = () => {
      setLeaving(true);
      setTimeout(() => { setVisible(false); setLeaving(false); }, 600);
    };

    // first pop at 4 s
    const t1 = setTimeout(() => show(0), 14000);

    // then every 25 s, cycling through bookings
    let count = 1;
    const iv = setInterval(() => {
      show(count++);
    }, 25000);

    return () => { clearTimeout(t1); clearInterval(iv); };
  }, [dismissed]);

  const dismiss = () => {
    setLeaving(true);
    setTimeout(() => { setVisible(false); setLeaving(false); setDismissed(true); }, 500);
  };

  if (!mounted || (!visible && !leaving)) return null;

  const flag = FLAG[current.country] ?? "🌍";

  return (
    <>
      <style>{`
        @keyframes rb-top-in {
          0%   { opacity: 0; transform: translate(-50%, -60px) scale(0.9); filter: blur(8px); }
          50%  { opacity: 1; transform: translate(-50%, 15px) scale(1.05); filter: blur(0px); }
          75%  { transform: translate(-50%, -8px) scale(0.98); }
          100% { opacity: 1; transform: translate(-50%, 0) scale(1); filter: blur(0px); }
        }
        @keyframes rb-top-out {
          0%   { opacity: 1; transform: translate(-50%, 0) scale(1); filter: blur(0px); }
          100% { opacity: 0; transform: translate(-50%, -20px) scale(0.95); filter: blur(4px); }
        }
        @keyframes rb-dot-blink {
          0%,100% { transform: scale(1); opacity: 1; } 50% { transform: scale(0.8); opacity: 0.4; }
        }
        @keyframes rb-bar-fill {
          from { width: 0%; } to { width: 100%; }
        }

        .rb-wrap {
          position: fixed;
          left: 50%;
          top: 24px;
          z-index: 10000;
          pointer-events: auto;
          width: 320px;
          transform: translateX(-50%);
          font-family: var(--font-sans), system-ui, sans-serif;
        }
        .rb-wrap.entering {
          animation: rb-top-in 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) both;
        }
        .rb-wrap.leaving {
          animation: rb-top-out 0.4s ease-in both;
        }

        .rb-card {
          position: relative;
          background: var(--card);
          background: color-mix(in srgb, var(--card), transparent 10%);
          backdrop-filter: blur(28px) saturate(180%);
          -webkit-backdrop-filter: blur(28px) saturate(180%);
          border: 1px solid var(--border);
          border-radius: 20px;
          box-shadow: 
            0 20px 50px -12px rgba(0, 0, 0, 0.15),
            0 5px 15px -5px rgba(0, 0, 0, 0.08),
            inset 0 1px 0 rgba(255, 255, 255, 0.6);
          overflow: hidden;
        }

        .rb-inner {
          display: flex;
          align-items: center;
          padding: 8px 10px;
          gap: 12px;
        }

        /* Listing Image */
        .rb-img-wrap {
          width: 52px;
          height: 52px;
          flex-shrink: 0;
          position: relative;
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid var(--border);
        }
        .rb-img-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        /* Body Content */
        .rb-body {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 1px;
          min-width: 0;
        }

        .rb-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 2px;
        }
        .rb-badge {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          background: color-mix(in srgb, var(--primary), transparent 92%);
          border: 1px solid color-mix(in srgb, var(--primary), transparent 88%);
          border-radius: 100px;
          padding: 1px 6px;
        }
        .rb-dot {
          width: 5px; height: 5px; border-radius: 50%;
          background: var(--primary);
          animation: rb-dot-blink 1.5s ease-in-out infinite;
        }
        .rb-badge-text {
          font-size: 8px; 
          font-weight: 800;
          color: var(--primary);
          text-transform: uppercase; 
          letter-spacing: 0.04em;
        }

        .rb-dismiss {
          width: 18px; height: 18px;
          border-radius: 50%;
          background: var(--secondary);
          border: none; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          color: var(--muted-foreground);
          transition: all 0.2s;
        }
        .rb-dismiss:hover { 
          background: var(--accent);
          color: var(--accent-foreground);
        }

        .rb-stay-info {
          display: flex;
          flex-direction: column;
        }
        .rb-stay-name {
          font-size: 11px;
          font-weight: 700;
          color: var(--foreground);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .rb-user-summary {
          font-size: 9.5px;
          color: var(--muted-foreground);
          font-weight: 500;
        }
        .rb-user-summary b {
          color: var(--foreground);
          font-weight: 600;
        }

        .rb-meta {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-top: 2px;
        }
        .rb-loc {
          display: flex; align-items: center; gap: 4px;
          font-size: 9px; font-weight: 600;
          color: var(--muted-foreground);
        }
        .rb-time {
          font-size: 9px;
          font-weight: 500;
          color: var(--primary);
          opacity: 0.8;
          margin-left: auto;
        }

        .rb-bar {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 2px;
          background: var(--secondary);
        }
        .rb-bar-fill {
          height: 100%;
          background: var(--primary);
          animation: rb-bar-fill 7s linear both;
        }

        @media (max-width: 480px) {
          .rb-wrap {
            width: calc(100% - 32px);
            top: 80px;
          }
        }
      `}</style>

      <div className={`rb-wrap ${leaving ? "leaving" : "entering"}`}>
        <div className="rb-card">
          <div className="rb-inner">
            {/* Image */}
            <div className="rb-img-wrap">
              <img src={current.image} alt={current.stay} />
            </div>

            {/* Content */}
            <div className="rb-body">
              <div className="rb-header">
                <div className="rb-badge">
                  <div className="rb-dot" />
                  <span className="rb-badge-text">Just booked</span>
                </div>
                <button className="rb-dismiss" onClick={dismiss} aria-label="Dismiss">
                  <X size={10} />
                </button>
              </div>

              <div className="rb-stay-info">
                <span className="rb-stay-name">{current.stay}</span>
                <span className="rb-user-summary"><b>{current.name}</b> from {current.country}</span>
              </div>

              <div className="rb-meta">
                <div className="rb-loc">
                  <MapPin size={9} strokeWidth={2.5} />
                  <span>{flag} {current.city}</span>
                </div>
                <div className="rb-time">{current.time}</div>
              </div>
            </div>
          </div>

          <div className="rb-bar">
            <div className="rb-bar-fill" key={current.stay} />
          </div>
        </div>
      </div>
    </>
  );
}


