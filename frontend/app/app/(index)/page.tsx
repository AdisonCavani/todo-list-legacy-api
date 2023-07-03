import App from "@components/app/app";
import AuthWrapper from "@components/auth-wrapper";
import { twindConfig, type ColorRecordType } from "@lib/twind";

export const metadata = {
  title: "App",
  themeColor: [
    {
      color: (twindConfig.colors.blue as ColorRecordType)[600],
      media: "(prefers-color-scheme: light)",
    },
    {
      color: (twindConfig.colors.neutral as ColorRecordType)[800],
      media: "(prefers-color-scheme: dark)",
    },
  ],
};

function Page() {
  return (
    <AuthWrapper>
      <App />
    </AuthWrapper>
  );
}

export default Page;
