// app/layout.tsx
import './globals.css'
import { Cormorant_Garamond, Inter } from 'next/font/google'
import Navbar from '@/components/NavBar'
import Footer from '@/components/Footer'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-serif',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-sans',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
        <body className={`${cormorant.variable} ${inter.variable} min-h-screen flex flex-col`}>
        <Navbar />
        <div className="grow">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  )
}