import React from 'react';
import { getProducts } from './api/route';
import ProductCard from '../Components/Products/ProductCard';
import Link from 'next/link';

const page = async () => {
    const products: [] = await getProducts();
    return (
        <section className=''>
            {/* categories */}
            
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