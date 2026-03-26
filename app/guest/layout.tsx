import { Metadata } from 'next';
import { Header } from '@/components/navigation/guest-header';

export const metadata: Metadata = {
  title: 'StayLux Ke — Explore Stays',
  description: 'Browse and book unique stays worldwide',
};

export default function GuestLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div style={{ minHeight: '100vh' }}>
      <Header />
      {children}
    </div>
  );
}
