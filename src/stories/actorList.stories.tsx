import type { Meta } from "@storybook/react";
import ActorList from "../components/actorsList";
import SampleActor from "./actorSampleData";
import { MemoryRouter } from "react-router";

import AddActorsToFavouritesIcon from "../components/cardIcons/addActorsToFavourites";
import Grid from "@mui/material/Grid";
import MoviesContextProvider from "../contexts/moviesContext";

const meta = {
  title: "Actors Page/ActorList",
  component: ActorList,
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
} satisfies Meta<typeof ActorList>;
export default meta;

export const Basic = () => {
  const actors = [
    { ...SampleActor, id: 1 },
    { ...SampleActor, id: 2 },
    { ...SampleActor, id: 3 },
    { ...SampleActor, id: 4 },
    { ...SampleActor, id: 5 },
  ];
  return (
    <Grid container spacing={1}>
      <ActorList
        actors={actors}
        action={(actor) => <AddActorsToFavouritesIcon {...actor} />}
      />
    </Grid>
  );
};
Basic.storyName = "Default";
