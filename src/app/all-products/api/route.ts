import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// Define the Product type
interface Product {
    _id: string;
    product_name: string;
    img: string;
    product_price: number;
    category: string;
    // item?: object;
}

// Function to fetch all products
export const GetProducts = () => {
    const { data, isLoading, isError, error } = useQuery<Product[]>({
        queryFn: async () => {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/all-products`);
            return response.data; 
        },
        queryKey: ['all-products'],
    });

    return { data, isLoading, isError, error };
};
