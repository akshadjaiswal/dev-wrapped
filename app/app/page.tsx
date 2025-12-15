/**
 * Landing Page
 * Main entry point for DevWrapped
 */

'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { ThemeProvider } from '@/components/themes/ThemeProvider'
import { UsernameInput } from '@/components/shared/UsernameInput'
import { Code2, Sparkles, Share2, Zap } from 'lucide-react'
import { trackUsernameEntered } from '@/lib/services/analytics'
import { useWrapStore } from '@/lib/store/wrap-store'
import { useNavigationStore } from '@/lib/store/navigation-store'

export default function LandingPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Reset all state when returning to home page
  useEffect(() => {
    useWrapStore.getState().reset()
    useNavigationStore.getState().reset()
  }, [])

  const handleSubmit = async (username: string) => {
    setIsSubmitting(true)

    // Track analytics
    trackUsernameEntered(username)

    // Navigate to theme selection
    router.push(`/generate/${username}`)
  }

  return (
    <ThemeProvider theme="neon-dreams" showParticles showBackground>
      <main className="min-h-screen flex flex-col">
        {/* Header */}
        <header className="w-full py-6 px-6 flex justify-between items-center">
          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Code2 className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-header font-bold text-primary">
              DevWrapped
            </h1>
          </motion.div>

          <motion.a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground/60 hover:text-foreground transition-colors text-sm font-body"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            View on GitHub →
          </motion.a>
        </header>

        {/* Hero Section */}
        <section className="flex-1 flex flex-col items-center justify-center px-6 py-20">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            {/* Main Heading */}
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-5xl md:text-7xl font-header font-bold text-foreground leading-tight">
                Your Code Year,{' '}
                <span className="text-primary text-glow-primary">
                  Visualized
                </span>
              </h2>
              <p className="text-xl md:text-2xl font-body text-foreground/80 max-w-2xl mx-auto">
                See your 2025 GitHub journey as a stunning story.
                <br />
                Free. No sign-up. 30 seconds.
              </p>
            </motion.div>

            {/* Username Input */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex justify-center"
            >
              <UsernameInput
                onSubmit={handleSubmit}
                isLoading={isSubmitting}
                placeholder="github-username"
              />
            </motion.div>

            {/* Features */}
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <FeatureCard
                icon={<Zap className="h-6 w-6" />}
                title="30 Seconds"
                description="Instant generation. No waiting around."
              />
              <FeatureCard
                icon={<Sparkles className="h-6 w-6" />}
                title="5 Themes"
                description="Choose your vibe. Make it yours."
              />
              <FeatureCard
                icon={<Share2 className="h-6 w-6" />}
                title="Share Anywhere"
                description="One tap to social. Spread the wrap."
              />
            </motion.div>
          </div>
        </section>

        {/* Social Proof */}
        <motion.section
          className="py-12 px-6 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <p className="text-foreground/60 font-body text-sm">
            Join thousands of developers sharing their 2025 journey
          </p>
        </motion.section>

        {/* Footer */}
        <footer className="w-full py-6 px-6 text-center border-t border-theme">
          <motion.p
            className="text-foreground/50 font-body text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            Built with{' '}
            <span className="text-primary">Next.js</span>,{' '}
            <span className="text-secondary">Supabase</span>, and{' '}
            <span className="text-accent">Framer Motion</span>
          </motion.p>
        </footer>
      </main>
    </ThemeProvider>
  )
}

// Feature Card Component
function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <motion.div
      className="card-theme p-6 space-y-3 hover:scale-105 transition-transform duration-300"
      whileHover={{ y: -5 }}
    >
      <div className="flex justify-center text-primary">{icon}</div>
      <h3 className="font-header font-semibold text-lg text-foreground">
        {title}
      </h3>
      <p className="font-body text-sm text-foreground/70">{description}</p>
    </motion.div>
  )
}
