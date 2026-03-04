
import { getToken } from "next-auth/jwt"
import {NextResponse} from "next/server"

export const proxy = async(req) => {

    const token = await getToken({req});
    const isTokenOk = Boolean(token);
    const isAdminUser = token?.role;
    const isAdminSpecificRoute = req.nextUrl.pathname.startsWith("/dashboard");

    if(isAdminSpecificRoute && !isAdminUser){
        const callbackUrl = encodeURIComponent(req.nextUrl.pathname);
        return NextResponse.redirect(new URL(`/api/auth/signin?callbackUrl=${callbackUrl}`, req.url));
    }

    // if(token) console.log("From Middleware:", token);

    return NextResponse.next();

}