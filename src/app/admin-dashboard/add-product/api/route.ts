import axios from "axios"

export const addProduct = async (product: object) => {
    try {
        const res = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/all-products`, product)
        return res.data;
    }
    catch (error) {
        throw error
    }
}