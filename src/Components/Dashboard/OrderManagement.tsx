import { GetOrdersSummary } from "@/app/admin-dashboard/api/route";
import Image from "next/image";
import Link from "next/link";


export default function OrderManagement() {
    const { data: ordersSummary, isLoading, isError, error } = GetOrdersSummary();
    if (isLoading) {
        return
    }
    if (isError) return (
        <p className="text-center text-red-700">
            Error: {error && (typeof error === "string" ? error : error.message)}
        </p>
    );
    return (
        <div className='m'>
            <div>
                <h3 className='text-2xl font-bold text-accent'>Order & Payment Management</h3>
            </div>
            <div className="grid lg:grid-cols-5 gap-6 mt-8">
                {/* All Orders Card */}
                <Link href="/admin-dashboard/pending-orders">
                    <div className="group bg-secondary border border-accent rounded-lg shadow-md p-5 flex flex-col items-center space-y-4 transition-transform duration-300 hover:scale-105 hover:shadow-xl h-full hover:border-primary">
                        <Image
                            src="/assets/order-list.png"
                            alt="All Orders"
                            height={50}
                            width={50}
                            className="group-hover:rotate-12 transition-transform duration-300"
                        />
                        <h2 className="text-lg font-semibold text-accent text-center group-hover:text-green-600">
                            Pending Orders<span>({ordersSummary?.pendingOrdersCount})</span>
                        </h2>
                    </div>
                </Link>

                {/* Manage Orders Card */}
                <Link href="/admin-dashboard/packing-orders">
                    <div className="group bg-secondary border border-accent rounded-lg shadow-md p-5 flex flex-col items-center space-y-4 transition-transform duration-300 hover:scale-105 hover:shadow-xl h-full hover:border-primary">
                        <Image
                            src="/assets/package.png"
                            alt="Manage Orders"
                            height={50}
                            width={50}
                            className="group-hover:rotate-12 transition-transform duration-300"
                        />
                        <h2 className="text-lg font-semibold text-accent text-center group-hover:text-green-600">
                            Package Orders<span>({ordersSummary?.approvedOrdersCount})</span>
                        </h2>
                    </div>
                </Link>
                <Link href="/admin-dashboard/ship-orders">
                    <div className="group bg-secondary border border-accent rounded-lg shadow-md p-5 flex flex-col items-center space-y-4 transition-transform duration-300 hover:scale-105 hover:shadow-xl h-full hover:border-primary">
                        <Image
                            src="/assets/shipping.png"
                            alt="Manage Orders"
                            height={50}
                            width={50}
                            className="group-hover:rotate-12 transition-transform duration-300"
                        />
                        <h2 className="text-lg font-semibold text-accent text-center group-hover:text-green-600">
                            Shipping Orders<span>({ordersSummary?.packedOrdersCount})</span>
                        </h2>
                    </div>
                </Link>
                <Link href="/admin-dashboard/shipped-orders">
                    <div className="group bg-secondary border border-accent rounded-lg shadow-md p-5 flex flex-col items-center space-y-4 transition-transform duration-300 hover:scale-105 hover:shadow-xl h-full hover:border-primary">
                        <Image
                            src="/assets/shipped.png"
                            alt="Manage Orders"
                            height={50}
                            width={50}
                            className="group-hover:rotate-12 transition-transform duration-300"
                        />
                        <h2 className="text-lg font-semibold text-accent text-center group-hover:text-green-600">
                            Shipped<span>({ordersSummary?.shippedOrdersCount})</span>
                        </h2>
                    </div>
                </Link>
                <Link href="/admin-dashboard/delivered-orders">
                    <div className="group bg-secondary border border-accent rounded-lg shadow-md p-5 flex flex-col items-center space-y-4 transition-transform duration-300 hover:scale-105 hover:shadow-xl h-full hover:border-primary">
                        <Image
                            src="/assets/delivered.png"
                            alt="Manage Orders"
                            height={50}
                            width={50}
                            className="group-hover:rotate-12 transition-transform duration-300"
                        />
                        <h2 className="text-lg font-semibold text-accent text-center group-hover:text-green-600">
                            Delivered<span>({ordersSummary?.deliveredOrdersCount})</span>
                        </h2>
                    </div>
                </Link>

                {/* Archived Orders Card */}
                <Link href="/admin-dashboard/all-orders">
                    <div className="group bg-secondary border border-accent rounded-lg shadow-md p-5 flex flex-col items-center space-y-4 transition-transform duration-300 hover:scale-105 hover:shadow-xl h-full hover:border-primary">
                        <Image
                            src="/assets/archive.png"
                            alt="Archived Orders"
                            height={50}
                            width={50}
                            className="group-hover:rotate-12 transition-transform duration-300"
                        />
                        <h2 className="text-lg font-semibold text-accent text-center group-hover:text-green-600">
                            All Orders<span>({ordersSummary?.allOrdersCount})</span>
                        </h2>
                    </div>
                </Link>
                <Link href="/admin-dashboard/canceled-orders">
                    <div className="group bg-secondary border border-accent rounded-lg shadow-md p-5 flex flex-col items-center space-y-4 transition-transform duration-300 hover:scale-105 hover:shadow-xl h-full hover:border-primary">
                        <Image
                            src="/assets/cancel.png"
                            alt="Archived Orders"
                            height={50}
                            width={50}
                            className="group-hover:rotate-12 transition-transform duration-300"
                        />
                        <h2 className="text-lg font-semibold text-accent text-center group-hover:text-green-600">
                            Cancel Orders<span>({ordersSummary?.canceledOrdersCount})</span>
                        </h2>
                    </div>
                </Link>
                {/* Payment */}
                <Link href="/admin-dashboard/payment-history">
                    <div className="group bg-secondary border border-accent rounded-lg shadow-md p-5 flex flex-col items-center space-y-4 transition-transform duration-300 hover:scale-105 hover:shadow-xl h-full hover:border-primary">
                        <Image
                            src="/assets/payment-method.png"
                            alt="Archived Orders"
                            height={50}
                            width={50}
                            className="group-hover:rotate-12 transition-transform duration-300"
                        />
                        <h2 className="text-lg font-semibold text-accent text-center group-hover:text-green-600">
                            Payment History<span>({ordersSummary?.paymentHistoryCount})</span>
                        </h2>
                    </div>
                </Link>
            </div>
        </div>
    )
}