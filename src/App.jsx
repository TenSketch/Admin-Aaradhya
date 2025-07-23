import React from "react";
import { Routes, Route } from 'react-router-dom';
import AdminLogin from './pages/AdminLogin/AdminLogin';
import AdminDashboard from './pages/AdminDashboard/AdminDashboard';

function App() {
  // Simple auth check for admin dashboard
  const isAdminLoggedIn = !!localStorage.getItem("admin_token");
  return (
    <Routes>
      <Route path="/" element={<AdminLogin />} />
      <Route path="/admin/dashboard" element={isAdminLoggedIn ? <AdminDashboard /> : <AdminLogin />} />
    </Routes>
  );
}

export default App;
