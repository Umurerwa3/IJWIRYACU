import React, { useState } from 'react';
import { MapPin, Eye, Clock, CheckCircle, Layers, Thermometer, Filter, ChevronDown } from 'lucide-react';

interface MapViewProps {
  language: 'en' | 'rw';
}

export const MapView: React.FC<MapViewProps> = ({ language }) => {
  const [showLayerControls, setShowLayerControls] = useState(false);
  const [showHeatmap, setShowHeatmap] = useState(false);
  const [activeFilters, setActiveFilters] = useState({
    urgent: true,
    pending: true,
    resolved: true
  });

  const translations = {
    en: {
      title: 'Issue Distribution Map',
      urgent: 'Urgent',
      pending: 'Pending', 
      resolved: 'Resolved',
      viewDetails: 'View Details',
      layers: 'Layers',
      heatmap: 'Heatmap',
      filters: 'Filters',
      activeReports: 'Active Reports',
      daysPending: 'days pending',
      assignOfficer: 'Assign Officer',
      callReporter: 'Call Reporter',
      districts: {
        kigali: 'Kigali City',
        northern: 'Northern Province',
        southern: 'Southern Province',
        eastern: 'Eastern Province',
        western: 'Western Province'
      }
    },
    rw: {
      title: 'Ikarita y\'Ibibazo',
      urgent: 'Byihutirwa',
      pending: 'Bitegereje',
      resolved: 'Byakemuwe',
      viewDetails: 'Reba Amakuru Arambuye',
      layers: 'Ububiko',
      heatmap: 'Ikarita y\'Ubushyuhe',
      filters: 'Imyitozo',
      activeReports: 'Raporo Zikora',
      daysPending: 'iminsi zitegereje',
      assignOfficer: 'Tanga Umukozi',
      callReporter: 'Hamagara Ushinzwe',
      districts: {
        kigali: 'Umujyi wa Kigali',
        northern: 'Intara y\'Amajyaruguru',
        southern: 'Intara y\'Amajyepfo',
        eastern: 'Intara y\'Iburasirazuba',
        western: 'Intara y\'Iburengerazuba'
      }
    }
  };

  const t = translations[language];

  const mockReports = [
    { 
      id: 1, 
      district: 'Kigali', 
      type: 'urgent', 
      issue: 'Water shortage', 
      x: 45, 
      y: 30,
      daysOpen: 1,
      reporter: '+250 788 123 456'
    },
    { 
      id: 2, 
      district: 'Musanze', 
      type: 'pending', 
      issue: 'Road repair needed', 
      x: 35, 
      y: 15,
      daysOpen: 3,
      reporter: '+250 789 123 456'
    },
    { 
      id: 3, 
      district: 'Huye', 
      type: 'resolved', 
      issue: 'School supplies delivered', 
      x: 40, 
      y: 70,
      daysOpen: 0,
      reporter: '+250 787 123 456'
    },
    { 
      id: 4, 
      district: 'Rubavu', 
      type: 'pending', 
      issue: 'Health center understaffed', 
      x: 15, 
      y: 25,
      daysOpen: 2,
      reporter: '+250 786 123 456'
    },
    { 
      id: 5, 
      district: 'Nyagatare', 
      type: 'urgent', 
      issue: 'Bridge maintenance', 
      x: 75, 
      y: 20,
      daysOpen: 1,
      reporter: '+250 785 123 456'
    },
    { 
      id: 6, 
      district: 'Kamonyi', 
      type: 'resolved', 
      issue: 'Solar panels installed', 
      x: 50, 
      y: 50,
      daysOpen: 0,
      reporter: '+250 784 123 456'
    }
  ];

  const getMarkerColor = (type: string) => {
    switch (type) {
      case 'urgent': return 'bg-red-500';
      case 'pending': return 'bg-yellow-500';
      case 'resolved': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getMarkerIcon = (type: string) => {
    switch (type) {
      case 'urgent': return Clock;
      case 'pending': return Eye;
      case 'resolved': return CheckCircle;
      default: return MapPin;
    }
  };

  const toggleFilter = (filter: keyof typeof activeFilters) => {
    setActiveFilters(prev => ({
      ...prev,
      [filter]: !prev[filter]
    }));
  };

  const filteredReports = mockReports.filter(report => activeFilters[report.type as keyof typeof activeFilters]);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-800">{t.title}</h3>
        
        {/* Map Controls */}
        <div className="flex gap-4">
          {/* Layer Controls */}
          <div className="relative">
            <button
              onClick={() => setShowLayerControls(!showLayerControls)}
              className="flex items-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <Layers className="w-4 h-4" />
              <span>{t.layers}</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            
            {showLayerControls && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                <button
                  onClick={() => setShowHeatmap(!showHeatmap)}
                  className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                >
                  <Thermometer className="w-4 h-4" />
                  {t.heatmap}
                </button>
              </div>
            )}
          </div>

          {/* Filter Controls */}
          <div className="flex gap-4 text-sm">
            <button
              onClick={() => toggleFilter('urgent')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                activeFilters.urgent ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-500'
              }`}
            >
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span>{t.urgent}</span>
            </button>
            <button
              onClick={() => toggleFilter('pending')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                activeFilters.pending ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-500'
              }`}
            >
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span>{t.pending}</span>
            </button>
            <button
              onClick={() => toggleFilter('resolved')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                activeFilters.resolved ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
              }`}
            >
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>{t.resolved}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="relative bg-gradient-to-br from-green-100 to-blue-100 rounded-lg h-96 overflow-hidden">
        {/* Simplified Rwanda map background */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-200 to-blue-200 opacity-50"></div>
        
        {/* Province outlines (simplified) */}
        <div className="absolute inset-4 border-2 border-green-300 rounded-lg opacity-30"></div>
        
        {/* Heatmap overlay */}
        {showHeatmap && (
          <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 via-yellow-500/20 to-green-500/20 pointer-events-none"></div>
        )}
        
        {/* Report markers */}
        {filteredReports.map((report) => {
          const Icon = getMarkerIcon(report.type);
          return (
            <div
              key={report.id}
              className="absolute group cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${report.x}%`, top: `${report.y}%` }}
            >
              <div className={`w-6 h-6 ${getMarkerColor(report.type)} rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform`}>
                <Icon className="w-3 h-3 text-white" />
              </div>
              
              {/* Enhanced Tooltip */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-4 py-3 bg-gray-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                <div className="font-semibold mb-1">{report.district}</div>
                <div className="text-gray-300 mb-2">{report.issue}</div>
                {report.daysOpen > 0 && (
                  <div className="text-yellow-400 mb-2">
                    {report.daysOpen} {t.daysPending}
                  </div>
                )}
                <div className="flex gap-2 mt-2">
                  <button className="px-2 py-1 bg-blue-600 hover:bg-blue-700 rounded text-xs">
                    {t.assignOfficer}
                  </button>
                  <button className="px-2 py-1 bg-green-600 hover:bg-green-700 rounded text-xs">
                    {t.callReporter}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};