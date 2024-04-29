import React, { useState } from "react";
import { ListedMovie, MovieT, Actor, Review } from "../types/interfaces";

interface MovieContextInterface {
  favourites: number[];
  mustWatch: number[];
  favouriteActors: number[];
  addToFavourites: (movie: ListedMovie) => void;
  addToMustWatch: (movie: ListedMovie) => void;
  removeFromFavourites: (movie: ListedMovie) => void;
  addReview: (movie: MovieT, review: Review) => void; // NEW
  addToFavouriteActors: (actor: Actor) => void; // NEW
  removeFromFavouriteActors: (actor: Actor) => void; // NEW
}

const initialContextState: MovieContextInterface = {
  favourites: [],
  mustWatch: [],
  favouriteActors: [],
  addToFavourites: (movie) => {
    movie.id;
  },
  addToMustWatch: (movie) => {
    movie.id;
  },
  removeFromFavourites: (movie) => {
    movie.id;
  },
  addReview: (movie, review) => {
    movie.id, review;
  }, // NEW
  addToFavouriteActors: (actor) => {
    actor.id; // Placeholder
  },
  removeFromFavouriteActors: (actor) => {
    actor.id; // Placeholder
  },
};

export const MoviesContext =
  React.createContext<MovieContextInterface>(initialContextState);

const MoviesContextProvider: React.FC<React.PropsWithChildren> = (props) => {
  const [favourites, setFavourites] = useState<number[]>([]);
  const [mustWatch, setMustWatch] = useState<number[]>([]);
  const [myReviews, setMyReviews] = useState<Review[]>([]);
  const [favouriteActors, setFavouriteActors] = useState<number[]>([]);

  const addToFavourites = (movie: ListedMovie) => {
    const updatedFavourites = [...favourites];
    if (!favourites.includes(movie.id)) {
      updatedFavourites.push(movie.id);
    }
    setFavourites(updatedFavourites);
  };

  const addToFavouriteActors = (actor: Actor) => {
    const updatedFavouriteActors = [...favouriteActors];
    if (!favouriteActors.includes(actor.id)) {
      updatedFavouriteActors.push(actor.id);
    }
    setFavouriteActors(updatedFavouriteActors);
  };

  const addToMustWatch = (movie: ListedMovie) => {
    const updatedMustWatch = [...mustWatch];
    if (!mustWatch.includes(movie.id)) {
      updatedMustWatch.push(movie.id);
    }
    setMustWatch(updatedMustWatch);
    console.log("Updated Must Watch List:", updatedMustWatch);
  };

  const addReview = (movie: MovieT, review: Review) => {
    // NEW
    setMyReviews({ ...myReviews, [movie.id]: review });
  };

  // We will use this function in a later section
  const removeFromFavourites = (movie: ListedMovie) => {
    setFavourites(favourites.filter((mId) => mId !== movie.id));
  };

  const removeFromFavouriteActors = (actor: Actor) => {
    setFavouriteActors(favouriteActors.filter((aId) => aId !== actor.id));
  };

  return (
    <MoviesContext.Provider
      value={{
        favourites,
        favouriteActors,
        mustWatch,
        addToFavourites,
        addToFavouriteActors,
        addToMustWatch,
        removeFromFavourites,
        removeFromFavouriteActors,
        addReview,
      }}
    >
      {props.children}
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;
