'use client';

import React, { useState, useEffect, useRef } from 'react';
import { MapPin, X, CheckCircle2 } from 'lucide-react';
import { MOCK_LISTINGS, MOCK_USERS } from '@/lib/mock-data';

// ─── CURATED NOTIFICATION DATA ──────────────────────────────────────────────
const RAW_DATA = [
  // 🇰🇪 Kenya
  { 
    name: "Brian Otieno", stay: "Cozy Westlands Studio", country: "Kenya", category: "Airbnb",
    img: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=facearea&facepad=2"
  },
  { 
    name: "Mercy Wanjiku", stay: "Mama Njeri’s Kitchen", country: "Kenya", category: "Restaurant",
    img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop",
    avatar: "https://images.unsplash.com/photo-1531123897727-8f129e16fd3c?w=100&h=100&fit=facearea&facepad=2"
  },
  { 
    name: "Kevin Kiptoo", stay: "Diani Palm Breeze Villa", country: "Kenya", category: "Villa",
    img: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=400&h=300&fit=crop",
    avatar: "https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?w=100&h=100&fit=facearea&facepad=2"
  },
  { 
    name: "Faith Achieng", stay: "Lavington Modern Loft", country: "Kenya", category: "Airbnb",
    img: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=400&h=300&fit=crop",
    avatar: "https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?w=100&h=100&fit=facearea&facepad=2"
  },
  { 
    name: "Daniel Mwangi", stay: "Savannah Flame Grill", country: "Kenya", category: "Restaurant",
    img: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=400&h=300&fit=crop",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=facearea&facepad=2"
  },
  { 
    name: "Sharon Chebet", stay: "Kilifi Sunset Villa", country: "Kenya", category: "Villa",
    img: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=400&h=300&fit=crop",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=facearea&facepad=2"
  },
  { 
    name: "James Onyango", stay: "Kileleshwa Skyline Apartment", country: "Kenya", category: "Airbnb",
    img: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=facearea&facepad=2"
  },
  { 
    name: "Lucy Njeri", stay: "Swahili Spice House", country: "Kenya", category: "Restaurant",
    img: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=400&h=300&fit=crop",
    avatar: "https://images.unsplash.com/photo-1554151228-14d9def656e4?w=100&h=100&fit=facearea&facepad=2"
  },
  { 
    name: "Collins Ochieng", stay: "Nyali Ocean View Villa", country: "Kenya", category: "Villa",
    img: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=400&h=300&fit=crop",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=100&fit=facearea&facepad=2"
  },
  { 
    name: "Esther Jepchirchir", stay: "Naivasha Lakeview Cabin", country: "Kenya", category: "Airbnb",
    img: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=400&h=300&fit=crop",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=facearea&facepad=2"
  },
  { 
    name: "Peter Kamau", stay: "Nairobi Bites Hub", country: "Kenya", category: "Restaurant",
    img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=facearea&facepad=2"
  },
  { 
    name: "Grace Atieno", stay: "Karen Luxury Retreat", country: "Kenya", category: "Villa",
    img: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400&h=300&fit=crop",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=facearea&facepad=2"
  },
  { 
    name: "Joseph Mutua", stay: "Nanyuki Mountain Escape", country: "Kenya", category: "Airbnb",
    img: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=400&h=300&fit=crop",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=100&fit=facearea&facepad=2"
  },
  { 
    name: "Irene Wairimu", stay: "Karibu Coastal Dine", country: "Kenya", category: "Restaurant",
    img: "https://images.unsplash.com/photo-1554672406-95ca9d83df21?w=400&h=300&fit=crop",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=facearea&facepad=2"
  },
  { 
    name: "Samuel Kipchoge", stay: "Watamu Coral Villa", country: "Kenya", category: "Villa",
    img: "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=400&h=300&fit=crop",
    avatar: "https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?w=100&h=100&fit=facearea&facepad=2"
  },

  // 🇿🇦 South Africa
  { 
    name: "Thabo Mokoena", stay: "Cape Town City Loft", country: "South Africa", category: "Airbnb",
    img: "https://images.unsplash.com/photo-1536376074432-8bad41d5079a?w=400&h=300&fit=crop",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=facearea&facepad=2"
  },
  { 
    name: "Lerato Dlamini", stay: "Cape Flame Kitchen", country: "South Africa", category: "Restaurant",
    img: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=400&h=300&fit=crop",
    avatar: "https://images.unsplash.com/photo-1531123897727-8f129e16fd3c?w=100&h=100&fit=facearea&facepad=2"
  },
  { 
    name: "Sipho Nkosi", stay: "Cape Town Ocean Bliss Villa", country: "South Africa", category: "Villa",
    img: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=400&h=300&fit=crop",
    avatar: "https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?w=100&h=100&fit=facearea&facepad=2"
  },
  { 
    name: "Nomsa Khumalo", stay: "Johannesburg Executive Suite", country: "South Africa", category: "Airbnb",
    img: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=400&h=300&fit=crop",
    avatar: "https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?w=100&h=100&fit=facearea&facepad=2"
  },
  { 
    name: "Themba Zulu", stay: "Jozi Urban Grill", country: "South Africa", category: "Restaurant",
    img: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=400&h=300&fit=crop",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=facearea&facepad=2"
  },
  { 
    name: "Naledi Molefe", stay: "Stellenbosch Vineyard Villa", country: "South Africa", category: "Villa",
    img: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=400&h=300&fit=crop",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=facearea&facepad=2"
  },
  { 
    name: "Kabelo Ndlovu", stay: "Pretoria Garden Apartment", country: "South Africa", category: "Airbnb",
    img: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=100&fit=facearea&facepad=2"
  },
  { 
    name: "Zanele Sithole", stay: "Durban Spice Route", country: "South Africa", category: "Restaurant",
    img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop",
    avatar: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=100&h=100&fit=facearea&facepad=2"
  },
  { 
    name: "Sibusiso Mthembu", stay: "Durban Beachfront Villa", country: "South Africa", category: "Villa",
    img: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&h=300&fit=crop",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=facearea&facepad=2"
  },
  { 
    name: "Ayanda Buthelezi", stay: "Durban Sea Breeze Studio", country: "South Africa", category: "Airbnb",
    img: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=400&h=300&fit=crop",
    avatar: "https://images.unsplash.com/photo-1531123897727-8f129e16fd3c?w=100&h=100&fit=facearea&facepad=2"
  },
  { 
    name: "Bongani Cele", stay: "Soweto Street Bites", country: "South Africa", category: "Restaurant",
    img: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=400&h=300&fit=crop",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=facearea&facepad=2"
  },
  { 
    name: "Nandi Zungu", stay: "Sandton Elite Residence", country: "South Africa", category: "Villa",
    img: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=400&h=300&fit=crop",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=facearea&facepad=2"
  },
  { 
    name: "Tshepo Masemola", stay: "Port Elizabeth Cozy Stay", country: "South Africa", category: "Airbnb",
    img: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop",
    avatar: "https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?w=100&h=100&fit=facearea&facepad=2"
  },
  { 
    name: "Lindiwe Nkomo", stay: "Table Mountain Dine", country: "South Africa", category: "Restaurant",
    img: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=400&h=300&fit=crop",
    avatar: "https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?w=100&h=100&fit=facearea&facepad=2"
  },
  { 
    name: "Mandla Shabalala", stay: "Knysna Lagoon Villa", country: "South Africa", category: "Villa",
    img: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=400&h=300&fit=crop",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=100&fit=facearea&facepad=2"
  },
];

const FLAG: Record<string, string> = {
  "Kenya":        "🇰🇪",
  "South Africa": "🇿🇦",
};

const generateNotifications = () => {
  return RAW_DATA.map(item => ({
    ...item,
    image: item.img,
    time: `${Math.floor(Math.random() * 12) + 2} min ago`,
    city: item.stay.split(' ').slice(-2).join(' '),
  }));
};

interface BookingData {
  name: string;
  stay: string;
  city: string;
  country: string;
  time: string;
  image: string;
  avatar: string;
}

const NOTIFICATION_SOUND_URL = '/mixkit-correct-answer-tone-2870.wav';

/**
 * Fisher-Yates Shuffle Algorithm
 */
const shuffleBookings = (array: BookingData[]) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export default function RecentBookingPopup() {
  const [active, setActive]         = useState(false);
  const [shuffledBookings, setShuffledBookings] = useState<BookingData[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mounted, setMounted]       = useState(false);
  const [dismissed, setDismissed]   = useState(false);
  const audioRef                    = useRef<HTMLAudioElement | null>(null);

  // Initialize and shuffle on mount
  useEffect(() => {
    setMounted(true);
    const dynamicData = generateNotifications();
    setShuffledBookings(shuffleBookings(dynamicData));
    
    // Initialize audio
    audioRef.current = new Audio(NOTIFICATION_SOUND_URL);
    audioRef.current.volume = 0.3;

    let displayTimeout: NodeJS.Timeout;
    let nextInterval: NodeJS.Timeout;

    const showNext = () => {
      if (dismissed || document.visibilityState !== 'visible') return;
      
      setActive(true);

      // Play sound
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch((err: any) => console.log('Audio play blocked:', err));
      }

      // Hide after 8 seconds
      displayTimeout = setTimeout(() => {
        setActive(false);
        // Move to next index for the next interval
        setTimeout(() => {
          setCurrentIndex((prev: number) => (prev + 1) % dynamicData.length);
        }, 600); // Wait for exit animation
      }, 8000);
    };

    // First appearance after a delay
    const initialDelay = setTimeout(() => {
      showNext();
    }, 10000);

    // Repeat frequently for demo
    nextInterval = setInterval(() => {
      if (!active) showNext();
    },  75000);

    return () => {
      clearTimeout(initialDelay);
      clearTimeout(displayTimeout);
      clearInterval(nextInterval);
    };
  }, [dismissed, active]);

  const dismiss = () => {
    setActive(false);
    setDismissed(true);
  };

  if (!mounted || shuffledBookings.length === 0) return null;

  const current = shuffledBookings[currentIndex];
  const flag = FLAG[current.country] ?? "🌍";

  return (
    <div className={`rb-wrap ${active ? 'active' : ''}`}>
      <style>{`
        .rb-wrap {
          position: fixed;
          left: 50%;
          top: 24px;
          z-index: 10000;
          width: 340px;
          transform: translateX(-50%) translateY(-30px);
          opacity: 0;
          filter: blur(10px);
          pointer-events: none;
          transition: all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1);
          font-family: var(--font-sans), system-ui, sans-serif;
        }
        .rb-wrap.active {
          transform: translateX(-50%) translateY(0);
          opacity: 1;
          filter: blur(0px);
          pointer-events: auto;
        }

        .rb-card {
          position: relative;
          background: color-mix(in srgb, var(--card) 88%, transparent);
          backdrop-filter: blur(28px) saturate(180%);
          -webkit-backdrop-filter: blur(28px) saturate(180%);
          border: 1px solid color-mix(in srgb, var(--border), transparent 40%);
          border-radius: 24px;
          box-shadow: 
            0 30px 60px -12px rgba(0, 0, 0, 0.25),
            0 0 0 1px rgba(255, 255, 255, 0.1) inset;
          overflow: hidden;
          padding: 12px;
        }
        
        .rb-inner {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .rb-img-wrap-group {
          position: relative;
          width: 66px; height: 66px;
          flex-shrink: 0;
        }

        .rb-img-main {
          width: 100%; height: 100%;
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid var(--border);
          box-shadow: 0 4px 12px rgba(0,0,0,0.12);
        }
        .rb-img-main img { width: 100%; height: 100%; object-fit: cover; }

        .rb-avatar-overlay {
          position: absolute;
          bottom: -4px; right: -4px;
          width: 28px; height: 28px;
          border-radius: 50%;
          border: 2px solid var(--card);
          overflow: hidden;
          box-shadow: 0 4px 8px rgba(0,0,0,0.2);
          background: var(--card);
        }
        .rb-avatar-overlay img { width: 100%; height: 100%; object-fit: cover; }

        .rb-content {
          flex: 1; min-width: 0;
          display: flex; flex-direction: column; gap: 3px;
        }

        .rb-top-row {
          display: flex; align-items: center; justify-content: space-between;
          margin-bottom: 2px;
        }

        .rb-status {
          display: flex; align-items: center; gap: 6px;
          background: color-mix(in srgb, var(--primary), transparent 92%);
          padding: 3px 9px; border-radius: 100px;
          border: 1px solid color-mix(in srgb, var(--primary), transparent 85%);
        }
        
        .rb-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: var(--primary);
          animation: rb-pulse 2s infinite;
        }
        @keyframes rb-pulse {
          0% { transform: scale(1); opacity: 1; box-shadow: 0 0 0 0 oklch(0.4 0.155 11.87 / 0.4); }
          70% { transform: scale(1.1); opacity: 0.5; box-shadow: 0 0 0 6px oklch(0.4 0.155 11.87 / 0); }
          100% { transform: scale(1); opacity: 1; box-shadow: 0 0 0 0 oklch(0.4 0.155 11.87 / 0); }
        }

        .rb-status-text {
          font-size: 9px; font-weight: 800; text-transform: uppercase;
          letter-spacing: 0.06em; color: var(--primary);
        }

        .rb-dismiss {
          background: none; border: none; cursor: pointer;
          color: var(--muted-foreground); padding: 5px;
          border-radius: 50%; transition: all 0.2s;
        }
        .rb-dismiss:hover { background: var(--secondary); color: var(--foreground); }

        .rb-stay-title {
          font-size: 13.5px; font-weight: 700; color: var(--foreground);
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }

        .rb-user-info {
          display: flex; align-items: center; gap: 6px;
          font-size: 11px; color: var(--muted-foreground);
        }
        .rb-user-name { font-weight: 600; color: var(--foreground); }
        .rb-verified { color: #22c55e; display: flex; align-items: center; }

        .rb-footer {
          display: flex; align-items: center; justify-content: space-between;
          margin-top: 5px; border-top: 1px solid color-mix(in srgb, var(--border), transparent 75%);
          padding-top: 7px;
        }

        .rb-meta-item {
          display: flex; align-items: center; gap: 5px;
          font-size: 10.5px; font-weight: 600; color: var(--muted-foreground);
        }
        
        .rb-time-pill {
          font-size: 10px; font-weight: 700; color: var(--primary);
          background: color-mix(in srgb, var(--primary), transparent 95%);
          padding: 2px 8px; border-radius: 8px;
        }

        .rb-progress {
          position: absolute; bottom: 0; left: 0; right: 0;
          height: 3px; background: color-mix(in srgb, var(--border), transparent 80%);
        }
        .rb-progress-bar {
          height: 100%; background: var(--primary);
          width: 0;
        }
        .rb-wrap.active .rb-progress-bar {
          animation: rb-progress 8s linear forwards;
        }
        @keyframes rb-progress {
          from { width: 0%; } to { width: 100%; }
        }

        @media (max-width: 480px) {
          .rb-wrap { width: calc(100% - 32px); top: 80px; }
        }
      `}</style>

      <div className="rb-card">
        <div className="rb-inner">
          <div className="rb-img-wrap-group">
            <div className="rb-img-main">
              <img 
                src={current.image} 
                alt={current.stay} 
                onError={(e: any) => e.target.src = 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400'} 
              />
            </div>
            <div className="rb-avatar-overlay">
              <img 
                src={current.avatar} 
                alt={current.name} 
                onError={(e: any) => e.target.src = 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100'} 
              />
            </div>
          </div>

          <div className="rb-content">
            <div className="rb-top-row">
              <div className="rb-status">
                <div className="rb-dot" />
                <span className="rb-status-text">Just booked</span>
              </div>
              <button className="rb-dismiss" onClick={dismiss} aria-label="Dismiss">
                <X size={15} />
              </button>
            </div>

            <div className="rb-stay-title">{current.stay}</div>
            
            <div className="rb-user-info">
              <span className="rb-user-name">{current.name}</span>
              <span className="rb-verified">
                <CheckCircle2 size={12} fill="currentColor" stroke="white" />
              </span>
              <span>booked from {current.country}</span>
            </div>

            <div className="rb-footer">
              <div className="rb-meta-item">
                <MapPin size={12} className="text-primary" />
                <span>{flag} {current.city}</span>
              </div>
              <div className="rb-time-pill">{current.time}</div>
            </div>
          </div>
        </div>

        <div className="rb-progress">
          <div className="rb-progress-bar" key={currentIndex} />
        </div>
      </div>
    </div>
  );
}


