import { Header } from '@/components/header';
import { HostNav } from '@/components/host-nav';

export const metadata = {
  title: 'Host Dashboard - Airbnb Clone',
  description: 'Manage your listings and bookings',
};

export default function HostLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      <Header title="Host Dashboard" />
      <div className="flex">
        <HostNav />
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
