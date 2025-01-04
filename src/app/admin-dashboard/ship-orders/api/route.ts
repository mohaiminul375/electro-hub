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
}
interface Products {
    product_name: string;
    img: string;
    brand: string;
    color: string;
    quantity: string;
    price: string;

}
interface PackedOrders {
    customer_name: string;
    customer_email: string;
    customer_Phone: string;
    address: Address;
    order_id: string;
    transaction_id: string;
    total_price: string;
    payment_method: string;
    order_status: string;
    orderCreatedAt: string;
    products: Products[];
    orderApproveAt: string;
    orderPackedAt: string;
    note?: string;
}
// Use Get Packed Order
export const useGetPackedOrders = () => {
    const { data, isLoading, isError, error } = useQuery<Orders[]>({
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
    const { data, isLoading, isError, error } = useQuery<PackedOrders>({
        queryFn: async () => {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/packed-orders/${id}`)
            return data
        },
        queryKey: ['packed-orders-details']
    })
    return { data, isLoading, isError, error }
}