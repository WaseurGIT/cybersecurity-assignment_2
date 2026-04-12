"use client";
import { AuthContext } from "@/app/AuthProvider";
import Link from "next/link";
import React, { useContext } from "react";

const FoodCard = ({ food }) => {
  const {user} = useContext(AuthContext)
  return (
    <div className="bg-white dark:bg-zinc-900 shadow-md hover:shadow-lg rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 h-full flex flex-col">
      <div className="overflow-hidden h-48">
        <img
          src={food.image}
          alt={food.name}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
        />
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h2 className="text-lg md:text-xl font-semibold text-gray-800 dark:text-gray-200 line-clamp-2">
          {food.name}
        </h2>

        <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 mt-1">
          {food.category}
        </p>

        <div className="flex justify-between items-center mt-3 mb-3">
          <span className="text-lg font-bold text-green-600 dark:text-green-400">
            ${food.price}
          </span>
          <span className="text-yellow-500 font-semibold">
            ⭐ {food.rating}
          </span>
        </div>

        <p
          className={`text-xs md:text-sm font-semibold mb-4 ${
            food.isAvailable
              ? "text-green-600 dark:text-green-400"
              : "text-red-600 dark:text-red-400"
          }`}
        >
          {food.isAvailable ? "✓ Available" : "✗ Not Available"}
        </p>

        {user ? <Link
          href={`/foodDetails/${food._id}`}
          className="mt-auto bg-orange-500 hover:bg-orange-600 w-full py-2 rounded-lg text-white font-semibold transition-colors duration-200 text-center"
        >
          View Details
        </Link> : <Link
          href="/login"
          className="mt-auto bg-orange-500 hover:bg-orange-600 w-full py-2 rounded-lg text-white font-semibold transition-colors duration-200 text-center"
        >
          Login to View Details
        </Link>}
      </div>
    </div>
  );
};

export default FoodCard;
