import React from "react";
import Image from "next/image";
import logo from "../../public/logo.png";

function Footer() {
  return (
    <footer
      className="w-full  px-6 md:px-0 h-full md:h-20 bg-amazon_light
     text-gray-300 flex flex-col md:flex-row  items-center justify-center
      gap-8 md:gap-4 pt-4 md:pt-0 pb-4 md:pb-0"
    >
      <Image width={96} height={96} src={logo} alt="logo" />
      <p className="text-sm -mt-4">
        All rights reserved
        <a
          className="hover:text-white hover:underline
           decoration-[1px] cursor-pointer duration-300"
          href="https://marvino.vercel.app/"
          target="_blank"
        >
          @marvino.vercel.app
        </a>
      </p>
    </footer>
  );
}

export default Footer;
