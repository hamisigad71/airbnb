'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { Search } from 'lucide-react';
import { MOCK_LISTINGS, MOCK_USERS } from '@/lib/mock-data';

export default function AdminListingsPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredListings = MOCK_LISTINGS.filter(
    (listing) =>
      listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      listing.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Listings Management</h1>

      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by title or city..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {filteredListings.length === 0 ? (
        <Card>
          <CardContent className="pt-12 text-center">
            <p className="text-muted-foreground">No listings found</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredListings.map((listing) => {
            const host = MOCK_USERS.find((u) => u.id === listing.hostId);
            return (
              <Card key={listing.id}>
                <CardContent className="pt-6">
                  <div className="grid md:grid-cols-5 gap-4">
                    <img
                      src={listing.image}
                      alt={listing.title}
                      className="h-24 object-cover rounded-lg md:col-span-1"
                    />

                    <div className="md:col-span-2 space-y-1">
                      <h3 className="font-semibold">{listing.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {listing.location}, {listing.city}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Host: <span className="font-semibold">{host?.name}</span>
                      </p>
                    </div>

                    <div className="text-sm">
                      <p className="text-muted-foreground">Price</p>
                      <p className="font-semibold text-lg">${listing.pricePerNight}</p>
                      <p className="text-xs text-muted-foreground">per night</p>
                    </div>

                    <div className="flex flex-col gap-2 justify-center">
                      <Badge className="bg-blue-100 text-blue-800 w-fit">
                        {listing.type}
                      </Badge>
                      <p className="text-xs">
                        <span className="text-yellow-600">⭐ {listing.rating}</span>
                      </p>
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
