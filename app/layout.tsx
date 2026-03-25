import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { SessionProvider } from 'next-auth/react'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'StayLux Ke',
  description: 'Book unique stays and experiences',
  icons: {
    icon: [
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

import InitialLoaderWrapper from '@/components/loader/initial-loader-wrapper'
import BottomNav from '@/components/bottom-nav'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased" suppressHydrationWarning>
        <SessionProvider>
          <InitialLoaderWrapper>
            {children}
            <BottomNav />
          </InitialLoaderWrapper>
        </SessionProvider>
        <Analytics />
      </body>
    </html>
  )
}
