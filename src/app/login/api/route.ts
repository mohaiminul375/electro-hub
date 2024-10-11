import axios from "axios";
type userType = {
    email: string,
    password: string
}
export const handleLogin = async ({ email, password }: userType) => {
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/login`, { email, password });
        return response.data;
    } catch (error) {
        console.error("Error during login:", error);
        throw error;
    }

}