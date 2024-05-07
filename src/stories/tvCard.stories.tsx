// TvCard.stories.tsx
import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { MemoryRouter } from "react-router-dom";
import { MoviesContext } from "../contexts/moviesContext";
import TvCard from "../components/tvCard";
import { BaseTVShow } from "../types/interfaces";

// Mock Data for a TV show
const tvShowData: BaseTVShow = {
  id: 101,
  name: "Stranger Things",
  poster_path: "path/to/stranger-things.jpg",
  first_air_date: "2016-07-15",
  vote_average: 8.7,
  favourite: false,
  backdrop_path: null,
  genre_ids: [],
  origin_country: [],
  original_language: "",
  original_name: "",
  overview: "",
  popularity: 0,
  vote_count: 0,
};

const mockMoviesContext = {
  favourites: [101], // Mock array of favourite movie IDs
  mustWatch: [], // Mock array for must-watch movies
  favouriteActors: [], // Mock array for favourite actors
  addToFavourites: () => {}, // Mock function for adding to favourites
  removeFromFavourites: () => {}, // Mock function for removing from favourites
  addToMustWatch: () => {}, // Mock function for adding to must-watch
  removeFromMustWatch: () => {}, // Mock function for removing from must-watch
  addToFavouriteActors: () => {}, // Mock function for adding favourite actors
  removeFromFavouriteActors: () => {}, // Mock function for removing favourite actors
  favouriteShows: [101], // Mock array of favourite TV show IDs
  addShowToFavourites: () => {}, // Mock function for adding shows to favourites
  removeShowFromFavourites: () => {}, // Mock function for removing shows from favourites
  addReview: () => {}, // Newly added mock function for adding a review
  addToFavouriteShows: () => {}, // Newly added mock function for adding to favourite shows
  removeFromFavouriteShows: () => {},
};

// Mock action function for demonstration
const actionMock = (show: BaseTVShow) => <div>Action for {show.name}</div>;

// MoviesContext with favourite shows
const MoviesProviderDecorator = (Story: React.FC) => (
  <MoviesContext.Provider value={mockMoviesContext}>
    <Story />
  </MoviesContext.Provider>
);

// Router decorator to handle links
const RouterDecorator = (Story: React.FC) => (
  <MemoryRouter>
    <Story />
  </MemoryRouter>
);

const meta: Meta<typeof TvCard> = {
  title: "Components/TvCard",
  component: TvCard,
  decorators: [MoviesProviderDecorator, RouterDecorator],
};

export default meta;

type Story = StoryObj<typeof meta>;

// Default story
export const Default: Story = {
  args: {
    show: tvShowData,
    action: actionMock,
  },
};
