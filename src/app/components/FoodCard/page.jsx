"use client";
import React from "react";

const FoodCard = ({ food }) => {
  return (
    <div className="bg-white dark:bg-zinc-900 shadow-md rounded-xl p-4 m-2 w-96">
      <img
        src={food.image}
        alt={food.name}
        className="w-full h-40 object-cover rounded-lg"
      />

      <h2 className="text-xl font-semibold mt-3 text-gray-800 dark:text-gray-200">
        {food.name}
      </h2>

      <p className="text-sm text-gray-500 dark:text-gray-400">
        Category: {food.category}
      </p>

      <div className="flex justify-between mt-2">
        <span className="text-green-600 font-bold">${food.price}</span>
        <span className="text-yellow-500">⭐ {food.rating}</span>
      </div>

      <p
        className={`mt-2 text-sm font-medium ${
          food.isAvailable ? "text-green-500" : "text-red-500"
        }`}
      >
        {food.isAvailable ? "Available" : "Not Available"}
      </p>

      <div className="btn btn-accent mt-4 w-full text-white">Details</div>
    </div>
  );
};

export default FoodCard;
