import { useMutation } from "@tanstack/react-query"
import axios from "axios"

export const useCreatePayment = () => {
    return useMutation({
        mutationFn: async (paymentInfo: object) => {
            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_LOCAL}/create-payment`, paymentInfo)
            return data;
        },
        mutationKey: ['create-payment']
    })
}