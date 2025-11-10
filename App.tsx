
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
import NotFound from "@/pages/NotFound";
import Auth from "@/components/Auth";
import Profile from "@/pages/Profile";
import SIGEAAssistant from "@/pages/SIGEAAssistant";

const queryClient = new QueryClient();

const AppContent = () => {
  const { user, loading } = useAuth();
  const isAuthenticated = !!user;

  if (loading) {
    return <div className="flex h-screen w-screen items-center justify-center" />;
  }

  if (!isAuthenticated) {
    return (
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  return (
    <Routes>
      {/* A rota principal agora aguarda o redirecionamento do useAuth */}
      <Route path="/" element={<div className="flex h-screen w-screen items-center justify-center" />} />
      <Route path="/student/*" element={<StudentPortal />} />
      <Route path="/admin/*" element={<AdminDashboard />} />
      <Route path="/teacher/*" element={<TeacherDashboard />} />
      <Route path="/kitchen/*" element={<KitchenDashboard />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/sigea-assistant" element={<SIGEAAssistant />} />
      {/* Redireciona usuários logados que tentam acessar /login ou /auth */}
      <Route path="/auth" element={<Navigate to="/" replace />} />
      <Route path="/login" element={<Navigate to="/" replace />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <TooltipProvider>
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
        <Toaster />
        <Sonner />
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
