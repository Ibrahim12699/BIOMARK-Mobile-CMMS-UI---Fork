import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ClipboardCheck, MapPin, Calendar, Flag, Clock } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { IconButton } from '../components/ui/IconButton';
import { useLanguage } from '../contexts/LanguageContext';
interface InspectionTask {
  id: string;
  taskNumber: string;
  location: string;
  startDate: string;
  dueDate: string;
  isOverdue: boolean;
}
export function InspectionsPage() {
  const navigate = useNavigate();
  const {
    t
  } = useLanguage();
  // Mock inspection tasks data - sorted by most recent first
  const inspectionTasks: InspectionTask[] = [{
    id: 'INS-001',
    taskNumber: 'INS-2024-001',
    location: 'ICU - Room 205',
    startDate: '2024-01-15',
    dueDate: '2024-01-10',
    isOverdue: true
  }, {
    id: 'INS-002',
    taskNumber: 'INS-2024-002',
    location: 'Emergency - Station 3',
    startDate: '2024-01-14',
    dueDate: '2024-01-20',
    isOverdue: false
  }, {
    id: 'INS-003',
    taskNumber: 'INS-2024-003',
    location: 'Operating Room 2',
    startDate: '2024-01-13',
    dueDate: '2024-01-22',
    isOverdue: false
  }, {
    id: 'INS-004',
    taskNumber: 'INS-2024-004',
    location: 'General Ward - Floor 3',
    startDate: '2024-01-12',
    dueDate: '2024-01-25',
    isOverdue: false
  }, {
    id: 'INS-005',
    taskNumber: 'INS-2024-005',
    location: 'Radiology Department',
    startDate: '2024-01-10',
    dueDate: '2024-01-28',
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
              {t('inspections')}
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {t('assignedTasks')}
            </p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {inspectionTasks.length}
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              {t('tasksAssigned')}
            </p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Summary Card */}
        <Card padding="md" className="bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-900/20 dark:to-blue-900/10 border-2 border-blue-200 dark:border-blue-800">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30">
              <ClipboardCheck className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-blue-900 dark:text-blue-300">
                {t('assignedInspections')}
              </h3>
              <p className="text-xs text-blue-800 dark:text-blue-400">
                {inspectionTasks.filter(t => t.isOverdue).length}{' '}
                {t('overdueTask').toLowerCase()} •{' '}
                {inspectionTasks.filter(t => !t.isOverdue).length}{' '}
                {t('active').toLowerCase()}
              </p>
            </div>
          </div>
        </Card>

        {/* Inspection Tasks List */}
        <div className="space-y-3">
          {inspectionTasks.map(task => <Card key={task.id} padding="md" onClick={() => navigate(`/inspections/${task.id}`)} className={`hover:shadow-xl transition-all duration-200 cursor-pointer ${task.isOverdue ? 'border-2 border-red-200 dark:border-red-800 bg-gradient-to-br from-red-50 to-red-100/50 dark:from-red-900/20 dark:to-red-900/10' : 'border border-gray-200 dark:border-gray-800 hover:border-blue-200 dark:hover:border-blue-800'}`}>
              {/* Task Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start gap-3 flex-1">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${task.isOverdue ? 'bg-gradient-to-br from-red-500 to-red-600 shadow-lg shadow-red-500/30' : 'bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg shadow-blue-500/30'}`}>
                    <ClipboardCheck className="w-6 h-6 text-white" />
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
                    <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{task.location}</span>
                    </div>
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
                <Badge variant={task.isOverdue ? 'danger' : 'primary'} size="sm">
                  {task.isOverdue ? t('overdueTask') : t('active')}
                </Badge>
              </div>
            </Card>)}
        </div>

        {/* Empty State (if no tasks) */}
        {inspectionTasks.length === 0 && <Card padding="lg" className="text-center">
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <ClipboardCheck className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              {t('noInspectionsAssigned')}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {t('noData')}
            </p>
          </Card>}
      </div>
    </div>;
}