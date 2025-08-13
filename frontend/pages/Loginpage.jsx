import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, seterror] = useState("");

  const handlesubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      seterror("Email and password is required");
      return;
    }

    try {
      setLoading(true);
      seterror(" ");
      const response = await axios.post(
        "http://localhost:3000/student/login",
        // `${import.meta.env.baseurl}/student/login`,
        {
          email,
          password,
          role: "student",
        },
        { withCredentials: true }
      );

      navigate("/dashboard");
    } catch (error) {
      if (error) {
        seterror(error.response.data?.message);
      } else seterror("Something went wrong try again leter");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-primary flex justify-center items-center min-h-screen">
      <form action="" onSubmit={handlesubmit}>
        <div className="bg-primary1 shadow-2xl rounded-2xl p-4  min-w-90 min-h-100">
          {error && <p className="text-red-500 text-center mt-2">{error}</p>}

          <h2 className=" text-2xl flex justify-center  pt-10 font-bold">
            Login to your account
          </h2>
          <label className="block pt-6 font-semibold"> Email </label>
          <input
            type="text"
            value={email}
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
            className="border-1 rounded-md min-w-full mt-1 p-1 ml-2 mr-2"
          />
          <label className="block pt-3 font-semibold"> Password</label>
          <input
            type="password"
            value={password}
            placeholder="********"
            onChange={(e) => setpassword(e.target.value)}
            className="border-1 rounded-lg min-w-full mt-1 p-1 ml-2 mr-2"
          />
          <button
            className="flex justify-center min-w-full bg-secondary p-1 mt-3 rounded-2xl min-h-full"
            type="submit"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
          <h3 className="flex justify-center mt-4">Forgot password ?</h3>
          <h3 className=" flex justify-center mt-2">
            Don't have an account?{" "}
            <span className=" underline" onClick={() => navigate("/Signup")}>
              Register now
            </span>
            {}
          </h3>
        </div>
      </form>
    </div>
  );
}
