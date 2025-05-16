'use client'

import Link from "next/link";
import { FaArrowLeft, FaSearch } from "react-icons/fa";
import { useGetPaymentHistory } from "./api/route";
import Loading from "@/app/loading";
import PaymentHistoryTable from "@/components/Dashboard/Product-Update/Payment-History/PaymentHistoryTable";
import { useState } from "react";


const PaymentHistory = () => {
    const [tranId, setTranId] = useState('');
    const { data: payments = [], isLoading, isError, error } = useGetPaymentHistory(tranId);
    // Handle error state
    if (isError) return <p className="text-center text-red-700">Error: {error && (typeof error === "string" ? error : error.message)}</p>;
    // search func by tran Id
    const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const enteredOrderId = (e.currentTarget.tranId as HTMLInputElement).value;
        setTranId(enteredOrderId);
    };

    return (
        <section>
            <head>
                <title>Electro-Hub | Payment History</title>
            </head>
            {/*Heading  */}
            <div className="mt-2">
                {/* Back Button */}
                <div className="inline-block">
                    <Link
                        href="/admin-dashboard"
                        className="flex items-center gap-3 rounded-lg bg-gray-100 border border-gray-300 text-lg px-4 py-2 text-accent hover:bg-gray-200 hover:border-gray-400 transition duration-200"
                    >
                        <FaArrowLeft className="text-accent" />
                        <span>Back to Dashboard</span>
                    </Link>
                </div>
                {/* Payment History Header */}
                <div className="mb-4 mt-2 text-center">
                    <h3 className="text-3xl font-bold text-accent dark:text-white">Payment History</h3>
                    <h4 className="text-md text-gray-700 dark:text-white mt-2">
                        View and manage your complete transaction history, including successful and failed payments.
                    </h4>
                </div>
            </div>
            {/*  */}
            <div>
                {/* Search */}
                <div className="flex items-center justify-center h-10 mb-5">
                    <form
                        onSubmit={handleSearchSubmit}
                        className="flex items-center bg-white text-gray-400 rounded-lg overflow-hidden shadow-md min-w-80 md:ml-6 lg:w-[500px] h-10">
                        <input
                            name="tranId"
                            type="text"
                            placeholder="Search by transaction Id"
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
                            <tr className="">
                                <th className="px-4 py-2 text-left">#</th>
                                <th className="px-4 py-2 text-left">TrxId</th>
                                <th className="px-4 py-2 text-left">Name & Email</th>
                                <th className="px-4 py-2 text-left">Phone </th>
                                <th className="px-4 py-2 text-left">Status</th>
                                <th className="px-4 py-2 text-left">Payment Method & Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                payments?.map((payment, idx) => (
                                    <PaymentHistoryTable
                                        idx={idx}
                                        key={idx}
                                        payment={payment}
                                    />
                                ))
                            }


                        </tbody>
                    </table>
                </div>
                <div>
                    {isLoading ? (
                        <Loading />
                    ) : payments?.length === 0 ? (
                        <p className="text-red-700 text-center font-bold text-2xl mt-10">
                            {tranId ? "payment data not found." : "No data found."}
                        </p>
                    ) : null}
                </div>
            </div>
        </section>
    );
};

export default PaymentHistory;