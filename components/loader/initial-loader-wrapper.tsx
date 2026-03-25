'use client';

import React, { useState, useEffect } from 'react';
import GlassLoader from './glass-loader';

export default function InitialLoaderWrapper({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Forced delay of 4.5 seconds
    const timer = setTimeout(() => {
      setLoading(false);
    }, 4500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <GlassLoader />;
  }

  return <>{children}</>;
}
