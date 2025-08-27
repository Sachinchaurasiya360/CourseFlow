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

    try {
      const res = await axios.post("http://localhost:3000/signup", {
        email,
        firstName,
        lastName,
        password,
        role,
      });
      navigate("/login");
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="bg-primary min-h-screen flex justify-center items-center">
        <form onSubmit={handlesubmit}>
          <div className="bg-primary1 min-h-120 min-w-90 shadow-xl p-6 mt-4 rounded-2xl">
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <h1 className="flex justify-center text-2xl font-bold ">
              Create your account
            </h1>

            <label className="block font-semibold"> Email</label>
            <input
              type="text"
              placeholder="Enter your full email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-1 rounded-md min-w-full p-1 mt-1 "
            />
            <label className="block mt-2 font-semibold">FirstName</label>
            <input
              type="text"
              placeholder="Enter your first name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="border-1 rounded-md min-w-full p-1 mt-1"
            />
            <label className="block mt-2 font-semibold "> Last Name</label>
            <input
              type="text"
              placeholder="Enter your last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="border-1 rounded-md min-w-full p-1"
            />
            <label htmlFor="password" className="block mt-2 font-semibold">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border-1 rounded-md min-w-full p-1 mt-1"
            />
            <label htmlFor="role" className="block mt-2 font-semibold">
              Role
            </label>
            <select
              name=""
              id="role"
              className="border-1 rounded-md min-w-full p-1 mt-1"
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="">--Select--</option>
              <option value="student">Student</option>
              <option value="admin">Admin</option>
            </select>
            <button
              className="flex justify-center bg-secondary min-w-full mt-5 p-1 rounded-2xl"
              type="submit"
            >
              Signup
            </button>
            <h3 className="flex justify-center mt-3">
              Already have an account?
              <span className="underline hover:cursor-pointer">
             
                Login Now
              </span>
            </h3>
          </div>
        </form>
      </div>
    </>
  );
}
