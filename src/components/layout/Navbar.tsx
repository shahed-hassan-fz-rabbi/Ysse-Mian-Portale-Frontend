import { useEffect, useRef, useState } from "react"
import { Link, NavLink, useNavigate } from "react-router-dom"
import { Menu, X, LogOut, User, Shield, ChevronDown, LayoutDashboard } from "lucide-react"
import { useAuth } from "../../context/AuthContext"
import { NavItem } from "../../types"

const navItems: NavItem[] = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Departments", path: "/departments" },
  { label: "Courses", path: "/courses" },
  { label: "Internship", path: "/internships" },
  { label: "Team", path: "/team" },
  { label: "Contact", path: "/contact" },
]

function navLinkClass(isActive: boolean) {
  return `px-3.5 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
    isActive
      ? "text-primary bg-mint font-semibold"
      : "text-charcoal/80 hover:text-primary hover:bg-mint/60"
  }`
}

export default function Navbar() {
  const { user, logout } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  // Close the profile menu on outside click or Escape (accessible dropdown)
  useEffect(() => {
    if (!menuOpen) return

    function handlePointerDown(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false)
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setMenuOpen(false)
    }

    document.addEventListener("mousedown", handlePointerDown)
    document.addEventListener("keydown", handleKeyDown)
    return () => {
      document.removeEventListener("mousedown", handlePointerDown)
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [menuOpen])

  async function handleLogout() {
    setMenuOpen(false)
    setIsOpen(false)
    await logout()
    navigate("/")
  }

  const initials = user
    ? user.full_name
        .trim()
        .split(/\s+/)
        .map((part) => part[0] || "")
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : ""

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border shadow-nav">
      <nav className="container-site" aria-label="Main navigation">
        <div className="flex items-center justify-between h-16 md:h-18">
          {/* Brand */}
          <Link
            to="/"
            className="flex items-center shrink-0 py-2"
            title="YSSE — Youth School for Social Entrepreneurs"
            onClick={() => setIsOpen(false)}
          >
            <img
              src="/images/ysse-logo.png"
              alt="YSSE official logo"
              width={200}
              height={200}
              className="h-11 md:h-12 w-auto max-w-[180px] object-contain"
            />
          </Link>

          {/* Desktop Nav (lg+ — below that the burger menu is used so the
              wrapping header never overflows at tablet widths) */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <NavLink key={item.path} to={item.path} className={({ isActive }) => navLinkClass(isActive)}>
                {item.label}
              </NavLink>
            ))}
          </div>

          {/* Auth area */}
          <div className="hidden lg:flex items-center gap-2">
            {user ? (
              <>
                <div className="relative" ref={menuRef}>
                  <button
                    type="button"
                    onClick={() => setMenuOpen((open) => !open)}
                    aria-haspopup="menu"
                    aria-expanded={menuOpen}
                    className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-sm font-medium text-charcoal hover:bg-mint transition-colors duration-200"
                  >
                    <span
                      aria-hidden="true"
                      className="h-8 w-8 rounded-full bg-primary text-white text-[0.6875rem] font-semibold flex items-center justify-center"
                    >
                      {initials}
                    </span>
                    <span className="hidden lg:inline max-w-[9rem] truncate">{user.full_name}</span>
                    <ChevronDown
                      aria-hidden="true"
                      className={`h-4 w-4 text-muted transition-transform duration-200 ${menuOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  {menuOpen && (
                    <div
                      role="menu"
                      aria-label="Account menu"
                      className="absolute right-0 mt-2 w-60 rounded-xl border border-border bg-white p-1.5 shadow-card-hover animate-fade-down origin-top"
                    >
                      <div className="px-3 py-2.5 mb-1 border-b border-border/70">
                        <p className="text-sm font-semibold text-charcoal truncate">{user.full_name}</p>
                        <p className="text-xs text-muted">
                          {user.role === "admin" ? "Administrator" : "Member"}
                        </p>
                      </div>
                      <Link
                        role="menuitem"
                        to="/dashboard"
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-charcoal hover:bg-mint hover:text-primary transition-colors"
                      >
                        <LayoutDashboard className="h-4 w-4" aria-hidden="true" />
                        Dashboard
                      </Link>
                      {user.role === "admin" && (
                        <Link
                          role="menuitem"
                          to="/admin"
                          onClick={() => setMenuOpen(false)}
                          className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-charcoal hover:bg-mint hover:text-primary transition-colors"
                        >
                          <Shield className="h-4 w-4" aria-hidden="true" />
                          Admin Panel
                        </Link>
                      )}
                      <button
                        role="menuitem"
                        type="button"
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-red-600 hover:bg-red-50 transition-colors text-left"
                      >
                        <LogOut className="h-4 w-4" aria-hidden="true" />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <NavLink to="/login" className={({ isActive }) => navLinkClass(isActive)}>
                  Login
                </NavLink>
                <Link
                  to="/register"
                  className="px-4 py-2 rounded-lg text-sm font-semibold bg-primary text-white hover:bg-primary-dark transition-colors duration-200"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button (shown below lg) */}
          <button
            className="lg:hidden p-2 rounded-lg text-charcoal hover:bg-mint transition-colors"
            onClick={() => setIsOpen((open) => !open)}
            aria-expanded={isOpen}
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isOpen && (
          <div className="lg:hidden pb-4 border-t border-border pt-4 animate-fade-down origin-top">
            <div className="flex flex-col gap-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200 ${
                      isActive
                        ? "text-primary bg-mint font-semibold"
                        : "text-charcoal hover:bg-mint/60 hover:text-primary"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
              <div className="mt-3 pt-3 border-t border-border">
                {user ? (
                  <div className="flex flex-col gap-1">
                    <div className="px-3 py-2 mb-1">
                      <p className="text-sm font-semibold text-charcoal truncate">{user.full_name}</p>
                      <p className="text-xs text-muted">
                        {user.role === "admin" ? "Administrator" : "Member"}
                      </p>
                    </div>
                    <NavLink
                      to="/dashboard"
                      onClick={() => setIsOpen(false)}
                      className="px-3 py-2.5 rounded-lg text-sm font-medium text-charcoal hover:bg-mint/60 hover:text-primary flex items-center gap-2"
                    >
                      <User className="h-4 w-4" aria-hidden="true" />
                      Dashboard
                    </NavLink>
                    {user.role === "admin" && (
                      <NavLink
                        to="/admin"
                        onClick={() => setIsOpen(false)}
                        className="px-3 py-2.5 rounded-lg text-sm font-medium text-charcoal hover:bg-mint/60 hover:text-primary flex items-center gap-2"
                      >
                        <Shield className="h-4 w-4" aria-hidden="true" />
                        Admin Panel
                      </NavLink>
                    )}
                    <button
                      onClick={handleLogout}
                      className="px-3 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 flex items-center gap-2 text-left"
                    >
                      <LogOut className="h-4 w-4" aria-hidden="true" />
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2">
                    <NavLink
                      to="/login"
                      onClick={() => setIsOpen(false)}
                      className="px-3 py-2.5 rounded-lg text-sm font-medium text-charcoal hover:bg-mint/60 hover:text-primary"
                    >
                      Login
                    </NavLink>
                    <NavLink
                      to="/register"
                      onClick={() => setIsOpen(false)}
                      className="px-3 py-2.5 rounded-lg text-sm font-semibold bg-primary text-white hover:bg-primary-dark transition-colors text-center"
                    >
                      Register
                    </NavLink>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
