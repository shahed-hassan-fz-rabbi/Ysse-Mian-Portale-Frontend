import { useParams, Link, Navigate } from 'react-router-dom'
import { ArrowLeft, MapPin, Clock, CheckCircle, AlertCircle } from 'lucide-react'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { internships } from '../data/internships'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import CTASection from '../components/shared/CTASection'

export default function InternshipDetailPage() {
  const { id } = useParams<{ id: string }>()
  useDocumentTitle('Internship Details')

  const internship = internships.find((i) => i.id === id)

  if (!internship) {
    return <Navigate to="/internships" replace />
  }

  return (
    <div>
      {/* Hero */}
      <section className="bg-warm">
        <div className="container-site py-12 md:py-16">
          <Link
            to="/internships"
            className="inline-flex items-center gap-2 text-sm text-muted hover:text-primary transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Opportunities
          </Link>
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <Badge variant="mint">{internship.department}</Badge>
            {internship.isDemo && (
              <Badge variant="outline">
                <AlertCircle className="h-3 w-3 mr-1" />
                Demo Data
              </Badge>
            )}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-charcoal tracking-tight">
            {internship.title}
          </h1>
          <p className="mt-4 text-lg text-muted leading-relaxed max-w-3xl">
            {internship.description}
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-6 text-sm text-muted">
            <span className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              {internship.location}
            </span>
            <span className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              {internship.duration}
            </span>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="bg-white">
        <div className="container-site section-padding">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Responsibilities */}
              <div className="mb-10">
                <h2 className="text-xl font-bold text-charcoal mb-4">
                  Responsibilities
                </h2>
                <ul className="space-y-3">
                  {internship.responsibilities.map((resp) => (
                    <li key={resp} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm text-charcoal">{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Requirements */}
              <div>
                <h2 className="text-xl font-bold text-charcoal mb-4">
                  Eligibility Requirements
                </h2>
                <ul className="space-y-3">
                  {internship.requirements.map((req) => (
                    <li key={req} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm text-charcoal">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-mint rounded-xl p-6 sticky top-24">
                <h3 className="font-semibold text-charcoal mb-4">Position Details</h3>
                <dl className="space-y-3 text-sm">
                  <div>
                    <dt className="text-muted">Department</dt>
                    <dd className="font-medium text-charcoal">{internship.department}</dd>
                  </div>
                  <div>
                    <dt className="text-muted">Location</dt>
                    <dd className="font-medium text-charcoal">{internship.location}</dd>
                  </div>
                  <div>
                    <dt className="text-muted">Duration</dt>
                    <dd className="font-medium text-charcoal">{internship.duration}</dd>
                  </div>
                  <div>
                    <dt className="text-muted">Application Deadline</dt>
                    <dd className="font-medium text-charcoal">{internship.deadline}</dd>
                  </div>
                </dl>
                <div className="mt-6 pt-6 border-t border-border">
                  <Link to="/apply">
                    <Button className="w-full">Apply Now</Button>
                  </Link>
                  <p className="text-xs text-muted mt-3 text-center">
                    Note: This is a demo application. No real data will be submitted.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection
        title="Interested in Other Opportunities?"
        subtitle="Explore our courses to build relevant skills, or check out other departments to find the right fit for you."
        primaryAction={{ label: 'View Courses', to: '/courses' }}
        secondaryAction={{ label: 'All Departments', to: '/departments' }}
      />
    </div>
  )
}
