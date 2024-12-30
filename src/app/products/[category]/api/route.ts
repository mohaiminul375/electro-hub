import { useQuery } from "@tanstack/react-query"
import axios from "axios"
interface FilterProp {
    category: string;
    priceSort: string;
    brand: string;
    color: string;
}
interface Product {
    _id: string;
    product_name: string;
    img: string;
    product_price: number;
    category: string;
    item?: object;
}
// category page product filter
export const useGetDetailsCategory = ({ category, priceSort, brand, color }: FilterProp) => {
    const { data, isLoading, isError, error } = useQuery<Product[]>({
        queryFn: async () => {
            const params = new URLSearchParams();
            if (brand) params.append('brand', brand);
            if (color) params.append('color', color);
            if (priceSort) params.append('sort', priceSort.toString());
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/products/${category}?${params.toString()}`)
            return data;
        },
        queryKey: ['category-products', { category, priceSort, brand, color }],
    })
    return { data, isLoading, isError, error }
}
