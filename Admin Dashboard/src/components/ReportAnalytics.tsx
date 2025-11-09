import React from 'react';
import { BarChart2, TrendingUp, AlertTriangle, Users, Clock } from 'lucide-react';

const ReportAnalytics: React.FC = () => {
  const analytics = {
    overview: {
      totalReports: 1234,
      resolvedReports: 856,
      activeReports: 378,
      avgResponseTime: '24h',
      satisfactionRate: 92
    },
    trends: {
      daily: [45, 52, 38, 45, 58, 42, 48],
      weekly: [320, 345, 310, 335, 360, 340, 355],
      monthly: [1200, 1250, 1180, 1320, 1280, 1350, 1300]
    },
    categories: {
      water: 35,
      roads: 28,
      health: 22,
      education: 15
    },
    responseTime: {
      under24h: 65,
      under48h: 25,
      over48h: 10
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Report Analytics</h2>
        <p className="text-gray-600">Comprehensive analysis of community reports</p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-2 mb-2">
            <BarChart2 className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-medium text-gray-600">Total Reports</span>
          </div>
          <div className="text-2xl font-bold text-gray-800">{analytics.overview.totalReports}</div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5 text-green-600" />
            <span className="text-sm font-medium text-gray-600">Resolved Reports</span>
          </div>
          <div className="text-2xl font-bold text-gray-800">{analytics.overview.resolvedReports}</div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-5 h-5 text-orange-600" />
            <span className="text-sm font-medium text-gray-600">Active Reports</span>
          </div>
          <div className="text-2xl font-bold text-gray-800">{analytics.overview.activeReports}</div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-5 h-5 text-purple-600" />
            <span className="text-sm font-medium text-gray-600">Satisfaction Rate</span>
          </div>
          <div className="text-2xl font-bold text-gray-800">{analytics.overview.satisfactionRate}%</div>
        </div>
      </div>

      {/* Category Distribution */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Issue Categories</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Water Access</span>
            <span className="text-sm font-medium text-gray-800">{analytics.categories.water}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full"
              style={{ width: `${analytics.categories.water}%` }}
            />
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Road Repair</span>
            <span className="text-sm font-medium text-gray-800">{analytics.categories.roads}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-yellow-600 h-2 rounded-full"
              style={{ width: `${analytics.categories.roads}%` }}
            />
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Healthcare</span>
            <span className="text-sm font-medium text-gray-800">{analytics.categories.health}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-red-600 h-2 rounded-full"
              style={{ width: `${analytics.categories.health}%` }}
            />
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Education</span>
            <span className="text-sm font-medium text-gray-800">{analytics.categories.education}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-purple-600 h-2 rounded-full"
              style={{ width: `${analytics.categories.education}%` }}
            />
          </div>
        </div>
      </div>

      {/* Response Time Distribution */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Response Time Distribution</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-green-600" />
              <span className="text-sm text-gray-600">Under 24 hours</span>
            </div>
            <span className="text-sm font-medium text-gray-800">{analytics.responseTime.under24h}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-green-600 h-2 rounded-full"
              style={{ width: `${analytics.responseTime.under24h}%` }}
            />
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-yellow-600" />
              <span className="text-sm text-gray-600">Under 48 hours</span>
            </div>
            <span className="text-sm font-medium text-gray-800">{analytics.responseTime.under48h}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-yellow-600 h-2 rounded-full"
              style={{ width: `${analytics.responseTime.under48h}%` }}
            />
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-red-600" />
              <span className="text-sm text-gray-600">Over 48 hours</span>
            </div>
            <span className="text-sm font-medium text-gray-800">{analytics.responseTime.over48h}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-red-600 h-2 rounded-full"
              style={{ width: `${analytics.responseTime.over48h}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportAnalytics; 