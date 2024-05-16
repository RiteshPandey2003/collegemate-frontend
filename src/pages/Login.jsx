import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { userExists } from "../redux/reducers/auth";
import { useFileHandler, useInputValidation } from "6pp";
import { server } from "../constants/config";
import { usernameValidator } from "../utils/validators";
import { motion } from "framer-motion";
import {FaCamera } from "react-icons/fa";
import Layout from "../layout/Layout";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const toggleLogin = () => setIsLogin((prev) => !prev);

  const name = useInputValidation("");
  const bio = useInputValidation("");
  const username = useInputValidation("", usernameValidator);
  const password = useInputValidation("");

  const avatar = useFileHandler("single");

  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();

    const toastId = toast.loading("Logging In...");

    setIsLoading(true);
    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        `${server}/api/v1/user/login`,
        {
          username: username.value,
          password: password.value,
        },
        config
      );
      dispatch(userExists(data.user));
      toast.success(data.message, {
        id: toastId,
      });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something Went Wrong", {
        id: toastId,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    const toastId = toast.loading("Signing Up...");
    setIsLoading(true);

    const formData = new FormData();
    formData.append("avatar", avatar.file);
    formData.append("name", name.value);
    formData.append("bio", bio.value);
    formData.append("username", username.value);
    formData.append("password", password.value);

    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    try {
      const { data } = await axios.post(
        `${server}/api/v1/user/new`,
        formData,
        config
      );

      dispatch(userExists(data.user));
      toast.success(data.message, {
        id: toastId,
      });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something Went Wrong", {
        id: toastId,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen flex justify-center items-center bg-gray-900 ">
      <motion.div
        className="p-4 rounded-lg shadow-sm"
        style={{
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.5)", // Adjust the opacity here
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {isLogin ? (
          <>
            <h2 className="text-3xl font-bold text-center mb-4 text-white">
              Login
            </h2>
            <form onSubmit={handleLogin}>
              <input
                className="w-full mb-4 px-4 py-2 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                placeholder="Username"
                value={username.value}
                onChange={username.changeHandler}
              />
              <input
                className="w-full mb-4 px-4 py-2 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="password"
                placeholder="Password"
                value={password.value}
                onChange={password.changeHandler}
              />
              <button
                className="w-full bg-blue-500 text-white py-2 rounded-md shadow-sm hover:bg-blue-600 transition duration-300"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "Logging In..." : "Login"}
              </button>
              <p className="text-center mt-4">OR</p>
              <button
                className="w-full text-blue-500 hover:underline focus:outline-none"
                onClick={toggleLogin}
              >
                Sign Up Instead
              </button>
            </form>
          </>
        ) : (
          <>
            <h2 className="text-3xl font-bold text-center mb-4 text-white">
              Sign Up
            </h2>
            <form onSubmit={handleSignUp}>
              <div className="relative w-40 h-40 mx-auto mb-4 border border-gray-600 rounded-full">
                <img
                  className="w-full h-full object-cover rounded-full"
                  src={avatar.preview}
                  alt="Avatar Preview"
                />
                <label className="absolute bottom-0 right-0 flex items-center justify-center bg-black bg-opacity-50 text-white rounded-full cursor-pointer">
                  <FaCamera className="mr-1" />
                  <input
                    className="hidden"
                    id="avatar"
                    type="file"
                    onChange={avatar.changeHandler}
                  />
                </label>
              </div>
              {avatar.error && (
                <p className="text-red-500 text-center mb-4">{avatar.error}</p>
              )}
              <input
                className="w-full mb-4 px-4 py-2 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                placeholder="Name"
                value={name.value}
                onChange={name.changeHandler}
              />
              <input
                className="w-full mb-4 px-4 py-2 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                placeholder="Bio"
                value={bio.value}
                onChange={bio.changeHandler}
              />
              <input
                className="w-full mb-4 px-4 py-2 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                placeholder="Username"
                value={username.value}
                onChange={username.changeHandler}
              />
              {username.error && (
                <p className="text-red-500">{username.error}</p>
              )}
              <input
                className="w-full mb-4 px-4 py-2 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="password"
                placeholder="Password"
                value={password.value}
                onChange={password.changeHandler}
              />
              <button
                className="w-full bg-blue-500 text-white py-2 rounded-md shadow-sm hover:bg-blue-600 transition duration-300"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "Signing Up..." : "Sign Up"}
              </button>
              <p className="text-center mt-4">OR</p>
              <button
                className="w-full text-blue-500 hover:underline focus:outline-none"
                onClick={toggleLogin}
              >
                Login Instead
              </button>
            </form>
          </>
        )}
      </motion.div>
    </div>
    </Layout>
  );
};

export default Login;
