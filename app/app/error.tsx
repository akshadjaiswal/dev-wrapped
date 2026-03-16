'use client'

import { Button } from '@/components/ui/button'

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-background">
      <div className="max-w-md w-full space-y-6 text-center">
        <div className="space-y-2">
          <h1 className="text-3xl font-header font-bold text-foreground">Something went wrong</h1>
          <p className="text-foreground/60 font-body">{error.message || 'An unexpected error occurred'}</p>
        </div>
        <Button onClick={reset} variant="primary">Try again</Button>
      </div>
    </div>
  )
}
