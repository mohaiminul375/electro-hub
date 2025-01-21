'use client';
import React, { useState, useEffect } from 'react';
import { useGetCartProduct, useUpdateQuantity } from './api/route';
import Image from 'next/image';
import { Input } from '@nextui-org/react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import Loading from '../loading';
import { FaX } from 'react-icons/fa6';
export const dynamic = 'force-dynamic';
interface CartItem {
    product_id: string;
    img: string;
    product_name: string;
    color: string;
    brand: string;
    price: number;
    quantity?: number | string | undefined;
}
// interface Item {
//     // product_id: number;  // Assuming product_id is a string; change it to a number if needed
//     quantity: string;    // Quantity of the product
//     price: number;       // Price of the product
// }

// TODO: Typescript error
interface ErrorData {
    message: string;
}

const Page = () => {
    // const uuid = '9er494';
    const { data: session } = useSession();
    const uuid = session?.user?.uuid
    const { data, isLoading, isError, error } = useGetCartProduct(uuid as string);
    const updateQuantity = useUpdateQuantity();
    const [items, setItems] = useState<CartItem[]>([]);
    const [totalQuantity, setTotalQuantity] = useState<number>(0);
    const [totalPrice, setTotalPrice] = useState<number>(0);

    // Initialize local state with fetched data
    useEffect(() => {
        if (data && data[0]) {
            const { items, totalQuantity, totalPrice } = data[0];
            setItems(items);
            setTotalQuantity(totalQuantity);
            setTotalPrice(totalPrice);
        }
    }, [data]);
    if (!session) {
        return <p className='text-center text-2xl'>Please log in to view your cart.</p>;
    }
    if (isLoading) {
        return <p><Loading /></p>;
    }

    if (isError) {
        const errMessage = (error as ErrorData)?.message || 'Something went wrong!';
        return <p>{errMessage}</p>;
    }

    const handleIncrementDecrement = async ({
        action,
        productId,
    }: {
        action: 'plus' | 'minus';
        productId: string;
    }) => {
        try {
            const updatedItems = items.map((item) => {
                if (item.product_id === productId) {
                    const updatedQuantity =
                        action === 'plus'
                            ? item.quantity as number + 1
                            : Math.max(item.quantity as number - 1, 1); // Prevent negative quantities
                    return { ...item, quantity: updatedQuantity };
                }
                return item;
            });

            // Optimistic UI update
            setItems(updatedItems);

            // Update totals locally
            const newTotalQuantity = updatedItems.reduce((acc, curr) => acc + curr?.quantity as number, 0);
            const newTotalPrice = updatedItems.reduce(
                (acc, curr) => acc + curr?.quantity as number * curr.price,
                0
            );
            setTotalQuantity(newTotalQuantity);
            setTotalPrice(newTotalPrice);

            // Send the update to the server
            await updateQuantity.mutateAsync({ uuid, action, productId });
        } catch (error) {
            console.error('Error updating quantity:', error);
        }
    };

    return (
        <>
            <div className='text-xl'>
                {items?.length == 0 && <p>No Product added yet.</p>}
            </div>
            <section className="grid grid-cols-1 md:grid-cols-12 gap-4">
                {/* Cart Items Section */}
                <section className="md:col-span-8">
                    {items.map((item) => (
                        <div
                            key={item.product_id}
                            className="bg-white border-gray-200 shadow-md"
                        >
                            <div className='md:hidden flex justify-end pt-5 pr-4'>
                                <FaX />
                            </div>
                            <div className="p-4">
                                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center border-b border-gray-300 py-2 my-2">

                                    {/* Product Image */}
                                    <div className="md:col-span-2">
                                        <Image
                                            src={item.img}
                                            alt={item.product_name}
                                            height={64}
                                            width={64}
                                        />
                                    </div>
                                    {/* Delete */}

                                    {/* Product Details */}
                                    <div className="md:col-span-4">
                                        <h5 className="text-base font-medium text-gray-900">
                                            {item.product_name}
                                        </h5>
                                        <p className="text-sm text-gray-500">Color: {item.color}</p>
                                        <p className="text-sm text-gray-500">Brand: {item.brand}</p>
                                    </div>

                                    {/* Price */}
                                    <div className="md:col-span-2  md:text-center">
                                        <p className="text-sm font-medium text-gray-900">
                                            ${item.price.toFixed(2)}
                                        </p>
                                    </div>

                                    {/* Quantity */}
                                    <div className="md:col-span-2 flex justify-center items-center">
                                        <button
                                            disabled={item.quantity === 1}
                                            onClick={() =>
                                                handleIncrementDecrement({
                                                    action: 'minus',
                                                    productId: item.product_id,
                                                })
                                            }
                                            className="px-2 py-1 text-sm bg-gray-200 rounded-md disabled:cursor-not-allowed"
                                        >
                                            -
                                        </button>
                                        <span className="mx-2 text-sm">
                                            <Input
                                                readOnly
                                                type="number"
                                                value={item.quantity as string}
                                            />
                                        </span>
                                        <button
                                            onClick={() =>
                                                handleIncrementDecrement({
                                                    action: 'plus',
                                                    productId: item.product_id,
                                                })
                                            }
                                            className="px-2 py-1 text-sm bg-gray-200 rounded-md"
                                        >
                                            +
                                        </button>
                                    </div>
                                    <div className='ml-14 hidden md:flex'>
                                        <FaX />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </section>

                {/* Order Summary Section */}
                <div className="md:col-span-4 bg-white border border-primary rounded-md shadow-lg">
                    <div className="p-6">
                        <h4 className="text-lg font-semibold text-primary mb-4">Order Summary</h4>
                        <hr className="border-t-2 border-primary mb-4" />

                        <div className="space-y-3">
                            <p className="flex justify-between text-sm text-gray-700">
                                <span>
                                    Subtotal (<span>{totalQuantity || 0}</span> items):
                                </span>
                                <span>${totalPrice || 0}</span>
                            </p>
                            <p className="flex justify-between text-sm text-gray-700">
                                <span>Shipping Fee:</span>
                                <span>Free</span>
                            </p>
                            <p className="flex justify-between text-sm text-gray-900 font-semibold">
                                <span>Total:</span>
                                <span>${totalPrice || 0}</span>
                            </p>
                        </div>
                    </div>

                    <div
                        className="p-6 border-t border-gray-200">
                        {
                            totalPrice == 0 ?
                                <button
                                    disabled
                                    className='bg-primary py-3 text-center w-full rounded-md text-white disabled:cursor-not-allowed'>

                                    checkout
                                </button>
                                : <Link href='/checkout'>
                                    <button className='bg-primary py-3 text-center w-full rounded-md text-white'>

                                        checkout
                                    </button>
                                </Link>
                        }

                    </div>

                </div>
            </section>
        </>
    );
};

export default Page;
