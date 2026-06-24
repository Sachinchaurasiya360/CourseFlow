import { BrowserRouter, Routes, Route } from "react-router";
import { Toaster } from "sonner";
import LandingPage from "./module/LandingPage/LandingPage";
import LoginPage from "./module/Authentication/LoginPage";
import SignupPage from "./module/Authentication/SignupPage";

function App() {
  return (
    <BrowserRouter>
      {/* Mounts the toast portal once for the whole app so toast.success/error work. */}
      <Toaster position="top-center" richColors />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
