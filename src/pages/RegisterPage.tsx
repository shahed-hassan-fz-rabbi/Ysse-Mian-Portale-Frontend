import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import Input from "../components/ui/Input"
import Button from "../components/ui/Button"
import Alert from "../components/ui/Alert"

export default function RegisterPage() {
  const { register } = useAuth()
  const navigate = useNavigate()

  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [agreeTerms, setAgreeTerms] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const passwordRequirements = [
    { label: "At least 8 characters", valid: password.length >= 8 },
    { label: "One uppercase letter", valid: /[A-Z]/.test(password) },
    { label: "One lowercase letter", valid: /[a-z]/.test(password) },
    { label: "One number", valid: /[0-9]/.test(password) },
  ]

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")

    if (!fullName.trim()) { setError("Full name is required"); return }
    if (!email.trim()) { setError("Email is required"); return }
    if (password.length < 8) { setError("Password must be at least 8 characters"); return }
    if (password !== confirmPassword) { setError("Passwords do not match"); return }
    if (!agreeTerms) { setError("You must agree to the terms and privacy policy"); return }

    setLoading(true)
    try {
      await register(email, password, fullName, phone || undefined)
      navigate("/login")
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message || "Registration failed. Please try again." : "Registration failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md bg-white rounded-xl border border-border shadow-card p-8">
        <h1 className="text-2xl font-bold text-charcoal mb-2">Create Account</h1>
        <p className="text-sm text-muted mb-6">Join the YSSE community</p>
        {error && <Alert variant="error" className="mb-4">{error}</Alert>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input label="Full Name" required value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Enter your full name" />
          <Input label="Email Address" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your.email@example.com" />
          <Input label="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+1 (555) 000-0000" />
          <div className="relative">
            <Input label="Password" type={showPassword ? "text" : "password"} required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Create a password" />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-9 text-xs text-muted hover:text-charcoal font-medium">
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          {password && (
            <ul className="space-y-1">
              {passwordRequirements.map((req) => (
                <li key={req.label} className={`text-xs flex items-center gap-1.5 ${req.valid ? "text-green-600" : "text-muted"}`}>
                  <span className={`h-1.5 w-1.5 rounded-full ${req.valid ? "bg-green-500" : "bg-gray-300"}`}></span>
                  {req.label}
                </li>
              ))}
            </ul>
          )}
          <Input label="Confirm Password" type={showPassword ? "text" : "password"} required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm your password" />
          <label className="flex items-start gap-2 cursor-pointer">
            <input type="checkbox" checked={agreeTerms} onChange={(e) => setAgreeTerms(e.target.checked)} className="mt-0.5 rounded border-border" />
            <span className="text-xs text-muted">I agree to the Terms of Service and Privacy Policy</span>
          </label>
          <Button type="submit" isLoading={loading} className="w-full">Create Account</Button>
        </form>
        <p className="mt-6 text-sm text-muted text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-primary font-medium hover:text-primary-dark">Log in</Link>
        </p>
      </div>
    </div>
  )
}
