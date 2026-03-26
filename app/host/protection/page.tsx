'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Shield, CheckCircle, ShieldCheck, ShieldAlert, FileText, Phone, Info, Lock, ChevronRight } from 'lucide-react';

export default function HostProtectionPage() {
  return (
    <div className="min-h-screen bg-[oklch(0.99_0.001_0)] pb-24">
      <main className="max-w-5xl mx-auto px-8 py-12">
        {/* Back Navigation & Actions */}
        <div className="flex items-center justify-between mb-8 animate-in fade-in slide-in-from-top-4 duration-700">
          <Link href="/host" className="flex items-center gap-2 text-[oklch(0.55_0.005_0)] hover:text-[oklch(0.1_0.001_0)] font-bold text-sm uppercase tracking-widest transition-all">
            <ArrowLeft size={16} />
            Back to Dashboard
          </Link>
          <button className="hd-btn hd-btn-outline px-6 py-2.5 text-xs font-black uppercase tracking-widest">File a Claim</button>
        </div>

        <div className="bg-gradient-to-br from-[oklch(0.4_0.155_11.87)] to-[oklch(0.2_0.155_11.87)] rounded-[48px] p-16 text-white text-center mb-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[100px] -translate-y-1/2 translate-x-1/2 rounded-full" />
          <div className="relative z-10">
            <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-3xl flex items-center justify-center mx-auto mb-10 shadow-2xl">
              <ShieldCheck size={48} />
            </div>
            <h2 className="text-5xl font-black mb-6 tracking-tight">You're protected.</h2>
            <p className="text-white/80 font-medium text-xl max-w-2xl mx-auto leading-relaxed mb-10">
              Our comprehensive Host Protection Plan covers you for up to $1M in damage and liability for every single booking.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-white/10 backdrop-blur-md px-6 py-3 rounded-2xl flex items-center gap-2 font-bold text-sm">
                <CheckCircle size={16} />
                $1,000,000 Coverage
              </div>
              <div className="bg-white/10 backdrop-blur-md px-6 py-3 rounded-2xl flex items-center gap-2 font-bold text-sm">
                <CheckCircle size={16} />
                24/7 Priority Support
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-8 rounded-[32px] border border-[oklch(0.92_0.002_0)] shadow-sm">
            <h4 className="text-lg font-black mb-4 flex items-center gap-2">
              <Lock size={18} className="text-green-600" />
              Damage Protection
            </h4>
            <p className="text-sm font-medium text-[oklch(0.55_0.005_0)] leading-relaxed">
              We cover your property, furniture, and belongings against damage caused by guests during their stay.
            </p>
          </div>
          <div className="bg-white p-8 rounded-[32px] border border-[oklch(0.92_0.002_0)] shadow-sm">
            <h4 className="text-lg font-black mb-4 flex items-center gap-2">
              <Shield size={18} className="text-blue-600" />
              Liability Insurance
            </h4>
            <p className="text-sm font-medium text-[oklch(0.55_0.005_0)] leading-relaxed">
              You're protected if a guest is injured or their property is damaged during a stay at your place.
            </p>
          </div>
          <div className="bg-white p-8 rounded-[32px] border border-[oklch(0.92_0.002_0)] shadow-sm">
            <h4 className="text-lg font-black mb-4 flex items-center gap-2">
              <ShieldAlert size={18} className="text-amber-500" />
              Income Loss
            </h4>
            <p className="text-sm font-medium text-[oklch(0.55_0.005_0)] leading-relaxed">
              We reimburse you for lost bookings if you need to cancel upcoming stays due to guest-caused damage.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-2xl font-black mb-8">Resources & Support</h3>
          {[
            { icon: <FileText />, title: "Protection Policy Details", sub: "Read the full terms and conditions of our coverage." },
            { icon: <Phone />, title: "24/7 Host Support", sub: "Speak with a specialized agent about your protection status." },
            { icon: <Info />, title: "How to File a Claim", sub: "A step-by-step guide to reporting damage and receiving payout." },
          ].map((item, i) => (
            <button key={i} className="w-full flex items-center gap-6 p-6 rounded-3xl bg-white border border-[oklch(0.92_0.002_0)] shadow-sm hover:border-[oklch(0.1_0.001_0)] hover:-translate-y-1 transition-all group text-left">
              <div className="w-12 h-12 bg-[oklch(0.96_0.002_0)] text-[oklch(0.55_0.005_0)] group-hover:bg-[oklch(0.4_0.155_11.87)] group-hover:text-white rounded-2xl flex items-center justify-center transition-colors">
                {item.icon}
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-lg">{item.title}</h4>
                <p className="text-sm font-medium text-[oklch(0.55_0.005_0)]">{item.sub}</p>
              </div>
              <ChevronRight size={20} className="text-[oklch(0.8_0.001_0)]" />
            </button>
          ))}
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
        .hd-btn-outline { background: white; color: oklch(0.1 0.001 0); border: 1.5px solid oklch(0.9 0.002 0); }
      `}</style>
    </div>
  );
}
