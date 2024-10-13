import Link from 'next/link';
import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';

const page = () => {
    return (
        <section>
            <div className="mt-3 inline-block">
                <Link
                    href='/admin-dashboard'
                    className="flex items-center gap-2 rounded-lg bg-white border text-xl p-2">
                    <FaArrowLeft />
                    Back to Dashboard
                </Link>
            </div>
            <div className="mb-10 text-center">
                <h3 className="text-2xl font-semibold">Add Product</h3>
                <h4 className="text-lg text-gray-600">Add a New Product in Your store</h4>
            </div>
        </section>
    );
};

export default page;