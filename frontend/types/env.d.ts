declare namespace NodeJS {
  interface ProcessEnv {
    NEXTAUTH_SECRET: string;

    AUTH_GITHUB_ID: string;
    AUTH_GITHUB_SECRET: string;

    AUTH_GOOGLE_ID: string;
    AUTH_GOOGLE_SECRET: string;

    NEXT_PUBLIC_API_URL: string;
  }
}
