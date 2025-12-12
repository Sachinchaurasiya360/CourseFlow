import axios from "axios";
import { useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handlesubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // try {
    //   const res = await axios.post(`${process.env.baseurl}`, {
    //     email,
    //     firstName,
    //     lastName,
    //     password,
    //     role,
    //   });
    //   setTimeout(() => {
    //     navigate("/login");
    //   }, 2000);
    // } catch (error) {
    //   setError(error.response?.data?.message || "Something went wrong");
    // } finally {
    //   setLoading(false);
    // }
  };

  return (
    <>
      <Navbar />

      <div className="bg-gray-50 min-h-screen flex justify-center items-center py-12">
        <form onSubmit={handlesubmit} className="w-full max-w-md">
          <div className="bg-white shadow-lg p-8 rounded-2xl border-2 border-gray-200">
            {error && (
              <p className="text-red-500 bg-red-500/10 p-3 rounded-lg mb-4 text-center">
                {error}
              </p>
            )}
            <h1 className="text-4xl font-bold text-black text-center mb-2">
              Create Your Account
            </h1>
            <p className="text-center text-gray-600 mb-6">
              Join thousands of learners today
            </p>

            <label className="block text-black font-semibold mb-2">Email</label>
            <input
              type="text"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-gray-50 text-black border-2 border-gray-300 rounded-lg p-3 mb-4 focus:border-black focus:outline-none transition-colors placeholder-gray-500"
            />

            <label className="block text-black font-semibold mb-2">
              First Name
            </label>
            <input
              type="text"
              placeholder="Enter your first name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full bg-gray-50 text-black border-2 border-gray-300 rounded-lg p-3 mb-4 focus:border-black focus:outline-none transition-colors placeholder-gray-500"
            />

            <label className="block text-black font-semibold mb-2">
              Last Name
            </label>
            <input
              type="text"
              placeholder="Enter your last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full bg-gray-50 text-black border-2 border-gray-300 rounded-lg p-3 mb-4 focus:border-black focus:outline-none transition-colors placeholder-gray-500"
            />

            <label
              htmlFor="password"
              className="block text-black font-semibold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-gray-50 text-black border-2 border-gray-300 rounded-lg p-3 mb-4 focus:border-black focus:outline-none transition-colors placeholder-gray-500"
            />

            <label
              htmlFor="role"
              className="block text-black font-semibold mb-2"
            >
              Role
            </label>
            <select
              id="role"
              className="w-full bg-gray-50 text-black border-2 border-gray-300 rounded-lg p-3 mb-6 focus:border-black focus:outline-none transition-colors"
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="">--Select Role--</option>
              <option value="student">Student</option>
              <option value="admin">Admin</option>
            </select>

            <button
              className="w-full bg-black text-white font-bold p-4 rounded-full hover:bg-gray-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              type="submit"
              disabled={loading}
            >
              {loading ? "Creating Account..." : "Sign Up"}
            </button>

            <div className="text-center mt-6 text-gray-600">
              Already have an account?{" "}
              <span
                className="text-black hover:underline cursor-pointer font-semibold"
                onClick={() => navigate("/login")}
              >
                Login Now
              </span>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
