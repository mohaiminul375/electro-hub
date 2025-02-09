'use client'
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import { AllCanceledOrdersAdmin } from "./api/route";
import Loading from "@/app/loading";
import CanceledTable from "@/components/Dashboard/CanceledTable/CanceledTable";


const Page = () => {
    const { data: orders = [], isLoading, isError, error } = AllCanceledOrdersAdmin();
    // Handle loading state
    if (isLoading) return <Loading />;

    // Handle error state
    if (isError) return (
        <p className="text-center text-red-700">
            Error: {error && (typeof error === "string" ? error : error.message)}
        </p>
    );
    return (
        <section>
            {/* filter and sorting */}
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

                {/* Manage Product Header */}
                <div className="mb-4 mt-2 text-center">
                    <h3 className="text-3xl font-bold text-accent">All Approved Orders</h3>
                    <h4 className="text-md text-gray-700 mt-2">
                        From Here All orders will package and shipped
                    </h4>
                </div>
            </div>
            {/* Table */}
            <div>
                <div className="overflow-x-auto">
                    <table className="min-w-full table-auto border-collapse">
                        <thead className="bg-primary text-white">
                            <tr>
                                <th className="px-4 py-2 text-left">#</th>
                                <th className="px-4 py-2 text-left">Order Id <br />
                                    Create Time
                                </th>
                                <th className="px-4 py-2 text-left">
                                    Canceled Time
                                </th>
                                <th className="px-4 py-2 text-left">Customer Info</th>
                                <th className="px-4 py-2 text-left">Address</th>
                                <th className="px-4 py-2 text-left">Item</th>
                                <th className="px-4 py-2 text-left">Status</th>
                                <th className="px-4 py-2 text-left">Canceled By</th>
                                <th className="px-4 py-2 text-left">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                orders?.map((order, idx) => (
                                    <CanceledTable
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
                        All orders have been packed.
                    </p>
                }
            </div>
        </section>
    );
};

export default Page;