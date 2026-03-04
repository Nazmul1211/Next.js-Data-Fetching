import dbConnect, { collectionNames } from "@/lib/dbConnect";
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { signIn } from "next-auth/react";


export const authOptions = {
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. 'Sign in with...')
            name: 'Credentials',
            // The credentials is used to generate a suitable form on the sign in page.
            // You can specify whatever fields you are expecting to be submitted.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                username: { label: "Username", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" },
                email: { label: "email", type: "email" }
            },
            async authorize(credentials) {
                console.log("CREDENTIALS FROM AUTH:", credentials);

                const { username, password } = credentials;
                const user = await dbConnect(collectionNames.TEST_USER).findOne({ username });

                const isPasswordOk = password == user.password;

                // TODO: Replace with your real DB/API credential check.
                // Returning a user object signals success; returning null means failed auth.

                if (isPasswordOk) {
                    return user;
                }

                return null;

                // if (credentials?.username && credentials?.password) {
                //     return {
                //         id: "1",
                //         name: credentials.username,
                //         email: credentials.email ?? `${credentials.username}@example.com`,
                //     }
                // }

                return null
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET
        })
    ],
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {

            if (account) {
                try {
                    // console.log("FROM SINGIN CALLBACK", { user, account, profile, email, credentials });
                    const { provider, providerAccountId } = account;
                    const { email: user_email, image, name } = user;
                    const payload = { role: "user", providerAccountId, provider, user_email, image, name }
                    console.log("FROM SINGIN CALLBACK", payload);

                    const userCollection = dbConnect(collectionNames.TEST_USER);
                    const isUserExixts = await userCollection.findOne({ providerAccountId })

                    if(!isUserExixts){
                        await userCollection.insertOne(payload);
                    }

                } catch (error) {
                    return false
                    console.log(error);
                }

            }

            return true
        },
        async redirect({ url, baseUrl }) {
            // Redirect to callbackUrl if it's on the same origin, otherwise fall back to baseUrl
            if (url.startsWith(baseUrl)) return url;
            if (url.startsWith("/")) return `${baseUrl}${url}`;
            return baseUrl;
        },
        async session({ session, token, user }) {
            if (token) {
                session.user.username = token.username;
                session.user.role = token.role;
            }
            return session
        },
        async jwt({ token, user, account, profile, isNewUser }) {
            if (user) {
                token.username = user.username;
                token.role = user.role;
            }
            return token
        }
    },
}