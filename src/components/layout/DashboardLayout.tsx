import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Briefcase, LayoutDashboard, Users, Settings, FileText, MessageSquare, User, BarChart2 , Building2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { useEffect  } from 'react';
// import { boolean } from 'yup';

interface NavItem {
  label: string;
  icon: React.ReactNode;
  href: string;
}

const roleNavItems: Record<string, NavItem[]> = {
  seeker: [
    { label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" />, href: '/seeker/dashboard' },
    { label: 'Applications', icon: <FileText className="w-4 h-4" />, href: '/seeker/applications' },
    { label: 'Messages', icon: <MessageSquare className="w-4 h-4" />, href: '/seeker/messages' },
    { label: 'Profile', icon: <User className="w-4 h-4" />, href: '/seeker/profile' },
    { label: 'Jobs', icon: <Briefcase className="w-4 h-4" />, href: '/seeker/jobs' },
    { label: 'Companies', icon: <Building2 className="w-4 h-4" />, href: '/seeker/companies' },


  ],
  employer: [
    { label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" />, href: '/employer/dashboard' },
    { label: 'Jobs', icon: <Briefcase className="w-4 h-4" />, href: '/employer/jobs' },
    { label: 'Applications', icon: <FileText className="w-4 h-4" />, href: '/employer/applications' },
    { label: 'Messages', icon: <MessageSquare className="w-4 h-4" />, href: '/employer/messages' },
    { label: 'Profile', icon: <User className="w-4 h-4" />, href: '/employer/profile' },
  ],
  admin: [
    { label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" />, href: '/admin/dashboard' },
    { label: 'Users', icon: <Users className="w-4 h-4" />, href: '/admin/users' },
    { label: 'Jobs', icon: <Briefcase className="w-4 h-4" />, href: '/admin/jobs' },
    { label: 'Reports', icon: <BarChart2 className="w-4 h-4" />, href: '/admin/reports' },
    { label: 'Settings', icon: <Settings className="w-4 h-4" />, href: '/admin/settings' },
  ],
};

interface DashboardLayoutProps {
  role: 'seeker' | 'employer' | 'admin';
}

export function DashboardLayout({ role }: DashboardLayoutProps) {
  const location = useLocation();
  const navigate = useNavigate()
  const navItems = roleNavItems[role];
  const SignOut = ()=>{
    if (role == "seeker"){
      localStorage.removeItem("Stoken")
      
    }else if(role == "employer"){
      localStorage.removeItem("Etoken")
    }else{
      localStorage.removeItem("token")
    }
    navigate("/")
    }

    useEffect(() => {
      let token; 
      if (role === "seeker") {
        token = localStorage.getItem("Stoken");
      } else if (role === "employer") {
        token = localStorage.getItem("Etoken");
      } else {
        token = localStorage.getItem("token");
      }
    
      if (!token) {
        navigate('/login');
      }
    }, [role, navigate]);

  return (
     <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center w-11/12 mx-auto">
          <Link to="/" className="flex items-center space-x-2">
            <Briefcase className="h-6 w-6 text-emerald-600" />
            <span className="font-bold text-xl">JobBoard</span>
          </Link>

          <div className="ml-auto flex items-center space-x-4">
            <ThemeToggle />
            <Button variant="outline" size="sm" onClick={SignOut}>
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 border-r min-h-[calc(100vh-4rem)] p-4 hidden md:block">
          <nav className="space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  'flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                  location.pathname === item.href
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-muted'
                )}
              >
                {item.icon}
                <span className="hidden md:inline">{item.label}</span> {/* Hide label on smaller screens */}
              </Link>
            ))}
          </nav>
        </aside>

        {/* For small screens - mobile icons */}
        <aside className="w-full fixed bottom-0 left-0 bg-background border-t md:hidden">
          <nav className="flex justify-around p-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  'flex flex-col items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                  location.pathname === item.href
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-muted'
                )}
              >
                {item.icon}
              </Link>
            ))}
          </nav>
        </aside>

        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}