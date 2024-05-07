import { Meta, StoryObj } from "@storybook/react";
import CustomPagination from "../components/pagination";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default {
  title: "Components/CustomPagination",
  component: CustomPagination,
  argTypes: {
    currentPage: { control: "number" },
    totalPages: { control: "number" },
    onPageChange: { action: "pageChanged" },
  },
} as Meta<PaginationProps>;

const Template: StoryObj<PaginationProps> = {
  render: (args) => (
    <CustomPagination
      {...args}
      onPageChange={
        args.onPageChange ||
        function (): void {
          console.error("Page change function not implemented.");
        }
      }
    />
  ),
};

export const Default = {
  ...Template,
  args: {
    currentPage: 1,
    totalPages: 10,
  },
};

export const WithDifferentPageCount = {
  ...Template,
  args: {
    currentPage: 3,
    totalPages: 20,
  },
};

export const WithLargePageCount = {
  ...Template,
  args: {
    currentPage: 5,
    totalPages: 100,
  },
};
