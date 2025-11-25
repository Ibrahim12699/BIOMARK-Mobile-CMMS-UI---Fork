import React, { useEffect, useState, Component } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Package, Hash, MapPin, FileText, CheckCircle, XCircle, Camera, Image as ImageIcon, X, Check, Clock } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { IconButton } from '../components/ui/IconButton';
import { Button } from '../components/ui/Button';
import { useLanguage } from '../contexts/LanguageContext';
interface InspectionStep {
  id: string;
  description: string;
  result: boolean | null; // true = pass, false = fail, null = not checked
}
interface Equipment {
  id: string;
  name: string;
  code: string;
  serialNumber: string;
  model: string;
  location: string;
}
export function EquipmentInspectionPage() {
  const {
    inspectionId,
    equipmentId
  } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const {
    t
  } = useLanguage();
  // Get equipment list from URL params
  const equipmentListParam = searchParams.get('equipment');
  const equipmentList: string[] = equipmentListParam ? JSON.parse(decodeURIComponent(equipmentListParam)) : [];
  const currentIndex = equipmentList.findIndex(id => id === equipmentId);
  const totalEquipment = equipmentList.length;
  // Mock equipment data
  const equipment: Equipment = {
    id: equipmentId || 'EQ-001',
    name: 'Ventilator',
    code: 'VNT-2024-001',
    serialNumber: 'SN-VNT-45678',
    model: 'Model V300',
    location: 'ICU - Room 205'
  };
  // Mock inspection steps
  const [steps, setSteps] = useState<InspectionStep[]>([{
    id: '1',
    description: 'Check power supply and connections',
    result: null
  }, {
    id: '2',
    description: 'Verify display and control panel functionality',
    result: null
  }, {
    id: '3',
    description: 'Test alarm systems',
    result: null
  }, {
    id: '4',
    description: 'Inspect breathing circuit for leaks',
    result: null
  }, {
    id: '5',
    description: 'Check pressure and flow sensors',
    result: null
  }, {
    id: '6',
    description: 'Verify emergency backup systems',
    result: null
  }, {
    id: '7',
    description: 'Inspect filters and replace if necessary',
    result: null
  }, {
    id: '8',
    description: 'Test all safety features',
    result: null
  }]);
  const [attachedPhotos, setAttachedPhotos] = useState<string[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const handleStepChange = (stepId: string, result: boolean) => {
    setSteps(steps.map(step => step.id === stepId ? {
      ...step,
      result
    } : step));
  };
  const handleAddPhoto = () => {
    // Simulate adding a photo
    const photoUrl = `https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&q=80`;
    setAttachedPhotos([...attachedPhotos, photoUrl]);
  };
  const handleRemovePhoto = (index: number) => {
    setAttachedPhotos(attachedPhotos.filter((_, i) => i !== index));
  };
  const handleSave = () => {
    setIsSaving(true);
    // Simulate saving
    setTimeout(() => {
      setIsSaving(false);
      setShowSuccess(true);
      // Auto-navigate to next device after 1.5 seconds
      setTimeout(() => {
        setShowSuccess(false);
        if (currentIndex < totalEquipment - 1) {
          // Navigate to next equipment
          const nextEquipmentId = equipmentList[currentIndex + 1];
          navigate(`/inspections/${inspectionId}/equipment/${nextEquipmentId}?equipment=${encodeURIComponent(equipmentListParam || '[]')}`);
        } else {
          // All equipment completed, return to inspection detail
          navigate(`/inspections/${inspectionId}`);
        }
      }, 1500);
    }, 1000);
  };
  const completedSteps = steps.filter(s => s.result !== null).length;
  const totalSteps = steps.length;
  const completedDevices = currentIndex; // Devices before current are completed
  const pendingDevices = totalEquipment - currentIndex - 1; // Devices after current are pending
  const progressPercentage = (currentIndex + 1) / totalEquipment * 100;
  return <div className="min-h-screen bg-gray-50 dark:bg-navy pb-6">
      {/* Success Toast */}
      {showSuccess && <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[60] animate-slide-down">
          <div className="bg-green-500 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 min-w-[280px]">
            <CheckCircle className="w-6 h-6" />
            <div>
              <p className="font-semibold text-sm">{t('inspectionSaved')}</p>
              {currentIndex < totalEquipment - 1 && <p className="text-xs opacity-90">{t('movingToNext')}</p>}
            </div>
          </div>
        </div>}

      {/* Header */}
      <div className="bg-white dark:bg-navy-light border-b border-gray-200 dark:border-gray-700 p-4 sticky top-0 z-10">
        <div className="flex items-center gap-3 mb-3">
          <IconButton icon={<ArrowLeft className="w-6 h-6" />} onClick={() => navigate(`/inspections/${inspectionId}`)} />
          <div className="flex-1">
            <h1 className="text-lg font-bold text-gray-900 dark:text-white">
              {equipment.name}
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {t('equipmentInspection')}
            </p>
          </div>
          <Badge variant="primary" size="sm">
            {currentIndex + 1} {t('of')} {totalEquipment}
          </Badge>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-600 dark:text-gray-400">
              {t('inspectionProgress')}
            </span>
            <div className="flex items-center gap-3">
              {completedDevices > 0 && <div className="flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5 text-green-500" />
                  <span className="font-semibold text-green-600 dark:text-green-400">
                    {completedDevices} {t('completed')}
                  </span>
                </div>}
              {pendingDevices > 0 && <div className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-red-500" />
                  <span className="font-semibold text-red-600 dark:text-red-400">
                    {pendingDevices} {t('pending')}
                  </span>
                </div>}
            </div>
          </div>
          <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-300" style={{
            width: `${progressPercentage}%`
          }}></div>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
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
              <Hash className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                  {t('deviceCode')}
                </p>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                  {equipment.code}
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
                  {equipment.serialNumber}
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
                  {equipment.model}
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
                  {equipment.location}
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Inspection Steps */}
        <Card padding="md">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <h2 className="text-sm font-semibold text-gray-900 dark:text-white">
              {t('inspectionSteps')}
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
                      <button onClick={() => handleStepChange(step.id, true)} className={`flex-1 py-2 px-3 rounded-xl font-semibold text-sm transition-all ${step.result === true ? 'bg-green-500 text-white shadow-lg shadow-green-500/30' : 'bg-white dark:bg-navy-light border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-green-300 dark:hover:border-green-700'}`}>
                        <div className="flex items-center justify-center gap-2">
                          <Check className="w-4 h-4" />
                          {t('pass')}
                        </div>
                      </button>
                      <button onClick={() => handleStepChange(step.id, false)} className={`flex-1 py-2 px-3 rounded-xl font-semibold text-sm transition-all ${step.result === false ? 'bg-red-500 text-white shadow-lg shadow-red-500/30' : 'bg-white dark:bg-navy-light border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-red-300 dark:hover:border-red-700'}`}>
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
                  <button onClick={() => handleRemovePhoto(index)} className="absolute top-2 right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <X className="w-4 h-4 text-white" />
                  </button>
                </div>)}
            </div>}

          {/* Add Photo Button */}
          <button onClick={handleAddPhoto} className="w-full p-4 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl hover:border-orange-300 dark:hover:border-orange-700 hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-all">
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
          </button>
        </Card>

        {/* Save Button */}
        <Button variant="primary" fullWidth onClick={handleSave} disabled={isSaving || completedSteps === 0}>
          {isSaving ? t('loading') : currentIndex < totalEquipment - 1 ? t('saveAndNext') : t('saveInspection')}
        </Button>
      </div>
    </div>;
}