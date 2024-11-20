import React from 'react';
import { getProducts } from './api/route';
import ProductCard from '../Components/Products/ProductCard';
import Link from 'next/link';

const page = async () => {
    const products: [] = await getProducts();
    return (
        <section className=''>
            {/* categories */}
            <div className='hidden lg:flex justify-evenly items-center gap-8 mb-10 h-10 text-lg font-semibold shadow-lg border-2'>
                <Link href='/smart-phone'>Smart-Phone</Link>
                <Link href='/smart-watch'>Smart-Watch</Link>
                <Link href='/laptop'>Laptop</Link>
                <Link href='/monitor'>Monitor</Link>
                <Link href='/accessories'>Accessories</Link>
                <Link href='/smart-tv'>Smart-Tv</Link>
            </div>
            {/* products */}
            <div className='grid md:grid-cols-3 lg:grid-cols-4 gap-8'>
             {
                products.map(item=><ProductCard
                key={item._id}
                item={item}
                >

                </ProductCard>)
             }
            </div>
        </section>
    );
};

export default page;