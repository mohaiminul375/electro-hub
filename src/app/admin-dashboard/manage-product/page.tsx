'use client'
import Loading from '@/app/loading';
import { GetAdminProducts } from './api/rote';
import ProductTable from '@/app/Components/Dashboard/ProductTable/ProductTable';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';
import { useEffect, useState } from 'react';

const ManageProduct = () => {
    const [isClient, setIsClient] = useState(false);
    // const products = await getAdminProducts();
    const { data: products, isLoading, isError, error } = GetAdminProducts();

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        return null;
    }
    // Handle loading state
    if (isLoading) return <Loading />;
    // Handle error state
    if (isError) return <p className="text-center text-red-700">Error: {error && (typeof error === "string" ? error : error.message)}</p>;

    return (
        <section className='mt-10'>
            {/* filter and sorting */}
            <div>

            </div>
            {/*Heading  */}
            <div className="mt-6">
                {/* Back Button */}
                <div className="inline-block">
                    <Link
                        href="/admin-dashboard"
                        className="flex items-center gap-3 rounded-lg bg-gray-100 border border-gray-300 text-lg px-4 py-2 text-accent hover:bg-gray-200 hover:border-gray-400 transition duration-200"
                    >
                        <FaArrowLeft className="text-accent" />
                        <span>Back to Dashboard</span>
                    </Link>
                </div>

                {/* Manage Product Header */}
                <div className="mb-8 mt-4 text-center">
                    <h3 className="text-3xl font-bold text-accent">Manage Products</h3>
                    <h4 className="text-md text-gray-700 mt-2">Easily manage, edit, delete your products.</h4>
                </div>
            </div>

            {/* products listing */}
            <div>
                <div className="overflow-x-auto">
                    <table className="min-w-full table-auto border-collapse">
                        <thead className="bg-primary text-white">
                            <tr>
                                <th className="px-4 py-2 text-left">#</th>
                                <th className="px-4 py-2 text-left">Name</th>
                                <th className="px-4 py-2 text-left">Category</th>
                                <th className="px-4 py-2 text-left">Brand</th>
                                <th className="px-4 py-2 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                products?.map((product, idx) => (
                                    <ProductTable
                                        idx={idx}
                                        key={idx}
                                        product={product}
                                    />
                                ))
                            }


                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
};

export default ManageProduct;
// For SSR/SSG: Ensure no SSR-related issues during build
