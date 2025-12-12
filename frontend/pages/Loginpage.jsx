import axios from "axios";
import Navbar from "../components/Navbar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../src/context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, seterror] = useState("");
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const handlesubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      seterror("Email and password is required");
      return;
    }

    try {
      setLoading(true);
      seterror("");
      const response = await axios.post(
        `${BASE_URL}/api/v1/auth/login`,
        {
          email,
          password,
        },
        { withCredentials: true }
      );

      if (response?.data?.user) {
        setUser(response.data.user);

        if (response.data.user.role === "admin") {
          navigate("/admindashboard");
        } else {
          navigate("/dashboard");
        }
      }
    } catch (error) {
      console.error("Login error:", error);
      if (error.response?.data?.message) {
        seterror(error.response.data.message);
      } else {
        seterror("Something went wrong try again later");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="bg-gray-50 flex justify-center items-center min-h-screen">
        <form action="" onSubmit={handlesubmit} className="w-full max-w-md">
          <div className="bg-white shadow-lg rounded-2xl p-10 border-2 border-gray-200">
            {error && (
              <p className="text-red-500 text-center mb-4 bg-red-500/10 p-3 rounded-lg">
                {error}
              </p>
            )}

            <h2 className="text-4xl text-center font-bold text-black mb-2">
              Welcome Back
            </h2>
            <p className="text-center text-gray-600 mb-8">
              Login to continue your learning journey
            </p>

            <label className="block text-black font-semibold mb-2">
              Email Address
            </label>
            <input
              type="text"
              value={email}
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-gray-50 text-black border-2 border-gray-300 rounded-lg p-3 mb-4 focus:border-black focus:outline-none transition-colors placeholder-gray-500"
            />

            <div className="flex justify-between items-center mb-2">
              <label className="text-black font-semibold">Password</label>
              <label className="text-gray-600 hover:text-black cursor-pointer text-sm transition-colors">
                Forgot password?
              </label>
            </div>
            <input
              type="password"
              value={password}
              placeholder="Enter your password"
              onChange={(e) => setpassword(e.target.value)}
              className="w-full bg-gray-50 text-black border-2 border-gray-300 rounded-lg p-3 mb-6 focus:border-black focus:outline-none transition-colors placeholder-gray-500"
            />

            <button
              className="w-full bg-black text-white font-bold p-4 rounded-full hover:bg-gray-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              type="submit"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            <div className="text-center mt-6 text-gray-600">
              Don't have an account?{" "}
              <span
                className="text-black hover:underline cursor-pointer font-semibold"
                onClick={() => navigate("/Signup")}
              >
                Register now
              </span>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
