declare namespace NodeJS {
  interface ProcessEnv {
    COGNITO_CLIENT_ID: string;
    COGNITO_CLIENT_SECRET: string;
    COGNITO_ISSUER: string;

    NEXTAUTH_SECRET: string;

    API_URL: string;
  }
}
