'use client';

import React from 'react';
import Link from 'next/link';
import { BookOpen, Search, ChevronRight, PenTool, ShieldCheck, HelpCircle, MessageCircle, ArrowLeft, Lightbulb, MapPin, Camera } from 'lucide-react';
import BottomNav from '@/components/navigation/bottom-nav';

export default function HostGuidePage() {
  const guides = [
    { title: "Getting Started", icon: <Lightbulb size={24} />, desc: "Everything you need to know about booking your first stay." },
    { title: "Host Protocols", icon: <ShieldCheck size={24} />, desc: "Learn about how our hosts are verified and how to stay safe." },
    { title: "Experience Kenya", icon: <MapPin size={24} />, desc: "Local tips and hidden gems across Nairobi, Mombasa, and beyond." },
    { title: "Photo Tips", icon: <Camera size={24} />, desc: "How to take great photos for your reviews and host feedback." },
  ];

  return (
    <div className="min-h-screen bg-[oklch(0.99_0.001_0)] pb-32">
      

      <main className="max-w-6xl mx-auto px-6 pt-16">
        {/* Hero Section */}
        <section className="text-center mb-20 animate-in fade-in slide-in-from-bottom-5 duration-700">
          <div className="w-20 h-20 bg-[oklch(0.4_0.155_11.87/0.1)] text-[oklch(0.4_0.155_11.87)] rounded-3xl flex items-center justify-center mx-auto mb-8">
            <BookOpen size={40} />
          </div>
          <h1 className="text-5xl font-black text-[oklch(0.1_0.001_0)] mb-6 tracking-tight">How can we help you?</h1>
          <p className="text-xl text-[oklch(0.55_0.005_0)] font-medium max-w-2xl mx-auto mb-10 leading-relaxed">
            Find answers, learn more about our community, and discover how to make the most of your next luxury stay.
          </p>
          
          <div className="max-w-xl mx-auto relative group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-[oklch(0.55_0.005_0)] group-focus-within:text-[oklch(0.4_0.155_11.87)] transition-colors" />
            <input 
              type="text" 
              placeholder="Search guides, tips, and safety info..."
              className="w-full bg-white border-2 border-[oklch(0.92_0.002_0)] rounded-3xl py-5 px-16 font-bold text-lg focus:border-[oklch(0.4_0.155_11.87)] focus:ring-0 transition-all shadow-sm"
            />
          </div>
        </section>

        {/* Guides Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {guides.map((guide, i) => (
            <div 
              key={guide.title}
              className="group bg-white p-8 rounded-[32px] border border-[oklch(0.92_0.002_0)] hover:border-[oklch(0.4_0.155_11.87/0.3)] hover:shadow-xl hover:-translate-y-2 transition-all duration-500 cursor-pointer"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="w-12 h-12 bg-[oklch(0.96_0.002_0)] text-[oklch(0.1_0.001_0)] group-hover:bg-[oklch(0.4_0.155_11.87)] group-hover:text-white rounded-2xl flex items-center justify-center mb-6 transition-colors">
                {guide.icon}
              </div>
              <h3 className="text-lg font-black mb-3">{guide.title}</h3>
              <p className="text-sm font-medium text-[oklch(0.55_0.005_0)] leading-relaxed mb-6">{guide.desc}</p>
              <div className="flex items-center gap-2 text-[oklch(0.4_0.155_11.87)] font-black text-xs uppercase tracking-widest">
                Read Guide
                <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </section>

        {/* Help Center CTA */}
        <section className="bg-gradient-to-br from-[oklch(0.1_0.001_0)] to-[oklch(0.2_0.001_0)] rounded-[48px] p-12 text-white flex flex-col lg:flex-row items-center justify-between gap-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[oklch(0.4_0.155_11.87/0.1)] blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />
          <div className="relative z-10 max-w-xl text-center lg:text-left">
            <h2 className="text-4xl font-black mb-6 leading-tight">Can't find what you're looking for?</h2>
            <p className="text-white/60 font-medium text-lg mb-8 leading-relaxed">
              Our 24/7 priority support team is always here to help you via chat, email, or a phone call.
            </p>
            <div className="flex flex-wrap justify-center lg:justify-start gap-4">
              <button className="bg-white text-[oklch(0.1_0.001_0)] px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-105 transition-transform flex items-center gap-2 shadow-xl shadow-black/20">
                <MessageCircle size={18} />
                Live Chat
              </button>
              <button className="bg-white/10 backdrop-blur-md border border-white/20 px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-white/20 transition-all flex items-center gap-2">
                <HelpCircle size={18} />
                Help Center
              </button>
            </div>
          </div>
          <div className="w-full lg:w-96 aspect-square bg-gradient-to-br from-[oklch(0.4_0.155_11.87)] to-[oklch(0.3_0.155_11.87)] rounded-[40px] relative overflow-hidden shadow-2xl rotate-3 lg:-rotate-3 group hover:rotate-0 transition-transform duration-700">
             <div className="absolute inset-0 flex items-center justify-center">
                <PenTool size={120} className="text-white/20 group-hover:scale-110 transition-transform duration-1000" />
             </div>
             <div className="absolute bottom-10 left-10 text-white">
                <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-1">Upcoming Article</p>
                <h4 className="text-2xl font-black">Sustainable Luxury Hosting</h4>
             </div>
          </div>
        </section>
      </main>

      <BottomNav />
      
      <style jsx global>{`
        body { background-color: oklch(0.99 0.001 0); }
      `}</style>
    </div>
  );
}
