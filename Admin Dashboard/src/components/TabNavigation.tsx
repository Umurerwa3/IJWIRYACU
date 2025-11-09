import React from 'react';
import { Home, FileText, Search, BarChart3, Settings, Users } from 'lucide-react';
import type { TabType } from '../App';

interface TabNavigationProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  language: 'en' | 'rw';
  isAdmin: boolean;
}

export const TabNavigation: React.FC<TabNavigationProps> = ({
  activeTab,
  setActiveTab,
  language,
  isAdmin
}) => {
  const translations = {
    en: {
      dashboard: 'Overview',
      report: 'Report Issue',
      track: 'Track Reports',
      data: 'Data & Accountability',
      admin: 'Admin Panel',
      users: 'User Management'
    },
    rw: {
      dashboard: 'Muri Rusange',
      report: 'Tanga Ikibazo',
      track: 'Kurikirana Raporo',
      data: 'Amakuru n\'Ubwiyunge',
      admin: 'Panelu y\'Ubuyobozi',
      users: 'Gucunga Abakoresha'
    }
  };

  const t = translations[language];

  const tabs = [
    { id: 'dashboard' as TabType, label: t.dashboard, icon: Home },
    { id: 'report' as TabType, label: t.report, icon: FileText },
    { id: 'track' as TabType, label: t.track, icon: Search },
    { id: 'data' as TabType, label: t.data, icon: BarChart3 },
    ...(isAdmin ? [
      { id: 'admin' as TabType, label: t.admin, icon: Settings },
      { id: 'users' as TabType, label: t.users, icon: Users }
    ] : [])
  ];

  return (
    <nav className="bg-white shadow-md border-b sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-all ${
                  activeTab === tab.id
                    ? 'border-green-600 text-green-600 bg-green-50'
                    : 'border-transparent text-gray-600 hover:text-gray-800 hover:border-gray-300'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};