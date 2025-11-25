import React from 'react';
import { TrendingUp, TrendingDown, FileText, Download } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { useLanguage } from '../contexts/LanguageContext';
import { mockKPIs } from '../utils/mockData';
export function ReportsPage() {
  const {
    t
  } = useLanguage();
  const myCompletions = [{
    id: 'WO-2024-001',
    asset: 'Ventilator V300',
    date: '2024-01-15',
    duration: '2.5h'
  }, {
    id: 'WO-2024-003',
    asset: 'Patient Monitor',
    date: '2024-01-14',
    duration: '1.2h'
  }, {
    id: 'WO-2024-005',
    asset: 'Infusion Pump',
    date: '2024-01-14',
    duration: '0.8h'
  }];
  return <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {t('reports')}
        </h1>
        <Button variant="outline" size="sm" icon={<Download className="w-4 h-4" />}>
          {t('export')}
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 gap-3">
        {mockKPIs.map((kpi, index) => <Card key={index} padding="md">
            <div className="flex items-start justify-between mb-2">
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {kpi.label}
              </p>
              {kpi.trend && (kpi.trend === 'up' ? <TrendingUp className="w-4 h-4 text-green-600" /> : <TrendingDown className="w-4 h-4 text-red-600" />)}
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {kpi.value}
            </p>
            {kpi.change !== undefined && <p className={`text-xs mt-1 ${kpi.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {kpi.change > 0 ? '+' : ''}
                {kpi.change}% from last month
              </p>}
          </Card>)}
      </div>

      {/* My Completions */}
      <Card padding="md">
        <h2 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
          My Completions
        </h2>
        <div className="space-y-3">
          {myCompletions.map(completion => <div key={completion.id} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-navy rounded-lg">
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                <FileText className="w-5 h-5 text-accent" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">
                    {completion.id}
                  </span>
                  <Badge variant="success" size="sm">
                    Completed
                  </Badge>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  {completion.asset}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  {completion.date}
                </p>
                <p className="text-xs font-medium text-gray-900 dark:text-white">
                  {completion.duration}
                </p>
              </div>
            </div>)}
        </div>
      </Card>
    </div>;
}