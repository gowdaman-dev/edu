import { connectMongoBD } from "@/app/lib/mongodb";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from 'next-auth/providers/google'
import User from "@/app/models/user";
import bcrypt from 'bcryptjs'
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
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/signin"
    },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }