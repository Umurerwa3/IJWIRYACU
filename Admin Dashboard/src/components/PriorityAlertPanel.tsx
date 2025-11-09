import React, { useState } from 'react';
import { AlertTriangle, UserPlus, ArrowUpRight, Phone, Mail } from 'lucide-react';

interface PriorityAlertPanelProps {
  language: 'en' | 'rw';
}

export const PriorityAlertPanel: React.FC<PriorityAlertPanelProps> = ({ language }) => {
  const [showOfficerList, setShowOfficerList] = useState(false);
  const [selectedOfficer, setSelectedOfficer] = useState('');

  const translations = {
    en: {
      urgentReports: 'WATER CRISIS REPORTS',
      location: 'in Kayonza',
      timeFrame: 'last 2hrs',
      assign: 'Assign',
      escalate: 'Escalate',
      selectOfficer: 'Select Officer',
      notifyDirector: 'Notify Provincial Director',
      officers: [
        'Officer Mugisha',
        'Officer Uwase',
        'Officer Niyonsaba',
        'Officer Mutoni'
      ]
    },
    rw: {
      urgentReports: 'RAPORO Z\'AMAZI',
      location: 'mu Kayonza',
      timeFrame: 'amasaha 2 yasize',
      assign: 'Tanga',
      escalate: 'Koroshya',
      selectOfficer: 'Hitamo Umukozi',
      notifyDirector: 'Bamenyeshe Umuyobozi w\'Intara',
      officers: [
        'Umukozi Mugisha',
        'Umukozi Uwase',
        'Umukozi Niyonsaba',
        'Umukozi Mutoni'
      ]
    }
  };

  const t = translations[language];

  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
      <div className="flex items-center gap-2 text-red-700 mb-4">
        <AlertTriangle className="w-5 h-5" />
        <span className="font-bold">🚨 5 {t.urgentReports} {t.location} ({t.timeFrame})</span>
      </div>

      <div className="flex flex-wrap gap-3">
        {/* Assign Button */}
        <div className="relative">
          <button
            onClick={() => setShowOfficerList(!showOfficerList)}
            className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            <UserPlus className="w-4 h-4" />
            {t.assign}
          </button>

          {/* Officer Dropdown */}
          {showOfficerList && (
            <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
              <div className="px-3 py-2 text-sm text-gray-500">{t.selectOfficer}</div>
              {t.officers.map((officer) => (
                <button
                  key={officer}
                  onClick={() => {
                    setSelectedOfficer(officer);
                    setShowOfficerList(false);
                  }}
                  className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
                >
                  {officer}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Escalate Button */}
        <div className="relative group">
          <button className="flex items-center gap-2 bg-red-100 text-red-700 px-4 py-2 rounded-lg hover:bg-red-200 transition-colors">
            <ArrowUpRight className="w-4 h-4" />
            {t.escalate}
          </button>
          <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 opacity-0 group-hover:opacity-100 transition-opacity z-50">
            <button className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 flex items-center gap-2">
              <Phone className="w-4 h-4" />
              SMS
            </button>
            <button className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Email
            </button>
          </div>
        </div>
      </div>

      {/* Selected Officer Display */}
      {selectedOfficer && (
        <div className="mt-4 text-sm text-gray-600">
          {t.selectOfficer}: <span className="font-medium">{selectedOfficer}</span>
        </div>
      )}
    </div>
  );
}; 