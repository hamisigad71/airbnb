'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, MapPin, Star, Calendar, ArrowRight, Camera, Utensils, Waves, Mountain } from 'lucide-react';
import { Header } from '@/components/navigation/guest-header';
import BottomNav from '@/components/navigation/bottom-nav';

export default function ExperiencesPage() {
  const experiences = [
    { title: "Nairobi Wildlife Safari", cat: "Nature", price: 120, rating: 4.9, img: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&q=80&w=800", icon: <Mountain size={18} /> },
    { title: "Maasai Cooking Class", cat: "Food", price: 65, rating: 5.0, img: "https://images.unsplash.com/photo-1547517023-7ca0c162f816?auto=format&fit=crop&q=80&w=800", icon: <Utensils size={18} /> },
    { title: "Diani Beach Snorkeling", cat: "Water", price: 85, rating: 4.8, img: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=800", icon: <Waves size={18} /> },
    { title: "Urban Art Tour", cat: "Culture", price: 40, rating: 4.7, img: "https://images.unsplash.com/photo-1523554888454-84137e72c3ce?auto=format&fit=crop&q=80&w=800", icon: <Camera size={18} /> },
  ];

  return (
    <div className="min-h-screen bg-[oklch(0.99_0.001_0)] pb-32">
      <Header title="Experiences" />

      <main className="max-w-7xl mx-auto px-6 pt-16">
        <header className="mb-16">
          <div className="flex items-center gap-3 mb-4 text-[oklch(0.4_0.155_11.87)]">
            <Sparkles size={24} />
            <span className="font-black text-xs uppercase tracking-[0.3em]">Unique Adventures</span>
          </div>
          <h1 className="text-5xl font-black text-[oklch(0.1_0.001_0)] mb-6 tracking-tight">One-of-a-kind activities</h1>
          <p className="text-xl text-[oklch(0.55_0.005_0)] font-medium max-w-2xl leading-relaxed">
            Hosted by locals, for travelers. Discover the soul of Kenya through authentic local experiences you won't find anywhere else.
          </p>
        </header>

        {/* Experience Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {experiences.map((exp, i) => (
            <div key={exp.title} className="group cursor-pointer">
              <div className="aspect-[3/4] rounded-[32px] overflow-hidden mb-6 relative shadow-lg group-hover:shadow-2xl transition-all duration-500">
                <img src={exp.img} alt={exp.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />
                <div className="absolute top-6 left-6">
                   <div className="bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-2 text-white font-bold text-[10px] uppercase tracking-widest border border-white/20">
                      {exp.icon}
                      {exp.cat}
                   </div>
                </div>
                <div className="absolute bottom-6 left-6 right-6">
                   <div className="flex items-center justify-between text-white">
                      <div className="flex items-center gap-1 font-bold text-sm">
                         <Star size={14} className="text-amber-400 fill-amber-400" />
                         {exp.rating}
                      </div>
                      <div className="font-black text-lg">${exp.price} <span className="text-[10px] font-medium opacity-70">/ person</span></div>
                   </div>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-[oklch(0.4_0.155_11.87)] transition-colors">{exp.title}</h3>
              <p className="text-[oklch(0.55_0.005_0)] font-medium text-sm flex items-center gap-1.5">
                 <MapPin size={14} />
                 Nairobi & Surrounding Areas
              </p>
            </div>
          ))}
        </section>

        {/* Categories / Filters */}
        <div className="mt-24 bg-white p-12 rounded-[56px] border border-[oklch(0.92_0.002_0)] flex flex-col md:flex-row items-center justify-between gap-12">
           <div className="max-w-md">
              <h2 className="text-3xl font-black mb-4 tracking-tight">Hosted by the community</h2>
              <p className="text-[oklch(0.55_0.005_0)] font-medium leading-relaxed">
                 Every experience is vetted for quality and hosted by individuals who are passionate about sharing their craft and culture.
              </p>
           </div>
           <button className="bg-[oklch(0.1_0.001_0)] text-white px-10 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-105 transition-transform shadow-xl shadow-black/10 flex items-center gap-3">
              Become a Host
              <ArrowRight size={18} />
           </button>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
