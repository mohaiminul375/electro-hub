'use client'
import Loading from "@/app/loading";
import ProductCard from "../Products/ProductCard";
import { useGetHomeProducts } from "./api/route"

export default function ForYou() {
    const { data: products = [], isLoading, isError, error } = useGetHomeProducts();
    if (isLoading) return <Loading />;
    // Handle error state
    if (isError) return <p className="text-center text-red-700">Error: {error && (typeof error === "string" ? error : error.message)}</p>;
    return (

        <section className='mt-10'>

            <div>
                <h2 className='text-3xl font-semibold px-3 md:px-0'>For You</h2>
            </div>
            {/* Products */}
            <div className='mt-5'>
                <div>
                    {
                        products.length === 0 &&
                        < h2 className='text-center text-xl text-red-700 font-semibold'>No Product Found</h2>
                    }
                </div>
                <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {products?.map((item) => (
                        <ProductCard key={item._id} item={item} />
                    ))}
                </div>
            </div>
        </section>
    )
}
