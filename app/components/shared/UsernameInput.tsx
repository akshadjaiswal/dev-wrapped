/**
 * Username Input Component
 * Specialized input for GitHub username with validation
 */

'use client'

import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Github } from 'lucide-react'

interface UsernameInputProps {
  onSubmit: (username: string) => void
  isLoading?: boolean
  placeholder?: string
}

export function UsernameInput({
  onSubmit,
  isLoading,
  placeholder = 'github-username',
}: UsernameInputProps) {
  const [username, setUsername] = useState('')
  const [error, setError] = useState<string>()

  const validateUsername = (value: string): string | undefined => {
    if (!value) return 'Username is required'
    if (value.length > 39) return 'Username is too long'
    if (!/^[a-zA-Z0-9](?:[a-zA-Z0-9]|-(?=[a-zA-Z0-9])){0,38}$/.test(value)) {
      return 'Invalid GitHub username format'
    }
    return undefined
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const validationError = validateUsername(username)
    if (validationError) {
      setError(validationError)
      return
    }
    setError(undefined)
    onSubmit(username)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setUsername(value)
    if (error) {
      setError(undefined)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-xl space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Github className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-foreground/50" />
          <Input
            type="text"
            placeholder={placeholder}
            value={username}
            onChange={handleChange}
            error={error}
            disabled={isLoading}
            className="pl-12"
            autoFocus
            autoComplete="off"
            spellCheck="false"
          />
        </div>
        <Button
          type="submit"
          size="lg"
          loading={isLoading}
          disabled={isLoading || !username}
          className="whitespace-nowrap"
        >
          Generate My Wrap →
        </Button>
      </div>
      <p className="text-sm text-foreground/60 text-center sm:text-left">
        Enter your GitHub username to see your 2024 wrap
      </p>
    </form>
  )
}
