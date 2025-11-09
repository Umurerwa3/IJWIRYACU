import React from 'react';
import { MapView } from './MapView';
import { TrendingIssues } from './TrendingIssues';
import { SuccessStories } from './SuccessStories';
import { PriorityAlertPanel } from './PriorityAlertPanel';
import { ReportQueue } from './ReportQueue';
import { TeamPerformance } from './TeamPerformance';
import { DistrictComparison } from './DistrictComparison';
import { AnalyticsHub } from './AnalyticsHub';
import { FileText, Clock, CheckCircle, Users } from 'lucide-react';

interface DashboardProps {
  language: 'en' | 'rw';
}

export const Dashboard: React.FC<DashboardProps> = ({ language }) => {
  const translations = {
    en: {
      title: 'Rwanda Issue Monitoring Dashboard',
      subtitle: 'Real-time view of citizen reports across all districts'
    },
    rw: {
      title: 'Ikiyobozi cy\'Ibibazo muri Rwanda',
      subtitle: 'Kureba mu gihe nyacyo raporo z\'abaturage mu turere twose'
    }
  };

  const t = translations[language];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-dark-text mb-2">Dashboard Overview</h2>
        <p className="text-gray-600 dark:text-gray-400">Welcome to Ijwi Ryacu Admin Dashboard</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-dark-card rounded-xl shadow-lg p-6 text-center">
          <div className="flex items-center justify-center mb-3">
            <FileText className="w-8 h-8 text-blue-600" />
          </div>
          <div className="text-2xl font-bold text-gray-800 dark:text-blue-400 mb-1">24</div>
          <div className="text-gray-600 dark:text-gray-400 text-sm">New Reports Today</div>
          <div className="text-green-600 text-xs mt-1">+12% from yesterday</div>
        </div>

        <div className="bg-white dark:bg-dark-card rounded-xl shadow-lg p-6 text-center">
          <div className="flex items-center justify-center mb-3">
            <Clock className="w-8 h-8 text-orange-600" />
          </div>
          <div className="text-2xl font-bold text-gray-800 dark:text-orange-400 mb-1">156</div>
          <div className="text-gray-600 dark:text-gray-400 text-sm">Pending Reviews</div>
          <div className="text-orange-600 text-xs mt-1">Needs attention</div>
        </div>

        <div className="bg-white dark:bg-dark-card rounded-xl shadow-lg p-6 text-center">
          <div className="flex items-center justify-center mb-3">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <div className="text-2xl font-bold text-gray-800 dark:text-green-400 mb-1">89</div>
          <div className="text-gray-600 dark:text-gray-400 text-sm">Resolved This Week</div>
          <div className="text-green-600 text-xs mt-1">+8% improvement</div>
        </div>

        <div className="bg-white dark:bg-dark-card rounded-xl shadow-lg p-6 text-center">
          <div className="flex items-center justify-center mb-3">
            <Users className="w-8 h-8 text-purple-600" />
          </div>
          <div className="text-2xl font-bold text-gray-800 dark:text-purple-400 mb-1">12</div>
          <div className="text-gray-600 dark:text-gray-400 text-sm">Active Staff</div>
          <div className="text-purple-600 text-xs mt-1">All districts covered</div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Recent Activity</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-800">New Report Submitted</p>
              <p className="text-sm text-gray-600">Water access issue in Gasabo District</p>
            </div>
            <span className="text-sm text-gray-500">2 hours ago</span>
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-800">Report Resolved</p>
              <p className="text-sm text-gray-600">Road repair completed in Kigali</p>
            </div>
            <span className="text-sm text-gray-500">4 hours ago</span>
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-800">New Staff Member Added</p>
              <p className="text-sm text-gray-600">John Doe joined the team</p>
            </div>
            <span className="text-sm text-gray-500">1 day ago</span>
          </div>
        </div>
      </div>

      <div className="space-y-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-dark-text mb-2">{t.title}</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">{t.subtitle}</p>
        </div>
        
        <PriorityAlertPanel language={language} />
        
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="xl:col-span-2">
            <MapView language={language} />
          </div>
          <div className="space-y-8">
            <TrendingIssues language={language} />
            <SuccessStories language={language} />
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          <ReportQueue language={language} />
          <TeamPerformance language={language} />
        </div>

        <DistrictComparison language={language} />
        
        <AnalyticsHub language={language} />
      </div>
    </div>
  );
};