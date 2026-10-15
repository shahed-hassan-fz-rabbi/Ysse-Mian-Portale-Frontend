import { Link } from 'react-router-dom'
import { Mail, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-deep text-white">
      <div className="container-site py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Organization Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-white text-sm font-bold">Y</span>
              </div>
              <span className="font-bold text-xl">Y SSE</span>
            </div>
            <p className="text-white/70 text-sm leading-relaxed max-w-md">
              Youth School for Social Entrepreneurs (Y SSE) is dedicated to
              empowering young people to create positive social change through
              entrepreneurship education, training, and capacity building.
            </p>
            <p className="text-white/50 text-xs mt-4">
              Note: This is a demo website. Content shown here is for
              demonstration purposes only and may not reflect official YSSE
              information.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-4 text-white/90">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link
                  to="/about"
                  className="text-sm text-white/70 hover:text-white transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/departments"
                  className="text-sm text-white/70 hover:text-white transition-colors"
                >
                  Departments
                </Link>
              </li>
              <li>
                <Link
                  to="/courses"
                  className="text-sm text-white/70 hover:text-white transition-colors"
                >
                  Courses
                </Link>
              </li>
              <li>
                <Link
                  to="/internships"
                  className="text-sm text-white/70 hover:text-white transition-colors"
                >
                  Internships
                </Link>
              </li>
              <li>
                <Link
                  to="/apply"
                  className="text-sm text-white/70 hover:text-white transition-colors"
                >
                  Apply Now
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-sm text-white/70 hover:text-white transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-4 text-white/90">
              Contact
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5">
                <Mail className="h-4 w-4 mt-0.5 text-white/50 shrink-0" />
                <span className="text-sm text-white/70">
                  Visit official website for contact details
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 mt-0.5 text-white/50 shrink-0" />
                <span className="text-sm text-white/70">
                  Visit official website for location
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Links & Copyright */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-white/50">
              &copy; {new Date().getFullYear()} YSSE Demo. For demonstration purposes only.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://www.facebook.com/ysseglobal"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/50 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com/ysseglobal"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/50 hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="https://www.linkedin.com/company/ysseglobal"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/50 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="https://www.instagram.com/ysseglobal"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/50 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
