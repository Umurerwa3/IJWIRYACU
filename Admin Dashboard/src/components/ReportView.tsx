import React from 'react';
import { MapPin, Clock, User, AlertTriangle, MessageSquare, FileText } from 'lucide-react';

const ReportView: React.FC = () => {
  const report = {
    id: 'RPT-2024-001',
    title: 'Water Access Crisis in Gasabo District',
    description: 'Multiple reports of water supply issues affecting 500+ households in the Gasabo District. The main water pipeline has been damaged, causing severe water shortages in the area.',
    status: 'In Progress',
    priority: 'High',
    category: 'Water Access',
    location: 'Gasabo District',
    submittedDate: '2024-01-19',
    lastUpdated: '2024-01-20',
    assignedTo: 'Water Department',
    reporter: {
      name: 'John Doe',
      contact: '+250 123 456 789',
      email: 'john.doe@example.com'
    },
    timeline: [
      {
        date: '2024-01-19 10:30',
        status: 'Report Submitted',
        description: 'Initial report received from community member'
      },
      {
        date: '2024-01-19 11:45',
        status: 'Under Review',
        description: 'Report assigned to Water Department'
      },
      {
        date: '2024-01-20 09:15',
        status: 'In Progress',
        description: 'Site inspection completed, damage assessment in progress'
      }
    ],
    attachments: [
      {
        name: 'damage_photos.zip',
        type: 'zip',
        size: '2.5MB'
      },
      {
        name: 'location_map.pdf',
        type: 'pdf',
        size: '1.2MB'
      }
    ],
    comments: [
      {
        user: 'Water Department',
        date: '2024-01-20 09:15',
        content: 'Initial assessment complete. Damage to main pipeline confirmed. Repair team dispatched.'
      },
      {
        user: 'John Doe',
        date: '2024-01-20 10:30',
        content: 'Thank you for the quick response. The situation is getting worse as more households are affected.'
      }
    ]
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{report.title}</h2>
            <div className="flex items-center gap-2 mt-2">
              <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {report.status}
              </span>
              <span className="px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                {report.priority}
              </span>
              <span className="px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                {report.category}
              </span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-600">Report ID: {report.id}</div>
            <div className="text-sm text-gray-600">Submitted: {report.submittedDate}</div>
          </div>
        </div>

        {/* Description */}
        <div className="mb-6">
          <h3 className="text-lg font-bold text-gray-800 mb-2">Description</h3>
          <p className="text-gray-600">{report.description}</p>
        </div>

        {/* Location and Assignment */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="flex items-start gap-2">
            <MapPin className="w-5 h-5 text-gray-400 mt-1" />
            <div>
              <h4 className="text-sm font-medium text-gray-700">Location</h4>
              <p className="text-gray-600">{report.location}</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <User className="w-5 h-5 text-gray-400 mt-1" />
            <div>
              <h4 className="text-sm font-medium text-gray-700">Assigned To</h4>
              <p className="text-gray-600">{report.assignedTo}</p>
            </div>
          </div>
        </div>

        {/* Reporter Information */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Reporter Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <h4 className="text-sm font-medium text-gray-700">Name</h4>
              <p className="text-gray-600">{report.reporter.name}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-700">Contact</h4>
              <p className="text-gray-600">{report.reporter.contact}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-700">Email</h4>
              <p className="text-gray-600">{report.reporter.email}</p>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Timeline</h3>
          <div className="space-y-4">
            {report.timeline.map((event, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-2 h-2 rounded-full bg-blue-600" />
                  {index !== report.timeline.length - 1 && (
                    <div className="w-0.5 h-full bg-gray-200" />
                  )}
                </div>
                <div>
                  <div className="font-medium text-gray-800">{event.status}</div>
                  <div className="text-sm text-gray-600">{event.description}</div>
                  <div className="text-xs text-gray-500">{event.date}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Attachments */}
        <div className="mb-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Attachments</h3>
          <div className="space-y-2">
            {report.attachments.map((file, index) => (
              <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                <FileText className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">{file.name}</span>
                <span className="text-xs text-gray-500">({file.size})</span>
              </div>
            ))}
          </div>
        </div>

        {/* Comments */}
        <div>
          <h3 className="text-lg font-bold text-gray-800 mb-4">Comments</h3>
          <div className="space-y-4">
            {report.comments.map((comment, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                    <User className="w-4 h-4 text-gray-500" />
                  </div>
                </div>
                <div className="flex-grow">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-gray-800">{comment.user}</span>
                    <span className="text-xs text-gray-500">{comment.date}</span>
                  </div>
                  <p className="text-gray-600">{comment.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportView; 