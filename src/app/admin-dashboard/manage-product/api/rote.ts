import axios from "axios";
// get products for admin
export const getAdminProducts = async () => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/all-products-admin`)
        return response.data;
    }

    catch (error) {
        throw error;
    }

}

// delete a product
export const deleteProduct = async (id: string) => {
    try {
        const response = await axios.delete(`${process.env.NEXT_PUBLIC_SERVER_URL}/all-products-admin/${id}`)
        return response.data;
    }

    catch (error) {
        throw error;
    }
}
