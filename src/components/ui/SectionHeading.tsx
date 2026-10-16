interface SectionHeadingProps {
  title: string
  subtitle?: string
  /** Small uppercase editorial label shown above the title. */
  eyebrow?: string
  align?: 'left' | 'center'
  className?: string
}

export default function SectionHeading({
  title,
  subtitle,
  eyebrow,
  align = 'left',
  className = '',
}: SectionHeadingProps) {
  const alignClass = align === 'center' ? 'text-center mx-auto' : 'text-left'
  const eyebrowClass =
    align === 'center' ? 'justify-center' : 'justify-start'

  return (
    <div className={`max-w-2xl ${alignClass} ${className}`}>
      {eyebrow && (
        <p className={`eyebrow mb-3 ${eyebrowClass}`}>
          <span className="h-0.5 w-8 bg-brand" aria-hidden="true" />
          {eyebrow}
        </p>
      )}
      <h2 className="text-title font-bold text-charcoal">{title}</h2>
      {subtitle && (
        <p className="mt-3 text-muted text-base md:text-lg leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  )
}
