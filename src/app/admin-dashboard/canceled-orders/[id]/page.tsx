'use client'
import { useParams } from "next/navigation";
import Loading from "@/app/loading";
import Image from "next/image";
import { useOrdersDetails } from "../../pending-orders/api/route";


const Page = () => {
    const { id } = useParams();
    const { data: order, isLoading, isError, error } = useOrdersDetails(id as string);
    if (isLoading) return <Loading />;
    // Handle error state
    if (isError) return <p className="text-center text-red-700">Error: {error && (typeof error === "string" ? error : error.message)}</p>;



    return (
        <section className="flex flex-col items-center justify-center px-4 py-8">
            <div className="w-full max-w-4xl bg-white dark:bg-darkCard shadow-md rounded-lg p-6">
                <h2 className="text-xl font-bold text-gray-700 dark:text-white mb-4">Order Details</h2>
                <div className="mb-4">
                    <h3 className="font-semibold text-gray-600 dark:text-white">Customer Information</h3>
                    <p className="text-gray-500 dark:text-white">Name: {order?.customer_name}</p>
                    <p className="text-gray-500 dark:text-white">Email: {order?.customer_email}</p>
                    <p className="text-gray-500 dark:text-white">Phone: {order?.customer_Phone}</p>
                    <p className="text-gray-500 dark:text-white">Address: {order?.address.full_address}, {order?.address?.district}, {order?.address.division}</p>
                </div>
                <div className="mb-4">
                    <h3 className="font-semibold text-gray-600 dark:text-white">Order Information</h3>
                    <p className="text-gray-500 dark:text-white">Order ID: {order?.order_id}</p>
                    <p className="text-gray-500 dark:text-white">Transaction ID: {order?.transaction_id}</p>
                    <p className="text-gray-500 dark:text-white">Total Price: {order?.total_price} BDT</p>
                    <p className="text-gray-500 dark:text-white">Payment Method: {order?.payment_method}</p>
                    <p className="text-gray-500 dark:text-white">Order Status: <span className="text-red-700 font-bold">{order?.order_status}</span></p>
                    <p className="text-gray-500 dark:text-white">Order Created At: {order?.orderCreatedAt
                        ? new Date(order.orderCreatedAt).toLocaleDateString()
                        : "Error"}</p>
                    {
                        order?.orderApproveAt &&
                        <p className="text-gray-500 dark:text-white">Order Approved At: {order?.orderApproveAt}</p>
                    }
                    {
                        order?.orderPackedAt &&
                        <p className="text-gray-500 dark:text-white">Order Approved At: {order?.orderPackedAt}</p>
                    }
                    {
                        order?.orderShippedAt &&
                        <p className="text-gray-500 dark:text-white">Order Approved At: {order?.orderShippedAt}</p>
                    }
                    {
                        order?.note && <p className="text-primary mt-4">Note: {order.note}</p>
                    }
                </div>
                <div className="mb-4">
                    <h3 className="font-semibold text-gray-600 dark:text-white">Products</h3>
                    {order?.products?.map((product, index) => (
                        <div key={index} className="flex items-center gap-4 py-2 border-b border-gray-200">
                            <Image src={product.img} alt={product.product_name} className=" rounded-md"
                                height={100}
                                width={100}
                            />
                            <div>
                                <p className="text-gray-600 dark:text-white font-semibold">{product.product_name}</p>
                                <p className="text-gray-500 dark:text-white">Brand: {product.brand}</p>
                                <p className="text-gray-500 dark:text-white">Color: {product.color}</p>
                                <p className="text-gray-500 dark:text-white">Quantity: {product.quantity}</p>
                                <p className="text-gray-500 dark:text-white">Price: {product.price} BDT</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section >
    );
};

export default Page;