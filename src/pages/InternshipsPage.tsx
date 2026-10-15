import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { internships } from '../data/internships'
import InternshipCard from '../components/shared/InternshipCard'
import SectionHeading from '../components/ui/SectionHeading'
import CTASection from '../components/shared/CTASection'

export default function InternshipsPage() {
  useDocumentTitle('Internship Opportunities')

  return (
    <div>
      {/* Hero */}
      <section className="bg-warm">
        <div className="container-site py-16 md:py-20">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-charcoal tracking-tight">
              Virtual Internship Opportunities
            </h1>
            <p className="mt-4 text-lg text-muted leading-relaxed">
              Gain practical experience in the social entrepreneurship sector
              through our virtual internship program. We offer flexible
              opportunities across multiple departments for students and
              recent graduates.
            </p>
          </div>
        </div>
      </section>

      {/* Opportunities */}
      <section className="bg-white">
        <div className="container-site section-padding">
          <SectionHeading
            title="Available Positions"
            subtitle="Browse our current virtual internship openings. Each position offers a unique opportunity to contribute to our mission while developing your professional skills."
            className="mb-10"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {internships.map((internship) => (
              <InternshipCard key={internship.id} internship={internship} />
            ))}
          </div>
        </div>
      </section>

      {/* How to Apply */}
      <section className="bg-warm">
        <div className="container-site section-padding">
          <SectionHeading
            title="How to Apply"
            subtitle="Our application process is straightforward. Follow these steps to submit your application."
            className="mb-10"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                step: '1',
                title: 'Choose a Position',
                description:
                  'Browse available positions and select the one that best matches your skills and interests.',
              },
              {
                step: '2',
                title: 'Submit Application',
                description:
                  'Complete the application form with your details, skills, and motivation statement.',
              },
              {
                step: '3',
                title: 'Track Progress',
                description:
                  'Use our application status tracker to follow your application through the review process.',
              },
            ].map((item) => (
              <div
                key={item.step}
                className="bg-white rounded-xl p-6 border border-border"
              >
                <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <span className="font-bold text-primary">{item.step}</span>
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

      {/* CTA */}
      <CTASection
        title="Ready to Apply?"
        subtitle="Complete your application and take the first step toward gaining meaningful experience in social entrepreneurship."
        primaryAction={{ label: 'Apply Now', to: '/apply' }}
        secondaryAction={{ label: 'Contact Us', to: '/contact' }}
      />
    </div>
  )
}
