import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const allowedEmails = ["nguyenthanhsang60309@gmail.com"]

const authOption: AuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    session: {
        strategy: "jwt",
        maxAge: 60 * 60 * 24
    },

    callbacks: {
        async signIn({ profile }) {
            return allowedEmails.includes(profile?.email as string);
        },
    }
}

const handler = NextAuth(authOption);

export { handler as GET, handler as POST, authOption };