import React from 'react';
import { Trophy, TrendingUp, Clock, User, Star, Award } from 'lucide-react';
import { Officer } from '../types';

interface TeamPerformanceProps {
  officers: Officer[];
}

export const TeamPerformance: React.FC<TeamPerformanceProps> = ({ officers }) => {
  const sortedOfficers = [...officers].sort((a, b) => b.performance.score - a.performance.score);
  const topPerformer = sortedOfficers[0];
  const totalResolved = officers.reduce((sum, officer) => sum + officer.performance.resolved, 0);
  const totalPending = officers.reduce((sum, officer) => sum + officer.performance.pending, 0);
  const avgResolutionTime = officers.reduce((sum, officer) => sum + officer.performance.avgResolutionTime, 0) / officers.length;

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-100';
    if (score >= 80) return 'text-blue-600 bg-blue-100';
    if (score >= 70) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getWorkloadColor = (pending: number) => {
    if (pending <= 5) return 'text-green-600 bg-green-100';
    if (pending <= 10) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Trophy className="h-6 w-6 text-yellow-500" />
        <h2 className="text-xl font-bold text-gray-900">Team Performance</h2>
      </div>

      {/* Performance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center space-x-2 mb-2">
            <Award className="w-5 h-5 text-green-500" />
            <span className="text-sm font-medium text-gray-600">Total Resolved</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">{totalResolved}</div>
          <div className="text-sm text-green-600">+12% this month</div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center space-x-2 mb-2">
            <Clock className="w-5 h-5 text-blue-500" />
            <span className="text-sm font-medium text-gray-600">Avg Resolution</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">{avgResolutionTime.toFixed(1)} days</div>
          <div className="text-sm text-blue-600">-0.3 days vs last month</div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center space-x-2 mb-2">
            <User className="w-5 h-5 text-purple-500" />
            <span className="text-sm font-medium text-gray-600">Active Officers</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">{officers.length}</div>
          <div className="text-sm text-purple-600">All districts covered</div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center space-x-2 mb-2">
            <TrendingUp className="w-5 h-5 text-orange-500" />
            <span className="text-sm font-medium text-gray-600">Pending Cases</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">{totalPending}</div>
          <div className="text-sm text-orange-600">Workload distribution</div>
        </div>
      </div>

      {/* Top Performer Highlight */}
      <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <Star className="w-6 h-6" />
              <span className="text-lg font-bold">Top Performer This Month</span>
            </div>
            <h3 className="text-2xl font-bold mb-1">{topPerformer.name}</h3>
            <p className="opacity-90">{topPerformer.role} - {topPerformer.district} District</p>
            <div className="flex items-center space-x-4 mt-3">
              <div>
                <div className="text-sm opacity-90">Cases Resolved</div>
                <div className="text-xl font-bold">{topPerformer.performance.resolved}</div>
              </div>
              <div>
                <div className="text-sm opacity-90">Performance Score</div>
                <div className="text-xl font-bold">{topPerformer.performance.score}%</div>
              </div>
              <div>
                <div className="text-sm opacity-90">Avg Resolution</div>
                <div className="text-xl font-bold">{topPerformer.performance.avgResolutionTime} days</div>
              </div>
            </div>
          </div>
          <Trophy className="w-16 h-16 opacity-80" />
        </div>
      </div>

      {/* Officer Leaderboard */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Officer Leaderboard</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rank
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Officer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Performance Score
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Resolved
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Pending
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Avg Resolution
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Workload Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedOfficers.map((officer, index) => (
                <tr key={officer.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold text-gray-900">#{index + 1}</span>
                      {index === 0 && <Trophy className="w-4 h-4 text-yellow-500" />}
                      {index === 1 && <Trophy className="w-4 h-4 text-gray-400" />}
                      {index === 2 && <Trophy className="w-4 h-4 text-orange-500" />}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{officer.name}</div>
                      <div className="text-sm text-gray-500">{officer.role}</div>
                      <div className="text-sm text-gray-500">{officer.district} District</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getScoreColor(officer.performance.score)}`}>
                      {officer.performance.score}%
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{officer.performance.resolved}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getWorkloadColor(officer.performance.pending)}`}>
                      {officer.performance.pending}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {officer.performance.avgResolutionTime} days
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {officer.performance.pending <= 5 && (
                      <span className="text-green-600 text-sm">Light workload</span>
                    )}
                    {officer.performance.pending > 5 && officer.performance.pending <= 10 && (
                      <span className="text-yellow-600 text-sm">Moderate workload</span>
                    )}
                    {officer.performance.pending > 10 && (
                      <span className="text-red-600 text-sm font-medium">High workload</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Workload Alerts */}
      <div className="bg-orange-50 border-l-4 border-orange-400 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <Clock className="h-5 w-5 text-orange-400" />
          </div>
          <div className="ml-3">
            <p className="text-sm text-orange-700">
              <span className="font-medium">Workload Alert:</span> {officers.filter(o => o.performance.pending > 10).length} officers have high pending workloads. 
              Consider redistributing cases or providing additional support.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};