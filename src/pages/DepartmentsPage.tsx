import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { departments } from '../data/departments'
import DepartmentCard from '../components/shared/DepartmentCard'
import SectionHeading from '../components/ui/SectionHeading'
import CTASection from '../components/shared/CTASection'

export default function DepartmentsPage() {
  useDocumentTitle('Departments')

  return (
    <div>
      {/* Hero */}
      <section className="bg-warm">
        <div className="container-site py-16 md:py-20">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-charcoal tracking-tight">
              Our Departments
            </h1>
            <p className="mt-4 text-lg text-muted leading-relaxed">
              Y SSE operates through specialized departments, each contributing
              to our mission of empowering young social entrepreneurs. Learn
              about their goals, activities, and how they work together.
            </p>
          </div>
        </div>
      </section>

      {/* Department Listing */}
      <section className="bg-white">
        <div className="container-site section-padding">
          <SectionHeading
            title="Department Structure"
            subtitle="Each department focuses on a distinct aspect of our work, from training and research to community engagement and operations."
            className="mb-10"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {departments.map((dept) => (
              <DepartmentCard key={dept.id} department={dept} />
            ))}
          </div>
        </div>
      </section>

      {/* Organizational Overview */}
      <section className="bg-warm">
        <div className="container-site section-padding">
          <SectionHeading
            title="How We Work Together"
            subtitle="Our departments collaborate to provide a comprehensive ecosystem of support for young social entrepreneurs. Training programs are informed by research insights, amplified through community engagement, and supported by efficient operations."
            className="mb-10"
          />
          <div className="bg-white rounded-xl p-8 border border-border">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {departments.map((dept, index) => (
                <div key={dept.id} className="text-center">
                  <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-primary/10 text-primary font-bold text-lg mb-3">
                    {index + 1}
                  </div>
                  <h3 className="font-semibold text-charcoal text-sm mb-1">
                    {dept.shortName}
                  </h3>
                  <p className="text-xs text-muted">{dept.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection
        title="Interested in Working With Us?"
        subtitle="We offer virtual internship opportunities across our departments. Gain hands-on experience while contributing to our mission."
        primaryAction={{ label: 'View Opportunities', to: '/internships' }}
        secondaryAction={{ label: 'Contact Us', to: '/contact' }}
      />
    </div>
  )
}
