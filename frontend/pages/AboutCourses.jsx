import { useEffect, useState } from "react";
import Buttons from "../components/Buttons";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useParams } from "react-router-dom";
const BASE_URL = import.meta.env.VITE_BASE_URL;

export default function AboutCourses() {
  const { courseId } = useParams();
  const [course, setCourse] = useState("");
  useEffect(() => {
    const getdetails = async () => {
      try {
        const gettingCourseDetails = await axios.get(
          `${BASE_URL}/api/v1/course/getsinglecourse/${courseId}`
        );
        setCourse(gettingCourseDetails?.data?.coursedetails);
      } catch (error) {
        console.error(error);
      }
    };
    getdetails();
  }, [courseId]);
  console.log(course);

  return (
    <div className="bg-black min-h-screen">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="relative">
            <img
              src={course.thumbnail}
              alt={course.title}
              className="w-full h-96 object-cover rounded-2xl border border-zinc-800"
            />
          </div>

          <div className="flex flex-col justify-center">
            <h1 className="text-4xl font-bold text-white mb-6">
              {course.title}
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed mb-6">
              {course.description}
            </p>

            <div className="mb-6">
              <div className="flex items-center text-white">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-6 h-6 fill-current"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
                <span className="ml-3 text-gray-300">5.0 (123 reviews)</span>
              </div>
            </div>

            <div className="mb-6">
              <p className="text-gray-400 text-lg">
                Instructor:{" "}
                <span className="text-white font-semibold">
                  {course?.createdby?.firstName}
                </span>
              </p>
            </div>

            <div className="flex items-center gap-6">
              <p className="text-4xl font-bold text-white">₹{course.price}</p>
              <Buttons buttoncontent={"Enroll Now"} />
            </div>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-3xl font-bold text-white mb-8">
            What You Will Learn
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {course?.coursehighlight?.map((highlight, index) => (
              <div
                key={index}
                className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 hover:border-white transition-all duration-300"
              >
                <p className="text-gray-300">✓ {highlight}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-3xl font-bold text-white mb-8">Curriculum</h2>
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
            <p className="text-gray-400">Course curriculum coming soon...</p>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-3xl font-bold text-white mb-8">
            About the Instructor
          </h2>
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
            <p className="text-gray-300 text-lg">
              {course?.createdby?.firstName} is an experienced educator
              passionate about sharing knowledge.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// add user bio,rating to the course
