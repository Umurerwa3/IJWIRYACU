import React, { useState } from 'react';
import { 
  Clock, 
  CheckCircle, 
  AlertTriangle, 
  ChevronDown, 
  ChevronUp,
  Phone,
  UserPlus,
  MessageSquare,
  Filter,
  Search
} from 'lucide-react';
import { ReportModals } from './ReportModals';

interface ReportQueueProps {
  language: 'en' | 'rw';
}

interface Report {
  id: number;
  title: string;
  status: 'urgent' | 'pending' | 'resolved';
  district: string;
  category: string;
  reporter: string;
  assignedTo: string | null;
  daysOpen: number;
  lastUpdated: string;
  notes: string[];
}

interface Translations {
  title: string;
  subtitle: string;
  search: string;
  filters: string;
  status: string;
  category: string;
  district: string;
  reporter: string;
  assignedTo: string;
  daysOpen: string;
  lastUpdated: string;
  urgent: string;
  pending: string;
  inProgress: string;
  resolved: string;
  closed: string;
  assignOfficer: string;
  addNote: string;
  viewDetails: string;
  all: string;
  noReports: string;
  selectOfficer: string;
  cancel: string;
  assign: string;
  note: string;
  notePlaceholder: string;
  add: string;
  categories: {
    [key: string]: string;
  };
  table: {
    id: string;
    reporter: string;
    issue: string;
    location: string;
    status: string;
    assignedTo: string;
    actions: string;
  };
}

export const ReportQueue: React.FC<ReportQueueProps> = ({ language }): JSX.Element => {
  const [sortField, setSortField] = useState<keyof Report>('daysOpen');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<Report['status'] | 'all'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [districtFilter, setDistrictFilter] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);
  const [activeModal, setActiveModal] = useState<{
    type: 'assignment' | 'notes';
    report: Report;
  } | null>(null);
  const [selectedOfficer, setSelectedOfficer] = useState('');
  const [newNote, setNewNote] = useState('');

  const translations: Record<string, Translations> = {
    en: {
      title: 'Report Queue',
      subtitle: 'Manage and track community issue reports',
      search: 'Search reports...',
      filters: 'Filters',
      status: 'Status',
      category: 'Category',
      district: 'District',
      reporter: 'Reporter',
      assignedTo: 'Assigned To',
      daysOpen: 'Days Open',
      lastUpdated: 'Last Updated',
      urgent: 'Urgent',
      pending: 'Pending',
      inProgress: 'In Progress',
      resolved: 'Resolved',
      closed: 'Closed',
      assignOfficer: 'Assign Officer',
      addNote: 'Add Note',
      viewDetails: 'View Details',
      all: 'All',
      noReports: 'No reports found',
      selectOfficer: 'Select an officer',
      cancel: 'Cancel',
      assign: 'Assign',
      note: 'Note',
      notePlaceholder: 'Enter your note here...',
      add: 'Add',
      categories: {
        infrastructure: 'Infrastructure',
        security: 'Security',
        health: 'Health',
        education: 'Education',
        other: 'Other'
      },
      table: {
        id: 'Report ID',
        reporter: 'Reporter',
        issue: 'Issue',
        location: 'Location',
        status: 'Status',
        assignedTo: 'Assigned To',
        actions: 'Actions'
      }
    },
    rw: {
      title: 'Urutonde rwa Raporo',
      subtitle: 'Gukurikiranwa no gucunga raporo z\'ibibazo by\'abaturage',
      search: 'Shakisha raporo...',
      filters: 'Imyitozo',
      status: 'Imiterere',
      category: 'Ubwoko',
      district: 'Akarere',
      reporter: 'Uwareba',
      assignedTo: 'Yahariwe',
      daysOpen: 'Iminsi y\'ubuzima',
      lastUpdated: 'Vuguruwe bwa nyuma',
      urgent: 'Byihuse',
      pending: 'Bitegereje',
      inProgress: 'Bikora',
      resolved: 'Byakemuwe',
      closed: 'Byafungwe',
      assignOfficer: 'Harira Umukozi',
      addNote: 'Bongeraho Inyandiko',
      viewDetails: 'Reba Ibisobanuro',
      all: 'Byose',
      noReports: 'Nta raporo zisanzwe',
      selectOfficer: 'Hitamo umukozi',
      cancel: 'Reka',
      assign: 'Harira',
      note: 'Inyandiko',
      notePlaceholder: 'Andika inyandiko yawe hano...',
      add: 'Bongeraho',
      categories: {
        infrastructure: 'Imishinga',
        security: 'Umutekano',
        health: 'Ubuzima',
        education: 'Amashuri',
        other: 'Ibindi'
      },
      table: {
        id: 'ID ya Raporo',
        reporter: 'Uwareba',
        issue: 'Ikibazo',
        location: 'Ahantu',
        status: 'Imiterere',
        assignedTo: 'Yahariwe',
        actions: 'Ibikorwa'
      }
    }
  };

  const t = translations[language];

  const mockReports: Report[] = [
    {
      id: 1,
      title: 'Water shortage in Kigali sector',
      status: 'urgent',
      district: 'Kigali',
      category: 'infrastructure',
      reporter: '+250 788 123 456',
      assignedTo: 'John Doe',
      daysOpen: 2,
      lastUpdated: '2024-02-20 14:30',
      notes: ['Initial report received', 'Water tanker dispatched']
    },
    {
      id: 2,
      title: 'School supplies needed',
      status: 'pending',
      district: 'Musanze',
      category: 'education',
      reporter: '+250 789 123 456',
      assignedTo: null,
      daysOpen: 3,
      lastUpdated: '2024-02-19 09:15',
      notes: ['Awaiting budget approval']
    },
    {
      id: 3,
      title: 'Health center understaffed',
      status: 'resolved',
      district: 'Huye',
      category: 'health',
      reporter: '+250 787 123 456',
      assignedTo: 'Jane Smith',
      daysOpen: 0,
      lastUpdated: '2024-02-20 16:45',
      notes: ['Additional staff assigned', 'Issue resolved']
    }
  ];

  const handleSort = (field: keyof Report) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const getStatusColor = (status: Report['status']) => {
    switch (status) {
      case 'urgent': return 'bg-red-100 text-red-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'resolved': return 'bg-green-100 text-green-700';
    }
  };

  const getStatusIcon = (status: Report['status']) => {
    switch (status) {
      case 'urgent': return AlertTriangle;
      case 'pending': return Clock;
      case 'resolved': return CheckCircle;
    }
  };

  const filteredReports = mockReports
    .filter(report => {
      const matchesSearch = report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          report.district.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'all' || report.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      const direction = sortDirection === 'asc' ? 1 : -1;
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return direction * aValue.localeCompare(bValue);
      }
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return direction * (aValue - bValue);
      }
      return 0;
    });

  const handleAssignOfficer = () => {
    if (activeModal && selectedOfficer) {
      // Update the report with the new officer
      const updatedReports = mockReports.map(report => 
        report.id === activeModal.report.id 
          ? { ...report, assignedTo: selectedOfficer }
          : report
      );
      // setReports(updatedReports);
      setActiveModal(null);
      setSelectedOfficer('');
    }
  };

  const handleAddNote = () => {
    if (activeModal && newNote.trim()) {
      // Add the new note to the report
      const updatedReports = mockReports.map(report => 
        report.id === activeModal.report.id 
          ? { ...report, notes: [...report.notes, newNote] }
          : report
      );
      // setReports(updatedReports);
      setActiveModal(null);
      setNewNote('');
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-dark-text mb-2">{t.title}</h2>
        <p className="text-gray-600 dark:text-gray-400">{t.subtitle}</p>
      </div>

      <div className="bg-white dark:bg-dark-card rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-800">{t.title}</h3>
          
          <div className="flex gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder={t.search}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-dark-bg dark:text-dark-text"
              />
            </div>

            {/* Filter Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors dark:bg-dark-card dark:hover:bg-dark-border"
            >
              <Filter className="w-4 h-4" />
              <span>{t.filters}</span>
            </button>
          </div>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="mb-6 p-4 bg-gray-50 dark:bg-dark-card rounded-lg">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-dark-text mb-2">{t.status}</label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as Report['status'] | 'all')}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-dark-bg dark:text-dark-text"
                >
                  <option value="all">{t.all}</option>
                  <option value="urgent">{t.urgent}</option>
                  <option value="pending">{t.pending}</option>
                  <option value="resolved">{t.resolved}</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Reports Table */}
        <div className="bg-white dark:bg-dark-card rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-dark-border">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    {t.table.id}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    {t.table.reporter}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    {t.table.issue}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    {t.table.location}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    {t.table.status}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    {t.table.assignedTo}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    {t.table.actions}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-dark-border">
                {filteredReports.map((report) => (
                  <tr key={report.id} className="hover:bg-gray-50 dark:hover:bg-dark-border/50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-dark-text">
                      #{report.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-dark-text">
                      {report.reporter}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 dark:text-dark-text">
                      {report.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-dark-text">
                      {report.district}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        getStatusColor(report.status)
                      }`}>
                        {t[report.status]}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-dark-text">
                      {report.assignedTo || 'Unassigned'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex gap-2">
                        <button 
                          onClick={() => setActiveModal({ type: 'assignment', report })}
                          className="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300 text-xs px-2 py-1 bg-blue-100 dark:bg-dark-card rounded"
                          title={t.assignOfficer}
                        >
                          <UserPlus className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => setActiveModal({ type: 'notes', report })}
                          className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 text-xs px-2 py-1 bg-gray-100 dark:bg-dark-card rounded"
                          title={t.addNote}
                        >
                          <MessageSquare className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {filteredReports.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          {t.noReports}
        </div>
      )}

      {/* Assignment Modal */}
      {activeModal?.type === 'assignment' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 dark:bg-opacity-70 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-dark-card rounded-xl shadow-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-bold text-gray-800 dark:text-dark-text mb-4">{t.assignOfficer}</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t.assignedTo}
                </label>
                <select 
                  className="w-full px-3 py-2 border border-gray-300 dark:border-dark-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-dark-bg dark:text-dark-text"
                  value={selectedOfficer}
                  onChange={(e) => setSelectedOfficer(e.target.value)}
                >
                  <option value="">{t.selectOfficer}</option>
                  <option value="officer1">Officer 1</option>
                  <option value="officer2">Officer 2</option>
                  <option value="officer3">Officer 3</option>
                </select>
              </div>
              <div className="flex justify-end gap-2">
                <button 
                  onClick={() => setActiveModal(null)}
                  className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                >
                  {t.cancel}
                </button>
                <button 
                  onClick={handleAssignOfficer}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-lg"
                >
                  {t.assign}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Notes Modal */}
      {activeModal?.type === 'notes' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 dark:bg-opacity-70 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-dark-card rounded-xl shadow-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-bold text-gray-800 dark:text-dark-text mb-4">{t.addNote}</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t.note}
                </label>
                <textarea 
                  className="w-full px-3 py-2 border border-gray-300 dark:border-dark-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-dark-bg dark:text-dark-text"
                  rows={4}
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder={t.notePlaceholder}
                />
              </div>
              <div className="flex justify-end gap-2">
                <button 
                  onClick={() => setActiveModal(null)}
                  className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                >
                  {t.cancel}
                </button>
                <button 
                  onClick={handleAddNote}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-lg"
                >
                  {t.add}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
