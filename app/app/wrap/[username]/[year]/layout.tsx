import type { Metadata } from 'next'

type Props = { params: Promise<{ username: string; year: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { username, year } = await params
  return {
    title: `@${username}'s ${year} DevWrapped`,
    description: `Check out ${username}'s ${year} GitHub year in review on DevWrapped.`,
    openGraph: {
      title: `@${username}'s ${year} DevWrapped`,
      description: `See ${username}'s ${year} GitHub stats as a stunning story.`,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `@${username}'s ${year} DevWrapped`,
    },
  }
}

export default function WrapLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
