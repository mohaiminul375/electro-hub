import { useQuery } from "@tanstack/react-query"
import axios from "axios"
interface Orders {
    customer_uuid: string;
    customer_name: string;
    customer_email: string;
    customer_Phone: string;
    transaction_id: string;
    total_price: number;
    address: object;
    orderCreatedAt: string;
    order_id: string;
    order_status: string;
    payment_method: string;
}
export const useGetApprovedOrders = () => {
    const { data, isLoading, isError, error } = useQuery<Orders[]>({
        queryFn: async () => {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/approved-orders`)
            return data
        },
        queryKey: ['approved-orders']
    })
    return { data, isLoading, isError, error }
}