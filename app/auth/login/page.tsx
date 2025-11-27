"use client"

import { signIn } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { LogIn } from "lucide-react"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/40 p-6">
      <Card className="p-8 space-y-6 max-w-md w-full text-center">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold">Sign in to LeadFlow</h1>
          <p className="text-muted-foreground">Continue with your Google account to access your workspace.</p>
        </div>
        <Button className="w-full gap-2" variant="outline" onClick={() => signIn("google") }>
          <LogIn className="h-4 w-4" />
          Continue with Google
        </Button>
      </Card>
    </div>
  )
}
