import type { NextAuthOptions } from "next-auth";
import GoogleProvider, { type GoogleProfile } from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,

  pages: {
    signIn: "/auth",
  },

  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,

      profile(profile: GoogleProfile) {
        return {
          id: profile.sub,
          firstName: profile.given_name,
          lastName: profile.family_name,
          email: profile.email,
          image: profile.picture,
          access_token: profile.id_token,
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
        session.user.access_token = token.access_token;
      }

      return session;
    },
  },
};
