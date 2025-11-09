import React from 'react';
import { AlertTriangle, Users, Clock, ArrowRight } from 'lucide-react';
import { Report, Officer } from '../types';

interface PriorityAlertsProps {
  urgentReports: Report[];
  officers: Officer[];
  onAssignReport: (reportId: string, officerId: string) => void;
  onMarkResolved: (reportId: string, notes: string) => void;
}

export const PriorityAlerts: React.FC<PriorityAlertsProps> = ({
  urgentReports,
  officers,
  onAssignReport,
  onMarkResolved
}) => {
  const criticalReports = urgentReports.filter(r => r.priority === 'Critical');
  const waterEmergencies = urgentReports.filter(r => r.category === 'Water');
  const overdueReports = urgentReports.filter(r => new Date() > r.deadline);

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <AlertTriangle className="h-6 w-6 text-red-500" />
        <h2 className="text-xl font-bold text-gray-900">Priority Alerts</h2>
        <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-sm font-medium">
          {urgentReports.length} Active
        </span>
      </div>

      {/* Critical Issues Banner */}
      {criticalReports.length > 0 && (
        <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-lg p-6 text-white shadow-lg">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-bold mb-2">CRITICAL ISSUES REQUIRING IMMEDIATE ATTENTION</h3>
              <div className="space-y-2">
                {criticalReports.map(report => (
                  <div key={report.id} className="bg-white/10 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{report.id}</span>
                      <span className="text-sm opacity-90">
                        {report.location.district} - {report.location.sector}
                      </span>
                    </div>
                    <p className="text-sm mb-3">{report.description}</p>
                    <div className="flex space-x-2">
                      <select
                        className="bg-white/20 text-white placeholder-white/70 rounded px-3 py-1 text-sm border border-white/30"
                        onChange={(e) => e.target.value && onAssignReport(report.id, e.target.value)}
                      >
                        <option value="">Assign to Officer</option>
                        {officers.map(officer => (
                          <option key={officer.id} value={officer.id} className="text-gray-900">
                            {officer.name} - {officer.district}
                          </option>
                        ))}
                      </select>
                      <button
                        onClick={() => onMarkResolved(report.id, 'Resolved via priority alert')}
                        className="bg-white text-red-600 px-4 py-1 rounded text-sm font-medium hover:bg-gray-100 transition-colors"
                      >
                        Mark Resolved
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <AlertTriangle className="h-8 w-8 opacity-80" />
          </div>
        </div>
      )}

      {/* Alert Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Water Emergencies */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <h4 className="font-semibold text-gray-900">Water Emergencies</h4>
            </div>
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm font-medium">
              {waterEmergencies.length}
            </span>
          </div>
          {waterEmergencies.length > 0 ? (
            <div className="space-y-2">
              {waterEmergencies.slice(0, 2).map(report => (
                <div key={report.id} className="text-sm">
                  <div className="font-medium text-gray-800">{report.location.sector}</div>
                  <div className="text-gray-600 truncate">{report.description}</div>
                </div>
              ))}
              {waterEmergencies.length > 2 && (
                <div className="text-sm text-blue-600 cursor-pointer hover:underline">
                  +{waterEmergencies.length - 2} more issues
                </div>
              )}
            </div>
          ) : (
            <p className="text-sm text-gray-500">No water emergencies</p>
          )}
        </div>

        {/* Overdue Reports */}
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-orange-500" />
              <h4 className="font-semibold text-gray-900">Overdue Reports</h4>
            </div>
            <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-sm font-medium">
              {overdueReports.length}
            </span>
          </div>
          {overdueReports.length > 0 ? (
            <div className="space-y-2">
              {overdueReports.slice(0, 2).map(report => (
                <div key={report.id} className="text-sm">
                  <div className="font-medium text-gray-800">{report.id}</div>
                  <div className="text-gray-600">
                    Due: {report.deadline.toLocaleDateString()}
                  </div>
                </div>
              ))}
              {overdueReports.length > 2 && (
                <div className="text-sm text-orange-600 cursor-pointer hover:underline">
                  +{overdueReports.length - 2} more overdue
                </div>
              )}
            </div>
          ) : (
            <p className="text-sm text-gray-500">No overdue reports</p>
          )}
        </div>

        {/* High Priority Unassigned */}
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4 text-purple-500" />
              <h4 className="font-semibold text-gray-900">Unassigned High Priority</h4>
            </div>
            <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-sm font-medium">
              {urgentReports.filter(r => r.priority === 'High' && !r.assignedTo).length}
            </span>
          </div>
          <div className="space-y-2">
            {urgentReports
              .filter(r => r.priority === 'High' && !r.assignedTo)
              .slice(0, 2)
              .map(report => (
                <div key={report.id} className="text-sm">
                  <div className="font-medium text-gray-800">{report.category}</div>
                  <div className="text-gray-600">{report.location.district}</div>
                </div>
              ))}
            <button className="text-sm text-purple-600 hover:underline flex items-center space-x-1">
              <span>View all unassigned</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};