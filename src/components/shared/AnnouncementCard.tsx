import { Announcement } from '../../types'
import { Calendar } from 'lucide-react'
import Badge from '../ui/Badge'

interface AnnouncementCardProps {
  announcement: Announcement
}

export default function AnnouncementCard({ announcement }: AnnouncementCardProps) {
  const formattedDate = new Date(announcement.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <article className="bg-white rounded-xl border border-border shadow-card p-6 hover:shadow-card-hover transition-shadow duration-200">
      <div className="flex items-center gap-3 mb-3">
        <Badge variant="mint">{announcement.category}</Badge>
        <span className="flex items-center gap-1.5 text-xs text-muted">
          <Calendar className="h-3.5 w-3.5" />
          {formattedDate}
        </span>
      </div>
      <h3 className="font-semibold text-charcoal text-base mb-2">
        {announcement.title}
      </h3>
      <p className="text-sm text-muted leading-relaxed">
        {announcement.excerpt}
      </p>
    </article>
  )
}
