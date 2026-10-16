import { useState, useEffect } from "react"
import { api, ApiError } from "../../lib/api"
import Button from "../../components/ui/Button"
import Input from "../../components/ui/Input"
import Alert from "../../components/ui/Alert"

interface Settings {
  hero_heading: string
  hero_description: string
  hero_image_url: string
  featured_heading: string
  featured_description: string
  featured_image_url: string
  about_heading: string
  about_description: string
  about_image_url: string
  contact_email: string
  contact_phone: string
  contact_address: string
  facebook_url: string
  twitter_url: string
  linkedin_url: string
  instagram_url: string
  footer_text: string
}

const empty: Settings = {
  hero_heading: "",
  hero_description: "",
  hero_image_url: "",
  featured_heading: "",
  featured_description: "",
  featured_image_url: "",
  about_heading: "",
  about_description: "",
  about_image_url: "",
  contact_email: "",
  contact_phone: "",
  contact_address: "",
  facebook_url: "",
  twitter_url: "",
  linkedin_url: "",
  instagram_url: "",
  footer_text: "",
}

export default function AdminSiteSettings() {
  const [settings, setSettings] = useState<Settings>(empty)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  useEffect(() => {
    api
      .get<Partial<Settings>>("/api/content/settings")
      .then((data) => setSettings({ ...empty, ...data }))
      .catch((err) =>
        setError(err instanceof ApiError ? err.message : "Failed to load settings"),
      )
      .finally(() => setLoading(false))
  }, [])

  function set<K extends keyof Settings>(key: K, value: string) {
    setSettings((prev) => ({ ...prev, [key]: value }))
    setSuccess("")
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError("")
    setSuccess("")

    try {
      await api.put("/api/admin/settings", settings)
      setSuccess("Settings saved successfully")
    } catch (err) {
      if (err instanceof ApiError && Array.isArray(err.details)) {
        setError(
          (err.details as { field?: string; message: string }[])
            .map((d) => `${d.field ? d.field + ": " : ""}${d.message}`)
            .join(" · "),
        )
      } else {
        setError(err instanceof Error ? err.message : "Failed to save settings")
      }
    }
    setSaving(false)
  }

  if (loading) {
    return <div className="text-center py-8 text-muted">Loading settings...</div>
  }

  return (
    <div className="max-w-4xl">
      <h1 className="text-2xl font-bold text-charcoal mb-6">Site Settings</h1>

      {error && <Alert variant="error" className="mb-6">{error}</Alert>}
      {success && <Alert variant="success" className="mb-6">{success}</Alert>}

      <form onSubmit={handleSave} className="space-y-8">
        {/* Hero Section */}
        <section className="bg-white rounded-xl border border-border p-6">
          <h2 className="text-lg font-semibold text-charcoal mb-4">Hero Section</h2>
          <div className="space-y-4">
            <Input
              label="Hero Heading"
              value={settings.hero_heading}
              onChange={(e) => set("hero_heading", e.target.value)}
            />
            <div>
              <label htmlFor="hero_description" className="block text-sm font-medium text-charcoal mb-1.5">
                Hero Description
              </label>
              <textarea
                id="hero_description"
                value={settings.hero_description}
                onChange={(e) => set("hero_description", e.target.value)}
                className="w-full rounded-lg border border-border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                rows={3}
              />
            </div>
            <Input
              label="Hero Image URL"
              type="url"
              value={settings.hero_image_url}
              onChange={(e) => set("hero_image_url", e.target.value)}
            />
          </div>
        </section>

        {/* Featured Content */}
        <section className="bg-white rounded-xl border border-border p-6">
          <h2 className="text-lg font-semibold text-charcoal mb-4">Featured Content</h2>
          <div className="space-y-4">
            <Input
              label="Featured Heading"
              value={settings.featured_heading}
              onChange={(e) => set("featured_heading", e.target.value)}
            />
            <div>
              <label htmlFor="featured_description" className="block text-sm font-medium text-charcoal mb-1.5">
                Featured Description
              </label>
              <textarea
                id="featured_description"
                value={settings.featured_description}
                onChange={(e) => set("featured_description", e.target.value)}
                className="w-full rounded-lg border border-border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                rows={3}
              />
            </div>
            <Input
              label="Featured Image URL"
              type="url"
              value={settings.featured_image_url}
              onChange={(e) => set("featured_image_url", e.target.value)}
            />
          </div>
        </section>

        {/* About Section */}
        <section className="bg-white rounded-xl border border-border p-6">
          <h2 className="text-lg font-semibold text-charcoal mb-4">About Section</h2>
          <div className="space-y-4">
            <Input
              label="About Heading"
              value={settings.about_heading}
              onChange={(e) => set("about_heading", e.target.value)}
            />
            <div>
              <label htmlFor="about_description" className="block text-sm font-medium text-charcoal mb-1.5">
                About Description
              </label>
              <textarea
                id="about_description"
                value={settings.about_description}
                onChange={(e) => set("about_description", e.target.value)}
                className="w-full rounded-lg border border-border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                rows={3}
              />
            </div>
            <Input
              label="About Image URL"
              type="url"
              value={settings.about_image_url}
              onChange={(e) => set("about_image_url", e.target.value)}
            />
          </div>
        </section>

        {/* Contact Information */}
        <section className="bg-white rounded-xl border border-border p-6">
          <h2 className="text-lg font-semibold text-charcoal mb-4">Contact Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Contact Email"
              type="email"
              value={settings.contact_email}
              onChange={(e) => set("contact_email", e.target.value)}
            />
            <Input
              label="Contact Phone"
              value={settings.contact_phone}
              onChange={(e) => set("contact_phone", e.target.value)}
            />
            <div className="md:col-span-2">
              <Input
                label="Contact Address"
                value={settings.contact_address}
                onChange={(e) => set("contact_address", e.target.value)}
              />
            </div>
          </div>
        </section>

        {/* Social Media URLs */}
        <section className="bg-white rounded-xl border border-border p-6">
          <h2 className="text-lg font-semibold text-charcoal mb-4">Social Media URLs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Facebook URL" type="url" value={settings.facebook_url} onChange={(e) => set("facebook_url", e.target.value)} />
            <Input label="Twitter URL" type="url" value={settings.twitter_url} onChange={(e) => set("twitter_url", e.target.value)} />
            <Input label="LinkedIn URL" type="url" value={settings.linkedin_url} onChange={(e) => set("linkedin_url", e.target.value)} />
            <Input label="Instagram URL" type="url" value={settings.instagram_url} onChange={(e) => set("instagram_url", e.target.value)} />
          </div>
        </section>

        {/* Footer */}
        <section className="bg-white rounded-xl border border-border p-6">
          <h2 className="text-lg font-semibold text-charcoal mb-4">Footer</h2>
          <div>
            <label htmlFor="footer_text" className="block text-sm font-medium text-charcoal mb-1.5">
              Footer Text
            </label>
            <textarea
              id="footer_text"
              value={settings.footer_text}
              onChange={(e) => set("footer_text", e.target.value)}
              className="w-full rounded-lg border border-border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              rows={2}
            />
          </div>
        </section>

        <div className="flex justify-end">
          <Button type="submit" isLoading={saving}>
            Save All Settings
          </Button>
        </div>
      </form>
    </div>
  )
}
