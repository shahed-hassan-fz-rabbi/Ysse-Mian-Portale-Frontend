import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"
import { useDocumentTitle } from "../hooks/useDocumentTitle"
import { api, ApiError } from "../lib/api"
import { Department } from "../types"
import CTASection from "../components/shared/CTASection"

export default function DepartmentsPage() {
  useDocumentTitle("Departments")

  const [departments, setDepartments] = useState<Department[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    fetchDepartments()
  }, [])

  async function fetchDepartments() {
    setLoading(true)
    try {
      const data = await api.get<Department[]>("/api/content/departments")
      setDepartments(data || [])
      setError("")
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Failed to load departments")
    }
    setLoading(false)
  }

  return (
    <div>
      <section className="bg-warm">
        <div className="container-site py-16 md:py-20">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-charcoal tracking-tight">
              Our Departments
            </h1>
            <p className="mt-4 text-lg text-muted leading-relaxed">
              YSSE operates through specialized departments, each contributing
              to our mission of empowering young social entrepreneurs.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="container-site section-padding">
          {loading ? (
            <div className="text-center py-8 text-muted">Loading departments...</div>
          ) : error ? (
            <div className="text-center py-8 text-red-600">{error}</div>
          ) : departments.length === 0 ? (
            <div className="text-center py-8 text-muted">No departments published yet.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {departments.map((dept) => (
                <Link
                  key={dept.id}
                  to={`/departments/${dept.id}`}
                  className="group block bg-white rounded-xl border border-border shadow-card p-6 hover:shadow-card-hover transition-shadow duration-200"
                >
                  <h3 className="font-semibold text-charcoal text-lg mb-2 group-hover:text-primary transition-colors">
                    {dept.name}
                  </h3>
                  <p className="text-sm text-muted leading-relaxed line-clamp-3">
                    {dept.description}
                  </p>
                  <div className="mt-4 flex items-center gap-1.5 text-sm font-medium text-primary">
                    Learn more
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <CTASection
        title="Interested in Working With Us?"
        description="We offer virtual internship opportunities across our departments."
        primaryAction={{ label: "View Opportunities", to: "/internships" }}
        secondaryAction={{ label: "Contact Us", to: "/contact" }}
      />
    </div>
  )
}
