import LoginForm from "@/components/auth/login-form"
import Link from "next/link"

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link href="/" className="inline-block mb-4">
            <h1 className="text-3xl font-bold text-primary">Commerce</h1>
            <p className="text-muted-foreground text-sm">HUB</p>
          </Link>
          <h2 className="text-2xl font-semibold text-foreground mt-6">Sign In</h2>
          <p className="text-muted-foreground mt-2">Enter your email to continue</p>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <LoginForm />
        </div>
      </div>
    </main>
  )
}
