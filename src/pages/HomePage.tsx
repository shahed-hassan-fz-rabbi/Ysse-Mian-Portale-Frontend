import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { ArrowRight, Users, BookOpen, Lightbulb, Globe } from "lucide-react"
import { useDocumentTitle } from "../hooks/useDocumentTitle"
import { api, ApiError } from "../lib/api"
import { Department, Course, InternshipOpportunity, Announcement } from "../types"
import SectionHeading from "../components/ui/SectionHeading"
import Badge from "../components/ui/Badge"
import CTASection from "../components/shared/CTASection"

interface SiteSettings {
  hero_heading: string | null
  hero_description: string | null
  hero_image_url: string | null
  featured_heading: string | null
  featured_description: string | null
  featured_image_url: string | null
  about_heading: string | null
  about_description: string | null
  about_image_url: string | null
}

const DEFAULT_HERO_BACKGROUND = "/images/hero-sunset.jpg"
const DEFAULT_HERO_HEADING = "Empowering Young People to Create Positive Social Change"
const DEFAULT_HERO_DESCRIPTION =
  "YSSE provides entrepreneurship education, training, and capacity building for young social entrepreneurs. We equip young people with the skills, knowledge, and support needed to build sustainable ventures that address social challenges."
const DEFAULT_ABOUT_HEADING = "Building the Next Generation of Social Entrepreneurs"
const DEFAULT_ABOUT_DESCRIPTION =
  "Y SSE works to unlock the potential of young people to become effective social entrepreneurs who can identify, address, and solve pressing social problems in their communities."

export default function HomePage() {
  useDocumentTitle("")

  const [settings, setSettings] = useState<SiteSettings | null>(null)
  const [departments, setDepartments] = useState<Department[]>([])
  const [courses, setCourses] = useState<Course[]>([])
  const [internships, setInternships] = useState<InternshipOpportunity[]>([])
  const [announcements, setAnnouncements] = useState<Announcement[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    setLoading(true)
    setError("")

    try {
      const [settingsData, depts, coursesData, internshipsData, announcementsData] =
        await Promise.all([
          api.get<SiteSettings>("/api/content/settings"),
          api.get<Department[]>("/api/content/departments"),
          api.get<Course[]>("/api/content/courses"),
          api.get<InternshipOpportunity[]>("/api/content/internships"),
          api.get<Announcement[]>("/api/content/announcements"),
        ])

      setSettings(settingsData)
      setDepartments(depts || [])
      setCourses((coursesData || []).slice(0, 3))
      setInternships((internshipsData || []).slice(0, 2))
      setAnnouncements((announcementsData || []).slice(0, 3))
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

  return (
    <div>
      {/* Hero Section — background: admin "Hero Image URL" setting, local image fallback.
          bg-deep keeps text readable even if the image fails to load. */}
      <section
        className="relative bg-deep bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url("${heroBackground}")` }}
      >
        <div
          className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/65 to-black/55"
          aria-hidden="true"
        />
        <div className="relative z-10 container-site py-16 md:py-24 lg:py-32">
          <div className="max-w-3xl">
            <Badge variant="mint" className="mb-4">
              Youth School for Social Entrepreneurs
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight drop-shadow-sm">
              {heroHeading.includes(heroMarker) ? (
                <>
                  {heroHeading.split(heroMarker)[0]}
                  <span className="text-mint-dark">{heroMarker}</span>
                </>
              ) : (
                heroHeading
              )}
            </h1>
            <p className="mt-6 text-lg md:text-xl text-mint leading-relaxed max-w-2xl">
              {heroDescription}
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link
                to="/about"
                className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white font-medium px-7 py-3 rounded-lg transition-colors duration-200"
              >
                Explore Our Work
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/internships"
                className="inline-flex items-center justify-center gap-2 border-2 border-white text-white hover:bg-white hover:text-deep font-medium px-7 py-3 rounded-lg transition-colors duration-200"
              >
                Explore Opportunities
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="bg-white">
        <div className="container-site section-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <SectionHeading
                title={aboutHeading}
                subtitle={aboutDescription}
              />
              <p className="mt-4 text-muted leading-relaxed">
                Through our training programs, mentorship, and support
                services, we help young aspiring entrepreneurs develop the
                competencies needed to design, launch, and grow sustainable
                social enterprises. Our approach combines practical business
                skills with a deep understanding of social impact.
              </p>
              <div className="mt-6">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 text-primary font-medium hover:text-primary-dark transition-colors"
                >
                  Learn more about us
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-mint rounded-xl p-6 flex flex-col items-center text-center">
                <Users className="h-8 w-8 text-primary mb-3" />
                <h3 className="font-semibold text-charcoal text-sm">
                  Training Programs
                </h3>
                <p className="text-xs text-muted mt-1">
                  Entrepreneurship education and capacity building
                </p>
              </div>
              <div className="bg-mint rounded-xl p-6 flex flex-col items-center text-center">
                <BookOpen className="h-8 w-8 text-primary mb-3" />
                <h3 className="font-semibold text-charcoal text-sm">
                  Learning Resources
                </h3>
                <p className="text-xs text-muted mt-1">
                  Courses, materials, and recorded sessions
                </p>
              </div>
              <div className="bg-mint rounded-xl p-6 flex flex-col items-center text-center">
                <Lightbulb className="h-8 w-8 text-primary mb-3" />
                <h3 className="font-semibold text-charcoal text-sm">
                  Innovation Support
                </h3>
                <p className="text-xs text-muted mt-1">
                  Research, mentorship, and incubation
                </p>
              </div>
              <div className="bg-mint rounded-xl p-6 flex flex-col items-center text-center">
                <Globe className="h-8 w-8 text-primary mb-3" />
                <h3 className="font-semibold text-charcoal text-sm">
                  Community
                </h3>
                <p className="text-xs text-muted mt-1">
                  Network of young social entrepreneurs
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Content (managed via Site Settings) */}
      {settings?.featured_heading && (
        <section className="bg-warm">
          <div className="container-site section-padding">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <SectionHeading
                  title={settings.featured_heading}
                  subtitle={settings.featured_description || undefined}
                />
                <div className="mt-6">
                  <Link
                    to="/about"
                    className="inline-flex items-center gap-2 text-primary font-medium hover:text-primary-dark transition-colors"
                  >
                    Learn more
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
              {settings.featured_image_url && (
                <img
                  src={settings.featured_image_url}
                  alt={settings.featured_heading}
                  className="w-full rounded-xl border border-border object-cover"
                  loading="lazy"
                />
              )}
            </div>
          </div>
        </section>
      )}

      {/* Departments Overview */}
      <section className="bg-warm">
        <div className="container-site section-padding">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
            <SectionHeading
              title="Our Departments"
              subtitle="Y SSE operates through specialized departments, each focusing on a different aspect of our mission to support young social entrepreneurs."
            />
            <Link
              to="/departments"
              className="inline-flex items-center gap-2 text-primary font-medium hover:text-primary-dark transition-colors shrink-0"
            >
              View all departments
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {loading ? (
            <div className="text-center py-8 text-muted">Loading departments...</div>
          ) : error ? (
            <div className="text-center py-8 text-red-600">{error}</div>
          ) : departments.length === 0 ? (
            <div className="text-center py-8 text-muted">No departments published yet.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Programs and Activities */}
      <section className="bg-white">
        <div className="container-site section-padding">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
            <SectionHeading
              title="Programs and Activities"
              subtitle="We offer a range of programs designed to equip young people with entrepreneurial skills and support their social venture journeys."
            />
            <Link
              to="/courses"
              className="inline-flex items-center gap-2 text-primary font-medium hover:text-primary-dark transition-colors shrink-0"
            >
              Browse all courses
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {loading ? (
            <div className="text-center py-8 text-muted">Loading courses...</div>
          ) : error ? (
            <div className="text-center py-8 text-red-600">{error}</div>
          ) : courses.length === 0 ? (
            <div className="text-center py-8 text-muted">No courses published yet.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <Link
                  key={course.id}
                  to={`/courses/${course.id}`}
                  className="group block bg-white rounded-xl border border-border shadow-card p-6 hover:shadow-card-hover transition-shadow duration-200"
                >
                  <Badge variant="mint" className="mb-3">{course.category}</Badge>
                  <h3 className="font-semibold text-charcoal text-lg mb-2 group-hover:text-primary transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-sm text-muted leading-relaxed line-clamp-2">
                    {course.description}
                  </p>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Announcements */}
      <section className="bg-warm">
        <div className="container-site section-padding">
          <SectionHeading
            title="Announcements and Updates"
            subtitle="Stay informed about the latest news, program updates, and opportunities from Y SSE."
            className="mb-10"
          />

          {loading ? (
            <div className="text-center py-8 text-muted">Loading announcements...</div>
          ) : error ? (
            <div className="text-center py-8 text-red-600">{error}</div>
          ) : announcements.length === 0 ? (
            <div className="text-center py-8 text-muted">No announcements published yet.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {announcements.map((ann) => (
                <article key={ann.id} className="bg-white rounded-xl border border-border shadow-card p-6">
                  <h3 className="font-semibold text-charcoal text-base mb-2">
                    {ann.title}
                  </h3>
                  <p className="text-sm text-muted leading-relaxed">
                    {ann.body}
                  </p>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Internship Section */}
      <section className="bg-white">
        <div className="container-site section-padding">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
            <SectionHeading
              title="Virtual Internship Opportunities"
              subtitle="Gain practical experience in the social entrepreneurship sector through our virtual internship program. Open to students and recent graduates."
            />
            <Link
              to="/internships"
              className="inline-flex items-center gap-2 text-primary font-medium hover:text-primary-dark transition-colors shrink-0"
            >
              View all opportunities
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

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
                  <h3 className="font-semibold text-charcoal text-lg mb-2 group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted leading-relaxed line-clamp-2">
                    {item.description}
                  </p>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <CTASection
        title="Ready to Start Your Social Entrepreneurship Journey?"
        description="Explore our courses, apply for an internship, or get in touch to learn more about how Y SSE can support you."
        primaryAction={{ label: "Apply Now", to: "/apply" }}
        secondaryAction={{ label: "Contact Us", to: "/contact" }}
      />
    </div>
  )
}
