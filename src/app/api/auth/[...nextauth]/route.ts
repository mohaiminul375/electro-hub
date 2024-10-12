import { handleLogin } from "@/app/login/api/route";
import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
// Define the type for credentials
interface Credentials {
    email: string;
    password: string;
}

const authOptions: AuthOptions = {
    session: {
        strategy: 'jwt',
        maxAge: 259200, // 3 days in seconds
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {},
                password: {},
            },
            async authorize(credentials) {
                const { email, password } = credentials as Credentials;

                if (!email || !password) {
                    return null;
                }

                try {
                    // check in db email and password
                    const currentUser = await handleLogin({ email, password });

                    if (!currentUser?.user) {
                        return null;
                    }

                    return currentUser.user;
                } catch (error) {
                    console.error("Error during login:", error);
                    return null;
                }
            }
        }),
        GoogleProvider({
            clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
            clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET
        })
    ],
    callbacks: {
        // Optional: Add callbacks if necessary
    },
    pages: {
        signIn: '/login',
    },
};

const handler = NextAuth(authOptions);

export { handler as POST, handler as GET };
