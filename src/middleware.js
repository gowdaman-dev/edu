import { getToken } from "next-auth/jwt";
import { getSession } from "next-auth/react";
import { NextResponse } from "next/server";
export {default} from "next-auth/middleware";
// import { getSession } from "next-auth/react"
// import { handler } from "./app/api/auth/[...nextauth]/route";

export async function middleware(req){
    const path = await req.nextUrl.pathname;
    const isPublic = await  path === "/signin"
    const token = await req.cookies.get('__Secure-next-auth.session-token')|| req.cookies.get('next-auth.session-token')
    if (isPublic && token){
        return NextResponse.redirect(new URL('/dashboard' , req.nextUrl))
    }
    if (!isPublic && !token){
        return NextResponse.redirect(new URL('/signin' , req.nextUrl))
    } 
}
export const config = {matcher:["/signin","/dashboard","/dashboard/library"]}