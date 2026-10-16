import { useEffect, useState } from "react"
import { api } from "../lib/api"
import { SiteSettings } from "../types"

interface UseSiteSettingsResult {
  settings: SiteSettings | null
  error: string | null
}

/**
 * Loads the public site settings row once per mount.
 * Consumers that only decorate the page (e.g. the footer) can ignore `error`
 * and render their static fallback instead; the error is still surfaced here
 * so callers can show it when the content matters (e.g. the homepage).
 */
export function useSiteSettings(): UseSiteSettingsResult {
  const [settings, setSettings] = useState<SiteSettings | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let active = true

    api
      .get<SiteSettings>("/api/content/settings")
      .then((data) => {
        if (active) setSettings(data)
      })
      .catch((err: unknown) => {
        if (active) {
          setError(err instanceof Error ? err.message : "Failed to load site settings")
        }
      })

    return () => {
      active = false
    }
  }, [])

  return { settings, error }
}

export default useSiteSettings
