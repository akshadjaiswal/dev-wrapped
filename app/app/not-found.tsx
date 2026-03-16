import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-background">
      <div className="max-w-md w-full space-y-6 text-center">
        <h1 className="text-6xl font-header font-bold text-foreground">404</h1>
        <p className="text-foreground/60 font-body">Page not found</p>
        <Button asChild variant="primary"><Link href="/">Back to Home</Link></Button>
      </div>
    </div>
  )
}
