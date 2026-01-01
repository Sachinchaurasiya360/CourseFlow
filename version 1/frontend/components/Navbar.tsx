import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
export default function Navbar() {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-between bg-white border-b border-gray-200 px-8 py-4 shadow-sm">
      <h1 className="font-bold text-3xl text-black cursor-pointer hover:text-gray-700 transition-colors">
        CourseFlow
      </h1>

      <div className="flex space-x-8 font-semibold text-md">
        <li className="list-none text-gray-700 hover:text-black cursor-pointer transition-colors">
          Home
        </li>
        <li className="list-none text-gray-700 hover:text-black cursor-pointer transition-colors">
          Courses
        </li>
        <li className="list-none text-gray-700 hover:text-black cursor-pointer transition-colors">
          Categories
        </li>
        <li className="list-none text-gray-700 hover:text-black cursor-pointer transition-colors">
          About Us
        </li>
        <li className="list-none text-gray-700 hover:text-black cursor-pointer transition-colors">
          Contact
        </li>
      </div>

      <div className="flex items-center space-x-4">
        <input
          type="text"
          placeholder="Search Courses..."
          className="bg-gray-100 text-black placeholder-gray-500 p-2 px-4 rounded-full border border-gray-300 focus:border-black focus:outline-none transition-colors w-64"
        />

        <button
          className="bg-black text-white px-6 py-2 rounded-full font-semibold hover:bg-gray-800 cursor-pointer transition-all duration-300"
          onClick={() => {
            navigate("/login");
          }}
        >
          Login
        </button>
        <button
          className="bg-transparent border-2 border-black text-black px-6 py-2 rounded-full font-semibold hover:bg-black hover:text-white cursor-pointer transition-all duration-300"
          onClick={() => {
            navigate("/signup");
          }}
        >
          Register
        </button>
      </div>
    </div>
  );
}
