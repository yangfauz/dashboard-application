import { AuthOptions } from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import Axios from "axios";
import ENV from "@/utils/env";
import { API_ROUTE } from "@/features/login/configs/api-route";
import { decode } from "jsonwebtoken";

const authConfig: AuthOptions = {
  providers: [
    CredentialProvider({
      name: "credentials",
      credentials: {
        email: { 
          type: "email",
        },
        password: {
          type: "password",
        },
      },
      async authorize(credentials) {
        console.log("crede", credentials)
        console.log("base", ENV.BASE_API_URL_SERVER)
        const baseUrl = ENV.BASE_API_URL_SERVER || "";
        try {
          const data = await Axios.post(
            baseUrl + API_ROUTE.AUTH.LOGIN.ENDPOINT,
            credentials,
            {
              headers: {
                "Content-Type": "application/json",
              },
            },
          );
          console.log(data)
          decode(data.data.data.token);
          return {
            ...data.data.data,
          };
        } catch (e: any) {
          console.log(e)
          throw new Error(e.response.data.message ?? "Something went wrong");
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ user, token }) {
      if (user) {
        token.full_name = user.full_name;
        token.name = user.full_name;
        token.id = user.id;
        token.token = user.token
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.token = token.token;
        session.user = {
          ...session.user,
          full_name: token.full_name,
          name: token.name,
          id: token.id,
        };
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  jwt: {
    maxAge: 60 * 60 * 24,
  },
  secret: ENV.NEXTAUTH_SECRET,
};

export default authConfig;
