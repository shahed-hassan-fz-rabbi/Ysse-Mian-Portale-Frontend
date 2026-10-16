import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Target, Eye, Compass, Heart, ArrowRight } from "lucide-react"
import { useDocumentTitle } from "../hooks/useDocumentTitle"
import { useSiteSettings } from "../hooks/useSiteSettings"
import { api } from "../lib/api"
import { TeamMember } from "../types"
import SectionHeading from "../components/ui/SectionHeading"
import PageHeader from "../components/shared/PageHeader"
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

export default function AboutPage() {
  useDocumentTitle("About YSSE")
  const { settings } = useSiteSettings()

  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [aboutImageFailed, setAboutImageFailed] = useState(false)

  useEffect(() => {
    let active = true
    api
      .get<TeamMember[]>("/api/content/team-members")
      .then((data) => {
        if (active) setTeamMembers(Array.isArray(data) ? data : [])
      })
      .catch(() => {
        // Team preview is decorative; the full list lives on /team
      })
    return () => {
      active = false
    }
  }, [])

  const whoWeAreHeading = settings?.about_heading?.trim()
  const whoWeAreText = settings?.about_description?.trim()
  const aboutImage = settings?.about_image_url?.trim() || "/images/hero-sunset.jpg"
  const previewMembers = teamMembers.slice(0, 4)

  return (
    <div>
      {/* Hero */}
      <PageHeader
        eyebrow="Our organization"
        title="About YSSE"
        description="Youth School for Social Entrepreneurs (YSSE) is dedicated to nurturing the next generation of social entrepreneurs who can address pressing social challenges through innovative, sustainable solutions."
      />

      {/* Organization Overview */}
      <section className="bg-white">
        <div className="container-site section-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionHeading
                eyebrow="Who we are"
                title={whoWeAreHeading || "A youth-driven platform for social change"}
                subtitle={
                  whoWeAreText ||
                  "YSSE is a youth-focused organization that believes in the power of entrepreneurship to drive social change. We work with young people to develop their entrepreneurial mindsets, build practical business skills, and support them in launching ventures that create measurable social impact."
                }
              />
              {!whoWeAreText && (
                <p className="mt-4 text-muted leading-relaxed">
                  Our approach is rooted in the conviction that young people are
                  not just leaders of tomorrow — they are changemakers today. By
                  providing them with the right knowledge, tools, networks, and
                  support systems, we help transform their ideas into
                  sustainable enterprises that address real community needs.
                </p>
              )}
            </div>
            {!aboutImageFailed ? (
              <img
                src={aboutImage}
                alt="YSSE community members gathered together"
                className="rounded-xl object-cover aspect-[4/3] w-full border border-border shadow-card"
                loading="lazy"
                onError={() => setAboutImageFailed(true)}
              />
            ) : (
              <div
                aria-hidden="true"
                className="rounded-xl bg-mint aspect-[4/3] w-full flex items-center justify-center"
              >
                <span className="text-deep/70 font-semibold">YSSE Community</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Mission and Vision */}
      <section className="bg-mint">
        <div className="container-site section-padding">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-card">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Target className="h-5 w-5 text-primary" />
                </div>
                <h2 className="text-xl font-bold text-charcoal">Our Mission</h2>
              </div>
              <p className="text-muted leading-relaxed">
                To empower young people with the knowledge, skills, and support
                systems needed to become successful social entrepreneurs who
                create sustainable, positive change in their communities.
              </p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-card">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Eye className="h-5 w-5 text-primary" />
                </div>
                <h2 className="text-xl font-bold text-charcoal">Our Vision</h2>
              </div>
              <p className="text-muted leading-relaxed">
                A world where every young person has the opportunity and
                capability to harness entrepreneurship as a tool for solving
                social problems and building more inclusive, equitable
                communities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Objectives */}
      <section className="bg-white">
        <div className="container-site section-padding">
          <SectionHeading
            eyebrow="What guides us"
            title="Our Objectives"
            subtitle="Our work is guided by clear objectives that shape our programs and services."
            className="mb-10"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Compass,
                title: "Entrepreneurship Education",
                description:
                  "Provide comprehensive entrepreneurship education that equips young people with business planning, financial literacy, and management skills.",
              },
              {
                icon: Heart,
                title: "Social Impact Focus",
                description:
                  "Foster a deep understanding of social challenges and train participants to develop ventures that create measurable, sustainable impact.",
              },
              {
                icon: Target,
                title: "Capacity Building",
                description:
                  "Build the practical capacities of young entrepreneurs through training, mentorship, and hands-on learning experiences.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-warm rounded-xl p-6 border border-border"
              >
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <item.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold text-charcoal mb-2">{item.title}</h3>
                <p className="text-sm text-muted leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Areas of Work */}
      <section className="bg-warm">
        <div className="container-site section-padding">
          <div className="max-w-3xl">
            <SectionHeading
              eyebrow="Our focus"
              title="Areas of Work"
              subtitle="Our programs span several key areas of social entrepreneurship development."
            />
            <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
              {[
                "Entrepreneurship training and bootcamps",
                "Business model design and validation",
                "Impact measurement and evaluation",
                "Leadership and team development",
                "Financial management for social ventures",
                "Research and knowledge production",
              ].map((area) => (
                <li key={area} className="flex items-start gap-3">
                  <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                  </div>
                  <span className="text-sm text-charcoal">{area}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Team preview — only when published team members exist */}
      {previewMembers.length > 0 && (
        <section className="bg-white">
          <div className="container-site section-padding">
            <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
              <SectionHeading
                eyebrow="Our people"
                title="Team & Leadership"
                subtitle="Get to know the people driving our programs forward."
              />
              <Link
                to="/team"
                className="inline-flex items-center gap-2 text-primary font-medium hover:text-primary-dark transition-colors"
              >
                Meet the full team
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {previewMembers.map((member) => (
                <article
                  key={member.id}
                  className="bg-white rounded-xl border border-border shadow-card p-6"
                >
                  {member.photo_url ? (
                    <img
                      src={member.photo_url}
                      alt={`Portrait of ${member.name}`}
                      loading="lazy"
                      className="h-16 w-16 rounded-full object-cover border border-border"
                    />
                  ) : (
                    <span
                      aria-hidden="true"
                      className="h-16 w-16 rounded-full bg-mint text-primary text-lg font-bold flex items-center justify-center border border-mint-dark"
                    >
                      {initials(member.name)}
                    </span>
                  )}
                  <h3 className="mt-4 font-semibold text-charcoal">{member.name}</h3>
                  <p className="text-sm text-primary font-medium">{member.designation}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <CTASection
        title="Join the YSSE Community"
        description="Explore our programs, learn about our departments, or discover internship opportunities to get involved."
        primaryAction={{ label: "Explore Courses", to: "/courses" }}
        secondaryAction={{ label: "View Departments", to: "/departments" }}
      />
    </div>
  )
}
