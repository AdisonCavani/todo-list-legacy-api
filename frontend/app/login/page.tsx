import { getServerSession } from "next-auth";
import { getProviders } from "next-auth/react";
import { redirect } from "next/navigation";
import LoginButton from "./LoginButton";

async function Page() {
  const session = await getServerSession();

  if (session) redirect("/app");

  const providers = await getProviders();

  return (
    <div className="flex justify-center">
      {Object.values(providers!).map((provider) => (
        <div key={provider.id}>
          <LoginButton {...provider} />
        </div>
      ))}
    </div>
  );
}

export default Page;
