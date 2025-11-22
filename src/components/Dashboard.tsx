import React, { useState } from 'react';
import { BarChart3, TrendingUp, Clock, CheckCircle, AlertTriangle, MapPin, Filter, Search } from 'lucide-react';

const Dashboard: React.FC = () => {
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const stats = [
    { title: 'Total Reports', value: '2,847', change: '+12%', color: 'blue' },
    { title: 'Resolved', value: '2,134', change: '+8%', color: 'green' },
    { title: 'In Progress', value: '492', change: '+15%', color: 'yellow' },
    { title: 'Pending', value: '221', change: '-5%', color: 'red' },
  ];

  const recentIssues = [
    {
      id: 'IRY-2024-847',
      title: 'Water shortage in Nyarugenge',
      category: 'Water & Sanitation',
      status: 'In Progress',
      location: 'Nyarugenge District',
      date: '2024-01-15',
      priority: 'High',
      reporter: 'Community Leader'
    },
    {
      id: 'IRY-2024-846',
      title: 'Damaged road affecting school access',
      category: 'Infrastructure',
      status: 'Resolved',
      location: 'Gasabo District',
      date: '2024-01-14',
      priority: 'Medium',
      reporter: 'Parent Committee'
    },
    {
      id: 'IRY-2024-845',
      title: 'Lack of medical supplies at health center',
      category: 'Healthcare',
      status: 'Pending',
      location: 'Kicukiro District',
      date: '2024-01-13',
      priority: 'Critical',
      reporter: 'Healthcare Worker'
    },
    {
      id: 'IRY-2024-844',
      title: 'Streetlight outages affecting safety',
      category: 'Public Safety',
      status: 'In Progress',
      location: 'Nyarugenge District',
      date: '2024-01-12',
      priority: 'High',
      reporter: 'Resident'
    },
    {
      id: 'IRY-2024-843',
      title: 'Waste collection delays',
      category: 'Environment',
      status: 'Resolved',
      location: 'Gasabo District',
      date: '2024-01-11',
      priority: 'Medium',
      reporter: 'Community Group'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Resolved': return 'bg-green-100 text-green-800';
      case 'In Progress': return 'bg-yellow-100 text-yellow-800';
      case 'Pending': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Critical': return 'bg-red-500';
      case 'High': return 'bg-orange-500';
      case 'Medium': return 'bg-yellow-500';
      case 'Low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const filteredIssues = recentIssues.filter(issue => {
    const matchesCategory = filterCategory === 'all' || issue.category === filterCategory;
    const matchesStatus = filterStatus === 'all' || issue.status === filterStatus;
    const matchesSearch = issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         issue.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesStatus && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Community Dashboard</h1>
        <p className="text-gray-600">
          Real-time insights into community issues and their resolution progress
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-500">{stat.title}</h3>
              <BarChart3 className="w-5 h-5 text-gray-400" />
            </div>
            <div className="flex items-center justify-between">
              <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              <span className={`text-sm font-medium ${
                stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Filters and Search */}
      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search issues or locations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
              />
            </div>
          </div>
          <div className="flex gap-4">
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
            >
              <option value="all">All Categories</option>
              <option value="Infrastructure">Infrastructure</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Education">Education</option>
              <option value="Water & Sanitation">Water & Sanitation</option>
              <option value="Public Safety">Public Safety</option>
              <option value="Environment">Environment</option>
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
            >
              <option value="all">All Status</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>
        </div>
      </div>

      {/* Issues List */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Recent Issues</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {filteredIssues.map((issue) => (
            <div key={issue.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{issue.title}</h3>
                    <div className={`w-3 h-3 rounded-full ${getPriorityColor(issue.priority)}`} title={`${issue.priority} Priority`}></div>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {issue.location}
                    </span>
                    <span>{issue.category}</span>
                    <span>{issue.date}</span>
                    <span>By {issue.reporter}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-700">ID: {issue.id}</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(issue.status)}`}>
                      {issue.status}
                    </span>
                  </div>
                </div>
                <button className="ml-4 text-primary-600 hover:text-primary-800 font-medium text-sm">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Progress Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Resolution Trends</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Average Resolution Time</span>
              <span className="font-semibold text-gray-900">4.2 days</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Success Rate</span>
              <span className="font-semibold text-green-600">92%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Community Satisfaction</span>
              <span className="font-semibold text-primary-600">4.7/5</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Issue Categories</h3>
          <div className="space-y-3">
            {[
              { category: 'Infrastructure', count: 847, percentage: 30 },
              { category: 'Water & Sanitation', count: 623, percentage: 22 },
              { category: 'Healthcare', count: 456, percentage: 16 },
              { category: 'Education', count: 389, percentage: 14 },
              { category: 'Public Safety', count: 312, percentage: 11 },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{item.category}</span>
                <div className="flex items-center gap-2">
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-primary-500 h-2 rounded-full" 
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900 w-8">{item.count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;