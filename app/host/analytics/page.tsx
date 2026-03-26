'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, TrendingUp, TrendingDown, DollarSign, Users, Star, BarChart, PieChart, Calendar, Download, Info } from 'lucide-react';

export default function HostAnalyticsPage() {
  return (
    <div className="min-h-screen bg-[oklch(0.99_0.001_0)] pb-24">
      <main className="max-w-7xl mx-auto px-8 py-10">
        {/* Back Navigation & Actions */}
        <div className="flex items-center justify-between mb-8 animate-in fade-in slide-in-from-top-4 duration-700">
          <Link href="/host" className="flex items-center gap-2 text-[oklch(0.55_0.005_0)] hover:text-[oklch(0.1_0.001_0)] font-bold text-sm uppercase tracking-widest transition-all">
            <ArrowLeft size={16} />
            Back to Dashboard
          </Link>
          <button className="hd-btn hd-btn-outline px-6 py-2.5 text-xs font-black uppercase tracking-widest flex items-center gap-2">
            <Download size={14} />
            Export Data
          </button>
        </div>

        {/* Performance Overview */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-8 rounded-[32px] border border-[oklch(0.92_0.002_0)] shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div className="w-12 h-12 bg-green-500/10 text-green-600 rounded-2xl flex items-center justify-center">
                <DollarSign size={24} />
              </div>
              <span className="flex items-center gap-1 text-green-600 font-black text-xs bg-green-500/10 px-2 py-1 rounded-lg">
                <TrendingUp size={12} />
                +14.2%
              </span>
            </div>
            <p className="text-[10px] font-black uppercase tracking-widest text-[oklch(0.55_0.005_0)] mb-1">Total Revenue</p>
            <h3 className="text-3xl font-black text-[oklch(0.1_0.001_0)]">$12,480.00</h3>
          </div>

          <div className="bg-white p-8 rounded-[32px] border border-[oklch(0.92_0.002_0)] shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div className="w-12 h-12 bg-blue-500/10 text-blue-600 rounded-2xl flex items-center justify-center">
                <Users size={24} />
              </div>
              <span className="flex items-center gap-1 text-blue-600 font-black text-xs bg-blue-500/10 px-2 py-1 rounded-lg">
                <TrendingUp size={12} />
                +8.1%
              </span>
            </div>
            <p className="text-[10px] font-black uppercase tracking-widest text-[oklch(0.55_0.005_0)] mb-1">Total Bookings</p>
            <h3 className="text-3xl font-black text-[oklch(0.1_0.001_0)]">148</h3>
          </div>

          <div className="bg-white p-8 rounded-[32px] border border-[oklch(0.92_0.002_0)] shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div className="w-12 h-12 bg-amber-500/10 text-amber-600 rounded-2xl flex items-center justify-center">
                <Star size={24} />
              </div>
              <span className="flex items-center gap-1 text-red-500 font-black text-xs bg-red-500/10 px-2 py-1 rounded-lg">
                <TrendingDown size={12} />
                -0.2%
              </span>
            </div>
            <p className="text-[10px] font-black uppercase tracking-widest text-[oklch(0.55_0.005_0)] mb-1">Guest Satisfaction</p>
            <h3 className="text-3xl font-black text-[oklch(0.1_0.001_0)]">4.88 / 5</h3>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Chart Section */}
          <section className="lg:col-span-2 bg-white rounded-[40px] border border-[oklch(0.92_0.002_0)] p-10 shadow-sm relative overflow-hidden">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h3 className="text-2xl font-black mb-2">Revenue Forecast</h3>
                <p className="text-[oklch(0.55_0.005_0)] font-medium">Estimated earnings based on current bookings and trends.</p>
              </div>
              <div className="flex gap-2">
                {['Year', 'Month', 'Week'].map((t) => (
                  <button key={t} className={`px-4 py-2 rounded-xl font-bold text-xs ${t==='Month'?'bg-[oklch(0.1_0.001_0)] text-white':'hover:bg-[oklch(0.96_0.002_0)]'}`}>{t}</button>
                ))}
              </div>
            </div>

            {/* Stylized Chart Placeholder */}
            <div className="h-[300px] w-full relative">
              <svg width="100%" height="100%" viewBox="0 0 800 300" preserveAspectRatio="none">
                <path d="M0,250 Q100,200 200,230 T400,100 T600,150 T800,50" fill="none" stroke="oklch(0.4_0.155_11.87)" strokeWidth="4" strokeLinecap="round" />
                <path d="M0,250 Q100,200 200,230 T400,100 T600,150 T800,50 V300 H0 Z" fill="url(#grad)" opacity="0.1" />
                <defs>
                  <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.4_0.155_11.87)" />
                    <stop offset="100%" stopColor="white" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute top-0 left-0 w-full h-full flex justify-between items-end px-4 opacity-40">
                {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'].map(m => (
                  <span key={m} className="text-[10px] font-black uppercase tracking-widest text-[oklch(0.55_0.005_0)]">{m}</span>
                ))}
              </div>
            </div>
          </section>

          {/* Side Performance Cards */}
          <div className="space-y-8">
            <div className="bg-[oklch(0.1_0.001_0)] p-8 rounded-[40px] text-white">
              <h4 className="text-lg font-black mb-6 flex items-center gap-2">
                <PieChart size={20} className="text-[oklch(0.4_0.155_11.87)]" />
                Occupancy Rate
              </h4>
              <div className="flex items-center justify-between mb-8">
                <div className="text-5xl font-black">74%</div>
                <div className="w-16 h-16 rounded-full border-4 border-white/10 border-t-[oklch(0.4_0.155_11.87)] flex items-center justify-center">
                  <span className="text-[10px] font-black">HIGH</span>
                </div>
              </div>
              <p className="text-white/60 font-medium text-xs leading-relaxed">
                Your properties are performing 12% better than the local average for May.
              </p>
            </div>

            <div className="bg-white p-8 rounded-[40px] border border-[oklch(0.92_0.002_0)] shadow-sm">
              <h4 className="text-lg font-black mb-6">Top Performers</h4>
              <div className="space-y-6">
                {[
                  { title: "Modern Loft", earnings: "$5,240", pct: 40 },
                  { title: "Ocean Villa", earnings: "$4,120", pct: 32 },
                  { title: "Studio Apt", earnings: "$3,120", pct: 28 },
                ].map((p, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between items-center text-sm font-bold">
                      <span>{p.title}</span>
                      <span className="text-[oklch(0.4_0.155_11.87)]">{p.earnings}</span>
                    </div>
                    <div className="w-full h-2 bg-[oklch(0.96_0.002_0)] rounded-full overflow-hidden">
                      <div className="h-full bg-[oklch(0.4_0.155_11.87)] rounded-full" style={{ width: `${p.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Insight Banner */}
        <div className="mt-12 bg-gradient-to-br from-[oklch(0.4_0.155_11.87)] to-[oklch(0.3_0.155_11.87)] p-12 rounded-[48px] text-white text-center flex flex-col items-center">
          <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-8">
            <Info size={32} />
          </div>
          <h2 className="text-3xl font-black mb-4">Optimize your local pricing</h2>
          <p className="text-white/80 font-medium max-w-2xl text-lg leading-relaxed mb-10">
            Based on upcoming festivals in Nairobi, you could increase your nightly rate by up to 15% for the first weekend of June.
          </p>
          <button className="bg-white text-[oklch(0.4_0.155_11.87)] px-10 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-105 transition-transform shadow-xl">Apply Smart Pricing</button>
        </div>
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
