import { useState, useEffect } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { getUpcomingMovies } from "../api/tmdb-api";
import { ListedMovie } from "../types/interfaces";

const UpcomingMoviesPage: React.FC = () => {
  const [upcomingMovies, setUpcomingMovies] = useState<ListedMovie[]>([]);

  const favourites = upcomingMovies.filter((m) => m.favourite);
  localStorage.setItem("favourites", JSON.stringify(favourites));

  const addToFavourites = (movieId: number) => {
    const updatedMovies = upcomingMovies.map((m: ListedMovie) =>
      m.id === movieId ? { ...m, favourite: true } : m
    );
    setUpcomingMovies(updatedMovies);
  };

  useEffect(() => {
    getUpcomingMovies().then((movies) => {
      setUpcomingMovies(movies);
    });
  }, []);

  return (
    <PageTemplate
      title="Upcoming Movies"
      movies={upcomingMovies}
      selectFavourite={addToFavourites}
    />
  );
};

export default UpcomingMoviesPage;
