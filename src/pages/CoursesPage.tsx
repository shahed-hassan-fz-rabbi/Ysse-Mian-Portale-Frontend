import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Search } from "lucide-react"
import { useDocumentTitle } from "../hooks/useDocumentTitle"
import { api, ApiError } from "../lib/api"
import { Course } from "../types"
import Badge from "../components/ui/Badge"
import CTASection from "../components/shared/CTASection"

export default function CoursesPage() {
  useDocumentTitle("Courses")

  const [courses, setCourses] = useState<Course[]>([])
  const [allCourses, setAllCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("All")

  useEffect(() => {
    fetchCourses()
  }, [])

  async function fetchCourses() {
    setLoading(true)
    try {
      const data = await api.get<Course[]>("/api/content/courses")
      setAllCourses(data || [])
      setError("")
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Failed to load courses")
    }
    setLoading(false)
  }

  // Client-side filtering (single fetch, instant search + category filter)
  useEffect(() => {
    const term = search.trim().toLowerCase()
    const filtered = allCourses.filter((c) => {
      const matchesCategory = category === "All" || c.category === category
      const matchesSearch =
        !term ||
        c.title.toLowerCase().includes(term) ||
        c.description.toLowerCase().includes(term)
      return matchesCategory && matchesSearch
    })
    setCourses(filtered)
  }, [search, category, allCourses])

  const categories = ["All", ...Array.from(new Set(allCourses.map((c) => c.category)))]

  return (
    <div>
      <section className="bg-warm">
        <div className="container-site py-16 md:py-20">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-charcoal tracking-tight">
              Courses and Learning Resources
            </h1>
            <p className="mt-4 text-lg text-muted leading-relaxed">
              Explore our range of courses designed to equip you with the skills
              and knowledge needed for social entrepreneurship.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white border-b border-border">
        <div className="container-site py-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
                <input
                  type="text"
                  placeholder="Search courses..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full rounded-lg border border-border bg-white pl-10 pr-4 py-2.5 text-sm text-charcoal placeholder:text-muted/60 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                />
              </div>
            </div>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="rounded-lg border border-border bg-white px-3 py-2.5 text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-primary/30"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat === "All" ? "All Categories" : cat}</option>
              ))}
            </select>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="container-site section-padding">
          {loading ? (
            <div className="text-center py-8 text-muted">Loading courses...</div>
          ) : error ? (
            <div className="text-center py-8 text-red-600">{error}</div>
          ) : courses.length === 0 ? (
            <div className="text-center py-8 text-muted">No courses found.</div>
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

      <CTASection
        title="Ready to Start Learning?"
        description="Apply for our virtual internship program to complement your learning with practical experience."
        primaryAction={{ label: "View Internships", to: "/internships" }}
        secondaryAction={{ label: "Contact Us", to: "/contact" }}
      />
    </div>
  )
}
