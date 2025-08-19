import { FaSearch } from "react-icons/fa";
import {useNavigate} from 'react-router-dom'
export default function Navbar() {
  const navigate =useNavigate()
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
      <input
        type="text"
        placeholder="Search Courses..."
        className="bg-white p-1.5 pl-2 pr-18 rounded-2xl shadow-md mr-18 ml-18"
      />

      <div className="flex justify-around space-x-4">
        <button className=" block bg-secondary p-1 pl-3 pr-3 rounded-xl text-l font-semibold hover:bg-transparent  text-gray-50"
        onClick={()=>{
          navigate('/login')
        }}>
          Login
        </button>
        <button className="flex mr-2 p-1 pl-3 pr-3 rounded-xl bg-third text-l  font-semibold hover:bg-transparent" 
        onClick={()=>{
          navigate('/signup')
        }}>
          Register
        </button>
      </div>
    </div>
  );
}
