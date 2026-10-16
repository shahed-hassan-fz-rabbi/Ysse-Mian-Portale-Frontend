import ResourceCrud, { publishedBadge } from "./ResourceCrud"

const toLines = (v: unknown): string[] =>
  Array.isArray(v) ? v.map(String) : String(v || "").split("\n").map((s) => s.trim()).filter(Boolean)

export default function AdminDepartments() {
  return (
    <ResourceCrud
      title="Departments"
      basePath="/api/content/admin/departments"
      columns={[
        { key: "name", label: "Name" },
        { key: "slug", label: "Slug", render: (r) => <span className="font-mono text-xs">{String(r.slug)}</span> },
        { key: "department_head", label: "Head" },
        { key: "is_published", label: "Status", render: (r) => publishedBadge(r.is_published) },
      ]}
      fields={[
        { name: "name", label: "Department Name", type: "text", required: true },
        { name: "slug", label: "Slug (lowercase-with-hyphens)", type: "text", required: true, placeholder: "social-enterprise" },
        { name: "department_head", label: "Department Head", type: "text" },
        { name: "description", label: "Description", type: "textarea", required: true },
        { name: "goals", label: "Goals (one per line)", type: "textarea", placeholder: "Goal 1\nGoal 2" },
        { name: "responsibilities", label: "Responsibilities (one per line)", type: "textarea" },
        { name: "is_published", label: "Published", type: "checkbox" },
      ]}
      toRow={(v) => ({
        ...v,
        goals: toLines(v.goals),
        responsibilities: toLines(v.responsibilities),
      })}
      fromRow={(r) => ({
        ...r,
        goals: toLines(r.goals).join("\n"),
        responsibilities: toLines(r.responsibilities).join("\n"),
      })}
      emptyMessage="No departments yet. Create the first one."
    />
  )
}
