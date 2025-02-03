'use client'
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import { useGetShippedOrders } from "./api/route";
import Loading from "@/app/loading";
import ShippedTable from "@/components/Dashboard/ShippedOrders/ShippedTable";


const Page = () => {
    const { data: orders = [], isLoading, isError, error } = useGetShippedOrders();
    if (isLoading) return <Loading />;
    // Handle error state
    if (isError) return <p className="text-center text-red-700">Error: {error && (typeof error === "string" ? error : error.message)}</p>;
    console.log(orders)
    return (
        <section>
            {/* Back Button */}
            <div className="mt-6 inline-block">
                <Link
                    href="/admin-dashboard"
                    className="flex items-center gap-3 rounded-lg bg-white border border-gray-400 text-lg px-4 py-2 text-accent hover:bg-gray-300 hover:border-gray-500 transition duration-200"
                >
                    <FaArrowLeft className="text-accent" />
                    <span>Back to Dashboard</span>
                </Link>
            </div>

            {/* Registered Users Header */}
            <div className="mb-10 mt-4 text-center">
                <h3 className="text-3xl font-bold text-accent">All Shipped Order</h3>
                <h4 className="text-md text-gray-700 mt-2">
                    See those orders are shipped.
                </h4>
            </div>
            <div>
                <div className="overflow-x-auto">
                    <table className="min-w-full table-auto border-collapse">
                        <thead className="bg-primary text-white">
                            <tr>
                                <th className="px-4 py-2 text-left">#</th>
                                <th className="px-4 py-2 text-left">Order Id</th>
                                <th className="px-4 py-2 text-left">Customer Info</th>
                                <th className="px-4 py-2 text-left">Address</th>
                                <th className="px-4 py-2 text-left">Products</th>
                                <th className="px-4 py-2 text-left">Shipped At</th>
                                <th className="px-4 py-2 text-left">Status</th>
                                <th className="px-4 py-2 text-left">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                orders?.map((order, idx) => (
                                    <ShippedTable
                                        idx={idx}
                                        key={idx}
                                        order={order}
                                    />
                                ))
                            }


                        </tbody>
                    </table>
                </div>
                {
                    orders?.length === 0 && <p className='text-red-700 text-center font-bold text-2xl mt-10'>
                        No products have been shipped yet.
                    </p>
                }
            </div>
        </section>
    );
};

export default Page;