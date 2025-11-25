import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, QrCode, Calendar, MapPin, Shield, FileText, FileCheck, Image, ChevronRight, Download, Mail, Share2, X, CheckCircle } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { IconButton } from '../components/ui/IconButton';
import { Input } from '../components/ui/Input';
import { useLanguage } from '../contexts/LanguageContext';
import { mockAssets } from '../utils/mockData';
export function AssetProfilePage() {
  const {
    id
  } = useParams();
  const navigate = useNavigate();
  const {
    t
  } = useLanguage();
  const asset = mockAssets.find(a => a.id === id);
  const [showExportModal, setShowExportModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [emailAddress, setEmailAddress] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  if (!asset) {
    return <div className="p-4">Device not found</div>;
  }
  const handleExportPDF = () => {
    setIsGenerating(true);
    // Simulate PDF generation
    setTimeout(() => {
      setIsGenerating(false);
      setShowSuccess(true);
      setShowExportModal(false);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 2000);
  };
  const handleSendEmail = () => {
    if (!emailAddress) return;
    setIsSending(true);
    // Simulate email sending
    setTimeout(() => {
      setIsSending(false);
      setShowSuccess(true);
      setShowEmailModal(false);
      setEmailAddress('');
      setTimeout(() => setShowSuccess(false), 3000);
    }, 2000);
  };
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
  return <div className="min-h-screen bg-gray-50 dark:bg-navy pb-6">
      {/* Success Toast */}
      {showSuccess && <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[60] animate-slide-down">
          <div className="bg-green-500 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 min-w-[280px]">
            <CheckCircle className="w-6 h-6" />
            <p className="font-semibold text-sm">
              {showEmailModal ? t('reportSent') : t('reportGenerated')}
            </p>
          </div>
        </div>}

      {/* Header */}
      <div className="bg-white dark:bg-navy-light border-b border-gray-200 dark:border-gray-700 p-4 sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <IconButton icon={<ArrowLeft className="w-6 h-6" />} onClick={() => navigate(-1)} />
          <div className="flex-1">
            <h1 className="text-lg font-bold text-gray-900 dark:text-white">
              {asset.name}
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {t('assetProfile')}
            </p>
          </div>
          <button onClick={() => setShowExportModal(true)} className="p-2 rounded-xl bg-primary hover:bg-primary-dark transition-colors">
            <Share2 className="w-6 h-6 text-white" />
          </button>
          <button className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors">
            <QrCode className="w-6 h-6 text-gray-700 dark:text-gray-200" />
          </button>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Device Picture */}
        <Card padding="none" className="overflow-hidden">
          <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
            <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80" alt={asset.name} className="w-full h-full object-cover" />
            <div className="absolute top-3 right-3 px-3 py-1.5 bg-black/50 backdrop-blur-sm rounded-lg">
              <div className="flex items-center gap-2">
                <Image className="w-4 h-4 text-white" />
                <span className="text-xs font-medium text-white">
                  Device Photo
                </span>
              </div>
            </div>
          </div>
        </Card>

        {/* Device Info Card */}
        <Card padding="md">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                {asset.name}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {asset.model}
              </p>
            </div>
            <Badge variant={asset.riskScore === 'high' ? 'danger' : asset.riskScore === 'medium' ? 'warning' : 'success'}>
              {asset.riskScore} risk
            </Badge>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-navy rounded-lg">
              <Shield className="w-5 h-5 text-gray-400" />
              <div className="flex-1">
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Serial Number
                </p>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {asset.serialNumber}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-navy rounded-lg">
              <MapPin className="w-5 h-5 text-gray-400" />
              <div className="flex-1">
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Location
                </p>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {asset.location}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-navy rounded-lg">
              <Calendar className="w-5 h-5 text-gray-400" />
              <div className="flex-1">
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Next PPM
                </p>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {new Date(asset.nextPPM).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Service Contract */}
        <Card padding="md">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <FileCheck className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-sm font-semibold text-gray-900 dark:text-white">
              Service Contract
            </h2>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-navy rounded-lg">
              <div>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Contract Type
                </p>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Full Maintenance
                </p>
              </div>
              <Badge variant="success" size="sm">
                Active
              </Badge>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-navy rounded-lg">
              <div>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Provider
                </p>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  MedTech Services Inc.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-gray-50 dark:bg-navy rounded-lg">
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Start Date
                </p>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Jan 15, 2024
                </p>
              </div>
              <div className="p-3 bg-gray-50 dark:bg-navy rounded-lg">
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  End Date
                </p>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Jan 14, 2025
                </p>
              </div>
            </div>

            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
              <p className="text-xs text-blue-800 dark:text-blue-300 font-medium">
                Contract expires in 6 months
              </p>
            </div>
          </div>
        </Card>

        {/* Technical Documents */}
        <Card padding="md">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
              <FileText className="w-5 h-5 text-accent" />
            </div>
            <h2 className="text-sm font-semibold text-gray-900 dark:text-white">
              Technical Documents
            </h2>
          </div>

          <div className="space-y-2">
            <button className="w-full flex items-center gap-3 p-3 bg-gray-50 dark:bg-navy rounded-lg hover:bg-gray-100 dark:hover:bg-navy-light transition-colors">
              <div className="w-10 h-10 rounded-lg bg-red-100 dark:bg-red-900/20 flex items-center justify-center">
                <FileText className="w-5 h-5 text-red-600 dark:text-red-400" />
              </div>
              <div className="flex-1 text-left">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  User Manual
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  PDF • 2.4 MB
                </p>
              </div>
              <ArrowLeft className="w-5 h-5 text-gray-400 rotate-180" />
            </button>

            <button className="w-full flex items-center gap-3 p-3 bg-gray-50 dark:bg-navy rounded-lg hover:bg-gray-100 dark:hover:bg-navy-light transition-colors">
              <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
                <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="flex-1 text-left">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Service Manual
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  PDF • 5.8 MB
                </p>
              </div>
              <ArrowLeft className="w-5 h-5 text-gray-400 rotate-180" />
            </button>

            <button className="w-full flex items-center gap-3 p-3 bg-gray-50 dark:bg-navy rounded-lg hover:bg-gray-100 dark:hover:bg-navy-light transition-colors">
              <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
                <FileText className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <div className="flex-1 text-left">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Safety Guidelines
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  PDF • 1.2 MB
                </p>
              </div>
              <ArrowLeft className="w-5 h-5 text-gray-400 rotate-180" />
            </button>

            <button className="w-full flex items-center gap-3 p-3 bg-gray-50 dark:bg-navy rounded-lg hover:bg-gray-100 dark:hover:bg-navy-light transition-colors">
              <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center">
                <FileText className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="flex-1 text-left">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Calibration Certificate
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  PDF • 890 KB
                </p>
              </div>
              <ArrowLeft className="w-5 h-5 text-gray-400 rotate-180" />
            </button>
          </div>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <Button variant="primary">Schedule PPM</Button>
          <Button variant="secondary">Create WO</Button>
        </div>

        {/* Maintenance History */}
        <Card padding="md">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-gray-900 dark:text-white">
              {t('maintenanceHistory')}
            </h2>
            <button onClick={() => navigate(`/assets/${id}/maintenance`)} className="flex items-center gap-1 text-sm font-medium text-primary hover:text-primary-dark transition-colors">
              {t('viewAll')}
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-3">
            {asset.maintenanceHistory.slice(0, 3).map(record => <div key={record.id} onClick={() => navigate(`/assets/${id}/maintenance/${record.id}`)} className={`flex gap-3 pb-3 border-b border-gray-200 dark:border-gray-700 last:border-0 last:pb-0 cursor-pointer hover:bg-gray-50 dark:hover:bg-navy -mx-4 px-4 py-3 rounded-lg transition-colors ${getMaintenanceColor(record.type)}`}>
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-1">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {record.description}
                    </p>
                    <Badge variant={getMaintenanceBadgeVariant(record.type)} size="sm">
                      {t(record.type)}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {new Date(record.date).toLocaleDateString()} •{' '}
                    {record.technician} • {record.duration}min
                  </p>
                </div>
              </div>)}
          </div>
        </Card>
      </div>

      {/* Export Modal */}
      {showExportModal && <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-navy-light rounded-3xl shadow-2xl max-w-md w-full p-6 animate-scale-in">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                {t('shareReport')}
              </h2>
              <button onClick={() => setShowExportModal(false)} className="p-2 hover:bg-gray-100 dark:hover:bg-navy rounded-xl transition-colors">
                <X className="w-6 h-6 text-gray-600 dark:text-gray-400" />
              </button>
            </div>

            <div className="space-y-3">
              <button onClick={handleExportPDF} disabled={isGenerating} className="w-full flex items-center gap-4 p-4 bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-900/20 dark:to-blue-900/10 rounded-2xl border-2 border-blue-200 dark:border-blue-800 hover:border-blue-300 dark:hover:border-blue-700 transition-all disabled:opacity-50">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30">
                  <Download className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    {t('exportAsPDF')}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {isGenerating ? t('generatingReport') : t('downloadPDF')}
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>

              <button onClick={() => {
            setShowExportModal(false);
            setShowEmailModal(true);
          }} className="w-full flex items-center gap-4 p-4 bg-gradient-to-br from-green-50 to-green-100/50 dark:from-green-900/20 dark:to-green-900/10 rounded-2xl border-2 border-green-200 dark:border-green-800 hover:border-green-300 dark:hover:border-green-700 transition-all">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg shadow-green-500/30">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    {t('sendByEmail')}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {t('emailReport')}
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>
            </div>
          </div>
        </div>}

      {/* Email Modal */}
      {showEmailModal && <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-navy-light rounded-3xl shadow-2xl max-w-md w-full p-6 animate-scale-in">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
                  <Mail className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  {t('emailReport')}
                </h2>
              </div>
              <button onClick={() => {
            setShowEmailModal(false);
            setEmailAddress('');
          }} className="p-2 hover:bg-gray-100 dark:hover:bg-navy rounded-xl transition-colors">
                <X className="w-6 h-6 text-gray-600 dark:text-gray-400" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                  {t('enterEmailAddress')}
                </label>
                <Input type="email" placeholder={t('emailPlaceholder')} value={emailAddress} onChange={e => setEmailAddress(e.target.value)} icon={<Mail className="w-5 h-5" />} />
              </div>

              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl">
                <p className="text-xs text-blue-800 dark:text-blue-300">
                  📄 {t('deviceReport')}: {asset.name}
                </p>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" fullWidth onClick={() => {
              setShowEmailModal(false);
              setEmailAddress('');
            }}>
                  {t('cancel')}
                </Button>
                <Button variant="primary" fullWidth onClick={handleSendEmail} disabled={!emailAddress || isSending}>
                  {isSending ? t('sendingEmail') : t('sendReport')}
                </Button>
              </div>
            </div>
          </div>
        </div>}
    </div>;
}