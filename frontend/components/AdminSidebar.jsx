export default function AdminDashboard() {
  return (
    <div className="min-h-screen w-40 bg-primary1 text-black shadow-lg">
      <ul className="space-y-4 p-5 font-semibold">
        <li className="hover:bg-blue-500 cursor-pointer rounded-lg px-3 py-2 ">Dashboard</li>
        <li className="hover:bg-blue-500 cursor-pointer rounded-lg px-3 py-2">Course</li>
        <li className="hover:bg-blue-500 cursor-pointer rounded-lg px-3 py-2">Users</li>
        <li className="hover:bg-blue-500 cursor-pointer rounded-lg px-3 py-2">Reports</li>
        <li className="hover:bg-blue-500 cursor-pointer rounded-lg px-3 py-2">Settings</li>
      </ul>
    </div>
  );
}
