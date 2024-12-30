'use client'
import React from 'react';
import banner_1 from '../../../public/Banner-1.png'; // Your banner image
import banner_2 from '../../../public/banner_2.jpg'; // Your banner image
import banner_3 from '../../../public/banner_3.jpg'; // Your banner image

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Import required modules
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules';
import Link from 'next/link';

export default function Banner() {
  return (
    <section className='h-screen'>
      <Swiper
        cssMode={true}
        loop={true}
        navigation={true}
        pagination={true}
        mousewheel={true}
        keyboard={true}
        modules={[Navigation, Pagination, Mousewheel, Keyboard]}
        className="h-full object-cover rounded-lg"
      >
        {/* Slide 1 - Welcome/Intro */}
        <SwiperSlide
        >
          <SwiperSlide
            className="relative bg-cover bg-center h-screen"
            style={{
              backgroundImage: `url(${banner_1.src})`, width: "100%",
              height: "100%"
            }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-center items-center text-center text-white px-4 rounded-md">
              <h1 className="text-3xl md:text-5xl font-extrabold leading-tight drop-shadow-md">
                Welcome to Our Website<span className='text-primary'>Electro Hub</span>
              </h1>
              <p className="mt-4 text-lg md:text-xl drop-shadow-sm">
                Your go-to platform for the best gadgets and accessories
              </p>
              
              {/* <Slide triggerOnce={true} direction="up"> */}
              <div className="mt-6">
                <Link
                  href="/all-scholarship"
                  className="mt-6 px-6 py-3 bg-primary rounded-md text-white font-bold hover:bg-opacity-90 hover:scale-105 transition-all duration-300 ease-in-out shadow-md"
                >
                  Start Your Search Today
                </Link>
              </div>
              {/* </Slide> */}
            </div>
          </SwiperSlide>



        </SwiperSlide>

        {/* Slide 2 - Demo Content */}
        <SwiperSlide
          className="relative bg-cover bg-center h-screen"
          style={{
            backgroundImage: `url(${banner_2.src})`, width: "100%",
            height: "100%"
          }}
        >
          <div className="absolute inset-0 bg-black opacity-50 flex justify-center items-center text-white">
            <div className="text-center">
              <h2 className="text-3xl md:text-5xl font-bold">Check Out Our Latest Products</h2>
              <p className="mt-4 text-lg md:text-xl">Explore a wide range of gadgets and accessories to suit your needs.</p>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 3 - Demo Content */}
        <SwiperSlide
          className="relative bg-cover bg-center h-screen"
          style={{ backgroundImage: `url(${banner_3.src})` }}
        >
         
        </SwiperSlide>


      </Swiper>
    </section >
  );
}
