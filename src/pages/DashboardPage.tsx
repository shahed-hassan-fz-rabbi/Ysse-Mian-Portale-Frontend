import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { api, ApiError } from "../lib/api"
import { formatDate } from "../utils/format"
import Button from "../components/ui/Button"
import Alert from "../components/ui/Alert"
import Input from "../components/ui/Input"

interface Application {
  id: string
  opportunity_id: string
  status: string
  created_at: string
  internship_opportunities?: { title: string } | null
}

export default function DashboardPage() {
  const { user, logout, refreshProfile } = useAuth()
  const [applications, setApplications] = useState<Application[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [editing, setEditing] = useState(false)
  const [fullName, setFullName] = useState(user?.full_name || "")
  const [phone, setPhone] = useState(user?.phone || "")
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetchApplications()
  }, [])

  async function fetchApplications() {
    if (!user) return
    setLoading(true)
    try {
      // Backend returns only the caller's own applications
      const data = await api.get<Application[]>("/api/applications/my")
      setApplications(data || [])
      setError("")
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Failed to load applications")
    }
    setLoading(false)
  }

  async function handleSaveProfile(e: React.FormEvent) {
    e.preventDefault()
    if (!user) return
    setSaving(true)
    setError("")

    try {
      await api.patch("/api/auth/profile", { full_name: fullName, phone: phone || null })
      setEditing(false)
      await refreshProfile()
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Failed to update profile")
    }
    setSaving(false)
  }

  async function handleLogout() {
    await logout()
  }

  const statusColors: Record<string, string> = {
    submitted: "bg-blue-100 text-blue-800",
    under_review: "bg-yellow-100 text-yellow-800",
    shortlisted: "bg-purple-100 text-purple-800",
    interview: "bg-indigo-100 text-indigo-800",
    selected: "bg-green-100 text-green-800",
    rejected: "bg-red-100 text-red-800",
  }

  return (
    <div className="container-site py-8 md:py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-charcoal mb-2">Dashboard</h1>
        <p className="text-muted mb-8">Welcome back, {user?.full_name}</p>

        {error && <Alert variant="error" className="mb-6">{error}</Alert>}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Profile Section */}
          <div className="bg-white rounded-xl border border-border p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-charcoal">Profile</h2>
              {!editing && (
                <button onClick={() => setEditing(true)} className="text-sm text-primary hover:text-primary-dark font-medium">
                  Edit
                </button>
              )}
            </div>
            {editing ? (
              <form onSubmit={handleSaveProfile} className="space-y-4">
                <Input label="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                <Input label="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                <div className="flex gap-3">
                  <Button type="submit" isLoading={saving}>Save</Button>
                  <Button type="button" variant="outline" onClick={() => { setEditing(false); setFullName(user?.full_name || ""); setPhone(user?.phone || "") }}>
                    Cancel
                  </Button>
                </div>
              </form>
            ) : (
              <dl className="space-y-3">
                <div>
                  <dt className="text-xs text-muted">Name</dt>
                  <dd className="text-sm font-medium text-charcoal">{user?.full_name}</dd>
                </div>
                <div>
                  <dt className="text-xs text-muted">Role</dt>
                  <dd className="text-sm font-medium text-charcoal capitalize">{user?.role}</dd>
                </div>
                <div>
                  <dt className="text-xs text-muted">Phone</dt>
                  <dd className="text-sm font-medium text-charcoal">{user?.phone || "Not set"}</dd>
                </div>
              </dl>
            )}
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl border border-border p-6">
            <h2 className="text-lg font-semibold text-charcoal mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <Link to="/internships" className="block p-3 rounded-lg border border-border hover:bg-mint transition-colors">
                <span className="text-sm font-medium text-charcoal">Browse Internships</span>
              </Link>
              <Link to="/courses" className="block p-3 rounded-lg border border-border hover:bg-mint transition-colors">
                <span className="text-sm font-medium text-charcoal">View Courses</span>
              </Link>
              <button onClick={handleLogout} className="w-full text-left p-3 rounded-lg border border-border hover:bg-red-50 transition-colors">
                <span className="text-sm font-medium text-red-600">Sign Out</span>
              </button>
            </div>
          </div>
        </div>

        {/* Applications Section */}
        <div className="bg-white rounded-xl border border-border p-6">
          <h2 className="text-lg font-semibold text-charcoal mb-4">My Applications</h2>
          {loading ? (
            <p className="text-sm text-muted">Loading...</p>
          ) : applications.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-sm text-muted mb-4">You have not submitted any applications yet.</p>
              <Link to="/internships" className="text-sm text-primary hover:text-primary-dark font-medium">
                Browse opportunities
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 font-medium text-muted">Opportunity</th>
                    <th className="text-left py-2 font-medium text-muted">Status</th>
                    <th className="text-left py-2 font-medium text-muted">Applied On</th>
                  </tr>
                </thead>
                <tbody>
                  {applications.map((app) => (
                    <tr key={app.id} className="border-b border-border last:border-0">
                      <td className="py-3 font-medium text-charcoal">
                        {app.internship_opportunities?.title ? (
                          <Link
                            to={`/internships/${app.opportunity_id}`}
                            className="hover:text-primary hover:underline underline-offset-2"
                          >
                            {app.internship_opportunities.title}
                          </Link>
                        ) : (
                          <span className="text-muted">Removed opportunity</span>
                        )}
                      </td>
                      <td className="py-3">
                        <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium capitalize ${statusColors[app.status] || "bg-gray-100 text-gray-800"}`}>
                          {app.status.replace(/_/g, " ")}
                        </span>
                      </td>
                      <td className="py-3 text-muted">{formatDate(app.created_at)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
