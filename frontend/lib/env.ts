declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXTAUTH_SECRET: string;

      AUTH_GOOGLE_ID: string;
      AUTH_GOOGLE_SECRET: string;

      NEXT_PUBLIC_API_URL: string;
    }
  }
}

export const env = {
  auth: {
    secret: assertEnvVariable(process.env.NEXTAUTH_SECRET, "NEXTAUTH_SECRET"),
    googleId: assertEnvVariable(process.env.AUTH_GOOGLE_ID, "AUTH_GOOGLE_ID"),
    googleSecret: assertEnvVariable(
      process.env.AUTH_GOOGLE_SECRET,
      "AUTH_GOOGLE_SECRET"
    ),
  },
  apiUrl: assertEnvVariable(
    process.env.NEXT_PUBLIC_API_URL,
    "NEXT_PUBLIC_API_URL"
  ),
};

function assertEnvVariable(envVariable: string, name: string): string {
  if (!envVariable) throw new Error(`Missing environment variable: ${name}`);

  return envVariable;
}
