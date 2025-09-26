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
  },[courseId]);
  console.log(course)

  return (
    <div>
      <Navbar />

      <div className="mt-6 mx-6 grid grid-cols-2">
        <img
          src={course.thumbnail}
          alt="Server error"
          className="h-90 w-160 rounded-2xl ml-6 mt-6"
        />

        <div className=" mt-10">
          <h1 className="text-3xl font-semibold">{course.title}</h1>
          <p className=" mt-6 text-wrap text-lg text-gray-700 items-center ">
            {course.description}
          </p>
          <div className="mt-6">
            <h1>Ratings.........</h1>
          </div>
          <h2 className="mt-6  text-lg ">
            Instructor: {course?.createdby?.firstName}
          </h2>

          <div className="mt-6 flex  justify-start gap-6 items-center">
            <p className="text-secondary text-2xl font-bold  ">
              ₹ {course.price} Only
            </p>
            <div className="">
              <Buttons buttoncontent={"Enroll Now"} />
            </div>
          </div>
        </div>
      </div>
      <div className="mx-6 mt-10">
        <h1 className=" text-2xl font-bold mt-6 ml-6">What you will Learn</h1>
        
        {course?.coursehighlight?.map((highlight, index) => {
          <div className="grid grid-cols-2 mx-6 gap-6 mt-4" key={index}>
            <h1>{highlight}</h1>
          </div>;
        })}

      </div>
      <div className="mt-6 mx-6 ">
        <h1 className="font-bold text-2xl  ml-6 ">Curriculum</h1>
        <div></div>
      </div>
      <div className="mx-6 mt-6">
        <h1 className="text-2xl font-bold ml-6">About the instructor</h1>
        <div></div>
      </div>
    </div>
  );
}

// add user bio,rating to the course
