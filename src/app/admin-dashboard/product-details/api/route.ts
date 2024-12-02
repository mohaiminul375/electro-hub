import { useQuery } from "@tanstack/react-query";
import axios from "axios"


export const useGetProductDetails = (id: string | string[]) => {
    const { data, isLoading, isError, error } = useQuery({
        queryFn: async () => {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/all-products/${id}`)
            return data;
        },
        queryKey: ['product-details']
    })
    return { data, isLoading, isError, error }
}