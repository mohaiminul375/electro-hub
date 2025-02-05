import { useMutation } from "@tanstack/react-query"
import axios from "axios"

export const useCreatePayment = () => {
    return useMutation({
        mutationFn: async (paymentInfo: object) => {
            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/create-payment`, paymentInfo)
            return data;
        }, onSuccess: (data) => {
            if (data.paymentUrl) {
                window.location.replace(data?.paymentUrl)
            }
        },
        mutationKey: ['create-payment']
    })
}