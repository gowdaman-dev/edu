import { NextResponse } from "next/server";

export {default} from "next-auth/middleware";

export function middleware(req){
    const path = req.nextUrl.pathname;
    const isPublic = path === "/signin"
    const token = req.cookies.get('__Secure-next-auth.session-token')|| req.cookies.get('next-auth.session-token')
    if (isPublic && token){
        return NextResponse.redirect(new URL('/dashboard' , req.nextUrl))
    }
    if (!isPublic && !token){
        return NextResponse.redirect(new URL('/signin' , req.nextUrl))
    } 
}
export const config = {matcher:["/signin","/dashboard","/dashboard/:user*"]}