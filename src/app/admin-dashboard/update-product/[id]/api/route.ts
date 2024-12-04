import { useMutation } from "@tanstack/react-query"
import axios from "axios"

export const useUpdateProduct = (id: string | string[]) => {
    return useMutation({
        mutationFn: async (update_info: object) => {
            const { data } = await axios.put(`${process.env.NEXT_PUBLIC_SERVER_URL}/all-products/${id}`, update_info)
            return data;
        },
        mutationKey: ['update-product'],
        onSuccess: (data) => {
            console.log(data, 'inside success');
        }
    })
}