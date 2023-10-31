"use client";
import React from "react";
import Image from "next/image";
import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { addedToCart, removedFromFavorite } from "@/Redux/appSlices";
import { HiShoppingCart } from "react-icons/hi";

function FavoriteProducts({ item }) {
  let dispatch = useDispatch();

  return (
    <section
      className="bg-gray-100 rounded-lg flex flex-col md:flex-row 
    items-center gap-10 pb-6"
    >
      {/* item Image */}
      <div style={{ position: "relative", height: "150px", width: "150px" }}>
        <Image
          src={item.image}
          alt="productImage"
          fill
          sizes="100%"
          className="object-cover"
        />
      </div>
      {/* item text and button section */}
      <div className="flex flex-row  items-center px-2 gap-4">
        <div className="flex flex-col gap-1">
          <p className="text-lg font-semibold text-amazon_blue">{item.title}</p>
          <p className="text-sm text-gray-600">{item.description}</p>
          <p className="text-sm text-gray-600">
            Unit Price{" "}
            <span className="font-semibold text-amazon_blue">
              ${item.price}
            </span>
          </p>
          {/* increase and decrease Quantity Section */}
          <div className="flex items-center gap-6">
            <div
              onClick={() => dispatch(removedFromFavorite(item))}
              className="flex items-center text-sm font-medium text-gray-400 
              hover:text-red-600 cursor-pointer duration-300"
            >
              <IoMdClose className="mt-[2px]" /> <p>remove from favorite</p>
            </div>
            <div
              onClick={() => dispatch(addedToCart(item))}
              className="flex items-center text-sm font-medium text-gray-400 
               hover:text-green-600 cursor-pointer duration-300"
            >
              <HiShoppingCart />
              <p>Add to cart</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FavoriteProducts;
