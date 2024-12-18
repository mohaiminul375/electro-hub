import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

// import toast from "react-hot-toast";
interface Products {
    _id: string;
    product_name: string;
    category: string;
    brand: string;
}

//get admin products
export const GetAdminProducts = () => {
    const { data, isLoading, isError, error } = useQuery<Products[]>({
        queryFn: async () => {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/all-products-admin`)
            return data
        },
        queryKey: ['admin-products']
    })
    return { data, isLoading, isError, error }
}

export const useDeleteProduct = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id: string) => {
            const { data } = await axios.delete(`${process.env.NEXT_PUBLIC_SERVER_URL}/all-products-admin/${id}`)
            return data;
        },
        mutationKey: ['delete-product'],
        onSuccess: (data) => {
            if (data.deletedCount > 0) {
                queryClient.invalidateQueries({ queryKey: ['admin-products'] })
                queryClient.invalidateQueries({ queryKey: ['all-products'] })
            }
        }, onError: () => {
            toast.error('operation failed')
        }
    })
}
