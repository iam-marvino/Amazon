import React from "react";
import TopHeader from "./TopHeader";
import BottomHeader from "./BottomHeader";

function Header() {
  return (
    <header className="w-full pt-5 md:pt-0 bg-amazon_blue
     text-lightText sticky top-0 z-50 flex flex-col ">
      <TopHeader />
      <BottomHeader />
    </header>
  );
}

export default Header;
