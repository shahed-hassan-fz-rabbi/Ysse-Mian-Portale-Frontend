import { useState, useEffect, ReactNode } from "react"
import { Link } from "react-router-dom"
import {
  ArrowRight,
  Users,
  BookOpen,
  Lightbulb,
  Globe,
} from "lucide-react"
import { useDocumentTitle } from "../hooks/useDocumentTitle"
import { api, ApiError } from "../lib/api"
import { Department, Course, InternshipOpportunity, Announcement, SiteSettings, TeamMember } from "../types"
import SectionHeading from "../components/ui/SectionHeading"
import Badge from "../components/ui/Badge"
import CTASection from "../components/shared/CTASection"
import { SkeletonGrid } from "../components/ui/Skeleton"
import { getSocialLinks } from "../constants/social"

const DEFAULT_HERO_BACKGROUND = "/images/hero-sunset.jpg"
const DEFAULT_HERO_HEADING = "Empowering Young People to Create Positive Social Change"
const DEFAULT_HERO_DESCRIPTION =
  "YSSE provides entrepreneurship education, training, and capacity building for young social entrepreneurs. We equip young people with the skills, knowledge, and support needed to build sustainable ventures that address social challenges."
const DEFAULT_ABOUT_HEADING = "Building the Next Generation of Social Entrepreneurs"
const DEFAULT_ABOUT_DESCRIPTION =
  "Y SSE works to unlock the potential of young people to become effective social entrepreneurs who can identify, address, and solve pressing social problems in their communities."

const SUPPORTING_PARAGRAPH =
  "Through our training programs, mentorship, and support services, we help young aspiring entrepreneurs develop the competencies needed to design, launch, and grow sustainable social enterprises. Our approach combines practical business skills with a deep understanding of social impact."

const PILLARS: { Icon: typeof Users; title: string; text: string }[] = [
  { Icon: Users, title: "Training Programs", text: "Entrepreneurship education and capacity building" },
  { Icon: BookOpen, title: "Learning Resources", text: "Courses, materials, and recorded sessions" },
  { Icon: Lightbulb, title: "Innovation Support", text: "Research, mentorship, and incubation" },
  { Icon: Globe, title: "Community", text: "Network of young social entrepreneurs" },
]

function formatDate(value: string | null): string | null {
  if (!value) return null
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return null
  return date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
}

function SectionError({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div className="text-center py-10" role="alert">
      <p className="text-red-600">{message}</p>
      <button
        type="button"
        onClick={onRetry}
        className="mt-3 text-sm font-medium text-primary underline underline-offset-4 hover:text-primary-dark"
      >
        Try again
      </button>
    </div>
  )
}

function EmptyState({ message, children }: { message: string; children?: ReactNode }) {
  return (
    <div className="text-center py-10 border border-dashed border-border rounded-xl bg-white/60">
      <p className="text-muted">{message}</p>
      {children && <div className="mt-4">{children}</div>}
    </div>
  )
}

function TextLink({ to, children }: { to: string; children: ReactNode }) {
  return (
    <Link
      to={to}
      className="group inline-flex items-center gap-2 text-primary font-semibold hover:text-primary-dark transition-colors"
    >
      {children}
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
    </Link>
  )
}

export default function HomePage() {
  useDocumentTitle("")

  const [settings, setSettings] = useState<SiteSettings | null>(null)
  const [departments, setDepartments] = useState<Department[]>([])
  const [courses, setCourses] = useState<Course[]>([])
  const [internships, setInternships] = useState<InternshipOpportunity[]>([])
  const [announcements, setAnnouncements] = useState<Announcement[]>([])
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function fetchData() {
    setLoading(true)
    setError("")

    try {
      const [settingsData, depts, coursesData, internshipsData, announcementsData, teamData] =
        await Promise.all([
          api.get<SiteSettings>("/api/content/settings"),
          api.get<Department[]>("/api/content/departments"),
          api.get<Course[]>("/api/content/courses"),
          api.get<InternshipOpportunity[]>("/api/content/internships"),
          api.get<Announcement[]>("/api/content/announcements"),
          api.get<TeamMember[]>("/api/content/team-members"),
        ])

      setSettings(settingsData)
      setDepartments(depts || [])
      setCourses((coursesData || []).slice(0, 3))
      setInternships((internshipsData || []).slice(0, 2))
      setAnnouncements((announcementsData || []).slice(0, 3))
      setTeamMembers((teamData || []).slice(0, 4))
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Failed to load page content")
    }

    setLoading(false)
  }

  const heroHeading = settings?.hero_heading || DEFAULT_HERO_HEADING
  const heroDescription = settings?.hero_description || DEFAULT_HERO_DESCRIPTION
  const aboutHeading = settings?.about_heading || DEFAULT_ABOUT_HEADING
  const aboutDescription = settings?.about_description || DEFAULT_ABOUT_DESCRIPTION
  const heroMarker = "Positive Social Change"
  // Hero background: admin site-setting (DB) takes priority; local image is the safe fallback
  const heroBackground = settings?.hero_image_url?.trim() || DEFAULT_HERO_BACKGROUND
  const socialLinks = getSocialLinks(settings)

  return (
    <div>
      {/* ============================== HERO ============================== */}
      <section
        className="relative flex min-h-[75vh] md:min-h-[85vh] items-center overflow-hidden bg-deep bg-cover bg-no-repeat"
        style={{ backgroundImage: `url("${heroBackground}")`, backgroundPosition: "center 30%" }}
        aria-label="YSSE introduction"
      >
        <div
          className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/65 to-black/45"
          aria-hidden="true"
        />
        <div className="relative z-10 w-full container-site py-12 md:py-14 lg:py-16">
          <div className="max-w-3xl">
            <p className="inline-flex items-center gap-3 text-[0.8125rem] font-semibold uppercase tracking-[0.18em] text-mint animate-fade-up">
              <span className="h-0.5 w-8 bg-brand" aria-hidden="true" />
              Youth School for Social Entrepreneurs
            </p>
            <h1
              className="mt-6 text-display font-bold text-white animate-fade-up"
              style={{ animationDelay: "90ms" }}
            >
              {heroHeading.includes(heroMarker) ? (
                <>
                  {heroHeading.split(heroMarker)[0]}
                  <span className="text-brand">{heroMarker}</span>
                </>
              ) : (
                heroHeading
              )}
            </h1>
            <p
              className="mt-6 text-lead text-mint max-w-2xl animate-fade-up"
              style={{ animationDelay: "180ms" }}
            >
              {heroDescription}
            </p>
            <div
              className="mt-8 flex flex-col sm:flex-row gap-4 animate-fade-up"
              style={{ animationDelay: "270ms" }}
            >
              <Link
                to="/about"
                className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white font-semibold text-base px-8 py-3.5 rounded-lg shadow-cta transition-colors duration-200"
              >
                Explore Our Work
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                to="/internships"
                className="inline-flex items-center justify-center gap-2 border-2 border-white/80 text-white hover:bg-white hover:text-deep font-semibold text-base px-8 py-3.5 rounded-lg transition-colors duration-200"
              >
                Explore Opportunities
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ====================== A — INTRODUCTION ====================== */}
      <section className="bg-white">
        <div className="container-site section-padding">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            <div className="lg:col-span-5">
              <SectionHeading eyebrow="Who we are" title={aboutHeading} />
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              <p className="text-lead text-charcoal">{aboutDescription}</p>
              <p className="mt-6 text-muted leading-relaxed">{SUPPORTING_PARAGRAPH}</p>
              <div className="mt-7">
                <TextLink to="/about">Learn more about us</TextLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================== B — WHAT WE DO ====================== */}
      <section className="bg-warm">
        <div className="container-site section-padding">
          <SectionHeading
            eyebrow="What we do"
            title="Four focus areas, one mission"
            subtitle="From education and training to mentorship and community — how YSSE supports young people building ventures with purpose."
            className="mb-12"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10">
            {PILLARS.map(({ Icon, title, text }) => (
              <div key={title} className="border-t-2 border-primary/15 pt-5 group">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-mint text-primary mb-4 transition-colors duration-200 group-hover:bg-primary group-hover:text-white">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="font-semibold text-charcoal text-lg">{title}</h3>
                <p className="mt-2 text-sm text-muted leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============== C — IMPACT & ACTIVITIES (site setting) ============== */}
      {settings?.featured_heading && (
        <section className="bg-white">
          <div className="container-site section-padding">
            <div
              className={`grid gap-10 lg:gap-16 items-center ${
                settings.featured_image_url ? "lg:grid-cols-2" : ""
              }`}
            >
              <div>
                <SectionHeading
                  eyebrow="In focus"
                  title={settings.featured_heading}
                  subtitle={settings.featured_description || undefined}
                />
                <div className="mt-6">
                  <TextLink to="/about">Learn more</TextLink>
                </div>
              </div>
              {settings.featured_image_url && (
                <img
                  src={settings.featured_image_url}
                  alt={settings.featured_heading}
                  loading="lazy"
                  className="w-full aspect-[4/3] object-cover rounded-2xl border border-border shadow-card"
                />
              )}
            </div>
          </div>
        </section>
      )}

      {/* ====================== D — DEPARTMENTS ====================== */}
      <section className="bg-warm">
        <div className="container-site section-padding">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
            <SectionHeading
              eyebrow="Our departments"
              title="Departments"
              subtitle="Y SSE operates through specialized departments, each focusing on a different aspect of our mission to support young social entrepreneurs."
            />
            <TextLink to="/departments">View all departments</TextLink>
          </div>

          {loading ? (
            <SkeletonGrid count={4} />
          ) : error ? (
            <SectionError message={error} onRetry={fetchData} />
          ) : departments.length === 0 ? (
            <EmptyState message="No departments published yet — check back soon.">
              <TextLink to="/departments">See department pages</TextLink>
            </EmptyState>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {departments.map((dept) => (
                <Link
                  key={dept.id}
                  to={`/departments/${dept.id}`}
                  className="group flex flex-col bg-white rounded-xl border border-border shadow-card p-6 hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200"
                >
                  <h3 className="font-semibold text-charcoal text-lg mb-2 group-hover:text-primary transition-colors">
                    {dept.name}
                  </h3>
                  <p className="text-sm text-muted leading-relaxed line-clamp-3 flex-1">
                    {dept.description}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                    Explore
                    <ArrowRight
                      className="h-4 w-4 transition-transform group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ================== E — LEARNING RESOURCES ================== */}
      <section className="bg-white">
        <div className="container-site section-padding">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
            <SectionHeading
              eyebrow="Learning resources"
              title="Courses and programs"
              subtitle="We offer a range of programs designed to equip young people with entrepreneurial skills and support their social venture journeys."
            />
            <TextLink to="/courses">Browse all courses</TextLink>
          </div>

          {loading ? (
            <SkeletonGrid count={3} withBadge className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" />
          ) : error ? (
            <SectionError message={error} onRetry={fetchData} />
          ) : courses.length === 0 ? (
            <EmptyState message="No courses published yet. New learning resources are added regularly — explore our departments in the meantime.">
              <TextLink to="/departments">Explore departments</TextLink>
            </EmptyState>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <Link
                  key={course.id}
                  to={`/courses/${course.id}`}
                  className="group block bg-white rounded-xl border border-border shadow-card p-6 hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200"
                >
                  <Badge variant="mint" className="mb-3">
                    {course.category}
                  </Badge>
                  <h3 className="font-semibold text-charcoal text-lg mb-2 group-hover:text-primary transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-sm text-muted leading-relaxed line-clamp-3">{course.description}</p>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ============== F — INTERNSHIP OPPORTUNITIES (dark) ============== */}
      <section className="bg-deep text-white">
        <div className="container-site section-padding">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5 mb-10">
            <div className="max-w-2xl">
              <p className="inline-flex items-center gap-3 text-[0.8125rem] font-semibold uppercase tracking-[0.16em] text-brand">
                <span className="h-0.5 w-8 bg-brand" aria-hidden="true" />
                Join the team
              </p>
              <h2 className="mt-3 text-title font-bold text-white">
                Virtual Internship Opportunities
              </h2>
              <p className="mt-3 text-white/70 text-base md:text-lg leading-relaxed">
                Gain practical experience in the social entrepreneurship sector through our virtual
                internship program. Open to students and recent graduates.
              </p>
            </div>
            <Link
              to="/internships"
              className="inline-flex items-center justify-center gap-2 border-2 border-white/60 text-white hover:bg-white hover:text-deep font-semibold px-6 py-3 rounded-lg transition-colors duration-200 shrink-0"
            >
              View all opportunities
            </Link>
          </div>

          {loading ? (
            <SkeletonGrid
              count={2}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              lines={3}
            />
          ) : error ? (
            <div className="rounded-xl border border-white/15 bg-white/5">
              <SectionError message={error} onRetry={fetchData} />
            </div>
          ) : internships.length === 0 ? (
            <div className="rounded-xl border border-white/15 bg-white/5 p-8 md:p-10 text-center">
              <p className="text-white font-semibold text-lg">No open internships right now.</p>
              <p className="mt-2 text-white/65 text-sm max-w-md mx-auto">
                New opportunities are published regularly. You can still prepare by exploring our
                courses, or send us an application to be considered for future openings.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Link
                  to="/internships"
                  className="px-5 py-2.5 rounded-lg bg-white text-deep text-sm font-semibold hover:bg-mint transition-colors"
                >
                  Internships page
                </Link>
                <Link
                  to="/apply"
                  className="px-5 py-2.5 rounded-lg border border-white/50 text-white text-sm font-semibold hover:bg-white/10 transition-colors"
                >
                  Send an application
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {internships.map((item) => {
                const deadline = formatDate(item.application_deadline)
                return (
                  <Link
                    key={item.id}
                    to={`/internships/${item.id}`}
                    className="group flex flex-col bg-white text-charcoal rounded-xl border border-border p-6 hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200"
                  >
                    <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted leading-relaxed line-clamp-2 flex-1">
                      {item.description}
                    </p>
                    <div className="mt-4 pt-4 border-t border-border/70 flex items-center justify-between gap-3">
                      {deadline && (
                        <span className="text-xs font-medium text-muted">Apply by {deadline}</span>
                      )}
                      <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary ml-auto">
                        View details
                        <ArrowRight
                          className="h-4 w-4 transition-transform group-hover:translate-x-1"
                          aria-hidden="true"
                        />
                      </span>
                    </div>
                  </Link>
                )
              })}
            </div>
          )}
        </div>
      </section>

      {/* ====================== G — ANNOUNCEMENTS ====================== */}
      <section className="bg-white">
        <div className="container-site section-padding">
          <SectionHeading
            eyebrow="News"
            title="Announcements and updates"
            subtitle="Stay informed about the latest news, program updates, and opportunities from Y SSE."
            className="mb-10"
          />

          {loading ? (
            <SkeletonGrid
              count={3}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              lines={3}
            />
          ) : error ? (
            <SectionError message={error} onRetry={fetchData} />
          ) : announcements.length === 0 ? (
            <EmptyState message="No announcements published yet — check back for the latest news." />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {announcements.map((ann) => {
                const date = formatDate(ann.published_at)
                return (
                  <article
                    key={ann.id}
                    className="bg-white rounded-xl border border-border shadow-card p-6 hover:shadow-card-hover transition-shadow duration-200"
                  >
                    {date && (
                      <time
                        dateTime={ann.published_at ?? undefined}
                        className="text-xs font-semibold uppercase tracking-[0.14em] text-primary"
                      >
                        {date}
                      </time>
                    )}
                    <h3 className="mt-2.5 font-semibold text-charcoal text-lg leading-snug">
                      {ann.title}
                    </h3>
                    <p className="mt-2.5 text-sm text-muted leading-relaxed line-clamp-4">
                      {ann.body}
                    </p>
                  </article>
                )
              })}
            </div>
          )}
        </div>
      </section>

      {/* ============ G2 — TEAM PREVIEW (only when members exist) ============ */}
      {!loading && !error && teamMembers.length > 0 && (
        <section className="bg-mint">
          <div className="container-site section-padding">
            <SectionHeading
              eyebrow="Our people"
              title="The team behind YSSE"
              subtitle="Educators, organizers, and specialists working together to support young social entrepreneurs."
              className="mb-10"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {teamMembers.map((member) => (
                <article
                  key={member.id}
                  className="bg-white rounded-xl border border-border shadow-card p-6"
                >
                  {member.photo_url ? (
                    <img
                      src={member.photo_url}
                      alt={`Portrait of ${member.name}`}
                      loading="lazy"
                      className="h-14 w-14 rounded-full object-cover border border-border"
                    />
                  ) : (
                    <span
                      aria-hidden="true"
                      className="h-14 w-14 rounded-full bg-mint text-primary text-lg font-bold flex items-center justify-center border border-mint-dark"
                    >
                      {member.name
                        .trim()
                        .split(/\s+/)
                        .map((part) => part[0] || "")
                        .slice(0, 2)
                        .join("")
                        .toUpperCase()}
                    </span>
                  )}
                  <h3 className="mt-4 font-semibold text-charcoal">{member.name}</h3>
                  <p className="text-sm text-primary font-medium">{member.designation}</p>
                  {member.departments?.name && (
                    <p className="mt-1 text-xs text-muted">{member.departments.name}</p>
                  )}
                </article>
              ))}
            </div>
            <div className="mt-8 text-center">
              <Link
                to="/team"
                className="inline-flex items-center gap-2 text-primary font-medium hover:text-primary-dark transition-colors"
              >
                Meet the full team
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ================== H — COMMUNITY & SOCIAL ================== */}
      <section className="bg-warm">
        <div className="container-site section-padding">
          <SectionHeading
            align="center"
            eyebrow="Community"
            title="Stay connected with YSSE"
            subtitle="Follow our work, events and opportunities on our official social channels."
            className="mb-9"
          />
          <div className="flex flex-wrap justify-center gap-4">
            {socialLinks.map(({ label, url, Icon }) => (
              <a
                key={label}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="h-12 w-12 inline-flex items-center justify-center rounded-full border border-border bg-white text-muted hover:text-primary hover:border-brand hover:-translate-y-0.5 hover:shadow-card-hover transition-all duration-200"
              >
                <Icon className="h-5 w-5" aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <CTASection
        title="Ready to Start Your Social Entrepreneurship Journey?"
        description="Explore our courses, apply for an internship, or get in touch to learn more about how Y SSE can support you."
        primaryAction={{ label: "Apply Now", to: "/apply" }}
        secondaryAction={{ label: "Contact Us", to: "/contact" }}
      />
    </div>
  )
}
