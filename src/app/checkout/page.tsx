'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useGetCartProduct } from '../cart/api/route';


const Page = () => {
    const uuid = '9er494';
    const { data = [], isLoading, isError, error } = useGetCartProduct(uuid);
    if (isLoading) {
        return <p>loading</p>
    }
    const { items, totalPrice, totalQuantity } = data[0];
    return (
        <section className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className='md:col-span-8'>
                {/* userInfo */}
                <div className='bg-white rounded-md p-4'>
                    <h4>Name: </h4>
                    <h6>Shipping Address:</h6>
                </div>
                <div className='mt-3 bg-white rounded-md p-3'>
                    <h3 className='font-semibold'>Total Product: {totalQuantity}</h3>
                    {items.map((item) => (
                        <div
                            key={item.product_id}
                            className="bg-white"
                        >
                            <div className="p-4">
                                <div className="grid grid-cols-12 gap-4 items-center border-b border-gray-300 py-2 my-2">
                                    {/* Product Image */}
                                    <div className="col-span-2">
                                        <Image
                                            src={item.img}
                                            alt={item.product_name}
                                            height={64}
                                            width={64}
                                        />
                                    </div>

                                    {/* Product Details */}
                                    <div className="col-span-4">
                                        <h5 className="text-base font-medium text-gray-900">
                                            {item.product_name}
                                        </h5>
                                        <p className="text-sm text-gray-500">Color: {item.color}</p>
                                        <p className="text-sm text-gray-500">Brand: {item.brand}</p>
                                    </div>

                                    {/* Price */}
                                    <div className="col-span-2 text-center">
                                        <p className="text-sm font-medium text-gray-900">
                                            ${item.price.toFixed(2)}
                                        </p>
                                    </div>

                                    {/* Quantity */}
                                    <div className="col-span-2 flex justify-center items-center">

                                        <span className="mx-2 text-sm">
                                            Quantity:{item.quantity}
                                        </span>

                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className='md:col-span-4'>
                {/* Order Summary Section */}
                <div className="md:col-span-4 bg-white border border-primary rounded-md shadow-lg">
                    <div className="p-6">
                        <h4 className="text-lg font-semibold text-primary mb-4">Order Summary</h4>
                        <hr className="border-t-2 border-primary mb-4" />

                        <div className="space-y-3">
                            <p className="flex justify-between text-sm text-gray-700">
                                <span>
                                    Subtotal (<span>
                                        {totalQuantity || 0}
                                    </span> items):
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

                    <div className="p-6 border-t border-gray-200 w-full">
                        <Link
                            href='/checkout'
                            className=" py-3 text-white bg-primary rounded-md hover:bg-primary-dark transition-all">
                            <button className='w-full'>
                                PROCEED TO PAY
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Page;