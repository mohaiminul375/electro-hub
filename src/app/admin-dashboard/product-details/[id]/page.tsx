'use client'
import { useParams } from "next/navigation";
import { getProductDetails } from "../api/route";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";


const page = () => {
    const [details, setDetails] = useState({});
    const params = useParams();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/all-products/${params.id}`);
                setDetails(data);
            } catch (error) {
                console.error("Error fetching product details:", error);
            }
        };

        fetchData();
    }, [params.id]);

    const { _id,
        product_name,
        img,
        laptop_description,
        monitor_description,
        product_price,
        category,
        brand,
        color,
        monitor_screen,
        monitor_resolution,
        monitor_ports,
        posted_date,
        laptop_processor,
        laptop_storage,
        laptop_ram,
        laptop_battery,
        laptop_ports,
        laptop_display,
        "smart-phone_description": smart_phone_description,
        "smart-phone_storage": smart_phone_storage,
        "smart-phone_ram": smart_phone_ram,
        "smart-phone_battery": smart_phone_battery,
        "smart-phone-camera": smart_phone_camera,
        "smart-phone_model": smart_phone_model,
        "smart-watch_description": smart_watch_description,
        "smart-watch_model": smart_watch_model,
        "smart-watch_battery": smart_watch_battery,
        "smart-watch_features": smart_watch_features,
        "smart-tv_resolution": smart_tv_resolution,
        'smart-tv_screen': smart_tv_screen,
        'smart-tv_ram': smart_tv_ram,
        "smart-tv_description": smart_tv_description,
        "smart-tv_features": smart_tv_features,
        "smart-tv_ports": smart_tv_ports
    } = details;
    return (
        <section className="mt-10">
            {/* TODO: Heading */}
            <div>

            </div>
            {/* main content */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <Image src={img} alt='' width={100} height={100} layout="responsive" />
                <div className="bg-gray-100 shadow-md rounded-lg p-6 max-w-3xl mx-auto mb-8 border-2">
                    <p className="text-sm text-gray-600 mb-4">
                        <span className="font-medium">Product ID:</span> {_id}
                    </p>

                    <h1 className="text-2xl font-bold text-gray-800 mb-4">{product_name}</h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <p className="text-gray-700">
                            <span className="font-medium">Price:</span> <span className="text-green-600 font-medium">৳{product_price}</span>
                        </p>
                        <p className="text-gray-700">
                            <span className="font-medium">Category:</span> {category}
                        </p>
                        <p className="text-gray-700">
                            <span className="font-medium">Brand:</span> {brand}
                        </p>
                        <p className="text-gray-700">
                            <span className="font-medium">Color:</span> {color || 'Not Specified'}
                        </p>
                        {/* for laptop */}
                        {category == 'laptop' &&
                            <>
                                <p className="text-gray-700">
                                    <span className="font-medium">Laptop Processor:</span> {laptop_processor}
                                </p>
                                <p className="text-gray-700">
                                    <span className="font-medium">laptop_ram:</span> {laptop_ram}
                                </p>
                                <p className="text-gray-700">
                                    <span className="font-medium">laptop_storage:</span> {laptop_storage}
                                </p>
                                <p className="text-gray-700">
                                    <span className="font-medium">laptop_display:</span> {laptop_display}
                                </p>
                                <p className="text-gray-700">
                                    <span className="font-medium">laptop_battery:</span> {laptop_battery}
                                </p>
                                <p className="text-gray-700">
                                    <span className="font-medium">laptop_ports:</span> {laptop_ports}
                                </p>
                                <p className="text-gray-700">
                                    <span className="font-medium">Posted On:</span> {posted_date}
                                </p>
                            </>
                        }
                        {/* for monitor */}
                        {category == 'monitor' &&
                            <>
                                <p className="text-gray-700">
                                    <span className="font-medium">Screen Size:</span> {monitor_screen}
                                </p>
                                <p className="text-gray-700">
                                    <span className="font-medium">Resolution:</span> {monitor_resolution}
                                </p>
                                <p className="text-gray-700">
                                    <span className="font-medium">Ports:</span> {monitor_ports}
                                </p>
                                <p className="text-gray-700">
                                    <span className="font-medium">Posted On:</span> {posted_date}
                                </p>
                            </>
                        }
                        {/* smart phone */}
                        {category == 'smart-phone' &&
                            <>
                                <p className="text-gray-700">
                                    <span className="font-medium">Model:</span> {smart_phone_model}
                                </p>
                                <p className="text-gray-700">
                                    <span className="font-medium">Storage:</span> {smart_phone_storage}
                                </p>
                                <p className="text-gray-700">
                                    <span className="font-medium">Ram:</span> {smart_phone_ram}
                                </p>
                                <p className="text-gray-700">
                                    <span className="font-medium">Camera:</span> {smart_phone_camera}
                                </p>
                                <p className="text-gray-700">
                                    <span className="font-medium">Battery:</span> {smart_phone_battery}
                                </p>
                                <p className="text-gray-700">
                                    <span className="font-medium">Posted On:</span> {posted_date}
                                </p>
                            </>
                        }
                        {/* smart watch */}
                        {category == 'smart-watch' &&
                            <>
                                <p className="text-gray-700">
                                    <span className="font-medium">Model:</span> {smart_watch_model}
                                </p>
                                <p className="text-gray-700">
                                    <span className="font-medium">Battery:</span> {smart_watch_battery}
                                </p>
                                <p className="text-gray-700">
                                    <span className="font-medium">Features:</span> {smart_watch_features}
                                </p>
                                <p className="text-gray-700">
                                    <span className="font-medium">Posted On:</span> {posted_date}
                                </p>
                            </>
                        }
                        {/* smart phone */}
                        {category == 'smart-phone' &&
                            <>
                                <p className="text-gray-700">
                                    <span className="font-medium">Model:</span> {smart_phone_model}
                                </p>
                                <p className="text-gray-700">
                                    <span className="font-medium">Storage:</span> {smart_phone_storage}
                                </p>
                                <p className="text-gray-700">
                                    <span className="font-medium">Ram:</span> {smart_phone_ram}
                                </p>
                                <p className="text-gray-700">
                                    <span className="font-medium">Camera:</span> {smart_phone_camera}
                                </p>
                                <p className="text-gray-700">
                                    <span className="font-medium">Battery:</span> {smart_phone_battery}
                                </p>
                                <p className="text-gray-700">
                                    <span className="font-medium">Posted On:</span> {posted_date}
                                </p>
                            </>
                        }
                        {/* smart tv */}
                        {category == 'smart-tv' &&
                            <>
                                <p className="text-gray-700">
                                    <span className="font-medium">Screen Size:</span> {smart_tv_screen}
                                </p>
                                <p className="text-gray-700">
                                    <span className="font-medium">Resolution:</span> {smart_tv_resolution}
                                </p>
                                <p className="text-gray-700">
                                    <span className="font-medium">Ram:</span> {smart_tv_ram}
                                </p>
                                <p className="text-gray-700">
                                    <span className="font-medium">Features:</span> {smart_tv_features}
                                </p>
                                <p className="text-gray-700">
                                    <span className="font-medium">Ports:</span> {smart_tv_ports}
                                </p>
                                <p className="text-gray-700">
                                    <span className="font-medium">Posted On:</span> {posted_date}
                                </p>
                            </>
                        }
                    </div>

                    <div className="mb-4">
                        <h3 className="text-lg font-semibold text-gray-800">Description:</h3>
                        <p className="text-gray-700 italic">{laptop_description || monitor_description || smart_phone_description || smart_watch_description || smart_tv_description}</p>
                    </div>
                    <div className="flex justify-evenly gap-4">
                        <Link href='' className="border-2 w-full text-center py-2 bg-primary text-white" >Edit</Link>
                        <button className="border-2 w-full text-center bg-primary text-white py-2">Delete</button>

                    </div>
                </div>

            </div>

        </section>
    );
};

export default page;
