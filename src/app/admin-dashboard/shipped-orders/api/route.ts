'use client'
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import axios from "axios";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
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
interface DeliveredProps {
    order_id: string;
    newData: object;
}

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
// Marked as Delivered
export const useMarkedDelivered = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({ order_id, newData }: DeliveredProps) => {
            const { data } = await axios.put(`${process.env.NEXT_PUBLIC_SERVER_URL}/delivered/${order_id}`, newData)
            return data;
        },
        mutationKey: ['marked-delivered'],
        onSuccess: (data) => {
            if (data.modifiedCount === 1) {
                Swal.fire({
                    title: "Delivered!",
                    text: "Order has been delivered",
                    icon: "success"
                });
                queryClient.invalidateQueries({ queryKey: ['shipped-orders'] })
            }
        },
        onError: (error) => {
            console.log(error);
            toast.error('Failed to Marked Delivered. Try again later.');
        }
    })
}