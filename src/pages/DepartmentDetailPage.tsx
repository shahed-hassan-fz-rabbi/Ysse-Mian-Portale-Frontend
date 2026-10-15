import { useParams, Link, Navigate } from 'react-router-dom'
import { ArrowLeft, Target, Briefcase, Activity, Users } from 'lucide-react'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { departments } from '../data/departments'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import CTASection from '../components/shared/CTASection'

export default function DepartmentDetailPage() {
  const { id } = useParams<{ id: string }>()
  useDocumentTitle('Department Details')

  const department = departments.find((d) => d.id === id)

  if (!department) {
    return <Navigate to="/departments" replace />
  }

  return (
    <div>
      {/* Hero */}
      <section className="bg-warm">
        <div className="container-site py-12 md:py-16">
          <Link
            to="/departments"
            className="inline-flex items-center gap-2 text-sm text-muted hover:text-primary transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Departments
          </Link>
          <div className="flex items-center gap-3 mb-3">
            <Badge variant="primary">{department.shortName}</Badge>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-charcoal tracking-tight">
            {department.name}
          </h1>
          <p className="mt-4 text-lg text-muted leading-relaxed max-w-3xl">
            {department.description}
          </p>
        </div>
      </section>

      {/* Image Banner */}
      <section className="bg-white">
        <div className="container-site py-8">
          <div className="rounded-xl overflow-hidden aspect-[21/9]">
            <img
              src={department.image}
              alt={department.name}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* Goals and Responsibilities */}
      <section className="bg-white">
        <div className="container-site pb-16 md:pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Goals */}
            <div className="bg-mint rounded-xl p-8">
              <div className="flex items-center gap-3 mb-5">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Target className="h-5 w-5 text-primary" />
                </div>
                <h2 className="text-xl font-bold text-charcoal">Department Goals</h2>
              </div>
              <ul className="space-y-3">
                {department.goals.map((goal) => (
                  <li key={goal} className="flex items-start gap-3">
                    <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                      <div className="h-2 w-2 rounded-full bg-primary" />
                    </div>
                    <span className="text-sm text-charcoal">{goal}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Responsibilities */}
            <div className="bg-warm rounded-xl p-8 border border-border">
              <div className="flex items-center gap-3 mb-5">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Briefcase className="h-5 w-5 text-primary" />
                </div>
                <h2 className="text-xl font-bold text-charcoal">Key Responsibilities</h2>
              </div>
              <ul className="space-y-3">
                {department.responsibilities.map((resp) => (
                  <li key={resp} className="flex items-start gap-3">
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

      {/* Activities */}
      <section className="bg-warm">
        <div className="container-site section-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-charcoal tracking-tight mb-4">
                Key Activities
              </h2>
              <p className="text-muted leading-relaxed mb-6">
                The {department.name} department engages in a range of activities
                that support YSSE's overall mission and contribute to the
                development of young social entrepreneurs.
              </p>
              <ul className="space-y-3">
                {department.activities.map((activity) => (
                  <li key={activity} className="flex items-start gap-3">
                    <Activity className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm text-charcoal">{activity}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-xl p-8 border border-border">
              <div className="flex items-center gap-3 mb-5">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-charcoal">Team</h3>
              </div>
              <p className="text-sm text-muted mb-4">
                <span className="font-medium text-charcoal">{department.headOfDepartment}</span>
              </p>
              <ul className="space-y-3">
                {department.teamMembers.map((member) => (
                  <li
                    key={member.name}
                    className="flex items-center gap-3 text-sm"
                  >
                    <div className="h-8 w-8 rounded-full bg-mint flex items-center justify-center">
                      <span className="text-xs font-medium text-primary">
                        {member.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <span className="font-medium text-charcoal">{member.name}</span>
                      <span className="text-muted ml-2">— {member.role}</span>
                    </div>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-muted">
                Note: Team member names shown are sample designations for demonstration purposes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection
        title="Want to Join This Team?"
        subtitle="Explore our virtual internship opportunities and find a role that matches your skills and interests."
        primaryAction={{ label: 'View Internships', to: '/internships' }}
        secondaryAction={{ label: 'Apply Now', to: '/apply' }}
      />
    </div>
  )
}
