import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, User, Wrench, DollarSign, FileText } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { IconButton } from '../components/ui/IconButton';
import { useLanguage } from '../contexts/LanguageContext';
import { mockAssets } from '../utils/mockData';
export function MaintenanceDetailPage() {
  const {
    assetId,
    maintenanceId
  } = useParams();
  const navigate = useNavigate();
  const {
    t
  } = useLanguage();
  const asset = mockAssets.find(a => a.id === assetId);
  const maintenance = asset?.maintenanceHistory.find(m => m.id === maintenanceId);
  if (!asset || !maintenance) {
    return <div className="p-4">{t('noData')}</div>;
  }
  // Get maintenance type color for header
  const getMaintenanceColor = (type: string) => {
    switch (type) {
      case 'preventive':
        return 'from-green-500 via-green-600 to-green-700';
      case 'corrective':
        return 'from-blue-500 via-blue-600 to-blue-700';
      case 'calibration':
        return 'from-purple-500 via-purple-600 to-purple-700';
      default:
        return 'from-gray-500 via-gray-600 to-gray-700';
    }
  };
  // Get badge variant for maintenance type
  const getMaintenanceBadgeVariant = (type: string) => {
    switch (type) {
      case 'preventive':
        return 'success';
      case 'corrective':
        return 'primary';
      case 'calibration':
        return 'secondary';
      default:
        return 'default';
    }
  };
  return <div className="min-h-screen bg-gray-50 dark:bg-navy pb-24">
      {/* Header with gradient based on maintenance type */}
      <div className={`bg-gradient-to-br ${getMaintenanceColor(maintenance.type)} p-4 pb-8 sticky top-0 z-10 shadow-lg`}>
        <div className="flex items-center gap-3 mb-6">
          <IconButton icon={<ArrowLeft className="w-6 h-6" />} onClick={() => navigate(-1)} className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20" />
          <div className="flex-1">
            <h1 className="text-xl font-bold text-white drop-shadow-lg">
              {t('maintenanceDetails')}
            </h1>
            <p className="text-sm text-white/80">{asset.name}</p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4 -mt-4">
        {/* Main Info Card */}
        <Card padding="md">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                {maintenance.description}
              </h2>
            </div>
            <Badge variant={getMaintenanceBadgeVariant(maintenance.type)}>
              {t(maintenance.type)}
            </Badge>
          </div>

          <div className="space-y-3">
            {/* Date */}
            <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-navy rounded-lg">
              <Calendar className="w-5 h-5 text-gray-400" />
              <div className="flex-1">
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  {t('date')}
                </p>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {new Date(maintenance.date).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
                </p>
              </div>
            </div>

            {/* Duration */}
            <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-navy rounded-lg">
              <Clock className="w-5 h-5 text-gray-400" />
              <div className="flex-1">
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  {t('duration')}
                </p>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {maintenance.duration} {t('minutes')}
                </p>
              </div>
            </div>

            {/* Technician */}
            <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-navy rounded-lg">
              <User className="w-5 h-5 text-gray-400" />
              <div className="flex-1">
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  {t('completedBy')}
                </p>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {maintenance.technician}
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Work Performed */}
        <Card padding="md">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Wrench className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-sm font-semibold text-gray-900 dark:text-white">
              {t('description')}
            </h2>
          </div>

          <div className="p-4 bg-gray-50 dark:bg-navy rounded-lg">
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
              {maintenance.description}
            </p>
          </div>
        </Card>

        {/* Parts Used */}
        <Card padding="md">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
              <Wrench className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <h2 className="text-sm font-semibold text-gray-900 dark:text-white">
              {t('partsUsed')}
            </h2>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-navy rounded-lg">
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {maintenance.type === 'preventive' ? 'HEPA Filter' : 'Pressure Sensor'}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  {maintenance.type === 'preventive' ? 'Part #: HEPA-V300' : 'Part #: PS-V300-001'}
                </p>
              </div>
              <span className="text-sm font-semibold text-gray-900 dark:text-white">
                {maintenance.type === 'preventive' ? '$280' : '$450'}
              </span>
            </div>

            {maintenance.type === 'corrective' && <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-navy rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    Cable Assembly
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Part #: CA-V300-002
                  </p>
                </div>
                <span className="text-sm font-semibold text-gray-900 dark:text-white">
                  $120
                </span>
              </div>}
          </div>
        </Card>

        {/* Cost Breakdown */}
        <Card padding="md">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <h2 className="text-sm font-semibold text-gray-900 dark:text-white">
              Cost Summary
            </h2>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-navy rounded-lg">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {t('laborCost')}
              </span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                ${(maintenance.duration * 1.5).toFixed(2)}
              </span>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-navy rounded-lg">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {t('partsCost')}
              </span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                ${maintenance.type === 'preventive' ? '280.00' : '570.00'}
              </span>
            </div>

            <div className="flex items-center justify-between p-4 bg-primary/10 dark:bg-primary/20 rounded-lg border-2 border-primary/20">
              <span className="text-sm font-semibold text-gray-900 dark:text-white">
                {t('totalCost')}
              </span>
              <span className="text-lg font-bold text-primary">
                $
                {(maintenance.duration * 1.5 + (maintenance.type === 'preventive' ? 280 : 570)).toFixed(2)}
              </span>
            </div>
          </div>
        </Card>

        {/* Notes */}
        <Card padding="md">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center">
              <FileText className="w-5 h-5 text-orange-600 dark:text-orange-400" />
            </div>
            <h2 className="text-sm font-semibold text-gray-900 dark:text-white">
              {t('notes')}
            </h2>
          </div>

          <div className="p-4 bg-gray-50 dark:bg-navy rounded-lg">
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
              {maintenance.type === 'preventive' ? 'Routine preventive maintenance completed successfully. All systems tested and functioning within normal parameters. Filter replaced as scheduled. Next PPM due in 30 days.' : maintenance.type === 'corrective' ? 'Pressure sensor malfunction identified and resolved. Replaced faulty sensor and recalibrated system. Performed full diagnostic test - all parameters within acceptable range. Equipment returned to service.' : 'Calibration performed according to manufacturer specifications. All measurements verified against certified standards. Documentation updated. Next calibration due in 6 months.'}
            </p>
          </div>
        </Card>
      </div>
    </div>;
}