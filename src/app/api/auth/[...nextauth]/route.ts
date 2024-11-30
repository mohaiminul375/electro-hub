import { createSocialAccount, handleLogin, handleSocialAccount, handleSocialLogin } from "@/app/login/api/route";
import NextAuth, { Account, AuthOptions, DefaultSession, DefaultUser, Session, User } from "next-auth";
import { DefaultJWT, JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";  // Added FacebookProvider

// Define the type for credentials
interface Credentials {
    email: string;
    password: string;
}

declare module "next-auth" {
    interface User extends DefaultUser {
        role?: string;
        image?: string;
        user_name?: string;
        address?: object;
    }

    interface Session {
        user: {
            role?: string;
            image?: string;
            user_name?: string;
            address?: object;
        } & DefaultSession["user"];
    }
    interface JWT extends DefaultJWT {
        role?: string;
        image?: string;
        address?: object;
    }
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
        // Google authentication
        GoogleProvider({
            clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '',
            clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET || '',
        }),
        // Facebook authentication
        FacebookProvider({
            clientId: process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_ID || '',
            clientSecret: process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_SECRET || '',
        })
    ],
    callbacks: {
        async signIn({ user, account }) {
            if (account?.provider === 'google' || account?.provider === 'facebook') {
                await createSocialAccount(user);
                return true;
            }
            return true;
        },
        async jwt({ token, user, account }: { token: JWT, user?: User, account?: Account | null }) {
            if (account && user) {
                if (account.provider === 'google' || account.provider === 'facebook') {
                    const { socialUser } = await handleSocialAccount(user.email as string);
                    token.role = socialUser?.role;
                    token.name = user.name;
                    token.address = user?.address;
                } else {
                    token.role = user.role;
                    token.name = user.name;
                    token.address = user?.address;
                }
            }
            return token;
        },
        async session({ session, token }: { session: Session, token: JWT }) {
            session.user.role = token.role as string | undefined;
            session.user.name = token.name as string | undefined;
            session.user.address = token.address as object | undefined;
            return session;
        },
    },
    pages: {
        signIn: '/login',
    },
};

const handler = NextAuth(authOptions);

export { handler as POST, handler as GET };
