import React from "react";
import { LuMenu } from "react-icons/lu";
import { signOut } from "next-auth/react";
import { removeUser } from "@/app/Redux/appSlices";
import { useDispatch, useSelector } from "react-redux";

function BottomHeader() {
  let dispatch = useDispatch();
  let user = useSelector((store) => store.app.user);
  let menu = [
    "Todays Deals",
    "Customer Service",
    "Registry",
    "Gift Cards",
    "Sell",
  ];
  function signOutClicked() {
    signOut();
    dispatch(removeUser());
  }
  return (
    <section
      className="w-full h-[40px] bg-amazon_light text-sm text-white px-4 flex 
    items-center"
    >
      {/* all menu with icon */}
      <p
        className="flex items-center gap-2 h-8 px-2 border border-transparent hover:border-white 
      cursor-pointer duration-300"
      >
        <LuMenu className="text-xl" /> All
      </p>
      {/* menu array */}
      {menu.map((item, index) => (
        <p
          key={index}
          className="hidden md:inline-flex items-center h-8 px-2 border border-transparent
         hover:border-white cursor-pointer duration-300"
        >
          {item}
        </p>
      ))}
      {/* sign out button & only render if user is signed in*/}
      {user?.email && (
        <button
          onClick={signOutClicked}
          className=" md:inline-flex items-center h-8 px-2 border border-transparent 
        hover:border-red-600 hover:text-red-400 text-amazon_yellow cursor-pointer 
        duration-300"
        >
          Sign Out
        </button>
      )}
    </section>
  );
}

export default BottomHeader;
