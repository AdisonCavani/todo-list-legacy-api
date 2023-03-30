import { Button } from "./button";
import type { Meta, StoryFn } from "@storybook/react";

export default {
  title: "UI Button",
  component: Button,
} as Meta<typeof Button>;

const Template: StoryFn<typeof Button> = (args) => (
  <Button {...args}>Button</Button>
);

export const Primary = Template.bind({});
Primary.args = {
  variant: "default",
};

export const Blue = Template.bind({});
Blue.args = {
  variant: "blue",
};
