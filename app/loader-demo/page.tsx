'use client';

import React, { useState, useEffect } from 'react';
import GlassLoader from '@/components/shared/loader/glass-loader';
import { Button } from '@/components/ui/button';

export default function LoaderDemo() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const triggerLoader = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 4000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f8f4f0] p-8">
      {loading && <GlassLoader />}
      
      <div className="max-w-md w-full text-center space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
        <h1 className="text-4xl font-bold text-[#1a1a1a]">Loader Showcase</h1>
        <p className="text-gray-600">
          The Glass Loader is designed to provide a premium, high-end experience while your content is being prepared.
        </p>
        <Button 
          onClick={triggerLoader}
          className="bg-[#FF385C] hover:bg-[#ff4d6d] text-white px-8 py-6 rounded-2xl text-lg font-semibold shadow-xl shadow-red-200 transition-all hover:scale-105"
        >
          Re-trigger Glass Loader
        </Button>
      </div>
    </div>
  );
}
