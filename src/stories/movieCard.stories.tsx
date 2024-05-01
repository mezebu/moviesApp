import { Meta, StoryObj } from "@storybook/react";
import MovieCard from "../components/movieCard";
import SampleMovie from "./sampleData";
import { MemoryRouter } from "react-router";
import MoviesContextProvider from "../contexts/moviesContext";
import AddToFavouritesIcon from "../components/cardIcons/addToFavourites";

const meta: Meta<typeof MovieCard> = {
  title: "Home Page/MovieCard",
  component: MovieCard,
  decorators: [
    (Story) => <MemoryRouter initialEntries={["/"]}>{Story()}</MemoryRouter>,

    (Story) => <MoviesContextProvider>{Story()}</MoviesContextProvider>,
  ],
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    movie: SampleMovie,
    action: (movie) => <AddToFavouritesIcon {...movie} />,
  },
  storyName: "Default",
};

const sampleNoPoster = { ...SampleMovie, poster_path: undefined };
export const Exceptional: Story = {
  args: {
    movie: sampleNoPoster,
    action: (movie) => <AddToFavouritesIcon {...movie} />,
  },
  storyName: "Exception",
};
