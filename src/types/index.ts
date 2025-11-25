export interface WorkOrder {
  id: string;
  assetName: string;
  assetId: string;
  location: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'assigned' | 'in-progress' | 'completed' | 'cancelled';
  assignedTo: string;
  createdAt: string;
  dueDate: string;
  description: string;
  steps: MaintenanceStep[];
  photos: string[];
  signature?: string;
}
export interface MaintenanceStep {
  id: string;
  description: string;
  completed: boolean;
  completedAt?: string;
}
export interface Asset {
  id: string;
  name: string;
  model: string;
  serialNumber: string;
  location: string;
  department: string;
  riskScore: 'low' | 'medium' | 'high';
  status: 'operational' | 'maintenance' | 'out-of-service';
  lastMaintenance: string;
  nextPPM: string;
  maintenanceHistory: MaintenanceRecord[];
}
export interface MaintenanceRecord {
  id: string;
  date: string;
  type: 'corrective' | 'preventive' | 'calibration';
  technician: string;
  description: string;
  duration: number;
}
export interface SparePart {
  id: string;
  name: string;
  partNumber: string;
  stockLevel: number;
  minStock: number;
  location: string;
  unitPrice: number;
  status: 'in-stock' | 'low-stock' | 'out-of-stock';
}
export interface Notification {
  id: string;
  type: 'alert' | 'assignment' | 'update';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}
export interface KPI {
  label: string;
  value: string | number;
  change?: number;
  trend?: 'up' | 'down' | 'stable';
}