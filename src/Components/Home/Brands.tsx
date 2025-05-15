import Image from 'next/image';
import React from 'react';
import Marquee from "react-fast-marquee";
import acer from '../../../public/brands/Acer.svg'
import asus from '../../../public/brands/Asus.svg'
import dell from '../../../public/brands/Dell.svg'
import google from '../../../public/brands/Google.svg'
import hp from '../../../public/brands/HP.svg'
import lg from '../../../public/brands/LG.svg'
import lenovo from '../../../public/brands/Lenovo.svg'
import one_plus from '../../../public/brands/OnePlus.svg'
import realme from '../../../public/brands/Realme.svg'
import samsung from '../../../public/brands/Samsung.svg'
import walton from '../../../public/brands/Waltion.png'
import xiaomi from '../../../public/brands/Xiaomi.svg'
const images = [
    acer, asus, dell, google, hp, lg, lenovo,
    one_plus, walton, realme, xiaomi, samsung,
];
const Brands = () => {
    return (
        <section className='mt-10 '>
            <div>
                <h2 className='text-3xl font-semibold px-3 md:px-0'>Our Brands</h2>
            </div>
            {/* Logo */}
            <div className='max-w-6xl mx-auto mt-10'>
                <Marquee gradient={false} speed={50}>
                    {images.map((img, index) => (
                        <div key={index} className="flex items-center justify-center mx-4">
                            <Image src={img} alt={`Brand ${index + 1}`} width={100} height={100} />
                        </div>
                    ))}
                </Marquee>
            </div>
        </section>
    );
};

export default Brands;