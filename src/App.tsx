import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { AppShell } from './components/AppShell';
import { SplashScreen } from './pages/SplashScreen';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { WorkOrdersPage } from './pages/WorkOrdersPage';
import { WorkOrderDetailsPage } from './pages/WorkOrderDetailsPage';
import { AssetsPage } from './pages/AssetsPage';
import { AssetProfilePage } from './pages/AssetProfilePage';
import { MaintenanceHistoryPage } from './pages/MaintenanceHistoryPage';
import { MaintenanceDetailPage } from './pages/MaintenanceDetailPage';
import { SparePartsPage } from './pages/SparePartsPage';
import { ReportsPage } from './pages/ReportsPage';
import { NotificationsPage } from './pages/NotificationsPage';
import { SettingsPage } from './pages/SettingsPage';
import { InspectionsPage } from './pages/InspectionsPage';
import { InspectionDetailPage } from './pages/InspectionDetailPage';
import { EquipmentInspectionPage } from './pages/EquipmentInspectionPage';
import { PreventiveMaintenancePage } from './pages/PreventiveMaintenancePage';
import { PMDetailPage } from './pages/PMDetailPage';
export function App() {
  return <ThemeProvider>
      <LanguageProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SplashScreen />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/*" element={<AppShell>
                  <Routes>
                    <Route path="/dashboard" element={<DashboardPage />} />
                    <Route path="/work-orders" element={<WorkOrdersPage />} />
                    <Route path="/work-orders/:id" element={<WorkOrderDetailsPage />} />
                    <Route path="/assets" element={<AssetsPage />} />
                    <Route path="/assets/:id" element={<AssetProfilePage />} />
                    <Route path="/assets/:assetId/maintenance" element={<MaintenanceHistoryPage />} />
                    <Route path="/assets/:assetId/maintenance/:maintenanceId" element={<MaintenanceDetailPage />} />
                    <Route path="/spare-parts" element={<SparePartsPage />} />
                    <Route path="/reports" element={<ReportsPage />} />
                    <Route path="/notifications" element={<NotificationsPage />} />
                    <Route path="/settings" element={<SettingsPage />} />
                    <Route path="/inspections" element={<InspectionsPage />} />
                    <Route path="/inspections/:id" element={<InspectionDetailPage />} />
                    <Route path="/inspections/:inspectionId/equipment/:equipmentId" element={<EquipmentInspectionPage />} />
                    <Route path="/preventive-maintenance" element={<PreventiveMaintenancePage />} />
                    <Route path="/preventive-maintenance/:id" element={<PMDetailPage />} />
                  </Routes>
                </AppShell>} />
          </Routes>
          <Toaster position="top-center" />
        </BrowserRouter>
      </LanguageProvider>
    </ThemeProvider>;
}