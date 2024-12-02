import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios"
interface User {
    _id: string;
    name: string;
    email: string;
    role: string;
}

//Get All user (only admin)
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

// Delete User(only admin)
export const useDeleteUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id: string) => {
            const { data } = await axios.delete(`${process.env.NEXT_PUBLIC_SERVER_URL}/all-users/${id}`);
            return data;
        },
        mutationKey: ['delete-user'],
        onSuccess: (data) => {
            if (data.deletedCount > 0) {
                queryClient.invalidateQueries({ queryKey: ['all-users'] })
            }
        }
    })
}