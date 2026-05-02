"use client";

import React, { useState } from "react";
import axiosSecure from "../api/axiosSecure";
import Swal from "sweetalert2";
import Link from "next/link";
import { FaArrowLeft, FaEnvelope, FaLock } from "react-icons/fa";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

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
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-black p-4 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-orange-500 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-500 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
      </div>

      <Link
        href="/login"
        className="absolute top-8 left-8 text-slate-300 hover:text-orange-400 flex items-center gap-2 font-semibold text-sm transition-all duration-300 group hover:gap-3"
      >
        <FaArrowLeft className="group-hover:-translate-x-1 transition-transform duration-300" />
        Back
      </Link>

      <div className="w-full max-w-7xl relative z-10">
        <form
          onSubmit={handleSubmit}
          className="rounded-3xl shadow-2xl p-12 transition-all duration-500 hover:shadow-2xl hover:shadow-orange-500/10"
        >
          <div className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl opacity-60"></div>


          <div className="text-center">
            <h1 className="text-4xl font-black tracking-tight">
              Recover Access
            </h1>
          </div>

          <div className="flex justify-center mb-6">
            <div className="w-16 h-1.5 rounded-full"></div>
          </div>

          <p className="text-slate-300 text-center text-sm mb-10 leading-relaxed">
            Enter your email and we&apos;ll send you a secure reset link.
          </p>

          <div className="mb-8">
            <label className="block text-md font-bold tracking-widest">
              Email Address
            </label>
            <div className="relative px-12">
              <div className="absolute inset-0 rounded-2xl opacity-0 group-focus-within:opacity-20 transition duration-500 blur-lg"></div>
              <div className="relative flex items-center border-2 border-slate-600 group-focus-within:border-orange-400  rounded-2xl px-6 py-4 transition-all duration-300 backdrop-blur-sm">
                {/* <FaEnvelope className="text-orange-400 text-lg mr-4 flex-shrink-0" /> */}
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className=" bg-transparent outline-none font-medium transition-colors duration-300"
                  required
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading || !email}
            className="w-full relative group/btn mb-6"
          >
            <div className="absolute inset-0 rounded-2xl blur-lg opacity-75 group-hover/btn:opacity-100 transition duration-300 group-disabled/btn:opacity-0"></div>
            <div className="relative w-full disabled:from-slate-600 disabled:to-slate-700 disabled:cursor-not-allowed font-bold py-4 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] active:scale-95 disabled:scale-100 shadow-lg text-base tracking-wide uppercase">
              {isLoading ? (
                <span className="flex items-center justify-center gap-3">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Sending...</span>
                </span>
              ) : (
                "Send Reset Link"
              )}
            </div>
          </button>

          <div className="bg-blue-500/15 border border-blue-400/30 rounded-2xl p-4 mb-6 backdrop-blur-sm">
            <p className="text-xs text-slate-200 flex items-center gap-3">
              <span className="text-lg">ℹ️</span>
              <span>Check your inbox and spam folder within 5 minutes.</span>
            </p>
          </div>

          <div className="flex items-center gap-3 mb-6">
            <div className="h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent flex-1"></div>
            <span className="text-slate-500 text-xs font-bold">SECURE</span>
            <div className="h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent flex-1"></div>
          </div>

          <div className="text-center">
            <p className="text-slate-400 text-xs">
              Remember your password?
              <Link href="/login" className="text-orange-400 hover:text-orange-300 font-semibold transition-colors">
                Sign In
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
