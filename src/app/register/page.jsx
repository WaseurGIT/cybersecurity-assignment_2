"use client";

import Link from "next/link";
import React, { useState } from "react";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-orange-100 to-red-200 dark:from-zinc-900 dark:to-black px-4">
      <div className="w-full max-w-5xl bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 hidden md:block">
          <img
            src="https://i.ibb.co.com/k2tj6ZrT/roasted-beans.jpg"
            alt="restaurant"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="w-full md:w-1/2 flex flex-col justify-center p-6 sm:p-10">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
            Create Account
          </h1>

          <p className="text-gray-500 dark:text-gray-400 mb-6">
            Join and explore delicious meals
          </p>

          <div className="flex items-center border rounded-lg px-3 py-2 mb-4 bg-gray-50 dark:bg-zinc-800">
            <FaUser className="text-gray-400 mr-2" />
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              className="w-full bg-transparent outline-none text-gray-700 dark:text-white"
            />
          </div>

          <div className="flex items-center border rounded-lg px-3 py-2 mb-4 bg-gray-50 dark:bg-zinc-800">
            <FaEnvelope className="text-gray-400 mr-2" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full bg-transparent outline-none text-gray-700 dark:text-white"
            />
          </div>

          <div className="flex items-center border rounded-lg px-3 py-2 mb-4 bg-gray-50 dark:bg-zinc-800">
            <FaLock className="text-gray-400 mr-2" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              className="w-full bg-transparent outline-none text-gray-700 dark:text-white"
            />
            <div
              onClick={() => setShowPassword(!showPassword)}
              className="cursor-pointer text-gray-400"
            >
              {showPassword ? <IoIosEye /> : <IoIosEyeOff />}
            </div>
          </div>

          <div className="flex items-center border rounded-lg px-3 py-2 mb-4 bg-gray-50 dark:bg-zinc-800">
            <FaLock className="text-gray-400 mr-2" />
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              className="w-full bg-transparent outline-none text-gray-700 dark:text-white"
            />
            <div
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="cursor-pointer text-gray-400"
            >
              {showConfirmPassword ? <IoIosEye /> : <IoIosEyeOff />}
            </div>
          </div>

          <button className="bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg transition w-full">
            Register
          </button>

          <p className="text-sm text-center mt-4 text-gray-600 dark:text-gray-400">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-orange-500 cursor-pointer hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
