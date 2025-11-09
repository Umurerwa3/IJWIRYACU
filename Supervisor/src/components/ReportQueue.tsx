import React, { useState } from 'react';
import { Search, Filter, Download, MessageSquare, Clock, MapPin, User, Eye } from 'lucide-react';
import { Report, Officer, Filter as FilterType } from '../types';

interface ReportQueueProps {
  reports: Report[];
  officers: Officer[];
  filters: FilterType;
  onFilterChange: (filters: FilterType) => void;
  onAssignReport: (reportId: string, officerId: string) => void;
  onUpdateStatus: (reportId: string, status: Report['status']) => void;
  onExportReports: () => void;
}

export const ReportQueue: React.FC<ReportQueueProps> = ({
  reports,
  officers,
  filters,
  onFilterChange,
  onAssignReport,
  onUpdateStatus,
  onExportReports
}) => {
  const [selectedReports, setSelectedReports] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'High': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'New': return 'bg-blue-100 text-blue-800';
      case 'In Progress': return 'bg-purple-100 text-purple-800';
      case 'Resolved': return 'bg-green-100 text-green-800';
      case 'Closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const isOverdue = (deadline: Date) => new Date() > deadline;

  const toggleReportSelection = (reportId: string) => {
    setSelectedReports(prev =>
      prev.includes(reportId)
        ? prev.filter(id => id !== reportId)
        : [...prev, reportId]
    );
  };

  const filteredReports = reports.filter(report => {
    if (searchTerm && !report.description.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !report.id.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    if (filters.category && report.category !== filters.category) return false;
    if (filters.district && report.location.district !== filters.district) return false;
    if (filters.status && report.status !== filters.status) return false;
    if (filters.priority && report.priority !== filters.priority) return false;
    if (filters.assignedTo && report.assignedTo !== filters.assignedTo) return false;
    if (filters.isOverdue && !isOverdue(report.deadline)) return false;
    if (filters.isAnonymous !== undefined && report.isAnonymous !== filters.isAnonymous) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">Report Queue</h2>
        <div className="flex items-center space-x-3">
          <button
            onClick={onExportReports}
            className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
          {selectedReports.length > 0 && (
            <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              <MessageSquare className="w-4 h-4" />
              <span>Send SMS ({selectedReports.length})</span>
            </button>
          )}
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-4 rounded-lg border border-gray-200 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center space-y-3 md:space-y-0 md:space-x-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search reports by ID or description..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Filter className="w-5 h-5 text-gray-500 md:hidden" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
          <select
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
            value={filters.category || ''}
            onChange={(e) => onFilterChange({ ...filters, category: e.target.value || undefined })}
          >
            <option value="">All Categories</option>
            <option value="Infrastructure">Infrastructure</option>
            <option value="Water">Water</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Education">Education</option>
            <option value="Security">Security</option>
            <option value="Environment">Environment</option>
          </select>

          <select
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
            value={filters.district || ''}
            onChange={(e) => onFilterChange({ ...filters, district: e.target.value || undefined })}
          >
            <option value="">All Districts</option>
            <option value="Kigali">Kigali</option>
            <option value="Eastern">Eastern</option>
            <option value="Northern">Northern</option>
            <option value="Southern">Southern</option>
            <option value="Western">Western</option>
          </select>

          <select
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
            value={filters.status || ''}
            onChange={(e) => onFilterChange({ ...filters, status: e.target.value || undefined })}
          >
            <option value="">All Status</option>
            <option value="New">New</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
            <option value="Closed">Closed</option>
          </select>

          <select
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
            value={filters.priority || ''}
            onChange={(e) => onFilterChange({ ...filters, priority: e.target.value || undefined })}
          >
            <option value="">All Priority</option>
            <option value="Critical">Critical</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>

          <select
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
            value={filters.assignedTo || ''}
            onChange={(e) => onFilterChange({ ...filters, assignedTo: e.target.value || undefined })}
          >
            <option value="">All Officers</option>
            {officers.map(officer => (
              <option key={officer.id} value={officer.id}>{officer.name}</option>
            ))}
          </select>

          <div className="flex items-center space-x-4">
            <label className="flex items-center space-x-2 text-sm">
              <input
                type="checkbox"
                checked={filters.isOverdue || false}
                onChange={(e) => onFilterChange({ ...filters, isOverdue: e.target.checked || undefined })}
                className="rounded border-gray-300 text-red-600 focus:ring-red-500"
              />
              <span>Overdue</span>
            </label>
          </div>
        </div>
      </div>

      {/* Reports Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left">
                  <input
                    type="checkbox"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedReports(filteredReports.map(r => r.id));
                      } else {
                        setSelectedReports([]);
                      }
                    }}
                    className="rounded border-gray-300"
                  />
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Report ID
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Priority
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Assigned To
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredReports.map((report) => (
                <tr key={report.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4">
                    <input
                      type="checkbox"
                      checked={selectedReports.includes(report.id)}
                      onChange={() => toggleReportSelection(report.id)}
                      className="rounded border-gray-300"
                    />
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-gray-900">{report.id}</span>
                      {report.isAnonymous && (
                        <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                          Anonymous
                        </span>
                      )}
                      {isOverdue(report.deadline) && (
                        <Clock className="w-4 h-4 text-red-500" />
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                    {report.timestamp.toLocaleDateString()}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{report.category}</div>
                      <div className="text-sm text-gray-500">{report.subcategory}</div>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-1 text-sm text-gray-500">
                      <MapPin className="w-3 h-3" />
                      <span>{report.location.district}</span>
                      <span>-</span>
                      <span>{report.location.sector}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getPriorityColor(report.priority)}`}>
                      {report.priority}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                      {report.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                    {report.assignedTo ? (
                      <div className="flex items-center space-x-1">
                        <User className="w-3 h-3" />
                        <span>{officers.find(o => o.id === report.assignedTo)?.name}</span>
                      </div>
                    ) : (
                      <span className="text-gray-400">Unassigned</span>
                    )}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button className="text-blue-600 hover:text-blue-900 flex items-center space-x-1">
                      <Eye className="w-3 h-3" />
                      <span>View</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex items-center justify-between text-sm text-gray-500">
        <span>Showing {filteredReports.length} of {reports.length} reports</span>
        <div className="flex items-center space-x-2">
          <span>Rows per page:</span>
          <select className="border border-gray-200 rounded px-2 py-1">
            <option>25</option>
            <option>50</option>
            <option>100</option>
          </select>
        </div>
      </div>
    </div>
  );
};