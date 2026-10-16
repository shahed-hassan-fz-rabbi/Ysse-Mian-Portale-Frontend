import ResourceCrud, { publishedBadge } from "./ResourceCrud"

export default function AdminAnnouncements() {
  return (
    <ResourceCrud
      title="Announcements"
      basePath="/api/content/admin/announcements"
      columns={[
        { key: "title", label: "Title" },
        { key: "slug", label: "Slug", render: (r) => <span className="font-mono text-xs">{String(r.slug || "—")}</span> },
        {
          key: "published_at",
          label: "Published",
          render: (r) =>
            r.published_at ? new Date(String(r.published_at)).toLocaleDateString() : "—",
        },
        { key: "is_published", label: "Status", render: (r) => publishedBadge(r.is_published) },
      ]}
      fields={[
        { name: "title", label: "Title", type: "text", required: true },
        { name: "slug", label: "Slug (optional, lowercase-with-hyphens)", type: "text", placeholder: "summer-internship-2026" },
        { name: "body", label: "Content", type: "textarea", required: true },
        { name: "published_at", label: "Publication Date (used when published)", type: "date" },
        { name: "is_published", label: "Published", type: "checkbox" },
      ]}
      toRow={(v) => ({
        ...v,
        slug: v.slug || null,
        published_at: v.published_at || null,
      })}
      emptyMessage="No announcements yet."
    />
  )
}
