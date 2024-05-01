import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";

import Spinner from "../components/spinner";
import PageTemplate from "../components/templateMovieListPage";
import MovieFilterUI from "../components/movieFilterUI";
import AddToFavouritesIcon from "../components/cardIcons/addToFavourites";
import CustomPagination from "../components/pagination";

import { getSimilarMovies } from "../api/tmdb-api";
import useFiltering from "../hooks/useFiltering";

import { DiscoverMovies, ListedMovie } from "../types/interfaces";
import { genreFilter, titleFilter } from "../components/movieFilterUI";

const filterConfig = [
  { name: "title", value: "", condition: titleFilter },
  { name: "genre", value: "0", condition: genreFilter },
];

const SimilarMoviesPage: React.FC = () => {
  const { id } = useParams();
  const [page, setPage] = useState(1);

  const { data, error, isLoading, isError } = useQuery<DiscoverMovies, Error>(
    ["similar movies", id, page],
    () => getSimilarMovies(`${id}`, page),
    { keepPreviousData: true }
  );

  const { filterValues, setFilterValues, filterFunction } = useFiltering(
    [],
    filterConfig
  );

  const changeFilterValues = (type: string, value: string) => {
    const newFilters = filterValues.map((filter) =>
      filter.name === type ? { ...filter, value } : filter
    );
    setFilterValues(newFilters);
  };

  const movies = data?.results || [];
  const displayedMovies = filterFunction(movies);

  if (isLoading) return <Spinner />;
  if (isError) return <h1>{error.message}</h1>;

  return (
    <>
      <PageTemplate
        title="Similar Movies"
        movies={displayedMovies}
        action={(movie: ListedMovie) => <AddToFavouritesIcon {...movie} />}
      />
      <MovieFilterUI
        onFilterValuesChange={changeFilterValues}
        titleFilter={filterValues.find((f) => f.name === "title")?.value || ""}
        genreFilter={filterValues.find((f) => f.name === "genre")?.value || ""}
      />
      <CustomPagination
        currentPage={page}
        totalPages={data ? data.total_pages : 1}
        onPageChange={setPage}
      />
    </>
  );
};

export default SimilarMoviesPage;
