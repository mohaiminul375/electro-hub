import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

// import toast from "react-hot-toast";
interface Products {
    _id: string;
    product_name: string;
    category: string;
    brand: string;
}
// get products for admin
// export const getAdminProducts = async () => {
//     try {
//         const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/all-products-admin`)
//         return response.data;
//     }

//     catch (error) {
//         throw error;
//     }

// }

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

// delete a product
// export const deleteProduct = async (id: string) => {
//     try {
//         const response = await axios.delete(`${process.env.NEXT_PUBLIC_SERVER_URL}/all-products-admin/${id}`)
//         return response.data;
//     }

//     catch (error) {
//         throw error;
//     }
// }
export const DeleteProduct = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id: string) => {
            const { data } = await axios.delete(`${process.env.NEXT_PUBLIC_SERVER_URL}/all-products-admin/${id}`)
            return data;
        },
        mutationKey: ['delete-product'],
        onSuccess: (data) => {
            if (data.deletedCount > 0) {
                queryClient.invalidateQueries({ queryKey: ['all-products', 'admin-products'] })
            }
        }
    })
}
