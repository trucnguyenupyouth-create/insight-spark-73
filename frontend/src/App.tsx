import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { useAuth } from "./hooks/useAuth";

import LoginPage from "./pages/LoginPage";
import ExamListPage from "./pages/ExamListPage";
import DashboardPage from "./pages/DashboardPage";
import Index from "./pages/Index";

// In local dev (VITE_DEV_BYPASS=true), skip Supabase auth entirely
const DEV_BYPASS = import.meta.env.VITE_DEV_BYPASS === 'true';

function App() {
  const { session, loading } = useAuth();

  // In dev bypass mode: skip loading screen & auth guards
  if (DEV_BYPASS) {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/exams" replace />} />
          <Route path="/exams" element={<ExamListPage />} />
          <Route path="/exams/:id" element={<DashboardPage />} />
          <Route path="/old-demo" element={<Index />} />
        </Routes>
        <Toaster />
      </Router>
    );
  }

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Đang tải...</div>;
  }

  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={!session ? <LoginPage /> : <Navigate to="/exams" replace />} 
        />
        <Route 
          path="/exams" 
          element={session ? <ExamListPage /> : <Navigate to="/" replace />} 
        />
        <Route 
          path="/exams/:id" 
          element={session ? <DashboardPage /> : <Navigate to="/" replace />} 
        />
        <Route path="/old-demo" element={<Index />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
