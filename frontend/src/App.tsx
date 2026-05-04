import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { useAuth } from "./hooks/useAuth";

import LoginPage from "./pages/LoginPage";
import ExamListPage from "./pages/ExamListPage";
import DashboardPage from "./pages/DashboardPage";
import Index from "./pages/Index"; // fallback for old route if needed

function App() {
  const { session, loading } = useAuth();

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
        <Route 
          path="/old-demo" 
          element={<Index />} 
        />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
