import { getToken } from "next-auth/jwt";
import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server";
// import jwt from "jsonwebtoken";
// TODO: admin rote fixing 
interface Session {
    user?: {
        role?: string;
    };
}
export const middleware = async (req: NextRequest) => {
    try {
        // Get the session from the request using next-auth
        const session = await getToken({ req }) as Session | null;

        // Extract the token from cookies
        const token = cookies(req).get('next-auth.session-token');

        // Get the pathname from the request URL
        const pathName = req.nextUrl.pathname;

        // Allow API routes to bypass authentication
        if (pathName.includes('api')) {
            return NextResponse.next();
        }

        // Redirect unauthenticated users to the login page with a redirect query parameter
        if (!token) {
            return NextResponse.redirect(new URL(`/login?redirect=${pathName}`, req.url));
        }

        // Check if the route is an admin route and validate if the user is an admin
        const isAdmin = session?.user?.role === 'admin';
        if (pathName.startsWith('/admin') && (!token || !isAdmin)) {
            return NextResponse.redirect(new URL('/unauthorized', req.url));
        }
        // Proceed to the requested route
        return NextResponse.next();
    } catch (error) {
        console.error('Middleware error:', error);
        // Redirect to an error page or handle the error gracefully
        return NextResponse.redirect(new URL('/error', req.url));
    }
};

export const config = {
    matcher: [
        // '/admin-dashboard/:path*' // only for admin
        // '/cart'
    ]
}

// admin rote for chatGPT
// import { cookies } from "next/headers";
// import { NextRequest, NextResponse } from "next/server";
// import jwt from "jsonwebtoken"; // Use a JWT library for decoding tokens.

// export const middleware = async (req: NextRequest) => {
//     const token = cookies(req).get("next-auth.session-token");
//     const pathName = req.nextUrl.pathname;

//     // Public routes (no protection)
//     if (pathName.startsWith("/public")) {
//         return NextResponse.next();
//     }

//     // Redirect unauthenticated users
//     if (!token) {
//         return NextResponse.redirect(new URL(`/login?redirect=${pathName}`, req.url));
//     }

//     try {
//         const secret = process.env.JWT_SECRET; // Replace with your JWT secret
//         const decodedToken = jwt.verify(token.value, secret);

//         // General User Routes
//         if (pathName.startsWith("/user")) {
//             if (decodedToken.role === "admin" || decodedToken.role === "user") {
//                 return NextResponse.next();
//             }
//             return NextResponse.redirect(new URL(`/unauthorized`, req.url));
//         }

//         // Admin Routes
//         if (pathName.startsWith("/admin")) {
//             if (decodedToken.role === "admin") {
//                 return NextResponse.next();
//             }
//             return NextResponse.redirect(new URL(`/unauthorized`, req.url)); // Redirect non-admins
//         }
//     } catch (error) {
//         console.error("Token verification failed:", error);
//         return NextResponse.redirect(new URL(`/login?redirect=${pathName}`, req.url));
//     }

//     return NextResponse.next();
// };

// export const config = {
//     matcher: [
//         "/user/:path*", // Protect user-specific routes
//         "/admin/:path*", // Protect admin-specific routes
//         "/public/:path*", // Public routes (unprotected)
//     ],
// };
