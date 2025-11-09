import React, { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import { 
  TrendingUp, 
  Calendar, 
  Filter,
  Download,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface AnalyticsHubProps {
  language: 'en' | 'rw';
}

export const AnalyticsHub: React.FC<AnalyticsHubProps> = ({ language }) => {
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>('month');
  const [showFilters, setShowFilters] = useState(false);

  const translations = {
    en: {
      title: 'Analytics Hub',
      subtitle: 'Comprehensive performance metrics and trends',
      timeRange: {
        week: 'Last Week',
        month: 'Last Month',
        year: 'Last Year'
      },
      metrics: {
        totalReports: 'Total Reports',
        resolutionRate: 'Resolution Rate',
        avgResponseTime: 'Avg. Response Time',
        satisfactionRating: 'Satisfaction Rating'
      },
      categories: {
        infrastructure: 'Infrastructure',
        health: 'Health',
        education: 'Education',
        security: 'Security',
        other: 'Other'
      },
      trends: {
        reports: 'Report Trends',
        categories: 'Category Distribution',
        response: 'Response Time Trends'
      },
      filters: 'Filters',
      export: 'Export Data'
    },
    rw: {
      title: 'Ikiyobozi cy\'Imibare',
      subtitle: 'Imibare n\'imikorere yose',
      timeRange: {
        week: 'Icyumweru Gishize',
        month: 'Ukwezi Gushize',
        year: 'Umwaka Ushize'
      },
      metrics: {
        totalReports: 'Raporo Zose',
        resolutionRate: 'Umubare w\'Ibisubizo',
        avgResponseTime: 'Igihe cy\'Igisubizo',
        satisfactionRating: 'Ishimwe'
      },
      categories: {
        infrastructure: 'Ubwubatsi',
        health: 'Ubuzima',
        education: 'Amashuri',
        security: 'Umutekano',
        other: 'Ibindi'
      },
      trends: {
        reports: 'Imikorere y\'Raporo',
        categories: 'Ubwoko bw\'Raporo',
        response: 'Imikorere y\'Ibisubizo'
      },
      filters: 'Imyitozo',
      export: 'Koporora Amakuru'
    }
  };

  const t = translations[language];

  // Mock data for charts
  const reportTrendsData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: t.metrics.totalReports,
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: true,
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4
      }
    ]
  };

  const categoryDistributionData = {
    labels: [
      t.categories.infrastructure,
      t.categories.health,
      t.categories.education,
      t.categories.security,
      t.categories.other
    ],
    datasets: [
      {
        data: [30, 25, 20, 15, 10],
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(239, 68, 68, 0.8)',
          'rgba(139, 92, 246, 0.8)'
        ]
      }
    ]
  };

  const responseTimeData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: t.metrics.avgResponseTime,
        data: [2.1, 2.3, 1.9, 2.2, 2.0, 2.4, 2.1],
        backgroundColor: 'rgba(16, 185, 129, 0.8)'
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const
      }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  const doughnutOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right' as const
      }
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">{t.title}</h2>
        <p className="text-gray-600">{t.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Reports Over Time */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">{t.trends.reports}</h3>
          <div className="h-80">
            <Line data={reportTrendsData} options={chartOptions} />
          </div>
        </div>

        {/* Report Types Distribution */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">{t.trends.categories}</h3>
          <div className="h-80">
            <Doughnut data={categoryDistributionData} options={doughnutOptions} />
          </div>
        </div>

        {/* Resolution Time */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">{t.trends.response}</h3>
          <div className="h-80">
            <Bar data={responseTimeData} options={chartOptions} />
          </div>
        </div>

        {/* Key Metrics */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Key Metrics</h3>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-600 font-medium">{t.metrics.totalReports}</p>
              <p className="text-2xl font-bold text-blue-800">1,234</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <p className="text-sm text-green-600 font-medium">{t.metrics.resolutionRate}</p>
              <p className="text-2xl font-bold text-green-800">85%</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <p className="text-sm text-purple-600 font-medium">{t.metrics.avgResponseTime}</p>
              <p className="text-2xl font-bold text-purple-800">32 hours</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 