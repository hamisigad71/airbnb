'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Calendar, MapPin, Users, MessageSquare, ArrowRight, Plane, Landmark, History, XCircle } from 'lucide-react';
import { MOCK_BOOKINGS, MOCK_LISTINGS } from '@/lib/mock-data';
import { Header } from '@/components/navigation/guest-header';
import BottomNav from '@/components/navigation/bottom-nav';

export default function BookingsPage() {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past' | 'cancelled'>('upcoming');

  const guestBookings = MOCK_BOOKINGS.filter(b => b.guestId === 'user-guest-1');
  
  const categories = {
    upcoming: guestBookings.filter(b => b.status === 'confirmed' && new Date(b.checkIn) > new Date()),
    past: guestBookings.filter(b => b.status === 'confirmed' && new Date(b.checkIn) <= new Date()),
    cancelled: guestBookings.filter(b => b.status === 'cancelled'),
  };

  const getListing = (id: string) => MOCK_LISTINGS.find(l => l.id === id);

  return (
    <div className="min-h-screen bg-[oklch(0.99_0.001_0)] pb-32">
      <Header title="My Bookings" />
      
      <main className="max-w-5xl mx-auto px-6 pt-12">
        <header className="mb-12">
          <h1 className="text-4xl font-black tracking-tight text-[oklch(0.1_0.001_0)] mb-4">My Bookings</h1>
          <div className="flex gap-2 p-1.5 bg-[oklch(0.96_0.002_0)] rounded-2xl w-fit border border-[oklch(0.92_0.002_0)]">
            {(['upcoming', 'past', 'cancelled'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all duration-300 capitalize ${
                  activeTab === tab 
                    ? 'bg-white text-[oklch(0.4_0.155_11.87)] shadow-sm' 
                    : 'text-[oklch(0.55_0.005_0)] hover:text-[oklch(0.1_0.001_0)]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </header>

        <section className="space-y-8">
          {categories[activeTab].length > 0 ? (
            categories[activeTab].map((booking) => {
              const listing = getListing(booking.listingId);
              if (!listing) return null;

              return (
                <div key={booking.id} className="group bg-white border border-[oklch(0.92_0.002_0)] rounded-[32px] overflow-hidden shadow-sm hover:shadow-xl hover:border-[oklch(0.4_0.155_11.87/0.3)] transition-all duration-500">
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/3 aspect-[4/3] md:aspect-auto relative overflow-hidden">
                      <img 
                        src={listing.image} 
                        alt={listing.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute top-4 left-4">
                        <span className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest backdrop-blur-md ${
                          activeTab === 'upcoming' ? 'bg-green-500/90 text-white' : 
                          activeTab === 'past' ? 'bg-blue-500/90 text-white' : 'bg-red-500/90 text-white'
                        }`}>
                          {booking.status}
                        </span>
                      </div>
                    </div>

                    <div className="flex-1 p-8 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h2 className="text-xl font-bold text-[oklch(0.1_0.001_0)] mb-1 group-hover:text-[oklch(0.4_0.155_11.87)] transition-colors">{listing.title}</h2>
                            <p className="text-[oklch(0.55_0.005_0)] flex items-center gap-1.5 font-medium">
                              <MapPin size={16} />
                              {listing.city}, {listing.country}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-[10px] uppercase tracking-widest font-black text-[oklch(0.55_0.005_0)] mb-1">TOTAL</p>
                            <p className="text-xl font-black text-[oklch(0.4_0.155_11.87)]">${booking.totalPrice}</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6 bg-[oklch(0.98_0.001_0)] p-5 rounded-2xl border border-[oklch(0.95_0.002_0)]">
                          <div className="space-y-1">
                            <p className="text-[10px] uppercase tracking-widest font-black text-[oklch(0.55_0.005_0)]">CHECK-IN</p>
                            <div className="flex items-center gap-2 font-bold text-[oklch(0.1_0.001_0)]">
                              <Calendar size={16} className="text-[oklch(0.4_0.155_11.87)]" />
                              {new Date(booking.checkIn).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                            </div>
                          </div>
                          <div className="space-y-1">
                            <p className="text-[10px] uppercase tracking-widest font-black text-[oklch(0.55_0.005_0)]">CHECK-OUT</p>
                            <div className="flex items-center gap-2 font-bold text-[oklch(0.1_0.001_0)]">
                              <Calendar size={16} className="text-[oklch(0.4_0.155_11.87)]" />
                              {new Date(booking.checkOut).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-8 flex flex-wrap gap-3">
                        <Link href={`/guest/listings/${listing.id}`} className="flex-1 min-w-[140px]">
                          <button className="w-full bg-[oklch(0.1_0.001_0)] text-white font-bold py-3.5 rounded-xl hover:bg-black transition-colors flex items-center justify-center gap-2">
                            View Details
                            <ArrowRight size={16} />
                          </button>
                        </Link>
                        <button className="px-6 py-3.5 rounded-xl border-2 border-[oklch(0.92_0.002_0)] text-[oklch(0.1_0.001_0)] font-bold hover:bg-[oklch(0.96_0.002_0)] transition-colors flex items-center gap-2">
                          <MessageSquare size={16} />
                          Message Host
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="bg-white border border-dashed border-[oklch(0.88_0.002_0)] rounded-[40px] p-20 text-center">
              <div className="w-20 h-20 bg-[oklch(0.96_0.002_0)] rounded-3xl flex items-center justify-center mx-auto mb-6 text-[oklch(0.55_0.005_0)]">
                {activeTab === 'upcoming' ? <Plane size={32} /> : 
                 activeTab === 'past' ? <History size={32} /> : <XCircle size={32} />}
              </div>
              <h3 className="text-xl font-bold text-[oklch(0.1_0.001_0)] mb-2">No {activeTab} bookings</h3>
              <p className="text-[oklch(0.55_0.005_0)] font-medium mb-8 max-w-sm mx-auto">
                Time to dust off your passport and start planning your next adventure.
              </p>
              <Link href="/guest">
                <button className="bg-[oklch(0.4_0.155_11.87)] text-white px-8 py-3.5 rounded-2xl font-bold shadow-lg shadow-[oklch(0.4_0.155_11.87/0.2)] hover:scale-105 transition-transform">
                  Explore Destinations
                </button>
              </Link>
            </div>
          )}
        </section>

        {/* Informational Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
          <div className="bg-gradient-to-br from-[oklch(0.4_0.155_11.87)] to-[oklch(0.3_0.155_11.87)] p-8 rounded-[32px] text-white">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center mb-6">
              <Landmark size={24} />
            </div>
            <h4 className="text-xl font-bold mb-2">Travel with confidence</h4>
            <p className="text-white/80 font-medium mb-6 text-sm">Every booking includes basic trip protection and 24/7 guest support.</p>
            <button className="bg-white text-[oklch(0.4_0.155_11.87)] px-5 py-2.5 rounded-xl font-bold text-sm">Learn more</button>
          </div>
          <div className="bg-[oklch(0.1_0.001_0)] p-8 rounded-[32px] text-white">
            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-6">
              <Users size={24} />
            </div>
            <h4 className="text-xl font-bold mb-2">Hosting made easy</h4>
            <p className="text-white/60 font-medium mb-6 text-sm">Have a space of your own? Start earning by hosting travelers from around the world.</p>
            <Link href="/host">
              <button className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-5 py-2.5 rounded-xl font-bold text-sm transition-colors">Switch to Hosting</button>
            </Link>
          </div>
        </div>
      </main>

      <BottomNav />
      
      <style jsx global>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        main {
          animation: slideUp 0.7s cubic-bezier(0.16, 1, 0.3, 1);
        }
      `}</style>
    </div>
  );
}
