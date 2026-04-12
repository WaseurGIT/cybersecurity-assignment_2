"use client";
import axiosSecure from "@/app/api/axiosSecure";
import { AuthContext } from "@/app/AuthProvider";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";

const Page = () => {
  const { user, loading } = useContext(AuthContext);
  const { id } = useParams();
  const [food, setFood] = useState(null);

  useEffect(() => {
    if (loading) return;

    if (!user) {
      console.log("User not logged in");
      return;
    }

    if (!id) return;

    axiosSecure
      .get(`/foods/${id}`)
      .then((res) => {
        console.log(res.data.food);
        setFood(res.data.food);
      })
      .catch((err) => console.error("Failed to fetch food details:", err));
  }, [id]);

  if (!food) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 py-8 px-4">
      <div className="max-w-5xl mx-auto ">
        <button
          onClick={() => window.history.back()}
          className="cursor-pointer mb-6 px-4 py-2 text-orange-600 hover:text-orange-700 font-semibold flex items-center gap-2"
        >
          ← Back
        </button>

        <div className="bg-white rounded-2xl shadow-2xl p-4 overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8 p-8">
            <div>
              <img
                src={food.image}
                alt={food.name}
                className="w-full h-96 object-cover rounded-xl"
              />
            </div>

            <div>
              <span className="bg-orange-100 text-orange-700 px-3 py-3 rounded-full text-sm">
                {food.category}
              </span>

              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold mt-3">{food.name}</h1>

                <div>
                  <p className="mt-2 text-sm">⭐ {food.rating}</p>
                  <p className="text-sm text-gray-600">{food.calories} cal</p>
                </div>
              </div>

              <p className="text-xl text-orange-600 font-bold mt-4">
                ${food.price}
              </p>

              <div className="mt-6">
                <h2 className="font-bold mb-2">Ingredients</h2>

                {Array.isArray(food.ingredients) ? (
                  <div className="flex flex-wrap gap-2">
                    {food.ingredients.map((item, i) => (
                      <span
                        key={i}
                        className="bg-gray-100 px-4 py-1 rounded-full"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p>No ingredients</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {food.description && (
          <div className="mt-6 bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-bold mb-2">About</h2>
            <p>{food.description}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
