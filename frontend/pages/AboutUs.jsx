import Navbar from "../components/Navbar";

export default function AboutUs() {
  return (
    <div>
      <Navbar />
      <h1 className="mt-10 ml-6 text-2xl font-semibold">About Us</h1>

      <div className=" bg-primary1 mx-6 max-w-full h-80 mt-3 rounded-2xl shadow-md">
        <p className="text-lg p-3 font-semibold text-gray-700 mt-3 leading-relaxed">
          Welcome to CourseFlow,your premier destination for accessible and
          engaging online education. We believe that learning should be a
          seamless and enjoyable experence which is why weve designed our
          platform with a clean, minimal interface that puts contenet first.
        </p>
        <p className="text-lg p-3 font-semibold text-gray-700 mt-3 leading-relaxed">
          our mission is to empower individuals worldwide by providing
          high-quality courses across a diverse range of subjects. Wheather
          you're looking to advance your career,pick up a new hobby,or simply
          expand your knowledge, CourseFlow offers expertly crafted content
          designed to help you acheve your goals.
        </p>

        <p className="text-lg p-3 font-semibold text-gray-700 mt-3 leading-relaxed">
          We are committed to fostering a vibrant learning community where
          curiosity thrives and knwoledge is shared freel. Join us on a journey
          of continous learning and personal growth.
        </p>
      </div>

      <h1 className=" mt-10 ml-6 text-2xl font-semibold mx-6">
        Our Mission and Vision
      </h1>
      <div className=" grid grid-cols-2 mx-6 mt-10 gap-8">
        <div className="bg-primary1 rounded-2xl shadow-md text-wrap pb-3">
          <h1 className="text-secondary font-semibold text-xl p-3">Our Mission</h1>
          <p className="p-3  text-gray-700  text-lg">
            To democratize education by providing a user-firendly,high-quality
            online learning platform that makes knowledge accessible to
            everyone,everywhere
          </p>
        </div>
        <div className="bg-primary1 rounded-2xl shadow-md text-wrap">
          <h1 className="text-secondary font-semibold text-xl p-3 "> Our Vision</h1>
          <p className="p-3 text-gray-700  text-lg pb-3">
            To be the leading platform for online courses,reconized for our
            innovative approach to learning, exceptional content,and supportive
            global community.
          </p>
        </div>
      </div>
    </div>
  );
}


