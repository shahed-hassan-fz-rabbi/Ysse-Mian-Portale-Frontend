import { useState, useEffect } from "react"
import { useParams, Link, Navigate } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import { useDocumentTitle } from "../hooks/useDocumentTitle"
import { api } from "../lib/api"
import { InternshipOpportunity } from "../types"
import { isDeadlinePassed, formatDate } from "../utils/format"
import Badge from "../components/ui/Badge"
import Button from "../components/ui/Button"
import CTASection from "../components/shared/CTASection"

export default function InternshipDetailPage() {
  const { id } = useParams<{ id: string }>()
  useDocumentTitle("Internship Details")

  const [internship, setInternship] = useState<InternshipOpportunity | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    fetchInternship()
  }, [id])

  async function fetchInternship() {
    setLoading(true)
    try {
      const data = await api.get<InternshipOpportunity>(`/api/content/internships/${id}`)
      setInternship(data)
      setError("")
    } catch {
      setError("Internship not found")
    }
    setLoading(false)
  }

  if (loading) {
    return <div className="container-site py-16 text-center text-muted">Loading...</div>
  }

  if (error || !internship) {
    return <Navigate to="/internships" replace />
  }

  const closed =
    internship.status === "closed" || isDeadlinePassed(internship.application_deadline)

  return (
    <div>
      <section className="bg-warm">
        <div className="container-site py-12 md:py-16">
          <Link to="/internships" className="inline-flex items-center gap-2 text-sm text-muted hover:text-primary transition-colors mb-6">
            <ArrowLeft className="h-4 w-4" />
            Back to Opportunities
          </Link>
          <div className="flex flex-wrap items-center gap-2 mb-3">
            {closed ? (
              <Badge variant="outline">Applications Closed</Badge>
            ) : (
              <Badge variant="mint">Open for Applications</Badge>
            )}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-charcoal tracking-tight">{internship.title}</h1>
          <p className="mt-4 text-lg text-muted leading-relaxed max-w-3xl">{internship.description}</p>
        </div>
      </section>

      <section className="bg-white">
        <div className="container-site section-padding">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="text-xl font-bold text-charcoal mb-4">Requirements</h2>
              <p className="text-muted leading-relaxed whitespace-pre-line">{internship.requirements}</p>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-mint rounded-xl p-6 md:sticky top-24">
                <h3 className="font-semibold text-charcoal mb-4">Position Details</h3>
                <dl className="space-y-3 text-sm">
                  <div>
                    <dt className="text-muted">Status</dt>
                    <dd className="font-medium text-charcoal">
                      {closed ? "Applications closed" : "Accepting applications"}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-muted">Application Deadline</dt>
                    <dd className="font-medium text-charcoal">
                      {formatDate(internship.application_deadline) || "No deadline"}
                    </dd>
                  </div>
                </dl>
                <div className="mt-6 pt-6 border-t border-border">
                  {closed ? (
                    <>
                      <Button className="w-full" disabled>
                        Applications Closed
                      </Button>
                      <p className="mt-3 text-xs text-muted text-center">
                        The application deadline has passed for this position.
                      </p>
                    </>
                  ) : (
                    <Link to={`/apply?opportunity=${internship.id}`}>
                      <Button className="w-full">Apply Now</Button>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title="Interested in Other Opportunities?"
        description="Explore our courses to build relevant skills, or check out other departments."
        primaryAction={{ label: "View Courses", to: "/courses" }}
        secondaryAction={{ label: "All Departments", to: "/departments" }}
      />
    </div>
  )
}
