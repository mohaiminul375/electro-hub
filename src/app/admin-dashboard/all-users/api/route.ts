import axios from "axios"
// get all user
export const getUsers = async () => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/all-users`)
        return response.data;
    }

    catch (error) {
        throw error;
    }

}