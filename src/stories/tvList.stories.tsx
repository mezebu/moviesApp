import type { Meta } from "@storybook/react";
import TvList from "../components/tvList";
import SampleMovie from "./tvSampleData";
import { MemoryRouter } from "react-router";

import AddShowsToFavouritesIcon from "../components/cardIcons/addShowsToFavourites";
import Grid from "@mui/material/Grid";
import MoviesContextProvider from "../contexts/moviesContext";

const meta = {
  title: "Tv Show Page/TvList",
  component: TvList,
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={["/"]}>
        <Story />
      </MemoryRouter>
    ),
    (Story) => (
      <MoviesContextProvider>
        <Story />
      </MoviesContextProvider>
    ),
  ],
} satisfies Meta<typeof TvList>;
export default meta;

export const Basic = () => {
  const shows = [
    { ...SampleMovie, id: 1 },
    { ...SampleMovie, id: 2 },
    { ...SampleMovie, id: 3 },
    { ...SampleMovie, id: 4 },
    { ...SampleMovie, id: 5 },
  ];
  return (
    <Grid container spacing={1}>
      <TvList
        shows={shows}
        action={(movie) => <AddShowsToFavouritesIcon {...movie} />}
      />
    </Grid>
  );
};
Basic.storyName = "Default";
