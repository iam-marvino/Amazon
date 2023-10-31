"use client";
import React from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { resetFavorite } from "@/Redux/appSlices";
import FavoriteProducts from "@/Components/FavoriteProducts";

function FavoritePageContent() {
  let dispatch = useDispatch();
  let favorite = useSelector((store) => store.app.favoriteItems);

  function handleResetFavorite() {
    const confirmReset = window.confirm(
      "Are you sure you wanna reset your Favorite items?"
    );
    if (confirmReset) {
      dispatch(resetFavorite());
    }
  }
  return (
    <section className="px-6 flex gap-5 py-4 flex-col md:flex-row">
      {/* render if the items in the cart is greater than 0 */}
      {favorite.length > 0 ? (
        <>
          <div className="bg-white  p-4 rounded-lg">
            <div
              className="flex items-center justify-between border-b-[1px] 
              border-b-gray-400 pb-1"
            >
              <p className="text-2xl font-semibold text-amazon_blue">
                Favorite Products
              </p>
            </div>

            <div className="pt-2 flex flex-col gap-2">
              {favorite.map((item) => (
                <div key={item._id + item.title}>
                  {/* CartProduct is the container holding the structure of  the 
                  each product been rendered */}
                  <FavoriteProducts item={item} />
                </div>
              ))}
              {/*button to reset cart  */}
              <button
                onClick={handleResetFavorite}
                className="w-44 h-10 font-semibold bg-gray-200 rounded-lg 
                hover:bg-red-600 hover:text-white duration-300"
              >
                reset favorite
              </button>
            </div>
          </div>
        </>
      ) : (
        // render this if favorite is empty
        <div
          className="bg-white w-full h-[80vh] col-span-5 flex flex-col items-center 
          justify-center py-5 rounded-lg shadow-lg"
        >
          <h1 className="text-lg font-medium">Your favorite is empty!</h1>
          <Link href={"/"}>
            <button
              className="w-52 h-10 bg-amazon_blue text-white rounded-lg 
              text-sm font-semibold hover:bg-amazon_yellow hover:text-black"
            >
              go to shopping
            </button>
          </Link>
        </div>
      )}
    </section>
  );
}

export default FavoritePageContent;
