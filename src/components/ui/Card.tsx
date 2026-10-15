import { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  hover?: boolean
  onClick?: () => void
}

export default function Card({
  children,
  className = '',
  hover = false,
  onClick,
}: CardProps) {
  const hoverClasses = hover
    ? 'transition-shadow duration-200 hover:shadow-card-hover cursor-pointer'
    : ''

  return (
    <div
      className={`
        bg-white rounded-xl border border-border shadow-card
        ${hoverClasses} ${className}
      `}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={
        onClick
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                onClick()
              }
            }
          : undefined
      }
    >
      {children}
    </div>
  )
}
