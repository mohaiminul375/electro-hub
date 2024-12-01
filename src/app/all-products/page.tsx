import React from 'react';
import { getProducts } from './api/route';
import ProductCard from '../Components/Products/ProductCard';
import { Select, SelectItem } from '@nextui-org/react';
import ProductFilter from '../Components/Filter/ProductFilter';

const page = async () => {
    const products: [] = await getProducts();
    return (
        <section className=''>
            {/* heading */}
            <div className="text-center bg-gradient-to-br from-primary to-accent text-white py-8 px-4 rounded-md shadow-md mb-6">
                <h2 className="text-3xl font-bold mb-2">Endless Choices, One Place</h2>
                <p className="text-lg">Find all products in one convenient location</p>
            </div>
            {/*  filter*/}
            <div className="mb-6">
                <ProductFilter />
            </div>
            {/* products */}
            <div className='grid md:grid-cols-3 lg:grid-cols-4 gap-8'>
                {
                    products.map(item => <ProductCard
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