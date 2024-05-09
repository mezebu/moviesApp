import type { Meta, StoryObj } from "@storybook/react";
import SearchInput from "../components/SearchInput";
import { MemoryRouter } from "react-router";
import React from "react";

const meta: Meta<typeof SearchInput> = {
  title: "Components/SearchInput",
  component: SearchInput,
  decorators: [
    (Story: React.FC) => (
      <MemoryRouter initialEntries={["/"]}>
        <Story />
      </MemoryRouter>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {},
  storyName: "Default",
};
