import { Header } from '@/components/header';
import { AdminNav } from '@/components/admin-nav';

export const metadata = {
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
