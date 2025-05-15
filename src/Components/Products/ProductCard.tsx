import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
// Define the Product type
interface Product {
    _id: string;
    product_name: string;
    img: string;
    product_price: number;
    category: string;
    item?: object;
}
// Define the Product Card type
interface ProductCardProps {
    item: Product;
}
export default function ProductCard({ item }: ProductCardProps) {
    const { _id, product_name, img, product_price, category }: Product = item;
    return (

        <div className='group border border-gray-300 rounded-lg shadow-lg h-full p-4 max-w-sm bg-white dark:bg-darkCard transition w-80  md:w-auto'>
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
                <h4 className='text-medium font-semibold  mb-2'>{product_name}</h4>
                <p className='text-sm text-gray-600 dark:text-white'>{category}</p>
                <p className='text-medium font-bold text-green-700 mt-1'>
                    ৳<span>{product_price}</span>
                </p>
                {/* <p className='text-xs text-gray-500 mt-1'>--- Sold | Review</p> */}
            </div>

            {/* Call-to-Action Button */}
            <Link className='text-center w-full' href={`/product/${_id}`}>
                <button className='w-full bg-primary hover:bg-primary-dark mt-3 py-2 text-white font-medium rounded-md transition'>
                    View Details
                </button>
            </Link>
        </div>



    )
}
