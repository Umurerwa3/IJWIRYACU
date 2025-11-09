import React, { useState } from 'react';
import { Search, Clock, Eye, CheckCircle, AlertCircle, Calendar, User, MapPin } from 'lucide-react';

interface TrackReportsProps {
  language: 'en' | 'rw';
}

export const TrackReports: React.FC<TrackReportsProps> = ({ language }) => {
  const [searchId, setSearchId] = useState('');
  const [selectedReport, setSelectedReport] = useState<any>(null);

  const translations = {
    en: {
      title: 'Track Your Reports',
      subtitle: 'Enter your report ID or phone number to track status',
      searchPlaceholder: 'Enter Report ID or Phone Number',
      search: 'Search',
      status: {
        received: 'Received',
        review: 'Under Review',
        assigned: 'Assigned',
        progress: 'In Progress',
        resolved: 'Resolved'
      },
      reportDetails: 'Report Details',
      submittedOn: 'Submitted on',
      lastUpdate: 'Last updated',
      assignedTo: 'Assigned to',
      location: 'Location',
      noResults: 'No reports found',
      sampleReports: 'Recent Reports'
    },
    rw: {
      title: 'Kurikirana Raporo Zawe',
      subtitle: 'Injiza nimero ya raporo cyangwa telefoni ukurikire uko bigenda',
      searchPlaceholder: 'Injiza Nimero ya Raporo cyangwa Telefoni',
      search: 'Shakisha',
      status: {
        received: 'Yakirwe',
        review: 'Irasuzumwa',
        assigned: 'Yashyizwe ku muntu',
        progress: 'Irakorwa',
        resolved: 'Byakemuwe'
      },
      reportDetails: 'Amakuru ya Raporo',
      submittedOn: 'Yatanzwe ku wa',
      lastUpdate: 'Yahinduwe bwa nyuma ku wa',
      assignedTo: 'Yashyizwe kuri',
      location: 'Aho iherereye',
      noResults: 'Nta raporo zabonetse',
      sampleReports: 'Raporo z\'Ubu'
    }
  };

  const t = translations[language];

  const mockReports = [
    {
      id: 'RPT-2024-001',
      phone: '+250788123456',
      type: 'Water Access',
      description: 'No clean water for 3 days in our sector',
      status: 'progress',
      submittedDate: '2024-01-15',
      lastUpdate: '2024-01-18',
      location: 'Gasabo District, Kimironko Sector',
      assignedTo: 'Water Department - Kigali',
      timeline: [
        { status: 'received', date: '2024-01-15', note: 'Report received and logged' },
        { status: 'review', date: '2024-01-16', note: 'Case reviewed by technical team' },
        { status: 'assigned', date: '2024-01-17', note: 'Assigned to field engineer' },
        { status: 'progress', date: '2024-01-18', note: 'Repair team dispatched to location' }
      ]
    },
    {
      id: 'RPT-2024-002',
      phone: '+250788654321',
      type: 'Road Repair',
      description: 'Large pothole causing accidents',
      status: 'resolved',
      submittedDate: '2024-01-10',
      lastUpdate: '2024-01-20',
      location: 'Huye District, Tumba Sector',
      assignedTo: 'Infrastructure Department',
      timeline: [
        { status: 'received', date: '2024-01-10', note: 'Report received' },
        { status: 'review', date: '2024-01-11', note: 'Site assessment completed' },
        { status: 'assigned', date: '2024-01-12', note: 'Road maintenance team assigned' },
        { status: 'progress', date: '2024-01-15', note: 'Repair work started' },
        { status: 'resolved', date: '2024-01-20', note: 'Pothole filled and road repaired' }
      ]
    }
  ];

  const handleSearch = () => {
    const found = mockReports.find(report => 
      report.id.toLowerCase().includes(searchId.toLowerCase()) ||
      report.phone.includes(searchId)
    );
    setSelectedReport(found || null);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'received': return Clock;
      case 'review': return Eye;
      case 'assigned': return User;
      case 'progress': return AlertCircle;
      case 'resolved': return CheckCircle;
      default: return Clock;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'received': return 'text-blue-600 bg-blue-100';
      case 'review': return 'text-yellow-600 bg-yellow-100';
      case 'assigned': return 'text-purple-600 bg-purple-100';
      case 'progress': return 'text-orange-600 bg-orange-100';
      case 'resolved': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">{t.title}</h2>
        <p className="text-gray-600">{t.subtitle}</p>
      </div>

      {/* Search Section */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
          <button
            onClick={handleSearch}
            className="flex items-center justify-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium"
          >
            <Search className="w-4 h-4" />
            {t.search}
          </button>
        </div>
      </div>

      {/* Search Results */}
      {selectedReport && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-6">{t.reportDetails}</h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Report Info */}
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-2">ID: {selectedReport.id}</h4>
                <p className="text-gray-600 mb-2">{selectedReport.description}</p>
                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span>{t.submittedOn}: {selectedReport.submittedDate}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <span>{t.location}: {selectedReport.location}</span>
                  </div>
                </div>
              </div>

              <div className={`inline-flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium ${getStatusColor(selectedReport.status)}`}>
                {React.createElement(getStatusIcon(selectedReport.status), { className: 'w-4 h-4' })}
                {t.status[selectedReport.status as keyof typeof t.status]}
              </div>
            </div>

            {/* Timeline */}
            <div>
              <h4 className="font-semibold text-gray-800 mb-4">Progress Timeline</h4>
              <div className="space-y-4">
                {selectedReport.timeline.map((step: any, index: number) => {
                  const Icon = getStatusIcon(step.status);
                  const isActive = index <= selectedReport.timeline.length - 1;
                  
                  return (
                    <div key={index} className="flex gap-3">
                      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                        isActive ? getStatusColor(step.status) : 'bg-gray-200 text-gray-400'
                      }`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-gray-800">
                          {t.status[step.status as keyof typeof t.status]}
                        </div>
                        <div className="text-sm text-gray-600">{step.note}</div>
                        <div className="text-xs text-gray-500">{step.date}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {searchId && !selectedReport && (
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">{t.noResults}</p>
        </div>
      )}

      {/* Sample Reports */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-6">{t.sampleReports}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mockReports.map((report) => (
            <div 
              key={report.id}
              onClick={() => setSelectedReport(report)}
              className="p-4 border border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 cursor-pointer transition-all"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-gray-800">{report.id}</span>
                <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs ${getStatusColor(report.status)}`}>
                  {React.createElement(getStatusIcon(report.status), { className: 'w-3 h-3' })}
                  {t.status[report.status as keyof typeof t.status]}
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-2">{report.description}</p>
              <p className="text-xs text-gray-500">{report.location}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};