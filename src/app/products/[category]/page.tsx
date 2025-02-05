'use client'
import ProductCard from "@/components/Products/ProductCard";
import Loading from "@/app/loading";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useGetDetailsCategory } from "./api/route";
import CategoryFilter from "@/components/Filter/CategoryFilter";
import { Pagination } from "@nextui-org/react";
export const dynamic = 'force-dynamic';
type CategoryParams = {
    category: string;
};
const Page = () => {
    const { category } = useParams<CategoryParams>();
    const [brand, setBrand] = useState<string>('');
    const [color, setColor] = useState<string>('');
    const [priceSort, setPriceSort] = useState<string>('');
    const [page, setPage] = useState<number>(1);

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
    const itemsPerPage = 12;
    const totalPages = Math.ceil(products.length / itemsPerPage);

    // Get products for the current page
    const paginatedProducts = products.slice((page - 1) * itemsPerPage, page * itemsPerPage);
    return (
        <section>
            <div className="text-center bg-gradient-to-br from-primary to-accent text-white py-8 px-4 rounded-md shadow-md mb-8">
                <h2 className="text-3xl font-bold mb-2">{displayCategory}</h2>
                <p className="text-medium">Explore the best {category} we offer</p>
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
                    < h2 className='text-center text-xl text-red-700 font-semibold'>No Product Found</h2>
                }
            </div>
            <div className='grid md:grid-cols-3 lg:grid-cols-4 gap-8'>
                {
                    paginatedProducts.map((item) => <ProductCard
                        key={item._id}
                        item={item}
                    >
                    </ProductCard>)
                }
            </div>
            {/* Pagination */}
            <div className="mt-10 flex justify-center gap-5">
                <Pagination
                    loop
                    showControls
                    color="success"
                    initialPage={1}
                    total={totalPages}
                    page={page}
                    onChange={(newPage) => setPage(newPage)}
                />
            </div>
        </section>
    );
};

export default Page;