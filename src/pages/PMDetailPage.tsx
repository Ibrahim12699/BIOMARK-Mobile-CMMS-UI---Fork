import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Wrench, Package, Hash, MapPin, FileText, CheckCircle, Camera, X, Check, PenTool, Download, Mail, Share2 } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { IconButton } from '../components/ui/IconButton';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useLanguage } from '../contexts/LanguageContext';
interface MaintenanceStep {
  id: string;
  description: string;
  result: boolean | null;
}
export function PMDetailPage() {
  const {
    id
  } = useParams();
  const navigate = useNavigate();
  const {
    t
  } = useLanguage();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  // Mock PM task data
  const pmTask = {
    id: id || 'PM-001',
    taskNumber: 'PM-2024-001',
    deviceName: 'Ventilator - Model V300',
    deviceCode: 'VNT-2024-001',
    serialNumber: 'SN-VNT-45678',
    model: 'Model V300',
    location: 'ICU - Room 205',
    startDate: '2024-01-15',
    dueDate: '2024-01-12',
    isOverdue: true
  };
  // PM Checklist steps
  const [steps, setSteps] = useState<MaintenanceStep[]>([{
    id: '1',
    description: 'Check and clean air filters',
    result: null
  }, {
    id: '2',
    description: 'Inspect and test all alarms',
    result: null
  }, {
    id: '3',
    description: 'Calibrate pressure sensors',
    result: null
  }, {
    id: '4',
    description: 'Test backup battery system',
    result: null
  }, {
    id: '5',
    description: 'Lubricate moving parts',
    result: null
  }, {
    id: '6',
    description: 'Check breathing circuit connections',
    result: null
  }, {
    id: '7',
    description: 'Verify flow rate accuracy',
    result: null
  }, {
    id: '8',
    description: 'Test emergency shutdown procedures',
    result: null
  }, {
    id: '9',
    description: 'Update maintenance log',
    result: null
  }, {
    id: '10',
    description: 'Perform functional test',
    result: null
  }]);
  const [attachedPhotos, setAttachedPhotos] = useState<string[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showSignatureModal, setShowSignatureModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [technicianName, setTechnicianName] = useState('');
  const [signature, setSignature] = useState<string | null>(null);
  const [exportEmail, setExportEmail] = useState('');
  const [isExporting, setIsExporting] = useState(false);
  useEffect(() => {
    if (showSignatureModal && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
      }
    }
  }, [showSignatureModal]);
  const handleStepChange = (stepId: string, result: boolean) => {
    setSteps(steps.map(step => step.id === stepId ? {
      ...step,
      result
    } : step));
  };
  const handleAddPhoto = () => {
    const photoUrl = `https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&q=80`;
    setAttachedPhotos([...attachedPhotos, photoUrl]);
  };
  const handleRemovePhoto = (index: number) => {
    setAttachedPhotos(attachedPhotos.filter((_, i) => i !== index));
  };
  const handleCompletePM = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setShowSuccess(true);
      setIsCompleted(true);
      setTimeout(() => {
        setShowSuccess(false);
      }, 1500);
    }, 1000);
  };
  // Signature Canvas Functions
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
    if (!technicianName.trim()) {
      alert('Please enter your name');
      return;
    }
    const canvas = canvasRef.current;
    if (!canvas) return;
    const signatureData = canvas.toDataURL();
    setSignature(signatureData);
    setShowSignatureModal(false);
  };
  const handleExportPDF = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      setShowExportModal(false);
      alert('PDF exported successfully!');
    }, 1500);
  };
  const handleSendEmail = () => {
    if (!exportEmail.trim()) {
      alert('Please enter an email address');
      return;
    }
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      setShowExportModal(false);
      alert(`Report sent to ${exportEmail}`);
    }, 1500);
  };
  const completedSteps = steps.filter(s => s.result !== null).length;
  const totalSteps = steps.length;
  const progressPercentage = completedSteps / totalSteps * 100;
  return <div className="min-h-screen bg-gray-50 dark:bg-navy pb-6">
      {/* Success Toast */}
      {showSuccess && <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[60] animate-slide-down">
          <div className="bg-green-500 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 min-w-[280px]">
            <CheckCircle className="w-6 h-6" />
            <div>
              <p className="font-semibold text-sm">{t('pmSaved')}</p>
            </div>
          </div>
        </div>}

      {/* Signature Modal */}
      {showSignatureModal && <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-navy-light rounded-2xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                {t('signature')}
              </h3>
              <button onClick={() => setShowSignatureModal(false)} className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('technician')} {t('deviceName')}
                </label>
                <Input value={technicianName} onChange={e => setTechnicianName(e.target.value)} placeholder="Enter your name" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('signHere')}
                </label>
                <div className="border-2 border-gray-300 dark:border-gray-700 rounded-xl overflow-hidden bg-white">
                  <canvas ref={canvasRef} width={400} height={200} onMouseDown={startDrawing} onMouseMove={draw} onMouseUp={stopDrawing} onMouseLeave={stopDrawing} onTouchStart={startDrawing} onTouchMove={draw} onTouchEnd={stopDrawing} className="w-full touch-none" />
                </div>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" fullWidth onClick={clearSignature}>
                  {t('clear')}
                </Button>
                <Button variant="primary" fullWidth onClick={saveSignature}>
                  {t('save')}
                </Button>
              </div>
            </div>
          </div>
        </div>}

      {/* Export Modal */}
      {showExportModal && <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-navy-light rounded-2xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                {t('exportReport')}
              </h3>
              <button onClick={() => setShowExportModal(false)} className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>
            </div>

            <div className="space-y-4">
              <button onClick={handleExportPDF} disabled={isExporting} className="w-full p-4 border-2 border-gray-200 dark:border-gray-700 rounded-xl hover:border-blue-300 dark:hover:border-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all text-left">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-xl flex items-center justify-center">
                    <Download className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {t('exportAsPDF')}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {t('downloadPDF')}
                    </p>
                  </div>
                </div>
              </button>

              <div className="border-2 border-gray-200 dark:border-gray-700 rounded-xl p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-xl flex items-center justify-center">
                    <Mail className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {t('sendByEmail')}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {t('emailReport')}
                    </p>
                  </div>
                </div>
                <Input type="email" value={exportEmail} onChange={e => setExportEmail(e.target.value)} placeholder={t('enterEmailAddress')} className="mb-3" />
                <Button variant="primary" fullWidth onClick={handleSendEmail} disabled={isExporting}>
                  {isExporting ? t('sendingEmail') : t('sendReport')}
                </Button>
              </div>
            </div>
          </div>
        </div>}

      {/* Header */}
      <div className="bg-white dark:bg-navy-light border-b border-gray-200 dark:border-gray-700 p-4 sticky top-0 z-10">
        <div className="flex items-center gap-3 mb-3">
          <IconButton icon={<ArrowLeft className="w-6 h-6" />} onClick={() => navigate(-1)} />
          <div className="flex-1">
            <h1 className="text-lg font-bold text-gray-900 dark:text-white">
              {pmTask.taskNumber}
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {t('pmDetails')}
            </p>
          </div>
          {pmTask.isOverdue && <Badge variant="danger" size="sm">
              {t('overdueTask')}
            </Badge>}
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-600 dark:text-gray-400">
              {t('maintenanceChecklist')}
            </span>
            <span className="font-semibold text-gray-900 dark:text-white">
              {completedSteps}/{totalSteps} {t('completed')}
            </span>
          </div>
          <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-purple-500 to-purple-600 transition-all duration-300" style={{
            width: `${progressPercentage}%`
          }}></div>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Completion Actions (shown after PM is completed) */}
        {isCompleted && <Card padding="md" className="bg-gradient-to-br from-green-50 to-green-100/50 dark:from-green-900/20 dark:to-green-900/10 border-2 border-green-200 dark:border-green-800">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg shadow-green-500/30">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-green-900 dark:text-green-300">
                  {t('completed')}
                </h3>
                <p className="text-xs text-green-800 dark:text-green-400">
                  PM task completed successfully
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button onClick={() => setShowSignatureModal(true)} className="p-4 bg-white dark:bg-navy-light border-2 border-green-200 dark:border-green-800 rounded-xl hover:border-green-300 dark:hover:border-green-700 transition-all">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-10 h-10 bg-green-100 dark:bg-green-900/20 rounded-xl flex items-center justify-center">
                    <PenTool className="w-5 h-5 text-green-600 dark:text-green-400" />
                  </div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    {t('signature')}
                  </p>
                  {signature && <Badge variant="success" size="sm">
                      ✓
                    </Badge>}
                </div>
              </button>

              <button onClick={() => setShowExportModal(true)} className="p-4 bg-white dark:bg-navy-light border-2 border-green-200 dark:border-green-800 rounded-xl hover:border-green-300 dark:hover:border-green-700 transition-all">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-10 h-10 bg-green-100 dark:bg-green-900/20 rounded-xl flex items-center justify-center">
                    <Share2 className="w-5 h-5 text-green-600 dark:text-green-400" />
                  </div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    {t('export')}
                  </p>
                </div>
              </button>
            </div>
          </Card>}

        {/* Device Details */}
        <Card padding="md">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center">
              <Package className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <h2 className="text-sm font-semibold text-gray-900 dark:text-white">
              {t('deviceDetails')}
            </h2>
          </div>

          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-navy rounded-xl">
              <Wrench className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                  {t('deviceName')}
                </p>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                  {pmTask.deviceName}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-navy rounded-xl">
              <Hash className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                  {t('deviceCode')}
                </p>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                  {pmTask.deviceCode}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-navy rounded-xl">
              <FileText className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                  {t('serialNumber')}
                </p>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                  {pmTask.serialNumber}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-navy rounded-xl">
              <FileText className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                  {t('model')}
                </p>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                  {pmTask.model}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-navy rounded-xl">
              <MapPin className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                  {t('location')}
                </p>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                  {pmTask.location}
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* PM Checklist */}
        <Card padding="md">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <h2 className="text-sm font-semibold text-gray-900 dark:text-white">
              {t('pmChecklist')}
            </h2>
          </div>

          <div className="space-y-3">
            {steps.map((step, index) => <div key={step.id} className={`p-4 rounded-xl border-2 transition-all ${step.result === true ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' : step.result === false ? 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800' : 'bg-gray-50 dark:bg-navy border-gray-200 dark:border-gray-700'}`}>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-white dark:bg-navy-light border-2 border-gray-300 dark:border-gray-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-gray-600 dark:text-gray-400">
                      {index + 1}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 dark:text-white mb-3">
                      {step.description}
                    </p>
                    <div className="flex gap-2">
                      <button onClick={() => handleStepChange(step.id, true)} disabled={isCompleted} className={`flex-1 py-2 px-3 rounded-xl font-semibold text-sm transition-all ${step.result === true ? 'bg-green-500 text-white shadow-lg shadow-green-500/30' : 'bg-white dark:bg-navy-light border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-green-300 dark:hover:border-green-700'} ${isCompleted ? 'opacity-50 cursor-not-allowed' : ''}`}>
                        <div className="flex items-center justify-center gap-2">
                          <Check className="w-4 h-4" />
                          {t('pass')}
                        </div>
                      </button>
                      <button onClick={() => handleStepChange(step.id, false)} disabled={isCompleted} className={`flex-1 py-2 px-3 rounded-xl font-semibold text-sm transition-all ${step.result === false ? 'bg-red-500 text-white shadow-lg shadow-red-500/30' : 'bg-white dark:bg-navy-light border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-red-300 dark:hover:border-red-700'} ${isCompleted ? 'opacity-50 cursor-not-allowed' : ''}`}>
                        <div className="flex items-center justify-center gap-2">
                          <X className="w-4 h-4" />
                          {t('fail')}
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>)}
          </div>
        </Card>

        {/* Attach Images */}
        <Card padding="md">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center">
              <Camera className="w-5 h-5 text-orange-600 dark:text-orange-400" />
            </div>
            <div className="flex-1">
              <h2 className="text-sm font-semibold text-gray-900 dark:text-white">
                {t('attachImages')}
              </h2>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {attachedPhotos.length > 0 ? `${attachedPhotos.length} ${attachedPhotos.length === 1 ? t('photoAttached') : t('photosAttached')}` : t('noPhotos')}
              </p>
            </div>
          </div>

          {/* Photo Grid */}
          {attachedPhotos.length > 0 && <div className="grid grid-cols-3 gap-3 mb-4">
              {attachedPhotos.map((photo, index) => <div key={index} className="relative aspect-square rounded-xl overflow-hidden group">
                  <img src={photo} alt={`Photo ${index + 1}`} className="w-full h-full object-cover" />
                  {!isCompleted && <button onClick={() => handleRemovePhoto(index)} className="absolute top-2 right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <X className="w-4 h-4 text-white" />
                    </button>}
                </div>)}
            </div>}

          {/* Add Photo Button */}
          {!isCompleted && <button onClick={handleAddPhoto} className="w-full p-4 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl hover:border-orange-300 dark:hover:border-orange-700 hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-all">
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center">
                  <Camera className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                </div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                  {t('addPhoto')}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  {t('takePhoto')} / {t('chooseFromGallery')}
                </p>
              </div>
            </button>}
        </Card>

        {/* Complete PM Button */}
        {!isCompleted && <Button variant="primary" fullWidth onClick={handleCompletePM} disabled={isSaving || completedSteps === 0}>
            {isSaving ? t('loading') : t('completePM')}
          </Button>}
      </div>
    </div>;
}