import React from 'react';
import { Search, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Input } from '../components/ui/Input';
import { IconButton } from '../components/ui/IconButton';
import { useLanguage } from '../contexts/LanguageContext';
import { mockWorkOrders } from '../utils/mockData';
export function WorkOrdersPage() {
  const navigate = useNavigate();
  const {
    t
  } = useLanguage();
  return <div className="p-4 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {t('workOrders')}
        </h1>
        <IconButton icon={<Filter className="w-6 h-6" />} />
      </div>

      {/* Search */}
      <Input placeholder={t('search')} icon={<Search className="w-5 h-5" />} />

      {/* Work Orders List */}
      <div className="space-y-3">
        {mockWorkOrders.map(wo => <Card key={wo.id} padding="md" onClick={() => navigate(`/work-orders/${wo.id}`)}>
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">
                    {wo.id}
                  </span>
                  <Badge variant={wo.priority === 'critical' ? 'danger' : wo.priority === 'high' ? 'warning' : 'neutral'} size="sm">
                    {wo.priority}
                  </Badge>
                </div>
                <p className="text-sm text-gray-900 dark:text-white font-medium">
                  {wo.assetName}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                  {wo.location}
                </p>
              </div>
              <Badge variant={wo.status === 'in-progress' ? 'primary' : 'neutral'} size="sm">
                {wo.status}
              </Badge>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-gray-200 dark:border-gray-700">
              <span className="text-xs text-gray-600 dark:text-gray-400">
                Due: {new Date(wo.dueDate).toLocaleDateString()}
              </span>
              <span className="text-xs text-gray-600 dark:text-gray-400">
                {wo.steps.filter(s => s.completed).length}/{wo.steps.length}{' '}
                steps
              </span>
            </div>
          </Card>)}
      </div>
    </div>;
}