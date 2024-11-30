import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
interface Item {
    _id: string;
}
export default function ProductCard({ item }: Item) {
    // console.log(item)
    const { _id, product_name, img, product_price, category } = item;
    return (

        <div className='group border border-gray-300 rounded-lg shadow-lg p-4 max-w-sm bg-white transition'>
            {/* Product Image */}
            <figure className='mb-4 overflow-hidden rounded-md'>
                <Image
                    className='object-cover w-full h-48 transition-transform duration-300 ease-in-out group-hover:scale-110'
                    src={img}
                    alt={product_name}
                    width={300}
                    height={200}
                />
            </figure>

            {/* Product Info */}
            <div className='mt-3'>
                <h4 className='text-lg font-semibold text-accent mb-2'>{product_name}</h4>
                <p className='text-sm text-gray-600'>{category}</p>
                <p className='text-lg font-bold text-accent mt-1'>
                    ৳<span>{product_price}</span>
                </p>
                <p className='text-xs text-gray-500 mt-1'>--- Sold | Review</p>
            </div>

            {/* Call-to-Action Button */}
            <button className='w-full bg-primary hover:bg-primary-dark mt-3 py-2 text-white font-medium rounded-md transition'>
                <Link className='text-center w-full' href={`/product/${_id}`}>
                    View Details
                </Link>
            </button>
        </div>



    )
}
