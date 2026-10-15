/**
 * API service placeholder for future backend integration.
 *
 * When the backend is ready, replace the mock data imports in
 * the data/ layer with actual fetch calls to the API.
 *
 * Expected backend endpoints:
 *   GET  /api/departments
 *   GET  /api/departments/:id
 *   GET  /api/courses
 *   GET  /api/courses/:id
 *   GET  /api/internships
 *   GET  /api/internships/:id
 *   POST /api/applications
 *   GET  /api/applications/:id/status
 *   POST /api/contact
 */

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

export async function fetchDepartments() {
  // TODO: Replace with real API call
  // const res = await fetch(`${API_URL}/departments`)
  // return res.json()
  void API_URL // suppress unused warning for now
  return []
}

export async function submitApplication(_formData: FormData) {
  // TODO: Replace with real API call
  // const res = await fetch(`${API_URL}/applications`, {
  //   method: 'POST',
  //   body: formData,
  // })
  // return res.json()
  void API_URL
  return { success: true }
}

export async function submitContactForm(_data: unknown) {
  // TODO: Replace with real API call
  // const res = await fetch(`${API_URL}/contact`, {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(data),
  // })
  // return res.json()
  void API_URL
  return { success: true }
}
