import { Department } from '../types'

/**
 * Department data for YSSE.
 *
 * NOTE: This is demo data for the frontend prototype.
 * Team member names and specific organizational details should be
 * replaced with verified information from official YSSE sources
 * when the backend is connected.
 */

export const departments: Department[] = [
  {
    id: 'training-development',
    name: 'Training and Development',
    shortName: 'T&D',
    description:
      'Designs and delivers entrepreneurship training programs, workshops, and capacity-building sessions for young social entrepreneurs. Develops curricula and learning materials that equip participants with practical skills for launching and managing social enterprises.',
    goals: [
      'Develop comprehensive entrepreneurship training curricula',
      'Deliver high-quality workshops and capacity-building sessions',
      'Mentor young entrepreneurs through program cycles',
      'Evaluate training effectiveness and learner outcomes',
    ],
    responsibilities: [
      'Curriculum design and development',
      'Workshop facilitation and delivery',
      'Participant assessment and feedback',
      'Training material production and updates',
    ],
    activities: [
      'Entrepreneurship bootcamps',
      'Business model canvas workshops',
      'Design thinking sessions',
      'Pitch preparation clinics',
    ],
    image:
      'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80',
    headOfDepartment: 'Head of Training and Development',
    teamMembers: [
      { name: 'Training Coordinator', role: 'Program Delivery' },
      { name: 'Curriculum Specialist', role: 'Content Development' },
      { name: 'Learning Facilitator', role: 'Workshop Delivery' },
    ],
  },
  {
    id: 'research-innovation',
    name: 'Research and Innovation',
    shortName: 'R&I',
    description:
      'Conducts research on social entrepreneurship trends, innovation models, and impact measurement. Produces reports, case studies, and knowledge products that inform YSSE programs and contribute to the broader social enterprise ecosystem.',
    goals: [
      'Produce evidence-based research on social entrepreneurship',
      'Develop innovative program models and methodologies',
      'Build partnerships with academic and research institutions',
      'Document and disseminate best practices',
    ],
    responsibilities: [
      'Research design and data collection',
      'Report and publication production',
      'Innovation lab management',
      'Partnership and collaboration coordination',
    ],
    activities: [
      'Sector research and analysis',
      'Innovation challenges and hackathons',
      'Case study development',
      'Academic partnerships',
    ],
    image:
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80',
    headOfDepartment: 'Head of Research and Innovation',
    teamMembers: [
      { name: 'Research Lead', role: 'Research Design' },
      { name: 'Data Analyst', role: 'Data and Analytics' },
      { name: 'Innovation Officer', role: 'Innovation Programs' },
    ],
  },
  {
    id: 'community-engagement',
    name: 'Community Engagement and Partnerships',
    shortName: 'CEP',
    description:
      'Builds and maintains relationships with stakeholders, partners, and the broader community. Manages outreach activities, volunteer coordination, and communications to amplify YSSE\'s impact and foster a supportive ecosystem for young social entrepreneurs.',
    goals: [
      'Build strategic partnerships with organizations and institutions',
      'Manage community outreach and engagement programs',
      'Coordinate volunteer and mentor networks',
      'Amplify YSSE\'s work through communications',
    ],
    responsibilities: [
      'Partnership development and management',
      'Community event planning and execution',
      'Volunteer and mentor coordination',
      'Communications and outreach',
    ],
    activities: [
      'Partnership meetings and events',
      'Community outreach campaigns',
      'Volunteer onboarding and coordination',
      'Social media and communications',
    ],
    image:
      'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&q=80',
    headOfDepartment: 'Head of Community Engagement',
    teamMembers: [
      { name: 'Partnerships Manager', role: 'Partnership Development' },
      { name: 'Outreach Coordinator', role: 'Community Programs' },
      { name: 'Communications Officer', role: 'Communications' },
    ],
  },
  {
    id: 'operations-administration',
    name: 'Operations and Administration',
    shortName: 'Ops',
    description:
      'Ensures the smooth day-to-day functioning of YSSE. Manages administrative processes, financial operations, human resources, and logistics to support all departments in delivering their programs effectively.',
    goals: [
      'Ensure efficient organizational operations',
      'Manage financial and administrative processes',
      'Support human resources and staff development',
      'Maintain organizational systems and infrastructure',
    ],
    responsibilities: [
      'Administrative process management',
      'Financial and budget coordination',
      'Human resources and staff support',
      'Logistics and operations support',
    ],
    activities: [
      'Administrative coordination',
      'Financial management support',
      'Staff onboarding and support',
      'Event and program logistics',
    ],
    image:
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
    headOfDepartment: 'Head of Operations and Administration',
    teamMembers: [
      { name: 'Operations Manager', role: 'Operations' },
      { name: 'Finance Officer', role: 'Finance' },
      { name: 'HR Coordinator', role: 'Human Resources' },
    ],
  },
]
