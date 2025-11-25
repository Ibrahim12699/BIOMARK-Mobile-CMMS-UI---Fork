import React, { useEffect, useState } from 'react';
import { Bell, Plus, Scan, TrendingUp, TrendingDown, AlertCircle, CheckCircle, Power, Shield, Clock, Package, ChevronRight, X, Smartphone, Radio, ClipboardCheck, Wrench } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Avatar } from '../components/ui/Avatar';
import { useLanguage } from '../contexts/LanguageContext';
import { mockWorkOrders, mockNotifications } from '../utils/mockData';
export function DashboardPage() {
  const navigate = useNavigate();
  const {
    t,
    language
  } = useLanguage();
  const [onDuty, setOnDuty] = useState(true);
  const [showScanModal, setShowScanModal] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  // Mock warranty data - in real app, this would come from API
  const warrantyData = {
    expiringSoon: 7,
    recentlyExpired: 3
  };
  // Mock IPM data
  const ipmData = {
    inspections: 5,
    preventiveMaintenance: 8
  };
  // Mock recently installed assets data
  const recentlyInstalledAssets = [{
    id: 'AST-003',
    name: 'Infusion Pump - IP200',
    location: 'ICU - Room 205',
    installedDate: '2024-01-12'
  }, {
    id: 'AST-004',
    name: 'ECG Machine - ECG500',
    location: 'ER - Station 4',
    installedDate: '2024-01-10'
  }, {
    id: 'AST-005',
    name: 'Defibrillator - DF300',
    location: 'Operating Room 2',
    installedDate: '2024-01-08'
  }, {
    id: 'AST-006',
    name: 'Ultrasound - US400',
    location: 'Radiology',
    installedDate: '2024-01-05'
  }];
  // Simulate scanning animation
  useEffect(() => {
    if (isScanning) {
      const timer = setTimeout(() => {
        setIsScanning(false);
        setShowScanModal(false);
        // Simulate successful scan - navigate to asset
        navigate('/assets/AST-001');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isScanning, navigate]);
  const handleScanAsset = () => {
    setShowScanModal(true);
    setIsScanning(true);
  };
  const stats = [{
    label: t('activeWOs'),
    value: '12',
    icon: AlertCircle,
    color: 'text-blue-600',
    bg: 'bg-blue-50 dark:bg-blue-900/20'
  }, {
    label: t('overdue'),
    value: '3',
    icon: TrendingDown,
    color: 'text-red-600',
    bg: 'bg-red-50 dark:bg-red-900/20'
  }, {
    label: t('completedToday'),
    value: '8',
    icon: CheckCircle,
    color: 'text-green-600',
    bg: 'bg-green-50 dark:bg-green-900/20'
  }, {
    label: t('ppmDue'),
    value: '5',
    icon: TrendingUp,
    color: 'text-yellow-600',
    bg: 'bg-yellow-50 dark:bg-yellow-900/20'
  }];
  const unreadNotifications = mockNotifications.filter(n => !n.read).length;
  return <div className="min-h-screen">
      {/* Modern Header with Circuit Board Background */}
      <div className="relative bg-gradient-to-br from-primary via-primary-dark to-navy px-4 pt-6 pb-8 mb-4 overflow-hidden">
        {/* Circuit Board Background Image */}
        <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: `url('https://uploadthingy.s3.us-west-1.amazonaws.com/87rEubz6Zyb3ZuF3cMEKqs/Asset_606112025.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        mixBlendMode: 'screen'
      }}></div>

        {/* Animated glowing overlay */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-32 h-32 bg-cyan-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-40 h-40 bg-blue-400/20 rounded-full blur-3xl animate-pulse" style={{
          animationDelay: '1s'
        }}></div>
        </div>

        {/* Digital grid overlay */}
        <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
        backgroundSize: '20px 20px'
      }}></div>

        <div className="relative flex items-center justify-between mb-6 z-10">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Avatar size="lg" />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-accent rounded-full border-2 border-primary animate-pulse"></div>
            </div>
            <div>
              <h1 className="text-xl font-bold text-white drop-shadow-lg">
                {t('welcome')}, Ahmed
              </h1>
              <p className="text-sm text-cyan-200">Biomedical Engineer</p>
            </div>
          </div>

          {/* Notification Bell with glow */}
          <button onClick={() => navigate('/notifications')} className="relative p-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-2xl transition-all duration-200 min-w-[48px] min-h-[48px] border border-white/20 shadow-lg hover:shadow-cyan-500/50">
            <Bell className="w-6 h-6 text-white drop-shadow-lg" />
            {unreadNotifications > 0 && <span className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-br from-red-500 to-red-600 text-white text-xs rounded-full flex items-center justify-center font-bold shadow-lg shadow-red-500/50 animate-pulse">
                {unreadNotifications}
              </span>}
          </button>
        </div>

        {/* Quick Stats with tech styling */}
        <div className="relative grid grid-cols-4 gap-2 z-10">
          {stats.map((stat, index) => {
          const Icon = stat.icon;
          return <div key={index} className="bg-white/10 backdrop-blur-md rounded-2xl p-3 text-center border border-white/20 shadow-lg hover:bg-white/15 transition-all duration-200">
                <div className="w-8 h-8 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-1 backdrop-blur-sm">
                  <Icon className="w-4 h-4 text-cyan-200" />
                </div>
                <p className="text-lg font-bold text-white drop-shadow-lg">
                  {stat.value}
                </p>
                <p className="text-[10px] text-cyan-200 leading-tight mt-0.5">
                  {stat.label}
                </p>
              </div>;
        })}
        </div>

        {/* Bottom circuit line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent"></div>
      </div>

      <div className="px-4 space-y-6 pb-6">
        {/* Duty Status Toggle */}
        <Card padding="md" className="shadow-lg border border-primary/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${onDuty ? 'bg-gradient-to-br from-green-500 to-green-600 shadow-lg shadow-green-500/30' : 'bg-gradient-to-br from-gray-400 to-gray-500 shadow-lg shadow-gray-500/30'}`}>
                <Power className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                  {t('dutyStatus')}
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  {t('youAreCurrently')}{' '}
                  <span className={`font-semibold ${onDuty ? 'text-green-600 dark:text-green-400' : 'text-gray-600 dark:text-gray-400'}`}>
                    {onDuty ? t('onDuty') : t('offDuty')}
                  </span>
                </p>
              </div>
            </div>

            {/* Toggle Switch */}
            <button onClick={() => setOnDuty(!onDuty)} className={`relative w-16 h-8 rounded-full transition-colors duration-300 ${onDuty ? 'bg-gradient-to-r from-green-500 to-green-600 shadow-lg shadow-green-500/30' : 'bg-gray-300 dark:bg-gray-600'}`}>
              <div className={`absolute top-1 ${language === 'ar' ? 'right-1' : 'left-1'} w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300 flex items-center justify-center ${onDuty ? language === 'ar' ? '-translate-x-8' : 'translate-x-8' : 'translate-x-0'}`}>
                {onDuty && <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>}
              </div>
            </button>
          </div>
        </Card>

        {/* Quick Actions */}
        <Card padding="md" className="shadow-lg border border-primary/10">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <div className="w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full"></div>
            Quick Actions
          </h2>
          <div className="grid grid-cols-2 gap-3">
            <button className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 hover:from-primary/20 hover:to-primary/10 transition-all duration-200 min-h-[90px] group border border-primary/10">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-dark rounded-2xl flex items-center justify-center shadow-lg shadow-primary/30 group-hover:scale-110 transition-transform">
                <Plus className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {t('newWorkOrder')}
              </span>
            </button>
            <button onClick={handleScanAsset} className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-gradient-to-br from-accent/10 to-accent/5 hover:from-accent/20 hover:to-accent/10 transition-all duration-200 min-h-[90px] group border border-accent/10">
              <div className="w-12 h-12 bg-gradient-to-br from-accent to-accent-dark rounded-2xl flex items-center justify-center shadow-lg shadow-accent/30 group-hover:scale-110 transition-transform">
                <Scan className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {t('scanAsset')}
              </span>
            </button>
          </div>
        </Card>

        {/* Active Work Orders */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <div className="w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full"></div>
              {t('workOrders')}
            </h2>
            <button onClick={() => navigate('/work-orders')} className="text-sm text-primary hover:text-primary-dark font-semibold flex items-center gap-1">
              {t('viewAll')} →
            </button>
          </div>
          <div className="space-y-3">
            {mockWorkOrders.slice(0, 3).map(wo => <Card key={wo.id} padding="md" onClick={() => navigate(`/work-orders/${wo.id}`)} className="hover:shadow-xl transition-all duration-200 border border-gray-100 dark:border-gray-800 hover:border-primary/20">
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
              </Card>)}
          </div>
        </div>

        {/* IPM Section */}
        <Card padding="md" className="shadow-lg border border-purple-200 dark:border-purple-800">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center">
              <ClipboardCheck className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <h2 className="text-sm font-semibold text-gray-900 dark:text-white">
              {t('inspectionAndPM')}
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {/* Inspection Card */}
            <button onClick={() => navigate('/inspections')} className="flex flex-col items-center gap-3 p-4 bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-900/20 dark:to-blue-900/10 rounded-2xl border-2 border-blue-200 dark:border-blue-800 hover:border-blue-300 dark:hover:border-blue-700 transition-all hover:shadow-lg group">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:scale-110 transition-transform">
                <ClipboardCheck className="w-7 h-7 text-white" />
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                  {ipmData.inspections}
                </p>
                <p className="text-xs font-semibold text-blue-900 dark:text-blue-300">
                  {t('inspection')}
                </p>
                <p className="text-[10px] text-blue-700 dark:text-blue-400 mt-1">
                  {ipmData.inspections} {t('inspectionTasks')}
                </p>
              </div>
            </button>

            {/* Preventive Maintenance Card */}
            <button onClick={() => navigate('/preventive-maintenance')} className="flex flex-col items-center gap-3 p-4 bg-gradient-to-br from-purple-50 to-purple-100/50 dark:from-purple-900/20 dark:to-purple-900/10 rounded-2xl border-2 border-purple-200 dark:border-purple-800 hover:border-purple-300 dark:hover:border-purple-700 transition-all hover:shadow-lg group">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/30 group-hover:scale-110 transition-transform">
                <Wrench className="w-7 h-7 text-white" />
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-1">
                  {ipmData.preventiveMaintenance}
                </p>
                <p className="text-xs font-semibold text-purple-900 dark:text-purple-300">
                  {t('preventiveMaintenance')}
                </p>
                <p className="text-[10px] text-purple-700 dark:text-purple-400 mt-1">
                  {ipmData.preventiveMaintenance} {t('pmTasks')}
                </p>
              </div>
            </button>
          </div>

          {/* Info Banner */}
          <div className="mt-4 p-3 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-xl">
            <p className="text-xs text-purple-800 dark:text-purple-300 text-center">
              📋 {t('dueToday')}:{' '}
              {ipmData.inspections + ipmData.preventiveMaintenance} tasks
            </p>
          </div>
        </Card>

        {/* Critical Alerts */}
        <Card padding="md" className="bg-gradient-to-br from-red-50 to-red-100/50 dark:from-red-900/20 dark:to-red-900/10 border-2 border-red-200 dark:border-red-800 shadow-lg">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-red-500/30">
              <AlertCircle className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-red-900 dark:text-red-300 mb-1">
                Critical Alert
              </h3>
              <p className="text-sm text-red-800 dark:text-red-400">
                3 high-priority work orders require immediate attention
              </p>
            </div>
          </div>
        </Card>

        {/* Warranty Status Section */}
        <Card padding="md" className="shadow-lg border border-orange-200 dark:border-orange-800">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center">
              <Shield className="w-5 h-5 text-orange-600 dark:text-orange-400" />
            </div>
            <h2 className="text-sm font-semibold text-gray-900 dark:text-white">
              {t('warrantyStatus')}
            </h2>
          </div>

          <div className="space-y-3">
            {/* Expiring Soon */}
            <div className="flex items-center justify-between p-4 bg-gradient-to-br from-yellow-50 to-yellow-100/50 dark:from-yellow-900/20 dark:to-yellow-900/10 rounded-2xl border border-yellow-200 dark:border-yellow-800">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-2xl flex items-center justify-center shadow-lg shadow-yellow-500/30">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-yellow-900 dark:text-yellow-300">
                    {t('expiringIn30Days')}
                  </p>
                  <p className="text-xs text-yellow-800 dark:text-yellow-400">
                    {warrantyData.expiringSoon} {t('assetsExpiringSoon')}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                  {warrantyData.expiringSoon}
                </p>
              </div>
            </div>

            {/* Recently Expired */}
            <div className="flex items-center justify-between p-4 bg-gradient-to-br from-orange-50 to-orange-100/50 dark:from-orange-900/20 dark:to-orange-900/10 rounded-2xl border border-orange-200 dark:border-orange-800">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-500/30">
                  <AlertCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-orange-900 dark:text-orange-300">
                    {t('expiredPast14Days')}
                  </p>
                  <p className="text-xs text-orange-800 dark:text-orange-400">
                    {warrantyData.recentlyExpired} {t('assetsExpired')}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                  {warrantyData.recentlyExpired}
                </p>
              </div>
            </div>
          </div>

          {/* Info Message */}
          <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl">
            <p className="text-xs text-blue-800 dark:text-blue-300 text-center">
              💡 {t('reviewWarranties')}
            </p>
          </div>
        </Card>

        {/* Recently Installed Assets Section */}
        <Card padding="md" className="shadow-lg border border-green-200 dark:border-green-800">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
                <Package className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h2 className="text-sm font-semibold text-gray-900 dark:text-white">
                  {t('recentlyInstalled')}
                </h2>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  {t('installedLast14Days')}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                {recentlyInstalledAssets.length}
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {t('newAssets')}
              </p>
            </div>
          </div>

          {/* Asset List */}
          <div className="space-y-2">
            {recentlyInstalledAssets.slice(0, 3).map(asset => <div key={asset.id} onClick={() => navigate(`/assets/${asset.id}`)} className="flex items-center justify-between p-3 bg-gradient-to-br from-green-50 to-green-100/50 dark:from-green-900/20 dark:to-green-900/10 rounded-xl border border-green-200 dark:border-green-800 hover:shadow-md transition-all cursor-pointer">
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg shadow-green-500/30">
                    <Package className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      {asset.name}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {asset.location}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant="success" size="sm">
                    {t('active')}
                  </Badge>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                    {new Date(asset.installedDate).toLocaleDateString()}
                  </p>
                </div>
              </div>)}
          </div>

          {/* View All Button */}
          <button onClick={() => navigate('/assets')} className="w-full mt-3 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors flex items-center justify-center gap-2 text-sm font-medium text-green-700 dark:text-green-400">
            {t('viewNewAssets')}
            <ChevronRight className="w-4 h-4" />
          </button>
        </Card>
      </div>

      {/* NFC Scanner Modal */}
      {showScanModal && <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-navy-light rounded-3xl shadow-2xl max-w-md w-full p-8 animate-scale-in relative overflow-hidden">
            {/* Close Button */}
            <button onClick={() => {
          setShowScanModal(false);
          setIsScanning(false);
        }} className="absolute top-4 right-4 p-2 hover:bg-gray-100 dark:hover:bg-navy rounded-xl transition-colors z-10">
              <X className="w-6 h-6 text-gray-600 dark:text-gray-400" />
            </button>

            {/* Animated Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5"></div>

            {/* Content */}
            <div className="relative z-10">
              {/* Title */}
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 text-center">
                {t('scanningAsset')}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 text-center mb-8">
                {t('holdPhoneNearTag')}
              </p>

              {/* Phone and NFC Animation */}
              <div className="relative h-64 flex items-center justify-center mb-8">
                {/* NFC Tag */}
                <div className="absolute left-1/4 top-1/2 -translate-y-1/2">
                  <div className="relative">
                    <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary-dark rounded-2xl flex items-center justify-center shadow-2xl">
                      <Radio className="w-10 h-10 text-white" />
                    </div>
                    {/* Pulsing rings */}
                    {isScanning && <>
                        <div className="absolute inset-0 rounded-2xl border-4 border-primary animate-ping"></div>
                        <div className="absolute inset-0 rounded-2xl border-4 border-primary/50 animate-pulse" style={{
                    animationDelay: '0.5s'
                  }}></div>
                      </>}
                  </div>
                </div>

                {/* Phone */}
                <div className={`absolute right-1/4 top-1/2 -translate-y-1/2 transition-all duration-1000 ${isScanning ? 'translate-x-8' : ''}`}>
                  <div className="relative">
                    <div className="w-24 h-40 bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl border-4 border-gray-700 shadow-2xl flex items-center justify-center">
                      <Smartphone className="w-12 h-12 text-primary" />
                    </div>
                    {/* Signal waves */}
                    {isScanning && <div className="absolute -left-8 top-1/2 -translate-y-1/2">
                        <div className="flex gap-1">
                          <div className="w-1 h-8 bg-primary rounded-full animate-pulse"></div>
                          <div className="w-1 h-12 bg-primary rounded-full animate-pulse" style={{
                      animationDelay: '0.2s'
                    }}></div>
                          <div className="w-1 h-6 bg-primary rounded-full animate-pulse" style={{
                      animationDelay: '0.4s'
                    }}></div>
                        </div>
                      </div>}
                  </div>
                </div>

                {/* Connecting line */}
                {isScanning && <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-1 bg-gradient-to-r from-primary via-accent to-primary animate-pulse"></div>}
              </div>

              {/* Status Text */}
              <div className="text-center">
                <p className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {isScanning ? t('scanningInProgress') : t('movePhoneCloser')}
                </p>
                {isScanning && <div className="flex items-center justify-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{
                animationDelay: '0.2s'
              }}></div>
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{
                animationDelay: '0.4s'
              }}></div>
                  </div>}
              </div>
            </div>
          </div>
        </div>}
    </div>;
}