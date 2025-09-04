import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
export default function Navbar() {
  const navigate = useNavigate();
  return (
    <div className="flex -space-x-1 max-w-full bg-primary list-none items-center p-3 shadow-l">
      <h1 className="font-semibold text-3xl mr-18 ml-10 ">CourseFlow</h1>

      <div className=" flex space-x-8 mr-10 font-semibold text-md">
        <li>Home</li>
        <li>Courses</li>
        <li>Categories</li>
        <li>About Us</li>
        <li>Contact</li>
      </div>

      <div></div>
      {/* <label htmlFor=""><Search /></label> */}
      <input
        type="text"
        placeholder="Search Courses..."
        className="bg-white p-2 pl-2 pr-30 rounded-2xl  mr-1 ml-8 border-gray-500 border-1 shadow-2xs"
      />

      <div className="flex justify-around space-x-10 ml-30">
        <button
          className=" block bg-secondary p-2 pl-6 pr-6 rounded-xl text-l font-semibold hover:text-gray-50 cursor-pointer"
          onClick={() => {
            navigate("/login");
          }}
        >
          Login
        </button>
        <button
          className="flex mr-2 p-2 pl-6 pr-6 rounded-xl bg-third text-l  font-semibold hover:cursor-pointer "
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
