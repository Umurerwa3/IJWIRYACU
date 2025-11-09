import React from 'react';
import { BarChart3, TrendingUp, MapPin, Calendar, Download, Eye } from 'lucide-react';
import { Analytics as AnalyticsType } from '../types';

interface AnalyticsProps {
  analytics: AnalyticsType;
  onExportReport: () => void;
}

export const Analytics: React.FC<AnalyticsProps> = ({ analytics, onExportReport }) => {
  const resolutionRate = (analytics.resolvedReports / analytics.totalReports) * 100;
  const maxCategoryValue = Math.max(...Object.values(analytics.reportsByCategory));
  const maxDistrictValue = Math.max(...Object.values(analytics.reportsByDistrict));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <BarChart3 className="h-6 w-6 text-blue-500" />
          <h2 className="text-xl font-bold text-gray-900">Trends & Analytics</h2>
        </div>
        <button
          onClick={onExportReport}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Download className="w-4 h-4" />
          <span>Generate Monthly Report</span>
        </button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center space-x-2 mb-2">
            <Eye className="w-5 h-5 text-blue-500" />
            <span className="text-sm font-medium text-gray-600">Total Reports</span>
          </div>
          <div className="text-3xl font-bold text-gray-900">{analytics.totalReports}</div>
          <div className="text-sm text-blue-600">All time</div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center space-x-2 mb-2">
            <TrendingUp className="w-5 h-5 text-green-500" />
            <span className="text-sm font-medium text-gray-600">Resolution Rate</span>
          </div>
          <div className="text-3xl font-bold text-gray-900">{resolutionRate.toFixed(1)}%</div>
          <div className="text-sm text-green-600">+2.3% vs last month</div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center space-x-2 mb-2">
            <Calendar className="w-5 h-5 text-purple-500" />
            <span className="text-sm font-medium text-gray-600">Avg Resolution</span>
          </div>
          <div className="text-3xl font-bold text-gray-900">{analytics.avgResolutionTime} days</div>
          <div className="text-sm text-purple-600">Target: 3 days</div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center space-x-2 mb-2">
            <MapPin className="w-5 h-5 text-red-500" />
            <span className="text-sm font-medium text-gray-600">Overdue Reports</span>
          </div>
          <div className="text-3xl font-bold text-gray-900">{analytics.overdueReports}</div>
          <div className="text-sm text-red-600">Requires attention</div>
        </div>
      </div>

      {/* District Heatmap */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Reports by District (Heatmap)</h3>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {Object.entries(analytics.reportsByDistrict).map(([district, count]) => {
            const intensity = (count / maxDistrictValue) * 100;
            const getIntensityColor = (intensity: number) => {
              if (intensity >= 80) return 'bg-red-500';
              if (intensity >= 60) return 'bg-orange-500';
              if (intensity >= 40) return 'bg-yellow-500';
              if (intensity >= 20) return 'bg-blue-500';
              return 'bg-green-500';
            };

            return (
              <div key={district} className="text-center">
                <div className={`w-full h-24 ${getIntensityColor(intensity)} rounded-lg flex items-center justify-center text-white font-bold text-lg mb-2`}>
                  {count}
                </div>
                <div className="text-sm font-medium text-gray-900">{district}</div>
                <div className="text-xs text-gray-500">{intensity.toFixed(0)}% of max</div>
              </div>
            );
          })}
        </div>
        <div className="mt-4 flex items-center justify-center space-x-6 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded"></div>
            <span>Low</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-yellow-500 rounded"></div>
            <span>Medium</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded"></div>
            <span>High</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Trends */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Reports by Category</h3>
          <div className="space-y-3">
            {Object.entries(analytics.reportsByCategory)
              .sort(([,a], [,b]) => b - a)
              .map(([category, count]) => {
                const percentage = (count / maxCategoryValue) * 100;
                return (
                  <div key={category} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 flex-1">
                      <span className="text-sm font-medium text-gray-900 w-20">{category}</span>
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                    <span className="text-sm font-medium text-gray-900 ml-3">{count}</span>
                  </div>
                );
              })}
          </div>
        </div>

        {/* Monthly Trends */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Trends</h3>
          <div className="space-y-4">
            {analytics.monthlyTrends.map((trend, index) => (
              <div key={trend.month} className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-900">{trend.month}</span>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">Reports: {trend.reports}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">Resolved: {trend.resolved}</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">
                    {((trend.resolved / trend.reports) * 100).toFixed(0)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-700">
              <span className="font-medium">Trend Analysis:</span> Education complaints increased 30% this month, 
              indicating potential systematic issues requiring policy attention.
            </p>
          </div>
        </div>
      </div>

      {/* Performance Insights */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-lg border border-purple-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Top Performing District</h4>
            <p className="text-sm text-gray-600">
              Northern District has the highest resolution rate at 89% with an average resolution time of 2.1 days.
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Areas for Improvement</h4>
            <p className="text-sm text-gray-600">
              Southern District has 12 overdue reports. Consider additional resource allocation or process optimization.
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Seasonal Pattern</h4>
            <p className="text-sm text-gray-600">
              Infrastructure reports typically increase by 25% during rainy season (Oct-Dec). Plan preventive measures.
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Citizen Engagement</h4>
            <p className="text-sm text-gray-600">
              Anonymous reporting represents 23% of total reports, indicating good citizen trust in the system.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};