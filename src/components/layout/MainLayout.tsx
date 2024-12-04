import { Briefcase } from 'lucide-react';
import { Link, Outlet } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme/ThemeToggle';

export function MainLayout() {
  return (
    <div className="min-h-screen bg-background">
  <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-300">
    <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
      
      {/* Logo and Branding */}
      <Link to="/" className="flex items-center space-x-2">
        <Briefcase className="h-6 w-6 text-emerald-600 transition-transform duration-300 transform hover:scale-110" />
        <span className="font-bold text-xl transition-all duration-300 hover:text-emerald-600">
          JobBoard
        </span>
      </Link>

      {/* Navigation - Hidden on mobile, visible on medium and larger screens */}
      <nav className="hidden md:flex items-center space-x-6 ml-6">
        <Link to="/jobs" className="text-sm font-medium hover:text-emerald-600 transition-colors duration-300">
          Find Jobs
        </Link>
        <Link to="/companies" className="text-sm font-medium hover:text-emerald-600 transition-colors duration-300">
          Companies
        </Link>
      </nav>

      {/* Right section with buttons */}
      <div className="ml-auto flex items-center space-x-4">
        <ThemeToggle />
        <Button variant="outline" asChild>
          <Link to="/login" className="hover:scale-105 transition-transform duration-300">Sign In</Link>
        </Button>
        <Button asChild>
          <Link to="/register" className="hover:scale-105 transition-transform duration-300">Sign Up</Link>
        </Button>
      </div>
      
      {/* Mobile navigation icon (hamburger) - visible only on small screens */}
      <div className="md:hidden ml-auto">
        <button className="text-emerald-600 hover:text-emerald-800 transition-colors">
          {/* Replace this with your mobile menu icon */}
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </div>

    </div>
  </header>

  {/* Main content centered on the screen */}
  <main className="flex justify-center items-center min-h-screen">
    {/* <div className="max-w-2xl w-full px-4 sm:px-6 lg:px-8"> */}
      <Outlet />
    {/* </div> */}
  </main>

  <footer className="border-t py-8 bg-background">
    <div className="container flex flex-col md:flex-row justify-between items-center">
      <div className="flex items-center space-x-2">
        <Briefcase className="h-5 w-5 text-emerald-600" />
        <span className="font-semibold">JobBoard</span>
      </div>
      <div className="mt-4 md:mt-0">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} JobBoard. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
</div>

  );
}