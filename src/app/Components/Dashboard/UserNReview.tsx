import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function UserNReview() {
  return (
    <div className='mt-10'>
    <div>
        <h3 className='text-2xl font-bold'>Users And Review Management</h3>
    </div>
    <div className='grid lg:grid-cols-5 gap-4 mt-5'>
        <Link href='/admin-dashboard/all-users'>
            <div className='border hover:border-none md:w-40 flex flex-col items-center p-3 bg-white space-y-2 hover:shadow border-primary rounded-md shadow-2xl lg:transition lg:hover:scale-105 group h-full'>
                <Image src='/assets/users.png' alt='add-product' height='50' width='50' />
                <div>
                    <h2 className='text-xl group-hover:text-accent duration-300 text-center'>All Users</h2>
                </div>
            </div>
        </Link>
        <Link href='/admin-dashboard/manage-reviews'>
            <div className='border hover:border-none md:w-40 flex flex-col items-center p-3 bg-white space-y-2 hover:shadow border-primary rounded-md shadow-2xl lg:transition lg:hover:scale-105 group h-full'>
                <Image src='/assets/users-review.png' alt='add-product' height='50' width='50' />
                <div>
                    <h2 className='text-xl group-hover:text-accent duration-300 text-center'>Manage Users Review</h2>
                </div>
            </div>
        </Link>
        {/* <Link href='/admin-dashboard/manage-orders'> */}
            <div className='border hover:border-none md:w-40 flex flex-col items-center p-3 bg-white space-y-2 hover:shadow border-primary rounded-md shadow-2xl lg:transition lg:hover:scale-105 group h-full'>
                {/* <Image src='/assets/archive.png' alt='add-product' height='50' width='50' /> */}
                <div>
                    <h2 className='text-xl group-hover:text-accent duration-300 text-center'>Lorem ipsum</h2>
                </div>
            </div>
        {/* </Link> */}
    </div>
</div>
  )
}
