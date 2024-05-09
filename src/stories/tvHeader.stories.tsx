import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import TvHeader from "../components/headerTvShow";
import SampleTv from "./tvDetailSampleData";
import { MemoryRouter } from "react-router";

const meta = {
  title: "Tv Show Details Page/TvHeader",
  component: TvHeader,
  decorators: [
    (Story: React.FC) => (
      <MemoryRouter initialEntries={["/"]}>
        <Story />
      </MemoryRouter>
    ),
  ],
} satisfies Meta<typeof TvHeader>;
export default meta;

type Story = StoryObj<typeof meta>;
export const Basic: Story = {
  args: {
    ...SampleTv,
  },
};
Basic.storyName = "Default";
