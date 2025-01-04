import { useQuery } from "@tanstack/react-query"
import axios from "axios"
// Use Get Packed Order
export const useGetPackedOrders = () => {
    const { data, isLoading, isError, error } = useQuery({
        queryFn: async () => {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/packed-orders`)
            return data
        },
        queryKey: ['packed-orders']
    })
    return { data, isLoading, isError, error }
}
// Get packed Products Details
export const usePackedOrdersDetails = (id: string) => {
    const { data, isLoading, isError, error } = useQuery({
        queryFn: async () => {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/packed-orders/${id}`)
            return data
        },
        queryKey: ['packed-orders-details']
    })
    return { data, isLoading, isError, error }
}