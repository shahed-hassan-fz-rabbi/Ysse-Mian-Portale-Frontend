import { useState, useMemo } from 'react'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { Search, Filter } from 'lucide-react'
import { courses } from '../data/courses'
import CourseCard from '../components/shared/CourseCard'
import SectionHeading from '../components/ui/SectionHeading'
import CTASection from '../components/shared/CTASection'
import Input from '../components/ui/Input'

const categories = ['All', ...Array.from(new Set(courses.map((c) => c.category)))]
const levels = ['All', 'Beginner', 'Intermediate', 'Advanced']
const formats = ['All', 'Recorded', 'Live', 'Self-paced']

export default function CoursesPage() {
  useDocumentTitle('Courses')

  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedLevel, setSelectedLevel] = useState('All')
  const [selectedFormat, setSelectedFormat] = useState('All')

  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const matchesSearch =
        course.title.toLowerCase().includes(search.toLowerCase()) ||
        course.description.toLowerCase().includes(search.toLowerCase())
      const matchesCategory =
        selectedCategory === 'All' || course.category === selectedCategory
      const matchesLevel =
        selectedLevel === 'All' || course.level === selectedLevel
      const matchesFormat =
        selectedFormat === 'All' || course.format === selectedFormat

      return matchesSearch && matchesCategory && matchesLevel && matchesFormat
    })
  }, [search, selectedCategory, selectedLevel, selectedFormat])

  return (
    <div>
      {/* Hero */}
      <section className="bg-warm">
        <div className="container-site py-16 md:py-20">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-charcoal tracking-tight">
              Courses and Learning Resources
            </h1>
            <p className="mt-4 text-lg text-muted leading-relaxed">
              Explore our range of courses designed to equip you with the skills
              and knowledge needed for social entrepreneurship. Filter by
              category, level, or format to find the right learning path.
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-white border-b border-border">
        <div className="container-site py-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
                <input
                  type="text"
                  placeholder="Search courses..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full rounded-lg border border-border bg-white pl-10 pr-4 py-2.5 text-sm text-charcoal placeholder:text-muted/60 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                  aria-label="Search courses"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted shrink-0" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="rounded-lg border border-border bg-white px-3 py-2.5 text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                aria-label="Filter by category"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat === 'All' ? 'All Categories' : cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Level Filter */}
            <div>
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="rounded-lg border border-border bg-white px-3 py-2.5 text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                aria-label="Filter by level"
              >
                {levels.map((level) => (
                  <option key={level} value={level}>
                    {level === 'All' ? 'All Levels' : level}
                  </option>
                ))}
              </select>
            </div>

            {/* Format Filter */}
            <div>
              <select
                value={selectedFormat}
                onChange={(e) => setSelectedFormat(e.target.value)}
                className="rounded-lg border border-border bg-white px-3 py-2.5 text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                aria-label="Filter by format"
              >
                {formats.map((format) => (
                  <option key={format} value={format}>
                    {format === 'All' ? 'All Formats' : format}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Course Grid */}
      <section className="bg-white">
        <div className="container-site section-padding">
          <div className="flex items-center justify-between mb-8">
            <p className="text-sm text-muted">
              Showing {filteredCourses.length} of {courses.length} courses
            </p>
          </div>

          {filteredCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-muted text-lg">No courses match your filters.</p>
              <p className="text-sm text-muted mt-2">
                Try adjusting your search or filter criteria.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <CTASection
        title="Ready to Start Learning?"
        subtitle="Apply for our virtual internship program to complement your learning with practical experience."
        primaryAction={{ label: 'View Internships', to: '/internships' }}
        secondaryAction={{ label: 'Contact Us', to: '/contact' }}
      />
    </div>
  )
}
