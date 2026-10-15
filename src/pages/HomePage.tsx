import { Link } from 'react-router-dom'
import { ArrowRight, Users, BookOpen, Lightbulb, Globe } from 'lucide-react'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { departments } from '../data/departments'
import { courses } from '../data/courses'
import { internships } from '../data/internships'
import { announcements } from '../data/announcements'
import DepartmentCard from '../components/shared/DepartmentCard'
import CourseCard from '../components/shared/CourseCard'
import InternshipCard from '../components/shared/InternshipCard'
import AnnouncementCard from '../components/shared/AnnouncementCard'
import CTASection from '../components/shared/CTASection'
import SectionHeading from '../components/ui/SectionHeading'
import Badge from '../components/ui/Badge'

export default function HomePage() {
  useDocumentTitle('')

  const featuredCourses = courses.slice(0, 3)
  const featuredInternships = internships.slice(0, 2)

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-warm">
        <div className="container-site py-16 md:py-24 lg:py-32">
          <div className="max-w-3xl">
            <Badge variant="mint" className="mb-4">
              Youth School for Social Entrepreneurs
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-charcoal tracking-tight leading-tight">
              Empowering Young People to Create{' '}
              <span className="text-primary">Positive Social Change</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-muted leading-relaxed max-w-2xl">
              YSSE provides entrepreneurship education, training, and capacity
              building for young social entrepreneurs. We equip young people
              with the skills, knowledge, and support needed to build
              sustainable ventures that address social challenges.
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
                className="inline-flex items-center justify-center gap-2 border-2 border-primary text-primary hover:bg-mint font-medium px-7 py-3 rounded-lg transition-colors duration-200"
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
                title="Building the Next Generation of Social Entrepreneurs"
                subtitle="Y SSE works to unlock the potential of young people to become effective social entrepreneurs who can identify, address, and solve pressing social problems in their communities."
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {departments.map((dept) => (
              <DepartmentCard key={dept.id} department={dept} />
            ))}
          </div>
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {announcements.map((ann) => (
              <AnnouncementCard key={ann.id} announcement={ann} />
            ))}
          </div>
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredInternships.map((internship) => (
              <InternshipCard key={internship.id} internship={internship} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection
        title="Ready to Start Your Social Entrepreneurship Journey?"
        subtitle="Explore our courses, apply for an internship, or get in touch to learn more about how YSSE can support you."
        primaryAction={{ label: 'Apply Now', to: '/apply' }}
        secondaryAction={{ label: 'Contact Us', to: '/contact' }}
      />
    </div>
  )
}
