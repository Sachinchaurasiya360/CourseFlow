import Navbar from "../components/Navbar";

export default function Dashboard() {
  return (
    <div>
      <Navbar />
      <h1 className="text-4xl font-semibold ml-12 mt-12 ">Student Dashboard</h1>
      <div className=" ml-12 mt-3 space-x-10">
        <button className="hover:underline text-gray-600">My course</button>
        <button className="hover:underline text-gray-600">
          Progress tracking
        </button>
        <button className="hover:underline text-gray-600">Certificate</button>
        <button className="hover:underline text-gray-600">My wishlisht</button>
      </div>
      
    </div>
  );
}
