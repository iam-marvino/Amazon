"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import logo from "../../public/logo.png";
import cartIcon from "../../public/cartIcon.png";
import { BiCaretDown } from "react-icons/bi";
import { HiOutlineSearch } from "react-icons/hi";
import { SlLocationPin } from "react-icons/sl";
import { useSelector } from "react-redux";
import { addUser } from "@/Redux/appSlices";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { useSession, signIn } from "next-auth/react";
import SearchedProducts from "./SearchedProducts";
import Link from "next/link";

function TopHeader() {
  let session = useSession();
  let user = useSelector((store) => store.app.user);
  let products = useSelector((store) => store.app.allProducts);
  let router = useRouter();
  let dispatch = useDispatch();
  let cart = useSelector((store) => store.app.cartItems);
  let favorite = useSelector((store) => store.app.favoriteItems);
  let inputRef = useRef();

  // on signIn dispatch user data to redux state
  useEffect(() => {
    if (session) {
      dispatch(
        addUser({
          name: session?.data?.user?.name,
          email: session?.data?.user?.email,
          image: session?.data?.user?.image,
        })
      );
    }
  }, [session]);

  // item searching functionality
  let [searchedItem, setSearchedItem] = useState("");
  let [filteredProducts, setFilteredProducts] = useState([]);

  function handleSearch() {
    setSearchedItem(inputRef.current.value);
  }

  useEffect(() => {
    let filtered = products.filter((item) =>
      item.title.toLowerCase().includes(searchedItem.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchedItem]);

  return (
    <section>
      <div
        className=" p-0 md:p-2 h-full w-full mx-auto inline-flex items-center 
        justify-between gap-1  mdl:gap-3 md:px-4 px-2"
      >
        {/* logo */}
        <div
          onClick={() => router.push("/")}
          className="px-2 border border-transparent hover:border-white 
          cursor-pointer duration-300 flex items-center justify-center h-[70%]"
        >
          <Image
            src={logo}
            alt="logo"
            width={96}
            height={96}
            style={{ objectFit: "cover", marginTop: "4px" }}
          />
        </div>
        {/* location */}
        <div
          className="hidden xl:inline-flex items-center justify-center 
          h-[70%] px-2 py-5 border border-transparent 
          hover:border-white cursor-pointer duration-300 gap-1"
        >
          <SlLocationPin />
          <div className=" text-xs">
            <p>Deliver to</p>
            <p className="text-white font-bold uppercase">USA</p>
          </div>
        </div>
        {/* Search Bar */}
        <div
          className="hidden lg:flex-1 h-10 lg:inline-flex items-center 
        justify-between relative"
        >
          <input
            type="text"
            ref={inputRef}
            onChange={handleSearch}
            placeholder="Search for product"
            className="w-full h-full rounded-md px-2 placeholder:text-sm 
            text-base text-black border-[3px] border-transparent 
            outline-none focus-visible:border-amazon_yellow"
          />
          <span
            className="w-12 h-full bg-amazon_yellow text-black
           text-2xl flex items-center justify-center absolute right-0 
           rounded-tr-md rounded-br-md"
          >
            <HiOutlineSearch />
          </span>
          {/*  Search-field  */}
          {searchedItem && (
            <div
              className="absolute left-0 top-12 w-full mx-auto max-h-96
             bg-gray-200 rounded-lg overflow-y-scroll cursor-pointer
              text-black"
            >
              {/*Filtered */}
              {filteredProducts.length > 0 ? (
                <>
                  {searchedItem &&
                    filteredProducts.map((item) => (
                      <Link
                        key={item._id}
                        className="w-full border-b-[1px] border-b-gray-400
                         flex items-center gap-4"
                        href={{
                          pathname: `${item._id}`,
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
                        onClick={() => setSearchedItem("")}
                      >
                        <SearchedProducts item={item} />
                      </Link>
                    ))}
                </>
              ) : (
                <div
                  className="bg-gray-50 flex items-center justify-center 
                py-10 rounded-lg shadow-lg"
                >
                  <p className="text-xl font-semibold animate-bounce">
                    Nothing is matches with your search keywords. Please try
                    again!
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
        {/* sign In */}
        {user?.email ? (
          // if user is logged in render this
          <div
            className="flex items-center px-2 border border-transparent 
              hover:border-white cursor-pointer duration-300 h-[70%] 
              gap-1"
          >
            <Image
              src={user.image}
              alt="userImage"
              width={32}
              height={32}
              style={{ borderRadius: "100%", objectFit: "cover" }}
            />
            <div className="text-xs text-gray-100  flex flex-col justify-between">
              <p className="text-white font-bold">{user.name}</p>
              <p>{user.email}</p>
            </div>
          </div>
        ) : (
          // if user is not logged in render this
          <div
            onClick={() => signIn()}
            className="text-xs text-gray-100 flex flex-col 
              justify-center px-2 border border-transparent 
              hover:border-white cursor-pointer duration-300
               h-[70%]"
          >
            <p>Hello, sign in</p>
            <p className="text-white font-bold flex items-center">
              Account & Lists{" "}
              <span>
                <BiCaretDown />
              </span>
            </p>
          </div>
        )}
        {/* favorite */}
        <div
          onClick={() => router.push("/favorite")}
          className="hidden  relative md:flex flex-col items-left 
            justify-center h-[70%] px-2 py-5 border 
            border-transparent hover:border-white cursor-pointer 
            duration-300 text-xs text-gray-100"
        >
          <p>Marked</p>
          <p className=" text-white font-bold">& Favorite</p>
          {favorite.length > 0 ? (
            <span
              className=" absolute right-2 top-2 w-[1rem]  h-[1rem] 
                border-[1px] border-gray-400 flex items-center 
                text-xs justify-center text-amazon_yellow"
            >
              {favorite.length}
            </span>
          ) : (
            ""
          )}
        </div>
        {/* cart */}
        <div
          onClick={() => router.push("/cart")}
          className="flex items-center px-2 border border-transparent 
            hover:border-white cursor-pointer duration-300 h-[70%] 
            relative"
        >
          <Image
            src={cartIcon}
            alt="cartIcon"
            style={{ height: "32px", width: "100%", objectFit: "cover" }}
          />

          <span
            className=" text-amazon_yellow absolute text-sm font-semibold 
              top-[0.02rem]"
            style={{ left: `${cart?.length > 9 ? "45%" : "50%"}` }}
          >
            {cart?.length}
          </span>
        </div>
      </div>
    </section>
  );
}

export default TopHeader;
