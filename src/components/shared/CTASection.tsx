import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

interface CTASectionProps {
  title: string
  description: string
  primaryAction: { label: string; to: string }
  secondaryAction?: { label: string; to: string }
}

export default function CTASection({
  title,
  description,
  primaryAction,
  secondaryAction,
}: CTASectionProps) {
  return (
    <section className="bg-deep">
      <div className="container-site py-16 md:py-20 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight max-w-2xl mx-auto">
          {title}
        </h2>
        <p className="mt-4 text-white/70 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
          {description}
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to={primaryAction.to}
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white font-medium px-7 py-3 rounded-lg transition-colors duration-200"
          >
            {primaryAction.label}
            <ArrowRight className="h-4 w-4" />
          </Link>
          {secondaryAction && (
            <Link
              to={secondaryAction.to}
              className="inline-flex items-center gap-2 border-2 border-white/30 hover:border-white/60 text-white font-medium px-7 py-3 rounded-lg transition-colors duration-200"
            >
              {secondaryAction.label}
            </Link>
          )}
        </div>
      </div>
    </section>
  )
}
