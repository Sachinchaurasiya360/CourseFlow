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
export default function LandingPage() {
  const [CourseForLandingPage, setCourseForLandingPage] = useState([]);
  useEffect(() => {
    const getcourses = async () => {
      try {
        const getfivecourses = await axios.get(
          "http://localhost:3000/public/course"
        );

        return setCourseForLandingPage(getfivecourses?.data?.courses);
      } catch (error) {
        console.error(error);
      }
    };
    getcourses();
  }, []);
  console.log(CourseForLandingPage);
  const img =
    "https://res.cloudinary.com/demo/image/upload/v1724682090/sample.jpg";

  return (
    <div>
      <Navbar />
      <div>
        <div className="max-w-full bg-fourth h-150 rounded-2xl m-2 mt-6 ml-6 mr-6">
          <h1 className="flex text-5xl justify-center font-bold pt-40 px-70 text-center">
            Unlock your potential with Expert-led Online courses{" "}
          </h1>
          <p className=" mt-15 ml-30 mr-30 pl-40 pr-40 text-xl flex justify-center text-center font-semibold text-gray-500">
            Explore a vast library of courses taught by industry professionals.
            Learn new skills, advance your career, and achieve your goals at
            your own pace.
          </p>
          <div className="flex w-full mt-10 justify-center">
            <Buttons buttoncontent={"Start Learning Today"} />
          </div>
        </div>

        <h2 className="mt-6 ml-6 text-3xl font-semibold"> Featured Courses</h2>
        <div className="w-full  flex flex-wrap">
          {CourseForLandingPage.length > 0 ? (
            CourseForLandingPage.map((courses) => (
              <div
                className="bg-primary shadow-2xs rounded-2xl w-70 h-115 ml-10 mt-3"
                key={courses._id}
              >
                <img
                  src={courses.thumbnail}
                  alt=""
                  className="p-3 rounded-3xl h-60 w-full"
                />
                <h1 className="text-xl font-semibold p-3">{courses.title}</h1>
                <p className="p-3 font-semibold pt-1 text-gray-600">
                  {courses.description}
                </p>
                <h2 className="p-3 text-xl text-blue-700 font-bold">
                  ₹{courses.price} only
                </h2>

                <button className="w-66 bg-secondary p-2.5 pr-3 pl-3 rounded-xl font-semibold text-gray-50 text-center mx-2">
                  Enroll Now
                </button>
              </div>
            ))
          ) : (
            <h1>Loading....</h1>
          )}
        </div>

        <h2 className="mt-6 ml-6 font-semibold text-3xl mb-3">
          Explore Categories
        </h2>
        <div className="px-10 grid grid-cols-5 gap-6">
          <CardForLandingPage
            logo={<Figma className="w-10 h-10 text-secondary" />}
            content={"Design"}
          />

          <CardForLandingPage
            logo={<Activity className="w-10 h-10 text-secondary" />}
            content={"Health And Fitness"}
          />
          <CardForLandingPage
            logo={<Headphones className="w-10 h-10 text-secondary" />}
            content={"Headphones"}
          />
          <CardForLandingPage
            logo={<Wallpaper className="w-10 h-10 text-secondary" />}
            content={"Technology"}
          />
          <CardForLandingPage
            logo={<Camera className="w-10 h-10 text-secondary" />}
            content={"Camera "}
          />
          <CardForLandingPage
            logo={<Play className="w-10 h-10 text-secondary" />}
            content={"Editing"}
          />
          <CardForLandingPage
            logo={<Bug className="w-10 h-10 text-secondary" />}
            content={"Debugging"}
          />
        </div>
      </div>

      <h1 className="font-semibold text-2xl m-3 ml-6 mt-3">
        What Our Students Say
      </h1>

      <div className="mx-10 grid grid-cols-4  ">
        <div className=" h-60 w-60 bg-primary rounded-2xl mb-8">
          <p className="pt-4 px-4">
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
            possimus, autem debitis nobis dolos accusamus, soluta, ea magnam
            reiciendis sit lrem "
          </p>
          <div className=" flex mt-3 items-center">
            <img
              src="https://plus.unsplash.com/premium_photo-1689530775582-83b8abdb5020?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cmFuZG9tJTIwcGVyc29ufGVufDB8fDB8fHww"
              alt=""
              className=" h-10 w-10 rounded-full ml-2"
            />
            <div>
              <h2 className="font-bold pl-4 pt-2">Jane Doe</h2>
              <p className=" pl-4  text-gray-500 ">Web Developer</p>
            </div>
          </div>
        </div>
        <div className=" h-60 w-60 bg-primary rounded-2xl mb-8">
          <p className="pt-4 px-4">
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
            possimus, autem debitis nobis dolos accusamus, soluta, ea magnam
            reiciendis sit lrem "
          </p>
          <div className=" flex mt-3 items-center">
            <img
              src="https://plus.unsplash.com/premium_photo-1689530775582-83b8abdb5020?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cmFuZG9tJTIwcGVyc29ufGVufDB8fDB8fHww"
              alt=""
              className=" h-10 w-10 rounded-full ml-2"
            />
            <div>
              <h2 className="font-bold pl-4 pt-2">Jane Doe</h2>
              <p className=" pl-4  text-gray-500 ">Web Developer</p>
            </div>
          </div>
        </div>
        <div className=" h-60 w-60 bg-primary rounded-2xl mb-8">
          <p className="pt-4 px-4">
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
            possimus, autem debitis nobis dolos accusamus, soluta, ea magnam
            reiciendis sit lrem "
          </p>
          <div className=" flex mt-3 items-center">
            <img
              src="https://plus.unsplash.com/premium_photo-1689530775582-83b8abdb5020?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cmFuZG9tJTIwcGVyc29ufGVufDB8fDB8fHww"
              alt=""
              className=" h-10 w-10 rounded-full ml-2"
            />
            <div>
              <h2 className="font-bold pl-4 pt-2">Jane Doe</h2>
              <p className=" pl-4  text-gray-500 ">Web Developer</p>
            </div>
          </div>
        </div>
        <div className=" h-60 w-60 bg-primary rounded-2xl mb-8">
          <p className="pt-4 px-4">
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
            possimus, autem debitis nobis dolos accusamus, soluta, ea magnam
            reiciendis sit lrem "
          </p>
          <div className=" flex mt-3 items-center">
            <img
              src="https://plus.unsplash.com/premium_photo-1689530775582-83b8abdb5020?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cmFuZG9tJTIwcGVyc29ufGVufDB8fDB8fHww"
              alt=""
              className=" h-10 w-10 rounded-full ml-2"
            />
            <div>
              <h2 className="font-bold pl-4 pt-2">Jane Doe</h2>
              <p className=" pl-4  text-gray-500 ">Web Developer</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
