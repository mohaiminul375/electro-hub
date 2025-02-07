'use client'
import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";

interface cancelProp {
    order_id: string;
    newData: object,
}
export const AdminCancellation = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({ order_id, newData }: cancelProp) => {
            const { data } = await axios.put(`${process.env.NEXT_PUBLIC_SERVER_URL}/canceled-order/${order_id}`, newData);
            return data;
        },
        mutationKey: ['cancel-order'],
        onSuccess: (data) => {
            if (data.modifiedCount === 1) {
                Swal.fire({
                    title: "Canceled!",
                    text: "Order has been canceled.",
                    icon: "success"
                });
                queryClient.invalidateQueries({ queryKey: ['all-orders'] })
            }
        }
    })
}