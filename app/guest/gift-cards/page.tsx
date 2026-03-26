'use client';

import React from 'react';
import Link from 'next/link';
import { Gift, Sparkles, Send, CreditCard, Heart, ArrowRight, GiftIcon, Info, ChevronRight } from 'lucide-react';
import { Header } from '@/components/navigation/guest-header';
import BottomNav from '@/components/navigation/bottom-nav';

export default function GiftCardsPage() {
  const designs = [
    { title: "Safari Sunset", img: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&q=80&w=800" },
    { title: "Mombasa Blue", img: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&q=80&w=800" },
    { title: "Forest Retreat", img: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=800" },
    { title: "StayLux Gold", img: "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80&w=800" },
  ];

  return (
    <div className="min-h-screen bg-[oklch(0.99_0.001_0)] pb-32">
      <Header title="Gift Cards" />

      <main className="max-w-6xl mx-auto px-6 pt-16">
        <div className="bg-gradient-to-br from-[oklch(0.1_0.001_0)] to-[oklch(0.2_0.001_0)] rounded-[64px] p-20 text-white text-center relative overflow-hidden mb-24">
           <div className="absolute top-0 left-0 w-full h-full opacity-30">
              <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[oklch(0.4_0.155_11.87)] blur-[120px] rounded-full" />
              <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500 blur-[120px] rounded-full" />
           </div>

           <div className="relative z-10">
              <div className="w-24 h-24 bg-white/10 backdrop-blur-md rounded-3xl flex items-center justify-center mx-auto mb-10 shadow-2xl rotate-12">
                 <Gift size={56} className="text-[oklch(0.4_0.155_11.87)]" />
              </div>
              <h1 className="text-6xl font-black mb-8 tracking-tighter">Give the gift of luxury</h1>
              <p className="text-2xl text-white/70 font-medium max-w-2xl mx-auto mb-12 leading-relaxed">
                 The perfect gift for the adventurers, the dreamers, and the luxury seekers in your life.
              </p>
              <button className="bg-[oklch(0.4_0.155_11.87)] text-white px-12 py-5 rounded-2xl font-black text-lg uppercase tracking-widest hover:scale-105 transition-transform shadow-2xl flex items-center gap-4 mx-auto">
                 Buy Gift Card
                 <Send size={24} />
              </button>
           </div>
        </div>

        {/* Steps Section */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-24 text-center">
           {[
             { title: "Select Design", icon: <Sparkles />, desc: "Choose from our curated collection of beautiful card designs." },
             { title: "Amount & Note", icon: <CreditCard />, desc: "Choose any value up to $2,000 and add a personalized message." },
             { title: "Send Instantly", icon: <Send />, desc: "Delivered via email on your chosen date with everything they need." }
           ].map((step, i) => (
             <div key={i} className="flex flex-col items-center">
                <div className="w-16 h-16 bg-[oklch(0.96_0.002_0)] text-black rounded-2xl flex items-center justify-center mb-6">
                   {step.icon}
                </div>
                <h3 className="text-2xl font-black mb-3">{step.title}</h3>
                <p className="text-[oklch(0.55_0.005_0)] font-medium max-w-[240px] leading-relaxed">{step.desc}</p>
             </div>
           ))}
        </section>

        {/* Cards Grid */}
        <section className="mb-24">
           <h2 className="text-3xl font-black mb-12">Popular Designs</h2>
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {designs.map((card, i) => (
                <div key={i} className="group relative aspect-[1.6/1] rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer">
                   <img src={card.img} alt={card.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                   <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                   <div className="absolute bottom-6 left-6 text-white">
                      <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-1">Edition 2024</p>
                      <h4 className="font-black text-xl">{card.title}</h4>
                   </div>
                   <div className="absolute top-6 right-6">
                      <LogoBadge size={32} />
                   </div>
                </div>
              ))}
           </div>
        </section>

        <section className="bg-white border border-[oklch(0.92_0.002_0)] rounded-[48px] p-12 flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="flex items-center gap-6">
               <div className="w-20 h-20 bg-[oklch(0.96_0.002_0)] rounded-3xl flex items-center justify-center text-[oklch(0.1_0.001_0)]">
                  <GiftIcon size={40} />
               </div>
               <div>
                  <h3 className="text-2xl font-black mb-2">Check Balance</h3>
                  <p className="text-[oklch(0.55_0.005_0)] font-medium">Already have a gift card? Check your current balance here.</p>
               </div>
            </div>
            <div className="w-full lg:w-[400px] flex gap-2">
               <input type="text" placeholder="Card Number" className="flex-1 bg-[oklch(0.98_0.001_0)] border-2 border-[oklch(0.92_0.002_0)] rounded-xl px-4 font-bold" />
               <button className="bg-[oklch(0.1_0.001_0)] text-white px-6 py-3 rounded-xl font-bold">Check</button>
            </div>
        </section>
      </main>

      <BottomNav />
    </div>
  );
}

function LogoBadge({ size }: { size: number }) {
  return (
    <div 
      className="bg-[oklch(0.4_0.155_11.87)] rounded-xl flex items-center justify-center text-white" 
      style={{ width: size, height: size }}
    >
      <Sparkles size={size * 0.6} />
    </div>
  );
}
