import { Link } from "react-router-dom"
import { Mail, MapPin, Phone, Facebook, Twitter, Linkedin, Instagram } from "lucide-react"
import { useSiteSettings } from "../../hooks/useSiteSettings"

const DEFAULT_SOCIAL: { label: string; url: string; Icon: typeof Facebook }[] = [
  { label: "Facebook", url: "https://www.facebook.com/ysseglobal", Icon: Facebook },
  { label: "Twitter", url: "https://twitter.com/ysseglobal", Icon: Twitter },
  { label: "LinkedIn", url: "https://www.linkedin.com/company/ysseglobal", Icon: Linkedin },
  { label: "Instagram", url: "https://www.instagram.com/ysseglobal", Icon: Instagram },
]

const quickLinks: { label: string; to: string }[] = [
  { label: "About Us", to: "/about" },
  { label: "Departments", to: "/departments" },
  { label: "Courses", to: "/courses" },
  { label: "Internships", to: "/internships" },
  { label: "Apply Now", to: "/apply" },
  { label: "Contact", to: "/contact" },
]

const DEFAULT_FOOTER_TEXT =
  "Youth School for Social Entrepreneurs (Y SSE) is dedicated to empowering young people to create positive social change through entrepreneurship education, training, and capacity building."

export default function Footer() {
  // Decorative content: on error the footer falls back to its static
  // defaults instead of breaking the page (the homepage surfaces errors).
  const { settings } = useSiteSettings()

  const socialLinks = DEFAULT_SOCIAL.map(({ label, url, Icon }) => {
    const fromSettings =
      label === "Facebook"
        ? settings?.facebook_url
        : label === "Twitter"
          ? settings?.twitter_url
          : label === "LinkedIn"
            ? settings?.linkedin_url
            : settings?.instagram_url
    return { label, url: (fromSettings || "").trim() || url, Icon }
  }).filter((link) => Boolean(link.url))

  const hasContact = Boolean(
    settings?.contact_email || settings?.contact_phone || settings?.contact_address,
  )

  return (
    <footer className="bg-deep text-white">
      <div className="container-site pt-14 md:pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12">
          {/* Brand & mission */}
          <div className="lg:col-span-5">
            <Link to="/" className="inline-block bg-white rounded-xl p-2 shadow-card" title="YSSE home">
              <img
                src="/images/ysse-logo.png"
                alt="YSSE official logo"
                width={200}
                height={200}
                className="h-12 w-auto object-contain"
              />
            </Link>
            <p className="mt-5 text-white/75 text-sm leading-relaxed max-w-md">
              {settings?.footer_text?.trim() || DEFAULT_FOOTER_TEXT}
            </p>
            <p className="mt-4 text-white/40 text-xs">
              This is a demonstration website. Content may not reflect official YSSE information.
            </p>
          </div>

          {/* Quick links */}
          <div className="lg:col-span-3 lg:col-start-7">
            <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-brand mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-white/70 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-brand mb-4">
              Contact
            </h3>
            {hasContact ? (
              <ul className="space-y-3">
                {settings?.contact_email && (
                  <li className="flex items-start gap-2.5">
                    <Mail className="h-4 w-4 mt-0.5 text-white/45 shrink-0" aria-hidden="true" />
                    <a
                      href={`mailto:${settings.contact_email}`}
                      className="text-sm text-white/70 hover:text-white transition-colors break-all"
                    >
                      {settings.contact_email}
                    </a>
                  </li>
                )}
                {settings?.contact_phone && (
                  <li className="flex items-start gap-2.5">
                    <Phone className="h-4 w-4 mt-0.5 text-white/45 shrink-0" aria-hidden="true" />
                    <a
                      href={`tel:${settings.contact_phone}`}
                      className="text-sm text-white/70 hover:text-white transition-colors"
                    >
                      {settings.contact_phone}
                    </a>
                  </li>
                )}
                {settings?.contact_address && (
                  <li className="flex items-start gap-2.5">
                    <MapPin className="h-4 w-4 mt-0.5 text-white/45 shrink-0" aria-hidden="true" />
                    <span className="text-sm text-white/70">{settings.contact_address}</span>
                  </li>
                )}
              </ul>
            ) : (
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors"
              >
                <Mail className="h-4 w-4 text-white/45" aria-hidden="true" />
                Get in touch via our contact page
              </Link>
            )}
          </div>
        </div>

        {/* Social & copyright */}
        <div className="mt-12 pt-7 border-t border-white/10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-white/50">
              &copy; {new Date().getFullYear()} YSSE — Youth School for Social Entrepreneurs
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map(({ label, url, Icon }) => (
                <a
                  key={label}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-9 w-9 inline-flex items-center justify-center rounded-full border border-white/20 text-white/60 hover:text-white hover:border-brand hover:bg-white/5 transition-colors duration-200"
                  aria-label={label}
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
