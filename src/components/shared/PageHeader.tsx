interface PageHeaderProps {
  title: string
  description?: string
  /** Small uppercase editorial label shown above the title. */
  eyebrow?: string
}

/**
 * Consistent warm hero used by every public content page
 * (About, Departments, Courses, Internships, Team, Contact).
 */
export default function PageHeader({ title, description, eyebrow }: PageHeaderProps) {
  return (
    <section className="bg-warm">
      <div className="container-site py-12 md:py-16">
        <div className="max-w-3xl">
          {eyebrow && (
            <p className="eyebrow mb-3 justify-start">
              <span className="h-0.5 w-8 bg-brand" aria-hidden="true" />
              {eyebrow}
            </p>
          )}
          <h1 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-charcoal tracking-tight">
            {title}
          </h1>
          {description && (
            <p className="mt-4 text-lg text-muted leading-relaxed">{description}</p>
          )}
        </div>
      </div>
    </section>
  )
}
