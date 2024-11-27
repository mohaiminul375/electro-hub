import { handleLogin, handleSocialAccount } from "@/app/login/api/route";
import NextAuth, { Account, AuthOptions, DefaultSession, DefaultUser, Session, User } from "next-auth";
import { DefaultJWT, JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

// Define the type for credentials
interface Credentials {
    email: string;
    password: string;
}

declare module "next-auth" {
    // Extend the default User type
    interface User extends DefaultUser {
        role?: string;
        image?: string;
        user_name?: string;
    }

    // Extend the default Session type
    interface Session {
        user: {
            role?: string;
            image?: string;
            user_name?: string;
        } & DefaultSession["user"];
    }
    interface JWT extends DefaultJWT {
        role?: string;
        image?: string;
    }
}

const authOptions: AuthOptions = {
    session: {
        strategy: 'jwt',
        maxAge: 259200, // 3 days in seconds
    },
    // providers
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
        // google auth
        GoogleProvider({
            clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '',
            clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET || ''
        })
    ],
    callbacks: {
        async signIn({ user, account }) {
            if (account?.provider === 'google' || account?.provider === 'facebook') {
                await handleSocialAccount(user);
                return true;
            }
            return true;
        },
        async jwt({ token, user, account }: { token: JWT, user?: User, account?: Account | null }) {
            if (account && user) {
                // return user info
                token.role = user.role;
                token.image = user.image;
                token.user_name = user.user_name;

            }
            return token;
        },
        async session({ session, token }: { session: Session, token: JWT }) {
            session.user.role = token.role as string | undefined;
            session.user.image = token.image as string | undefined;
            session.user.user_name = token.user_name as string | undefined;
            return session
        },

    },
    pages: {
        signIn: '/login',
    },
};

const handler = NextAuth(authOptions);

export { handler as POST, handler as GET };
