import Login from "../pages/Loginpage";
import Dashboard from "../pages/Dashboard";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Signup from "../pages/Signup";
import AdminDashboard from "../pages/AdminDashboard";
import AdminAddCourses from "../pages/AdminAddCourses";
import ProtectedRoute from "./context/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import LandingPage from "../pages/LandingPage";
function App() {
  return (
    <BrowserRouter>
            <AuthProvider>

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
          <Route
            path="/admindashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/addcourses" element={<AdminAddCourses />} />
      </Routes>
              </AuthProvider>

    </BrowserRouter>
  );
}

export default App;
