import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Header from './components/layout/Header';
import HomePage from './components/home/HomePage';
import ToolDetail from './components/tool/ToolDetail';
import DashboardLayout from './components/dashboard/DashboardLayout';
import DashboardHome from './components/dashboard/DashboardHome';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  return user ? <>{children}</> : <Navigate to="/" />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/tool/:id" element={<ToolDetail 
              tool={{
                id: '1',
                ownerId: '1',
                owner: {
                  id: '1',
                  email: 'john@example.com',
                  name: 'John Martinez',
                  phone: '(555) 123-4567',
                  avatar: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
                  location: 'San Francisco, CA',
                  bio: 'Professional contractor with 15+ years experience.',
                  role: 'owner',
                  verified: { email: true, phone: true, id: true },
                  rating: 4.8,
                  reviewCount: 156,
                  memberSince: '2020-03-15',
                  trustScore: 95,
                },
                title: 'DeWalt 20V Max Cordless Drill Set',
                description: 'Professional-grade cordless drill with 2 batteries, charger, and carrying case. Perfect for construction and home projects.',
                category: 'Power Tools',
                brand: 'DeWalt',
                model: 'DCD771C2',
                images: [
                  'https://images.pexels.com/photos/209274/pexels-photo-209274.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
                  'https://images.pexels.com/photos/1015568/pexels-photo-1015568.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
                ],
                location: 'San Francisco, CA',
                condition: 'excellent',
                specifications: {
                  'Max Torque': '300 UWO',
                  'Chuck Size': '1/2 inch',
                  'Battery': '20V MAX',
                  'Weight': '3.6 lbs',
                },
                pricing: {
                  type: 'fixed',
                  hourly: 15,
                  daily: 45,
                  weekly: 280,
                },
                availability: {
                  startDate: '2024-01-20',
                  endDate: '2024-12-31',
                  blockedDates: ['2024-02-10', '2024-02-11'],
                },
                operatorSupport: {
                  available: false,
                  required: false,
                },
                insurance: {
                  available: true,
                  basicCoverage: 12,
                  premiumCoverage: 24,
                },
                rating: 4.8,
                reviewCount: 34,
                features: ['2 Batteries', 'Fast Charger', 'LED Light', 'Belt Clip'],
                rules: ['No wet conditions', 'Return clean', 'Report any damage immediately'],
                deposit: 100,
                createdAt: '2024-01-10',
                updatedAt: '2024-01-15',
                status: 'active',
                views: 245,
                favorites: 18,
              }}
              onBook={(booking) => console.log('Book:', booking)}
              onBid={(toolId, amount) => console.log('Bid:', toolId, amount)}
            />} />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <DashboardHome />
                </DashboardLayout>
              </ProtectedRoute>
            } />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;