import { useQuery } from "@tanstack/react-query"
import axios from "axios"

export const useGetUserInfo = (uuid: string) => {
    const { data, isLoading } = useQuery({
        queryFn: async () => {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/all-users/${uuid}`)
            return data
        },
        queryKey: ['user-info']
    })
    return { data, isLoading }
}