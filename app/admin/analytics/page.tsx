'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { MOCK_USERS, MOCK_LISTINGS, MOCK_BOOKINGS } from '@/lib/mock-data';

export default function AdminAnalyticsPage() {
  const usersByRole = [
    { name: 'Guests', value: MOCK_USERS.filter((u) => u.role === 'guest').length, color: '#3b82f6' },
    { name: 'Hosts', value: MOCK_USERS.filter((u) => u.role === 'host').length, color: '#a855f7' },
    { name: 'Admins', value: MOCK_USERS.filter((u) => u.role === 'admin').length, color: '#ef4444' },
  ];

  const listingsByType = [
    { name: 'Apartment', value: MOCK_LISTINGS.filter((l) => l.type === 'apartment').length },
    { name: 'House', value: MOCK_LISTINGS.filter((l) => l.type === 'house').length },
    { name: 'Room', value: MOCK_LISTINGS.filter((l) => l.type === 'room').length },
    { name: 'Villa', value: MOCK_LISTINGS.filter((l) => l.type === 'villa').length },
  ];

  const bookingsByStatus = [
    { name: 'Confirmed', value: MOCK_BOOKINGS.filter((b) => b.status === 'confirmed').length, color: '#10b981' },
    { name: 'Pending', value: MOCK_BOOKINGS.filter((b) => b.status === 'pending').length, color: '#f59e0b' },
    { name: 'Cancelled', value: MOCK_BOOKINGS.filter((b) => b.status === 'cancelled').length, color: '#ef4444' },
  ];

  const monthlyMetrics = [
    { month: 'Jan', users: 120, listings: 45, bookings: 24, revenue: 5600 },
    { month: 'Feb', users: 150, listings: 52, bookings: 30, revenue: 7200 },
    { month: 'Mar', users: 180, listings: 61, bookings: 42, revenue: 10500 },
    { month: 'Apr', users: 200, listings: 68, bookings: 48, revenue: 11800 },
  ];

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Analytics & Insights</h1>

      <div className="space-y-8">
        {/* Key Metrics */}
        <div className="grid md:grid-cols-4 gap-4">
          {[
            { label: 'Total Users', value: MOCK_USERS.length },
            { label: 'Total Listings', value: MOCK_LISTINGS.length },
            { label: 'Total Bookings', value: MOCK_BOOKINGS.length },
            {
              label: 'Avg Rating',
              value: (
                (MOCK_LISTINGS.reduce((sum, l) => sum + l.rating, 0) / MOCK_LISTINGS.length).toFixed(
                  1
                ) + '⭐'
              ),
            },
          ].map((metric, i) => (
            <Card key={i}>
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground">{metric.label}</p>
                <p className="text-3xl font-bold mt-2">{metric.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts Row 1 */}
        <div className="grid md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Users by Role</CardTitle>
              <CardDescription>Distribution of user types</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={usersByRole}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {usersByRole.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Bookings by Status</CardTitle>
              <CardDescription>Current booking status distribution</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={bookingsByStatus}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="var(--color-primary)" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row 2 */}
        <div className="grid md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Listings by Type</CardTitle>
              <CardDescription>Property type distribution</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={listingsByType}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#a855f7" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Monthly Revenue Trend</CardTitle>
              <CardDescription>Revenue growth over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyMetrics}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="revenue" stroke="var(--color-primary)" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Overall Growth */}
        <Card>
          <CardHeader>
            <CardTitle>Platform Growth Metrics</CardTitle>
            <CardDescription>Overall platform metrics over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={monthlyMetrics}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="users" stroke="var(--color-primary)" />
                <Line type="monotone" dataKey="listings" stroke="#a855f7" />
                <Line type="monotone" dataKey="bookings" stroke="#10b981" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
