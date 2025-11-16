"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { apiClient } from "@/lib/api-client"

export default function LoginForm() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [otpSent, setOtpSent] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      await apiClient.post("/auth/login", {
        email,
      })
      setOtpSent(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send OTP. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  if (otpSent) {
    return (
      <div className="text-center space-y-4">
        <div className="text-primary text-lg font-medium">OTP sent to {email}</div>
        <p className="text-muted-foreground">Enter the code to sign in</p>
        <Link href={`/auth/verify-otp?email=${encodeURIComponent(email)}`} className="auth-link inline-block mt-4">
          Enter OTP
        </Link>
        <button
          onClick={() => setOtpSent(false)}
          className="block w-full text-muted-foreground hover:text-foreground transition-colors text-sm mt-2"
        >
          Back to email
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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

      {error && <div className="text-destructive text-sm">{error}</div>}

      <button type="submit" disabled={loading} className="auth-button">
        {loading ? "Sending OTP..." : "Send OTP"}
      </button>

      <p className="text-center text-sm text-muted-foreground">
        Don't have an account?{" "}
        <Link href="/auth/register" className="auth-link font-medium">
          Create one
        </Link>
      </p>
    </form>
  )
}
