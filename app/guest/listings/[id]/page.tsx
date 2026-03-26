'use client';

import { useState, use } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Users,
  Bed,
  Bath,
  Wifi,
  Wind,
  Tv,
  Utensils,
  MapPin,
  Star,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { MOCK_LISTINGS, MOCK_REVIEWS } from '@/lib/mock-data';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Footer } from '@/components/shared/footer';

const amenityIcons: Record<string, React.ReactNode> = {
  WiFi: <Wifi className="h-4 w-4" />,
  'Air Conditioning': <Wind className="h-4 w-4" />,
  TV: <Tv className="h-4 w-4" />,
  Kitchen: <Utensils className="h-4 w-4" />,
  Pool: <Users className="h-4 w-4" />,
  Garden: <MapPin className="h-4 w-4" />,
  Parking: <MapPin className="h-4 w-4" />,
};

export default function ListingDetailsPage({
  params: paramsPromise,
}: {
  params: Promise<{ id: string }>
}) {
  const params = use(paramsPromise);
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [guests, setGuests] = useState('1');
  const [agreedToRules, setAgreedToRules] = useState(false);

  const listing = MOCK_LISTINGS.find((l) => l.id === params.id);
  // ...
  const listingReviews = MOCK_REVIEWS.filter((r) => r.listingId === params.id);

  if (!listing) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Link href="/guest" className="flex items-center gap-2 text-primary hover:underline mb-4">
          <ArrowLeft className="h-4 w-4" />
          Back to listings
        </Link>
        <p className="text-muted-foreground">Listing not found</p>
      </div>
    );
  }

  const nights = checkInDate && checkOutDate
    ? Math.ceil(
        (new Date(checkOutDate).getTime() - new Date(checkInDate).getTime()) /
          (1000 * 60 * 60 * 24)
      )
    : 0;
  const totalPrice = nights > 0 ? nights * listing.pricePerNight : 0;

  return (
    <main className="container mx-auto px-4 py-8">
      <Link href="/guest" className="flex items-center gap-2 text-primary hover:underline mb-6">
        <ArrowLeft className="h-4 w-4" />
        Back to listings
      </Link>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          {/* Images */}
          <div className="space-y-2">
            <img
              src={listing.image}
              alt={listing.title}
              className="w-full h-96 object-cover rounded-lg"
            />
            <div className="grid grid-cols-2 gap-2">
              {listing.images.slice(1, 3).map((image, i) => (
                <img
                  key={i}
                  src={image}
                  alt={`Gallery ${i + 1}`}
                  className="w-full h-40 object-cover rounded-lg"
                />
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="space-y-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">{listing.title}</h1>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>{listing.location}, {listing.city}, {listing.country}</span>
              </div>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold">{listing.rating}</span>
              <span className="text-muted-foreground">({listing.reviews} reviews)</span>
            </div>

            {/* Property Info */}
            <div className="grid grid-cols-4 gap-4">
              {[
                { icon: <Users className="h-5 w-5" />, label: 'Guests', value: listing.maxGuests },
                { icon: <Bed className="h-5 w-5" />, label: 'Bedrooms', value: listing.bedrooms },
                { icon: <Bed className="h-5 w-5" />, label: 'Beds', value: listing.beds },
                { icon: <Bath className="h-5 w-5" />, label: 'Bathrooms', value: listing.bathrooms },
              ].map((item, i) => (
                <div key={i} className="text-center p-4 bg-muted rounded-lg">
                  <div className="flex justify-center mb-2">{item.icon}</div>
                  <p className="text-xs text-muted-foreground">{item.label}</p>
                  <p className="font-semibold">{item.value}</p>
                </div>
              ))}
            </div>

            {/* Description */}
            <div className="space-y-2">
              <h2 className="text-xl font-bold">About this property</h2>
              <p className="text-muted-foreground leading-relaxed">{listing.description}</p>
            </div>

            {/* Amenities */}
            <div className="space-y-3">
              <h2 className="text-xl font-bold">Amenities</h2>
              <div className="grid grid-cols-2 gap-3">
                {listing.amenities.map((amenity, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
                    {amenityIcons[amenity] || <Wifi className="h-4 w-4" />}
                    <span className="text-sm font-medium">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* House Rules & Consent */}
            <div className="p-6 bg-card border rounded-xl shadow-sm space-y-4">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-bold">House Rules & Host Guide</h2>
              </div>
              <p className="text-sm text-muted-foreground">
                Please review and agree to the host's requirements before booking.
              </p>
              
              <div className="space-y-3 pt-2">
                {listing.rules && listing.rules.length > 0 ? (
                  listing.rules.map((rule, i) => (
                    <div key={i} className="flex items-start gap-3 p-2 bg-muted/20 rounded-md">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                      <span className="text-sm">{rule}</span>
                    </div>
                  ))
                ) : (
                  <div className="text-sm text-muted-foreground italic">Standard house rules apply.</div>
                )}
              </div>

              {listing.hostGuide && (
                <div className="p-4 bg-muted/40 rounded-lg border border-dashed text-sm italic">
                  &ldquo;{listing.hostGuide}&rdquo;
                </div>
              )}

              <div 
                className={`flex items-center gap-3 p-4 rounded-lg cursor-pointer transition-all ${agreedToRules ? 'bg-primary/10 border-primary' : 'bg-muted border-transparent'} border`}
                onClick={() => setAgreedToRules(!agreedToRules)}
              >
                <div className={`w-6 h-6 rounded flex items-center justify-center transition-colors ${agreedToRules ? 'bg-primary text-white' : 'bg-background border-2'}`}>
                  {agreedToRules && <CheckCircle2 size={16} />}
                </div>
                <span className="text-sm font-semibold select-none">
                  I have read and agree to all the house rules and host guidelines.
                </span>
              </div>
              
              {!agreedToRules && (
                <div className="flex items-center gap-2 text-xs text-amber-600 bg-amber-50 p-2 rounded animate-pulse">
                  <AlertCircle size={14} />
                  <span>Agreement required to enable reservation.</span>
                </div>
              )}
            </div>

            {/* Reviews */}
            {listingReviews.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold">Reviews</h2>
                <div className="space-y-3">
                  {listingReviews.map((review) => (
                    <Card key={review.id}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-base">{review.guestName}</CardTitle>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className="h-4 w-4"
                                fill={i < Math.floor(review.rating) ? 'currentColor' : 'none'}
                                color={i < Math.floor(review.rating) ? '#eab308' : '#d1d5db'}
                              />
                            ))}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">{review.comment}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Booking Card */}
        <div>
          <Card className="sticky top-24">
            <CardHeader>
              <div className="space-y-2">
                <span className="text-2xl font-bold">${listing.pricePerNight}</span>
                <span className="text-muted-foreground"> per night</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold">Check-in</label>
                <input
                  type="date"
                  value={checkInDate}
                  onChange={(e) => setCheckInDate(e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold">Check-out</label>
                <input
                  type="date"
                  value={checkOutDate}
                  onChange={(e) => setCheckOutDate(e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold">Guests</label>
                <select
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg"
                >
                  {[...Array(listing.maxGuests)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1} {i === 0 ? 'Guest' : 'Guests'}
                    </option>
                  ))}
                </select>
              </div>

              {totalPrice > 0 && (
                <Alert>
                  <AlertDescription className="text-sm">
                    <div className="flex justify-between">
                      <span>{nights} nights × ${listing.pricePerNight}</span>
                      <span className="font-semibold">${totalPrice}</span>
                    </div>
                  </AlertDescription>
                </Alert>
              )}

              <Link href={`/guest/host-guide/${listing.id}?checkin=${checkInDate}&checkout=${checkOutDate}&guests=${guests}${agreedToRules ? '&agreed=true' : ''}`}>
                <Button 
                  className="w-full bg-primary hover:bg-primary/90 py-6 text-lg"
                  disabled={!checkInDate || !checkOutDate || parseInt(guests) > listing.maxGuests || !agreedToRules}
                >
                  {agreedToRules ? 'Reserve Now' : 'Agree to Rules to Reserve'}
                </Button>
              </Link>

              <p className="text-xs text-muted-foreground text-center">
                You won't be charged yet
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </main>
  );
}
