import React from 'react';
import { AlertCircle, ClipboardList, Info } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useLanguage } from '../contexts/LanguageContext';
import { mockNotifications } from '../utils/mockData';
export function NotificationsPage() {
  const {
    t
  } = useLanguage();
  const getIcon = (type: string) => {
    switch (type) {
      case 'alert':
        return <AlertCircle className="w-5 h-5 text-red-600" />;
      case 'assignment':
        return <ClipboardList className="w-5 h-5 text-blue-600" />;
      case 'update':
        return <Info className="w-5 h-5 text-green-600" />;
      default:
        return <Info className="w-5 h-5 text-gray-600" />;
    }
  };
  const groupedNotifications = {
    today: mockNotifications.filter(n => !n.read),
    earlier: mockNotifications.filter(n => n.read)
  };
  return <div className="p-4 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {t('notifications')}
        </h1>
        <Button variant="ghost" size="sm">
          {t('markAllRead')}
        </Button>
      </div>

      {/* Today */}
      {groupedNotifications.today.length > 0 && <div>
          <h2 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-3">
            Today
          </h2>
          <div className="space-y-2">
            {groupedNotifications.today.map(notification => <Card key={notification.id} padding="md" className={!notification.read ? 'border-l-4 border-primary' : ''}>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 mt-1">
                    {getIcon(notification.type)}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                      {notification.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {notification.message}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                      {new Date(notification.timestamp).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              </Card>)}
          </div>
        </div>}

      {/* Earlier */}
      {groupedNotifications.earlier.length > 0 && <div>
          <h2 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-3">
            Earlier
          </h2>
          <div className="space-y-2">
            {groupedNotifications.earlier.map(notification => <Card key={notification.id} padding="md" className="opacity-60">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 mt-1">
                    {getIcon(notification.type)}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                      {notification.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {notification.message}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                      {new Date(notification.timestamp).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </Card>)}
          </div>
        </div>}
    </div>;
}