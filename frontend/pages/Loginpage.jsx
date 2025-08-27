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

  const handlesubmit = async (e) => {
    console.log("hello1");
    e.preventDefault();
    if (!email || !password) {
      seterror("Email and password is required");
      return;
    }

    try {
      setLoading(true);
      seterror("");
      console.log("Attempting login...");
      const response = await axios.post(
        "http://localhost:3000/login",
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
          <div className="bg-primary1 shadow-2xl rounded-2xl p-10 min-w-130 min-h-110">
            {error && <p className="text-red-500 text-center mt-2">{error}</p>}

            <h2 className=" text-2xl flex justify-center  pt-10 font-bold">
              Login to your account
            </h2>
            <label className="block pt-2 pb-2 font-semibold"> Email </label>
            <input
              type="text"
              value={email}
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              className="border-1 rounded-md min-w-full mt-1 p-3 mr-2"
            />
            <label className="block pt-4 pb-2 font-semibold"> Password</label>
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
              Don't have an account?{" "}
              <span className=" underline" onClick={() => navigate("/Signup")}>
                Register now
              </span>
            </h3>
          </div>
        </form>
      </div>
    </>
  );
}
