import type { Meta, StoryObj } from "@storybook/react";
import Spinner from "../components/spinner";

const meta: Meta<typeof Spinner> = {
  title: "Components/Spinner",
  component: Spinner,
};

export default meta;

type Story = StoryObj<typeof Spinner>;

export const Default: Story = {
  storyName: "Default",
};
