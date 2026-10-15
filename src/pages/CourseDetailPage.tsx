import { useParams, Link, Navigate } from 'react-router-dom'
import { ArrowLeft, Clock, BarChart3, BookOpen, FileText, ExternalLink, Video } from 'lucide-react'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { courses } from '../data/courses'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import CTASection from '../components/shared/CTASection'

export default function CourseDetailPage() {
  const { id } = useParams<{ id: string }>()
  useDocumentTitle('Course Details')

  const course = courses.find((c) => c.id === id)

  if (!course) {
    return <Navigate to="/courses" replace />
  }

  const resourceIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Video className="h-4 w-4" />
      case 'document':
        return <FileText className="h-4 w-4" />
      case 'link':
        return <ExternalLink className="h-4 w-4" />
      default:
        return <BookOpen className="h-4 w-4" />
    }
  }

  return (
    <div>
      {/* Hero */}
      <section className="bg-warm">
        <div className="container-site py-12 md:py-16">
          <Link
            to="/courses"
            className="inline-flex items-center gap-2 text-sm text-muted hover:text-primary transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Courses
          </Link>
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <Badge variant="mint">{course.category}</Badge>
            <Badge variant="outline">{course.level}</Badge>
            <Badge variant="outline">{course.format}</Badge>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-charcoal tracking-tight">
            {course.title}
          </h1>
          <p className="mt-4 text-lg text-muted leading-relaxed max-w-3xl">
            {course.description}
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-6 text-sm text-muted">
            <span className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              {course.duration}
            </span>
            <span className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              {course.level}
            </span>
            <span className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              {course.department}
            </span>
          </div>
        </div>
      </section>

      {/* Course Content */}
      <section className="bg-white">
        <div className="container-site section-padding">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Topics */}
              <div className="mb-10">
                <h2 className="text-xl font-bold text-charcoal mb-4">
                  What You Will Learn
                </h2>
                <ul className="space-y-3">
                  {course.topics.map((topic, index) => (
                    <li key={topic} className="flex items-start gap-3">
                      <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                        <span className="text-xs font-medium text-primary">
                          {index + 1}
                        </span>
                      </div>
                      <span className="text-sm text-charcoal">{topic}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Resources */}
              <div>
                <h2 className="text-xl font-bold text-charcoal mb-4">
                  Learning Resources
                </h2>
                <p className="text-sm text-muted mb-6">
                  The following resources are available for this course. Note:
                  Resource links are placeholders for demonstration purposes.
                </p>
                <div className="space-y-4">
                  {course.resources.map((resource) => (
                    <div
                      key={resource.id}
                      className="bg-warm rounded-xl border border-border p-5 flex items-start gap-4"
                    >
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        {resourceIcon(resource.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-charcoal text-sm">
                          {resource.title}
                        </h3>
                        <p className="text-xs text-muted mt-1">
                          {resource.description}
                        </p>
                        <a
                          href={resource.url}
                          className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:text-primary-dark mt-2 transition-colors"
                          onClick={(e) => {
                            if (resource.url === '#') {
                              e.preventDefault()
                            }
                          }}
                        >
                          Open resource
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-mint rounded-xl p-6 sticky top-24">
                <h3 className="font-semibold text-charcoal mb-4">Course Details</h3>
                <dl className="space-y-3 text-sm">
                  <div>
                    <dt className="text-muted">Duration</dt>
                    <dd className="font-medium text-charcoal">{course.duration}</dd>
                  </div>
                  <div>
                    <dt className="text-muted">Level</dt>
                    <dd className="font-medium text-charcoal">{course.level}</dd>
                  </div>
                  <div>
                    <dt className="text-muted">Format</dt>
                    <dd className="font-medium text-charcoal">{course.format}</dd>
                  </div>
                  <div>
                    <dt className="text-muted">Department</dt>
                    <dd className="font-medium text-charcoal">{course.department}</dd>
                  </div>
                  <div>
                    <dt className="text-muted">Resources</dt>
                    <dd className="font-medium text-charcoal">
                      {course.resources.length} items
                    </dd>
                  </div>
                </dl>
                <div className="mt-6 pt-6 border-t border-border">
                  <p className="text-xs text-muted">
                    This is a demo course listing. Course availability and
                    enrollment details will be provided when the full platform
                    launches.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection
        title="Want to Apply Your Learning?"
        subtitle="Our virtual internship program gives you the opportunity to apply your skills in a real organizational context."
        primaryAction={{ label: 'View Internships', to: '/internships' }}
        secondaryAction={{ label: 'Apply Now', to: '/apply' }}
      />
    </div>
  )
}
