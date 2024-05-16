import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Layout from "../layout/Layout";

const Home = () => {
  // State variables
  const [formdata, setFormdata] = useState({});
  const [loading, setLoading] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false); // Changed from false to null for more flexibility
  const navigate = useNavigate();

  // Function to handle input changes
  const handleChange = (e) => {
    if (e.target.type === "file") {
      const files = Array.from(e.target.files);
      setSelectedImages(files);
      setFormdata({ ...formdata, avatar: files });
    } else {
      setFormdata({ ...formdata, [e.target.id]: e.target.value });
    }
  };

  // Function to remove selected image
  const handleRemoveImage = (indexToRemove) => {
    setSelectedImages((prevImages) =>
      prevImages.filter((_, index) => index !== indexToRemove)
    );
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError(null); // Reset error state
      setSuccess(false); // Reset success state

      const formDataToSend = new FormData();
      Object.entries(formdata).forEach(([key, value]) => {
        if (key === "avatar") {
          for (let i = 0; i < value.length; i++) {
            formDataToSend.append(key, value[i]);
          }
        } else {
          formDataToSend.append(key, value);
        }
      });

      const res = await fetch("http://localhost:3000/api/v1/product/register", {
        method: "POST",
        body: formDataToSend,
      });

      if (!res.ok) {
        setError("Failed to register product");
      }

      const data = await res.json();
      setLoading(false);
      if (data.success) {
        setSuccess(true);
      }

      setSuccess(true); // Set success state

      // Handle successful form submission, e.g., redirect
      navigate("/products");
    } catch (error) {
      setLoading(false);
      setSuccess(false); // Reset success state
      setError(error.message || "Something went wrong");
    }
  };

  // JSX
  return (
    <Layout>
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-900 text-white">
      <motion.div
        className="p-6 rounded-lg shadow-md"
        style={{
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.5)",
        }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-3xl font-bold mb-8 text-center">
            Register Product
          </h1>
          {/* Form */}
          <form onSubmit={handleSubmit} className="w-[90%] max-w-md">
            <input
              type="text"
              placeholder="Collage Name"
              id="collageName"
              onChange={handleChange}
              className="px-4 py-2 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full text-black mb-4"
            />
            <input
              type="text"
              placeholder="City"
              id="city"
              onChange={handleChange}
              className="px-4 py-2 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full text-black mb-4"
            />
            <input
              type="text"
              placeholder="Address"
              id="Address"
              onChange={handleChange}
              className="px-4 py-2 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full text-black mb-4"
            />
            <input
              type="text"
              placeholder="Name"
              id="name"
              onChange={handleChange}
              className="px-4 py-2 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full text-black mb-4"
            />
            <input
              type="text"
              placeholder="Category"
              id="category"
              onChange={handleChange}
              className="px-4 py-2 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full text-black mb-4"
            />
            <input
              type="text"
              placeholder="Price"
              id="price"
              onChange={handleChange}
              className="px-4 py-2 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full text-black mb-4"
            />
            <input
              type="text"
              placeholder="Description"
              id="description"
              onChange={handleChange}
              className="px-4 py-2 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full text-black mb-4"
            />
            <input
              type="text"
              placeholder="Contact Details"
              id="contactDetails"
              onChange={handleChange}
              className="px-4 py-2 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full text-black mb-4"
            />
            <div className="mb-4 relative">
              <label
                htmlFor="avatar"
                className="cursor-pointer bg-blue-500 text-white py-2 px-4 rounded-md shadow-sm inline-block w-full text-center transition duration-300 hover:bg-blue-600"
              >
                Select Images
              </label>
              <input
                type="file"
                id="avatar"
                accept="image/*"
                multiple
                onChange={handleChange}
                className="hidden"
              />
            </div>
            <div className="flex flex-wrap justify-center mt-4">
              {selectedImages.map((image, index) => (
                <div key={index} className="relative mx-2 my-2">
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`Selected Image ${index + 1}`}
                    className="w-32 h-32 rounded-md shadow-sm"
                  />
                  <button
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-2 right-2 p-1 rounded-full bg-red-500 text-white text-xs hover:bg-red-600 transition duration-300"
                  >
                    X
                  </button>
                </div>
              ))}
            </div>

            {/* Submit button */}
            <div className="mb-4">
              <button
                disabled={loading}
                className="bg-blue-500 text-white py-2 rounded-md shadow-sm hover:bg-blue-600 transition duration-300 w-full"
              >
                {loading ? "Loading.." : "Submit"}
              </button>
            </div>
            {success && (
              <p className="mt-4 bg-green-500 p-2 rounded-md shadow-md text-white text-center font-bold">
                Product registered successfully
              </p>
            )}

            {/* Error message */}
            {error && (
              <p className="mt-4 bg-red-500 p-2 rounded-md shadow-md text-white text-center font-bold">
                {error}
              </p>
            )}
          </form>
        </div>
      </motion.div>
    </div>
    </Layout>
  );
};

export default Home;
