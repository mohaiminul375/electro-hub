import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const GetOrdersSummary = () => {
    const { data, isLoading, isError, error } = useQuery({
        queryFn: async () => {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/orders-summary`)
            return data;
        },
        queryKey: ['orders-summary']

    })
    return { data, isLoading, isError, error }
}