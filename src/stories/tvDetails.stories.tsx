import { MemoryRouter } from "react-router";
import { Meta } from "@storybook/react";
import TvShowDetail from "../components/tvShowDetail";
import MoviesContextProvider from "../contexts/moviesContext";
import SampleTvShow from "./tvDetailSampleData";
import type { StoryObj } from "@storybook/react";
import { TvCastMember } from "../types/interfaces";

const tvCastMembers: TvCastMember[] = [
  {
    adult: false,
    gender: 2,
    id: 123456,
    known_for_department: "Acting",
    name: "John Doe",
    original_name: "John Doe",
    popularity: 7.8,
    profile_path: "/abc123.jpg",
    character: "John Smith",
    credit_id: "123abc456def",
    order: 1,
    department: "Production",
    job: "Producer",
  },
  {
    adult: false,
    gender: 1,
    id: 789012,
    known_for_department: "Acting",
    name: "Jane Smith",
    original_name: "Jane Smith",
    popularity: 9.2,
    profile_path: "/def456.jpg",
    character: "Jane Johnson",
    credit_id: "456def789ghi",
    order: 2,
    department: "Acting",
    job: "",
  },
];

const meta: Meta<typeof TvShowDetail> = {
  title: "Tv Show Details Page/TvShowDetails",
  component: TvShowDetail,
  decorators: [
    (Story) => <MemoryRouter initialEntries={["/"]}>{<Story />}</MemoryRouter>,
    (Story) => <MoviesContextProvider>{<Story />}</MoviesContextProvider>,
  ],
};
export default meta;

type Story = StoryObj<typeof meta>;
export const Basic: Story = {
  args: { show: SampleTvShow, cast: tvCastMembers },
};
Basic.storyName = "Default";
