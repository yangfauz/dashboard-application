import NextAuth from "next-auth/next";
import authConfig from "@/configs/auth.config";

const handler = NextAuth(authConfig);

export { handler as GET, handler as POST };
