export interface Department {
  id: string
  name: string
  shortName: string
  description: string
  goals: string[]
  responsibilities: string[]
  activities: string[]
  image: string
  headOfDepartment: string
  teamMembers: TeamMember[]
}

export interface TeamMember {
  name: string
  role: string
  image?: string
}

export interface Course {
  id: string
  title: string
  description: string
  category: string
  duration: string
  level: 'Beginner' | 'Intermediate' | 'Advanced'
  format: 'Recorded' | 'Live' | 'Self-paced'
  department: string
  image: string
  resources: CourseResource[]
  topics: string[]
}

export interface CourseResource {
  id: string
  title: string
  type: 'video' | 'document' | 'link'
  url: string
  description: string
}

export interface Internship {
  id: string
  title: string
  department: string
  description: string
  responsibilities: string[]
  requirements: string[]
  duration: string
  location: string
  deadline: string
  isDemo: boolean
  image: string
}

export interface Announcement {
  id: string
  title: string
  date: string
  excerpt: string
  category: string
}

export interface ApplicationFormData {
  fullName: string
  email: string
  phone: string
  university: string
  fieldOfStudy: string
  preferredRole: string
  skills: string
  motivation: string
  resume: File | null
}

export interface ApplicationStatus {
  id: string
  applicantName: string
  role: string
  department: string
  submittedDate: string
  currentStage: ApplicationStage
  stages: ApplicationStageDetail[]
}

export interface ApplicationStageDetail {
  stage: ApplicationStage
  status: 'completed' | 'current' | 'pending'
  date?: string
  notes?: string
}

export type ApplicationStage =
  | 'Submitted'
  | 'Under Review'
  | 'Shortlisted'
  | 'Interview'
  | 'Selected'
  | 'Rejected'
  | 'Onboarding'

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
