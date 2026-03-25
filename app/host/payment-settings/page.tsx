'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ArrowLeft, Shield, CreditCard, AlertCircle, CheckCircle } from 'lucide-react';

export default function HostPaymentSettingsPage() {
  const [payoutMethod, setPayoutMethod] = useState('bank_transfer');
  const [bankName, setBankName] = useState('Chase Bank');
  const [accountHolder, setAccountHolder] = useState('John Doe');
  const [accountNumber, setAccountNumber] = useState('');
  const [protectionLevel, setProtectionLevel] = useState('standard');
  const [damageClaimPeriod, setDamageClaimPeriod] = useState('14');
  const [enableMediation, setEnableMediation] = useState(true);
  const [requireDeposit, setRequireDeposit] = useState(true);
  const [depositPercentage, setDepositPercentage] = useState('50');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/host/settings" className="flex items-center gap-2 text-primary hover:underline mb-6">
        <ArrowLeft className="h-4 w-4" />
        Back to Settings
      </Link>

      <div className="max-w-3xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Payment & Host Protection</h1>
          <p className="text-muted-foreground">
            Configure how you receive payments and set up damage protection policies for your properties
          </p>
        </div>

        {saved && (
          <Alert className="bg-green-50 border-green-200">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              Your payment settings have been saved successfully.
            </AlertDescription>
          </Alert>
        )}

        {/* Payout Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Payout Settings
            </CardTitle>
            <CardDescription>
              Choose how you want to receive your earnings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label className="text-sm font-semibold mb-3 block">Payment Method</Label>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    id="bank_transfer"
                    value="bank_transfer"
                    checked={payoutMethod === 'bank_transfer'}
                    onChange={(e) => setPayoutMethod(e.target.value)}
                    className="w-4 h-4 cursor-pointer"
                  />
                  <label htmlFor="bank_transfer" className="cursor-pointer">
                    <span className="font-medium">Bank Transfer</span>
                    <p className="text-sm text-muted-foreground">Direct deposit to your bank account</p>
                  </label>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    id="paypal"
                    value="paypal"
                    checked={payoutMethod === 'paypal'}
                    onChange={(e) => setPayoutMethod(e.target.value)}
                    className="w-4 h-4 cursor-pointer"
                  />
                  <label htmlFor="paypal" className="cursor-pointer">
                    <span className="font-medium">PayPal</span>
                    <p className="text-sm text-muted-foreground">Send payments to your PayPal account</p>
                  </label>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    id="stripe"
                    value="stripe"
                    checked={payoutMethod === 'stripe'}
                    onChange={(e) => setPayoutMethod(e.target.value)}
                    className="w-4 h-4 cursor-pointer"
                  />
                  <label htmlFor="stripe" className="cursor-pointer">
                    <span className="font-medium">Stripe Connect</span>
                    <p className="text-sm text-muted-foreground">Fast payouts via Stripe</p>
                  </label>
                </div>
              </div>
            </div>

            {payoutMethod === 'bank_transfer' && (
              <div className="space-y-4 p-4 bg-muted/50 rounded-lg">
                <div>
                  <Label htmlFor="bankName" className="text-sm">Bank Name</Label>
                  <Input
                    id="bankName"
                    value={bankName}
                    onChange={(e) => setBankName(e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="accountHolder" className="text-sm">Account Holder Name</Label>
                  <Input
                    id="accountHolder"
                    value={accountHolder}
                    onChange={(e) => setAccountHolder(e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="accountNumber" className="text-sm">Account Number (Last 4 digits)</Label>
                  <Input
                    id="accountNumber"
                    placeholder="••••1234"
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                    maxLength="4"
                    className="mt-1"
                  />
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Host Protection Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Host Protection Policy
            </CardTitle>
            <CardDescription>
              Set up damage protection and dispute resolution for your properties
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Protection Level */}
            <div>
              <Label className="text-sm font-semibold mb-3 block">Protection Level</Label>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    id="basic"
                    value="basic"
                    checked={protectionLevel === 'basic'}
                    onChange={(e) => setProtectionLevel(e.target.value)}
                    className="w-4 h-4 cursor-pointer"
                  />
                  <label htmlFor="basic" className="cursor-pointer">
                    <span className="font-medium">Basic Protection</span>
                    <p className="text-sm text-muted-foreground">
                      Up to $500 coverage per incident • 7-day damage claim window
                    </p>
                  </label>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    id="standard"
                    value="standard"
                    checked={protectionLevel === 'standard'}
                    onChange={(e) => setProtectionLevel(e.target.value)}
                    className="w-4 h-4 cursor-pointer"
                  />
                  <label htmlFor="standard" className="cursor-pointer">
                    <span className="font-medium">Standard Protection (Recommended)</span>
                    <p className="text-sm text-muted-foreground">
                      Up to $2,500 coverage per incident • 14-day damage claim window • Full mediation support
                    </p>
                  </label>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    id="premium"
                    value="premium"
                    checked={protectionLevel === 'premium'}
                    onChange={(e) => setProtectionLevel(e.target.value)}
                    className="w-4 h-4 cursor-pointer"
                  />
                  <label htmlFor="premium" className="cursor-pointer">
                    <span className="font-medium">Premium Protection</span>
                    <p className="text-sm text-muted-foreground">
                      Up to $10,000 coverage per incident • 30-day damage claim window • Priority support • Legal consultation
                    </p>
                  </label>
                </div>
              </div>
            </div>

            {/* Damage Claim Settings */}
            <div className="pt-4 border-t space-y-4">
              <div>
                <Label htmlFor="damageClaimPeriod" className="text-sm font-semibold">
                  Damage Claim Period (Days)
                </Label>
                <p className="text-xs text-muted-foreground mb-2">
                  How many days after checkout can you file a damage claim?
                </p>
                <Input
                  id="damageClaimPeriod"
                  type="number"
                  min="7"
                  max="30"
                  value={damageClaimPeriod}
                  onChange={(e) => setDamageClaimPeriod(e.target.value)}
                />
              </div>

              <div className="flex items-center gap-3">
                <Checkbox
                  id="enableMediation"
                  checked={enableMediation}
                  onCheckedChange={(checked) => setEnableMediation(checked as boolean)}
                />
                <label htmlFor="enableMediation" className="text-sm cursor-pointer">
                  <span className="font-medium">Enable Mediation</span>
                  <p className="text-xs text-muted-foreground">
                    Use platform mediation for disputes instead of legal action (recommended)
                  </p>
                </label>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Security Deposit Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Security Deposit Policy</CardTitle>
            <CardDescription>
              Configure security deposits to protect your property
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <Checkbox
                id="requireDeposit"
                checked={requireDeposit}
                onCheckedChange={(checked) => setRequireDeposit(checked as boolean)}
              />
              <label htmlFor="requireDeposit" className="text-sm font-medium cursor-pointer">
                Require Security Deposit
              </label>
            </div>

            {requireDeposit && (
              <div className="p-4 bg-muted/50 rounded-lg space-y-4">
                <div>
                  <Label htmlFor="depositPercentage" className="text-sm font-semibold">
                    Security Deposit Amount
                  </Label>
                  <p className="text-xs text-muted-foreground mb-2">
                    Percentage of nightly rate to collect as security deposit
                  </p>
                  <div className="flex items-center gap-2">
                    <Input
                      id="depositPercentage"
                      type="number"
                      min="0"
                      max="100"
                      value={depositPercentage}
                      onChange={(e) => setDepositPercentage(e.target.value)}
                    />
                    <span className="text-sm font-medium">% of nightly rate</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Example: If nightly rate is $100 and deposit is 50%, guests will pay $50 as security deposit
                  </p>
                </div>

                <Alert className="bg-blue-50 border-blue-200">
                  <AlertCircle className="h-4 w-4 text-blue-600" />
                  <AlertDescription className="text-sm text-blue-800">
                    Security deposits are held in escrow and returned to guests within 7 days if no damage is reported
                  </AlertDescription>
                </Alert>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Information Alert */}
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            These settings apply to all your current and future listings. Guests will see your protection policies before confirming their booking.
          </AlertDescription>
        </Alert>

        {/* Save Button */}
        <div className="flex gap-3">
          <Link href="/host/settings" className="flex-1">
            <Button variant="outline" className="w-full">
              Cancel
            </Button>
          </Link>
          <Button onClick={handleSave} className="flex-1 bg-primary hover:bg-primary/90">
            Save Payment Settings
          </Button>
        </div>
      </div>
    </div>
  );
}
