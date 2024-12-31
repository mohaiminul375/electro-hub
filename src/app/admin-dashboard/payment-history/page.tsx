'use client'

import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import { useGetPaymentHistory } from "./api/route";
import Loading from "@/app/loading";
import PaymentHistoryTable from "@/components/Dashboard/Product-Update/Payment-History/PaymentHistoryTable";


const PaymentHistory = () => {
    const { data: payments = [], isLoading, isError, error } = useGetPaymentHistory();
    if (isLoading) {
        return <Loading />
    }
    console.log(payments)
    if (isError) return <p className="text-center text-red-700">Error: {error && (typeof error === "string" ? error : error.message)}</p>;
    return (
        <section>
            {/* filter and sorting */}
            <div>

            </div>
            {/*Heading  */}
            <div className="mt-6">
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
                <div className="mb-8 mt-4 text-center">
                    <h3 className="text-3xl font-bold text-accent">Payment History</h3>
                    <h4 className="text-md text-gray-700 mt-2">
                        View and manage your complete transaction history, including successful and failed payments.
                    </h4>
                </div>
            </div>
            {/*  */}
            <div>
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
            </div>
        </section>
    );
};

export default PaymentHistory;