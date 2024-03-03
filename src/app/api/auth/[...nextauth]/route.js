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
    callbacks: {
        async jwt({ token, session, user }) {
            if (user) {
                if (user.role == 'superadmin') {
                    return {
                        ...token,
                        role: user.role,
                        acId: user._id,
                    }
                }
                if (user.role == 'student') {
                    return {
                        ...token,
                        role: user.role,
                        school: user.school,
                        acId: user._id,
                        grade: user.standard
                    }
                }
                else {
                    return {
                        ...token,
                        role: user.role,
                        school: user.school,
                        acId: user._id,
                    }
                }
            }
            return token
        },
        async session({ session, user, token }) {
            await connectMongoBD()
            const userdata = await User.findOne({ email: token.email }).select('_id')
            if (token.role == "superadmin") {
                return {
                    ...session,
                    user: {
                        ...session.user,
                        role: token.role,
                        acId: token.acId,
                    }
                }
            }
            if (token.role == "student") {
                return {
                    ...session,
                    user: {
                        ...session.user,
                        role: token.role,
                        acId: token.acId,
                        school: token.school,
                        grade: token.grade
                    }
                }
            } else {
                return {
                    ...session,
                    user: {
                        ...session.user,
                        role: token.role,
                        school: token.school,
                        auth: userdata ? true : false,
                        acId: token.acId
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