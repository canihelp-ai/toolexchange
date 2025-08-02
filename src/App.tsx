import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import LandingModal from './components/landing/LandingModal';
import Header from './components/layout/Header';
import HomePage from './components/home/HomePage';
import ToolDetailPage from './components/tool/ToolDetailPage';
import DashboardLayout from './components/dashboard/DashboardLayout';
import DashboardHome from './components/dashboard/DashboardHome';
import ResetPasswordPage from './pages/ResetPasswordPage';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage';

const AppContent: React.FC = () => {
  const { user, isLoading: authLoading } = useAuth();
  
  // Check if we're on the reset password page
  const isResetPasswordPage = window.location.pathname === '/reset-password';

  if (authLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading ToolShare...</p>
        </div>
      </div>
    );
  }

  // Show reset password page if on that route
  if (isResetPasswordPage) {
    return <ResetPasswordPage />;
  }

  // Show landing modal if user is not authenticated
  if (!user) {
    return <LandingModal onAuthSuccess={() => {}} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/tool/:id" element={<ToolDetailPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/dashboard" element={
          <DashboardLayout>
            <DashboardHome />
          </DashboardLayout>
        } />
      </Routes>
    </div>
  );
};


function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;