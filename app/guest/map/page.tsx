'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, List, Filter, Star, Heart, X, MapPin, Navigation } from 'lucide-react';
import { MOCK_LISTINGS } from '@/lib/mock-data';

export default function ExploreMapPage() {
  const [selectedListing, setSelectedListing] = useState<typeof MOCK_LISTINGS[0] | null>(null);

  // Mock pin positions (normalized 0-100)
  const pins = MOCK_LISTINGS.slice(0, 10).map((l, i) => ({
    ...l,
    x: 20 + (i * 15) % 60 + Math.random() * 10,
    y: 20 + (i * 12) % 60 + Math.random() * 10,
  }));

  return (
    <div className="h-screen w-full relative bg-[oklch(0.96_0.002_0)] overflow-hidden font-sans">
      {/* Map Background Placeholder (Stylized SVG) */}
      <div className="absolute inset-0 z-0 bg-[#e5e7eb] opacity-40">
        <svg width="100%" height="100%" viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 100H800M0 200H800M0 300H800M0 400H800M0 500H800" stroke="#cbd5e1" strokeWidth="1" />
          <path d="M100 0V600M200 0V600M300 0V600M400 0V600M500 0V600M600 0V600M700 0V600" stroke="#cbd5e1" strokeWidth="1" />
          <path d="M-50 150Q150 50 350 250T750 150" stroke="#94a3b8" strokeWidth="40" strokeLinecap="round" opacity="0.2" />
          <circle cx="400" cy="300" r="150" fill="#f1f5f9" />
          <rect x="200" y="100" width="100" height="200" rx="20" fill="#f1f5f9" />
          <rect x="450" y="350" width="150" height="100" rx="20" fill="#f1f5f9" />
        </svg>
      </div>

      {/* Floating Header */}
      <header className="absolute top-6 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-48px)] max-w-2xl">
        <div className="bg-white/80 backdrop-blur-2xl border border-white rounded-[28px] p-3 shadow-2xl flex items-center gap-3">
          <button className="p-3.5 hover:bg-black/5 rounded-2xl transition-colors">
            <Link href="/guest">
              <X size={20} />
            </Link>
          </button>
          <div className="flex-1 relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search map..."
              className="w-full bg-gray-100/50 border-none rounded-2xl py-3 pl-12 pr-4 font-bold text-sm focus:ring-0"
            />
          </div>
          <button className="flex items-center gap-2 px-5 py-3 bg-[oklch(0.1_0.001_0)] text-white rounded-2xl font-bold text-sm hover:bg-black transition-all">
            <Filter size={16} />
            Filters
          </button>
        </div>
      </header>

      {/* Map Pins */}
      {pins.map((pin) => (
        <button
          key={pin.id}
          onClick={() => setSelectedListing(pin)}
          style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
          className={`absolute z-10 transition-all duration-500 hover:z-20 ${
            selectedListing?.id === pin.id ? 'scale-125' : 'hover:scale-110'
          }`}
        >
          <div className={`px-3 py-1.5 rounded-full font-black text-sm shadow-xl flex items-center gap-1.5 border-2 transition-all duration-300 ${
            selectedListing?.id === pin.id 
              ? 'bg-[oklch(0.1_0.001_0)] text-white border-white' 
              : 'bg-white text-[oklch(0.1_0.001_0)] border-transparent'
          }`}>
            <span>${pin.pricePerNight}</span>
          </div>
          <div className={`mx-auto w-3 h-3 bg-current rotate-45 -mt-1.5 shadow-xl transition-colors duration-300 ${
            selectedListing?.id === pin.id ? 'text-[oklch(0.1_0.001_0)]' : 'text-white'
          }`} />
        </button>
      ))}

      {/* Selected Listing Card (Absolute position) */}
      {selectedListing && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-48px)] max-w-md animate-in slide-in-from-bottom-10 duration-500">
          <div className="bg-white rounded-[32px] overflow-hidden shadow-2xl border border-white flex">
            <div className="w-1/3 aspect-square relative">
              <img src={selectedListing.image} alt={selectedListing.title} className="w-full h-full object-cover" />
              <button 
                onClick={(e) => { e.stopPropagation(); setSelectedListing(null); }}
                className="absolute top-2 left-2 p-1.5 rounded-full bg-black/40 text-white backdrop-blur-md"
              >
                <X size={14} />
              </button>
            </div>
            <div className="flex-1 p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-bold text-[oklch(0.1_0.001_0)] line-clamp-1">{selectedListing.title}</h3>
                  <div className="flex items-center gap-1">
                    <Star size={12} fill="currentColor" className="text-amber-500" />
                    <span className="text-[10px] font-black">{selectedListing.rating}</span>
                  </div>
                </div>
                <p className="text-[oklch(0.55_0.005_0)] text-[10px] font-bold flex items-center gap-1 mb-3">
                  <MapPin size={10} />
                  {selectedListing.city}
                </p>
                <p className="font-black text-lg text-[oklch(0.4_0.155_11.87)]">${selectedListing.pricePerNight} <span className="text-[10px] font-bold text-gray-400">/ night</span></p>
              </div>
              <div className="flex gap-2">
                <Link href={`/guest/listings/${selectedListing.id}`} className="flex-1">
                  <button className="w-full bg-[oklch(0.1_0.001_0)] text-white font-bold py-2.5 rounded-xl text-xs hover:bg-black transition-colors">
                    View Details
                  </button>
                </Link>
                <button className="p-2.5 rounded-xl border border-gray-200 text-gray-400">
                  <Heart size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Controls */}
      <div className="absolute bottom-10 right-8 z-40 flex flex-col gap-3">
        <button className="w-14 h-14 bg-white rounded-2xl shadow-xl flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors">
          <Navigation size={24} />
        </button>
        <Link href="/guest/listings">
          <button className="h-14 px-6 bg-[oklch(0.1_0.001_0)] text-white rounded-2xl shadow-xl flex items-center gap-3 font-bold text-sm hover:scale-105 transition-transform active:scale-95">
            <List size={20} />
            Show List
          </button>
        </Link>
      </div>

      <style jsx global>{`
        @keyframes pinBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        .animate-bounce-slow {
          animation: pinBounce 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
