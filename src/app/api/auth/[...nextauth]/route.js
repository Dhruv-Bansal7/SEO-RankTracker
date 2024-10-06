import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import client from "@/libs/mongoClient.js"


export const authOptions = {
    adapter: MongoDBAdapter(client),
    providers : [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        })
    ],
    secret : process.env.SECRET,
};

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }