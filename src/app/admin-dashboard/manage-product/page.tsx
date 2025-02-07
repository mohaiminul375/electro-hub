'use client'
import Loading from '@/app/loading';
import { GetAdminProducts } from './api/rote';
import ProductTable from '@/components/Dashboard/ProductTable/ProductTable';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { Pagination } from '@nextui-org/react';
export const dynamic = 'force-dynamic';
const ManageProduct = () => {
    const [isClient, setIsClient] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);
    const { data: products = [], isLoading, isError, error } = GetAdminProducts();

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
    const itemsPerPage = 15;
    const totalPages = Math.ceil(products.length / itemsPerPage);

    // Get products for the current page
    const paginatedProducts = products.slice((page - 1) * itemsPerPage, page * itemsPerPage);

    return (
        <section className='mt-6'>
            {/* filter and sorting */}
            <div>

            </div>
            {/*Heading  */}
            <div className="mt-0">
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
                <div className='mb-2'>
                    <h2 className='text-xl font-bold'>Total Products: <span className='text-primary'>{products?.length}</span></h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full table-auto border-collapse">
                        <thead className="bg-primary text-white">
                            <tr>
                                <th className="px-4 py-2 text-left">#</th>
                                <th className="px-4 py-2 text-left">Name</th>
                                <th className="px-4 py-2 text-left">Category</th>
                                <th className="px-4 py-2 text-left">Brand</th>
                                <th className="px-4 py-2 text-left">Status</th>
                                <th className="px-4 py-2 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                paginatedProducts?.map((product, idx) => (
                                    <ProductTable
                                        idx={(page - 1) * itemsPerPage + idx + 1}
                                        key={idx}
                                        product={product}
                                    />
                                ))
                            }


                        </tbody>
                    </table>
                </div>
                {
                    products?.length === 0 && <p className='text-red-700 text-center font-bold text-2xl mt-10'>
                        No Products added yet.
                    </p>
                }
            </div>
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

export default ManageProduct;

