import type { Meta, StoryObj } from "@storybook/react";
import MovieDetails from "../components/movieDetails";
import SampleMovie from "./sampleData";
import { MemoryRouter } from "react-router";
import MoviesContextProvider from "../contexts/moviesContext";
import { CastMember } from "../types/interfaces";

const SampleCast: CastMember[] = [
  {
    id: 1,
    name: "Actor One",
    character: "Character One",
    profile_path: "/path_to_profile.jpg",
    adult: false,
    gender: 2, // Typically 1 for female, 2 for male
    known_for_department: "Acting",
    original_name: "Actor One",
    popularity: 5.0,
    credit_id: "credit1",
    cast_id: 0,
    order: 0,
  },
  {
    id: 2,
    name: "Actor Two",
    character: "Character Two",
    profile_path: "/path_to_profile.jpg",
    adult: false,
    gender: 1,
    known_for_department: "Acting",
    original_name: "Actor Two",
    popularity: 4.5,
    credit_id: "credit2",
    cast_id: 0,
    order: 0,
  },
];

const meta: Meta<typeof MovieDetails> = {
  title: "Movie Details Page/MovieDetails",
  component: MovieDetails,
  decorators: [
    (Story) => <MemoryRouter initialEntries={["/"]}>{<Story />}</MemoryRouter>,
    (Story) => <MoviesContextProvider>{<Story />}</MoviesContextProvider>,
  ],
};
export default meta;

type Story = StoryObj<typeof meta>;
export const Basic: Story = {
  args: { movie: SampleMovie, cast: SampleCast },
};
Basic.storyName = "Default";
