"use client";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import FoodCard from "./components/FoodCard/page";
import Link from "next/link";
import { AuthContext } from "./AuthProvider";
import axiosSecure from "./api/axiosSecure";
import { useRouter } from "next/navigation";

export default function Home() {
  const [foods, setFoods] = useState([]);
  const { user, logout } = useContext(AuthContext);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await axiosSecure.post("/logout");
      logout();
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const navLinks = [{ name: "Home", path: "/" }];

  useEffect(() => {
    axiosSecure.get("/foods").then((res) => setFoods(res.data));
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-zinc-50 dark:bg-black">
      <nav className="bg-white dark:bg-zinc-900 shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl md:text-3xl font-bold text-orange-500">
              Cyber Assignment
            </h1>
            <div className="flex gap-4 md:gap-8 items-center">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.path}
                  className="text-gray-700 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 font-medium transition-colors"
                >
                  {link.name}
                </Link>
              ))}

              {user ? (
                <div className="flex items-center gap-4">
                  <span className="text-gray-700 dark:text-gray-300 font-medium hidden sm:inline">
                    {user.name || user.email}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-lg transition-colors duration-200"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex gap-2 sm:gap-4">
                  <Link
                    href="/login"
                    className="text-orange-500 hover:text-orange-600 font-semibold transition-colors"
                  >
                    Login
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-zinc-900 dark:to-zinc-800 py-16 px-4 border-b border-gray-200 dark:border-zinc-700">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4">
            Welcome to Cyber Assignment
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            Discover exciting coding challenges and enhance your skills.
          </p>
        </div>
      </div>

      {/* <div className="flex-1 max-w-7xl mx-auto w-full px-4 py-12">
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
            Featured Challenges
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Explore our collection of delicious and nutritious meals
          </p>
        </div>
        {foods.length === 0 ? (
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mb-4"></div>
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                Loading meals...
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {foods.map((food, index) => (
              <FoodCard key={index} food={food} />
            ))}
          </div>
        )}
      </div> */}

      <footer className="bg-gray-100 dark:bg-zinc-900 border-t border-gray-200 dark:border-zinc-700 py-8 px-4">
        <div className="max-w-7xl mx-auto text-center text-gray-600 dark:text-gray-400">
          <p className="mb-2">
            &copy; 2026 Cyber Assignment. All rights reserved.
          </p>
          <div>
            Submitted by:
            <div className="flex flex-col md:flex-row justify-center items-center gap-4 mt-2">
              <div>
                <span className="font-semibold text-orange-500">
                  Md. Waseur Rahman
                </span>
                <h1>Id: 22234103308</h1>
              </div>
              <div>
                <span className="font-semibold text-orange-500">
                  Rakebul Hasan Mehedi
                </span>
                <h1>Id: 22234103311</h1>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
