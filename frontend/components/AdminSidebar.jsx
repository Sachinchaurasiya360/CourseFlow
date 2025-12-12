import { useNavigate } from "react-router-dom";
export default function AdminDashboard() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen w-64 bg-white border-r border-gray-200 text-black shadow-sm">
      <ul className="space-y-2 p-5 font-semibold">
        <li
          className="hover:bg-black hover:text-white cursor-pointer rounded-lg px-4 py-3 transition-all duration-300"
          onClick={() => {
            navigate("/admindashboard");
          }}
        >
          Dashboard
        </li>
        <li
          className="hover:bg-black hover:text-white cursor-pointer rounded-lg px-4 py-3 transition-all duration-300"
          onClick={() => {
            navigate("/addcourses");
          }}
        >
          Course
        </li>
        <li className="hover:bg-black hover:text-white cursor-pointer rounded-lg px-4 py-3 transition-all duration-300">
          Users
        </li>
        <li className="hover:bg-black hover:text-white cursor-pointer rounded-lg px-4 py-3 transition-all duration-300">
          Reports
        </li>
        <li className="hover:bg-black hover:text-white cursor-pointer rounded-lg px-4 py-3 transition-all duration-300">
          Settings
        </li>
      </ul>
    </div>
  );
}
