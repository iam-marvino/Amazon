"use client"
import React from 'react'
import Image from 'next/image';

function SearchedProducts({item}) {
  return (
    <section className="flex items-center gap-4">
   

      <div style={{ position: "relative", height: "96px",width:'96px' }}>
        <Image
          src={item.image}
          alt="productImage"
          fill
          sizes="100%"
        />

      </div>
      <div>
        <p className="text-xs -mb-1">
          {item.brand}_{item.category}
        </p>
        <p className="text-lg font-medium">{item.title}</p>
        <p className="text-xs">{item.description.substring(0, 100)}</p>
        <p className="text-sm flex items-center gap-1">
          price:{" "}
          <span className="font-semibold">
            ${(item.price * 0.9).toFixed(2)}
          </span>
          <span className="text-gray-600 line-through">
            ${(item.price * 1.1).toFixed(2)}
          </span>
        </p>
      </div>
      <div className="flex-1 text-right px-4">
        <p className="text-base font-semibold animate-bounce text-amazon_blue">
          Save$
          {Math.abs(
            (item.price * 0.9).toFixed(2) - (item.price * 1.1).toFixed(2)
          )}
        </p>
      </div>
    </section>
  );
}

export default SearchedProducts
