import React, { useEffect, useState } from "react";
import { addedToCart, addedToFavorite } from "@/Redux/appSlices";
import Image from "next/image";
import { FaHeart } from "react-icons/fa";
import { HiShoppingCart } from "react-icons/hi";
import { useDispatch } from "react-redux";
import { PuffLoader } from "react-spinners";

function DynamicPageContent({ searchParams }) {
  let [product, setProduct] = useState({});
  let [isLoading, setIsLoading] = useState(true);
  let dispatch = useDispatch();
  let productObj = {
    _id: searchParams.id,
    brand: searchParams.brand,
    category: searchParams.category,
    description: searchParams.description,
    image: searchParams.image,
    isNew: searchParams.isNew,
    oldPrice: searchParams.oldPrice,
    price: searchParams.price,
    title: searchParams.title,
  };

    useEffect(() => {
      // Simulate loading completion after 3 seconds
      // on mount set the loading state to false, because product data is done loading
      setTimeout(() => {
        setIsLoading(false);
        setProduct(productObj)
      }, 3000);
    }, [searchParams]);

  

  function itemAddedToCart() {
    try {
      dispatch(addedToCart(productObj));
    } catch (error) {
      console.log(error);
    }
  }

  function itemAddedToFavorite() {
    try {
      dispatch(addedToFavorite(productObj));
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      {/* if product data is loading render this section */}
      {isLoading ? (
        <section className="w-full flex flex-col gap-6 items-center justify-center py-20">
          <p className=" font-bold ">Your product is loading...</p>
          <PuffLoader color="#131921" size={100} />
        </section>
      ) : (
        // if product data is done loading render this section
        <section className="w-full grid md:grid-cols-3 gap-3 bg-gray-100 rounded-lg">
          {/* the product image and animated button pop up section */}
          <div
            className="flex items-center justify-center bg-gray-200 rounded-lg
           relative group overflow-hidden"
          >
            {/* product image section */}
            <Image
              src={product.image}
              alt="product image"
              width={500}
              priority={true}
              height={500}
            />
            <div
              className="w-12 h-24 absolute bottom-10 right-0 border-[1px] 
            border-gray-400 bg-white rounded-md flex flex-col translate-x-20 
            group-hover:-translate-x-2 transition-transform duration-300"
            >
              {/* the add to cart button */}
              <span
                onClick={itemAddedToCart}
                className="w-full h-full border-b-[1px] border-b-gray-400 flex 
                items-center justify-center text-xl bg-transparent 
                hover:bg-amazon_yellow cursor-pointer duration-300"
              >
                <HiShoppingCart />
              </span>
              {/* the add to favorite button */}
              <span
                onClick={itemAddedToFavorite}
                className="w-full h-full border-b-[1px] border-b-gray-400 flex 
                items-center justify-center text-xl bg-transparent 
                hover:bg-amazon_yellow cursor-pointer duration-300"
              >
                <FaHeart />
              </span>
            </div>
          </div>
          {/* the product text section */}
          <div className="md:col-span-2 flex flex-col gap-3 justify-center p-4">
            <p className="text-xs md:text-sm text-amazon_blue font-semibold -mb-3">
              {product.category}_{product.brand}
            </p>
            <h1 className="text-xl md:text-3xl tracking-wide font-semibold">
              {product.title}
            </h1>
            <p className="text-sm text-gray-600">{product.description}</p>
            <div>
              <p className="text-base text-gray-600 flex items-center gap-1">
                Price:
                <span className="text-lg text-amazon_blue font-semibold">
                  ${product.price}
                </span>
                <span className="ml-1 line-through">${product.oldPrice}</span>
              </p>
              <p className="text-sm text-gray-500 flex items-center gap-1">
                Your saved:
                <span>${(product.oldPrice - product.price).toFixed(2)}</span>
              </p>
              {/* the main add to cart button */}
              <button
                onClick={itemAddedToCart}
                className="w-full md:w-96 h-12 bg-amazon_blue text-gray-200 
                hover:bg-amazon_yellow hover:text-amazon_blue duration-300 
                rounded-lg mt-5 text-base font-semibold"
              >
                add to cart
              </button>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default DynamicPageContent;
