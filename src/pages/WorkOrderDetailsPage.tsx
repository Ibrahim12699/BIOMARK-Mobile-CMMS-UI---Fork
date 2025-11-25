import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Camera, Plus, Check, MapPin, Clock, User } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { IconButton } from '../components/ui/IconButton';
import { useLanguage } from '../contexts/LanguageContext';
import { mockWorkOrders } from '../utils/mockData';
export function WorkOrderDetailsPage() {
  const {
    id
  } = useParams();
  const navigate = useNavigate();
  const {
    t
  } = useLanguage();
  const [signatureData, setSignatureData] = useState<string | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const workOrder = mockWorkOrders.find(wo => wo.id === id);
  if (!workOrder) {
    return <div className="p-4">Work order not found</div>;
  }
  const statusSteps = [{
    label: 'Assigned',
    status: 'completed'
  }, {
    label: 'In Progress',
    status: workOrder.status === 'in-progress' ? 'active' : workOrder.status === 'completed' ? 'completed' : 'pending'
  }, {
    label: 'Completed',
    status: workOrder.status === 'completed' ? 'completed' : 'pending'
  }];
  return <div className="min-h-screen bg-gray-50 dark:bg-navy pb-6">
      {/* Header */}
      <div className="bg-white dark:bg-navy-light border-b border-gray-200 dark:border-gray-700 p-4 sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <IconButton icon={<ArrowLeft className="w-6 h-6" />} onClick={() => navigate(-1)} />
          <div className="flex-1">
            <h1 className="text-lg font-bold text-gray-900 dark:text-white">
              {workOrder.id}
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {t('workOrderDetails')}
            </p>
          </div>
          <Badge variant={workOrder.priority === 'critical' ? 'danger' : 'warning'}>
            {workOrder.priority}
          </Badge>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Status Timeline */}
        <Card padding="md">
          <h2 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
            Status Timeline
          </h2>
          <div className="relative">
            {statusSteps.map((step, index) => <div key={index} className="flex items-center gap-3 mb-4 last:mb-0">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${step.status === 'completed' ? 'bg-accent text-white' : step.status === 'active' ? 'bg-primary text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-400'}`}>
                  {step.status === 'completed' && <Check className="w-5 h-5" />}
                  {step.status === 'active' && <div className="w-3 h-3 bg-white rounded-full animate-pulse" />}
                </div>
                <span className={`text-sm font-medium ${step.status === 'pending' ? 'text-gray-400' : 'text-gray-900 dark:text-white'}`}>
                  {step.label}
                </span>
              </div>)}
          </div>
        </Card>

        {/* Asset Info */}
        <Card padding="md">
          <h2 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
            Asset Information
          </h2>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="w-4 h-4 text-gray-400" />
              <span className="text-gray-600 dark:text-gray-400">
                Location:
              </span>
              <span className="text-gray-900 dark:text-white font-medium">
                {workOrder.location}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Clock className="w-4 h-4 text-gray-400" />
              <span className="text-gray-600 dark:text-gray-400">Due:</span>
              <span className="text-gray-900 dark:text-white font-medium">
                {new Date(workOrder.dueDate).toLocaleDateString()}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <User className="w-4 h-4 text-gray-400" />
              <span className="text-gray-600 dark:text-gray-400">
                Assigned:
              </span>
              <span className="text-gray-900 dark:text-white font-medium">
                {workOrder.assignedTo}
              </span>
            </div>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
            {workOrder.description}
          </p>
        </Card>

        {/* Maintenance Steps */}
        <Card padding="md">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-gray-900 dark:text-white">
              Maintenance Steps
            </h2>
            <button className="text-primary hover:text-primary-dark text-sm font-medium flex items-center gap-1">
              <Plus className="w-4 h-4" />
              {t('addStep')}
            </button>
          </div>
          <div className="space-y-2">
            {workOrder.steps.map(step => <div key={step.id} className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 dark:bg-navy">
                <input type="checkbox" checked={step.completed} className="w-5 h-5 mt-0.5 text-accent border-gray-300 rounded focus:ring-accent" readOnly />
                <span className={`text-sm flex-1 ${step.completed ? 'line-through text-gray-400' : 'text-gray-900 dark:text-white'}`}>
                  {step.description}
                </span>
              </div>)}
          </div>
        </Card>

        {/* Photo Upload */}
        <Card padding="md">
          <h2 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
            {t('uploadPhoto')}
          </h2>
          <button className="w-full h-32 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl flex flex-col items-center justify-center gap-2 hover:border-primary transition-colors">
            <Camera className="w-8 h-8 text-gray-400" />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Tap to add photo
            </span>
          </button>
        </Card>

        {/* Digital Signature */}
        <Card padding="md">
          <h2 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
            {t('signature')}
          </h2>
          <div className="border-2 border-gray-300 dark:border-gray-600 rounded-xl h-40 flex items-center justify-center bg-gray-50 dark:bg-navy">
            <span className="text-sm text-gray-400">{t('signHere')}</span>
          </div>
          <div className="flex gap-2 mt-3">
            <Button variant="outline" size="sm" fullWidth>
              {t('clear')}
            </Button>
            <Button variant="primary" size="sm" fullWidth>
              {t('save')}
            </Button>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button variant="outline" fullWidth>
            Save Draft
          </Button>
          <Button variant="primary" fullWidth>
            {t('completeWorkOrder')}
          </Button>
        </div>
      </div>
    </div>;
}