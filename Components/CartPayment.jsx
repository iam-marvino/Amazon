"use client"
import React from "react";
import { SiMediamarkt } from "react-icons/si";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useSelector } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";

function CartPayment() {
  let cartItems = useSelector((store) => store.app.cartItems);
  let user = useSelector((store) => store.app.user);
  let [totalAmount, setTotalAmount] = useState(0);

 useEffect(() => {
   let total = cartItems.reduce(
     (total, current) => total + current.price * 1.1 * current.quantity,
     0
   );
   setTotalAmount(total);
 }, [cartItems]);

  // Stripe payment
  // const stripePromise = loadStripe(
  //   process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  // );
  // const session = useSession().data; // Fix here: useSession().data

  // async function CheckoutClicked() {
  //   const stripe = await stripePromise;

  //   const response = await fetch('/api/checkout', {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ items: cartItems, email: session?.user?.email }),
  //   });
  //   const checkoutSession = await response.json();

  //   const result = await stripe?.redirectToCheckout({
  //     sessionId: checkoutSession.id,
  //   });
  //   if (result.error) {
  //     alert(result?.error.message);
  //   }
  // }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <span
          className="bg-green-600 rounded-full p-1 h-6 w-6 text-sm 
          text-white flex items-center justify-center mt-1"
        >
          <SiMediamarkt />
        </span>
        {/* order info */}
        <p className="text-sm">
          Your order qualifies for FREE Shipping by choosing this option at
          checkout. See details....
        </p>
      </div>
      {/* Total price of items in cart */}
      <p className="flex items-center justify-between px-2 font-semibold">
        Total: $
        <span className="font-bold text-xl">{totalAmount.toFixed(2)}</span>
      </p>
      {user ? (
        <div className="flex flex-col items-center">
          {/* button to continue purchase */}
          <button
            // onClick={CheckoutClicked}
            className="w-full h-10 text-sm font-semibold bg-amazon_blue 
            text-white rounded-lg hover:bg-amazon_yellow 
            hover:text-black duration-300"
          >
            Proceed to Buy
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <button
            className="w-full h-10 text-sm font-semibold bg-amazon_blue
           bg-opacity-50 text-white rounded-lg cursor-not-allowed"
          >
            Proceed to Buy
          </button>
          <p className="text-xs mt-1 text-red-500 font-semibold animate-bounce">
            Please login to continue
          </p>
        </div>
      )}
    </div>
  );
}

export default CartPayment;
