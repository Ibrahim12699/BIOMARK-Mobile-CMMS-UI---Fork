import React from 'react';
import { Search, Package } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useLanguage } from '../contexts/LanguageContext';
import { mockSpareParts } from '../utils/mockData';
export function SparePartsPage() {
  const {
    t
  } = useLanguage();
  return <div className="p-4 space-y-4">
      {/* Header */}
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
        {t('spareParts')}
      </h1>

      {/* Search */}
      <Input placeholder={t('search')} icon={<Search className="w-5 h-5" />} />

      {/* Parts List */}
      <div className="space-y-3">
        {mockSpareParts.map(part => <Card key={part.id} padding="md">
            <div className="flex gap-3">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Package className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between mb-1">
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {part.name}
                    </h3>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {part.partNumber}
                    </p>
                  </div>
                  <Badge variant={part.status === 'out-of-stock' ? 'danger' : part.status === 'low-stock' ? 'warning' : 'success'} size="sm">
                    {part.status}
                  </Badge>
                </div>
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                  <div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Stock: {part.stockLevel} / Min: {part.minStock}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {part.location}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      {t('issue')}
                    </Button>
                    <Button variant="secondary" size="sm">
                      {t('return')}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>)}
      </div>
    </div>;
}