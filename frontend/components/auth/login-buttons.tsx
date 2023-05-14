"use client";

import { IconBrandAmazon, IconBrandGoogle } from "@tabler/icons-react";
import { Button, ButtonProps } from "@ui/button";
import { getProviders, signIn } from "next-auth/react";
import { ReactNode } from "react";

async function LoginButtons() {
  const providers = await getProviders();
  const props = getProps(providers);

  return (
    <>
      {props.map(({ id, name, icon, variant }) => (
        <Button
          key={id}
          variant={variant}
          onClick={() =>
            signIn(id, {
              callbackUrl: "/app",
            })
          }
        >
          {icon}
          {name}
        </Button>
      ))}
    </>
  );
}

export default LoginButtons;

type ReturnProps = {
  id: string;
  name: string;
  icon: ReactNode;
  variant: ButtonProps["variant"];
};

function getProps(
  providers: Awaited<ReturnType<typeof getProviders>>
): ReturnProps[] {
  const array: ReturnProps[] = [];

  for (const provider in providers) {
    switch (provider) {
      case "cognito":
        array.push({
          id: "cognito",
          name: "AWS Cognito",
          icon: <IconBrandAmazon size={20} />,
          variant: "yellow",
        });
        break;
      case "google":
        array.push({
          id: "google",
          name: "Google",
          icon: <IconBrandGoogle size={20} />,
          variant: "blue",
        });
        break;
    }
  }

  return array;
}
