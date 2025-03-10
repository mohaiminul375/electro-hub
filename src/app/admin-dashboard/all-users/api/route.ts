'use client'
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios"
import toast from "react-hot-toast";
interface User {
    _id: string;
    uuid: string;
    name: string;
    email: string;
    role: string;
}
interface RoleProps {
    _id: string;
    newRole: string;
}
//Get All user (only admin)
export const useGetUsers = () => {
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
        }, onError: () => {
            toast.error('operation failed')
        }
    })
}
// Update role(only admin)
export const useUpdateRole = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ _id, newRole }: RoleProps) => {
            console.log('role', newRole)
            const { data } = await axios.patch(`${process.env.NEXT_PUBLIC_SERVER_}/all-users/${_id}`, { newRole: newRole });
            return data;
        },
        mutationKey: ['update-role'],
        onSuccess: (data) => {
            if (data.modifiedCount > 0) {
                queryClient.invalidateQueries({ queryKey: ['all-users'] })
            }
        }, onError: () => {
            toast.error('operation failed')
        }
    })
}