import { Link } from 'react-router-dom'
import { Internship } from '../../types'
import { MapPin, Clock, ArrowRight } from 'lucide-react'
import Badge from '../ui/Badge'

interface InternshipCardProps {
  internship: Internship
}

export default function InternshipCard({ internship }: InternshipCardProps) {
  return (
    <Link
      to={`/internships/${internship.id}`}
      className="group block bg-white rounded-xl border border-border shadow-card p-6 hover:shadow-card-hover transition-shadow duration-200"
    >
      <div className="flex items-start justify-between gap-4 mb-3">
        <Badge variant="mint">{internship.department}</Badge>
        {internship.isDemo && (
          <Badge variant="outline">Demo</Badge>
        )}
      </div>
      <h3 className="font-semibold text-charcoal text-lg mb-2 group-hover:text-primary transition-colors">
        {internship.title}
      </h3>
      <p className="text-sm text-muted leading-relaxed line-clamp-2 mb-4">
        {internship.description}
      </p>
      <div className="flex flex-wrap items-center gap-4 text-xs text-muted mb-4">
        <span className="flex items-center gap-1">
          <MapPin className="h-3.5 w-3.5" />
          {internship.location}
        </span>
        <span className="flex items-center gap-1">
          <Clock className="h-3.5 w-3.5" />
          {internship.duration}
        </span>
      </div>
      <div className="flex items-center gap-1.5 text-sm font-medium text-primary">
        View details
        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
      </div>
    </Link>
  )
}
