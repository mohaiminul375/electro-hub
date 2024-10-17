import axios from "axios"
// get all products
export const getProducts = async () => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/all-products`)
        return response.data
    }
    catch (error) {
        throw error
    }
}