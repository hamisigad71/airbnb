'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Camera, ChevronRight, MapPin, Home, Users, DollarSign, Sparkles, Wand2, ArrowLeft } from 'lucide-react';

export default function NewListingPage() {
  const [step, setStep] = useState(1);

  const steps = [
    { title: 'Basics', icon: <Home size={18} /> },
    { title: 'Details', icon: <Users size={18} /> },
    { title: 'Location', icon: <MapPin size={18} /> },
    { title: 'Photos', icon: <Camera size={18} /> },
    { title: 'Pricing', icon: <DollarSign size={18} /> },
  ];

  return (
    <div className="min-h-screen bg-[oklch(0.99_0.001_0)]">
      {/* Header */}
      <header className="h-20 px-8 bg-white border-b border-[oklch(0.92_0.002_0)] flex items-center justify-between sticky top-0 z-50">
        <Link href="/host" className="flex items-center gap-2 text-[oklch(0.1_0.001_0)] hover:opacity-70 transition-opacity">
          <ArrowLeft size={20} />
          <span className="font-black text-sm uppercase tracking-widest">Back to Dashboard</span>
        </Link>
        <div className="flex items-center gap-4">
          <button className="px-6 py-2.5 rounded-xl border border-[oklch(0.92_0.002_0)] font-bold text-xs uppercase tracking-widest hover:bg-[oklch(0.96_0.002_0)] transition-colors">Save & Exit</button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-8 py-12 flex flex-col lg:flex-row gap-16">
        {/* Progress Sidebar */}
        <aside className="w-full lg:w-72 flex-shrink-0">
          <div className="sticky top-32 space-y-2">
            {steps.map((s, i) => (
              <div 
                key={s.title}
                className={`flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 ${
                  step === i + 1 ? 'bg-[oklch(0.1_0.001_0)] text-white shadow-xl shadow-black/10' : 
                  step > i + 1 ? 'text-[oklch(0.4_0.155_11.87)]' : 'text-[oklch(0.55_0.005_0)] opacity-50'
                }`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  step === i + 1 ? 'bg-white/20' : step > i + 1 ? 'bg-[oklch(0.4_0.155_11.87/0.1)]' : 'bg-[oklch(0.92_0.002_0)]'
                }`}>
                  {s.icon}
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest leading-none mb-1">Step 0{i+1}</p>
                  <p className="font-bold text-sm">{s.title}</p>
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* Form Area */}
        <section className="flex-1 max-w-2xl">
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-5 duration-500">
            <header>
              <div className="w-16 h-16 bg-[oklch(0.4_0.155_11.87/0.1)] text-[oklch(0.4_0.155_11.87)] rounded-2xl flex items-center justify-center mb-6">
                <Sparkles size={32} />
              </div>
              <h1 className="text-4xl font-black text-[oklch(0.1_0.001_0)] mb-4">Tell us about your place</h1>
              <p className="text-[oklch(0.55_0.005_0)] font-medium text-lg leading-relaxed">
                Provide some basic information to help guests find your property. You can always change these details later.
              </p>
            </header>

            <div className="space-y-8">
              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[oklch(0.55_0.005_0)]">Property Title</label>
                <input 
                  type="text" 
                  placeholder="e.g. Modern Loft in the heart of Downtown"
                  className="w-full bg-white border-2 border-[oklch(0.92_0.002_0)] rounded-2xl p-5 font-bold text-lg focus:border-[oklch(0.1_0.001_0)] focus:ring-0 transition-all placeholder:text-[oklch(0.8_0.001_0)]"
                />
              </div>

              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[oklch(0.55_0.005_0)]">Description</label>
                <textarea 
                  rows={4}
                  placeholder="Describe what makes your space unique..."
                  className="w-full bg-white border-2 border-[oklch(0.92_0.002_0)] rounded-2xl p-5 font-medium text-base focus:border-[oklch(0.1_0.001_0)] focus:ring-0 transition-all"
                />
                <button className="flex items-center gap-2 text-[oklch(0.4_0.155_11.87)] font-bold text-xs uppercase tracking-widest hover:opacity-70 transition-all">
                  <Wand2 size={14} />
                  AI Writing Assistant
                </button>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[oklch(0.55_0.005_0)]">Property Type</label>
                  <select className="w-full bg-white border-2 border-[oklch(0.92_0.002_0)] rounded-2xl p-5 font-bold text-sm appearance-none focus:border-[oklch(0.1_0.001_0)] transition-all">
                    <option>Apartment</option>
                    <option>House</option>
                    <option>Villa</option>
                    <option>Room</option>
                  </select>
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[oklch(0.55_0.005_0)]">Guest Capacity</label>
                  <div className="flex items-center justify-between bg-white border-2 border-[oklch(0.92_0.002_0)] rounded-2xl p-5">
                    <button className="w-8 h-8 rounded-full border border-[oklch(0.92_0.002_0)] flex items-center justify-center font-black">-</button>
                    <span className="font-black">2</span>
                    <button className="w-8 h-8 rounded-full border border-[oklch(0.92_0.002_0)] flex items-center justify-center font-black">+</button>
                  </div>
                </div>
              </div>
            </div>

            <footer className="pt-12 border-t border-[oklch(0.92_0.002_0)] flex justify-between items-center">
              <button 
                onClick={() => step > 1 && setStep(step - 1)}
                className="text-[oklch(0.1_0.001_0)] font-black text-sm uppercase tracking-widest hover:underline disabled:opacity-0"
                disabled={step === 1}
              >
                Back
              </button>
              <button 
                onClick={() => step < 5 && setStep(step + 1)}
                className="bg-[oklch(0.1_0.001_0)] text-white px-10 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-black/10 flex items-center gap-3"
              >
                Continue
                <ChevronRight size={18} />
              </button>
            </footer>
          </div>
        </section>
      </main>

      <style jsx global>{`
        body {
          background-color: oklch(0.99 0.001 0);
        }
      `}</style>
    </div>
  );
}
