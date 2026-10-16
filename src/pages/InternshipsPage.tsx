import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"
import { useDocumentTitle } from "../hooks/useDocumentTitle"
import { api, ApiError } from "../lib/api"
import { InternshipOpportunity } from "../types"
import Badge from "../components/ui/Badge"
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
      <section className="bg-warm">
        <div className="container-site py-16 md:py-20">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-charcoal tracking-tight">
              Virtual Internship Opportunities
            </h1>
            <p className="mt-4 text-lg text-muted leading-relaxed">
              Gain practical experience in the social entrepreneurship sector
              through our virtual internship program.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="container-site section-padding">
          {loading ? (
            <div className="text-center py-8 text-muted">Loading internships...</div>
          ) : error ? (
            <div className="text-center py-8 text-red-600">{error}</div>
          ) : internships.length === 0 ? (
            <div className="text-center py-8 text-muted">No internship opportunities published yet.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {internships.map((item) => (
                <Link
                  key={item.id}
                  to={`/internships/${item.id}`}
                  className="group block bg-white rounded-xl border border-border shadow-card p-6 hover:shadow-card-hover transition-shadow duration-200"
                >
                  <Badge variant="mint" className="mb-3">{item.status}</Badge>
                  <h3 className="font-semibold text-charcoal text-lg mb-2 group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted leading-relaxed line-clamp-2">
                    {item.description}
                  </p>
                  <div className="mt-4 flex items-center gap-1.5 text-sm font-medium text-primary">
                    View details
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
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
