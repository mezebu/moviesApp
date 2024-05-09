import { Meta, StoryObj } from "@storybook/react";
import TvCard from "../components/tvCard";
import SampleTvShow from "./tvSampleData";
import { MemoryRouter } from "react-router";
import MoviesContextProvider from "../contexts/moviesContext";
import AddShowsToFavouritesIcon from "../components/cardIcons/addShowsToFavourites";

const meta: Meta<typeof TvCard> = {
  title: "Tv Show Page/TvCard",
  component: TvCard,
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={["/movies/tv"]}>{Story()}</MemoryRouter>
    ),

    (Story) => <MoviesContextProvider>{Story()}</MoviesContextProvider>,
  ],
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    show: SampleTvShow,
    action: (show) => <AddShowsToFavouritesIcon {...show} />,
  },
  storyName: "Default",
};

const sampleNoPoster = { ...SampleTvShow, poster_path: null };
export const Exceptional: Story = {
  args: {
    show: sampleNoPoster,
    action: (show) => <AddShowsToFavouritesIcon {...show} />,
  },
  storyName: "Exception",
};
