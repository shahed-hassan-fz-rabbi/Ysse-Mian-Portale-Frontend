export interface UserProfile {
  id: string
  full_name: string
  phone: string | null
  role: "user" | "admin"
  created_at: string
  updated_at: string
}

export interface Department {
  id: string
  name: string
  slug: string
  description: string
  goals: string[]
  responsibilities: string[]
  is_published: boolean
  department_head: string | null
  created_at: string
  updated_at: string
}

export interface Course {
  id: string
  title: string
  description: string
  category: string
  recording_url: string | null
  resource_url: string | null
  is_published: boolean
  thumbnail_url: string | null
  created_at: string
  updated_at: string
}

/** Row shape of `team_members` (public endpoint joins the department name). */
export interface TeamMember {
  id: string
  department_id: string | null
  name: string
  designation: string
  bio: string | null
  photo_url: string | null
  display_order: number
  is_published: boolean
  created_at: string
  updated_at: string
  departments: { name: string } | null
}

/** Row shape of `contact_messages` (admin Messages page). */
export interface ContactMessage {
  id: string
  name: string
  email: string
  subject: string
  message: string
  status: "new" | "read" | "archived"
  ip_address: string | null
  created_at: string
}

export interface Announcement {
  id: string
  title: string
  body: string
  published_at: string | null
  is_published: boolean
  created_by: string | null
  created_at: string
  updated_at: string
}

export interface InternshipOpportunity {
  id: string
  title: string
  department_id: string | null
  description: string
  requirements: string
  application_deadline: string | null
  status: "draft" | "published" | "closed"
  created_at: string
  updated_at: string
}

export interface InternshipApplication {
  id: string
  user_id: string
  opportunity_id: string
  cover_letter: string | null
  resume_url: string | null
  status: "submitted" | "under_review" | "shortlisted" | "interview" | "selected" | "rejected"
  created_at: string
  updated_at: string
  internship_opportunities?: { title: string } | null
}

export interface ApplicationFormData {
  opportunity_id: string
  cover_letter: string
  skills: string
}

export interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

export interface NavItem {
  label: string
  path: string
}

/** Row shape of the `site_settings` table (single row, served by the API). */
export interface SiteSettings {
  id?: number
  hero_heading: string | null
  hero_description: string | null
  hero_image_url: string | null
  featured_heading: string | null
  featured_description: string | null
  featured_image_url: string | null
  about_heading: string | null
  about_description: string | null
  about_image_url: string | null
  contact_email: string | null
  contact_phone: string | null
  contact_address: string | null
  facebook_url: string | null
  twitter_url: string | null
  linkedin_url: string | null
  instagram_url: string | null
  footer_text: string | null
}
