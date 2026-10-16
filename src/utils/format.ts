/** Shared date helpers so every page formats dates the same way. */

/** e.g. "Oct 16, 2026". Returns null for missing/invalid values. */
export function formatDate(value: string | Date | null | undefined): string | null {
  if (!value) return null
  const date = value instanceof Date ? value : new Date(value)
  if (Number.isNaN(date.getTime())) return null
  return date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
}

/** True once the given deadline timestamp has passed. */
export function isDeadlinePassed(
  deadline: string | Date | null | undefined,
  now: Date = new Date(),
): boolean {
  if (!deadline) return false
  const date = deadline instanceof Date ? deadline : new Date(deadline)
  if (Number.isNaN(date.getTime())) return false
  return date.getTime() < now.getTime()
}
