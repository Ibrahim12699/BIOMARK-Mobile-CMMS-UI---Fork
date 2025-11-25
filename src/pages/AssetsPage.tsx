import React, { useMemo, useState } from 'react';
import { Search, QrCode, Filter, X, Check, ChevronDown, ChevronUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Input } from '../components/ui/Input';
import { IconButton } from '../components/ui/IconButton';
import { Button } from '../components/ui/Button';
import { useLanguage } from '../contexts/LanguageContext';
import { mockAssets } from '../utils/mockData';
interface FilterState {
  location: string;
  manufacturer: string;
  riskFactor: string;
  assetType: string;
}
interface ExpandedSections {
  location: boolean;
  manufacturer: boolean;
  riskFactor: boolean;
  assetType: boolean;
}
export function AssetsPage() {
  const navigate = useNavigate();
  const {
    t,
    language
  } = useLanguage();
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<FilterState>({
    location: 'all',
    manufacturer: 'all',
    riskFactor: 'all',
    assetType: 'all'
  });
  const [expandedSections, setExpandedSections] = useState<ExpandedSections>({
    location: true,
    manufacturer: false,
    riskFactor: false,
    assetType: false
  });
  // Filter options
  const filterOptions = {
    locations: [{
      value: 'all',
      label: t('allLocations')
    }, {
      value: 'icu',
      label: t('icu')
    }, {
      value: 'emergency',
      label: t('emergency')
    }, {
      value: 'operating-room',
      label: t('operatingRoom')
    }, {
      value: 'general-ward',
      label: t('generalWard')
    }],
    manufacturers: [{
      value: 'all',
      label: t('allManufacturers')
    }, {
      value: 'philips',
      label: 'Philips'
    }, {
      value: 'ge',
      label: 'GE Healthcare'
    }, {
      value: 'siemens',
      label: 'Siemens'
    }, {
      value: 'medtronic',
      label: 'Medtronic'
    }],
    riskFactors: [{
      value: 'all',
      label: t('allRiskFactors')
    }, {
      value: 'high',
      label: t('highRisk')
    }, {
      value: 'medium',
      label: t('mediumRisk')
    }, {
      value: 'low',
      label: t('lowRisk')
    }],
    assetTypes: [{
      value: 'all',
      label: t('allAssetTypes')
    }, {
      value: 'ventilator',
      label: t('ventilator')
    }, {
      value: 'monitor',
      label: t('monitor')
    }, {
      value: 'infusion-pump',
      label: t('infusionPump')
    }, {
      value: 'xray',
      label: t('xrayMachine')
    }]
  };
  // Toggle section expansion
  const toggleSection = (section: keyof ExpandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };
  // Apply filters to assets
  const filteredAssets = useMemo(() => {
    return mockAssets.filter(asset => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch = asset.name.toLowerCase().includes(query) || asset.model.toLowerCase().includes(query) || asset.serialNumber.toLowerCase().includes(query) || asset.location.toLowerCase().includes(query);
        if (!matchesSearch) return false;
      }
      // Location filter
      if (filters.location !== 'all') {
        const locationMatch = asset.location.toLowerCase().includes(filters.location);
        if (!locationMatch) return false;
      }
      // Risk factor filter
      if (filters.riskFactor !== 'all') {
        if (asset.riskScore !== filters.riskFactor) return false;
      }
      return true;
    });
  }, [searchQuery, filters]);
  const handleApplyFilters = () => {
    setShowFilterModal(false);
  };
  const handleClearFilters = () => {
    setFilters({
      location: 'all',
      manufacturer: 'all',
      riskFactor: 'all',
      assetType: 'all'
    });
  };
  const hasActiveFilters = Object.values(filters).some(value => value !== 'all');
  // Get risk color for left border
  const getRiskColor = (riskScore: string) => {
    switch (riskScore) {
      case 'high':
        return 'border-l-4 border-l-red-500';
      case 'medium':
        return 'border-l-4 border-l-yellow-500';
      case 'low':
        return 'border-l-4 border-l-green-500';
      default:
        return '';
    }
  };
  return <div className="p-4 space-y-4 pb-24">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {t('assets')}
        </h1>
        <div className="flex items-center gap-2">
          <IconButton icon={<Filter className="w-6 h-6" />} onClick={() => setShowFilterModal(true)} className={hasActiveFilters ? 'bg-primary text-white' : ''} />
          <IconButton icon={<QrCode className="w-6 h-6" />} />
        </div>
      </div>

      {/* Search */}
      <Input placeholder={t('search')} icon={<Search className="w-5 h-5" />} value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />

      {/* Active Filters Indicator */}
      {hasActiveFilters && <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <Filter className="w-4 h-4" />
          <span>{t('filter')} active</span>
          <button onClick={handleClearFilters} className="text-primary hover:underline">
            {t('clearFilters')}
          </button>
        </div>}

      {/* Assets List */}
      <div className="space-y-3">
        {filteredAssets.map(asset => <Card key={asset.id} padding="none" onClick={() => navigate(`/assets/${asset.id}`)} className={`overflow-hidden ${getRiskColor(asset.riskScore)}`}>
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                    {asset.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {asset.model} • {asset.serialNumber}
                  </p>
                </div>
                <Badge variant={asset.riskScore === 'high' ? 'danger' : asset.riskScore === 'medium' ? 'warning' : 'success'}>
                  {asset.riskScore === 'high' ? t('highRisk') : asset.riskScore === 'medium' ? t('mediumRisk') : t('lowRisk')}
                </Badge>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-gray-200 dark:border-gray-700">
                <span className="text-xs text-gray-600 dark:text-gray-400">
                  {asset.location}
                </span>
                <Badge variant={asset.status === 'operational' ? 'success' : asset.status === 'maintenance' ? 'warning' : 'danger'} size="sm">
                  {asset.status}
                </Badge>
              </div>
            </div>
          </Card>)}

        {filteredAssets.length === 0 && <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">{t('noData')}</p>
          </div>}
      </div>

      {/* Filter Modal */}
      {showFilterModal && <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-start justify-center">
          <div className="bg-white dark:bg-navy-light rounded-b-3xl shadow-2xl w-full sm:max-w-md h-[90vh] flex flex-col animate-slide-down">
            {/* Header */}
            <div className="flex-shrink-0 bg-white dark:bg-navy-light border-b border-gray-200 dark:border-gray-700 p-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                {t('filterAssets')}
              </h2>
              <button onClick={() => setShowFilterModal(false)} className="p-2 hover:bg-gray-100 dark:hover:bg-navy rounded-xl transition-colors">
                <X className="w-6 h-6 text-gray-600 dark:text-gray-400" />
              </button>
            </div>

            {/* Scrollable Filter Options */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {/* Location Filter */}
              <div className="border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden">
                <button onClick={() => toggleSection('location')} className="w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-navy hover:bg-gray-100 dark:hover:bg-navy-light transition-colors">
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                    {t('location')}
                  </h3>
                  {expandedSections.location ? <ChevronUp className="w-5 h-5 text-gray-600 dark:text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-600 dark:text-gray-400" />}
                </button>
                {expandedSections.location && <div className="p-3 space-y-2 bg-white dark:bg-navy-light">
                    {filterOptions.locations.map(option => <button key={option.value} onClick={() => setFilters({
                ...filters,
                location: option.value
              })} className={`w-full flex items-center justify-between p-3 rounded-xl border-2 transition-all ${filters.location === option.value ? 'border-primary bg-primary/5 dark:bg-primary/10' : 'border-gray-200 dark:border-gray-700 hover:border-primary/50'}`}>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {option.label}
                        </span>
                        {filters.location === option.value && <Check className="w-5 h-5 text-primary" />}
                      </button>)}
                  </div>}
              </div>

              {/* Manufacturer Filter */}
              <div className="border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden">
                <button onClick={() => toggleSection('manufacturer')} className="w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-navy hover:bg-gray-100 dark:hover:bg-navy-light transition-colors">
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                    {t('manufacturer')}
                  </h3>
                  {expandedSections.manufacturer ? <ChevronUp className="w-5 h-5 text-gray-600 dark:text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-600 dark:text-gray-400" />}
                </button>
                {expandedSections.manufacturer && <div className="p-3 space-y-2 bg-white dark:bg-navy-light">
                    {filterOptions.manufacturers.map(option => <button key={option.value} onClick={() => setFilters({
                ...filters,
                manufacturer: option.value
              })} className={`w-full flex items-center justify-between p-3 rounded-xl border-2 transition-all ${filters.manufacturer === option.value ? 'border-primary bg-primary/5 dark:bg-primary/10' : 'border-gray-200 dark:border-gray-700 hover:border-primary/50'}`}>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {option.label}
                        </span>
                        {filters.manufacturer === option.value && <Check className="w-5 h-5 text-primary" />}
                      </button>)}
                  </div>}
              </div>

              {/* Risk Factor Filter */}
              <div className="border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden">
                <button onClick={() => toggleSection('riskFactor')} className="w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-navy hover:bg-gray-100 dark:hover:bg-navy-light transition-colors">
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                    {t('riskFactor')}
                  </h3>
                  {expandedSections.riskFactor ? <ChevronUp className="w-5 h-5 text-gray-600 dark:text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-600 dark:text-gray-400" />}
                </button>
                {expandedSections.riskFactor && <div className="p-3 space-y-2 bg-white dark:bg-navy-light">
                    {filterOptions.riskFactors.map(option => <button key={option.value} onClick={() => setFilters({
                ...filters,
                riskFactor: option.value
              })} className={`w-full flex items-center justify-between p-3 rounded-xl border-2 transition-all ${filters.riskFactor === option.value ? 'border-primary bg-primary/5 dark:bg-primary/10' : 'border-gray-200 dark:border-gray-700 hover:border-primary/50'}`}>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {option.label}
                        </span>
                        {filters.riskFactor === option.value && <Check className="w-5 h-5 text-primary" />}
                      </button>)}
                  </div>}
              </div>

              {/* Asset Type Filter */}
              <div className="border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden">
                <button onClick={() => toggleSection('assetType')} className="w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-navy hover:bg-gray-100 dark:hover:bg-navy-light transition-colors">
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                    {t('assetType')}
                  </h3>
                  {expandedSections.assetType ? <ChevronUp className="w-5 h-5 text-gray-600 dark:text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-600 dark:text-gray-400" />}
                </button>
                {expandedSections.assetType && <div className="p-3 space-y-2 bg-white dark:bg-navy-light">
                    {filterOptions.assetTypes.map(option => <button key={option.value} onClick={() => setFilters({
                ...filters,
                assetType: option.value
              })} className={`w-full flex items-center justify-between p-3 rounded-xl border-2 transition-all ${filters.assetType === option.value ? 'border-primary bg-primary/5 dark:bg-primary/10' : 'border-gray-200 dark:border-gray-700 hover:border-primary/50'}`}>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {option.label}
                        </span>
                        {filters.assetType === option.value && <Check className="w-5 h-5 text-primary" />}
                      </button>)}
                  </div>}
              </div>
            </div>

            {/* Footer Actions */}
            <div className="flex-shrink-0 bg-white dark:bg-navy-light border-t border-gray-200 dark:border-gray-700 p-4 flex gap-3 rounded-b-3xl">
              <Button variant="outline" fullWidth onClick={handleClearFilters}>
                {t('clearFilters')}
              </Button>
              <Button variant="primary" fullWidth onClick={handleApplyFilters}>
                {t('applyFilters')}
              </Button>
            </div>
          </div>
        </div>}
    </div>;
}