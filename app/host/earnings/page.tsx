'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { MOCK_BOOKINGS } from '@/lib/mock-data';

const HOST_ID = 'user-host-1';

export default function HostEarningsPage() {
  const bookings = MOCK_BOOKINGS.filter((b) => b.hostId === HOST_ID && b.status === 'confirmed');
  const totalEarnings = bookings.reduce((sum, b) => sum + b.totalPrice, 0);
  const avgEarning = bookings.length > 0 ? Math.round(totalEarnings / bookings.length) : 0;

  // Mock data for charts
  const monthlyData = [
    { month: 'Jan', earnings: 1200, bookings: 4 },
    { month: 'Feb', earnings: 1900, bookings: 6 },
    { month: 'Mar', earnings: 2800, bookings: 8 },
    { month: 'Apr', earnings: 2100, bookings: 5 },
  ];

  const stats = [
    { label: 'Total Earnings', value: `$${totalEarnings}` },
    { label: 'Confirmed Bookings', value: bookings.length },
    { label: 'Average per Booking', value: `$${avgEarning}` },
  ];

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Earnings</h1>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        {stats.map((stat, i) => (
          <Card key={i}>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <p className="text-2xl font-bold mt-2">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Earnings</CardTitle>
            <CardDescription>Your earnings over the last 4 months</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="earnings" fill="var(--color-primary)" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Bookings Trend</CardTitle>
            <CardDescription>Number of bookings per month</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="bookings" stroke="var(--color-primary)" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Earnings Breakdown */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Earnings Breakdown</CardTitle>
          <CardDescription>Detailed view of your confirmed bookings</CardDescription>
        </CardHeader>
        <CardContent>
          {bookings.length === 0 ? (
            <p className="text-muted-foreground text-sm">No confirmed bookings yet</p>
          ) : (
            <div className="space-y-4">
              {bookings.map((booking) => (
                <div key={booking.id} className="flex justify-between items-center pb-4 border-b last:border-0">
                  <div>
                    <p className="font-semibold">Booking #{booking.id.slice(-4)}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(booking.checkIn).toLocaleDateString()} - {new Date(booking.checkOut).toLocaleDateString()}
                    </p>
                  </div>
                  <p className="font-semibold text-primary text-lg">${booking.totalPrice}</p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </main>
  );
}
