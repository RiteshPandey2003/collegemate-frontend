import React, { useState } from "react";
import { useSelector } from "react-redux";
import { FiUser, FiEdit, FiImage, FiLock } from "react-icons/fi";
import { Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import Layout from "../layout/Layout";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    avatar: user?.avatar?.url || "",
    name: user?.name || "",
    username: user?.username || "",
    bio: user?.bio || "",
    password: "",
  });

  // Redirect to login if user is not logged in
  if (!user) {
    return <Navigate to="/login" />;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add functionality to update user data
    console.log("Form submitted:", formData);
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0]; // Get the first selected file
    const reader = new FileReader(); // Create a FileReader object

    // Callback function to handle the FileReader onload event
    reader.onload = () => {
      // Update formData state with the base64 data URL of the selected image
      setFormData({
        ...formData,
        avatar: reader.result, // Set the avatar field to the base64 data URL
      });
    };

    if (file) {
      // Read the selected file as a data URL
      reader.readAsDataURL(file);
    }
  };

  return (
    <Layout>
      <div className="flex flex-col md:flex-row bg-gray-800 h-screen overflow-hidden">
        {/* Profile Image */}
        <div className="w-full md:w-1/5 bg-gray-700 h-screen overflow-y-hidden md:sticky top-0 z-10">
          <img
            src={formData.avatar}
            alt="Profile"
            className="w-[200px] h-[200px] rounded-full mt-20 m-auto"
          />
          <p className="text-3xl mt-5 text-gray-300 text-center font-extrabold ">
            {formData.name}
          </p>
          <p className="text-3xl mt-5 text-gray-300 text-center font-semibold ">
            {formData.bio}
          </p>
        </div>
        {/* Profile Form */}
        <div className="text-white w-full md:w-4/5 p-4 md:p-8 overflow-y-auto">
          <p className="text-3xl mt-10 text-gray-100  font-semibold">
            Update Profile
          </p>
          <form onSubmit={handleSubmit} className="space-y-4 lg:w-[80%] mt-10">
            {/* Avatar */}
            <div className="flex items-center space-x-4">
              <FiImage className="text-gray-400" />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                id="avatarInput" // Add an ID to the input for the label association
              />
              <label
                htmlFor="avatarInput"
                className="cursor-pointer bg-gray-600 text-white rounded-md px-4 py-2 w-full flex items-center justify-center"
              >
                Upload Avatar
              </label>
            </div>
            {/* Name */}
            <div className="flex items-center space-x-4">
              <FiUser className="text-gray-400" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="bg-gray-600 text-white rounded-md px-4 py-2 w-full"
                placeholder="Name"
              />
            </div>
            {/* Username */}
            <div className="flex items-center space-x-4">
              <FiEdit className="text-gray-400" />
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="bg-gray-600 text-white rounded-md px-4 py-2 w-full"
                placeholder="Username"
              />
            </div>
            {/* Bio */}
            <div className="flex items-center space-x-4">
              <FiEdit className="text-gray-400" />
              <input
                type="text"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                className="bg-gray-600 text-white rounded-md px-4 py-2 w-full"
                placeholder="Bio"
              />
            </div>
            {/* Password */}
            <div className="flex items-center space-x-4">
              <FiLock className="text-gray-400" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="bg-gray-600 text-white rounded-md px-4 py-2 w-full"
                placeholder="Password"
              />
            </div>
            {/* Update Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 m-auto ml-8"
            >
              Update
            </motion.button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
