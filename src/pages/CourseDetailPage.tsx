import { useState, useEffect } from "react"
import { useParams, Link, Navigate } from "react-router-dom"
import { ArrowLeft, ExternalLink } from "lucide-react"
import { useDocumentTitle } from "../hooks/useDocumentTitle"
import { api } from "../lib/api"
import { Course } from "../types"
import Badge from "../components/ui/Badge"
import CTASection from "../components/shared/CTASection"

export default function CourseDetailPage() {
  const { id } = useParams<{ id: string }>()
  useDocumentTitle("Course Details")

  const [course, setCourse] = useState<Course | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    fetchCourse()
  }, [id])

  async function fetchCourse() {
    setLoading(true)
    try {
      const data = await api.get<Course>(`/api/content/courses/${id}`)
      setCourse(data)
      setError("")
    } catch {
      setError("Course not found")
    }
    setLoading(false)
  }

  if (loading) {
    return <div className="container-site py-16 text-center text-muted">Loading...</div>
  }

  if (error || !course) {
    return <Navigate to="/courses" replace />
  }

  return (
    <div>
      <section className="bg-warm">
        <div className="container-site py-12 md:py-16">
          <Link to="/courses" className="inline-flex items-center gap-2 text-sm text-muted hover:text-primary transition-colors mb-6">
            <ArrowLeft className="h-4 w-4" />
            Back to Courses
          </Link>
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <Badge variant="mint">{course.category}</Badge>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-charcoal tracking-tight">{course.title}</h1>
          <p className="mt-4 text-lg text-muted leading-relaxed max-w-3xl">{course.description}</p>
        </div>
      </section>

      <section className="bg-white">
        <div className="container-site section-padding">
          <div className="max-w-3xl">
            <h2 className="text-xl font-bold text-charcoal mb-4">Course Resources</h2>
            {course.recording_url && (
              <div className="mb-4">
                <a href={course.recording_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-primary hover:text-primary-dark font-medium">
                  <ExternalLink className="h-4 w-4" />
                  Watch Recording
                </a>
              </div>
            )}
            {course.resource_url && (
              <div className="mb-4">
                <a href={course.resource_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-primary hover:text-primary-dark font-medium">
                  <ExternalLink className="h-4 w-4" />
                  View Resources
                </a>
              </div>
            )}
            {!course.recording_url && !course.resource_url && (
              <p className="text-muted">No resources available for this course yet.</p>
            )}
          </div>
        </div>
      </section>

      <CTASection
        title="Want to Apply Your Learning?"
        description="Our virtual internship program gives you the opportunity to apply your skills in a real organizational context."
        primaryAction={{ label: "View Internships", to: "/internships" }}
        secondaryAction={{ label: "Apply Now", to: "/apply" }}
      />
    </div>
  )
}
