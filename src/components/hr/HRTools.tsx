import React, { useState, useEffect } from 'react';
import { Users, DollarSign, Calendar, FileText, TrendingUp, Brain, Zap, Shield, Clock, Award, Target, CreditCard, Building, User, Bot, Eye, Heart, MessageSquare, Settings, Download, Upload, Search, Filter, Plus, X, CheckCircle, AlertTriangle, MapPin, Phone, Mail } from 'lucide-react';

interface HRToolsProps {
  onClose: () => void;
}

interface Employee {
  id: string;
  name: string;
  position: string;
  department: string;
  salary: number;
  currency: string;
  joinDate: string;
  performance: number;
  avatar: string;
  status: 'active' | 'on-leave' | 'remote' | 'terminated';
  skills: string[];
  nextPayment: string;
  paymentMethod: 'bank' | 'crypto' | 'quantum-wallet';
  aiScore: number;
  wellnessScore: number;
  email: string;
  phone: string;
  address: string;
  emergencyContact: string;
  leaveBalance: number;
  attendanceScore: number;
}

interface AttendanceRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  date: string;
  checkIn: string;
  checkOut: string;
  totalHours: number;
  status: 'present' | 'late' | 'absent' | 'half-day' | 'work-from-home';
  location: string;
  notes?: string;
}

interface LeaveRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  leaveType: 'vacation' | 'sick' | 'personal' | 'maternity' | 'emergency';
  startDate: string;
  endDate: string;
  days: number;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  approvedBy?: string;
  submittedDate: string;
  aiRecommendation: 'approve' | 'review' | 'deny';
  aiConfidence: number;
}

export const HRTools: React.FC<HRToolsProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'employees' | 'payroll' | 'attendance' | 'leave' | 'analytics' | 'ai-hr'>('dashboard');
  const [selectedEmployee, setSelectedEmployee] = useState<string | null>(null);
  const [payrollFilter, setPayrollFilter] = useState<'all' | 'pending' | 'completed'>('all');
  const [attendanceFilter, setAttendanceFilter] = useState<'today' | 'week' | 'month'>('today');
  const [leaveFilter, setLeaveFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('pending');
  const [searchTerm, setSearchTerm] = useState('');

  const employees: Employee[] = [
    {
      id: '1',
      name: 'Sarah Chen',
      position: 'Senior Quantum Engineer',
      department: 'Engineering',
      salary: 180000,
      currency: 'USD',
      joinDate: '2049-03-15',
      performance: 94,
      avatar: 'SC',
      status: 'active',
      skills: ['Quantum Computing', 'AI', 'Neural Networks'],
      nextPayment: '2050-01-31',
      paymentMethod: 'quantum-wallet',
      aiScore: 96,
      wellnessScore: 87,
      email: 'sarah.chen@linkverse.com',
      phone: '+1-555-0123',
      address: '123 Quantum St, San Francisco, CA',
      emergencyContact: 'John Chen (+1-555-0124)',
      leaveBalance: 18,
      attendanceScore: 96
    },
    {
      id: '2',
      name: 'Marcus Rodriguez',
      position: 'Metaverse Designer',
      department: 'Design',
      salary: 145000,
      currency: 'USD',
      joinDate: '2049-06-20',
      performance: 89,
      avatar: 'MR',
      status: 'remote',
      skills: ['3D Design', 'VR/AR', 'Spatial Computing'],
      nextPayment: '2050-01-31',
      paymentMethod: 'crypto',
      aiScore: 91,
      wellnessScore: 92,
      email: 'marcus.rodriguez@linkverse.com',
      phone: '+1-555-0125',
      address: '456 Design Ave, Austin, TX',
      emergencyContact: 'Maria Rodriguez (+1-555-0126)',
      leaveBalance: 22,
      attendanceScore: 88
    },
    {
      id: '3',
      name: 'Emily Davis',
      position: 'AI Product Manager',
      department: 'Product',
      salary: 165000,
      currency: 'USD',
      joinDate: '2048-11-10',
      performance: 97,
      avatar: 'ED',
      status: 'active',
      skills: ['Product Strategy', 'AI/ML', 'Leadership'],
      nextPayment: '2050-01-31',
      paymentMethod: 'bank',
      aiScore: 98,
      wellnessScore: 85,
      email: 'emily.davis@linkverse.com',
      phone: '+1-555-0127',
      address: '789 Innovation Blvd, Seattle, WA',
      emergencyContact: 'Robert Davis (+1-555-0128)',
      leaveBalance: 15,
      attendanceScore: 99
    }
  ];

  const attendanceRecords: AttendanceRecord[] = [
    {
      id: '1',
      employeeId: '1',
      employeeName: 'Sarah Chen',
      date: '2050-01-15',
      checkIn: '09:00 AM',
      checkOut: '06:30 PM',
      totalHours: 9.5,
      status: 'present',
      location: 'Office - Quantum Lab',
      notes: 'Working on neural interface project'
    },
    {
      id: '2',
      employeeId: '2',
      employeeName: 'Marcus Rodriguez',
      date: '2050-01-15',
      checkIn: '10:15 AM',
      checkOut: '07:00 PM',
      totalHours: 8.75,
      status: 'work-from-home',
      location: 'Remote - Austin Office',
      notes: 'Metaverse design session'
    },
    {
      id: '3',
      employeeId: '3',
      employeeName: 'Emily Davis',
      date: '2050-01-15',
      checkIn: '08:45 AM',
      checkOut: '05:45 PM',
      totalHours: 9,
      status: 'present',
      location: 'Office - Product Suite',
      notes: 'Client presentation preparation'
    },
    {
      id: '4',
      employeeId: '1',
      employeeName: 'Sarah Chen',
      date: '2050-01-14',
      checkIn: '09:30 AM',
      checkOut: '06:00 PM',
      totalHours: 8.5,
      status: 'late',
      location: 'Office - Quantum Lab',
      notes: 'Traffic delay due to quantum storm'
    }
  ];

  const leaveRequests: LeaveRequest[] = [
    {
      id: '1',
      employeeId: '1',
      employeeName: 'Sarah Chen',
      leaveType: 'vacation',
      startDate: '2050-02-15',
      endDate: '2050-02-22',
      days: 6,
      reason: 'Family vacation to Mars Colony',
      status: 'pending',
      submittedDate: '2050-01-10',
      aiRecommendation: 'approve',
      aiConfidence: 92
    },
    {
      id: '2',
      employeeId: '2',
      employeeName: 'Marcus Rodriguez',
      leaveType: 'sick',
      startDate: '2050-01-20',
      endDate: '2050-01-22',
      days: 3,
      reason: 'Neural interface calibration recovery',
      status: 'approved',
      approvedBy: 'HR Manager',
      submittedDate: '2050-01-18',
      aiRecommendation: 'approve',
      aiConfidence: 98
    },
    {
      id: '3',
      employeeId: '3',
      employeeName: 'Emily Davis',
      leaveType: 'personal',
      startDate: '2050-03-01',
      endDate: '2050-03-03',
      days: 3,
      reason: 'Quantum meditation retreat',
      status: 'pending',
      submittedDate: '2050-01-12',
      aiRecommendation: 'review',
      aiConfidence: 75
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
      case 'present':
      case 'approved': return 'text-green-400 bg-green-600/20';
      case 'remote':
      case 'work-from-home': return 'text-blue-400 bg-blue-600/20';
      case 'on-leave':
      case 'pending': return 'text-yellow-400 bg-yellow-600/20';
      case 'terminated':
      case 'absent':
      case 'rejected': return 'text-red-400 bg-red-600/20';
      case 'late': return 'text-orange-400 bg-orange-600/20';
      case 'half-day': return 'text-purple-400 bg-purple-600/20';
      default: return 'text-gray-400 bg-gray-600/20';
    }
  };

  const getLeaveTypeColor = (type: string) => {
    switch (type) {
      case 'vacation': return 'text-blue-400 bg-blue-600/20';
      case 'sick': return 'text-red-400 bg-red-600/20';
      case 'personal': return 'text-purple-400 bg-purple-600/20';
      case 'maternity': return 'text-pink-400 bg-pink-600/20';
      case 'emergency': return 'text-orange-400 bg-orange-600/20';
      default: return 'text-gray-400 bg-gray-600/20';
    }
  };

  const getAIRecommendationColor = (recommendation: string) => {
    switch (recommendation) {
      case 'approve': return 'text-green-400';
      case 'review': return 'text-yellow-400';
      case 'deny': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const approveLeave = (leaveId: string) => {
    console.log('Approving leave request:', leaveId);
  };

  const rejectLeave = (leaveId: string) => {
    console.log('Rejecting leave request:', leaveId);
  };

  const markAttendance = (employeeId: string, status: string) => {
    console.log('Marking attendance for employee:', employeeId, 'Status:', status);
  };

  const filteredAttendance = attendanceRecords.filter(record => {
    const recordDate = new Date(record.date);
    const today = new Date();
    
    switch (attendanceFilter) {
      case 'today':
        return recordDate.toDateString() === today.toDateString();
      case 'week':
        const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
        return recordDate >= weekAgo;
      case 'month':
        const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
        return recordDate >= monthAgo;
      default:
        return true;
    }
  });

  const filteredLeaveRequests = leaveRequests.filter(request => {
    if (leaveFilter === 'all') return true;
    return request.status === leaveFilter;
  });

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-xl flex items-center justify-center z-50 p-2 sm:p-4">
      <div className="w-full max-w-7xl h-full max-h-[95vh] bg-gradient-to-br from-green-900/30 to-blue-900/30 backdrop-blur-xl rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl border border-green-500/20">
        {/* Header */}
        <div className="p-3 sm:p-6 border-b border-green-500/20 bg-black/30">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
            <div className="flex items-center space-x-3 sm:space-x-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl flex items-center justify-center">
                <Users className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg sm:text-2xl font-bold text-white">Linkverse HR 2050</h1>
                <p className="text-sm sm:text-base text-green-300">AI-powered workforce management & quantum payroll</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 sm:space-x-4">
              <div className="flex items-center space-x-2 bg-green-600/20 px-2 sm:px-3 py-1 rounded-lg">
                <Shield className="w-3 h-3 sm:w-4 sm:h-4 text-green-400" />
                <span className="text-green-400 text-xs sm:text-sm font-semibold">Quantum Secure</span>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="grid grid-cols-3 sm:flex sm:space-x-2 gap-1 sm:gap-0 mt-4 sm:mt-6">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: TrendingUp },
              { id: 'employees', label: 'Workforce', icon: Users },
              { id: 'attendance', label: 'Attendance', icon: Clock },
              { id: 'leave', label: 'Leave', icon: Calendar },
              { id: 'payroll', label: 'Payroll', icon: DollarSign },
              { id: 'analytics', label: 'Analytics', icon: Brain },
              { id: 'ai-hr', label: 'AI HR', icon: Bot }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center justify-center sm:justify-start space-x-1 sm:space-x-2 px-2 sm:px-4 py-2 rounded-lg transition-all text-xs sm:text-sm ${
                  activeTab === tab.id
                    ? 'bg-green-600 text-white'
                    : 'text-gray-400 hover:bg-green-600/20 hover:text-white'
                }`}
              >
                <tab.icon className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row h-full">
          {/* Main Content */}
          <div className="flex-1 overflow-y-auto p-3 sm:p-6">
            {/* Attendance Tab */}
            {activeTab === 'attendance' && (
              <div className="space-y-4 sm:space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
                  <h2 className="text-lg sm:text-xl font-bold text-white">Attendance Management</h2>
                  <div className="flex space-x-2">
                    <button className="px-3 sm:px-4 py-2 bg-blue-600 rounded-lg text-white hover:bg-blue-700 transition-colors flex items-center space-x-2 text-sm">
                      <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span>Mark Attendance</span>
                    </button>
                    <button className="px-3 sm:px-4 py-2 bg-green-600 rounded-lg text-white hover:bg-green-700 transition-colors flex items-center space-x-2 text-sm">
                      <Brain className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span>AI Analysis</span>
                    </button>
                  </div>
                </div>

                {/* Attendance Summary Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
                  <div className="bg-black/30 rounded-xl p-3 sm:p-4 border border-green-500/20">
                    <div className="flex items-center justify-between mb-2">
                      <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-green-400" />
                      <span className="text-lg sm:text-2xl font-bold text-white">82</span>
                    </div>
                    <p className="text-gray-400 text-xs sm:text-sm">Present Today</p>
                    <p className="text-green-400 text-xs">95.3% attendance</p>
                  </div>

                  <div className="bg-black/30 rounded-xl p-3 sm:p-4 border border-yellow-500/20">
                    <div className="flex items-center justify-between mb-2">
                      <Clock className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-400" />
                      <span className="text-lg sm:text-2xl font-bold text-white">3</span>
                    </div>
                    <p className="text-gray-400 text-xs sm:text-sm">Late Arrivals</p>
                    <p className="text-yellow-400 text-xs">Traffic delays</p>
                  </div>

                  <div className="bg-black/30 rounded-xl p-3 sm:p-4 border border-blue-500/20">
                    <div className="flex items-center justify-between mb-2">
                      <Users className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400" />
                      <span className="text-lg sm:text-2xl font-bold text-white">28</span>
                    </div>
                    <p className="text-gray-400 text-xs sm:text-sm">Remote Work</p>
                    <p className="text-blue-400 text-xs">Hybrid model</p>
                  </div>

                  <div className="bg-black/30 rounded-xl p-3 sm:p-4 border border-red-500/20">
                    <div className="flex items-center justify-between mb-2">
                      <AlertTriangle className="w-6 h-6 sm:w-8 sm:h-8 text-red-400" />
                      <span className="text-lg sm:text-2xl font-bold text-white">1</span>
                    </div>
                    <p className="text-gray-400 text-xs sm:text-sm">Absent</p>
                    <p className="text-red-400 text-xs">Sick leave</p>
                  </div>
                </div>

                {/* Attendance Filter */}
                <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
                  <div className="flex space-x-2">
                    {['today', 'week', 'month'].map((filter) => (
                      <button
                        key={filter}
                        onClick={() => setAttendanceFilter(filter as any)}
                        className={`px-3 py-1 rounded-lg text-xs sm:text-sm transition-all ${
                          attendanceFilter === filter
                            ? 'bg-green-600 text-white'
                            : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        }`}
                      >
                        {filter.charAt(0).toUpperCase() + filter.slice(1)}
                      </button>
                    ))}
                  </div>
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search attendance records..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 bg-gray-800/50 border border-green-500/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-green-500 text-sm"
                    />
                  </div>
                </div>

                {/* Attendance Records */}
                <div className="space-y-3 sm:space-y-4">
                  {filteredAttendance.map((record) => (
                    <div key={record.id} className="bg-black/30 rounded-xl p-4 sm:p-6 border border-green-500/20">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
                        <div className="flex items-center space-x-3 sm:space-x-4">
                          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                            {record.employeeName.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <h3 className="font-semibold text-white text-sm sm:text-base">{record.employeeName}</h3>
                            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-1 sm:space-y-0 text-xs sm:text-sm text-gray-400">
                              <span>{record.date}</span>
                              <span>{record.location}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                          <div className="grid grid-cols-2 sm:flex sm:space-x-4 gap-2 sm:gap-0 text-xs sm:text-sm">
                            <div className="text-center sm:text-left">
                              <p className="text-gray-400">Check In</p>
                              <p className="text-green-400 font-semibold">{record.checkIn}</p>
                            </div>
                            <div className="text-center sm:text-left">
                              <p className="text-gray-400">Check Out</p>
                              <p className="text-blue-400 font-semibold">{record.checkOut}</p>
                            </div>
                            <div className="text-center sm:text-left">
                              <p className="text-gray-400">Total Hours</p>
                              <p className="text-purple-400 font-semibold">{record.totalHours}h</p>
                            </div>
                            <div className="text-center sm:text-left">
                              <span className={`px-2 py-1 rounded text-xs font-semibold ${getStatusColor(record.status)}`}>
                                {record.status.replace('-', ' ').toUpperCase()}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {record.notes && (
                        <div className="mt-3 p-3 bg-gray-800/50 rounded-lg">
                          <p className="text-gray-300 text-xs sm:text-sm">{record.notes}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Leave Management Tab */}
            {activeTab === 'leave' && (
              <div className="space-y-4 sm:space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
                  <h2 className="text-lg sm:text-xl font-bold text-white">Leave Management</h2>
                  <div className="flex space-x-2">
                    <button className="px-3 sm:px-4 py-2 bg-blue-600 rounded-lg text-white hover:bg-blue-700 transition-colors flex items-center space-x-2 text-sm">
                      <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span>New Request</span>
                    </button>
                    <button className="px-3 sm:px-4 py-2 bg-green-600 rounded-lg text-white hover:bg-green-700 transition-colors flex items-center space-x-2 text-sm">
                      <Brain className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span>AI Insights</span>
                    </button>
                  </div>
                </div>

                {/* Leave Summary */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
                  <div className="bg-black/30 rounded-xl p-3 sm:p-4 border border-yellow-500/20">
                    <div className="flex items-center justify-between mb-2">
                      <Calendar className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-400" />
                      <span className="text-lg sm:text-2xl font-bold text-white">5</span>
                    </div>
                    <p className="text-gray-400 text-xs sm:text-sm">Pending Requests</p>
                    <p className="text-yellow-400 text-xs">Awaiting approval</p>
                  </div>

                  <div className="bg-black/30 rounded-xl p-3 sm:p-4 border border-green-500/20">
                    <div className="flex items-center justify-between mb-2">
                      <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-green-400" />
                      <span className="text-lg sm:text-2xl font-bold text-white">23</span>
                    </div>
                    <p className="text-gray-400 text-xs sm:text-sm">Approved</p>
                    <p className="text-green-400 text-xs">This month</p>
                  </div>

                  <div className="bg-black/30 rounded-xl p-3 sm:p-4 border border-blue-500/20">
                    <div className="flex items-center justify-between mb-2">
                      <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400" />
                      <span className="text-lg sm:text-2xl font-bold text-white">18.5</span>
                    </div>
                    <p className="text-gray-400 text-xs sm:text-sm">Avg Leave Balance</p>
                    <p className="text-blue-400 text-xs">Days remaining</p>
                  </div>

                  <div className="bg-black/30 rounded-xl p-3 sm:p-4 border border-purple-500/20">
                    <div className="flex items-center justify-between mb-2">
                      <Bot className="w-6 h-6 sm:w-8 sm:h-8 text-purple-400" />
                      <span className="text-lg sm:text-2xl font-bold text-white">94%</span>
                    </div>
                    <p className="text-gray-400 text-xs sm:text-sm">AI Accuracy</p>
                    <p className="text-purple-400 text-xs">Approval prediction</p>
                  </div>
                </div>

                {/* Leave Filter */}
                <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
                  <div className="flex space-x-2">
                    {['all', 'pending', 'approved', 'rejected'].map((filter) => (
                      <button
                        key={filter}
                        onClick={() => setLeaveFilter(filter as any)}
                        className={`px-3 py-1 rounded-lg text-xs sm:text-sm transition-all ${
                          leaveFilter === filter
                            ? 'bg-green-600 text-white'
                            : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        }`}
                      >
                        {filter.charAt(0).toUpperCase() + filter.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Leave Requests */}
                <div className="space-y-3 sm:space-y-4">
                  {filteredLeaveRequests.map((request) => (
                    <div key={request.id} className="bg-black/30 rounded-xl p-4 sm:p-6 border border-green-500/20">
                      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between space-y-4 lg:space-y-0">
                        <div className="flex items-start space-x-3 sm:space-x-4">
                          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                            {request.employeeName.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div className="flex-1">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3 space-y-1 sm:space-y-0 mb-2">
                              <h3 className="font-semibold text-white text-sm sm:text-base">{request.employeeName}</h3>
                              <span className={`px-2 py-1 rounded text-xs font-semibold ${getLeaveTypeColor(request.leaveType)} w-fit`}>
                                {request.leaveType.toUpperCase()}
                              </span>
                              <span className={`px-2 py-1 rounded text-xs font-semibold ${getStatusColor(request.status)} w-fit`}>
                                {request.status.toUpperCase()}
                              </span>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-gray-400 mb-3">
                              <span>From: {request.startDate}</span>
                              <span>To: {request.endDate}</span>
                              <span>Duration: {request.days} days</span>
                              <span>Submitted: {request.submittedDate}</span>
                            </div>
                            <p className="text-gray-300 text-sm">{request.reason}</p>
                          </div>
                        </div>
                        
                        <div className="flex flex-col space-y-3">
                          {/* AI Recommendation */}
                          <div className="bg-gray-800/50 rounded-lg p-3">
                            <div className="flex items-center space-x-2 mb-2">
                              <Bot className="w-4 h-4 text-purple-400" />
                              <span className="text-white font-medium text-sm">AI Recommendation</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className={`font-semibold text-sm ${getAIRecommendationColor(request.aiRecommendation)}`}>
                                {request.aiRecommendation.toUpperCase()}
                              </span>
                              <span className="text-gray-400 text-xs">{request.aiConfidence}% confidence</span>
                            </div>
                          </div>
                          
                          {/* Action Buttons */}
                          {request.status === 'pending' && (
                            <div className="flex space-x-2">
                              <button
                                onClick={() => approveLeave(request.id)}
                                className="px-3 py-2 bg-green-600 rounded-lg text-white hover:bg-green-700 transition-colors text-xs sm:text-sm"
                              >
                                Approve
                              </button>
                              <button
                                onClick={() => rejectLeave(request.id)}
                                className="px-3 py-2 bg-red-600 rounded-lg text-white hover:bg-red-700 transition-colors text-xs sm:text-sm"
                              >
                                Reject
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Dashboard Tab - Keep existing content but make responsive */}
            {activeTab === 'dashboard' && (
              <div className="space-y-4 sm:space-y-6">
                {/* Key Metrics */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
                  <div className="bg-black/30 rounded-xl p-3 sm:p-4 border border-green-500/20">
                    <div className="flex items-center justify-between mb-2">
                      <Users className="w-6 h-6 sm:w-8 sm:h-8 text-green-400" />
                      <span className="text-lg sm:text-2xl font-bold text-white">86</span>
                    </div>
                    <p className="text-gray-400 text-xs sm:text-sm">Total Employees</p>
                    <p className="text-green-400 text-xs">+12% this quarter</p>
                  </div>

                  <div className="bg-black/30 rounded-xl p-3 sm:p-4 border border-blue-500/20">
                    <div className="flex items-center justify-between mb-2">
                      <DollarSign className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400" />
                      <span className="text-lg sm:text-2xl font-bold text-white">$14.5M</span>
                    </div>
                    <p className="text-gray-400 text-xs sm:text-sm">Monthly Payroll</p>
                    <p className="text-blue-400 text-xs">Quantum processed</p>
                  </div>

                  <div className="bg-black/30 rounded-xl p-3 sm:p-4 border border-purple-500/20">
                    <div className="flex items-center justify-between mb-2">
                      <Brain className="w-6 h-6 sm:w-8 sm:h-8 text-purple-400" />
                      <span className="text-lg sm:text-2xl font-bold text-white">94%</span>
                    </div>
                    <p className="text-gray-400 text-xs sm:text-sm">AI Performance Score</p>
                    <p className="text-purple-400 text-xs">Above industry avg</p>
                  </div>

                  <div className="bg-black/30 rounded-xl p-3 sm:p-4 border border-yellow-500/20">
                    <div className="flex items-center justify-between mb-2">
                      <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-400" />
                      <span className="text-lg sm:text-2xl font-bold text-white">89%</span>
                    </div>
                    <p className="text-gray-400 text-xs sm:text-sm">Wellness Score</p>
                    <p className="text-yellow-400 text-xs">Excellent health</p>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-black/30 rounded-xl p-4 sm:p-6 border border-green-500/20">
                  <h2 className="text-lg sm:text-xl font-bold text-white mb-4">Recent HR Activity</h2>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 p-3 bg-gray-800/50 rounded-lg">
                      <DollarSign className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-sm">Monthly payroll processed successfully</p>
                        <p className="text-gray-400 text-xs">86 employees • $14.5M total • 2 min ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-gray-800/50 rounded-lg">
                      <Users className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-sm">New employee onboarded</p>
                        <p className="text-gray-400 text-xs">Alex Johnson • Quantum Engineer • 1 hour ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-gray-800/50 rounded-lg">
                      <Brain className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-sm">AI performance review completed</p>
                        <p className="text-gray-400 text-xs">Q4 2049 reviews • 94% avg score • 3 hours ago</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Keep other existing tabs but make them responsive */}
            {activeTab === 'employees' && (
              <div className="space-y-4 sm:space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
                  <h2 className="text-lg sm:text-xl font-bold text-white">Workforce Management</h2>
                  <div className="flex space-x-2">
                    <button className="px-3 sm:px-4 py-2 bg-blue-600 rounded-lg text-white hover:bg-blue-700 transition-colors flex items-center space-x-2 text-sm">
                      <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span>Add Employee</span>
                    </button>
                    <button className="px-3 sm:px-4 py-2 bg-green-600 rounded-lg text-white hover:bg-green-700 transition-colors flex items-center space-x-2 text-sm">
                      <Brain className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span>AI Analysis</span>
                    </button>
                  </div>
                </div>

                {/* Employee List - Made responsive */}
                <div className="space-y-4">
                  {employees.map((employee) => (
                    <div key={employee.id} className="bg-black/30 rounded-xl p-4 sm:p-6 border border-green-500/20 hover:border-green-500/40 transition-colors">
                      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between space-y-4 lg:space-y-0">
                        <div className="flex items-start space-x-3 sm:space-x-4">
                          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                            {employee.avatar}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3 space-y-1 sm:space-y-0 mb-2">
                              <h3 className="text-base sm:text-lg font-bold text-white">{employee.name}</h3>
                              <span className={`px-2 py-1 rounded text-xs font-semibold ${getStatusColor(employee.status)} w-fit`}>
                                {employee.status.toUpperCase()}
                              </span>
                            </div>
                            <p className="text-gray-300 mb-1 text-sm sm:text-base">{employee.position}</p>
                            <p className="text-gray-400 text-xs sm:text-sm">{employee.department}</p>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3 text-xs sm:text-sm">
                              <div className="flex items-center space-x-1">
                                <DollarSign className="w-3 h-3 sm:w-4 sm:h-4 text-green-400" />
                                <span className="text-green-400">${employee.salary.toLocaleString()}/year</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400" />
                                <span className="text-gray-400">Joined {employee.joinDate}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-purple-400" />
                                <span className="text-purple-400">Attendance: {employee.attendanceScore}%</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Heart className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400" />
                                <span className="text-yellow-400">Leave: {employee.leaveBalance} days</span>
                              </div>
                            </div>

                            <div className="flex flex-wrap gap-1 sm:gap-2 mt-3">
                              {employee.skills.map((skill, index) => (
                                <span key={index} className="px-2 py-1 bg-blue-600/20 text-blue-400 rounded text-xs">
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex flex-col space-y-3">
                          <div className="grid grid-cols-3 gap-2 sm:gap-4 text-center">
                            <div>
                              <p className="text-xs text-gray-400">Performance</p>
                              <p className="text-sm sm:text-lg font-bold text-green-400">{employee.performance}%</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-400">AI Score</p>
                              <p className="text-sm sm:text-lg font-bold text-purple-400">{employee.aiScore}/100</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-400">Wellness</p>
                              <p className="text-sm sm:text-lg font-bold text-yellow-400">{employee.wellnessScore}%</p>
                            </div>
                          </div>
                          
                          <div className="flex space-x-2">
                            <button className="p-2 bg-green-600 rounded-lg text-white hover:bg-green-700 transition-colors">
                              <DollarSign className="w-3 h-3 sm:w-4 sm:h-4" />
                            </button>
                            <button className="p-2 bg-blue-600 rounded-lg text-white hover:bg-blue-700 transition-colors">
                              <MessageSquare className="w-3 h-3 sm:w-4 sm:h-4" />
                            </button>
                            <button className="p-2 bg-gray-700 rounded-lg text-gray-300 hover:bg-gray-600 transition-colors">
                              <Settings className="w-3 h-3 sm:w-4 sm:h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar - Made responsive */}
          <div className="w-full lg:w-80 bg-black/30 border-t lg:border-t-0 lg:border-l border-green-500/20 p-3 sm:p-6">
            <div className="space-y-4 sm:space-y-6">
              {/* Quick Actions */}
              <div className="bg-gray-800/50 rounded-lg p-3 sm:p-4">
                <h3 className="font-semibold text-white mb-3 text-sm sm:text-base">Quick Actions</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2">
                  <button className="w-full p-2 bg-green-600 rounded-lg text-white hover:bg-green-700 transition-colors text-xs sm:text-sm">
                    Process Monthly Payroll
                  </button>
                  <button className="w-full p-2 bg-blue-600 rounded-lg text-white hover:bg-blue-700 transition-colors text-xs sm:text-sm">
                    Generate AI Report
                  </button>
                  <button className="w-full p-2 bg-purple-600 rounded-lg text-white hover:bg-purple-700 transition-colors text-xs sm:text-sm">
                    Schedule Performance Reviews
                  </button>
                  <button className="w-full p-2 bg-yellow-600 rounded-lg text-white hover:bg-yellow-700 transition-colors text-xs sm:text-sm">
                    Wellness Check-in
                  </button>
                  <button className="w-full p-2 bg-orange-600 rounded-lg text-white hover:bg-orange-700 transition-colors text-xs sm:text-sm">
                    Attendance Overview
                  </button>
                  <button className="w-full p-2 bg-cyan-600 rounded-lg text-white hover:bg-cyan-700 transition-colors text-xs sm:text-sm">
                    Leave Approvals
                  </button>
                </div>
              </div>

              {/* Upcoming Events */}
              <div className="bg-gray-800/50 rounded-lg p-3 sm:p-4">
                <h3 className="font-semibold text-white mb-3 text-sm sm:text-base">Upcoming Events</h3>
                <div className="space-y-3">
                  <div className="flex items-start space-x-2">
                    <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400 mt-0.5" />
                    <div>
                      <p className="text-xs sm:text-sm text-white">Payroll Processing</p>
                      <p className="text-xs text-gray-400">January 31, 2050</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-orange-400 mt-0.5" />
                    <div>
                      <p className="text-xs sm:text-sm text-white">Attendance Review</p>
                      <p className="text-xs text-gray-400">February 1, 2050</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Users className="w-3 h-3 sm:w-4 sm:h-4 text-green-400 mt-0.5" />
                    <div>
                      <p className="text-xs sm:text-sm text-white">Team Building Event</p>
                      <p className="text-xs text-gray-400">February 15, 2050</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Award className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 mt-0.5" />
                    <div>
                      <p className="text-xs sm:text-sm text-white">Performance Reviews</p>
                      <p className="text-xs text-gray-400">March 1, 2050</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* AI Recommendations */}
              <div className="bg-gray-800/50 rounded-lg p-3 sm:p-4">
                <h3 className="font-semibold text-white mb-3 text-sm sm:text-base">AI Recommendations</h3>
                <div className="space-y-3">
                  <div className="flex items-start space-x-2">
                    <Brain className="w-3 h-3 sm:w-4 sm:h-4 text-purple-400 mt-0.5" />
                    <div>
                      <p className="text-xs sm:text-sm text-gray-300">Implement flexible work hours</p>
                      <p className="text-xs text-gray-500">+8% productivity boost predicted</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Heart className="w-3 h-3 sm:w-4 sm:h-4 text-red-400 mt-0.5" />
                    <div>
                      <p className="text-xs sm:text-sm text-gray-300">Launch wellness program</p>
                      <p className="text-xs text-gray-500">Reduce sick days by 25%</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-orange-400 mt-0.5" />
                    <div>
                      <p className="text-xs sm:text-sm text-gray-300">Optimize attendance tracking</p>
                      <p className="text-xs text-gray-500">AI-powered insights available</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};