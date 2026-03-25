'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MOCK_USERS } from '@/lib/mock-data';

export default function HostSettingsPage() {
  const { data: session } = useSession();
  const user = MOCK_USERS.find((u) => u.id === session?.user?.id);

  const [formData, setFormData] = useState({
    businessName: 'My Property Management',
    taxId: '12-3456789',
    bankAccount: '****1234',
    paymentMethod: 'bank_transfer',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    }, 1500);
  };

  if (!user) return null;

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Host Settings</h1>

      <div className="space-y-8">
        {/* Profile Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>Your host profile details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Name</Label>
                <Input value={user.name} disabled />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input value={user.email} disabled />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment & Protection Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Payment & Host Protection</CardTitle>
            <CardDescription>Manage your payment method and host protection policies</CardDescription>
            <Link href="/host/payment-settings" className="mt-4 block">
              <Button variant="outline" className="w-full">
                Configure Payment & Protection Settings
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {success && (
                <div className="p-4 bg-green-100 text-green-800 rounded-lg text-sm">
                  Settings updated successfully!
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="businessName">Business Name</Label>
                <Input
                  id="businessName"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleChange}
                  disabled={loading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="taxId">Tax ID</Label>
                <Input
                  id="taxId"
                  name="taxId"
                  value={formData.taxId}
                  onChange={handleChange}
                  disabled={loading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="paymentMethod">Payout Method</Label>
                <select
                  id="paymentMethod"
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-border rounded-lg"
                  disabled={loading}
                >
                  <option value="bank_transfer">Bank Transfer</option>
                  <option value="paypal">PayPal</option>
                  <option value="stripe">Stripe</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bankAccount">Bank Account (Last 4 Digits)</Label>
                <Input
                  id="bankAccount"
                  name="bankAccount"
                  value={formData.bankAccount}
                  disabled
                />
                <p className="text-xs text-muted-foreground">
                  Contact support to update your bank account
                </p>
              </div>

              <Button
                type="submit"
                className="bg-primary hover:bg-primary/90"
                disabled={loading}
              >
                {loading ? 'Saving...' : 'Save Settings'}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Verification */}
        <Card>
          <CardHeader>
            <CardTitle>Verification Status</CardTitle>
            <CardDescription>Your host verification details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: 'Identity Verification', status: 'verified' },
                { name: 'Address Verification', status: 'verified' },
                { name: 'Phone Verification', status: 'verified' },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <span>{item.name}</span>
                  <span className="text-sm px-3 py-1 bg-green-100 text-green-800 rounded-full font-semibold">
                    ✓ {item.status}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
