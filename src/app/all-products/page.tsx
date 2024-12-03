"use client";
import ProductCard from '../Components/Products/ProductCard';
import ProductFilter from '../Components/Filter/ProductFilter';
import { useGetProducts } from './api/route';
import Loading from '../loading';
import { useState } from 'react';


const Page = () => {
    const [brand, setBrand] = useState<string>('')
    const [color, setColor] = useState<string>('')
    const [priceSort, setPriceSort] = useState<string>('');
    console.log(brand, color, priceSort)
    // Use destructuring from GetProducts and provide type annotations
    const { data: products = [], isLoading, isError, error } = useGetProducts({ color, brand, priceSort });
    // Handle loading state
    if (isLoading) return <Loading />;
    // Handle error state
    if (isError) return <p className="text-center text-red-700">Error: {error && (typeof error === "string" ? error : error.message)}</p>;

    return (
        <section className="">
            {/* Heading */}
            <div className="text-center bg-gradient-to-br from-primary to-accent text-white py-8 px-4 rounded-md shadow-md mb-6">
                <h2 className="text-3xl font-bold mb-2">Endless Choices, One Place</h2>
                <p className="text-lg">Find all products in one convenient location</p>
            </div>
            {/* Filter */}
            <div className="mb-6">
                <ProductFilter
                    setBrand={setBrand}
                    setColor={setColor}
                    setPriceSort={setPriceSort}
                ></ProductFilter>
            </div>
            {/* Products */}
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-8">
                {products.map((item) => (
                    <ProductCard key={item._id} item={item} />
                ))}
            </div>
        </section>
    );
};

export default Page;