'use client'
import ProductManagement from '../../Components/Dashboard/ProductManagement'
import OrderManagement from '../../Components/Dashboard/OrderManagement'
import UserNReview from '../../Components/Dashboard/UserNReview'
import { useSession } from 'next-auth/react';
import Loading from '../loading';
export const dynamic = 'force-dynamic';

export default function AdminDashboard() {
    const session = useSession();
    if (session?.status == 'loading') return <Loading />
    const userName = session?.data?.user?.name;
    const isAdmin = session?.data?.user?.role === 'admin';
    if (!isAdmin) {
        return <p>Unauthorized Accesses.</p>
    }
    return (
        <section className="mt-0 p-6 bg-gray-50 dark:bg-darkCard rounded-lg">
            <head>
                <title>Electro-Hub | Admin Dashboard</title>
            </head>
            <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-accent dark:text-white">Admin Dashboard</h2>
                <h3 className="text-xl font-semibold text-accent mt-2 dark:text-white">
                    Welcome, <span className="text-green-600">{userName}</span>
                </h3>
                <p className="text-gray-700 dark:text-white mt-1">Manage your tools effectively</p>
            </div>

            {/* Management Cards */}
            <div className="space-y-8 ">
                {/* Product Management */}
                <div className="bg-white dark:bg-darkBackground p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-primary">
                    {/* <h4 className="text-2xl font-semibold text-gray-700 mb-4">Product Management</h4> */}
                    <ProductManagement />
                </div>

                {/* Order Management */}
                <div className="bg-white dark:bg-darkBackground p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-primary">

                    <OrderManagement />
                </div>

                {/* User & Review Management */}
                <div className="bg-white dark:bg-darkBackground p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-primary">

                    <UserNReview />
                </div>
            </div>
        </section>


    )
}
