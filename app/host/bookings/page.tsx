'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, MessageSquare } from 'lucide-react';
import { MOCK_BOOKINGS, MOCK_LISTINGS } from '@/lib/mock-data';

const HOST_ID = 'user-host-1';

export default function HostBookingsPage() {
  const bookings = MOCK_BOOKINGS.filter((b) => b.hostId === HOST_ID);

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
      <h1 className="text-3xl font-bold mb-8">Guest Bookings</h1>

      {bookings.length === 0 ? (
        <Card>
          <CardContent className="pt-12 text-center">
            <p className="text-muted-foreground">No bookings yet</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => {
            const listing = MOCK_LISTINGS.find((l) => l.id === booking.listingId);
            return (
              <Card key={booking.id}>
                <CardContent className="pt-6">
                  <div className="grid md:grid-cols-5 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Booking ID</p>
                      <p className="font-semibold">#{booking.id.slice(-4)}</p>
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground">Property</p>
                      <p className="font-semibold text-sm">{listing?.title || 'Unknown'}</p>
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground">Dates</p>
                      <p className="text-sm">
                        {new Date(booking.checkIn).toLocaleDateString()} -{' '}
                        {new Date(booking.checkOut).toLocaleDateString()}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground">Status & Price</p>
                      <div className="space-y-1 mt-1">
                        <Badge className={getStatusColor(booking.status)}>
                          {booking.status}
                        </Badge>
                        <p className="font-semibold text-primary">${booking.totalPrice}</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Button variant="outline" className="w-full text-sm" size="sm">
                        <MessageSquare className="h-3 w-3 mr-1" />
                        Message
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </main>
  );
}
