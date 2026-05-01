"use client";

import Link from "next/link";
import React, { useState } from "react";
import { FaUser, FaEnvelope, FaLock, FaArrowLeft } from "react-icons/fa";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import axiosSecure from "../api/axiosSecure";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();

  const strongPasswordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const handleRegisterForm = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;

    if (!name || !email || !password || !confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: "Please fill in all required fields.",
        confirmButtonText: "OK",
      });
      return;
    } else if (password.length < 8) {
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: "Password must be at least 8 characters long.",
        confirmButtonText: "OK",
      });
      return;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: "Please enter a valid email address.",
        confirmButtonText: "OK",
      });
      return;
    } else if (password !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: "Passwords do not match.",
        confirmButtonText: "OK",
      });
      return;
    }
    if (!strongPasswordRegex.test(password)) {
      Swal.fire({
        icon: "error",
        title: "Weak Password",
        text: "Password must include uppercase, lowercase, number, and special character.",
      });
      return;
    }

    const formData = {
      name,
      email,
      password,
      confirmPassword,
    };

    axiosSecure
      .post("/users", formData)
      .then((res) => {
        Swal.fire({
          icon: "success",
          title: "Registration Successful",
          text: "You have registered successfully!",
          confirmButtonText: "OK",
        });
        form.reset();
        router.push("/login");
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Registration Failed",
          text:
            err.response?.data?.message ||
            "An error occurred during registration.",
          confirmButtonText: "OK",
        });
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-orange-100 to-red-200 dark:from-zinc-900 dark:to-black p-4">
      <Link
        href="/"
        className="absolute top-5 left-5 md:left-10 text-orange-500 hover:underline flex items-center gap-1 font-semibold"
      >
        <FaArrowLeft />
        Back to Home
      </Link>
      <div className="w-full max-w-5xl bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 hidden md:flex items-center justify-center overflow-hidden">
          <img
            src="https://i.ibb.co.com/k2tj6ZrT/roasted-beans.jpg"
            alt="restaurant"
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>

        <form
          onSubmit={handleRegisterForm}
          className="w-full md:w-1/2 flex flex-col justify-center px-6 md:px-10 py-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-2">
            Create Account
          </h1>

          <p className="text-gray-600 dark:text-gray-300 mb-8 text-sm md:text-base">
            Join and explore delicious meals
          </p>

          <div className="flex items-center border-2 border-gray-300 dark:border-zinc-700 rounded-lg px-4 py-3 mb-4 bg-gray-50 dark:bg-zinc-800 hover:border-orange-500 transition-colors">
            <FaUser className="text-gray-500 dark:text-gray-400 mr-3" />
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              className="w-full bg-transparent outline-none text-gray-700 dark:text-white placeholder-gray-500"
              required
            />
          </div>

          <div className="flex items-center border-2 border-gray-300 dark:border-zinc-700 rounded-lg px-4 py-3 mb-4 bg-gray-50 dark:bg-zinc-800 hover:border-orange-500 transition-colors">
            <FaEnvelope className="text-gray-500 dark:text-gray-400 mr-3" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full bg-transparent outline-none text-gray-700 dark:text-white placeholder-gray-500"
              required
            />
          </div>

          <div className="flex items-center border-2 border-gray-300 dark:border-zinc-700 rounded-lg px-4 py-3 mb-4 bg-gray-50 dark:bg-zinc-800 hover:border-orange-500 transition-colors">
            <FaLock className="text-gray-500 dark:text-gray-400 mr-3" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              className="w-full bg-transparent outline-none text-gray-700 dark:text-white placeholder-gray-500"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="cursor-pointer text-gray-500 dark:text-gray-400 hover:text-orange-500 transition-colors"
            >
              {showPassword ? (
                <IoIosEye size={20} />
              ) : (
                <IoIosEyeOff size={20} />
              )}
            </button>
          </div>

          <div className="flex items-center border-2 border-gray-300 dark:border-zinc-700 rounded-lg px-4 py-3 mb-6 bg-gray-50 dark:bg-zinc-800 hover:border-orange-500 transition-colors">
            <FaLock className="text-gray-500 dark:text-gray-400 mr-3" />
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              className="w-full bg-transparent outline-none text-gray-700 dark:text-white placeholder-gray-500"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="cursor-pointer text-gray-500 dark:text-gray-400 hover:text-orange-500 transition-colors"
            >
              {showConfirmPassword ? (
                <IoIosEye size={20} />
              ) : (
                <IoIosEyeOff size={20} />
              )}
            </button>
          </div>

          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg transition duration-300 shadow-md hover:shadow-lg"
          >
            Register
          </button>

          <p className="text-sm text-center mt-6 text-gray-600 dark:text-gray-400">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-orange-500 cursor-pointer hover:text-orange-600 font-semibold transition-colors"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
