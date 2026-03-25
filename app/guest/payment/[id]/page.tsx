'use client';

import { useState, use } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowLeft, Shield, CreditCard, Lock, AlertCircle, CheckCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { MOCK_LISTINGS } from '@/lib/mock-data';

export default function PaymentPage({
  params: paramsPromise,
}: {
  params: Promise<{ id: string }>
}) {
  const params = use(paramsPromise);
  const searchParams = useSearchParams();
  const checkIn = searchParams.get('checkin');
  const checkOut = searchParams.get('checkout');
  const guestCount = searchParams.get('guests');

  const [cardData, setCardData] = useState({
    cardNumber: '',
    cardName: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
  });
  const [agreeToProtection, setAgreeToProtection] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
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
    : 1;

  const nightly = listing.pricePerNight;
  const subtotal = nightly * nights;
  const serviceFee = Math.round(subtotal * 0.12);
  const cleaningFee = 75;
  const hostProtectionFee = Math.round(subtotal * 0.05);
  const total = subtotal + serviceFee + cleaningFee + hostProtectionFee;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCardData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!agreeToProtection || !agreeToTerms) {
      alert('Please agree to all terms before proceeding');
      return;
    }

    if (!cardData.cardNumber || !cardData.cardName || !cardData.expiryMonth || !cardData.expiryYear || !cardData.cvv) {
      alert('Please fill in all payment details');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 2000);
  };

  if (success) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center space-y-4 py-12">
            <div className="flex justify-center">
              <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </div>
            <h1 className="text-3xl font-bold">Booking Confirmed!</h1>
            <p className="text-muted-foreground text-lg">
              Your reservation has been confirmed. A confirmation email has been sent.
            </p>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-6 text-left">
              <h3 className="font-semibold text-green-900 mb-2">What Happens Next?</h3>
              <ul className="space-y-2 text-sm text-green-800">
                <li>✓ Host will confirm your booking within 24 hours</li>
                <li>✓ You'll receive a message from the host with check-in details</li>
                <li>✓ Payment is held securely until after checkout</li>
                <li>✓ Host has 14 days to report any damages to the property</li>
              </ul>
            </div>

            <Link href="/guest/bookings">
              <Button className="mt-8">View My Bookings</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href={`/guest/host-guide/${params.id}?checkin=${checkIn}&checkout=${checkOut}&guests=${guestCount}`} className="flex items-center gap-2 text-primary hover:underline mb-6">
        <ArrowLeft className="h-4 w-4" />
        Back to Guide
      </Link>

      <div className="max-w-5xl mx-auto grid gap-8 lg:grid-cols-3">
        {/* Main Payment Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Host Protection Info */}
          <Card className="bg-gradient-to-r from-blue-50 to-blue-50 border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-900">
                <Shield className="h-5 w-5" />
                Protected by Our Host Protection Program
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-blue-800">
              <p>
                Your payment and the host's property are protected through our comprehensive program that ensures a safe experience for both parties.
              </p>
              <div className="space-y-2">
                <div className="flex gap-2">
                  <CheckCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
                  <span>Payment held in escrow until after your checkout</span>
                </div>
                <div className="flex gap-2">
                  <CheckCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
                  <span>Host can file damage claims within 14 days with photographic evidence</span>
                </div>
                <div className="flex gap-2">
                  <CheckCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
                  <span>Mediation system resolves disputes fairly for both parties</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Payment Information
              </CardTitle>
              <CardDescription>Enter your payment details to confirm booking</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePayment} className="space-y-6">
                {/* Card Holder Name */}
                <div>
                  <Label htmlFor="cardName" className="text-sm font-medium">
                    Cardholder Name
                  </Label>
                  <Input
                    id="cardName"
                    name="cardName"
                    placeholder="John Doe"
                    value={cardData.cardName}
                    onChange={handleInputChange}
                    className="mt-2"
                  />
                </div>

                {/* Card Number */}
                <div>
                  <Label htmlFor="cardNumber" className="text-sm font-medium">
                    Card Number
                  </Label>
                  <Input
                    id="cardNumber"
                    name="cardNumber"
                    placeholder="4242 4242 4242 4242"
                    value={cardData.cardNumber}
                    onChange={handleInputChange}
                    maxLength="19"
                    className="mt-2"
                  />
                </div>

                {/* Expiry and CVV */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="expiryMonth" className="text-sm font-medium">
                      Expiry Month
                    </Label>
                    <Input
                      id="expiryMonth"
                      name="expiryMonth"
                      placeholder="MM"
                      value={cardData.expiryMonth}
                      onChange={handleInputChange}
                      maxLength="2"
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="expiryYear" className="text-sm font-medium">
                      Expiry Year
                    </Label>
                    <Input
                      id="expiryYear"
                      name="expiryYear"
                      placeholder="YY"
                      value={cardData.expiryYear}
                      onChange={handleInputChange}
                      maxLength="2"
                      className="mt-2"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="cvv" className="text-sm font-medium">
                    Security Code (CVV)
                  </Label>
                  <Input
                    id="cvv"
                    name="cvv"
                    placeholder="123"
                    value={cardData.cvv}
                    onChange={handleInputChange}
                    maxLength="4"
                    className="mt-2"
                  />
                </div>

                {/* Security Notice */}
                <Alert className="bg-green-50 border-green-200">
                  <Lock className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-800">
                    Your payment information is encrypted and secured using industry-standard SSL encryption. We never store your full card details.
                  </AlertDescription>
                </Alert>

                {/* Host Protection Agreement */}
                <Card className="bg-amber-50 border-amber-200">
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 text-amber-600" />
                      Host Protection Agreement
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-2 text-sm text-amber-900">
                      <p>
                        <strong>Payment Protection for the Host:</strong>
                      </p>
                      <ul className="list-disc list-inside space-y-1 ml-2">
                        <li>Your payment (${total.toFixed(2)}) will be held in escrow for 24 hours after checkout</li>
                        <li>Host can file damage claims for documented property damage within 14 days</li>
                        <li>You have 48 hours to respond to damage claims with your evidence</li>
                        <li>Disputes are resolved through impartial mediation</li>
                        <li>Protection covers up to ${(listing.pricePerNight * 30).toFixed(2)} per incident</li>
                      </ul>
                    </div>

                    <div className="flex items-start gap-3 mt-4">
                      <Checkbox
                        id="protectionAgree"
                        checked={agreeToProtection}
                        onCheckedChange={(checked) => setAgreeToProtection(checked as boolean)}
                        className="mt-1"
                      />
                      <label htmlFor="protectionAgree" className="text-sm cursor-pointer">
                        I understand the host protection program and agree that payment will be held in escrow. I also agree that the host can file damage claims within 14 days of checkout.
                      </label>
                    </div>
                  </CardContent>
                </Card>

                {/* Terms & Conditions */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Booking Terms & Conditions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="text-sm text-muted-foreground space-y-2 max-h-32 overflow-y-auto">
                      <p>
                        By completing this booking, you agree to:
                      </p>
                      <ul className="list-disc list-inside space-y-1">
                        <li>Follow all house rules set by the host</li>
                        <li>Take responsibility for any damage caused during your stay</li>
                        <li>Report damages immediately to the host</li>
                        <li>Return the property in the same condition as arrival</li>
                        <li>Respect the cancellation policy of the listing</li>
                        <li>Not sublease or transfer the booking to another party</li>
                        <li>Comply with all local laws and regulations</li>
                      </ul>
                    </div>

                    <div className="flex items-start gap-3">
                      <Checkbox
                        id="termsAgree"
                        checked={agreeToTerms}
                        onCheckedChange={(checked) => setAgreeToTerms(checked as boolean)}
                        className="mt-1"
                      />
                      <label htmlFor="termsAgree" className="text-sm cursor-pointer">
                        I have read and agree to all booking terms and conditions
                      </label>
                    </div>
                  </CardContent>
                </Card>

                <Button
                  type="submit"
                  disabled={!agreeToProtection || !agreeToTerms || loading}
                  className="w-full bg-primary hover:bg-primary/90 h-11"
                  size="lg"
                >
                  {loading ? 'Processing Payment...' : `Pay $${total.toFixed(2)}`}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Booking Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle className="text-lg">Booking Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Listing Info */}
              <div className="pb-4 border-b">
                <h3 className="font-semibold text-sm">{listing.title}</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  {checkIn} to {checkOut}
                </p>
                <p className="text-xs text-muted-foreground">
                  {nights} night{nights > 1 ? 's' : ''} • {guestCount} guest{guestCount !== '1' ? 's' : ''}
                </p>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">${nightly.toFixed(2)} × {nights} nights</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Service fee</span>
                  <span>${serviceFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Cleaning fee</span>
                  <span>${cleaningFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between border-t pt-3">
                  <span className="text-muted-foreground text-xs">Host protection fee</span>
                  <span className="text-xs">${hostProtectionFee.toFixed(2)}</span>
                </div>
              </div>

              {/* Total */}
              <div className="border-t pt-3 flex justify-between font-semibold text-base">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>

              {/* Protection Info */}
              <Alert className="bg-blue-50 border-blue-200 mt-4">
                <Shield className="h-4 w-4 text-blue-600" />
                <AlertDescription className="text-xs text-blue-800">
                  The host protection fee of ${hostProtectionFee.toFixed(2)} covers damage protection and dispute mediation.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
