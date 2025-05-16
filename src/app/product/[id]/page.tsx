'use client'
import { useParams } from "next/navigation";
import Image from "next/image";
import { GetProductDetails } from "./api/rote";
import Loading from "@/app/loading";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { useAddToCart } from "@/app/cart/api/route";
export const dynamic = 'force-dynamic';
// Define the Details type


const Page = () => {
    const addToCart = useAddToCart()
    const { data } = useSession();
    // const { uuid, email } = data;
    // const router = useRouter('')
    const { id } = useParams();
    const { data: details, isLoading, isError, error } = GetProductDetails(id as string);

    if (isLoading) return <Loading />;
    if (isError)
        return (
            <p className="text-center text-red-700">
                Error: {error && (typeof error === "string" ? error : error.message)}
            </p>
        );


    const {
        _id,
        product_name,
        img,
        product_price,
        category,
        brand,
        color,
        status,
        ...specs
    } = details;


    // add To cart
    const handleAddToCart = async () => {
        // user validation
        if (!data) {
            return toast.error('please login first')
        }
        // get Product
        const cartItem = {
            uuid: data?.user?.uuid,
            email: data?.user?.email,
            product_id: _id,
            product_name: product_name,
            category: category,
            brand: brand,
            price: product_price,
            color: color,
            img: img
        }
        await addToCart.mutateAsync(cartItem);
    }

    const renderSpecifications = () => {
        switch (category) {
            case "laptop":
                return (
                    <>
                        <p className="text-base">Processor: {specs.laptop_processor}</p>
                        <p className="text-base">RAM: {specs.laptop_ram}</p>
                        <p className="text-base">Storage: {specs.laptop_storage}</p>
                        <p className="text-base">Display: {specs.laptop_display}</p>
                        <p className="text-base">Battery: {specs.laptop_battery}</p>
                        <p className="text-base">Ports: {specs.laptop_ports}</p>

                    </>
                );
            case "monitor":
                return (
                    <>
                        <p className="text-base">Screen Size: {specs.monitor_screen}</p>
                        <p className="text-base">Resolution: {specs.monitor_resolution}</p>
                        <p className="text-base">Ports: {specs.monitor_ports}</p>

                    </>
                );
            case "smart_phone":
                return (
                    <>
                        <p className="text-base">Model: {specs.smart_phone_model}</p>
                        <p className="text-base">Storage: {specs.smart_phone_storage}</p>
                        <p className="text-base">RAM: {specs.smart_phone_ram}</p>
                        <p className="text-base">Battery: {specs.smart_phone_battery}</p>
                        <p className="text-base">Camera: {specs.smart_phone_camera}</p>

                    </>
                );
            case "smart_watch":
                return (
                    <>
                        <p className="text-base">Model: {specs.smart_watch_model}</p>
                        <p className="text-base">Battery: {specs.smart_watch_battery}</p>
                        <p className="text-base">Features: {specs.smart_watch_features}</p>

                    </>
                );
            case "smart_tv":
                return (
                    <>
                        <p className="text-base">Screen Size: {specs.smart_tv_screen}</p>
                        <p className="text-base">Resolution: {specs.smart_tv_resolution}</p>
                        <p className="text-medium">RAM: {specs.smart_tv_ram}</p>
                        <p className="text-base">Features: {specs.smart_tv_features}</p>
                        <p className="text-base">Ports: {specs.smart_tv_ports}</p>

                    </>
                );
            default:
                return <p>No additional specifications available.</p>;
        }
    };

    return (
        <section className="mt-10">
            <head>
                <title>Electro-Hub | Products</title>
            </head>
            {/* Heading */}
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-accent dark:text-white">Product Details</h2>
                <p className="text-gray-700 dark:text-white">
                    Comprehensive details about the selected product
                </p>
            </div>

            {/* Content */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                {/* Product Image */}
                <Image
                    src={img}
                    alt={product_name}
                    width={100}
                    height={100}
                    layout="responsive"
                    className="rounded-lg shadow-lg"
                />

                {/* Product Details */}
                <div className="bg-gray-100 dark:bg-darkCard shadow-md rounded-lg p-6 max-w-3xl mx-auto border">
                    <p className="text-sm text-gray-700 dark:text-white mb-4">
                        <span className="font-medium">Product ID:</span> {_id}
                    </p>
                    <h1 className="text-xl font-bold text-accent dark:text-white mb-4">
                        {product_name}
                    </h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <p className="text-base">
                            <span className="font-medium text-accent dark:text-white">Price:</span>{" "}
                            <span className="text-green-600 font-medium">৳{product_price}</span>
                        </p>
                        <p className="text-base">
                            <span className="font-medium text-accent dark:text-white">Category:</span> {category}
                        </p>
                        <p className="text-base">
                            <span className="font-medium text-accent dark:text-white">Brand:</span> {brand}
                        </p>
                        <p className="text-base">
                            <span className="font-medium text-accent dark:text-white">Color:</span>{" "}
                            {color || "Not Specified"}
                        </p>
                    </div>

                    {/* Specifications */}
                    <div className="mb-4">{renderSpecifications()}</div>

                    {/* Description */}
                    <div className="mb-4">
                        <h3 className="text-base font-semibold text-gray-800 dark:text-white">Description:</h3>
                        <p className="text-gray-700 dark:text-white italic text-base">
                            {specs.laptop_description ||
                                specs.monitor_description ||
                                specs.smart_phone_description ||
                                specs.smart_watch_description ||
                                specs.smart_tv_description}
                        </p>
                    </div>

                    {/* Actions */}

                    {
                        status === 'in_stock' && <div className="mt-2">
                            <button
                                onClick={() => handleAddToCart()}
                                className="w-full bg-primary text-center text-white py-2 rounded-md">
                                Add To Cart
                            </button>
                        </div>
                    }
                    {
                        status === 'out_of_stock' && <div className="mt-2">
                            <button
                                disabled
                                className="w-full bg-red-500 text-center text-white py-2 rounded-md disabled:cursor-not-allowed">
                                Out of Stock
                            </button>
                        </div>
                    }
                </div>
            </div>
        </section>
    );
};
export default Page;
