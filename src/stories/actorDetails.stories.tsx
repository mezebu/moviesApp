import type { Meta, StoryObj } from "@storybook/react";
import ActorDetails from "../components/actorDetails";
import { MemoryRouter } from "react-router";
import MoviesContextProvider from "../contexts/moviesContext";
import { ActorProfileDetails } from "../types/interfaces";

const actorProfileDetails: ActorProfileDetails[] = [
  {
    adult: false,
    also_known_as: ["Ana Celia de Armas Caso"],
    biography:
      "Ana de Armas was born in Cuba on April 30, 1988. At the age of 14, she began her studies at the National Theater School of Havana, where she graduated after 4 years. She made her film debut in 2006 in Una rosa de Francia. New York was her next step, where she joined the Lee Strasberg Theater and Film Institute.",
    birthday: "1988-04-30",
    deathday: null,
    gender: 1,
    homepage: null,
    id: 1986620,
    imdb_id: "nm1869101",
    known_for_department: "Acting",
    name: "Ana de Armas",
    place_of_birth: "Havana, Cuba",
    popularity: 14.235,
    profile_path: "/3vxvsmYLTf4jnr163SUlBIw51ee.jpg",
  },
  {
    adult: false,
    also_known_as: ["Scarlett Johansson"],
    biography:
      "Scarlett Ingrid Johansson was born on November 22, 1984 in Manhattan, New York City, New York. Her mother, Melanie Sloan, is from a Jewish family from the Bronx, and her father, Karsten Johansson, is a Danish-born architect, from Copenhagen. She has a sister, Vanessa Johansson, who is also an actress, a brother, Adrian, a twin brother, Hunter Johansson, born three minutes after her, and a paternal half-brother, Christian. Her grandfather was writer Ejner Johansson.",
    birthday: "1984-11-22",
    deathday: null,
    gender: 1,
    homepage: null,
    id: 1245,
    imdb_id: "nm0424060",
    known_for_department: "Acting",
    name: "Scarlett Johansson",
    place_of_birth: "New York City, New York, USA",
    popularity: 20.238,
    profile_path: "/6NsMbJXRlDZuDzatN2akFdGuTvx.jpg",
  },
];

const meta: Meta<typeof ActorDetails> = {
  title: "Actor Details Page/ActorDetails",
  component: ActorDetails,
  decorators: [
    (Story) => <MemoryRouter initialEntries={["/"]}>{<Story />}</MemoryRouter>,
    (Story) => <MoviesContextProvider>{<Story />}</MoviesContextProvider>,
  ],
};
export default meta;

type Story = StoryObj<typeof meta>;
export const Basic: Story = {
  args: { actor: actorProfileDetails[0] },
};
Basic.storyName = "Default";
