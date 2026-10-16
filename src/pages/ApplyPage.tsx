import { useState, useEffect } from "react"
import { useAuth } from "../context/AuthContext"
import { api, ApiError } from "../lib/api"
import { InternshipOpportunity } from "../types"
import Button from "../components/ui/Button"
import Alert from "../components/ui/Alert"
import Textarea from "../components/ui/Textarea"

export default function ApplyPage() {
  const { user } = useAuth()
  const [opportunities, setOpportunities] = useState<InternshipOpportunity[]>([])
  const [selectedOpportunity, setSelectedOpportunity] = useState("")
  const [coverLetter, setCoverLetter] = useState("")
  const [skills, setSkills] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    fetchOpportunities()
  }, [])

  async function fetchOpportunities() {
    try {
      const data = await api.get<InternshipOpportunity[]>("/api/content/internships")
      setOpportunities(data || [])
    } catch {
      setError("Failed to load opportunities")
    }
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

    setLoading(true)

    try {
      // Backend validates the payload and rejects duplicate applications
      await api.post("/api/applications", {
        opportunity_id: selectedOpportunity,
        cover_letter: coverLetter || null,
        skills,
      })
      setSuccess(true)
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
          <Button onClick={() => { setSuccess(false); setCoverLetter(""); setSkills(""); setSelectedOpportunity("") }}>
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

        {error && <Alert variant="error" className="mb-6">{error}</Alert>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-charcoal mb-1.5">
              Select Opportunity <span className="text-red-500">*</span>
            </label>
            <select
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

          <Button type="submit" isLoading={loading} className="w-full sm:w-auto">
            Submit Application
          </Button>
        </form>
      </div>
    </div>
  )
}
