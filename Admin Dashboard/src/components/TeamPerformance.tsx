import React from 'react';
import { 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  Star,
  Users
} from 'lucide-react';

interface TeamPerformanceProps {
  language: 'en' | 'rw';
}

interface Officer {
  id: number;
  name: string;
  district: string;
  reportsHandled: number;
  avgResponseTime: number;
  satisfactionRating: number;
  status: 'online' | 'offline' | 'busy';
}

export const TeamPerformance: React.FC<TeamPerformanceProps> = ({ language }) => {
  const translations = {
    en: {
      title: 'Team Performance',
      subtitle: 'Officer productivity and response metrics',
      reportsHandled: 'Reports Handled',
      avgResponseTime: 'Avg. Response Time',
      satisfactionRating: 'Satisfaction Rating',
      status: {
        online: 'Online',
        offline: 'Offline',
        busy: 'Busy'
      },
      district: 'District',
      performance: 'Performance',
      topPerformer: 'Top Performer',
      needsAttention: 'Needs Attention'
    },
    rw: {
      title: 'Ibikorwa by\'Ishyirahamwe',
      subtitle: 'Imikorere y\'abakozi n\'imikorere y\'ibisubizo',
      reportsHandled: 'Raporo Zikorwa',
      avgResponseTime: 'Igihe cy\'Igisubizo',
      satisfactionRating: 'Ishimwe',
      status: {
        online: 'Kuri Interineti',
        offline: 'Ntibikora',
        busy: 'Bikora'
      },
      district: 'Akarere',
      performance: 'Imikorere',
      topPerformer: 'Ushobora Cyane',
      needsAttention: 'Bakeneye Ubufasha'
    }
  };

  const t = translations[language];

  const mockOfficers: Officer[] = [
    {
      id: 1,
      name: 'John Doe',
      district: 'Kigali',
      reportsHandled: 45,
      avgResponseTime: 2.3,
      satisfactionRating: 4.8,
      status: 'online'
    },
    {
      id: 2,
      name: 'Jane Smith',
      district: 'Musanze',
      reportsHandled: 38,
      avgResponseTime: 1.8,
      satisfactionRating: 4.9,
      status: 'busy'
    },
    {
      id: 3,
      name: 'James Wilson',
      district: 'Huye',
      reportsHandled: 32,
      avgResponseTime: 3.2,
      satisfactionRating: 4.2,
      status: 'offline'
    }
  ];

  const getStatusColor = (status: Officer['status']) => {
    switch (status) {
      case 'online': return 'bg-green-100 text-green-700';
      case 'offline': return 'bg-gray-100 text-gray-700';
      case 'busy': return 'bg-yellow-100 text-yellow-700';
    }
  };

  const getPerformanceColor = (rating: number) => {
    if (rating >= 4.5) return 'text-green-600';
    if (rating >= 4.0) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-gray-800">{t.title}</h3>
          <p className="text-sm text-gray-600">{t.subtitle}</p>
        </div>
        <Users className="w-6 h-6 text-gray-400" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-600 font-medium">{t.reportsHandled}</p>
              <p className="text-2xl font-bold text-blue-700">115</p>
            </div>
            <TrendingUp className="w-6 h-6 text-blue-500" />
          </div>
          <div className="mt-2 text-xs text-blue-600">+12% from last week</div>
        </div>

        <div className="bg-green-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-600 font-medium">{t.avgResponseTime}</p>
              <p className="text-2xl font-bold text-green-700">2.4h</p>
            </div>
            <Clock className="w-6 h-6 text-green-500" />
          </div>
          <div className="mt-2 text-xs text-green-600">-0.5h from last week</div>
        </div>

        <div className="bg-purple-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-purple-600 font-medium">{t.satisfactionRating}</p>
              <p className="text-2xl font-bold text-purple-700">4.6</p>
            </div>
            <Star className="w-6 h-6 text-purple-500" />
          </div>
          <div className="mt-2 text-xs text-purple-600">+0.2 from last week</div>
        </div>
      </div>

      <div className="space-y-4">
        {mockOfficers.map((officer) => (
          <div key={officer.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-600 font-medium">
                    {officer.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${getStatusColor(officer.status)}`} />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">{officer.name}</h4>
                <p className="text-sm text-gray-500">{officer.district}</p>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <div className="text-right">
                <p className="text-sm text-gray-600">{t.reportsHandled}</p>
                <p className="font-medium text-gray-900">{officer.reportsHandled}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">{t.avgResponseTime}</p>
                <p className="font-medium text-gray-900">{officer.avgResponseTime}h</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">{t.satisfactionRating}</p>
                <p className={`font-medium ${getPerformanceColor(officer.satisfactionRating)}`}>
                  {officer.satisfactionRating}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-between items-center text-sm">
        <div className="flex items-center space-x-2">
          <CheckCircle className="w-4 h-4 text-green-500" />
          <span className="text-gray-600">{t.topPerformer}: Jane Smith</span>
        </div>
        <div className="flex items-center space-x-2">
          <AlertTriangle className="w-4 h-4 text-yellow-500" />
          <span className="text-gray-600">{t.needsAttention}: James Wilson</span>
        </div>
      </div>
    </div>
  );
}; 