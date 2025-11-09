import React, { useState } from 'react';
import { MessageCircle, Globe, Shield, Users, Bell, User, LogOut, ChevronDown } from 'lucide-react';

interface HeaderProps {
  language: 'en' | 'rw';
  setLanguage: (lang: 'en' | 'rw') => void;
  isAdmin: boolean;
  setIsAdmin: (admin: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  language, 
  setLanguage, 
  isAdmin, 
  setIsAdmin 
}) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const urgentReports = 3; // This would come from your state management

  const translations = {
    en: {
      title: 'IjwiRyacu',
      subtitle: 'Our Voice for Rwanda',
      adminToggle: 'Admin View',
      publicView: 'Public View',
      notifications: 'Notifications',
      urgentReports: 'urgent reports',
      viewAll: 'View All',
      profile: 'Profile',
      logout: 'Logout',
      switchAccount: 'Switch Account'
    },
    rw: {
      title: 'IjwiRyacu',
      subtitle: 'Ijwi Ryacu Ryu Rwanda',
      adminToggle: 'Reba Nka Umuyobozi',
      publicView: 'Reba Nka Rubanda',
      notifications: 'Amatangazo',
      urgentReports: 'raporo zihuse',
      viewAll: 'Reba Zose',
      profile: 'Umwirondoro',
      logout: 'Sohoka',
      switchAccount: 'Hindura Konti'
    }
  };

  const t = translations[language];

  return (
    <header className="bg-gradient-to-r from-green-700 to-green-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Title */}
          <div className="flex items-center gap-3">
            <div className="p-3 bg-white/20 rounded-full">
              <MessageCircle className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold">{t.title}</h1>
              <p className="text-green-100 font-medium">{t.subtitle}</p>
            </div>
          </div>

          {/* Right Side Controls */}
          <div className="flex items-center gap-4">
            {/* Admin Toggle */}
            <button
              onClick={() => setIsAdmin(!isAdmin)}
              className="flex items-center gap-2 bg-white/10 rounded-lg px-3 py-2 hover:bg-white/20 transition-colors"
            >
              <Shield className="w-5 h-5" />
              <span className="font-medium">{isAdmin ? t.publicView : t.adminToggle}</span>
            </button>

            {/* Language Toggle */}
            <div className="relative group">
              <div className="flex items-center gap-2 bg-white/10 rounded-lg p-2 cursor-pointer">
                <Globe className="w-4 h-4" />
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value as 'en' | 'rw')}
                  className="bg-transparent border-none text-white focus:outline-none cursor-pointer"
                >
                  <option value="en" className="text-gray-800">English</option>
                  <option value="rw" className="text-gray-800">Kinyarwanda</option>
                </select>
              </div>
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-black/80 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                Switch between Kinyarwanda/English
              </div>
            </div>

            {/* Notification Bell */}
            <div className="relative group">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
              >
                <Bell className="w-5 h-5" />
                {urgentReports > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {urgentReports}
                  </span>
                )}
              </button>
              <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-black/80 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                {urgentReports} new urgent reports (click to view)
              </div>
            </div>

            {/* User Profile */}
            <div className="relative">
              <button 
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-2 bg-white/10 rounded-lg px-3 py-2 hover:bg-white/20 transition-colors"
              >
                <User className="w-5 h-5" />
                <span className="font-medium">Admin</span>
                <ChevronDown className="w-4 h-4" />
              </button>

              {/* Profile Dropdown Menu */}
              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                  <button className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 flex items-center gap-2">
                    <User className="w-4 h-4" />
                    {t.profile}
                  </button>
                  <button className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    {t.switchAccount}
                  </button>
                  <button className="w-full px-4 py-2 text-left text-red-600 hover:bg-gray-100 flex items-center gap-2">
                    <LogOut className="w-4 h-4" />
                    {t.logout}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick Stats Bar */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white/10 rounded-lg p-4 relative group">
            <div className="text-2xl font-bold">1,450</div>
            <div className="text-green-100 text-sm">Total Reports</div>
            <div className="text-green-200 text-xs mt-1">↑12% this month</div>
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-black/80 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              Hover to see breakdown by district
            </div>
          </div>
          <div className="bg-white/10 rounded-lg p-4 relative group">
            <div className="text-2xl font-bold">68%</div>
            <div className="text-green-100 text-sm">Resolution Rate</div>
            <div className="text-green-200 text-xs mt-1">↑5% vs. last quarter</div>
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-black/80 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              Click to filter resolved cases
            </div>
          </div>
          <div className="bg-white/10 rounded-lg p-4 relative group">
            <div className="text-2xl font-bold">2.3</div>
            <div className="text-green-100 text-sm">Avg. Response Time</div>
            <div className="text-green-200 text-xs mt-1">Goal: {'<'}48hrs</div>
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-black/80 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              Red flag if {'>'}3 days
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};