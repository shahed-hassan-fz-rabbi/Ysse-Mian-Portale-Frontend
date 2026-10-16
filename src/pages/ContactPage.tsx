import { useState } from 'react'
import { CheckCircle, Mail, MapPin, Phone, ExternalLink } from 'lucide-react'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { useSiteSettings } from '../hooks/useSiteSettings'
import { api, ApiError } from '../lib/api'
import { getSocialLinks } from '../constants/social'
import type { ContactFormData } from '../types'
import { isValidEmail, isRequired } from '../utils/validation'
import PageHeader from '../components/shared/PageHeader'
import Input from '../components/ui/Input'
import Textarea from '../components/ui/Textarea'
import Button from '../components/ui/Button'
import Alert from '../components/ui/Alert'
import SectionHeading from '../components/ui/SectionHeading'

const initialFormData: ContactFormData = {
  name: '',
  email: '',
  subject: '',
  message: '',
}

interface FormErrors {
  name?: string
  email?: string
  subject?: string
  message?: string
}

export default function ContactPage() {
  useDocumentTitle('Contact')
  const { settings } = useSiteSettings()

  const [formData, setFormData] = useState<ContactFormData>(initialFormData)
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [serverError, setServerError] = useState('')

  function updateField<K extends keyof ContactFormData>(
    field: K,
    value: ContactFormData[K],
  ) {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
    if (serverError) {
      setServerError('')
    }
  }

  function validate(): boolean {
    const newErrors: FormErrors = {}

    if (!isRequired(formData.name)) {
      newErrors.name = 'Name is required.'
    }

    if (!isRequired(formData.email)) {
      newErrors.email = 'Email is required.'
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address.'
    }

    if (!isRequired(formData.subject)) {
      newErrors.subject = 'Subject is required.'
    }

    if (!isRequired(formData.message)) {
      newErrors.message = 'Message is required.'
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
    setServerError('')

    try {
      await api.post('/api/contact', formData, { auth: false })
      setIsSubmitted(true)
    } catch (err) {
      // Surface exactly what the server said — never claim success on failure
      if (err instanceof ApiError) {
        const detail = Array.isArray(err.details)
          ? (err.details as { message?: string }[]).map((d) => d?.message).filter(Boolean).join('. ')
          : ''
        setServerError(detail ? `${err.message}. ${detail}` : err.message)
      } else {
        setServerError('Something went wrong. Please try again later.')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  function handleReset() {
    setFormData(initialFormData)
    setErrors({})
    setIsSubmitted(false)
    setServerError('')
  }

  const hasEmail = Boolean(settings?.contact_email?.trim())
  const hasPhone = Boolean(settings?.contact_phone?.trim())
  const hasAddress = Boolean(settings?.contact_address?.trim())
  const socialLinks = getSocialLinks(settings)

  return (
    <div>
      {/* Hero */}
      <PageHeader
        eyebrow="Contact"
        title="Get in Touch"
        description="Have questions about our programs, internships, or partnership opportunities? Send us a message — our team reads every submission."
      />

      {/* Contact Content */}
      <section className="bg-white">
        <div className="container-site section-padding">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Information (from site settings) */}
            <div className="lg:col-span-1">
              <SectionHeading
                eyebrow="Contact information"
                title="Reach Us Directly"
                className="mb-6"
              />
              <div className="space-y-6">
                {hasEmail && (
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-charcoal text-sm">Email</h3>
                      <a
                        href={`mailto:${settings?.contact_email}`}
                        className="text-sm text-primary hover:text-primary-dark transition-colors mt-1 inline-block break-all"
                      >
                        {settings?.contact_email}
                      </a>
                    </div>
                  </div>
                )}
                {hasPhone && (
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Phone className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-charcoal text-sm">Phone</h3>
                      <a
                        href={`tel:${settings?.contact_phone}`}
                        className="text-sm text-primary hover:text-primary-dark transition-colors mt-1 inline-block"
                      >
                        {settings?.contact_phone}
                      </a>
                    </div>
                  </div>
                )}
                {hasAddress && (
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-charcoal text-sm">Location</h3>
                      <p className="text-sm text-muted mt-1">{settings?.contact_address}</p>
                    </div>
                  </div>
                )}
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <ExternalLink className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-charcoal text-sm">Official Website</h3>
                    <a
                      href="https://ysseglobal.org/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary hover:text-primary-dark transition-colors mt-1 inline-block"
                    >
                      ysseglobal.org
                    </a>
                  </div>
                </div>
                {!hasEmail && !hasPhone && !hasAddress && (
                  <p className="text-sm text-muted">
                    Our email and office details are being updated. For now, the
                    contact form on this page is the fastest way to reach us.
                  </p>
                )}
              </div>

              <div className="mt-8 bg-mint rounded-xl p-5">
                <h3 className="font-medium text-charcoal text-sm mb-3">Follow YSSE</h3>
                <ul className="space-y-2">
                  {socialLinks.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-primary hover:text-primary-dark transition-colors"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
                <p className="mt-3 text-xs text-muted">
                  Updates, stories, and announcements are posted on our official pages.
                </p>
              </div>
            </div>

            {/* Contact Form — submits to the real backend */}
            <div className="lg:col-span-2">
              {isSubmitted ? (
                <div className="bg-white rounded-xl border border-border shadow-card p-8 text-center">
                  <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-charcoal mb-3">Message Sent</h2>
                  <p className="text-muted mb-6 max-w-md mx-auto">
                    Thank you for reaching out. Your message has been received and
                    our team will get back to you soon.
                  </p>
                  <Button variant="outline" onClick={handleReset}>
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <div className="bg-white rounded-xl border border-border shadow-card p-8">
                  {serverError && (
                    <Alert variant="error" className="mb-6">
                      <p className="font-medium">Your message could not be sent</p>
                      <p className="mt-1">{serverError}</p>
                    </Alert>
                  )}
                  <form onSubmit={handleSubmit} noValidate>
                    <div className="space-y-5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Input
                          label="Your Name"
                          required
                          value={formData.name}
                          onChange={(e) => updateField('name', e.target.value)}
                          error={errors.name}
                          placeholder="Enter your name"
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
                      </div>
                      <Input
                        label="Subject"
                        required
                        value={formData.subject}
                        onChange={(e) => updateField('subject', e.target.value)}
                        error={errors.subject}
                        placeholder="What is this regarding?"
                      />
                      <Textarea
                        label="Message"
                        required
                        value={formData.message}
                        onChange={(e) => updateField('message', e.target.value)}
                        error={errors.message}
                        placeholder="Write your message here..."
                        rows={6}
                      />
                      <Button type="submit" isLoading={isSubmitting}>
                        {isSubmitting ? 'Sending...' : 'Send Message'}
                      </Button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
