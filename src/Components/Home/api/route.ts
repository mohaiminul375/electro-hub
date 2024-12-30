import { useQuery } from "@tanstack/react-query";
import axios from "axios";
interface Product {
    _id: string;
    product_name: string;
    img: string;
    item: object;
    product_price: number;
    category: string;
    // item?: object;
}
export const useGetHomeProducts = () => {
    const { data, isLoading, isError, error } = useQuery<Product[]>({
        queryFn: async () => {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/home-products`)
            return data;
        },
        queryKey: ['home-products']
    })
    return { data, isLoading, isError, error }
}