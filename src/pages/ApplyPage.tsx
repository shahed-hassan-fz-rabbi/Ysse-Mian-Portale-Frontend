import { useState } from 'react'
import { Link } from 'react-router-dom'
import { CheckCircle, AlertCircle } from 'lucide-react'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { internships } from '../data/internships'
import { departments } from '../data/departments'
import { ApplicationFormData } from '../types'
import {
  isValidEmail,
  isValidPhone,
  isRequired,
  minLength,
} from '../utils/validation'
import Input from '../components/ui/Input'
import Textarea from '../components/ui/Textarea'
import Select from '../components/ui/Select'
import FileUpload from '../components/ui/FileUpload'
import Button from '../components/ui/Button'
import Alert from '../components/ui/Alert'
import SectionHeading from '../components/ui/SectionHeading'

const initialFormData: ApplicationFormData = {
  fullName: '',
  email: '',
  phone: '',
  university: '',
  fieldOfStudy: '',
  preferredRole: '',
  skills: '',
  motivation: '',
  resume: null,
}

interface FormErrors {
  fullName?: string
  email?: string
  phone?: string
  university?: string
  fieldOfStudy?: string
  preferredRole?: string
  skills?: string
  motivation?: string
  resume?: string
}

export default function ApplyPage() {
  useDocumentTitle('Apply for Internship')

  const [formData, setFormData] = useState<ApplicationFormData>(initialFormData)
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  function updateField<K extends keyof ApplicationFormData>(
    field: K,
    value: ApplicationFormData[K],
  ) {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  function validate(): boolean {
    const newErrors: FormErrors = {}

    if (!isRequired(formData.fullName)) {
      newErrors.fullName = 'Full name is required.'
    }

    if (!isRequired(formData.email)) {
      newErrors.email = 'Email is required.'
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address.'
    }

    if (!isRequired(formData.phone)) {
      newErrors.phone = 'Phone number is required.'
    } else if (!isValidPhone(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number.'
    }

    if (!isRequired(formData.university)) {
      newErrors.university = 'University or institution is required.'
    }

    if (!isRequired(formData.fieldOfStudy)) {
      newErrors.fieldOfStudy = 'Field of study is required.'
    }

    if (!isRequired(formData.preferredRole)) {
      newErrors.preferredRole = 'Please select a preferred role.'
    }

    if (!isRequired(formData.skills)) {
      newErrors.skills = 'Please describe your relevant skills.'
    }

    if (!isRequired(formData.motivation)) {
      newErrors.motivation = 'Motivation statement is required.'
    } else if (!minLength(formData.motivation, 50)) {
      newErrors.motivation = 'Please provide at least 50 characters for your motivation statement.'
    }

    if (!formData.resume) {
      newErrors.resume = 'Please upload your resume.'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!validate()) {
      return
    }

    setIsSubmitting(true)

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  function handleReset() {
    setFormData(initialFormData)
    setErrors({})
    setIsSubmitted(false)
  }

  if (isSubmitted) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="container-site max-w-lg text-center">
          <div className="bg-white rounded-xl border border-border shadow-card p-8">
            <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-charcoal mb-3">
              Application Submitted
            </h1>
            <Alert variant="info" className="mb-6">
              <p className="font-medium">Demo Submission Notice</p>
              <p className="mt-1">
                This is a simulated submission for demonstration purposes only.
                No actual application data has been saved or transmitted. When
                the backend is connected, this form will submit to a real API.
              </p>
            </Alert>
            <p className="text-sm text-muted mb-6">
              Thank you for your interest in the YSSE virtual internship
              program. In a real application, you would receive a confirmation
              email and be able to track your application status.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/apply/status">
                <Button>View Application Status Demo</Button>
              </Link>
              <Button variant="outline" onClick={handleReset}>
                Submit Another Application
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* Hero */}
      <section className="bg-warm">
        <div className="container-site py-12 md:py-16">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-bold text-charcoal tracking-tight">
              Internship Application
            </h1>
            <p className="mt-4 text-lg text-muted leading-relaxed">
              Complete the form below to apply for a virtual internship
              opportunity at YSSE. All fields marked with an asterisk (*) are
              required.
            </p>
            <div className="mt-4 flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-lg px-4 py-3">
              <AlertCircle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
              <p className="text-sm text-amber-800">
                This is a demo application form. No data will be actually
                submitted or stored.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="bg-white">
        <div className="container-site section-padding">
          <div className="max-w-2xl mx-auto">
            <form onSubmit={handleSubmit} noValidate>
              <div className="space-y-6">
                {/* Personal Information */}
                <div>
                  <h2 className="text-lg font-semibold text-charcoal mb-4">
                    Personal Information
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="Full Name"
                      required
                      value={formData.fullName}
                      onChange={(e) => updateField('fullName', e.target.value)}
                      error={errors.fullName}
                      placeholder="Enter your full name"
                    />
                    <Input
                      label="Email Address"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => updateField('email', e.target.value)}
                      error={errors.email}
                      placeholder="your.email@example.com"
                    />
                    <Input
                      label="Phone Number"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => updateField('phone', e.target.value)}
                      error={errors.phone}
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                </div>

                {/* Education */}
                <div>
                  <h2 className="text-lg font-semibold text-charcoal mb-4">
                    Education
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="University / Institution"
                      required
                      value={formData.university}
                      onChange={(e) => updateField('university', e.target.value)}
                      error={errors.university}
                      placeholder="Your university or institution"
                    />
                    <Input
                      label="Field of Study"
                      required
                      value={formData.fieldOfStudy}
                      onChange={(e) => updateField('fieldOfStudy', e.target.value)}
                      error={errors.fieldOfStudy}
                      placeholder="e.g., Business Administration"
                    />
                  </div>
                </div>

                {/* Internship Preference */}
                <div>
                  <h2 className="text-lg font-semibold text-charcoal mb-4">
                    Internship Preference
                  </h2>
                  <Select
                    label="Preferred Internship Role"
                    required
                    value={formData.preferredRole}
                    onChange={(e) => updateField('preferredRole', e.target.value)}
                    error={errors.preferredRole}
                    placeholder="Select a role"
                    options={internships.map((i) => ({
                      value: i.id,
                      label: i.title,
                    }))}
                  />
                </div>

                {/* Skills and Motivation */}
                <div>
                  <h2 className="text-lg font-semibold text-charcoal mb-4">
                    Skills and Motivation
                  </h2>
                  <div className="space-y-4">
                    <Textarea
                      label="Relevant Skills"
                      required
                      value={formData.skills}
                      onChange={(e) => updateField('skills', e.target.value)}
                      error={errors.skills}
                      placeholder="Describe your relevant skills, including technical abilities, languages, volunteer experience, or other qualifications that make you a strong candidate."
                    />
                    <Textarea
                      label="Motivation Statement"
                      required
                      value={formData.motivation}
                      onChange={(e) => updateField('motivation', e.target.value)}
                      error={errors.motivation}
                      placeholder="Tell us why you want to intern with YSSE, what you hope to learn, and how this opportunity aligns with your goals. Minimum 50 characters."
                    />
                  </div>
                </div>

                {/* Resume Upload */}
                <div>
                  <h2 className="text-lg font-semibold text-charcoal mb-4">
                    Resume
                  </h2>
                  <FileUpload
                    label="Upload Resume"
                    required
                    accept=".pdf,.doc,.docx"
                    onChange={(file) => updateField('resume', file)}
                    error={errors.resume}
                    helpText="Accepted formats: PDF, DOC, DOCX. Maximum file size: 5MB."
                  />
                </div>

                {/* Submit */}
                <div className="pt-4">
                  <Button type="submit" size="lg" isLoading={isSubmitting} className="w-full sm:w-auto">
                    Submit Application
                  </Button>
                  <p className="text-xs text-muted mt-3">
                    By submitting this form, you acknowledge that this is a demo
                    application and no data will be actually saved or transmitted.
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}
