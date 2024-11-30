'use client'
import ProductCard from "@/app/Components/Products/ProductCard";
import Loading from "@/app/loading";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

type CategoryParams = {
    category: string;
};
const Page = () => {
    const { category } = useParams<CategoryParams>();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    // Define a type-safe mapping for categories
    const categoryMap: Record<string, string> = {
        "smart-phone": "Smart Phone",
        "laptop": "Laptop",
        "smart-watch": "Smart Watch",
        "monitor": 'Monitor',
        'smart-tv': 'Smart Tv',
        'accessories': 'Accessories'
    };

    // Fallback to category itself if not mapped
    const displayCategory = categoryMap[category] || category;
    // get products by category
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true)
                const res = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/products/${category}`)
                setProducts(res.data);
            }
            catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
        fetchProduct()
    }, [category])

    if (loading) {
        return <Loading></Loading>
    }



    console.log(products);







    return (
        <div>
            <div className="text-center bg-gradient-to-br from-primary to-accent text-white py-8 px-4 rounded-md shadow-md mb-8">
                <h2 className="text-3xl font-bold mb-2">{displayCategory}</h2>
                <p className="text-lg">Explore the best {category} we offer</p>
            </div>
            <div className='grid md:grid-cols-3 lg:grid-cols-4 gap-8'>
                {
                    products.map(item => <ProductCard
                        key={item._id}
                        item={item}
                    >
                    </ProductCard>)
                }
            </div>
        </div>
    );
};

export default Page;