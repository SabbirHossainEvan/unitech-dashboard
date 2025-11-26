import React, { useState, useEffect, useMemo } from 'react';
import { Trash2, Edit, Loader2, X } from 'lucide-react';

// ----------------------------------------------------------------------
// --- Simplified Date Utilities (Replacing date-fns) ---
// ----------------------------------------------------------------------
const DAYS_OF_WEEK = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const SHORT_DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// Helper to convert ISO string to Date object
const parseISOString = (isoString) => new Date(isoString);

// Helper to get day index (0=Sunday, 6=Saturday)
const getDayOfWeek = (date) => date.getDay();

// Simplified format function based on needs (yyyy-MM-dd, EEEE, EE, d)
const simpleFormat = (date, formatStr) => {
    if (!(date instanceof Date) || isNaN(date)) return '';
    
    const yyyy = date.getFullYear();
    const MM = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    
    if (formatStr === 'yyyy-MM-dd') return `${yyyy}-${MM}-${dd}`;
    if (formatStr === 'EEEE') return DAYS_OF_WEEK[date.getDay()];
    if (formatStr === 'EE') return SHORT_DAYS[date.getDay()];
    if (formatStr === 'd') return date.getDate().toString();

    return date.toISOString().split('T')[0]; // Default ISO date
};

// ----------------------------------------------------------------------
// 🚨 EMBEDDED CONFIGURATION DATA 🚨
// ----------------------------------------------------------------------
const attendanceConfig = {
  "page_config": {
    "title": "Attendance",
    "subtitle": "Track student attendance records.",
    "items_per_page": 10
  },
  "filters": {
    "months": [
      { "value": "Jan, 2024", "label": "Jan, 2024", "totalDays": 31 },
      { "value": "Feb, 2024", "label": "Feb, 2024", "totalDays": 29 },
      { "value": "Mar, 2024", "label": "Mar, 2024", "totalDays": 31 },
      { "value": "Apr, 2024", "label": "Apr, 2024", "totalDays": 30 },
      { "value": "May, 2024", "label": "May, 2024", "totalDays": 31 },
      { "value": "Jun, 2024", "label": "Jun, 2024", "totalDays": 30 },
      { "value": "Jul, 2024", "label": "Jul, 2024", "totalDays": 31 },
      { "value": "Aug, 2024", "label": "Aug, 2024", "totalDays": 31 },
      { "value": "Sep, 2024", "label": "Sep, 2024", "totalDays": 30 },
      { "value": "Oct, 2024", "label": "Oct, 2024", "totalDays": 31 },
      { "value": "Nov, 2024", "label": "Nov, 2024", "totalDays": 30 },
      { "value": "Dec, 2024", "label": "Dec, 24", "totalDays": 31 }
    ],
    "academics": [
      { "value": "Academic Year 2023-2024", "label": "Academic Year 2023-2024" },
      { "value": "Academic Year 2024-2025", "label": "Academic Year 2024-2025" }
    ],
    "semesters": [
      { "value": "1st semester", "label": "1st Semester" },
      { "value": "2nd semester", "label": "2nd Semester" }
    ],
    "subjects": [
      { "value": "All Subjects", "label": "All Subjects" },
      { "value": "Mathematics", "label": "Mathematics" },
      { "value": "Computer Science", "label": "Computer Science" }
    ],
    "attendance_types": [
      { "value": "all", "label": "All" },
      { "value": "present", "label": "Present" },
      { "value": "absent", "label": "Absent" },
      { "value": "late", "label": "Late" }
    ]
  }
};
// ----------------------------------------------------------------------


// --- Utility Functions for Dynamic Data Generation (kept local for self-contained file) ---

const studentNames = [
  "Olivia Rhye", "Phoenix Baker", "Lana Steiner", "Demi Wilkinson", "Candice Wu",
  "Drew Cano", "Orlando Diggs", "Andi Lane", "Koray Okumus", "Kate Bell",
  "Molly Sanders", "Ariel Zhu", "Babe Roy", "Cloe D'souza", "Dillon Smith"
];

// Helper to generate a consistent attendance status based on ID and date
const getAttendanceStatus = (studentId, day) => {
    // Determine status pseudo-randomly for demonstration
    const seed = studentId * day.getDate() + day.getMonth() + day.getFullYear();
    const statusNumber = seed % 10;
    
    if (statusNumber < 7) { // 70% Present
        return "Present";
    } else if (statusNumber < 9) { // 20% Absent
        return "Absent";
    } else { // 10% Late
        return "Late";
    }
};

const generateAttendanceData = (selectedMonthYear, totalDays, filters) => {
    if (!filters) return { days: [], attendanceRecords: [] };
    
    const [month, year] = selectedMonthYear.split(', ');
    const firstDayOfMonth = new Date(`${month} 1, ${year}`);
    
    const days = [];
    // Generate daily headers
    for (let i = 0; i < totalDays; i++) {
        const date = new Date(firstDayOfMonth);
        date.setDate(date.getDate() + i);
        const dayOfWeek = getDayOfWeek(date); // Use new utility: 0 = Sunday, 6 = Saturday
        days.push({
            date: simpleFormat(date, 'yyyy-MM-dd'), // Use new utility
            dayName: simpleFormat(date, 'EEEE'),   // Use new utility
            isWeekend: dayOfWeek === 0 || dayOfWeek === 6
        });
    }

    const attendanceRecords = studentNames.map((name, index) => {
        const id = index + 1001;
        const initials = name.split(' ').map(n => n[0]).join('');
        const username = name.toLowerCase().replace(/\s/g, '').substring(0, 8); // Shortened username

        let classesAttended = 0;
        let totalClasses = 0;
        const dailyAttendance = {};

        days.forEach(day => {
            if (!day.isWeekend) { // Only count weekdays as classes
                totalClasses++;
                const status = getAttendanceStatus(id, new Date(day.date));
                dailyAttendance[day.date] = status;
                if (status === 'Present') {
                    classesAttended++;
                }
            } else {
                dailyAttendance[day.date] = 'Weekend';
            }
        });

        return {
            id,
            name,
            username: '@' + username,
            initials,
            classesAttended,
            totalClasses,
            dailyAttendance
        };
    });

    return { days, attendanceRecords };
};

// --- Reusable Dropdown Component ---

const Dropdown = ({ options, selectedValue, onChange, title }) => (
  <div className="relative inline-block text-left mr-4">
    <select
      value={selectedValue}
      onChange={(e) => onChange(e.target.value)}
      className="appearance-none bg-white border-none py-2 px-3 text-gray-700 text-sm font-medium transition-all duration-200 focus:ring-0 focus:outline-none cursor-pointer"
    >
      <option value="" disabled className="text-gray-400">{title}</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 text-gray-500">
      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
      </svg>
    </div>
  </div>
);

// --- Custom Confirmation Modal Component ---
const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm, studentName }) => {
    if (!isOpen) return null;

    // CHANGED: bg-gray-900 bg-opacity-50 to bg-indigo-900 bg-opacity-80
    return (
        <div className="fixed inset-0 bg-transparent bg-opacity-600 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm p-6 transform transition-all duration-300 scale-100">
                <div className="flex justify-between items-start">
                    <h3 className="text-lg font-semibold text-red-600 flex items-center">
                        <Trash2 className="w-5 h-5 mr-2" />
                        Delete Confirmation
                    </h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <X className="w-5 h-5" />
                    </button>
                </div>
                <div className="mt-4 text-gray-600">
                    <p>Are you sure you want to permanently delete the attendance record for <span className="font-bold text-gray-900">{studentName}</span>?</p>
                    <p className="mt-2 text-sm text-red-500">This action cannot be undone.</p>
                </div>
                <div className="mt-6 flex justify-end space-x-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 shadow-md transition-colors"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};


// --- Custom Edit Modal Component ---
const EditModal = ({ isOpen, onClose, onUpdate, student, daysInMonth }) => {
    if (!isOpen || !student) return null;

    // State for editing
    const [editedStudent, setEditedStudent] = useState(student);

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedStudent(prev => ({ ...prev, [name]: value }));
    };
    
    // Handle attendance status change
    const handleStatusChange = (date, status) => {
        setEditedStudent(prev => ({
            ...prev,
            dailyAttendance: {
                ...prev.dailyAttendance,
                [date]: status
            }
        }));
    };

    // Handle save button click
    const handleSave = () => {
        // Recalculate total classes and attendance based on daily changes
        let newClassesAttended = 0;
        let newTotalClasses = 0;

        daysInMonth.forEach(day => {
            const status = editedStudent.dailyAttendance[day.date];
            if (status !== 'Weekend') {
                newTotalClasses++;
                if (status === 'Present') {
                    newClassesAttended++;
                }
            }
        });
        
        onUpdate({
            ...editedStudent,
            classesAttended: newClassesAttended,
            totalClasses: newTotalClasses
        });
        onClose();
    };

    // CHANGED: bg-gray-900 bg-opacity-60 to bg-indigo-900 bg-opacity-80
    return (
        <div className="fixed inset-0 bg-transparent bg-opacity-130 flex items-center justify-center z-50 p-4 overflow-y-auto">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl transform transition-all duration-300">
                
                {/* Modal Header */}
                <div className="p-5 border-b flex justify-between items-center">
                    <h3 className="text-xl font-semibold text-indigo-600">
                        <Edit className="w-5 h-5 inline mr-2 -mt-1" />
                        Edit Record: {student.name}
                    </h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Modal Body */}
                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Basic Info */}
                    <div className="space-y-4">
                        <h4 className="text-lg font-medium text-gray-700 border-b pb-2 mb-4">General Information</h4>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Student Name</label>
                            <input
                                type="text"
                                name="name"
                                value={editedStudent.name}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                            <input
                                type="text"
                                name="username"
                                value={editedStudent.username}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 cursor-not-allowed"
                                disabled
                            />
                        </div>
                        <div className="pt-4 border-t mt-4">
                            <p className="text-sm font-medium text-gray-700">Current Attendance (%):</p>
                            <p className="text-3xl font-bold text-indigo-600">
                                {editedStudent.totalClasses > 0 ? ((editedStudent.classesAttended / editedStudent.totalClasses) * 100).toFixed(1) : 0}%
                            </p>
                            <p className="text-sm text-gray-500 mt-1">
                                ({editedStudent.classesAttended} / {editedStudent.totalClasses} classes)
                            </p>
                        </div>
                    </div>
                    
                    {/* Daily Attendance Editor */}
                    <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                        <h4 className="text-lg font-medium text-gray-700 border-b pb-2 mb-4">Modify Daily Attendance</h4>
                        
                        {daysInMonth.map(day => (
                            <div key={day.date} className="flex items-center justify-between p-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                                <span className="text-sm font-medium text-gray-700 w-24">
                                    {simpleFormat(parseISOString(day.date), 'EE')} {simpleFormat(parseISOString(day.date), 'd')}
                                </span>
                                <select
                                    value={editedStudent.dailyAttendance[day.date] || 'Absent'}
                                    onChange={(e) => handleStatusChange(day.date, e.target.value)}
                                    className="w-40 px-3 py-1 text-sm border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                                >
                                    <option value="Present">Present (P)</option>
                                    <option value="Absent">Absent (A)</option>
                                    <option value="Late">Late (L)</option>
                                </select>
                            </div>
                        ))}
                    </div>

                </div>

                {/* Modal Footer */}
                <div className="p-5 border-t flex justify-end space-x-3 bg-gray-50 rounded-b-xl">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors shadow-sm"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors shadow-md"
                    >
                        Save Record
                    </button>
                </div>
            </div>
        </div>
    );
};


// --- Main Attendance Page Component ---

const AttendancePage = () => {
  // Directly use the embedded config
  const { filters, page_config } = attendanceConfig;
  
  // Initialize filter states
  const [selectedMonth, setSelectedMonth] = useState(filters.months[0].value);
  const [selectedAcademic, setSelectedAcademic] = useState(filters.academics[0].value);
  const [selectedSemester, setSelectedSemester] = useState(filters.semesters[0].value);
  const [selectedSubject, setSelectedSubject] = useState(filters.subjects[0].value);
  const [selectedAttendanceType, setSelectedAttendanceType] = useState(filters.attendance_types[0].value);
  const [searchTerm, setSearchTerm] = useState('');

  const [allAttendanceRecords, setAllAttendanceRecords] = useState([]);
  const [daysInMonth, setDaysInMonth] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  
  // --- New State for Modals ---
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [deletingStudent, setDeletingStudent] = useState(null); // { id, name }

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);

  const itemsPerPage = page_config.items_per_page;

  // --- Data Generation/Refresh Logic ---
  useEffect(() => {
    // Find the total days for the selected month from the config
    const currentMonthConfig = filters.months.find(m => m.value === selectedMonth);
    const totalDays = currentMonthConfig ? currentMonthConfig.totalDays : 31;

    // Use the dynamic generator function
    const { days, attendanceRecords } = generateAttendanceData(selectedMonth, totalDays, filters);
    
    // Filter out weekends for display headers and store only weekdays for the table
    const weekdaysOnly = days.filter(day => !day.isWeekend);
    
    setDaysInMonth(weekdaysOnly); 
    setAllAttendanceRecords(attendanceRecords); // Store all records before filtering
    setCurrentPage(1); // Reset to first page on filter change
  }, [selectedMonth]); 

  // --- Action Handlers (Edit & Delete) ---

  // Function to open the delete confirmation modal
  const openDeleteConfirm = (record) => {
    setDeletingStudent(record);
    setIsDeleteConfirmOpen(true);
  };

  // Function to close the delete confirmation modal
  const closeDeleteConfirm = () => {
    setIsDeleteConfirmOpen(false);
    setDeletingStudent(null);
  };

  // Function to confirm and delete the record
  const confirmDelete = () => {
    if (deletingStudent) {
      // Simulate deletion by filtering the state
      setAllAttendanceRecords(prevRecords => 
        prevRecords.filter(record => record.id !== deletingStudent.id)
      );
      // Pagination/Filter logic will auto-recalculate via useMemo
      closeDeleteConfirm();
    }
  };

  // Function to open the edit modal
  const openEditModal = (record) => {
    setEditingStudent(record);
    setIsEditModalOpen(true);
  };

  // Function to close the edit modal
  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setEditingStudent(null);
  };

  // Function to update the record
  const confirmUpdate = (updatedRecord) => {
    setAllAttendanceRecords(prevRecords => 
      prevRecords.map(record => 
        record.id === updatedRecord.id ? updatedRecord : record
      )
    );
    closeEditModal();
  };

  // --- Filtering Logic (Search and Attendance Type) ---
  const filteredData = useMemo(() => {
    let data = allAttendanceRecords;

    // 1. Filter by Search Term (Name or ID)
    if (searchTerm) {
      const termLower = searchTerm.toLowerCase();
      data = data.filter(record => 
        record.name.toLowerCase().includes(termLower) ||
        String(record.id).includes(termLower)
      );
    }

    // 2. Filter by Attendance Type (if not 'all')
    if (selectedAttendanceType !== 'all') {
        const targetStatus = selectedAttendanceType.charAt(0).toUpperCase() + selectedAttendanceType.slice(1);

        // Filter students who have the selected status *at least once* in the displayed month
        data = data.filter(record => 
            Object.values(record.dailyAttendance).some(status => status === targetStatus)
        );
    }
    
    return data;

  }, [allAttendanceRecords, searchTerm, selectedAttendanceType]);


  // --- Pagination Logic ---
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredData, currentPage, itemsPerPage]);

  const goToPreviousPage = () => setCurrentPage(prev => Math.max(1, prev - 1));
  const goToNextPage = () => setCurrentPage(prev => Math.min(totalPages, prev + 1));
  const goToPage = (pageNumber) => {
    if (typeof pageNumber === 'number' && pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };


  // Generate pagination numbers (for the ellipsis display)
  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 7; 

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      pageNumbers.push(1);
      if (currentPage > 3) pageNumbers.push('...');

      if (currentPage > 2 && currentPage < totalPages - 1) {
        pageNumbers.push(currentPage - 1);
        pageNumbers.push(currentPage);
        pageNumbers.push(currentPage + 1);
      } else if (currentPage <= 2) {
        pageNumbers.push(2);
        pageNumbers.push(3);
      } else if (currentPage >= totalPages - 1) {
        pageNumbers.push(totalPages - 2);
        pageNumbers.push(totalPages - 1);
      }

      if (currentPage < totalPages - 2) pageNumbers.push('...');
      pageNumbers.push(totalPages);
    }
    
    // Remove duplicates and ensure numbers are valid
    return Array.from(new Set(pageNumbers)).filter(page => page > 0);
  };
  
  // --- Render Logic ---

  return (
    <div className="p-4 sm:p-6 bg-gray-50 min-h-screen font-sans">
      
      {/* Title and Filter Section (Flat Style) */}
      <div className="flex flex-wrap items-center justify-start py-2 border-b border-gray-200 mb-6 bg-white/50 sticky top-0 z-20">
        <h1 className="text-xl font-semibold text-gray-900 mr-2">
          {page_config.title} 
        </h1>
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 shadow-sm">
          {allAttendanceRecords.length} users
        </span>
        
        {/* Dropdowns */}
        <div className="flex items-center ml-8 flex-wrap">
          <Dropdown
            selectedValue={selectedMonth}
            onChange={setSelectedMonth}
            options={filters.months}
            title="Month"
          />
          <Dropdown
            selectedValue={selectedAcademic}
            onChange={setSelectedAcademic}
            options={filters.academics}
            title="Academic"
          />
          <Dropdown
            selectedValue={selectedSemester}
            onChange={setSelectedSemester}
            options={filters.semesters}
            title="Semester"
          />
          <Dropdown
            selectedValue={selectedSubject}
            onChange={setSelectedSubject}
            options={filters.subjects}
            title="Subject"
          />
          {/* Filter by Attendance Type */}
          <Dropdown
            selectedValue={selectedAttendanceType}
            onChange={setSelectedAttendanceType}
            options={filters.attendance_types}
            title="Type"
          />
        </div>
      </div>

      {/* Attendance Table Container */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50 sticky top-[60px] z-10">
              <tr>
                <th scope="col" className="p-4 w-12 text-center border-r border-gray-200">
                  <input type="checkbox" className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded" />
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[180px] border-r border-gray-200">
                  Name
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[100px] border-r border-gray-200">
                  Attendance
                </th>
                {/* Dynamic Day Headers */}
                {daysInMonth.map((day) => {
                    // Use new utility to parse the date string
                    const dateObj = parseISOString(day.date);
                    return (
                        <th
                            key={day.date}
                            scope="col"
                            className="p-1 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-[50px] min-w-[50px] border-r border-gray-100"
                        >
                            <div className="font-semibold text-gray-700 text-[10px]">{simpleFormat(dateObj, 'EE')}</div> 
                            <div className="text-xs font-normal text-gray-500">{simpleFormat(dateObj, 'd')}</div> 
                        </th>
                    );
                })}
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-24">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {paginatedData.map((record) => (
                  <tr key={record.id} className="hover:bg-blue-50/50 transition-colors duration-150">
                    <td className="p-4 text-center border-r border-gray-100">
                      <input type="checkbox" className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded" />
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap border-r border-gray-100">
                      <div className="flex items-center">
                        <div className="h-8 w-8 flex-shrink-0 bg-blue-900 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md ring-1 ring-blue-700/10 mr-3">
                          {record.initials}
                        </div>
                        <div className="flex flex-col">
                          <div className="text-sm font-medium text-gray-900">{record.name}</div>
                          <div className="text-xs text-gray-500">{record.username}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap border-r border-gray-100">
                      <div className="flex flex-col items-start">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            {record.classesAttended} / {record.totalClasses}
                          </span>
                          <div className="text-[10px] text-gray-500 mt-1 font-medium">
                              {record.totalClasses > 0 ? ((record.classesAttended / record.totalClasses) * 100).toFixed(0) : 0}% 
                          </div>
                      </div>
                    </td>
                    {/* Dynamic Daily Attendance */}
                    {daysInMonth.map((day) => {
                      const status = record.dailyAttendance[day.date];
                      
                      let statusClasses = '';
                      let displayStatus = status ? status.substring(0,1) : '-';

                      if (status === 'Present') {
                          statusClasses = 'bg-green-100 text-green-800';
                          displayStatus = 'P';
                      }
                      else if (status === 'Absent') {
                          statusClasses = 'bg-red-100 text-red-800';
                          displayStatus = 'A';
                      }
                      else if (status === 'Late') {
                          statusClasses = 'bg-yellow-100 text-yellow-800';
                          displayStatus = 'L';
                      }

                      return (
                        <td key={day.date} className={`px-1 py-3 whitespace-nowrap text-xs text-center font-medium border-r border-gray-100`}>
                          <span title={status} className={`
                            ${statusClasses}
                            inline-flex items-center justify-center w-6 h-6 rounded-full text-[11px] font-semibold
                          `}>
                            {displayStatus}
                          </span>
                        </td>
                      );
                    })}
                    <td className="px-4 py-3 whitespace-nowrap text-center text-sm font-medium">
                      {/* Edit Button with Handler */}
                      <button 
                        title="Edit Attendance" 
                        onClick={() => openEditModal(record)}
                        className="text-gray-400 hover:text-indigo-600 transition-colors duration-150 p-1 rounded-full hover:bg-indigo-50"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      {/* Delete Button with Handler */}
                      <button 
                        title="Delete Record" 
                        onClick={() => openDeleteConfirm(record)}
                        className="text-gray-400 hover:text-red-600 ml-1 transition-colors duration-150 p-1 rounded-full hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
              ))}
            </tbody>
          </table>
          {paginatedData.length === 0 && (
            <div className="text-center py-12 text-gray-500">
                No attendance records found matching the current filters and search term.
            </div>
          )}
        </div>

        {/* Pagination & Search Bottom Bar */}
        <div className="px-4 py-3 flex items-center justify-between border-t border-gray-200 bg-gray-50 rounded-b-xl">
            <div className="flex items-center space-x-4">
                {/* Search Box on bottom left (as seen in some dashboards) */}
                <div className="relative"> 
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="Search student or ID"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="block w-48 pl-10 pr-4 py-1.5 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm shadow-sm transition-shadow"
                  />
                </div>
            </div>
          
            {/* Pagination Controls */}
            <div>
              <nav className="relative z-0 inline-flex -space-x-px rounded-lg shadow-sm" aria-label="Pagination">
                <button
                  onClick={goToPreviousPage}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center rounded-l-lg px-2 py-1 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-150"
                >
                  Previous
                </button>
                {renderPageNumbers().map((page, index) => (
                  <button
                    key={index}
                    onClick={() => goToPage(page)}
                    disabled={typeof page !== 'number'}
                    className={`
                      relative inline-flex items-center px-3 py-1 border border-gray-300 text-sm font-medium transition-all duration-150
                      ${currentPage === page ? 'z-10 bg-orange-500 border-orange-500 text-white font-bold' : 'bg-white text-gray-700 hover:bg-gray-50'}
                      ${typeof page !== 'number' ? 'cursor-default text-gray-500' : ''}
                    `}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={goToNextPage}
                  disabled={currentPage === totalPages || totalPages === 0}
                  className="relative inline-flex items-center rounded-r-lg px-2 py-1 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-150"
                >
                  Next
                </button>
              </nav>
            </div>
        </div>
      </div>
      
      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={isDeleteConfirmOpen}
        onClose={closeDeleteConfirm}
        onConfirm={confirmDelete}
        studentName={deletingStudent?.name}
      />

      {/* Edit Modal */}
      <EditModal
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        onUpdate={confirmUpdate}
        student={editingStudent}
        daysInMonth={daysInMonth}
      />
    </div>
  );
};

export default AttendancePage;