import React, { useContext } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContext";
import { useQueries } from "react-query";
import { getActorDetails, getMovie, getTvShowDetail } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import useFiltering from "../hooks/useFiltering";
import MovieFilterUI, { titleFilter } from "../components/movieFilterUI";
import { MovieT } from "../types/interfaces";
import RemoveFromFavourites from "../components/cardIcons/removeFromFavourites";
import WriteReview from "../components/cardIcons/writeReview";
import RemoveActorsFromFavouritesIcon from "../components/cardIcons/removeActorsFromFavourites";
import ActorListPageTemplate from "../components/templateActorListPage";
import TvListPageTemplate from "../components/templateTvListPage";
import RemoveShowsFromFavouritesIcon from "../components/cardIcons/removeShowsFromFavourites";

const titleFiltering = {
  name: "title",
  value: "",
  condition: titleFilter,
};

// eslint-disable-next-line react-refresh/only-export-components
export const genreFiltering = {
  name: "genre",
  value: "0",
  condition: function (movie: MovieT, value: string) {
    // Is user selected genre in this movies's genre list?
    // Always true if selected genre ia All (0).
    const genreId = Number(value);
    const genre_ids = movie.genres.map((g) => g.id);
    return genreId > 0 ? genre_ids.includes(genreId) : true;
  },
};

const FavouriteMoviesPage: React.FC = () => {
  const {
    favourites: movieIds,
    favouriteActors: actorIds,
    favouriteShows: showId,
  } = useContext(MoviesContext);
  const { filterValues, setFilterValues, filterFunction } = useFiltering(
    [],
    [titleFiltering, genreFiltering]
  );

  // Create an array of queries and run them in parallel.
  const favouriteMovieQueries = useQueries(
    movieIds.map((movieId) => {
      return {
        queryKey: ["movie", movieId],
        queryFn: () => getMovie(movieId.toString()),
      };
    })
  );

  const favouriteActorQueries = useQueries(
    actorIds.map((actorId) => {
      return {
        queryKey: ["actor", actorId],
        queryFn: () => getActorDetails(actorId.toString()),
      };
    })
  );

  const favouriteTvShowQueries = useQueries(
    showId.map((showId) => {
      return {
        queryKey: ["tv-show", showId],
        queryFn: () => getTvShowDetail(showId.toString()),
      };
    })
  );

  // Check if any of the parallel queries is still loading.
  const isLoading =
    favouriteMovieQueries.some((m) => m.isLoading) ||
    favouriteActorQueries.some((a) => a.isLoading) ||
    favouriteTvShowQueries.some((s) => s.isLoading);

  if (isLoading) {
    return <Spinner />;
  }

  const allFavourites = favouriteMovieQueries.map((q) => q.data);
  const allActorFavourites = favouriteActorQueries.map((q) => q.data);
  const allShowFavourites = favouriteTvShowQueries.map((q) => q.data);

  const displayMovies = allFavourites ? filterFunction(allFavourites) : [];
  const displayActors = allActorFavourites ? allActorFavourites : [];
  const displayShows = allShowFavourites ? allShowFavourites : [];

  const changeFilterValues = (type: string, value: string) => {
    const changedFilter = { name: type, value: value };
    const updatedFilterSet =
      type === "title"
        ? [changedFilter, filterValues[1]]
        : [filterValues[0], changedFilter];
    setFilterValues(updatedFilterSet);
  };

  return (
    <>
      <PageTemplate
        title="Favourite Movies"
        movies={displayMovies}
        action={(movie) => {
          return (
            <>
              <RemoveFromFavourites {...movie} />
              <WriteReview {...movie} />
            </>
          );
        }}
      />
      <ActorListPageTemplate
        title="Favourite Actors"
        actors={displayActors}
        action={(actor) => {
          return (
            <>
              <RemoveActorsFromFavouritesIcon {...actor} />
            </>
          );
        }}
      />
      <TvListPageTemplate
        title="Favourite Tv Shows"
        shows={displayShows}
        action={(show) => {
          return (
            <>
              <RemoveShowsFromFavouritesIcon {...show} />
            </>
          );
        }}
      />
      <MovieFilterUI
        onFilterValuesChange={changeFilterValues}
        titleFilter={filterValues[0].value}
        genreFilter={filterValues[1].value}
        onSortChange={function (): void {
          throw new Error("Function not implemented.");
        }}
        currentSort={""}
      />
    </>
  );
};

export default FavouriteMoviesPage;
