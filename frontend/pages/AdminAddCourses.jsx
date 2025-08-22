import Navbar from "../components/Navbar";
import AdminSidebar from "../components/AdminSidebar";
import axios from "axios";
import { useState } from "react";

export default function AdminAddcourses() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [Category, setCategory] = useState("");
  const [Loading, setLoading] = useState("");
  const [Error, setError] = useState("");

  const handlesubmit = async (e) => {
    console.log("button hit");
    e.preventDefault();
    setError("");
    setLoading("true");

    try {
      const response = await axios.post(
        "http://localhost:3000/admin/createcourse",
        {
          title,
          description,
          price,
          Category,
        },
        {
          withCredentials: true,
        }
      );
    } catch (error) {
      setError(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Navbar />
      <div className="flex">
        <AdminSidebar />

        <div className="flex-1 w-full ml-6 mr-6">
          <div className=" ">
            <h1 className=" flex text-3xl font-bold m-4 w-full ">
              {" "}
              Add Your courses{" "}
            </h1>
            <label
              htmlFor="title"
              className="text-xl font-semibold  block mt-2"
            >
              Title
            </label>
            <input
              type="text"
              placeholder="Enter your title"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              className="block w-full p-1 border-1 rounded-md border-gray-300 mt-1"
            />
            <label htmlFor="description" className="block w-full">
              Description
            </label>
            <textarea
              type="text"
              placeholder="About the course"
              rows={4}
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              className="block w-full p-1 border-1 rounded-md border-gray-300"
            />
            <label htmlFor="price" className="block">
              Price
            </label>
            <input
              type="text"
              value={price}
              onChange={(e) => {
                setPrice(e.target.value);
              }}
              placeholder="Price of the course"
              className="block w-full p-1 border-1 rounded-md border-gray-300"
            />
            <label htmlFor="category" className="block w-full">
              Category
            </label>
            {/*make it enum and dropdown */}
            <input
              type="text"
              value={Category}
              onChange={(e) => {
                setCategory(e.target.value);
              }}
              placeholder=" Enter the type of the courses"
              className="block w-full p-1 border-1 rounded-md border-gray-300"
            />

            <button
              className="mt-4 w-full flex justify-center  bg-secondary  p-2 pr-3 pl-3 rounded-xl font-semibold text-gray-50"
              onClick={handlesubmit}
            >
              Add Courses
            </button>

            {Error && <p className="text-red-400"> {Error}</p>}
          </div>
        </div>
      </div>
    </>
  );
}
