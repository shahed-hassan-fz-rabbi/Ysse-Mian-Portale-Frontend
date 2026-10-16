import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"
import { useDocumentTitle } from "../hooks/useDocumentTitle"
import { api, ApiError } from "../lib/api"
import { InternshipOpportunity } from "../types"
import { isDeadlinePassed, formatDate } from "../utils/format"
import Badge from "../components/ui/Badge"
import PageHeader from "../components/shared/PageHeader"
import { SkeletonGrid } from "../components/ui/Skeleton"
import CTASection from "../components/shared/CTASection"

export default function InternshipsPage() {
  useDocumentTitle("Internship Opportunities")

  const [internships, setInternships] = useState<InternshipOpportunity[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    fetchInternships()
  }, [])

  async function fetchInternships() {
    setLoading(true)
    try {
      const data = await api.get<InternshipOpportunity[]>("/api/content/internships")
      setInternships(data || [])
      setError("")
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Failed to load internships")
    }
    setLoading(false)
  }

  return (
    <div>
      <PageHeader
        eyebrow="Join us"
        title="Virtual Internship Opportunities"
        description="Gain practical experience in the social entrepreneurship sector through our virtual internship program."
      />

      <section className="bg-white">
        <div className="container-site section-padding">
          {loading ? (
            <SkeletonGrid
              count={4}
              lines={2}
              withBadge
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            />
          ) : error ? (
            <div className="text-center py-8 text-red-600" role="alert">
              {error}
            </div>
          ) : internships.length === 0 ? (
            <div className="text-center py-12 border border-dashed border-border rounded-xl bg-warm">
              <p className="text-muted max-w-md mx-auto">
                No internship opportunities are open right now. New positions
                are posted when recruitment rounds begin.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {internships.map((item) => {
                const closed = isDeadlinePassed(item.application_deadline)
                return (
                  <Link
                    key={item.id}
                    to={`/internships/${item.id}`}
                    className="group block bg-white rounded-xl border border-border shadow-card p-6 hover:shadow-card-hover transition-shadow duration-200"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      {closed ? (
                        <Badge variant="outline">Applications Closed</Badge>
                      ) : (
                        <Badge variant="mint">Open for Applications</Badge>
                      )}
                    </div>
                    <h3 className="font-semibold text-charcoal text-lg mb-2 group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted leading-relaxed line-clamp-2">
                      {item.description}
                    </p>
                    <p className="mt-3 text-xs text-muted">
                      {item.application_deadline
                        ? closed
                          ? `Deadline was ${formatDate(item.application_deadline)}`
                          : `Apply by ${formatDate(item.application_deadline)}`
                        : "Rolling deadline"}
                    </p>
                    <div className="mt-4 flex items-center gap-1.5 text-sm font-medium text-primary">
                      View details
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                )
              })}
            </div>
          )}
        </div>
      </section>

      <CTASection
        title="Ready to Apply?"
        description="Complete your application and take the first step toward gaining meaningful experience."
        primaryAction={{ label: "Apply Now", to: "/apply" }}
        secondaryAction={{ label: "Contact Us", to: "/contact" }}
      />
    </div>
  )
}
