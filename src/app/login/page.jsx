"use client";
import Link from "next/link";
import React, { useContext, useState } from "react";
import { FaUser, FaLock, FaArrowLeft } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import axiosSecure from "../api/axiosSecure";
import Swal from "sweetalert2";
import { AuthContext } from "../AuthProvider";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const router = useRouter();
  const { login } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState("password");
  const [loginEmail, setLoginEmail] = useState("");
  const [otp, setOtp] = useState("");

  const handleLoginForm = async (e) => {
    e.preventDefault();
    const form = e.target;

    if (step === "password") {
      const email = form.email.value;
      const password = form.password.value;

      if (!email || !password) {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: "Please fill in all required fields.",
          confirmButtonText: "OK",
        });
        return;
      }

      if (!/\S+@\S+\.\S+/.test(email)) {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: "Please enter a valid email address.",
          confirmButtonText: "OK",
        });
        return;
      }

      try {
        const res = await axiosSecure.post("/login", { email, password });

        if (res.data.requiresTwoFactor) {
          setLoginEmail(res.data.email);
          setStep("otp");
          Swal.fire({
            icon: "info",
            title: "Verification code sent",
            text: "Check your email and enter the OTP.",
            confirmButtonText: "OK",
          });
          return;
        }
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text:
            err.response?.data?.message || "An error occurred during login.",
          confirmButtonText: "OK",
        });
      }
    }

    if (step === "otp") {
      try {
        const res = await axiosSecure.post("/verify-2fa", {
          email: loginEmail,
          otp,
        });

        login(res.data.user);

        Swal.fire({
          icon: "success",
          title: "Login Successful",
          text: "You have logged in successfully!",
          confirmButtonText: "OK",
        });

        form.reset();
        setStep("password");
        setOtp("");
        router.push("/");
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: "Verification Failed",
          text: err.response?.data?.message || "Invalid verification code.",
          confirmButtonText: "OK",
        });
      }
    }
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
      <div className="flex w-full max-w-4xl bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl overflow-hidden">
        <div className="w-1/2 hidden md:flex items-center justify-center overflow-hidden">
          <img
            src="https://i.ibb.co.com/k2tj6ZrT/roasted-beans.jpg"
            alt="restaurant"
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>

        <form
          className="w-full md:w-1/2 flex flex-col justify-center px-6 md:px-10 py-8"
          onSubmit={handleLoginForm}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-2">
            Welcome Back
          </h2>

          <p className="text-gray-600 dark:text-gray-300 mb-8 text-sm md:text-base">
            Login to explore delicious meals
          </p>

          <div className="flex items-center border-2 border-gray-300 dark:border-zinc-700 rounded-lg px-4 py-3 mb-4 bg-gray-50 dark:bg-zinc-800 hover:border-orange-500 transition-colors">
            <FaUser className="text-gray-500 dark:text-gray-400 mr-3" />
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

          {step === "otp" && (
            <div className="flex items-center border-2 border-gray-300 dark:border-zinc-700 rounded-lg px-4 py-3 mb-4 bg-gray-50 dark:bg-zinc-800 hover:border-orange-500 transition-colors">
              <input
                type="text"
                name="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter OTP"
                className="w-full bg-transparent outline-none text-gray-700 dark:text-white placeholder-gray-500"
                required
              />
            </div>
          )}

          <div className="flex justify-between items-center text-sm mb-6">
            {/* <label className="flex items-center gap-2 text-gray-600 dark:text-gray-400 cursor-pointer hover:text-gray-800 dark:hover:text-gray-200">
              <input type="checkbox" className="cursor-pointer" />
              Remember me
            </label> */}
            <a
              href="/forgot-password"
              className="text-orange-500 hover:text-orange-600 font-medium transition-colors"
            >
              Forgot password?
            </a>
          </div>

          <button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg transition duration-300 shadow-md hover:shadow-lg">
            {step === "password" ? "Login" : "Verify OTP"}
          </button>

          <div className="flex items-center my-6">
            <hr className="flex-1 border-gray-300 dark:border-zinc-700" />
            <span className="mx-3 text-gray-500 text-sm font-medium">OR</span>
            <hr className="flex-1 border-gray-300 dark:border-zinc-700" />
          </div>

          <button
            type="button"
            className="border-2 border-gray-300 dark:border-zinc-700 py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-100 dark:hover:bg-zinc-800 transition duration-200 font-medium"
          >
            <FcGoogle size={20} />
            Continue with Google
          </button>

          <p className="text-sm text-center mt-6 text-gray-600 dark:text-gray-400">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="text-orange-500 cursor-pointer hover:text-orange-600 font-semibold transition-colors"
            >
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
