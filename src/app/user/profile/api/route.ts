// import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const updateUserInfo = async (user_info: object) => {
    try {
        const res = await axios.put(`${process.env.NEXT_PUBLIC_SERVER_URL}/update-profile`, user_info)
        return res.data;
    }
    catch (error) {
        throw error;
    }
}

export const updateAddressInfo = async (address_info: object) => {
    try {
        const response = await axios.put(`${process.env.NEXT_PUBLIC_SERVER_URL}/update-address`, address_info)
        return response.data;
    }
    catch (error) {
        throw error;
    }
}