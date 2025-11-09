import React, { useState } from 'react';
import { Shield, Bell, Users, BarChart3, Settings, LogOut } from 'lucide-react';
import { PriorityAlerts } from './components/PriorityAlerts';
import { ReportQueue } from './components/ReportQueue';
import { TeamPerformance } from './components/TeamPerformance';
import { Analytics } from './components/Analytics';
import { mockReports, mockOfficers, mockAnalytics } from './data/mockData';
import { Report, Officer, Filter } from './types';

function App() {
  const [activeTab, setActiveTab] = useState('alerts');
  const [reports, setReports] = useState<Report[]>(mockReports);
  const [officers] = useState<Officer[]>(mockOfficers);
  const [filters, setFilters] = useState<Filter>({});

  // Get urgent reports (Critical priority or overdue)
  const urgentReports = reports.filter(report => 
    report.priority === 'Critical' || 
    report.priority === 'High' || 
    new Date() > report.deadline
  );

  const handleAssignReport = (reportId: string, officerId: string) => {
    setReports(prev => prev.map(report => 
      report.id === reportId 
        ? { ...report, assignedTo: officerId, status: 'In Progress' as const }
        : report
    ));
  };

  const handleMarkResolved = (reportId: string, notes: string) => {
    setReports(prev => prev.map(report => 
      report.id === reportId 
        ? { 
            ...report, 
            status: 'Resolved' as const, 
            resolutionNotes: notes,
            resolvedAt: new Date()
          }
        : report
    ));
  };

  const handleUpdateStatus = (reportId: string, status: Report['status']) => {
    setReports(prev => prev.map(report => 
      report.id === reportId ? { ...report, status } : report
    ));
  };

  const handleExportReports = () => {
    // In a real app, this would generate and download a CSV/Excel file
    console.log('Exporting reports...', reports);
    alert('Export functionality would download a CSV file with all reports');
  };

  const handleExportAnalytics = () => {
    // In a real app, this would generate a PDF report
    console.log('Generating monthly report...', mockAnalytics);
    alert('Monthly analytics report would be generated as PDF');
  };

  const tabs = [
    { id: 'alerts', label: 'Priority Alerts', icon: Bell, badge: urgentReports.length },
    { id: 'queue', label: 'Report Queue', icon: Shield, badge: reports.filter(r => r.status === 'New').length },
    { id: 'performance', label: 'Team Performance', icon: Users },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Shield className="h-8 w-8 text-blue-600" />
                <div>
                  <h1 className="text-xl font-bold text-gray-900">IjwiRyacu</h1>
                  <p className="text-sm text-gray-500">Supervisor Dashboard</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">Marie Uwimana</p>
                <p className="text-xs text-gray-500">District Supervisor</p>
              </div>
              <div className="flex items-center space-x-2">
                <button className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100">
                  <Settings className="w-5 h-5" />
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100">
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                  {tab.badge !== undefined && tab.badge > 0 && (
                    <span className="bg-red-100 text-red-800 text-xs font-medium ml-2 px-2.5 py-0.5 rounded-full">
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'alerts' && (
          <PriorityAlerts
            urgentReports={urgentReports}
            officers={officers}
            onAssignReport={handleAssignReport}
            onMarkResolved={handleMarkResolved}
          />
        )}
        
        {activeTab === 'queue' && (
          <ReportQueue
            reports={reports}
            officers={officers}
            filters={filters}
            onFilterChange={setFilters}
            onAssignReport={handleAssignReport}
            onUpdateStatus={handleUpdateStatus}
            onExportReports={handleExportReports}
          />
        )}
        
        {activeTab === 'performance' && (
          <TeamPerformance officers={officers} />
        )}
        
        {activeTab === 'analytics' && (
          <Analytics
            analytics={mockAnalytics}
            onExportReport={handleExportAnalytics}
          />
        )}
      </div>
    </div>
  );
}

export default App;