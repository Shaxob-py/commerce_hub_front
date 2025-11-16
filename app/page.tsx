"use client"

import Link from "next/link"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from 'next/navigation'

export default function Home() {
  const { isAuthenticated, logout } = useAuth()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  return (
    <main className="min-h-screen bg-background">
      <nav className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary">Commerce HUB</h1>
          <div className="flex gap-4">
            {isAuthenticated ? (
              <>
                <Link href="/products" className="text-primary hover:text-accent transition-colors">
                  Browse Products
                </Link>
                <Link href="/profile" className="text-primary hover:text-accent transition-colors">
                  Profile
                </Link>
                <Link href="/products/add" className="text-primary hover:text-accent transition-colors">
                  Sell
                </Link>
                <button onClick={handleLogout} className="text-destructive hover:text-red-400 transition-colors">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/auth/login" className="text-primary hover:text-accent transition-colors">
                  Sign In
                </Link>
                <Link href="/auth/register" className="auth-button py-2 px-6 max-w-[120px]">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <h2 className="text-4xl font-bold text-foreground mb-4">Welcome to Commerce HUB</h2>
        <p className="text-muted-foreground mb-8 text-lg">The marketplace where you can buy and sell products</p>
        <Link href={isAuthenticated ? "/products" : "/auth/register"} className="inline-block auth-button py-3 px-8 max-w-[200px]">
          {isAuthenticated ? "Browse Products" : "Get Started"}
        </Link>
      </div>
    </main>
  )
}
