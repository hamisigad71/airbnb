import { Header } from '@/components/header';

export const metadata = {
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
