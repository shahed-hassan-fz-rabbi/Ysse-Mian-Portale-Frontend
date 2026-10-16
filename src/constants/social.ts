import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react"
import { SiteSettings } from "../types"

export interface SocialLink {
  label: string
  url: string
  Icon: typeof Facebook
}

/** Official YSSE social profiles — fallback when site settings are empty. */
const DEFAULT_SOCIAL: SocialLink[] = [
  { label: "Facebook", url: "https://www.facebook.com/ysseglobal", Icon: Facebook },
  { label: "Twitter", url: "https://twitter.com/ysseglobal", Icon: Twitter },
  { label: "LinkedIn", url: "https://www.linkedin.com/company/ysseglobal", Icon: Linkedin },
  { label: "Instagram", url: "https://www.instagram.com/ysseglobal", Icon: Instagram },
]

/**
 * Resolves social links: site settings win when set, otherwise the official
 * defaults are used. Links with no URL at all are dropped.
 */
export function getSocialLinks(settings: SiteSettings | null | undefined): SocialLink[] {
  const fromSettings: Record<string, string | null> = {
    Facebook: settings?.facebook_url ?? null,
    Twitter: settings?.twitter_url ?? null,
    LinkedIn: settings?.linkedin_url ?? null,
    Instagram: settings?.instagram_url ?? null,
  }

  return DEFAULT_SOCIAL.map((link) => {
    const configured = fromSettings[link.label]
    const url = configured && configured.trim() ? configured.trim() : link.url
    return { ...link, url }
  }).filter((link) => Boolean(link.url))
}
