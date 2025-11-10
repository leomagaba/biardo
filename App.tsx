import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import Login from "@/components/Login";
import AdminDashboard from "@/pages/AdminDashboard";
import StudentPortal from "@/pages/StudentPortal";
import TeacherDashboard from "@/pages/TeacherDashboard";
import KitchenDashboard from "@/pages/KitchenDashboard";
import NotFound from "./pages/NotFound";
import Auth from "@/components/Auth";
import Profile from "@/pages/Profile";
import SIGEAAssistant from "@/pages/SIGEAAssistant";

const queryClient = new QueryClient();

const AppContent = () => {
  const { isAuthenticated, user, loading } = useAuth();

  if (loading) {
    return null; // Initial splash handled by pages
  }

  if (!isAuthenticated) {
    return (
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="*" element={<Login />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/" element={
        user?.role === 'admin' ? <AdminDashboard /> :
        user?.role === 'teacher' ? <TeacherDashboard /> :
        user?.role === 'kitchen' ? <KitchenDashboard /> :
        <StudentPortal />
      } />
      <Route path="/auth" element={<Navigate to="/" replace />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/sigea-assistant" element={<SIGEAAssistant />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/teacher" element={<TeacherDashboard />} />
      <Route path="/student" element={<StudentPortal />} />
      <Route path="/kitchen" element={<KitchenDashboard />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
