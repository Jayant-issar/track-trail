import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Home, Droplet, Hospital, Menu, HeartPulse, Ambulance, HeartIcon, TrainTrack, Target, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth, UserButton, useUser, } from "@clerk/clerk-react";
import { onBoardingMiddleware } from "@/middlewares/globalMiddleware";
import UpgradeCard from "./ui/sidebar/upgrade-ai";
import { ROUTE_PATHS, PROTECTED_ROUTES, PUBLIC_ROUTES } from '@/config/routes';

interface NavItem {
  icon: React.ElementType;
  label: string;
  path: string;
}

const navItems: NavItem[] = [
  { icon: Home, label: "Dashboard", path: "/dashboard" },
  { icon: TrainTrack, label: "Application Tracker", path: "/application-tracker" },
  {icon: MessageCircle, label: "Cold Outreaches", path: "/cold-outreaches"},
  {icon: HeartIcon, label: "Prep Tracker", path: "/prep-tracker"},
  
];

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const { user } = useUser();
  const location = useLocation();
  const { getToken } = useAuth();
  
  const isValidRoute = 
    Object.values(ROUTE_PATHS).some(path => {
      // Handle dynamic routes with parameters
      if (path.includes(':')) {
        const basePath = path.split('/:')[0];
        return location.pathname.startsWith(basePath);
      }
      return location.pathname === path;
    }) || 
    location.pathname.startsWith('/prep-tracker/detailed/');

  const isProtectedRoute = PROTECTED_ROUTES.some(route => {
    if (route.includes(':')) {
      const baseRoute = route.split('/:')[0];
      return location.pathname.startsWith(baseRoute);
    }
    return location.pathname === route;
  });

  const isPublicRoute = PUBLIC_ROUTES.includes(location.pathname as any);
  const shouldShowSidebar = PROTECTED_ROUTES.includes(location.pathname as any);

  useEffect(() => {

    
    const checkAuth = async () => {
      const token = await getToken();
      console.log(token);
      
      // Redirect to home if route doesn't exist
      if (!isValidRoute) {
        navigate(ROUTE_PATHS.LANDING);
        return;
      }

      // Redirect logic for protected routes
      if (isProtectedRoute && !token) {
        navigate(ROUTE_PATHS.LOGIN);
        return;
      }

      // Redirect away from auth pages if logged in
      if (isPublicRoute && token && location.pathname !== ROUTE_PATHS.LANDING) {
        navigate(ROUTE_PATHS.DASHBOARD);
      }

      const Onboarding = await onBoardingMiddleware(user.id,user.fullName,user.primaryEmailAddress.emailAddress)
      if(!Onboarding) {
        alert("There was an error while updating you please try again later")
        navigate(ROUTE_PATHS.LANDING)
        return
      }
    };

    checkAuth();
  }, [location.pathname, getToken, navigate, isValidRoute, isProtectedRoute, isPublicRoute]);

  if (location.pathname === ROUTE_PATHS.LANDING) {
    return <div className="min-h-screen bg-medical-light">{children}</div>;
  }
      
  return (
    <div className="min-h-screen bg-medical-light ">
      {isProtectedRoute && (
        <Button
          variant="ghost"
          size="icon"
          className="fixed top-4 left-4 z-50 md:hidden"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <Menu className="h-6 w-6" />
        </Button>
      )}

      <div className="flex h-full">
        {isProtectedRoute && (
          <>
            <div 
              className={cn(
                "fixed md:relative",
                "inset-y-0 left-0",
                "w-64",
                "transform transition-transform duration-300 ease-in-out",
                "md:transform-none",
                "z-40",
                isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
              )}
            >
              <SideBar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
            </div>

            {isSidebarOpen && (
              <div
                className="fixed inset-0 bg-black/20 z-30 md:hidden"
                onClick={() => setIsSidebarOpen(false)}
              />
            )}
          </>
        )}

        <main className={cn(
          "flex-1 w-full",
          
          ""
        )}>
          {children}
        </main>
      </div>
    </div>
  );
};

interface SidebarProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
}

const SideBar = ({ isSidebarOpen, setIsSidebarOpen }: SidebarProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  return (
    <div
      className={cn(
        " flex flex-col justify-between pb-2  fixed inset-y-0 left-0 z-40 w-64 bg-[#1c1f2e] border-r border-purple-500/20 shadow-lg transform transition-transform duration-300 ease-in-out sm:translate-x-0",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}
    >
      <div className="py-8 px-2 flex flex-col items-center">
        <a href="/" className="flex items-center justify-center gap-2 mb-8">
          <Target className="w-8 h-8 text-[#b666d2]" />
          <h1 className="text-2xl font-bold bg-gradient-to-r from-[#b666d2] to-[#e052a0] bg-clip-text text-transparent">
            Track-Trail
          </h1>
        </a>
        
        <nav className="space-y-2 w-full flex flex-col items-center justify-center">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname.includes(item.path);
            
            return (
              <button
                key={item.path}
                onClick={() => {
                  navigate(item.path);
                  setIsSidebarOpen(false);
                }}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-left transition-all duration-200",
                  "hover:bg-[#151823] group border border-transparent",
                  isActive 
                    ? "bg-gradient-to-r from-[#b666d2]/10 to-[#e052a0]/10 border-purple-500/20 text-white" 
                    : "text-gray-400"
                )}
              >
                <Icon className={cn(
                  "w-5 h-5 transition-colors duration-200",
                  isActive ? "text-[#b666d2]" : "text-gray-400",
                  "group-hover:text-[#b666d2]"
                )} />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
          <div className="w-full border-t border-purple-500/20 my-4"></div>
          <div className={cn(
            "w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-left transition-all duration-200",
            "hover:bg-[#151823] group mt-4",
            "border border-transparent hover:border-purple-500/20"
          )}>
            <p className=" text-gray-400">Your Profile</p>
            <UserButton
            /> 
          </div>
        </nav>
      </div>
      <div className=" px-4">
        <UpgradeCard/>
      </div>
      
    </div>
  );
};

export default Layout;