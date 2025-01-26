import React, { lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

const Dashboard = lazy(() => import("../pages/dashboard"));
const LoginPage = lazy(() => import("../pages/auth/login"));
const RegisterPage = lazy(() => import("../pages/auth/register"));
const MainDashboard = lazy(() => import("../pages/dashboard/main-dashboard"));
const FormBuilderPage = lazy(() => import("../pages/dashboard/form-builder"));

const isAuthenticated = () => {
  return !!localStorage.getItem("authToken");
};

const PrivateRoute = ({ element }) => {
  return isAuthenticated() ? element : <Navigate to="/login" />;
};

const PublicRoute = ({ element }) => {
  return isAuthenticated() ? <Navigate to="/dashboard" /> : element;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={isAuthenticated() ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />

      <Route path="/login" element={<PublicRoute element={<LoginPage />} />} />
      <Route path="/register" element={<PublicRoute element={<RegisterPage />} />} />

      <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />}>
        <Route index element={<Navigate to="main" />} />
        <Route path="main" element={<PrivateRoute element={<MainDashboard />} />} />
        <Route path="form-builder" element={<PrivateRoute element={<FormBuilderPage />} />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
