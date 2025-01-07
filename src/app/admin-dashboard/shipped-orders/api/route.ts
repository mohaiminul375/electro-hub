import { useQuery } from "@tanstack/react-query"
import axios from "axios";
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
}
// interface Products {
//     product_name: string;
//     img: string;
//     brand: string;
//     color: string;
//     quantity: string;
//     price: string;

// }

export const useGetShippedOrders = () => {
    const { data, isLoading, isError, error } = useQuery<Orders[]>({
        queryFn: async () => {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/shipped-orders`)
            return data
        },
        queryKey: ['shipped-orders']
    })
    return { data, isLoading, isError, error }
}