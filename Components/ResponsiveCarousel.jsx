"use client";
import React from "react";
import Image from "next/image";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import sliderImg_1 from "../public/slider/sliderImg_1.jpg";
import sliderImg_2 from "../public/slider/sliderImg_2.jpg";
import sliderImg_3 from "../public/slider/sliderImg_3.jpg";
import sliderImg_4 from "../public/slider/sliderImg_4.jpg";

function ResponsiveCarousel() {
  let images = [
    {
      img: sliderImg_1,
      id: 1,
      priority: true,
    },
    {
      img: sliderImg_2,
      id: 2,
      priority: false,
    },
    {
      img: sliderImg_3,
      id: 3,
      priority: false,
    },
    {
      img: sliderImg_4,
      id: 4,
      priority: false,
    },
  ];
  return (
    <section className="relative">
      {/* Carousel */}
      <Carousel
        autoPlay
        infiniteLoop
        showStatus={false}
        showIndicators={false}
        showThumbs={false}
        interval={3000}
      >
        {images.map((item) => (
          <div key={item.id}>
            <Image
              src={item.img}
              alt={item.id}
              priority={item.priority}
              style={{ width:'100%',height:'100%' }}
            />
          </div>
        ))}
      </Carousel>
      {/* gradient background */}
      <div
        className="w-full h-40 bg-gradient-to-t from-gray-100 to-transparent 
      absolute bottom-0 z-20"
      ></div>
    </section>
  );
}

export default ResponsiveCarousel;
