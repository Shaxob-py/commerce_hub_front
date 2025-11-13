"use client"

import type React from "react"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"

export default function VerifyOtpForm() {
  const searchParams = useSearchParams()
  const email = searchParams.get("email") || ""

  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleOtpChange = (value: string, index: number) => {
    const newOtp = [...otp]
    newOtp[index] = value.slice(-1)
    setOtp(newOtp)

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`)
      nextInput?.focus()
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    const otpCode = otp.join("")
    if (otpCode.length !== 6) {
      setError("Please enter all 6 digits")
      setLoading(false)
      return
    }

    try {
      // TODO: Implement API call to verify OTP
      console.log("Verify OTP:", { email, otp: otpCode })
    } catch (err) {
      setError("Invalid OTP. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="text-center space-y-2">
        <p className="text-muted-foreground">Verification code sent to</p>
        <p className="font-medium">{email}</p>
      </div>

      <div>
        <label className="block text-sm font-medium mb-4">Enter OTP</label>
        <div className="flex gap-2 justify-center">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
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
        {loading ? "Verifying..." : "Verify"}
      </button>

      <div className="text-center space-y-2">
        <p className="text-sm text-muted-foreground">Didn't receive code?</p>
        <button type="button" className="text-primary hover:text-accent transition-colors text-sm font-medium">
          Resend OTP
        </button>
      </div>

      <Link
        href="/auth/login"
        className="block text-center text-muted-foreground hover:text-foreground transition-colors text-sm"
      >
        Back to login
      </Link>
    </form>
  )
}
