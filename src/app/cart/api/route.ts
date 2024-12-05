import { useMutation } from "@tanstack/react-query"
import axios from "axios"

export const useAddToCart = () => {
    return useMutation({
        mutationFn: async (cartInfo: object) => {
            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_LOCAL}/cart`, cartInfo);
            return data;
        },
        mutationKey: ['cart']
    })
}