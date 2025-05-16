"use client";
import ProductCard from '../../components/Products/ProductCard';
import ProductFilter from '../../components/Filter/ProductFilter';
import { useGetProducts } from './api/route';
import Loading from '../loading';
import { useState } from 'react';
import { Pagination } from '@nextui-org/react';
import { useSearchParams } from 'next/navigation';
export const dynamic = 'force-dynamic';

const Page = () => {
    const [brand, setBrand] = useState<string>('');
    const [color, setColor] = useState<string>('');
    const [priceSort, setPriceSort] = useState<string>('');
    const [page, setPage] = useState<number>(1);
    // Handle search params
    const searchParams = useSearchParams();
    const searchName = searchParams.get('search');

    const { data: products = [], isLoading, isError, error } = useGetProducts({ color, brand, priceSort, searchName });

    // Handle error state
    if (isError) return <p className="text-center text-red-700">Error: {error && (typeof error === "string" ? error : error.message)}</p>;

    const itemsPerPage = 12;
    const totalPages = Math.ceil(products.length / itemsPerPage);

    // Get products for the current page
    const paginatedProducts = products.slice((page - 1) * itemsPerPage, page * itemsPerPage);

    return (
        <section className="">
            <head>
                <title>Electro-Hub | All Products   </title>
            </head>
            {/* Heading */}
            <div className="text-center bg-gradient-to-br from-primary to-accent text-white py-6 md:py-8 px-4 rounded-md shadow-md mb-6">
                <h2 className="md:text-3xl text-xl font-bold mb-2">Endless Choices, One Place</h2>
                <p className="text-sm md:text-medium">Find all products in one convenient location</p>
            </div>

            {/* Filter */}
            <div className="mb-6">
                <ProductFilter setBrand={setBrand} setColor={setColor} setPriceSort={setPriceSort} />
            </div>

            {/* No Product Found Message */}
            {!isLoading && products.length === 0 && (
                <h2 className="text-center text-xl text-red-700 font-semibold">No Product Found</h2>
            )}

            {/* Products */}
            {isLoading ? <Loading /> :
                <div className="md:grid md:grid-cols-3 lg:grid-cols-4 gap-8 flex flex-col items-center justify-center">
                    {paginatedProducts.map((item) => (
                        <ProductCard key={item._id} item={item} />
                    ))}
                </div>}

            {/* Pagination */}
            <div className="mt-10 flex justify-center gap-5">
                <Pagination
                    loop
                    showControls
                    color="success"
                    initialPage={1}
                    total={totalPages}
                    page={page}
                    onChange={(newPage) => setPage(newPage)}
                />
            </div>
        </section>
    );
};

export default Page;
