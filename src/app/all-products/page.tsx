import React from 'react';
import { getProducts } from './api/route';

const page = async () => {
    const products: [] = await getProducts();
    return (
        <div>
            {
                products.length
            }
        </div>
    );
};

export default page;