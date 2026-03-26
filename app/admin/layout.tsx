import { Metadata } from 'next';
import { Header } from '@/components/navigation/guest-header';
import { AdminNav } from '@/components/navigation/admin-nav';

export const metadata: Metadata = {
  title: 'Admin Dashboard - Airbnb Clone',
  description: 'Manage platform and analytics',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      <Header title="Admin Dashboard" />
      <div className="flex">
        <AdminNav />
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
