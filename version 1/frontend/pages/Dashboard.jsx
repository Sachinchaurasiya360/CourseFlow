import Navbar from "../components/Navbar";

export default function Dashboard() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-5xl font-bold text-black mb-8">
          Student Dashboard
        </h1>
        <div className="flex space-x-4 mb-8">
          <button className="px-6 py-3 bg-black text-white rounded-full font-semibold hover:bg-gray-800 transition-all duration-300">
            My Courses
          </button>
          <button className="px-6 py-3 bg-white text-black border-2 border-gray-200 rounded-full font-semibold hover:border-black transition-all duration-300">
            Progress Tracking
          </button>
          <button className="px-6 py-3 bg-white text-black border-2 border-gray-200 rounded-full font-semibold hover:border-black transition-all duration-300">
            Certificates
          </button>
          <button className="px-6 py-3 bg-white text-black border-2 border-gray-200 rounded-full font-semibold hover:border-black transition-all duration-300">
            My Wishlist
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="bg-white rounded-2xl p-6 border-2 border-gray-200 shadow-sm">
            <h3 className="text-2xl font-bold text-black mb-2">0</h3>
            <p className="text-gray-600">Enrolled Courses</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border-2 border-gray-200 shadow-sm">
            <h3 className="text-2xl font-bold text-black mb-2">0%</h3>
            <p className="text-gray-600">Completion Rate</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border-2 border-gray-200 shadow-sm">
            <h3 className="text-2xl font-bold text-black mb-2">0</h3>
            <p className="text-gray-600">Certificates Earned</p>
          </div>
        </div>
      </div>
    </div>
  );
}
