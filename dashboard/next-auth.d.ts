import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    full_name: string;
    token: string;
  }
  interface Session {
    token: string;
    user: {
      id: string;
      full_name: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    id: string;
    full_name: string;
    token: string;
  }
}
