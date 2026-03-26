'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Users, FileText, Calendar, BarChart, AlertCircle } from 'lucide-react';

export function AdminNav() {
  const pathname = usePathname();

  const links = [
    { href: '/admin', label: 'Dashboard', icon: Home },
    { href: '/admin/users', label: 'Users', icon: Users },
    { href: '/admin/listings', label: 'Listings', icon: FileText },
    { href: '/admin/bookings', label: 'Bookings', icon: Calendar },
    { href: '/admin/analytics', label: 'Analytics', icon: BarChart },
    { href: '/admin/reports', label: 'Reports', icon: AlertCircle },
  ];

  return (
    <aside className="w-64 border-r border-border bg-muted/30 p-4 hidden lg:block">
      <nav className="space-y-2">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href || pathname.startsWith(link.href + '/');
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-foreground hover:bg-muted'
              }`}
            >
              <Icon className="h-5 w-5" />
              <span>{link.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
