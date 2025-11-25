import React, { useState, Component } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ClipboardCheck, MapPin, Calendar, Clock, User, AlertCircle, Package, Hash, FileText, Flag, CheckCircle } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { IconButton } from '../components/ui/IconButton';
import { Button } from '../components/ui/Button';
import { useLanguage } from '../contexts/LanguageContext';
interface Equipment {
  id: string;
  name: string;
  code: string;
  serialNumber: string;
  model: string;
  location: string;
  isCompleted?: boolean;
}
interface InspectionDetail {
  id: string;
  taskNumber: string;
  location: string;
  startDate: string;
  dueDate: string;
  isOverdue: boolean;
  description: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  assignedTo: string;
  createdDate: string;
  estimatedDuration: number;
  status: 'pending' | 'in-progress' | 'completed';
  equipment: Equipment[];
}
export function InspectionDetailPage() {
  const {
    id
  } = useParams();
  const navigate = useNavigate();
  const {
    t
  } = useLanguage();
  // Track completed equipment (in real app, this would come from API/state)
  const [completedEquipment, setCompletedEquipment] = useState<string[]>([]);
  // Mock inspection detail data
  const inspectionDetail: InspectionDetail = {
    id: id || 'INS-001',
    taskNumber: 'INS-2024-001',
    location: 'ICU - Room 205',
    startDate: '2024-01-15',
    dueDate: '2024-01-10',
    isOverdue: true,
    description: 'Routine safety inspection of all medical equipment in ICU Room 205. Check for proper functioning, safety compliance, and maintenance requirements.',
    priority: 'high',
    assignedTo: 'Ahmed Al-Mansouri',
    createdDate: '2024-01-08',
    estimatedDuration: 3,
    status: 'pending',
    equipment: [{
      id: 'EQ-001',
      name: 'Ventilator',
      code: 'VNT-2024-001',
      serialNumber: 'SN-VNT-45678',
      model: 'Model V300',
      location: 'ICU - Room 205'
    }, {
      id: 'EQ-002',
      name: 'Patient Monitor',
      code: 'MON-2024-045',
      serialNumber: 'SN-MON-12345',
      model: 'PM500',
      location: 'ICU - Room 205'
    }, {
      id: 'EQ-003',
      name: 'Infusion Pump',
      code: 'INF-2024-089',
      serialNumber: 'SN-INF-78901',
      model: 'IP200',
      location: 'ICU - Room 205'
    }, {
      id: 'EQ-004',
      name: 'Defibrillator',
      code: 'DEF-2024-012',
      serialNumber: 'SN-DEF-34567',
      model: 'DF300',
      location: 'ICU - Room 205'
    }]
  };
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical':
        return 'danger';
      case 'high':
        return 'warning';
      case 'medium':
        return 'primary';
      case 'low':
        return 'neutral';
      default:
        return 'neutral';
    }
  };
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'in-progress':
        return 'primary';
      case 'pending':
        return 'neutral';
      default:
        return 'neutral';
    }
  };
  const handleEquipmentClick = (equipmentId: string) => {
    // Create equipment list for navigation
    const equipmentIds = inspectionDetail.equipment.map(e => e.id);
    const equipmentParam = encodeURIComponent(JSON.stringify(equipmentIds));
    navigate(`/inspections/${id}/equipment/${equipmentId}?equipment=${equipmentParam}`);
  };
  const isEquipmentCompleted = (equipmentId: string) => {
    return completedEquipment.includes(equipmentId);
  };
  const completedCount = completedEquipment.length;
  const pendingCount = inspectionDetail.equipment.length - completedCount;
  return <div className="min-h-screen bg-gray-50 dark:bg-navy pb-6">
      {/* Header */}
      <div className="bg-white dark:bg-navy-light border-b border-gray-200 dark:border-gray-700 p-4 sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <IconButton icon={<ArrowLeft className="w-6 h-6" />} onClick={() => navigate(-1)} />
          <div className="flex-1">
            <h1 className="text-lg font-bold text-gray-900 dark:text-white">
              {inspectionDetail.taskNumber}
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {t('inspectionDetails')}
            </p>
          </div>
          {inspectionDetail.isOverdue && <div className="flex items-center gap-1 px-3 py-1.5 bg-red-500 rounded-full">
              <Flag className="w-4 h-4 text-white" />
              <span className="text-xs font-semibold text-white">
                {t('overdueTask')}
              </span>
            </div>}
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Status Card */}
        <Card padding="md" className={`${inspectionDetail.isOverdue ? 'bg-gradient-to-br from-red-50 to-red-100/50 dark:from-red-900/20 dark:to-red-900/10 border-2 border-red-200 dark:border-red-800' : 'bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-900/20 dark:to-blue-900/10 border-2 border-blue-200 dark:border-blue-800'}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${inspectionDetail.isOverdue ? 'bg-gradient-to-br from-red-500 to-red-600 shadow-lg shadow-red-500/30' : 'bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg shadow-blue-500/30'}`}>
                <ClipboardCheck className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className={`text-sm font-semibold ${inspectionDetail.isOverdue ? 'text-red-900 dark:text-red-300' : 'text-blue-900 dark:text-blue-300'}`}>
                  {t('jobStatus')}
                </h3>
                <p className={`text-xs ${inspectionDetail.isOverdue ? 'text-red-800 dark:text-red-400' : 'text-blue-800 dark:text-blue-400'}`}>
                  {t(inspectionDetail.status)}
                </p>
              </div>
            </div>
            <Badge variant={getStatusColor(inspectionDetail.status)}>
              {t(inspectionDetail.status)}
            </Badge>
          </div>
        </Card>

        {/* Job Details */}
        <Card padding="md">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
              <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <h2 className="text-sm font-semibold text-gray-900 dark:text-white">
              {t('jobDetails')}
            </h2>
          </div>

          <div className="space-y-3">
            {/* Location */}
            <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-navy rounded-xl">
              <MapPin className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                  {t('location')}
                </p>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                  {inspectionDetail.location}
                </p>
              </div>
            </div>

            {/* Priority */}
            <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-navy rounded-xl">
              <AlertCircle className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                  {t('priority')}
                </p>
                <Badge variant={getPriorityColor(inspectionDetail.priority)} size="sm">
                  {t(inspectionDetail.priority)}
                </Badge>
              </div>
            </div>

            {/* Assigned To */}
            <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-navy rounded-xl">
              <User className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                  {t('assignedTo')}
                </p>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                  {inspectionDetail.assignedTo}
                </p>
              </div>
            </div>

            {/* Dates Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-gray-50 dark:bg-navy rounded-xl">
                <div className="flex items-center gap-2 mb-1">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <p className="text-xs font-medium text-gray-600 dark:text-gray-400">
                    {t('startDate')}
                  </p>
                </div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                  {formatDate(inspectionDetail.startDate)}
                </p>
              </div>

              <div className={`p-3 rounded-xl ${inspectionDetail.isOverdue ? 'bg-red-100 dark:bg-red-900/30' : 'bg-green-50 dark:bg-green-900/20'}`}>
                <div className="flex items-center gap-2 mb-1">
                  <Clock className={`w-4 h-4 ${inspectionDetail.isOverdue ? 'text-red-500' : 'text-green-500'}`} />
                  <p className={`text-xs font-medium ${inspectionDetail.isOverdue ? 'text-red-700 dark:text-red-400' : 'text-green-700 dark:text-green-400'}`}>
                    {t('dueDate')}
                  </p>
                </div>
                <p className={`text-sm font-semibold ${inspectionDetail.isOverdue ? 'text-red-900 dark:text-red-300' : 'text-green-900 dark:text-green-300'}`}>
                  {formatDate(inspectionDetail.dueDate)}
                </p>
              </div>
            </div>

            {/* Duration */}
            <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-navy rounded-xl">
              <Clock className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                  {t('estimatedDuration')}
                </p>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                  {inspectionDetail.estimatedDuration} {t('hours')}
                </p>
              </div>
            </div>

            {/* Description */}
            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl">
              <p className="text-xs font-medium text-blue-700 dark:text-blue-400 mb-2">
                {t('jobDescription')}
              </p>
              <p className="text-sm text-blue-900 dark:text-blue-300 leading-relaxed">
                {inspectionDetail.description}
              </p>
            </div>
          </div>
        </Card>

        {/* Equipment List */}
        <Card padding="md">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center">
                <Package className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h2 className="text-sm font-semibold text-gray-900 dark:text-white">
                  {t('equipmentList')}
                </h2>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  {inspectionDetail.equipment.length} {t('items')}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {completedCount > 0 && <Badge variant="success" size="sm">
                  ✓ {completedCount}
                </Badge>}
              {pendingCount > 0 && <Badge variant="danger" size="sm">
                  ⏰ {pendingCount}
                </Badge>}
            </div>
          </div>

          <div className="space-y-3">
            {inspectionDetail.equipment.map(item => {
            const isCompleted = isEquipmentCompleted(item.id);
            return <Card key={item.id} padding="md" onClick={() => handleEquipmentClick(item.id)} className={`hover:shadow-lg transition-all cursor-pointer border-2 ${isCompleted ? 'border-green-200 dark:border-green-800 bg-gradient-to-br from-green-50 to-green-100/50 dark:from-green-900/20 dark:to-green-900/10' : 'border-red-200 dark:border-red-800 bg-gradient-to-br from-red-50 to-red-100/50 dark:from-red-900/20 dark:to-red-900/10 hover:border-red-300 dark:hover:border-red-700'}`}>
                  <div className="flex items-start gap-3">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0 ${isCompleted ? 'bg-gradient-to-br from-green-500 to-green-600 shadow-green-500/30' : 'bg-gradient-to-br from-red-500 to-red-600 shadow-red-500/30'}`}>
                      {isCompleted ? <CheckCircle className="w-6 h-6 text-white" /> : <Clock className="w-6 h-6 text-white" />}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-sm font-bold text-gray-900 dark:text-white">
                          {item.name}
                        </h3>
                        <Badge variant={isCompleted ? 'success' : 'danger'} size="sm">
                          {isCompleted ? t('completed') : t('pending')}
                        </Badge>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                          <Hash className="w-3.5 h-3.5" />
                          <span>{item.code}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                          <FileText className="w-3.5 h-3.5" />
                          <span>
                            {t('serialNumber')}: {item.serialNumber}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                          <FileText className="w-3.5 h-3.5" />
                          <span>
                            {t('model')}: {item.model}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>;
          })}
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" fullWidth>
            {t('cancel')}
          </Button>
          <Button variant="primary" fullWidth onClick={() => handleEquipmentClick(inspectionDetail.equipment[0].id)}>
            {t('startInspection')}
          </Button>
        </div>
      </div>
    </div>;
}