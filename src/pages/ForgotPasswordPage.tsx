import { useState } from "react"
import { Link } from "react-router-dom"
import { supabase } from "../lib/supabase"
import Input from "../components/ui/Input"
import Button from "../components/ui/Button"
import Alert from "../components/ui/Alert"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    if (!email.trim()) {
      setError("Email is required")
      return
    }
    setLoading(true)
    const frontendUrl = window.location.origin
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${frontendUrl}/reset-password`,
    })
    setLoading(false)
    if (error) {
      setError("Failed to send reset link. Please try again.")
    } else {
      setSent(true)
    }
  }

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-xl border border-border shadow-card p-8">
        <h1 className="text-2xl font-bold text-charcoal mb-2">Forgot Password</h1>
        <p className="text-sm text-muted mb-6">Enter your email address and we will send you a link to reset your password.</p>
        {error && <Alert variant="error" className="mb-4">{error}</Alert>}
        {sent ? (
          <Alert variant="success">If an account exists with this email, a password reset link has been sent. Please check your inbox.</Alert>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input label="Email Address" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your.email@example.com" />
            <Button type="submit" isLoading={loading} className="w-full">Send Reset Link</Button>
          </form>
        )}
        <p className="mt-6 text-sm text-muted text-center">
          Remember your password?{" "}
          <Link to="/login" className="text-primary font-medium hover:text-primary-dark">Log in</Link>
        </p>
      </div>
    </div>
  )
}
