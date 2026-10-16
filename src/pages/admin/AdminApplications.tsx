import { useState, useEffect, useRef } from "react"
import { api, ApiError } from "../../lib/api"
import Button from "../../components/ui/Button"
import Alert from "../../components/ui/Alert"
import Badge from "../../components/ui/Badge"

interface Application {
  id: string
  status: string
  cover_letter: string
  skills: string | null
  resume_url: string | null
  created_at: string
  internship_opportunities: { title: string } | null
  profiles: { full_name: string; email: string } | null
}

interface ApplicationDetail extends Application {
  reviews: { id: string; note: string; created_at: string; profiles: { full_name: string } | null }[]
  history: {
    id: string
    old_status: string | null
    new_status: string
    note: string | null
    created_at: string
    profiles: { full_name: string } | null
  }[]
}

interface ListResponse {
  applications: Application[]
  total: number
  page: number
  limit: number
}

const STATUS_OPTIONS = ["submitted", "under_review", "shortlisted", "interview", "selected", "rejected"]

/** Mirrors backend transition rules so invalid options are disabled client-side. */
const ALLOWED_TRANSITIONS: Record<string, string[]> = {
  submitted: ["submitted", "under_review", "shortlisted", "rejected"],
  under_review: ["under_review", "shortlisted", "interview", "rejected"],
  shortlisted: ["shortlisted", "interview", "rejected"],
  interview: ["interview", "selected", "rejected"],
  selected: ["selected"],
  rejected: ["rejected"],
}

const statusVariant: Record<string, "primary" | "deep" | "mint" | "outline"> = {
  submitted: "primary",
  under_review: "deep",
  shortlisted: "mint",
  interview: "primary",
  selected: "mint",
  rejected: "outline",
}

export default function AdminApplications() {
  const [applications, setApplications] = useState<Application[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)

  const [detail, setDetail] = useState<ApplicationDetail | null>(null)
  const [detailLoading, setDetailLoading] = useState(false)
  const [newStatus, setNewStatus] = useState("")
  const [note, setNote] = useState("")
  const [updating, setUpdating] = useState(false)

  const debounceRef = useRef<ReturnType<typeof setTimeout>>()
  const limit = 20

  async function fetchApplications(pageNum: number, status: string, term: string) {
    setLoading(true)
    try {
      const params = new URLSearchParams({ page: String(pageNum), limit: String(limit) })
      if (status !== "all") params.set("status", status)
      if (term) params.set("search", term)
      const data = await api.get<ListResponse>(`/api/admin/applications?${params}`)
      setApplications(data.applications)
      setTotal(data.total)
      setError("")
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Failed to load applications")
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchApplications(page, statusFilter, search)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, statusFilter])

  function handleSearch(value: string) {
    setSearch(value)
    setPage(1)
    clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => fetchApplications(1, statusFilter, value), 400)
  }

  async function openDetail(app: Application) {
    setDetailLoading(true)
    setNote("")
    setError("")
    try {
      const data = await api.get<ApplicationDetail>(`/api/admin/applications/${app.id}`)
      setDetail(data)
      setNewStatus(data.status)
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Failed to load application")
    }
    setDetailLoading(false)
  }

  async function handleStatusUpdate() {
    if (!detail || !newStatus) return
    setUpdating(true)
    setError("")
    setSuccess("")
    try {
      await api.patch(`/api/admin/applications/${detail.id}/status`, {
        status: newStatus,
        note: note.trim() || undefined,
      })
      setSuccess("Application status updated")
      setDetail(null)
      fetchApplications(page, statusFilter, search)
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Failed to update status")
    }
    setUpdating(false)
  }

  const totalPages = Math.max(1, Math.ceil(total / limit))

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-charcoal">Applications</h1>
          <p className="text-sm text-muted mt-1">{total} total applications</p>
        </div>
        <div className="flex items-center gap-3">
          <input
            type="search"
            placeholder="Search cover letter or skills..."
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            aria-label="Search applications"
            className="rounded-lg border border-border bg-white px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
          <select
            value={statusFilter}
            aria-label="Filter by status"
            onChange={(e) => {
              setStatusFilter(e.target.value)
              setPage(1)
            }}
            className="text-sm border border-border rounded-lg px-3 py-2 bg-white"
          >
            <option value="all">All Statuses</option>
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {s.replace("_", " ")}
              </option>
            ))}
          </select>
        </div>
      </div>

      {error && <Alert variant="error" className="mb-6">{error}</Alert>}
      {success && <Alert variant="success" className="mb-6">{success}</Alert>}

      <div className="bg-white rounded-xl border border-border overflow-hidden">
        {loading ? (
          <div className="text-center py-8 text-muted">Loading applications...</div>
        ) : applications.length === 0 ? (
          <div className="text-center py-8 text-muted">No applications found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-warm">
                  <th className="text-left p-4 font-medium text-muted">Applicant</th>
                  <th className="text-left p-4 font-medium text-muted">Opportunity</th>
                  <th className="text-left p-4 font-medium text-muted">Status</th>
                  <th className="text-left p-4 font-medium text-muted">Date</th>
                  <th className="text-left p-4 font-medium text-muted">Actions</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((app) => (
                  <tr key={app.id} className="border-b border-border last:border-0">
                    <td className="p-4">
                      <p className="font-medium text-charcoal">{app.profiles?.full_name || "Unknown"}</p>
                      <p className="text-xs text-muted">{app.profiles?.email}</p>
                    </td>
                    <td className="p-4 text-charcoal">{app.internship_opportunities?.title || "—"}</td>
                    <td className="p-4">
                      <Badge variant={statusVariant[app.status] || "outline"}>
                        {app.status.replace("_", " ")}
                      </Badge>
                    </td>
                    <td className="p-4 text-muted">{new Date(app.created_at).toLocaleDateString()}</td>
                    <td className="p-4">
                      <Button variant="outline" size="sm" onClick={() => openDetail(app)}>
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex items-center justify-between p-4 border-t border-border">
            <p className="text-sm text-muted">
              Page {page} of {totalPages}
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage(Math.max(1, page - 1))}
                disabled={page === 1}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage(Math.min(totalPages, page + 1))}
                disabled={page === totalPages}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Detail modal */}
      {(detail || detailLoading) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/50" onClick={() => setDetail(null)} />
          <div className="relative bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-charcoal">Application Details</h2>
              <button
                onClick={() => setDetail(null)}
                aria-label="Close"
                className="text-muted hover:text-charcoal"
              >
                ✕
              </button>
            </div>

            {detailLoading || !detail ? (
              <p className="text-muted py-6">Loading...</p>
            ) : (
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-muted">Applicant</p>
                  <p className="text-charcoal">
                    {detail.profiles?.full_name} ({detail.profiles?.email})
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted">Opportunity</p>
                  <p className="text-charcoal">{detail.internship_opportunities?.title}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted">Cover Letter</p>
                  <p className="text-charcoal whitespace-pre-wrap">{detail.cover_letter || "—"}</p>
                </div>
                {detail.skills && (
                  <div>
                    <p className="text-sm font-medium text-muted">Skills</p>
                    <p className="text-charcoal whitespace-pre-wrap">{detail.skills}</p>
                  </div>
                )}
                <div>
                  <p className="text-sm font-medium text-muted">Current Status</p>
                  <Badge variant={statusVariant[detail.status] || "outline"}>
                    {detail.status.replace("_", " ")}
                  </Badge>
                </div>

                {/* Status update */}
                <div className="pt-4 border-t border-border">
                  <label htmlFor="status-select" className="block text-sm font-medium text-charcoal mb-2">
                    Update Status
                  </label>
                  <div className="flex gap-2">
                    <select
                      id="status-select"
                      value={newStatus}
                      onChange={(e) => setNewStatus(e.target.value)}
                      className="flex-1 text-sm border border-border rounded-lg px-3 py-2 bg-white"
                    >
                      {STATUS_OPTIONS.map((s) => {
                        const allowed = ALLOWED_TRANSITIONS[detail.status] || []
                        return (
                          <option key={s} value={s} disabled={!allowed.includes(s)}>
                            {s.replace("_", " ")}
                            {!allowed.includes(s) ? " (not allowed)" : ""}
                          </option>
                        )
                      })}
                    </select>
                    <Button size="sm" isLoading={updating} onClick={handleStatusUpdate}>
                      Update
                    </Button>
                  </div>
                  <textarea
                    id="review-note"
                    placeholder="Internal review note (optional, stored in review history)"
                    rows={2}
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    className="mt-2 w-full rounded-lg border border-border px-3 py-2 text-sm"
                  />
                </div>

                {/* Status history */}
                {detail.history.length > 0 && (
                  <div className="pt-4 border-t border-border">
                    <p className="text-sm font-medium text-charcoal mb-2">Status History</p>
                    <ul className="space-y-2">
                      {detail.history.map((h) => (
                        <li key={h.id} className="text-xs text-muted">
                          {h.old_status ? `${h.old_status} → ` : ""}
                          <span className="text-charcoal font-medium">{h.new_status}</span>
                          {" by "}
                          {h.profiles?.full_name || "Unknown"}
                          {" · "}
                          {new Date(h.created_at).toLocaleString()}
                          {h.note && <span className="block italic">"{h.note}"</span>}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Review notes */}
                {detail.reviews.length > 0 && (
                  <div className="pt-4 border-t border-border">
                    <p className="text-sm font-medium text-charcoal mb-2">Review Notes</p>
                    <ul className="space-y-2">
                      {detail.reviews.map((r) => (
                        <li key={r.id} className="text-xs text-muted">
                          <span className="text-charcoal">{r.note}</span>
                          {" — "}
                          {r.profiles?.full_name || "Unknown"}
                          {" · "}
                          {new Date(r.created_at).toLocaleString()}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
