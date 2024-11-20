import React from 'react';
import { getAdminProducts } from './api/rote';
import ProductTable from '@/app/Components/Dashboard/ProductTable/ProductTable';

const page = async () => {
    const products = await getAdminProducts();
    // console.log(products)
    return (
        <section className='mt-10'>
            {/* filter and sorting */}
            <div>

            </div>
            {/*Heading  */}
            <div className="mb-5 text-center">
                <h3 className="text-2xl font-semibold">Manage Products</h3>
                <h4 className="text-lg text-gray-600">Manage your Products</h4>
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

export default page;