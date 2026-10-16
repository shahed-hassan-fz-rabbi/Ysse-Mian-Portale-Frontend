import { useState } from "react"
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom"
import { LayoutDashboard, Settings, Users, BookOpen, Megaphone, Briefcase, FileText, LogOut, Menu, X, ChevronRight, Building2, UsersRound, GraduationCap, Mail } from "lucide-react"
import { useAuth } from "../../context/AuthContext"

const navGroups: { label: string; items: { path: string; label: string; icon: typeof Users }[] }[] = [
  {
    label: "Overview",
    items: [
      { path: "/admin", label: "Dashboard", icon: LayoutDashboard },
      { path: "/admin/site-settings", label: "Site Settings", icon: Settings },
    ],
  },
  {
    label: "Content",
    items: [
      { path: "/admin/departments", label: "Departments", icon: Building2 },
      { path: "/admin/team-members", label: "Team Members", icon: UsersRound },
      { path: "/admin/courses", label: "Courses", icon: GraduationCap },
      { path: "/admin/announcements", label: "Announcements", icon: Megaphone },
      { path: "/admin/internships", label: "Internships", icon: Briefcase },
    ],
  },
  {
    label: "Recruitment",
    items: [
      { path: "/admin/applications", label: "Applications", icon: FileText },
      { path: "/admin/users", label: "Users", icon: Users },
    ],
  },
  {
    label: "System",
    items: [
      { path: "/admin/messages", label: "Messages", icon: Mail },
      { path: "/admin/audit-logs", label: "Audit Logs", icon: BookOpen },
    ],
  },
]

const breadcrumbMap: Record<string, string> = {
  "/admin": "Dashboard",
  "/admin/site-settings": "Site Settings",
  "/admin/departments": "Departments",
  "/admin/team-members": "Team Members",
  "/admin/courses": "Courses",
  "/admin/announcements": "Announcements",
  "/admin/internships": "Internships",
  "/admin/users": "Users",
  "/admin/applications": "Applications",
  "/admin/audit-logs": "Audit Logs",
  "/admin/messages": "Messages",
}

function NavLinks({ currentPath, onNavigate }: { currentPath: string; onNavigate?: () => void }) {
  return (
    <>
      {navGroups.map((group) => (
        <div key={group.label}>
          <p className="px-3 pt-3 pb-1 text-[11px] font-semibold uppercase tracking-wider text-muted">
            {group.label}
          </p>
          {group.items.map((item) => {
            const Icon = item.icon
            const isActive = currentPath === item.path
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={onNavigate}
                aria-current={isActive ? "page" : undefined}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive ? "bg-mint text-primary" : "text-charcoal hover:bg-mint/50"
                }`}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            )
          })}
        </div>
      ))}
    </>
  )
}

export default function AdminLayout() {
  const { user, logout } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const currentPath = location.pathname
  const breadcrumb = breadcrumbMap[currentPath] || "Admin"

  async function handleLogout() {
    await logout()
    navigate("/")
  }

  return (
    <div className="min-h-screen bg-warm flex">
      {/* Sidebar - Desktop */}
      <aside className="w-64 bg-white border-r border-border flex flex-col fixed inset-y-0 left-0 z-40 hidden lg:flex">
        <div className="p-4 border-b border-border">
          <Link to="/" aria-label="YSSE home" className="inline-flex">
            <img
              src="/images/ysse-logo.png"
              alt="YSSE"
              width={200}
              height={200}
              className="h-9 w-auto"
            />
          </Link>
          <p className="text-xs text-muted mt-1">Admin Panel</p>
        </div>

        <nav className="flex-1 p-3 space-y-1 overflow-y-auto" aria-label="Admin navigation">
          <NavLinks currentPath={currentPath} />
        </nav>

        <div className="p-3 border-t border-border">
          <div className="flex items-center gap-3 px-3 py-2 mb-2">
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-xs font-bold text-primary">{user?.full_name?.charAt(0) || "U"}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-charcoal truncate">{user?.full_name}</p>
              <p className="text-xs text-muted truncate capitalize">{user?.role || "admin"}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
          <aside className="fixed inset-y-0 left-0 w-64 bg-white border-r border-border flex flex-col z-50">
            <div className="p-4 border-b border-border flex items-center justify-between">
              <span className="font-bold text-lg text-deep">Admin Panel</span>
              <button onClick={() => setSidebarOpen(false)} className="p-1 rounded-lg hover:bg-mint">
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="flex-1 p-3 space-y-1 overflow-y-auto" aria-label="Admin navigation">
              <NavLinks currentPath={currentPath} onNavigate={() => setSidebarOpen(false)} />
            </nav>
            <div className="p-3 border-t border-border">
              <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50">
                <LogOut className="h-4 w-4" />
                Sign Out
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 lg:ml-64">
        {/* Top nav */}
        <header className="bg-white border-b border-border sticky top-0 z-30">
          <div className="flex items-center justify-between h-14 px-4">
            <div className="flex items-center gap-3">
              <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 rounded-lg hover:bg-mint">
                <Menu className="h-5 w-5" />
              </button>
              <nav className="flex items-center gap-1 text-sm" aria-label="Breadcrumb">
                <Link to="/admin" className="text-muted hover:text-charcoal">Admin</Link>
                <ChevronRight className="h-3 w-3 text-muted" />
                <span className="text-charcoal font-medium">{breadcrumb}</span>
              </nav>
            </div>
            <div className="flex items-center gap-2">
              <Link to="/" className="text-xs text-muted hover:text-charcoal px-2 py-1 rounded">
                View Site
              </Link>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-4 md:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
