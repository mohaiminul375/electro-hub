import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios"
interface User {
    _id: string;
    name: string;
    email: string;
    role: string;
}

// get all user
// export const getUsers = async () => {
//     try {
//         const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/all-users`)
//         return response.data;
//     }

//     catch (error) {
//         throw error;
//     }

// }
export const GetUsers = () => {
    const { data, isLoading, isError, error } = useQuery<User[]>({
        queryFn: async () => {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/all-users`)
            return data;
        },
        queryKey: ['all-users']
    })
    return { data, isLoading, isError, error }
}
// delete user
// export const deleteUser = async (id: string) => {
//     try {
//         const response = await axios.delete(`${process.env.NEXT_PUBLIC_SERVER_URL}/all-users/${id}`);
//         return response.data;
//     } catch (error) {
//         throw error;
//     }
// };

export const useDeleteUser = () => {
    return useMutation({
        mutationFn: async (id: string) => {
            const { data } = await axios.delete(`${process.env.NEXT_PUBLIC_SERVER_URL}/all-users/${id}`);
            return data;
        },
        mutationKey: ['delete-user']
    })
}