'use client';
import React from 'react';
import { useGetCartProduct } from './api/route';
import Image from 'next/image';
import { Input } from '@nextui-org/react';

// Type definitions for cart data
interface CartItem {
    product_id: string;
    img: string;
    name: string;
    color: string;
    brand: string;
    price: number;
    quantity: number;
}

interface CartData {
    items: CartItem[];
}

interface ErrorData {
    message: string;
}

const Page = () => {
    const uuid = '9er494';
    const { data, isLoading, isError, error } = useGetCartProduct(uuid);
    // const { _id, items, totalQuantity, totalPrice } = data;

    if (isLoading) {
        return <p>loading....</p>;
    }
    const { items, totalQuantity, totalPrice } = data[0];

    console.log(items)
    if (isError) {
        const errMessage = (error as ErrorData)?.message || 'Something went wrong!';
        return <p>{errMessage}</p>;
    }
    const handleIncrementDecrement = ({ action, productId }) => {
        console.log(action, productId);
    }


    return (
        <section className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {/* Cart Items Section */}
            <section className='md:col-span-8'>
                {data[0].items?.map((item) => (
                    <div
                        key={item.product_id}
                        className=" bg-white  border-gray-200 shadow-md"
                    >
                        <div className="p-4">
                            {/* Individual Cart Item */}
                            <div className="grid grid-cols-12 gap-4 items-center border-b border-gray-300 py-2 my-2">


                                {/* Product Image */}
                                <div className="col-span-2">
                                    <Image
                                        src={item.img}
                                        alt={item.name}
                                        height={64} // Adjust size accordingly
                                        width={64}  // Adjust size accordingly
                                    />
                                </div>

                                {/* Product Details */}
                                <div className="col-span-4">
                                    <h5 className="text-base font-medium text-gray-900">{item.product_name}</h5>
                                    <p className="text-sm text-gray-500">Color: {item.color}</p>
                                    <p className="text-sm text-gray-500">Brand: {item.brand}</p>
                                </div>

                                {/* Price */}
                                <div className="col-span-2 text-center">
                                    <p className="text-sm font-medium text-gray-900">${item.price.toFixed(2)}</p>
                                </div>

                                {/* Quantity */}
                                <div className="col-span-2 flex justify-center items-center">
                                    <button
                                        onClick={() => handleIncrementDecrement({ action: 'minus', productId: item.product_id })}
                                        className="px-2 py-1 text-sm bg-gray-200 rounded-md">-</button>
                                    <span className="mx-2 text-sm">
                                        <Input type="number" value={item.quantity} />
                                    </span>
                                    <button
                                        onClick={() => handleIncrementDecrement({ action: 'plus', productId: item.product_id })}
                                        className="px-2 py-1 text-sm bg-gray-200 rounded-md">+</button>
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
                ))}
            </section>

            {/* Order Summary Section */}
            <div className="md:col-span-4 bg-white border border-primary rounded-md shadow-lg">
                <div className="p-6">
                    {/* Header */}
                    <h4 className="text-lg font-semibold text-primary mb-4">Order Summary</h4>
                    <hr className="border-t-2 border-primary mb-4" />

                    {/* Order Details */}
                    <div className="space-y-3">
                        <p className="flex justify-between text-sm text-gray-700">
                            <span>Subtotal (<span>{totalQuantity || 0}</span> item):</span>
                            <span>${totalPrice || 0}</span>
                        </p>
                        <p className="flex justify-between text-sm text-gray-700">
                            <span>Shipping Fee:</span>
                            <span>Free</span>
                        </p>
                        <p className="flex justify-between text-sm text-gray-900 font-semibold">
                            <span>Total:</span>
                            <span>{totalPrice || 0}</span>
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
