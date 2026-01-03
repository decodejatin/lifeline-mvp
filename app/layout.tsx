import './globals.css'
import React from 'react'
import { Inter, Outfit } from 'next/font/google'
import Footer from '../components/Footer'
import Header from '../components/Header'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
})

export const metadata = {
  title: 'Lifeline — Compare mobiles & save with verified affiliate deals',
  description:
    'Compare mobile prices across Amazon and Flipkart. See price history, features, and buy via tracked affiliate links. SEO-first, fast MVP.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  openGraph: {
    title: 'Lifeline — Mobile comparisons',
    description:
      'Compare latest mobile phones across stores, view price history, and follow affiliate deals to buy.',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    siteName: 'Lifeline',
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'Lifeline — Compare mobiles'
      }
    ],
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lifeline — Mobile comparisons',
    description: 'Compare mobile prices across Amazon and Flipkart.'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true
    }
  }
}

import SmoothScrollProvider from '@/components/providers/SmoothScrollProvider'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <head />
      <body className="min-h-screen bg-slate-950 font-body flex flex-col">
        <SmoothScrollProvider>
          <Header />
          <main className="flex-grow w-full pt-24">{children}</main>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  )
}
