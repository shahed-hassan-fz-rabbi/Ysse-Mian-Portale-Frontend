import { ReactNode } from 'react'

type Variant = 'primary' | 'deep' | 'mint' | 'outline'

interface BadgeProps {
  children: ReactNode
  variant?: Variant
  className?: string
}

const variantClasses: Record<Variant, string> = {
  primary: 'bg-primary text-white',
  deep: 'bg-deep text-white',
  mint: 'bg-mint text-deep',
  outline: 'border border-border text-muted',
}

export default function Badge({
  children,
  variant = 'mint',
  className = '',
}: BadgeProps) {
  return (
    <span
      className={`
        inline-flex items-center rounded-full px-3 py-1 text-xs font-medium
        ${variantClasses[variant]} ${className}
      `}
    >
      {children}
    </span>
  )
}
