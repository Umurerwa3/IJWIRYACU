import React from 'react';
import { TrendingUp, AlertTriangle, Users, MapPin } from 'lucide-react';

interface TrendingIssuesProps {
  language: 'en' | 'rw';
}

export const TrendingIssues: React.FC<TrendingIssuesProps> = ({ language }) => {
  const translations = {
    en: {
      title: 'Trending Issues',
      subtitle: 'Monitor emerging community concerns and patterns',
      viewDetails: 'View Details',
      category: 'Category',
      reports: 'reports'
    },
    rw: {
      title: 'Ibibazo Bihuse',
      subtitle: 'Kurikirana ibibazo by\'abaturage n\'imiterere yabyo',
      viewDetails: 'Reba Ibisobanuro',
      category: 'Ubwoko',
      reports: 'raporo'
    }
  };

  const t = translations[language];

  const trendingIssues = [
    {
      id: 1,
      title: 'Water Access Crisis',
      category: 'Infrastructure',
      location: 'Gasabo District',
      reports: 45,
      trend: 'increasing',
      severity: 'high',
      description: 'Multiple reports of water supply issues affecting 500+ households'
    },
    {
      id: 2,
      title: 'Road Safety Concerns',
      category: 'Transportation',
      location: 'Kicukiro District',
      reports: 32,
      trend: 'stable',
      severity: 'medium',
      description: 'Reports of dangerous road conditions near market area'
    },
    {
      id: 3,
      title: 'Medical Supply Shortage',
      category: 'Healthcare',
      location: 'Muhanga District',
      reports: 28,
      trend: 'increasing',
      severity: 'critical',
      description: 'Critical shortage of essential medical supplies at health center'
    }
  ];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'increasing':
        return <TrendingUp className="w-4 h-4 text-red-600" />;
      case 'decreasing':
        return <TrendingUp className="w-4 h-4 text-green-600 transform rotate-180" />;
      default:
        return <TrendingUp className="w-4 h-4 text-yellow-600" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-100 text-red-800';
      case 'high':
        return 'bg-orange-100 text-orange-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">{t.title}</h2>
        <p className="text-gray-600">{t.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trendingIssues.map((issue) => (
          <div key={issue.id} className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-bold text-gray-800">{issue.title}</h3>
                <div className="flex items-center gap-2 text-gray-600 mt-1">
                  <MapPin className="w-4 h-4" />
                  <span>{issue.location}</span>
                </div>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(issue.severity)}`}>
                {issue.severity}
              </span>
            </div>

            <p className="text-gray-600 text-sm mb-4">{issue.description}</p>

            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-gray-500" />
                <span className="text-gray-600">{issue.reports} {t.reports}</span>
              </div>
              <div className="flex items-center gap-1">
                {getTrendIcon(issue.trend)}
                <span className="text-gray-600 capitalize">{issue.trend}</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">{t.category}: {issue.category}</span>
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  {t.viewDetails}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};