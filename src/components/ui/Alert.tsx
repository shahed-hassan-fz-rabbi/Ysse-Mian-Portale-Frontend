import { ReactNode } from 'react'

type Variant = 'success' | 'error' | 'info' | 'warning'

interface AlertProps {
  children: ReactNode
  variant?: Variant
  className?: string
}

const variantClasses: Record<Variant, string> = {
  success: 'bg-green-50 border-green-200 text-green-800',
  error: 'bg-red-50 border-red-200 text-red-800',
  info: 'bg-blue-50 border-blue-200 text-blue-800',
  warning: 'bg-amber-50 border-amber-200 text-amber-800',
}

export default function Alert({
  children,
  variant = 'info',
  className = '',
}: AlertProps) {
  return (
    <div
      role="alert"
      className={`
        rounded-lg border px-4 py-3 text-sm
        ${variantClasses[variant]} ${className}
      `}
    >
      {children}
    </div>
  )
}
