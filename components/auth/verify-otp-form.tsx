"use client";

import React, { useEffect, useState } from "react";
const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

export default function VerifyOtpForm() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const savedEmail = localStorage.getItem("verify_email");
    if (savedEmail) setEmail(savedEmail);
  }, []);

  const handleOtpChange = (value: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const otpCode = otp.join("");

    if (otpCode.length !== 6) {
      setError("Введите все 6 цифр.");
      setLoading(false);
      return;
    }

    try {
      const resp = await fetch(`${API_BASE}/auth/verification-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          code: otpCode,
        }),
      });

      const data = await resp.json();

      if (!resp.ok) {
          setError(data.detail || "Verification failed");
      setLoading(false);
      return;
    }

    localStorage.setItem("access_token", data.access_token);
    localStorage.setItem("refresh_token", data.refresh_token);

    // 👉 удаляем временный email
    localStorage.removeItem("verify_email");

      alert("Email успешно подтверждён!");

      window.location.href = "/products";

    } catch (err) {
      console.error(err);
      setError("Ошибка сети.");
    } finally {
      setLoading(false);
    }
  };

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
              className="w-12 h-12 text-center text-lg font-semibold bg-secondary text-foreground border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          ))}
        </div>
      </div>

      {error && <div className="text-destructive text-sm text-center">{error}</div>}

      <button type="submit" disabled={loading} className="auth-button">
        {loading ? "Verifying..." : "Verify"}
      </button>
    </form>
  );
}
