import React from "react"; // replace existing react import
import { useParams } from "react-router-dom";
import MovieDetails from "../components/movieDetails";
import { MovieT, MovieCredits } from "../types/interfaces"; // Update imported interfaces
import PageTemplate from "../components/templateMoviePage";
import { getMovie, getMovieCredits } from "../api/tmdb-api";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";

const MovieDetailsPage: React.FC = () => {
  const { id } = useParams();
  const {
    data: movie,
    error: movieError,
    isLoading: movieLoading,
    isError: movieIsError,
  } = useQuery<MovieT, Error>(["movie", id], () => getMovie(id || ""));

  const {
    data: credits,
    error: creditsError,
    isLoading: creditsLoading,
    isError: creditsIsError,
  } = useQuery<MovieCredits, Error>(["movieCredits", id], () =>
    getMovieCredits(id || "")
  );

  if (movieLoading || creditsLoading) {
    return <Spinner />;
  }

  if (movieIsError) {
    return <h1>{movieError?.message}</h1>;
  }

  if (creditsIsError) {
    return <h1>{creditsError?.message}</h1>;
  }

  return (
    <>
      {movie && credits && (
        <PageTemplate movie={movie}>
          <MovieDetails movie={movie} cast={credits.cast} />
        </PageTemplate>
      )}
    </>
  );
};

export default MovieDetailsPage;
