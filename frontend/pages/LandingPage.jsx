import Navbar from "../components/Navbar";
import Buttons from "../components/Buttons";
import {
  Figma,
  Activity,
  Headphones,
  Wallpaper,
  Camera,
  Play,
  Bug,
} from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import CardForLandingPage from "../components/CardForLandingPage";
import { useNavigate } from "react-router-dom";
const BASE_URL = import.meta.env.VITE_BASE_URL;

export default function LandingPage() {
  const [CourseForLandingPage, setCourseForLandingPage] = useState([]);
  useEffect(() => {
    const getcourses = async () => {
      try {
        const getfivecourses = await axios.get(
          ` ${BASE_URL}/api/v1/course/getcourse`
        );

        return setCourseForLandingPage(getfivecourses?.data?.courses);
      } catch (error) {
        console.error(error);
      }
    };
    getcourses();
  }, []);
  const navigate = useNavigate();

  function redirectToCourseDetail(courseId) {
    navigate(`/aboutcourses/${courseId}`);
  }

  return (
    <div className="bg-white min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <div className="relative overflow-hidden py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-6xl font-bold text-black mb-6 leading-tight">
            Unlock Your Potential with
            <span className="block mt-2 bg-gradient-to-r from-black to-gray-600 bg-clip-text text-transparent">
              Expert-Led Online Courses
            </span>
          </h1>
          <p className="mt-6 text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Explore a vast library of courses taught by industry professionals.
            Learn new skills, advance your career, and achieve your goals at
            your own pace.
          </p>
          <div className="flex justify-center gap-4 mt-10">
            <Buttons buttoncontent={"Start Learning Today"} />
            <button className="bg-transparent border-2 border-black text-black px-8 py-3 rounded-full font-bold hover:bg-black hover:text-white transition-all duration-300">
              Explore Courses
            </button>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-gray-200 rounded-full opacity-20 blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-gray-200 rounded-full opacity-20 blur-3xl"></div>
        </div>
      </div>

      {/* Featured Courses Section */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-4xl font-bold text-black">Featured Courses</h2>
          <button className="text-gray-700 hover:text-black transition-colors font-semibold">
            View All →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CourseForLandingPage.length > 0 ? (
            CourseForLandingPage.map((courses) => (
              <div
                className="bg-white rounded-2xl overflow-hidden border-2 border-gray-200 hover:border-black transition-all duration-300 transform hover:scale-105 cursor-pointer shadow-sm"
                key={courses._id}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={courses.thumbnail}
                    alt={courses.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent"></div>
                </div>

                <div className="p-5">
                  <h3 className="text-xl font-bold text-black mb-2 line-clamp-2">
                    {courses.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {courses.description}
                  </p>

                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-black">
                      ₹{courses.price}
                    </span>
                  </div>

                  <button
                    className="w-full bg-black text-white py-3 rounded-xl font-bold hover:bg-gray-800 transition-all duration-300"
                    onClick={() => redirectToCourseDetail(courses._id)}
                  >
                    Enroll Now
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-4 text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
              <p className="text-gray-600 mt-4">Loading courses...</p>
            </div>
          )}
        </div>
      </div>

      {/* Explore Categories Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-black mb-12">
            Explore Categories
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            <CardForLandingPage
              logo={<Figma className="w-12 h-12 text-black" />}
              content={"Design"}              
            />
            <CardForLandingPage
              logo={<Activity className="w-12 h-12 text-black" />}
              content={"Health & Fitness"}
            />
            <CardForLandingPage
              logo={<Headphones className="w-12 h-12 text-black" />}
              content={"Music"}
            />
            <CardForLandingPage
              logo={<Wallpaper className="w-12 h-12 text-black" />}
              content={"Technology"}
            />
            <CardForLandingPage
              logo={<Camera className="w-12 h-12 text-black" />}
              content={"Photography"}
            />
            <CardForLandingPage
              logo={<Play className="w-12 h-12 text-black" />}
              content={"Video Editing"}
            />
            <CardForLandingPage
              logo={<Bug className="w-12 h-12 text-black" />}
              content={"Development"}
            />
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-4xl font-bold text-black mb-12">
          What Our Students Say
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-2xl p-6 border-2 border-gray-200 hover:border-black transition-all duration-300 shadow-sm">
            <div className="flex mb-4">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className="w-5 h-5 text-black fill-current"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                </svg>
              ))}
            </div>
            <p className="text-gray-700 mb-6 leading-relaxed">
              "This platform transformed my career! The courses are
              well-structured, and the instructors are incredibly knowledgeable.
              Highly recommend!"
            </p>
            <div className="flex items-center">
              <img
                src="https://plus.unsplash.com/premium_photo-1689530775582-83b8abdb5020?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cmFuZG9tJTIwcGVyc29ufGVufDB8fDB8fHww"
                alt="Student"
                className="h-12 w-12 rounded-full object-cover border-2 border-black"
              />
              <div className="ml-4">
                <h3 className="font-bold text-black">Jane Doe</h3>
                <p className="text-gray-600 text-sm">Web Developer</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border-2 border-gray-200 hover:border-black transition-all duration-300 shadow-sm">
            <div className="flex mb-4">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className="w-5 h-5 text-black fill-current"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                </svg>
              ))}
            </div>
            <p className="text-gray-700 mb-6 leading-relaxed">
              "Amazing learning experience! The flexibility to learn at my own
              pace while getting professional guidance made all the difference."
            </p>
            <div className="flex items-center">
              <img
                src="https://plus.unsplash.com/premium_photo-1689530775582-83b8abdb5020?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cmFuZG9tJTIwcGVyc29ufGVufDB8fDB8fHww"
                alt="Student"
                className="h-12 w-12 rounded-full object-cover border-2 border-black"
              />
              <div className="ml-4">
                <h3 className="font-bold text-black">John Smith</h3>
                <p className="text-gray-600 text-sm">UI/UX Designer</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border-2 border-gray-200 hover:border-black transition-all duration-300 shadow-sm">
            <div className="flex mb-4">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className="w-5 h-5 text-black fill-current"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                </svg>
              ))}
            </div>
            <p className="text-gray-700 mb-6 leading-relaxed">
              "The quality of content is outstanding. I've learned more here in
              months than I did in years of self-teaching. Worth every penny!"
            </p>
            <div className="flex items-center">
              <img
                src="https://plus.unsplash.com/premium_photo-1689530775582-83b8abdb5020?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cmFuZG9tJTIwcGVyc29ufGVufDB8fDB8fHww"
                alt="Student"
                className="h-12 w-12 rounded-full object-cover border-2 border-black"
              />
              <div className="ml-4">
                <h3 className="font-bold text-black">Sarah Johnson</h3>
                <p className="text-gray-600 text-sm">Data Scientist</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border-2 border-gray-200 hover:border-black transition-all duration-300 shadow-sm">
            <div className="flex mb-4">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className="w-5 h-5 text-black fill-current"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                </svg>
              ))}
            </div>
            <p className="text-gray-700 mb-6 leading-relaxed">
              "Best investment in my education! The courses are comprehensive,
              practical, and taught by experts who really know their stuff."
            </p>
            <div className="flex items-center">
              <img
                src="https://plus.unsplash.com/premium_photo-1689530775582-83b8abdb5020?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cmFuZG9tJTIwcGVyc29ufGVufDB8fDB8fHww"
                alt="Student"
                className="h-12 w-12 rounded-full object-cover border-2 border-black"
              />
              <div className="ml-4">
                <h3 className="font-bold text-black">Mike Chen</h3>
                <p className="text-gray-600 text-sm">Software Engineer</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-5xl font-bold text-black mb-6">
            Ready to Start Learning?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of students already learning on our platform.
          </p>
          <button className="bg-black text-white px-12 py-4 rounded-full font-bold text-lg hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 shadow-lg">
            Get Started Now
          </button>
        </div>
      </div>
    </div>
  );
}
