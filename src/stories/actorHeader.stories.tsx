import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import ActorHeader from "../components/headerActor";
import { MemoryRouter } from "react-router";

const SampleActor = {
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
  profile_path: "/gqthfPCEYlAeu2gXmsBIfJOSOgN.jpg",
};

const meta = {
  title: "Actor Details Page/ActorHeader",
  component: ActorHeader,
  decorators: [
    (Story: React.FC) => (
      <MemoryRouter initialEntries={["/"]}>
        <Story />
      </MemoryRouter>
    ),
  ],
} satisfies Meta<typeof ActorHeader>;
export default meta;

type Story = StoryObj<typeof meta>;
export const Basic: Story = {
  args: {
    ...SampleActor,
  },
};
Basic.storyName = "Default";
