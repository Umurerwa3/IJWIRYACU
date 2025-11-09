import React, { useState } from 'react';
import { MapPin, AlertTriangle, Clock, CheckCircle } from 'lucide-react';

const ReportMap: React.FC = () => {
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);

  const districts = [
    {
      id: 'gasabo',
      name: 'Gasabo',
      reports: [
        {
          id: 'RPT-2024-001',
          title: 'Water Access Crisis',
          category: 'Water Access',
          status: 'In Progress',
          priority: 'High',
          location: { lat: -1.9441, lng: 30.0619 },
          submittedDate: '2024-01-19'
        },
        {
          id: 'RPT-2024-002',
          title: 'Road Repair Request',
          category: 'Road Repair',
          status: 'Pending',
          priority: 'Medium',
          location: { lat: -1.9500, lng: 30.0700 },
          submittedDate: '2024-01-18'
        }
      ]
    },
    {
      id: 'kicukiro',
      name: 'Kicukiro',
      reports: [
        {
          id: 'RPT-2024-003',
          title: 'Medical Supply Shortage',
          category: 'Healthcare',
          status: 'Urgent',
          priority: 'Critical',
          location: { lat: -1.9700, lng: 30.0900 },
          submittedDate: '2024-01-19'
        }
      ]
    },
    {
      id: 'nyarugenge',
      name: 'Nyarugenge',
      reports: [
        {
          id: 'RPT-2024-004',
          title: 'School Infrastructure',
          category: 'Education',
          status: 'Pending',
          priority: 'Medium',
          location: { lat: -1.9600, lng: 30.0500 },
          submittedDate: '2024-01-20'
        }
      ]
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'urgent':
        return <AlertTriangle className="w-4 h-4 text-red-600" />;
      case 'in progress':
        return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'resolved':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      default:
        return <MapPin className="w-4 h-4 text-blue-600" />;
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
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Report Map</h2>
        <p className="text-gray-600">Visualize community issues across districts</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* District List */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Districts</h3>
          <div className="space-y-4">
            {districts.map((district) => (
              <div
                key={district.id}
                className={`p-4 rounded-lg cursor-pointer transition-colors ${
                  selectedDistrict === district.id
                    ? 'bg-blue-50 border border-blue-200'
                    : 'bg-gray-50 hover:bg-gray-100'
                }`}
                onClick={() => setSelectedDistrict(district.id)}
              >
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium text-gray-800">{district.name}</h4>
                  <span className="text-sm text-gray-600">{district.reports.length} reports</span>
                </div>
                <div className="space-y-2">
                  {district.reports.map((report) => (
                    <div key={report.id} className="flex items-center gap-2 text-sm">
                      {getStatusIcon(report.status)}
                      <span className="text-gray-600">{report.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Map View */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="aspect-w-16 aspect-h-9 bg-gray-100 rounded-lg mb-4">
              {/* Map Component would go here */}
              <div className="flex items-center justify-center text-gray-500">
                Map visualization would be displayed here
              </div>
            </div>

            {/* Selected District Reports */}
            {selectedDistrict && (
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-4">
                  {districts.find(d => d.id === selectedDistrict)?.name} Reports
                </h3>
                <div className="space-y-4">
                  {districts
                    .find(d => d.id === selectedDistrict)
                    ?.reports.map((report) => (
                      <div key={report.id} className="bg-gray-50 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-medium text-gray-800">{report.title}</h4>
                            <p className="text-sm text-gray-600">{report.category}</p>
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(report.status)}`}>
                            {report.status}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            <span>Lat: {report.location.lat}, Lng: {report.location.lng}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>Submitted: {report.submittedDate}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportMap; 