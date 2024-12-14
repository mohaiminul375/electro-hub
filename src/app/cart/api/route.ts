import { useMutation, useQuery } from "@tanstack/react-query"
import axios from "axios"
import toast from "react-hot-toast";

interface CartTypes {
    items: Array<{ product_id: string, img: string, product_name: string, color: string, brand: string, price: number, quantity: number }>;
    totalPrice: number;
    totalQuantity: number;
}


// add to cart
export const useAddToCart = () => {
    return useMutation({
        mutationFn: async (cartInfo: object) => {
            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/cart`, cartInfo);
            return data;
        },
        mutationKey: ['cart'],
        onSuccess: () => {
            toast.success('Product added to cart');
        },
        onError: () => {
            toast.error('Operation failed try again letter');
        }
    })
}
// get cart product for user
export const useGetCartProduct = (uuid: string) => {
    const { data, isLoading, isError, error } = useQuery<CartTypes[]>({
        queryFn: async () => {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/all-carts/${uuid}`)
            return data;
        },
        queryKey: ['cart-details']
    })
    return { data, isLoading, isError, error };
}
interface updateProp {
    uuid: string,
    action: string,
    productId: string;
}
// update quantity
export const useUpdateQuantity = () => {
    return useMutation({
        mutationFn: async ({ uuid, action, productId }: updateProp) => {
            const { } = await axios.patch(`${process.env.NEXT_PUBLIC_SERVER_URL}/update-quantity`, { uuid, action, productId })
        },
        mutationKey: ['update-quantity']
    })
}