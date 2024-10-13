import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function ProductManagement() {
    return (
        <div className='mt-10'>
            <div>
                <h3 className='text-2xl font-bold'>Product Management</h3>
            </div>
            <div className='grid lg:grid-cols-5 gap-4 mt-5'>
                <Link href='/admin-dashboard/add-product'>
                    <div className='border hover:border-none md:w-40 flex flex-col items-center p-3 bg-white space-y-2 hover:shadow border-primary rounded-md shadow-2xl lg:transition lg:hover:scale-105 group'>
                        <Image src='/assets/add-product.png' alt='add-product' height='50' width='50' />
                        <div>
                            <h2 className='text-xl group-hover:text-accent duration-300 text-center'>Add a new product</h2>
                        </div>
                    </div>
                </Link>
                <Link href='/admin-dashboard/manage-product'>
                    <div className='border hover:border-none md:w-40 flex flex-col items-center p-3 bg-white space-y-2 hover:shadow border-primary rounded-md shadow-2xl lg:transition lg:hover:scale-105 group'>
                        <Image src='/assets/new-product.png' alt='add-product' height='50' width='50' />
                        <div>
                            <h2 className='text-xl group-hover:text-accent duration-300 text-center'>Manage Products</h2>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    )
}
