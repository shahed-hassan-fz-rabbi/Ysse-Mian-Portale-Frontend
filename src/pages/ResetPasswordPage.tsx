import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { supabase } from "../lib/supabase"
import Input from "../components/ui/Input"
import Button from "../components/ui/Button"
import Alert from "../components/ui/Alert"

export default function ResetPasswordPage() {
  const navigate = useNavigate()
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const passwordRequirements = [
    { label: "At least 8 characters", valid: password.length >= 8 },
    { label: "One uppercase letter", valid: /[A-Z]/.test(password) },
    { label: "One lowercase letter", valid: /[a-z]/.test(password) },
    { label: "One number", valid: /[0-9]/.test(password) },
  ]

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")

    if (password.length < 8) { setError("Password must be at least 8 characters"); return }
    if (password !== confirmPassword) { setError("Passwords do not match"); return }

    setLoading(true)
    const { error } = await supabase.auth.updateUser({ password })
    setLoading(false)

    if (error) {
      setError(error.message || "Failed to reset password. The link may have expired.")
    } else {
      setSuccess(true)
    }
  }

  if (success) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white rounded-xl border border-border shadow-card p-8 text-center">
          <Alert variant="success" className="mb-6">Your password has been reset successfully.</Alert>
          <Button onClick={() => navigate("/login")} className="w-full">Go to Login</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-xl border border-border shadow-card p-8">
        <h1 className="text-2xl font-bold text-charcoal mb-2">Reset Password</h1>
        <p className="text-sm text-muted mb-6">Enter your new password below.</p>
        {error && <Alert variant="error" className="mb-4">{error}</Alert>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Input label="New Password" type={showPassword ? "text" : "password"} required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter new password" />
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
          <Input label="Confirm New Password" type={showPassword ? "text" : "password"} required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm new password" />
          <Button type="submit" isLoading={loading} className="w-full">Reset Password</Button>
        </form>
      </div>
    </div>
  )
}
