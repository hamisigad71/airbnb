'use client';

import { useState, use } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { MOCK_LISTINGS } from '@/lib/mock-data';

export default function BookingPage({
  params: paramsPromise,
}: {
  params: Promise<{ id: string }>
}) {
  const params = use(paramsPromise);
  const searchParams = useSearchParams();
  const checkIn = searchParams.get('checkin');
  const checkOut = searchParams.get('checkout');
  const guestCount = searchParams.get('guests');

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    specialRequests: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const listing = MOCK_LISTINGS.find((l) => l.id === params.id);

  if (!listing) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Link href="/guest" className="flex items-center gap-2 text-primary hover:underline mb-4">
          <ArrowLeft className="h-4 w-4" />
          Back
        </Link>
        <p className="text-muted-foreground">Listing not found</p>
      </div>
    );
  }

  const nights = checkIn && checkOut
    ? Math.ceil(
        (new Date(checkOut).getTime() - new Date(checkIn).getTime()) /
          (1000 * 60 * 60 * 24)
      )
    : 0;
  const totalPrice = nights > 0 ? nights * listing.pricePerNight : 0;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate booking submission
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1500);
  };

  if (success) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          <Card>
            <CardHeader className="text-center space-y-2">
              <div className="text-4xl mb-2">✓</div>
              <CardTitle>Booking Confirmed!</CardTitle>
              <CardDescription>Your reservation has been submitted</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-muted p-4 rounded-lg space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Check-in:</span>
                  <span className="font-semibold">{checkIn}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Check-out:</span>
                  <span className="font-semibold">{checkOut}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total:</span>
                  <span className="font-semibold">${totalPrice}</span>
                </div>
              </div>

              <p className="text-sm text-muted-foreground">
                A confirmation email has been sent to {formData.email}
              </p>

              <Link href="/guest/bookings">
                <Button className="w-full bg-primary hover:bg-primary/90">
                  View My Bookings
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <Link href={`/guest/listings/${params.id}`} className="flex items-center gap-2 text-primary hover:underline mb-6">
        <ArrowLeft className="h-4 w-4" />
        Back to listing
      </Link>

      <div className="grid md:grid-cols-3 gap-8 max-w-5xl">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Complete Your Booking</CardTitle>
              <CardDescription>Enter your details to confirm the reservation</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <h3 className="font-semibold">Your Information</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        disabled={loading}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        disabled={loading}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      disabled={loading}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      disabled={loading}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="specialRequests">Special Requests (Optional)</Label>
                    <textarea
                      id="specialRequests"
                      name="specialRequests"
                      value={formData.specialRequests}
                      onChange={handleChange}
                      placeholder="Let the host know if you have any special requests..."
                      className="w-full px-3 py-2 border border-border rounded-lg"
                      rows={4}
                      disabled={loading}
                    />
                  </div>
                </div>

                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    This is a demo booking. No payment will be processed.
                  </AlertDescription>
                </Alert>

                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90"
                  disabled={loading}
                >
                  {loading ? 'Confirming...' : 'Confirm Booking'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Booking Summary */}
        <div>
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle className="text-lg">{listing.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <img
                src={listing.image}
                alt={listing.title}
                className="w-full h-32 object-cover rounded-lg"
              />

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Check-in:</span>
                  <span>{checkIn}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Check-out:</span>
                  <span>{checkOut}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Guests:</span>
                  <span>{guestCount}</span>
                </div>
              </div>

              <div className="border-t border-border pt-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>
                    ${listing.pricePerNight} × {nights} nights
                  </span>
                  <span>${nights * listing.pricePerNight}</span>
                </div>
                <div className="flex justify-between">
                  <span>Service fee</span>
                  <span>${Math.round(totalPrice * 0.1)}</span>
                </div>
              </div>

              <div className="border-t border-border pt-4 flex justify-between font-semibold">
                <span>Total</span>
                <span>${totalPrice + Math.round(totalPrice * 0.1)}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
