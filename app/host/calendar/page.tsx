'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Filter, Settings, Info, ArrowLeft, MoreHorizontal, User } from 'lucide-react';

export default function HostCalendarPage() {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  // Mock data for booked dates
  const bookedDates = [12, 13, 14, 15, 20, 21, 22];

  return (
    <div className="min-h-screen bg-[oklch(0.99_0.001_0)] pb-24">
      <main className="max-w-7xl mx-auto px-8 py-10 flex flex-col lg:flex-row gap-10">
        {/* Calendar Control & Grid */}
        <section className="flex-1 bg-white rounded-[40px] border border-[oklch(0.92_0.002_0)] shadow-sm overflow-hidden">
          <header className="p-8 border-b border-[oklch(0.92_0.002_0)] flex items-center justify-between bg-[oklch(0.98_0.001_0)]">
            <div className="flex items-center gap-4">
              <h2 className="text-2xl font-black">{months[currentMonth.getMonth()]} {currentMonth.getFullYear()}</h2>
              <div className="flex gap-1 ml-4 bg-white p-1 rounded-xl border border-[oklch(0.92_0.002_0)] shadow-sm">
                <button className="p-2 hover:bg-[oklch(0.96_0.002_0)] rounded-lg transition-all"><ChevronLeft size={18} /></button>
                <button className="p-2 hover:bg-[oklch(0.96_0.002_0)] rounded-lg transition-all"><ChevronRight size={18} /></button>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[oklch(0.9_0.001_0)] font-bold text-sm hover:bg-white transition-all">
                <Filter size={16} />
                Filters
              </button>
            </div>
          </header>

          <div className="p-8">
            <div className="grid grid-cols-7 mb-4">
              {days.map(day => (
                <div key={day} className="text-center text-[10px] font-black uppercase tracking-widest text-[oklch(0.55_0.005_0)] py-4">
                  {day}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-px bg-[oklch(0.92_0.002_0)] border border-[oklch(0.92_0.002_0)] rounded-2xl overflow-hidden">
              {Array.from({ length: 35 }).map((_, i) => {
                const day = i - 2; // Offset for May 2024 (starts on Wednesday)
                const isBooked = bookedDates.includes(day);
                const isToday = day === 26;

                return (
                  <div key={i} className="min-h-[140px] bg-white p-4 group transition-colors hover:bg-[oklch(0.98_0.001_0)] cursor-pointer">
                    <div className="flex justify-between items-start mb-2">
                      <span className={`text-sm font-black ${
                        day < 1 || day > 31 ? 'opacity-20' : 
                        isToday ? 'bg-[oklch(0.4_0.155_11.87)] text-white w-7 h-7 rounded-full flex items-center justify-center' : 'text-[oklch(0.1_0.001_0)]'
                      }`}>
                        {day > 0 && day <= 31 ? day : ''}
                      </span>
                      {isBooked && (
                        <div className="w-2 h-2 rounded-full bg-[oklch(0.4_0.155_11.87)]" />
                      )}
                    </div>
                    
                    {day > 0 && day <= 31 && (
                      <div className="space-y-2">
                        {isBooked ? (
                          <div className="bg-[oklch(0.95_0.03_11.87)] p-2 rounded-lg border border-[oklch(0.4_0.155_11.87/0.2)]">
                            <p className="text-[9px] font-black text-[oklch(0.4_0.155_11.87)] uppercase tracking-tighter truncate">Sarah M.</p>
                            <p className="text-[10px] font-bold text-[oklch(0.1_0.001_0)] truncate">$450 • 5 nights</p>
                          </div>
                        ) : (
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                            <p className="text-[10px] font-bold text-gray-400">$185</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Sidebar Context */}
        <aside className="w-full lg:w-96 space-y-8">
          <div className="bg-white p-8 rounded-[40px] border border-[oklch(0.92_0.002_0)] shadow-sm">
            <h3 className="text-xl font-black mb-6">Booking Details</h3>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[oklch(0.4_0.155_11.87)] to-[oklch(0.3_0.155_11.87)] flex items-center justify-center text-white font-black text-xl">
                SM
              </div>
              <div>
                <h4 className="font-bold text-lg">Sarah Miller</h4>
                <p className="text-sm font-medium text-[oklch(0.55_0.005_0)]">Guest since 2024</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[oklch(0.95_0.002_0)]">
                <span className="text-sm font-bold text-[oklch(0.55_0.005_0)]">Stay Dates</span>
                <span className="text-sm font-black">May 12 - 17, 2024</span>
              </div>
              <div className="flex items-center justify-between pb-4 border-b border-[oklch(0.95_0.002_0)]">
                <span className="text-sm font-bold text-[oklch(0.55_0.005_0)]">Listing</span>
                <span className="text-sm font-black truncate max-w-[140px]">Modern Loft...</span>
              </div>
              <div className="flex items-center justify-between pb-4 border-b border-[oklch(0.95_0.002_0)]">
                <span className="text-sm font-bold text-[oklch(0.55_0.005_0)]">Payout</span>
                <span className="text-sm font-black text-[oklch(0.4_0.155_11.87)]">$427.50</span>
              </div>
            </div>

            <div className="mt-10 space-y-3">
              <button className="w-full py-4 rounded-2xl bg-[oklch(0.1_0.001_0)] text-white font-black text-sm uppercase tracking-widest hover:bg-black transition-all">Message Sarah</button>
              <button className="w-full py-4 rounded-2xl border-2 border-[oklch(0.92_0.002_0)] text-[oklch(0.1_0.001_0)] font-black text-sm uppercase tracking-widest hover:bg-[oklch(0.96_0.002_0)] transition-all">Support Case</button>
            </div>
          </div>

          <div className="bg-[oklch(0.1_0.001_0)] p-8 rounded-[40px] text-white">
            <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-6">
              <Info size={24} />
            </div>
            <h4 className="text-xl font-bold mb-3">Host Pro Tip</h4>
            <p className="text-white/60 font-medium text-sm leading-relaxed mb-6">
              Properties in your area are seeing a 20% increase in bookings by offering a "Work from Home" setup.
            </p>
            <button className="bg-white text-[oklch(0.1_0.001_0)] px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest">Learn More</button>
          </div>
        </aside>
      </main>

      <style jsx global>{`
        .hd-btn {
          display: inline-flex; align-items: center; gap: 7px;
          padding: 11px 22px; border-radius: 12px;
          font-size: 0.86rem; font-weight: 600;
          cursor: pointer; transition: all 0.22s;
          text-decoration: none; border: none;
          font-family: inherit; white-space: nowrap;
        }
        .hd-btn-primary { background: oklch(0.1 0.001 0); color: #fff; }
        .hd-btn-outline { background: white; color: oklch(0.1 0.001 0); border: 1.5px solid oklch(0.9 0.002 0); }
      `}</style>
    </div>
  );
}
