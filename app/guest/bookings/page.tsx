'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Calendar, Users, MessageSquare } from 'lucide-react';
import { MOCK_BOOKINGS, MOCK_LISTINGS } from '@/lib/mock-data';

export default function BookingsPage() {
  const bookings = MOCK_BOOKINGS.filter((b) => b.guestId === 'user-guest-1');

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
      <h1 className="text-3xl font-bold mb-8">My Bookings</h1>

      {bookings.length === 0 ? (
        <Card>
          <CardContent className="pt-12 text-center">
            <p className="text-muted-foreground mb-4">You don't have any bookings yet</p>
            <Link href="/guest">
              <Button className="bg-primary hover:bg-primary/90">Browse Properties</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => {
            const listing = MOCK_LISTINGS.find((l) => l.id === booking.listingId);
            return (
              <Card key={booking.id}>
                <CardContent className="pt-6">
                  <div className="grid md:grid-cols-4 gap-4">
                    {listing && (
                      <>
                        <img
                          src={listing.image}
                          alt={listing.title}
                          className="h-32 object-cover rounded-lg md:col-span-1"
                        />
                        <div className="md:col-span-2 space-y-3">
                          <div>
                            <h3 className="font-semibold text-lg">{listing.title}</h3>
                            <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                              <MapPin className="h-3 w-3" />
                              {listing.city}, {listing.country}
                            </p>
                          </div>

                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              <span>
                                {new Date(booking.checkIn).toLocaleDateString()} -{' '}
                                {new Date(booking.checkOut).toLocaleDateString()}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Users className="h-4 w-4 text-muted-foreground" />
                              <span>{booking.guests} guests</span>
                            </div>
                          </div>

                          <div className="flex gap-2">
                            <Badge className={getStatusColor(booking.status)}>
                              {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                            </Badge>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div>
                            <p className="text-sm text-muted-foreground">Total Price</p>
                            <p className="text-2xl font-bold text-primary">
                              ${booking.totalPrice}
                            </p>
                          </div>

                          <div className="space-y-2">
                            <Button
                              variant="outline"
                              className="w-full text-sm"
                              asChild
                            >
                              <Link href={`/guest/listings/${listing.id}`}>
                                View Property
                              </Link>
                            </Button>
                            <Button variant="outline" className="w-full text-sm" size="sm">
                              <MessageSquare className="h-3 w-3 mr-1" />
                              Message Host
                            </Button>
                          </div>
                        </div>
                      </>
                    )}
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
