import Navbar from "../components/Navbar";

export default function AboutUs() {
  return (
    <div className="bg-white min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <div className="relative py-24 mb-16 overflow-hidden bg-gray-50">
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold text-black mb-4 text-center">
            About CourseFlow
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto text-center">
            Transforming education through innovation and accessibility
          </p>
        </div>
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="absolute top-10 left-10 w-72 h-72 bg-gray-200 rounded-full opacity-20 blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-gray-200 rounded-full opacity-20 blur-3xl"></div>
        </div>
      </div>

      {/* About Us Content */}
      <div className="container mx-auto px-6 md:px-12 mb-20">
        <div className="bg-white border-2 border-gray-200 rounded-2xl shadow-sm p-8 mb-12">
          <h2 className="text-4xl font-bold text-black mb-6 text-center">
            Our Story
          </h2>
          <div className="max-w-4xl mx-auto space-y-6">
            <p className="text-lg text-gray-700 leading-relaxed">
              Welcome to{" "}
              <span className="font-bold text-black">CourseFlow</span>, your
              premier destination for accessible and engaging online education.
              We believe that learning should be a seamless and enjoyable
              experience which is why we've designed our platform with a clean,
              minimal interface that puts content first.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Our mission is to empower individuals worldwide by providing
              high-quality courses across a diverse range of subjects. Whether
              you're looking to advance your career, pick up a new hobby, or
              simply expand your knowledge, CourseFlow offers expertly crafted
              content designed to help you achieve your goals.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              We are committed to fostering a vibrant learning community where
              curiosity thrives and knowledge is shared freely. Join us on a
              journey of continuous learning and personal growth.
            </p>
          </div>
        </div>

        <h2 className="text-4xl font-bold text-black mb-8 text-center">
          Our Mission and Vision
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white border-2 border-gray-200 rounded-2xl shadow-sm hover:border-black transition-all duration-300 overflow-hidden">
            <div className="bg-black p-6">
              <h3 className="text-white font-bold text-2xl">Our Mission</h3>
            </div>
            <p className="p-6 text-gray-700 text-lg">
              To democratize education by providing a user-friendly,
              high-quality online learning platform that makes knowledge
              accessible to everyone, everywhere. We strive to break down
              barriers to education and create opportunities for lifelong
              learning.
            </p>
          </div>
          <div className="bg-white border-2 border-gray-200 rounded-2xl shadow-sm hover:border-black transition-all duration-300 overflow-hidden">
            <div className="bg-black p-6">
              <h3 className="text-white font-bold text-2xl">Our Vision</h3>
            </div>
            <p className="p-6 text-gray-700 text-lg">
              To be the leading platform for online courses, recognized for our
              innovative approach to learning, exceptional content, and
              supportive global community. We aim to transform education and
              make quality learning experiences available to all.
            </p>
          </div>
        </div>

        <h2 className="text-4xl font-bold text-black mb-8 text-center">
          Meet Our Team
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {[
            {
              name: "Sachin Chaurasiya ",
              role: "Founder & CEO",
              image:
                "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
            },
            {
              name: "Someone",
              role: "Chief Learning Officer",
              image:
                "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
            },
            {
              name: "Priya Patel",
              role: "Head of Content",
              image:
                "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
            },
            {
              name: "Alex bihari",
              role: "Technical Director",
              image:
                "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
            },
          ].map((member, index) => (
            <div
              key={index}
              className="bg-white border-2 border-gray-200 rounded-2xl shadow-sm overflow-hidden flex flex-col items-center p-6 hover:border-black transition-all duration-300"
            >
              <div className="w-32 h-32 rounded-full overflow-hidden mb-4 border-4 border-black">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-bold text-xl text-black">{member.name}</h3>
              <p className="text-gray-600">{member.role}</p>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <h2 className="text-4xl font-bold text-black mb-8 text-center">
          What Our Users Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {[
            {
              name: "Rinki",
              role: "Marketing Professional",
              quote:
                "CourseFlow transformed my career with its comprehensive digital marketing courses. The platform is intuitive and the content is top-notch.",
            },
            {
              name: "Faceebook Kumar",
              role: "Software Developer",
              quote:
                "As a self-taught programmer, CourseFlow helped me fill critical knowledge gaps with their in-depth programming courses. Now I'm confident in my skills.",
            },
            {
              name: "Testing Chaurasiya",
              role: "Graphic Designer",
              quote:
                "The design courses on CourseFlow are incredible! I learned so many new techniques that I immediately applied to my client work.",
            },
          ].map((testimonial, index) => (
            <div
              key={index}
              className="bg-white border-2 border-gray-200 rounded-2xl shadow-sm p-6 hover:border-black transition-all duration-300"
            >
              <div className="flex items-center mb-4 text-black">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 fill-current"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 italic mb-6">"{testimonial.quote}"</p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-white font-bold">
                  {testimonial.name.charAt(0)}
                </div>
                <div className="ml-3">
                  <h4 className="font-semibold text-black">
                    {testimonial.name}
                  </h4>
                  <p className="text-gray-600 text-sm">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
          <h2 className="text-4xl font-bold text-black mb-4">
            Ready to Start Learning?
          </h2>
          <p className="text-gray-600 text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of students already learning on CourseFlow and take
            your skills to the next level.
          </p>
          <div className="flex justify-center space-x-4">
            <button className="bg-black text-white font-bold px-8 py-4 rounded-full hover:bg-gray-800 transition-all duration-300 transform hover:scale-105">
              Browse Courses
            </button>
            <button className="bg-transparent border-2 border-black text-black font-bold px-8 py-4 rounded-full hover:bg-black hover:text-white transition-all duration-300 transform hover:scale-105">
              Sign Up Free
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
