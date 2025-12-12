import Navbar from "../components/Navbar";
import AdminSidebar from "../components/AdminSidebar";
import Buttons from "../components/Buttons";
import Card from "../components/Card";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [courses, setCourse] = useState([]);
  useEffect(() => {
    const fetchcourses = async () => {
      try {
        const response = await axios.get(
          "https://courseflow.up.railway.app/api/v1/course/getcourse",
          {
            withCredentials: true,
          }
        );
        return setCourse(response.data.courses);
      } catch (error) {
        console.error("internal error found", error);
      }
    };
    fetchcourses();
  }, []);
  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="flex">
        <AdminSidebar />
        <div className="flex-1 p-8">
          <h1 className="text-4xl font-bold text-black mb-8">
            Admin Dashboard
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card
              title={"Active Users"}
              description={"Total users on CourseFlow"}
              figures={2485}
            />
            <Card
              title={"Total Sales"}
              description={"Sales in the current month"}
              figures={"$234"}
            />
          </div>

          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-black">Course Management</h2>
            <Buttons
              buttoncontent={"Add Course"}
              onClick={() => {
                navigate("/addcourses");
              }}
            />
          </div>

          <div className="bg-white rounded-2xl border-2 border-gray-200 overflow-hidden shadow-sm">
            <table className="w-full">
              <thead className="bg-gray-50 border-b-2 border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-black font-semibold">
                    Course Title
                  </th>
                  <th className="px-6 py-4 text-left text-black font-semibold">
                    Category
                  </th>
                  <th className="px-6 py-4 text-left text-black font-semibold">
                    Price
                  </th>
                  <th className="px-6 py-4 text-left text-black font-semibold">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody>
                {courses.length > 0 ? (
                  courses.map((course, index) => (
                    <tr
                      key={course._id}
                      className={`border-b border-gray-200 hover:bg-gray-50 transition-colors ${
                        index % 2 === 0 ? "bg-white" : "bg-gray-50"
                      }`}
                    >
                      <td className="px-6 py-4 text-black font-medium">
                        {course.title}
                      </td>
                      <td className="px-6 py-4 text-gray-700">
                        {course.category}
                      </td>
                      <td className="px-6 py-4 text-black font-semibold">
                        ₹{course.price}
                      </td>
                      <td className="px-6 py-4 text-gray-600 max-w-xs truncate">
                        {course.description}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center py-12 text-gray-600">
                      No courses available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
