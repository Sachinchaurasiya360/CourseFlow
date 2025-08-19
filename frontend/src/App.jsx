import Login from "../pages/Loginpage";
import Dashboard from "../pages/Dashboard";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Signup from "../pages/Signup";
import AdminDashboard from "../pages/AdminDashboard";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admindashboard" element={<AdminDashboard/>}/>
        <Route path="/Dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
