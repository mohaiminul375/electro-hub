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
}
// Get all orders admin
export const useGetAllOrdersAdmin = (order_id: string) => {
    const { data, isLoading, isError, error } = useQuery<Orders[]>({
        queryFn: async () => {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/all-orders-admin?order_id=${order_id}`)
            return data;
        },
        queryKey: ['all-orders', order_id]

    })
    return { data, isLoading, isError, error }
}