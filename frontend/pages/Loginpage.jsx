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
      <div className="bg-primary flex justify-center items-center min-h-screen">
        <form action="" onSubmit={handlesubmit}>
          <div className="bg-primary1 shadow-2xl rounded-2xl p-10 min-w-110 min-h-110">
            {error && <p className="text-red-500 text-center mt-2">{error}</p>}

            <h2 className=" text-3xl flex justify-center font-bold">
              Welcome Back{" "}
            </h2>
            <p className="flex justify-center content-center pt-2 text-gray-700">
              Login to continue your learning journey
            </p>
            <label className="block pt-2 pb- font-semibold">
              {" "}
              Email Address{" "}
            </label>
            <input
              type="text"
              value={email}
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              className="border-1 rounded-lg min-w-full mt-1 p-3 mr-2"
            />
            <div className="flex justify-between">
              <label className="block pt-4 font-semibold "> Password</label>
              <label className="block pt-4 text-secondary font-semibold hover:cursor-pointer ">
                Forgot password?
              </label>
            </div>

            <input
              type="password"
              value={password}
              placeholder="********"
              onChange={(e) => setpassword(e.target.value)}
              className="border-1 rounded-lg min-w-full mt-1 p-3 mr-2"
            />
            <button
              className="flex justify-center min-w-full bg-secondary p-4 mt-7 rounded-2xl min-h-full"
              type="submit"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
            <h3 className="flex justify-center mt-4">Forgot password ?</h3>
            <h3 className=" flex justify-center mt-2">
              Don't have an account? {" "}
              <span
                className="hover:cursor-pointer text-secondary"
                onClick={() => navigate("/Signup")}
              >
              Register now
              </span>
            </h3>
          </div>
        </form>
      </div>
    </>
  );
}
