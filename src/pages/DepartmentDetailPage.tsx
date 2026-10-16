import { useState, useEffect } from "react"
import { useParams, Link, Navigate } from "react-router-dom"
import { ArrowLeft, Target, Briefcase } from "lucide-react"
import { useDocumentTitle } from "../hooks/useDocumentTitle"
import { api } from "../lib/api"
import { Department } from "../types"
import CTASection from "../components/shared/CTASection"

export default function DepartmentDetailPage() {
  const { id } = useParams<{ id: string }>()
  useDocumentTitle("Department Details")

  const [department, setDepartment] = useState<Department | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    fetchDepartment()
  }, [id])

  async function fetchDepartment() {
    setLoading(true)
    try {
      const data = await api.get<Department>(`/api/content/departments/${id}`)
      setDepartment(data)
      setError("")
    } catch {
      setError("Department not found")
    }
    setLoading(false)
  }

  if (loading) {
    return <div className="container-site py-16 text-center text-muted">Loading...</div>
  }

  if (error || !department) {
    return <Navigate to="/departments" replace />
  }

  return (
    <div>
      <section className="bg-warm">
        <div className="container-site py-12 md:py-16">
          <Link to="/departments" className="inline-flex items-center gap-2 text-sm text-muted hover:text-primary transition-colors mb-6">
            <ArrowLeft className="h-4 w-4" />
            Back to Departments
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-charcoal tracking-tight">{department.name}</h1>
          <p className="mt-4 text-lg text-muted leading-relaxed max-w-3xl">{department.description}</p>
        </div>
      </section>

      <section className="bg-white">
        <div className="container-site section-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-mint rounded-xl p-8">
              <div className="flex items-center gap-3 mb-5">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Target className="h-5 w-5 text-primary" />
                </div>
                <h2 className="text-xl font-bold text-charcoal">Goals</h2>
              </div>
              <ul className="space-y-3">
                {(department.goals || []).map((goal: string, i: number) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                      <div className="h-2 w-2 rounded-full bg-primary" />
                    </div>
                    <span className="text-sm text-charcoal">{goal}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-warm rounded-xl p-8 border border-border">
              <div className="flex items-center gap-3 mb-5">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Briefcase className="h-5 w-5 text-primary" />
                </div>
                <h2 className="text-xl font-bold text-charcoal">Responsibilities</h2>
              </div>
              <ul className="space-y-3">
                {(department.responsibilities || []).map((resp: string, i: number) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                      <div className="h-2 w-2 rounded-full bg-primary" />
                    </div>
                    <span className="text-sm text-charcoal">{resp}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title="Want to Join This Team?"
        description="Explore our virtual internship opportunities and find a role that matches your skills."
        primaryAction={{ label: "View Internships", to: "/internships" }}
        secondaryAction={{ label: "Apply Now", to: "/apply" }}
      />
    </div>
  )
}
