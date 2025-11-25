import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Wrench, MapPin, Calendar, Flag, Clock, Hash } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { IconButton } from '../components/ui/IconButton';
import { useLanguage } from '../contexts/LanguageContext';
interface PMTask {
  id: string;
  taskNumber: string;
  deviceName: string;
  deviceCode: string;
  location: string;
  startDate: string;
  dueDate: string;
  isOverdue: boolean;
}
export function PreventiveMaintenancePage() {
  const navigate = useNavigate();
  const {
    t
  } = useLanguage();
  // Mock PM tasks data - sorted by most recent first
  const pmTasks: PMTask[] = [{
    id: 'PM-001',
    taskNumber: 'PM-2024-001',
    deviceName: 'Ventilator - Model V300',
    deviceCode: 'VNT-2024-001',
    location: 'ICU - Room 205',
    startDate: '2024-01-15',
    dueDate: '2024-01-12',
    isOverdue: true
  }, {
    id: 'PM-002',
    taskNumber: 'PM-2024-002',
    deviceName: 'Patient Monitor - PM500',
    deviceCode: 'MON-2024-045',
    location: 'Emergency - Station 3',
    startDate: '2024-01-14',
    dueDate: '2024-01-20',
    isOverdue: false
  }, {
    id: 'PM-003',
    taskNumber: 'PM-2024-003',
    deviceName: 'Infusion Pump - IP200',
    deviceCode: 'INF-2024-089',
    location: 'Operating Room 2',
    startDate: '2024-01-13',
    dueDate: '2024-01-22',
    isOverdue: false
  }, {
    id: 'PM-004',
    taskNumber: 'PM-2024-004',
    deviceName: 'Defibrillator - DF300',
    deviceCode: 'DEF-2024-012',
    location: 'General Ward - Floor 3',
    startDate: '2024-01-12',
    dueDate: '2024-01-09',
    isOverdue: true
  }, {
    id: 'PM-005',
    taskNumber: 'PM-2024-005',
    deviceName: 'X-Ray Machine - XR400',
    deviceCode: 'XRY-2024-003',
    location: 'Radiology Department',
    startDate: '2024-01-11',
    dueDate: '2024-01-25',
    isOverdue: false
  }, {
    id: 'PM-006',
    taskNumber: 'PM-2024-006',
    deviceName: 'Ultrasound - US500',
    deviceCode: 'ULS-2024-021',
    location: 'Obstetrics - Room 8',
    startDate: '2024-01-10',
    dueDate: '2024-01-28',
    isOverdue: false
  }, {
    id: 'PM-007',
    taskNumber: 'PM-2024-007',
    deviceName: 'ECG Machine - ECG600',
    deviceCode: 'ECG-2024-055',
    location: 'Cardiology - Station 2',
    startDate: '2024-01-09',
    dueDate: '2024-01-30',
    isOverdue: false
  }, {
    id: 'PM-008',
    taskNumber: 'PM-2024-008',
    deviceName: 'Anesthesia Machine - AM400',
    deviceCode: 'ANS-2024-007',
    location: 'Operating Room 5',
    startDate: '2024-01-08',
    dueDate: '2024-02-01',
    isOverdue: false
  }];
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };
  return <div className="min-h-screen bg-gray-50 dark:bg-navy pb-6">
      {/* Header */}
      <div className="bg-white dark:bg-navy-light border-b border-gray-200 dark:border-gray-700 p-4 sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <IconButton icon={<ArrowLeft className="w-6 h-6" />} onClick={() => navigate(-1)} />
          <div className="flex-1">
            <h1 className="text-lg font-bold text-gray-900 dark:text-white">
              {t('preventiveMaintenance')}
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {t('assignedTasks')}
            </p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              {pmTasks.length}
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              {t('tasksAssigned')}
            </p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Summary Card */}
        <Card padding="md" className="bg-gradient-to-br from-purple-50 to-purple-100/50 dark:from-purple-900/20 dark:to-purple-900/10 border-2 border-purple-200 dark:border-purple-800">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/30">
              <Wrench className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-purple-900 dark:text-purple-300">
                {t('assignedPM')}
              </h3>
              <p className="text-xs text-purple-800 dark:text-purple-400">
                {pmTasks.filter(t => t.isOverdue).length}{' '}
                {t('overdueTask').toLowerCase()} •{' '}
                {pmTasks.filter(t => !t.isOverdue).length}{' '}
                {t('active').toLowerCase()}
              </p>
            </div>
          </div>
        </Card>

        {/* PM Tasks List */}
        <div className="space-y-3">
          {pmTasks.map(task => <Card key={task.id} padding="md" onClick={() => navigate(`/preventive-maintenance/${task.id}`)} className={`hover:shadow-xl transition-all duration-200 cursor-pointer ${task.isOverdue ? 'border-2 border-red-200 dark:border-red-800 bg-gradient-to-br from-red-50 to-red-100/50 dark:from-red-900/20 dark:to-red-900/10' : 'border border-gray-200 dark:border-gray-800 hover:border-purple-200 dark:hover:border-purple-800'}`}>
              {/* Task Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start gap-3 flex-1">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${task.isOverdue ? 'bg-gradient-to-br from-red-500 to-red-600 shadow-lg shadow-red-500/30' : 'bg-gradient-to-br from-purple-500 to-purple-600 shadow-lg shadow-purple-500/30'}`}>
                    <Wrench className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-sm font-bold text-gray-900 dark:text-white">
                        {task.taskNumber}
                      </h3>
                      {task.isOverdue && <div className="flex items-center gap-1 px-2 py-0.5 bg-red-500 rounded-full">
                          <Flag className="w-3 h-3 text-white" />
                          <span className="text-xs font-semibold text-white">
                            {t('overdueTask')}
                          </span>
                        </div>}
                    </div>
                  </div>
                </div>
              </div>

              {/* Device Information */}
              <div className="space-y-2 mb-3">
                <div className="flex items-start gap-2">
                  <Wrench className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {t('deviceName')}
                    </p>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      {task.deviceName}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <Hash className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {t('deviceCode')}
                    </p>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      {task.deviceCode}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {t('location')}
                    </p>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      {task.location}
                    </p>
                  </div>
                </div>
              </div>

              {/* Dates Section */}
              <div className="grid grid-cols-2 gap-3">
                {/* Start Date */}
                <div className="p-3 bg-gray-50 dark:bg-navy rounded-xl">
                  <div className="flex items-center gap-2 mb-1">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <p className="text-xs font-medium text-gray-600 dark:text-gray-400">
                      {t('startDate')}
                    </p>
                  </div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    {formatDate(task.startDate)}
                  </p>
                </div>

                {/* Due Date */}
                <div className={`p-3 rounded-xl ${task.isOverdue ? 'bg-red-100 dark:bg-red-900/30' : 'bg-green-50 dark:bg-green-900/20'}`}>
                  <div className="flex items-center gap-2 mb-1">
                    <Clock className={`w-4 h-4 ${task.isOverdue ? 'text-red-500' : 'text-green-500'}`} />
                    <p className={`text-xs font-medium ${task.isOverdue ? 'text-red-700 dark:text-red-400' : 'text-green-700 dark:text-green-400'}`}>
                      {t('dueDate')}
                    </p>
                  </div>
                  <p className={`text-sm font-semibold ${task.isOverdue ? 'text-red-900 dark:text-red-300' : 'text-green-900 dark:text-green-300'}`}>
                    {formatDate(task.dueDate)}
                  </p>
                </div>
              </div>

              {/* Status Badge */}
              <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                <Badge variant={task.isOverdue ? 'danger' : 'secondary'} size="sm">
                  {task.isOverdue ? t('overdueTask') : t('active')}
                </Badge>
              </div>
            </Card>)}
        </div>

        {/* Empty State (if no tasks) */}
        {pmTasks.length === 0 && <Card padding="lg" className="text-center">
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Wrench className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              {t('noPMAssigned')}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {t('noData')}
            </p>
          </Card>}
      </div>
    </div>;
}