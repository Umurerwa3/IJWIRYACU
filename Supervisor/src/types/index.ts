export interface Report {
  id: string;
  timestamp: Date;
  category: 'Infrastructure' | 'Healthcare' | 'Education' | 'Security' | 'Water' | 'Environment';
  subcategory: string;
  location: {
    district: string;
    sector: string;
    coordinates?: [number, number];
  };
  description: string;
  status: 'New' | 'In Progress' | 'Resolved' | 'Closed';
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  assignedTo?: string;
  reporterPhone?: string;
  isAnonymous: boolean;
  photos?: string[];
  resolutionNotes?: string;
  resolvedAt?: Date;
  deadline: Date;
}

export interface Officer {
  id: string;
  name: string;
  phone: string;
  district: string;
  role: string;
  avatar?: string;
  performance: {
    resolved: number;
    pending: number;
    avgResolutionTime: number; // in days
    score: number;
  };
}

export interface Analytics {
  totalReports: number;
  resolvedReports: number;
  pendingReports: number;
  overdueReports: number;
  avgResolutionTime: number;
  reportsByCategory: Record<string, number>;
  reportsByDistrict: Record<string, number>;
  monthlyTrends: Array<{
    month: string;
    reports: number;
    resolved: number;
  }>;
}

export interface Filter {
  category?: string;
  district?: string;
  status?: string;
  priority?: string;
  assignedTo?: string;
  dateRange?: [Date, Date];
  isOverdue?: boolean;
  isAnonymous?: boolean;
}