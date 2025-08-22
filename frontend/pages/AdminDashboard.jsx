import Navbar from "../components/Navbar";
import AdminSidebar from "../components/AdminSidebar";
import Buttons from "../components/Buttons";
import Card from "../components/Card";
import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();
  return (
    <>
      <Navbar />

      <div className="flex">
        <AdminSidebar className=" flex max-w-40" />

        <div className="flex-1">
          <h1 className="text-3xl m-4 font-bold ml-3  block">
            Admin Dashboard
          </h1>

          <div className=" flex mt-15 space-x-20 ml-5">
            <Card
              title={"Active user"}
              description={"Total user on courseflow"}
              figures={2485}
              className=" mt-10 "
            />

            <Card
              title={"Total Sales"}
              description={"Sales in the current month"}
              figures={"$234"}
              className="mt-10"
            />
          </div>
          <div className=" flex justify-between max-w-full mt-4 ml-3 mr-3">
            <h1 className="text-xl font-semibold">Course Management</h1>
            <Buttons
              buttoncontent={"Add courses"}
              onclick={() => {
                navigate("/addcourses");
              }}
            />
          </div>

          <table className="table-fixed w-full border border-gray-50  mt-3">
            <thead className="bg-gray-100">
              <tr className="">
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Course Title
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  category
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  price
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  description
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>hello</td>
                <td>hello</td>
                <td>hello</td>
                <td>hello</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
