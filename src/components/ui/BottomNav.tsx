import React from 'react';
import { Home, ClipboardList, Package, Menu } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { useScrollDirection } from '../../hooks/useScrollDirection';
interface BottomNavProps {
  onMenuClick: () => void;
}
export function BottomNav({
  onMenuClick
}: BottomNavProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    t
  } = useLanguage();
  const scrollDirection = useScrollDirection();
  const navItems = [{
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
    icon: Menu,
    label: 'More',
    path: '#',
    onClick: onMenuClick
  }];
  return <div className={`fixed bottom-0 left-0 right-0 z-50 px-4 pb-3 safe-area-bottom pointer-events-none transition-transform duration-300 ${scrollDirection === 'down' ? 'translate-y-full' : 'translate-y-0'}`}>
      <nav className="max-w-md mx-auto relative rounded-2xl shadow-2xl pointer-events-auto overflow-hidden">
        {/* Circuit board background */}
        <div className="absolute inset-0 opacity-30" style={{
        backgroundImage: `url('https://uploadthingy.s3.us-west-1.amazonaws.com/cGGUWDUejHPeG7vy1QiRZ1/Asset_506112025.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        mixBlendMode: 'overlay'
      }}></div>

        {/* Glassmorphic overlay */}
        <div className="absolute inset-0 bg-white/80 dark:bg-navy-light/80 backdrop-blur-xl"></div>

        {/* Top glow line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent"></div>

        {/* Navigation content */}
        <div className="relative flex items-center justify-around px-2 py-2 border-t border-white/20">
          {navItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return <button key={index} onClick={() => item.onClick ? item.onClick() : navigate(item.path)} className={`relative flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all duration-300 min-w-[60px] min-h-[52px] group ${isActive ? 'text-primary dark:text-white scale-105' : 'text-gray-600 dark:text-gray-400 hover:text-primary active:scale-95'}`}>
                {/* Active indicator with glow */}
                {isActive && <>
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl"></div>
                    <div className="absolute inset-0 bg-primary/5 rounded-xl blur-sm"></div>
                  </>}

                {/* Icon container with tech styling */}
                <div className={`relative w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 ${isActive ? 'bg-gradient-to-br from-primary to-primary-dark shadow-lg shadow-primary/30' : 'bg-gray-100 dark:bg-navy group-hover:bg-primary/10 group-hover:scale-110'}`}>
                  {isActive && <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 to-blue-400/20 rounded-xl animate-pulse"></div>}
                  <Icon className={`w-5 h-5 relative z-10 ${isActive ? 'text-white' : ''}`} />
                </div>

                {/* Label */}
                <span className={`text-[10px] font-medium transition-all duration-300 ${isActive ? 'font-semibold' : ''}`}>
                  {item.label}
                </span>

                {/* Active dot indicator with glow */}
                {isActive && <div className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-primary rounded-full shadow-lg shadow-primary/50 animate-pulse"></div>}
              </button>;
        })}
        </div>
      </nav>
    </div>;
}