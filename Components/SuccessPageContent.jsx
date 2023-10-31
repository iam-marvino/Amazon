"use client";
import React from "react";
import { resetCart } from "@/Redux/appSlices";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

function SuccessPageContent() {
  let dispatch = useDispatch();
  let router = useRouter();
  return (
    <>
      <h1 className="text-2xl text-hoverBg font-semibold">
        Thank you for shopping @ amazon By Marvino
      </h1>
      {/* onclick of this p tag, will empty cart and rout user to home-page */}
      <p
        onClick={() => {
          dispatch(resetCart());
          router.push("/");
        }}
        className="text-lg text-gray-500 hover:underline underline-offset-4 
        decoration-[1px] hover:text-blue-600 duration-300 cursor-pointer"
      >
        Continue Shopping
      </p>
    </>
  );
}

export default SuccessPageContent;
