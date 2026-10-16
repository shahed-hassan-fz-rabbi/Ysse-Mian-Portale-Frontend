import { useState, useEffect } from "react"
import { Link, useSearchParams } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { api, ApiError } from "../lib/api"
import { InternshipOpportunity } from "../types"
import { isDeadlinePassed, formatDate } from "../utils/format"
import { useDocumentTitle } from "../hooks/useDocumentTitle"
import Button from "../components/ui/Button"
import Alert from "../components/ui/Alert"
import Textarea from "../components/ui/Textarea"
import Input from "../components/ui/Input"

export default function ApplyPage() {
  useDocumentTitle("Apply")
  const { user } = useAuth()
  const [searchParams, setSearchParams] = useSearchParams()
  const [opportunities, setOpportunities] = useState<InternshipOpportunity[]>([])
  const [selectedOpportunity, setSelectedOpportunity] = useState("")
  const [notice, setNotice] = useState("")
  const [coverLetter, setCoverLetter] = useState("")
  const [skills, setSkills] = useState("")
  const [resumeUrl, setResumeUrl] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    fetchOpportunities()
  }, [])

  async function fetchOpportunities() {
    try {
      const data = await api.get<InternshipOpportunity[]>("/api/content/internships")
      const published = (data || []).filter(
        (opp) => opp.status === "published" && !isDeadlinePassed(opp.application_deadline),
      )
      setOpportunities(published)
      setNotice(buildNotice(data || []))

      // Preselect the opportunity the user came from (e.g. /apply?opportunity=<id>)
      const wanted = searchParams.get("opportunity")
      if (wanted && published.some((opp) => opp.id === wanted)) {
        setSelectedOpportunity(wanted)
      }
    } catch {
      setError("Failed to load opportunities. Please try again later.")
    }
  }

  function buildNotice(all: InternshipOpportunity[]): string {
    const wanted = searchParams.get("opportunity")
    if (!wanted) return ""
    const target = all.find((opp) => opp.id === wanted)
    if (!target) {
      return "The opportunity you followed is no longer available. Choose another one below."
    }
    if (target.status !== "published" || isDeadlinePassed(target.application_deadline)) {
      const deadline = formatDate(target.application_deadline)
      return `Applications for "${target.title}"${deadline ? ` closed on ${deadline}` : " are no longer open"}. Choose another opportunity below.`
    }
    return ""
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")

    if (!user) {
      setError("You must be logged in to apply")
      return
    }

    if (!selectedOpportunity) {
      setError("Please select an opportunity")
      return
    }

    if (!skills.trim()) {
      setError("Skills are required")
      return
    }

    const trimmedResume = resumeUrl.trim()
    if (trimmedResume && !/^https?:\/\/\S+\.\S+/.test(trimmedResume)) {
      setError("Resume link must be a full URL starting with http:// or https://")
      return
    }

    setLoading(true)

    try {
      // Backend validates the payload and rejects duplicate applications
      await api.post("/api/applications", {
        opportunity_id: selectedOpportunity,
        cover_letter: coverLetter || null,
        resume_url: trimmedResume || null,
        skills,
      })
      setSuccess(true)
      setSearchParams({}, { replace: true })
    } catch (err) {
      if (err instanceof ApiError && err.status === 409) {
        setError("You have already applied to this opportunity")
      } else {
        setError(err instanceof Error ? err.message : "Failed to submit application. Please try again.")
      }
    }

    setLoading(false)
  }

  if (success) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white rounded-xl border border-border shadow-card p-8 text-center">
          <Alert variant="success" className="mb-6">Your application has been submitted successfully.</Alert>
          <Button onClick={() => { setSuccess(false); setCoverLetter(""); setSkills(""); setResumeUrl(""); setSelectedOpportunity("") }}>
            Submit Another Application
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container-site py-8 md:py-12">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-charcoal mb-2">Apply for Internship</h1>
        <p className="text-muted mb-8">Complete the form below to apply for a virtual internship opportunity at YSSE.</p>

        {notice && <Alert variant="info" className="mb-6">{notice}</Alert>}
        {error && <Alert variant="error" className="mb-6">{error}</Alert>}
        {!user && (
          <Alert variant="warning" className="mb-6">
            You must be logged in to submit an application.{" "}
            <Link to="/login" className="font-semibold underline underline-offset-2">
              Log in or create an account
            </Link>{" "}
            to continue.
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="apply-opportunity" className="block text-sm font-medium text-charcoal mb-1.5">
              Select Opportunity <span className="text-red-500">*</span>
            </label>
            <select
              id="apply-opportunity"
              value={selectedOpportunity}
              onChange={(e) => setSelectedOpportunity(e.target.value)}
              className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
              required
            >
              <option value="">Choose an opportunity</option>
              {opportunities.map((opp) => (
                <option key={opp.id} value={opp.id}>{opp.title}</option>
              ))}
            </select>
            {opportunities.length === 0 && !error && (
              <p className="mt-2 text-xs text-muted">
                No open opportunities right now. You can still explore our courses in the meantime.
              </p>
            )}
          </div>

          <Textarea
            label="Cover Letter"
            value={coverLetter}
            onChange={(e) => setCoverLetter(e.target.value)}
            placeholder="Tell us why you are interested in this opportunity..."
            rows={4}
          />

          <Textarea
            label="Skills"
            required
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            placeholder="Describe your relevant skills and experience..."
            rows={3}
          />

          <Input
            label="Resume Link (optional)"
            type="url"
            value={resumeUrl}
            onChange={(e) => setResumeUrl(e.target.value)}
            placeholder="https://drive.google.com/... or a link to your online resume"
          />
          <p className="text-xs text-muted -mt-3">
            Paste a public link to your resume or portfolio (Google Drive, LinkedIn, personal site).
          </p>

          <Button type="submit" isLoading={loading} className="w-full sm:w-auto">
            Submit Application
          </Button>
        </form>
      </div>
    </div>
  )
}
