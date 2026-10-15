import { Announcement } from '../types'

/**
 * Announcements data for YSSE homepage.
 *
 * NOTE: This is demo data for the frontend prototype.
 * Replace with actual announcements from official YSSE channels
 * when the backend is connected.
 */

export const announcements: Announcement[] = [
  {
    id: 'ann-1',
    title: 'Applications Open for 2026 Training Cohort',
    date: '2026-01-15',
    excerpt:
      'Y SSE is now accepting applications for the 2026 entrepreneurship training cohort. Young aspiring social entrepreneurs are encouraged to apply.',
    category: 'Programs',
  },
  {
    id: 'ann-2',
    title: 'New Partnership with Regional Development Organizations',
    date: '2026-01-08',
    excerpt:
      'Y SSE has established new partnerships to expand program reach and strengthen support for young social entrepreneurs across the region.',
    category: 'Partnerships',
  },
  {
    id: 'ann-3',
    title: 'Virtual Internship Program: Demo Data',
    date: '2025-12-20',
    excerpt:
      'Our virtual internship program offers flexible opportunities for students and recent graduates. Note: this is sample content for demonstration purposes.',
    category: 'Opportunities',
  },
]
