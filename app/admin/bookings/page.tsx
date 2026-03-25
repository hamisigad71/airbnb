'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MOCK_BOOKINGS, MOCK_LISTINGS } from '@/lib/mock-data';

export default function AdminBookingsPage() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Bookings Management</h1>

      {MOCK_BOOKINGS.length === 0 ? (
        <Card>
          <CardContent className="pt-12 text-center">
            <p className="text-muted-foreground">No bookings found</p>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="pt-6 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 font-semibold">Booking ID</th>
                  <th className="text-left p-3 font-semibold">Property</th>
                  <th className="text-left p-3 font-semibold">Dates</th>
                  <th className="text-left p-3 font-semibold">Guests</th>
                  <th className="text-left p-3 font-semibold">Amount</th>
                  <th className="text-left p-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_BOOKINGS.map((booking) => {
                  const listing = MOCK_LISTINGS.find((l) => l.id === booking.listingId);
                  return (
                    <tr key={booking.id} className="border-b hover:bg-muted/50">
                      <td className="p-3 font-semibold">#{booking.id.slice(-4)}</td>
                      <td className="p-3">{listing?.title || 'Unknown'}</td>
                      <td className="p-3 text-sm">
                        {new Date(booking.checkIn).toLocaleDateString()} -{' '}
                        {new Date(booking.checkOut).toLocaleDateString()}
                      </td>
                      <td className="p-3">{booking.guests}</td>
                      <td className="p-3 font-semibold text-primary">${booking.totalPrice}</td>
                      <td className="p-3">
                        <Badge className={getStatusColor(booking.status)}>
                          {booking.status}
                        </Badge>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </CardContent>
        </Card>
      )}
    </main>
  );
}
