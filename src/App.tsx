import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Layout from "./components/layout";
import LandingPage from "./landing page";
import SignInPage from "./components/auth/Sign-in";
import Dashboard from "./components/Dashboard";
import ApplicationTracker from "./pages/Application-Tracker";
import PrepTracker from "./pages/Prep-Tracker";
import { ColdApproachForm } from "./components/ColdApproachForm";
import ColdOutReach from "./pages/Cold-Outreaches";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="system" enableSystem>

      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/login" element={<SignInPage/>} />
            <Route path="/" element={<LandingPage/>} />
            <Route path="/dashboard" element={<Dashboard/>} />
            <Route path="/application-tracker" element={<ApplicationTracker/>} />
            <Route path="/prep-tracker" element={<PrepTracker/>} />
            <Route path="/cold-outreaches" element={<ColdOutReach/>} />
          </Routes>
        </Layout>
        </BrowserRouter>
      </TooltipProvider>

    </ThemeProvider>
  </QueryClientProvider>
);

export default App;