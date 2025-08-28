import Navbar from "../components/Navbar";
import AdminSidebar from "../components/AdminSidebar";
import axios from "axios";
import { useState } from "react";

export default function AdminAddcourses() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [thumbnail, setthumbnail] = useState(null);
  const [Category, setCategory] = useState("");
  const [Loading, setLoading] = useState("");
  const [Error, setError] = useState("");

  const handlesubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Create FormData object
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("price", Number(price)); 
      formData.append("category", Category);

      
      if (thumbnail) {
        formData.append("thumbnail", thumbnail);
      }

      console.log("Sending form data:", {
        title,
        description,
        price,
        category: Category,
        thumbnail: thumbnail?.name,
      });

      const response = await axios.post(
        "http://localhost:3000/admin/createcourse",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Course created:", response.data);
      // Reset form
      setTitle("");
      setDescription("");
      setPrice("");
      setCategory("");
      setthumbnail(null);
    } catch (error) {
      console.error("Error creating course:", error);
      setError(error.response?.data?.message || "Failed to create course");
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
              type="number"
              value={price}
              onChange={(e) => {
                setPrice(Number(e.target.value));
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
            <label htmlFor="thumbnail" className="block w-full mt-4 mb-2">
              Thumbnail Image
            </label>
            <input
              type="file"
              id="thumbnail"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  console.log("File selected:", file.name);
                  setthumbnail(file);
                }
              }}
              className="block w-full p-1 border-1 rounded-md border-gray-300"
            />
            {thumbnail && (
              <p className="mt-2 text-sm text-gray-500">
                Selected file: {thumbnail.name}
              </p>
            )}
            {Error && <p className="mt-2 text-sm text-red-500">{Error}</p>}

            <button
              className="mt-4 w-full flex justify-center  bg-secondary  p-2 pr-3 pl-3 rounded-xl font-semibold text-gray-50"
              disabled={Loading}
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
