# JobBoard Frontend

## Overview
JobBoard Frontend is a web application designed for job seekers, employers, and admins. It provides a platform where users can browse jobs, apply, and manage their profiles. The application is built using React.js with various UI components from Radix UI, along with additional features like dark mode support using Next-Themes, data fetching with React Query, and authentication with JWT tokens.

## Features
- **Role-Based Dashboard**: Separate dashboards for seekers, employers, and admins.
- **Job Listings**: Browse, filter, and view job details.
- **Applications Management**: View and manage job applications.
- **Messaging System**: Direct messaging between seekers and employers.
- **User Profiles**: Update personal details, manage profile information.
- **Admin Controls**: Manage users, jobs, and reports.
- **Theming**: Dark mode support using `next-themes`.
- **Authentication**: JWT token handling for secure access.

## Technologies Used
- **Frontend**: React.js, Vite, Tailwind CSS, Radix UI, React Query, Sonner (for notifications), Lucide React (for icons)
- **State Management**: `react-query` for server state, `useContext` for local state.
- **Styling**: Tailwind CSS, Tailwind Merge, Tailwind CSS Animation
- **Routing**: React Router DOM v6
- **Themability**: Next-Themes for light/dark mode switching
- **API Requests**: Axios
- **Form Management**: React Hook Form with Zod validation
- **Utility Libraries**: clsx, Date-fns for date manipulations