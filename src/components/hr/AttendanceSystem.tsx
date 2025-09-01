import React, { useState, useEffect } from 'react';
import { MapPin, Clock, Users, CheckCircle, AlertTriangle, Eye, Shield, Bot, Zap, Navigation, Camera, Smartphone, Wifi, Battery, Signal, Target, Activity, TrendingUp, Calendar, User, Building, Home, Coffee, Car, Footprints, Bike, Plane } from 'lucide-react';

interface AttendanceSystemProps {
  onAttendanceUpdate: (data: AttendanceData) => void;
}

interface AttendanceData {
  employeeId: string;
  employeeName: string;
  checkInTime: string;
  checkOutTime?: string;
  location: {
    latitude: number;
    longitude: number;
    address: string;
    accuracy: number;
  };
  workLocation: 'office' | 'home' | 'client_site' | 'remote';
  deviceInfo: {
    type: string;
    battery: number;
    network: number;
  };
  biometricVerified: boolean;
  aiVerificationScore: number;
  status: 'checked_in' | 'checked_out' | 'break' | 'lunch' | 'meeting';
}

interface GeofenceArea {
  id: string;
  name: string;
  type: 'office' | 'client_site' | 'approved_remote';
  center: { latitude: number; longitude: number };
  radius: number; // in meters
  allowedHours: { start: string; end: string };
  requiresBiometric: boolean;
  aiMonitoring: boolean;
}

interface Employee {
  id: string;
  name: string;
  department: string;
  position: string;
  avatar: string;
  currentStatus: 'checked_in' | 'checked_out' | 'break' | 'lunch' | 'meeting' | 'absent';
  lastSeen: string;
  location?: {
    latitude: number;
    longitude: number;
    address: string;
    timestamp: string;
  };
  todayHours: number;
  weeklyHours: number;
  attendanceScore: number;
  biometricEnabled: boolean;
}

export const AttendanceSystem: React.FC<AttendanceSystemProps> = ({ onAttendanceUpdate }) => {
  const [activeTab, setActiveTab] = useState<'checkin' | 'tracking' | 'geofence' | 'analytics'>('checkin');
  const [currentLocation, setCurrentLocation] = useState<any>(null);
  const [isWithinGeofence, setIsWithinGeofence] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<string | null>(null);
  const [biometricScanning, setBiometricScanning] = useState(false);
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceData[]>([]);
  const [geofenceAreas, setGeofenceAreas] = useState<GeofenceArea[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    initializeAttendanceSystem();
    setupGeofenceAreas();
    loadEmployees();
    startLocationTracking();
  }, []);

  const initializeAttendanceSystem = () => {
    console.log('Initializing AI-powered attendance system...');
    console.log('Setting up geofence monitoring...');
    console.log('Activating biometric verification...');
  };

  const setupGeofenceAreas = () => {
    const areas: GeofenceArea[] = [
      {
        id: 'main_office',
        name: 'Main Office - Quantum Tower',
        type: 'office',
        center: { latitude: 40.7128, longitude: -74.0060 },
        radius: 100,
        allowedHours: { start: '07:00', end: '20:00' },
        requiresBiometric: true,
        aiMonitoring: true
      },
      {
        id: 'client_site_alpha',
        name: 'Client Site - Alpha Corp',
        type: 'client_site',
        center: { latitude: 40.7589, longitude: -73.9851 },
        radius: 50,
        allowedHours: { start: '08:00', end: '18:00' },
        requiresBiometric: false,
        aiMonitoring: true
      },
      {
        id: 'remote_hub_beta',
        name: 'Remote Hub - Beta Center',
        type: 'approved_remote',
        center: { latitude: 40.7505, longitude: -73.9934 },
        radius: 200,
        allowedHours: { start: '06:00', end: '22:00' },
        requiresBiometric: false,
        aiMonitoring: false
      }
    ];
    
    setGeofenceAreas(areas);
  };

  const loadEmployees = () => {
    const mockEmployees: Employee[] = [
      {
        id: '1',
        name: 'Sarah Chen',
        department: 'Engineering',
        position: 'Senior Quantum Engineer',
        avatar: 'SC',
        currentStatus: 'checked_in',
        lastSeen: '2 min ago',
        location: {
          latitude: 40.7128,
          longitude: -74.0060,
          address: 'Quantum Tower, Floor 42',
          timestamp: new Date().toISOString()
        },
        todayHours: 6.5,
        weeklyHours: 38.5,
        attendanceScore: 96,
        biometricEnabled: true
      },
      {
        id: '2',
        name: 'Marcus Rodriguez',
        department: 'Design',
        position: 'Metaverse Designer',
        avatar: 'MR',
        currentStatus: 'break',
        lastSeen: '15 min ago',
        location: {
          latitude: 40.7589,
          longitude: -73.9851,
          address: 'Central Park Cafe',
          timestamp: new Date().toISOString()
        },
        todayHours: 4.0,
        weeklyHours: 32.0,
        attendanceScore: 88,
        biometricEnabled: true
      },
      {
        id: '3',
        name: 'Emily Davis',
        department: 'Product',
        position: 'AI Product Manager',
        avatar: 'ED',
        currentStatus: 'meeting',
        lastSeen: 'now',
        location: {
          latitude: 40.7505,
          longitude: -73.9934,
          address: 'Conference Room Quantum-A',
          timestamp: new Date().toISOString()
        },
        todayHours: 7.2,
        weeklyHours: 41.2,
        attendanceScore: 99,
        biometricEnabled: true
      }
    ];
    
    setEmployees(mockEmployees);
  };

  const startLocationTracking = () => {
    // Simulate high-precision location tracking
    const updateLocation = () => {
      const mockLocation = {
        latitude: 40.7128 + (Math.random() - 0.5) * 0.001,
        longitude: -74.0060 + (Math.random() - 0.5) * 0.001,
        accuracy: Math.random() * 5 + 1,
        timestamp: new Date().toISOString(),
        address: 'Quantum Tower, New York'
      };
      
      setCurrentLocation(mockLocation);
      checkGeofenceStatus(mockLocation);
    };

    updateLocation();
    const interval = setInterval(updateLocation, 10000); // Update every 10 seconds
    
    return () => clearInterval(interval);
  };

  const checkGeofenceStatus = (location: any) => {
    const withinAnyGeofence = geofenceAreas.some(area => {
      const distance = calculateDistance(
        location.latitude, location.longitude,
        area.center.latitude, area.center.longitude
      );
      return distance <= area.radius;
    });
    
    setIsWithinGeofence(withinAnyGeofence);
  };

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371e3; // Earth's radius in meters
    const φ1 = lat1 * Math.PI/180;
    const φ2 = lat2 * Math.PI/180;
    const Δφ = (lat2-lat1) * Math.PI/180;
    const Δλ = (lon2-lon1) * Math.PI/180;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    return R * c;
  };

  const performBiometricCheckIn = async () => {
    setBiometricScanning(true);
    
    // Simulate biometric scanning
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const attendanceData: AttendanceData = {
      employeeId: 'current-user',
      employeeName: 'Current User',
      checkInTime: new Date().toISOString(),
      location: {
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude,
        address: currentLocation.address,
        accuracy: currentLocation.accuracy
      },
      workLocation: isWithinGeofence ? 'office' : 'remote',
      deviceInfo: {
        type: 'smartphone',
        battery: Math.floor(Math.random() * 100),
        network: Math.floor(Math.random() * 100)
      },
      biometricVerified: true,
      aiVerificationScore: 95 + Math.random() * 5,
      status: 'checked_in'
    };

    setAttendanceRecords(prev => [...prev, attendanceData]);
    onAttendanceUpdate(attendanceData);
    setBiometricScanning(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'checked_in': return 'text-green-400 bg-green-600/20';
      case 'checked_out': return 'text-gray-400 bg-gray-600/20';
      case 'break': return 'text-yellow-400 bg-yellow-600/20';
      case 'lunch': return 'text-orange-400 bg-orange-600/20';
      case 'meeting': return 'text-blue-400 bg-blue-600/20';
      case 'absent': return 'text-red-400 bg-red-600/20';
      default: return 'text-gray-400 bg-gray-600/20';
    }
  };

  const getLocationIcon = (workLocation: string) => {
    switch (workLocation) {
      case 'office': return <Building className="w-4 h-4 text-blue-400" />;
      case 'home': return <Home className="w-4 h-4 text-green-400" />;
      case 'client_site': return <Users className="w-4 h-4 text-purple-400" />;
      case 'remote': return <Globe className="w-4 h-4 text-cyan-400" />;
      default: return <MapPin className="w-4 h-4 text-gray-400" />;
    }
  };

  return (
    <div className="bg-black/30 rounded-xl p-4 sm:p-6 border border-green-500/20">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl flex items-center justify-center">
            <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-white">Smart Attendance System</h2>
            <p className="text-green-300 text-sm">AI-powered location-based check-in</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {isWithinGeofence ? (
            <div className="flex items-center space-x-2 bg-green-600/20 px-3 py-1 rounded-lg">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span className="text-green-400 text-xs sm:text-sm font-semibold">In Work Zone</span>
            </div>
          ) : (
            <div className="flex items-center space-x-2 bg-yellow-600/20 px-3 py-1 rounded-lg">
              <AlertTriangle className="w-4 h-4 text-yellow-400" />
              <span className="text-yellow-400 text-xs sm:text-sm font-semibold">Outside Zone</span>
            </div>
          )}
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="grid grid-cols-2 sm:flex sm:space-x-2 gap-2 sm:gap-0 mb-6">
        {[
          { id: 'checkin', label: 'Check-In', icon: Clock },
          { id: 'tracking', label: 'Live Tracking', icon: MapPin },
          { id: 'geofence', label: 'Work Zones', icon: Target },
          { id: 'analytics', label: 'Analytics', icon: TrendingUp }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center justify-center space-x-2 px-3 py-2 rounded-lg transition-all text-xs sm:text-sm ${
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

      {/* Check-In Tab */}
      {activeTab === 'checkin' && (
        <div className="space-y-6">
          {/* Current Location Status */}
          {currentLocation && (
            <div className="bg-gray-800/50 rounded-lg p-4 border border-blue-500/30">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-white">Current Location</h3>
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${isWithinGeofence ? 'bg-green-500' : 'bg-yellow-500'} animate-pulse`}></div>
                  <span className={`text-xs font-semibold ${isWithinGeofence ? 'text-green-400' : 'text-yellow-400'}`}>
                    {isWithinGeofence ? 'Authorized Zone' : 'Outside Work Zone'}
                  </span>
                </div>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Address:</span>
                  <span className="text-white">{currentLocation.address}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Accuracy:</span>
                  <span className="text-green-400">±{currentLocation.accuracy?.toFixed(1)}m</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Timestamp:</span>
                  <span className="text-blue-400">{new Date(currentLocation.timestamp).toLocaleTimeString()}</span>
                </div>
              </div>
            </div>
          )}

          {/* Biometric Check-In */}
          <div className="bg-gradient-to-r from-green-600/20 to-blue-600/20 rounded-lg p-6 border border-green-500/30">
            <div className="text-center">
              <div className={`w-24 h-24 mx-auto rounded-full border-4 ${
                biometricScanning ? 'border-green-400 animate-pulse' : 'border-gray-600'
              } flex items-center justify-center bg-gray-800/50 mb-4`}>
                {biometricScanning ? (
                  <div className="w-16 h-16 border-4 border-green-400 border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <Clock className="w-12 h-12 text-green-400" />
                )}
              </div>
              
              <h3 className="text-xl font-bold text-white mb-2">
                {biometricScanning ? 'Verifying Identity...' : 'Ready for Check-In'}
              </h3>
              <p className="text-gray-400 mb-6">
                {biometricScanning 
                  ? 'AI biometric verification in progress' 
                  : 'Use biometric authentication to check in'
                }
              </p>

              <button
                onClick={performBiometricCheckIn}
                disabled={biometricScanning || !isWithinGeofence}
                className="w-full p-4 bg-gradient-to-r from-green-600 to-blue-600 rounded-xl text-white font-semibold hover:from-green-700 hover:to-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {biometricScanning ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Scanning Biometrics...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-2">
                    <Shield className="w-5 h-5" />
                    <span>Biometric Check-In</span>
                  </div>
                )}
              </button>

              {!isWithinGeofence && (
                <div className="mt-4 p-3 bg-yellow-600/20 border border-yellow-500/30 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className="w-4 h-4 text-yellow-400" />
                    <span className="text-yellow-400 text-sm">You must be within an authorized work zone to check in</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Live Tracking Tab */}
      {activeTab === 'tracking' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-white">Live Employee Tracking</h3>
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <Eye className="w-4 h-4" />
              <span>{employees.filter(e => e.currentStatus === 'checked_in').length} active</span>
            </div>
          </div>

          <div className="space-y-4">
            {employees.map((employee) => (
              <div key={employee.id} className="bg-gray-800/50 rounded-lg p-4 border border-green-500/20 hover:border-green-500/40 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between space-y-3 sm:space-y-0">
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                      {employee.avatar}
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3 space-y-1 sm:space-y-0 mb-2">
                        <h4 className="font-semibold text-white">{employee.name}</h4>
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${getStatusColor(employee.currentStatus)} w-fit`}>
                          {employee.currentStatus.replace('_', ' ').toUpperCase()}
                        </span>
                      </div>
                      <p className="text-gray-400 text-sm">{employee.position} • {employee.department}</p>
                      
                      {employee.location && (
                        <div className="mt-2 space-y-1 text-xs">
                          <div className="flex items-center space-x-2">
                            <MapPin className="w-3 h-3 text-blue-400" />
                            <span className="text-gray-300">{employee.location.address}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Clock className="w-3 h-3 text-green-400" />
                            <span className="text-gray-400">Last seen: {employee.lastSeen}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex flex-col space-y-2 sm:w-32">
                    <div className="text-center">
                      <p className="text-xs text-gray-400">Today</p>
                      <p className="text-lg font-bold text-green-400">{employee.todayHours}h</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-400">This Week</p>
                      <p className="text-sm font-bold text-blue-400">{employee.weeklyHours}h</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-400">Score</p>
                      <p className="text-sm font-bold text-purple-400">{employee.attendanceScore}%</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Geofence Management Tab */}
      {activeTab === 'geofence' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-white">Work Zone Management</h3>
            <button className="px-4 py-2 bg-blue-600 rounded-lg text-white hover:bg-blue-700 transition-colors flex items-center space-x-2 text-sm">
              <Target className="w-4 h-4" />
              <span>Add Zone</span>
            </button>
          </div>

          <div className="space-y-4">
            {geofenceAreas.map((area) => (
              <div key={area.id} className="bg-gray-800/50 rounded-lg p-4 border border-blue-500/20">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between space-y-3 sm:space-y-0">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className="font-semibold text-white">{area.name}</h4>
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${
                        area.type === 'office' ? 'text-blue-400 bg-blue-600/20' :
                        area.type === 'client_site' ? 'text-purple-400 bg-purple-600/20' :
                        'text-green-400 bg-green-600/20'
                      }`}>
                        {area.type.replace('_', ' ').toUpperCase()}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                      <div className="flex items-center space-x-2">
                        <Target className="w-4 h-4 text-cyan-400" />
                        <span className="text-gray-400">Radius: {area.radius}m</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-green-400" />
                        <span className="text-gray-400">{area.allowedHours.start} - {area.allowedHours.end}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Shield className="w-4 h-4 text-purple-400" />
                        <span className="text-gray-400">
                          {area.requiresBiometric ? 'Biometric Required' : 'Standard Auth'}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Bot className="w-4 h-4 text-yellow-400" />
                        <span className="text-gray-400">
                          {area.aiMonitoring ? 'AI Monitored' : 'Basic Tracking'}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button className="p-2 bg-blue-600 rounded-lg text-white hover:bg-blue-700 transition-colors">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-2 bg-gray-700 rounded-lg text-gray-300 hover:bg-gray-600 transition-colors">
                      <Settings className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Analytics Tab */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <h3 className="font-semibold text-white">Attendance Analytics</h3>
          
          {/* Summary Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-gray-800/50 rounded-lg p-4 border border-green-500/20">
              <div className="flex items-center justify-between mb-2">
                <CheckCircle className="w-6 h-6 text-green-400" />
                <span className="text-2xl font-bold text-white">85%</span>
              </div>
              <p className="text-gray-400 text-sm">On-Time Rate</p>
            </div>

            <div className="bg-gray-800/50 rounded-lg p-4 border border-blue-500/20">
              <div className="flex items-center justify-between mb-2">
                <Users className="w-6 h-6 text-blue-400" />
                <span className="text-2xl font-bold text-white">42</span>
              </div>
              <p className="text-gray-400 text-sm">Present Today</p>
            </div>

            <div className="bg-gray-800/50 rounded-lg p-4 border border-purple-500/20">
              <div className="flex items-center justify-between mb-2">
                <Activity className="w-6 h-6 text-purple-400" />
                <span className="text-2xl font-bold text-white">8.2h</span>
              </div>
              <p className="text-gray-400 text-sm">Avg. Daily Hours</p>
            </div>

            <div className="bg-gray-800/50 rounded-lg p-4 border border-yellow-500/20">
              <div className="flex items-center justify-between mb-2">
                <Bot className="w-6 h-6 text-yellow-400" />
                <span className="text-2xl font-bold text-white">96%</span>
              </div>
              <p className="text-gray-400 text-sm">AI Accuracy</p>
            </div>
          </div>

          {/* Location Compliance */}
          <div className="bg-gray-800/50 rounded-lg p-4 border border-cyan-500/20">
            <h4 className="font-semibold text-white mb-4">Location Compliance</h4>
            <div className="space-y-3">
              {geofenceAreas.map((area) => (
                <div key={area.id} className="flex items-center justify-between p-3 bg-black/30 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Target className="w-5 h-5 text-cyan-400" />
                    <div>
                      <p className="text-white font-medium">{area.name}</p>
                      <p className="text-gray-400 text-sm">
                        {employees.filter(e => e.location && calculateDistance(
                          e.location.latitude, e.location.longitude,
                          area.center.latitude, area.center.longitude
                        ) <= area.radius).length} employees present
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-green-400 font-bold">98%</p>
                    <p className="text-gray-400 text-xs">Compliance</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* AI Insights */}
      <div className="mt-6 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-lg p-4 border border-purple-500/30">
        <div className="flex items-center space-x-2 mb-3">
          <Bot className="w-5 h-5 text-purple-400" />
          <span className="font-semibold text-white">AI Attendance Insights</span>
        </div>
        <div className="space-y-2 text-sm">
          <p className="text-gray-300">
            • Peak productivity hours: 10 AM - 2 PM based on location data
          </p>
          <p className="text-gray-300">
            • 94% of employees maintain proper work zone compliance
          </p>
          <p className="text-gray-300">
            • Biometric verification prevents 99.8% of attendance fraud
          </p>
          <p className="text-gray-300">
            • AI recommends flexible hours for 15% productivity boost
          </p>
        </div>
      </div>
    </div>
  );
};