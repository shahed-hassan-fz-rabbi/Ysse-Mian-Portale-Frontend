interface SectionHeadingProps {
  title: string
  subtitle?: string
  align?: 'left' | 'center'
  className?: string
}

export default function SectionHeading({
  title,
  subtitle,
  align = 'left',
  className = '',
}: SectionHeadingProps) {
  const alignClass = align === 'center' ? 'text-center mx-auto' : 'text-left'

  return (
    <div className={`max-w-2xl ${alignClass} ${className}`}>
      <h2 className="text-2xl md:text-3xl font-bold text-charcoal tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-muted text-base md:text-lg leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  )
}
