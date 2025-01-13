import { useQuery } from "@tanstack/react-query";
import axios from "axios";
// Get All Products for users
export const useAllProductsUser = (uuid: string) => {
    const { data, isLoading, error, isError } = useQuery({
        queryFn: async () => {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/all-orders-users/${uuid}`)
            return data;
        },
        queryKey: ['all-order-users']
    })
    return { data, isLoading, error, isError }
}
// Use Get All Approved Products
export const useToShipProductsUsers = (uuid: string) => {
    const { data, isLoading, error, isError } = useQuery({
        queryFn: async () => {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/to-ship/${uuid}`)
            return data;
        },
        queryKey: ['all-order-users']
    })
    return { data, isLoading, error, isError }

}
// Use Get All Approved Products
export const useToReceivedProductsUsers = (uuid: string) => {
    const { data, isLoading, error, isError } = useQuery({
        queryFn: async () => {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/approved-orders/${uuid}`)
            return data;
        },
        queryKey: ['all-order-users']
    })
    return { data, isLoading, error, isError }

}