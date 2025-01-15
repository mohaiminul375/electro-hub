import { useQuery } from "@tanstack/react-query";
import axios from "axios";
interface Address {
    division: string;
    district: string;
    full_address: string;
}
interface Products {
    product_id: string;
    img: string;
    product_name: string;
    color: string;
    brand: string;
    price: number;
    quantity: number;
    category: string;
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
    products: Products[];
}
// Get All Products for users
export const useAllProductsUser = (uuid: string) => {
    const { data, isLoading, error, isError } = useQuery<Orders[]>({
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
    const { data, isLoading, error, isError } = useQuery<Orders[]>({
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
    const { data, isLoading, error, isError } = useQuery<Orders[]>({
        queryFn: async () => {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/to-received/${uuid}`)
            return data;
        },
        queryKey: ['received-orders-user']
    })
    return { data, isLoading, error, isError }

}
// Use Get All Delivered Products
export const useToDeliveredProductsUsers = (uuid: string) => {
    const { data, isLoading, error, isError } = useQuery<Orders[]>({
        queryFn: async () => {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/delivered/${uuid}`)
            return data;
        },
        queryKey: ['delivered-orders-user']
    })
    return { data, isLoading, error, isError }

}