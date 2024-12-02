import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function ProductManagement() {
    return (
        <div className=''>
            <div>
                <h3 className='text-2xl font-bold text-accent'>Product Management</h3>
            </div>
            <div className="grid lg:grid-cols-5 gap-6 mt-8">
                {/* Add Product Card */}
                <Link href="/admin-dashboard/add-product">
                    <div className="group bg-secondary border rounded-lg shadow-md p-5 flex flex-col items-center space-y-4 transition-transform duration-300 hover:scale-105 hover:shadow-xl border-accent hover:border-primary">
                        <Image
                            src="/assets/add-product.png"
                            alt="Add Product"
                            height={50}
                            width={50}
                            className="group-hover:rotate-12 transition-transform duration-300"
                        />
                        <h2 className="text-lg font-semibold text-accent text-center group-hover:text-green-600">
                            Add a New Product
                        </h2>
                    </div>
                </Link>

                {/* Manage Products Card */}
                <Link href="/admin-dashboard/manage-product">
                    <div className="group bg-secondary border border-accent rounded-lg shadow-md p-5 flex flex-col items-center space-y-4 transition-transform duration-300 hover:scale-105 hover:shadow-xl hover:border-primary">
                        <Image
                            src="/assets/new-product.png"
                            alt="Manage Products"
                            height={50}
                            width={50}
                            className="group-hover:rotate-12 transition-transform duration-300"
                        />
                        <h2 className="text-lg font-semibold text-accent text-center group-hover:text-green-600">
                            Manage Products
                        </h2>
                    </div>
                </Link>
            </div>



        </div>
    )
}
