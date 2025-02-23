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
import ColdOutReach from "./pages/Cold-Outreaches";
import DetailedMetricPage from "./components/preparation-metrics/detailed-metric-page";
import { ROUTE_PATHS } from '@/config/routes';

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
            <Route path={ROUTE_PATHS.LOGIN} element={<SignInPage/>} />
            <Route path={ROUTE_PATHS.LANDING} element={<LandingPage/>} />
            <Route path={ROUTE_PATHS.DASHBOARD} element={<Dashboard/>} />
            <Route path={ROUTE_PATHS.APPLICATION_TRACKER} element={<ApplicationTracker/>} />
            <Route path={ROUTE_PATHS.PREP_TRACKER} element={<PrepTracker/>} />
            <Route path={ROUTE_PATHS.PREP_DETAILED} element={<DetailedMetricPage/>} />
            <Route path={ROUTE_PATHS.COLD_OUTREACHES} element={<ColdOutReach/>} />
          </Routes>
        </Layout>
        </BrowserRouter>
      </TooltipProvider>

    </ThemeProvider>
  </QueryClientProvider>
);

export default App;