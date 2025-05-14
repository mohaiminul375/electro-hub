import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function UserNReview() {
    return (
        <div className=''>
            <div>
                <h3 className='text-2xl font-bold text-accent dark:text-white'>Users And Review Management</h3>
            </div>
            <div className="grid lg:grid-cols-5 gap-6 mt-8">
                {/* All Users Card */}
                <Link href="/admin-dashboard/all-users">
                    <div className="group bg-secondary dark:bg-darkCard border border-accent rounded-lg shadow-md p-5 flex flex-col items-center space-y-4 transition-transform duration-300 hover:scale-105 hover:shadow-xl h-full hover:border-primary">
                        <Image
                            src="/assets/users.png"
                            alt="All Users"
                            height={50}
                            width={50}
                            className="group-hover:rotate-12 transition-transform duration-300 dark:bg-white rounded-md"
                        />
                        <h2 className="text-lg font-semibold text-accent dark:text-white text-center group-hover:text-green-600">
                            All Users
                        </h2>
                    </div>
                </Link>

                {/* Manage Reviews Card */}
                <Link href="/admin-dashboard/manage-reviews">
                    <div className="group bg-secondary dark:bg-darkCard border border-accent  rounded-lg shadow-md p-5 flex flex-col items-center space-y-4 transition-transform duration-300 hover:scale-105 hover:shadow-xl h-full hover:border-primary">
                        <Image
                            src="/assets/users-review.png"
                            alt="Manage Reviews"
                            height={50}
                            width={50}
                            className="group-hover:rotate-12 transition-transform duration-300 dark:bg-white rounded-md"
                        />
                        <h2 className="text-lg font-semibold text-accent dark:text-white text-center group-hover:text-green-600">
                            Manage Users Review
                        </h2>
                    </div>
                </Link>

                {/* Placeholder Card */}
                <div className="group bg-[#f9f9f9] dark:bg-darkCard  border border-gray-200 rounded-lg shadow-md p-5 flex flex-col items-center space-y-4 transition-transform duration-300 hover:scale-105 hover:shadow-xl h-full">
                    <h2 className="text-lg font-semibold text-gray-700 dark:text-white text-center group-hover:text-green-600">
                        Lorem Ipsum
                    </h2>
                </div>
            </div>

        </div>
    )
}
