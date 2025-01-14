import { useQuery } from "@tanstack/react-query"
import axios from "axios"
interface Address {
    division: string;
    district: string;
    full_address: string;
}
interface Orders {
    _id: string;
    customer_uuid: string;
    customer_name: string;
    customer_email: string;
    customer_Phone: string;
    transaction_id: string;
    total_price: number;
    address: Address;
    orderCreatedAt: string;
    order_id: string;
    order_status: string;
    payment_method: string;
    products: Array<[]>;
    orderPackedAt: string;
    orderApproveAt: string;
    orderShippedAt: string;
    orderDeliveredAt: string;
}
export const useGetDeliveredOrders = () => {
    const { data, isLoading, isError, error } = useQuery<Orders[]>({
        queryFn: async () => {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/delivered`)
            return data
        },
        queryKey: ['shipped-orders']
    })
    return { data, isLoading, isError, error }
}