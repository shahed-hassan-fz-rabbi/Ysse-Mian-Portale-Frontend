import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { api, ApiError } from "../lib/api"
import Alert from "../components/ui/Alert"
import Badge from "../components/ui/Badge"

interface DashboardCounts {
  totalUsers: number
  totalDepartments: number
  totalTeamMembers: number
  publishedCourses: number
  publishedAnnouncements: number
  openInternships: number
  totalApplications: number
  awaitingReview: number
}

interface DashboardData {
  counts: DashboardCounts
  recentApplications: RecentApplication[]
  recentActivity: RecentActivity[]
}

interface RecentApplication {
  id: string
  status: string
  created_at: string
  internship_opportunities: { title: string } | null
  profiles: { full_name: string } | null
}

interface RecentActivity {
  id: string
  action: string
  entity_type: string
  created_at: string
  profiles: { full_name: string } | null
}

const statusVariant: Record<string, "primary" | "deep" | "mint" | "outline"> = {
  submitted: "primary",
  under_review: "deep",
  shortlisted: "mint",
  interview: "primary",
  selected: "mint",
  rejected: "outline",
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardCounts | null>(null)
  const [recentApps, setRecentApps] = useState<RecentApplication[]>([])
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    fetchDashboardData()
  }, [])

  async function fetchDashboardData() {
    setLoading(true)
    setError("")

    try {
      const data = await api.get<DashboardData>("/api/admin/dashboard")
      setStats(data.counts)
      setRecentApps(data.recentApplications || [])
      setRecentActivity(data.recentActivity || [])
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Failed to load dashboard data")
    }

    setLoading(false)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[40vh]">
        <div className="text-muted">Loading dashboard...</div>
      </div>
    )
  }

  const statCards = stats
    ? [
        { label: "Registered Users", value: stats.totalUsers, link: "/admin/users" },
        { label: "Departments", value: stats.totalDepartments, link: "/admin/departments" },
        { label: "Team Members", value: stats.totalTeamMembers, link: "/admin/team-members" },
        { label: "Published Courses", value: stats.publishedCourses, link: "/admin/courses" },
        { label: "Published Announcements", value: stats.publishedAnnouncements, link: "/admin/announcements" },
        { label: "Open Internships", value: stats.openInternships, link: "/admin/internships" },
        { label: "Total Applications", value: stats.totalApplications, link: "/admin/applications" },
        { label: "Awaiting Review", value: stats.awaitingReview, link: "/admin/applications" },
      ]
    : []

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-charcoal">Dashboard</h1>
        <button
          onClick={fetchDashboardData}
          className="text-sm text-primary hover:text-primary-dark font-medium"
        >
          Refresh
        </button>
      </div>

      {error && <Alert variant="error" className="mb-6">{error}</Alert>}

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((stat) => (
          <Link
            key={stat.label}
            to={stat.link}
            className="bg-white rounded-xl border border-border p-5 hover:border-primary/40 transition-colors"
          >
            <p className="text-sm text-muted mb-1">{stat.label}</p>
            <p className="text-3xl font-bold text-charcoal">{stat.value}</p>
          </Link>
        ))}
      </div>

      {stats && stats.totalApplications === 0 && (
        <div className="bg-white rounded-xl border border-border p-6 mb-8 text-center">
          <p className="text-charcoal font-medium mb-1">No applications yet</p>
          <p className="text-sm text-muted">
            When candidates apply to internship opportunities, they will appear here.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent applications */}
        <section className="bg-white rounded-xl border border-border">
          <div className="flex items-center justify-between p-4 border-b border-border">
            <h2 className="font-semibold text-charcoal">Recent Applications</h2>
            <Link to="/admin/applications" className="text-xs text-primary hover:text-primary-dark font-medium">
              View all
            </Link>
          </div>
          {recentApps.length === 0 ? (
            <p className="p-4 text-sm text-muted">No applications yet.</p>
          ) : (
            <ul className="divide-y divide-border">
              {recentApps.map((app) => (
                <li key={app.id} className="p-4 flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-charcoal truncate">
                      {app.profiles?.full_name || "Unknown applicant"}
                    </p>
                    <p className="text-xs text-muted truncate">
                      {app.internship_opportunities?.title || "Opportunity removed"}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <Badge variant={statusVariant[app.status] || "outline"}>
                      {app.status.replace(/_/g, " ")}
                    </Badge>
                    <span className="text-xs text-muted whitespace-nowrap">
                      {new Date(app.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Recent admin activity */}
        <section className="bg-white rounded-xl border border-border">
          <div className="flex items-center justify-between p-4 border-b border-border">
            <h2 className="font-semibold text-charcoal">Recent Administrative Activity</h2>
            <Link to="/admin/audit-logs" className="text-xs text-primary hover:text-primary-dark font-medium">
              View all
            </Link>
          </div>
          {recentActivity.length === 0 ? (
            <p className="p-4 text-sm text-muted">No administrative activity recorded yet.</p>
          ) : (
            <ul className="divide-y divide-border">
              {recentActivity.map((log) => (
                <li key={log.id} className="p-4 flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-sm text-charcoal truncate">
                      <span className="font-medium">{log.action}</span> on {log.entity_type}
                    </p>
                    <p className="text-xs text-muted">by {log.profiles?.full_name || "Unknown"}</p>
                  </div>
                  <span className="text-xs text-muted whitespace-nowrap">
                    {new Date(log.created_at).toLocaleString()}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  )
}
