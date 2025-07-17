import React, { useState, useEffect } from 'react';
import { Users, DollarSign, Calendar, FileText, TrendingUp, Brain, Zap, Shield, Clock, Award, Target, CreditCard, Building, User, Bot, Eye, Heart, MessageSquare, Settings, Download, Upload, Search, Filter, Plus, X } from 'lucide-react';

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
}

interface PayrollTransaction {
  id: string;
  employeeId: string;
  employeeName: string;
  amount: number;
  currency: string;
  type: 'salary' | 'bonus' | 'overtime' | 'commission';
  status: 'pending' | 'processing' | 'completed' | 'failed';
  date: string;
  paymentMethod: string;
  aiVerified: boolean;
}

interface Department {
  id: string;
  name: string;
  employees: number;
  budget: number;
  performance: number;
  aiInsights: string[];
}

export const HRTools: React.FC<HRToolsProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'employees' | 'payroll' | 'analytics' | 'ai-hr'>('dashboard');
  const [selectedEmployee, setSelectedEmployee] = useState<string | null>(null);
  const [payrollFilter, setPayrollFilter] = useState<'all' | 'pending' | 'completed'>('all');
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
      wellnessScore: 87
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
      wellnessScore: 92
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
      wellnessScore: 85
    }
  ];

  const payrollTransactions: PayrollTransaction[] = [
    {
      id: '1',
      employeeId: '1',
      employeeName: 'Sarah Chen',
      amount: 15000,
      currency: 'USD',
      type: 'salary',
      status: 'completed',
      date: '2050-01-01',
      paymentMethod: 'Quantum Wallet',
      aiVerified: true
    },
    {
      id: '2',
      employeeId: '2',
      employeeName: 'Marcus Rodriguez',
      amount: 12083,
      currency: 'USD',
      type: 'salary',
      status: 'processing',
      date: '2050-01-01',
      paymentMethod: 'Crypto Transfer',
      aiVerified: true
    },
    {
      id: '3',
      employeeId: '3',
      employeeName: 'Emily Davis',
      amount: 13750,
      currency: 'USD',
      type: 'salary',
      status: 'pending',
      date: '2050-01-01',
      paymentMethod: 'Bank Transfer',
      aiVerified: true
    },
    {
      id: '4',
      employeeId: '1',
      employeeName: 'Sarah Chen',
      amount: 5000,
      currency: 'USD',
      type: 'bonus',
      status: 'completed',
      date: '2049-12-25',
      paymentMethod: 'Quantum Wallet',
      aiVerified: true
    }
  ];

  const departments: Department[] = [
    {
      id: '1',
      name: 'Engineering',
      employees: 45,
      budget: 8500000,
      performance: 94,
      aiInsights: ['High innovation rate', 'Excellent collaboration', 'Above average retention']
    },
    {
      id: '2',
      name: 'Design',
      employees: 23,
      budget: 3200000,
      performance: 89,
      aiInsights: ['Creative excellence', 'Strong user focus', 'Growing team satisfaction']
    },
    {
      id: '3',
      name: 'Product',
      employees: 18,
      budget: 2800000,
      performance: 96,
      aiInsights: ['Strategic leadership', 'Market alignment', 'High impact delivery']
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-400 bg-green-600/20';
      case 'remote': return 'text-blue-400 bg-blue-600/20';
      case 'on-leave': return 'text-yellow-400 bg-yellow-600/20';
      case 'terminated': return 'text-red-400 bg-red-600/20';
      default: return 'text-gray-400 bg-gray-600/20';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-400 bg-green-600/20';
      case 'processing': return 'text-blue-400 bg-blue-600/20';
      case 'pending': return 'text-yellow-400 bg-yellow-600/20';
      case 'failed': return 'text-red-400 bg-red-600/20';
      default: return 'text-gray-400 bg-gray-600/20';
    }
  };

  const getPerformanceColor = (score: number) => {
    if (score >= 95) return 'text-green-400';
    if (score >= 85) return 'text-blue-400';
    if (score >= 75) return 'text-yellow-400';
    return 'text-orange-400';
  };

  const processPayroll = (employeeId: string) => {
    console.log('Processing payroll for employee:', employeeId);
    // Simulate AI-powered payroll processing
  };

  const generatePayrollReport = () => {
    console.log('Generating AI-powered payroll report');
  };

  const filteredTransactions = payrollTransactions.filter(transaction => {
    if (payrollFilter === 'all') return true;
    return transaction.status === payrollFilter;
  });

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-xl flex items-center justify-center z-50 p-4">
      <div className="w-full max-w-7xl h-full max-h-[95vh] bg-gradient-to-br from-green-900/30 to-blue-900/30 backdrop-blur-xl rounded-2xl overflow-hidden shadow-2xl border border-green-500/20">
        {/* Header */}
        <div className="p-6 border-b border-green-500/20 bg-black/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Linkverse HR 2050</h1>
                <p className="text-green-300">AI-powered workforce management & quantum payroll</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-green-600/20 px-3 py-1 rounded-lg">
                <Shield className="w-4 h-4 text-green-400" />
                <span className="text-green-400 text-sm font-semibold">Quantum Secure</span>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex space-x-2 mt-6">
            {[
              { id: 'dashboard', label: 'AI Dashboard', icon: TrendingUp },
              { id: 'employees', label: 'Workforce', icon: Users },
              { id: 'payroll', label: 'Quantum Payroll', icon: DollarSign },
              { id: 'analytics', label: 'Analytics', icon: Brain },
              { id: 'ai-hr', label: 'AI HR Assistant', icon: Bot }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                  activeTab === tab.id
                    ? 'bg-green-600 text-white'
                    : 'text-gray-400 hover:bg-green-600/20 hover:text-white'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex h-full">
          {/* Main Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {/* Dashboard Tab */}
            {activeTab === 'dashboard' && (
              <div className="space-y-6">
                {/* Key Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-black/30 rounded-xl p-4 border border-green-500/20">
                    <div className="flex items-center justify-between mb-2">
                      <Users className="w-8 h-8 text-green-400" />
                      <span className="text-2xl font-bold text-white">86</span>
                    </div>
                    <p className="text-gray-400 text-sm">Total Employees</p>
                    <p className="text-green-400 text-xs">+12% this quarter</p>
                  </div>

                  <div className="bg-black/30 rounded-xl p-4 border border-blue-500/20">
                    <div className="flex items-center justify-between mb-2">
                      <DollarSign className="w-8 h-8 text-blue-400" />
                      <span className="text-2xl font-bold text-white">$14.5M</span>
                    </div>
                    <p className="text-gray-400 text-sm">Monthly Payroll</p>
                    <p className="text-blue-400 text-xs">Quantum processed</p>
                  </div>

                  <div className="bg-black/30 rounded-xl p-4 border border-purple-500/20">
                    <div className="flex items-center justify-between mb-2">
                      <Brain className="w-8 h-8 text-purple-400" />
                      <span className="text-2xl font-bold text-white">94%</span>
                    </div>
                    <p className="text-gray-400 text-sm">AI Performance Score</p>
                    <p className="text-purple-400 text-xs">Above industry avg</p>
                  </div>

                  <div className="bg-black/30 rounded-xl p-4 border border-yellow-500/20">
                    <div className="flex items-center justify-between mb-2">
                      <Heart className="w-8 h-8 text-yellow-400" />
                      <span className="text-2xl font-bold text-white">89%</span>
                    </div>
                    <p className="text-gray-400 text-sm">Wellness Score</p>
                    <p className="text-yellow-400 text-xs">Excellent health</p>
                  </div>
                </div>

                {/* Department Overview */}
                <div className="bg-black/30 rounded-xl p-6 border border-green-500/20">
                  <h2 className="text-xl font-bold text-white mb-4">Department Performance</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {departments.map((dept) => (
                      <div key={dept.id} className="bg-gray-800/50 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="font-semibold text-white">{dept.name}</h3>
                          <span className={`text-lg font-bold ${getPerformanceColor(dept.performance)}`}>
                            {dept.performance}%
                          </span>
                        </div>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-400">Employees:</span>
                            <span className="text-white">{dept.employees}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Budget:</span>
                            <span className="text-green-400">${(dept.budget / 1000000).toFixed(1)}M</span>
                          </div>
                        </div>
                        <div className="mt-3">
                          <p className="text-xs text-gray-400 mb-1">AI Insights:</p>
                          {dept.aiInsights.slice(0, 2).map((insight, index) => (
                            <p key={index} className="text-xs text-blue-300">• {insight}</p>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-black/30 rounded-xl p-6 border border-green-500/20">
                  <h2 className="text-xl font-bold text-white mb-4">Recent HR Activity</h2>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 p-3 bg-gray-800/50 rounded-lg">
                      <DollarSign className="w-5 h-5 text-green-400" />
                      <div className="flex-1">
                        <p className="text-white text-sm">Monthly payroll processed successfully</p>
                        <p className="text-gray-400 text-xs">86 employees • $14.5M total • 2 min ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-gray-800/50 rounded-lg">
                      <Users className="w-5 h-5 text-blue-400" />
                      <div className="flex-1">
                        <p className="text-white text-sm">New employee onboarded</p>
                        <p className="text-gray-400 text-xs">Alex Johnson • Quantum Engineer • 1 hour ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-gray-800/50 rounded-lg">
                      <Brain className="w-5 h-5 text-purple-400" />
                      <div className="flex-1">
                        <p className="text-white text-sm">AI performance review completed</p>
                        <p className="text-gray-400 text-xs">Q4 2049 reviews • 94% avg score • 3 hours ago</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Employees Tab */}
            {activeTab === 'employees' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-white">Workforce Management</h2>
                  <div className="flex space-x-2">
                    <button className="px-4 py-2 bg-blue-600 rounded-lg text-white hover:bg-blue-700 transition-colors flex items-center space-x-2">
                      <Plus className="w-4 h-4" />
                      <span>Add Employee</span>
                    </button>
                    <button className="px-4 py-2 bg-green-600 rounded-lg text-white hover:bg-green-700 transition-colors flex items-center space-x-2">
                      <Brain className="w-4 h-4" />
                      <span>AI Analysis</span>
                    </button>
                  </div>
                </div>

                {/* Search and Filter */}
                <div className="flex items-center space-x-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search employees..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-green-500/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-green-500"
                    />
                  </div>
                  <button className="p-3 bg-gray-700 rounded-xl text-gray-300 hover:bg-gray-600 transition-colors">
                    <Filter className="w-5 h-5" />
                  </button>
                </div>

                {/* Employee List */}
                <div className="space-y-4">
                  {employees.map((employee) => (
                    <div key={employee.id} className="bg-black/30 rounded-xl p-6 border border-green-500/20 hover:border-green-500/40 transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                            {employee.avatar}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h3 className="text-lg font-bold text-white">{employee.name}</h3>
                              <span className={`px-2 py-1 rounded text-xs font-semibold ${getStatusColor(employee.status)}`}>
                                {employee.status.toUpperCase()}
                              </span>
                            </div>
                            <p className="text-gray-300 mb-1">{employee.position}</p>
                            <p className="text-gray-400 text-sm">{employee.department}</p>
                            
                            <div className="flex items-center space-x-4 mt-3 text-sm">
                              <div className="flex items-center space-x-1">
                                <DollarSign className="w-4 h-4 text-green-400" />
                                <span className="text-green-400">${employee.salary.toLocaleString()}/year</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Calendar className="w-4 h-4 text-blue-400" />
                                <span className="text-gray-400">Joined {employee.joinDate}</span>
                              </div>
                            </div>

                            <div className="flex flex-wrap gap-2 mt-3">
                              {employee.skills.map((skill, index) => (
                                <span key={index} className="px-2 py-1 bg-blue-600/20 text-blue-400 rounded text-xs">
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                        
                        <div className="text-right space-y-2">
                          <div className="flex items-center space-x-4">
                            <div className="text-center">
                              <p className="text-sm text-gray-400">Performance</p>
                              <p className={`text-lg font-bold ${getPerformanceColor(employee.performance)}`}>
                                {employee.performance}%
                              </p>
                            </div>
                            <div className="text-center">
                              <p className="text-sm text-gray-400">AI Score</p>
                              <p className={`text-lg font-bold ${getPerformanceColor(employee.aiScore)}`}>
                                {employee.aiScore}/100
                              </p>
                            </div>
                            <div className="text-center">
                              <p className="text-sm text-gray-400">Wellness</p>
                              <p className={`text-lg font-bold ${getPerformanceColor(employee.wellnessScore)}`}>
                                {employee.wellnessScore}%
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex space-x-2">
                            <button className="p-2 bg-green-600 rounded-lg text-white hover:bg-green-700 transition-colors">
                              <DollarSign className="w-4 h-4" />
                            </button>
                            <button className="p-2 bg-blue-600 rounded-lg text-white hover:bg-blue-700 transition-colors">
                              <MessageSquare className="w-4 h-4" />
                            </button>
                            <button className="p-2 bg-gray-700 rounded-lg text-gray-300 hover:bg-gray-600 transition-colors">
                              <Settings className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Payroll Tab */}
            {activeTab === 'payroll' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-white">Quantum Payroll System</h2>
                  <div className="flex space-x-2">
                    <button 
                      onClick={generatePayrollReport}
                      className="px-4 py-2 bg-purple-600 rounded-lg text-white hover:bg-purple-700 transition-colors flex items-center space-x-2"
                    >
                      <Brain className="w-4 h-4" />
                      <span>AI Report</span>
                    </button>
                    <button className="px-4 py-2 bg-green-600 rounded-lg text-white hover:bg-green-700 transition-colors flex items-center space-x-2">
                      <DollarSign className="w-4 h-4" />
                      <span>Process All</span>
                    </button>
                  </div>
                </div>

                {/* Payroll Summary */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-black/30 rounded-xl p-4 border border-green-500/20">
                    <div className="flex items-center justify-between mb-2">
                      <DollarSign className="w-8 h-8 text-green-400" />
                      <span className="text-2xl font-bold text-white">$14.5M</span>
                    </div>
                    <p className="text-gray-400 text-sm">Total Payroll</p>
                    <p className="text-green-400 text-xs">This month</p>
                  </div>

                  <div className="bg-black/30 rounded-xl p-4 border border-blue-500/20">
                    <div className="flex items-center justify-between mb-2">
                      <Clock className="w-8 h-8 text-blue-400" />
                      <span className="text-2xl font-bold text-white">3</span>
                    </div>
                    <p className="text-gray-400 text-sm">Pending Payments</p>
                    <p className="text-blue-400 text-xs">Processing now</p>
                  </div>

                  <div className="bg-black/30 rounded-xl p-4 border border-purple-500/20">
                    <div className="flex items-center justify-between mb-2">
                      <Shield className="w-8 h-8 text-purple-400" />
                      <span className="text-2xl font-bold text-white">100%</span>
                    </div>
                    <p className="text-gray-400 text-sm">AI Verified</p>
                    <p className="text-purple-400 text-xs">Quantum secure</p>
                  </div>
                </div>

                {/* Payment Methods */}
                <div className="bg-black/30 rounded-xl p-6 border border-green-500/20">
                  <h3 className="text-lg font-bold text-white mb-4">Payment Methods</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-gray-800/50 rounded-lg p-4 text-center">
                      <CreditCard className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                      <h4 className="font-semibold text-white">Bank Transfer</h4>
                      <p className="text-gray-400 text-sm">Traditional banking</p>
                      <p className="text-blue-400 text-xs">45% of employees</p>
                    </div>
                    <div className="bg-gray-800/50 rounded-lg p-4 text-center">
                      <Zap className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                      <h4 className="font-semibold text-white">Crypto Wallet</h4>
                      <p className="text-gray-400 text-sm">Cryptocurrency</p>
                      <p className="text-yellow-400 text-xs">35% of employees</p>
                    </div>
                    <div className="bg-gray-800/50 rounded-lg p-4 text-center">
                      <Brain className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                      <h4 className="font-semibold text-white">Quantum Wallet</h4>
                      <p className="text-gray-400 text-sm">Next-gen payment</p>
                      <p className="text-purple-400 text-xs">20% of employees</p>
                    </div>
                  </div>
                </div>

                {/* Transaction History */}
                <div className="bg-black/30 rounded-xl p-6 border border-green-500/20">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-white">Recent Transactions</h3>
                    <div className="flex space-x-2">
                      {['all', 'pending', 'completed'].map((filter) => (
                        <button
                          key={filter}
                          onClick={() => setPayrollFilter(filter as any)}
                          className={`px-3 py-1 rounded-lg text-sm transition-all ${
                            payrollFilter === filter
                              ? 'bg-green-600 text-white'
                              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                          }`}
                        >
                          {filter.charAt(0).toUpperCase() + filter.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    {filteredTransactions.map((transaction) => (
                      <div key={transaction.id} className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                            {transaction.employeeName.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <h4 className="font-semibold text-white">{transaction.employeeName}</h4>
                            <p className="text-gray-400 text-sm">{transaction.type} • {transaction.paymentMethod}</p>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <p className="text-lg font-bold text-green-400">
                            ${transaction.amount.toLocaleString()}
                          </p>
                          <div className="flex items-center space-x-2">
                            <span className={`px-2 py-1 rounded text-xs font-semibold ${getPaymentStatusColor(transaction.status)}`}>
                              {transaction.status.toUpperCase()}
                            </span>
                            {transaction.aiVerified && (
                              <Shield className="w-4 h-4 text-green-400" />
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* AI HR Assistant Tab */}
            {activeTab === 'ai-hr' && (
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-xl p-6 border border-purple-500/30">
                  <div className="flex items-center space-x-3 mb-4">
                    <Bot className="w-8 h-8 text-purple-400" />
                    <div>
                      <h2 className="text-xl font-bold text-white">AI HR Assistant</h2>
                      <p className="text-purple-300">Your intelligent workforce management companion</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="bg-black/30 rounded-lg p-4">
                        <h3 className="font-semibold text-white mb-2">Workforce Insights</h3>
                        <div className="space-y-2 text-sm">
                          <p className="text-gray-300">• 94% employee satisfaction (↑5% from last quarter)</p>
                          <p className="text-gray-300">• Engineering team showing high innovation metrics</p>
                          <p className="text-gray-300">• Recommend salary review for top performers</p>
                          <p className="text-gray-300">• 3 employees at risk of burnout - wellness intervention suggested</p>
                        </div>
                      </div>
                      
                      <div className="bg-black/30 rounded-lg p-4">
                        <h3 className="font-semibold text-white mb-2">Recruitment Recommendations</h3>
                        <div className="space-y-2 text-sm">
                          <p className="text-gray-300">• Hire 2 Quantum Engineers for Q2 projects</p>
                          <p className="text-gray-300">• Metaverse Designer demand increasing</p>
                          <p className="text-gray-300">• Consider remote-first candidates for 40% cost savings</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="bg-black/30 rounded-lg p-4">
                        <h3 className="font-semibold text-white mb-2">Payroll Optimization</h3>
                        <div className="space-y-2 text-sm">
                          <p className="text-gray-300">• Switch to quantum payments: 15% cost reduction</p>
                          <p className="text-gray-300">• Automate bonus calculations based on performance</p>
                          <p className="text-gray-300">• Implement equity compensation for retention</p>
                        </div>
                      </div>
                      
                      <div className="bg-black/30 rounded-lg p-4">
                        <h3 className="font-semibold text-white mb-2">Compliance Alerts</h3>
                        <div className="space-y-2 text-sm">
                          <p className="text-green-300">✓ All payroll taxes up to date</p>
                          <p className="text-green-300">✓ Employee contracts compliant</p>
                          <p className="text-yellow-300">⚠ 2 employees need performance reviews</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="w-80 bg-black/30 border-l border-green-500/20 p-6">
            <div className="space-y-6">
              {/* Quick Actions */}
              <div className="bg-gray-800/50 rounded-lg p-4">
                <h3 className="font-semibold text-white mb-3">Quick Actions</h3>
                <div className="space-y-2">
                  <button className="w-full p-2 bg-green-600 rounded-lg text-white hover:bg-green-700 transition-colors text-sm">
                    Process Monthly Payroll
                  </button>
                  <button className="w-full p-2 bg-blue-600 rounded-lg text-white hover:bg-blue-700 transition-colors text-sm">
                    Generate AI Report
                  </button>
                  <button className="w-full p-2 bg-purple-600 rounded-lg text-white hover:bg-purple-700 transition-colors text-sm">
                    Schedule Performance Reviews
                  </button>
                  <button className="w-full p-2 bg-yellow-600 rounded-lg text-white hover:bg-yellow-700 transition-colors text-sm">
                    Wellness Check-in
                  </button>
                </div>
              </div>

              {/* Upcoming Events */}
              <div className="bg-gray-800/50 rounded-lg p-4">
                <h3 className="font-semibold text-white mb-3">Upcoming Events</h3>
                <div className="space-y-3">
                  <div className="flex items-start space-x-2">
                    <Calendar className="w-4 h-4 text-blue-400 mt-0.5" />
                    <div>
                      <p className="text-sm text-white">Payroll Processing</p>
                      <p className="text-xs text-gray-400">January 31, 2050</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Users className="w-4 h-4 text-green-400 mt-0.5" />
                    <div>
                      <p className="text-sm text-white">Team Building Event</p>
                      <p className="text-xs text-gray-400">February 15, 2050</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Award className="w-4 h-4 text-yellow-400 mt-0.5" />
                    <div>
                      <p className="text-sm text-white">Performance Reviews</p>
                      <p className="text-xs text-gray-400">March 1, 2050</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* AI Recommendations */}
              <div className="bg-gray-800/50 rounded-lg p-4">
                <h3 className="font-semibold text-white mb-3">AI Recommendations</h3>
                <div className="space-y-3">
                  <div className="flex items-start space-x-2">
                    <Brain className="w-4 h-4 text-purple-400 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-300">Implement flexible work hours</p>
                      <p className="text-xs text-gray-500">+8% productivity boost predicted</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Heart className="w-4 h-4 text-red-400 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-300">Launch wellness program</p>
                      <p className="text-xs text-gray-500">Reduce sick days by 25%</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Zap className="w-4 h-4 text-yellow-400 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-300">Upgrade to quantum payroll</p>
                      <p className="text-xs text-gray-500">Save $50K annually</p>
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