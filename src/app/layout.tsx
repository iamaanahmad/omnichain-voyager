import type { Metadata } from 'next'
import './globals.css'
import { Toaster } from '@/components/ui/toaster'

export const metadata: Metadata = {
  title: 'OmniChain Voyager',
  description: 'Simulate bridging an NFT character across different blockchains.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap"
          rel="stylesheet"
        ></link>
          <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><defs><linearGradient id='g' x1='0' x2='0' y1='0' y2='1'><stop stop-color='%238A2BE2' offset='0%'/><stop stop-color='%239f7aea' offset='100%'/></linearGradient></defs><path fill='url(%23g)' d='M50 0L95.1 24.4L79.4 65.5L20.6 65.5L4.9 24.4zM50 100L4.9 75.6L20.6 34.5L79.4 34.5L95.1 75.6z'/></svg>" />
      </head>
      <body className="font-body antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  )
}
