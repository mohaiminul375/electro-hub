import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// Define the Product type
interface Product {
    _id: string;
    product_name: string;
    img: string;
    item: object;
    product_price: number;
    category: string;
    // item?: object;
}
interface FilterProp {
    brand: string;
    color: string;
    priceSort: string;
}
// ISSUE
// Function to fetch all products
export const useGetProducts = ({ brand, color, priceSort }: FilterProp) => {
    const { data, isLoading, isError, error, refetch } = useQuery<Product[]>({
        queryFn: async () => {
            // Construct query parameters conditionally
            const params = new URLSearchParams();
            if (brand) params.append('brand', brand);
            if (color) params.append('color', color);
            if (priceSort) params.append('sort', priceSort.toString());

            const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/all-products?${params.toString()}`;
            console.log('Request URL:', url);  // Debug the final URL

            try {
                const response = await axios.get(url);
                console.log('inside tanstack', response.data)
                return response.data;
            } catch (err) {
                console.error('Error fetching products:', err);
                throw err;
            }
        },
        queryKey: ['all-products', { brand, color, priceSort }],
    });

    return { data, isLoading, isError, error, refetch };
};

