import type { NextAuthOptions, TokenSet } from "next-auth";
import type { JWT } from "next-auth/jwt";
import CognitoProvider from "next-auth/providers/cognito";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,

  pages: {
    signIn: "/auth",
  },

  providers: [
    CognitoProvider({
      clientId: process.env.COGNITO_CLIENT_ID,
      clientSecret: process.env.COGNITO_CLIENT_SECRET,
      issuer: process.env.COGNITO_ISSUER,

      profile(profile) {
        return {
          id: profile.sub,
          firstName: profile.given_name,
          lastName: profile.family_name,
          email: profile.email,
          access_token: profile.access_token,
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.email = user.email;
      }

      // Initial sign in
      if (account) {
        token.access_token = account.access_token!;
        token.expires_at = account.expires_at!;
        token.refresh_token = account.refresh_token!;

        return token;
      }

      // Not yet expired
      if (Date.now() < token.expires_at * 1000) return token;

      return token; // See: https://github.com/nextauthjs/next-auth/issues/7025

      // Expired, try to update
      // return await refreshAccessToken(token);
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

async function refreshAccessToken(token: JWT): Promise<JWT> {
  try {
    const response = await fetch(`${process.env.COGNITO_URL}/oauth2/token`, {
      method: "POST",
      headers: new Headers({
        "content-type": "application/x-www-form-urlencoded",
      }),
      body: Object.entries({
        grant_type: "refresh_token",
        client_id: process.env.COGNITO_CLIENT_ID,
        client_secret: process.env.COGNITO_CLIENT_SECRET,
        refresh_token: token.refresh_token,
      })
        .map(([k, v]) => `${k}=${v}`)
        .join("&"),
    });

    const tokens: TokenSet = await response.json();

    if (!response.ok) throw tokens;

    return {
      ...token, // Keep the previous token properties
      access_token: tokens.access_token!,
      expires_at: Math.floor(Date.now() / 1000 + (tokens.expires_in as number)),
      // Fall back to old refresh token, but note that
      // many providers may only allow using a refresh token once.
      refresh_token: tokens.refresh_token ?? token.refresh_token,
    };
  } catch (error) {
    console.error("Error refreshing access token", error);
    return {
      ...token,
      error: "RefreshAccessTokenError" as const,
    };
  }
}
