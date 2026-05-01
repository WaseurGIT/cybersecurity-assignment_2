"use client";

import React, { useState } from "react";
import axiosSecure from "../api/axiosSecure";
import Swal from "sweetalert2";
import Link from "next/link";
import { FaArrowLeft, FaEnvelope } from "react-icons/fa";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axiosSecure.post("/forget-password", { email });

      Swal.fire({
        icon: "success",
        title: "Success",
        text: res.data.message,
      });

      setEmail("");
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: err.response?.data?.message || "Something went wrong.",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-orange-100 to-red-200 dark:from-zinc-900 dark:to-black p-4">
      <Link
        href="/login"
        className="absolute top-5 left-5 md:left-10 text-orange-500 hover:underline flex items-center gap-1 font-semibold"
      >
        <FaArrowLeft />
        Back to Login
      </Link>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl p-8"
      >
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
          Forgot Password
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Enter your email to receive a reset link.
        </p>

        <div className="flex items-center border-2 border-gray-300 dark:border-zinc-700 rounded-lg px-4 py-3 mb-6 bg-gray-50 dark:bg-zinc-800">
          <FaEnvelope className="text-gray-500 dark:text-gray-400 mr-3" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full bg-transparent outline-none text-gray-700 dark:text-white"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg"
        >
          Send Reset Link
        </button>
      </form>
    </div>
  );
}
