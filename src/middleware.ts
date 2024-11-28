import { getToken } from "next-auth/jwt";
import withAuth from "next-auth/middleware";
import { useSession } from "next-auth/react";
import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server";
// import jwt from "jsonwebtoken";
// TODO: admin rote fixing 
export const middleware = async (req: NextRequest) => {
    const session = await getToken({ req });

    // console.log('inside middle ware',session)
    const token = cookies(req).get('next-auth.session-token')
    // api not protected
    const pathName = req.nextUrl.pathname;
    // api not protected
    if (pathName.includes('api')) {
        return NextResponse.next()
    }
    // if user not found   
    if (!token) {
        return NextResponse.redirect(new URL(`/login?redirect=${pathName}`, req.url))
    }
    // admin route
    const isAdmin = session?.data?.user?.role === 'admin';
    if (pathName.startsWith('/admin') && !isAdmin) {
        return NextResponse.redirect(new URL('/unauthorized', req.url));
    }
    return NextResponse.next();


}

export const config = {
    matcher: [
        '/admin-dashboard'
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
