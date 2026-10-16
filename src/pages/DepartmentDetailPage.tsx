import { useState, useEffect } from "react"
import { useParams, Link, Navigate } from "react-router-dom"
import { ArrowLeft, Target, Briefcase } from "lucide-react"
import { useDocumentTitle } from "../hooks/useDocumentTitle"
import { api } from "../lib/api"
import { Department, TeamMember } from "../types"
import CTASection from "../components/shared/CTASection"

function initials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .map((part) => part[0] || "")
    .slice(0, 2)
    .join("")
    .toUpperCase()
}

export default function DepartmentDetailPage() {
  const { id } = useParams<{ id: string }>()
  useDocumentTitle("Department Details")

  const [department, setDepartment] = useState<Department | null>(null)
  const [departmentMembers, setDepartmentMembers] = useState<TeamMember[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    let active = true
    fetchDepartment()
    // Team members of this department (public list; filtered client-side)
    api
      .get<TeamMember[]>("/api/content/team-members")
      .then((data) => {
        if (active) {
          setDepartmentMembers(
            (Array.isArray(data) ? data : []).filter((m) => m.department_id === id),
          )
        }
      })
      .catch(() => {
        // The team section is optional; the department page still renders
      })
    return () => {
      active = false
    }
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
          {department.department_head?.trim() && (
            <p className="mt-4 inline-flex items-center gap-2 bg-mint text-deep text-sm font-medium rounded-full px-4 py-1.5">
              Department Head: {department.department_head.trim()}
            </p>
          )}
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
              {department.goals?.length ? (
                <ul className="space-y-3">
                  {department.goals.map((goal: string, i: number) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                        <div className="h-2 w-2 rounded-full bg-primary" />
                      </div>
                      <span className="text-sm text-charcoal">{goal}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-muted">
                  Goals for this department haven&apos;t been published yet.
                </p>
              )}
            </div>

            <div className="bg-warm rounded-xl p-8 border border-border">
              <div className="flex items-center gap-3 mb-5">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Briefcase className="h-5 w-5 text-primary" />
                </div>
                <h2 className="text-xl font-bold text-charcoal">Responsibilities</h2>
              </div>
              {department.responsibilities?.length ? (
                <ul className="space-y-3">
                  {department.responsibilities.map((resp: string, i: number) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                        <div className="h-2 w-2 rounded-full bg-primary" />
                      </div>
                      <span className="text-sm text-charcoal">{resp}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-muted">
                  Responsibilities for this department haven&apos;t been published yet.
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* People in this department (only when published team members exist) */}
      {departmentMembers.length > 0 && (
        <section className="bg-mint">
          <div className="container-site section-padding">
            <h2 className="text-title font-bold text-charcoal mb-6">People in This Department</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {departmentMembers.map((member) => (
                <article
                  key={member.id}
                  className="bg-white rounded-xl border border-border shadow-card p-6 flex items-start gap-4"
                >
                  {member.photo_url ? (
                    <img
                      src={member.photo_url}
                      alt={`Portrait of ${member.name}`}
                      loading="lazy"
                      className="h-14 w-14 rounded-full object-cover border border-border shrink-0"
                    />
                  ) : (
                    <span
                      aria-hidden="true"
                      className="h-14 w-14 rounded-full bg-mint text-primary text-sm font-bold flex items-center justify-center border border-mint-dark shrink-0"
                    >
                      {initials(member.name)}
                    </span>
                  )}
                  <div className="min-w-0">
                    <h3 className="font-semibold text-charcoal truncate">{member.name}</h3>
                    <p className="text-sm text-primary font-medium">{member.designation}</p>
                    {member.bio && (
                      <p className="mt-2 text-sm text-muted leading-relaxed line-clamp-3">
                        {member.bio}
                      </p>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTASection
        title="Want to Join This Team?"
        description="Explore our virtual internship opportunities and find a role that matches your skills."
        primaryAction={{ label: "View Internships", to: "/internships" }}
        secondaryAction={{ label: "Apply Now", to: "/apply" }}
      />
    </div>
  )
}
