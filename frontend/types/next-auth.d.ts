import { User } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    firstName: string;
    lastName: string;
    email: string;

    accessToken?: string | undefined;
  }
}

declare module "next-auth" {
  interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;

    accessToken?: string | undefined;
  }

  interface Session {
    user: User;
  }
}
