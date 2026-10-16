import ResourceCrud, { publishedBadge } from "./ResourceCrud"
import { api } from "../../lib/api"

interface DepartmentOption {
  id: string
  name: string
}

async function loadDepartmentOptions(): Promise<{ value: string; label: string }[]> {
  const data = await api.get<DepartmentOption[]>("/api/content/admin/departments")
  return data.map((d) => ({ value: d.id, label: d.name }))
}

export default function AdminTeamMembers() {
  return (
    <ResourceCrud
      title="Team Members"
      basePath="/api/admin/team-members"
      columns={[
        { key: "name", label: "Name" },
        { key: "designation", label: "Designation" },
        {
          key: "department",
          label: "Department",
          render: (r) => {
            const dept = r.departments as { name?: string } | null
            return dept?.name || "—"
          },
        },
        { key: "display_order", label: "Order" },
        { key: "is_published", label: "Status", render: (r) => publishedBadge(r.is_published) },
      ]}
      fields={[
        { name: "name", label: "Full Name", type: "text", required: true },
        { name: "designation", label: "Designation", type: "text", required: true },
        { name: "department_id", label: "Department", type: "select", loadOptions: loadDepartmentOptions },
        { name: "bio", label: "Biography / Responsibilities", type: "textarea" },
        { name: "photo_url", label: "Photo URL", type: "url" },
        { name: "display_order", label: "Display Order", type: "text", placeholder: "0" },
        { name: "is_published", label: "Published", type: "checkbox" },
      ]}
      toRow={(v) => ({
        ...v,
        department_id: v.department_id || null,
        display_order: parseInt(String(v.display_order), 10) || 0,
      })}
      emptyMessage="No team members yet."
    />
  )
}
