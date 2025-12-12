import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { QueryProvider } from '@/lib/query-provider'

const inter = Inter({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700'] })

export const metadata: Metadata = {
  title: 'DevWrapped - Your Code Year, Visualized',
  description: 'See your 2024 GitHub journey as a stunning story. Free. No sign-up. 30 seconds.',
  openGraph: {
    title: 'DevWrapped - Your Code Year, Visualized',
    description: 'See your 2024 GitHub journey as a stunning story.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DevWrapped - Your Code Year, Visualized',
    description: 'See your 2024 GitHub journey as a stunning story.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  )
}
