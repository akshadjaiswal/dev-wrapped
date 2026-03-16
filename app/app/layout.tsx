import type { Metadata } from 'next'
import {
  Inter,
  Orbitron,
  Space_Mono,
  Outfit,
  JetBrains_Mono,
  IBM_Plex_Mono,
  DM_Sans,
} from 'next/font/google'
import './globals.css'
import { QueryProvider } from '@/lib/query-provider'

const inter = Inter({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700'], variable: '--font-inter' })
const orbitron = Orbitron({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800', '900'], variable: '--font-orbitron' })
const spaceMono = Space_Mono({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-space-mono' })
const outfit = Outfit({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700'], variable: '--font-outfit' })
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700'], variable: '--font-jetbrains-mono' })
const ibmPlexMono = IBM_Plex_Mono({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700'], variable: '--font-ibm-plex-mono' })
const dmSans = DM_Sans({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700'], variable: '--font-dm-sans' })

export const metadata: Metadata = {
  title: 'DevWrapped - Your Code Year, Visualized',
  description: 'See your 2025 GitHub journey as a stunning story. Free. No sign-up. 30 seconds.',
  openGraph: {
    title: 'DevWrapped - Your Code Year, Visualized',
    description: 'See your 2025 GitHub journey as a stunning story.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DevWrapped - Your Code Year, Visualized',
    description: 'See your 2025 GitHub journey as a stunning story.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      data-theme="neon-dreams"
      className={`${inter.variable} ${orbitron.variable} ${spaceMono.variable} ${outfit.variable} ${jetbrainsMono.variable} ${ibmPlexMono.variable} ${dmSans.variable}`}
    >
      <body className={inter.className}>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  )
}
