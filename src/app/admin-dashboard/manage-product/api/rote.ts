import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

// import toast from "react-hot-toast";
interface Products {
    _id: string;
    product_name: string;
    category: string;
    brand: string;
    status: string;
}
interface FilterProp {
    brand: string;
    category: string;
    status: string;
    name: string;
}
//get admin products
export const GetAdminProducts = ({ category, brand, status, name }: FilterProp) => {
    const { data, isLoading, isError, error } = useQuery<Products[]>({
        queryFn: async () => {
            const params = new URLSearchParams();
            if (brand) params.append('brand', brand);
            if (category) params.append('category', category);
            if (status) params.append('status', status);
            if (name) params.append('product_name', name);

            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/all-products-admin?${params.toString()}`)
            return data;
        },
        queryKey: ['admin-products', category, brand, status, name]
    })
    return { data, isLoading, isError, error }
}
// Delete Product(only admin)
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
