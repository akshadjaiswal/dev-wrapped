/**
 * Slide 14: Share Card
 * Final slide with shareable card and social buttons
 */

'use client'

import React, { useRef, useState } from 'react'
import { FadeInUp } from '@/components/animations'
import { Button } from '@/components/ui/button'
import { Download, Twitter, Linkedin, Link as LinkIcon, Check } from 'lucide-react'
import html2canvas from 'html2canvas'
import type { SlideProps } from '@/lib/types'

export function Slide14ShareCard({ data, theme }: SlideProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [copySuccess, setCopySuccess] = useState(false)

  const shareUrl = `${typeof window !== 'undefined' ? window.location.origin : ''}/wrap/${data.username}/${data.year}`
  const shareText = `Check out my ${data.year} DevWrapped! 🚀 ${data.total_commits} commits, ${data.languages.length} languages, and ${data.longest_streak} day streak.`

  const handleDownload = async () => {
    if (!cardRef.current) return
    setIsGenerating(true)

    try {
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: null,
        scale: 2,
        logging: false,
      })

      const link = document.createElement('a')
      link.download = `devwrapped-${data.username}-${data.year}.png`
      link.href = canvas.toDataURL('image/png')
      link.click()
    } catch (error) {
      console.error('Failed to generate image:', error)
    } finally {
      setIsGenerating(false)
    }
  }

  const handleTwitterShare = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`
    window.open(url, '_blank', 'width=550,height=420')
  }

  const handleLinkedInShare = () => {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`
    window.open(url, '_blank', 'width=550,height=420')
  }

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopySuccess(true)
      setTimeout(() => setCopySuccess(false), 2000)
    } catch (error) {
      console.error('Failed to copy link:', error)
    }
  }

  return (
    <div className="slide-container">
      <div className="max-w-4xl mx-auto space-y-10">
        <FadeInUp>
          <h2 className="text-3xl md:text-4xl font-body text-center text-foreground">
            Share Your Wrap
          </h2>
        </FadeInUp>

        <FadeInUp delay={0.3}>
          <div
            ref={cardRef}
            className="card-theme p-6 md:p-10 space-y-4 md:space-y-6 text-center relative overflow-hidden"
          >
            {/* Background gradient for share card */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 pointer-events-none" />

            <div className="relative z-10 space-y-4 md:space-y-6">
              <div className="space-y-2">
                <h3 className="text-3xl md:text-5xl font-header font-bold text-primary">
                  {data.year}
                </h3>
                <p className="text-xl md:text-2xl text-foreground">DevWrapped</p>
              </div>

              <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-4">
                <img
                  src={data.avatar_url}
                  alt={data.username}
                  className="w-16 h-16 md:w-20 md:h-20 rounded-full border-4 border-primary"
                />
                <div className="text-center md:text-left">
                  <p className="text-xl md:text-2xl font-bold text-foreground">
                    {data.display_name || data.username}
                  </p>
                  <p className="text-foreground/60">@{data.username}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-6 pt-4">
                <div>
                  <p className="text-2xl md:text-4xl font-bold text-foreground">
                    {data.total_commits}
                  </p>
                  <p className="text-sm text-foreground/60">commits</p>
                </div>
                <div>
                  <p className="text-2xl md:text-4xl font-bold text-foreground">
                    {data.languages.length}
                  </p>
                  <p className="text-sm text-foreground/60">languages</p>
                </div>
                <div>
                  <p className="text-2xl md:text-4xl font-bold text-foreground">
                    {data.longest_streak}
                  </p>
                  <p className="text-sm text-foreground/60">day streak</p>
                </div>
              </div>

              <div className="pt-4">
                <p className="text-sm text-foreground/40">
                  dev-wrapped.vercel.app
                </p>
              </div>
            </div>
          </div>
        </FadeInUp>

        <FadeInUp delay={0.8}>
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-center gap-2 md:gap-4">
            <Button
              onClick={handleDownload}
              disabled={isGenerating}
              variant="primary"
              className="flex items-center justify-center gap-2 w-full md:w-auto transition-transform hover:scale-105"
            >
              <Download className="h-4 w-4" />
              {isGenerating ? 'Generating...' : 'Download Card'}
            </Button>

            <Button
              onClick={handleTwitterShare}
              variant="outline"
              className="flex items-center justify-center gap-2 w-full md:w-auto transition-transform hover:scale-105"
            >
              <Twitter className="h-4 w-4" />
              Share on Twitter
            </Button>

            <Button
              onClick={handleLinkedInShare}
              variant="outline"
              className="flex items-center justify-center gap-2 w-full md:w-auto transition-transform hover:scale-105"
            >
              <Linkedin className="h-4 w-4" />
              Share on LinkedIn
            </Button>

            <Button
              onClick={handleCopyLink}
              variant="outline"
              className="flex items-center justify-center gap-2 w-full md:w-auto transition-transform hover:scale-105"
            >
              {copySuccess ? (
                <>
                  <Check className="h-4 w-4" />
                  Copied!
                </>
              ) : (
                <>
                  <LinkIcon className="h-4 w-4" />
                  Copy Link
                </>
              )}
            </Button>
          </div>
        </FadeInUp>

        <FadeInUp delay={1.2}>
          <div className="text-center">
            <p className="text-foreground/60">
              Thanks for an amazing {data.year}! Keep shipping 🚀
            </p>
          </div>
        </FadeInUp>
      </div>
    </div>
  )
}
