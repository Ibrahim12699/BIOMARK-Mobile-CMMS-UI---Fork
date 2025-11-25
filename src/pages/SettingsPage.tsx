import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Globe, Lock, Phone, Mail, Fingerprint, Info, Tag, ChevronRight, X, Check, Building2, Users, Calendar, CheckCircle2, XCircle, PenTool } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { IconButton } from '../components/ui/IconButton';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
export function SettingsPage() {
  const navigate = useNavigate();
  const {
    t,
    language,
    toggleLanguage
  } = useLanguage();
  const {
    theme
  } = useTheme();
  const [biometricEnabled, setBiometricEnabled] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [savedSignature, setSavedSignature] = useState<string | null>(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  // Modal states
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showMobileModal, setShowMobileModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showAboutModal, setShowAboutModal] = useState(false);
  const [showSiteInfoModal, setShowSiteInfoModal] = useState(false);
  const [showSignatureModal, setShowSignatureModal] = useState(false);
  // Form states
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [mobileNumber, setMobileNumber] = useState('+966 50 123 4567');
  const [email, setEmail] = useState('ahmed@hospital.com');
  // Site information data
  const siteData = {
    facilityName: 'Al Seef Hospital',
    country: 'Kuwait',
    activeUntil: new Date('2025-12-31'),
    teamMembers: 32,
    logo: "/avatar-401.jpg",
    countryFlag: "/Flag_Of_Kuwait.png"
  };
  // Check if site is active
  const isActive = new Date() < siteData.activeUntil;
  // Signature canvas setup
  useEffect(() => {
    if (showSignatureModal && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
      }
    }
  }, [showSignatureModal]);
  // Auto-hide success message after 3 seconds
  useEffect(() => {
    if (showSuccessMessage) {
      const timer = setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showSuccessMessage]);
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let x, y;
    if ('touches' in e) {
      x = e.touches[0].clientX - rect.left;
      y = e.touches[0].clientY - rect.top;
    } else {
      x = e.clientX - rect.left;
      y = e.clientY - rect.top;
    }
    ctx.beginPath();
    ctx.moveTo(x, y);
  };
  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let x, y;
    if ('touches' in e) {
      e.preventDefault();
      x = e.touches[0].clientX - rect.left;
      y = e.touches[0].clientY - rect.top;
    } else {
      x = e.clientX - rect.left;
      y = e.clientY - rect.top;
    }
    ctx.lineTo(x, y);
    ctx.stroke();
  };
  const stopDrawing = () => {
    setIsDrawing(false);
  };
  const clearSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };
  const saveSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const signatureData = canvas.toDataURL('image/png');
    setSavedSignature(signatureData);
    setShowSignatureModal(false);
    setShowSuccessMessage(true);
  };
  const accountSettings = [{
    icon: Globe,
    label: t('changeLanguage'),
    sublabel: t('currentLanguage'),
    color: 'bg-blue-100 dark:bg-blue-900/20',
    iconColor: 'text-blue-600 dark:text-blue-400',
    onClick: () => setShowLanguageModal(true)
  }, {
    icon: Lock,
    label: t('changePassword'),
    sublabel: t('updatePassword'),
    color: 'bg-red-100 dark:bg-red-900/20',
    iconColor: 'text-red-600 dark:text-red-400',
    onClick: () => setShowPasswordModal(true)
  }, {
    icon: Phone,
    label: t('changeMobileNumber'),
    sublabel: '+966 50 123 4567',
    color: 'bg-green-100 dark:bg-green-900/20',
    iconColor: 'text-green-600 dark:text-green-400',
    onClick: () => setShowMobileModal(true)
  }, {
    icon: Mail,
    label: t('changeEmail'),
    sublabel: 'ahmed@hospital.com',
    color: 'bg-purple-100 dark:bg-purple-900/20',
    iconColor: 'text-purple-600 dark:text-purple-400',
    onClick: () => setShowEmailModal(true)
  }, {
    icon: PenTool,
    label: t('userSignature'),
    sublabel: savedSignature ? t('signatureSet') : t('noSignature'),
    color: 'bg-indigo-100 dark:bg-indigo-900/20',
    iconColor: 'text-indigo-600 dark:text-indigo-400',
    onClick: () => setShowSignatureModal(true)
  }];
  const securitySettings = [{
    icon: Fingerprint,
    label: t('biometricAuthentication'),
    sublabel: biometricEnabled ? t('enabled') : t('disabled'),
    color: 'bg-cyan-100 dark:bg-cyan-900/20',
    iconColor: 'text-cyan-600 dark:text-cyan-400',
    isToggle: true,
    toggleValue: biometricEnabled,
    onToggle: () => setBiometricEnabled(!biometricEnabled)
  }];
  const appInfo = [{
    icon: Info,
    label: t('aboutApp'),
    sublabel: t('learnMore'),
    color: 'bg-orange-100 dark:bg-orange-900/20',
    iconColor: 'text-orange-600 dark:text-orange-400',
    onClick: () => setShowAboutModal(true)
  }, {
    icon: Building2,
    label: t('siteInformation'),
    sublabel: t('viewSiteDetails'),
    color: 'bg-teal-100 dark:bg-teal-900/20',
    iconColor: 'text-teal-600 dark:text-teal-400',
    onClick: () => setShowSiteInfoModal(true)
  }, {
    icon: Tag,
    label: t('appVersion'),
    sublabel: 'v1.0.0',
    color: 'bg-gray-100 dark:bg-gray-700',
    iconColor: 'text-gray-600 dark:text-gray-400',
    isVersion: true
  }];
  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Password changed');
    setShowPasswordModal(false);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };
  const handleMobileChange = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Mobile changed:', mobileNumber);
    setShowMobileModal(false);
  };
  const handleEmailChange = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Email changed:', email);
    setShowEmailModal(false);
  };
  return <div className="min-h-screen bg-gray-50 dark:bg-navy pb-6">
      {/* Success Message Toast - Centered */}
      {showSuccessMessage && <div className="fixed inset-0 z-[60] flex items-center justify-center pointer-events-none">
          <div className="bg-green-500 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 min-w-[280px] animate-scale-in pointer-events-auto">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-sm">{t('signatureSaved')}</p>
            </div>
          </div>
        </div>}

      {/* Header */}
      <div className="bg-gradient-to-br from-primary via-primary-dark to-navy p-4 pb-8 sticky top-0 z-10 shadow-lg">
        <div className="flex items-center gap-3 mb-6">
          <IconButton icon={<ArrowLeft className="w-6 h-6" />} onClick={() => navigate(-1)} className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20" />
          <div className="flex-1">
            <h1 className="text-xl font-bold text-white drop-shadow-lg">
              {t('settings')}
            </h1>
            <p className="text-sm text-white/80">{t('managePreferences')}</p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6 -mt-4">
        {/* Account Settings Section */}
        <div>
          <h2 className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-3 px-2">
            {t('accountSettings')}
          </h2>
          <Card padding="none" className="overflow-hidden">
            {accountSettings.map((setting, index) => {
            const Icon = setting.icon;
            return <button key={index} onClick={setting.onClick} className="w-full flex items-center gap-4 p-4 hover:bg-gray-50 dark:hover:bg-navy transition-colors border-b border-gray-100 dark:border-gray-700 last:border-0">
                  <div className={`w-12 h-12 rounded-2xl ${setting.color} flex items-center justify-center flex-shrink-0 shadow-sm`}>
                    <Icon className={`w-6 h-6 ${setting.iconColor}`} />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      {setting.label}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">
                      {setting.sublabel}
                    </p>
                  </div>
                  <ChevronRight className={`w-5 h-5 text-gray-400 ${language === 'ar' ? 'rotate-180' : ''}`} />
                </button>;
          })}
          </Card>
        </div>

        {/* Security Section */}
        <div>
          <h2 className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-3 px-2">
            {t('security')}
          </h2>
          <Card padding="none" className="overflow-hidden">
            {securitySettings.map((setting, index) => {
            const Icon = setting.icon;
            return <div key={index} className="flex items-center gap-4 p-4 border-b border-gray-100 dark:border-gray-700 last:border-0">
                  <div className={`w-12 h-12 rounded-2xl ${setting.color} flex items-center justify-center flex-shrink-0 shadow-sm`}>
                    <Icon className={`w-6 h-6 ${setting.iconColor}`} />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      {setting.label}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">
                      {setting.sublabel}
                    </p>
                  </div>
                  {setting.isToggle && <button onClick={setting.onToggle} className={`relative w-14 h-8 rounded-full transition-colors duration-200 ${setting.toggleValue ? 'bg-gradient-to-r from-primary to-primary-dark' : 'bg-gray-300 dark:bg-gray-600'}`}>
                      <div className={`absolute top-1 ${language === 'ar' ? 'right-1' : 'left-1'} w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-200 ${setting.toggleValue ? language === 'ar' ? '-translate-x-6' : 'translate-x-6' : 'translate-x-0'}`}></div>
                    </button>}
                </div>;
          })}
          </Card>
        </div>

        {/* App Information Section */}
        <div>
          <h2 className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-3 px-2">
            {t('appInformation')}
          </h2>
          <Card padding="none" className="overflow-hidden">
            {appInfo.map((setting, index) => {
            const Icon = setting.icon;
            return <button key={index} onClick={setting.onClick} disabled={setting.isVersion} className={`w-full flex items-center gap-4 p-4 border-b border-gray-100 dark:border-gray-700 last:border-0 ${setting.isVersion ? 'cursor-default' : 'hover:bg-gray-50 dark:hover:bg-navy transition-colors'}`}>
                  <div className={`w-12 h-12 rounded-2xl ${setting.color} flex items-center justify-center flex-shrink-0 shadow-sm`}>
                    <Icon className={`w-6 h-6 ${setting.iconColor}`} />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      {setting.label}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">
                      {setting.sublabel}
                    </p>
                  </div>
                  {!setting.isVersion && <ChevronRight className={`w-5 h-5 text-gray-400 ${language === 'ar' ? 'rotate-180' : ''}`} />}
                </button>;
          })}
          </Card>
        </div>

        {/* Footer Info */}
        <div className="text-center pt-4">
          <p className="text-xs text-gray-500 dark:text-gray-500">
            {t('allRightsReserved')}
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-600 mt-1">
            {t('healthcareCMMS')}
          </p>
        </div>
      </div>

      {/* Language Selection Modal */}
      {showLanguageModal && <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-navy-light rounded-3xl shadow-2xl max-w-md w-full p-6 animate-scale-in">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
                  <Globe className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  {t('selectLanguage')}
                </h2>
              </div>
              <button onClick={() => setShowLanguageModal(false)} className="p-2 hover:bg-gray-100 dark:hover:bg-navy rounded-xl transition-colors">
                <X className="w-6 h-6 text-gray-600 dark:text-gray-400" />
              </button>
            </div>

            <div className="space-y-3">
              <button onClick={() => {
            if (language === 'ar') toggleLanguage();
            setShowLanguageModal(false);
          }} className={`w-full flex items-center justify-between p-4 rounded-2xl border-2 transition-all ${language === 'en' ? 'border-primary bg-primary/5 dark:bg-primary/10' : 'border-gray-200 dark:border-gray-700 hover:border-primary/50'}`}>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🇬🇧</span>
                  <div className="text-left">
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {t('english')}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {t('englishUS')}
                    </p>
                  </div>
                </div>
                {language === 'en' && <Check className="w-6 h-6 text-primary" />}
              </button>

              <button onClick={() => {
            if (language === 'en') toggleLanguage();
            setShowLanguageModal(false);
          }} className={`w-full flex items-center justify-between p-4 rounded-2xl border-2 transition-all ${language === 'ar' ? 'border-primary bg-primary/5 dark:bg-primary/10' : 'border-gray-200 dark:border-gray-700 hover:border-primary/50'}`}>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🇸🇦</span>
                  <div className="text-left">
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {t('arabic')}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {t('arabicSA')}
                    </p>
                  </div>
                </div>
                {language === 'ar' && <Check className="w-6 h-6 text-primary" />}
              </button>
            </div>
          </div>
        </div>}

      {/* User Signature Modal */}
      {showSignatureModal && <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-navy-light rounded-3xl shadow-2xl max-w-md w-full p-6 animate-scale-in">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-indigo-100 dark:bg-indigo-900/20 flex items-center justify-center">
                  <PenTool className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  {t('drawSignature')}
                </h2>
              </div>
              <button onClick={() => setShowSignatureModal(false)} className="p-2 hover:bg-gray-100 dark:hover:bg-navy rounded-xl transition-colors">
                <X className="w-6 h-6 text-gray-600 dark:text-gray-400" />
              </button>
            </div>

            <div className="space-y-4">
              <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                {t('signatureInstructions')}
              </p>

              {/* Canvas for signature */}
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-2xl overflow-hidden bg-white dark:bg-navy">
                <canvas ref={canvasRef} width={400} height={200} className="w-full touch-none cursor-crosshair" onMouseDown={startDrawing} onMouseMove={draw} onMouseUp={stopDrawing} onMouseLeave={stopDrawing} onTouchStart={startDrawing} onTouchMove={draw} onTouchEnd={stopDrawing} />
              </div>

              {/* Saved signature preview */}
              {savedSignature && <div className="p-3 bg-gray-50 dark:bg-navy rounded-xl">
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                    Current Signature:
                  </p>
                  <img src={savedSignature} alt="Saved signature" className="w-full h-24 object-contain border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-navy-light" />
                </div>}

              <div className="flex gap-3">
                <Button type="button" variant="outline" fullWidth onClick={clearSignature}>
                  {t('clearSignature')}
                </Button>
                <Button type="button" variant="primary" fullWidth onClick={saveSignature}>
                  {t('saveSignature')}
                </Button>
              </div>
            </div>
          </div>
        </div>}

      {/* Change Password Modal */}
      {showPasswordModal && <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-navy-light rounded-3xl shadow-2xl max-w-md w-full p-6 animate-scale-in">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-red-100 dark:bg-red-900/20 flex items-center justify-center">
                  <Lock className="w-6 h-6 text-red-600 dark:text-red-400" />
                </div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  {t('changePassword')}
                </h2>
              </div>
              <button onClick={() => setShowPasswordModal(false)} className="p-2 hover:bg-gray-100 dark:hover:bg-navy rounded-xl transition-colors">
                <X className="w-6 h-6 text-gray-600 dark:text-gray-400" />
              </button>
            </div>

            <form onSubmit={handlePasswordChange} className="space-y-4">
              <Input type="password" label={t('currentPassword')} placeholder={t('enterCurrentPassword')} value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} required />
              <Input type="password" label={t('newPassword')} placeholder={t('enterNewPassword')} value={newPassword} onChange={e => setNewPassword(e.target.value)} required />
              <Input type="password" label={t('confirmNewPassword')} placeholder={t('confirmPassword')} value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required />
              <div className="flex gap-3 pt-2">
                <Button type="button" variant="outline" fullWidth onClick={() => setShowPasswordModal(false)}>
                  {t('cancel')}
                </Button>
                <Button type="submit" variant="primary" fullWidth>
                  {t('updatePasswordBtn')}
                </Button>
              </div>
            </form>
          </div>
        </div>}

      {/* Change Mobile Number Modal */}
      {showMobileModal && <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-navy-light rounded-3xl shadow-2xl max-w-md w-full p-6 animate-scale-in">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
                  <Phone className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  {t('changeMobileNumber')}
                </h2>
              </div>
              <button onClick={() => setShowMobileModal(false)} className="p-2 hover:bg-gray-100 dark:hover:bg-navy rounded-xl transition-colors">
                <X className="w-6 h-6 text-gray-600 dark:text-gray-400" />
              </button>
            </div>

            <form onSubmit={handleMobileChange} className="space-y-4">
              <Input type="tel" label={t('mobileNumber')} placeholder={t('mobileNumberPlaceholder')} value={mobileNumber} onChange={e => setMobileNumber(e.target.value)} required />
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                <p className="text-xs text-blue-800 dark:text-blue-300">
                  {t('verificationCodeSent')}
                </p>
              </div>
              <div className="flex gap-3 pt-2">
                <Button type="button" variant="outline" fullWidth onClick={() => setShowMobileModal(false)}>
                  {t('cancel')}
                </Button>
                <Button type="submit" variant="primary" fullWidth>
                  {t('updateNumber')}
                </Button>
              </div>
            </form>
          </div>
        </div>}

      {/* Change Email Modal */}
      {showEmailModal && <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-navy-light rounded-3xl shadow-2xl max-w-md w-full p-6 animate-scale-in">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center">
                  <Mail className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  {t('changeEmail')}
                </h2>
              </div>
              <button onClick={() => setShowEmailModal(false)} className="p-2 hover:bg-gray-100 dark:hover:bg-navy rounded-xl transition-colors">
                <X className="w-6 h-6 text-gray-600 dark:text-gray-400" />
              </button>
            </div>

            <form onSubmit={handleEmailChange} className="space-y-4">
              <Input type="email" label={t('emailAddress')} placeholder={t('emailPlaceholder')} value={email} onChange={e => setEmail(e.target.value)} required />
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                <p className="text-xs text-blue-800 dark:text-blue-300">
                  {t('verificationLinkSent')}
                </p>
              </div>
              <div className="flex gap-3 pt-2">
                <Button type="button" variant="outline" fullWidth onClick={() => setShowEmailModal(false)}>
                  {t('cancel')}
                </Button>
                <Button type="submit" variant="primary" fullWidth>
                  {t('updateEmail')}
                </Button>
              </div>
            </form>
          </div>
        </div>}

      {/* About App Modal */}
      {showAboutModal && <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-navy-light rounded-3xl shadow-2xl max-w-md w-full p-6 animate-scale-in">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center">
                  <Info className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                </div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  {t('aboutBiomark')}
                </h2>
              </div>
              <button onClick={() => setShowAboutModal(false)} className="p-2 hover:bg-gray-100 dark:hover:bg-navy rounded-xl transition-colors">
                <X className="w-6 h-6 text-gray-600 dark:text-gray-400" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="text-center py-4">
                <img src="/Asset_2008112025.png" alt="BIOMARK" className="w-32 h-auto mx-auto mb-4" />
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                  {t('biomarkCMMS')}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {t('healthcareMaintenance')}
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <div className="p-3 bg-gray-50 dark:bg-navy rounded-xl">
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                    {t('version')}
                  </p>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    1.0.0
                  </p>
                </div>
                <div className="p-3 bg-gray-50 dark:bg-navy rounded-xl">
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                    {t('developer')}
                  </p>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    {t('biomarkTech')}
                  </p>
                </div>
                <div className="p-3 bg-gray-50 dark:bg-navy rounded-xl">
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                    {t('support')}
                  </p>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    {t('supportEmail')}
                  </p>
                </div>
              </div>

              <p className="text-xs text-gray-500 dark:text-gray-500 text-center pt-4">
                {t('allRightsReserved')}
              </p>

              <Button variant="primary" fullWidth onClick={() => setShowAboutModal(false)}>
                {t('close')}
              </Button>
            </div>
          </div>
        </div>}

      {/* Site Information Modal */}
      {showSiteInfoModal && <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-navy-light rounded-3xl shadow-2xl max-w-md w-full p-6 animate-scale-in">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-teal-100 dark:bg-teal-900/20 flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-teal-600 dark:text-teal-400" />
                </div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  {t('siteInformation')}
                </h2>
              </div>
              <button onClick={() => setShowSiteInfoModal(false)} className="p-2 hover:bg-gray-100 dark:hover:bg-navy rounded-xl transition-colors">
                <X className="w-6 h-6 text-gray-600 dark:text-gray-400" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Facility Logo */}
              <div className="text-center py-4 border-b border-gray-200 dark:border-gray-700">
                <div className="w-24 h-24 mx-auto mb-3 bg-white dark:bg-navy rounded-2xl flex items-center justify-center shadow-lg p-2">
                  <img src={siteData.logo} alt="Al Seef Hospital" className="w-full h-full object-contain" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                  {t('alSeefHospital')}
                </h3>
              </div>

              {/* Site Details */}
              <div className="space-y-3">
                {/* Status Badge */}
                <div className={`flex items-center justify-center gap-2 p-3 rounded-2xl ${isActive ? 'bg-green-50 dark:bg-green-900/20' : 'bg-red-50 dark:bg-red-900/20'}`}>
                  {isActive ? <>
                      <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
                      <span className="text-sm font-semibold text-green-700 dark:text-green-300">
                        {t('active')}
                      </span>
                    </> : <>
                      <XCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
                      <span className="text-sm font-semibold text-red-700 dark:text-red-300">
                        {t('inactive')}
                      </span>
                    </>}
                </div>

                {/* Country */}
                <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-navy rounded-2xl">
                  <div className="w-12 h-12 rounded-xl overflow-hidden flex items-center justify-center bg-white dark:bg-navy-light shadow-sm">
                    <img src={siteData.countryFlag} alt="Kuwait Flag" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                      {t('country')}
                    </p>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      {t('kuwait')}
                    </p>
                  </div>
                </div>

                {/* Active Until */}
                <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-navy rounded-2xl">
                  <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                      {t('activeUntil')}
                    </p>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      {language === 'ar' ? '٣١ ديسمبر ٢٠٢٥' : 'December 31, 2025'}
                    </p>
                  </div>
                </div>

                {/* Team Members */}
                <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-navy rounded-2xl">
                  <div className="w-12 h-12 rounded-xl bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
                    <Users className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                      {t('teamMembers')}
                    </p>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      {language === 'ar' ? `٣٢ ${t('members')}` : `32 ${t('members')}`}
                    </p>
                  </div>
                </div>
              </div>

              <Button variant="primary" fullWidth onClick={() => setShowSiteInfoModal(false)}>
                {t('close')}
              </Button>
            </div>
          </div>
        </div>}
    </div>;
}