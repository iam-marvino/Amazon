"use client";
import React from "react";
import Image from "next/image";
import { LuMinus, LuPlus } from "react-icons/lu";
import { IoMdClose } from "react-icons/io";
import { useDispatch } from "react-redux";
import {
  increaseQuantity,
  decreaseQuantity,
  removedFromCart,
} from "@/Redux/appSlices";

function CartProducts({ item }) {
  let dispatch = useDispatch();
  let itemPrice = (item.price * 1.1).toFixed(2);

  return (
    <section
      className="bg-gray-100 rounded-lg flex flex-col z
    md:flex-row items-center gap-5 pb-6"
    >
      {/* item Image */}
      <div style={{ position: "relative", height: "150px", width: "200px" }}>
        <Image
          fill
          sizes="100%"
          src={item.image}
          style={{ objectFit: "cover" }}
          alt="productImage"
        />
      </div>
      {/* item text and button section */}
      <div className="flex flex-col md:flex-row  items-center px-2 gap-4">
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
              className="flex items-center mt-1 justify-between border border-gray-300 px-4 py-1
             rounded-full w-28 shadow-lg shadow-gray-300"
            >
              {/* onclick increase item Quantity  */}
              <span
                onClick={() => dispatch(increaseQuantity(item))}
                className="w-6 h-6 flex items-center justify-center rounded-full text-base
                 bg-transparent hover:bg-gray-300 cursor-pointer decoration-purple-300"
              >
                <LuPlus />
              </span>
              <span>{item.quantity}</span>
              {/* button to delete an item from cart*/}
              <span
                onClick={() => dispatch(decreaseQuantity(item))}
                className="w-6 h-6 flex items-center justify-center rounded-full text-base
                 bg-transparent hover:bg-gray-300 cursor-pointer decoration-purple-300"
              >
                <LuMinus />
              </span>
            </div>
            <div
              onClick={() => dispatch(removedFromCart(item))}
              className="flex items-center text-sm font-medium text-gray-400 
              hover:text-red-600 cursor-pointer duration-300"
            >
              <IoMdClose className="mt-[2px]" /> <p>remove</p>
            </div>
          </div>
        </div>
        {/* Total price */}
        <div className="text-lg font-semibold text-amazon_blue">
          ${(itemPrice * item.quantity).toFixed(2)}
        </div>
      </div>
    </section>
  );
}

export default CartProducts;
