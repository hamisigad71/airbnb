'use client';

import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit, Plus } from 'lucide-react';
import { MOCK_LISTINGS } from '@/lib/mock-data';

const HOST_ID = 'user-host-1';

export default function HostListingsPage() {
  const listings = MOCK_LISTINGS.filter((l) => l.hostId === HOST_ID);

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">My Listings</h1>
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="h-4 w-4 mr-2" />
          New Listing
        </Button>
      </div>

      {listings.length === 0 ? (
        <Card>
          <CardContent className="pt-12 text-center">
            <p className="text-muted-foreground mb-4">You haven't created any listings yet</p>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="h-4 w-4 mr-2" />
              Create Your First Listing
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {listings.map((listing) => (
            <Card key={listing.id}>
              <CardContent className="pt-6">
                <div className="grid md:grid-cols-4 gap-4 items-start">
                  <img
                    src={listing.image}
                    alt={listing.title}
                    className="h-32 object-cover rounded-lg md:col-span-1"
                  />

                  <div className="md:col-span-2 space-y-2">
                    <div>
                      <h3 className="font-semibold text-lg">{listing.title}</h3>
                      <p className="text-sm text-muted-foreground">{listing.location}</p>
                    </div>

                    <div className="flex gap-4 text-sm">
                      <span>${listing.pricePerNight}/night</span>
                      <span className="text-muted-foreground">•</span>
                      <span>{listing.bedrooms} bedrooms</span>
                      <span className="text-muted-foreground">•</span>
                      <span>{listing.maxGuests} guests</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-yellow-600">⭐ {listing.rating}</span>
                      <span className="text-muted-foreground text-sm">
                        ({listing.reviews} reviews)
                      </span>
                      <Badge className="ml-auto bg-blue-100 text-blue-800 hover:bg-blue-200">
                        {listing.type}
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Button variant="outline" className="w-full" size="sm">
                      <Edit className="h-3 w-3 mr-1" />
                      Edit
                    </Button>
                    <Button variant="outline" className="w-full" size="sm">
                      View Page
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </main>
  );
}
