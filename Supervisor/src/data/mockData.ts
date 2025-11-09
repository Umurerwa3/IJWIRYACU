import { Report, Officer, Analytics } from '../types';

export const districts = [
  'Kigali', 'Eastern', 'Northern', 'Southern', 'Western'
];

export const sectors = {
  'Kigali': ['Gasabo', 'Kicukiro', 'Nyarugenge'],
  'Eastern': ['Kayonza', 'Kirehe', 'Ngoma', 'Rwamagana'],
  'Northern': ['Burera', 'Gakenke', 'Gicumbi', 'Musanze', 'Rulindo'],
  'Southern': ['Gisagara', 'Huye', 'Kamonyi', 'Muhanga', 'Nyamagabe'],
  'Western': ['Karongi', 'Ngororero', 'Nyabihu', 'Rubavu', 'Rusizi']
};

export const mockOfficers: Officer[] = [
  {
    id: '1',
    name: 'Marie Uwase',
    phone: '+250788123456',
    district: 'Kigali',
    role: 'District Coordinator',
    performance: { resolved: 42, pending: 8, avgResolutionTime: 2.3, score: 94 }
  },
  {
    id: '2',
    name: 'Jean Baptiste Gasana',
    phone: '+250788234567',
    district: 'Eastern',
    role: 'Field Officer',
    performance: { resolved: 38, pending: 12, avgResolutionTime: 3.1, score: 87 }
  },
  {
    id: '3',
    name: 'Grace Mukamana',
    phone: '+250788345678',
    district: 'Northern',
    role: 'Infrastructure Specialist',
    performance: { resolved: 51, pending: 5, avgResolutionTime: 1.8, score: 96 }
  },
  {
    id: '4',
    name: 'Paul Niyonshuti',
    phone: '+250788456789',
    district: 'Southern',
    role: 'Health Coordinator',
    performance: { resolved: 29, pending: 15, avgResolutionTime: 4.2, score: 78 }
  },
  {
    id: '5',
    name: 'Alice Nyirahabimana',
    phone: '+250788567890',
    district: 'Western',
    role: 'Education Officer',
    performance: { resolved: 33, pending: 9, avgResolutionTime: 2.9, score: 89 }
  }
];

export const mockReports: Report[] = [
  {
    id: 'RPT-2024-001',
    timestamp: new Date('2024-01-15T08:30:00'),
    category: 'Water',
    subcategory: 'Broken Pipe',
    location: { district: 'Western', sector: 'Rubavu' },
    description: 'Main water pipe burst on Rubavu main road, affecting 200+ households',
    status: 'New',
    priority: 'Critical',
    isAnonymous: false,
    reporterPhone: '+250788111111',
    deadline: new Date('2024-01-17T23:59:59')
  },
  {
    id: 'RPT-2024-002',
    timestamp: new Date('2024-01-15T09:15:00'),
    category: 'Infrastructure',
    subcategory: 'Road Damage',
    location: { district: 'Kigali', sector: 'Gasabo' },
    description: 'Large pothole on KN 5 Road causing traffic disruption',
    status: 'In Progress',
    priority: 'High',
    assignedTo: '1',
    isAnonymous: false,
    reporterPhone: '+250788222222',
    deadline: new Date('2024-01-20T23:59:59')
  },
  {
    id: 'RPT-2024-003',
    timestamp: new Date('2024-01-14T14:20:00'),
    category: 'Healthcare',
    subcategory: 'Medicine Shortage',
    location: { district: 'Southern', sector: 'Huye' },
    description: 'Huye Hospital running out of essential medications',
    status: 'New',
    priority: 'High',
    isAnonymous: true,
    deadline: new Date('2024-01-18T23:59:59')
  },
  {
    id: 'RPT-2024-004',
    timestamp: new Date('2024-01-14T16:45:00'),
    category: 'Education',
    subcategory: 'School Infrastructure',
    location: { district: 'Northern', sector: 'Musanze' },
    description: 'Classroom roof leaking during rainy season',
    status: 'Resolved',
    priority: 'Medium',
    assignedTo: '3',
    isAnonymous: false,
    reporterPhone: '+250788333333',
    resolutionNotes: 'Roof repaired and waterproofed',
    resolvedAt: new Date('2024-01-15T11:00:00'),
    deadline: new Date('2024-01-25T23:59:59')
  },
  {
    id: 'RPT-2024-005',
    timestamp: new Date('2024-01-13T11:30:00'),
    category: 'Security',
    subcategory: 'Street Lighting',
    location: { district: 'Eastern', sector: 'Rwamagana' },
    description: 'Multiple street lights not working on main commercial street',
    status: 'In Progress',
    priority: 'Medium',
    assignedTo: '2',
    isAnonymous: false,
    reporterPhone: '+250788444444',
    deadline: new Date('2024-01-22T23:59:59')
  },
  {
    id: 'RPT-2024-006',
    timestamp: new Date('2024-01-12T07:00:00'),
    category: 'Environment',
    subcategory: 'Waste Management',
    location: { district: 'Kigali', sector: 'Kicukiro' },
    description: 'Garbage collection missed for 2 weeks in residential area',
    status: 'New',
    priority: 'Low',
    isAnonymous: false,
    reporterPhone: '+250788555555',
    deadline: new Date('2024-01-30T23:59:59')
  }
];

export const mockAnalytics: Analytics = {
  totalReports: 156,
  resolvedReports: 98,
  pendingReports: 58,
  overdueReports: 12,
  avgResolutionTime: 3.2,
  reportsByCategory: {
    'Infrastructure': 45,
    'Water': 32,
    'Healthcare': 28,
    'Education': 24,
    'Security': 18,
    'Environment': 9
  },
  reportsByDistrict: {
    'Kigali': 48,
    'Eastern': 32,
    'Northern': 28,
    'Southern': 26,
    'Western': 22
  },
  monthlyTrends: [
    { month: 'Sep', reports: 89, resolved: 76 },
    { month: 'Oct', reports: 102, resolved: 88 },
    { month: 'Nov', reports: 134, resolved: 115 },
    { month: 'Dec', reports: 156, resolved: 98 },
    { month: 'Jan', reports: 23, resolved: 8 }
  ]
};