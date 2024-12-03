import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
type CustomError = {
    error?: object;
    response?: {
        data?: {
            message?: string;
        };
    };
    message?: string;
};

export const useUpdateUserInfo = () => {
    return useMutation({
        mutationFn: async (user_info: object) => {
            const { data } = await axios.put(`${process.env.NEXT_PUBLIC_SERVER_URL}/update-profile`, user_info)
            return data;
        },
        mutationKey: ['update_user_info'],
        onSuccess: (data) => {
            console.log(data);
            if (data.result.acknowledged) {
                toast.success('update info successfully')
            } else {

            }
        },
        onError: (error: CustomError) => {
            // console.log(error?.response?.data?.message)
            const errorMessage = error.response?.data?.message || error.message || "An unknown error occurred";
            toast.error(errorMessage);

        }
    })
}
export const useAddressInfo = () => {
    return useMutation({
        mutationFn: async (address_info: object) => {
            const { data } = await axios.put(`${process.env.NEXT_PUBLIC_SERVER_URL}/update-address`, address_info)
            return data;
        },
        mutationKey: ['update_address_info'],
        onSuccess: (data) => {
            console.log(data);
            if (data.result.acknowledged) {
                toast.success('update address successfully')
            } else {

            }
        },
        onError: (error: CustomError) => {
            // console.log(error?.response?.data?.message)
            const errorMessage = error.response?.data?.message || error.message || "An unknown error occurred";
            toast.error(errorMessage);

        }
    })
}