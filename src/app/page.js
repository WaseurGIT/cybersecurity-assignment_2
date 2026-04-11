"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import FoodCard from "./components/FoodCard/page";

export default function Home() {
  const [foods, setFoods] = useState([]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Login", path: "/login" },
  ];

  useEffect(() => {
    axios.get("foods.json").then((res) => setFoods(res.data));
  }, []);

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black mt-5">
      <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200">
        Welcome to Cyber Food 
      </h1>
      <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
        Discover delicious recipes and manage your meals with ease.
      </p>

      <div className="my-5">
        {navLinks.map((link) => (
          <a
            key={link.name}
            href={link.path}
            className="text-orange-500 hover:underline mx-2"
          >
            {link.name}
          </a>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-2">
        {foods.map((food) => (
          <FoodCard key={food.id} food={food} />
        ))}
      </div>
    </div>
  );
}
