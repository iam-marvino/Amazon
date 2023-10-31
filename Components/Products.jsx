"use client";
import React from "react";
import { useEffect } from "react";
import Image from "next/image";
import { HiShoppingCart } from "react-icons/hi";
import { FaHeart } from "react-icons/fa";
import { useDispatch } from "react-redux";
import {
  addedToFavorite,
  addedToCart,
  pushToAllProducts,
  updateCart,
  updateFavorite,
} from "@/Redux/appSlices";

import { useRouter } from "next/navigation";
import Link from "next/link";

function Products({ productData }) {
  let router = useRouter();
  let dispatch = useDispatch();

  // function to add an item to cart
  function itemAddedToCart(item) {
    dispatch(addedToCart(item));
  }

  // function to add an item to favorite
  function itemAddedToFavorite(item) {
    dispatch(addedToFavorite(item));
  }

  // useEffect to push all product data to state on component mount
  useEffect(() => {
    function saveAllProducts() {
      dispatch(pushToAllProducts(productData));
    }
    saveAllProducts();
  }, []);

  // the use effect gets the data from local storage converts it from a string
  //  and dispatches it into redux state
  useEffect(() => {
    try {
      function getLocal() {
        let cartLocal = JSON.parse(localStorage.getItem("cartItems"));
        let favoriteLocal = JSON.parse(localStorage.getItem("favoriteItems"));
        if (cartLocal !== null && cartLocal.length > 0) {
          dispatch(updateCart(cartLocal));
        }
        if (favoriteLocal !== null && favoriteLocal.length > 0) {
          dispatch(updateFavorite(favoriteLocal));
        }
      }
      getLocal();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <section className="w-full px-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {/* productData mapping */}
      {productData?.map((item) => (
        <div
          className="w-full bg-white text-black p-4 border border-gray-300 
          rounded-lg group overflow-hidden"
          key={item._id}
        >
          <div className=" w-full h-[260px] relative">
            {/* product image */}
            <Link
              href={{
                pathname: `/${item._id}`,
                query: {
                  id: item._id,
                  brand: item.brand,
                  category: item.category,
                  description: item.description,
                  image: item.image,
                  isNew: item.isNew,
                  oldPrice: item.oldPrice,
                  price: item.price,
                  title: item.title,
                },
              }}
            >
              <div style={{ position: "relative", height: "100%" }}>
                <Image
                  src={item.image}
                  alt={`id${item._id}+title${item.title}`}
                  fill
                  sizes="100%"
                  className=" object-cover scale-90 hover:scale-100 
                  transition-transform duration-300"
                />
              </div>
            </Link>
            <hr />
            {/* interactive add to favorite and cart pop up */}
            <div
              className="w-12 h-24 absolute bottom-10 right-0 border-[1px] border-gray-400
             bg-white rounded-md flex flex-col translate-x-20 group-hover:translate-x-0
              transition-transform duration-300"
            >
              <span
                onClick={() => itemAddedToCart(item)}
                className="w-full h-full border-b-[1px] border-b-gray-400 flex items-center 
              justify-center text-xl bg-transparent hover:bg-amazon_yellow cursor-pointer 
              duration-300"
              >
                <HiShoppingCart />
              </span>
              <span
                onClick={() => itemAddedToFavorite(item)}
                className="w-full h-full border-b-[1px] border-b-gray-400 flex items-center 
              justify-center text-xl bg-transparent hover:bg-amazon_yellow cursor-pointer 
              duration-300"
              >
                <FaHeart />
              </span>
            </div>
            {/* discount */}
            <p
              className="absolute top-0 right-0 text-amazon_blue font-medium text-xs 
              tracking-wide animate-bounce"
            >
              !save ${(item.price * 0.2).toFixed(2)}
            </p>
          </div>
          <hr />
          {/* remaining product properties */}
          <div className="px-4 py-3 flex flex-col gap-1">
            <p className="text-xs text-gray-500 tracking-wide">
              {item.category}
            </p>
            <p className="text-base font-medium">{item.title}</p>
            <p className="flex items-center gap-2">
              <span className="text-sm line-through">
                ${(item.price * 1.1).toFixed(2)}
              </span>
              <span className="text-amazon_blue font-semibold">
                ${(item.price * 0.9).toFixed(2)}
              </span>
            </p>
            <p className="text-xs text-gray-600 text-justify">
              {item.description.substring(0, 120)}
            </p>
            <button
              onClick={() => itemAddedToCart(item)}
              className="h-10 font-medium bg-amazon_blue text-white rounded-md 
              hover:bg-amazon_yellow hover:text-black duration-300 mt-2"
            >
              add to cart
            </button>
          </div>
        </div>
      ))}
    </section>
  );
}

export default Products;
