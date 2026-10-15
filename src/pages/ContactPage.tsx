import { useState } from 'react'
import { CheckCircle, AlertCircle, Mail, MapPin, ExternalLink } from 'lucide-react'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { ContactFormData } from '../types'
import { isValidEmail, isRequired } from '../utils/validation'
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

  const [formData, setFormData] = useState<ContactFormData>(initialFormData)
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  function updateField<K extends keyof ContactFormData>(
    field: K,
    value: ContactFormData[K],
  ) {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
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

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  function handleReset() {
    setFormData(initialFormData)
    setErrors({})
    setIsSubmitted(false)
  }

  return (
    <div>
      {/* Hero */}
      <section className="bg-warm">
        <div className="container-site py-12 md:py-16">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-bold text-charcoal tracking-tight">
              Contact Us
            </h1>
            <p className="mt-4 text-lg text-muted leading-relaxed">
              Have questions about our programs, internships, or partnership
              opportunities? Get in touch with us using the form below or
              through our official channels.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="bg-white">
        <div className="container-site section-padding">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Information */}
            <div className="lg:col-span-1">
              <SectionHeading
                title="Get in Touch"
                subtitle="Reach out to us through any of the following channels."
                className="mb-6"
              />
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-charcoal text-sm">Email</h3>
                    <p className="text-sm text-muted mt-1">
                      Please visit the official YSSE website for contact email
                      addresses.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-charcoal text-sm">Location</h3>
                    <p className="text-sm text-muted mt-1">
                      Please visit the official YSSE website for office
                      location details.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <ExternalLink className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-charcoal text-sm">
                      Official Website
                    </h3>
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
              </div>

              <div className="mt-8 bg-mint rounded-xl p-5">
                <h3 className="font-medium text-charcoal text-sm mb-2">
                  Social Media
                </h3>
                <p className="text-xs text-muted">
                  Follow YSSE on social media for updates, stories, and
                  announcements. Visit our official pages:
                </p>
                <ul className="mt-2 space-y-1.5">
                  <li>
                    <a
                      href="https://www.facebook.com/ysseglobal"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-primary hover:text-primary-dark transition-colors"
                    >
                      Facebook
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://twitter.com/ysseglobal"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-primary hover:text-primary-dark transition-colors"
                    >
                      Twitter
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.linkedin.com/company/ysseglobal"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-primary hover:text-primary-dark transition-colors"
                    >
                      LinkedIn
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.instagram.com/ysseglobal"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-primary hover:text-primary-dark transition-colors"
                    >
                      Instagram
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              {isSubmitted ? (
                <div className="bg-white rounded-xl border border-border shadow-card p-8 text-center">
                  <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-charcoal mb-3">
                    Message Sent
                  </h2>
                  <Alert variant="info" className="mb-6">
                    <p className="font-medium">Demo Submission Notice</p>
                    <p className="mt-1">
                      This is a simulated submission for demonstration purposes
                      only. No actual message has been sent or stored. When the
                      backend is connected, this form will submit to a real API.
                    </p>
                  </Alert>
                  <p className="text-sm text-muted mb-6">
                    Thank you for reaching out. In a real scenario, you would
                    receive a confirmation email shortly.
                  </p>
                  <Button variant="outline" onClick={handleReset}>
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <div className="bg-white rounded-xl border border-border shadow-card p-8">
                  <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 mb-6">
                    <AlertCircle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                    <p className="text-sm text-amber-800">
                      This is a demo contact form. No data will be actually
                      submitted or stored.
                    </p>
                  </div>
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
                        Send Message
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
