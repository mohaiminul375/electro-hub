'use client'
import React from 'react';
import { useGetCartProduct } from './api/route';

const Page = () => {
    const uuid = '9er494';
    const { data, isLoading, isError, error } = useGetCartProduct(uuid);
    if (isLoading) {
        return <p>loading....</p>
    }
    console.log(data)
    return (
        <section className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {/* Cart Items Section */}
            <div className="md:col-span-8 bg-white border border-gray-200 rounded-md shadow-md">
                <div className="p-4">
                    {/* Individual Cart Item */}
                    <div className="grid grid-cols-12 gap-4 items-center border-b border-gray-300 pb-4 mb-4">
                        {/* Checkbox */}
                        <div className="col-span-1 flex justify-center">
                            <input type="checkbox" className="form-checkbox h-5 w-5 text-primary" />
                        </div>

                        {/* Product Image */}
                        <div className="col-span-2">
                            {/* <
                                src="https://via.placeholder.com/80"
                                alt="Product"
                                className="w-16 h-16 object-cover rounded-md"
                            /> */}
                        </div>

                        {/* Product Details */}
                        <div className="col-span-4">
                            <h5 className="text-sm font-medium text-gray-900">Product Name</h5>
                            <p className="text-sm text-gray-500">Color: Black</p>
                            <p className="text-sm text-gray-500">Brand: XYZ</p>
                        </div>

                        {/* Price */}
                        <div className="col-span-2 text-center">
                            <p className="text-sm font-medium text-gray-900">$20.00</p>
                        </div>

                        {/* Quantity */}
                        <div className="col-span-2 flex justify-center items-center">
                            <button className="px-2 py-1 text-sm bg-gray-200 rounded-md">-</button>
                            <span className="mx-2 text-sm">1</span>
                            <button className="px-2 py-1 text-sm bg-gray-200 rounded-md">+</button>
                        </div>

                        {/* Delete Button */}
                        <div className="col-span-1 flex justify-center">
                            <button className="text-red-500 hover:text-red-700">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="w-6 h-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Order Summary Section */}
            <div className="md:col-span-4 bg-white border border-primary rounded-md shadow-lg">
                <div className="p-6">
                    {/* Header */}
                    <h4 className="text-lg font-semibold text-primary mb-4">Order Summary</h4>
                    <hr className="border-t-2 border-primary mb-4" />

                    {/* Order Details */}
                    <div className="space-y-3">
                        <p className="flex justify-between text-sm text-gray-700">
                            <span>Subtotal (1 item):</span>
                            <span>$20.00</span>
                        </p>
                        <p className="flex justify-between text-sm text-gray-700">
                            <span>Shipping Fee:</span>
                            <span>$5.00</span>
                        </p>
                        <p className="flex justify-between text-sm text-gray-900 font-semibold">
                            <span>Total:</span>
                            <span>$25.00</span>
                        </p>
                    </div>
                </div>

                {/* Checkout Button */}
                <div className="p-6 border-t border-gray-200">
                    <button className="w-full py-3 text-white bg-primary rounded-md hover:bg-primary-dark transition-all">
                        Checkout
                    </button>
                </div>
            </div>
        </section>

    );
};

export default Page;