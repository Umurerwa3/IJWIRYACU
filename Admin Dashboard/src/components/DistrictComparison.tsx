import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Clock, 
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  MapPin,
  BarChart2,
  Users
} from 'lucide-react';

interface DistrictComparisonProps {
  language: 'en' | 'rw';
}

interface DistrictMetric {
  id: number;
  name: string;
  totalReports: number;
  resolvedReports: number;
  avgResponseTime: number;
  satisfactionRating: number;
  urgentReports: number;
  trend: 'up' | 'down' | 'stable';
  activeIssues: number;
  categories: {
    water: number;
    roads: number;
    health: number;
    education: number;
  };
}

export const DistrictComparison: React.FC<DistrictComparisonProps> = ({ language }) => {
  const [sortField, setSortField] = useState<keyof DistrictMetric>('totalReports');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [selectedMetric, setSelectedMetric] = useState<keyof DistrictMetric>('totalReports');

  const translations = {
    en: {
      title: 'District Performance Comparison',
      subtitle: 'Compare metrics across districts',
      totalReports: 'Total Reports',
      resolvedReports: 'Resolved Reports',
      avgResponseTime: 'Avg. Response Time',
      satisfactionRating: 'Satisfaction Rating',
      urgentReports: 'Urgent Reports',
      resolutionRate: 'Resolution Rate',
      sortBy: 'Sort by',
      trend: {
        up: 'Improving',
        down: 'Declining',
        stable: 'Stable'
      },
      timeFrame: 'Last 30 days',
      selectMetric: 'Select Metric to Compare'
    },
    rw: {
      title: 'Gutondeka Imikorere y\'Akarere',
      subtitle: 'Gereranya imikorere mu turere',
      totalReports: 'Raporo Zose',
      resolvedReports: 'Raporo Zakemuwe',
      avgResponseTime: 'Igihe cy\'Igisubizo',
      satisfactionRating: 'Ishimwe',
      urgentReports: 'Raporo Zihutirwa',
      resolutionRate: 'Umubare w\'Ibisubizo',
      sortBy: 'Gutondeka',
      trend: {
        up: 'Byongeye',
        down: 'Byakabanuka',
        stable: 'Byakomeje'
      },
      timeFrame: 'Iminsi 30 ishize',
      selectMetric: 'Hitamo Imikorere yo Kugereranya'
    }
  };

  const t = translations[language];

  const mockDistricts: DistrictMetric[] = [
    {
      id: 1,
      name: 'Kigali',
      totalReports: 245,
      resolvedReports: 198,
      avgResponseTime: 2.1,
      satisfactionRating: 4.7,
      urgentReports: 15,
      trend: 'up',
      activeIssues: 45,
      categories: {
        water: 35,
        roads: 28,
        health: 22,
        education: 15
      }
    },
    {
      id: 2,
      name: 'Musanze',
      totalReports: 178,
      resolvedReports: 145,
      avgResponseTime: 2.8,
      satisfactionRating: 4.5,
      urgentReports: 12,
      trend: 'stable',
      activeIssues: 38,
      categories: {
        water: 30,
        roads: 32,
        health: 18,
        education: 12
      }
    },
    {
      id: 3,
      name: 'Huye',
      totalReports: 156,
      resolvedReports: 120,
      avgResponseTime: 3.2,
      satisfactionRating: 4.2,
      urgentReports: 18,
      trend: 'down',
      activeIssues: 42,
      categories: {
        water: 32,
        roads: 30,
        health: 20,
        education: 14
      }
    },
    {
      id: 4,
      name: 'Rubavu',
      totalReports: 132,
      resolvedReports: 98,
      avgResponseTime: 2.9,
      satisfactionRating: 4.4,
      urgentReports: 10,
      trend: 'up',
      activeIssues: 38,
      categories: {
        water: 30,
        roads: 32,
        health: 18,
        education: 12
      }
    }
  ];

  const handleSort = (field: keyof DistrictMetric) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const getTrendColor = (trend: DistrictMetric['trend']) => {
    switch (trend) {
      case 'up': return 'text-green-600';
      case 'down': return 'text-red-600';
      case 'stable': return 'text-yellow-600';
    }
  };

  const getTrendIcon = (trend: DistrictMetric['trend']) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4" />;
      case 'down': return <TrendingUp className="w-4 h-4 transform rotate-180" />;
      case 'stable': return <BarChart3 className="w-4 h-4" />;
    }
  };

  const sortedDistricts = [...mockDistricts].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];
    const direction = sortDirection === 'asc' ? 1 : -1;
    
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return direction * (aValue - bValue);
    }
    return 0;
  });

  const getMetricColor = (metric: keyof DistrictMetric, value: number) => {
    switch (metric) {
      case 'satisfactionRating':
        return value >= 4.5 ? 'text-green-600' : value >= 4.0 ? 'text-yellow-600' : 'text-red-600';
      case 'avgResponseTime':
        return value <= 2.5 ? 'text-green-600' : value <= 3.0 ? 'text-yellow-600' : 'text-red-600';
      default:
        return 'text-gray-900';
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">{t.title}</h2>
        <p className="text-gray-600">{t.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {sortedDistricts.map((district) => (
          <div key={district.id} className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">{district.name} District</h3>

            {/* Key Metrics */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <BarChart2 className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-600">{t.totalReports}</span>
                </div>
                <div className="text-2xl font-bold text-blue-800">{district.totalReports}</div>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium text-green-600">{t.resolvedReports}</span>
                </div>
                <div className="text-2xl font-bold text-green-800">{district.resolvedReports}</div>
              </div>

              <div className="bg-orange-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <AlertTriangle className="w-4 h-4 text-orange-600" />
                  <span className="text-sm font-medium text-orange-600">{t.urgentReports}</span>
                </div>
                <div className="text-2xl font-bold text-orange-800">{district.urgentReports}</div>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <Users className="w-4 h-4 text-purple-600" />
                  <span className="text-sm font-medium text-purple-600">{t.satisfactionRating}</span>
                </div>
                <div className="text-2xl font-bold text-purple-800">{district.satisfactionRating}</div>
              </div>
            </div>

            {/* Category Distribution */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-3">Issue Categories</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Water Access</span>
                  <span className="text-sm font-medium text-gray-800">{district.categories.water}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${district.categories.water}%` }}
                  />
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Road Repair</span>
                  <span className="text-sm font-medium text-gray-800">{district.categories.roads}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-yellow-600 h-2 rounded-full"
                    style={{ width: `${district.categories.roads}%` }}
                  />
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Healthcare</span>
                  <span className="text-sm font-medium text-gray-800">{district.categories.health}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-red-600 h-2 rounded-full"
                    style={{ width: `${district.categories.health}%` }}
                  />
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Education</span>
                  <span className="text-sm font-medium text-gray-800">{district.categories.education}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-purple-600 h-2 rounded-full"
                    style={{ width: `${district.categories.education}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Response Time */}
            <div className="mt-6 pt-6 border-t border-gray-100">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">{t.avgResponseTime}</span>
                <span className="text-sm font-medium text-gray-800">{district.avgResponseTime}h</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}; 