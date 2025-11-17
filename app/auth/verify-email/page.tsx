"use client";

import { useEffect, useState } from "react";
import VerifyOtpForm from "@/components/auth/verify-otp-form";

export default function VerifyEmailPage() {
  const [email, setEmail] = useState("");

  useEffect(() => {
    const savedEmail = localStorage.getItem("verify_email");
    if (savedEmail) {
      setEmail(savedEmail);
    }
  }, []);

  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md">

        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-primary">Commerce</h1>
          <p className="text-muted-foreground text-sm">HUB</p>
          <h2 className="text-2xl font-semibold text-foreground mt-6">Verify Email</h2>
          <p className="text-muted-foreground mt-2">
            Code was sent to: <span className="font-medium">{email}</span>
          </p>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          {/* ✔ Отображаем форму OTP (уже готовая) */}
          <VerifyOtpForm />
        </div>
      </div>
    </main>
  );
}
