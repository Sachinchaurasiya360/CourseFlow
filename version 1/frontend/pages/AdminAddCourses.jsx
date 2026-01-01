import Navbar from "../components/Navbar";
import AdminSidebar from "../components/AdminSidebar";
import axios from "axios";
import { useState } from "react";

export default function AdminAddcourses() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState();
  const [thumbnail, setthumbnail] = useState(null);
  const [Category, setCategory] = useState("");
  const [coursehighlight, setCoursehighlight] = useState([""]);
  const [Loading, setLoading] = useState("");
  const [Error, setError] = useState("");

  const handleHighlight = (index, value) => {
    const updatehighlight = [...coursehighlight];
    updatehighlight[index] = value;
    setCoursehighlight(updatehighlight);
  };
  const handleAddhighlight = () => {
    setCoursehighlight([...coursehighlight, ""]);
  };
  const handleRemovehighlight = (index) => {
    const currentindex = [...coursehighlight];
    currentindex.splice(index, 1);
    setCoursehighlight(currentindex);
  };
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
      formData.append("coursehighlight", JSON.stringify(coursehighlight));

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
    } catch (error) {
      console.error("Error creating course:", error);
      setError(error.response?.data?.message || "Failed to create course");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="flex">
        <AdminSidebar />
        <div className="flex-1 p-8">
          <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-200 p-8">
            <h1 className="text-4xl font-bold text-black mb-8">
              Add New Course
            </h1>

            <div className="space-y-6">
              <div>
                <label
                  htmlFor="title"
                  className="block text-black font-semibold mb-2"
                >
                  Course Title
                </label>
                <input
                  type="text"
                  placeholder="Enter course title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-gray-50 text-black border-2 border-gray-300 rounded-lg p-3 focus:border-black focus:outline-none transition-colors placeholder-gray-500"
                />
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="block text-black font-semibold mb-2"
                >
                  Description
                </label>
                <textarea
                  placeholder="About the course"
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-gray-50 text-black border-2 border-gray-300 rounded-lg p-3 focus:border-black focus:outline-none transition-colors placeholder-gray-500"
                />
              </div>

              <div>
                <label
                  htmlFor="price"
                  className="block text-black font-semibold mb-2"
                >
                  Price
                </label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  placeholder="Price of the course"
                  className="w-full bg-gray-50 text-black border-2 border-gray-300 rounded-lg p-3 focus:border-black focus:outline-none transition-colors placeholder-gray-500"
                />
              </div>

              <div>
                <label
                  htmlFor="category"
                  className="block text-black font-semibold mb-2"
                >
                  Category
                </label>
                <input
                  type="text"
                  value={Category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="Enter the type of course"
                  className="w-full bg-gray-50 text-black border-2 border-gray-300 rounded-lg p-3 focus:border-black focus:outline-none transition-colors placeholder-gray-500"
                />
              </div>

              <div>
                <label className="block text-black font-semibold mb-2">
                  Course Highlights
                </label>
                {coursehighlight.map((highlight, index) => (
                  <div key={index} className="flex gap-2 mb-3">
                    <input
                      type="text"
                      value={highlight}
                      placeholder="Course highlight"
                      className="flex-1 bg-gray-50 text-black border-2 border-gray-300 rounded-lg p-3 focus:border-black focus:outline-none transition-colors placeholder-gray-500"
                      onChange={(e) => handleHighlight(index, e.target.value)}
                    />
                    {index > 0 && (
                      <button
                        type="button"
                        onClick={() => handleRemovehighlight(index)}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 rounded-lg transition-colors"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={handleAddhighlight}
                  className="bg-black text-white px-6 py-2 rounded-full font-semibold hover:bg-gray-800 transition-all duration-300 mt-2"
                >
                  + Add More
                </button>
              </div>

              <div>
                <label
                  htmlFor="thumbnail"
                  className="block text-black font-semibold mb-2"
                >
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
                  className="w-full bg-gray-50 text-black border-2 border-gray-300 rounded-lg p-3 focus:border-black focus:outline-none transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-black file:text-white file:font-semibold hover:file:bg-gray-800"
                />
                {thumbnail && (
                  <p className="mt-2 text-sm text-gray-600">
                    Selected file: {thumbnail.name}
                  </p>
                )}
              </div>

              {Error && (
                <p className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded-lg">
                  {Error}
                </p>
              )}

              <button
                className="w-full bg-black text-white font-bold p-4 rounded-full hover:bg-gray-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={Loading}
                onClick={handlesubmit}
              >
                {Loading ? "Adding Course..." : "Add Course"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
