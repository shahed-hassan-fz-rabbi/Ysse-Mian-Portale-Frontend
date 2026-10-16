import { useState, useEffect, ReactNode, useCallback } from "react"
import { api, ApiError } from "../../lib/api"
import Button from "../../components/ui/Button"
import Input from "../../components/ui/Input"
import Alert from "../../components/ui/Alert"
import Badge from "../../components/ui/Badge"

export interface FieldConfig {
  name: string
  label: string
  type: "text" | "textarea" | "url" | "date" | "checkbox" | "select"
  required?: boolean
  options?: { value: string; label: string }[]
  /** For select fields whose options come from another endpoint */
  loadOptions?: () => Promise<{ value: string; label: string }[]>
  placeholder?: string
}

export interface ColumnConfig {
  key: string
  label: string
  render?: (row: Record<string, unknown>) => ReactNode
}

interface ResourceCrudProps {
  title: string
  /** Backend collection endpoint, e.g. "/api/content/admin/departments" */
  basePath: string
  columns: ColumnConfig[]
  fields: FieldConfig[]
  /** Map form values → API payload (defaults to values as-is) */
  toRow?: (values: Record<string, unknown>) => Record<string, unknown>
  /** Map API row → form values (defaults to row as-is) */
  fromRow?: (row: Record<string, unknown>) => Record<string, unknown>
  emptyMessage?: string
}

const identity = (v: Record<string, unknown>) => v

export default function ResourceCrud({
  title,
  basePath,
  columns,
  fields,
  toRow = identity,
  fromRow = identity,
  emptyMessage = `No ${title.toLowerCase()} found.`,
}: ResourceCrudProps) {
  const [rows, setRows] = useState<Record<string, unknown>[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<Record<string, unknown> | null>(null)
  const [saving, setSaving] = useState(false)
  const [values, setValues] = useState<Record<string, unknown>>({})
  const [fieldOptions, setFieldOptions] = useState<Record<string, { value: string; label: string }[]>>({})

  const [confirmDelete, setConfirmDelete] = useState<Record<string, unknown> | null>(null)
  const [deleting, setDeleting] = useState(false)

  const fetchRows = useCallback(async () => {
    setLoading(true)
    try {
      const data = await api.get<Record<string, unknown>[]>(basePath)
      setRows(Array.isArray(data) ? data : [])
    } catch (err) {
      setError(err instanceof ApiError ? err.message : `Failed to load ${title.toLowerCase()}`)
      setRows([])
    }
    setLoading(false)
  }, [basePath, title])

  useEffect(() => {
    fetchRows()
  }, [fetchRows])

  async function openForm(row: Record<string, unknown> | null) {
    setEditing(row)
    setError("")
    setSuccess("")

    const source = row ? fromRow(row) : {}
    const initial: Record<string, unknown> = {}
    for (const f of fields) {
      initial[f.name] = source[f.name] ?? (f.type === "checkbox" ? false : "")
    }
    setValues(initial)

    const opts: Record<string, { value: string; label: string }[]> = {}
    for (const f of fields) {
      if (f.type === "select" && f.loadOptions) {
        try {
          opts[f.name] = await f.loadOptions()
        } catch {
          opts[f.name] = []
        }
      }
    }
    setFieldOptions(opts)
    setShowForm(true)
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError("")

    try {
      const payload = toRow(values)
      if (editing) {
        await api.put(`${basePath}/${editing.id}`, payload)
      } else {
        await api.post(basePath, payload)
      }
      setShowForm(false)
      setSuccess(editing ? "Changes saved" : "Created successfully")
      fetchRows()
    } catch (err) {
      if (err instanceof ApiError && err.details) {
        const details = err.details as { message?: string; field?: string }[]
        if (Array.isArray(details) && details.length > 0) {
          setError(details.map((d) => `${d.field ? d.field + ": " : ""}${d.message}`).join(" · "))
        } else {
          setError(err.message)
        }
      } else {
        setError(err instanceof Error ? err.message : "Failed to save")
      }
    }
    setSaving(false)
  }

  async function handleDelete() {
    if (!confirmDelete) return
    setDeleting(true)
    setError("")
    try {
      await api.delete(`${basePath}/${confirmDelete.id}`)
      setSuccess("Deleted successfully")
      fetchRows()
    } catch (err) {
      setError(
        err instanceof ApiError
          ? `${err.message} It may be referenced by other records.`
          : "Failed to delete. It may be referenced by other records.",
      )
    }
    setConfirmDelete(null)
    setDeleting(false)
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold text-charcoal">{title}</h1>
        <Button onClick={() => openForm(null)}>Add {title.replace(/s$/, "")}</Button>
      </div>

      {error && <Alert variant="error" className="mb-6">{error}</Alert>}
      {success && <Alert variant="success" className="mb-6">{success}</Alert>}

      <div className="bg-white rounded-xl border border-border overflow-hidden">
        {loading ? (
          <div className="text-center py-8 text-muted">Loading...</div>
        ) : rows.length === 0 ? (
          <div className="text-center py-8 text-muted">{emptyMessage}</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-warm">
                  {columns.map((c) => (
                    <th key={c.key} className="text-left p-4 font-medium text-muted">
                      {c.label}
                    </th>
                  ))}
                  <th className="text-left p-4 font-medium text-muted">Actions</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={String(row.id)} className="border-b border-border last:border-0">
                    {columns.map((c) => (
                      <td key={c.key} className="p-4 text-charcoal">
                        {c.render ? c.render(row) : String(row[c.key] ?? "—")}
                      </td>
                    ))}
                    <td className="p-4">
                      <div className="flex gap-3">
                        <button
                          onClick={() => openForm(row)}
                          className="text-xs text-primary hover:text-primary-dark font-medium"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => setConfirmDelete(row)}
                          className="text-xs text-red-600 hover:text-red-800 font-medium"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Form modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/50" onClick={() => setShowForm(false)} />
          <div className="relative bg-white rounded-xl shadow-card w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg font-bold text-charcoal mb-4">
              {editing ? "Edit" : "Add"} {title.replace(/s$/, "")}
            </h2>
            <form onSubmit={handleSave} className="space-y-4">
              {fields.map((f) => {
                if (f.type === "textarea") {
                  return (
                    <div key={f.name}>
                      <label htmlFor={f.name} className="block text-sm font-medium text-charcoal mb-1.5">
                        {f.label}
                        {f.required && <span className="text-red-500 ml-0.5">*</span>}
                      </label>
                      <textarea
                        id={f.name}
                        required={f.required}
                        rows={4}
                        placeholder={f.placeholder}
                        value={String(values[f.name] ?? "")}
                        onChange={(e) => setValues({ ...values, [f.name]: e.target.value })}
                        className="w-full rounded-lg border border-border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                      />
                    </div>
                  )
                }
                if (f.type === "checkbox") {
                  return (
                    <label key={f.name} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={Boolean(values[f.name])}
                        onChange={(e) => setValues({ ...values, [f.name]: e.target.checked })}
                        className="rounded border-border"
                      />
                      <span className="text-sm text-charcoal">{f.label}</span>
                    </label>
                  )
                }
                if (f.type === "select") {
                  const opts = f.options || fieldOptions[f.name] || []
                  return (
                    <div key={f.name}>
                      <label htmlFor={f.name} className="block text-sm font-medium text-charcoal mb-1.5">
                        {f.label}
                        {f.required && <span className="text-red-500 ml-0.5">*</span>}
                      </label>
                      <select
                        id={f.name}
                        required={f.required}
                        value={String(values[f.name] ?? "")}
                        onChange={(e) => setValues({ ...values, [f.name]: e.target.value })}
                        className="w-full rounded-lg border border-border px-4 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary/30"
                      >
                        <option value="">Select...</option>
                        {opts.map((o) => (
                          <option key={o.value} value={o.value}>
                            {o.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  )
                }
                const isDate = f.type === "date"
                const rawValue = String(values[f.name] ?? "")
                const inputValue = isDate && rawValue ? rawValue.split("T")[0] : rawValue
                return (
                  <Input
                    key={f.name}
                    id={f.name}
                    label={f.label}
                    required={f.required}
                    type={f.type === "url" ? "url" : isDate ? "date" : "text"}
                    placeholder={f.placeholder}
                    value={inputValue}
                    onChange={(e) =>
                      setValues({
                        ...values,
                        [f.name]:
                          isDate && e.target.value
                            ? new Date(e.target.value).toISOString()
                            : e.target.value,
                      })
                    }
                  />
                )
              })}
              <div className="flex gap-3 pt-2">
                <Button type="submit" isLoading={saving}>
                  Save
                </Button>
                <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete confirmation dialog */}
      {confirmDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/50" onClick={() => setConfirmDelete(null)} />
          <div
            role="alertdialog"
            aria-labelledby="confirm-title"
            className="relative bg-white rounded-xl shadow-card w-full max-w-md p-6"
          >
            <h2 id="confirm-title" className="text-lg font-bold text-charcoal mb-2">
              Delete {title.replace(/s$/, "")}?
            </h2>
            <p className="text-sm text-muted mb-6">
              This action cannot be undone. The record will be permanently removed.
            </p>
            <div className="flex gap-3 justify-end">
              <Button variant="outline" onClick={() => setConfirmDelete(null)}>
                Cancel
              </Button>
              <Button
                onClick={handleDelete}
                isLoading={deleting}
                className="bg-red-600 text-white hover:bg-red-700"
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export function publishedBadge(value: unknown) {
  return <Badge variant={value ? "primary" : "outline"}>{value ? "Published" : "Draft"}</Badge>
}
