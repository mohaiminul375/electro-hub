'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useGetCartProduct } from '../cart/api/route';
import { useSession } from 'next-auth/react';
import useAuth from '../../hook/useAuth';
import Loading from '../loading';
import { useCreatePayment } from './api/route';
export const dynamic = 'force-dynamic';
// page start
const Page = () => {
    const createPayment = useCreatePayment();
    const { data: session } = useSession();
    const uuid = session?.user?.uuid;

    const user = useAuth();

    const { data: carts, isLoading, isError, error } = useGetCartProduct(uuid as string);

    if (!session) {
        return <p className='text-center text-2xl'>Please log in to view your cart.</p>;
    }
    // !user?.uuid ||
    if (isLoading) {
        return <Loading></Loading>
    }

    if (isError) {
        return <p>Error: {error?.message || 'Something went wrong!'}</p>;
    }

    //destructure address
    const { division, district, full_address } = user?.address || {};
    if (!user?.address) {
        return <div className='flex justify-center items-center '>
            <div className='bg-white dark:bg-darkCard md:w-96 p-7 border-2 shadow-2xl rounded-md border-primary'><h2 className='text-center text-lg text-primary'>Please confirm your address first</h2>
                <div>
                    <Link className='w-full bg-primary text-white p-2 block text-center rounded-md' href='/user/profile'>Update Profile</Link>
                </div>
            </div>
        </div>
    }
    // Filter the cart for the current user's UUID
    const userCart = carts?.find(cart => cart.uuid === uuid);

    if (!userCart || userCart.items.length === 0) {
        return <p>Your cart is empty.</p>;
    }

    // Extract items and calculate totals
    const { items } = userCart;
    const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);


    // handle payment
    const handlePayment = async () => {
        const paymentInfo = {
            uuid: uuid,
            name: user?.name,
            email: user?.email,
            phone: user?.phone_number,
            division: division,
            district: district,
            full_address: full_address,
            total_price: totalPrice,
            items: items,
        }

        await createPayment.mutateAsync(paymentInfo);

    }

    return (
        <section className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <head>
                <title>Electro-Hub | CheckOut</title>
            </head>
            <div className='md:col-span-8'>
                {/* User Info */}
                <div className='bg-white dark:bg-darkCard rounded-md p-4'>
                    <h4>Name: {user?.name || 'Unknown'}</h4>
                    {
                        user?.address && <h6>
                            Shipping Address:
                            <span className='font-semibold'> Division:</span> <span>{division || 'not found'}</span>,
                            <span className='font-semibold'> District:</span> <span>{district}</span>,
                            <span className='font-semibold'> Address:</span> <span>{full_address}</span>
                        </h6>
                    }
                </div>

                {/* Cart Items */}
                <div className='mt-3 bg-white dark:bg-darkCard rounded-md p-3'>
                    <h3 className='font-semibold'>Total Product: {totalQuantity}</h3>
                    {items.map((item) => (
                        <div
                            key={item.product_id}
                            className="bg-white dark:bg-darkBackground"
                        >
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

                                    {/* Product Details */}
                                    <div className="col-span-4">
                                        <h5 className="text-base font-medium text-gray-900 dark:text-white">
                                            {item.product_name}
                                        </h5>
                                        <p className="text-sm text-gray-500">Color: {item.color}</p>
                                        <p className="text-sm text-gray-500">Brand: {item.brand}</p>
                                    </div>

                                    {/* Price */}
                                    <div className="col-span-2 text-left">
                                        <p className="text-sm font-medium text-primary">
                                            ${item.price.toFixed(2)}
                                        </p>
                                    </div>

                                    {/* Quantity */}
                                    <div className="col-span-2 flex justify-center items-center">
                                        <span className="mx-2 text-sm">
                                            Quantity: {item.quantity}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Order Summary */}
            <div className='md:col-span-4'>
                <div className="bg-white dark:bg-darkCard border border-primary rounded-md shadow-lg">
                    <div className="p-6">
                        <h4 className="text-lg font-semibold text-primary mb-4">Order Summary</h4>
                        <hr className="border-t-2 border-primary mb-4" />

                        <div className="space-y-3">
                            <p className="flex justify-between text-sm text-gray-700 dark:text-white">
                                <span>
                                    Subtotal (<span>{totalQuantity || 0}</span> items):
                                </span>
                                <span>${totalPrice.toFixed(2)}</span>
                            </p>
                            <p className="flex justify-between text-sm text-gray-700 dark:text-white">
                                <span>Shipping Fee:</span>
                                <span>Free</span>
                            </p>
                            <p className="flex justify-between text-sm text-gray-900 dark:text-primary font-semibold">
                                <span>Total:</span>
                                <span>${totalPrice.toFixed(2)}</span>
                            </p>
                        </div>
                    </div>

                    <div className="p-6 border-t border-gray-200 w-full">
                        <Link
                            href='/checkout'
                            className="py-3 text-white bg-primary rounded-md hover:bg-primary-dark transition-all">
                            <button
                                onClick={handlePayment}
                                className='w-full'>
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
