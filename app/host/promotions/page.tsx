'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Tag, Percent, Zap, Calendar, Sparkles, ChevronRight, Info } from 'lucide-react';

export default function HostPromotionsPage() {
  return (
    <div className="min-h-screen bg-[oklch(0.99_0.001_0)] pb-24">
      <main className="max-w-5xl mx-auto px-8 py-12">
        <div className="mb-12">
          <h2 className="text-4xl font-black text-[oklch(0.1_0.001_0)] mb-4">Attract more guests</h2>
          <p className="text-[oklch(0.55_0.005_0)] font-medium text-lg max-w-2xl leading-relaxed">
            Boost your bookings by offering limited-time discounts or special rates for longer stays.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {[
            { 
              title: "Early Bird Discount", 
              desc: "Offer a discount for guests who book at least 3 months in advance.", 
              icon: <Zap className="text-amber-500" />,
              benefit: "Best for filling up future dates"
            },
            { 
              title: "Last Minute Deal", 
              desc: "Fill empty nights by offering a discount for stays within the next 48 hours.", 
              icon: <Sparkles className="text-[oklch(0.4_0.155_11.87)]" />,
              benefit: "Best for clearing inventory"
            },
            { 
              title: "Monthly Stay Discount", 
              desc: "Guests stay longer when you offer a weekly or monthly percentage off.", 
              icon: <Calendar className="text-blue-500" />,
              benefit: "Best for steady income"
            },
            { 
              title: "New Listing Promo", 
              desc: "Get your first reviews faster by offering 20% off to your first 3 guests.", 
              icon: <Percent className="text-green-500" />,
              benefit: "Best for new properties"
            }
          ].map((promo, i) => (
            <div key={i} className="group bg-white p-10 rounded-[40px] border border-[oklch(0.92_0.002_0)] shadow-sm hover:shadow-xl hover:border-[oklch(0.1_0.001_0)] transition-all duration-300">
              <div className="w-14 h-14 bg-[oklch(0.96_0.002_0)] rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                {promo.icon}
              </div>
              <h3 className="text-2xl font-black mb-3">{promo.title}</h3>
              <p className="text-[oklch(0.55_0.005_0)] font-medium mb-6 leading-relaxed">{promo.desc}</p>
              <div className="flex items-center justify-between mt-auto">
                <span className="text-[10px] font-black uppercase tracking-widest text-[oklch(0.4_0.155_11.87)]">{promo.benefit}</span>
                <button className="flex items-center gap-2 font-black text-sm hover:translate-x-1 transition-transform">
                  Set Up
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-[oklch(0.95_0.03_11.87/0.3)] p-10 rounded-[48px] border-2 border-dashed border-[oklch(0.4_0.155_11.87/0.2)] flex flex-col md:flex-row items-center gap-8">
          <div className="w-20 h-20 bg-white rounded-3xl shadow-lg flex items-center justify-center text-[oklch(0.4_0.155_11.87)] flex-shrink-0">
            <Tag size={40} />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h4 className="text-2xl font-black mb-2">Custom Promotion</h4>
            <p className="text-[oklch(0.55_0.005_0)] font-medium mb-0">Create your own specific discount for any date range or guest type.</p>
          </div>
          <button className="bg-[oklch(0.1_0.001_0)] text-white px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-black/10 hover:scale-105 transition-transform">Create New</button>
        </div>
      </main>
    </div>
  );
}
