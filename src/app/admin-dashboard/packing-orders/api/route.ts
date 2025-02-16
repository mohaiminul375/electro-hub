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
    orderApproveAt: string;
    products: Array<[]>;
}
interface PackedProps {
    order_id: string;
    newData: object;
}
// Get all approve Orders for Admin
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
// Update to Approve
export const usePackedOrder = () => {
    const router = useRouter()
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({ order_id, newData }: PackedProps) => {
            const { data } = await axios.put(`${process.env.NEXT_PUBLIC_SERVER_URL}/packed-orders/${order_id}`, newData);
            return data;
        },
        mutationKey: ['approve-orders'],
        onSuccess: (data) => {
            if (data.modifiedCount === 1) {
                Swal.fire({
                    title: "Packed!",
                    text: "Order has been packed.",
                    icon: "success"
                });
                queryClient.invalidateQueries({ queryKey: ['approved-orders'] })
                router.push('/admin-dashboard/packing-orders')
            }


        },
        onError: (error) => {
            console.log(error);
            toast.error('Failed to add product. Try again later.');
        }
    });
}