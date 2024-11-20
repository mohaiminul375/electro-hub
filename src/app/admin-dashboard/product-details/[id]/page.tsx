'use client'
import { useParams } from "next/navigation";
import { getProductDetails } from "../api/route";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";


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

    const { img } = details;
    return (
        <>
            
<Image src={img} alt='' width={50} height={50} />
        </div>
    );
};

export default page;
