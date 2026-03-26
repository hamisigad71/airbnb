'use client';

import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';

const DEMO_COUNTRIES = [
  { name: 'Kenya', code: 'KE', flag: '🇰🇪' },
  { name: 'Tanzania', code: 'TZ', flag: '🇹🇿' },
  { name: 'South Africa', code: 'ZA', flag: '🇿🇦' },
  { name: 'Egypt', code: 'EG', flag: '🇪🇬' },
  { name: 'Greece', code: 'GR', flag: '🇬🇷' },
];

interface LocationSelectorProps {
  onValueChange: (value: string) => void;
  defaultValue?: string;
  className?: string;
}

export function LocationSelector({ 
  onValueChange, 
  defaultValue,
  className 
}: LocationSelectorProps) {
  return (
    <div className={`space-y-2 ${className}`}>
      <Label htmlFor="country-selector">Select Your Location</Label>
      <Select onValueChange={onValueChange} defaultValue={defaultValue}>
        <SelectTrigger id="country-selector" className="w-full h-12 bg-background/50 backdrop-blur-sm border-white/10">
          <SelectValue placeholder="Choose a country" />
        </SelectTrigger>
        <SelectContent>
          {DEMO_COUNTRIES.map((country) => (
            <SelectItem key={country.code} value={country.name}>
              <span className="flex items-center gap-2">
                <span>{country.flag}</span>
                <span>{country.name}</span>
              </span>
            </SelectItem>
          ))}
          <SelectItem value="Other">
            <span className="flex items-center gap-2">
              <span>🌍</span>
              <span>Other (Global)</span>
            </span>
          </SelectItem>
        </SelectContent>
      </Select>
      <p className="text-xs text-muted-foreground">
        We'll show you the best stays and experiences in your region.
      </p>
    </div>
  );
}
