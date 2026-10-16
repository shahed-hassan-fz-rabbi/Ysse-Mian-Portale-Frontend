import { useState, useEffect, useRef } from "react"
import { api, ApiError } from "../../lib/api"
import { useAuth } from "../../context/AuthContext"
import Button from "../../components/ui/Button"
import Alert from "../../components/ui/Alert"
import Badge from "../../components/ui/Badge"

interface User {
  id: string
  full_name: string
  phone: string | null
  role: "user" | "admin"
  created_at: string
}

interface UsersResponse {
  users: User[]
  total: number
  page: number
  limit: number
}

export default function AdminUsers() {
  const { user: me } = useAuth()
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [updating, setUpdating] = useState<string | null>(null)
  const debounceRef = useRef<ReturnType<typeof setTimeout>>()
  const limit = 20

  async function fetchUsers(pageNum: number, term: string) {
    setLoading(true)
    try {
      const params = new URLSearchParams({ page: String(pageNum), limit: String(limit) })
      if (term) params.set("search", term)
      const data = await api.get<UsersResponse>(`/api/admin/users?${params}`)
      setUsers(data.users)
      setTotal(data.total)
      setError("")
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Failed to load users")
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchUsers(page, search)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page])

  function handleSearch(value: string) {
    setSearch(value)
    setPage(1)
    clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => fetchUsers(1, value), 400)
  }

  async function handleRoleChange(userId: string, newRole: "user" | "admin") {
    setUpdating(userId)
    setError("")
    setSuccess("")

    try {
      await api.patch(`/api/admin/users/${userId}/role`, { role: newRole })
      setSuccess("Role updated")
      fetchUsers(page, search)
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Failed to update role")
    }
    setUpdating(null)
  }

  const totalPages = Math.max(1, Math.ceil(total / limit))

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-charcoal">Users</h1>
          <p className="text-sm text-muted mt-1">{total} registered users</p>
        </div>
        <input
          type="search"
          placeholder="Search by name or phone..."
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
          aria-label="Search users"
          className="rounded-lg border border-border bg-white px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
        />
      </div>

      {error && <Alert variant="error" className="mb-6">{error}</Alert>}
      {success && <Alert variant="success" className="mb-6">{success}</Alert>}

      <div className="bg-white rounded-xl border border-border overflow-hidden">
        {loading ? (
          <div className="text-center py-8 text-muted">Loading users...</div>
        ) : users.length === 0 ? (
          <div className="text-center py-8 text-muted">No users found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-warm">
                  <th className="text-left p-4 font-medium text-muted">Name</th>
                  <th className="text-left p-4 font-medium text-muted">Phone</th>
                  <th className="text-left p-4 font-medium text-muted">Role</th>
                  <th className="text-left p-4 font-medium text-muted">Joined</th>
                  <th className="text-left p-4 font-medium text-muted">Change Role</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => {
                  const isSelf = u.id === me?.id
                  return (
                    <tr key={u.id} className="border-b border-border last:border-0">
                      <td className="p-4 font-medium text-charcoal">
                        {u.full_name}
                        {isSelf && <span className="ml-2 text-xs text-muted">(you)</span>}
                      </td>
                      <td className="p-4 text-muted">{u.phone || "—"}</td>
                      <td className="p-4">
                        <Badge variant={u.role === "admin" ? "primary" : "mint"}>{u.role}</Badge>
                      </td>
                      <td className="p-4 text-muted">{new Date(u.created_at).toLocaleDateString()}</td>
                      <td className="p-4">
                        <select
                          value={u.role}
                          aria-label={`Role for ${u.full_name}`}
                          onChange={(e) => handleRoleChange(u.id, e.target.value as "user" | "admin")}
                          disabled={updating === u.id || isSelf}
                          className="text-xs border border-border rounded-lg px-2 py-1 bg-white disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <option value="user">User</option>
                          <option value="admin">Admin</option>
                        </select>
                      </td>
                    </tr>
                  )
                })}
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
