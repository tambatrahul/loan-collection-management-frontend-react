import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import DashboardLayout from '../components/layout/DashboardLayout';
import LoginPage from '../pages/auth/LoginPage';
import DashboardPage from '../pages/dashboard/DashboardPage';
import ProtectedRoute from './ProtectedRoute';
import CustomerListPage from '../pages/customers/CustomerListPage';
import CustomerFormPage from '../pages/customers/CustomerFormPage';
import LoanListPage from '../pages/loans/LoanListPage';
import LoanFormPage from '../pages/loans/LoanFormPage';
import CollectionListPage from '../pages/collections/CollectionListPage';
import CollectionFormPage from '../pages/collections/CollectionFormPage';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />

            <Route path="/customers" element={<CustomerListPage />} />
            <Route path="/customers/create" element={<CustomerFormPage />} />
            <Route path="/customers/:id/edit" element={<CustomerFormPage />} />

            <Route path="/loans" element={<LoanListPage />} />
            <Route path="/loans/create" element={<LoanFormPage />} />
            <Route path="/loans/:id/edit" element={<LoanFormPage />} />

            <Route path="/collections" element={<CollectionListPage />} />
            <Route path="/collections/create" element={<CollectionFormPage />}/>
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}