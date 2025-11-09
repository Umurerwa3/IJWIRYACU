import React, { useState } from 'react';
import { Search, Filter, ChevronDown, ChevronUp, MapPin, Clock, AlertTriangle } from 'lucide-react';

const ReportTable: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState('date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const reports = [
    {
      id: 'RPT-2024-001',
      title: 'Water Access Crisis',
      category: 'Water Access',
      location: 'Gasabo District',
      status: 'In Progress',
      priority: 'High',
      submittedDate: '2024-01-19',
      lastUpdated: '2024-01-20',
      assignedTo: 'Water Department'
    },
    {
      id: 'RPT-2024-002',
      title: 'Road Repair Request',
      category: 'Road Repair',
      location: 'Kicukiro District',
      status: 'Pending',
      priority: 'Medium',
      submittedDate: '2024-01-18',
      lastUpdated: '2024-01-18',
      assignedTo: 'Road Maintenance Team'
    },
    {
      id: 'RPT-2024-003',
      title: 'Medical Supply Shortage',
      category: 'Healthcare',
      location: 'Muhanga District',
      status: 'Urgent',
      priority: 'Critical',
      submittedDate: '2024-01-19',
      lastUpdated: '2024-01-19',
      assignedTo: 'Health Department'
    }
  ];

  const categories = ['all', 'Water Access', 'Road Repair', 'Healthcare', 'Education', 'Other'];
  const statuses = ['all', 'Pending', 'In Progress', 'Resolved', 'Urgent'];

  const handleSort = (field: string) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'urgent':
        return 'bg-red-100 text-red-800';
      case 'in progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'critical':
        return <AlertTriangle className="w-4 h-4 text-red-600" />;
      case 'high':
        return <AlertTriangle className="w-4 h-4 text-orange-600" />;
      case 'medium':
        return <Clock className="w-4 h-4 text-yellow-600" />;
      default:
        return <Clock className="w-4 h-4 text-green-600" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Reports Table</h2>
        <p className="text-gray-600">View and manage community issue reports</p>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search reports..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
          </div>

          {/* Category Filter */}
          <div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {statuses.map(status => (
                <option key={status} value={status}>
                  {status === 'all' ? 'All Statuses' : status}
                </option>
              ))}
            </select>
          </div>

          {/* Sort Button */}
          <button
            onClick={() => handleSort('date')}
            className="flex items-center justify-center gap-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <Filter className="w-5 h-5 text-gray-400" />
            <span>Sort</span>
            {sortField === 'date' && (
              sortDirection === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* Reports Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-3 font-medium text-gray-600">Report ID</th>
                <th className="text-left p-3 font-medium text-gray-600">Title</th>
                <th className="text-left p-3 font-medium text-gray-600">Category</th>
                <th className="text-left p-3 font-medium text-gray-600">Location</th>
                <th className="text-left p-3 font-medium text-gray-600">Status</th>
                <th className="text-left p-3 font-medium text-gray-600">Priority</th>
                <th className="text-left p-3 font-medium text-gray-600">Assigned To</th>
                <th className="text-left p-3 font-medium text-gray-600">Last Updated</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report) => (
                <tr key={report.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="p-3 font-medium text-blue-600">{report.id}</td>
                  <td className="p-3">{report.title}</td>
                  <td className="p-3">{report.category}</td>
                  <td className="p-3">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span>{report.location}</span>
                    </div>
                  </td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(report.status)}`}>
                      {report.status}
                    </span>
                  </td>
                  <td className="p-3">
                    <div className="flex items-center gap-1">
                      {getPriorityIcon(report.priority)}
                      <span className="capitalize">{report.priority}</span>
                    </div>
                  </td>
                  <td className="p-3">{report.assignedTo}</td>
                  <td className="p-3">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span>{report.lastUpdated}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ReportTable; 