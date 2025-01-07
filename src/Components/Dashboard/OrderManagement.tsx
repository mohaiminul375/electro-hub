import Image from "next/image";
import Link from "next/link";


export default function OrderManagement() {
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
                            Pending Orders
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
                            Package Orders
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
                            Shipping Orders
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
                            Shipped
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
                            Delivered
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
                            All Orders
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
                            Cancel Orders
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
                            Payment History
                        </h2>
                    </div>
                </Link>
            </div>
        </div>
    )
}