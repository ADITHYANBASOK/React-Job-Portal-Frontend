import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/sonner';
import { MainLayout } from '@/components/layout/MainLayout';
import { DashboardLayout } from '@/components/layout/DashboardLayout';

// Public Pages
import { HomePage } from '@/pages/public/HomePage';
// import { JobsPage } from '@/pages/public/JobsPage';
// import { JobDetailsPage } from '@/pages/public/JobDetailsPage';
// import { CompaniesPage } from '@/pages/public/CompaniesPage';
// import { CompanyDetailsPage } from '@/pages/public/CompanyDetailsPage';
import { LoginPage } from '@/pages/auth/LoginPage';
import { RegisterPage } from '@/pages/auth/RegisterPage';

// Seeker Pages
import { SeekerDashboardPage } from '@/pages/seeker/DashboardPage';
// import { SeekerApplicationsPage } from '@/pages/seeker/ApplicationsPage';
// import { SeekerProfilePage } from '@/pages/seeker/ProfilePage';
// import { SeekerMessagesPage } from '@/pages/seeker/MessagesPage';

// Employer Pages
import { EmployerDashboardPage } from '@/pages/employer/DashboardPage';
import { EmployerJobsPage } from '@/pages/employer/JobsPage';
// import { EmployerApplicationsPage } from '@/pages/employer/ApplicationsPage';
// import { EmployerProfilePage } from '@/pages/employer/ProfilePage';
// import { EmployerMessagesPage } from '@/pages/employer/MessagesPage';

// Admin Pages
import { AdminDashboardPage } from '@/pages/admin/DashboardPage';
// import { AdminUsersPage } from '@/pages/admin/UsersPage';
// import { AdminJobsPage } from '@/pages/admin/JobsPage';
// import { AdminReportsPage } from '@/pages/admin/ReportsPage';
// import { AdminSettingsPage } from '@/pages/admin/SettingsPage';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            {/* <Route path="jobs" element={<JobsPage />} />
            <Route path="jobs/:id" element={<JobDetailsPage />} />
            <Route path="companies" element={<CompaniesPage />} />
            <Route path="companies/:id" element={<CompanyDetailsPage />} /> */}
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
          </Route>

          {/* Job Seeker Routes */}
          <Route path="/seeker" element={<DashboardLayout role="seeker" />}>
            <Route index element={<Navigate to="/seeker/dashboard" replace />} />
            <Route path="dashboard" element={<SeekerDashboardPage />} />
            {/* <Route path="applications" element={<SeekerApplicationsPage />} />
            <Route path="profile" element={<SeekerProfilePage />} />
            <Route path="messages" element={<SeekerMessagesPage />} /> */}
          </Route>

          {/* Employer Routes */}
          <Route path="/employer" element={<DashboardLayout role="employer" />}>
            <Route index element={<Navigate to="/employer/dashboard" replace />} />
            <Route path="dashboard" element={<EmployerDashboardPage />} />
            <Route path="jobs" element={<EmployerJobsPage />} />
            {/* <Route path="applications" element={<EmployerApplicationsPage />} />
            <Route path="profile" element={<EmployerProfilePage />} />
            <Route path="messages" element={<EmployerMessagesPage />} /> */}
          </Route>

          {/* Admin Routes */}
          <Route path="/admin" element={<DashboardLayout role="admin" />}>
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboardPage />} />
            {/* <Route path="users" element={<AdminUsersPage />} />
            <Route path="jobs" element={<AdminJobsPage />} />
            <Route path="reports" element={<AdminReportsPage />} />
            <Route path="settings" element={<AdminSettingsPage />} /> */}
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;