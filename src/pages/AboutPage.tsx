import { useDocumentTitle } from "../hooks/useDocumentTitle"
import { Target, Eye, Compass, Heart } from "lucide-react"
import SectionHeading from "../components/ui/SectionHeading"
import CTASection from "../components/shared/CTASection"

export default function AboutPage() {
  useDocumentTitle("About YSSE")

  return (
    <div>
      {/* Hero */}
      <section className="bg-warm">
        <div className="container-site py-16 md:py-20">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-charcoal tracking-tight">
              About Y SSE
            </h1>
            <p className="mt-4 text-lg text-muted leading-relaxed">
              Youth School for Social Entrepreneurs (Y SSE) is an organization
              dedicated to nurturing the next generation of social entrepreneurs
              who can address pressing social challenges through innovative,
              sustainable solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Organization Overview */}
      <section className="bg-white">
        <div className="container-site section-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionHeading
                title="Who We Are"
                subtitle="Y SSE is a youth-focused organization that believes in the power of entrepreneurship to drive social change. We work with young people to develop their entrepreneurial mindsets, build practical business skills, and support them in launching ventures that create measurable social impact."
              />
              <p className="mt-4 text-muted leading-relaxed">
                Our approach is rooted in the conviction that young people are
                not just leaders of tomorrow — they are changemakers today. By
                providing them with the right knowledge, tools, networks, and
                support systems, we help transform their ideas into
                sustainable enterprises that address real community needs.
              </p>
            </div>
            <div className="rounded-xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&q=80"
                alt="Young people collaborating in a workshop"
                className="w-full h-full object-cover aspect-[4/3]"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission and Vision */}
      <section className="bg-mint">
        <div className="container-site section-padding">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-card">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Target className="h-5 w-5 text-primary" />
                </div>
                <h2 className="text-xl font-bold text-charcoal">Our Mission</h2>
              </div>
              <p className="text-muted leading-relaxed">
                To empower young people with the knowledge, skills, and support
                systems needed to become successful social entrepreneurs who
                create sustainable, positive change in their communities.
              </p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-card">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Eye className="h-5 w-5 text-primary" />
                </div>
                <h2 className="text-xl font-bold text-charcoal">Our Vision</h2>
              </div>
              <p className="text-muted leading-relaxed">
                A world where every young person has the opportunity and
                capability to harness entrepreneurship as a tool for solving
                social problems and building more inclusive, equitable
                communities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Objectives */}
      <section className="bg-white">
        <div className="container-site section-padding">
          <SectionHeading
            title="Our Objectives"
            subtitle="Our work is guided by clear objectives that shape our programs and services."
            className="mb-10"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Compass,
                title: "Entrepreneurship Education",
                description:
                  "Provide comprehensive entrepreneurship education that equips young people with business planning, financial literacy, and management skills.",
              },
              {
                icon: Heart,
                title: "Social Impact Focus",
                description:
                  "Foster a deep understanding of social challenges and train participants to develop ventures that create measurable, sustainable impact.",
              },
              {
                icon: Target,
                title: "Capacity Building",
                description:
                  "Build the practical capacities of young entrepreneurs through training, mentorship, and hands-on learning experiences.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-warm rounded-xl p-6 border border-border"
              >
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <item.icon className="h-5 w-5 text-primary" />
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

      {/* Areas of Work */}
      <section className="bg-warm">
        <div className="container-site section-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="rounded-xl overflow-hidden order-2 lg:order-1">
              <img
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80"
                alt="Training workshop in progress"
                className="w-full h-full object-cover aspect-[4/3]"
                loading="lazy"
              />
            </div>
            <div className="order-1 lg:order-2">
              <SectionHeading
                title="Areas of Work"
                subtitle="Our programs span several key areas of social entrepreneurship development."
              />
              <ul className="mt-6 space-y-4">
                {[
                  "Entrepreneurship training and bootcamps",
                  "Business model design and validation",
                  "Impact measurement and evaluation",
                  "Leadership and team development",
                  "Financial management for social ventures",
                  "Research and knowledge production",
                ].map((area) => (
                  <li key={area} className="flex items-start gap-3">
                    <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                      <div className="h-2 w-2 rounded-full bg-primary" />
                    </div>
                    <span className="text-sm text-charcoal">{area}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection
        title="Join the YSSE Community"
        description="Explore our programs, learn about our departments, or discover internship opportunities to get involved."
        primaryAction={{ label: "Explore Courses", to: "/courses" }}
        secondaryAction={{ label: "View Departments", to: "/departments" }}
      />
    </div>
  )
}
