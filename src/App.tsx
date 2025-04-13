
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import CampaignDetails from "./pages/CampaignDetails";
import CampaignEdit from "./pages/CampaignEdit";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import Landing from "./pages/Landing";
import CalendarView from "./pages/CalendarView";
import Analytics from "./pages/Analytics";
import Campaigns from "./pages/Campaigns";
import Team from "./pages/Team";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Page d'accueil */}
          <Route path="/landing" element={<Landing />} />
          
          {/* Pages principales */}
          <Route path="/" element={<Dashboard />} />
          <Route path="/calendar" element={<CalendarView />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/campaigns" element={<Campaigns />} />
          <Route path="/team" element={<Team />} />
          
          {/* Pages de campagnes */}
          <Route path="/campaign/:id" element={<CampaignDetails />} />
          <Route path="/campaign/:id/edit" element={<CampaignEdit />} />
          
          {/* Pages de compte */}
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings/*" element={<Settings />} />
          
          {/* Page 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
