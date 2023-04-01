import type { Preview } from "@storybook/react";
import "../app/globals.css";
import { fontInter } from "../lib/font";

document.body.classList.add("font-sans");
document.body.classList.add("antialiased");
document.body.classList.add(fontInter.variable);

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        date: /Date$/,
      },
    },
  },
};

export default preview;
