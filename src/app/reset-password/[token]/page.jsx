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
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decorative elements */}
      {/* <div className="absolute top-0 left-0 w-96 h-96 bg-orange-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div> */}

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-7xl mx-auto  rounded-2xl shadow-2xl p-8 backdrop-blur-sm relative z-10"
      >
        <div className="py-4 mb-8 text-center">
          <h1 className="text-4xl font-bold bg-clip-text text-transparent mb-3">
            Reset Password
          </h1>
          <p className="text-slate-400 text-sm leading-relaxed">
            Create a strong password to secure your account.
          </p>
        </div>

        <div className="relative mb-5 group border border-slate-600">
          <div className="absolute inset-0 z-0 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg opacity-0 group-focus-within:opacity-100 transition duration-300 blur"></div>
          <div className="relative flex items-center border border-slate-600 group-focus-within:border-orange-400 rounded-lg px-4 py-3 bg-slate-700 transition-all duration-200">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="New password"
              className="w-full bg-transparent outline-none text-sm"
              required
            />
          </div>
        </div>

        <div className="relative mb-6 group border border-slate-600">
          <div className="absolute inset-0 z-0 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg opacity-0 group-focus-within:opacity-100 transition duration-300 blur"></div>
          <div className="relative flex items-center border border-slate-600 group-focus-within:border-orange-400 rounded-lg px-4 py-3 bg-slate-700 transition-all duration-200">
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm password"
              className="w-full bg-transparent outline-none text-slate-100 placeholder-slate-500 text-sm"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-green-500 cursor-pointer font-semibold py-3 rounded-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-95 shadow-lg hover:shadow-orange-500/50"
        >
          Update Password
        </button>

        <p className="text-center text-slate-500 text-xs mt-6">
          Make sure your password is at least 8 characters long
        </p>
      </form>
    </div>
  );
}
