import React from 'react';
import { BarChart3, TrendingUp, Clock, CheckCircle, Download, Award } from 'lucide-react';

interface DataAccountabilityProps {
  language: 'en' | 'rw';
}

export const DataAccountability: React.FC<DataAccountabilityProps> = ({ language }) => {
  const translations = {
    en: {
      title: 'Data & Accountability',
      subtitle: 'Transparent reporting on government response and performance',
      resolutionRate: 'Resolution Rate by District',
      avgResponseTime: 'Average Response Time',
      leaderboard: 'District Performance Leaderboard',
      needsAttention: 'Districts Needing Attention',
      downloadReport: 'Download Monthly Report',
      topPerformer: 'Top Performer',
      days: 'days',
      resolved: 'resolved',
      pending: 'pending'
    },
    rw: {
      title: 'Amakuru n\'Ubwiyunge',
      subtitle: 'Gutanga amakuru arambuye ku bikorwa bya leta n\'imikorere yayo',
      resolutionRate: 'Igipimo cy\'Ibikemuye ku Turere',
      avgResponseTime: 'Igihe Fatizo cyo Gusubiza',
      leaderboard: 'Urutonde rw\'Ibikorwa by\'Uturere',
      needsAttention: 'Uturere Twongera Gushyira Umweme',
      downloadReport: 'Kuramo Raporo y\'Ukwezi',
      topPerformer: 'Uwacuze Cyane',
      days: 'iminsi',
      resolved: 'byakemuwe',
      pending: 'bitegereje'
    }
  };

  const t = translations[language];

  const districtStats = [
    { district: 'Gasabo', resolved: 89, total: 95, responseTime: 2.1, trend: '+5%' },
    { district: 'Kicukiro', resolved: 84, total: 92, responseTime: 2.5, trend: '+3%' },
    { district: 'Nyarugenge', resolved: 76, total: 88, responseTime: 3.2, trend: '+8%' },
    { district: 'Musanze', resolved: 72, total: 85, responseTime: 2.8, trend: '+2%' },
    { district: 'Huye', resolved: 68, total: 82, responseTime: 3.5, trend: '-1%' },
    { district: 'Rubavu', resolved: 65, total: 89, responseTime: 4.1, trend: '+12%' },
    { district: 'Nyagatare', resolved: 58, total: 78, responseTime: 4.8, trend: '+6%' },
    { district: 'Karongi', resolved: 52, total: 71, responseTime: 5.2, trend: '+15%' }
  ];

  const issueCategories = [
    { category: 'Water & Sanitation', total: 245, resolved: 178, percentage: 73 },
    { category: 'Roads & Infrastructure', total: 198, resolved: 134, percentage: 68 },
    { category: 'Healthcare', total: 156, resolved: 112, percentage: 72 },
    { category: 'Education', total: 134, resolved: 98, percentage: 73 },
    { category: 'Electricity', total: 89, resolved: 56, percentage: 63 },
    { category: 'Agriculture', total: 67, resolved: 45, percentage: 67 }
  ];

  const getPerformanceColor = (percentage: number) => {
    if (percentage >= 80) return 'text-green-600 bg-green-100';
    if (percentage >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getBarWidth = (resolved: number, total: number) => {
    return (resolved / total) * 100;
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">{t.title}</h2>
        <p className="text-gray-600">{t.subtitle}</p>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
          <div className="text-3xl font-bold text-green-600 mb-2">68%</div>
          <div className="text-gray-600">Overall Resolution Rate</div>
          <div className="text-sm text-green-600 mt-1">+5% from last month</div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
          <div className="text-3xl font-bold text-blue-600 mb-2">3.2</div>
          <div className="text-gray-600">Avg Response Time ({t.days})</div>
          <div className="text-sm text-blue-600 mt-1">-0.5 days improved</div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
          <div className="text-3xl font-bold text-purple-600 mb-2">1,203</div>
          <div className="text-gray-600">Total Reports</div>
          <div className="text-sm text-purple-600 mt-1">+12% this month</div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
          <div className="text-3xl font-bold text-orange-600 mb-2">15</div>
          <div className="text-gray-600">Active Districts</div>
          <div className="text-sm text-orange-600 mt-1">All regions covered</div>
        </div>
      </div>

      {/* District Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-2 mb-6">
            <BarChart3 className="w-5 h-5 text-blue-600" />
            <h3 className="text-xl font-bold text-gray-800">{t.resolutionRate}</h3>
          </div>
          
          <div className="space-y-4">
            {districtStats.slice(0, 6).map((district, index) => {
              const percentage = Math.round((district.resolved / district.total) * 100);
              return (
                <div key={district.district} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-800">{district.district}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">
                        {district.resolved}/{district.total}
                      </span>
                      <span className={`text-xs px-2 py-1 rounded-full ${getPerformanceColor(percentage)}`}>
                        {percentage}%
                      </span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-2 mb-6">
            <Clock className="w-5 h-5 text-orange-600" />
            <h3 className="text-xl font-bold text-gray-800">{t.avgResponseTime}</h3>
          </div>
          
          <div className="space-y-4">
            {districtStats.slice(0, 6).map((district) => (
              <div key={district.district} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="font-medium text-gray-800">{district.district}</span>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-semibold text-gray-800">
                    {district.responseTime} {t.days}
                  </span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    district.trend.startsWith('+') ? 'text-red-600 bg-red-100' : 'text-green-600 bg-green-100'
                  }`}>
                    {district.trend}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Performance Leaderboard */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-yellow-600" />
            <h3 className="text-xl font-bold text-gray-800">{t.leaderboard}</h3>
          </div>
          <button className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
            <Download className="w-4 h-4" />
            {t.downloadReport}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {districtStats.slice(0, 3).map((district, index) => {
            const percentage = Math.round((district.resolved / district.total) * 100);
            const medals = ['🥇', '🥈', '🥉'];
            
            return (
              <div key={district.district} className={`p-6 rounded-xl ${
                index === 0 ? 'bg-gradient-to-br from-yellow-50 to-yellow-100 border-2 border-yellow-200' : 'bg-gray-50'
              }`}>
                <div className="text-center">
                  <div className="text-3xl mb-2">{medals[index]}</div>
                  <h4 className="font-bold text-gray-800 mb-1">{district.district}</h4>
                  {index === 0 && <div className="text-xs text-yellow-600 font-medium mb-2">{t.topPerformer}</div>}
                  <div className="text-2xl font-bold text-green-600 mb-1">{percentage}%</div>
                  <div className="text-sm text-gray-600">
                    {district.resolved} {t.resolved} / {district.total - district.resolved} {t.pending}
                  </div>
                  <div className="text-xs text-gray-500 mt-2">
                    Avg: {district.responseTime} {t.days}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Issue Categories Performance */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center gap-2 mb-6">
          <TrendingUp className="w-5 h-5 text-purple-600" />
          <h3 className="text-xl font-bold text-gray-800">Resolution by Category</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {issueCategories.map((category) => (
            <div key={category.category} className="p-4 border border-gray-200 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium text-gray-800">{category.category}</span>
                <span className={`text-sm px-2 py-1 rounded-full ${getPerformanceColor(category.percentage)}`}>
                  {category.percentage}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                <div 
                  className="bg-purple-500 h-2 rounded-full"
                  style={{ width: `${category.percentage}%` }}
                ></div>
              </div>
              <div className="text-sm text-gray-600">
                {category.resolved} resolved of {category.total} total
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};