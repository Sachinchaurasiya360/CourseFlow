import { BrowserRouter, Routes, Route } from "react-router";
import { Toaster } from "sonner";
import LandingPage from "./module/LandingPage/LandingPage";
import LoginPage from "./module/Authentication/LoginPage";
import SignupPage from "./module/Authentication/SignupPage";
import StudentDashboard from "./module/Student/StudentDashboard";
import AdminDashboard from "./module/Admin/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
function App() {
  return (
    <BrowserRouter>
      {/* Mounts the toast portal once for the whole app so toast.success/error work. */}
      <Toaster position="top-center" richColors />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <StudentDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admindashboard"
          element={
            <ProtectedRoute requiredRole="ADMIN">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
