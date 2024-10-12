import axios from "axios";
export const createUser = async (user_info: object) => {
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/users`, user_info);
        return response.data;
    } catch (error) {
        throw error;
    }
};