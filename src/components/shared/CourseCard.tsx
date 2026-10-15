import { Link } from 'react-router-dom'
import { Course } from '../../types'
import { Clock, BarChart3, ArrowRight } from 'lucide-react'
import Badge from '../ui/Badge'

interface CourseCardProps {
  course: Course
}

export default function CourseCard({ course }: CourseCardProps) {
  return (
    <Link
      to={`/courses/${course.id}`}
      className="group block bg-white rounded-xl border border-border shadow-card overflow-hidden hover:shadow-card-hover transition-shadow duration-200"
    >
      <div className="aspect-[16/10] overflow-hidden">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
      </div>
      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <Badge variant="mint">{course.category}</Badge>
          <Badge variant="outline">{course.level}</Badge>
        </div>
        <h3 className="font-semibold text-charcoal text-lg mb-2 group-hover:text-primary transition-colors">
          {course.title}
        </h3>
        <p className="text-sm text-muted leading-relaxed line-clamp-2 mb-4">
          {course.description}
        </p>
        <div className="flex items-center gap-4 text-xs text-muted">
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {course.duration}
          </span>
          <span className="flex items-center gap-1">
            <BarChart3 className="h-3.5 w-3.5" />
            {course.format}
          </span>
        </div>
        <div className="mt-4 flex items-center gap-1.5 text-sm font-medium text-primary">
          View course
          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  )
}
