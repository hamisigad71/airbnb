'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function AdminReportsPage() {
  const reports = [
    {
      title: 'Monthly Revenue Report',
      description: 'Detailed breakdown of revenue by property and host',
      period: 'Last 30 days',
      status: 'ready',
    },
    {
      title: 'User Activity Report',
      description: 'Analysis of user login patterns and engagement',
      period: 'Last 30 days',
      status: 'ready',
    },
    {
      title: 'Booking Trends Report',
      description: 'Analysis of booking patterns and peak seasons',
      period: 'Last 90 days',
      status: 'ready',
    },
    {
      title: 'Property Performance Report',
      description: 'Ranking of properties by revenue and ratings',
      period: 'Last 30 days',
      status: 'ready',
    },
    {
      title: 'Compliance Report',
      description: 'Listings and hosts compliance status',
      period: 'Current',
      status: 'ready',
    },
  ];

  const issues = [
    {
      title: 'Unverified Listings',
      count: 0,
      severity: 'medium',
      description: 'Listings that have not been verified by our team',
    },
    {
      title: 'Inactive Hosts',
      count: 0,
      severity: 'low',
      description: 'Hosts with no activity in the last 90 days',
    },
    {
      title: 'Low-Rated Properties',
      count: 0,
      severity: 'medium',
      description: 'Properties with ratings below 4.0',
    },
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Reports & Compliance</h1>

      {/* Issues Alert */}
      <Alert className="mb-8 border-yellow-300 bg-yellow-50">
        <AlertCircle className="h-4 w-4 text-yellow-700" />
        <AlertDescription className="text-yellow-700">
          All systems running normally. No critical issues detected.
        </AlertDescription>
      </Alert>

      <div className="space-y-8">
        {/* Available Reports */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Available Reports</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {reports.map((report, i) => (
              <Card key={i}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-base">{report.title}</CardTitle>
                      <CardDescription>{report.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Period: {report.period}</span>
                      <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded">
                        {report.status}
                      </span>
                    </div>
                    <Button className="w-full bg-primary hover:bg-primary/90" size="sm">
                      <Download className="h-3 w-3 mr-2" />
                      Download PDF
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Compliance Issues */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Compliance & Issues</h2>
          <div className="space-y-3">
            {issues.map((issue, i) => (
              <Card key={i}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold">{issue.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{issue.description}</p>
                    </div>
                    <div className="text-right space-y-2">
                      <p className="text-2xl font-bold">{issue.count}</p>
                      <span className={`text-xs px-2 py-1 rounded ${getSeverityColor(issue.severity)}`}>
                        {issue.severity}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* System Health */}
        <Card>
          <CardHeader>
            <CardTitle>System Health</CardTitle>
            <CardDescription>Current status of platform components</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { name: 'API Server', status: 'operational' },
                { name: 'Database', status: 'operational' },
                { name: 'Cache System', status: 'operational' },
                { name: 'Payment Processing', status: 'operational' },
                { name: 'Email Service', status: 'operational' },
              ].map((system, i) => (
                <div key={i} className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <span>{system.name}</span>
                  <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded">
                    {system.status}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
