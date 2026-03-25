'use client';

import { Card, CardContent } from '@/components/ui/card';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatsCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  trend?: number;
  description?: string;
  className?: string;
}

export function StatsCard({ label, value, icon: Icon, trend, description, className }: StatsCardProps) {
  const isPositive = trend && trend > 0;

  return (
    <Card className={cn(
      "relative overflow-hidden border-white/20 bg-white/5 backdrop-blur-xl transition-all hover:bg-white/10",
      className
    )}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{label}</p>
            <h3 className="mt-1 text-3xl font-bold tracking-tight">{value}</h3>
            
            {trend !== undefined && (
              <div className="mt-2 flex items-center gap-1.5">
                <span className={cn(
                  "flex items-center gap-0.5 text-xs font-semibold px-2 py-0.5 rounded-full",
                  isPositive ? "bg-emerald-500/10 text-emerald-500" : "bg-rose-500/10 text-rose-500"
                )}>
                  {isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                  {Math.abs(trend)}%
                </span>
                <span className="text-xs text-muted-foreground">vs last month</span>
              </div>
            )}
          </div>
          
          <div className="rounded-2xl bg-primary/10 p-3 ring-1 ring-primary/20">
            <Icon className="h-6 w-6 text-primary" />
          </div>
        </div>
        
        {description && (
          <p className="mt-4 text-xs text-muted-foreground line-clamp-1">
            {description}
          </p>
        )}
      </CardContent>
      
      {/* Decorative gradient blur */}
      <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-primary/5 blur-2xl" />
    </Card>
  );
}
