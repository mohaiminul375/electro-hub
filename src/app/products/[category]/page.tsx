'use client'
import ProductCard from "@/Components/Products/ProductCard";
import Loading from "@/app/loading";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useGetDetailsCategory } from "./api/route";
import CategoryFilter from "@/Components/Filter/CategoryFilter";

type CategoryParams = {
    category: string;
};
const Page = () => {
    const { category } = useParams<CategoryParams>();
    const [brand, setBrand] = useState<string>('');
    const [color, setColor] = useState<string>('');
    const [priceSort, setPriceSort] = useState<string>('');

    const categoryMap: Record<string, string> = {
        smart_phone: "Smart Phone",
        laptop: "Laptop",
        smart_watch: "Smart Watch",
        monitor: 'Monitor',
        smart_tv: 'Smart Tv',
        accessories: 'Accessories'
    };

    // Fallback to category itself if not mapped
    const displayCategory = categoryMap[category] || category;
    // get products by category
    const { data: products = [], isLoading, isError, error } = useGetDetailsCategory({ category, brand, color, priceSort })
    if (isLoading) {
        return <Loading />
    }
    // Handle loading state
    if (isLoading) return <Loading />;
    // Handle error state
    if (isError) return <p className="text-center text-red-700">Error: {error && (typeof error === "string" ? error : error.message)}</p>;
    return (
        <section>
            <div className="text-center bg-gradient-to-br from-primary to-accent text-white py-8 px-4 rounded-md shadow-md mb-8">
                <h2 className="text-3xl font-bold mb-2">{displayCategory}</h2>
                <p className="text-lg">Explore the best {category} we offer</p>
            </div>
            <div className="mb-6">
                {/* <ProductFilter /> */}
                <CategoryFilter
                    setBrand={setBrand}
                    setColor={setColor}
                    setPriceSort={setPriceSort}
                    category={category}
                />
            </div>
            <div>
                {
                    products.length === 0 &&
                    < h2 className='text-center text-xl text-red-700 font-semibold'>No Product Fount</h2>
                }
            </div>
            <div className='grid md:grid-cols-3 lg:grid-cols-4 gap-8'>
                {
                    products.map((item) => <ProductCard
                        key={item._id}
                        item={item}
                    >
                    </ProductCard>)
                }
            </div>
        </section>
    );
};

export default Page;