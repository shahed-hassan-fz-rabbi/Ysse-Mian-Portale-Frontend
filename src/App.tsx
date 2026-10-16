import { Routes, Route } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"
import MainLayout from "./layouts/MainLayout"
import AdminLayout from "./components/layout/AdminLayout"
import ProtectedRoute from "./components/ProtectedRoute"
import HomePage from "./pages/HomePage"
import AboutPage from "./pages/AboutPage"
import DepartmentsPage from "./pages/DepartmentsPage"
import DepartmentDetailPage from "./pages/DepartmentDetailPage"
import CoursesPage from "./pages/CoursesPage"
import CourseDetailPage from "./pages/CourseDetailPage"
import InternshipsPage from "./pages/InternshipsPage"
import InternshipDetailPage from "./pages/InternshipDetailPage"
import ApplyPage from "./pages/ApplyPage"
import ContactPage from "./pages/ContactPage"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import ForgotPasswordPage from "./pages/ForgotPasswordPage"
import ResetPasswordPage from "./pages/ResetPasswordPage"
import DashboardPage from "./pages/DashboardPage"
import AdminDashboard from "./pages/AdminDashboard"
import AdminSiteSettings from "./pages/admin/AdminSiteSettings"
import AdminDepartments from "./pages/admin/AdminDepartments"
import AdminTeamMembers from "./pages/admin/AdminTeamMembers"
import AdminCourses from "./pages/admin/AdminCourses"
import AdminAnnouncements from "./pages/admin/AdminAnnouncements"
import AdminInternships from "./pages/admin/AdminInternships"
import AdminUsers from "./pages/admin/AdminUsers"
import AdminApplications from "./pages/admin/AdminApplications"
import AdminAuditLogs from "./pages/admin/AdminAuditLogs"
import NotFoundPage from "./pages/NotFoundPage"

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<MainLayout />}>
          {/* Public routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/departments" element={<DepartmentsPage />} />
          <Route path="/departments/:id" element={<DepartmentDetailPage />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/courses/:id" element={<CourseDetailPage />} />
          <Route path="/internships" element={<InternshipsPage />} />
          <Route path="/internships/:id" element={<InternshipDetailPage />} />
          <Route path="/apply" element={<ApplyPage />} />
          <Route path="/contact" element={<ContactPage />} />

          {/* Auth routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />

          {/* Protected user routes */}
          <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
        </Route>

        {/* Admin routes with AdminLayout */}
        <Route path="/admin" element={<ProtectedRoute role="admin"><AdminLayout /></ProtectedRoute>}>
          <Route index element={<AdminDashboard />} />
          <Route path="site-settings" element={<AdminSiteSettings />} />
          <Route path="departments" element={<AdminDepartments />} />
          <Route path="team-members" element={<AdminTeamMembers />} />
          <Route path="courses" element={<AdminCourses />} />
          <Route path="announcements" element={<AdminAnnouncements />} />
          <Route path="internships" element={<AdminInternships />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="applications" element={<AdminApplications />} />
          <Route path="audit-logs" element={<AdminAuditLogs />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AuthProvider>
  )
}
