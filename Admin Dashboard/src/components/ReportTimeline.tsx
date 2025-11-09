import React from 'react';
import { Clock, CheckCircle, AlertTriangle, User, MessageSquare } from 'lucide-react';

const ReportTimeline: React.FC = () => {
  const timeline = [
    {
      id: 1,
      date: '2024-01-19 10:30',
      status: 'Report Submitted',
      description: 'Initial report received from community member',
      user: 'John Doe',
      type: 'submission'
    },
    {
      id: 2,
      date: '2024-01-19 11:45',
      status: 'Under Review',
      description: 'Report assigned to Water Department',
      user: 'System',
      type: 'assignment'
    },
    {
      id: 3,
      date: '2024-01-20 09:15',
      status: 'In Progress',
      description: 'Site inspection completed, damage assessment in progress',
      user: 'Water Department',
      type: 'update'
    },
    {
      id: 4,
      date: '2024-01-20 10:30',
      status: 'Comment Added',
      description: 'Thank you for the quick response. The situation is getting worse as more households are affected.',
      user: 'John Doe',
      type: 'comment'
    },
    {
      id: 5,
      date: '2024-01-20 14:20',
      status: 'In Progress',
      description: 'Repair team dispatched to the location',
      user: 'Water Department',
      type: 'update'
    }
  ];

  const getStatusIcon = (type: string) => {
    switch (type) {
      case 'submission':
        return <AlertTriangle className="w-4 h-4 text-blue-600" />;
      case 'assignment':
        return <User className="w-4 h-4 text-purple-600" />;
      case 'update':
        return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'comment':
        return <MessageSquare className="w-4 h-4 text-green-600" />;
      default:
        return <CheckCircle className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusColor = (type: string) => {
    switch (type) {
      case 'submission':
        return 'bg-blue-100 text-blue-800';
      case 'assignment':
        return 'bg-purple-100 text-purple-800';
      case 'update':
        return 'bg-yellow-100 text-yellow-800';
      case 'comment':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Report Timeline</h2>
        <p className="text-gray-600">Track the progress of community issue reports</p>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="space-y-6">
          {timeline.map((event, index) => (
            <div key={event.id} className="flex gap-4">
              {/* Timeline Line */}
              <div className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full ${getStatusColor(event.type)} flex items-center justify-center`}>
                  {getStatusIcon(event.type)}
                </div>
                {index !== timeline.length - 1 && (
                  <div className="w-0.5 h-full bg-gray-200" />
                )}
              </div>

              {/* Event Content */}
              <div className="flex-grow">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-medium text-gray-800">{event.status}</h3>
                      <p className="text-sm text-gray-600">{event.description}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-800">{event.user}</div>
                      <div className="text-xs text-gray-500">{event.date}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReportTimeline; 