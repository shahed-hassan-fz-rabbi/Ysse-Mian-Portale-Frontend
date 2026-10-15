import { useState } from 'react'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { CheckCircle, Clock, Circle, Search, AlertCircle } from 'lucide-react'
import { ApplicationStatus, ApplicationStage } from '../types'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'
import Badge from '../components/ui/Badge'
import Alert from '../components/ui/Alert'

/**
 * Demo application status data.
 * In production, this would be fetched from the backend API.
 */
const demoApplications: ApplicationStatus[] = [
  {
    id: 'APP-2026-001',
    applicantName: 'Demo Applicant',
    role: 'Training and Program Delivery Intern',
    department: 'Training and Development',
    submittedDate: '2026-01-10',
    currentStage: 'Under Review',
    stages: [
      {
        stage: 'Submitted',
        status: 'completed',
        date: '2026-01-10',
        notes: 'Application received successfully.',
      },
      {
        stage: 'Under Review',
        status: 'current',
        notes: 'Application is being reviewed by the selection committee.',
      },
      { stage: 'Shortlisted', status: 'pending' },
      { stage: 'Interview', status: 'pending' },
      { stage: 'Selected', status: 'pending' },
      { stage: 'Onboarding', status: 'pending' },
    ],
  },
  {
    id: 'APP-2026-002',
    applicantName: 'Demo Applicant',
    role: 'Communications and Social Media Intern',
    department: 'Community Engagement and Partnerships',
    submittedDate: '2026-01-05',
    currentStage: 'Interview',
    stages: [
      {
        stage: 'Submitted',
        status: 'completed',
        date: '2026-01-05',
        notes: 'Application received successfully.',
      },
      {
        stage: 'Under Review',
        status: 'completed',
        date: '2026-01-08',
        notes: 'Application reviewed and moved to shortlist.',
      },
      {
        stage: 'Shortlisted',
        status: 'completed',
        date: '2026-01-12',
        notes: 'Candidate shortlisted for interview.',
      },
      {
        stage: 'Interview',
        status: 'current',
        notes: 'Interview scheduled for next week.',
      },
      { stage: 'Selected', status: 'pending' },
      { stage: 'Onboarding', status: 'pending' },
    ],
  },
]

const allStages: ApplicationStage[] = [
  'Submitted',
  'Under Review',
  'Shortlisted',
  'Interview',
  'Selected',
  'Onboarding',
]

function getStageIcon(status: 'completed' | 'current' | 'pending') {
  switch (status) {
    case 'completed':
      return <CheckCircle className="h-5 w-5 text-green-600" />
    case 'current':
      return <Clock className="h-5 w-5 text-primary" />
    case 'pending':
      return <Circle className="h-5 w-5 text-muted/40" />
  }
}

function getStageColor(status: 'completed' | 'current' | 'pending') {
  switch (status) {
    case 'completed':
      return 'bg-green-50 border-green-200'
    case 'current':
      return 'bg-mint border-primary/30'
    case 'pending':
      return 'bg-gray-50 border-border'
  }
}

export default function ApplicationStatusPage() {
  useDocumentTitle('Application Status')

  const [applicationId, setApplicationId] = useState('')
  const [searchedId, setSearchedId] = useState('')
  const [selectedApplication, setSelectedApplication] =
    useState<ApplicationStatus | null>(null)
  const [notFound, setNotFound] = useState(false)

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    if (!applicationId.trim()) return

    setSearchedId(applicationId)
    const found = demoApplications.find(
      (app) => app.id.toLowerCase() === applicationId.toLowerCase(),
    )
    setSelectedApplication(found || null)
    setNotFound(!found)
  }

  function handleDemoSelect(app: ApplicationStatus) {
    setApplicationId(app.id)
    setSearchedId(app.id)
    setSelectedApplication(app)
    setNotFound(false)
  }

  return (
    <div>
      {/* Hero */}
      <section className="bg-warm">
        <div className="container-site py-12 md:py-16">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-bold text-charcoal tracking-tight">
              Application Status
            </h1>
            <p className="mt-4 text-lg text-muted leading-relaxed">
              Track the progress of your internship application through our
              review process. Enter your application ID to check the current
              status.
            </p>
            <div className="mt-4 flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-lg px-4 py-3">
              <AlertCircle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
              <p className="text-sm text-amber-800">
                This is a demo interface. The statuses shown are sample data
                and do not reflect real application reviews.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Search */}
      <section className="bg-white">
        <div className="container-site py-8">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3 max-w-xl">
            <div className="flex-1">
              <Input
                label="Application ID"
                value={applicationId}
                onChange={(e) => setApplicationId(e.target.value)}
                placeholder="e.g., APP-2026-001"
              />
            </div>
            <div className="flex items-end">
              <Button type="submit">Check Status</Button>
            </div>
          </form>

          {/* Demo IDs */}
          <div className="mt-4">
            <p className="text-xs text-muted mb-2">
              Demo application IDs to try:
            </p>
            <div className="flex flex-wrap gap-2">
              {demoApplications.map((app) => (
                <button
                  key={app.id}
                  type="button"
                  onClick={() => handleDemoSelect(app)}
                  className="text-xs bg-mint text-primary px-3 py-1.5 rounded-lg hover:bg-mint-dark transition-colors font-medium"
                >
                  {app.id}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="bg-white">
        <div className="container-site pb-16 md:pb-20">
          {notFound && (
            <Alert variant="error" className="max-w-xl">
              <p className="font-medium">Application not found</p>
              <p className="mt-1">
                No application found with ID &quot;{searchedId}&quot;. Please
                check the ID and try again.
              </p>
            </Alert>
          )}

          {selectedApplication && (
            <div className="max-w-3xl">
              {/* Application Summary */}
              <div className="bg-mint rounded-xl p-6 mb-8">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <p className="text-sm text-muted">Application ID</p>
                    <p className="font-semibold text-charcoal text-lg">
                      {selectedApplication.id}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted">Role</p>
                    <p className="font-medium text-charcoal">
                      {selectedApplication.role}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted">Department</p>
                    <p className="font-medium text-charcoal">
                      {selectedApplication.department}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted">Submitted</p>
                    <p className="font-medium text-charcoal">
                      {new Date(selectedApplication.submittedDate).toLocaleDateString(
                        'en-US',
                        { year: 'numeric', month: 'long', day: 'numeric' },
                      )}
                    </p>
                  </div>
                </div>
              </div>

              {/* Progress Tracker */}
              <h2 className="text-xl font-bold text-charcoal mb-6">
                Application Progress
              </h2>
              <div className="space-y-4">
                {selectedApplication.stages.map((stage, index) => (
                  <div key={stage.stage} className="relative">
                    {/* Connector Line */}
                    {index < selectedApplication.stages.length - 1 && (
                      <div
                        className={`absolute left-[22px] top-[44px] bottom-0 w-0.5 ${
                          stage.status === 'completed'
                            ? 'bg-green-400'
                            : 'bg-border'
                        }`}
                        aria-hidden="true"
                      />
                    )}

                    <div
                      className={`flex items-start gap-4 rounded-xl border p-5 ${getStageColor(stage.status)}`}
                    >
                      <div className="shrink-0 mt-0.5">
                        {getStageIcon(stage.status)}
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                          <h3
                            className={`font-semibold text-sm ${
                              stage.status === 'current'
                                ? 'text-primary'
                                : stage.status === 'completed'
                                  ? 'text-green-700'
                                  : 'text-muted'
                            }`}
                          >
                            {stage.stage}
                          </h3>
                          {stage.status === 'current' && (
                            <Badge variant="primary">Current Stage</Badge>
                          )}
                          {stage.status === 'completed' && (
                            <Badge variant="mint">Completed</Badge>
                          )}
                        </div>
                        {stage.date && (
                          <p className="text-xs text-muted mt-1">
                            {new Date(stage.date).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            })}
                          </p>
                        )}
                        {stage.notes && (
                          <p className="text-sm text-muted mt-2">
                            {stage.notes}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Disclaimer */}
              <div className="mt-8 bg-warm rounded-xl border border-border p-5">
                <p className="text-xs text-muted">
                  <strong>Demo Notice:</strong> This is a demonstration of the
                  application status interface. The data shown is sample data
                  and does not represent a real application review process.
                  When the backend is connected, this page will fetch real
                  application status from the API.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
