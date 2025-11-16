"use client"

import { useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"
import { useAuth } from "@/lib/auth-context"
import { apiClient } from "@/lib/api-client"

export default function VerifyOtpForm() {
  const router = useRouter()
  const { login } = useAuth()
  const searchParams = useSearchParams()
  const email = searchParams.get("email") || ""

  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const [loading, setLoading] = useState(false)
  const [resendLoading, setResendLoading] = useState(false)
  const [error, setError] = useState("")

  const handleOtpChange = (value: string, index: number) => {
    const cleaned = value.replace(/\D/g, "")
    const newOtp = [...otp]
    newOtp[index] = cleaned.slice(-1)
    setOtp(newOtp)

    if (cleaned && index < 5) {
      document.getElementById(`otp-${index + 1}`)?.focus()
    }
  }

  const handleSubmit = async (e) => {
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
      const response = await apiClient.post("/auth/verification-email", {
        email,
        code: otpCode,
      })

      if (response.access_token) {
        login(response.access_token, response.refresh_token)
        router.push("/products")
      }
    } catch (err) {
      setError(err.response?.data?.detail || "Invalid OTP")
    } finally {
      setLoading(false)
    }
  }

  const handleResendOtp = async () => {
    setError("")
    setResendLoading(true)

    try {
      await apiClient.post("/auth/login", { email })
      setOtp(["", "", "", "", "", ""])
    } catch (err) {
      setError(err.response?.data?.detail || "Failed to resend code")
    } finally {
      setResendLoading(false)
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
          {otp.map((digit, i) => (
            <input
              key={i}
              id={`otp-${i}`}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleOtpChange(e.target.value, i)}
              className="w-12 h-12 text-center text-lg font-semibold bg-secondary border rounded-lg"
            />
          ))}
        </div>
      </div>

      {error && <p className="text-destructive text-center text-sm">{error}</p>}

      <button type="submit" disabled={loading} className="auth-button">
        {loading ? "Verifying..." : "Verify"}
      </button>

      <div className="text-center space-y-2">
        <p className="text-sm text-muted-foreground">Didn't receive code?</p>
        <button
          type="button"
          onClick={handleResendOtp}
          disabled={resendLoading}
          className="text-primary text-sm"
        >
          {resendLoading ? "Resending..." : "Resend OTP"}
        </button>
      </div>

      <Link href="/auth/login" className="block text-center text-sm text-muted-foreground">
        Back to login
      </Link>
    </form>
  )
}
