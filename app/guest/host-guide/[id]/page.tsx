'use client';

import { useState, use } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowLeft, AlertCircle, CheckCircle, Shield, Home, Users, Lock } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { MOCK_LISTINGS, MOCK_USERS } from '@/lib/mock-data';

export default function HostGuidePage({
  params: paramsPromise,
}: {
  params: Promise<{ id: string }>
}) {
  const params = use(paramsPromise);
  const searchParams = useSearchParams();
  const checkIn = searchParams.get('checkin');
  const checkOut = searchParams.get('checkout');
  const guestCount = searchParams.get('guests');

  const initialAgreed = searchParams.get('agreed') === 'true';
  const [acceptedRules, setAcceptedRules] = useState(initialAgreed);
  const [readGuide, setReadGuide] = useState(initialAgreed);

  const listing = MOCK_LISTINGS.find((l) => l.id === params.id);
  const host = listing ? MOCK_USERS.find((u) => u.id === listing.hostId) : null;

  if (!listing || !host) {
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

  const handleContinueToPayment = () => {
    if (!acceptedRules || !readGuide) {
      alert('Please read the guide and accept the rules to continue');
      return;
    }
    window.location.href = `/guest/payment/${params.id}?checkin=${checkIn}&checkout=${checkOut}&guests=${guestCount}`;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href={`/guest/listings/${params.id}`} className="flex items-center gap-2 text-primary hover:underline mb-6">
        <ArrowLeft className="h-4 w-4" />
        Back to Listing
      </Link>

      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <h1 className="text-3xl font-bold">Host Guidelines & Guest Agreement</h1>
            {initialAgreed && (
              <div className="flex items-center gap-2 px-3 py-1.5 bg-green-100 text-green-700 rounded-full text-xs font-bold border border-green-200">
                <CheckCircle className="h-4 w-4" />
                PRE-VERIFIED CONSENT
              </div>
            )}
          </div>
          <p className="text-muted-foreground">
            Please review the rules and guidelines set by {host.name} before confirming your booking
          </p>
        </div>

        {/* Host Information Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              About Your Host
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-lg font-semibold text-primary">{host.name.charAt(0)}</span>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">{host.name}</h3>
                <p className="text-sm text-muted-foreground">
                  Superhost • {Math.floor(Math.random() * 50) + 50}+ stays • {Math.floor(Math.random() * 30) + 4}.9★ rating
                </p>
                <p className="text-sm mt-2">
                  {host.name} has been hosting for {Math.floor(Math.random() * 8) + 2} years and maintains high standards for property care.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* House Rules */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Home className="h-5 w-5" />
              House Rules
            </CardTitle>
            <CardDescription>Rules you must follow during your stay</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-3">
                <div className="border-l-4 border-primary pl-4">
                  <h4 className="font-semibold">Check-in & Check-out</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Check-in is after 3:00 PM and check-out is before 11:00 AM. Early check-in or late check-out may be available upon request.
                  </p>
                </div>

                <div className="border-l-4 border-primary pl-4">
                  <h4 className="font-semibold">No Smoking or Vaping</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Smoking, vaping, and use of e-cigarettes are strictly prohibited in the property. Violation may result in additional cleaning fees.
                  </p>
                </div>

                <div className="border-l-4 border-primary pl-4">
                  <h4 className="font-semibold">Quiet Hours</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Quiet hours are from 10:00 PM to 8:00 AM. Please keep noise levels low to respect neighbors and other guests.
                  </p>
                </div>

                <div className="border-l-4 border-primary pl-4">
                  <h4 className="font-semibold">Guest Capacity</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Only registered guests may stay at the property. Additional guests are not permitted. Maximum occupancy: {listing.maxGuests} people.
                  </p>
                </div>

                <div className="border-l-4 border-primary pl-4">
                  <h4 className="font-semibold">Parties & Events</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Parties, events, and gatherings are strictly prohibited. Violation will result in immediate eviction without refund.
                  </p>
                </div>

                <div className="border-l-4 border-primary pl-4">
                  <h4 className="font-semibold">Property Care</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Keep the property clean and tidy. Do not rearrange furniture or remove items. Report any damage immediately.
                  </p>
                </div>

                <div className="border-l-4 border-primary pl-4">
                  <h4 className="font-semibold">No Pets</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Pets are not allowed unless previously approved by the host. Violation may result in additional fees.
                  </p>
                </div>

                <div className="border-l-4 border-primary pl-4">
                  <h4 className="font-semibold">Respectful Behavior</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Treat the property and neighborhood with respect. Discriminatory behavior, harassment, or illegal activity is grounds for removal.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Guest Responsibilities */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Guest Responsibilities & Consequences
            </CardTitle>
            <CardDescription>What guests must do to protect the property</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert className="bg-amber-50 border-amber-200">
              <AlertCircle className="h-4 w-4 text-amber-600" />
              <AlertDescription className="text-amber-800">
                Violation of these terms may result in immediate removal without refund and restrictions on future bookings.
              </AlertDescription>
            </Alert>

            <div className="space-y-3">
              <div className="flex gap-3">
                <div className="flex-shrink-0 pt-1">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm">Lock Doors & Windows</h4>
                  <p className="text-sm text-muted-foreground">
                    Keep all doors and windows locked when not home. Security breaches are the guest's responsibility.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex-shrink-0 pt-1">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm">Report Damage Immediately</h4>
                  <p className="text-sm text-muted-foreground">
                    Any damage caused during your stay must be reported within 24 hours. Unreported damage may result in deduction from security deposit.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex-shrink-0 pt-1">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm">No Unauthorized Changes</h4>
                  <p className="text-sm text-muted-foreground">
                    Do not alter WiFi passwords, change thermostat settings permanently, or modify property settings without permission.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex-shrink-0 pt-1">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm">Return Items in Original Condition</h4>
                  <p className="text-sm text-muted-foreground">
                    Leave the property clean and in the same condition as arrival. Excessive cleaning fees may apply.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex-shrink-0 pt-1">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm">Follow Parking Rules</h4>
                  <p className="text-sm text-muted-foreground">
                    Park only in designated areas. Unauthorized parking or parking violations are the guest's responsibility.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Dispute Resolution & Damage Policy */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5" />
              Damage & Dispute Resolution
            </CardTitle>
            <CardDescription>How damages and disputes are handled</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4 text-sm">
              <div>
                <h4 className="font-semibold mb-2">Security Deposit</h4>
                <p className="text-muted-foreground">
                  A security deposit of ${(listing.pricePerNight * 0.5).toFixed(0)} is held for the duration of your stay. It will be returned within 7 days if no damage is found.
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Damage Claims</h4>
                <p className="text-muted-foreground">
                  The host has 14 days after checkout to file a damage claim with photos and itemized costs. You will have 48 hours to respond to claims.
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Mediation Process</h4>
                <p className="text-muted-foreground">
                  Disputes will be resolved through our platform's mediation process. Both parties can provide evidence and communication. A platform moderator will make a final decision.
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Coverage Limits</h4>
                <p className="text-muted-foreground">
                  Host protection covers up to ${(listing.pricePerNight * 30).toFixed(0)} per incident. Additional damages may require legal action.
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Cancellation Policy</h4>
                <p className="text-muted-foreground">
                  {listing.cancellationPolicy} cancellation policy applies. Read the full cancellation terms before proceeding to payment.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Acceptance Section */}
        <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
          <CardHeader>
            <CardTitle>Agreement & Acceptance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Checkbox
                  id="read-guide"
                  checked={readGuide}
                  onCheckedChange={(checked) => setReadGuide(checked as boolean)}
                  className="mt-1"
                />
                <label htmlFor="read-guide" className="text-sm cursor-pointer">
                  I have read and understand all the house rules and guest responsibilities listed above
                </label>
              </div>

              <div className="flex items-start gap-3">
                <Checkbox
                  id="accept-rules"
                  checked={acceptedRules}
                  onCheckedChange={(checked) => setAcceptedRules(checked as boolean)}
                  className="mt-1"
                />
                <label htmlFor="accept-rules" className="text-sm cursor-pointer">
                  I agree to follow all house rules and take responsibility for any damage caused by me or my guests during the stay
                </label>
              </div>
            </div>

            <Alert className="bg-blue-50 border-blue-200">
              <AlertCircle className="h-4 w-4 text-blue-600" />
              <AlertDescription className="text-blue-800">
                By accepting these terms, you are entering a binding agreement with the host. Violation may result in loss of booking and restrictions on future reservations.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-3 pb-8">
          <Link href={`/guest/listings/${params.id}`} className="flex-1">
            <Button variant="outline" className="w-full">
              Go Back
            </Button>
          </Link>
          <Button
            onClick={handleContinueToPayment}
            disabled={!acceptedRules || !readGuide}
            className="flex-1 bg-primary hover:bg-primary/90"
          >
            Continue to Payment
          </Button>
        </div>
      </div>
    </div>
  );
}
