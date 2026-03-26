'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Heart, Home, MapPin, Star, ArrowLeft, Search } from 'lucide-react';
import { MOCK_LISTINGS } from '@/lib/mock-data';
import { Header } from '@/components/navigation/guest-header';
import BottomNav from '@/components/navigation/bottom-nav';

export default function SavedStaysPage() {
  // Mocking some saved items (first 3)
  const [savedItems, setSavedItems] = useState(MOCK_LISTINGS.slice(0, 3));

  const removeSaved = (id: string) => {
    setSavedItems(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-[oklch(0.99_0.001_0)] pb-24">
      <Header title="Saved Stays" />
      
      <main className="max-w-7xl mx-auto px-6 pt-10">
        <header className="mb-10 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Link href="/guest" className="p-2 rounded-full hover:bg-black/5 transition-colors">
                <ArrowLeft size={20} />
              </Link>
              <h1 className="text-3xl font-extrabold tracking-tight text-[oklch(0.1_0.001_0)]">Saved Stays</h1>
            </div>
            <p className="text-[oklch(0.55_0.005_0)] ml-11 font-medium">Your personal collection of dream destinations and boutique stays.</p>
          </div>

          <div className="hidden md:flex items-center gap-3 text-sm font-semibold text-[oklch(0.4_0.155_11.87)] bg-[oklch(0.95_0.03_11.87)] px-4 py-2 rounded-full">
            <Heart size={14} fill="currentColor" />
            {savedItems.length} {savedItems.length === 1 ? 'Stay' : 'Stays'}
          </div>
        </header>

        {savedItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {savedItems.map((listing) => (
              <div key={listing.id} className="group relative">
                <Link href={`/guest/listings/${listing.id}`} className="block no-underline">
                  <div className="relative aspect-[4/5] rounded-3xl overflow-hidden mb-4 shadow-sm group-hover:shadow-xl transition-all duration-500 bg-gray-100">
                    <img 
                      src={listing.image} 
                      alt={listing.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Badge */}
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full text-[0.7rem] font-bold tracking-wider uppercase text-black">
                      Guest Favorite
                    </div>

                    {/* Quick View Overly */}
                    <div className="absolute bottom-6 left-6 right-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                      <div className="bg-white/20 backdrop-blur-xl border border-white/30 rounded-2xl p-4 text-white">
                        <div className="flex items-center justify-between font-bold text-sm">
                          <span>${listing.pricePerNight} <span className="font-normal opacity-80">/ night</span></span>
                          <div className="flex items-center gap-1">
                            <Star size={12} fill="currentColor" />
                            <span>{listing.rating}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between items-start">
                      <h3 className="font-bold text-lg text-[oklch(0.1_0.001_0)] group-hover:text-[oklch(0.4_0.155_11.87)] transition-colors line-clamp-1">{listing.title}</h3>
                    </div>
                    <div className="flex items-center gap-1 text-[oklch(0.55_0.005_0)] text-sm">
                      <MapPin size={14} />
                      <span>{listing.city}, {listing.country}</span>
                    </div>
                  </div>
                </Link>

                {/* Unsave Button */}
                <button 
                  onClick={() => removeSaved(listing.id)}
                  className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/80 backdrop-blur-md border border-white shadow-lg flex items-center justify-center text-[oklch(0.4_0.155_11.87)] hover:bg-[oklch(0.4_0.155_11.87)] hover:text-white transition-all duration-300"
                  aria-label="Remove from saved"
                >
                  <Heart size={20} fill="currentColor" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-32 bg-white/50 border border-dashed border-[oklch(0.88_0.002_0)] rounded-[40px] text-center px-6">
            <div className="w-24 h-24 rounded-full bg-[oklch(0.95_0.03_11.87)] flex items-center justify-center text-[oklch(0.4_0.155_11.87)] mb-8 animate-pulse">
              <Heart size={40} strokeWidth={1.5} />
            </div>
            <h2 className="text-2xl font-bold text-[oklch(0.1_0.001_0)] mb-3">No saved stays yet</h2>
            <p className="text-[oklch(0.55_0.005_0)] max-w-sm mb-10 leading-relaxed font-medium">
              Start exploring our curated collection of luxury villas and modern lofts to build your dream wishlist.
            </p>
            <Link href="/guest">
              <button className="bg-[oklch(0.4_0.155_11.87)] text-white px-10 py-4 rounded-2xl font-bold shadow-xl shadow-[oklch(0.4_0.155_11.87/0.3)] hover:scale-105 transition-transform active:scale-95 flex items-center gap-3">
                <Search size={20} />
                Explore Beautiful Stays
              </button>
            </Link>
          </div>
        )}
      </main>

      <BottomNav />

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        main {
          animation: fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
      `}</style>
    </div>
  );
}
