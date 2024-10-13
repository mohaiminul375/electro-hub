import React from 'react'
import ProductManagement from '../Components/Dashboard/ProductManagement'
import OrderManagement from '../Components/Dashboard/OrderManagement'
import UserNReview from '../Components/Dashboard/UserNReview'

export default function page() {
    return (
        <section className='pt-10'>
            <div>
                <h2 className='text-2xl font-bold'>Admin Dashboard</h2>
                <h2 className='text-2xl font-bold'>Welcome, Mohaiminul Islam</h2>
                <p>Here your manageable tools</p>
            </div>
            {/* menu for admin */}
            <div className='mt-10'>
                {/*  product management*/}
                <ProductManagement />
                <OrderManagement />
                <UserNReview />
            </div>
        </section>
    )
}
