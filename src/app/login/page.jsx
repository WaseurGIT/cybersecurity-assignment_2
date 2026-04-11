"use client";
import Link from "next/link";
import React from "react";
import { FaUser, FaLock, FaArrowLeft } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const LoginPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-orange-100 to-red-200 dark:from-zinc-900 dark:to-black">
      <Link
        href="/"
        className="absolute top-5 left-80 text-orange-500 hover:underline flex items-center gap-1"
      >
        <FaArrowLeft />
        Back to Home
      </Link>
      <div className="flex w-[900px] h-[500px] bg-white dark:bg-zinc-900 rounded-2xl shadow-xl overflow-hidden">
        <div className="w-1/2 hidden md:block">
          <img
            src="https://i.ibb.co.com/k2tj6ZrT/roasted-beans.jpg"
            alt="restaurant"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="w-full md:w-1/2 flex flex-col justify-center px-10">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
            Welcome Back 🍽️
          </h2>

          <p className="text-gray-500 mb-6">Login to explore delicious meals</p>

          <div className="flex items-center border rounded-lg px-3 py-2 mb-4 bg-gray-50 dark:bg-zinc-800">
            <FaUser className="text-gray-400 mr-2" />
            <input
              type="email"
              placeholder="Email"
              className="w-full bg-transparent outline-none text-gray-700 dark:text-white"
            />
          </div>

          <div className="flex items-center border rounded-lg px-3 py-2 mb-4 bg-gray-50 dark:bg-zinc-800">
            <FaLock className="text-gray-400 mr-2" />
            <input
              type="password"
              placeholder="Password"
              className="w-full bg-transparent outline-none text-gray-700 dark:text-white"
            />
          </div>

          <div className="flex justify-between items-center text-sm mb-4">
            <label className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <input type="checkbox" />
              Remember me
            </label>
            <a href="#" className="text-orange-500 hover:underline">
              Forgot password?
            </a>
          </div>

          <button className="bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg transition duration-200">
            Login
          </button>

          <div className="flex items-center my-4">
            <hr className="flex-1 border-gray-300" />
            <span className="mx-2 text-gray-400 text-sm">OR</span>
            <hr className="flex-1 border-gray-300" />
          </div>

          <button className="border py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-100 dark:hover:bg-zinc-800">
            <FcGoogle />
            Continue with Google
          </button>

          <p className="text-sm text-center mt-4 text-gray-600 dark:text-gray-400">
            Don’t have an account?{" "}
            <span className="text-orange-500 cursor-pointer hover:underline">
              Sign up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
