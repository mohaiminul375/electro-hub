'use client'
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { useRouter } from "next/navigation";
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
}
interface Products {
    product_name: string;
    img: string;
    brand: string;
    color: string;
    quantity: string;
    price: string;

}
interface PendingOrders {
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
    note?: string;
    orderPackedAt?: string;
    orderShippedAt?: string;
}
interface ApproveProps {
    order_id: string,
    newData: object;
}
export const usePendingOrders = () => {
    const { data, isLoading, isError, error } = useQuery<Orders[]>({
        queryFn: async () => {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/pending-orders`)
            return data
        },
        queryKey: ['pending-orders']
    })
    return { data, isLoading, isError, error }
}
// Get order details by id
export const useOrdersDetails = (id: string) => {
    const { data, isLoading, isError, error } = useQuery<PendingOrders>({
        queryFn: async () => {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/pending-orders/${id}`)
            return data
        },
        queryKey: ['pending-orders-details']
    })
    return { data, isLoading, isError, error }
}
// Update to Approve
export const useApproveOrder = () => {
    const router = useRouter()
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({ order_id, newData }: ApproveProps) => {
            const { data } = await axios.put(`${process.env.NEXT_PUBLIC_SERVER_URL}/approved-order/${order_id}`, newData);
            return data;
        },
        mutationKey: ['approve-orders'],
        onSuccess: (data) => {
            if (data.modifiedCount === 1) {
                Swal.fire({
                    title: "Approved!",
                    text: "Order has been approved.",
                    icon: "success"
                });
                queryClient.invalidateQueries({ queryKey: ['pending-orders'] })
                router.push('/admin-dashboard/pending-orders')
            }


        },
        onError: (error) => {
            console.log(error);
            toast.error('Failed to add product. Try again later.');
        }
    });
}