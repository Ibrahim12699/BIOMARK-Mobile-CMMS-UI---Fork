import { WorkOrder, Asset, SparePart, Notification, KPI } from '../types';
export const mockWorkOrders: WorkOrder[] = [{
  id: 'WO-2024-001',
  assetName: 'Ventilator - Model V300',
  assetId: 'AST-001',
  location: 'ICU - Room 204',
  priority: 'critical',
  status: 'in-progress',
  assignedTo: 'Ahmed Hassan',
  createdAt: '2024-01-15T08:00:00Z',
  dueDate: '2024-01-15T16:00:00Z',
  description: 'Pressure sensor malfunction - requires immediate attention',
  steps: [{
    id: '1',
    description: 'Inspect pressure sensor connections',
    completed: true,
    completedAt: '2024-01-15T09:00:00Z'
  }, {
    id: '2',
    description: 'Test sensor calibration',
    completed: true,
    completedAt: '2024-01-15T09:30:00Z'
  }, {
    id: '3',
    description: 'Replace sensor if needed',
    completed: false
  }, {
    id: '4',
    description: 'Run full system diagnostics',
    completed: false
  }],
  photos: []
}, {
  id: 'WO-2024-002',
  assetName: 'Patient Monitor - PM500',
  assetId: 'AST-002',
  location: 'ER - Station 3',
  priority: 'high',
  status: 'assigned',
  assignedTo: 'Ahmed Hassan',
  createdAt: '2024-01-15T10:00:00Z',
  dueDate: '2024-01-16T10:00:00Z',
  description: 'Display flickering intermittently',
  steps: [{
    id: '1',
    description: 'Check display cable connections',
    completed: false
  }, {
    id: '2',
    description: 'Update firmware',
    completed: false
  }, {
    id: '3',
    description: 'Test display functionality',
    completed: false
  }],
  photos: []
}];
export const mockAssets: Asset[] = [{
  id: 'AST-001',
  name: 'Ventilator - Model V300',
  model: 'V300',
  serialNumber: 'VNT-2023-001',
  location: 'ICU - Room 204',
  department: 'Intensive Care',
  riskScore: 'high',
  status: 'maintenance',
  lastMaintenance: '2024-01-10',
  nextPPM: '2024-02-10',
  maintenanceHistory: [{
    id: '1',
    date: '2024-01-10',
    type: 'preventive',
    technician: 'Ahmed Hassan',
    description: 'Routine PPM - Filter replacement and calibration',
    duration: 120
  }, {
    id: '2',
    date: '2023-12-15',
    type: 'corrective',
    technician: 'Sarah Ahmed',
    description: 'Alarm system repair',
    duration: 90
  }, {
    id: '3',
    date: '2023-11-20',
    type: 'calibration',
    technician: 'Mohammed Ali',
    description: 'Annual calibration - Pressure and flow sensors',
    duration: 150
  }, {
    id: '4',
    date: '2023-10-05',
    type: 'corrective',
    technician: 'Ahmed Hassan',
    description: 'Power supply unit replacement',
    duration: 180
  }, {
    id: '5',
    date: '2023-09-12',
    type: 'preventive',
    technician: 'Fatima Khan',
    description: 'Quarterly PPM - System check and cleaning',
    duration: 90
  }, {
    id: '6',
    date: '2023-08-18',
    type: 'calibration',
    technician: 'Mohammed Ali',
    description: 'Oxygen sensor calibration',
    duration: 60
  }, {
    id: '7',
    date: '2023-07-22',
    type: 'corrective',
    technician: 'Sarah Ahmed',
    description: 'Display screen replacement',
    duration: 120
  }, {
    id: '8',
    date: '2023-06-10',
    type: 'preventive',
    technician: 'Ahmed Hassan',
    description: 'Semi-annual PPM - Full system inspection',
    duration: 150
  }]
}, {
  id: 'AST-002',
  name: 'Patient Monitor - PM500',
  model: 'PM500',
  serialNumber: 'PM-2023-045',
  location: 'ER - Station 3',
  department: 'Emergency',
  riskScore: 'medium',
  status: 'operational',
  lastMaintenance: '2024-01-05',
  nextPPM: '2024-04-05',
  maintenanceHistory: [{
    id: '1',
    date: '2024-01-05',
    type: 'preventive',
    technician: 'Ahmed Hassan',
    description: 'Quarterly PPM - Sensor calibration',
    duration: 60
  }, {
    id: '2',
    date: '2023-11-28',
    type: 'corrective',
    technician: 'Fatima Khan',
    description: 'ECG lead cable replacement',
    duration: 45
  }, {
    id: '3',
    date: '2023-10-15',
    type: 'calibration',
    technician: 'Mohammed Ali',
    description: 'Blood pressure sensor calibration',
    duration: 75
  }, {
    id: '4',
    date: '2023-09-08',
    type: 'preventive',
    technician: 'Sarah Ahmed',
    description: 'Routine maintenance and cleaning',
    duration: 60
  }, {
    id: '5',
    date: '2023-07-20',
    type: 'corrective',
    technician: 'Ahmed Hassan',
    description: 'Battery replacement',
    duration: 30
  }, {
    id: '6',
    date: '2023-06-12',
    type: 'calibration',
    technician: 'Mohammed Ali',
    description: 'Temperature probe calibration',
    duration: 45
  }]
}];
export const mockSpareParts: SparePart[] = [{
  id: 'SP-001',
  name: 'Pressure Sensor - V300',
  partNumber: 'PS-V300-001',
  stockLevel: 3,
  minStock: 5,
  location: 'Storage - Shelf A3',
  unitPrice: 450,
  status: 'low-stock'
}, {
  id: 'SP-002',
  name: 'ECG Cable Set',
  partNumber: 'ECG-CBL-STD',
  stockLevel: 15,
  minStock: 10,
  location: 'Storage - Shelf B1',
  unitPrice: 120,
  status: 'in-stock'
}, {
  id: 'SP-003',
  name: 'HEPA Filter - V300',
  partNumber: 'HEPA-V300',
  stockLevel: 0,
  minStock: 3,
  location: 'Storage - Shelf A2',
  unitPrice: 280,
  status: 'out-of-stock'
}];
export const mockNotifications: Notification[] = [{
  id: '1',
  type: 'alert',
  title: 'Critical Work Order',
  message: 'WO-2024-001 requires immediate attention - ICU Ventilator',
  timestamp: '2024-01-15T08:00:00Z',
  read: false
}, {
  id: '2',
  type: 'assignment',
  title: 'New Work Order Assigned',
  message: 'WO-2024-002 has been assigned to you',
  timestamp: '2024-01-15T10:00:00Z',
  read: false
}, {
  id: '3',
  type: 'update',
  title: 'PPM Schedule Updated',
  message: '5 assets require preventive maintenance this week',
  timestamp: '2024-01-14T14:00:00Z',
  read: true
}];
export const mockKPIs: KPI[] = [{
  label: 'Completion Rate',
  value: '94%',
  change: 2,
  trend: 'up'
}, {
  label: 'Avg Response Time',
  value: '2.3h',
  change: -0.5,
  trend: 'down'
}, {
  label: 'Overdue WOs',
  value: 3,
  change: -2,
  trend: 'down'
}, {
  label: 'Assets at Risk',
  value: 7,
  change: 1,
  trend: 'up'
}];