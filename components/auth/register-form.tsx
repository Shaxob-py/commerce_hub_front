"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"

export default function RegisterForm() {
  const [email, setEmail] = useState("")
  const [fullName, setFullName] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      // TODO: Implement API call to register user
      console.log("Register:", { email, fullName })
      setSuccess(true)
    } catch (err) {
      setError("Registration failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="text-center space-y-4">
        <div className="text-green-400 text-lg font-medium">Check your email for verification code</div>
        <p className="text-muted-foreground">We sent a verification code to {email}</p>
        <Link href="/auth/verify-email" className="auth-link inline-block mt-4">
          Verify now
        </Link>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="fullName" className="block text-sm font-medium mb-2">
          Full Name
        </label>
        <input
          id="fullName"
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="John Doe"
          className="auth-input"
          required
        />
      </div>

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
        {loading ? "Creating account..." : "Create Account"}
      </button>

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="/auth/login" className="auth-link font-medium">
          Sign in
        </Link>
      </p>
    </form>
  )
}
