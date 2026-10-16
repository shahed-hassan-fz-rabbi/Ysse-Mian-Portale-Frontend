import { useState, useEffect } from "react"
import { useDocumentTitle } from "../hooks/useDocumentTitle"
import { api, ApiError } from "../lib/api"
import { TeamMember } from "../types"
import PageHeader from "../components/shared/PageHeader"
import SectionHeading from "../components/ui/SectionHeading"
import CTASection from "../components/shared/CTASection"
import { SkeletonGrid } from "../components/ui/Skeleton"

function initials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .map((part) => part[0] || "")
    .slice(0, 2)
    .join("")
    .toUpperCase()
}

function MemberAvatar({ member }: { member: TeamMember }) {
  if (member.photo_url) {
    return (
      <img
        src={member.photo_url}
        alt={`Portrait of ${member.name}`}
        loading="lazy"
        className="h-24 w-24 rounded-full object-cover border border-border"
      />
    )
  }
  return (
    <span
      aria-label={`${member.name} (photo not provided)`}
      className="h-24 w-24 rounded-full bg-mint text-primary text-xl font-bold flex items-center justify-center border border-mint-dark"
    >
      {initials(member.name)}
    </span>
  )
}

export default function TeamPage() {
  useDocumentTitle("Team")

  const [members, setMembers] = useState<TeamMember[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    let active = true
    api
      .get<TeamMember[]>("/api/content/team-members")
      .then((data) => {
        if (active) setMembers(Array.isArray(data) ? data : [])
      })
      .catch((err: unknown) => {
        if (active) {
          setError(err instanceof ApiError ? err.message : "Failed to load team members")
        }
      })
      .finally(() => {
        if (active) setLoading(false)
      })
    return () => {
      active = false
    }
  }, [])

  return (
    <div>
      <PageHeader
        eyebrow="Our people"
        title="Team & Leadership"
        description="The team behind YSSE — educators, organizers, and specialists working together to support young social entrepreneurs."
      />

      <section className="bg-white">
        <div className="container-site section-padding">
          <SectionHeading
            eyebrow="The team"
            title="Meet the people at YSSE"
            subtitle="Everyone below works directly with our community of young social entrepreneurs."
            className="mb-10"
          />

          {loading ? (
            <SkeletonGrid
              count={4}
              lines={1}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            />
          ) : error ? (
            <div className="text-center py-10" role="alert">
              <p className="text-red-600">{error}</p>
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="mt-3 text-sm font-medium text-primary underline underline-offset-4 hover:text-primary-dark"
              >
                Try again
              </button>
            </div>
          ) : members.length === 0 ? (
            <div className="text-center py-12 border border-dashed border-border rounded-xl bg-white/60">
              <p className="text-muted">
                Team profiles will appear here soon. Our team is being introduced one member at a
                time.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {members.map((member) => (
                <article
                  key={member.id}
                  className="bg-white rounded-xl border border-border shadow-card p-6 flex flex-col items-start"
                >
                  <MemberAvatar member={member} />
                  <h3 className="mt-4 font-semibold text-charcoal text-lg">{member.name}</h3>
                  <p className="text-sm text-primary font-medium">{member.designation}</p>
                  {member.departments?.name && (
                    <p className="mt-1 text-xs text-muted">{member.departments.name}</p>
                  )}
                  {member.bio && (
                    <p className="mt-3 text-sm text-muted leading-relaxed">{member.bio}</p>
                  )}
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <CTASection
        title="Want to Work With YSSE?"
        description="Explore our current openings, or reach out to learn how you can get involved in our programs."
        primaryAction={{ label: "View Internships", to: "/internships" }}
        secondaryAction={{ label: "Contact Us", to: "/contact" }}
      />
    </div>
  )
}
