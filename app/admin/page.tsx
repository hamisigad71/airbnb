'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Home, Calendar, DollarSign } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { MOCK_USERS, MOCK_LISTINGS, MOCK_BOOKINGS } from '@/lib/mock-data';

export default function AdminDashboard() {
  const totalUsers = MOCK_USERS.length;
  const totalListings = MOCK_LISTINGS.length;
  const totalBookings = MOCK_BOOKINGS.length;
  const totalRevenue = MOCK_BOOKINGS
    .filter((b) => b.status === 'confirmed')
    .reduce((sum, b) => sum + b.totalPrice, 0);

  const stats = [
    { label: 'Total Users', value: totalUsers, icon: Users },
    { label: 'Total Listings', value: totalListings, icon: Home },
    { label: 'Total Bookings', value: totalBookings, icon: Calendar },
    { label: 'Total Revenue', value: `$${totalRevenue}`, icon: DollarSign },
  ];

  const monthlyData = [
    { month: 'Jan', users: 120, bookings: 24, revenue: 5600 },
    { month: 'Feb', users: 150, bookings: 30, revenue: 7200 },
    { month: 'Mar', users: 180, bookings: 42, revenue: 10500 },
    { month: 'Apr', users: 200, bookings: 48, revenue: 11800 },
  ];

  const recentUsers = MOCK_USERS.slice(-5);
  const recentBookings = MOCK_BOOKINGS.slice(-5);

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Platform Overview</h1>
        <p className="text-muted-foreground">Monitor platform activity and analytics</p>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <Card key={i}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-bold mt-1">{stat.value}</p>
                  </div>
                  <Icon className="h-8 w-8 text-primary opacity-50" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Growth</CardTitle>
            <CardDescription>User growth over the last 4 months</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="users" stroke="var(--color-primary)" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Monthly Revenue</CardTitle>
            <CardDescription>Revenue generated each month</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="revenue" fill="var(--color-primary)" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Recent Users</CardTitle>
            <CardDescription>Latest registered users</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentUsers.map((user) => (
              <div key={user.id} className="flex items-center justify-between pb-4 border-b last:border-0">
                <div>
                  <p className="font-semibold">{user.name}</p>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
                <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded">
                  {user.role}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Bookings</CardTitle>
            <CardDescription>Latest booking activity</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentBookings.map((booking) => (
              <div key={booking.id} className="flex items-center justify-between pb-4 border-b last:border-0">
                <div>
                  <p className="font-semibold">Booking #{booking.id.slice(-4)}</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(booking.checkIn).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-primary">${booking.totalPrice}</p>
                  <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded">
                    {booking.status}
                  </span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
