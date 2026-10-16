import { useState } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { supabase } from "../lib/supabase"
import Input from "../components/ui/Input"
import Button from "../components/ui/Button"
import Alert from "../components/ui/Alert"

export default function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = (location.state as { from?: string } | null)?.from || "/"

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [showForgot, setShowForgot] = useState(false)
  const [forgotEmail, setForgotEmail] = useState("")
  const [forgotSent, setForgotSent] = useState(false)

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    if (!email || !password) {
      setError("Please fill in all fields")
      return
    }
    setLoading(true)
    try {
      await login(email, password)
      const { data: { session } } = await supabase.auth.getSession()
      if (session?.user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", session.user.id)
          .single()
        if (profile?.role === "admin") {
          navigate("/admin")
        } else {
          navigate(from)
        }
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message || "Login failed. Please check your credentials." : "Login failed. Please check your credentials.")
    } finally {
      setLoading(false)
    }
  }

  async function handleForgotPassword(e: React.FormEvent) {
    e.preventDefault()
    if (!forgotEmail) return
    const frontendUrl = window.location.origin
    const { error } = await supabase.auth.resetPasswordForEmail(forgotEmail, {
      redirectTo: `${frontendUrl}/reset-password`,
    })
    if (error) {
      setError("Failed to send reset link. Please try again.")
    } else {
      setForgotSent(true)
      setError("")
    }
  }

  if (showForgot) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white rounded-xl border border-border shadow-card p-8">
          <h1 className="text-2xl font-bold text-charcoal mb-2">Reset Password</h1>
          <p className="text-sm text-muted mb-6">Enter your email address and we will send you a link to reset your password.</p>
          {error && <Alert variant="error" className="mb-4">{error}</Alert>}
          {forgotSent && <Alert variant="success" className="mb-4">If an account exists with this email, a password reset link has been sent.</Alert>}
          <form onSubmit={handleForgotPassword} className="space-y-4">
            <Input label="Email Address" type="email" required value={forgotEmail} onChange={(e) => setForgotEmail(e.target.value)} placeholder="your.email@example.com" />
            <Button type="submit" className="w-full">Send Reset Link</Button>
          </form>
          <button onClick={() => { setShowForgot(false); setForgotSent(false); setError("") }} className="mt-4 text-sm text-primary hover:text-primary-dark font-medium w-full text-center">
            Back to login
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-xl border border-border shadow-card p-8">
        <h1 className="text-2xl font-bold text-charcoal mb-2">Log In</h1>
        <p className="text-sm text-muted mb-6">Access your YSSE account</p>
        {error && <Alert variant="error" className="mb-4">{error}</Alert>}
        <form onSubmit={handleLogin} className="space-y-4">
          <Input label="Email Address" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your.email@example.com" />
          <div className="relative">
            <Input label="Password" type={showPassword ? "text" : "password"} required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-9 text-xs text-muted hover:text-charcoal font-medium">
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          <div className="flex justify-end">
            <button type="button" onClick={() => setShowForgot(true)} className="text-xs text-primary hover:text-primary-dark font-medium">
              Forgot password?
            </button>
          </div>
          <Button type="submit" isLoading={loading} className="w-full">Log In</Button>
        </form>
        <p className="mt-6 text-sm text-muted text-center">
          Do not have an account?{" "}
          <Link to="/register" className="text-primary font-medium hover:text-primary-dark">Register</Link>
        </p>
      </div>
    </div>
  )
}
