import axios from "axios"

export const getProductDetails = async (id:string) => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/all-products/${id}`)
        return response.data;
    }

    catch (error) {
        throw error;
    }

}