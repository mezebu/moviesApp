import { Meta, StoryObj } from "@storybook/react";
import ActorCard from "../components/actorCard";
import SampleActor from "./actorSampleData";
import { MemoryRouter } from "react-router";
import MoviesContextProvider from "../contexts/moviesContext";
import AddActorsToFavouritesIcon from "../components/cardIcons/addActorsToFavourites";

const meta: Meta<typeof ActorCard> = {
  title: "Actors Page/ActorCard",
  component: ActorCard,
  decorators: [
    (Story) => <MemoryRouter initialEntries={["/"]}>{Story()}</MemoryRouter>,

    (Story) => <MoviesContextProvider>{Story()}</MoviesContextProvider>,
  ],
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    actor: SampleActor,
    action: (actor) => <AddActorsToFavouritesIcon {...actor} />,
  },
  storyName: "Default",
};

const sampleNoPoster = { ...SampleActor, poster_path: undefined };
export const Exceptional: Story = {
  args: {
    actor: sampleNoPoster,
    action: (movie) => <AddActorsToFavouritesIcon {...movie} />,
  },
  storyName: "Exception",
};
