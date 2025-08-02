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

const AppContent: React.FC = () => {
  const { user, isLoading } = useAuth();
  const [showLanding, setShowLanding] = React.useState(false);
  
  // Check if we're on the reset password page
  const isResetPasswordPage = window.location.pathname === '/reset-password';

  React.useEffect(() => {
    if (!isLoading) {
      // Don't show landing modal on reset password page
      setShowLanding(!user && !isResetPasswordPage);
    }
  }, [user, isLoading, isResetPasswordPage]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Initializing...</p>
        </div>
      </div>
    );
  }

  // Show reset password page if on that route
  if (isResetPasswordPage) {
    return <ResetPasswordPage />;
  }

  // Show landing modal if user is not authenticated and not on reset password page
  if (!user && showLanding) {
    return <LandingModal onAuthSuccess={() => setShowLanding(false)} />;
  }

  // If user is not authenticated and not showing landing, redirect to home
  if (!user) {
    return <LandingModal onAuthSuccess={() => setShowLanding(false)} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/tool/:id" element={<ToolDetailPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
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