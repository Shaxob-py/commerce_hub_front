"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from 'next/navigation'
import { useAuth } from "@/lib/auth-context"
import { apiClient } from "@/lib/api-client"

export default function VerifyEmailPage() {
  const router = useRouter()
  const { login } = useAuth()
  const [email, setEmail] = useState("")
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleOtpChange = (value: string, index: number) => {
    const newOtp = [...otp]
    newOtp[index] = value.slice(-1)
    setOtp(newOtp)

    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-verify-${index + 1}`)
      nextInput?.focus()
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const response = await apiClient.post("/auth/verification-email", {
        email,
        code: otp.join(""),
      })

      if (response.access_token && response.refresh_token) {
        login(response.access_token, response.refresh_token)
        router.push("/products")
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Verification failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link href="/" className="inline-block mb-4">
            <h1 className="text-3xl font-bold text-primary">Commerce</h1>
            <p className="text-muted-foreground text-sm">HUB</p>
          </Link>
          <h2 className="text-2xl font-semibold text-foreground mt-6">Verify Email</h2>
          <p className="text-muted-foreground mt-2">Enter the code we sent you</p>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="auth-input"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-4">Verification Code</label>
              <div className="flex gap-2 justify-center">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-verify-${index}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(e.target.value, index)}
                    className="w-12 h-12 text-center text-lg font-semibold bg-secondary text-foreground border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                ))}
              </div>
            </div>

            {error && <div className="text-destructive text-sm text-center">{error}</div>}

            <button type="submit" disabled={loading} className="auth-button">
              {loading ? "Verifying..." : "Verify Email"}
            </button>

            <Link
              href="/auth/login"
              className="block text-center text-muted-foreground hover:text-foreground transition-colors text-sm"
            >
              Back to login
            </Link>
          </form>
        </div>
      </div>
    </main>
  )
}
