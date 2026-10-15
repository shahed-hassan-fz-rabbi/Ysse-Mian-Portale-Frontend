import { Internship } from '../types'

/**
 * Internship opportunities data for YSSE.
 *
 * NOTE: This is demo data for the frontend prototype.
 * Deadlines and details are illustrative. Replace with verified
 * information from official YSSE recruitment channels when available.
 */

export const internships: Internship[] = [
  {
    id: 'training-intern',
    title: 'Training and Program Delivery Intern',
    department: 'Training and Development',
    description:
      'Support the design and delivery of entrepreneurship training programs. Assist with workshop preparation, participant coordination, and training material development. Gain hands-on experience in nonprofit program delivery.',
    responsibilities: [
      'Assist in preparing training materials and resources',
      'Support workshop logistics and participant coordination',
      'Help collect and organize participant feedback',
      'Contribute to training program documentation',
    ],
    requirements: [
      'Currently enrolled in or recently completed a degree program',
      'Strong written and verbal communication skills',
      'Interest in social entrepreneurship and youth development',
      'Proficiency with Microsoft Office or Google Workspace',
      'Ability to work collaboratively in a team environment',
    ],
    duration: '3-6 months',
    location: 'Remote / Hybrid',
    deadline: 'Demo: Rolling applications',
    isDemo: true,
    image:
      'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80',
  },
  {
    id: 'research-intern',
    title: 'Research and Data Analysis Intern',
    department: 'Research and Innovation',
    description:
      'Contribute to research projects on social entrepreneurship and youth development. Support data collection, literature reviews, and report writing. Develop practical research skills in a nonprofit context.',
    responsibilities: [
      'Conduct literature reviews and desktop research',
      'Support data collection and basic analysis',
      'Assist in drafting research reports and case studies',
      'Contribute to research project coordination',
    ],
    requirements: [
      'Background in social sciences, research, or related field',
      'Strong analytical and critical thinking skills',
      'Experience with data collection and analysis methods',
      'Excellent written communication skills',
      'Attention to detail and organizational skills',
    ],
    duration: '4-6 months',
    location: 'Remote',
    deadline: 'Demo: Rolling applications',
    isDemo: true,
    image:
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80',
  },
  {
    id: 'communications-intern',
    title: 'Communications and Social Media Intern',
    department: 'Community Engagement and Partnerships',
    description:
      'Support YSSE\'s communications and social media presence. Help create content, manage social media accounts, and coordinate outreach activities. Learn how nonprofit organizations build and engage their communities.',
    responsibilities: [
      'Draft social media posts and newsletter content',
      'Support social media account management',
      'Assist in organizing community events and outreach',
      'Help create communications materials and graphics',
    ],
    requirements: [
      'Strong writing and content creation skills',
      'Familiarity with major social media platforms',
      'Interest in nonprofit communications and storytelling',
      'Basic graphic design skills are a plus',
      'Proactive and creative mindset',
    ],
    duration: '3-6 months',
    location: 'Remote',
    deadline: 'Demo: Rolling applications',
    isDemo: true,
    image:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
  },
  {
    id: 'operations-intern',
    title: 'Operations and Administration Intern',
    department: 'Operations and Administration',
    description:
      'Gain experience in nonprofit operations and administration. Support administrative processes, financial documentation, event logistics, and day-to-day organizational functions.',
    responsibilities: [
      'Support administrative and organizational processes',
      'Assist with event planning and logistics',
      'Help maintain organizational records and documentation',
      'Coordinate communications between departments',
    ],
    requirements: [
      'Strong organizational and time management skills',
      'Proficiency with office productivity tools',
      'Interest in nonprofit management and operations',
      'Discretion and professionalism with sensitive information',
      'Ability to manage multiple tasks and deadlines',
    ],
    duration: '3-4 months',
    location: 'Hybrid',
    deadline: 'Demo: Rolling applications',
    isDemo: true,
    image:
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
  },
]
