import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"

export const middleware = async (req:NextRequest) => {
    const token = cookies(req).get('next-auth.session-token')
    // api not protected
    const pathName = req.nextUrl.pathname;
    if (pathName.includes('api')) {
        return NextResponse.next()
    }
    if (!token) {
        return NextResponse.redirect(new URL(`/login?redirect=${pathName}`, req.url))
    }
    return NextResponse.next()
}

export const config = {
    matcher: [
        
    ]
}