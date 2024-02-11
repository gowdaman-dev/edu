import { connectMongoBD } from "@/app/lib/mongodb";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from 'next-auth/providers/google'
import User from "@/app/models/user";
import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken";
const authOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {},
            async authorize(credentials) {
                const { email, password } = credentials;
                try {
                    await connectMongoBD();
                    const user = await User.findOne({ email })
                    if (!user) {
                        return null;
                    }
                    const passwordMatch = await bcrypt.compare(password, user.password)
                    if (!passwordMatch) {
                        return null;
                    }
                    return user
                } catch (error) {
                    console.log("error:", error);
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, session, user }) {
            if (user) {
                if(!exist){
                    const webtoken = jwt.sign({userId:user.id} , process.env.NEXTAUTH_SECRET,  {expiresIn:"0d"})
                    token.refreshToken = webtoken;
                    return token
                }
                if (user.role == 'superadmin') {
                    return {
                        ...token,
                        role: user.role,
                    }
                } else {
                    return {
                        ...token,
                        role: user.role,
                        school: user.school
                    }
                }
            }
            return token
        },
        async session({ session, user, token }) {
            const userdata = await User.findOne({email:session.user.email})
            if (token.role == "superadmin") {
                return {
                    ...session,
                    user: {
                        ...session.user,
                        role: token.role,
                        auth:userdata?true:false,
                    }
                }
            } else {
                return {
                    ...session,
                    user: {
                        ...session.user,
                        role: token.role,
                        school: token.school,
                        auth:userdata?true:false,
                    }
                }
            }

        }
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/signin"
    },
}

export const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }