import axios from "axios";

export const getAdminProducts = async () => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/all-products-admin`)
        return response.data;
    }

    catch (error) {
        throw error;
    }

}