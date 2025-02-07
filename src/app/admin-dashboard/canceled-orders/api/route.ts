import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Address {
    division: string;
    district: string;
    full_address: string;
}
interface Orders {
    _id: string,
    order_id: string;
    orderCreatedAt: string;
    customer_name: string;
    customer_email: string;
    customer_Phone: string;
    address: Address;
    products: Array<[]>;
    payment_method: string;
    canceledBy: string;
    orderCanceledAt: string;
    order_status: string;
}
export const AllCanceledOrdersAdmin = () => {
    const { data, isLoading, isError, error } = useQuery<Orders[]>({
        queryFn: async () => {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/canceled-orders`)
            return data;
        },
        queryKey: ['all-canceled-orders']

    })
    return { data, isLoading, isError, error }
}