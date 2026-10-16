import ResourceCrud from "./ResourceCrud"

const statusBadge = (status: unknown) => {
  const variant =
    status === "published" ? "primary" : status === "closed" ? "outline" : "mint"
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${
        variant === "primary"
          ? "bg-primary text-white"
          : variant === "mint"
            ? "bg-mint text-deep"
            : "border border-border text-muted"
      }`}
    >
      {String(status)}
    </span>
  )
}

export default function AdminInternships() {
  return (
    <ResourceCrud
      title="Internships"
      basePath="/api/content/admin/internships"
      columns={[
        { key: "title", label: "Title" },
        {
          key: "application_deadline",
          label: "Deadline",
          render: (r) =>
            r.application_deadline
              ? new Date(String(r.application_deadline)).toLocaleDateString()
              : "—",
        },
        { key: "status", label: "Status", render: (r) => statusBadge(r.status) },
      ]}
      fields={[
        { name: "title", label: "Opportunity Title", type: "text", required: true },
        { name: "description", label: "Description", type: "textarea", required: true },
        { name: "requirements", label: "Requirements", type: "textarea", required: true },
        { name: "application_deadline", label: "Application Deadline", type: "date" },
        {
          name: "status",
          label: "Status",
          type: "select",
          required: true,
          options: [
            { value: "draft", label: "Draft" },
            { value: "published", label: "Published" },
            { value: "closed", label: "Closed" },
          ],
        },
      ]}
      toRow={(v) => ({
        ...v,
        application_deadline: v.application_deadline || null,
        status: v.status || "draft",
      })}
      emptyMessage="No internship opportunities yet."
    />
  )
}
