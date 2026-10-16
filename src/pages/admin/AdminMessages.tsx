import { useState, useEffect } from "react"
import { api, ApiError } from "../../lib/api"
import Button from "../../components/ui/Button"
import Alert from "../../components/ui/Alert"
import { useDocumentTitle } from "../../hooks/useDocumentTitle"
import { ContactMessage } from "../../types"

interface MessagesResponse {
  messages: ContactMessage[]
  total: number
  page: number
  limit: number
}

const STATUS_FILTERS = [
  { value: "all", label: "All" },
  { value: "new", label: "New" },
  { value: "read", label: "Read" },
  { value: "archived", label: "Archived" },
] as const

function statusBadge(status: ContactMessage["status"]) {
  const classes =
    status === "new"
      ? "bg-primary text-white"
      : status === "read"
        ? "bg-mint text-deep"
        : "border border-border text-muted"
  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${classes}`}>
      {status}
    </span>
  )
}

export default function AdminMessages() {
  useDocumentTitle("Messages · Admin")

  const [messages, setMessages] = useState<ContactMessage[]>([])
  const [status, setStatus] = useState<string>("all")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [actionId, setActionId] = useState<string | null>(null)
  const [detail, setDetail] = useState<ContactMessage | null>(null)

  useEffect(() => {
    let active = true
    setLoading(true)
    setError("")
    api
      .get<MessagesResponse>(`/api/admin/contact-messages?status=${status}&limit=100`)
      .then((data) => {
        if (active) {
          setMessages(data.messages)
          setError("")
        }
      })
      .catch((err: unknown) => {
        if (active) {
          setError(err instanceof ApiError ? err.message : "Failed to load messages")
        }
      })
      .finally(() => {
        if (active) setLoading(false)
      })
    return () => {
      active = false
    }
  }, [status])

  async function updateStatus(id: string, next: ContactMessage["status"]) {
    setActionId(id)
    setError("")
    setSuccess("")
    try {
      await api.patch(`/api/admin/contact-messages/${id}`, { status: next })
      setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, status: next } : m)))
      setDetail((prev) => (prev && prev.id === id ? { ...prev, status: next } : prev))
      setSuccess(`Message marked as ${next === "archived" ? "archived" : next}.`)
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Failed to update message")
    }
    setActionId(null)
  }

  const newCount = messages.filter((m) => m.status === "new").length

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-charcoal">Contact Messages</h1>
          <p className="text-sm text-muted mt-1">
            Messages submitted through the public contact form.
            {!loading && newCount > 0 && ` ${newCount} new.`}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="message-status" className="text-sm font-medium text-charcoal">
            Filter:
          </label>
          <select
            id="message-status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="rounded-lg border border-border bg-white px-3 py-2 text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
          >
            {STATUS_FILTERS.map((f) => (
              <option key={f.value} value={f.value}>
                {f.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {error && (
        <Alert variant="error" className="mb-4">
          {error}
        </Alert>
      )}
      {success && (
        <Alert variant="success" className="mb-4">
          {success}
        </Alert>
      )}

      <div className="bg-white rounded-xl border border-border overflow-hidden">
        {loading ? (
          <p className="p-6 text-muted">Loading messages...</p>
        ) : messages.length === 0 ? (
          <p className="p-6 text-muted text-center">
            {status === "all"
              ? "No contact messages yet. Messages sent from the website contact form will appear here."
              : `No ${status} messages.`}
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-warm text-left text-muted">
                <tr>
                  <th className="px-4 py-3 font-medium">From</th>
                  <th className="px-4 py-3 font-medium">Subject</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Date</th>
                  <th className="px-4 py-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {messages.map((m) => (
                  <tr key={m.id} className={m.status === "new" ? "bg-mint/40" : ""}>
                    <td className="px-4 py-3">
                      <p className="font-medium text-charcoal">{m.name}</p>
                      <p className="text-xs text-muted break-all">{m.email}</p>
                    </td>
                    <td className="px-4 py-3 text-charcoal max-w-xs truncate">{m.subject}</td>
                    <td className="px-4 py-3">{statusBadge(m.status)}</td>
                    <td className="px-4 py-3 text-muted whitespace-nowrap">
                      {new Date(m.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button
                          onClick={() => setDetail(m)}
                          className="text-primary hover:underline text-xs font-medium"
                        >
                          View
                        </button>
                        {m.status === "new" && (
                          <button
                            onClick={() => updateStatus(m.id, "read")}
                            disabled={actionId === m.id}
                            className="text-muted hover:text-charcoal text-xs font-medium disabled:opacity-50"
                          >
                            Mark Read
                          </button>
                        )}
                        {m.status !== "archived" && (
                          <button
                            onClick={() => updateStatus(m.id, "archived")}
                            disabled={actionId === m.id}
                            className="text-muted hover:text-charcoal text-xs font-medium disabled:opacity-50"
                          >
                            Archive
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Detail modal */}
      {detail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/50" onClick={() => setDetail(null)} />
          <div className="relative bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-charcoal pr-4">{detail.subject}</h2>
              <button
                onClick={() => setDetail(null)}
                aria-label="Close"
                className="text-muted hover:text-charcoal"
              >
                ✕
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-muted">From</p>
                <p className="text-charcoal">
                  {detail.name} ({detail.email})
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted">Received</p>
                <p className="text-charcoal">{new Date(detail.created_at).toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted">Message</p>
                <p className="text-charcoal whitespace-pre-wrap leading-relaxed">{detail.message}</p>
              </div>
              <div className="flex items-center gap-3 pt-2">
                {statusBadge(detail.status)}
                <div className="flex gap-2 ml-auto">
                  {detail.status === "new" && (
                    <Button
                      variant="outline"
                      onClick={() => updateStatus(detail.id, "read")}
                      disabled={actionId === detail.id}
                    >
                      Mark as Read
                    </Button>
                  )}
                  {detail.status !== "archived" ? (
                    <Button
                      variant="outline"
                      onClick={() => updateStatus(detail.id, "archived")}
                      disabled={actionId === detail.id}
                    >
                      Archive
                    </Button>
                  ) : (
                    <Button
                      variant="outline"
                      onClick={() => updateStatus(detail.id, "read")}
                      disabled={actionId === detail.id}
                    >
                      Restore
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
