import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios"
import toast from "react-hot-toast";

// export const addProduct = async (product: object) => {
//     try {
//         const res = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/all-products`, product)
//         return res.data;
//     }
//     catch (error) {
//         throw error
//     }
// }
export const useAddProduct = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (product: object) => {
            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/all-products`, product);
            return data;
        },
        mutationKey: ['add-product'],
        onSuccess: (data) => {
            if (data.insertedId) {
                toast.success('Product added successfully');
                queryClient.invalidateQueries({ queryKey: ['all-products', 'admin-products'] })
            }
        },
        onError: (error) => {
            console.log(error);
            toast.error('Failed to add product. Try again later.');
        }
    });
};