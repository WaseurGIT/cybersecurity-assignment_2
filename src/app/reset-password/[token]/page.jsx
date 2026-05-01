"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axiosSecure from "../../api/axiosSecure";
import Swal from "sweetalert2";

export default function ResetPasswordPage() {
  const { token } = useParams();
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axiosSecure.post(`/reset-password/${token}`, {
        password,
        confirmPassword,
      });

      Swal.fire({
        icon: "success",
        title: "Success",
        text: res.data.message,
      });

      router.push("/login");
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
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl p-8"
      >
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
          Reset Password
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Enter a new strong password.
        </p>

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="New password"
          className="w-full border-2 border-gray-300 dark:border-zinc-700 rounded-lg px-4 py-3 mb-4 bg-gray-50 dark:bg-zinc-800 outline-none text-gray-700 dark:text-white"
          required
        />

        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm password"
          className="w-full border-2 border-gray-300 dark:border-zinc-700 rounded-lg px-4 py-3 mb-6 bg-gray-50 dark:bg-zinc-800 outline-none text-gray-700 dark:text-white"
          required
        />

        <button
          type="submit"
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg"
        >
          Update Password
        </button>
      </form>
    </div>
  );
}
