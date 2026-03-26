'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, SlidersHorizontal, Map as MapIcon, Star, Heart, MapPin, X } from 'lucide-react';
import { MOCK_LISTINGS } from '@/lib/mock-data';
import { Header } from '@/components/navigation/guest-header';
import BottomNav from '@/components/navigation/bottom-nav';

const CATEGORIES = [
  { label: 'All', icon: '🌍' },
  { label: 'Beachfront', icon: '🏖️' },
  { label: 'Modern', icon: '🏢' },
  { label: 'Unique', icon: '🏰' },
  { label: 'Villas', icon: '🏡' },
  { label: 'Rooms', icon: '🛏️' },
  { label: 'Countryside', icon: '🏞️' },
  { label: 'Luxe', icon: '💎' },
];

export default function ListingsIndexPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filteredListings = useMemo(() => {
    return MOCK_LISTINGS.filter(listing => {
      const matchesCategory = activeCategory === 'All' || 
        (activeCategory === 'Villas' && listing.type === 'villa') ||
        (activeCategory === 'Rooms' && listing.type === 'room') ||
        (activeCategory === 'Modern' && (listing.type === 'apartment' || listing.type === 'house'));
      
      const matchesSearch = listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        listing.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        listing.country.toLowerCase().includes(searchQuery.toLowerCase());
        
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-white pb-32">
      <Header title="Explore Stays" />
      
      {/* Search & Filter Bar */}
      <div className="sticky top-18 z-30 bg-white/80 backdrop-blur-xl border-b border-[oklch(0.92_0.002_0)] py-4">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-4">
            {/* Search Input */}
            <div className="relative flex-1 group w-full">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-[oklch(0.55_0.005_0)] group-focus-within:text-[oklch(0.4_0.155_11.87)] transition-colors" size={20} />
              <input 
                type="text" 
                placeholder="Where to? (e.g. Nairobi, Santorini, Beach...)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-14 bg-[oklch(0.96_0.002_0)] border-2 border-transparent focus:border-[oklch(0.4_0.155_11.87)] hover:bg-[oklch(0.94_0.002_0)] rounded-2xl pl-14 pr-6 font-bold text-sm transition-all focus:ring-0"
              />
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto">
              <button 
                onClick={() => setIsFilterOpen(true)}
                className="flex-1 md:flex-none h-14 px-6 rounded-2xl border-2 border-[oklch(0.92_0.002_0)] flex items-center justify-center gap-3 font-bold text-sm hover:bg-[oklch(0.96_0.002_0)] transition-all"
              >
                <SlidersHorizontal size={18} />
                Filters
              </button>
              <Link href="/guest/map" className="flex-1 md:flex-none h-14 px-6 rounded-2xl bg-[oklch(0.1_0.001_0)] text-white flex items-center justify-center gap-3 font-bold text-sm hover:bg-black transition-all shadow-lg shadow-black/10">
                <MapIcon size={18} />
                Map
              </Link>
            </div>
          </div>

          {/* Categories */}
          <div className="flex items-center gap-2 mt-6 overflow-x-auto pb-2 scrollbar-hide">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.label}
                onClick={() => setActiveCategory(cat.label)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm whitespace-nowrap transition-all duration-300 ${
                  activeCategory === cat.label 
                    ? 'bg-[oklch(0.4_0.155_11.87)] text-white shadow-lg shadow-[oklch(0.4_0.155_11.87/0.3)]' 
                    : 'bg-[oklch(0.96_0.002_0)] text-[oklch(0.55_0.005_0)] hover:bg-[oklch(0.92_0.002_0)]'
                }`}
              >
                <span className="text-lg">{cat.icon}</span>
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 mt-12">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-2xl font-black text-[oklch(0.1_0.001_0)]">
              {activeCategory === 'All' ? 'Available Stays' : activeCategory}
            </h2>
            <p className="text-[oklch(0.55_0.005_0)] font-medium mt-1">Found {filteredListings.length} results matching your criteria.</p>
          </div>
          <div className="hidden lg:flex items-center gap-2 text-sm font-bold text-[oklch(0.55_0.005_0)] bg-[oklch(0.96_0.002_0)] px-4 py-2 rounded-xl border border-[oklch(0.92_0.002_0)]">
            Sort by: <span className="text-[oklch(0.1_0.001_0)]">A-Z</span>
          </div>
        </div>

        {filteredListings.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 gap-y-12">
            {filteredListings.map((listing) => (
              <Link key={listing.id} href={`/guest/listings/${listing.id}`} className="group no-underline">
                <div className="relative aspect-[4/3] rounded-[28px] overflow-hidden mb-4 shadow-sm group-hover:shadow-2xl transition-all duration-500">
                  <img 
                    src={listing.image} 
                    alt={listing.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-4 right-4 z-10">
                    <button className="w-10 h-10 rounded-full bg-black/20 backdrop-blur-xl flex items-center justify-center text-white hover:bg-white hover:text-[oklch(0.4_0.155_11.87)] transition-all">
                      <Heart size={20} />
                    </button>
                  </div>
                  <div className="absolute bottom-4 left-4 z-10">
                    <div className="bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-2xl flex items-center gap-1.5 shadow-sm">
                      <Star size={14} className="text-amber-500" fill="currentColor" />
                      <span className="text-[12px] font-black">{listing.rating}</span>
                      <span className="text-[10px] font-bold text-[oklch(0.55_0.005_0)] border-l pl-1.5">({listing.reviews})</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5 px-1">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-lg text-[oklch(0.1_0.001_0)] group-hover:text-[oklch(0.4_0.155_11.87)] transition-colors line-clamp-1">{listing.title}</h3>
                  </div>
                  <div className="flex items-center gap-1.5 text-[oklch(0.55_0.005_0)] text-sm font-medium">
                    <MapPin size={14} />
                    <span>{listing.city}, {listing.country}</span>
                  </div>
                  <div className="pt-2">
                    <span className="text-xl font-black text-[oklch(0.1_0.001_0)]">${listing.pricePerNight}</span>
                    <span className="text-sm font-bold text-[oklch(0.55_0.005_0)]"> / night</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="py-24 text-center bg-[oklch(0.98_0.001_0)] rounded-[40px] border-2 border-dashed border-[oklch(0.92_0.002_0)]">
            <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-sm border border-[oklch(0.95_0.002_0)]">
              <Search size={32} className="text-[oklch(0.55_0.005_0)]" />
            </div>
            <h2 className="text-2xl font-black text-[oklch(0.1_0.001_0)] mb-3">No results found</h2>
            <p className="text-[oklch(0.55_0.005_0)] font-medium mb-10 max-w-sm mx-auto">
              We couldn't find any stays matching your current filters. Try adjusting your search query or category.
            </p>
            <button 
              onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}
              className="px-8 py-3.5 rounded-2xl bg-[oklch(0.1_0.001_0)] text-white font-bold hover:scale-105 transition-transform"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </main>

      {/* Filter Modal Overlay */}
      {isFilterOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white w-full max-w-lg rounded-[40px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
            <header className="p-8 border-b border-[oklch(0.92_0.002_0)] flex items-center justify-between">
              <h3 className="text-2xl font-black">Filters</h3>
              <button onClick={() => setIsFilterOpen(false)} className="w-10 h-10 rounded-full hover:bg-[oklch(0.96_0.002_0)] flex items-center justify-center transition-colors">
                <X size={24} />
              </button>
            </header>
            <div className="p-8 space-y-8">
              <div>
                <h4 className="font-black mb-4 uppercase text-[10px] tracking-widest text-[oklch(0.55_0.005_0)]">Price Range</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-[oklch(0.55_0.005_0)]">Minimum</label>
                    <input type="text" placeholder="$0" className="w-full bg-[oklch(0.96_0.002_0)] border-none rounded-xl p-3 font-bold text-sm" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-[oklch(0.55_0.005_0)]">Maximum</label>
                    <input type="text" placeholder="$1000+" className="w-full bg-[oklch(0.96_0.002_0)] border-none rounded-xl p-3 font-bold text-sm" />
                  </div>
                </div>
              </div>
              <div className="pt-4">
                <button 
                  onClick={() => setIsFilterOpen(false)}
                  className="w-full py-4 rounded-2xl bg-[oklch(0.4_0.155_11.87)] text-white font-black shadow-xl shadow-[oklch(0.4_0.155_11.87/0.3)] hover:scale-[1.02] active:scale-95 transition-all"
                >
                  View {filteredListings.length} Results
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <BottomNav />
      
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}
