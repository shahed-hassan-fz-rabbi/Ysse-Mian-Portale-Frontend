import { Link } from 'react-router-dom'
import { Department } from '../../types'
import { ArrowRight } from 'lucide-react'

interface DepartmentCardProps {
  department: Department
}

export default function DepartmentCard({ department }: DepartmentCardProps) {
  return (
    <Link
      to={`/departments/${department.id}`}
      className="group block bg-white rounded-xl border border-border shadow-card overflow-hidden hover:shadow-card-hover transition-shadow duration-200"
    >
      <div className="aspect-[16/10] overflow-hidden">
        <img
          src={department.image}
          alt={department.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
      </div>
      <div className="p-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-medium text-primary bg-mint px-2 py-0.5 rounded">
            {department.shortName}
          </span>
        </div>
        <h3 className="font-semibold text-charcoal text-lg mb-2 group-hover:text-primary transition-colors">
          {department.name}
        </h3>
        <p className="text-sm text-muted leading-relaxed line-clamp-3">
          {department.description}
        </p>
        <div className="mt-4 flex items-center gap-1.5 text-sm font-medium text-primary">
          Learn more
          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  )
}
