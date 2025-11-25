import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, User } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { IconButton } from '../components/ui/IconButton';
import { useLanguage } from '../contexts/LanguageContext';
import { mockAssets } from '../utils/mockData';
export function MaintenanceHistoryPage() {
  const {
    assetId
  } = useParams();
  const navigate = useNavigate();
  const {
    t
  } = useLanguage();
  const asset = mockAssets.find(a => a.id === assetId);
  if (!asset) {
    return <div className="p-4">{t('noData')}</div>;
  }
  // Get maintenance type color for left border
  const getMaintenanceColor = (type: string) => {
    switch (type) {
      case 'preventive':
        return 'border-l-4 border-l-green-500';
      case 'corrective':
        return 'border-l-4 border-l-blue-500';
      case 'calibration':
        return 'border-l-4 border-l-purple-500';
      default:
        return '';
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
      {/* Header */}
      <div className="bg-white dark:bg-navy-light border-b border-gray-200 dark:border-gray-700 p-4 sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <IconButton icon={<ArrowLeft className="w-6 h-6" />} onClick={() => navigate(-1)} />
          <div className="flex-1">
            <h1 className="text-lg font-bold text-gray-900 dark:text-white">
              {t('maintenanceHistory')}
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {asset.name}
            </p>
          </div>
        </div>
      </div>

      {/* Maintenance Records */}
      <div className="p-4 space-y-3">
        {asset.maintenanceHistory.map(record => <Card key={record.id} padding="none" onClick={() => navigate(`/assets/${assetId}/maintenance/${record.id}`)} className={`overflow-hidden cursor-pointer hover:shadow-lg transition-shadow ${getMaintenanceColor(record.type)}`}>
            <div className="p-4">
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                    {record.description}
                  </h3>
                </div>
                <Badge variant={getMaintenanceBadgeVariant(record.type)} size="sm">
                  {t(record.type)}
                </Badge>
              </div>

              {/* Details */}
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span className="text-xs text-gray-600 dark:text-gray-400">
                    {new Date(record.date).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span className="text-xs text-gray-600 dark:text-gray-400">
                    {record.duration} {t('minutes')}
                  </span>
                </div>
                <div className="flex items-center gap-2 col-span-2">
                  <User className="w-4 h-4 text-gray-400" />
                  <span className="text-xs text-gray-600 dark:text-gray-400">
                    {record.technician}
                  </span>
                </div>
              </div>
            </div>
          </Card>)}

        {asset.maintenanceHistory.length === 0 && <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">{t('noData')}</p>
          </div>}
      </div>
    </div>;
}