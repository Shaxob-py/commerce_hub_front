"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from 'next/navigation'
import { apiClient } from "@/lib/api-client"

export default function RegisterForm() {
  const router = useRouter()
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
      await apiClient.post("/auth/register", {
        email,
        username: fullName,
      })

      // 👉 Сохраняем email для verify-email страницы
      if (typeof window !== "undefined") {
        localStorage.setItem("verify_email", email)
      }

      setSuccess(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="text-center space-y-4">
        <div className="text-green-400 text-lg font-medium">
          Check your email for verification code
        </div>

        <p className="text-muted-foreground">
          We sent a verification code to {email}
        </p>

        <button
          onClick={() => {
            setSuccess(false)
            router.push(`/auth/verify?email=${email}`)
          }}
          className="auth-link inline-block mt-4"
        >
          Verify now
        </button>
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
