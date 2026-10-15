import { Course } from '../types'

/**
 * Course data for YSSE.
 *
 * NOTE: This is demo data for the frontend prototype.
 * Course descriptions and topics reflect typical social entrepreneurship
 * training content. Recorded session URLs are placeholder links and should
 * be replaced with actual learning materials when the backend is connected.
 */

export const courses: Course[] = [
  {
    id: 'social-entrepreneurship-fundamentals',
    title: 'Social Entrepreneurship Fundamentals',
    description:
      'An introductory course covering the core concepts of social entrepreneurship, including identifying social problems, developing sustainable business models, and measuring social impact. Participants will learn to distinguish social enterprises from traditional businesses and nonprofits.',
    category: 'Entrepreneurship',
    duration: '4 weeks',
    level: 'Beginner',
    format: 'Recorded',
    department: 'Training and Development',
    image:
      'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80',
    topics: [
      'Introduction to Social Entrepreneurship',
      'Identifying Social Problems',
      'Business Model Canvas for Social Enterprises',
      'Measuring Social Impact',
    ],
    resources: [
      {
        id: 'sef-video-1',
        title: 'Module 1: Introduction to Social Entrepreneurship',
        type: 'video',
        url: '#',
        description:
          'Recorded lecture covering foundational concepts of social entrepreneurship.',
      },
      {
        id: 'sef-doc-1',
        title: 'Social Business Model Canvas Template',
        type: 'document',
        url: '#',
        description:
          'Printable template for mapping your social enterprise business model.',
      },
      {
        id: 'sef-link-1',
        title: 'Impact Measurement Toolkit',
        type: 'link',
        url: '#',
        description:
          'External resource with frameworks for measuring social impact.',
      },
    ],
  },
  {
    id: 'business-model-design',
    title: 'Business Model Design for Social Ventures',
    description:
      'A hands-on course teaching participants how to design, test, and refine business models for social ventures. Uses the Business Model Canvas and Lean Startup methodology tailored for mission-driven organizations.',
    category: 'Business Skills',
    duration: '6 weeks',
    level: 'Intermediate',
    format: 'Recorded',
    department: 'Training and Development',
    image:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
    topics: [
      'Business Model Canvas Deep Dive',
      'Value Proposition Design',
      'Revenue Models for Social Enterprises',
      'Lean Startup for Social Ventures',
      'Customer Discovery and Validation',
    ],
    resources: [
      {
        id: 'bmd-video-1',
        title: 'Module 1: Business Model Canvas Walkthrough',
        type: 'video',
        url: '#',
        description: 'Detailed walkthrough of each canvas component.',
      },
      {
        id: 'bmd-video-2',
        title: 'Module 2: Revenue Models for Social Enterprises',
        type: 'video',
        url: '#',
        description: 'Exploring diverse revenue strategies.',
      },
      {
        id: 'bmd-doc-1',
        title: 'Lean Canvas Worksheet',
        type: 'document',
        url: '#',
        description: 'Worksheet for lean business model planning.',
      },
    ],
  },
  {
    id: 'impact-measurement',
    title: 'Impact Measurement and Evaluation',
    description:
      'Covers frameworks and tools for measuring, evaluating, and communicating social impact. Participants will learn to set indicators, collect data, and use evaluation findings to improve programs.',
    category: 'Impact',
    duration: '4 weeks',
    level: 'Intermediate',
    format: 'Recorded',
    department: 'Research and Innovation',
    image:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
    topics: [
      'Introduction to Impact Measurement',
      'Theory of Change',
      'Key Performance Indicators',
      'Data Collection Methods',
      'Reporting and Communication',
    ],
    resources: [
      {
        id: 'ime-video-1',
        title: 'Module 1: Theory of Change Framework',
        type: 'video',
        url: '#',
        description: 'Building a theory of change for your venture.',
      },
      {
        id: 'ime-doc-1',
        title: 'KPI Selection Guide',
        type: 'document',
        url: '#',
        description: 'Guide for selecting appropriate key performance indicators.',
      },
    ],
  },
  {
    id: 'design-thinking',
    title: 'Design Thinking for Social Innovation',
    description:
      'An interactive course applying design thinking methodology to social challenges. Participants will practice empathy mapping, ideation, prototyping, and user testing to develop human-centered solutions.',
    category: 'Innovation',
    duration: '3 weeks',
    level: 'Beginner',
    format: 'Live',
    department: 'Research and Innovation',
    image:
      'https://images.unsplash.com/photo-1559028012-481c04fa702d?w=800&q=80',
    topics: [
      'Empathy and User Research',
      'Problem Framing',
      'Ideation Techniques',
      'Rapid Prototyping',
      'User Testing and Iteration',
    ],
    resources: [
      {
        id: 'dt-video-1',
        title: 'Module 1: Empathy Mapping Workshop',
        type: 'video',
        url: '#',
        description: 'Recorded live session on empathy mapping techniques.',
      },
      {
        id: 'dt-doc-1',
        title: 'Design Thinking Workbook',
        type: 'document',
        url: '#',
        description: 'Interactive workbook for design thinking exercises.',
      },
    ],
  },
  {
    id: 'financial-management',
    title: 'Financial Management for Social Enterprises',
    description:
      'Teaches essential financial management skills for running a sustainable social enterprise, including budgeting, financial planning, bookkeeping basics, and understanding funding options.',
    category: 'Business Skills',
    duration: '5 weeks',
    level: 'Intermediate',
    format: 'Recorded',
    department: 'Operations and Administration',
    image:
      'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80',
    topics: [
      'Budgeting and Financial Planning',
      'Bookkeeping Fundamentals',
      'Financial Statements',
      'Funding and Investment Readiness',
    ],
    resources: [
      {
        id: 'fme-video-1',
        title: 'Module 1: Budgeting Basics',
        type: 'video',
        url: '#',
        description: 'Introduction to budgeting for social enterprises.',
      },
      {
        id: 'fme-doc-1',
        title: 'Financial Planning Template',
        type: 'document',
        url: '#',
        description: 'Template for creating financial plans.',
      },
    ],
  },
  {
    id: 'leadership-team-building',
    title: 'Leadership and Team Building',
    description:
      'Develops leadership skills essential for leading social ventures. Covers team formation, communication, conflict resolution, and creating inclusive organizational cultures.',
    category: 'Leadership',
    duration: '3 weeks',
    level: 'Beginner',
    format: 'Self-paced',
    department: 'Training and Development',
    image:
      'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&q=80',
    topics: [
      'Leadership Styles and Approaches',
      'Building and Leading Teams',
      'Effective Communication',
      'Conflict Resolution',
      'Inclusive Leadership',
    ],
    resources: [
      {
        id: 'ltb-video-1',
        title: 'Module 1: Understanding Leadership Styles',
        type: 'video',
        url: '#',
        description: 'Self-paced module on leadership approaches.',
      },
      {
        id: 'ltb-link-1',
        title: 'Team Roles Assessment Tool',
        type: 'link',
        url: '#',
        description: 'External tool for understanding team dynamics.',
      },
    ],
  },
]
