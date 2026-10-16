import { useState, useEffect } from "react"
import { api, ApiError } from "../../lib/api"
import Button from "../../components/ui/Button"
import Alert from "../../components/ui/Alert"

interface AuditLog {
  id: string
  action: string
  entity_type: string
  details: Record<string, unknown> | null
  ip_address: string | null
  created_at: string
  profiles: { full_name: string } | null
}

interface LogsResponse {
  logs: AuditLog[]
  total: number
  page: number
  limit: number
}

export default function AdminAuditLogs() {
  const [logs, setLogs] = useState<AuditLog[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const limit = 50

  useEffect(() => {
    setLoading(true)
    api
      .get<LogsResponse>(`/api/admin/audit-logs?page=${page}&limit=${limit}`)
      .then((data) => {
        setLogs(data.logs)
        setTotal(data.total)
        setError("")
      })
      .catch((err) => setError(err instanceof ApiError ? err.message : "Failed to load audit logs"))
      .finally(() => setLoading(false))
  }, [page])

  const totalPages = Math.max(1, Math.ceil(total / limit))

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-charcoal">Audit Logs</h1>
          <p className="text-sm text-muted mt-1">{total} recorded administrative actions</p>
        </div>
      </div>

      {error && <Alert variant="error" className="mb-6">{error}</Alert>}

      <div className="bg-white rounded-xl border border-border overflow-hidden">
        {loading ? (
          <div className="text-center py-8 text-muted">Loading logs...</div>
        ) : logs.length === 0 ? (
          <div className="text-center py-8 text-muted">
            No administrative activity recorded yet. Admin create, update, delete,
            publish and status-change actions will appear here.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-warm">
                  <th className="text-left p-4 font-medium text-muted">Time</th>
                  <th className="text-left p-4 font-medium text-muted">Admin</th>
                  <th className="text-left p-4 font-medium text-muted">Action</th>
                  <th className="text-left p-4 font-medium text-muted">Entity</th>
                  <th className="text-left p-4 font-medium text-muted">IP</th>
                </tr>
              </thead>
              <tbody>
                {logs.map((log) => (
                  <tr key={log.id} className="border-b border-border last:border-0">
                    <td className="p-4 text-muted whitespace-nowrap">
                      {new Date(log.created_at).toLocaleString()}
                    </td>
                    <td className="p-4 text-charcoal">{log.profiles?.full_name || "Unknown"}</td>
                    <td className="p-4">
                      <span className="font-medium text-charcoal">{log.action}</span>
                    </td>
                    <td className="p-4 text-muted">{log.entity_type}</td>
                    <td className="p-4 text-muted font-mono text-xs">{log.ip_address || "—"}</td>
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
    </div>
  )
}
