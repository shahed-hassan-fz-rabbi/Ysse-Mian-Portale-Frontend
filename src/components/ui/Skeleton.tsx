interface SkeletonProps {
  className?: string
}

/** Neutral loading placeholder block. Decorative — hidden from assistive tech. */
export function Skeleton({ className = "" }: SkeletonProps) {
  return <span aria-hidden="true" className={`skeleton ${className}`} />
}

interface SkeletonCardProps {
  lines?: number
  withBadge?: boolean
}

/** Placeholder shaped like a content card. */
export function SkeletonCard({ lines = 2, withBadge = false }: SkeletonCardProps) {
  return (
    <div className="rounded-xl border border-border bg-white p-6" aria-hidden="true">
      {withBadge && <Skeleton className="h-5 w-20 mb-4" />}
      <Skeleton className="h-6 w-3/4" />
      <div className="mt-4 space-y-2.5">
        <Skeleton className="h-4 w-full" />
        {lines > 1 && <Skeleton className="h-4 w-5/6" />}
        {lines > 2 && <Skeleton className="h-4 w-2/3" />}
      </div>
    </div>
  )
}

interface SkeletonGridProps {
  count?: number
  className?: string
  lines?: number
  withBadge?: boolean
}

/** A responsive grid of placeholder cards used while content loads. */
export function SkeletonGrid({
  count = 4,
  className = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6",
  lines = 2,
  withBadge = false,
}: SkeletonGridProps) {
  return (
    <div className={className} role="status" aria-label="Loading content">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} lines={lines} withBadge={withBadge} />
      ))}
    </div>
  )
}
