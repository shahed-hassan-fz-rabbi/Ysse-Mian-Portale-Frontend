import ResourceCrud, { publishedBadge } from "./ResourceCrud"

export default function AdminCourses() {
  return (
    <ResourceCrud
      title="Courses"
      basePath="/api/content/admin/courses"
      columns={[
        { key: "title", label: "Title" },
        { key: "category", label: "Category" },
        { key: "is_published", label: "Status", render: (r) => publishedBadge(r.is_published) },
      ]}
      fields={[
        { name: "title", label: "Course Title", type: "text", required: true },
        { name: "category", label: "Category", type: "text", required: true, placeholder: "e.g. Entrepreneurship" },
        { name: "description", label: "Description", type: "textarea", required: true },
        { name: "thumbnail_url", label: "Thumbnail URL", type: "url" },
        { name: "recording_url", label: "Recording URL", type: "url" },
        { name: "resource_url", label: "Learning Resource URL", type: "url" },
        { name: "is_published", label: "Published", type: "checkbox" },
      ]}
      emptyMessage="No courses yet."
    />
  )
}
