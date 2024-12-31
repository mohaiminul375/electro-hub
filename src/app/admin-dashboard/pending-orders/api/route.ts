import { useQuery } from "@tanstack/react-query"
import axios from "axios"

export const usePendingOrders = () => {
    const { data, isLoading, isError, error } = useQuery({
        queryFn: async () => {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/pending-orders`)
            return data
        },
        queryKey: ['pending-orders']
    })
    return { data, isLoading, isError, error }
}