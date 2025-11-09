import React, { useState } from 'react';
import { X, Send, UserPlus, MessageSquare } from 'lucide-react';

interface ReportModalsProps {
  language: 'en' | 'rw';
  isOpen: boolean;
  onClose: () => void;
  type: 'notes' | 'assignment';
  reportId: number;
  reportTitle: string;
  currentAssignee?: string | null;
  currentNotes?: string[];
}

export const ReportModals: React.FC<ReportModalsProps> = ({
  language,
  isOpen,
  onClose,
  type,
  reportId,
  reportTitle,
  currentAssignee,
  currentNotes = []
}) => {
  const [newNote, setNewNote] = useState('');
  const [selectedOfficer, setSelectedOfficer] = useState('');
  const [notes, setNotes] = useState(currentNotes);

  const translations = {
    en: {
      addNote: 'Add Note',
      assignOfficer: 'Assign Officer',
      close: 'Close',
      send: 'Send',
      assign: 'Assign',
      newNote: 'New Note',
      selectOfficer: 'Select Officer',
      notes: 'Notes',
      noNotes: 'No notes yet',
      reportTitle: 'Report Title',
      currentAssignee: 'Current Assignee',
      availableOfficers: 'Available Officers'
    },
    rw: {
      addNote: 'Bika Inyandiko',
      assignOfficer: 'Tanga Umukozi',
      close: 'Funga',
      send: 'Ohereza',
      assign: 'Tanga',
      newNote: 'Inyandiko Nshya',
      selectOfficer: 'Hitamo Umukozi',
      notes: 'Inyandiko',
      noNotes: 'Nta nyandiko zisanzwe',
      reportTitle: 'Umutwe w\'Icyitonderwa',
      currentAssignee: 'Ushinzwe Ubu',
      availableOfficers: 'Abakozi Bafite'
    }
  };

  const t = translations[language];

  const mockOfficers = [
    { id: 1, name: 'John Doe', department: 'Infrastructure' },
    { id: 2, name: 'Jane Smith', department: 'Health' },
    { id: 3, name: 'James Wilson', department: 'Education' },
    { id: 4, name: 'Sarah Johnson', department: 'Security' }
  ];

  const handleAddNote = () => {
    if (newNote.trim()) {
      setNotes([...notes, newNote]);
      setNewNote('');
    }
  };

  const handleAssignOfficer = () => {
    if (selectedOfficer) {
      // Here you would typically make an API call to update the assignment
      console.log(`Assigned report ${reportId} to officer ${selectedOfficer}`);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h3 className="text-xl font-bold text-gray-800">
            {type === 'notes' ? t.addNote : t.assignOfficer}
          </h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Report Info */}
          <div className="mb-6">
            <div className="text-sm text-gray-500 mb-1">{t.reportTitle}</div>
            <div className="font-medium text-gray-900">{reportTitle}</div>
          </div>

          {type === 'notes' ? (
            <>
              {/* Notes List */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-700 mb-3">{t.notes}</h4>
                {notes.length > 0 ? (
                  <div className="space-y-3">
                    {notes.map((note, index) => (
                      <div
                        key={index}
                        className="p-3 bg-gray-50 rounded-lg text-sm text-gray-700"
                      >
                        {note}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-sm text-gray-500 italic">{t.noNotes}</div>
                )}
              </div>

              {/* New Note Input */}
              <div className="flex gap-3">
                <input
                  type="text"
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder={t.newNote}
                  className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={handleAddNote}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  {t.send}
                </button>
              </div>
            </>
          ) : (
            <>
              {/* Current Assignee */}
              {currentAssignee && (
                <div className="mb-6">
                  <div className="text-sm text-gray-500 mb-1">{t.currentAssignee}</div>
                  <div className="font-medium text-gray-900">{currentAssignee}</div>
                </div>
              )}

              {/* Officer Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.availableOfficers}
                </label>
                <select
                  value={selectedOfficer}
                  onChange={(e) => setSelectedOfficer(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">{t.selectOfficer}</option>
                  {mockOfficers.map((officer) => (
                    <option key={officer.id} value={officer.id}>
                      {officer.name} - {officer.department}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={handleAssignOfficer}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
              >
                <UserPlus className="w-4 h-4" />
                {t.assign}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}; 