import Image from 'next/image';
import React from 'react'

export default function ProductCard({ item }) {
    // console.log(item)
    const { product_name, img, product_price } = item;
    return (


        < div className='border-2 rounded-lg shadow-lg p-4 max-w-sm' >
            <figure className='mb-4'>
                <Image
                    className='object-cover w-full h-48 rounded-md'
                    src={img}
                    alt={product_name}
                    width={300}
                    height={200}
                />
            </figure>
            {/* Basic Info */}
            <div className='mt-3'>
                <h4 className='text-lg font-semibold text-gray-800 mb-2'>{product_name}</h4>
                <p className='text-lg font-bold text-accent'>৳<span>{product_price}</span></p>
                <p>--- Sold|review</p>
            </div>

        </div >
    )
}
