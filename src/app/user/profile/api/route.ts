import axios from "axios";

export const updateUserInfo = async (user_info: object) => {
    try {
        const res = await axios.put(`${process.env.NEXT_PUBLIC_SERVER_LOCAL}/update-profile`, user_info)
        return res.data;
    }
    catch (error) {
        throw error;
    }
}