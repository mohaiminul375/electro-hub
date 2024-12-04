'use client'
import { useParams } from "next/navigation";
import Image from "next/image";
import { GetProductDetails } from "./api/rote";
import Loading from "@/app/loading";
// Define the Details type


const Page = () => {
    const { id } = useParams();
    const { data: details, isLoading, isError, error } = GetProductDetails(id);

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
        ...specs
    } = details;


    // add To cart
    const handleAddToCart = () => {
        // user validation

        // get Product
        const cartItem = {
            // uuid:
            // email:
            _id: _id,
            product_name: product_name,
            category: category,
            brand: brand,
            color: color,
            price: product_price,
        }
        console.log(cartItem)

    }


    const renderSpecifications = () => {
        switch (category) {
            case "laptop":
                return (
                    <>
                        <p>Processor: {specs.laptop_processor}</p>
                        <p>RAM: {specs.laptop_ram}</p>
                        <p>Storage: {specs.laptop_storage}</p>
                        <p>Display: {specs.laptop_display}</p>
                        <p>Battery: {specs.laptop_battery}</p>
                        <p>Ports: {specs.laptop_ports}</p>
                        <p className="font-semibold">Posted Date: {specs.posted_date}</p>
                    </>
                );
            case "monitor":
                return (
                    <>
                        <p>Screen Size: {specs.monitor_screen}</p>
                        <p>Resolution: {specs.monitor_resolution}</p>
                        <p>Ports: {specs.monitor_ports}</p>
                        <p className="font-semibold">Posted Date: {specs.posted_date}</p>
                    </>
                );
            case "smart-phone":
                return (
                    <>
                        <p>Model: {specs.smart_phone_model}</p>
                        <p>Storage: {specs.smart_phone_storage}</p>
                        <p>RAM: {specs.smart_phone_ram}</p>
                        <p>Battery: {specs.smart_phone_battery}</p>
                        <p>Camera: {specs.smart_phone_camera}</p>
                        <p className="font-semibold">Posted Date: {specs.posted_date}</p>
                    </>
                );
            case "smart-watch":
                return (
                    <>
                        <p>Model: {specs.smart_watch_model}</p>
                        <p>Battery: {specs.smart_watch_battery}</p>
                        <p>Features: {specs.smart_watch_features}</p>
                        <p className="font-semibold">Posted Date: {specs.posted_date}</p>
                    </>
                );
            case "smart-tv":
                return (
                    <>
                        <p>Screen Size: {specs.smart_tv_screen}</p>
                        <p>Resolution: {specs.smart_tv_resolution}</p>
                        <p>RAM: {specs.smart_tv_ram}</p>
                        <p>Features: {specs.smart_tv_features}</p>
                        <p>Ports: {specs.smart_tv_ports}</p>
                        <p className="font-semibold">Posted Date: {specs.posted_date}</p>
                    </>
                );
            default:
                return <p>No additional specifications available.</p>;
        }
    };

    return (
        <section className="mt-10">
            {/* Heading */}
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-accent">Product Details</h2>
                <p className="text-gray-700">
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
                <div className="bg-gray-100 shadow-md rounded-lg p-6 max-w-3xl mx-auto border">
                    <p className="text-sm text-gray-700 mb-4">
                        <span className="font-medium">Product ID:</span> {_id}
                    </p>
                    <h1 className="text-2xl font-bold text-accent mb-4">
                        {product_name}
                    </h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <p>
                            <span className="font-medium text-accent">Price:</span>{" "}
                            <span className="text-green-600 font-medium">৳{product_price}</span>
                        </p>
                        <p>
                            <span className="font-medium text-accent">Category:</span> {category}
                        </p>
                        <p>
                            <span className="font-medium text-accent">Brand:</span> {brand}
                        </p>
                        <p>
                            <span className="font-medium text-accent">Color:</span>{" "}
                            {color || "Not Specified"}
                        </p>
                    </div>

                    {/* Specifications */}
                    <div className="mb-4">{renderSpecifications()}</div>

                    {/* Description */}
                    <div className="mb-4">
                        <h3 className="text-lg font-semibold text-gray-800">Description:</h3>
                        <p className="text-gray-700 italic">
                            {specs.laptop_description ||
                                specs.monitor_description ||
                                specs.smart_phone_description ||
                                specs.smart_watch_description ||
                                specs.smart_tv_description}
                        </p>
                    </div>

                    {/* Actions */}
                    <div className="flex justify-evenly gap-4 mt-2">
                        <button
                            onClick={() => handleAddToCart()}
                            className="w-full bg-primary text-center text-white py-2 rounded-md">
                            Add To Cart
                        </button>
                        {/* <Link href={`/edit/${_id}`} className="bg-primary w-full text-center py-2 text-white font-semibold rounded-md">
                            Edit
                        </Link>
                        <button
                            onClick={() => handleDeleteProduct(_id)}
                            className="bg-primary w-full text-center py-2 text-white font-semibold rounded-md"
                        >
                            Delete
                        </button> */}
                    </div>
                </div>
            </div>
        </section>
    );
};
export default Page;
