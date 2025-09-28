import React, { useState, useEffect } from 'react';
import { MapPin, Clock, Users, CheckCircle, AlertTriangle, Eye, Shield, Bot, Zap, Navigation, Camera, Smartphone, Wifi, Battery, Signal, Target, Activity, TrendingUp, Calendar, User, Building, Home, Coffee, Car, Footprints, Bike, Plane, QrCode, Scan } from 'lucide-react';

interface HRCheckInProps {
  onCheckInComplete: (data: CheckInData) => void;
}

interface CheckInData {
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
  qrCodeUsed?: boolean;
  geofenceCompliant: boolean;
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
  qrCodeRequired: boolean;
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
  qrCodeAccess: boolean;
}

export const HRCheckIn: React.FC<HRCheckInProps> = ({ onCheckInComplete }) => {
  const [currentLocation, setCurrentLocation] = useState<any>(null);
  const [isWithinGeofence, setIsWithinGeofence] = useState(false);
  const [selectedGeofence, setSelectedGeofence] = useState<GeofenceArea | null>(null);
  const [biometricScanning, setBiometricScanning] = useState(false);
  const [qrScanning, setQrScanning] = useState(false);
  const [checkInRecords, setCheckInRecords] = useState<CheckInData[]>([]);
  const [geofenceAreas, setGeofenceAreas] = useState<GeofenceArea[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<string | null>(null);
  const [checkInMethod, setCheckInMethod] = useState<'location' | 'qr' | 'biometric'>('location');

  useEffect(() => {
    initializeCheckInSystem();
    setupGeofenceAreas();
    loadEmployees();
    startLocationTracking();
  }, []);

  const initializeCheckInSystem = () => {
    console.log('Initializing HR Check-In System...');
    console.log('Setting up geofence monitoring...');
    console.log('Activating biometric verification...');
    console.log('Preparing QR code scanning...');
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
        aiMonitoring: true,
        qrCodeRequired: false
      },
      {
        id: 'client_site_alpha',
        name: 'Client Site - Alpha Corp',
        type: 'client_site',
        center: { latitude: 40.7589, longitude: -73.9851 },
        radius: 50,
        allowedHours: { start: '08:00', end: '18:00' },
        requiresBiometric: false,
        aiMonitoring: true,
        qrCodeRequired: true
      },
      {
        id: 'remote_hub_beta',
        name: 'Remote Hub - Beta Center',
        type: 'approved_remote',
        center: { latitude: 40.7505, longitude: -73.9934 },
        radius: 200,
        allowedHours: { start: '06:00', end: '22:00' },
        requiresBiometric: false,
        aiMonitoring: false,
        qrCodeRequired: true
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
        currentStatus: 'checked_out',
        lastSeen: '2 hours ago',
        todayHours: 0,
        weeklyHours: 38.5,
        attendanceScore: 96,
        biometricEnabled: true,
        qrCodeAccess: true
      },
      {
        id: '2',
        name: 'Marcus Rodriguez',
        department: 'Design',
        position: 'Metaverse Designer',
        avatar: 'MR',
        currentStatus: 'checked_out',
        lastSeen: '1 hour ago',
        todayHours: 0,
        weeklyHours: 32.0,
        attendanceScore: 88,
        biometricEnabled: true,
        qrCodeAccess: true
      },
      {
        id: '3',
        name: 'Emily Davis',
        department: 'Product',
        position: 'AI Product Manager',
        avatar: 'ED',
        currentStatus: 'checked_out',
        lastSeen: '30 min ago',
        todayHours: 0,
        weeklyHours: 41.2,
        attendanceScore: 99,
        biometricEnabled: true,
        qrCodeAccess: true
      }
    ];
    
    setEmployees(mockEmployees);
  };

  const startLocationTracking = () => {
    // Get user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy,
            timestamp: new Date().toISOString(),
            address: 'Current Location'
          };
          setCurrentLocation(location);
          checkGeofenceStatus(location);
        },
        (error) => {
          console.log('Location access denied, using mock location');
          const mockLocation = {
            latitude: 40.7128,
            longitude: -74.0060,
            accuracy: 5,
            timestamp: new Date().toISOString(),
            address: 'Quantum Tower, New York'
          };
          setCurrentLocation(mockLocation);
          checkGeofenceStatus(mockLocation);
        }
      );
    }
  };

  const checkGeofenceStatus = (location: any) => {
    let withinGeofence = false;
    let nearestGeofence: GeofenceArea | null = null;

    for (const area of geofenceAreas) {
      const distance = calculateDistance(
        location.latitude, location.longitude,
        area.center.latitude, area.center.longitude
      );
      
      if (distance <= area.radius) {
        withinGeofence = true;
        nearestGeofence = area;
        break;
      }
    }
    
    setIsWithinGeofence(withinGeofence);
    setSelectedGeofence(nearestGeofence);
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

  const performCheckIn = async (method: 'location' | 'qr' | 'biometric') => {
    if (!selectedEmployee) {
      alert('Please select an employee first');
      return;
    }

    const employee = employees.find(e => e.id === selectedEmployee);
    if (!employee) return;

    if (method === 'biometric') {
      setBiometricScanning(true);
      await new Promise(resolve => setTimeout(resolve, 3000));
      setBiometricScanning(false);
    } else if (method === 'qr') {
      setQrScanning(true);
      await new Promise(resolve => setTimeout(resolve, 2000));
      setQrScanning(false);
    }

    const checkInData: CheckInData = {
      employeeId: employee.id,
      employeeName: employee.name,
      checkInTime: new Date().toISOString(),
      location: {
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude,
        address: currentLocation.address,
        accuracy: currentLocation.accuracy
      },
      workLocation: selectedGeofence?.type || 'remote',
      deviceInfo: {
        type: 'smartphone',
        battery: Math.floor(Math.random() * 100),
        network: Math.floor(Math.random() * 100)
      },
      biometricVerified: method === 'biometric',
      aiVerificationScore: 95 + Math.random() * 5,
      status: 'checked_in',
      qrCodeUsed: method === 'qr',
      geofenceCompliant: isWithinGeofence
    };

    setCheckInRecords(prev => [...prev, checkInData]);
    
    // Update employee status
    setEmployees(prev => prev.map(emp => 
      emp.id === selectedEmployee 
        ? { ...emp, currentStatus: 'checked_in', todayHours: 0 }
        : emp
    ));

    onCheckInComplete(checkInData);
    alert(`${employee.name} checked in successfully!`);
  };

  const performCheckOut = async () => {
    if (!selectedEmployee) return;

    const employee = employees.find(e => e.id === selectedEmployee);
    if (!employee) return;

    const checkOutData: CheckInData = {
      employeeId: employee.id,
      employeeName: employee.name,
      checkInTime: '', // Will be filled from existing record
      checkOutTime: new Date().toISOString(),
      location: {
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude,
        address: currentLocation.address,
        accuracy: currentLocation.accuracy
      },
      workLocation: selectedGeofence?.type || 'remote',
      deviceInfo: {
        type: 'smartphone',
        battery: Math.floor(Math.random() * 100),
        network: Math.floor(Math.random() * 100)
      },
      biometricVerified: false,
      aiVerificationScore: 90 + Math.random() * 10,
      status: 'checked_out',
      geofenceCompliant: isWithinGeofence
    };

    // Update employee status
    setEmployees(prev => prev.map(emp => 
      emp.id === selectedEmployee 
        ? { ...emp, currentStatus: 'checked_out', todayHours: 8 + Math.random() * 2 }
        : emp
    ));

    onCheckInComplete(checkOutData);
    alert(`${employee.name} checked out successfully!`);
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

  return (
    <div className="space-y-6">
      {/* Employee Selection */}
      <div className="bg-gray-800/50 rounded-lg p-4 border border-blue-500/30">
        <h3 className="font-semibold text-white mb-3">Select Employee</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {employees.map((employee) => (
            <button
              key={employee.id}
              onClick={() => setSelectedEmployee(employee.id)}
              className={`p-3 rounded-lg transition-all text-left ${
                selectedEmployee === employee.id
                  ? 'bg-blue-600 text-white border-2 border-blue-500'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600 border-2 border-gray-600'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                  {employee.avatar}
                </div>
                <div>
                  <h4 className="font-semibold">{employee.name}</h4>
                  <p className="text-xs opacity-75">{employee.position}</p>
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${getStatusColor(employee.currentStatus)} mt-1 inline-block`}>
                    {employee.currentStatus.replace('_', ' ').toUpperCase()}
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Current Location Status */}
      {currentLocation && (
        <div className="bg-gray-800/50 rounded-lg p-4 border border-blue-500/30">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-white">Current Location</h3>
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${isWithinGeofence ? 'bg-green-500' : 'bg-red-500'} animate-pulse`}></div>
              <span className={`text-xs font-semibold ${isWithinGeofence ? 'text-green-400' : 'text-red-400'}`}>
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
            {selectedGeofence && (
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Work Zone:</span>
                <span className="text-blue-400">{selectedGeofence.name}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Check-In Methods */}
      <div className="bg-gray-800/50 rounded-lg p-4 border border-green-500/30">
        <h3 className="font-semibold text-white mb-3">Check-In Method</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
          <button
            onClick={() => setCheckInMethod('location')}
            className={`p-3 rounded-lg transition-all ${
              checkInMethod === 'location'
                ? 'bg-green-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            <MapPin className="w-6 h-6 mx-auto mb-2" />
            <p className="font-medium text-sm">Location</p>
            <p className="text-xs opacity-75">GPS tracking</p>
          </button>
          <button
            onClick={() => setCheckInMethod('qr')}
            className={`p-3 rounded-lg transition-all ${
              checkInMethod === 'qr'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            <QrCode className="w-6 h-6 mx-auto mb-2" />
            <p className="font-medium text-sm">QR Code</p>
            <p className="text-xs opacity-75">Scan to check-in</p>
          </button>
          <button
            onClick={() => setCheckInMethod('biometric')}
            className={`p-3 rounded-lg transition-all ${
              checkInMethod === 'biometric'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            <Shield className="w-6 h-6 mx-auto mb-2" />
            <p className="font-medium text-sm">Biometric</p>
            <p className="text-xs opacity-75">Secure verification</p>
          </button>
        </div>

        {/* Check-In Interface */}
        <div className="space-y-4">
          {checkInMethod === 'location' && (
            <div className="bg-gradient-to-r from-green-600/20 to-blue-600/20 rounded-lg p-4 border border-green-500/30">
              <div className="text-center">
                <MapPin className="w-12 h-12 mx-auto text-green-400 mb-3" />
                <h4 className="font-semibold text-white mb-2">Location-Based Check-In</h4>
                <p className="text-gray-400 text-sm mb-4">
                  {isWithinGeofence 
                    ? `Ready to check-in at ${selectedGeofence?.name}` 
                    : 'You must be within an authorized work zone'
                  }
                </p>
                <div className="flex space-x-2">
                  <button
                    onClick={() => performCheckIn('location')}
                    disabled={!selectedEmployee || !isWithinGeofence}
                    className="flex-1 p-3 bg-green-600 rounded-lg text-white hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Check In
                  </button>
                  <button
                    onClick={performCheckOut}
                    disabled={!selectedEmployee}
                    className="flex-1 p-3 bg-red-600 rounded-lg text-white hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Check Out
                  </button>
                </div>
              </div>
            </div>
          )}

          {checkInMethod === 'qr' && (
            <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-lg p-4 border border-blue-500/30">
              <div className="text-center">
                <div className={`w-16 h-16 mx-auto rounded-full border-4 ${
                  qrScanning ? 'border-blue-400 animate-pulse' : 'border-gray-600'
                } flex items-center justify-center bg-gray-800/50 mb-4`}>
                  {qrScanning ? (
                    <div className="w-12 h-12 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <QrCode className="w-8 h-8 text-blue-400" />
                  )}
                </div>
                <h4 className="font-semibold text-white mb-2">
                  {qrScanning ? 'Scanning QR Code...' : 'QR Code Check-In'}
                </h4>
                <p className="text-gray-400 text-sm mb-4">
                  {qrScanning 
                    ? 'Processing QR code verification' 
                    : 'Scan the QR code at your work location'
                  }
                </p>
                <button
                  onClick={() => performCheckIn('qr')}
                  disabled={!selectedEmployee || qrScanning}
                  className="w-full p-3 bg-blue-600 rounded-lg text-white hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {qrScanning ? 'Scanning...' : 'Scan QR Code'}
                </button>
              </div>
            </div>
          )}

          {checkInMethod === 'biometric' && (
            <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-lg p-4 border border-purple-500/30">
              <div className="text-center">
                <div className={`w-16 h-16 mx-auto rounded-full border-4 ${
                  biometricScanning ? 'border-purple-400 animate-pulse' : 'border-gray-600'
                } flex items-center justify-center bg-gray-800/50 mb-4`}>
                  {biometricScanning ? (
                    <div className="w-12 h-12 border-4 border-purple-400 border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <Shield className="w-8 h-8 text-purple-400" />
                  )}
                </div>
                <h4 className="font-semibold text-white mb-2">
                  {biometricScanning ? 'Verifying Identity...' : 'Biometric Check-In'}
                </h4>
                <p className="text-gray-400 text-sm mb-4">
                  {biometricScanning 
                    ? 'AI biometric verification in progress' 
                    : 'Use biometric authentication for secure check-in'
                  }
                </p>
                <button
                  onClick={() => performCheckIn('biometric')}
                  disabled={!selectedEmployee || biometricScanning}
                  className="w-full p-3 bg-purple-600 rounded-lg text-white hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {biometricScanning ? 'Scanning...' : 'Biometric Check-In'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Geofence Areas */}
      <div className="bg-gray-800/50 rounded-lg p-4 border border-cyan-500/30">
        <h3 className="font-semibold text-white mb-3">Work Zones</h3>
        <div className="space-y-3">
          {geofenceAreas.map((area) => (
            <div key={area.id} className="bg-black/30 rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-white">{area.name}</h4>
                <div className="flex items-center space-x-2">
                  {area.qrCodeRequired && <QrCode className="w-4 h-4 text-blue-400" />}
                  {area.requiresBiometric && <Shield className="w-4 h-4 text-purple-400" />}
                  {area.aiMonitoring && <Bot className="w-4 h-4 text-cyan-400" />}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs text-gray-400">
                <span>Radius: {area.radius}m</span>
                <span>Hours: {area.allowedHours.start} - {area.allowedHours.end}</span>
              </div>
              {currentLocation && (
                <div className="mt-2 text-xs">
                  <span className="text-gray-400">Distance: </span>
                  <span className={`font-semibold ${
                    calculateDistance(
                      currentLocation.latitude, currentLocation.longitude,
                      area.center.latitude, area.center.longitude
                    ) <= area.radius ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {calculateDistance(
                      currentLocation.latitude, currentLocation.longitude,
                      area.center.latitude, area.center.longitude
                    ).toFixed(0)}m
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Recent Check-Ins */}
      {checkInRecords.length > 0 && (
        <div className="bg-gray-800/50 rounded-lg p-4 border border-green-500/30">
          <h3 className="font-semibold text-white mb-3">Recent Check-Ins</h3>
          <div className="space-y-2">
            {checkInRecords.slice(-5).reverse().map((record, index) => (
              <div key={index} className="bg-black/30 rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">{record.employeeName}</p>
                    <p className="text-gray-400 text-sm">
                      {record.status === 'checked_in' ? 'Checked in' : 'Checked out'} at {new Date(record.checkInTime || record.checkOutTime!).toLocaleTimeString()}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    {record.biometricVerified && <Shield className="w-4 h-4 text-purple-400" />}
                    {record.qrCodeUsed && <QrCode className="w-4 h-4 text-blue-400" />}
                    {record.geofenceCompliant && <Target className="w-4 h-4 text-green-400" />}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};