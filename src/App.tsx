import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import LandingModal from './components/landing/LandingModal';
import Header from './components/layout/Header';
import HomePage from './components/home/HomePage';
import ToolDetailPage from './components/tool/ToolDetailPage';
import DashboardLayout from './components/dashboard/DashboardLayout';
import DashboardHome from './components/dashboard/DashboardHome';

const AppContent: React.FC = () => {
  const { user, isLoading } = useAuth();
  const [showLanding, setShowLanding] = React.useState(!user);

  React.useEffect(() => {
    if (!isLoading) {
      setShowLanding(!user);
    }
  }, [user]);

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

  if (!user && showLanding) {
    return <LandingModal onAuthSuccess={() => setShowLanding(false)} />;
  }

  if (!user) {
    return <LandingModal onAuthSuccess={() => setShowLanding(false)} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/tool/:id" element={<ToolDetailPage />} />
        <Route path="/dashboard" element={
          <DashboardLayout>
            <DashboardHome />
          </DashboardLayout>
        } />
      </Routes>
    </div>
  );
};

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  return user ? <>{children}</> : <Navigate to="/" />;
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