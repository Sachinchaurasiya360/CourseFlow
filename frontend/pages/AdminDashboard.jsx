import Navbar from "../components/Navbar";
import AdminSidebar from "../components/AdminSidebar";

export default function AdminDashboard() {
  return (
    <>
      <Navbar />

      <div className="flex flex-1">
        <AdminSidebar className=" flex max-w-40" />

        <h1 className="text-3xl m-4">Admin Dashboard</h1>
      </div>
    </>
  );
}
