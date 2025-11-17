"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function RegisterForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!email || !username) {
      setError("Заполните все поля.");
      return;
    }

    setLoading(true);
    try {
      const resp = await fetch(`${API_BASE}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          username,
        }),
      });

      const data = await resp.json().catch(() => ({}));

      if (!resp.ok) {
        const message =
          data?.detail || data?.message || JSON.stringify(data);
        setError(String(message));
        setLoading(false);
        return;
      }

      // ✔️ Сохраняем email для verify
      localStorage.setItem("verify_email", email);

      // ✔️ Переход на страницу ввода OTP
      router.push("/auth/verify-email");

    } catch (err) {
      console.error(err);
      setError("Ошибка сети. Попробуйте снова.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">

      <div>
        <label className="block text-sm font-medium">Email</label>
        <input
          type="email"
          className="mt-1 w-full border rounded px-3 py-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Username</label>
        <input
          type="text"
          className="mt-1 w-full border rounded px-3 py-2"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="shaxob"
          required
        />
      </div>

      {error && <p className="text-red-600 text-sm">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-60"
      >
        {loading ? "Отправка..." : "Зарегистрироваться"}
      </button>
    </form>
  );
}
