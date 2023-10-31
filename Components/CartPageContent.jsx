"use client";
import React from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import CartProducts from "./CartProducts";
import { useDispatch } from "react-redux";
import { resetCart } from "@/Redux/appSlices";
import CartPayment from "@/Components/CartPayment";

function CartPageContent() {
  // saving all items in cart Redux state to the cart item variable
  let cartItems = useSelector((store) => store.app.cartItems);

  let dispatch = useDispatch();

  // function to confirm cart reset ? if yes dispatch the resetCart from redux
  function handleResetCart() {
    const confirmReset = window.confirm(
      "Are you sure to reset your items from the cart?"
    );
    if (confirmReset) {
      dispatch(resetCart());
    }
  }
  return (
    <section className="px-6 flex gap-5 py-4 flex-col lg:flex-row">
      {/* render if the items in the cart is greater than 0 */}
      {cartItems.length > 0 ? (
        <>
          <div className="bg-white  p-4 rounded-lg">
            <div
              className="flex items-center justify-between border-b-[1px] 
              border-b-gray-400 pb-1"
            >
              <p className="text-2xl font-semibold text-amazon_blue">
                Shopping Cart
              </p>
              <p className="text-lg font-semibold text-amazon_blue">
                Sub-Total
              </p>
            </div>

            <div className="pt-2 flex flex-col gap-2">
              {cartItems.map((item) => (
                <div key={item._id}>
                  {/* CartProduct is the container holding the structure of  the 
                  each product been rendered */}
                  <CartProducts item={item} />
                </div>
              ))}
              {/*button to reset cart  */}
              <button
                onClick={handleResetCart}
                className="w-44 h-10 font-semibold bg-gray-200 rounded-lg 
                hover:bg-red-600 hover:text-white duration-300"
              >
                reset cart
              </button>
            </div>
          </div>
          {/* Cart Payment */}
          <div
            className="bg-white h-64 col-span-1 p-4 rounded-lg flex 
            items-center justify-center"
          >
            <CartPayment />
          </div>
        </>
      ) : (
        // render this if cart is empty
        <div className="bg-white w-full h-[80vh]  col-span-5 flex flex-col items-center justify-center py-5 rounded-lg shadow-lg">
          <h1 className="text-lg font-medium">Your cart is empty!</h1>
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

export default CartPageContent;
