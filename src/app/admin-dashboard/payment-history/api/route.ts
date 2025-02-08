import { useQuery } from "@tanstack/react-query";
import axios from "axios";
interface Payments {
    _id: string;
    customer_name: string;
    customer_email: string;
    customer_Phone: string;
    transaction_id: string;
    status: string;
    created_at: string;
    payment_method: string;
}
export const useGetPaymentHistory = (tranId: string) => {
    const { data, isLoading, isError, error } = useQuery<Payments[]>({
        queryFn: async () => {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/all-payments?tran_id=${tranId}`)
            return data;
        },
        queryKey: ['all-payments', tranId]
    })
    return { data, isLoading, isError, error }
}