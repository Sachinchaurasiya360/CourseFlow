import Login from "../pages/Loginpage";
import Dashboard from "../pages/Dashboard";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Signup from "../pages/Signup";
import AdminDashboard from "../pages/AdminDashboard";
import AdminAddCourses from "../pages/AdminAddCourses";
import ProtectedRoute from "./context/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import LandingPage from "../pages/LandingPage";
import AboutUs from "../pages/AboutUs";
import AboutCourses from "../pages/AboutCourses";
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/aboutcourses/:courseId" element={<AboutCourses />} />

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
          <Route path="/aboutus:" element={<AboutUs />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
