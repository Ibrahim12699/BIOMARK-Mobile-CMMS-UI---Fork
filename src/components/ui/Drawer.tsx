import React from 'react';
import { X, Home, ClipboardList, Package, Wrench, FileText, Bell, Settings, LogOut, Sun, Moon, Globe } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { Avatar } from './Avatar';
interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
}
export function Drawer({
  isOpen,
  onClose
}: DrawerProps) {
  const navigate = useNavigate();
  const {
    theme,
    toggleTheme
  } = useTheme();
  const {
    t,
    toggleLanguage,
    language
  } = useLanguage();
  const menuItems = [{
    icon: Home,
    label: t('dashboard'),
    path: '/dashboard'
  }, {
    icon: ClipboardList,
    label: t('workOrders'),
    path: '/work-orders'
  }, {
    icon: Package,
    label: t('assets'),
    path: '/assets'
  }, {
    icon: Wrench,
    label: t('spareParts'),
    path: '/spare-parts'
  }, {
    icon: FileText,
    label: t('reports'),
    path: '/reports'
  }, {
    icon: Bell,
    label: t('notifications'),
    path: '/notifications'
  }, {
    icon: Settings,
    label: t('settings'),
    path: '/settings'
  }];
  const handleNavigate = (path: string) => {
    navigate(path);
    onClose();
  };
  return <>
      {/* Backdrop */}
      {isOpen && <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-all duration-300" onClick={onClose} />}

      {/* Drawer */}
      <div className={`fixed top-0 ${language === 'ar' ? 'right-0' : 'left-0'} h-full w-80 max-w-[85vw] bg-white dark:bg-navy-light shadow-2xl z-50 transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : language === 'ar' ? 'translate-x-full' : '-translate-x-full'}`}>
        {/* Header with Gradient */}
        <div className="relative bg-gradient-to-br from-primary via-primary-dark to-navy p-6 pb-8">
          {/* Top Right Controls */}
          <div className="absolute top-4 right-4 flex items-center gap-2">
            {/* Language Toggle Icon */}
            <button onClick={toggleLanguage} className="p-2.5 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl transition-all duration-200 group" title={language === 'en' ? 'العربية' : 'English'}>
              <Globe className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
            </button>

            {/* Theme Toggle Icon */}
            <button onClick={toggleTheme} className="p-2.5 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl transition-all duration-200 group" title={theme === 'light' ? 'Dark Mode' : 'Light Mode'}>
              {theme === 'light' ? <Moon className="w-5 h-5 text-white group-hover:scale-110 transition-transform" /> : <Sun className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />}
            </button>

            {/* Close Button */}
            <button onClick={onClose} className="p-2.5 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl transition-all duration-200 group">
              <X className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
            </button>
          </div>

          {/* Profile Section */}
          <div className="flex items-center gap-4 mt-8">
            <div className="relative">
              <Avatar size="lg" />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-accent rounded-full border-2 border-white animate-pulse"></div>
            </div>
            <div>
              <h3 className="font-semibold text-white text-lg">Ahmed Hassan</h3>
              <p className="text-sm text-white/80">Biomedical Engineer</p>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          {menuItems.map((item, index) => {
          const Icon = item.icon;
          return <button key={index} onClick={() => handleNavigate(item.path)} className="w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl text-gray-700 dark:text-gray-300 hover:bg-primary/5 hover:text-primary dark:hover:bg-primary/10 transition-all duration-200 min-h-[52px] group">
                <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-navy flex items-center justify-center group-hover:bg-primary/10 group-hover:scale-110 transition-all duration-200">
                  <Icon className="w-5 h-5" />
                </div>
                <span className="font-medium">{item.label}</span>
              </button>;
        })}
        </nav>

        {/* Footer Actions */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-navy">
          <button onClick={() => navigate('/login')} className="w-full flex items-center gap-4 px-4 py-3 rounded-2xl text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 shadow-lg hover:shadow-xl transition-all duration-200 min-h-[52px]">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
              <LogOut className="w-5 h-5" />
            </div>
            <span className="font-semibold">{t('logout')}</span>
          </button>
        </div>
      </div>
    </>;
}