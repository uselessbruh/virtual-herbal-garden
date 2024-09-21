import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import PrivateRoute from './admin/PrivateRoute';
import BackgroundMusic from "./BackgroundMusic";

const Dashboard = lazy(() => import('./Dashboard'));
const Garden1 = lazy(() => import('./gardens/Garden1'));
const Garden2 = lazy(() => import('./gardens/Garden2'));
const Garden3 = lazy(() => import('./gardens/Garden3'));
const Garden4 = lazy(() => import('./gardens/Garden4'));
const Shopper = lazy(() => import('./shop/Shopper'));
const AdminLogin = lazy(() => import('./admin/Loginpage'));
const AdminDashBoard = lazy(() => import('./admin/adminpages/Admindashboard')); 
const ChangeInformation = lazy(() => import('./admin/adminpages/ChangeDBContent')); 
const ChangeScript = lazy(() => import('./admin/adminpages/ChangeScript'));
const HowAreYouPage = lazy(() => import('./admin/adminpages/HowAreYouPage')); 

const BackgroundMusicWrapper = () => {
  const location = useLocation();

  const noplayadminlog = location.pathname !== '/admin-login';

  const noplayadmindash = location.pathname !== '/admin-dashboard';

  return noplayadminlog && noplayadmindash ? <BackgroundMusic /> : null;
};

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <BackgroundMusicWrapper />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Dashboard />} />
          <Route path="/garden/plot1" element={<Garden1 />} />
          <Route path="/garden/plot2" element={<Garden2 />} />
          <Route path="/garden/plot3" element={<Garden3 />} />
          <Route path="/garden/plot4" element={<Garden4 />} />
          <Route path="/shopping" element={<Shopper />} />
          <Route path="/admin-login" element={<AdminLogin />} />

          {/* Protected Routes */}
          <Route path="/admin-dashboard" element={<PrivateRoute element={<AdminDashBoard />} />} />
          <Route path="/admin/change-information" element={<PrivateRoute element={<ChangeInformation />} />} />
          <Route path="/admin/change-script" element={<PrivateRoute element={<ChangeScript />} />} />
          <Route path="/how-are-you" element={<PrivateRoute element={<HowAreYouPage />} />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
