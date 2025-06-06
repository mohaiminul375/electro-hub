'use client'
import Loading from "@/app/loading";
import { useToDeliveredProductsUsers } from "@/app/my-orders/api/route";
import { useSession } from "next-auth/react";
import Image from "next/image";

const DeliveredUser = () => {
    const { data } = useSession();
    const uuid = data?.user?.uuid;
    const { data: items = [], isLoading, isError, error } = useToDeliveredProductsUsers(uuid as string);

    if (isLoading) return <Loading />;
    if (isError) return <p className="text-center text-red-700">Error: {error && (typeof error === "string" ? error : error.message)}</p>;
    return (
        <section className="p-4">
            {items?.map((order) => (
                <div
                    key={order._id}
                    className="bg-gray-50 dark:bg-darkBackground border border-gray-300 rounded-lg shadow-md p-4 my-4"
                >
                    <div className="flex flex-wrap justify-between items-center">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                            Order ID: {order.order_id}<br />
                            <span className="text-base font-light dark:text-white">Date: {new Date(order.orderCreatedAt).toLocaleString()}<br /></span>
                        </h3>
                        <h5 className="bg-primary p-2 rounded-full text-white text-xs">
                            {order.order_status}
                        </h5>
                    </div>
                    {order?.products?.map((product) => (
                        <div
                            key={product.product_id}
                            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-4 items-center border-b border-gray-200 py-4"
                        >
                            <div className="col-span-2 flex justify-center">
                                <Image
                                    src={product.img}
                                    alt={product.product_name}
                                    height={64}
                                    width={64}
                                    className="rounded-lg"
                                />
                            </div>

                            <div className="col-span-4">
                                <h5 className="text-base font-medium text-gray-900 dark:text-white">
                                    {product.product_name}
                                </h5>
                                <p className="text-sm text-gray-500 dark:text-white">Color: {product.color}</p>
                                <p className="text-sm text-gray-500 dark:text-white">Brand: {product.brand}</p>
                            </div>

                            <div className="col-span-2 text-center">
                                <p className="text-base font-medium text-primary">
                                    ৳{product.price}
                                </p>
                            </div>

                            <div className="col-span-2 text-center">
                                <p className="text-base text-gray-500 dark:text-white">Quantity: {product.quantity}</p>
                            </div>

                            <div className="col-span-2 text-center">
                                <p className="text-base text-gray-500 dark:text-white">Category: {product.category}</p>
                            </div>
                        </div>
                    ))}
                </div>
            ))}
        </section>
    );
};

export default DeliveredUser;
