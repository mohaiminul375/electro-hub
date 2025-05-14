'use client'
import Link from "next/link";
import { FaArrowLeft, FaSearch } from "react-icons/fa";
import { useGetAllOrdersAdmin } from "./api/route";
import Loading from "@/app/loading";
import AllOrdersTable from "@/components/Dashboard/AllOrders/AllOrdersTable";
import { useEffect, useState } from "react";

const Page = () => {
    const [isClient, setIsClient] = useState(false);
    const [orderId, setOrderId] = useState('');
    const { data: orders = [], isLoading, isError, error } = useGetAllOrdersAdmin(orderId);
    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        return null;
    }
    // Handle error state
    if (isError) return (
        <p className="text-center text-red-700">
            Error: {error && (typeof error === "string" ? error : error.message)}
        </p>
    );
    // Search by order Id
    const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const enteredOrderId = (e.currentTarget.orderId as HTMLInputElement).value;
        setOrderId(enteredOrderId);
    };
    return (
        <section>
            {/* Back Button */}
            <div className="mt-2 inline-block">
                <Link
                    href="/admin-dashboard"
                    className="flex items-center gap-3 rounded-lg bg-white border border-gray-400 text-lg px-4 py-2 text-accent hover:bg-gray-300 hover:border-gray-500 transition duration-200"
                >
                    <FaArrowLeft className="text-accent" />
                    <span>Back to Dashboard</span>
                </Link>
            </div>

            {/* Registered Users Header */}
            <div className="mb-4 mt-2 text-center">
                <h3 className="text-3xl font-bold text-accent dark:text-white">All Orders</h3>
                <h4 className="text-md text-gray-700 dark:text-white mt-2">
                    See All Orders and Details
                </h4>
            </div>
            <div>
                {/* Search */}
                <div className="flex items-center justify-center h-10 mb-5">
                    <form
                        onSubmit={handleSearchSubmit}
                        className="flex items-center bg-white text-gray-400 rounded-lg overflow-hidden shadow-md min-w-80 md:ml-6 lg:w-[500px] h-10">
                        <input
                            name="orderId"
                            type="text"
                            placeholder="Search by order Id"
                            className="px-4 py-3 text-base bg-white text-gray-700 focus:outline-none focus:ring focus:ring-[#72BF44] w-full"
                        />
                        <button
                            className="px-4 py-5 bg-primary text-white hover:bg-hoverPrimary duration-700 focus:outline-none focus:ring focus:ring-[#72BF44] flex items-center justify-center"
                        >
                            <FaSearch />
                        </button>
                    </form>
                </div>
                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="min-w-full table-auto border-collapse">
                        <thead className="bg-primary text-white">
                            <tr>
                                <th className="px-4 py-2 text-left">#</th>
                                <th className="px-4 py-2 text-left">Order Id</th>
                                <th className="px-4 py-2 text-left">Customer Info</th>
                                <th className="px-4 py-2 text-left">Address</th>
                                <th className="px-4 py-2 text-left">Products</th>
                                <th className="px-4 py-2 text-left">Payment Info</th>
                                <th className="px-4 py-2 text-left">Status</th>
                                <th className="px-4 py-2 text-left">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                orders?.map((order, idx) => (
                                    <AllOrdersTable
                                        idx={idx}
                                        key={idx}
                                        order={order}
                                    />
                                ))
                            }


                        </tbody>
                    </table>
                </div>
                <div>
                    {isLoading ? (
                        <Loading />
                    ) : orders?.length === 0 ? (
                        <p className="text-red-700 text-center font-bold text-2xl mt-10">
                            {orderId ? "Order not found." : "No orders have been created yet."}
                        </p>
                    ) : null}
                </div>
            </div>
        </section >
    );
};

export default Page;