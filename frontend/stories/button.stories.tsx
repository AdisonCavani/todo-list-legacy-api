import type { Meta, StoryFn } from "@storybook/react";
import { IconBrandGithub } from "@tabler/icons-react";
import { Button } from "@ui/button";

export default {
  title: "Button",
  component: Button,
  decorators: [
    (Story) => (
      <div className="flex gap-x-3">
        <Story />
      </div>
    ),
  ],
  args: {
    children: "Button",
  },
} as Meta<typeof Button>;

export const Default: StoryFn<typeof Button> = (props) => <Button {...props} />;

export const Colors: StoryFn<typeof Button> = (props) => (
  <>
    <Button {...props} color="default" />
    <Button {...props} color="blue" />
    <Button {...props} color="destructive" />
    <Button {...props} color="ghost" />
    <Button {...props} color="link" />
    <Button {...props} color="outline" />
    <Button {...props} color="subtle" />
    <Button {...props} color="yellow" />
  </>
);

export const Sizes: StoryFn<typeof Button> = (props) => (
  <>
    <Button {...props} size="xxs" />
    <Button {...props} size="xs" />
    <Button {...props} size="sm" />
    <Button {...props} size="default" />
    <Button {...props} size="lg" />
  </>
);

export const Loading: StoryFn<typeof Button> = (props) => (
  <Button {...props} loading />
);
export const Disabled: StoryFn<typeof Button> = (props) => (
  <Button {...props} disabled />
);
export const WithIcon: StoryFn<typeof Button> = (props) => (
  <Button {...props} icon={<IconBrandGithub size={18} />} />
);
