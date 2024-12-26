// import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { Toaster } from '@/components/ui/sonner';
// import { MainLayout } from '@/components/layout/MainLayout';
// import { DashboardLayout } from '@/components/layout/DashboardLayout';

// // Public Pages
// import { HomePage } from '@/pages/public/HomePage';
// import { JobsPage } from '@/pages/public/JobsPage';
// import { JobDetailsPage } from '@/pages/public/JobDetailsPage';
// import { CompaniesPage } from '@/pages/public/CompaniesPage';
// import { CompanyDetailsPage } from '@/pages/public/CompanyDetailsPage';
// import { LoginPage } from '@/pages/auth/LoginPage';
// import { RegisterPage } from '@/pages/auth/RegisterPage';

// // Seeker Pages
// import { SeekerDashboardPage } from '@/pages/seeker/DashboardPage';
// // import { SeekerApplicationsPage } from '@/pages/seeker/ApplicationsPage';
// // import { SeekerProfilePage } from '@/pages/seeker/ProfilePage';
// // import { SeekerMessagesPage } from '@/pages/seeker/MessagesPage';
// import SeekerMessagesPage from './pages/seeker/MessagesPage';
// import SeekerProfilePage from './pages/seeker/ProfilePage';
// import JobSeekerApplications from './pages/seeker/AppliedApplicationPage';



// // Employer Pages
// import { EmployerDashboardPage } from '@/pages/employer/DashboardPage';
// import { EmployerJobsPage } from '@/pages/employer/JobsPage';
// // import { EmployerMessagesPage } from '@/pages/employer/MessagesPage';
// import EmployerProfilePage from './pages/employer/CompanyProfile';
// import EmployerApplicationsPage from './pages/employer/Applications';




// // Admin Pages
// import { AdminDashboardPage } from '@/pages/admin/DashboardPage';
// import ApplicationSuccess from './pages/seeker/ApplicationSuccess';
// import EmployerJobDetailsPage from './pages/employer/JobDetailsPage';

// // import { AdminUsersPage } from '@/pages/admin/UsersPage';
// // import { AdminJobsPage } from '@/pages/admin/JobsPage';
// // import { AdminReportsPage } from '@/pages/admin/ReportsPage';
// // import { AdminSettingsPage } from '@/pages/admin/SettingsPage';

// const queryClient = new QueryClient();

// function App() {
//   return (
//     <QueryClientProvider client={queryClient}>
//       <BrowserRouter>
//         <Routes>
//           {/* Public Routes */}
//           <Route path="/" element={<MainLayout />}>
//             <Route index element={<HomePage />} />
//             <Route path="jobs" element={<JobsPage />} />
//             <Route path="jobs/:id" element={<JobDetailsPage />} />
//             <Route path="companies" element={<CompaniesPage />} />
//             <Route path="companies/:id" element={<CompanyDetailsPage />} />
//             <Route path="login" element={<LoginPage />} />
//             <Route path="register" element={<RegisterPage />} />
//           </Route>

//           {/* Job Seeker Routes */}
//           <Route path="/seeker" element={<DashboardLayout role="seeker" />}>
//             <Route index element={<Navigate to="/seeker/dashboard" replace />} />
//             <Route path="dashboard" element={<SeekerDashboardPage />} />
//             <Route path="applications" element={<JobSeekerApplications />} />
//             <Route path="profile" element={<SeekerProfilePage />} />
//             <Route path="messages" element={<SeekerMessagesPage />} />
//             <Route path="companies" element={<CompaniesPage />} />
//             <Route path="companies/:id" element={<CompanyDetailsPage />} />
//             <Route path='jobs' element={<JobsPage/>}/>
//             <Route path="jobs/:id" element={<JobDetailsPage />} />
//             <Route path='Application-Success' element={<ApplicationSuccess/>}/>



//           </Route>

//           {/* Employer Routes */}
//           <Route path="/employer" element={<DashboardLayout role="employer" />}>
//             <Route index element={<Navigate to="/employer/dashboard" replace />} />
//             <Route path="dashboard" element={<EmployerDashboardPage />} />
//             <Route path="jobs" element={<EmployerJobsPage />} />
//             <Route path="jobs/:id" element={<EmployerJobDetailsPage />} />
//             <Route path="applications" element={<EmployerApplicationsPage />} />
//             <Route path="profile" element={<EmployerProfilePage />} />
//             <Route path="messages" element={<SeekerMessagesPage />} />

//             {/* <Route path="messages" element={<EmployerMessagesPage />} /> */}
//           </Route>

//           {/* Admin Routes */}
//           <Route path="/admin" element={<DashboardLayout role="admin" />}>
//             <Route index element={<Navigate to="/admin/dashboard" replace />} />
//             <Route path="dashboard" element={<AdminDashboardPage />} />
//             {/* <Route path="users" element={<AdminUsersPage />} />
//             <Route path="jobs" element={<AdminJobsPage />} />
//             <Route path="reports" element={<AdminReportsPage />} />
//             <Route path="settings" element={<AdminSettingsPage />} /> */}
//           </Route>
//         </Routes>
//       </BrowserRouter>
//       <Toaster />
//     </QueryClientProvider>
//   );
// }

// export default App;

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/sonner';
import { MainLayout } from '@/components/layout/MainLayout';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Suspense, lazy } from 'react';

// Lazy load pages
const HomePage = lazy(() => import('./pages/public/HomePage'));
const JobsPage = lazy(() => import('@/pages/public/JobsPage'));
const JobDetailsPage = lazy(() => import('./pages/public/JobDetailsPage'));
const CompaniesPage = lazy(() => import('./pages/public/CompaniesPage'));
const CompanyDetailsPage = lazy(() => import('./pages/public/CompanyDetailsPage'));
const LoginPage = lazy(() => import('./pages/auth/LoginPage'));
const RegisterPage = lazy(() => import('./pages/auth/RegisterPage'));

const SeekerDashboardPage = lazy(() => import('./pages/seeker/DashboardPage'));
const SeekerMessagesPage = lazy(() => import('./pages/seeker/MessagesPage'));
const SeekerProfilePage = lazy(() => import('@/pages/seeker/ProfilePage'));
const JobSeekerApplications = lazy(() => import('./pages/seeker/AppliedApplicationPage'));
const ApplicationSuccess = lazy(() => import('./pages/seeker/ApplicationSuccess'));

const EmployerDashboardPage = lazy(() => import('./pages/employer/DashboardPage'));
const EmployerJobsPage = lazy(() => import('./pages/employer/JobsPage'));
const EmployerJobDetailsPage = lazy(() => import('./pages/employer/JobDetailsPage'));
const EmployerApplicationsPage = lazy(() => import('./pages/employer/Applications'));
const EmployerProfilePage = lazy(() => import('./pages/employer/CompanyProfile'));

const AdminDashboardPage = lazy(() => import('./pages/admin/DashboardPage'));

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<MainLayout />}>
              <Route index element={<HomePage />} />
              <Route path="jobs" element={<JobsPage />} />
              <Route path="jobs/:id" element={<JobDetailsPage />} />
              <Route path="companies" element={<CompaniesPage />} />
              <Route path="companies/:id" element={<CompanyDetailsPage />} />
              <Route path="login" element={<LoginPage />} />
              <Route path="register" element={<RegisterPage />} />
            </Route>

            {/* Job Seeker Routes */}
            <Route path="/seeker" element={<DashboardLayout role="seeker" />}>
              <Route index element={<Navigate to="/seeker/dashboard" replace />} />
              <Route path="dashboard" element={<SeekerDashboardPage />} />
              <Route path="applications" element={<JobSeekerApplications />} />
              <Route path="profile" element={<SeekerProfilePage />} />
              <Route path="messages" element={<SeekerMessagesPage />} />
              <Route path="companies" element={<CompaniesPage />} />
              <Route path="companies/:id" element={<CompanyDetailsPage />} />
              <Route path="jobs" element={<JobsPage />} />
              <Route path="jobs/:id" element={<JobDetailsPage />} />
              <Route path="application-success" element={<ApplicationSuccess />} />
            </Route>

            {/* Employer Routes */}
            <Route path="/employer" element={<DashboardLayout role="employer" />}>
              <Route index element={<Navigate to="/employer/dashboard" replace />} />
              <Route path="dashboard" element={<EmployerDashboardPage />} />
              <Route path="jobs" element={<EmployerJobsPage />} />
              <Route path="jobs/:id" element={<EmployerJobDetailsPage />} />
              <Route path="applications" element={<EmployerApplicationsPage />} />
              <Route path="profile" element={<EmployerProfilePage />} />
              <Route path="messages" element={<SeekerMessagesPage />} />
            </Route>

            {/* Admin Routes */}
            <Route path="/admin" element={<DashboardLayout role="admin" />}>
              <Route index element={<Navigate to="/admin/dashboard" replace />} />
              <Route path="dashboard" element={<AdminDashboardPage />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
