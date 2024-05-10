import React, { useState } from "react";
import { useQuery } from "react-query";
import PageTemplate from "../components/templateMovieListPage";
import MovieFilterUI, {
  titleFilter,
  genreFilter,
} from "../components/movieFilterUI";
import Spinner from "../components/spinner";
import AddToMustWatch from "../components/cardIcons/addToMustWatch";
import useFiltering from "../hooks/useFiltering";
import { getUpcomingMovies } from "../api/tmdb-api";
import { DiscoverMovies, ListedMovie } from "../types/interfaces";
import CustomPagination from "../components/pagination";

const filterConfig = [
  { name: "title", value: "", condition: titleFilter },
  { name: "genre", value: "0", condition: genreFilter },
];

const UpcomingMoviesPage: React.FC = () => {
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState<string>("popularity.desc");
  const { data, error, isLoading, isError } = useQuery<DiscoverMovies, Error>(
    ["upcoming", page, sortBy],
    () => getUpcomingMovies(page, sortBy),
    { keepPreviousData: true }
  );

  const { filterValues, setFilterValues, filterFunction } = useFiltering(
    [],
    filterConfig
  );

  const changeFilterValues = (type: string, value: string) => {
    const changedFilter = { name: type, value: value };
    const updatedFilterSet =
      type === "title"
        ? [changedFilter, filterValues[1]]
        : [filterValues[0], changedFilter];
    setFilterValues(updatedFilterSet);
  };

  const handleSortChange = (newSort: string): void => {
    setSortBy(newSort);
  };

  const movies = data?.results || [];
  const displayedMovies = filterFunction(movies);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  return (
    <>
      <PageTemplate
        title="Upcoming Movies"
        movies={displayedMovies}
        action={(movie: ListedMovie) => <AddToMustWatch {...movie} />}
      />
      <MovieFilterUI
        onFilterValuesChange={changeFilterValues}
        titleFilter={filterValues[0].value}
        genreFilter={filterValues[1].value}
        onSortChange={handleSortChange}
        currentSort={sortBy}
      />
      <CustomPagination
        currentPage={page}
        totalPages={data ? data.total_pages : 1}
        onPageChange={setPage}
      />
    </>
  );
};

export default UpcomingMoviesPage;
