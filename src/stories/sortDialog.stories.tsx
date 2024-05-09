import type { Meta, StoryObj } from "@storybook/react";
import SortDialog from "../components/SortDialog";
import { action } from "@storybook/addon-actions";

const meta: Meta<typeof SortDialog> = {
  title: "Components/SortDialog",
  component: SortDialog,
  argTypes: {
    onClose: { action: "closed" },
    onSortChange: { action: "sort changed" },
  },
};

export default meta;

type Story = StoryObj<typeof SortDialog>;

const sortOptions = [
  { label: "Release Date", value: "release_date" },
  { label: "Title", value: "title" },
  { label: "Rating", value: "rating" },
];

export const Basic: Story = {
  args: {
    title: "Sort Movies",
    open: true,
    onClose: action("closed"),
    onSortChange: action("sort changed"),
    sortOptions: sortOptions,
  },
};
