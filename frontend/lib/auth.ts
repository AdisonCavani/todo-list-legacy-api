import { db } from "@db/sql";
import type { NextAuthOptions } from "next-auth";
import Github, { type GithubProfile } from "next-auth/providers/github";
import Google, { type GoogleProfile } from "next-auth/providers/google";
import { DrizzleAdapter } from "./drizzle-adapter";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,

  pages: {
    signIn: "/auth",
  },

  adapter: DrizzleAdapter(db),
  session: {
    strategy: "jwt",
  },

  providers: [
    Github({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,

      profile(profile: GithubProfile) {
        return {
          id: profile.id.toString(),
          firstName: profile.name!.split(" ")[0]!,
          lastName: profile.name!.split(" ")[1]!,
          email: profile.email!,
          image: profile.avatar_url,
        };
      },
    }),
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,

      profile(profile: GoogleProfile) {
        return {
          id: profile.sub,
          firstName: profile.given_name,
          lastName: profile.family_name,
          email: profile.email,
          image: profile.picture,
        };
      },
    }),
  ],

  callbacks: {
    jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.email = user.email;
      }

      // Initial sign in
      if (account) {
        token.access_token = account.id_token!;
        token.expires_at = account.expires_at!;
        token.refresh_token = account.refresh_token!;

        return token;
      }

      // Not yet expired
      if (Date.now() < token.expires_at * 1000) return token;

      return token; // See: https://github.com/nextauthjs/next-auth/issues/7025
    },
    session({ session, token }) {
      session.error = token.error;

      if (token) {
        session.user.id = token.id;
        session.user.firstName = token.firstName;
        session.user.lastName = token.lastName;
        session.user.email = token.email;
      }

      return session;
    },
  },
};
